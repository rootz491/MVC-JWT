const mongoose = require("mongoose");
const schema = mongoose.Schema;

const userSchema = schema({
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        default: "user"
    },
    disable: {
        type: Boolean,
        default: false
    }
});

const refreshTokenSchema = schema({
    userId: {
        type: String,
        required: true
    },
    refreshToken: {
        type: String,
        required: true
    }
})

module.exports = {
    userModel: mongoose.model("User", userSchema),
    refreshTokenModel: mongoose.model("RefreshToken", refreshTokenSchema)
}