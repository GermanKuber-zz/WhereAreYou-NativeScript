"use strict";
var common = require("./push-common");
var utils = require("../utils");
global.moduleMerge(common, exports);
var MobileServicePush = (function (_super) {
    __extends(MobileServicePush, _super);
    function MobileServicePush() {
        return _super.apply(this, arguments) || this;
    }
    MobileServicePush.prototype.register = function (registrationId) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            try {
                _this._msPush.registerDeviceTokenCompletion(utils.deviceTokenToNsData(registrationId), function (error) {
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
    MobileServicePush.prototype.registerWithTemplate = function (registrationId, templateName, templateBody) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            try {
                var jsonTemplate = {};
                jsonTemplate[templateName] = { body: JSON.parse(templateBody) };
                _this._msPush.registerDeviceTokenTemplateCompletion(utils.deviceTokenToNsData(registrationId), utils.getNativeObject(jsonTemplate), function (error) {
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
    MobileServicePush.prototype.unregister = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            try {
                _this._msPush.unregisterWithCompletion(function (error) {
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
    return MobileServicePush;
}(common.MobileServicePush));
exports.MobileServicePush = MobileServicePush;
