const mongoose = require('mongoose');

const uri = "YOUR_MONGO_DB_URI_HERE";

mongoose.connect(uri)
    .then(db => console.log('DB is now falling'))
    .catch(err => console.error(err));
module.exports = mongoose;