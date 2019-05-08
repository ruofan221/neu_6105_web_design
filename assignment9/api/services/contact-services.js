'use strict';

const mongoose = require('mongoose');
const Sticky = require('../models/people');


/**
 * Throws error if error object is present.
 *
 * @param {Object} error {Error object}
 */
let throwError = function (error) {
    if (error) {
        throw Error(error);
    }
};


/**
 * Saves and returns the new sticky object.
 *
 * @param {Object} sticky {Sticky object}
 * @param {function} callback {Sucess callback function}
 */
exports.save = function (sticky, callback) {
    let newSticky = new Sticky({
        _id: new mongoose.Types.ObjectId(),
        name: sticky.name,
        address: sticky.address,
        phone: sticky.phone,
        email: sticky.email,
        city:  sticky.city,
    });
    let resultCallback = function (err, sticky) {
            throwError(err);
            callback(sticky);
    };
    newSticky.save(resultCallback);
};


/**
 * Returns the sticky object matching the id.
 *
 * @param {string} stickyId {Id of the sticky object}
 * @param {function} callback {Sucess callback function}
 */
exports.get = function (stickyId, callback) {
    let resultCallback = function (err, sticky) {
        throwError(err);
        callback(sticky);
    };
    Sticky.findById(stickyId, resultCallback);
};

exports.gets = function (callback) {
    let resultCallback = function (err, sticky) {
        throwError(err);
        callback(sticky);
    };
    Sticky.find(resultCallback);
};
