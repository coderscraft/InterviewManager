'use strict';
var mongoose = require('mongoose');

var db = function () {
    return {
        config: function (conf) {
            //var connectionString = 'mongodb://' + conf.host + '/' + conf.database;
            var connectionString = 'mongodb://' + conf.user + ':' + conf.password + '@' + conf.host + ':' + conf.port + '/' + conf.database;
            console.log(connectionString);  
            mongoose.connect(connectionString);
            var db = mongoose.connection;
            db.on('error', console.error.bind(console, 'connection error:'));
            db.once('open', function callback() {
                console.log('db connection open');
            });
        }
    };
};

module.exports = db();