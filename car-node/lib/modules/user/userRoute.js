// ===================================Load Internal Modules================================================================================
const usrRoutr = require('express').Router()
const resHndlr = require('../../responseHandler')
const usrFacade = require('./userFacade')
const jwtHandler = require('../../jwtHandler')
const validators = require('./userValidators')
const userConstants = require('./userConstants')
const path = require('path')
// const notification = require('../../middleware/notification')

// ====================================Load Modules End======================================================================


// ---------------------------------------------------------------frontend
/** for register Users [validators.validateRegister], */
usrRoutr
  .route('/signUp_User/:lang')
  .post((req, res) => {
    usrFacade.signup(req, res).then(result => {
      resHndlr.sendSuccess(res, result)
    }).catch(err => {
      resHndlr.sendError(res, err)
    })
  })


  // [jwtHandler.verifyAdminToken]
/** for get all Provder list */
usrRoutr.route('/getAllProviderList/:accountType')
.post((req, res) => {
  usrFacade.getAllProviderList(req, res).then((result) => {
    resHndlr.sendSuccess(res, result)
  }).catch((err) => {
    resHndlr.sendError(res, err)
  })
})

usrRoutr.route('/getAllBuyerList/:accountType')
.post((req, res) => {
  usrFacade.getAllBuyerList(req, res).then((result) => {
    resHndlr.sendSuccess(res, result)
  }).catch((err) => {
    resHndlr.sendError(res, err)
  })
})

// [jwtHandler.verifyAdminToken],
/** for fetch user details */
usrRoutr.route('/fetchUserDetails/:accountType/:id')
  .get( (req, res) => {
    usrFacade.fetchUserDetails(req, res).then((result) => {
      resHndlr.sendSuccess(res, result)
    }).catch((err) => {
      resHndlr.sendError(res, err)
    })
  })

  // for update profile
  // jwtHandler.verifyAdminToken, 
  // [validators.validateDetail, validators.validateId],
usrRoutr.route("/updateDetails/:accountType/:id")
.put( (req, res) => {
  usrFacade.updateDetails(req, res).then((result) => {
        resHndlr.sendSuccess(res, result);
    }).catch((err) => {
        resHndlr.sendError(res, err);
    })
})

  /** for change status */
  // jwtHandler.verifyAdminToken,
usrRoutr.route('/changeStatus/:id')
.put([ validators.validateId, validators.checkStatus], (req, res) => {
  usrFacade.changeStatus(req, res).then((result) => {
        resHndlr.sendSuccess(res, result);
    }).catch((err) => {
        resHndlr.sendError(res, err);
    });
})

/**for Delete Details */
// jwtHandler.verifyAdminToken,
usrRoutr.route('/deleteDetail/:id')
    .delete([ validators.validateId], (req, res) => {
      usrFacade.deleteDetail(req, res).then((result) => {
            resHndlr.sendSuccess(res, result);
        }).catch((err) => {
            resHndlr.sendError(res, err);
        });
    })


// /** for login users */
// usrRoutr.route('/login/:lang')
//   .post([validators.validateLogin], (req, res) => {
//     let { user_phoneNumber, user_password, user_deviceId, user_deviceType, user_fcmToken } = req.body
//     usrFacade.login(req,{ user_phoneNumber, user_password, user_deviceId, user_deviceType, user_fcmToken }).then(result => {
//       resHndlr.sendSuccess(res, result)
//     }).catch(err => {
//       resHndlr.sendError(res, err)
//     })
//   })


// /** for logout users */
// usrRoutr.route('/logout/:lang')
//   .get([jwtHandler.verifyToken], (req, res) => {
//     usrFacade.logout(req, res).then(result => {
//       resHndlr.sendSuccess(res, result)
//     }).catch(err => {
//       resHndlr.sendError(res, err)
//     })
//   })


// /** for check user exist or not */
// usrRoutr
//   .route('/checkUserExist/:lang')
//   .post([validators.validatePhoneNumber], (req, res) => {
//     usrFacade.checkUserExist(req, res).then(result => {
//       resHndlr.sendSuccess(res, result)
//     }).catch(err => {
//       resHndlr.sendError(res, err)
//     })
//   })


// /** for generate OTP for verify PhoneNumber */
// usrRoutr.route('/generateOtp/:lang').post([validators.validatePhoneNumber], (req, res) => {
//   usrFacade.generateOtp(req, res).then(result => {
//     resHndlr.sendSuccess(res, result)
//   }).catch(err => {
//     resHndlr.sendError(res, err)
//   })
// })

// /** for forgotPassword */
// usrRoutr
//   .route('/forgotPassword/:lang')
//   .post([validators.validatePhoneNumber], (req, res) => {
//     usrFacade.forgotPassword(req, res).then(result => {
//       resHndlr.sendSuccess(res, result)
//     }).catch(err => {
//       resHndlr.sendError(res, err)
//     })
//   })

// /** for check resetPassword  */
// usrRoutr
//   .route('/resetPassword/:lang')
//   .post([validators.validateResetPassword], (req, res) => {
//     usrFacade.resetPassword(req, res).then(result => {
//       resHndlr.sendSuccess(res, result)
//     }).catch(err => {
//       resHndlr.sendError(res, err)
//     })
//   })


// /** for check updatePassword  */
// usrRoutr
//   .route('/updatePassword/:lang')
//   .post([jwtHandler.verifyToken, validators.validateUpdatePassword], (req, res) => {
//     usrFacade.updatePassword(req, res).then(result => {
//       resHndlr.sendSuccess(res, result)
//     }).catch(err => {
//       resHndlr.sendError(res, err)
//     })
//   })

// /** for fetchUserProfile  */
// usrRoutr
//   .route('/viewProfile/:id/:lang')
//   // .get([jwtHandler.verifyToken,validators.validateId],(req,res) => {
//   .get([jwtHandler.verifyToken, validators.validateId], (req, res) => {
//     usrFacade.fetchUserProfile(req, res).then(result => {
//       resHndlr.sendSuccess(res, result)
//     }).catch(err => {
//       resHndlr.sendError(res, err)
//     })
//   })

// /** for createUserProfile  */
// usrRoutr
//   .route('/createUserProfile/:lang')
//   .post([jwtHandler.verifyToken, validators.createUserProfileValidator], (req, res) => {
//     usrFacade.createUserProfile(req, res).then(result => {
//       resHndlr.sendSuccess(res, result)
//     }).catch(err => {
//       resHndlr.sendError(res, err)
//     })
//   })

// /** for updateUserProfile  */
// usrRoutr
//   .route('/updateUserProfile/:lang')
//   .post([jwtHandler.verifyToken, validators.updateUserProfileValidator], (req, res) => {
//     usrFacade.updateUserProfile(req, res).then(result => {
//       resHndlr.sendSuccess(res, result)
//     }).catch(err => {
//       resHndlr.sendError(res, err)
//     })
//   })

// /** for check changePassword after login  */
// usrRoutr
//   .route('/changePassword/:lang')
//   .post([jwtHandler.verifyToken, validators.validateUpdatePassword], (req, res) => {
//     usrFacade.updatePassword(req, res).then(result => {
//       resHndlr.sendSuccess(res, result)
//     }).catch(err => {
//       resHndlr.sendError(res, err)
//     })
//   })


// // /** for connect parent API */
// // usrRoutr
// //   .route('/getParentConnectCode/:lang')
// //   .get([jwtHandler.verifyToken], (req, res) => {
// //     usrFacade.getParentConnectCode(req, res).then(result => {
// //       resHndlr.sendSuccess(res, result)
// //     }).catch(err => {
// //       resHndlr.sendError(res, err)
// //     })
// //   })

// // /** for studentConnect */
// // usrRoutr.route('/studentConnect/:lang')
// //   .post([jwtHandler.verifyToken, validators.validateParentCode], (req, res) => {
// //     usrFacade.getStudentConnect(req, res).then((result) => {
// //       resHndlr.sendSuccess(res, result)
// //     }).catch((err) => {
// //       resHndlr.sendError(res, err)
// //     })
// //   })

// /** for switchLanguage */ 
// usrRoutr.route('/switchLanguage/:id/:lang') //user_id
//   .post([jwtHandler.verifyToken, validators.validateId, validators.checkLanguage], (req, res) => {
//     usrFacade.switchLanguage(req, res).then((result) => {
//       resHndlr.sendSuccess(res, result)
//     }).catch((err) => {
//       resHndlr.sendError(res, err)
//     })
//   })
// // /** for view Course */
// // usrRoutr.route('/viewCourses/:id/:lang') //id = studentId 
// //   .get([jwtHandler.verifyToken, validators.validateId, validators.checkLanguage], (req, res) => {
// //     usrFacade.viewCourses(req, res).then((result) => {
// //       resHndlr.sendSuccess(res, result)
// //     }).catch((err) => {
// //       resHndlr.sendError(res, err)
// //     })
// //   })



// // --------------------------------------------------------------- end ---------frontend


// /** for get all students list */
// usrRoutr.route('/getAllStudentList/:accountType')
//   .post([jwtHandler.verifyAdminToken], (req, res) => {
//     usrFacade.getAllStudentList(req, res).then((result) => {
//       resHndlr.sendSuccess(res, result)
//     }).catch((err) => {
//       resHndlr.sendError(res, err)
//     })
//   })



// /**for get all parents list*/
// usrRoutr.route('/getAllParentList/:accountType')
//   .post([jwtHandler.verifyAdminToken], (req, res) => {
//     usrFacade.getAllParentList(req, res).then((result) => {
//       resHndlr.sendSuccess(res, result)
//     }).catch((err) => {
//       resHndlr.sendError(res, err)
//     })
//   })


// /** for fetch user details */
// usrRoutr.route('/fetchUserDetails/:accountType/:id')
//   .get([jwtHandler.verifyAdminToken], (req, res) => {
//     usrFacade.fetchUserDetails(req, res).then((result) => {
//       resHndlr.sendSuccess(res, result)
//     }).catch((err) => {
//       resHndlr.sendError(res, err)
//     })
//   })


// /***********************************For Delete Section****************************** */
// // 
// /**for soft delete user details */
// usrRoutr.route('/deleteUser/:id')
//   .delete([jwtHandler.verifyAdminToken], (req, res) => {
//     usrFacade.deleteUserById(req, res).then((result) => {
//       resHndlr.sendSuccess(res, result);
//     }).catch((err) => {
//       resHndlr.sendError(res, err);
//     });
//   })


// /***********************************For Parent's Students****************************** */

// /** for parent's students list */
// usrRoutr.route('/parentStudentList/:id')
//   .post([jwtHandler.verifyAdminToken], (req, res) => {
//     usrFacade.parentStudentList(req, res).then((result) => {
//       resHndlr.sendSuccess(res, result)
//     }).catch((err) => {
//       resHndlr.sendError(res, err)
//     })
//   })



// //  Params ---------------
// // updType
// // updDocs

// usrRoutr.route('/uploadData')
//   .post([], (req, res) => {
//     usrFacade.uploadData(req, res).then((result) => {
//       resHndlr.sendSuccess(res, result)
//     }).catch((err) => {
//       resHndlr.sendError(res, err)
//     })
//   })


//   //  Params ---------------
// // updType
// // updDocs

// usrRoutr.route('/uploadMedia/:lang')
// .post([], (req, res) => {
//   usrFacade.uploadData(req, res).then((result) => {
//     resHndlr.sendSuccess(res, result)
//   }).catch((err) => {
//     resHndlr.sendError(res, err)
//   })
// })

// /**for announcements list Details */
// usrRoutr.route('/announcements/:id/:lang') //pass student id
//   .get([jwtHandler.verifyToken], (req, res) => {
//     usrFacade.getAnnouncements(req, res).then((result) => {
//       resHndlr.sendSuccess(res, result);
//     }).catch((err) => {
//       resHndlr.sendError(res, err);
//     });
//   })

// /**for save trial pack Details */
// usrRoutr.route('/trialPack/:lang') //pass student id
//   .post([jwtHandler.verifyToken], (req, res) => {
//     usrFacade.saveTrialPack(req, res).then((result) => {
//       resHndlr.sendSuccess(res, result);
//     }).catch((err) => {
//       resHndlr.sendError(res, err);
//     });
//   })
// /**for subscription list  */
// usrRoutr.route('/subscriptionPlan/:id/:lang') //pass student id
//   .get([jwtHandler.verifyToken, validators.validateId, validators.checkLanguage], (req, res) => {
//     usrFacade.subscriptionPlan(req, res).then((result) => {
//       resHndlr.sendSuccess(res, result);
//     }).catch((err) => {
//       resHndlr.sendError(res, err);
//     });
//   })

// /**for subscription list  */
// usrRoutr.route('/buySubscription/:id/:lang') //pass student id
//   .post([jwtHandler.verifyToken, validators.validateId, validators.validateGradeId], (req, res) => {
//     usrFacade.buySubscription(req, res).then((result) => {
//       resHndlr.sendSuccess(res, result);
//     }).catch((err) => {
//       resHndlr.sendError(res, err);
//     });
//   })

// /** for updateUserProfile  */
// usrRoutr
//   .route('/updateUserDetail/:id')
//   .post([jwtHandler.verifyAdminToken], (req, res) => {
//     usrFacade.updateUserDetail(req, res).then(result => {
//       resHndlr.sendSuccess(res, result)
//     }).catch(err => {
//       resHndlr.sendError(res, err)
//     })
//   })

// /**for state and grades list  */
// usrRoutr.route('/getStatesAndGrades/:lang') //pass lang
//   .get([jwtHandler.verifyToken, validators.checkLanguage], (req, res) => {
//     usrFacade.getStatesAndGrades(req, res).then((result) => {
//       resHndlr.sendSuccess(res, result);
//     }).catch((err) => {
//       resHndlr.sendError(res, err);
//     });
//   })



// // 
// /**for UnLink Student from Parent */
// usrRoutr.route('/unlink/:parentId/:studentId')
//   .delete([jwtHandler.verifyAdminToken], (req, res) => {
//     usrFacade.unlinkUser(req, res).then((result) => {
//       resHndlr.sendSuccess(res, result);
//     }).catch((err) => {
//       resHndlr.sendError(res, err);
//     });
//   })

// // --------------------------------------------------------------- start ---------frontend

// /**for UnLink Student from Parent app */
// usrRoutr.route('/unlinkStudent/:id/:lang')
//   .delete([jwtHandler.verifyToken], (req, res) => {
//     usrFacade.unlinkStudent(req, res).then((result) => {
//       resHndlr.sendSuccess(res, result);
//     }).catch((err) => {
//       resHndlr.sendError(res, err);
//     });
//   })
//   usrRoutr.route('/studentsList/:lang')
//   .get([jwtHandler.verifyToken], (req, res) => {
//     usrFacade.studentsList(req, res).then((result) => {
//       resHndlr.sendSuccess(res, result);
//     }).catch((err) => {
//       resHndlr.sendError(res, err);
//     });
//   })
  
//   usrRoutr.route('/testNotification')
//     .post((req, res) => {
//       try {
//               let notificationMeta = {
//                 notificationType: userConstants.NOTIFICATION_TYPES.LOGOUT,
//                 message: userConstants.MESSAGES.notificationLogoutMsg
//               }
//               notification.sendNotification('e99yMzBbSTqUiZYootGpG-:APA91bGWfvKX33SIUfoXKava5-wYya_RlgdXnp82rH6F19GVDodmJvW1X-Fhwxd6nLO1FZUHPCb6NbBuNlpp-lmrgmenTQEEhnbNQjGC65fMl1e0isyw4gVz2ZXBa-xZRH_E84Cye1IB',notificationMeta.message,process.env.appName,notificationMeta,true)
        
//       }
//       catch(err) {
//         resHndlr.sendError(res, err);
//       }
//     })
  
// /** for fetch all cms */
// usrRoutr.route('/getCMS/:type/:lang').get((req,res) => {
//   usrFacade
//     .getCMS(req,res)
//     .then(result => {
//       resHndlr.sendSuccess(res,result)
//     })
//     .catch(err => {
//       resHndlr.sendError(res,err)
//     })
// })
// --------------------------------------------------------------- end ---------frontend

// export modules
module.exports = usrRoutr
