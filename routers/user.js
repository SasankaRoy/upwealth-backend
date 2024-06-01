const {Router} = require('express');
const {userSignup,userLogin} = require('../controllers/user');
const  checkUserSession  = require('../controllers/userSession');

const userRouter = Router();

// ROUTES 

userRouter.post('/signup',userSignup);
userRouter.post('/signin', userLogin);
userRouter.post('/session',checkUserSession);
module.exports = userRouter;