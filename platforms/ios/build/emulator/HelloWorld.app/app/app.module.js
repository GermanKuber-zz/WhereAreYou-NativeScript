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
var external_map_service_1 = require("./shared/services/map/external-map.service");
var map_view_service_1 = require("./shared/services/map/map-view.service");
var config_service_1 = require("./shared/services/map/config.service");
var friends_add_component_1 = require("./widgets/friends-add/friends-add.component");
var forms_1 = require("nativescript-angular/forms");
var friend_preview_component_1 = require("./widgets/friend-preview/friend-preview.component");
var logged_service_1 = require("./shared/user/logged.service");
var remote_service_1 = require("./shared/remote.service");
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
            friends_add_component_1.FriendsAddComponent,
            friends_map_component_1.FriendsMapComponent,
            friend_preview_component_1.FriendPreviewComponent,
            angular_1.SIDEDRAWER_DIRECTIVES
        ],
        providers: [
            friends_service_1.FriendsService,
            map_view_service_1.MapViewService,
            external_map_service_1.ExternalMapService,
            logged_service_1.LoggedService,
            mark_manager_service_1.MarkManagerService,
            config_service_1.ConfigService,
            remote_service_1.RemoteRepositoryService
        ],
        bootstrap: [
            app_component_1.AppComponent
        ],
        imports: [
            nativescript_module_1.NativeScriptModule,
            listview_directives_1.NativeScriptUIListViewModule,
            router_1.NativeScriptRouterModule,
            router_1.NativeScriptRouterModule.forRoot(app_routing_1.routes),
            http_1.NativeScriptHttpModule,
            forms_1.NativeScriptFormsModule
        ],
        schemas: [
            core_1.NO_ERRORS_SCHEMA
        ],
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBwLm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImFwcC5tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLHNDQUFxRTtBQUNyRSxnRkFBOEU7QUFDOUUsc0RBQXVFO0FBQ3ZFLGlEQUErQztBQUMvQyw2Q0FBOEQ7QUFDOUQsaUVBQStEO0FBQy9ELDZFQUEyRTtBQUMzRSxxRkFBa0Y7QUFDbEYseUVBQXVFO0FBQ3ZFLHNFQUFtRjtBQUNuRixvRUFBa0U7QUFDbEUsb0dBQTRHO0FBRTVHLGtEQUFtRTtBQUNuRSxtRkFBZ0Y7QUFDaEYsbUZBQWdGO0FBQ2hGLDJFQUF3RTtBQUN4RSx1RUFBcUU7QUFDckUscUZBQWtGO0FBQ2xGLG9EQUFxRTtBQUNyRSw4RkFBMkY7QUFDM0YsK0RBQTZEO0FBQzdELDBEQUFrRTtBQUNsRSxJQUFJLFdBQVcsR0FBRyxPQUFPLENBQUMsYUFBYSxDQUFDLENBQUM7QUFFekMsRUFBRSxDQUFDLENBQUMsV0FBVyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7SUFDcEIsV0FBVyxDQUFDLGFBQWEsQ0FBQyx5Q0FBeUMsQ0FBQyxDQUFDO0FBQ3ZFLENBQUM7QUFvQ0QsSUFBYSxTQUFTO0lBQXRCO0lBQXlCLENBQUM7SUFBRCxnQkFBQztBQUFELENBQUMsQUFBMUIsSUFBMEI7QUFBYixTQUFTO0lBbkNyQixlQUFRLENBQUM7UUFDUixZQUFZLEVBQUU7WUFDWiw0QkFBWTtZQUNaLGdDQUFjO1lBQ2Qsd0NBQWtCO1lBQ2xCLG9DQUFnQjtZQUNoQiwyQ0FBbUI7WUFDbkIsMkNBQW1CO1lBQ25CLGlEQUFzQjtZQUN0QiwrQkFBcUI7U0FDdEI7UUFDRCxTQUFTLEVBQUU7WUFDVCxnQ0FBYztZQUNkLGlDQUFjO1lBQ2QseUNBQWtCO1lBQ2xCLDhCQUFhO1lBQ2IseUNBQWtCO1lBQ2xCLDhCQUFhO1lBQ2Isd0NBQXVCO1NBQ3hCO1FBQ0QsU0FBUyxFQUFFO1lBQ1QsNEJBQVk7U0FDYjtRQUNELE9BQU8sRUFBRTtZQUNQLHdDQUFrQjtZQUNsQixrREFBNEI7WUFDNUIsaUNBQXdCO1lBQ3hCLGlDQUF3QixDQUFDLE9BQU8sQ0FBQyxvQkFBTSxDQUFDO1lBQ3hDLDZCQUFzQjtZQUN0QiwrQkFBdUI7U0FDeEI7UUFDRCxPQUFPLEVBQUU7WUFDUCx1QkFBZ0I7U0FDakI7S0FDRixDQUFDO0dBQ1csU0FBUyxDQUFJO0FBQWIsOEJBQVMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBOZ01vZHVsZSwgTk9fRVJST1JTX1NDSEVNQSwgUHJvdmlkZXIgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IE5hdGl2ZVNjcmlwdE1vZHVsZSB9IGZyb20gXCJuYXRpdmVzY3JpcHQtYW5ndWxhci9uYXRpdmVzY3JpcHQubW9kdWxlXCI7XG5pbXBvcnQgeyBOYXRpdmVTY3JpcHRSb3V0ZXJNb2R1bGUgfSBmcm9tIFwibmF0aXZlc2NyaXB0LWFuZ3VsYXIvcm91dGVyXCI7XG5pbXBvcnQgeyBBcHBDb21wb25lbnQgfSBmcm9tIFwiLi9hcHAuY29tcG9uZW50XCI7XG5pbXBvcnQgeyByb3V0ZXMsIG5hdmlnYXRhYmxlQ29tcG9uZW50cyB9IGZyb20gXCIuL2FwcC5yb3V0aW5nXCI7XG5pbXBvcnQgeyBMb2dpbkNvbXBvbmVudCB9IGZyb20gJy4vcGFnZXMvbG9naW4vbG9naW4uY29tcG9uZW50JztcbmltcG9ydCB7IERhc2hib2FyZENvbXBvbmVudCB9IGZyb20gJy4vcGFnZXMvZGFzaGJvYXJkL2Rhc2hib2FyZC5jb21wb25lbnQnO1xuaW1wb3J0IHsgRnJpZW5kc01hcENvbXBvbmVudCB9IGZyb20gJy4vd2lkZ2V0cy9mcmllbmRzLW1hcC9mcmllbmRzLW1hcC5jb21wb25lbnQnO1xuaW1wb3J0IHsgRnJpZW5kc0NvbXBvbmVudCB9IGZyb20gJy4vd2lkZ2V0cy9mcmllbmRzL2ZyaWVuZHMuY29tcG9uZW50JztcbmltcG9ydCB7IFNJREVEUkFXRVJfRElSRUNUSVZFUyB9IGZyb20gXCJuYXRpdmVzY3JpcHQtdGVsZXJpay11aS9zaWRlZHJhd2VyL2FuZ3VsYXJcIjtcbmltcG9ydCB7IEZyaWVuZHNTZXJ2aWNlIH0gZnJvbSAnLi9zaGFyZWQvZnJpZW5kcy9mcmllbmRzLnNlcnZpY2UnO1xuaW1wb3J0IHsgTmF0aXZlU2NyaXB0VUlMaXN0Vmlld01vZHVsZSB9IGZyb20gJ25hdGl2ZXNjcmlwdC10ZWxlcmlrLXVpL2xpc3R2aWV3L2FuZ3VsYXIvbGlzdHZpZXctZGlyZWN0aXZlcyc7XG5pbXBvcnQgeyBIdHRwTW9kdWxlLCBKc29ucE1vZHVsZSwgSHR0cCB9IGZyb20gJ0Bhbmd1bGFyL2h0dHAnO1xuaW1wb3J0IHsgTmF0aXZlU2NyaXB0SHR0cE1vZHVsZSB9IGZyb20gXCJuYXRpdmVzY3JpcHQtYW5ndWxhci9odHRwXCI7XG5pbXBvcnQgeyBNYXJrTWFuYWdlclNlcnZpY2UgfSBmcm9tICcuL3NoYXJlZC9zZXJ2aWNlcy9tYXAvbWFyay1tYW5hZ2VyLnNlcnZpY2UnO1xuaW1wb3J0IHsgRXh0ZXJuYWxNYXBTZXJ2aWNlIH0gZnJvbSAnLi9zaGFyZWQvc2VydmljZXMvbWFwL2V4dGVybmFsLW1hcC5zZXJ2aWNlJztcbmltcG9ydCB7IE1hcFZpZXdTZXJ2aWNlIH0gZnJvbSAnLi9zaGFyZWQvc2VydmljZXMvbWFwL21hcC12aWV3LnNlcnZpY2UnO1xuaW1wb3J0IHsgQ29uZmlnU2VydmljZSB9IGZyb20gJy4vc2hhcmVkL3NlcnZpY2VzL21hcC9jb25maWcuc2VydmljZSc7XG5pbXBvcnQgeyBGcmllbmRzQWRkQ29tcG9uZW50IH0gZnJvbSAnLi93aWRnZXRzL2ZyaWVuZHMtYWRkL2ZyaWVuZHMtYWRkLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBOYXRpdmVTY3JpcHRGb3Jtc01vZHVsZSB9IGZyb20gXCJuYXRpdmVzY3JpcHQtYW5ndWxhci9mb3Jtc1wiO1xuaW1wb3J0IHsgRnJpZW5kUHJldmlld0NvbXBvbmVudCB9IGZyb20gJy4vd2lkZ2V0cy9mcmllbmQtcHJldmlldy9mcmllbmQtcHJldmlldy5jb21wb25lbnQnO1xuaW1wb3J0IHsgTG9nZ2VkU2VydmljZSB9IGZyb20gJy4vc2hhcmVkL3VzZXIvbG9nZ2VkLnNlcnZpY2UnO1xuaW1wb3J0IHsgUmVtb3RlUmVwb3NpdG9yeVNlcnZpY2UgfSBmcm9tICcuL3NoYXJlZC9yZW1vdGUuc2VydmljZSc7XG52YXIgYXBwbGljYXRpb24gPSByZXF1aXJlKFwiYXBwbGljYXRpb25cIik7XG5kZWNsYXJlIHZhciBHTVNTZXJ2aWNlczogYW55O1xuaWYgKGFwcGxpY2F0aW9uLmlvcykge1xuICBHTVNTZXJ2aWNlcy5wcm92aWRlQVBJS2V5KFwiQUl6YVN5Q0NiUnlkSTg0RkVGYXBUekZvNXF0R0N2NWk2Tkd1UWdFXCIpO1xufVxuQE5nTW9kdWxlKHtcbiAgZGVjbGFyYXRpb25zOiBbXG4gICAgQXBwQ29tcG9uZW50LFxuICAgIExvZ2luQ29tcG9uZW50LFxuICAgIERhc2hib2FyZENvbXBvbmVudCxcbiAgICBGcmllbmRzQ29tcG9uZW50LFxuICAgIEZyaWVuZHNBZGRDb21wb25lbnQsXG4gICAgRnJpZW5kc01hcENvbXBvbmVudCxcbiAgICBGcmllbmRQcmV2aWV3Q29tcG9uZW50LFxuICAgIFNJREVEUkFXRVJfRElSRUNUSVZFU1xuICBdLFxuICBwcm92aWRlcnM6IFtcbiAgICBGcmllbmRzU2VydmljZSxcbiAgICBNYXBWaWV3U2VydmljZSxcbiAgICBFeHRlcm5hbE1hcFNlcnZpY2UsXG4gICAgTG9nZ2VkU2VydmljZSxcbiAgICBNYXJrTWFuYWdlclNlcnZpY2UsXG4gICAgQ29uZmlnU2VydmljZSxcbiAgICBSZW1vdGVSZXBvc2l0b3J5U2VydmljZVxuICBdLFxuICBib290c3RyYXA6IFtcbiAgICBBcHBDb21wb25lbnRcbiAgXSxcbiAgaW1wb3J0czogW1xuICAgIE5hdGl2ZVNjcmlwdE1vZHVsZSxcbiAgICBOYXRpdmVTY3JpcHRVSUxpc3RWaWV3TW9kdWxlLFxuICAgIE5hdGl2ZVNjcmlwdFJvdXRlck1vZHVsZSxcbiAgICBOYXRpdmVTY3JpcHRSb3V0ZXJNb2R1bGUuZm9yUm9vdChyb3V0ZXMpLFxuICAgIE5hdGl2ZVNjcmlwdEh0dHBNb2R1bGUsXG4gICAgTmF0aXZlU2NyaXB0Rm9ybXNNb2R1bGVcbiAgXSxcbiAgc2NoZW1hczogW1xuICAgIE5PX0VSUk9SU19TQ0hFTUFcbiAgXSxcbn0pXG5leHBvcnQgY2xhc3MgQXBwTW9kdWxlIHsgfVxuIl19