// ===================================Load Internal Modules===================================================================
const adminRouter = require("express").Router();
const resHndlr = require("../../responseHandler");
const adminFacade = require("./adminFacade");
const validators = require("./adminValidators");
const jwtHandler = require('../../jwtHandler')

// ====================================Load Modules End======================================================================

/**login for admin*/
adminRouter.route('/login')
    .post([validators.validateLoginData], (req, res) => {
        adminFacade.login(req, res).then((result) => {
            resHndlr.sendSuccess(res, result)
        }).catch((err) => {
            resHndlr.sendError(res, err)
        })
    })

/** for generate OTP */
adminRouter.route('/forgotPassword')
    .post([validators.validateResetPassword], (req, res) => {
        adminFacade.forgotPassword(req, res).then(result => {
            resHndlr.sendSuccess(res, result)
        }).catch(err => {
            resHndlr.sendError(res, err)
        })
    })

/** for change status */
adminRouter.route('/changeStatus/:id')
    // jwtHandler.verifyAdminToken
    .put([validators.validateId, validators.checkStatus], (req, res) => {
        adminFacade.changeStatus(req, res).then((result) => {
            resHndlr.sendSuccess(res, result);
        }).catch((err) => {
            resHndlr.sendError(res, err);
        });
    })

/** Reset password */
adminRouter.route('/resetPassword').post(
    // [jwtHandler.verifyAdminToken]
    //validation file
     (req, res) => {
        adminFacade.resetPassword(req).then(result => {

            resHndlr.sendSuccess(res, result)

        }).catch(err => {
            resHndlr.sendError(res, err)
        });
    });

//========================== Comman API start =================================
// adminRouter.route('/editProfile/:id')
//     .put([jwtHandler.verifyAdminToken,validators.validateEditUserProfile, validators.validateId], (req, res) => {
//         adminFacade.editProfile(req, res).then((result) => {
//             resHndlr.sendSuccess(res, result);
//         }).catch((err) => {
//             resHndlr.sendError(res, err);
//         })
//     })


//========================== Comman API end ===================================
//export modules   
module.exports = adminRouter;