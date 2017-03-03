"use strict";
var core_1 = require("@angular/core");
var nativescript_module_1 = require("nativescript-angular/nativescript.module");
var router_1 = require("nativescript-angular/router");
var app_component_1 = require("./app.component");
var app_routing_1 = require("./app.routing");
var login_component_1 = require("./pages/login/login.component");
var dashboard_component_1 = require("./pages/dashboard/dashboard.component");
var friends_map_component_1 = require("./widgets/friends-map/friends-map.component");
var friends_component_1 = require("./widgets/friends/friends.component");
var angular_1 = require("nativescript-telerik-ui/sidedrawer/angular");
var friends_service_1 = require("./shared/friends/friends.service");
var listview_directives_1 = require("nativescript-telerik-ui/listview/angular/listview-directives");
var application = require("application");
if (application.ios) {
    GMSServices.provideAPIKey("AIzaSyCCbRydI84FEFapTzFo5qtGCv5i6NGuQgE");
}
var AppModule = (function () {
    function AppModule() {
    }
    return AppModule;
}());
AppModule = __decorate([
    core_1.NgModule({
        declarations: [
            app_component_1.AppComponent,
            login_component_1.LoginComponent,
            dashboard_component_1.DashboardComponent,
            friends_component_1.FriendsComponent,
            friends_map_component_1.FriendsMapComponent,
            angular_1.SIDEDRAWER_DIRECTIVES
        ],
        providers: [
            friends_service_1.FriendsService
        ],
        bootstrap: [
            app_component_1.AppComponent
        ],
        imports: [
            nativescript_module_1.NativeScriptModule,
            listview_directives_1.NativeScriptUIListViewModule,
            router_1.NativeScriptRouterModule,
            router_1.NativeScriptRouterModule.forRoot(app_routing_1.routes)
        ],
        schemas: [
            core_1.NO_ERRORS_SCHEMA
        ],
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBwLm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImFwcC5tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLHNDQUFxRTtBQUNyRSxnRkFBOEU7QUFDOUUsc0RBQXVFO0FBQ3ZFLGlEQUErQztBQUMvQyw2Q0FBOEQ7QUFDOUQsaUVBQStEO0FBQy9ELDZFQUEyRTtBQUMzRSxxRkFBa0Y7QUFDbEYseUVBQXVFO0FBQ3ZFLHNFQUFtRjtBQUNuRixvRUFBa0U7QUFDbEUsb0dBQTRHO0FBQzVHLElBQUksV0FBVyxHQUFHLE9BQU8sQ0FBQyxhQUFhLENBQUMsQ0FBQztBQUV6QyxFQUFFLENBQUMsQ0FBQyxXQUFXLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztJQUNwQixXQUFXLENBQUMsYUFBYSxDQUFDLHlDQUF5QyxDQUFDLENBQUM7QUFDdkUsQ0FBQztBQXlCRCxJQUFhLFNBQVM7SUFBdEI7SUFBeUIsQ0FBQztJQUFELGdCQUFDO0FBQUQsQ0FBQyxBQUExQixJQUEwQjtBQUFiLFNBQVM7SUF4QnJCLGVBQVEsQ0FBQztRQUNSLFlBQVksRUFBRTtZQUNaLDRCQUFZO1lBQ1osZ0NBQWM7WUFDZCx3Q0FBa0I7WUFDbEIsb0NBQWdCO1lBQ2hCLDJDQUFtQjtZQUNuQiwrQkFBcUI7U0FDdEI7UUFDRCxTQUFTLEVBQUU7WUFDVCxnQ0FBYztTQUNmO1FBQ0QsU0FBUyxFQUFFO1lBQ1QsNEJBQVk7U0FDYjtRQUNELE9BQU8sRUFBRTtZQUNQLHdDQUFrQjtZQUNsQixrREFBNEI7WUFDNUIsaUNBQXdCO1lBQ3hCLGlDQUF3QixDQUFDLE9BQU8sQ0FBQyxvQkFBTSxDQUFDO1NBQUM7UUFDM0MsT0FBTyxFQUFFO1lBQ1AsdUJBQWdCO1NBQ2pCO0tBQ0YsQ0FBQztHQUNXLFNBQVMsQ0FBSTtBQUFiLDhCQUFTIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTmdNb2R1bGUsIE5PX0VSUk9SU19TQ0hFTUEsIFByb3ZpZGVyIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBOYXRpdmVTY3JpcHRNb2R1bGUgfSBmcm9tIFwibmF0aXZlc2NyaXB0LWFuZ3VsYXIvbmF0aXZlc2NyaXB0Lm1vZHVsZVwiO1xuaW1wb3J0IHsgTmF0aXZlU2NyaXB0Um91dGVyTW9kdWxlIH0gZnJvbSBcIm5hdGl2ZXNjcmlwdC1hbmd1bGFyL3JvdXRlclwiO1xuaW1wb3J0IHsgQXBwQ29tcG9uZW50IH0gZnJvbSBcIi4vYXBwLmNvbXBvbmVudFwiO1xuaW1wb3J0IHsgcm91dGVzLCBuYXZpZ2F0YWJsZUNvbXBvbmVudHMgfSBmcm9tIFwiLi9hcHAucm91dGluZ1wiO1xuaW1wb3J0IHsgTG9naW5Db21wb25lbnQgfSBmcm9tICcuL3BhZ2VzL2xvZ2luL2xvZ2luLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBEYXNoYm9hcmRDb21wb25lbnQgfSBmcm9tICcuL3BhZ2VzL2Rhc2hib2FyZC9kYXNoYm9hcmQuY29tcG9uZW50JztcbmltcG9ydCB7IEZyaWVuZHNNYXBDb21wb25lbnQgfSBmcm9tICcuL3dpZGdldHMvZnJpZW5kcy1tYXAvZnJpZW5kcy1tYXAuY29tcG9uZW50JztcbmltcG9ydCB7IEZyaWVuZHNDb21wb25lbnQgfSBmcm9tICcuL3dpZGdldHMvZnJpZW5kcy9mcmllbmRzLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBTSURFRFJBV0VSX0RJUkVDVElWRVMgfSBmcm9tIFwibmF0aXZlc2NyaXB0LXRlbGVyaWstdWkvc2lkZWRyYXdlci9hbmd1bGFyXCI7XG5pbXBvcnQgeyBGcmllbmRzU2VydmljZSB9IGZyb20gJy4vc2hhcmVkL2ZyaWVuZHMvZnJpZW5kcy5zZXJ2aWNlJztcbmltcG9ydCB7IE5hdGl2ZVNjcmlwdFVJTGlzdFZpZXdNb2R1bGUgfSBmcm9tICduYXRpdmVzY3JpcHQtdGVsZXJpay11aS9saXN0dmlldy9hbmd1bGFyL2xpc3R2aWV3LWRpcmVjdGl2ZXMnO1xudmFyIGFwcGxpY2F0aW9uID0gcmVxdWlyZShcImFwcGxpY2F0aW9uXCIpO1xuZGVjbGFyZSB2YXIgR01TU2VydmljZXM6IGFueTtcbmlmIChhcHBsaWNhdGlvbi5pb3MpIHtcbiAgR01TU2VydmljZXMucHJvdmlkZUFQSUtleShcIkFJemFTeUNDYlJ5ZEk4NEZFRmFwVHpGbzVxdEdDdjVpNk5HdVFnRVwiKTtcbn1cbkBOZ01vZHVsZSh7XG4gIGRlY2xhcmF0aW9uczogW1xuICAgIEFwcENvbXBvbmVudCxcbiAgICBMb2dpbkNvbXBvbmVudCxcbiAgICBEYXNoYm9hcmRDb21wb25lbnQsXG4gICAgRnJpZW5kc0NvbXBvbmVudCxcbiAgICBGcmllbmRzTWFwQ29tcG9uZW50LFxuICAgIFNJREVEUkFXRVJfRElSRUNUSVZFU1xuICBdLFxuICBwcm92aWRlcnM6IFtcbiAgICBGcmllbmRzU2VydmljZVxuICBdLFxuICBib290c3RyYXA6IFtcbiAgICBBcHBDb21wb25lbnRcbiAgXSxcbiAgaW1wb3J0czogW1xuICAgIE5hdGl2ZVNjcmlwdE1vZHVsZSxcbiAgICBOYXRpdmVTY3JpcHRVSUxpc3RWaWV3TW9kdWxlLFxuICAgIE5hdGl2ZVNjcmlwdFJvdXRlck1vZHVsZSxcbiAgICBOYXRpdmVTY3JpcHRSb3V0ZXJNb2R1bGUuZm9yUm9vdChyb3V0ZXMpXSxcbiAgc2NoZW1hczogW1xuICAgIE5PX0VSUk9SU19TQ0hFTUFcbiAgXSxcbn0pXG5leHBvcnQgY2xhc3MgQXBwTW9kdWxlIHsgfVxuIl19