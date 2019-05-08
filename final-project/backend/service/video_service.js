const Video = require('../models/video_model')
const User = require('../models/user_model')
const mongoose = require('mongoose');


/**
 * Returns the sticky object matching the id.
 *
 * @param {string} video {Id of the video object}
 * @param {function} callback {Sucess callback function}
 */
exports.gets = (video, callback) => {
    let resultCallback = function (err, video) {
        throwError(err);
        callback(video);
    };
    Video.find(resultCallback);
};

/**
 * Returns the sticky object matching the id.
 *
 * @param {string} videoId {Id of the video object}
 * @param {function} callback {Sucess callback function}
 */
exports.get = function (videoId, callback) {
    let resultCallback = function (err, video) {
        throwError(err);
        callback(video);
    };
    Video.findById(videoId, resultCallback);
};