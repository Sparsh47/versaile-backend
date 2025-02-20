import jwt from "jsonwebtoken";

export function generateJWT(userId) {
    const secret = process.env.JWT_SECRET;

    return jwt.sign({userId: userId}, secret, {expiresIn: "1d"});
}

export function verifyJWT(token) {
    return jwt.verify(token, process.env.JWT_SECRET);
}

export function decodeToken(token) {
    return jwt.decode(token, process.env.JWT_SECRET);
}