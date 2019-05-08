const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors')
const path = require('path');

const productRouters = require("./api/routes/people");

// connect to mongodb
// var db = {};
// var mongoDbUri ='mongodb+srv://addressbook:'+ process.env.MONGO_ATLAS_PW + '@addressbook-vfqyr.mongodb.net/test?retryWrites=true';
// var settings = {
//       reconnectTries : Number.MAX_VALUE,
//       autoReconnect : true,
//       useNewUrlParser: true
// };
// mongoose.connect(mongoDbUri, settings, function(err, dbref) {
//   if (!err) {
//     console.log("Mongodb connected");
//     db = dbref;
//   }else{
//     console.log("Error while connecting to mongoDB" + err);
//   }
// });


mongoose.connect('mongodb+srv://addressbook:'+ process.env.MONGO_ATLAS_PW + '@addressbook-vfqyr.mongodb.net/test?retryWrites=true',
    { 
    useNewUrlParser: true 
    }
);
mongoose.Promise = global.Promise;

// adding middleware -cors
app.use(cors());

// static files
app.use(express.static(path.join(__dirname,'public')));

app.use(morgan('dev'));

// body-parse
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

// Routes which shuold handle requests
app.use('/people',productRouters);

// handle CORS
app.use((req, res, next)=>{
    res.header('Access-Control-Allow-Origin','*');
    res.header('Access-Control-Allow-Headers','Origin, X-Requsted-With, Content-Type, Accept, Authorization');
    if(req.method === 'OPTIONS'){
        res.header('Access-Control-Allow-Methods','PUT, POST, PATCH, DELET');
        return res.status(200).json({});
    }
    next();
});

// error handler
app.use((req, res,next) => {
    const error = new Error('Not found');
    error.status = 404;
    next(error);
});

app.use((error,req, res,next) => {
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message
        }
    });
});

module.exports = app;

// set 'key' and 'value' pair
localStorage.setItem("key","value");                   
localStorage.key = "value"  
///get the value of the key  
var valueLocal = localStorage.getItem("key");  
var valueLocal = localStorage.key;  
//remove the 'key','value' pair   
localStorage.removeItem('key');   
//delete all of data 
localStorage.clear();                                  
