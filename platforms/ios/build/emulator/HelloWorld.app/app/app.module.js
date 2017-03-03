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
var http_1 = require("nativescript-angular/http");
var mark_manager_service_1 = require("./shared/services/map/mark-manager.service");
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
            friends_service_1.FriendsService,
            mark_manager_service_1.MarkManagerService
        ],
        bootstrap: [
            app_component_1.AppComponent
        ],
        imports: [
            nativescript_module_1.NativeScriptModule,
            listview_directives_1.NativeScriptUIListViewModule,
            router_1.NativeScriptRouterModule,
            router_1.NativeScriptRouterModule.forRoot(app_routing_1.routes),
            http_1.NativeScriptHttpModule
        ],
        schemas: [
            core_1.NO_ERRORS_SCHEMA
        ],
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBwLm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImFwcC5tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLHNDQUFxRTtBQUNyRSxnRkFBOEU7QUFDOUUsc0RBQXVFO0FBQ3ZFLGlEQUErQztBQUMvQyw2Q0FBOEQ7QUFDOUQsaUVBQStEO0FBQy9ELDZFQUEyRTtBQUMzRSxxRkFBa0Y7QUFDbEYseUVBQXVFO0FBQ3ZFLHNFQUFtRjtBQUNuRixvRUFBa0U7QUFDbEUsb0dBQTRHO0FBRTVHLGtEQUFtRTtBQUNuRSxtRkFBZ0Y7QUFDaEYsSUFBSSxXQUFXLEdBQUcsT0FBTyxDQUFDLGFBQWEsQ0FBQyxDQUFDO0FBRXpDLEVBQUUsQ0FBQyxDQUFDLFdBQVcsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO0lBQ3BCLFdBQVcsQ0FBQyxhQUFhLENBQUMseUNBQXlDLENBQUMsQ0FBQztBQUN2RSxDQUFDO0FBNEJELElBQWEsU0FBUztJQUF0QjtJQUF5QixDQUFDO0lBQUQsZ0JBQUM7QUFBRCxDQUFDLEFBQTFCLElBQTBCO0FBQWIsU0FBUztJQTNCckIsZUFBUSxDQUFDO1FBQ1IsWUFBWSxFQUFFO1lBQ1osNEJBQVk7WUFDWixnQ0FBYztZQUNkLHdDQUFrQjtZQUNsQixvQ0FBZ0I7WUFDaEIsMkNBQW1CO1lBQ25CLCtCQUFxQjtTQUN0QjtRQUNELFNBQVMsRUFBRTtZQUNULGdDQUFjO1lBQ2QseUNBQWtCO1NBQ25CO1FBQ0QsU0FBUyxFQUFFO1lBQ1QsNEJBQVk7U0FDYjtRQUNELE9BQU8sRUFBRTtZQUNQLHdDQUFrQjtZQUNsQixrREFBNEI7WUFDNUIsaUNBQXdCO1lBQ3hCLGlDQUF3QixDQUFDLE9BQU8sQ0FBQyxvQkFBTSxDQUFDO1lBQ3hDLDZCQUFzQjtTQUN2QjtRQUNELE9BQU8sRUFBRTtZQUNMLHVCQUFnQjtTQUNqQjtLQUNKLENBQUM7R0FDVyxTQUFTLENBQUk7QUFBYiw4QkFBUyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE5nTW9kdWxlLCBOT19FUlJPUlNfU0NIRU1BLCBQcm92aWRlciB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgTmF0aXZlU2NyaXB0TW9kdWxlIH0gZnJvbSBcIm5hdGl2ZXNjcmlwdC1hbmd1bGFyL25hdGl2ZXNjcmlwdC5tb2R1bGVcIjtcbmltcG9ydCB7IE5hdGl2ZVNjcmlwdFJvdXRlck1vZHVsZSB9IGZyb20gXCJuYXRpdmVzY3JpcHQtYW5ndWxhci9yb3V0ZXJcIjtcbmltcG9ydCB7IEFwcENvbXBvbmVudCB9IGZyb20gXCIuL2FwcC5jb21wb25lbnRcIjtcbmltcG9ydCB7IHJvdXRlcywgbmF2aWdhdGFibGVDb21wb25lbnRzIH0gZnJvbSBcIi4vYXBwLnJvdXRpbmdcIjtcbmltcG9ydCB7IExvZ2luQ29tcG9uZW50IH0gZnJvbSAnLi9wYWdlcy9sb2dpbi9sb2dpbi5jb21wb25lbnQnO1xuaW1wb3J0IHsgRGFzaGJvYXJkQ29tcG9uZW50IH0gZnJvbSAnLi9wYWdlcy9kYXNoYm9hcmQvZGFzaGJvYXJkLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBGcmllbmRzTWFwQ29tcG9uZW50IH0gZnJvbSAnLi93aWRnZXRzL2ZyaWVuZHMtbWFwL2ZyaWVuZHMtbWFwLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBGcmllbmRzQ29tcG9uZW50IH0gZnJvbSAnLi93aWRnZXRzL2ZyaWVuZHMvZnJpZW5kcy5jb21wb25lbnQnO1xuaW1wb3J0IHsgU0lERURSQVdFUl9ESVJFQ1RJVkVTIH0gZnJvbSBcIm5hdGl2ZXNjcmlwdC10ZWxlcmlrLXVpL3NpZGVkcmF3ZXIvYW5ndWxhclwiO1xuaW1wb3J0IHsgRnJpZW5kc1NlcnZpY2UgfSBmcm9tICcuL3NoYXJlZC9mcmllbmRzL2ZyaWVuZHMuc2VydmljZSc7XG5pbXBvcnQgeyBOYXRpdmVTY3JpcHRVSUxpc3RWaWV3TW9kdWxlIH0gZnJvbSAnbmF0aXZlc2NyaXB0LXRlbGVyaWstdWkvbGlzdHZpZXcvYW5ndWxhci9saXN0dmlldy1kaXJlY3RpdmVzJztcbmltcG9ydCB7IEh0dHBNb2R1bGUsIEpzb25wTW9kdWxlLCBIdHRwIH0gZnJvbSAnQGFuZ3VsYXIvaHR0cCc7XG5pbXBvcnQgeyBOYXRpdmVTY3JpcHRIdHRwTW9kdWxlIH0gZnJvbSBcIm5hdGl2ZXNjcmlwdC1hbmd1bGFyL2h0dHBcIjtcbmltcG9ydCB7IE1hcmtNYW5hZ2VyU2VydmljZSB9IGZyb20gJy4vc2hhcmVkL3NlcnZpY2VzL21hcC9tYXJrLW1hbmFnZXIuc2VydmljZSc7XG52YXIgYXBwbGljYXRpb24gPSByZXF1aXJlKFwiYXBwbGljYXRpb25cIik7XG5kZWNsYXJlIHZhciBHTVNTZXJ2aWNlczogYW55O1xuaWYgKGFwcGxpY2F0aW9uLmlvcykge1xuICBHTVNTZXJ2aWNlcy5wcm92aWRlQVBJS2V5KFwiQUl6YVN5Q0NiUnlkSTg0RkVGYXBUekZvNXF0R0N2NWk2Tkd1UWdFXCIpO1xufVxuQE5nTW9kdWxlKHtcbiAgZGVjbGFyYXRpb25zOiBbXG4gICAgQXBwQ29tcG9uZW50LFxuICAgIExvZ2luQ29tcG9uZW50LFxuICAgIERhc2hib2FyZENvbXBvbmVudCxcbiAgICBGcmllbmRzQ29tcG9uZW50LFxuICAgIEZyaWVuZHNNYXBDb21wb25lbnQsXG4gICAgU0lERURSQVdFUl9ESVJFQ1RJVkVTXG4gIF0sXG4gIHByb3ZpZGVyczogW1xuICAgIEZyaWVuZHNTZXJ2aWNlLFxuICAgIE1hcmtNYW5hZ2VyU2VydmljZVxuICBdLFxuICBib290c3RyYXA6IFtcbiAgICBBcHBDb21wb25lbnRcbiAgXSxcbiAgaW1wb3J0czogW1xuICAgIE5hdGl2ZVNjcmlwdE1vZHVsZSxcbiAgICBOYXRpdmVTY3JpcHRVSUxpc3RWaWV3TW9kdWxlLFxuICAgIE5hdGl2ZVNjcmlwdFJvdXRlck1vZHVsZSxcbiAgICBOYXRpdmVTY3JpcHRSb3V0ZXJNb2R1bGUuZm9yUm9vdChyb3V0ZXMpLFxuICAgIE5hdGl2ZVNjcmlwdEh0dHBNb2R1bGVcbiAgXSxcbiAgc2NoZW1hczogW1xuICAgICAgTk9fRVJST1JTX1NDSEVNQVxuICAgIF0sXG59KVxuZXhwb3J0IGNsYXNzIEFwcE1vZHVsZSB7IH1cbiJdfQ==