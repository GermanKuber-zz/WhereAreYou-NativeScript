"use strict";
var common = require("./table-common");
var utils = require("../utils");
var query_1 = require("nativescript-azure-mobile-apps/query");
global.moduleMerge(common, exports);
var MobileServiceTable = (function (_super) {
    __extends(MobileServiceTable, _super);
    function MobileServiceTable() {
        return _super.apply(this, arguments) || this;
    }
    MobileServiceTable.prototype.read = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            try {
                _this._msTable.readWithCompletion(function (queryResult, error) {
                    if (error) {
                        reject(new Error(error.localizedDescription));
                        return;
                    }
                    resolve(utils.getJsObject(queryResult.items));
                });
            }
            catch (e) {
                reject(e);
            }
        });
    };
    MobileServiceTable.prototype.insert = function (item) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            try {
                _this._msTable.insertCompletion(utils.getNativeObject(item), function (result, error) {
                    if (error) {
                        reject(new Error(error.localizedDescription));
                        return;
                    }
                    resolve(utils.getJsObject(result));
                });
            }
            catch (e) {
                reject(e);
            }
        });
    };
    MobileServiceTable.prototype.update = function (item) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            try {
                _this._msTable.updateCompletion(utils.getNativeObject(item), function (result, error) {
                    if (error) {
                        reject(new Error(error.localizedDescription));
                        return;
                    }
                    resolve(utils.getJsObject(result));
                });
            }
            catch (e) {
                reject(e);
            }
        });
    };
    MobileServiceTable.prototype.deleteById = function (id) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            try {
                _this._msTable.deleteWithIdCompletion(id, function (result, error) {
                    if (error) {
                        reject(new Error(error.localizedDescription));
                        return;
                    }
                    resolve();
                });
            }
            catch (e) {
                reject(e);
            }
        });
    };
    MobileServiceTable.prototype.deleteItem = function (item) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            try {
                _this._msTable.deleteCompletion(utils.getNativeObject(item), function (result, error) {
                    if (error) {
                        reject(new Error(error.localizedDescription));
                        return;
                    }
                    resolve();
                });
            }
            catch (e) {
                reject(e);
            }
        });
    };
    MobileServiceTable.prototype.where = function () {
        return new query_1.MobileServiceQuery(this._msTable.query());
    };
    return MobileServiceTable;
}(common.MobileServiceTable));
exports.MobileServiceTable = MobileServiceTable;
