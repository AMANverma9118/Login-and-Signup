const Express = require("express");

const rootRouter = Express.Router();

const users = require('./user.route');

rootRouter.use('/',users)

module.exports = rootRouter