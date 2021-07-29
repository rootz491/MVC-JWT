const jwt = require("jsonwebtoken");

module.exports = {
    isAuthenticated: (req, res, next) => {
        try {
            if (req.headers.authorization) {
                const token = req.headers.authorization.split(' ')[1];
                const user = jwt.verify(token, process.env.SECRET_KEY);
                if (user) {
                    const { _id, username, role } = user;
                    req.user = { _id, username, role };
                    next();
                }
                else throw "invalid JWT";
            }
            else throw "Authorization header is missing";
        } catch (error) {
            res.status(401).json({success: false, error});
        }
    }, 
    isAuthorized: (req, res, next) => {
        if (req.user.role === "admin") next();
        else res.status(403).json("user is unauthorized");
    }
}