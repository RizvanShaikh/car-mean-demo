//========================== Load Modules Start ===========================
const userMapper = require("./userMapper");
const resHndlr = require('../../responseHandler');
const userMsg = require("./userConstants").MESSAGES
const constants = require("../../constants");
const regExValidator = require('../../utils/regularExpression');
const joi = require('@hapi/joi');
//========================== Load Modules End =============================


//========================== Export Module Start ===========================
/**for validation error handler */
function validationErrorHandler(res, error) {
    resHndlr.sendError(res, userMapper.requestResponse(constants.http_code.badRequest,constants.MESSAGES.statusFalse, error.details ? error.details[0].message : 'There is some issue in validation.',{}));
}

// /**for check phone number */
// async function validatePhoneNumber(req, res, next) { 
//     try {
//         // create schema for email validation
//         const schema = joi.object({
//             user_phoneNumber: joi.string().pattern(regExValidator.phoneRegEx).required()
//             .messages({
//                     'string.pattern.base': userMsg.phoneNumberPattern,                        
//                     'string.empty': userMsg.phoneNumberCantEmpty,
//                     'any.required': userMsg.phoneNumberCantEmpty
//                 }),
//         })
//         await schema.validateAsync(req.body);
//         next();

//     } catch (error) {
//         validationErrorHandler(res, error);
//     }
// }

/**for check register details */
async function validateRegister(req, res, next) { 
    try {
        // create schema for validation
        const schema = joi.object({
           user_firstName: joi.string().required()
               .messages({
                'string.empty': userMsg.firstNameCantEmpty,
                'any.required': userMsg.firstNameCantEmpty
            }),
            user_lastName: joi.string().required()
                .messages({
                        'string.empty': userMsg.lastNameCantEmpty,
                        'any.required': userMsg.lastNameCantEmpty
                    }),
            user_email: joi.string().required().pattern(regExValidator.emailRegEx)
                .messages({
                        'string.pattern.base': userMsg.errEmail,
                        'string.empty': userMsg.errEmail,
                        'any.required': userMsg.errEmail
                    }),      
            user_phoneNumber: joi.string().pattern(regExValidator.phoneRegEx).required()
                .messages({
                        'string.empty': userMsg.phoneNumberCantEmpty,
                        'any.required': userMsg.phoneNumberCantEmpty,
                        'string.pattern.base': userMsg.phoneNumberPattern,                        
                    }),
            user_password: joi.string().pattern(regExValidator.passwordRegEx).required()
                .messages({
                    'string.pattern.base': userMsg.passwordPattern,                        
                    'string.empty': userMsg.passwordCantEmpty,
                    'any.required': userMsg.passwordCantEmpty
                }),
            user_confirmPassword: joi.string().pattern(regExValidator.passwordRegEx)
                .messages({
                    'string.pattern.base': userMsg.confirmPasswordPattern,                        
                    'string.empty': userMsg.confirmPasswordCantEmpty,
                    'any.required': userMsg.confirmPasswordCantEmpty
                })
        })
        await schema.validateAsync(req.body);
        next();

    } catch (error) {
        validationErrorHandler(res, error);
    }
}

// /**for check login details */
// async function validateLogin(req, res, next) { 
//     try {
//         // create schema for email validation
//         const schema = joi.object({
//             user_phoneNumber: joi.string().pattern(regExValidator.phoneRegEx).required()
//                 .messages({
//                         'string.pattern.base': userMsg.phoneNumberPattern,                        
//                         'string.empty': userMsg.phoneNumberCantEmpty,
//                         'any.required': userMsg.phoneNumberCantEmpty
//                     }),
//             user_password:joi.string().pattern(regExValidator.passwordRegEx).required()
//                 .messages({
//                     'string.pattern.base': userMsg.passwordPattern,                        
//                     'string.empty': userMsg.passwordCantEmpty,
//                     'any.required': userMsg.passwordCantEmpty
//                 }),
//             user_accountType:joi.string().required()
//                 .messages({
//                     'string.empty': userMsg.accountTypeCantEmpty,
//                     'any.required': userMsg.accountTypeCantEmpty
//                 }),    
//             user_deviceId:joi.string().required()
//                 .messages({
//                     'string.empty': userMsg.emptyDeviceId,
//                     'any.required': userMsg.emptyDeviceId
//                  }),
                        
//             user_deviceType:joi.string().required()
//                 .messages({
//                     'string.empty': userMsg.emptyDeviceType,
//                     'any.required': userMsg.emptyDeviceType
//                 }),
//             user_fcmToken:joi.string().required()
//                 .messages({
//                     'string.empty': userMsg.emptyFcmToken,
//                     'any.required': userMsg.emptyFcmToken
//                 }),
//         })
//         await schema.validateAsync(req.body,{ allowUnknown: true });
//         next();

//     } catch (error) {
       
//         validationErrorHandler(res, error);
//     }
// }

// /**for check reset password details */
// async function validateResetPassword(req,res,next){
//     try {
//         // create schema for email validation
//         const schema = joi.object({
//             user_id:joi.string().length(24).required()
//                 .messages({
//                     'string.length': userMsg.invalidUserId,                        
//                     'string.empty': userMsg.invalidUserId,
//                     'any.required': userMsg.invalidUserId
//                 }),
//             user_phoneNumber: joi.string().pattern(regExValidator.phoneRegEx).required()
//                 .messages({
//                     'string.pattern.base': userMsg.phoneNumberPattern,                        
//                     'string.empty': userMsg.phoneNumberCantEmpty,
//                     'any.required': userMsg.phoneNumberCantEmpty
//                 }),
//             user_password:joi.string().pattern(regExValidator.passwordRegEx).required()
//                 .messages({
//                     'string.pattern.base': userMsg.passwordPattern,                        
//                     'string.empty': userMsg.passwordCantEmpty,
//                     'any.required': userMsg.passwordCantEmpty
//                 }),
//         })
//         await schema.validateAsync(req.body);
//         next();
//     } catch (error) {
//         validationErrorHandler(res, error);
//     }
// }

/**check page mandatory field  */
async function validateDetail(req, res, next) {
    try {
        const schema = joi.object({
            user_firstName: joi.string().required()
                .messages({
                 'string.empty': userMsg.firstNameCantEmpty,
                 'any.required': userMsg.firstNameCantEmpty
             }),
             user_lastName: joi.string().required()
                 .messages({
                         'string.empty': userMsg.lastNameCantEmpty,
                         'any.required': userMsg.lastNameCantEmpty
                     }),
             user_email: joi.string().required().pattern(regExValidator.emailRegEx)
                 .messages({
                         'string.pattern.base': userMsg.errEmail,
                         'string.empty': userMsg.errEmail,
                         'any.required': userMsg.errEmail
                     }),      
             user_phoneNumber: joi.string().pattern(regExValidator.phoneRegEx).required()
                 .messages({
                         'string.empty': userMsg.phoneNumberCantEmpty,
                         'any.required': userMsg.phoneNumberCantEmpty,
                         'string.pattern.base': userMsg.phoneNumberPattern,                        
                     }),
             user_password: joi.string().pattern(regExValidator.passwordRegEx).required()
                 .messages({
                     'string.pattern.base': userMsg.passwordPattern,                        
                     'string.empty': userMsg.passwordCantEmpty,
                     'any.required': userMsg.passwordCantEmpty
                 }),
             user_confirmPassword: joi.string().pattern(regExValidator.passwordRegEx)
                 .messages({
                     'string.pattern.base': userMsg.confirmPasswordPattern,                        
                     'string.empty': userMsg.confirmPasswordCantEmpty,
                     'any.required': userMsg.confirmPasswordCantEmpty
                 }),
             user_accountType: joi.string()
             .messages({
                'string.empty': userMsg.typeEmpty,
                'any.required': userMsg.typeEmpty
            })
                    
         })
         await schema.validateAsync(req.body);
         next();
      
    } catch (err) {
        validationErrorHandler(res, err)
    }
}


/** check mongoose ObjectId is valid */
async function validateId(req, res, next) {
    try {
        // create schema for id parameter
        const schema = joi.object({
            id: joi.string().length(24).required()
                .messages({
                    'string.length': userMsg.MESSAGES.emptyId,
                    'string.empty': userMsg.MESSAGES.emptyId,
                    'any.required': userMsg.MESSAGES.emptyId
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
            user_status: joi.string().required()
                .messages({
                    'string.empty': userMsg.MESSAGES.emptyStatus,
                    'any.required': userMsg.MESSAGES.emptyStatus
                }),
        })
        await schema.validateAsync(req.body);
        next();

    } catch (error) {
        validationErrorHandler(res, error);
    }
}

//========================== Export Module Start ==============================

module.exports = {
    // validatePhoneNumber,
    // validateResetPassword,
    validateRegister,
    validateId,
    validateDetail,
    checkStatus
  
    // validateLogin
};

//========================== Export Module End ===============================

