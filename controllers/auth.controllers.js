const { signupService, findUserByEmailService } = require("../services/auth.service");

exports.signup = async (req, res) => {
    try {
        const user = await signupService(req.body);

        res.status(200).json({
            status: "Success",
            message: "Successfully created your account",
            data: user
        })
    } catch (error) {
        res.status(400).json({
            status: "Failed",
            message: "Failed to create the account",
            error: error.message
        })
    }
}

exports.getMe = async (req, res) => {
    try {
        const user = await findUserByEmailService(req.user?.email);

        res.status(200).json({
            status: "Success",
            message: 'Successfully retrieved the account',
            data: user
        })
    } catch (error) {
        res.status(500).json({
            status: "failed",
            message: "Failed to Login",
            error: error.message
        })
    }
}