"use strict";
var common = require("./client-common");
var frame = require("ui/frame");
var table_1 = require("nativescript-azure-mobile-apps/table");
var user_1 = require("nativescript-azure-mobile-apps/user");
var push_1 = require("nativescript-azure-mobile-apps/push");
var clientauth_app_delegate_1 = require("./clientauth-app-delegate");
var application = require("application");
global.moduleMerge(common, exports);
var nativeAuthenticationProviders = [];
nativeAuthenticationProviders[user_1.AuthenticationProvider.AzureActiveDirectory] = "windowsazureactivedirectory";
nativeAuthenticationProviders[user_1.AuthenticationProvider.Google] = "google";
nativeAuthenticationProviders[user_1.AuthenticationProvider.Facebook] = "facebook";
nativeAuthenticationProviders[user_1.AuthenticationProvider.Twitter] = "twitter";
nativeAuthenticationProviders[user_1.AuthenticationProvider.MicrosoftAccount] = "microsoftaccount";
var MobileServiceClient = (function (_super) {
    __extends(MobileServiceClient, _super);
    function MobileServiceClient(url) {
        var _this = _super.call(this, url) || this;
        _this._msClient = MSClient.clientWithApplicationURLString(url);
        _this.push = new push_1.MobileServicePush(_this._msClient.push);
        return _this;
    }
    MobileServiceClient.configureClientAuthAppDelegate = function () {
        application.ios.delegate = clientauth_app_delegate_1.ClientAuthAppDelegate;
    };
    MobileServiceClient.prototype.getTable = function (tableName) {
        return new table_1.MobileServiceTable(this._msClient.tableWithName(tableName));
    };
    MobileServiceClient.prototype.login = function (provider, urlScheme) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            if (urlScheme) {
                if (!application.ios.delegate || typeof application.ios.delegate.setAzureConfig !== "function") {
                    reject("Please import ClientAuthAppDelegate in app.ts / app.js, see the Azure plugin readme for details.");
                    return;
                }
                clientauth_app_delegate_1.ClientAuthAppDelegate.setAzureConfig(_this._msClient, urlScheme);
                console.log("IMPORTANT: For the redirect back to your app to work you'll need to add '" + urlScheme + "://easyauth.callback' to 'ALLOWED EXTERNAL REDIRECT URLS' in your Azure app. See https://github.com/Azure/azure-mobile-apps-ios-client/issues/123#issuecomment-272941108 for details.");
                _this._msClient.loginWithProviderUrlSchemeControllerAnimatedCompletion(nativeAuthenticationProviders[provider], urlScheme, frame.topmost().ios.controller, true, function (user, error) {
                    if (error) {
                        reject(new Error(error.localizedDescription));
                        return;
                    }
                    resolve(new user_1.MobileServiceUser(user, _this._url));
                });
            }
            else {
                console.log("IMPORTANT: To make login work with SafariViewController (as this method will break soon), add an URL scheme to app/App_Resources/iOS/Info.plist");
                _this._msClient.loginWithProviderControllerAnimatedCompletion(nativeAuthenticationProviders[provider], frame.topmost().ios.controller, true, function (user, error) {
                    if (error) {
                        reject(new Error(error.localizedDescription));
                        return;
                    }
                    resolve(new user_1.MobileServiceUser(user, _this._url));
                });
            }
        });
    };
    MobileServiceClient.prototype.loginFromCache = function () {
        var user = user_1.MobileServiceUser.getFromCache();
        if (!user) {
            return false;
        }
        this.user = user;
        this._msClient.currentUser = this.user.nativeValue;
        return true;
    };
    return MobileServiceClient;
}(common.MobileServiceClient));
exports.MobileServiceClient = MobileServiceClient;
