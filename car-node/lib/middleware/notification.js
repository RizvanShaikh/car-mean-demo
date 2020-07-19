// push notification
     require('dotenv').config();
    const FCM = require('fcm-push');
    const serverKey = process.env.fireBaseServerKey;
     var fcm = new FCM(serverKey);

//========================== Load Modules End =============================

//========================== Export Module Start ===========================


/**
 * send push notification
 * @param {*} to recipient
 * @param {*} message message
 * @param {*} title title
 * @param {*} data data
 * @param {boolean} flag, allowing notification object to be passed in the body or not
 */
function sendNotification(to, message, title, data, flag) {
    let { notificationType } = data
    let obj = { notificationType }
    obj.title = title;
    obj.body = message;
    let notification = {
        data: obj,
        title,
        body: message
    };

    let modifyedResult = { to, notification, data: obj }
    modifyedResult.notification.priority = 'high'
    if (!flag) {
        delete modifyedResult.notification;
    }
    console.log("notification payload", JSON.stringify(modifyedResult, null, 4))
    fcm.send(modifyedResult, function (err, response) {
        if (err) {
            console.log(err);
            console.log("Something has gone wrong !");
        } else {
            console.log("Successfully sent with response :", response);
        }
    });
}

module.exports = {
    sendNotification,
  };