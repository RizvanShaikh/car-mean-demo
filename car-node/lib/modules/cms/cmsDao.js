'use strict'

//= ========================= Load Modules Start =======================

const mongoose = require('mongoose');
const constants = require('../../constants');
const cmsModel = require('../cms/cmsModel')
const cmsMaster = mongoose.model(constants.DB_MODEL_REF.CMS, cmsModel.CmsSchema)
let BaseDao = require('../../dao/baseDao');
const dao = new BaseDao(cmsMaster);
var db = require('../../config/dbConfig')


//= ========================= Load Modules End ==============================================

/**for fetch all list
 * 
 * @param {string} query 
 */
async function getList(query, option) {
    let newConnection = await db.createMongooseConnection();
    return dao.findWithPeginate(query, option).then((result) => {
        newConnection.connection.close();
        return result;
    })
}

/** for add detalis
 * 
 * @param {Object} addDetails 
 */
async function addDetails(details) {
    let newConnection = await db.createMongooseConnection();
    return dao.save(details).then((result) => {
        newConnection.connection.close();
        return result
    })
}

/**
 * for fetch details
 * @param {object} req request object
 * @param {object} res response object 
 */
async function fetchDetails(query) {
    let newConnection = await db.createMongooseConnection();
    return dao.findOne(query).then((result) => {
        newConnection.connection.close();
        return result;
    }).catch(e => {
        console.log({ e })
    })
}

/**for update Details data
 * 
 * @param {string} query 
 * @param {object} data 
 */
async function updateDetails(query, data) {

    let newConnection = await db.createMongooseConnection();
    let update = {};
    update['$set'] = data

    let option = {};
    option.new = true;
    query.cms_isDeleted = false;

    return dao.findOneAndUpdate(query, update, option).then((result) => {
        newConnection.connection.close();
        return result
    })
}

/**for delete Details data
 * 
 * @param {string} query  
 */
async function deleteDetail(query, data) {

    let newConnection = await db.createMongooseConnection();
    let option = {};
    query.cms_isDeleted = false;
    return dao.findByIdAndRemove(query, option).then((result) => {
        newConnection.connection.close();
        return result
    })
}

//= ========================= Export Module Start ==============================

module.exports = {
    getList, /**for fetch all  list */
    addDetails,/**for add details */
    fetchDetails, /**for fetch details */
    updateDetails,/**for update details */
    deleteDetail,/**for delete details */
}

//= ========================= Export Module End ===============================