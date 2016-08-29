/**
 *
 * Using source code from parse-server-fs-adapter
 * After it didn't work for me i.e. getting errors like this:
 *
 * https://github.com/parse-server-modules/parse-server-fs-adapter/issues/3
 *
 * I read the source code of the Grid Store Adapter as an inspiration
 * and used the functions of parse-server-fs-adapter.
 *
 * TODO: proper filename generation, probably using urlify
 *
 * license: MIT
 *
 **/
'use strict';

var path = require('path'),
    fs = require('fs');

function FSStoreAdapter(options) {
    var files_directory = 'files';
    if (typeof(options) === 'object' && typeof(options.filesSubDirectory) === 'string') {
        files_directory = options.filesSubDirectory;
    }
    this._files_directory = files_directory;
    return this;
}

FSStoreAdapter.prototype.buildpath = function(filename) {
    return path.join(this._files_directory, encodeURIComponent(filename));
};
FSStoreAdapter.prototype.createFile = function(filename, data, contentType) {
    var self = this;
    return new Promise(function(resolve, reject) {
        var filepath = self.buildpath(filename);
        fs.writeFile(filepath, data, function(err) {
            if (err !== null) {
                return reject(err);
            }
            resolve(data);
        });
    });
};
FSStoreAdapter.prototype.deleteFile = function(filename) {
    var self = this;
    return new Promise(function(resolve, reject) {
        var filepath = self.buildpath(filename);
        // TODO: data from readFile required?
        fs.readFile(filepath, function(err, data) {
            if (err !== null) {
                return reject(err);
            }
            fs.unlink(filepath, function(err2) {
                // error in original code, working here
                if (err2 !== null) {
                    return reject(err2);
                }
                resolve(data);
            });
        });
    });
};
FSStoreAdapter.prototype.getFileData = function(filename) {
    var self = this;
    return new Promise(function(resolve, reject) {
        var filepath = self.buildpath(filename);
        fs.readFile(filepath, function (err, data) {
            if (err !== null) {
                return reject(err);
            }
            resolve(data);
        });
    });
};
FSStoreAdapter.prototype.getFileLocation = function(config, filename) {
    return config.mount + '/files/' + config.applicationId + '/' + encodeURIComponent(filename);
};

exports.FSStoreAdapter = FSStoreAdapter;
exports.default = FSStoreAdapter;
