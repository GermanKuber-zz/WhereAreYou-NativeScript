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
            map_view_service_1.MapViewService,
            external_map_service_1.ExternalMapService,
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBwLm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImFwcC5tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLHNDQUFxRTtBQUNyRSxnRkFBOEU7QUFDOUUsc0RBQXVFO0FBQ3ZFLGlEQUErQztBQUMvQyw2Q0FBOEQ7QUFDOUQsaUVBQStEO0FBQy9ELDZFQUEyRTtBQUMzRSxxRkFBa0Y7QUFDbEYseUVBQXVFO0FBQ3ZFLHNFQUFtRjtBQUNuRixvRUFBa0U7QUFDbEUsb0dBQTRHO0FBRTVHLGtEQUFtRTtBQUNuRSxtRkFBZ0Y7QUFDaEYsbUZBQWdGO0FBQ2hGLDJFQUF3RTtBQUV4RSxJQUFJLFdBQVcsR0FBRyxPQUFPLENBQUMsYUFBYSxDQUFDLENBQUM7QUFFekMsRUFBRSxDQUFDLENBQUMsV0FBVyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7SUFDcEIsV0FBVyxDQUFDLGFBQWEsQ0FBQyx5Q0FBeUMsQ0FBQyxDQUFDO0FBQ3ZFLENBQUM7QUE4QkQsSUFBYSxTQUFTO0lBQXRCO0lBQXlCLENBQUM7SUFBRCxnQkFBQztBQUFELENBQUMsQUFBMUIsSUFBMEI7QUFBYixTQUFTO0lBN0JyQixlQUFRLENBQUM7UUFDUixZQUFZLEVBQUU7WUFDWiw0QkFBWTtZQUNaLGdDQUFjO1lBQ2Qsd0NBQWtCO1lBQ2xCLG9DQUFnQjtZQUNoQiwyQ0FBbUI7WUFDbkIsK0JBQXFCO1NBQ3RCO1FBQ0QsU0FBUyxFQUFFO1lBQ1QsZ0NBQWM7WUFDZCxpQ0FBYztZQUNkLHlDQUFrQjtZQUNsQix5Q0FBa0I7U0FDbkI7UUFDRCxTQUFTLEVBQUU7WUFDVCw0QkFBWTtTQUNiO1FBQ0QsT0FBTyxFQUFFO1lBQ1Asd0NBQWtCO1lBQ2xCLGtEQUE0QjtZQUM1QixpQ0FBd0I7WUFDeEIsaUNBQXdCLENBQUMsT0FBTyxDQUFDLG9CQUFNLENBQUM7WUFDeEMsNkJBQXNCO1NBQ3ZCO1FBQ0QsT0FBTyxFQUFFO1lBQ0wsdUJBQWdCO1NBQ2pCO0tBQ0osQ0FBQztHQUNXLFNBQVMsQ0FBSTtBQUFiLDhCQUFTIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTmdNb2R1bGUsIE5PX0VSUk9SU19TQ0hFTUEsIFByb3ZpZGVyIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBOYXRpdmVTY3JpcHRNb2R1bGUgfSBmcm9tIFwibmF0aXZlc2NyaXB0LWFuZ3VsYXIvbmF0aXZlc2NyaXB0Lm1vZHVsZVwiO1xuaW1wb3J0IHsgTmF0aXZlU2NyaXB0Um91dGVyTW9kdWxlIH0gZnJvbSBcIm5hdGl2ZXNjcmlwdC1hbmd1bGFyL3JvdXRlclwiO1xuaW1wb3J0IHsgQXBwQ29tcG9uZW50IH0gZnJvbSBcIi4vYXBwLmNvbXBvbmVudFwiO1xuaW1wb3J0IHsgcm91dGVzLCBuYXZpZ2F0YWJsZUNvbXBvbmVudHMgfSBmcm9tIFwiLi9hcHAucm91dGluZ1wiO1xuaW1wb3J0IHsgTG9naW5Db21wb25lbnQgfSBmcm9tICcuL3BhZ2VzL2xvZ2luL2xvZ2luLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBEYXNoYm9hcmRDb21wb25lbnQgfSBmcm9tICcuL3BhZ2VzL2Rhc2hib2FyZC9kYXNoYm9hcmQuY29tcG9uZW50JztcbmltcG9ydCB7IEZyaWVuZHNNYXBDb21wb25lbnQgfSBmcm9tICcuL3dpZGdldHMvZnJpZW5kcy1tYXAvZnJpZW5kcy1tYXAuY29tcG9uZW50JztcbmltcG9ydCB7IEZyaWVuZHNDb21wb25lbnQgfSBmcm9tICcuL3dpZGdldHMvZnJpZW5kcy9mcmllbmRzLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBTSURFRFJBV0VSX0RJUkVDVElWRVMgfSBmcm9tIFwibmF0aXZlc2NyaXB0LXRlbGVyaWstdWkvc2lkZWRyYXdlci9hbmd1bGFyXCI7XG5pbXBvcnQgeyBGcmllbmRzU2VydmljZSB9IGZyb20gJy4vc2hhcmVkL2ZyaWVuZHMvZnJpZW5kcy5zZXJ2aWNlJztcbmltcG9ydCB7IE5hdGl2ZVNjcmlwdFVJTGlzdFZpZXdNb2R1bGUgfSBmcm9tICduYXRpdmVzY3JpcHQtdGVsZXJpay11aS9saXN0dmlldy9hbmd1bGFyL2xpc3R2aWV3LWRpcmVjdGl2ZXMnO1xuaW1wb3J0IHsgSHR0cE1vZHVsZSwgSnNvbnBNb2R1bGUsIEh0dHAgfSBmcm9tICdAYW5ndWxhci9odHRwJztcbmltcG9ydCB7IE5hdGl2ZVNjcmlwdEh0dHBNb2R1bGUgfSBmcm9tIFwibmF0aXZlc2NyaXB0LWFuZ3VsYXIvaHR0cFwiO1xuaW1wb3J0IHsgTWFya01hbmFnZXJTZXJ2aWNlIH0gZnJvbSAnLi9zaGFyZWQvc2VydmljZXMvbWFwL21hcmstbWFuYWdlci5zZXJ2aWNlJztcbmltcG9ydCB7IEV4dGVybmFsTWFwU2VydmljZSB9IGZyb20gJy4vc2hhcmVkL3NlcnZpY2VzL21hcC9leHRlcm5hbC1tYXAuc2VydmljZSc7XG5pbXBvcnQgeyBNYXBWaWV3U2VydmljZSB9IGZyb20gJy4vc2hhcmVkL3NlcnZpY2VzL21hcC9tYXAtdmlldy5zZXJ2aWNlJztcblxudmFyIGFwcGxpY2F0aW9uID0gcmVxdWlyZShcImFwcGxpY2F0aW9uXCIpO1xuZGVjbGFyZSB2YXIgR01TU2VydmljZXM6IGFueTtcbmlmIChhcHBsaWNhdGlvbi5pb3MpIHtcbiAgR01TU2VydmljZXMucHJvdmlkZUFQSUtleShcIkFJemFTeUNDYlJ5ZEk4NEZFRmFwVHpGbzVxdEdDdjVpNk5HdVFnRVwiKTtcbn1cbkBOZ01vZHVsZSh7XG4gIGRlY2xhcmF0aW9uczogW1xuICAgIEFwcENvbXBvbmVudCxcbiAgICBMb2dpbkNvbXBvbmVudCxcbiAgICBEYXNoYm9hcmRDb21wb25lbnQsXG4gICAgRnJpZW5kc0NvbXBvbmVudCxcbiAgICBGcmllbmRzTWFwQ29tcG9uZW50LFxuICAgIFNJREVEUkFXRVJfRElSRUNUSVZFU1xuICBdLFxuICBwcm92aWRlcnM6IFtcbiAgICBGcmllbmRzU2VydmljZSxcbiAgICBNYXBWaWV3U2VydmljZSxcbiAgICBFeHRlcm5hbE1hcFNlcnZpY2UsXG4gICAgTWFya01hbmFnZXJTZXJ2aWNlXG4gIF0sXG4gIGJvb3RzdHJhcDogW1xuICAgIEFwcENvbXBvbmVudFxuICBdLFxuICBpbXBvcnRzOiBbXG4gICAgTmF0aXZlU2NyaXB0TW9kdWxlLFxuICAgIE5hdGl2ZVNjcmlwdFVJTGlzdFZpZXdNb2R1bGUsXG4gICAgTmF0aXZlU2NyaXB0Um91dGVyTW9kdWxlLFxuICAgIE5hdGl2ZVNjcmlwdFJvdXRlck1vZHVsZS5mb3JSb290KHJvdXRlcyksXG4gICAgTmF0aXZlU2NyaXB0SHR0cE1vZHVsZVxuICBdLFxuICBzY2hlbWFzOiBbXG4gICAgICBOT19FUlJPUlNfU0NIRU1BXG4gICAgXSxcbn0pXG5leHBvcnQgY2xhc3MgQXBwTW9kdWxlIHsgfVxuIl19