"use strict";
var MobileServiceClient = (function () {
    function MobileServiceClient(url) {
        this._url = url;
    }
    MobileServiceClient.configureClientAuthAppDelegate = function () {
    };
    return MobileServiceClient;
}());
exports.MobileServiceClient = MobileServiceClient;
