// ===================================Load Internal Modules===================================================================
const moduleMsg = require('./adminConstants');
const constants = require('../../constants');
const resHndlr = require('../../responseHandler')
const regExValidator = require('../../utils/regularExpression')
const joi = require('@hapi/joi')

//========================== Load Modules End =============================

/**for validation error handler */
function validationErrorHandler(res, error) {
    console.log('User Module ErrorLog : ', error); // Dont remove this line of console.
    resHndlr.sendError(res, resHndlr.requestResponse(constants.http_code.badRequest, constants.MESSAGES.statusFalse, error.details ? error.details[0].message : 'There is some issue in validation.', {}));
}

/**check page mandatory field  */
async function validateLoginData(req, res, next) {
    try {
        // create schema for email validation
        const schema = joi.object({
            user_email: joi.string().pattern(regExValidator.emailRegEx).required()
                .messages({
                    'string.pattern.base': moduleMsg.MESSAGES.emailCantEmptyInvalid,
                    'string.empty': moduleMsg.MESSAGES.emailCantEmptyInvalid,
                    'any.required': moduleMsg.MESSAGES.emailCantEmptyInvalid
                }),
            // .pattern(regExValidator.passwordRegEx)
            user_password: joi.string().pattern(regExValidator.passwordRegEx).required()
                .messages({
                    'string.pattern.base': moduleMsg.MESSAGES.passwordPattern,
                    'string.empty': moduleMsg.MESSAGES.passwordCantEmpty,
                    'any.required': moduleMsg.MESSAGES.passwordCantEmpty
                }),
        })
        await schema.validateAsync(req.body);
        next();

    } catch (error) {
        validationErrorHandler(res, error);
    }
}


/**check page mandatory field  */
async function validateResetPassword(req, res, next) {
    try {
        // create schema for email validation
        const schema = joi.object({
            user_email: joi.string().pattern(regExValidator.emailRegEx).required()
                .messages({
                    'string.pattern.base': moduleMsg.MESSAGES.emailCantEmptyInvalid,
                    'string.empty': moduleMsg.MESSAGES.emailCantEmptyInvalid,
                    'any.required': moduleMsg.MESSAGES.emailCantEmptyInvalid
                }),
        })
        await schema.validateAsync(req.body);
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
            user_status: joi.string().required()
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

//========================== Export Module Start ==============================

module.exports = {
    validateLoginData,
    validateResetPassword,
    checkStatus,
    validateId
}

//========================== Export Module End ===============================