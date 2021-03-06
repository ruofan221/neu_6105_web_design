const mongoose = require('mongoose');

const peopleSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: {type: String,required: true},
    phone: {type: String,required: true},
    email: {type: String,required: true},
    address: {type: String,required: true},
    city: {type: String,required: true},  
},{
    versionKey:false
}
);

module.exports = mongoose.model('People', peopleSchema);