const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Schema = mongoose.Schema;

let userSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: 'Full name can\'t be empty'
    },
    email: {
        type: String,
        required: 'Email can\'t be empty',
        unique: true
    },
    password: {
        type: String,
        required: 'Password can\'t be empty',
        minlength: [4, 'Password must be atleast 4 character long']
    },
    role:{
        type:String,
    },
    height: {
        type:String,
    },
    weight: {
        type:String,
    },
    videos: [
        
            {
                type: Schema.Types.ObjectId,
                ref: 'Video'   
            }
        
    ],
    follower:
    [
        {
            type: Schema.Types.ObjectId,
            ref: 'User'   
        }
    ],
    following: 
    [
        {
            type: Schema.Types.ObjectId,
            ref: 'User'  
        }
    ],  
    imgurl:{
        type: String
    },
    saltSecret: String
});

// Custom validation for email
userSchema.path('email').validate((val) => {
    emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return emailRegex.test(val);
}, 'Invalid e-mail.');

// Events function. It will be called before save
// userSchema.pre('save', function (next) {
//     bcrypt.genSalt(10, (err, salt) => {
//         bcrypt.hash(this.password, salt, (err, hash) => {
//             this.password = hash;
//             this.saltSecret = salt;
//             next();
//         });
//     });
// });


// Methods
// userSchema.methods.verifyPassword = function (password) {
//     return password===this.password;

// userSchema.methods.bcyptPassword = function (password) {
//     bcrypt.genSalt(10, (err, salt) => {
//         bcrypt.hash(password, salt, (err, hash) => {
//             password = hash;
//             this.saltSecret = salt;
//             // next();
//             console.log(password+"啊")
//             return password;
            
//         });
//     });
// };

// Methods
userSchema.methods.verifyPassword = function (password) {
    if(password === this.password){
    return (password === this.password);
    }else
    return bcrypt.compareSync(password, this.password);
};

userSchema.methods.generateJwt = function () {
    return jwt.sign({ _id: this._id},
        process.env.JWT_SECRET,
    {
        expiresIn: process.env.JWT_EXP
    }
    );
}



module.exports = mongoose.model('User', userSchema);