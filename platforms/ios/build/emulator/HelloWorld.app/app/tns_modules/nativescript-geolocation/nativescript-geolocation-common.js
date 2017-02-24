"use strict";
var Location = (function () {
    function Location() {
    }
    return Location;
}());
exports.Location = Location;
exports.defaultGetLocationTimeout = 5 * 60 * 1000;
exports.minRangeUpdate = 0.1;
exports.minTimeUpdate = 1 * 60 * 1000;
