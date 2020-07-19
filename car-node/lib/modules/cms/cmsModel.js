// Importing mongoose
var mongoose = require('mongoose')
const constants = require('../../constants')
const db = require('../../config/dbConfig')
var Schema = mongoose.Schema
var mongoosePaginate = require('mongoose-paginate-v2');

var CmsSchema = new Schema({
    cms_title: [{
        _id: false,
        lang: { type: String, required: true },
        title: { type: String, required: true }
    }],
    cms_content: [{
        _id: false,
        lang: { type: String, required: true },
        title: { type: String, required: true }
    }],
    cms_type: { type: String, enum: [constants.CMS_TYPE.ABOUT_US, constants.CMS_TYPE.PRIVACY_POLICY, constants.CMS_TYPE.TERM_CONDITIONS, constants.CMS_TYPE.CONTACTUS, constants.CMS_TYPE.BLOG, constants.CMS_TYPE.FAQ], required: true },
    cms_status: { type: String, enum: [constants.STATUS.ACTIVE, constants.STATUS.INACTIVE], default: constants.STATUS.ACTIVE },
    cms_isDeleted: { type: Boolean, default: false },
    cms_createdOn: { type: Number, default: Date.now() },
    cms_modifyOn: { type: Number, default: Date.now() },
    cms_modifyBy: { type: mongoose.Types.ObjectId, ref: constants.DB_MODEL_REF.USER },
    cms_deletedOn: { type: Number, default: Date.now() },
    cms_deletedBy: { type: mongoose.Types.ObjectId, ref: constants.DB_MODEL_REF.USER }
})
CmsSchema.plugin(mongoosePaginate)

// Export template module
cms = module.exports = mongoose.model(constants.DB_MODEL_REF.CMS, CmsSchema)
