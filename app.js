const {
  db,
  auth,
  Users, 
  cors, 
  path, 
  app,
  port,
  TWO_HOURS,
  express,
  session,
  bodyParser,
  sqlSessionConnection, 
  adminRoutes, 
  page404Routes, 
  shopRoutes
} = require('./env');
  
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

app.use(
  session({
    secret: 'Vector',
    store: new sqlSessionConnection({db: db}),
    resave: false,
    proxy: true,
    saveUninitialized: false,
    cookie: {
      maxAge: TWO_HOURS,
      sameSite: true,
      secure: false
    }
  })
);

//set user to every incoming request..
app.use((req, res, next) => {
  if (!req.session.user) {
    req.isLoggedIn = false;
    return next();
  }

  Users.findOne({where:{id: req.session.user.id}})
  .then(user => {
    if(!user) {
      req.isLoggedIn = false;
      return next();
    }
    
    req.isLoggedIn = true;
    req.user = user.dataValues;
    return next(); 
  })
  .catch(console.log);
});

//load all express routes
app.use('/auth', auth);
app.use('/admin', shopRoutes);
app.use(adminRoutes);
app.use(page404Routes);

db.sync()
  .then(
    _ => {
      app.listen(port);
      console.log(`Your app is runing on: http://localhost:${port}`)
    },
    err => {
      console.log(err);
    }
  );

