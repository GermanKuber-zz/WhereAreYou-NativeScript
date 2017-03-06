"use strict";
var applicationSettings = require("application-settings");
var http = require("http");
var AuthenticationProvider;
(function (AuthenticationProvider) {
    AuthenticationProvider[AuthenticationProvider["AzureActiveDirectory"] = 0] = "AzureActiveDirectory";
    AuthenticationProvider[AuthenticationProvider["Google"] = 1] = "Google";
    AuthenticationProvider[AuthenticationProvider["Facebook"] = 2] = "Facebook";
    AuthenticationProvider[AuthenticationProvider["Twitter"] = 3] = "Twitter";
    AuthenticationProvider[AuthenticationProvider["MicrosoftAccount"] = 4] = "MicrosoftAccount";
})(AuthenticationProvider = exports.AuthenticationProvider || (exports.AuthenticationProvider = {}));
var MobileServiceUser = (function () {
    function MobileServiceUser(nativeValue, portalUrl) {
        this._msUser = nativeValue;
        this._url = portalUrl;
    }
    Object.defineProperty(MobileServiceUser.prototype, "nativeValue", {
        get: function () {
            return this._msUser;
        },
        enumerable: true,
        configurable: true
    });
    MobileServiceUser.clearCachedAuthenticationInfo = function () {
        applicationSettings.remove(MobileServiceUser.USER_ID_CACHE_KEY);
        applicationSettings.remove(MobileServiceUser.AUTHENTICATION_TOKEN_CACHE_KEY);
        applicationSettings.remove(MobileServiceUser.PORTAL_URL_CACHE_KEY);
    };
    MobileServiceUser.getFromCache = function () {
        return null;
    };
    MobileServiceUser.prototype._cacheAuthenticationInfo = function () {
        applicationSettings.setString(MobileServiceUser.USER_ID_CACHE_KEY, this.userId);
        applicationSettings.setString(MobileServiceUser.AUTHENTICATION_TOKEN_CACHE_KEY, this.authenticationToken);
        applicationSettings.setString(MobileServiceUser.PORTAL_URL_CACHE_KEY, this._url);
    };
    MobileServiceUser.prototype.getProviderCredentials = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            http.getJSON({
                method: "GET",
                url: _this._url + "/.auth/me",
                headers: { "x-zumo-auth": _this.authenticationToken }
            }).then(function (result) {
                if (result.length > 0) {
                    resolve(new ProviderCredentials(result[0]));
                }
                else {
                    reject(new Error("Missing Provider Credentials!"));
                }
            }, reject);
        });
    };
    return MobileServiceUser;
}());
MobileServiceUser.USER_ID_CACHE_KEY = "nativescript-azure-mobile-apps.user.userId";
MobileServiceUser.AUTHENTICATION_TOKEN_CACHE_KEY = "nativescript-azure-mobile-apps.user.authenticationToken";
MobileServiceUser.PORTAL_URL_CACHE_KEY = "nativescript-azure-mobile-apps.user.portalUrl";
exports.MobileServiceUser = MobileServiceUser;
var providerMap = [];
providerMap[AuthenticationProvider.AzureActiveDirectory] = "aad";
providerMap[AuthenticationProvider.Google] = "google";
providerMap[AuthenticationProvider.Facebook] = "facebook";
providerMap[AuthenticationProvider.MicrosoftAccount] = "microsoftaccount";
providerMap[AuthenticationProvider.Twitter] = "twitter";
var ProviderCredentials = (function () {
    function ProviderCredentials(serviceResponse) {
        var _this = this;
        this.claims = {};
        this.accessTokenSecret = null;
        this.expiresOn = null;
        this.refreshToken = null;
        this.idToken = null;
        this.authenticationToken = null;
        this.userId = serviceResponse.user_id;
        this.accessToken = serviceResponse.access_token;
        this.provider = providerMap.indexOf(serviceResponse.provider_name);
        if (serviceResponse.access_token_secret) {
            this.accessTokenSecret = serviceResponse.access_token_secret;
        }
        if (serviceResponse.expires_on) {
            this.expiresOn = new Date(serviceResponse.expires_on);
        }
        if (serviceResponse.refresh_token) {
            this.refreshToken = serviceResponse.refresh_token;
        }
        if (serviceResponse.id_token) {
            this.idToken = serviceResponse.id_token;
        }
        if (serviceResponse.authentication_token) {
            this.authenticationToken = serviceResponse.authentication_token;
        }
        serviceResponse.user_claims.forEach(function (item) { _this.claims[item.typ] = item.val; });
    }
    Object.defineProperty(ProviderCredentials.prototype, "givenName", {
        get: function () {
            return this.claims["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/givenname"];
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ProviderCredentials.prototype, "surname", {
        get: function () {
            return this.claims["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/surname"];
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ProviderCredentials.prototype, "name", {
        get: function () {
            return this.claims["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name"] || this.claims["name"];
        },
        enumerable: true,
        configurable: true
    });
    return ProviderCredentials;
}());
exports.ProviderCredentials = ProviderCredentials;
