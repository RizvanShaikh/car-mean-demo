'use strict'

//= ========================= Load Modules Start =======================
const userMapper = require('./userMapper')
const userMsg = require('./userConstants');
const constants = require('../../constants');
const usrService = require('./userService')

//= ========================= Load Modules End ==============================================

/** calling service signupUser function from facade
 * @function signup
 *
 */
function signup(req, res) {
  return usrService.signupUser(req, res).then(result => {
    // return result
    if (result == 1) {
      return userMapper.requestResponse(constants.http_code.badRequest, constants.MESSAGES.statusFalse, userMsg.MESSAGES.accountTypeCantEmpty, {})
    } else if (result == 2) {
      return userMapper.requestResponse(constants.http_code.badRequest, constants.MESSAGES.statusFalse, userMsg.MESSAGES.exist, {})
    } else if (result == 3) {
      return userMapper.requestResponse(constants.http_code.internalServerError, constants.MESSAGES.statusFalse, userMsg.MESSAGES.internalServerError, {});
    } else {
      return userMapper.requestResponse(constants.http_code.ok, constants.MESSAGES.statusTrue, userMsg.MESSAGES.registerSuccessfully, result)
    }
  }).catch((er) => {
    console.log(er);
    return userMapper.requestResponse(constants.http_code.internalServerError, constants.MESSAGES.statusFalse, userMsg.MESSAGES.internalServerError, {});
  })
}


/** calling service login function from facade
 * @function login
 * login via phoneNumbers
 * @param {Object} loginInfo login details
 */
function login(req,loginInfo) {
  return usrService.login(req,loginInfo).then(result => {
    if (result == 1) {
      return userMapper.requestResponse(constants.http_code.dataNotFound, constants.MESSAGES.statusFalse, userMsg.MESSAGES.dataNotFound, {})
    } else if (result == 2) {
      return userMapper.requestResponse(constants.http_code.badRequest, constants.MESSAGES.statusFalse, userMsg.MESSAGES.accountTypeCantEmpty, {})
    } else if (result == 3) {
      return userMapper.requestResponse(constants.http_code.badRequest, constants.MESSAGES.statusFalse, userMsg.MESSAGES.passwordCantEmpty, {})
    } else if (result == 4) {
      return userMapper.requestResponse(constants.http_code.badRequest, constants.MESSAGES.statusFalse, userMsg.MESSAGES.accountInactivated, {})
    } else {
      return userMapper.requestResponse(constants.http_code.ok, constants.MESSAGES.statusTrue, userMsg.MESSAGES.loginSuccessfully, result)
    }
  })
}


/** calling service logout function from facade
 *
 * @param {*} req
 * @param {*} res
 */
function logout(req, res) {
  return usrService.logout(req, res).then((result) => {
    if (result == 1) {
      return userMapper.requestResponse(constants.http_code.dataNotFound, constants.MESSAGES.statusFalse, userMsg.MESSAGES.dataNotFound, {})
    } else {
      return userMapper.requestResponse(constants.http_code.ok, constants.MESSAGES.statusTrue, userMsg.MESSAGES.logoutSuccessfully, {})
    }
  })
}


/** calling service check user exist function from facade 
 *  @function checkUserExist
 *
*/
function checkUserExist(req, res) {
  return usrService.checkUserExist(req, res).then(result => {
    if (result == 1) {
      return userMapper.requestResponse(constants.http_code.badRequest, constants.MESSAGES.statusFalse, userMsg.MESSAGES.exist, {})
    } else {
      return userMapper.requestResponse(constants.http_code.ok, constants.MESSAGES.statusTrue, userMsg.MESSAGES.otpSend, result)
    }
  })
}



/** calling service get all Provider list function from facade */
function getAllProviderList(req, res) {
  return usrService.getAllProviderList(req, res).then(data => {
    if (data == 1) {
      return userMapper.requestResponse(constants.http_code.dataNotFound, constants.MESSAGES.statusFalse, constants.MESSAGES.dataNotFound, [])
    } else {
      return userMapper.requestResponse(constants.http_code.ok, constants.MESSAGES.statusTrue, userMsg.MESSAGES.providerListSuccess, data)
    }
  }).catch((er) => {
    return userMapper.requestResponse(constants.http_code.badRequest, constants.MESSAGES.statusFalse, userMsg.MESSAGES.providerListErr, [])

  })
}

/** calling service get all Provider list function from facade */
function getAllBuyerList(req, res) {
  return usrService.getAllBuyerList(req, res).then(data => {
    if (data == 1) {
      return userMapper.requestResponse(constants.http_code.dataNotFound, constants.MESSAGES.statusFalse, constants.MESSAGES.dataNotFound, [])
    } else {
      return userMapper.requestResponse(constants.http_code.ok, constants.MESSAGES.statusTrue, userMsg.MESSAGES.buyerListSuccess, data)
    }
  }).catch((er) => {
    return userMapper.requestResponse(constants.http_code.badRequest, constants.MESSAGES.statusFalse, userMsg.MESSAGES.buyerListErr, [])

  })
}


/** calling service generateOtp function from facade 
 *  
 *
*/
function generateOtp(req, res) {
  return usrService.generateOtp(req, res).then(result => {
    if (result && result != null) {
      return userMapper.requestResponse(constants.http_code.ok, constants.MESSAGES.statusTrue, userMsg.MESSAGES.otpSend, result);
    } else {
      return userMapper.requestResponse(constants.http_code.badRequest, constants.MESSAGES.statusFalse, userMsg.MESSAGES.issueWithOtpSend, {})
    }
  })
}

/** calling service check user exist function from facade 
 *  @function forgotPassword
 *
*/
function forgotPassword(req, res) {
  return usrService.forgotPassword(req, res).then(result => {
    if (result == 1) {
      return userMapper.requestResponse(constants.http_code.dataNotFound, constants.MESSAGES.statusFalse, userMsg.MESSAGES.dataNotFound, {})
    } else if (result == 2) {
      return userMapper.requestResponse(constants.http_code.badRequest, constants.MESSAGES.statusFalse, userMsg.MESSAGES.accountInactivated, {})
    } else {
      return userMapper.requestResponse(constants.http_code.ok, constants.MESSAGES.statusTrue, userMsg.MESSAGES.otpSend, result)
    }
  })
}
/** calling service resetPassword function from facade 
 *  @function resetPassword
 *
*/
function resetPassword(req, res) {
  return usrService.resetPassword(req, res).then(result => {
    if (result == 1) {
      return userMapper.requestResponse(constants.http_code.dataNotFound, constants.MESSAGES.statusFalse, userMsg.MESSAGES.userNotFound, {})
    } else {
      return userMapper.requestResponse(constants.http_code.ok, constants.MESSAGES.statusTrue, userMsg.MESSAGES.passwordUpdated, {})
    }
  })
}

/** calling service updatePassword function from facade 
 *  @function updatePassword
 *
*/
function updatePassword(req, res) {
  return usrService.updatePassword(req, res).then(result => {
    if (result == 1) {
      return userMapper.requestResponse(constants.http_code.dataNotFound, constants.MESSAGES.statusFalse, userMsg.MESSAGES.userNotFound, {})
    } else if (result == 2) {
      return userMapper.requestResponse(constants.http_code.badRequest, constants.MESSAGES.statusFalse, userMsg.MESSAGES.invalidOldPass, {})
    } else {
      return userMapper.requestResponse(constants.http_code.ok, constants.MESSAGES.statusTrue, userMsg.MESSAGES.passwordUpdated, {})
    }
  })
}


/** calling service createUserProfile function from facade 
 *  @function createUserProfile
 *
*/
function createUserProfile(req, res) {
  return usrService.createUserProfile(req, res).then(result => {
    if (result == 1) {
      return userMapper.requestResponse(constants.http_code.dataNotFound, constants.MESSAGES.statusFalse, userMsg.MESSAGES.userNotFound, {})
    } else if (result == 2) {
      return userMapper.requestResponse(constants.http_code.badRequest, constants.MESSAGES.statusFalse, userMsg.MESSAGES.nickNameUnique, {})
    } else {
      return userMapper.requestResponse(constants.http_code.ok, constants.MESSAGES.statusTrue, userMsg.MESSAGES.profileCreated, result);
    }
  })
}

/** calling service fetch student details function from facade */
function fetchUserDetails(req, res) {
  return usrService.fetchUserDetails(req, res).then(result => {
    if (result && (result != '' || result != null)) {
      return userMapper.requestResponse(constants.http_code.ok, constants.MESSAGES.statusTrue, userMsg.MESSAGES.getUserDetailSuccess, result)
    } else {
      return userMapper.requestResponse(constants.http_code.dataNotFound, constants.MESSAGES.statusFalse, userMsg.MESSAGES.dataNotFound, {})
    }
  }).catch(err => {
    return userMapper.requestResponse(constants.http_code.badRequest, constants.MESSAGES.statusFalse, userMsg.MESSAGES.getUserDetailErr, {})
  })
}

/**calling service update detail function from facade 
 * @function updateDetails
 */
function updateDetails(req, res) {
  return usrService.updateDetails(req, res).then((data) => {
      if (data && (data != '' || data != null)) {
          return userMapper.requestResponse(constants.http_code.ok, constants.MESSAGES.statusTrue, userMsg.MESSAGES.updated,data);
      } else {
          return userMapper.requestResponse(constants.http_code.dataNotFound, constants.MESSAGES.statusFalse, userMsg.MESSAGES.dataNotFound, {});
      }
  }).catch((err) => {
      return userMapper.requestResponse(constants.http_code.dataNotFound, constants.MESSAGES.statusFalse, userMsg.MESSAGES.updateErr, {});
  })
}


/** calling service change status function from facade
 * @function changeStatus
*/
function changeStatus(req,res) {
  return usrService.changeStatus(req,res)
  .then((data) => {
       if (data === 1) {
          return userMapper.requestResponse(constants.http_code.dataNotFound, constants.MESSAGES.statusFalse, userMsg.MESSAGES.dataNotFound, {})
      } else if (data == 2) {
          return userMapper.requestResponse(constants.http_code.badRequest, constants.MESSAGES.statusFalse, userMsg.MESSAGES.alreadyActive, {})
      } else if (data == 3) {
          return userMapper.requestResponse(constants.http_code.badRequest, constants.MESSAGES.statusFalse, userMsg.MESSAGES.alreadyInActive, {})
      } else {
          return userMapper.requestResponse(constants.http_code.ok, constants.MESSAGES.statusTrue, userMsg.MESSAGES.change, data)
      }

  }).catch((er) => {
      return userMapper.requestResponse(constants.http_code.dataNotFound,constants.MESSAGES.statusFalse,constants.MESSAGES.intrnlSrvrErr,{})
  })
}

/** calling service Delete Details function from facade
 * @function deleteDetails
*/
function deleteDetail(req,res) {
  return usrService.deleteDetail(req,res).then((result) => {
      if(result == 1){
          return userMapper.requestResponse(constants.http_code.ok,constants.MESSAGES.statusTrue,userMsg.MESSAGES.deleted,{})   
      }else{
          return userMapper.requestResponse(constants.http_code.dataNotFound,constants.MESSAGES.statusFalse,userMsg.MESSAGES.badRequest,{})
      }
  }).catch((error)=>{
      return userMapper.requestResponse(constants.http_code.dataNotFound,constants.MESSAGES.statusFalse,constants.MESSAGES.intrnlSrvrErr,{})
  });
}

//= ========================= Export Module Start ==============================

module.exports = {
  signup, /* User registration parent and student  */
  checkUserExist, /* User exist or not */
  generateOtp, /* Generate otp */
  login, /* Login parent or student */
  forgotPassword,/* Forgot Password */
  resetPassword, /* resetPassword*/
  updatePassword,/* Update Password */
  logout, /* Logout User */
  getAllProviderList, /* Provider List */
  getAllBuyerList, /* Buyer List */
  createUserProfile, /* User profile create */
  fetchUserDetails,
  changeStatus,
  updateDetails,
  deleteDetail
}

//= ========================= Export Module End ===============================
