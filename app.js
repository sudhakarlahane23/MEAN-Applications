const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('body-parser');

const book = require('./route/book');
const app = express();

app.use(logger('div'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({'extended':'false'}));
ap.use(express.static(path.join(__dirname,'dist')));
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