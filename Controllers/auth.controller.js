const jwt = require("jsonwebtoken");
const _ = require("lodash");
const { createUser, checkPassword, deleteUser, checkUsername, pushToken, popToken, checkToken } = require("../Services/auth.service");
require("dotenv").config();

module.exports = {
    //  user
    apiLogin: async (req, res) => {
        try {
            const username = req.body.username;
            const password = req.body.password;
            //  verify user input
            if (!username || !_.isString(username)) throw "username's not valid string";
            if (!password || !_.isString(password)) throw "password's not valid string";
            //  check username and password
            const user = await checkPassword(username, password);
            if (!user) throw "user not found or incorrect password";
            const { _id, role, disabled } = user;
            //  sign JWT tokens with secret key
            const authToken = jwt.sign({ _id, username, role, disabled }, process.env.SECRET_KEY, { expiresIn: "15m" });
            const refreshToken = jwt.sign({ username }, process.env.SECRET_KEY);
            //  add refresh token to tokensList in DB
            await pushToken(_id, refreshToken);
            res.json({success: true, authToken, refreshToken });
        } catch (error) {
            res.status(401).json({success: false, error});
        }
    },
    apiSignup: async (req, res) => {
        const { username, password, confirmPassword } = req.body;
        try {
            //  veirfy user input
            if (!username || !_.isString(username)) throw "username's not valid string";
            if (!password || !_.isString(password)) throw "password's not valid string";
            if (!confirmPassword && !_.isString(confirmPassword)) throw "confirmPassword's not valid string";
            if (password !== confirmPassword) throw "password do not match each other";
            if (password.length < 6) throw "password should be atleast 6 chars long";
            //  check if user with same username already exists in DB
            if(await checkUsername(username)) throw "username is registered";
            //  add user to database
            const user = await createUser(username, password);
            //  send back success response
            res.json({success: true, msg: user});
        } catch (error) {
            res.status(400).json({success: false, error})
        }
    },
    apiDeleteUser: async (req, res) => {
        const { id } = req.body;
        try {
            if (!id || id.length !== 24) throw "invalid ID";
            if (req.id !== id) throw "you cannot delete other's account";
            const user = await deleteUser(id);
            if (user) res.json({success: true, data});
            else throw "user with this ID is not available"
        } catch (error) {
            res.status(400).json({success: false, error})
        }
    },
    apiLogout: async (req, res) => {
        const { token } = req.body;
        const id = req.user._id;
        //  remove refresh token
        try {
            if (!_.isString(token)) throw "refresh token is not a valid sting";
            if (await popToken(id, token)) res.json({ success: true });
            else throw "invalid refresh token";    
        } catch (error) {
            res.status(400).json({ success: false, error })
        }
    },
    updateToken: async (req, res) => {
        const { token } = req.body;
        const id = req.user._id;
        const user = req.user;
        console.log(user);
        try {
            if (!_.isString(token)) throw "refresh token is not a valid sting";
            if (await checkToken(id, token)) {
                //  sign JWT tokens with secret key
                const authToken = jwt.sign({ ...user }, process.env.SECRET_KEY, { expiresIn: "15m" });
                res.json({success: true, authToken});
            }
            else throw "invalid refresh token";
        } catch (error) {
            res.status(400).json({ success: false, error })
        }
    }
}