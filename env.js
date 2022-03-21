exports.express = require('express');
exports.session = require('express-session')
exports.path = require('path');
exports.bodyParser = require('body-parser');
exports.cors = require('cors');

exports.db = require('./src/util/connection');
exports.sqlSessionConnection = require("connect-session-sequelize")(this.session.Store);

exports.auth = require('./src/routes/auth/users');
exports.adminRoutes = require('./src/routes/admin');
exports.shopRoutes = require('./src/routes/shop');
exports.page404Routes = require('./src/routes/pageNotFound');

const { initUser } = require('./src/util/middleware/auth.middleware');
exports.initUserMeddleware = initUser;

exports.Users = require('./src/data/migrations/users');
exports.Products = require('./src/data/migrations/products');

exports.app = this.express();
exports.router = this.express.Router();
exports.port = 3000;
exports.TWO_HOURS = 1000*60*60*2; //Two hours..