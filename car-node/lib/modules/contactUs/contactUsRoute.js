// ===================================Load Internal Modules================================================================================
const routr = require('express').Router()
const resHndlr = require('../../responseHandler')
const facade = require('./contactUsFacade')
const jwtHandler = require("../../jwtHandler");
const validators = require("./contactUsValidators")
    // ====================================Load Modules End======================================================================


// ===================================Admin ===========================================================//
/**for fetch List */
routr.route('/getList')
    .post([jwtHandler.verifyAdminToken], (req, res) => {
        facade.getList(req, res).then((result) => {
            resHndlr.sendSuccess(res, result)
        }).catch((err) => {
            resHndlr.sendError(res, err)
        })
    })


/** for fetch details */
routr.route('/fetchDetails/:id')
    .get([jwtHandler.verifyAdminToken], (req, res) => {
        facade.fetchDetails(req, res).then((result) => {
            resHndlr.sendSuccess(res, result);
        }).catch((err) => {
            resHndlr.sendError(req, err);
        })
    })

// ===================================Admin END ===========================================================//
// jwtHandler.verifyAdminToken,
// ====================== Front API =======================================//
routr.route('/sendInquiry/:lang').post([jwtHandler.verifyAdminToken, validators.checkValidateDetails, validators.checkLanguage], (req, res) => {
        facade.addDetails(req, res).then((result) => {
            resHndlr.sendSuccess(res, result);
        }).catch((err) => {
            resHndlr.sendError(req, err);
        })
    })
    // ====================== Front API END =======================================//
    // export modules
module.exports = routr