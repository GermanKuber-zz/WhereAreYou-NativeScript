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
exports.ViewsEnum = ViewsEnum;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmF2aWdhdGlvbi5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibmF2aWdhdGlvbi5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxzQ0FBMkM7QUFDM0MsMENBQXlDO0FBQ3pDLHNEQUErRDtBQUcvRCxJQUFhLGlCQUFpQjtJQUU1QiwyQkFBb0IsTUFBYyxFQUN4QixnQkFBa0M7UUFEeEIsV0FBTSxHQUFOLE1BQU0sQ0FBUTtRQUN4QixxQkFBZ0IsR0FBaEIsZ0JBQWdCLENBQWtCO0lBRTVDLENBQUM7SUFDRCxvQ0FBUSxHQUFSLFVBQVMsSUFBZTtRQUN0QixJQUFJLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxDQUFDLE1BQUksSUFBTSxDQUFDLENBQUMsQ0FBQztJQUNyQyxDQUFDO0lBQ0QseUNBQWEsR0FBYixVQUFjLElBQWU7UUFDM0IsSUFBSSxDQUFDLGdCQUFnQixDQUFDLFFBQVEsQ0FBQyxDQUFDLE1BQUksSUFBTSxDQUFDLEVBQUUsRUFBRSxZQUFZLEVBQUUsSUFBSSxFQUFFLENBQUMsQ0FBQztJQUN2RSxDQUFDO0lBQ0gsd0JBQUM7QUFBRCxDQUFDLEFBWkQsSUFZQztBQVpZLGlCQUFpQjtJQUQ3QixpQkFBVSxFQUFFO3FDQUdpQixlQUFNO1FBQ04seUJBQWdCO0dBSGpDLGlCQUFpQixDQVk3QjtBQVpZLDhDQUFpQjtBQWM5QjtJQUFBO0lBSUEsQ0FBQztJQUFELGdCQUFDO0FBQUQsQ0FBQyxBQUpEO0FBQ1MsZUFBSyxHQUFHLE9BQU8sQ0FBQztBQUNoQixtQkFBUyxHQUFHLFdBQVcsQ0FBQztBQUZwQiw4QkFBUyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xuaW1wb3J0IHsgUm91dGVyIH0gZnJvbSAnQGFuZ3VsYXIvcm91dGVyJztcbmltcG9ydCB7IFJvdXRlckV4dGVuc2lvbnMgfSBmcm9tIFwibmF0aXZlc2NyaXB0LWFuZ3VsYXIvcm91dGVyXCI7XG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBOYXZpZ2F0aW9uU2VydmljZSB7XG5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSByb3V0ZXI6IFJvdXRlcixcbiAgICBwcml2YXRlIHJvdXRlckV4dGVuc2lvbnM6IFJvdXRlckV4dGVuc2lvbnMpIHtcblxuICB9XG4gIG5hdmlnYXRlKHZpZXc6IFZpZXdzRW51bSkge1xuICAgIHRoaXMucm91dGVyLm5hdmlnYXRlKFtgLyR7dmlld31gXSk7XG4gIH1cbiAgbmF2aWdhdGVDbGVhcih2aWV3OiBWaWV3c0VudW0pIHtcbiAgICB0aGlzLnJvdXRlckV4dGVuc2lvbnMubmF2aWdhdGUoW2AvJHt2aWV3fWBdLCB7IGNsZWFySGlzdG9yeTogdHJ1ZSB9KTtcbiAgfVxufVxuXG5leHBvcnQgY2xhc3MgVmlld3NFbnVtIHtcbiAgc3RhdGljIGxvZ2luID0gXCJsb2dpblwiO1xuICBzdGF0aWMgZGFzaGJvYXJkID0gXCJkYXNoYm9hcmRcIjtcblxufSJdfQ==