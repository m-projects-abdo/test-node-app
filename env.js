exports.express = require('express');
exports.session = require('express-session')
exports.path = require('path');
exports.bodyParser = require('body-parser');
exports.cors = require('cors');

exports.db = require('./src/util/connection');
exports.sqlSessionConnection = require("connect-session-sequelize")(this.session.Store);

exports.authRoutes = require('./src/routes/auth');
exports.profileRoutes = require('./src/routes/profile');
exports.productRoutes = require('./src/routes/product');
exports.adminRoutes = require('./src/routes/admin');
exports.homeRoutes = require('./src/routes/home');
exports.cartRoutes = require('./src/routes/cart');
exports.orderRoutes = require('./src/routes/order');
exports.page404Routes = require('./src/routes/pageNotFound');

const { initUser } = require('./src/util/middleware/auth.middleware');
exports.initUserMeddleware = initUser;

const { RunRelation } = require('./src/data/index');
exports.RunRelation = RunRelation;

exports.User = require('./src/data/model/user.model');
exports.Product = require('./src/data/model/product.model');

exports.app = this.express();
exports.router = this.express.Router();
exports.port = 3000;
exports.TWO_HOURS = 1000*60*60*2; //Two hours..