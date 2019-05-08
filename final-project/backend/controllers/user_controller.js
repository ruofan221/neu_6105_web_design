const mongoose = require('mongoose');
const passport = require('passport');
const _ = require('lodash');
const bcrypt = require('bcryptjs');
const User = mongoose.model('User');

/**
 * Creates a new User with the request JSON and
 * returns sticky JSON object.
 *
 * @param {req} {HTTP request object}
 * @param {res} {HTTP response object}
 * @param {next} {HTTP next object}
 */
module.exports.register = (req, res, next) => {
    let user = new User();
    // add user information
    user._id = new mongoose.Types.ObjectId();
    user.fullName = req.body.fullName;
    user.email = req.body.email;
    user.password = req.body.password;
    user.role=req.body.role;
    bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(req.body.password, salt, (err, hash) => {
            req.body.password = hash;
            this.saltSecret = salt;
            user.password = req.body.password;
            user.save((err, doc) => {
                if (!err)
                    res.send(doc);
                else {
                    if (err.code == 11000)
                        res.status(422).send(['Duplicate email adrress found.']);
                    else
                        return next(err);
                }
        
            });
        });
    }); 
}

/**
 * Authenticate the user
 * 
 * 
 * @param {req} {HTTP request object}
 * @param {res} {HTTP response object}
 * @param {next} {HTTP next object}
 */
module.exports.authenticate = (req, res, next) => {
    // call for passport authentication
    passport.authenticate('local', (err, user, info) => {       
        // error from passport middleware
        if (err) return res.status(400).json(err);
        // registered user
        else if (user) return res.status(200).json({ "token": user.generateJwt() });
        // unknown user or wrong password
        else return res.status(404).json(info);
    })(req, res);
}

/**
 * Creates a new User with the request JSON and
 * returns sticky JSON object.
 *
 * @param {req} {HTTP request object}
 * @param {res} {HTTP response object}
 * @param {next} {HTTP next object}
 */
module.exports.userList =(req, res, next) => {
    User.find((err, users) => {
        if (err)
            console.log(err);
        else
            res.json(users);
    });
};


/**
 * Update user profile
 * 
 *
 * @param {req} {HTTP request object}
 * @param {res} {HTTP response object}
 * @param {next} {HTTP next object}
 */
module.exports.userProfile = (req, res, next) =>{
    User.findOne({ _id: req._id },
        (err, user) => {
            if (!user)
                return res.status(404).json({ status: false, message: 'User record not found.' });
            else
                return res.status(200).json({ status: true, user : user });
        }
    );
}

/**
 * Get a new User with the request JSON
 * 
 *
 * @param {req} {HTTP request object}
 * @param {res} {HTTP response object}
 * @param {next} {HTTP next object}
 */
module.exports.getUser = (req, res, next) => {
    let id = req.params.userId;
    User.findById(id).then(user =>{
        if(!user) {
            const error = new Error('Could not find user');
            error.statusCode = 404;
            throw error;
        }
        res.status(200).json({
            message: 'User fetched',user
        })
    }).catch(err => {
            if(!err.statusCode) {
                err.statusCode = 500;
            }
        
    });
}

/**
 * Update a new User with the request JSON
 * 
 *
 * @param {req} {HTTP request object}
 * @param {res} {HTTP response object}
 * @param {next} {HTTP next object}
 */
module.exports.updateUser = (req, res, next) => {
    User.findByIdAndUpdate(req.params.userId, req.body, function (err, post) {
      if (err) return next(err);
      res.json(post);
    });
  }

/**
 * Follow a coach with the request JSON
 * 
 *
 * @param {req} {HTTP request object}
 * @param {res} {HTTP response object}
 * @param {next} {HTTP next object}
 */
module.exports.Follow = (req, res, next) => {
    let videoId = req.params.videoId;
    User.findById(req.body.id).then(coach =>{
        if(!coach){
            const error = new Error('Could not find coach');
            error.statusCode = 404;
            throw error;
        }else{
            User.findById(req._id).then(user=>{
                coach.follower.push(user);
                 return coach.save();
            })
            let addeduser;
            coach.save().then(result=>{
                //find user based on passed id 不确定是不是用req.userId来get
                return User.findById(req._id);
            })
            .then(user=>{
                addeduser =user;
                addeduser.following.push(coach);
                // video.user.push(user);
                return user.save();
            }).then(result =>{
                res.status(201).json({
                    message:'follow a coach',
                })
            }).catch(err =>{
                if(!err.statusCode){
                    err.statusCode = 500;
                }
                next(err)
            })
        }
    })
}


/**
 * Update a user with the request JSON
 * 
 *
 * @param {req} {HTTP request object}
 * @param {res} {HTTP response object}
 * @param {next} {HTTP next object}
 */
module.exports.cancelFollowing = (req, res, next) => {
    let videoId = req.params.videoId;
    User.findById(req.body.id).then(coach =>{
        if(!coach){
            const error = new Error('Could not find coach');
            error.statusCode = 404;
            throw error;
        }else{
            User.findById(req._id).then(user=>{
                coach.follower.pull(user);
                 return coach.save();
            })
            let addeduser;
            coach.save().then(result=>{
                return User.findById(req._id);
            })
            .then(user=>{
                addeduser =user;
                addeduser.following.pull(coach);
                return user.save();
            }).then(result =>{
                res.status(201).json({
                    message:'unfollow a coach',
                })
            }).catch(err =>{
                if(!err.statusCode){
                    err.statusCode = 500;
                }
                next(err)
            })
        }
    })
} 
