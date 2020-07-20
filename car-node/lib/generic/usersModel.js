// Importing mongoose
var mongoose = require('mongoose')
const constants = require('../constants')
const status = require('../constants').STATUS
const db = require('../config/dbConfig')
const bcrypt = require('bcryptjs')
require('dotenv').config
var Schema = mongoose.Schema
var mongoosePaginate = require('mongoose-paginate-v2');
const { constant } = require('async');

var UserSchema = new Schema({
    
    
    user_firstName: { type: String, required: true },
    user_lastName: { type: String, required: true },
    user_fullName: { type: String, default: "" },
    user_email: {
        type: String,
        required: true
    },
    user_password: {
        type: String,
        required: true,
        default: ""
    },
    user_confirmPassword: { type: String },
    user_phoneNumber: { type: String, required:true, default: "" },
    user_dob: { type: Number, default: 0 },
    user_userName: { type: String, default: "" },
    user_zipCode: { type: Number },
    user_roleId: { type: Number },
   user_accountType: {
        type: String ,
        enum: [
            constants.ACCOUNT_TYPE.SUPERADMIN,
            constants.ACCOUNT_TYPE.ADMIN,
            constants.ACCOUNT_TYPE.PROVIDER,
            constants.ACCOUNT_TYPE.BUYER
        ]
    },
    user_language: {
        type: String,
        enum: [
            constants.LANGUAGE.ENGLISH,
            constants.LANGUAGE.ARABIC
        ],
        default: constants.LANGUAGE.ENGLISH,
    },
   user_isdCode: { type: String, default: process.env.ISDCODE },
    user_gender: {
        type: String,
        enum: [
            constants.GENDER.MALE,
            constants.GENDER.FEMALE,
            constants.GENDER.OTHER
        ],
        default: constants.GENDER.MALE,
    },
    //end deviceMeta 
    user_jwt: { type: String, default: "" },
    user_isPasswordChanged: { type: Boolean, default: false },
    user_deletedBy: { type: mongoose.Types.ObjectId, ref: constants.DB_MODEL_REF.USER },
    user_isLoggedOut: { type: Boolean, default: false },
    user_isActiveSubscription: { type: Boolean, default: false },

    user_countryId: { type: mongoose.Types.ObjectId },
    user_status: {
        type: String,
        enum: [
            constants.STATUS.ACTIVE, //Active for 1.
            constants.STATUS.INACTIVE, //InActive for 0.
        ],
        default: constants.STATUS.ACTIVE,
    },
    user_isDeleted: { type: Boolean, default: false },
    user_createdOn: { type: Number, default: Date.now() },
    user_modifyOn: { type: Number, default: Date.now() },
    user_modifyBy: { type: mongoose.Types.ObjectId, ref: constants.DB_MODEL_REF.USER },
    user_deletedOn: { type: Number, default: Date.now() }
})

UserSchema.plugin(mongoosePaginate)

// Export user module
User = module.exports = mongoose.model(constants.DB_MODEL_REF.USER, UserSchema)

createAdmin();

async function createAdmin() {
  /** for create mongoose connections */
  let newConnection = await db.createMongooseConnection()
  let redisConnection = await db.createRedisConnection()
  User.find().then(
    async result => {
      if (!result[0]) {
        redisConnection.flushdb( function (err, succeeded) {
          console.log("Flushed Redis DB : ",succeeded); // will be true if successfull
        });

        let obj = {
          user_fullName: process.env.admin_name,
          user_email: process.env.admin_email,
          user_password: process.env.admin_password,
          user_accountType: constants.ACCOUNT_TYPE.SUPERADMIN,
          user_status: status.ACTIVE,
          user_isdCode: process.env.ISDCODE,
          user_phoneNumber: process.env.adminContactNumber,
          user_countryId: mongoose.Types.ObjectId(process.env.country)
        }
        let updatedPass = await bcrypt.hashSync(obj.user_password, 11)
        obj.user_password = updatedPass
        let user = new User(obj)
        user.save(function (err, result) {
          err ? console.log(err) : console.log('admin created successfully.')
          newConnection.connection.close()
        })
      }
    }
  )
}