var resGenerator = require("../libs/responseGenerator");

function verifyUser(req, res, next) {
    if (req.user.isAdmin == true) {
        next();
    } else {

        res.send(resGenerator.generate(true, "Unauthorized access.You need to Login as Admin to access", 403, { auth: false, token: null }));
    }
}
module.exports = verifyUser;