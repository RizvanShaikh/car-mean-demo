'use strict'

//= ========================= Load Modules Start =======================
// const User = require('../generic/usersModel')
// const Country = require('../country/countryModel')
var db = require('../../config/dbConfig')


const mongoose = require("mongoose");

const userModel = require('../../generic/usersModel')
const userMaster = mongoose.model('user', userModel.UserSchema);
let dao = require('../../dao/baseDao');
const userDao = new dao(userMaster);
const mongoClient = require('../../dao/mongoClient')
const constants = require('../../constants')

//= ========================= Load Modules End ==============================================
/** for check user is register or not
 *
 * @param {string} usrDetails
 */

async function checkIfExist(query) {
  let newConnection = await db.createMongooseConnection()
  return userDao.findOne(query).then(result => {
    newConnection.connection.close()
    return result
  })
}

/** for signUp Users
 *
 * @param {object} userInfo signUp Details
 */
async function signupUser(userInfo) {
  let newConnection = await db.createMongooseConnection()
  return userDao.save(userInfo).then(result => {
    newConnection.connection.close()
    return result
  })
}


/** for payment
 *
 * @param {object} paymentMeta  Details
 */
async function payment(paymentMeta) {
  let newConnection = await db.createMongooseConnection()
  return paymentDao.save(paymentMeta).then(result => {
    newConnection.connection.close()
    return result
  })
}


/** *for set a redis value
 *
 * @param {string} data key
 * @param {object} value  value of key
 */
async function setRedisValue(data, value) {
  // for create redis connections
  let redisConnection = await db.createRedisConnection()
  redisConnection.set(data, value)
  redisConnection.quit()
}

/** for get redis value
 *
 * @param {string} data key
 */
async function getRedisValue(data) {
  let redisConnection = await db.createRedisConnection()
  return new Promise((resolve, reject) => {
    redisConnection.get(data, function (err, result) {
      redisConnection.quit()
      resolve(result)
      if (err) {
        reject(err)
      }
    })
  })
}


/** for verify UserDetails
 *
 * @param {string} query
 * @param {object} data
 */
async function updateUserDetails(query, data) {
  let update = {}
  update['$set'] = data

  let options = {}
  options.new = true
  let newConnection = await db.createMongooseConnection()

  return userDao.findOneAndUpdate(query, update, options).then(result => {
    newConnection.connection.close()
    return result
  })
}
/** for verify UserDetails
 *
 * @param {string} query
 * @param {object} data
 */
async function saveSubscription(query, data) {

  let options = {}
  options.new = true
  let newConnection = await db.createMongooseConnection()
  return userDao.findOneAndUpdate(query, data, options).then(result => {
    newConnection.connection.close()
    return result
  })
}


// /**
//  * for fetch details
//  * @param {object} req request object
//  * @param {object} res response object 
//  */
// async function fetchCountryDetails(query){
//   let newConnection = await countryDao.createMongooseConnection();
//   return countryDao.find(query).then((result) => {
//       newConnection.connection.close();
//       return result[0]; 
//   }).catch(e =>{
//       console.log({e})
//   })
// }


/**for get list
* 
* @param {string} query 
*/
async function getALLProviderList(query, option) {

  let newConnection = await db.createMongooseConnection();
  return await userDao.findWithPeginate(query, option).then(async (result) => {

    newConnection.connection.close();
    return await result;
  })
}


/**for get list
* 
* @param {string} query 
*/
async function getAllParentList(query, option) {

  let newConnection = await db.createMongooseConnection();
  return await userDao.findWithPeginate(query, option).then(async (result) => {
    newConnection.connection.close();
    return await result;
  })
}


// /**
//  * for fetch details
//  * @param {object} req request object
//  * @param {object} res response object 
//  */
// async function fetchDetails(query) {
//   let newConnection = await db.createMongooseConnection();
//   return userDao.aggregate(query).then((result) => {
//     newConnection.connection.close();
//     return result[0];
//   }).catch(e => {
//     console.log({ e })
//   })
// }



/**for update details data
 * 
 * @param {string} query 
 * @param {object} data 
 */
async function updateDetails(query, data) {
  console.log(query, data, "data")
  let newConnection = await db.createMongooseConnection();
  let update = {};
  update['$set'] = data

  let option = {};
  option.new = true;
  return userDao.findOneAndUpdate(query, update, option).then((result) => {
    newConnection.connection.close();
    return result
  })
}


async function fetchByAggregate(query) {
  let newConnection = await db.createMongooseConnection();
  return userDao.aggregate(query).then((result) => {
    newConnection.connection.close();
    return result;
  }).catch(e => {
    console.log({ e })
  })
}



/**
 * for fetch details
 * @param {object} req request object
 * @param {object} res response object 
 */
async function fetchDetails(query){
  let newConnection = await db.createMongooseConnection();
  return userDao.findOne(query).then((result) => {
      newConnection.connection.close();
      return result; 
  }).catch(e =>{
      console.log({e})
  })
}



/**for delete Details data
 * 
 * @param {string} query  
 */
async function deleteDetail(query,data) {
  let newConnection = await db.createMongooseConnection();
  let option = {};
  return userDao.findByIdAndRemove(query,option).then((result) => {
      newConnection.connection.close();
      return result
  })
}
//= ========================= Export Module Start ==============================

module.exports = {
  checkIfExist, /* to check if user exist or not */
  signupUser, /* Register user */
  getRedisValue, /* getuser data from redis */
  setRedisValue, /* setuser data to redis */
  updateUserDetails,
  getALLProviderList,
  getAllParentList,
  fetchDetails,
  updateDetails,
  fetchByAggregate,
  payment,
  saveSubscription,
  deleteDetail
}

//= ========================= Export Module End ===============================
