const fs = require('fs')
const path = './public/logs/'

 const myLogger  = async function (req, res, next) {
    let data = {};
    if(req.body){
        data['body'] = req.body
    }
    if(req.params){
        data['params'] = req.params
    }
    if(req.headers) {
        data['headers'] = req.headers
    }
    if(req.query) {
        data['query'] = req.query
    }
    if(req.originalUrl) {
        data['originalUrl'] = req.originalUrl
    }
    
    var d= new Date()
    let logDate = formatDate(d);
    let loggerData = {
        date : d,
        req  : data
    }
  try {
    // append data to file
    fs.appendFile(path+logDate+".txt",JSON.stringify(loggerData)+'\n\n', 'utf8',
        // callback function
        function(err) { 
            if (err) throw err;
            // if no error
    }); 
    
    next()
  } catch (err) {
    console.error(err)
  }
}
function formatDate(date) {
    var d = new Date(date),
    month = '' + (d.getMonth() + 1),
    day = '' + d.getDate(),
    year = d.getFullYear();
    
    if (month.length < 2)
    month = '0' + month;
    if (day.length < 2)
    day = '0' + day;
    
    return [year, month, day].join('-');
    }
module.exports = {
    myLogger,
}

  
  