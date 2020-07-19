const MESSAGES = {
    // Validatations
    invalidContent: "Content is empty or Invalid.",
    invalidCmsType: "CMS Type is empty or Invalid.",
    invalidName: "Name is empty or Invalid",
    passwordInvalid: "Password mismatch",
    invalidEmail: "Email is empty or invalid",
    issueWithLogin: 'There is some issue with Login.',
    issueWithforgotPasword: 'There is some issue with forgot password.',
    passwordCantEmpty: "Password is empty or invalid",
    PhoneNumberCantEmpty: "Phonenumber is empty or invalid",
    dobCantEmpty: "Birth of date is empty or invalid",
    exist: "Already Existed ",
    invalidOtp: "Please check your otp",
    passwordPattern: "Password should have min. 6 and max. 15 Characters",
    // passwordPattern:"Password should be have atleast 1 capital, 1 lower case , 1 numeric and 1 special character",

    // emailIdInvalid: "EmailId is invalid",
    emailCantEmptyInvalid: "EmailId is empty or invalid.",
    invalidQuestion: "Enter valid question",
    invalidId: "Invalid Id",

    // Actions
    loginSuccessfully: "Login Successfully.",
    added: "Added Successfully.",
    updated: "Updated Successfully.",
    deleted: "Deleted Successfully.",
    otpVerify: "OTP has been Verified successfully.",
    passwordUpdate: "Password has been updated successfully.",
    otpSended: "OTP has been sended successfully.",
    emailSended: "Check your mail to reset your password.",
    userDelete: "User deleted successfully.",
    userDeleteAlready: "User already deleted successfully.",

    // Exeptions
    unAuthAccess: "Unauthorize access",
    tokenExpired: "Password reset token is invalid or has expired.",
    dataNotFound: "Data not found",
    invalidRequest: "Invalid request, please check all the feilds and try again",
    invalidAction: "Invalid action for handle smarty request",
    userNotFound: "No such user is registered.",
    Ok: "Ok",
    unauthorizedAccess: 'You have no permission to access.',
    authorizedAccess: 'You have permission to access.',
    passwordMismatch: 'user_password and confirm_password not match.',
    resetPasswordError: 'There is some issue with reset password',
    resetPasswordSuccess: 'Password reset successfully.',
    accountTypeCantEmpty: "Please provide valid accountType.",
    addAdminSuccess: 'Admin added successfully.',
    issWithAdd: 'There is some issue with admin add.',
    issueWithget: 'There is some issue with get user',
    getUserSuccess: 'User get successfully',
    issueWithdelete: 'There is some issue with delete',
    issueWithUpdate: 'There is some issue with update',
    listingSuccess: 'Admin listing successfully.',
    updateStateErr: 'There is some issue with update state.',
    alreadyActive: 'User status already active.',
    alreadyInActive: 'User status already inactive.',
    change: "User status change successfully.",
    emptyStatus: "Please select status.",
    emptyId: "Please enter valid Id",
    mobileExist: 'Phone number already exist.',

    //==================== Comman API start ========================
    //Validator
    errFirstName: "First name is empty or Invalid.",
    errLastName: "Last name is empty or Invalid.",
    errUserName: "User name is empty or Invalid.",
    errIsdCode:"ISD Code is empty or Invalid.",
    errEmail: "Email is empty or Invalid.",
    errPhoneNumber: "Phone number is empty or Invalid.",
    errPassword: "Password is empty or Invalid.",
    errVerifyStatus: "Verify status is empty or Invalid.",
    errStatus: "Status is empty or Invalid.",
    errRoleId:"RoleId is empty or Invalid.",
    errCountry:"Country is empty or Invalid.",
    errInvitationCode:"InvitationCode is empty or Invalid.",
    errPremiumUser:"Premium user is empty or Invalid.",    

    //Action
    defPhoneNumber: "This number already exist.",


    //==================== Comman API end ==========================

}



//========================== Export Module Start ==============================

module.exports = {
    MESSAGES,
};

//========================== Export Module End ===============================