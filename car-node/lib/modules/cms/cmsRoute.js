// ===================================Load Internal Modules================================================================================
const routr = require('express').Router()
const resHndlr = require('../../responseHandler')
const facade = require('./cmsFacade')
const validators = require('./cmsValidators')
const path = require('path')
const jwtHandler = require("../../jwtHandler");
// ====================================Load Modules End======================================================================

// ===================================Admin Start ===========================================================//

/**for fetch List */
// [jwtHandler.verifyAdminToken],
routr.route('/getList')
    .post( (req, res) => {
        facade.getList(req, res).then((result) => {
            resHndlr.sendSuccess(res, result)
        }).catch((err) => {
            resHndlr.sendError(res, err)
        })
    })

/**for add details */
// jwtHandler.verifyAdminToken,
routr.route('/addDetails')
    .post([validators.checkValidateDetails], (req, res) => {
        facade.addDetails(req, res).then((result) => {
            resHndlr.sendSuccess(res, result);
        }).catch((err) => {
            resHndlr.sendError(res, err);
        });
    })

/** for fetch details */
// [jwtHandler.verifyAdminToken],
routr.route('/fetchDetails/:id')
    .get( (req, res) => {
        facade.fetchDetails(req, res).then((result) => {
            resHndlr.sendSuccess(res, result);
        }).catch((err) => {
            resHndlr.sendError(req, err);
        })
    })

/**for update Details */
// [jwtHandler.verifyAdminToken,
routr.route('/updateDetails/:id')
    .put( [validators.validateId, validators.checkValidateDetails], (req, res) => {
        facade.updateDetails(req, res).then((result) => {
            resHndlr.sendSuccess(res, result);
        }).catch((err) => {
            resHndlr.sendError(res, err);
        });
    })

/** for change status */
// jwtHandler.verifyAdminToken,
routr.route('/changeStatus/:id')
    .put([validators.validateId, validators.checkStatus], (req, res) => {
        facade.changeStatus(req, res).then((result) => {
            resHndlr.sendSuccess(res, result);
        }).catch((err) => {
            resHndlr.sendError(res, err);
        });
    })

/**for soft Delete Details */
// jwtHandler.verifyAdminToken,
routr.route('/deleteDetails/:id')
    .delete([validators.validateId], (req, res) => {
        facade.softDeleteDetails(req, res).then((result) => {
            resHndlr.sendSuccess(res, result);
        }).catch((err) => {
            resHndlr.sendError(res, err);
        });
    })

/**for Delete Details */
// jwtHandler.verifyAdminToken, 
routr.route('/deleteDetail/:id')
    .delete([validators.validateId], (req, res) => {
        facade.deleteDetail(req, res).then((result) => {
            resHndlr.sendSuccess(res, result);
        }).catch((err) => {
            resHndlr.sendError(res, err);
        });
    })



// export modules
module.exports = routr