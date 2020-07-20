
//import twilio modules for messaging services
var twilio = require('twilio');
var client = new twilio(process.env.accountSid, process.env.authToken);

/**for send message 
 * 
 * @param {*} body otp
 * @param {*} recipient contactNumber
 */
function sendMessage(body, recipient) {
  return client.messages.create
    ({
      body: body,
      from: process.env.twilioNumber,
      to: recipient,
    })
    .then((message) => {
      return message
    })
    .catch((err) => {
      console.log(err)
      // throw err;
    })
}

module.exports = {

  sendMessage /**for send message */

}
