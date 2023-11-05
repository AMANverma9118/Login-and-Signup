const Express = require("express");

const router = Express.Router();

const user_controller = require('./user.controller')

router.post('/signup',user_controller.createUser)
router.post('/login',user_controller.loginUser)

module.exports = router;

