const s3Bucket = require('./refrence');
const fs = require('fs');

async function uploadDocs(file) {
    const date = new Date();
    return await new Promise((resolve, reject) => {
        let d = date.getTime() + file.name.toString();
        fs.writeFile(d, file.data, 'binary', async function() {
            s3Bucket.getFolders('images/').then((folder) => {

                if (folder.Key == "images/") {
                    s3Bucket.uploadFile(process.env.bucketName, 'images', d, d).then(async(data) => {
                        if (data) {
                            fs.unlink(d, function(err) {
                                if (err) throw err;
                                console.log('File deleted!');
                            });
                            resolve(data);

                        } else {
                            reject(error);
                        }
                    })
                } else if (folder.Key != "images/") {
                    //create new folder
                    s3Bucket.createFolder('images').then((result) => {
                        s3Bucket.uploadFile(process.env.bucketName, 'images', d, d).then(async(data) => {
                            if (data) {
                                fs.unlink(d, function(err) {
                                    if (err) throw err;
                                    console.log('File deleted!');
                                });
                                resolve(data);

                            } else {
                                reject(error);
                            }
                        })
                    })
                }
            })
        })
    })
}

async function uploadVideo(videoFile) {
    const date = new Date();
    return await new Promise((resolve, reject) => {
        let d = date.getTime() + videoFile.name.toString();;
        fs.writeFile(d, videoFile.data, 'binary', async function() {
            s3Bucket.getFolders('videos/').then((folder) => {
                if (folder.Key == "videos/") {
                    s3Bucket.uploadFile(process.env.bucketName, 'videos', d, d).then(async(data) => {
                        if (data) {
                            fs.unlink(d, function(err) {
                                if (err) throw err;
                                console.log('File deleted!');
                            });
                            resolve(data);

                        } else {
                            reject(error);
                        }
                    })
                } else if (folder.Key != "videos/") {
                    //create new folder
                    s3Bucket.createFolder('videos').then((result) => {
                        s3Bucket.uploadFile(process.env.bucketName, 'videos', d, d).then(async(data) => {
                            if (data) {
                                fs.unlink(d, function(err) {
                                    if (err) throw err;
                                    console.log('File deleted!');
                                });
                                resolve(data);

                            } else {
                                reject(error);
                            }
                        })
                    })
                }
            })
        })
    })
}

async function uploadMultipleImg(imgArray, objField, type) {
    return await new Promise((resolve, reject) => {
        let imagesArr = [];
        console.log(imgArray);
        imgArray.map(async(x, i) => {
            let reponseImg = await uploadDocs(x);
            let obj = {};
            obj[objField + "Image"] = reponseImg.Location;
            obj[objField + "PublicId"] = reponseImg.key;
            imagesArr.push(obj);
            if (imagesArr.length == imgArray.length) {
                resolve(imagesArr);
            }
        })
        return imagesArr;
    })
}

/**for image upload */
async function fileUpload(req, fieldName, objField, type = "1") { //1 single 2 multiple
    let filesArray = req.files;
    if (filesArray) {
        if (type == 2) {
            let responseImg = [];
            if (filesArray[fieldName].length == undefined) {
                responseImg = await uploadMultipleImg([
                    filesArray[fieldName]
                ], objField);
            } else {
                responseImg = await uploadMultipleImg(
                    filesArray[fieldName], objField
                );
            }
            req.body[fieldName] = responseImg;
        } else {
            let responseImg = await uploadDocs(filesArray[fieldName]);
            req.body[objField + "Image"] = responseImg.Location;
            req.body[objField + "PublicId"] = responseImg.key;
        }
    } else {
        return 2;
    }
}

module.exports = {
    uploadDocs,
    uploadVideo,
    uploadMultipleImg,
    fileUpload
}