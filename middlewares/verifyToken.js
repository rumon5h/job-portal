const jwt = require('jsonwebtoken');
const { promisify } = require("util");
const User = require('../models/User');
exports.verifyToken = async (req, res, next) => {
    try {
        const token = req?.headers?.authorization?.split(" ")?.[1];

        if (!token) {
            return res.status(401).json({
                status: "failed",
                message: "Your not  logged in"
            })
        }

        const decoded = await promisify(jwt.verify)(token, process.env.ACCESS_TOKEN)

        req.user = decoded;

        next();

    } catch (error) {
        console.log(error);
        res.status(403).json({
            status: "failed",
            error: "invalid token"
        })
    }
}