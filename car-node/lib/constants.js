const STATUS_CODE = {
    ERROR: 0,
    SUCCESS: 1
};
const LANGUAGE = {
    ENGLISH: "English",
    ARABIC: "Arabic"
}
const GENDER = {
    MALE: "MALE",
    FEMALE: "FEMALE",
    OTHER: "OTHER"
}

const STATUS = {
    INACTIVE: "INACTIVE",
    ACTIVE: "ACTIVE",
    PENDING: "PENDING"
}

const LOGIN_TYPE = {
    FB: 0,
    TW: 1
};
const DB_MODEL_REF = {
    USER: "user",
    VERSION: "Version",
    NOTIFICATIONS: "Notification",
    CMS: "cms",
    CONTACT_US: "contactus"
};

const ACCOUNT_LEVEL = {
    SUPERADMIN: 1,
    ADMIN: 2,
    SALES: 3,
    EDITOR: 4,
    OPERATOR: 5,
    ANALYST: 6,
    DRIVER: 7,
    RIDER: 8
};

const http_code = {
    created: 201,
    ok: 200,
    unAuthorized: 401,
    account_not_found: 302,
    dataNotFound: 404,
    forbidden: 403,
    badRequest: 400,
    internalServerError: 500,
    anotherDevice: 208
}
const CMS_TYPE = {
    ABOUT_US: "About Us",
    PRIVACY_POLICY: "Privacy Policy",
    TERM_CONDITIONS: "Term & Conditions",
    CONTACTUS: "Contact Us",
    BLOG: "Blog",
    FAQ: "FAQ"
}


const MESSAGES = {
    intrnlSrvrErr: "Please try after some time.",
    unAuthAccess: "Unauthorized access ",
    tokenGenError: "Error while generating access token",
    invalidEmail: "Please fill valid Email Address",
    invalidMobile: "Please fill valid Mobile No",
    blockedMobile: "Action Blocked for Illegal use of Services.",
    invalidOtp: "Invalid OTP",
    nameCantEmpty: "Name can't be empty",
    invalidZipcode: "please fill valid zip Code",
    invalidNum: "Please fill valid phone number or Do not add country code",
    passCantEmpty: "Password can't be empty",
    validationError: "Validation errors",
    incorrectPass: "Invalid email or passoword",
    userNotFound: "User not found.",
    accessTokenCantEmpty: "Access token cannot be empty",
    tokenSecretCantEmpty: "Secret token cannot be empty",
    incorrectTwToken: "Sorry, we could not contact twitter with the provided token",
    deviceIdCantEmpty: "Device id cannot be empty",
    platformCantEmpty: "Platform cannot be empty or invalid",
    deviceTokenCantEmpty: "Device token cannot be empty",
    ACCOUNT_DEACTIVATED: "Your account is suspended, please contact the SHiNE admin: admin@gmail.com.",
    statusTrue: true,
    statusFalse: false
};

const ACCOUNT_TYPE = {
    SUPERADMIN:"SUPERADMIN",
    ADMIN: "ADMIN",
    PROVIDER: "PROVIDER",
    BUYER: "BUYER",
    EDITOR:"EDITOR",
    SALES:"SALES",
    WEBADMIN:"WEBADMIN"
}


module.exports = Object.freeze({
    APP_NAME: 'Car Project',
    // TOKEN_EXPIRATION_TIME : 60 * 24 * 60, // in mins - 60 days
    STATUS_CODE: STATUS_CODE,
    ACCOUNT_LEVEL,
    LOGIN_TYPE: LOGIN_TYPE,
    DB_MODEL_REF,
    MESSAGES: MESSAGES,
    masterOtpKey: 1234,
    LANGUAGE,
    GENDER,
    STATUS,
    http_code,
    ACCOUNT_TYPE,
    CMS_TYPE
});
