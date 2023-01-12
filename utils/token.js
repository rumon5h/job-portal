const jwt = require('jsonwebtoken');

exports.generateToken = (userInfo) => {
    const payload = {
        email: userInfo.email,
        role: userInfo.role,
        id: userInfo._id
    }
    const token = jwt.sign(payload, process.env.ACCESS_TOKEN, {
        expiresIn: "7days"
    });

    return token;
}