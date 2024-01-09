const Express = require("express");

const router = Express.Router();

const user_controller = require('./user.controller')

router.post('/signup',user_controller.createUser)
router.post('/login',user_controller.loginUser)
router.post('/forget-password',user_controller.forget_password)

module.exports = router;

