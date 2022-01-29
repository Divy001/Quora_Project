const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const ansController = require('../controllers/ansController')
const quesController = require('../controllers/quesController')
const userController = require('../controllers/userController')

const middleware = require('../middleware/appMiddleWare')
const validation = require('../validation/validator')

//User Routes

router.post("/register",validation.checkUser,userController.RegisterUser);
router.post("/logIn",userController.login);
router.get("/user/:userId/profile",middleware.appMiddleware,userController.getUserDetails);
router.put("/user/:userId/profile",middleware.appMiddleware,validation.updateUser,userController.updateUser);

//Questions Routes

  router.post("/question",middleware.appMiddleware,quesController.questionDetails)
  router.get("/questionWithAnswer",quesController.allQueAns)
  router.get("/questionWithAnswer/:questionId",quesController.getParticularQuestion)
  router.put("/updateQuestion/:questionId",middleware.appMiddleware,quesController.updateQuestion)
  router.delete("/deleteQuestion/:questionId",middleware.appMiddleware,quesController.questionDelete)

//Answer Routes

  router.post("/answer",middleware.appMiddleware,ansController.answerDetails);
  router.get("/questions/:questionId/answers",ansController.getAnswerDetail);
  router.put("/answers/:answerId",middleware.appMiddleware,ansController.updateAnswer)
  router.delete("/answers/:answerId",middleware.appMiddleware,ansController.deleteAnswer)

  module.exports=router


  