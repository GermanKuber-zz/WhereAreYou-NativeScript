"use strict";
var ClientAuthAppDelegate = (function (_super) {
    __extends(ClientAuthAppDelegate, _super);
    function ClientAuthAppDelegate() {
        return _super.apply(this, arguments) || this;
    }
    ClientAuthAppDelegate.setAzureConfig = function (msClient, urlScheme) {
        this._msClient = msClient;
        this._urlScheme = urlScheme;
    };
    ;
    ClientAuthAppDelegate.prototype.applicationOpenURLOptions = function (application, url, options) {
        return this.handleIncomingUrl(url);
    };
    ClientAuthAppDelegate.prototype.applicationOpenURLSourceApplicationAnnotation = function (application, url, sourceApplication, annotation) {
        return this.handleIncomingUrl(url);
    };
    ;
    ClientAuthAppDelegate.prototype.handleIncomingUrl = function (url) {
        if (!ClientAuthAppDelegate._msClient || !ClientAuthAppDelegate._urlScheme) {
            console.log("IMPORTANT: Could not complete Azure login flow. Please check previous messages.");
            return false;
        }
        if (url.scheme.toLowerCase() === ClientAuthAppDelegate._urlScheme) {
            ClientAuthAppDelegate._msClient.resumeWithURL(url);
            return true;
        }
        else {
            return false;
        }
    };
    return ClientAuthAppDelegate;
}(UIResponder));
ClientAuthAppDelegate.ObjCProtocols = [UIApplicationDelegate];
exports.ClientAuthAppDelegate = ClientAuthAppDelegate;
