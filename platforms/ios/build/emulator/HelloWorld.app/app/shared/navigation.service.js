"use strict";
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var router_2 = require("nativescript-angular/router");
var NavigationService = (function () {
    function NavigationService(router, routerExtensions) {
        this.router = router;
        this.routerExtensions = routerExtensions;
    }
    NavigationService.prototype.navigate = function (view) {
        this.router.navigate(["/" + view]);
    };
    NavigationService.prototype.back = function () {
        this.routerExtensions.back();
    };
    NavigationService.prototype.navigateClear = function (view) {
        this.routerExtensions.navigate(["/" + view], { clearHistory: true });
    };
    return NavigationService;
}());
NavigationService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [router_1.Router,
        router_2.RouterExtensions])
], NavigationService);
exports.NavigationService = NavigationService;
var ViewsEnum = (function () {
    function ViewsEnum() {
    }
    return ViewsEnum;
}());
ViewsEnum.login = "login";
ViewsEnum.dashboard = "dashboard";
ViewsEnum.register = "register";
exports.ViewsEnum = ViewsEnum;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmF2aWdhdGlvbi5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibmF2aWdhdGlvbi5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxzQ0FBMkM7QUFDM0MsMENBQXlDO0FBQ3pDLHNEQUErRDtBQUcvRCxJQUFhLGlCQUFpQjtJQUU1QiwyQkFBb0IsTUFBYyxFQUN4QixnQkFBa0M7UUFEeEIsV0FBTSxHQUFOLE1BQU0sQ0FBUTtRQUN4QixxQkFBZ0IsR0FBaEIsZ0JBQWdCLENBQWtCO0lBRTVDLENBQUM7SUFDRCxvQ0FBUSxHQUFSLFVBQVMsSUFBZTtRQUN0QixJQUFJLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxDQUFDLE1BQUksSUFBTSxDQUFDLENBQUMsQ0FBQztJQUNyQyxDQUFDO0lBQ0QsZ0NBQUksR0FBSjtRQUNFLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxJQUFJLEVBQUUsQ0FBQztJQUMvQixDQUFDO0lBQ0QseUNBQWEsR0FBYixVQUFjLElBQWU7UUFDM0IsSUFBSSxDQUFDLGdCQUFnQixDQUFDLFFBQVEsQ0FBQyxDQUFDLE1BQUksSUFBTSxDQUFDLEVBQUUsRUFBRSxZQUFZLEVBQUUsSUFBSSxFQUFFLENBQUMsQ0FBQztJQUN2RSxDQUFDO0lBQ0gsd0JBQUM7QUFBRCxDQUFDLEFBZkQsSUFlQztBQWZZLGlCQUFpQjtJQUQ3QixpQkFBVSxFQUFFO3FDQUdpQixlQUFNO1FBQ04seUJBQWdCO0dBSGpDLGlCQUFpQixDQWU3QjtBQWZZLDhDQUFpQjtBQWlCOUI7SUFBQTtJQUtBLENBQUM7SUFBRCxnQkFBQztBQUFELENBQUMsQUFMRDtBQUNTLGVBQUssR0FBRyxPQUFPLENBQUM7QUFDaEIsbUJBQVMsR0FBRyxXQUFXLENBQUM7QUFDeEIsa0JBQVEsR0FBRyxVQUFVLENBQUM7QUFIbEIsOEJBQVMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcbmltcG9ydCB7IFJvdXRlciB9IGZyb20gJ0Bhbmd1bGFyL3JvdXRlcic7XG5pbXBvcnQgeyBSb3V0ZXJFeHRlbnNpb25zIH0gZnJvbSBcIm5hdGl2ZXNjcmlwdC1hbmd1bGFyL3JvdXRlclwiO1xuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgTmF2aWdhdGlvblNlcnZpY2Uge1xuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgcm91dGVyOiBSb3V0ZXIsXG4gICAgcHJpdmF0ZSByb3V0ZXJFeHRlbnNpb25zOiBSb3V0ZXJFeHRlbnNpb25zKSB7XG5cbiAgfVxuICBuYXZpZ2F0ZSh2aWV3OiBWaWV3c0VudW0pIHtcbiAgICB0aGlzLnJvdXRlci5uYXZpZ2F0ZShbYC8ke3ZpZXd9YF0pO1xuICB9XG4gIGJhY2soKSB7XG4gICAgdGhpcy5yb3V0ZXJFeHRlbnNpb25zLmJhY2soKTtcbiAgfVxuICBuYXZpZ2F0ZUNsZWFyKHZpZXc6IFZpZXdzRW51bSkge1xuICAgIHRoaXMucm91dGVyRXh0ZW5zaW9ucy5uYXZpZ2F0ZShbYC8ke3ZpZXd9YF0sIHsgY2xlYXJIaXN0b3J5OiB0cnVlIH0pO1xuICB9XG59XG5cbmV4cG9ydCBjbGFzcyBWaWV3c0VudW0ge1xuICBzdGF0aWMgbG9naW4gPSBcImxvZ2luXCI7XG4gIHN0YXRpYyBkYXNoYm9hcmQgPSBcImRhc2hib2FyZFwiO1xuICBzdGF0aWMgcmVnaXN0ZXIgPSBcInJlZ2lzdGVyXCI7XG5cbn0iXX0=