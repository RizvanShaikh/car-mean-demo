
//========================== Load Modules Start ====================================

//========================== Load Modules End ==============================================
const  constants = require('../../constants');
/** Request Response 
 * 
 * @param {string} message response message
 *  @param {object} data response Data
 */
function requestResponse(code,status,message,data) {
    var responseObj = {
        "responseCode": code,
        "responseStatus":status,
        "responseMessage": message,
        "responseData": data
    }
    return responseObj;
}

function registerAndLoginMappingRes(register){
    return {
        user_id :register._id,
        user_fullName:register.user_fullName,
        user_profileImage:register.user_profileImage,
        user_phoneNumber:register.user_phoneNumber,
        user_language:register.user_language,
        user_isdCode:register.user_isdCode,
        country_name:register.country_name,
        country_currency:register.country_currency,
        isProfileCreated: register.user_nickName && register.user_nickName != ""?true:false,
        user_isActiveSubscription:register.user_isActiveSubscription, //TODO:check active subscription
        user_referalCode:register.user_referalCode,
        user_trialPackExpiresOn:register.user_trialPackExpiresOn,
        freeTrialDays : process.env.TRIALDAYS,
        user_jwt:register.user_jwt,
        user_parentCode:register.user_parentCode,
        user_parentCodeExpireTime:register.user_parentCodeExpireTime,
        user_studentIds:register.user_studentIds,
        user_subscription: getActiveSubcription(register.user_subscriptions)
    }

}

function getActiveSubcription(data){
    if(data.length){
        var subscription = data.filter(x => x.status==constants.STATUS.ACTIVE)
        if(subscription.length){
            return {subscriptionStartOn:subscription[0].subscriptionStartOn,subscriptionExpireOn:subscription[0].subscriptionExpireOn,status:subscription[0].status};
        }else{
            return {}
        }
       return subscription;
    }else{
        return {}
    }
}

//========================== Export Module Start ==============================

module.exports = {
    requestResponse,/**Request Response**/
    registerAndLoginMappingRes,/**Request Response for login and registration**/
};

//========================== Export Module End ===============================