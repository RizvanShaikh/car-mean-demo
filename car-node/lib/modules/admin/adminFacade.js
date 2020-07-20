//========================== Load Modules Start =======================
// 'use strict';
var adminService = require('./adminService');
const resHandlr = require('../../responseHandler');
const constants = require('../../constants');
const adminMsg = require('./adminConstants');

//========================== Load Modules End ==============================================

/**calling service login function from facade
 * @function login
 * 
 */
function login(req, res) {
    return adminService.login(req, res)
        .then((data) => {
            if (data && data != null) {
                if (data == 1) {
                    return resHandlr.requestResponse(constants.http_code.dataNotFound, constants.MESSAGES.statusFalse, adminMsg.MESSAGES.dataNotFound, {});
                } else if (data == 2) {
                    return resHandlr.requestResponse(constants.http_code.badRequest, constants.MESSAGES.statusFalse, adminMsg.MESSAGES.passwordInvalid, {});
                } else {
                    return resHandlr.requestResponse(constants.http_code.ok, constants.MESSAGES.statusTrue, adminMsg.MESSAGES.loginSuccessfully, data);
                }
            } else {
                return resHandlr.requestResponse(constants.http_code.badRequest, constants.MESSAGES.statusFalse, adminMsg.MESSAGES.issueWithLogin, {});
            }
        }).catch((er) => {
            return resHandlr.requestResponse(constants.http_code.badRequest, constants.MESSAGES.statusFalse, adminMsg.MESSAGES.issueWithforgotPasword, {})
        })
}

/** calling service forgotPassword function from facade */
function forgotPassword(req, res) {
    return adminService.forgotPassword(req, res).then(data => {
        if (data && data != null) {
            if (data == 1) {
                return resHandlr.requestResponse(constants.http_code.badRequest, constants.MESSAGES.statusFalse, adminMsg.MESSAGES.dataNotFound, {})
            } else {
                return resHandlr.requestResponse(constants.http_code.ok, constants.MESSAGES.statusTrue, adminMsg.MESSAGES.emailSended, data)
            }
        } else {
            return resHandlr.requestResponse(constants.http_code.badRequest, constants.MESSAGES.statusFalse, adminMsg.MESSAGES.issueWithforgotPasword, {})
        }
    }).catch((er) => {
        return resHandlr.requestResponse(constants.http_code.badRequest, constants.MESSAGES.statusFalse, adminMsg.MESSAGES.issueWithforgotPasword, {})
    })
}


function isAdmin(req) {
    return adminService.isAdmin(req).then((data) => {
        if (data == 1) {
            return resHandlr.requestResponse(constants.http_code.badRequest, constants.MESSAGES.statusFalse, adminMsg.MESSAGES.unauthorizedAccess, {})
        } else {
            return resHandlr.requestResponse(constants.http_code.ok, constants.MESSAGES.statusTrue, adminMsg.MESSAGES.authorizedAccess, {})
        }
    }).catch((error) => {
        console.log(error);
        return resHandlr.requestResponse(constants.http_code.badRequest, constants.MESSAGES.statusFalse, constants.MESSAGES.intrnlSrvrErr, {})
    });
}


function resetPassword(req) {
    return adminService.resetPassword(req).then((data) => {
        if (data == 1) {
            return resHandlr.requestResponse(constants.http_code.badRequest, constants.MESSAGES.statusFalse, adminMsg.MESSAGES.passwordMismatch, {})
        } else if (data == 2) {
            return resHandlr.requestResponse(constants.http_code.badRequest, constants.MESSAGES.statusFalse, adminMsg.MESSAGES.resetPasswordError, {})
        } else {
            return resHandlr.requestResponse(constants.http_code.ok, constants.MESSAGES.statusTrue, adminMsg.MESSAGES.resetPasswordSuccess, {})
        }
    }, (error) => {
        return resHandlr.requestResponse(constants.http_code.badRequest, constants.MESSAGES.statusFalse, adminMsg.MESSAGES.resetPasswordError, {})
    });
}


function changeStatus(req) {
    return adminService.changeStatus(req).then((data) => {
        if (data === 1) {
            return resHandlr.requestResponse(constants.http_code.dataNotFound, constants.MESSAGES.statusFalse, constants.MESSAGES.dataNotFound, {})
        } else if (data == 2) {
            return resHandlr.requestResponse(constants.http_code.badRequest, constants.MESSAGES.statusFalse, adminMsg.MESSAGES.alreadyActive, {})
        } else if (data == 3) {
            return resHandlr.requestResponse(constants.http_code.badRequest, constants.MESSAGES.statusFalse, adminMsg.MESSAGES.alreadyInActive, {})
        } else if (data == 4) {
            return resHandlr.requestResponse(constants.http_code.ok, constants.MESSAGES.statusTrue, adminMsg.MESSAGES.change, {})
        } else {
            return resHandlr.requestResponse(constants.http_code.badRequest, constants.MESSAGES.statusFalse, adminMsg.MESSAGES.updateStateErr, {})
        }
    }).catch(er => {
        return resHandlr.requestResponse(constants.http_code.badRequest, constants.MESSAGES.statusFalse, adminMsg.MESSAGES.updateStateErr, {})
    })
}

//========================== Comman API start =================================
function editProfile(req) {
    return adminService.editProfile(req).then((data) => {
        if (data == 1) {
            return resHandlr.requestResponse(constants.http_code.dataNotFound, constants.MESSAGES.statusFalse, adminMsg.MESSAGES.userNotFound, {});
        } else if (data == 2) {
            return resHandlr.requestResponse(constants.http_code.dataNotFound, constants.MESSAGES.statusFalse, adminMsg.MESSAGES.defPhoneNumber, {})
        } else {
            return resHandlr.requestResponse(constants.http_code.ok, constants.MESSAGES.statusTrue, adminMsg.MESSAGES.listingSuccess, data)
        }
    }).catch((error) => {
        return resHandlr.requestResponse(constants.http_code.badRequest, constants.MESSAGES.statusFalse, adminMsg.MESSAGES.issueWithUpdate, {})
    })
}

//========================== Comman API end ===================================

/** calling service getList function from facade
 * @function getList
*/
function getOperatorList(req,res) {
    return adminService.getOperatorList(req).then((data) => {
        if (data && (data != '' || data != null)) {
            return resHandlr.requestResponse(constants.http_code.ok,constants.MESSAGES.statusTrue,constants.MESSAGES.ok,data)
        } else {
            return resHandlr.requestResponse(constants.http_code.dataNotFound,constants.MESSAGES.statusFalse,constants.MESSAGES.dataNotFound,[])
        }
    }).catch((er) => {
        return resHandlr.requestResponse(constants.http_code.dataNotFound,constants.MESSAGES.statusFalse,constants.MESSAGES.intrnlSrvrErr,[])
    })
}



//========================== Export Module Start ==============================

module.exports = {
    login,
    forgotPassword,
    isAdmin,
    resetPassword,
    changeStatus,
    editProfile,
    getOperatorList

};

//========================== Export Module End ===============================