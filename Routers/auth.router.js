const router = require("express").Router();
const { apiLogin, apiSignup, apiDeleteUser, apiLogout, updateToken } = require("../Controllers/auth.controller");
const { isAuthenticated, isAuthorized } = require("../Services/verification.service");

router.post('/login', apiLogin);
router.post('/signup', apiSignup);
router.post('/logout', isAuthenticated, apiLogout);
router.post('/token', isAuthenticated, updateToken);    //  refresh token
router.delete('/user/delete', isAuthenticated, isAuthorized, apiDeleteUser);

module.exports = router;