

const router = require('express').Router();
const controller = require('./controller');
const User = require('./User');
const passport = require('passport');
const customMiddleware = require('../custom_middleware.js');
router.get('/sign-in',controller.render_sign_in);
router.get('/sign-out',controller.sign_out);
router.get('/sign-up',controller.render_sign_up);
router.post('/auth',controller.haveAccount,passport.authenticate('local', { failureRedirect: '/user/sign-in' }),(req,res) => {
    res.redirect('/user/home');
});
router.post('/create',controller.create);
router.get('/home',passport.checkAuthentication,(req,res,next) => {
    console.log('on the way to home,auth done');
    next();
},customMiddleware.create_comments,controller.render_home);


router.get('/profile',passport.checkAuthentication,controller.profile)
router.post('/profile/update',passport.checkAuthentication,controller.updateProfile)

module.exports = router;