"use strict";
var MobileServiceQuery = (function () {
    function MobileServiceQuery(nativeValue) {
        this._msQuery = nativeValue;
    }
    return MobileServiceQuery;
}());
exports.MobileServiceQuery = MobileServiceQuery;
var SortDir;
(function (SortDir) {
    SortDir[SortDir["Asc"] = 0] = "Asc";
    SortDir[SortDir["Desc"] = 1] = "Desc";
})(SortDir = exports.SortDir || (exports.SortDir = {}));
