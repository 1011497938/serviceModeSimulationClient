var express = require('express');
var path = require('path');
var app = express();


const startHome = () =>　{
    app.use(express.static(path.join(__dirname, 'public')))

    app.listen(3001, function() {
     console.log('App listening at port 3001;');
    });    
}

module.exports = startHome