const mongoose = require('mongoose');
const validator = require("validator");
const bcrypt = require('bcryptjs');

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please provide a name."],
        minLength: [3, "Name must be at least 3 characters long."],
        maxLength: [150, "Name cannot be more than 150 characters"],
        trim: true,
        lowercase: true
    },
    email: {
        type: String,
        validate: [validator.isEmail, "Please provide a valid email"],
        required: [true, "Please provide a email"]
    },
    password: {
        type: String,
        required: [true, 'Please provide a password'],
        validate: {
            validator: (value) =>
                validator.isStrongPassword(value, {
                    minLength: 6,
                    minLowercase: 3,
                    minNumbers: 1,
                    minUppercase: 1,
                    minSymbol: 1,
                }),
            message: "Password {VALUE} is not strong enough."
        },
    },
    confirmPassword: {
        type: String,
        required: [true, "Please confirm your password"],
        validate: {
            validator: function (value) {
                return value == this.password
            },
            message: "Password doesn't match."
        },
    },
    role: {
        type: String,
        enum: ["candidate", "hiring Manager", "admin"],
        default: "candidate"
    },
    contactNumber: {
        type: String,
        validate: [validator.isMobilePhone,]
    }
},{
    timestamps: true
});

userSchema.pre("save", function (next) {
    const password = this.password;

    const hashedPassword = bcrypt.hashSync(password);

    this.password = hashedPassword;
    this.confirmPassword = undefined;

    next()
});

userSchema.methods.comparePassword = function (userPassword, hash) {
    const isPasswordValid = bcrypt.compareSync(userPassword, hash)
    return isPasswordValid;
};

const User = mongoose.model("User", userSchema);

module.exports = User;