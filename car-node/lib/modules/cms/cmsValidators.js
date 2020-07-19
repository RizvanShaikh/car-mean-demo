//========================== Load Modules Start ===========================
const resHndlr = require('../../responseHandler')
const moduleMsg = require("./cmsConstants")
const constants = require("../../constants")
const joi = require('@hapi/joi');
//========================== Load Modules End =============================

/**for validation error handler */
function validationErrorHandler(res, error) {
    resHndlr.sendError(res, resHndlr.requestResponse(constants.http_code.badRequest, constants.MESSAGES.statusFalse, error.details ? error.details[0].message : 'There is some issue in validation.', {}));
}

/**check page mandatory field  */
async function checkValidateDetails(req, res, next) {
    try {
        // create schema for email validation
        const schema = joi.object({
            cms_title: joi.required()
                .messages({
                    'empty': moduleMsg.MESSAGES.emptyCmsTitle,
                    'any.required': moduleMsg.MESSAGES.emptyCmsTitle
                }),
            cms_type: joi.string().required()
                .messages({
                    'string.empty': moduleMsg.MESSAGES.emptyCmsType,
                    'any.required': moduleMsg.MESSAGES.emptyCmsType
                }),
            cms_content: joi.required()
                .messages({
                    'empty': moduleMsg.MESSAGES.emptyContent,
                    'any.required': moduleMsg.MESSAGES.emptyContent
                }),
        })
        await schema.validateAsync(req.body);
        next();

    } catch (error) {
        validationErrorHandler(res, error);
    }
}

/**for check params id */
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



/**check status field  */
async function checkStatus(req, res, next) {
    try {
        // create schema for email validation
        const schema = joi.object({
            cms_status: joi.string().required()
                .messages({
                    'string.empty': moduleMsg.MESSAGES.emptyStatus,
                    'any.required': moduleMsg.MESSAGES.emptyStatus
                }),
        })
        await schema.validateAsync(req.body);
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
    checkStatus,
    /**for check status */
    checkLanguage
};

//========================== Export Module End ===============================