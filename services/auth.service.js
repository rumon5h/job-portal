const User = require("../models/User")

exports.signupService = async (userInfo) => {
    
    const result = await User.create(userInfo);

    return result;
}

exports.findUserByEmailService = async (email) => {
    const result = await User.findOne({ email });

    return result;
}