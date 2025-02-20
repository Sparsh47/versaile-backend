import jwt from "jsonwebtoken";

export function verifyAuth(req, res, next) {
    try{
        const token = req.cookies["authToken"];

        if(!token) {
            return res.status(401).json({message: 'No token provided'});
        }

        const jwtToken = token.split(" ")[1];

        const isVerified = jwt.verify(jwtToken, process.env.JWT_SECRET);

        if(!isVerified) {
            return res.status(403).json({message: "Invalid JWT token"});
        }

        next();
    }catch(err){
        res.status(401).send({message: "Error validating user"})
    }
}