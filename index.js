const express = require('express');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const path = require('path');
const session = require('express-session');
const passport = require('passport');
const flash = require('flash');
const cors = require('cors');

const app = express();

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

const port = process.env.PORT || 3001;

app.use(
  cors({
    origin: true
  })
);

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'client/dist')));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride('_method'));

app.use(
  session({
    secret: 'your secret key',
    resave: 'false',
    saveUninitialized: 'false'
  })
);
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());
require('./config/passport')(passport);

app.use((req, res, next) => {
  res.locals.user = req.user;
  res.locals.isAuthenticated = req.isAuthenticated();

  next();
});

app.use('/', require('./routes/Home'));
app.use('/users', require('./routes/user'));
app.use('/auth', require('./routes/facebook-auth'));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'client/dist/index.html'));
});

// 設定 express port 3000
app.listen(port, () => {
  console.log(`App is running on port ${port}!`);
});
