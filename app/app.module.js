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
var register_component_1 = require("./pages/register/register.component");
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
            register_component_1.RegisterComponent,
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBwLm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImFwcC5tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLHNDQUFxRTtBQUNyRSxnRkFBOEU7QUFDOUUsc0RBQXVFO0FBQ3ZFLGlEQUErQztBQUMvQyw2Q0FBOEQ7QUFDOUQsaUVBQStEO0FBQy9ELDZFQUEyRTtBQUMzRSxxRkFBa0Y7QUFDbEYseUVBQXVFO0FBQ3ZFLHNFQUFtRjtBQUNuRixvRUFBa0U7QUFDbEUsb0dBQTRHO0FBRTVHLGtEQUFtRTtBQUNuRSxtRkFBZ0Y7QUFDaEYsbUZBQWdGO0FBQ2hGLDJFQUF3RTtBQUN4RSx1RUFBcUU7QUFDckUscUZBQWtGO0FBQ2xGLG9EQUFxRTtBQUNyRSw4RkFBMkY7QUFDM0YsK0RBQTZEO0FBQzdELDBEQUFrRTtBQUNsRSwyREFBeUQ7QUFDekQsa0VBQWdFO0FBQ2hFLDBFQUF3RTtBQUN4RSxJQUFJLFdBQVcsR0FBRyxPQUFPLENBQUMsYUFBYSxDQUFDLENBQUM7QUFFekMsRUFBRSxDQUFDLENBQUMsV0FBVyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7SUFDcEIsV0FBVyxDQUFDLGFBQWEsQ0FBQyx5Q0FBeUMsQ0FBQyxDQUFDO0FBQ3ZFLENBQUM7QUF1Q0QsSUFBYSxTQUFTO0lBQXRCO0lBQXlCLENBQUM7SUFBRCxnQkFBQztBQUFELENBQUMsQUFBMUIsSUFBMEI7QUFBYixTQUFTO0lBdENyQixlQUFRLENBQUM7UUFDUixZQUFZLEVBQUU7WUFDWiw0QkFBWTtZQUNaLGdDQUFjO1lBQ2Qsd0NBQWtCO1lBQ2xCLG9DQUFnQjtZQUNoQiwyQ0FBbUI7WUFDbkIsMkNBQW1CO1lBQ25CLHNDQUFpQjtZQUNqQixpREFBc0I7WUFDdEIsK0JBQXFCO1NBQ3RCO1FBQ0QsU0FBUyxFQUFFO1lBQ1QsZ0NBQWM7WUFDZCxpQ0FBYztZQUNkLHlDQUFrQjtZQUNsQiw4QkFBYTtZQUNiLHlDQUFrQjtZQUNsQiw4QkFBYTtZQUNiLHdDQUF1QjtZQUN2QiwwQkFBVztZQUNYLHNDQUFpQjtTQUNsQjtRQUNELFNBQVMsRUFBRTtZQUNULDRCQUFZO1NBQ2I7UUFDRCxPQUFPLEVBQUU7WUFDUCx3Q0FBa0I7WUFDbEIsa0RBQTRCO1lBQzVCLGlDQUF3QjtZQUN4QixpQ0FBd0IsQ0FBQyxPQUFPLENBQUMsb0JBQU0sQ0FBQztZQUN4Qyw2QkFBc0I7WUFDdEIsK0JBQXVCO1NBQ3hCO1FBQ0QsT0FBTyxFQUFFO1lBQ1AsdUJBQWdCO1NBQ2pCO0tBQ0YsQ0FBQztHQUNXLFNBQVMsQ0FBSTtBQUFiLDhCQUFTIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTmdNb2R1bGUsIE5PX0VSUk9SU19TQ0hFTUEsIFByb3ZpZGVyIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBOYXRpdmVTY3JpcHRNb2R1bGUgfSBmcm9tIFwibmF0aXZlc2NyaXB0LWFuZ3VsYXIvbmF0aXZlc2NyaXB0Lm1vZHVsZVwiO1xuaW1wb3J0IHsgTmF0aXZlU2NyaXB0Um91dGVyTW9kdWxlIH0gZnJvbSBcIm5hdGl2ZXNjcmlwdC1hbmd1bGFyL3JvdXRlclwiO1xuaW1wb3J0IHsgQXBwQ29tcG9uZW50IH0gZnJvbSBcIi4vYXBwLmNvbXBvbmVudFwiO1xuaW1wb3J0IHsgcm91dGVzLCBuYXZpZ2F0YWJsZUNvbXBvbmVudHMgfSBmcm9tIFwiLi9hcHAucm91dGluZ1wiO1xuaW1wb3J0IHsgTG9naW5Db21wb25lbnQgfSBmcm9tICcuL3BhZ2VzL2xvZ2luL2xvZ2luLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBEYXNoYm9hcmRDb21wb25lbnQgfSBmcm9tICcuL3BhZ2VzL2Rhc2hib2FyZC9kYXNoYm9hcmQuY29tcG9uZW50JztcbmltcG9ydCB7IEZyaWVuZHNNYXBDb21wb25lbnQgfSBmcm9tICcuL3dpZGdldHMvZnJpZW5kcy1tYXAvZnJpZW5kcy1tYXAuY29tcG9uZW50JztcbmltcG9ydCB7IEZyaWVuZHNDb21wb25lbnQgfSBmcm9tICcuL3dpZGdldHMvZnJpZW5kcy9mcmllbmRzLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBTSURFRFJBV0VSX0RJUkVDVElWRVMgfSBmcm9tIFwibmF0aXZlc2NyaXB0LXRlbGVyaWstdWkvc2lkZWRyYXdlci9hbmd1bGFyXCI7XG5pbXBvcnQgeyBGcmllbmRzU2VydmljZSB9IGZyb20gJy4vc2hhcmVkL2ZyaWVuZHMvZnJpZW5kcy5zZXJ2aWNlJztcbmltcG9ydCB7IE5hdGl2ZVNjcmlwdFVJTGlzdFZpZXdNb2R1bGUgfSBmcm9tICduYXRpdmVzY3JpcHQtdGVsZXJpay11aS9saXN0dmlldy9hbmd1bGFyL2xpc3R2aWV3LWRpcmVjdGl2ZXMnO1xuaW1wb3J0IHsgSHR0cE1vZHVsZSwgSnNvbnBNb2R1bGUsIEh0dHAgfSBmcm9tICdAYW5ndWxhci9odHRwJztcbmltcG9ydCB7IE5hdGl2ZVNjcmlwdEh0dHBNb2R1bGUgfSBmcm9tIFwibmF0aXZlc2NyaXB0LWFuZ3VsYXIvaHR0cFwiO1xuaW1wb3J0IHsgTWFya01hbmFnZXJTZXJ2aWNlIH0gZnJvbSAnLi9zaGFyZWQvc2VydmljZXMvbWFwL21hcmstbWFuYWdlci5zZXJ2aWNlJztcbmltcG9ydCB7IEV4dGVybmFsTWFwU2VydmljZSB9IGZyb20gJy4vc2hhcmVkL3NlcnZpY2VzL21hcC9leHRlcm5hbC1tYXAuc2VydmljZSc7XG5pbXBvcnQgeyBNYXBWaWV3U2VydmljZSB9IGZyb20gJy4vc2hhcmVkL3NlcnZpY2VzL21hcC9tYXAtdmlldy5zZXJ2aWNlJztcbmltcG9ydCB7IENvbmZpZ1NlcnZpY2UgfSBmcm9tICcuL3NoYXJlZC9zZXJ2aWNlcy9tYXAvY29uZmlnLnNlcnZpY2UnO1xuaW1wb3J0IHsgRnJpZW5kc0FkZENvbXBvbmVudCB9IGZyb20gJy4vd2lkZ2V0cy9mcmllbmRzLWFkZC9mcmllbmRzLWFkZC5jb21wb25lbnQnO1xuaW1wb3J0IHsgTmF0aXZlU2NyaXB0Rm9ybXNNb2R1bGUgfSBmcm9tIFwibmF0aXZlc2NyaXB0LWFuZ3VsYXIvZm9ybXNcIjtcbmltcG9ydCB7IEZyaWVuZFByZXZpZXdDb21wb25lbnQgfSBmcm9tICcuL3dpZGdldHMvZnJpZW5kLXByZXZpZXcvZnJpZW5kLXByZXZpZXcuY29tcG9uZW50JztcbmltcG9ydCB7IExvZ2dlZFNlcnZpY2UgfSBmcm9tICcuL3NoYXJlZC91c2VyL2xvZ2dlZC5zZXJ2aWNlJztcbmltcG9ydCB7IFJlbW90ZVJlcG9zaXRvcnlTZXJ2aWNlIH0gZnJvbSAnLi9zaGFyZWQvcmVtb3RlLnNlcnZpY2UnO1xuaW1wb3J0IHsgVXNlclNlcnZpY2UgfSBmcm9tICcuL3NoYXJlZC91c2VyL3VzZXIuc2VydmljZSc7XG5pbXBvcnQgeyBOYXZpZ2F0aW9uU2VydmljZSB9IGZyb20gJy4vc2hhcmVkL25hdmlnYXRpb24uc2VydmljZSc7XG5pbXBvcnQgeyBSZWdpc3RlckNvbXBvbmVudCB9IGZyb20gJy4vcGFnZXMvcmVnaXN0ZXIvcmVnaXN0ZXIuY29tcG9uZW50JztcbnZhciBhcHBsaWNhdGlvbiA9IHJlcXVpcmUoXCJhcHBsaWNhdGlvblwiKTtcbmRlY2xhcmUgdmFyIEdNU1NlcnZpY2VzOiBhbnk7XG5pZiAoYXBwbGljYXRpb24uaW9zKSB7XG4gIEdNU1NlcnZpY2VzLnByb3ZpZGVBUElLZXkoXCJBSXphU3lDQ2JSeWRJODRGRUZhcFR6Rm81cXRHQ3Y1aTZOR3VRZ0VcIik7XG59XG5ATmdNb2R1bGUoe1xuICBkZWNsYXJhdGlvbnM6IFtcbiAgICBBcHBDb21wb25lbnQsXG4gICAgTG9naW5Db21wb25lbnQsXG4gICAgRGFzaGJvYXJkQ29tcG9uZW50LFxuICAgIEZyaWVuZHNDb21wb25lbnQsXG4gICAgRnJpZW5kc0FkZENvbXBvbmVudCxcbiAgICBGcmllbmRzTWFwQ29tcG9uZW50LFxuICAgIFJlZ2lzdGVyQ29tcG9uZW50LFxuICAgIEZyaWVuZFByZXZpZXdDb21wb25lbnQsXG4gICAgU0lERURSQVdFUl9ESVJFQ1RJVkVTXG4gIF0sXG4gIHByb3ZpZGVyczogW1xuICAgIEZyaWVuZHNTZXJ2aWNlLFxuICAgIE1hcFZpZXdTZXJ2aWNlLFxuICAgIEV4dGVybmFsTWFwU2VydmljZSxcbiAgICBMb2dnZWRTZXJ2aWNlLFxuICAgIE1hcmtNYW5hZ2VyU2VydmljZSxcbiAgICBDb25maWdTZXJ2aWNlLFxuICAgIFJlbW90ZVJlcG9zaXRvcnlTZXJ2aWNlLFxuICAgIFVzZXJTZXJ2aWNlLFxuICAgIE5hdmlnYXRpb25TZXJ2aWNlXG4gIF0sXG4gIGJvb3RzdHJhcDogW1xuICAgIEFwcENvbXBvbmVudFxuICBdLFxuICBpbXBvcnRzOiBbXG4gICAgTmF0aXZlU2NyaXB0TW9kdWxlLFxuICAgIE5hdGl2ZVNjcmlwdFVJTGlzdFZpZXdNb2R1bGUsXG4gICAgTmF0aXZlU2NyaXB0Um91dGVyTW9kdWxlLFxuICAgIE5hdGl2ZVNjcmlwdFJvdXRlck1vZHVsZS5mb3JSb290KHJvdXRlcyksXG4gICAgTmF0aXZlU2NyaXB0SHR0cE1vZHVsZSxcbiAgICBOYXRpdmVTY3JpcHRGb3Jtc01vZHVsZVxuICBdLFxuICBzY2hlbWFzOiBbXG4gICAgTk9fRVJST1JTX1NDSEVNQVxuICBdLFxufSlcbmV4cG9ydCBjbGFzcyBBcHBNb2R1bGUgeyB9XG4iXX0=