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

exports.app = this.express();
exports.port = 3000;
exports.TWO_HOURS = 1000*10;//* 60 * 60 * 2;