'use strict'

//= ========================= Load Modules Start =======================
const dao = require('./contactUsDao')
const mongoose = require('mongoose');
const moduleName = 'contactus'
    //= ========================= Load Modules End ==============================================


/**for fetch get list */
function getList(req, res) {

    let query = {};

    let option = {
        sort: {
            'contactus_createdOn': -1
        }
    };

    var columnName = null;
    var clumnValue = null;
    var key = null;
    var cname = null;


    if (req.body['search[value]']) {
        query['$or'] = [];
    }

    for (let i = 0; i < 5; i++) {
        // for if null value
        if (req.body['search[value]']) {

            if (columnName = req.body['columns[' + i + '][data]']) {
                columnName = req.body['columns[' + i + '][data]']
                clumnValue = req.body['search[value]'];
                key = columnName,
                    query['$or'].push({
                        [key]: {
                            $regex: clumnValue,
                            $options: 'i'
                        }
                    })
            }

        }
        if (req.body['order[0][column]'] == i) {
            cname = req.body['columns[' + i + '][data]'];
            option = {
                sort: {
                    [cname]: (req.body['order[0][dir]   '] == 'asc') ? 1 : -1
                }
            };
        }
    }

    for (let i = 0; i < 5; i++) {
        if (req.body['columns[' + i + '][search][value]']) {
            if (columnName = req.body['columns[' + i + '][data]']) {

                columnName = req.body['columns[' + i + '][data]']
                clumnValue = req.body['columns[' + i + '][search][value]'];

                key = columnName,
                    query[key] = {
                        $regex: clumnValue,
                        $options: 'i'
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

    return dao.getList(query, option).then((result) => {
        if (result && result == null) {
            return 1
        } else {
            return result
        }
    })
}

/**
 * for fetch details
 * @param {object} req request object
 * @param {object} res response object 
 */

function fetchDetails(req, res) {
    let query = { _id: mongoose.Types.ObjectId(req.params.id) };

    return dao.fetchDetails(query).then((result) => {
        if (!result) {
            return 1
        }
        return result
    })
}


/**for add Details */
function addDetails(req, res) {
    console.log(req.body)
    let details = req.body
    details.contactus_userId = req._id

    return dao.addDetails(details).then((result) => {
        if (!result) {
            return 1
        }
        return result
    })
}


//= ========================= Export Module Start ==============================

module.exports = {
    addDetails,
    /**for sendinquiry to admin */
    getList,
    /**for fetch all List */
    fetchDetails,
    /** for fetch Details */
}

//= ========================= Export Module End ===============================