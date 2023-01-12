const { signupService } = require("../services/auth.service");

exports.signup = async (req, res) => {
    try {
        const user = await signupService(req.body);

        res.status(200).json({
            status: "Success",
            message: "Successfully created account",
            data: user
        })
    } catch (error) {
        res.status(400).json({
            status: "Fail",
            message: "Couldn't create account",
            error: error.message
        })
    }
}