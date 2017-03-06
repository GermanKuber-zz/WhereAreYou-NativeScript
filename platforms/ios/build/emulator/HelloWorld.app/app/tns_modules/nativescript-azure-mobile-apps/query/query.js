"use strict";
var common = require("./query-common");
var utils = require("../utils");
var definition = require("nativescript-azure-mobile-apps/query");
global.moduleMerge(common, exports);
var MobileServiceQuery = (function (_super) {
    __extends(MobileServiceQuery, _super);
    function MobileServiceQuery() {
        var _this = _super.apply(this, arguments) || this;
        _this._filters = [];
        _this._filterArgs = [];
        return _this;
    }
    MobileServiceQuery.prototype.read = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            try {
                if (_this._filters.length) {
                    _this._msQuery.predicate = NSPredicate.predicateWithFormatArgumentArray(_this._filters.join(" "), utils.getNativeObject(_this._filterArgs));
                }
                _this._msQuery.readWithCompletion(function (queryResult, error) {
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
    MobileServiceQuery.prototype.field = function (fieldName) {
        this._filterArgs.push(fieldName);
        return this;
    };
    MobileServiceQuery.prototype.eq = function (value) {
        this._filterArgs.push(utils.getNativeValueForComparison(value));
        this._filters.push("(%K == %@)");
        return this;
    };
    MobileServiceQuery.prototype.ne = function (value) {
        this._filterArgs.push(utils.getNativeValueForComparison(value));
        this._filters.push("(%K != %@)");
        return this;
    };
    MobileServiceQuery.prototype.gt = function (value) {
        this._filterArgs.push(utils.getNativeValueForComparison(value));
        this._filters.push("(%K > %@)");
        return this;
    };
    MobileServiceQuery.prototype.ge = function (value) {
        this._filterArgs.push(utils.getNativeValueForComparison(value));
        this._filters.push("(%K >= %@)");
        return this;
    };
    MobileServiceQuery.prototype.lt = function (value) {
        this._filterArgs.push(utils.getNativeValueForComparison(value));
        this._filters.push("(%K < %@)");
        return this;
    };
    MobileServiceQuery.prototype.le = function (value) {
        this._filterArgs.push(utils.getNativeValueForComparison(value));
        this._filters.push("(%K <= %@)");
        return this;
    };
    MobileServiceQuery.prototype.startsWith = function (field, value) {
        this._filterArgs.push(field, value);
        this._filters.push("(%K BEGINSWITH %@)");
        return this;
    };
    MobileServiceQuery.prototype.endsWith = function (field, value) {
        this._filterArgs.push(field, value);
        this._filters.push("(%K ENDSWITH %@)");
        return this;
    };
    MobileServiceQuery.prototype.and = function () {
        this._filters.push("&&");
        return this;
    };
    MobileServiceQuery.prototype.or = function () {
        this._filters.push("||");
        return this;
    };
    MobileServiceQuery.prototype.orderBy = function (field, dir) {
        if (dir === definition.SortDir.Asc) {
            this._msQuery.orderByAscending(field);
        }
        else if (dir === definition.SortDir.Desc) {
            this._msQuery.orderByDescending(field);
        }
        return this;
    };
    MobileServiceQuery.prototype.skip = function (count) {
        this._msQuery.fetchOffset = count;
        return this;
    };
    MobileServiceQuery.prototype.top = function (count) {
        this._msQuery.fetchLimit = count;
        return this;
    };
    return MobileServiceQuery;
}(common.MobileServiceQuery));
exports.MobileServiceQuery = MobileServiceQuery;
