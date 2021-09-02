const mongoose = require('mongoose');


const URI = 'mongodb+srv://jaiber:nintendo64@freecluster.2o9li.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';

mongoose.connect(URI)
    .then(db => console.log('base esta conectada'))
        
    .catch(err => console.error(err));

module.exports = mongoose;
        
    