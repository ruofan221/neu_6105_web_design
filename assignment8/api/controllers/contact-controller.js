'use strict';
//import sticky service.
const stickyService = require('../services/contact-services');

/**
 * Creates a new sticky with the request JSON and
 * returns sticky JSON object.
 *
 * @param {request} {HTTP request object}
 * @param {response} {HTTP response object}
 */
exports.post = function (request, response) {
    let newSticky = Object.assign({}, request.body);
    let callback = function (sticky) {
        response.status(200);
        response.json(sticky);
    };
    stickyService.save(newSticky,callback);
};

/**
 * Returns a sticky object in JSON.
 *
 * @param {request} {HTTP request object}
 * @param {response} {HTTP response object}
 */
exports.get = function (request, response) {
    let callback = function (sticky) {
        response.status(200);
        response.json(sticky);
    };
    stickyService.get(request.params.Id, callback);
};

// return the contacts list;
exports.gets = function (request, response) {
    let callback = function (sticky) {
        response.status(200);
        response.json(sticky);
    };
    stickyService.gets(callback);
    console.log('gets');
};