'use strict';

//=================================== Load Modules start ===================================

//=================================== Load external modules=================================
const mongoose = require('mongoose');

// Initilize redis connection
var redis = require('redis');
//=================================== Load Modules end =====================================

async function createMongooseConnection() {
    let db =  mongoose.connect(process.env.dbUrl+process.env.dbName,{ useNewUrlParser: true, useUnifiedTopology: true,useCreateIndex:true  }) 
    return db
}

async function createRedisConnection() {
    let dbr = await redis.createClient(process.env.redisPort, process.env.redisHost,{password:process.env.redisPass});
    return dbr;
}

module.exports = {

    createMongooseConnection,

    createRedisConnection
} 
