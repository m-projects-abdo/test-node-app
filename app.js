const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const auth = require('./src/routes/auth/users');
const adminRoutes = require('./src/routes/admin');
const shopRoutes = require('./src/routes/shop');
const page404Routes = require('./src/routes/pageNotFound');

const port = 3000;
const app = express();
const db = require('./src/util/connection');

//Set pug as render engine
// app.set('view engine', 'pug');

//Set EJS as render engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'src', 'view', 'ejs'));

//use cors to enable on local server
app.use(cors());
//recive post request with json format
app.use(bodyParser.json());
//use body pareser to parse our html page
app.use(bodyParser.urlencoded({extended: false}));
//use express static method to load all css files
app.use(express.static(path.join(__dirname, 'src', 'public')));

//load all express routes
app.use('/auth', auth);
app.use('/admin', shopRoutes);
app.use(adminRoutes);
app.use(page404Routes);

db.sync()
  .then(
    res => {
      app.listen(port);
      console.log(`Your app is runing on: http://localhost:${port}`)
    },
    err => {
      throw new Error(err);
    }
  );

