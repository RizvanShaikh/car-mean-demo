'use strict'

//= ========================= Load Modules Start =======================
const mongoose = require('mongoose');
const constants = require('../../constants');
const contactUsModel = require('../contactUs/contactUsModel')
const contactUsMaster =  mongoose.model(constants.DB_MODEL_REF.CONTACT_US, contactUsModel.ContactusSchema)
let BaseDao = require('../../dao/baseDao');
const dao = new BaseDao(contactUsMaster);
var db = require('../../config/dbConfig')

//= ========================= Load Modules End ==============================================

/**for fetch all list
 * 
 * @param {string} query, option
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
    let data = new contactUsModel(details);
    return dao.save(data).then((result) => {
        newConnection.connection.close();
        return result
    })
}

/**
 * for fetch details
 * @param {object} req request object
 * @param {object} res response object 
 */
async function fetchDetails(query){
    let newConnection = await db.createMongooseConnection();
    return dao.findOne(query).then((result) => {
        newConnection.connection.close();
        return result; 
    }).catch(e =>{
        console.log({e})
    })
}



//= ========================= Export Module Start ==============================

module.exports = {
    getList, /**for fetch all  list */
    addDetails,/**for add details */
    fetchDetails, /**for fetch details */
}

//= ========================= Export Module End ===============================
