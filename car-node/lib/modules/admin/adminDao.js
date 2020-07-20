//========================== Load Modules Start =======================

const mongoose = require("mongoose");
const constants = require('../../constants');
const adminModel = require('../../generic/usersModel')
const adminMaster = mongoose.model(constants.DB_MODEL_REF.USER, adminModel.UserSchema);
let dao = require('../../dao/baseDao');
const adminDao = new dao(adminMaster);
const db = require('../../config/dbConfig');

//========================== Load Modules End ==============================================

//=====================================================Admin Model =========================================
/**for fetch admin details
 * 
 * @param {string} query data
 */
async function getAdminDetails(query) {
    let newConnection = await db.createMongooseConnection();
    return adminDao.findOne(query).then((result) => {
        newConnection.connection.close();
        return result;
    })
}

/** for check user is exist or not
 *
 * @param {string} 
 */
async function checkIfExist(query) {
    let newConnection = await db.createMongooseConnection()
    return adminDao.findOne(query).then(result => {
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


/** for verify UserDetails
 *
 * @param {string} query
 * @param {object} data
 */
async function updateDetails(query, data) {
    let update = {}
    update['$set'] = data

    let options = {}
    options.new = true
    let newConnection = await db.createMongooseConnection()

    return adminDao.findOneAndUpdate(query, update, options).then(result => {
        newConnection.connection.close()
        return result
    })
}



/** for signUp Users
 *
 * @param {object} userInfo signUp Details
 */
async function saveToken(userInfo) {
    let newConnection = await db.createMongooseConnection()
    return blackListDao.save(userInfo).then(result => {
        newConnection.connection.close()
        return result
    })
}


/** for check user is exist or not
 *
 * @param {string} 
 */
async function checkIfExistToken(query) {
    let newConnection = await db.createMongooseConnection()
    return blackListDao.findOne(query).then(result => {
        newConnection.connection.close()
        return result
    })
}


/** for signUp Users
 *
 * @param {object} userInfo signUp Details
 */
async function addAdmin(userInfo) {
    let newConnection = await db.createMongooseConnection()
    return adminDao.save(userInfo).then(result => {
        newConnection.connection.close()
        return result
    })
}

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
        redisConnection.get(data, function(err, result) {
            redisConnection.quit()
            resolve(result)
            if (err) {
                reject(err)
            }
        })
    })
}

// getList
/**for get list
 * 
 * @param {string} query 
 */
async function getList(query, option) {

    let newConnection = await db.createMongooseConnection();
    return await adminDao.findWithPeginate(query, option).then(async(result) => {
        newConnection.connection.close();
        return await result;
    })
}

async function getListByAggregate(agQuery, query, option) {
    let newConnection = await db.createMongooseConnection();
    return adminDao.aggregate(agQuery).then(async (result) => {
        // return result;

        let count = await adminDao.aggregate(query); // add count
        newConnection.connection.close();

       let resultWithCounter = {};
        resultWithCounter.docs = result;
        resultWithCounter.limit = option.limit;
        resultWithCounter.offset = option.offset;
        resultWithCounter.totalDocs = count.length;

        return resultWithCounter;

    })
}

/**for fetch all list
 * 
 * @param {string} query, option 
 */
async function getOperatorList(query, option) {
    let newConnection = await db.createMongooseConnection();
    return adminDao.findWithPeginate(query, option).then((result) => {
        newConnection.connection.close();
        return result;
    })
}

//========================== Export Module Start ==============================

module.exports = {
    getAdminDetails,
    checkIfExist,
    setRedisValue,
    updateDetails,
    saveToken,
    checkIfExistToken,
    addAdmin,
    setRedisValue,
    getRedisValue,
    getList,
    getListByAggregate,
    getOperatorList
};

//========================== Export Module End ===============================