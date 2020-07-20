const MESSAGES = {
  // Validation
  firstNameCantEmpty: "Pleace enter first name",
  lastNameCantEmpty: "Pleace enter last name",
  errEmail: "Email is empt or invalid",
  passwordMismatch: "Password mismatch",
  invalidOldPass: "Invalid old password",
  passwordMismatch: "Password Mismatch.",
  getUserDetailSuccess: "User get by id successfully",  
  phoneNumberCantEmpty: "Please provide valid phone number.",
  phoneNumberPattern:"Please enter phone number min 10 and max 12 charachter",
  passwordPattern:"Password should have min. 6 and max. 15 Characters",
  confirmPasswordPattern: "Password mismatch",
  isdCodeCantEmpty: "Please provide valid isdcode.",
  unAuthAccess: "UnAuthorization Access.",
  getUserDetailErr: "There is some issue with get user detail",
  providerListSuccess: "Provider listing successfully",
  providerListErr: "There is some issue with provider list",
  buyerListSuccess: "Buyer listing successfully",
  buyerListErr: "There is some issue with buyer list",
  dataNotFound: "Data not found",
  alreadyActive: "User status already active",
  alreadyInActive: "User status already Inactive",
  change: "User status change successfully",
  deleted: "User deleted successfully",
  badRequest: "user not deleted",
  emptyId: "Please enter valid id",
  emptyLang: "Please enter valid language",
  updated: "User updated successfully",
  accountTypeCantEmpty: "Please provide valid accountType.",
  exist: "Already Exist.",
  internalServerError: 'There is some issue with register user.',
  registerSuccessfully: "Register Successfully.",
  updateErr: "This issue is generated while updating",
  typeEmpty: "User type is required"
}


const NOTIFICATION_TYPES = {
  LOGOUT: "LOGOUT"
}

let DEVICETYPE = {
  android: "ANDROID",
  ios: "IOS"
}

//========================== Export Module Start ==============================

module.exports = {
  MESSAGES,

  NOTIFICATION_TYPES,

  DEVICETYPE
};

//========================== Export Module End ===============================
