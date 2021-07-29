const {userModel, refreshTokenModel} = require("../Models/auth.model");

module.exports = {
    // User services
    createUser: async (username, password) => {
        try {
            return await userModel.insertMany({username, password})
        } catch (err) {
            console.log(err);
            return false;
        }
    },
    checkUsername: async username => {
        try {
            const user = await userModel.findOne({username});
            return user ? true : false;
        } catch (err) {
            console.log(err);
            return false;
        }
    }
    ,
    checkPassword: async (username, password) => {
        try {
            const user = await userModel.findOne({username});
            return (password === user.password) ? user : false;
        } catch (err) {
            console.log(err);
            return false;
        }
    },
    deleteUser: async id => {
        try {
            const user = await userModel.findByIdAndDelete(id);
            return user;
        } catch (err) {
            console.log(err);
            return false;
        }
    },
    //  Refresh Token Services
    pushToken: async (userId, refreshToken) => {
        try {
            await refreshTokenModel.insertMany({userId, refreshToken});
            return true
        } catch (error) {
            console.log(error);
            return false
        }
    },
    checkToken: async (userId, refreshToken) => {
        try {
            const token = await refreshTokenModel.findOne({userId, refreshToken});
            if (token !== null) return true
            else return false
        } catch (error) {
            console.log(error);
            return false
        }
    },
    popToken: async (userId, refreshToken) => {
        try {
            const token = await refreshTokenModel.findOneAndDelete({userId, refreshToken});
            if (token !== null) return true
            else return false
        } catch (error) {
            console.log(error);
            return false
        }
    },
}