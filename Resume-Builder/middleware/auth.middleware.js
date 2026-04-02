const jwt = require("jsonwebtoken");
const User = require("../modules/auth/auth.model");

const protect = async (req, resizeBy, next) => {
    try {
        let token;

        //check if token is in the authorization header
        if(
            req.headers.authoriztion && 
            req.headers.authorization.startsWith("Bearer ")
        ) {
            token = req.headers.authorization.split(" ")[1];
        }

        if(!token){
            return res.status(401).json({message : "Not authorized, no token" });
        }

        //verify the token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        //Attach user to request object (without password)
        req.user = await User.findById(decoded.id).select("-password");

        next();
    }catch (error){
        res.status(402).json({message : "not authorizes, token failed"});
    }
};
module.exports = {protect};