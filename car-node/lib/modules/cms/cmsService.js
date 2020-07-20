'use strict'

//= ========================= Load Modules Start =======================
const dao = require('./cmsDao')
const mongoose = require('mongoose');
const constant = require("../../constants");
const moduleName = 'cms'
//= ========================= Load Modules End ==============================================


/**for fetch get list */
function getList(req, res) {

    let query = {
        cms_isDeleted: false
    };

    let option = {
        sort: {
            'cms_createdOn': -1
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
        if (req.body['columns[' + i + '][search][value]']) {

            if (columnName = req.body['columns[' + i + '][data]']) {

                columnName = req.body['columns[' + i + '][data]']
                clumnValue = req.body['columns[' + i + '][search][value]'];

                key = columnName;
                console.log('-------------', key);
                if (key == 'cms_status') {
                    query[key] = clumnValue;
                } else if (key == 'cms_title') {
                    key = 'cms_title.title'
                    query[key] = {
                        $regex: clumnValue,
                        $options: 'i'
                    }
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
            if (cname == 'cms_title') {
                cname = 'cms_title.title'
            }
            option = {
                sort: {
                    [cname]: (req.body['order[0][dir]'] == 'asc') ? 1 : -1
                }
            };
        }
    }

    option['offset'] = parseInt(req.body['start']);
    option['limit'] = parseInt(req.body['length']);

    console.log('----------------------->|||', query)
    return dao.getList(query, option)
        .then((result) => {
            if (result && result == null) {
                return 1
            } else {
                return result
            }
        })
}

/**for add Details */
function addDetails(req, res) {
    let details = req.body;
    let findQuery = {
        cms_type: req.body.cms_type,
    };
    console.log(details, "details")
    return dao.fetchDetails(findQuery).then((data) => {
        if (data && data != null) {
            return 2;
        } else {

            return dao.addDetails(details)
                .then((result) => {
                    if (!result) {
                        return 1
                    }
                    return result
                }).catch((er) => { })
        }
    })

}

/**
 * for fetch details
 * @param {object} req request object
 * @param {object} res response object 
 */

function fetchDetails(req, res) {
    let query = {
        _id: mongoose.Types.ObjectId(req.params.id),
        cms_isDeleted: false
    };
    return dao.fetchDetails(query)
        .then((result) => {
            if (!result) {
                return 1
            }
            return result
        })
}

/**for update details */
async function updateDetails(req, res) {

    let query = {
        _id: mongoose.Types.ObjectId(req.params.id),
    };
    return await dao.fetchDetails(query).then(async (result) => {
        if (result && result != null) {

            let details = req.body;
            details[moduleName + '_modifyOn'] = Date.now();
            details[moduleName + '_modifyBy'] = mongoose.Types.ObjectId(req._id);

            return await dao.updateDetails(query, details).then(async (data) => {
                if (data) {
                    return await data;
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
        _id: mongoose.Types.ObjectId(req.params.id)
    };
    return await dao.fetchDetails(query).then(async (result) => {
        if (result && result != null) {
            if (req.body.cms_status == result.cms_status) {
                if (req.body.cms_status == constant.STATUS.ACTIVE) {
                    return 2;
                } else {
                    return 3;
                }
            } else {
                let details = req.body;
                details[moduleName + '_modifyOn'] = Date.now()
                details[moduleName + '_modifyBy'] = mongoose.Types.ObjectId(req._id)

                return await dao.updateDetails(query, details).then((data) => {
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

/**for soft Delete details */
async function softDeleteDetails(req, res) {
    let query = {
        _id: mongoose.Types.ObjectId(req.params.id)
    };

    return await dao.fetchDetails(query).then(async (result) => {
        if (result && result != null) {

            let details = {};
            details[moduleName + '_isDeleted'] = true
            details[moduleName + '_deletedOn'] = Date.now()
            details[moduleName + '_deletedBy'] = mongoose.Types.ObjectId(req._id)

            return await dao.updateDetails(query, details).then(async (data) => {
                if (data) {
                    return await data;
                }
            })
        } else {
            return null;
        }
    })

}

/**for Delete details */
function deleteDetail(req, res) {
    return dao.deleteDetail({ _id: mongoose.Types.ObjectId(req.params.id) }).then((result) => {
        if (!result[0]) {
            return 1;
        }
        return 2;
    })
}



//= ========================= Export Module Start ==============================

module.exports = {

    getList,
    /**for fetch all List */
    addDetails,
    /**for add details */
    fetchDetails,
    /** for fetch Details */
    updateDetails,
    /** for update Details */
    changeStatus,
    /** for change status */
    softDeleteDetails,
    /** for soft delete details */
    deleteDetail,
    /** for delete details */

}

//= ========================= Export Module End ===============================