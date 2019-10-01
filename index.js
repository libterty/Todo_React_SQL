const express = require('express');
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const path = require('path');

const router = require('./routes/route');

const app = express();

const port = 3001;

app.engine(
  'handlebars',
  exphbs({
    extname: '.handlebars',
    defaultLayout: 'main',
    layoutsDir: ('views', path.join(__dirname, 'views/layout'))
  })
);
app.set('view engine', 'handlebars');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride('_method'));

// 設定路由
app.use('/', router);

// 設定 express port 3000
app.listen(port, () => {
  console.log(`App is running on port ${port}!`);
});
