'use strict'

//= ========================= Load Modules Start =======================
const service = require('./contactUsService')
const resHandlr = require('../../responseHandler')
const constants = require("../../constants")
const moduleMsg = require('./contactUsConstants').MESSAGES

//= ========================= Load Modules End ==============================================

/** calling service getList function from facade
 * @function getList
 */
function getList(req, res) {
    return service.getList(req).then((data) => {
        if (data && (data != '' || data != null)) {
            return resHandlr.requestResponse(constants.http_code.ok, constants.MESSAGES.statusTrue, constants.MESSAGES.ok, data)
        } else {
            return resHandlr.requestResponse(constants.http_code.dataNotFound, constants.MESSAGES.statusFalse, constants.MESSAGES.dataNotFound, [])
        }
    }).catch((er) => {
        return resHandlr.requestResponse(constants.http_code.dataNotFound, constants.MESSAGES.statusFalse, constants.MESSAGES.intrnlSrvrErr, [])
    })
}

/**
 * calling service fetch details
 * @param {object} req request object 
 * @param {object} res response object
 */
function fetchDetails(req, res) {
    return service.fetchDetails(req, res)
        .then((data) => {
            if (data && (data != '' || data != null) && data !== 1) {
                return resHandlr.requestResponse(constants.http_code.ok, constants.MESSAGES.statusTrue, constants.MESSAGES.ok, data)
            } else {
                return resHandlr.requestResponse(constants.http_code.dataNotFound, constants.MESSAGES.statusFalse, constants.MESSAGES.dataNotFound, {})
            }
        }).catch((er) => {
            return resHandlr.requestResponse(constants.http_code.dataNotFound, constants.MESSAGES.statusFalse, constants.MESSAGES.intrnlSrvrErr, {})
        })
}
// ================================== Front API =========================//

/** calling service addDetails function from facade
 * @function addDetails
 */
function addDetails(req, res) {
    return service.addDetails(req, res)
        .then((data) => {
            // console.log(data)
            console.log(data && (data != '' || data != null));
            if (data && (data != '' || data != null)) {
                return resHandlr.requestResponse(constants.http_code.ok, constants.MESSAGES.statusTrue, moduleMsg.contactUsInquirySended, {})
            } else {
                return resHandlr.requestResponse(constants.http_code.dataNotFound, constants.MESSAGES.statusFalse, constants.MESSAGES.dataNotFound, {})
            }
        }).catch((er) => {
            return resHandlr.requestResponse(constants.http_code.dataNotFound, constants.MESSAGES.statusFalse, constants.MESSAGES.intrnlSrvrErr, {})
        })
}
// ================================== Front API END =========================//

//= ========================= Export Module Start ==============================

module.exports = {
    getList,
    /**calling service get List function from facade */
    addDetails,
    /**calling service add Details function from facade */
    fetchDetails,
    /** calling service fetch Details details function from facade */
}

//= ========================= Export Module End ===============================