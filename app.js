const {
  db,
  cors, 
  path, 
  app,
  port,
  TWO_HOURS,
  express,
  session,
  flash,
  csrf,
  bodyParser,
  sqlSessionConnection, 
  adminRoutes, 
  authRoutes, 
  cartRoutes, 
  orderRoutes, 
  homeRoutes,
  profileRoutes,
  productRoutes,
  page404Routes, 
  initUserMeddleware,
  RunRelation
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

//check authorization user for every request...
app.use(initUserMeddleware);

//init csrf token for more scure
app.use(csrf());

//init flash message for every request...
app.use(flash());

//set a local variables to all respones...
app.use((req, res, next) => {
  res.locals.csrfToken = req.csrfToken();
  res.locals.isLoggedIn = !!req.user;
  res.locals.errors = req.flash('error');
  res.locals.username = !!req.user ? req.user.name : '';
  next();
})

//load all express routes
app.use('/auth', authRoutes);
app.use('/admin', adminRoutes);
app.use('/cart', cartRoutes);
app.use('/order', orderRoutes);
app.use('/profile', profileRoutes);
app.use('/product', productRoutes);
app.use(homeRoutes);
app.use(page404Routes);

//Define relationships
RunRelation();

db.sync({ force: false })
  .then(
    _ => {
      app.listen(port);
      console.log(`Your app is runing on: http://localhost:${port}`)
    },
    err => {
      console.log(err);
    }
  );
