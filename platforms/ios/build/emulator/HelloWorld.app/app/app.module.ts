import { NgModule, NO_ERRORS_SCHEMA, Provider } from '@angular/core';
import { NativeScriptModule } from "nativescript-angular/nativescript.module";
import { NativeScriptRouterModule } from "nativescript-angular/router";
import { AppComponent } from "./app.component";
import { routes, navigatableComponents } from "./app.routing";
import { LoginComponent } from './pages/login/login.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { FriendsMapComponent } from './widgets/friends-map/friends-map.component';
import { FriendsComponent } from './widgets/friends/friends.component';
import { SIDEDRAWER_DIRECTIVES } from "nativescript-telerik-ui/sidedrawer/angular";
import { FriendsService } from './shared/friends/friends.service';
import { NativeScriptUIListViewModule } from 'nativescript-telerik-ui/listview/angular/listview-directives';
import { HttpModule, JsonpModule, Http } from '@angular/http';
import { NativeScriptHttpModule } from "nativescript-angular/http";
import { MarkManagerService } from './shared/services/map/mark-manager.service';
import { ExternalMapService } from './shared/services/map/external-map.service';
import { MapViewService } from './shared/services/map/map-view.service';
import { ConfigService } from './shared/services/map/config.service';
import { FriendsAddComponent } from './widgets/friends-add/friends-add.component';
import { NativeScriptFormsModule } from "nativescript-angular/forms";
import { FriendPreviewComponent } from './widgets/friend-preview/friend-preview.component';
import { LoggedService } from './shared/user/logged.service';
import { RemoteRepositoryService } from './shared/remote.service';
var application = require("application");
declare var GMSServices: any;
if (application.ios) {
  GMSServices.provideAPIKey("AIzaSyCCbRydI84FEFapTzFo5qtGCv5i6NGuQgE");
}
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DashboardComponent,
    FriendsComponent,
    FriendsAddComponent,
    FriendsMapComponent,
    FriendPreviewComponent,
    SIDEDRAWER_DIRECTIVES
  ],
  providers: [
    FriendsService,
    MapViewService,
    ExternalMapService,
    LoggedService,
    MarkManagerService,
    ConfigService,
    RemoteRepositoryService
  ],
  bootstrap: [
    AppComponent
  ],
  imports: [
    NativeScriptModule,
    NativeScriptUIListViewModule,
    NativeScriptRouterModule,
    NativeScriptRouterModule.forRoot(routes),
    NativeScriptHttpModule,
    NativeScriptFormsModule
  ],
  schemas: [
    NO_ERRORS_SCHEMA
  ],
})
export class AppModule { }
