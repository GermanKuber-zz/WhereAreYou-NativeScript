"use strict";
var core_1 = require("@angular/core");
var element_registry_1 = require("nativescript-angular/element-registry");
var geolocation = require('nativescript-geolocation');
var nativescript_google_maps_sdk_1 = require("nativescript-google-maps-sdk");
var style = require('./map-style.json');
var color_1 = require("color");
var angular_1 = require("nativescript-telerik-ui/sidedrawer/angular");
var friends_lives_service_1 = require("../../shared/friends/friends-lives.service");
var friends_service_1 = require("../../shared/friends/friends.service");
console.log('Registering MapView');
element_registry_1.registerElement('MapView', function () { return nativescript_google_maps_sdk_1.MapView; });
var FriendsMapComponent = (function () {
    function FriendsMapComponent(friendsLiveService, friendsService) {
        var _this = this;
        this.friendsLiveService = friendsLiveService;
        this.friendsService = friendsService;
        //#Mapa 
        this.mapView = null;
        this.watchId = null;
        this.centeredOnLocation = false;
        this.mapTapped = function (event) {
            console.log('Map Tapped');
            _this.tapLine = _this.addPointToLine({
                color: new color_1.Color('Red'),
                line: _this.tapLine,
                location: event.position,
                geodesic: true,
                width: 10
            });
            _this.removeMarker(_this.tapMarker);
            _this.tapMarker = _this.addMarker({
                location: event.position,
                title: 'Tap Location'
            });
        };
        this.locationReceived = function (position) {
            console.log('GPS Update Received');
            if (_this.mapView && position) {
                _this.mapView.latitude = position.latitude;
                _this.mapView.longitude = position.longitude;
                _this.mapView.zoom = 16;
                _this.centeredOnLocation = true;
            }
            // this.gpsLine = this.addPointToLine({
            //   color: new Color('Green'),
            //   line: this.gpsLine,
            //   location: position,
            //   geodesic: true,
            //   width: 10
            // });
            _this.removeMarker(_this.gpsMarker);
            _this.gpsMarker = _this.addMarker({
                location: position,
                title: 'GPS Location'
            });
        };
    }
    FriendsMapComponent.prototype.ngOnInit = function () {
        var _this = this;
        if (!geolocation.isEnabled()) {
            geolocation.enableLocationRequest();
        }
        this.friendsLiveService.getFriendsByGroup(1).subscribe(function (x) {
            for (var _i = 0, x_1 = x; _i < x_1.length; _i++) {
                var item = x_1[_i];
                _this.friends.push(item);
            }
        });
        // this.groceryListService.load()
        // .subscribe(loadedGroceries => {
        //   loadedGroceries.forEach((groceryObject) => {
        //     this.groceryList.unshift(groceryObject);
        //   });
        //   this.isLoading = false;
        //   this.listLoaded = true;
        // });
    };
    FriendsMapComponent.prototype.openDrawer = function () {
        this.drawer.showDrawer();
    };
    FriendsMapComponent.prototype.closeDrawer = function () {
        this.drawer.closeDrawer();
    };
    FriendsMapComponent.prototype.enableLocation = function () {
        if (!geolocation.isEnabled()) {
            console.log('Location not enabled, requesting.');
            return geolocation.enableLocationRequest();
        }
        else {
            return Promise.resolve(true);
        }
    };
    FriendsMapComponent.prototype.getLocation = function () {
        if (geolocation.isEnabled()) {
            var location = geolocation.getCurrentLocation({
                desiredAccuracy: 10,
                updateDistance: 10,
                minimumUpdateTime: 1000,
                maximumAge: 10000
            });
            return location;
        }
        return Promise.reject('Geolocation not enabled.');
    };
    //Map events
    FriendsMapComponent.prototype.onMapReady = function (event) {
        var _this = this;
        console.log('Map Ready');
        if (this.mapView || !event.object)
            return;
        this.mapView = event.object;
        this.mapView.setStyle(style);
        // this.mapView.markerSelect = this.onMarkerSelect;
        // this.mapView.cameraChanged = this.onCameraChanged;
        this.enableLocation()
            .then(function () {
            var location = _this.getLocation();
        })
            .then(function () {
            _this.watchId = geolocation.watchLocation(_this.locationReceived, _this.error, {
                desiredAccuracy: 10,
                updateDistance: 10,
                minimumUpdateTime: 10000,
                maximumAge: 60000
            });
        }, this.error);
    };
    ;
    FriendsMapComponent.prototype.addPointToLine = function (args) {
        if (!this.mapView || !args || !args.location)
            return;
        var line = args.line;
        if (!line) {
            line = new nativescript_google_maps_sdk_1.Polyline();
            line.visible = true;
            line.width = args.width || 10;
            line.color = args.color || new color_1.Color('Red');
            line.geodesic = args.geodesic != undefined ? args.geodesic : true;
            this.mapView.addPolyline(line);
        }
        line.addPoint(nativescript_google_maps_sdk_1.Position.positionFromLatLng(args.location.latitude, args.location.longitude));
        return line;
    };
    FriendsMapComponent.prototype.addMarker = function (args) {
        if (!this.mapView || !args || !args.location)
            return;
        var marker = new nativescript_google_maps_sdk_1.Marker();
        marker.position = nativescript_google_maps_sdk_1.Position.positionFromLatLng(args.location.latitude, args.location.longitude);
        marker.title = args.title;
        marker.snippet = args.title;
        this.mapView.addMarker(marker);
        return marker;
    };
    ;
    FriendsMapComponent.prototype.clearGpsLine = function () {
        this.removeLine(this.gpsLine);
        this.gpsLine = null;
        this.closeDrawer();
    };
    ;
    FriendsMapComponent.prototype.clearTapLine = function () {
        this.removeLine(this.tapLine);
        this.tapLine = null;
        this.removeMarker(this.tapMarker);
        this.tapMarker = null;
        this.closeDrawer();
    };
    FriendsMapComponent.prototype.removeLine = function (line) {
        if (line) {
            line.removeAllPoints();
        }
    };
    FriendsMapComponent.prototype.removeMarker = function (marker) {
        if (this.mapView && marker) {
            this.mapView.removeMarker(marker);
        }
    };
    FriendsMapComponent.prototype.error = function (err) {
        console.log('Error: ' + JSON.stringify(err));
    };
    FriendsMapComponent.prototype.onMarkerSelect = function (event) {
        console.log('Clicked on ' + event.marker.title);
    };
    FriendsMapComponent.prototype.onCameraChanged = function (event) {
        console.log('Camera changed: ' + JSON.stringify(event.camera));
    };
    return FriendsMapComponent;
}());
__decorate([
    core_1.ViewChild(angular_1.RadSideDrawerComponent),
    __metadata("design:type", angular_1.RadSideDrawerComponent)
], FriendsMapComponent.prototype, "drawerComponent", void 0);
FriendsMapComponent = __decorate([
    core_1.Component({
        selector: "friends-map",
        templateUrl: "widgets/friends-map/friends-map.html",
        styleUrls: ["widgets/friends-map/friends-map-common.css", "widgets/friends-map/friends-map.css"],
        providers: [friends_lives_service_1.FriendsLiveService, friends_service_1.FriendsService]
    }),
    __metadata("design:paramtypes", [friends_lives_service_1.FriendsLiveService,
        friends_service_1.FriendsService])
], FriendsMapComponent);
exports.FriendsMapComponent = FriendsMapComponent;
var AddLineArgs = (function () {
    function AddLineArgs() {
    }
    return AddLineArgs;
}());
exports.AddLineArgs = AddLineArgs;
var AddMarkerArgs = (function () {
    function AddMarkerArgs() {
    }
    return AddMarkerArgs;
}());
exports.AddMarkerArgs = AddMarkerArgs;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZnJpZW5kcy1tYXAuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiZnJpZW5kcy1tYXAuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxzQ0FBNEU7QUFDNUUsMEVBQXdFO0FBQ3hFLElBQUksV0FBVyxHQUFHLE9BQU8sQ0FBQywwQkFBMEIsQ0FBQyxDQUFDO0FBQ3RELDZFQUFtRjtBQUVuRixJQUFJLEtBQUssR0FBRyxPQUFPLENBQUMsa0JBQWtCLENBQUMsQ0FBQztBQUN4QywrQkFBOEI7QUFDOUIsc0VBQW9HO0FBQ3BHLG9GQUFnRjtBQUNoRix3RUFBc0U7QUFJdEUsT0FBTyxDQUFDLEdBQUcsQ0FBQyxxQkFBcUIsQ0FBQyxDQUFDO0FBQ25DLGtDQUFlLENBQUMsU0FBUyxFQUFFLGNBQU0sT0FBQSxzQ0FBTyxFQUFQLENBQU8sQ0FBQyxDQUFDO0FBUTFDLElBQWEsbUJBQW1CO0lBYTlCLDZCQUFvQixrQkFBc0MsRUFDaEQsY0FBOEI7UUFEeEMsaUJBSUM7UUFKbUIsdUJBQWtCLEdBQWxCLGtCQUFrQixDQUFvQjtRQUNoRCxtQkFBYyxHQUFkLGNBQWMsQ0FBZ0I7UUFieEMsUUFBUTtRQUNSLFlBQU8sR0FBWSxJQUFJLENBQUM7UUFDeEIsWUFBTyxHQUFXLElBQUksQ0FBQztRQUt2Qix1QkFBa0IsR0FBWSxLQUFLLENBQUM7UUEyRnBDLGNBQVMsR0FBRyxVQUFDLEtBQUs7WUFDaEIsT0FBTyxDQUFDLEdBQUcsQ0FBQyxZQUFZLENBQUMsQ0FBQztZQUUxQixLQUFJLENBQUMsT0FBTyxHQUFHLEtBQUksQ0FBQyxjQUFjLENBQUM7Z0JBQ2pDLEtBQUssRUFBRSxJQUFJLGFBQUssQ0FBQyxLQUFLLENBQUM7Z0JBQ3ZCLElBQUksRUFBRSxLQUFJLENBQUMsT0FBTztnQkFDbEIsUUFBUSxFQUFFLEtBQUssQ0FBQyxRQUFRO2dCQUN4QixRQUFRLEVBQUUsSUFBSTtnQkFDZCxLQUFLLEVBQUUsRUFBRTthQUNWLENB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QUNILENBQUM7SUFFRCxtQ0FBSyxHQUFMLFVBQU0sR0FBRztRQUNQLE9BQU8sQ0FBQyxHQUFHLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztJQUMvQyxDQUFDO0lBRUQsNENBQWMsR0FBZCxVQUFlLEtBQUs7UUFDbEIsT0FBTyxDQUFDLEdBQUcsQ0FBQyxhQUFhLEdBQUcsS0FBSyxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUNsRCxDQUFDO0lBRUQsNkNBQWUsR0FBZixVQUFnQixLQUFLO1FBQ25CLE9BQU8sQ0FBQyxHQUFHLENBQUMsa0JBQWtCLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQztJQUNqRSxDQUFDO0lBRUgsMEJBQUM7QUFBRCxDQUFDLEFBbE5ELElBa05DO0FBMUtvQztJQUFsQyxnQkFBUyxDQUFDLGdDQUFzQixDQUFDOzhCQUF5QixnQ0FBc0I7NERBQUM7QUF4Q3ZFLG1CQUFtQjtJQU4vQixnQkFBUyxDQUFDO1FBQ1QsUUFBUSxFQUFFLGFBQWE7UUFDdkIsV0FBVyxFQUFFLHNDQUFzQztRQUNuRCxTQUFTLEVBQUUsQ0FBQyw0Q0FBNEMsRUFBRSxxQ0FBcUMsQ0FBQztRQUNoRyxTQUFTLEVBQUUsQ0FBQywwQ0FBa0IsRUFBRSxnQ0FBYyxDQUFDO0tBQ2hELENBQUM7cUNBY3dDLDBDQUFrQjtRQUNoQyxnQ0FBYztHQWQ3QixtQkFBbUIsQ0FrTi9CO0FBbE5ZLGtEQUFtQjtBQW9OaEM7SUFBQTtJQU1BLENBQUM7SUFBRCxrQkFBQztBQUFELENBQUMsQUFORCxJQU1DO0FBTlksa0NBQVc7QUFReEI7SUFBQTtJQUdBLENBQUM7SUFBRCxvQkFBQztBQUFELENBQUMsQUFIRCxJQUdDO0FBSFksc0NBQWEiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIFZpZXdDaGlsZCwgQWZ0ZXJWaWV3SW5pdCwgT25Jbml0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyByZWdpc3RlckVsZW1lbnQgfSBmcm9tICduYXRpdmVzY3JpcHQtYW5ndWxhci9lbGVtZW50LXJlZ2lzdHJ5JztcbmxldCBnZW9sb2NhdGlvbiA9IHJlcXVpcmUoJ25hdGl2ZXNjcmlwdC1nZW9sb2NhdGlvbicpO1xuaW1wb3J0IHsgTWFwVmlldywgTWFya2VyLCBQb2x5bGluZSwgUG9zaXRpb24gfSBmcm9tICduYXRpdmVzY3JpcHQtZ29vZ2xlLW1hcHMtc2RrJztcbmltcG9ydCBzaWRlRHJhd2VyTW9kdWxlID0gcmVxdWlyZSgnbmF0aXZlc2NyaXB0LXRlbGVyaWstdWkvc2lkZWRyYXdlcicpO1xudmFyIHN0eWxlID0gcmVxdWlyZSgnLi9tYXAtc3R5bGUuanNvbicpO1xuaW1wb3J0IHsgQ29sb3IgfSBmcm9tICdjb2xvcic7XG5pbXBvcnQgeyBSYWRTaWRlRHJhd2VyQ29tcG9uZW50LCBTaWRlRHJhd2VyVHlwZSB9IGZyb20gJ25hdGl2ZXNjcmlwdC10ZWxlcmlrLXVpL3NpZGVkcmF3ZXIvYW5ndWxhcic7XG5pbXBvcnQgeyBGcmllbmRzTGl2ZVNlcnZpY2UgfSBmcm9tICcuLi8uLi9zaGFyZWQvZnJpZW5kcy9mcmllbmRzLWxpdmVzLnNlcnZpY2UnO1xuaW1wb3J0IHsgRnJpZW5kc1NlcnZpY2UgfSBmcm9tICcuLi8uLi9zaGFyZWQvZnJpZW5kcy9mcmllbmRzLnNlcnZpY2UnO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSB9IGZyb20gJy4uLy4uLy4uL3BsYXRmb3Jtcy9pb3MvYnVpbGQvZW11bGF0b3IvSGVsbG9Xb3JsZC5hcHAvYXBwL3Ruc19tb2R1bGVzL3J4anMvc3JjL09ic2VydmFibGUnO1xuaW1wb3J0IHsgRnJpZW5kUG9zaXRpb24gfSBmcm9tICcuLi8uLi9zaGFyZWQvZnJpZW5kcy9mcmllbmQnO1xuXG5jb25zb2xlLmxvZygnUmVnaXN0ZXJpbmcgTWFwVmlldycpO1xucmVnaXN0ZXJFbGVtZW50KCdNYXBWaWV3JywgKCkgPT4gTWFwVmlldyk7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogXCJmcmllbmRzLW1hcFwiLFxuICB0ZW1wbGF0ZVVybDogXCJ3aWRnZXRzL2ZyaWVuZHMtbWFwL2ZyaWVuZHMtbWFwLmh0bWxcIixcbiAgc3R5bGVVcmxzOiBbXCJ3aWRnZXRzL2ZyaWVuZHMtbWFwL2ZyaWVuZHMtbWFwLWNvbW1vbi5jc3NcIiwgXCJ3aWRnZXRzL2ZyaWVuZHMtbWFwL2ZyaWVuZHMtbWFwLmNzc1wiXSxcbiAgcHJvdmlkZXJzOiBbRnJpZW5kc0xpdmVTZXJ2aWNlLCBGcmllbmRzU2VydmljZV1cbn0pXG5leHBvcnQgY2xhc3MgRnJpZW5kc01hcENvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XG4gIC8vI01hcGEgXG4gIG1hcFZpZXc6IE1hcFZpZXcgPSBudWxsO1xuICB3YXRjaElkOiBudW1iZXIgPSBudWxsO1xuICBncHNMaW5lOiBQb2x5bGluZTtcbiAgdGFwTGluZTogUG9seWxpbmU7XG4gIHRhcE1hcmtlcjogYW55O1xuICBncHNNYXJrZXI6IGFueTtcbiAgY2VudGVyZWRPbkxvY2F0aW9uOiBib29sZWFuID0gZmFsc2U7XG4gIC8vI0FtaWdvc1xuICBwdWJsaWMgZnJpZW5kczogQXJyYXk8RnJpZW5kUG9zaXRpb24+O1xuXG5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSBmcmllbmRzTGl2ZVNlcnZpY2U6IEZyaWVuZHNMaXZlU2VydmljZSxcbiAgICBwcml2YXRlIGZyaWVuZHNTZXJ2aWNlOiBGcmllbmRzU2VydmljZSkge1xuXG5cbiAgfVxuXG5cbiAgbmdPbkluaXQoKSB7XG5cbiAgICBpZiAoIWdlb2xvY2F0aW9uLmlzRW5hYmxlZCgpKSB7XG4gICAgICBnZW9sb2NhdGlvbi5lbmFibGVMb2NhdGlvblJlcXVlc3QoKTtcbiAgICB9XG4gICAgdGhpcy5mcmllbmRzTGl2ZVNlcnZpY2UuZ2V0RnJpZW5kc0J5R3JvdXAoMSkuc3Vic2NyaWJlKHggPT4ge1xuICAgICAgZm9yICh2YXIgaXRlbSBvZiB4KSB7XG4gICAgICAgIHRoaXMuZnJpZW5kcy5wdXNoKGl0ZW0pO1xuICAgICAgfVxuICAgIH0pO1xuICAgIC8vIHRoaXMuZ3JvY2VyeUxpc3RTZXJ2aWNlLmxvYWQoKVxuICAgIC8vIC5zdWJzY3JpYmUobG9hZGVkR3JvY2VyaWVzID0+IHtcbiAgICAvLyAgIGxvYWRlZEdyb2Nlcmllcy5mb3JFYWNoKChncm9jZXJ5T2JqZWN0KSA9PiB7XG4gICAgLy8gICAgIHRoaXMuZ3JvY2VyeUxpc3QudW5zaGlmdChncm9jZXJ5T2JqZWN0KTtcbiAgICAvLyAgIH0pO1xuICAgIC8vICAgdGhpcy5pc0xvYWRpbmcgPSBmYWxzZTtcbiAgICAvLyAgIHRoaXMubGlzdExvYWRlZCA9IHRydWU7XG4gICAgLy8gfSk7XG4gIH1cblxuICBAVmlld0NoaWxkKFJhZFNpZGVEcmF3ZXJDb21wb25lbnQpIHB1YmxpYyBkcmF3ZXJDb21wb25lbnQ6IFJhZFNpZGVEcmF3ZXJDb21wb25lbnQ7XG4gIHByaXZhdGUgZHJhd2VyOiBTaWRlRHJhd2VyVHlwZTtcblxuXG4gIG9wZW5EcmF3ZXIoKSB7XG4gICAgdGhpcy5kcmF3ZXIuc2hvd0RyYXdlcigpO1xuICB9XG5cbiAgY2xvc2VEcmF3ZXIoKSB7XG4gICAgdGhpcy5kcmF3ZXIuY2xvc2VEcmF3ZXIoKTtcbiAgfVxuICBlbmFibGVMb2NhdGlvbigpIHtcbiAgICBpZiAoIWdlb2xvY2F0aW9uLmlzRW5hYmxlZCgpKSB7XG4gICAgICBjb25zb2xlLmxvZygnTG9jYXRpb24gbm90IGVuYWJsZWQsIHJlcXVlc3RpbmcuJyk7XG4gICAgICByZXR1cm4gZ2VvbG9jYXRpb24uZW5hYmxlTG9jYXRpb25SZXF1ZXN0KCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUodHJ1ZSk7XG4gICAgfVxuICB9XG5cbiAgZ2V0TG9jYXRpb24oKSB7XG4gICAgaWYgKGdlb2xvY2F0aW9uLmlzRW5hYmxlZCgpKSB7XG4gICAgICB2YXIgbG9jYXRpb24gPSBnZW9sb2NhdGlvbi5nZXRDdXJyZW50TG9jYXRpb24oe1xuICAgICAgICBkZXNpcmVkQWNjdXJhY3k6IDEwLFxuICAgICAgICB1cGRhdGVEaXN0YW5jZTogMTAsXG4gICAgICAgIG1pbmltdW1VcGRhdGVUaW1lOiAxMDAwLFxuICAgICAgICBtYXhpbXVtQWdlOiAxMDAwMFxuICAgICAgfSlcbiAgICAgIHJldHVybiBsb2NhdGlvbjtcbiAgICB9XG4gICAgcmV0dXJuIFByb21pc2UucmVqZWN0KCdHZW9sb2NhdGlvbiBub3QgZW5hYmxlZC4nKTtcbiAgfVxuXG4gIC8vTWFwIGV2ZW50c1xuICBvbk1hcFJlYWR5KGV2ZW50KSB7XG4gICAgY29uc29sZS5sb2coJ01hcCBSZWFkeScpO1xuICAgIGlmICh0aGlzLm1hcFZpZXcgfHwgIWV2ZW50Lm9iamVjdCkgcmV0dXJuO1xuXG4gICAgdGhpcy5tYXBWaWV3ID0gZXZlbnQub2JqZWN0O1xuXG4gICAgdGhpcy5tYXBWaWV3LnNldFN0eWxlKHN0eWxlKTtcblxuICAgIC8vIHRoaXMubWFwVmlldy5tYXJrZXJTZWxlY3QgPSB0aGlzLm9uTWFya2VyU2VsZWN0O1xuICAgIC8vIHRoaXMubWFwVmlldy5jYW1lcmFDaGFuZ2VkID0gdGhpcy5vbkNhbWVyYUNoYW5nZWQ7XG5cbiAgICB0aGlzLmVuYWJsZUxvY2F0aW9uKClcbiAgICAgIC50aGVuKCgpID0+IHtcbiAgICAgICAgdmFyIGxvY2F0aW9uID0gdGhpcy5nZXRMb2NhdGlvbigpO1xuICAgICAgfSlcbiAgICAgIC50aGVuKCgpID0+IHtcbiAgICAgICAgdGhpcy53YXRjaElkID0gZ2VvbG9jYXRpb24ud2F0Y2hMb2NhdGlvbih0aGlzLmxvY2F0aW9uUmVjZWl2ZWQsIHRoaXMuZXJyb3IsIHtcbiAgICAgICAgICBkZXNpcmVkQWNjdXJhY3k6IDEwLFxuICAgICAgICAgIHVwZGF0ZURpc3RhbmNlOiAxMCxcbiAgICAgICAgICBtaW5pbXVtVXBkYXRlVGltZTogMTAwMDAsXG4gICAgICAgICAgbWF4aW11bUFnZTogNjAwMDBcbiAgICAgICAgfSk7XG4gICAgICB9LCB0aGlzLmVycm9yKTtcbiAgfTtcblxuICBtYXBUYXBwZWQgPSAoZXZlbnQpID0+IHtcbiAgICBjb25zb2xlLmxvZygnTWFwIFRhcHBlZCcpO1xuXG4gICAgdGhpcy50YXBMaW5lID0gdGhpcy5hZGRQb2ludFRvTGluZSh7XG4gICAgICBjb2xvcjogbmV3IENvbG9yKCdSZWQnKSxcbiAgICAgIGxpbmU6IHRoaXMudGFwTGluZSxcbiAgICAgIGxvY2F0aW9uOiBldmVudC5wb3NpdGlvbixcbiAgICAgIGdlb2Rlc2ljOiB0cnVlLFxuICAgICAgd2lkdGg6IDEwXG4gICAgfSk7XG5cbiAgICB0aGlzLnJlbW92ZU1hcmtlcih0aGlzLnRhcE1hcmtlcik7XG4gICAgdGhpcy50YXBNYXJrZXIgPSB0aGlzLmFkZE1hcmtlcih7XG4gICAgICBsb2NhdGlvbjogZXZlbnQucG9zaXRpb24sXG4gICAgICB0aXRsZTogJ1RhcCBMb2NhdGlvbidcbiAgICB9KTtcbiAgfTtcblxuICBsb2NhdGlvblJlY2VpdmVkID0gKHBvc2l0aW9uOiBQb3NpdGlvbikgPT4ge1xuICAgIGNvbnNvbGUubG9nKCdHUFMgVXBkYXRlIFJlY2VpdmVkJyk7XG5cbiAgICBpZiAodGhpcy5tYXBWaWV3ICYmIHBvc2l0aW9uKSB7XG4gICAgICB0aGlzLm1hcFZpZXcubGF0aXR1ZGUgPSBwb3NpdGlvbi5sYXRpdHVkZTtcbiAgICAgIHRoaXMubWFwVmlldy5sb25naXR1ZGUgPSBwb3NpdGlvbi5sb25naXR1ZGU7XG4gICAgICB0aGlzLm1hcFZpZXcuem9vbSA9IDE2O1xuICAgICAgdGhpcy5jZW50ZXJlZE9uTG9jYXRpb24gPSB0cnVlO1xuICAgIH1cblxuICAgIC8vIHRoaXMuZ3BzTGluZSA9IHRoaXMuYWRkUG9pbnRUb0xpbmUoe1xuICAgIC8vICAgY29sb3I6IG5ldyBDb2xvcignR3JlZW4nKSxcbiAgICAvLyAgIGxpbmU6IHRoaXMuZ3BzTGluZSxcbiAgICAvLyAgIGxvY2F0aW9uOiBwb3NpdGlvbixcbiAgICAvLyAgIGdlb2Rlc2ljOiB0cnVlLFxuICAgIC8vICAgd2lkdGg6IDEwXG4gICAgLy8gfSk7XG5cbiAgICB0aGlzLnJlbW92ZU1hcmtlcih0aGlzLmdwc01hcmtlcik7XG4gICAgdGhpcy5ncHNNYXJrZXIgPSB0aGlzLmFkZE1hcmtlcih7XG4gICAgICBsb2NhdGlvbjogcG9zaXRpb24sXG4gICAgICB0aXRsZTogJ0dQUyBMb2NhdGlvbidcbiAgICB9KTtcbiAgfTtcblxuICBhZGRQb2ludFRvTGluZShhcmdzOiBBZGRMaW5lQXJncykge1xuICAgIGlmICghdGhpcy5tYXBWaWV3IHx8ICFhcmdzIHx8ICFhcmdzLmxvY2F0aW9uKSByZXR1cm47XG5cbiAgICBsZXQgbGluZSA9IGFyZ3MubGluZTtcblxuICAgIGlmICghbGluZSkge1xuICAgICAgbGluZSA9IG5ldyBQb2x5bGluZSgpO1xuICAgICAgbGluZS52aXNpYmxlID0gdHJ1ZTtcbiAgICAgIGxpbmUud2lkdGggPSBhcmdzLndpZHRoIHx8IDEwO1xuICAgICAgbGluZS5jb2xvciA9IGFyZ3MuY29sb3IgfHwgbmV3IENvbG9yKCdSZWQnKTtcbiAgICAgIGxpbmUuZ2VvZGVzaWMgPSBhcmdzLmdlb2Rlc2ljICE9IHVuZGVmaW5lZCA/IGFyZ3MuZ2VvZGVzaWMgOiB0cnVlO1xuICAgICAgdGhpcy5tYXBWaWV3LmFkZFBvbHlsaW5lKGxpbmUpO1xuICAgIH1cbiAgICBsaW5lLmFkZFBvaW50KFBvc2l0aW9uLnBvc2l0aW9uRnJvbUxhdExuZyhhcmdzLmxvY2F0aW9uLmxhdGl0dWRlLCBhcmdzLmxvY2F0aW9uLmxvbmdpdHVkZSkpO1xuXG4gICAgcmV0dXJuIGxpbmU7XG4gIH1cblxuICBhZGRNYXJrZXIoYXJnczogQWRkTWFya2VyQXJncykge1xuICAgIGlmICghdGhpcy5tYXBWaWV3IHx8ICFhcmdzIHx8ICFhcmdzLmxvY2F0aW9uKSByZXR1cm47XG5cbiAgICBsZXQgbWFya2VyID0gbmV3IE1hcmtlcigpO1xuICAgIG1hcmtlci5wb3NpdGlvbiA9IFBvc2l0aW9uLnBvc2l0aW9uRnJvbUxhdExuZyhhcmdzLmxvY2F0aW9uLmxhdGl0dWRlLCBhcmdzLmxvY2F0aW9uLmxvbmdpdHVkZSk7XG4gICAgbWFya2VyLnRpdGxlID0gYXJncy50aXRsZTtcbiAgICBtYXJrZXIuc25pcHBldCA9IGFyZ3MudGl0bGU7XG4gICAgdGhpcy5tYXBWaWV3LmFkZE1hcmtlcihtYXJrZXIpO1xuXG4gICAgcmV0dXJuIG1hcmtlcjtcbiAgfTtcblxuICBjbGVhckdwc0xpbmUoKSB7XG4gICAgdGhpcy5yZW1vdmVMaW5lKHRoaXMuZ3BzTGluZSk7XG4gICAgdGhpcy5ncHNMaW5lID0gbnVsbDtcbiAgICB0aGlzLmNsb3NlRHJhd2VyKCk7XG4gIH07XG5cbiAgY2xlYXJUYXBMaW5lKCkge1xuICAgIHRoaXMucmVtb3ZlTGluZSh0aGlzLnRhcExpbmUpO1xuICAgIHRoaXMudGFwTGluZSA9IG51bGw7XG4gICAgdGhpcy5yZW1vdmVNYXJrZXIodGhpcy50YXBNYXJrZXIpO1xuICAgIHRoaXMudGFwTWFya2VyID0gbnVsbDtcbiAgICB0aGlzLmNsb3NlRHJhd2VyKCk7XG4gIH1cblxuICByZW1vdmVMaW5lKGxpbmU6IFBvbHlsaW5lKSB7XG4gICAgaWYgKGxpbmUpIHtcbiAgICAgIGxpbmUucmVtb3ZlQWxsUG9pbnRzKCk7XG4gICAgfVxuICB9XG5cbiAgcmVtb3ZlTWFya2VyKG1hcmtlcjogTWFya2VyKSB7XG4gICAgaWYgKHRoaXMubWFwVmlldyAmJiBtYXJrZXIpIHtcbiAgICAgIHRoaXMubWFwVmlldy5yZW1vdmVNYXJrZXIobWFya2VyKTtcbiAgICB9XG4gIH1cblxuICBlcnJvcihlcnIpIHtcbiAgICBjb25zb2xlLmxvZygnRXJyb3I6ICcgKyBKU09OLnN0cmluZ2lmeShlcnIpKTtcbiAgfVxuXG4gIG9uTWFya2VyU2VsZWN0KGV2ZW50KSB7XG4gICAgY29uc29sZS5sb2coJ0NsaWNrZWQgb24gJyArIGV2ZW50Lm1hcmtlci50aXRsZSk7XG4gIH1cblxuICBvbkNhbWVyYUNoYW5nZWQoZXZlbnQpIHtcbiAgICBjb25zb2xlLmxvZygnQ2FtZXJhIGNoYW5nZWQ6ICcgKyBKU09OLnN0cmluZ2lmeShldmVudC5jYW1lcmEpKTtcbiAgfVxuXG59XG5cbmV4cG9ydCBjbGFzcyBBZGRMaW5lQXJncyB7XG4gIHB1YmxpYyBjb2xvcjogQ29sb3I7XG4gIHB1YmxpYyBsaW5lOiBQb2x5bGluZTtcbiAgcHVibGljIGxvY2F0aW9uOiBQb3NpdGlvbjtcbiAgcHVibGljIGdlb2Rlc2ljOiBib29sZWFuO1xuICBwdWJsaWMgd2lkdGg6IG51bWJlcjtcbn1cblxuZXhwb3J0IGNsYXNzIEFkZE1hcmtlckFyZ3Mge1xuICBwdWJsaWMgbG9jYXRpb246IFBvc2l0aW9uO1xuICBwdWJsaWMgdGl0bGU6IHN0cmluZztcbn0iXX0=