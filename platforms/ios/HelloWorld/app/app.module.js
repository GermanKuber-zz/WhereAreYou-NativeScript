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
var user_service_1 = require("./shared/user/user.service");
var navigation_service_1 = require("./shared/navigation.service");
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
            remote_service_1.RemoteRepositoryService,
            user_service_1.UserService,
            navigation_service_1.NavigationService
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBwLm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImFwcC5tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLHNDQUFxRTtBQUNyRSxnRkFBOEU7QUFDOUUsc0RBQXVFO0FBQ3ZFLGlEQUErQztBQUMvQyw2Q0FBOEQ7QUFDOUQsaUVBQStEO0FBQy9ELDZFQUEyRTtBQUMzRSxxRkFBa0Y7QUFDbEYseUVBQXVFO0FBQ3ZFLHNFQUFtRjtBQUNuRixvRUFBa0U7QUFDbEUsb0dBQTRHO0FBRTVHLGtEQUFtRTtBQUNuRSxtRkFBZ0Y7QUFDaEYsbUZBQWdGO0FBQ2hGLDJFQUF3RTtBQUN4RSx1RUFBcUU7QUFDckUscUZBQWtGO0FBQ2xGLG9EQUFxRTtBQUNyRSw4RkFBMkY7QUFDM0YsK0RBQTZEO0FBQzdELDBEQUFrRTtBQUNsRSwyREFBeUQ7QUFDekQsa0VBQWdFO0FBQ2hFLElBQUksV0FBVyxHQUFHLE9BQU8sQ0FBQyxhQUFhLENBQUMsQ0FBQztBQUV6QyxFQUFFLENBQUMsQ0FBQyxXQUFXLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztJQUNwQixXQUFXLENBQUMsYUFBYSxDQUFDLHlDQUF5QyxDQUFDLENBQUM7QUFDdkUsQ0FBQztBQXNDRCxJQUFhLFNBQVM7SUFBdEI7SUFBeUIsQ0FBQztJQUFELGdCQUFDO0FBQUQsQ0FBQyxBQUExQixJQUEwQjtBQUFiLFNBQVM7SUFyQ3JCLGVBQVEsQ0FBQztRQUNSLFlBQVksRUFBRTtZQUNaLDRCQUFZO1lBQ1osZ0NBQWM7WUFDZCx3Q0FBa0I7WUFDbEIsb0NBQWdCO1lBQ2hCLDJDQUFtQjtZQUNuQiwyQ0FBbUI7WUFDbkIsaURBQXNCO1lBQ3RCLCtCQUFxQjtTQUN0QjtRQUNELFNBQVMsRUFBRTtZQUNULGdDQUFjO1lBQ2QsaUNBQWM7WUFDZCx5Q0FBa0I7WUFDbEIsOEJBQWE7WUFDYix5Q0FBa0I7WUFDbEIsOEJBQWE7WUFDYix3Q0FBdUI7WUFDdkIsMEJBQVc7WUFDWCxzQ0FBaUI7U0FDbEI7UUFDRCxTQUFTLEVBQUU7WUFDVCw0QkFBWTtTQUNiO1FBQ0QsT0FBTyxFQUFFO1lBQ1Asd0NBQWtCO1lBQ2xCLGtEQUE0QjtZQUM1QixpQ0FBd0I7WUFDeEIsaUNBQXdCLENBQUMsT0FBTyxDQUFDLG9CQUFNLENBQUM7WUFDeEMsNkJBQXNCO1lBQ3RCLCtCQUF1QjtTQUN4QjtRQUNELE9BQU8sRUFBRTtZQUNQLHVCQUFnQjtTQUNqQjtLQUNGLENBQUM7R0FDVyxTQUFTLENBQUk7QUFBYiw4QkFBUyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE5nTW9kdWxlLCBOT19FUlJPUlNfU0NIRU1BLCBQcm92aWRlciB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgTmF0aXZlU2NyaXB0TW9kdWxlIH0gZnJvbSBcIm5hdGl2ZXNjcmlwdC1hbmd1bGFyL25hdGl2ZXNjcmlwdC5tb2R1bGVcIjtcbmltcG9ydCB7IE5hdGl2ZVNjcmlwdFJvdXRlck1vZHVsZSB9IGZyb20gXCJuYXRpdmVzY3JpcHQtYW5ndWxhci9yb3V0ZXJcIjtcbmltcG9ydCB7IEFwcENvbXBvbmVudCB9IGZyb20gXCIuL2FwcC5jb21wb25lbnRcIjtcbmltcG9ydCB7IHJvdXRlcywgbmF2aWdhdGFibGVDb21wb25lbnRzIH0gZnJvbSBcIi4vYXBwLnJvdXRpbmdcIjtcbmltcG9ydCB7IExvZ2luQ29tcG9uZW50IH0gZnJvbSAnLi9wYWdlcy9sb2dpbi9sb2dpbi5jb21wb25lbnQnO1xuaW1wb3J0IHsgRGFzaGJvYXJkQ29tcG9uZW50IH0gZnJvbSAnLi9wYWdlcy9kYXNoYm9hcmQvZGFzaGJvYXJkLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBGcmllbmRzTWFwQ29tcG9uZW50IH0gZnJvbSAnLi93aWRnZXRzL2ZyaWVuZHMtbWFwL2ZyaWVuZHMtbWFwLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBGcmllbmRzQ29tcG9uZW50IH0gZnJvbSAnLi93aWRnZXRzL2ZyaWVuZHMvZnJpZW5kcy5jb21wb25lbnQnO1xuaW1wb3J0IHsgU0lERURSQVdFUl9ESVJFQ1RJVkVTIH0gZnJvbSBcIm5hdGl2ZXNjcmlwdC10ZWxlcmlrLXVpL3NpZGVkcmF3ZXIvYW5ndWxhclwiO1xuaW1wb3J0IHsgRnJpZW5kc1NlcnZpY2UgfSBmcm9tICcuL3NoYXJlZC9mcmllbmRzL2ZyaWVuZHMuc2VydmljZSc7XG5pbXBvcnQgeyBOYXRpdmVTY3JpcHRVSUxpc3RWaWV3TW9kdWxlIH0gZnJvbSAnbmF0aXZlc2NyaXB0LXRlbGVyaWstdWkvbGlzdHZpZXcvYW5ndWxhci9saXN0dmlldy1kaXJlY3RpdmVzJztcbmltcG9ydCB7IEh0dHBNb2R1bGUsIEpzb25wTW9kdWxlLCBIdHRwIH0gZnJvbSAnQGFuZ3VsYXIvaHR0cCc7XG5pbXBvcnQgeyBOYXRpdmVTY3JpcHRIdHRwTW9kdWxlIH0gZnJvbSBcIm5hdGl2ZXNjcmlwdC1hbmd1bGFyL2h0dHBcIjtcbmltcG9ydCB7IE1hcmtNYW5hZ2VyU2VydmljZSB9IGZyb20gJy4vc2hhcmVkL3NlcnZpY2VzL21hcC9tYXJrLW1hbmFnZXIuc2VydmljZSc7XG5pbXBvcnQgeyBFeHRlcm5hbE1hcFNlcnZpY2UgfSBmcm9tICcuL3NoYXJlZC9zZXJ2aWNlcy9tYXAvZXh0ZXJuYWwtbWFwLnNlcnZpY2UnO1xuaW1wb3J0IHsgTWFwVmlld1NlcnZpY2UgfSBmcm9tICcuL3NoYXJlZC9zZXJ2aWNlcy9tYXAvbWFwLXZpZXcuc2VydmljZSc7XG5pbXBvcnQgeyBDb25maWdTZXJ2aWNlIH0gZnJvbSAnLi9zaGFyZWQvc2VydmljZXMvbWFwL2NvbmZpZy5zZXJ2aWNlJztcbmltcG9ydCB7IEZyaWVuZHNBZGRDb21wb25lbnQgfSBmcm9tICcuL3dpZGdldHMvZnJpZW5kcy1hZGQvZnJpZW5kcy1hZGQuY29tcG9uZW50JztcbmltcG9ydCB7IE5hdGl2ZVNjcmlwdEZvcm1zTW9kdWxlIH0gZnJvbSBcIm5hdGl2ZXNjcmlwdC1hbmd1bGFyL2Zvcm1zXCI7XG5pbXBvcnQgeyBGcmllbmRQcmV2aWV3Q29tcG9uZW50IH0gZnJvbSAnLi93aWRnZXRzL2ZyaWVuZC1wcmV2aWV3L2ZyaWVuZC1wcmV2aWV3LmNvbXBvbmVudCc7XG5pbXBvcnQgeyBMb2dnZWRTZXJ2aWNlIH0gZnJvbSAnLi9zaGFyZWQvdXNlci9sb2dnZWQuc2VydmljZSc7XG5pbXBvcnQgeyBSZW1vdGVSZXBvc2l0b3J5U2VydmljZSB9IGZyb20gJy4vc2hhcmVkL3JlbW90ZS5zZXJ2aWNlJztcbmltcG9ydCB7IFVzZXJTZXJ2aWNlIH0gZnJvbSAnLi9zaGFyZWQvdXNlci91c2VyLnNlcnZpY2UnO1xuaW1wb3J0IHsgTmF2aWdhdGlvblNlcnZpY2UgfSBmcm9tICcuL3NoYXJlZC9uYXZpZ2F0aW9uLnNlcnZpY2UnO1xudmFyIGFwcGxpY2F0aW9uID0gcmVxdWlyZShcImFwcGxpY2F0aW9uXCIpO1xuZGVjbGFyZSB2YXIgR01TU2VydmljZXM6IGFueTtcbmlmIChhcHBsaWNhdGlvbi5pb3MpIHtcbiAgR01TU2VydmljZXMucHJvdmlkZUFQSUtleShcIkFJemFTeUNDYlJ5ZEk4NEZFRmFwVHpGbzVxdEdDdjVpNk5HdVFnRVwiKTtcbn1cbkBOZ01vZHVsZSh7XG4gIGRlY2xhcmF0aW9uczogW1xuICAgIEFwcENvbXBvbmVudCxcbiAgICBMb2dpbkNvbXBvbmVudCxcbiAgICBEYXNoYm9hcmRDb21wb25lbnQsXG4gICAgRnJpZW5kc0NvbXBvbmVudCxcbiAgICBGcmllbmRzQWRkQ29tcG9uZW50LFxuICAgIEZyaWVuZHNNYXBDb21wb25lbnQsXG4gICAgRnJpZW5kUHJldmlld0NvbXBvbmVudCxcbiAgICBTSURFRFJBV0VSX0RJUkVDVElWRVNcbiAgXSxcbiAgcHJvdmlkZXJzOiBbXG4gICAgRnJpZW5kc1NlcnZpY2UsXG4gICAgTWFwVmlld1NlcnZpY2UsXG4gICAgRXh0ZXJuYWxNYXBTZXJ2aWNlLFxuICAgIExvZ2dlZFNlcnZpY2UsXG4gICAgTWFya01hbmFnZXJTZXJ2aWNlLFxuICAgIENvbmZpZ1NlcnZpY2UsXG4gICAgUmVtb3RlUmVwb3NpdG9yeVNlcnZpY2UsXG4gICAgVXNlclNlcnZpY2UsXG4gICAgTmF2aWdhdGlvblNlcnZpY2VcbiAgXSxcbiAgYm9vdHN0cmFwOiBbXG4gICAgQXBwQ29tcG9uZW50XG4gIF0sXG4gIGltcG9ydHM6IFtcbiAgICBOYXRpdmVTY3JpcHRNb2R1bGUsXG4gICAgTmF0aXZlU2NyaXB0VUlMaXN0Vmlld01vZHVsZSxcbiAgICBOYXRpdmVTY3JpcHRSb3V0ZXJNb2R1bGUsXG4gICAgTmF0aXZlU2NyaXB0Um91dGVyTW9kdWxlLmZvclJvb3Qocm91dGVzKSxcbiAgICBOYXRpdmVTY3JpcHRIdHRwTW9kdWxlLFxuICAgIE5hdGl2ZVNjcmlwdEZvcm1zTW9kdWxlXG4gIF0sXG4gIHNjaGVtYXM6IFtcbiAgICBOT19FUlJPUlNfU0NIRU1BXG4gIF0sXG59KVxuZXhwb3J0IGNsYXNzIEFwcE1vZHVsZSB7IH1cbiJdfQ==