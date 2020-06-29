const express = require('express');
const morgan = require('morgan');
const path = require('path');

const { mongoose } = require('./database');

const app = express();

// settings
app.set('port', process.env.PORT || 3000);

// middlewares
app.use(morgan('dev'));
app.use(express.json());

// routes
app.use('/api/tasks', require('./routes/task'))
// static files
app.use(express.static(path.join(__dirname, 'public')))

// serverLaunch
app.listen(app.get('port'), () => {
    console.log(`listening on port ${app.get('port')}`);
});