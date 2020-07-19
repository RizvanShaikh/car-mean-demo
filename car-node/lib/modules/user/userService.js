'use strict'

//= ========================= Load Modules Start =======================
const _ = require('lodash')
const userDao = require('./userDao')
// const countryDao = require('../../modules/country/countryDao')
const userMapper = require('./userMapper')
const userMsg = require('./userConstants').MESSAGES
const appUtils = require('../../appUtils')
const httpCode = require('../../constants').http_code
const type = require('../../constants').ACCOUNT_TYPE
const mongoose = require('mongoose');
const constants = require('../../constants');
require('dotenv').config
var bcrypt = require('bcryptjs');

//= ========================= Load Modules End ==============================================

//= ========================= Export Module Start ==============================
const moduleName =  'user'

// for add details
async function signupUser(req, res) {
    let userDetails = req.body;

// if (userDetails.user_password) {
//     /*******this method used for convert simple string password to hash password*************/
//     var password = await appUtils.generateSaltAndHashForPassword(userDetails.user_password)
//     userDetails.user_password = password
//   }

    return userDao.signupUser(userDetails)
        .then((result) => {
        if (!result) {
            return 1;
        } else {
            return result;
        }
    })
}

/** for get all Provider list info
@param {} req
@param {} res
*/
function getAllProviderList(req, res) {
    let query = {
      user_accountType: req.params.accountType,
      user_isDeleted: false
    };
  
    let option = {
      sort: {
        'user_createdOn': -1
      }
    };
  
    // 
    var columnName = null;
    var clumnValue = null;
    var key = null;
    var cname = null;
  
  
    if (req.body['search[value]']) {
      query['$or'] = [];
    }
  
    for (let i = 0; i < 5; i++) {
      if (req.body['columns[' + i + '][search][value]']) {
  
        if (columnName = req.body['columns[' + i + '][data]']) {
  
          columnName = req.body['columns[' + i + '][data]']
          clumnValue = req.body['columns[' + i + '][search][value]'];
  
          key = columnName;
          if (key == 'user_status' || key == 'user_isActiveSubscription') {
            query[key] = clumnValue;
          } else {
            query[key] = {
              $regex: clumnValue,
              $options: 'i'
            }
          }
        }
      }
      if (req.body['order[0][column]'] == i) {
        cname = req.body['columns[' + i + '][data]'];
  
        option = {
          sort: {
            [cname]: (req.body['order[0][dir]'] == 'asc') ? 1 : -1
          }
        };
      }
    }
  
    option['offset'] = parseInt(req.body['start']);
    option['limit'] = parseInt(req.body['length']);
  
    return userDao.getALLProviderList(query, option).then((result) => {
      if (result && result != null) {
        return result
      } else {
        return 1;
      }
    })
  }


/** for get all Buyer list info
@param {} req
@param {} res
*/
function getAllBuyerList(req, res) {
    let query = {
      user_accountType: req.params.accountType,
      user_isDeleted: false
    };
  
    let option = {
      sort: {
        'user_createdOn': -1
      }
    };
  
    // 
    var columnName = null;
    var clumnValue = null;
    var key = null;
    var cname = null;
  
  
    if (req.body['search[value]']) {
      query['$or'] = [];
    }
  
    for (let i = 0; i < 5; i++) {
      if (req.body['columns[' + i + '][search][value]']) {
  
        if (columnName = req.body['columns[' + i + '][data]']) {
  
          columnName = req.body['columns[' + i + '][data]']
          clumnValue = req.body['columns[' + i + '][search][value]'];
  
          key = columnName;
          if (key == 'user_status' || key == 'user_isActiveSubscription') {
            query[key] = clumnValue;
          } else {
            query[key] = {
              $regex: clumnValue,
              $options: 'i'
            }
          }
        }
      }
      if (req.body['order[0][column]'] == i) {
        cname = req.body['columns[' + i + '][data]'];
  
        option = {
          sort: {
            [cname]: (req.body['order[0][dir]'] == 'asc') ? 1 : -1
          }
        };
      }
    }
  
    option['offset'] = parseInt(req.body['start']);
    option['limit'] = parseInt(req.body['length']);
  
    return userDao.getALLProviderList(query, option).then((result) => {
      if (result && result != null) {
        return result
      } else {
        return 1;
      }
    })
  }

  /**
 * for fetch details
 * @param {object} req request object
 * @param {object} res response object 
 */

function fetchUserDetails(req, res) {
  let query = {
      _id: mongoose.Types.ObjectId(req.params.id),
      user_isDeleted: false
  };

  return userDao.fetchDetails(query)
      .then((result) => {
          if (!result) {
              return 1
          }
          return result
      })
}

//for update detail
async function updateDetails(req, res) {
  let query = {
      _id: mongoose.Types.ObjectId(req.params.id),
      user_isDeleted: false
  }
  return await userDao.fetchDetails(query).then(async(result) => {
      if (result && result != null) {
          let details = req.body;
      console.log(details, "datils")
          details[moduleName + '_modifyOn'] = Date.now();
          details[moduleName + '_modifyBy'] = mongoose.Types.ObjectId(req._id);
          return await userDao.updateDetails(query, details).then(async(data) => {
              if (data) {
                  return data;
              }
          })
      } else {
          return 1;
      }
  })
}


/**for change status */
async function changeStatus(req, res) {

  let query = {
      _id: mongoose.Types.ObjectId(req.params.id),
      country_isDeleted: false
  };
  return await userDao.fetchDetails(query).then(async (result) => {
      if (result && result != null) {
          if (req.body.user_status == result.user_status) {
              if (req.body.user_status == constant.STATUS.ACTIVE) {
                  return 2;
              } else {
                  return 3;
              }
          } else {
              let details = req.body;
              details[moduleName + '_modifyOn'] = Date.now()
              details[moduleName + '_modifyBy'] = mongoose.Types.ObjectId(req._id)

              return await userDao.updateDetails(query, details).then((data) => {
                  if (data) {
                      return data
                  }
              })

          }

      } else {
          return 1;
      }
  });

}

/**for Delete details */
function deleteDetail(req, res) {
  return userDao.deleteDetail({ _id: mongoose.Types.ObjectId(req.params.id) }).then((result) => {
      if (!result[0]) {
          return 1;
      }
      return 2;
  })
}

module.exports = {
    signupUser,
    getAllProviderList,
    getAllBuyerList,
    fetchUserDetails,
    updateDetails,
    changeStatus,
    deleteDetail
}

//= ========================= Export Module End ===============================
