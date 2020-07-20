
//========================== Load Modules Start ===========================
const resHndlr = require('../../responseHandler')
const moduleMsg = require("./contactUsConstants")
const constants = require("../../constants")
const regExValidator = require('../../utils/regularExpression')
const joi = require('@hapi/joi')
    //========================== Load Modules End =============================

// ====================== Front API START =======================================//

/**for validation error handler */
function validationErrorHandler(res, error) {
    console.log(error);
    resHndlr.sendError(res, resHndlr.requestResponse(constants.http_code.badRequest, constants.MESSAGES.statusFalse, error.details ? error.details[0].message : 'There is some issue in validation.', {}));
}

/**check page mandatory field  */
async function checkValidateDetails(req, res, next) {
    try {
        // create schema for email validation
        const schema = joi.object({
            contactus_fullName: joi.string().required()
                .messages({
                    'string.empty': moduleMsg.MESSAGES.emptyContactName,
                    'any.required': moduleMsg.MESSAGES.emptyContactName
                }),
            contactus_email: joi.string().pattern(regExValidator.phoneRegEx).required()
                .messages({
                    'string.pattern.base': moduleMsg.MESSAGES.phoneNumberPattern,
                    'string.empty': moduleMsg.MESSAGES.phoneNumberCantEmpty,
                    'any.required': moduleMsg.MESSAGES.phoneNumberCantEmpty
                }),
            contactus_message: joi.required()
                .messages({
                    'string.empty': moduleMsg.MESSAGES.emptyMessage,
                    'any.required': moduleMsg.MESSAGES.emptyMessage
                }),
            contactus_roleId: joi.required()
                .messages({
                    'string.empty': moduleMsg.MESSAGES.emptyRoleId,
                    'any.required': moduleMsg.MESSAGES.emptyRoleId
                }),
        })
        await schema.validateAsync(req.body);
        next();

    } catch (error) {
        validationErrorHandler(res, error);
    }
}

/** check mongoose ObjectId is valid */
async function validateId(req, res, next) {
    try {
        // create schema for id parameter
        const schema = joi.object({
            id: joi.string().length(24).required()
                .messages({
                    'string.length': moduleMsg.MESSAGES.emptyId,
                    'string.empty': moduleMsg.MESSAGES.emptyId,
                    'any.required': moduleMsg.MESSAGES.emptyId
                })
        });
        await schema.validateAsync(req.params, { allowUnknown: true })
        next();
    } catch (error) {
        validationErrorHandler(res, error);
    }

}

/* check mongoose ObjectId is valid */
async function checkLanguage(req, res, next) {
    try {
        // create schema for id parameter
        const schema = joi.object({
            lang: joi.string().required()
                .messages({
                    'string.empty': moduleMsg.MESSAGES.emptyLang,
                    'any.required': moduleMsg.MESSAGES.emptyLang
                }),
        });
        await schema.validateAsync(req.params, { allowUnknown: true })
        next();
    } catch (error) {
        validationErrorHandler(res, error);
    }
}

//========================== Export Module Start ==============================

module.exports = {
    checkValidateDetails,
    /** for validate empty */
    validateId,
    /** for validate Id */
    checkLanguage
};

//========================== Export Module End ===============================