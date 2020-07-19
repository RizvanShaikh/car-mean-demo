//   const jwt = require('jsonwebtoken');
var Promise = require('bluebird');
var exceptions = require('./customExceptions')
var jwt = Promise.promisifyAll(require("jsonwebtoken"));
var role = require('./constants').ACCOUNT_LEVEL
var resHndlr = require('./responseHandler')
var userMsg = require('./modules/user/userConstants').MESSAGES
var Msg = require('./constants').MESSAGES
var httpCode = require('./constants').http_code
var userDao = require('./modules/user/userDao')
const mongoose = require('mongoose')
var JWT_SECRET_KEY = "forgot_PW_secret_key";

var genUsrToken = function (user) {
    var options = {};
    return jwt.signAsync(user, JWT_SECRET_KEY, options)
        .then(function (jwtToken) {
            return jwtToken;
        })
        .catch(function (err) {
            throw new exceptions.tokenGenException();
        });
};

/**for verify Admin Token */
var verifyAdminToken = function(req, res, next) {
    let token = req.headers['authorization']
   
    return jwt.verifyAsync(token, process.env.admin_secret)
        .then((jwtToken) => {
     console.log(jwtToken, "jwtToken from jwthandler");
            req.usr_email = jwtToken.email;
            req._id = jwtToken.adminId;
            req._roleId =jwtToken.roleId;

            next();
        }).catch(function(err) {
            return resHndlr.sendSuccess(res, resHndlr.requestResponse(httpCode.unAuthorized, Msg.statusFalse, userMsg.unAuthAccess, {}))
        });
}


/**for generate reset password Token */
var genResetPasswordAdminToken = function(user) {
    var options = { expiresIn: '24hr' };
    return jwt.signAsync(user, process.env.admin_secret, options)
        .then((jwtToken) => {
            return jwtToken;
        }).catch(function(err) {
            return err;
        });
};
module.exports = {
    genUsrToken: genUsrToken,
    verifyAdminToken,
    genResetPasswordAdminToken
};
