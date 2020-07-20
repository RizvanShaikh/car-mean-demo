// Importing mongoose
var mongoose = require('mongoose')
const constants = require('../../constants')
var Schema = mongoose.Schema
var mongoosePaginate = require('mongoose-paginate-v2');

var ContactusSchema = new Schema({
    contactus_message: { type: String, required: true },
    contactus_fullName: { type: String, required: true },
    contactus_email: { type: String, required: true },
    contactus_roleId: {
        type: String,
        enum: [
            constants.ACCOUNT_LEVEL.SUPERADMIN,
            constants.ACCOUNT_LEVEL.EDITOR,
            constants.ACCOUNT_LEVEL.SALES,
            constants.ACCOUNT_LEVEL.ANALYST,
            constants.ACCOUNT_LEVEL.ADMIN,
            constants.ACCOUNT_LEVEL.OPERATOR,
            constants.ACCOUNT_LEVEL.DRIVER,
            constants.ACCOUNT_LEVEL.RIDER,
        ],
        default: constants.ACCOUNT_LEVEL.DRIVER,
        // required:true
    },
    contactus_createdOn: { type: Number, default: Date.now() },
})
ContactusSchema.plugin(mongoosePaginate)

const contactUs = module.exports = mongoose.model(constants.DB_MODEL_REF.CONTACT_US, ContactusSchema)