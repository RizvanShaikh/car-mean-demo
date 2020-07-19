//========================== Load Modules Start =======================

const adminDao = require('./adminDao');
const jwtHandler = require("../../jwtHandler");
const appUtils = require('../../appUtils')
const constants = require('../../constants')
const mongoose = require('mongoose');
const email = require('../../middleware/email');
// const countryDao = require('../../modules/country/countryDao')
var _ = require('lodash');

//========================== Load Modules End ==============================================

/**login for admin */
function login(req, res) {
    let { user_email, user_password } = req.body
    let query = {
        user_email: user_email,
        user_status: constants.STATUS.ACTIVE,
        user_isDeleted: false
    };
    return adminDao.getAdminDetails(query).then( (isExist) => {
        if (isExist) {
        var valid = appUtils.verifyPassword(user_password, isExist)
                console.log(valid, "isExist 25")
                if (valid) {
                   return jwtHandler.genUsrToken({  user_password: isExist.user_password, user_email: isExist.user_email }).then((jwt) => {
                        isExist.user_jwt = jwt;
                        isExist.save();
                        return { user: isExist };
                    });
                } else {
                    return 2;
                }
            // })
        } else {
            return 1;
        }
    }).catch((err) => {
        console.log(err);
    })
}

/** for forgot password info update to admin 
 * @param {*} req
 * @param {*} res
 */
function forgotPassword(req, res) {
    let findQuery = { user_email: req.body.user_email };
    return adminDao.checkIfExist(findQuery).then(async (data) => {
        if (data) {
          //  console.log(data, "data from the databses")
            let token = await jwtHandler.genResetPasswordAdminToken({
                adminId: data._id,
                email: req.body.user_email,
                roleId: data.user_roleId,
            })
            console.log(token, "token")
            let forgot_link = process.env.forgot_link
            let links = forgot_link + token
            var mail = await email.sendForgotPasswordLink(data, links)
            return {};
        } else {
            return 1;
        }
    });
}

function isAdmin(req) {
    let query = {
        _id: mongoose.Types.ObjectId(req._id),
        user_isDeleted: false,
        $or: [{ user_roleId: { $ne: constants.ACCOUNT_LEVEL.RIDER } },{ user_roleId: { $ne: constants.ACCOUNT_LEVEL.DRIVER } }]
        
    };

    return adminDao.checkIfExist(query).then((result) => {
        if (result && result != null) {
            return result;
        } else {
            return 1;
        }
    })

}

async function resetPassword(req) {
    if (req.body.user_password === req.body.user_confirm_password) {
        let password = await appUtils.generateSaltAndHashForPassword(req.body.user_password)
        let findQuery = {
            _id: mongoose.Types.ObjectId(req._id),
            user_isDeleted: false
        };
        let updateData = {
            user_password: password
        };
        return adminDao.updateDetails(findQuery, updateData).then(async (data) => {

            if (data) {

                await adminDao.saveToken({
                    'blt_token': req.headers.authorization
                });
                return data;

            }
        }).catch((err) => {
            return 2;
        });
    } else {
        return 1
    }
}

//========================== Comman API start =================================
async function editProfile(req) {
    let query = {
        _id: mongoose.Types.ObjectId(req.params.id)
    }
    let phonequery = {
        user_phoneNumber: req.body.user_phoneNumber
    }

    return await adminDao.checkIfExist(phonequery).then(async(data) => {
        if (data && (data._id != req.params.id)) {
            return 2;
        } else {
            return await adminDao.checkIfExist(query).then(async(result) => {
                if (result && result != null) {
                    let details = req.body;

                    details['user_modifyOn'] = Date.now();
                    details['user_modifyBy'] = mongoose.Types.ObjectId(req.params.id)
                    return await adminDao.updateDetails(query, { $set: details }).then(async(result) => {
                        if (result) {
                            return await result;
                        }
                    })
                } else {
                    return 1;
                }
            })
        }
    })
}

//========================== Comman API end ===================================



//========================== Export Module Start ==============================

module.exports = {
    login,
    forgotPassword,
    isAdmin,
    resetPassword,
    editProfile
};

//========================== Export Module End ===============================