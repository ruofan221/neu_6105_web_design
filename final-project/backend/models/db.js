const mongoose = require('mongoose');

mongoose.connect('mongodb://fintnessapp:casual123.@fitnessapp-shard-00-00-qhv3g.mongodb.net:27017,fitnessapp-shard-00-01-qhv3g.mongodb.net:27017,fitnessapp-shard-00-02-qhv3g.mongodb.net:27017/test?ssl=true&replicaSet=FitnessApp-shard-0&authSource=admin&retryWrites=true'
,{ useNewUrlParser: true } 
);

mongoose.set('useCreateIndex', true);
mongoose.Promise = global.Promise;
require('./user_model');
require('./video_model')