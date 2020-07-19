const adminRouter = require('../modules/admin/adminRoute') // Load admin routes
const userRouter = require('../modules/user/userRoute') // Load user routes
const cmsRouter = require('../modules/cms/cmsRoute') // Load cms routes
const contactUsRouter = require('../modules/contactUs/contactUsRoute') // Load contact us routes

require('dotenv').config()


//========================== Load Modules End ==============================================

//========================== Export Module Start ====== ========================


module.exports = function(app) {

    app.use(process.env.BASENAME + '/api/admin', adminRouter); //Attach Admin Routes
    app.use(process.env.BASENAME + '/api/user', userRouter); //Attach User Routes
    app.use(process.env.BASENAME + '/api/admin/cms', cmsRouter); //Attach CMS Routes
    app.use(process.env.BASENAME + '/api/admin/contactUs', contactUsRouter); //Attach ContactUs Routes
    app.use(process.env.BASENAME + '/api/contactUs', contactUsRouter); //Attach ContactUs Routes
    
    app.use(function(req, res) {
        res.status(404).send("404 page not found")
    });
};