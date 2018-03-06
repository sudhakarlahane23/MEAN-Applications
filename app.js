const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');
const bodyParser = require('body-parser');

// var mongoose = require('mongoose');
// mongoose.Promise = require('bluebird');
// mongoose.connect('mongodb://localhost/mean-angular5', { useMongoClient: true, promiseLibrary: require('bluebird') })
//   .then(() =>  console.log('connection succesful'))
//   .catch((err) => console.error(err));

const MongoClient = require('mongodb').MongoClient;
const url = 'mongodb://localhost:27017/';

MongoClient.connect(url, function(err, db) {
    if(err) {
        throw err;
    } else {
        const dbo = db.db('mydb');
        dbo.collection('products').find({}).toArray(function(err, result) {
            console.log(result);
            db.close();
        })
    }
})

const book = require('./routes/book');
const app = express();

app.use(logger('div'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({'extended':'false'}));
app.use(express.static(path.join(__dirname,'dist')));
app.use('/books', express.static(path.join(__dirname,'dist')));
app.use('/book', book);

// Catch 404 and forward to error handler
app.use(function(req,res,next) {
    var err = new Error('Not Found');
    srr.status = 400;
    next(err);
});

// Error handler
app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err: {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

module.exports = app;