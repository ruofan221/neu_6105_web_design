const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let videoSchema = new mongoose.Schema({
    Name: {
        type: String,
        required: 'Video name can\'t be empty'
    },
   
    Description:{
        type: String,
        required: 'Description can\'t be empty'
    },
    user: [
        {
            type: Schema.Types.ObjectId,
            ref: 'User'
        }
    ],
    creater: 
        {
            type: Schema.Types.ObjectId,
            ref: 'User'
        }
    ,
    like:{
        type: Number,
        default: 0 
    },
    likedBy: [
        {
            type: Schema.Types.ObjectId,
            ref: 'User'
        }
    ],
    comments:[{
        comment: { type: String},
        commentor: { type: String },
        reply:{type:String},
        replier:{ type: String}
    }],
    creatdate: {
        type: Date, 
        default: Date.now,
    },
    url:{
        type:String
    },
    coverurl:{
        type:String
    },
    saltSecret: String
});

module.exports = mongoose.model('Video', videoSchema );