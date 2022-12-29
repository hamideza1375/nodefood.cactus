const express = require("express");
const mongoose = require('mongoose');
const fileUpload = require("express-fileupload");
const winston = require('winston');
const dotEnv = require("dotenv"); dotEnv.config({ path: "./.env" }); // process.env.SECRET
const { setHeaders } = require("./middleware/headers");
const Food = require("./router/FoodRouter");
const User = require("./router/UserRouter");
const Admin = require("./router/AdminRouter");
const ErrorMiddleware = require('./middleware/Error');

const app = express();

winston.add(new winston.transports.File({ filename: 'error-log.log' }));
process.on('uncaughtException', (err) => {
  console.log(err);
  winston.error(err.message);
});
process.on('unhandledRejection', (err) => {
  console.log(err);
  winston.error(err.message);
});

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(setHeaders);
app.use(express.static("public"));
app.use(express.static("node_modules"));

app.set('view engine', 'ejs');
app.set('views', './views');

app.use(fileUpload());
app.use(ErrorMiddleware);

app.use(Food)
app.use(User)
app.use(Admin)

app.use((req, res) => res.send("<h1 style='text-align:center;color:red; font-size:55px'> 404 </h1>"));

const port = 4000
app.listen(port, (err) => { console.log(`App Listen to port ${port}`) })

mongoose.connect(
  "mongodb://localhost:27017/amozesh2",
  {
    useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false,
    useCreateIndex: true 

  })  .then(() => console.log('db connected'))
  .catch((err) => console.error('db not connected', err));

