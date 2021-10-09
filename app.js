var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors');

let db = require('./models/database');

async function createDB() {
    await db.sequelize
        .sync({ alter: true, force: true })
        .then(() => {
            return Promise.resolve();
        })
        .catch(err => {
            return Promise.reject(err);
        });
}

createDB();

var app = express();
app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

let {
    usersRouter,
    petsRoute,
} = require("./routes/");

app.use('/users', usersRouter);
app.use('/pets', petsRoute);
module.exports = app;