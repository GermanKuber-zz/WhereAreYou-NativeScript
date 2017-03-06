"use strict";
var common = require("./user-common");
var applicationSettings = require("application-settings");
global.moduleMerge(common, exports);
var MobileServiceUser = (function (_super) {
    __extends(MobileServiceUser, _super);
    function MobileServiceUser(nativeValue, portalUrl) {
        var _this = _super.call(this, nativeValue, portalUrl) || this;
        if (nativeValue) {
            _this.userId = nativeValue.userId;
            _this.authenticationToken = nativeValue.mobileServiceAuthenticationToken;
            _this._cacheAuthenticationInfo();
        }
        return _this;
    }
    MobileServiceUser.getFromCache = function () {
        var userId = applicationSettings.getString(common.MobileServiceUser.USER_ID_CACHE_KEY, null);
        var authenticationToken = applicationSettings.getString(common.MobileServiceUser.AUTHENTICATION_TOKEN_CACHE_KEY, null);
        var portalUrl = applicationSettings.getString(common.MobileServiceUser.PORTAL_URL_CACHE_KEY, null);
        if (userId === null || authenticationToken === null || portalUrl === null) {
            return null;
        }
        var nativeValue = new MSUser({ userId: userId });
        nativeValue.mobileServiceAuthenticationToken = authenticationToken;
        return new MobileServiceUser(nativeValue, portalUrl);
    };
    return MobileServiceUser;
}(common.MobileServiceUser));
exports.MobileServiceUser = MobileServiceUser;
