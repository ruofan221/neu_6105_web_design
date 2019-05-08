const path = require('path');
const { validationResult } = require('express-validator/check');
const video_service = require('../service/video_service')

const Video = require('../models/video_model')
const User = require('../models/user_model')

/**
 * Get all  Video with the request JSON
 * 
 *
 * @param {req} {HTTP request object}
 * @param {res} {HTTP response object}
 * @param {next} {HTTP next object}
 */
module.exports.getVideos = (req, res, next) => {
    Video.find((err, videos) => {
        res.status(200).json(videos);
    });
}

/**
 * Update a new Video with the request JSON
 * 
 *
 * @param {req} {HTTP request object}
 * @param {res} {HTTP response object}
 * @param {next} {HTTP next object}
 */
module.exports.getVideo = (req, res, next) => {
    let videoId = req.params.videoId;
    Video.findById(videoId).then(video => {
        if (!video) {
            const error = new Error('Could not find video');
            error.statusCode = 404;
            throw error;
        }
        res.status(200).json({
            message: 'Video fetched', video
        })
    }).catch(err => {
        if (!err.statusCode) {
            err.statusCode = 500;
        }; next(err)
    });
}

/**
 * Update a video with the request JSON
 * 
 *
 * @param {req} {HTTP request object}
 * @param {res} {HTTP response object}
 * @param {next} {HTTP next object}
 */
module.exports.postVideo = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const error = new Error('Validation failed, entered data is incorrect.');
        error.statusCode = 422;
        throw error;
    }
    let creater;
    const newVideo = new Video({
        url: req.body.url,
        coverurl: req.body.coverurl,
        Name: req.body.Name,
        Description: req.body.Description,
    });
    newVideo.save().then(result => {
        return User.findById(req._id);
    }).then(user => {
        creater = user;
        newVideo.creater = creater;
        newVideo.save((err) => {
            if (err) {
                res.json({ err: "Video creater saved failed!" })
            }
        })
        user.videos.push(newVideo);
        return user.save();
    }).then(result => {
        res.status(201).json({
            message: 'Video created successfully',
            Video: newVideo,
            creator: { _id: creater._id, name: creater.fullName }
        })
    })
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        })
}

/**
 * Update a video property with the request JSON
 * 
 *
 * @param {req} {HTTP request object}
 * @param {res} {HTTP response object}
 * @param {next} {HTTP next object}
 */
module.exports.cancelFavorite = (req, res, next) => {
    let videoId = req.params.videoId;
    Video.findById(videoId).then(video => {
        if (!video) {
            const error = new Error('Could not find video');
            error.statusCode = 404;
            throw error;
        } else {
            User.findById(req._id).then(user => {
                video.user.pull(user);
                return video.save();
            })
            let addeduser;
            //add user to video's userlist
            video.save().then(result => {
                //find user based on passed id 不确定是不是用req.userId来get
                return User.findById(req._id);
            }).then(user => {
                addeduser = user;
                addeduser.videos.pull(video);
                return user.save();
            }).then(result => {
                res.status(201).json({
                    message: 'Add a favorite video',
                })
            }).catch(err => {
                if (!err.statusCode) {
                    err.statusCode = 500;
                }
                next(err)
            })
        }
    })
}

/**
 * Update a video property with the request JSON
 * 
 *
 * @param {req} {HTTP request object}
 * @param {res} {HTTP response object}
 * @param {next} {HTTP next object}
 */
module.exports.favoriteVideo = (req, res, next) => {
    let videoId = req.params.videoId;
    Video.findById(videoId).then(video => {
        if (!video) {
            const error = new Error('Could not find video');
            error.statusCode = 404;
            throw error;
        } else {
            User.findById(req._id).then(user => {
                video.user.push(user);
                return video.save();
            })
            let addeduser;
            video.save().then(result => {
                console.log(req._id);
                //find user based on passed id 
                return User.findById(req._id);
            })
                .then(user => {
                    addeduser = user;
                    addeduser.videos.push(video);
                    // video.user.push(user);
                    return user.save();
                }).then(result => {
                    res.status(201).json({
                        message: 'Add a favorite video',
                    })
                }).catch(err => {
                    if (!err.statusCode) {
                        err.statusCode = 500;
                    }
                    next(err)
                })
        }
    })
}

/**
 * Delete a video with the request JSON
 * 
 *
 * @param {req} {HTTP request object}
 * @param {res} {HTTP response object}
 * @param {next} {HTTP next object}
 */
module.exports.deleteVideo = (req, res, next) => {
    const videoId = req.params.videoId;
    Video.findById(videoId).then(
        video => {
            if (!video) {
                const error = new Error('Could not find video.');
                error.statusCode = 404;
                throw error;
            }
            if (JSON.stringify(video.creator) !== req.userId) {
                const error = new Error('Not Authorized!');
                error.statusCode = 403;
                throw error;
            }
            return Video.deleteOne({ _id: videoId });
        })
        .then(result => {
            User.find()
                .exec()
                .then(docs => {
                    for (let u of docs) {
                        if (u.videos.indexOf(videoId) > 0) {
                            u.videos.pull(videoId);
                            u.save((err) => {
                                if (err) {
                                    res.json({
                                        err: "video delete failed!"
                                    })
                                }
                            });
                        }
                    }
                })
        })
}

/**
 * Update a video property with the request JSON
 * 
 *
 * @param {req} {HTTP request object}
 * @param {res} {HTTP response object}
 * @param {next} {HTTP next object}
 */
module.exports.updateVideo = (req, res, next) => {
    // console.log("backend works!");
    Video.findByIdAndUpdate(req.params.userId, req.body, function (err, post) {
        if (err) return next(err);
        res.json(post);
    });
}


/**
 * Update a video property with the request JSON
 * 
 *
 * @param {req} {HTTP request object}
 * @param {res} {HTTP response object}
 * @param {next} {HTTP next object}
 */
module.exports.likeVideo = (req, res, next) => {
    if (!req.body.videoid) {
        // Return error message
        res.json({ success: false, message: 'No id was provided.' });
    } else {
        // Search the database with id
        Video.findOne({ _id: req.body.videoid }, (err, video) => {
            if (err) {
                // Return error message
                res.json({ success: false, message: 'Invalid video id' });
            } else {
                // Check if id matched the id of a video post in the database
                if (!video) {
                    // Return error message
                    res.json({ success: false, message: 'That video was not found.' })
                } else {
                    // Get data from user that is signed in
                    User.findOne({ _id: req._id }, (err, user) => {
                        // Check if id of user in sessiong was found in the database
                        if (!user) {
                            res.json({ success: false, message: 'Could not authenticate user.' });
                        } else {
                            // Check if the user who liked the post has already liked the video post before
                            if (video.likedBy.indexOf(req._id) >= 0) {
                                res.json({ success: false, message: 'You already liked this video.' });
                            } else {
                                video.like++;
                                video.likedBy.push(user);
                                video.save((err) => {
                                    if (err) {
                                        res.json({ success: false, message: 'Something went wrong.' });
                                    } else {
                                        res.json({ success: true, message: 'Video liked!' });
                                    }
                                })
                            }
                        }
                    })
                }
            }
        })
    }
}

/**
 * Update a video property with the request JSON
 * 
 *
 * @param {req} {HTTP request object}
 * @param {res} {HTTP response object}
 * @param {next} {HTTP next object}
 */
module.exports.cancellikeVideo = (req, res, next) => {
    // console.log(req.body)
    if (!req.body.videoid) {
        // Return error message
        res.json({ success: false, message: 'No id was provided.' });
    } else {
        // Search the database with id
        Video.findOne({ _id: req.body.videoid }, (err, video) => {
            if (err) {
                // Return error message
                res.json({ success: false, message: 'Invalid video id' });
            } else {
                // Check if id matched the id of a video post in the database
                if (!video) {
                    // Return error message
                    res.json({ success: false, message: 'That video was not found.' })
                } else {
                    // Get data from user that is signed in
                    User.findOne({ _id: req._id }, (err, user) => {
                        // Check if id of user in sessiong was found in the database
                        if (!user) {
                            res.json({ success: false, message: 'Could not authenticate user.' });
                        } else {
                            // Check if the user who liked the post has already liked the video post before
                            if (video.likedBy.indexOf(user._id) < 0) {
                                res.json({ success: false, message: 'You already liked this video.' });
                            } else {
                                video.like--;
                                video.likedBy.pull(user);
                                video.save((err) => {
                                    if (err) {
                                        res.json({ success: false, message: 'Something went wrong.' });
                                    } else {
                                        res.json({ success: true, message: 'Video liked!' });
                                    }

                                })
                            }
                        }
                    })
                }
            }
        })
    }
}

/**
 * Update a video property with the request JSON
 * 
 *
 * @param {req} {HTTP request object}
 * @param {res} {HTTP response object}
 * @param {next} {HTTP next object}
 */
module.exports.postComment = (req, res, next) => {
    // Check if comment was provided in request body
    if (!req.body.comment) {
        res.json({ success: false, message: 'No comment provided' });
    } else {
        // Check if id was provided in request body
        if (!req.body.id) {
            res.json({ success: false, message: 'No id was provided' });
        } else {
            // Use id to serch for video in database
            Video.findOne({ _id: req.body.id }, (err, video) => {
                if (err) {
                    res.json({ success: false, message: 'Invalid video id' });
                } else {
                    // check if id matched the id of any video post in the database
                    if (!video) {
                        res.json({ success: false, message: 'Video not found.' });
                    } else {
                        // Get data of the user that is logged in
                        User.findOne({ _id: req._id }, (err, user) => {
                            if (err) {
                                res.json({ success: false, message: 'Something went wrong in finding user who comment' });
                            }
                            else {
                                if (!user) {
                                    res.json({ success: false, message: 'User not found.' });
                                } else {
                                    // Add the new comment to the video post's array
                                    let commentbody = {
                                        comment: req.body.comment,
                                        commentor: req._id
                                    }
                                    // console.log(comment)
                                    video.comments.push(commentbody);
                                    // console.log(video.comments)
                                    // save video post
                                    video.save((err) => {
                                        // check if error was found
                                        if (err) {
                                            res.json({
                                                success: false, message: err.message //'Something went wrong in saving video comment.' 
                                            })
                                        } else {
                                            res.json({
                                                success: true, message: 'Comment saved',
                                                comment: req.body.comment.comment,
                                                commenter: req.body.comment.commentor
                                            });
                                        }
                                    })
                                }
                            }
                        })
                    }
                }
            })
        }
    }
}

/**
 * Post a Reply property with the request JSON
 * 
 *
 * @param {req} {HTTP request object}
 * @param {res} {HTTP response object}
 * @param {next} {HTTP next object}
 */
module.exports.postReply = (req, res, next) => {
    // Check if reply was provided in request body
    if (!req.body.reply) {
        res.json({ success: false, message: 'No reply provided' });
    } else {
        // Check if id was provided in request body
        if (!req.body.videoid) {
            res.json({ success: false, message: 'No id was provided' });
        } else {
            // Use id to serch for video in database
            Video.findOne({ _id: req.body.videoid }, (err, video) => {
                if (err) {
                    res.json({ success: false, message: 'Invalid video id' });
                } else {
                    // check if id matched the id of any video post in the database
                    if (!video) {
                        res.json({ success: false, message: 'Video not found.' });
                    } else {
                        // Get data of comment that the coach relied
                        let commentFinded = video.comments.find((element) => {
                            return element._id.toString() === req.body.commentid;
                        });
                        if (!commentFinded) {
                            res.json({ success: false, message: 'Comment not found.' });
                        } else {
                            commentFinded.reply = req.body.reply;
                            commentFinded.replier = video.creater;
                            video.save((err) => {
                                // check if error was found
                                if (err) {
                                    res.json({
                                        success: false, message: err.message //'Something went wrong in saving comment reply.' 
                                    })
                                } else {
                                    res.json({
                                        success: true, message: 'Reply saved',
                                        reply: commentFinded.reply,
                                        replier: commentFinded.replier
                                    });
                                }
                            })
                        }
                    }
                }
            })
        }
    }
}