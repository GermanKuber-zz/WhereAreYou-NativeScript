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
    function FriendsMapComponent(friendsLiveService) {
        var _this = this;
        this.friendsLiveService = friendsLiveService;
        //#Mapa 
        this.mapView = null;
        this.watchId = null;
        this.centeredOnLocation = false;
        this.mapTapped = function (event) {
            // console.log('Map Tapped');
            // this.tapLine = this.addPointToLine({
            //   color: new Color('Red'),
            //   line: this.tapLine,
            //   location: event.position,
            //   geodesic: true,
            //   width: 10
            // });
            // this.removeMarker(this.tapMarker);
            // this.tapMarker = this.addMarker({
            //   location: event.position,
            //   title: 'Tap Location'
            // });
        };
        this.locationReceived = function (position) {
            console.log('GPS Update Received');
            if (_this.mapView && position) {
                _this.mapView.latitude = position.latitude;
                _this.mapView.longitude = position.longitude;
                _this.mapView.zoom = 6;
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
        this.friends = new Array();
    }
    FriendsMapComponent.prototype.ngOnInit = function () {
        if (!geolocation.isEnabled()) {
            geolocation.enableLocationRequest();
        }
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
        this.getFriends();
        this.subscribeFriendLocationUpdate();
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
    FriendsMapComponent.prototype.updateFriendLocation = function (friend) {
        var a = friend;
    };
    FriendsMapComponent.prototype.subscribeFriendLocationUpdate = function () {
        var _this = this;
        //Me suscribo al metodo de actualizacion para obtener actualizacion de ubicacion de mis amigos
        this.friendsLiveService.updateFriendLocation(function (f) { return _this.updateFriendLocation(f); });
    };
    FriendsMapComponent.prototype.getFriends = function () {
        var _this = this;
        this.friendsLiveService.getFriendsByGroup(1).subscribe(function (x) {
            for (var _i = 0, x_1 = x; _i < x_1.length; _i++) {
                var item = x_1[_i];
                _this.friends.push(item);
                _this.removeMarker(_this.tapMarker);
                var mark = new AddMarkerArgs();
                mark.title = "Primeroo";
                mark.location = new nativescript_google_maps_sdk_1.Position();
                mark.location.latitude = item.latitude;
                mark.location.longitude = item.longitude;
                var mapMark = _this.addMarker(mark);
                mapMark.snippet = "Primero";
                _this.mapView.addMarker(mapMark);
            }
        });
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
    __metadata("design:paramtypes", [friends_lives_service_1.FriendsLiveService])
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZnJpZW5kcy1tYXAuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiZnJpZW5kcy1tYXAuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxzQ0FBNEU7QUFDNUUsMEVBQXdFO0FBQ3hFLElBQUksV0FBVyxHQUFHLE9BQU8sQ0FBQywwQkFBMEIsQ0FBQyxDQUFDO0FBQ3RELDZFQUFtRjtBQUVuRixJQUFJLEtBQUssR0FBRyxPQUFPLENBQUMsa0JBQWtCLENBQUMsQ0FBQztBQUN4QywrQkFBOEI7QUFDOUIsc0VBQW9HO0FBQ3BHLG9GQUFnRjtBQUNoRix3RUFBc0U7QUFJdEUsT0FBTyxDQUFDLEdBQUcsQ0FBQyxxQkFBcUIsQ0FBQyxDQUFDO0FBQ25DLGtDQUFlLENBQUMsU0FBUyxFQUFFLGNBQU0sT0FBQSxzQ0FBTyxFQUFQLENBQU8sQ0FBQyxDQUFDO0FBUTFDLElBQWEsbUJBQW1CO0lBYTlCLDZCQUFvQixrQkFBc0M7UUFBMUQsaUJBR0M7UUFIbUIsdUJBQWtCLEdBQWxCLGtCQUFrQixDQUFvQjtRQVoxRCxRQUFRO1FBQ1IsWUFBTyxHQUFZLElBQUksQ0FBQztRQUN4QixZQUFPLEdBQVcsSUFBSSxDQUFDO1FBS3ZCLHVCQUFrQixHQUFZLEtBQUssQ0FBQztRQXVGcEMsY0FBUyxHQUFHLFVBQUMsS0FBSztZQUNoQiw2QkFBNkI7WUFFN0IsdUNBQXVDO1lBQ3ZDLDZCQUE2QjtZQUM3Qix3QkFBd0I7WUFDeEIsOEJBQThCO1lBQzlCLG9CQUFvQjtZQUNwQixjQUFjO1lBQ2QsTUFBTTtZQUVOLHFDQUFxQztZQUNyQyxvQ0FBb0M7WUFDcEMsOEJBQThCO1lBQzlCLDBCQUEwQjtZQUMxQixNQUFNO1FBQ1IsQ0FBQyxDQUFDO1FBRUYscUJBQWdCLEdBQUcsVUFBQyxRQUFrQjtZQUNwQyxPQUFPLENBQUMsR0FBRyxDQUFDLHFCQUFxQixDQUFDLENBQUM7WUFFbkMsRUFBRSxDQUFDLENBQUMsS0FBSSxDQUFDLE9BQU8s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OEJBQXlCLGdDQUFzQjs0REFBQztBQW5DdkUsbUJBQW1CO0lBTi9CLGdCQUFTLENBQUM7UUFDVCxRQUFRLEVBQUUsYUFBYTtRQUN2QixXQUFXLEVBQUUsc0NBQXNDO1FBQ25ELFNBQVMsRUFBRSxDQUFDLDRDQUE0QyxFQUFFLHFDQUFxQyxDQUFDO1FBQ2hHLFNBQVMsRUFBRSxDQUFDLDBDQUFrQixFQUFFLGdDQUFjLENBQUM7S0FDaEQsQ0FBQztxQ0Fjd0MsMENBQWtCO0dBYi9DLG1CQUFtQixDQXFPL0I7QUFyT1ksa0RBQW1CO0FBdU9oQztJQUFBO0lBTUEsQ0FBQztJQUFELGtCQUFDO0FBQUQsQ0FBQyxBQU5ELElBTUM7QUFOWSxrQ0FBVztBQVF4QjtJQUFBO0lBR0EsQ0FBQztJQUFELG9CQUFDO0FBQUQsQ0FBQyxBQUhELElBR0M7QUFIWSxzQ0FBYSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgVmlld0NoaWxkLCBBZnRlclZpZXdJbml0LCBPbkluaXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IHJlZ2lzdGVyRWxlbWVudCB9IGZyb20gJ25hdGl2ZXNjcmlwdC1hbmd1bGFyL2VsZW1lbnQtcmVnaXN0cnknO1xubGV0IGdlb2xvY2F0aW9uID0gcmVxdWlyZSgnbmF0aXZlc2NyaXB0LWdlb2xvY2F0aW9uJyk7XG5pbXBvcnQgeyBNYXBWaWV3LCBNYXJrZXIsIFBvbHlsaW5lLCBQb3NpdGlvbiB9IGZyb20gJ25hdGl2ZXNjcmlwdC1nb29nbGUtbWFwcy1zZGsnO1xuaW1wb3J0IHNpZGVEcmF3ZXJNb2R1bGUgPSByZXF1aXJlKCduYXRpdmVzY3JpcHQtdGVsZXJpay11aS9zaWRlZHJhd2VyJyk7XG52YXIgc3R5bGUgPSByZXF1aXJlKCcuL21hcC1zdHlsZS5qc29uJyk7XG5pbXBvcnQgeyBDb2xvciB9IGZyb20gJ2NvbG9yJztcbmltcG9ydCB7IFJhZFNpZGVEcmF3ZXJDb21wb25lbnQsIFNpZGVEcmF3ZXJUeXBlIH0gZnJvbSAnbmF0aXZlc2NyaXB0LXRlbGVyaWstdWkvc2lkZWRyYXdlci9hbmd1bGFyJztcbmltcG9ydCB7IEZyaWVuZHNMaXZlU2VydmljZSB9IGZyb20gJy4uLy4uL3NoYXJlZC9mcmllbmRzL2ZyaWVuZHMtbGl2ZXMuc2VydmljZSc7XG5pbXBvcnQgeyBGcmllbmRzU2VydmljZSB9IGZyb20gJy4uLy4uL3NoYXJlZC9mcmllbmRzL2ZyaWVuZHMuc2VydmljZSc7XG5pbXBvcnQgeyBPYnNlcnZhYmxlIH0gZnJvbSAnLi4vLi4vLi4vcGxhdGZvcm1zL2lvcy9idWlsZC9lbXVsYXRvci9IZWxsb1dvcmxkLmFwcC9hcHAvdG5zX21vZHVsZXMvcnhqcy9zcmMvT2JzZXJ2YWJsZSc7XG5pbXBvcnQgeyBGcmllbmRQb3NpdGlvbiB9IGZyb20gJy4uLy4uL3NoYXJlZC9mcmllbmRzL2ZyaWVuZCc7XG5cbmNvbnNvbGUubG9nKCdSZWdpc3RlcmluZyBNYXBWaWV3Jyk7XG5yZWdpc3RlckVsZW1lbnQoJ01hcFZpZXcnLCAoKSA9PiBNYXBWaWV3KTtcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiBcImZyaWVuZHMtbWFwXCIsXG4gIHRlbXBsYXRlVXJsOiBcIndpZGdldHMvZnJpZW5kcy1tYXAvZnJpZW5kcy1tYXAuaHRtbFwiLFxuICBzdHlsZVVybHM6IFtcIndpZGdldHMvZnJpZW5kcy1tYXAvZnJpZW5kcy1tYXAtY29tbW9uLmNzc1wiLCBcIndpZGdldHMvZnJpZW5kcy1tYXAvZnJpZW5kcy1tYXAuY3NzXCJdLFxuICBwcm92aWRlcnM6IFtGcmllbmRzTGl2ZVNlcnZpY2UsIEZyaWVuZHNTZXJ2aWNlXVxufSlcbmV4cG9ydCBjbGFzcyBGcmllbmRzTWFwQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcbiAgLy8jTWFwYSBcbiAgbWFwVmlldzogTWFwVmlldyA9IG51bGw7XG4gIHdhdGNoSWQ6IG51bWJlciA9IG51bGw7XG4gIGdwc0xpbmU6IFBvbHlsaW5lO1xuICB0YXBMaW5lOiBQb2x5bGluZTtcbiAgdGFwTWFya2VyOiBhbnk7XG4gIGdwc01hcmtlcjogYW55O1xuICBjZW50ZXJlZE9uTG9jYXRpb246IGJvb2xlYW4gPSBmYWxzZTtcbiAgLy8jQW1pZ29zXG4gIHB1YmxpYyBmcmllbmRzOiBBcnJheTxGcmllbmRQb3NpdGlvbj47XG5cblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIGZyaWVuZHNMaXZlU2VydmljZTogRnJpZW5kc0xpdmVTZXJ2aWNlKSB7XG5cbiAgICB0aGlzLmZyaWVuZHMgPSBuZXcgQXJyYXk8RnJpZW5kUG9zaXRpb24+KCk7XG4gIH1cblxuXG4gIG5nT25Jbml0KCkge1xuXG4gICAgaWYgKCFnZW9sb2NhdGlvbi5pc0VuYWJsZWQoKSkge1xuICAgICAgZ2VvbG9jYXRpb24uZW5hYmxlTG9jYXRpb25SZXF1ZXN0KCk7XG4gICAgfVxuXG4gICAgLy8gdGhpcy5ncm9jZXJ5TGlzdFNlcnZpY2UubG9hZCgpXG4gICAgLy8gLnN1YnNjcmliZShsb2FkZWRHcm9jZXJpZXMgPT4ge1xuICAgIC8vICAgbG9hZGVkR3JvY2VyaWVzLmZvckVhY2goKGdyb2NlcnlPYmplY3QpID0+IHtcbiAgICAvLyAgICAgdGhpcy5ncm9jZXJ5TGlzdC51bnNoaWZ0KGdyb2NlcnlPYmplY3QpO1xuICAgIC8vICAgfSk7XG4gICAgLy8gICB0aGlzLmlzTG9hZGluZyA9IGZhbHNlO1xuICAgIC8vICAgdGhpcy5saXN0TG9hZGVkID0gdHJ1ZTtcbiAgICAvLyB9KTtcbiAgfVxuXG4gIEBWaWV3Q2hpbGQoUmFkU2lkZURyYXdlckNvbXBvbmVudCkgcHVibGljIGRyYXdlckNvbXBvbmVudDogUmFkU2lkZURyYXdlckNvbXBvbmVudDtcbiAgcHJpdmF0ZSBkcmF3ZXI6IFNpZGVEcmF3ZXJUeXBlO1xuXG5cbiAgb3BlbkRyYXdlcigpIHtcbiAgICB0aGlzLmRyYXdlci5zaG93RHJhd2VyKCk7XG4gIH1cblxuICBjbG9zZURyYXdlcigpIHtcbiAgICB0aGlzLmRyYXdlci5jbG9zZURyYXdlcigpO1xuICB9XG4gIGVuYWJsZUxvY2F0aW9uKCkge1xuICAgIGlmICghZ2VvbG9jYXRpb24uaXNFbmFibGVkKCkpIHtcbiAgICAgIGNvbnNvbGUubG9nKCdMb2NhdGlvbiBub3QgZW5hYmxlZCwgcmVxdWVzdGluZy4nKTtcbiAgICAgIHJldHVybiBnZW9sb2NhdGlvbi5lbmFibGVMb2NhdGlvblJlcXVlc3QoKTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZSh0cnVlKTtcbiAgICB9XG4gIH1cblxuICBnZXRMb2NhdGlvbigpIHtcbiAgICBpZiAoZ2VvbG9jYXRpb24uaXNFbmFibGVkKCkpIHtcbiAgICAgIHZhciBsb2NhdGlvbiA9IGdlb2xvY2F0aW9uLmdldEN1cnJlbnRMb2NhdGlvbih7XG4gICAgICAgIGRlc2lyZWRBY2N1cmFjeTogMTAsXG4gICAgICAgIHVwZGF0ZURpc3RhbmNlOiAxMCxcbiAgICAgICAgbWluaW11bVVwZGF0ZVRpbWU6IDEwMDAsXG4gICAgICAgIG1heGltdW1BZ2U6IDEwMDAwXG4gICAgICB9KVxuICAgICAgcmV0dXJuIGxvY2F0aW9uO1xuICAgIH1cbiAgICByZXR1cm4gUHJvbWlzZS5yZWplY3QoJ0dlb2xvY2F0aW9uIG5vdCBlbmFibGVkLicpO1xuICB9XG5cbiAgLy9NYXAgZXZlbnRzXG4gIG9uTWFwUmVhZHkoZXZlbnQpIHtcbiAgICBpZiAodGhpcy5tYXBWaWV3IHx8ICFldmVudC5vYmplY3QpIHJldHVybjtcblxuICAgIHRoaXMubWFwVmlldyA9IGV2ZW50Lm9iamVjdDtcblxuICAgIHRoaXMubWFwVmlldy5zZXRTdHlsZShzdHlsZSk7XG5cbiAgICAvLyB0aGlzLm1hcFZpZXcubWFya2VyU2VsZWN0ID0gdGhpcy5vbk1hcmtlclNlbGVjdDtcbiAgICAvLyB0aGlzLm1hcFZpZXcuY2FtZXJhQ2hhbmdlZCA9IHRoaXMub25DYW1lcmFDaGFuZ2VkO1xuXG4gICAgdGhpcy5lbmFibGVMb2NhdGlvbigpXG4gICAgICAudGhlbigoKSA9PiB7XG4gICAgICAgIHZhciBsb2NhdGlvbiA9IHRoaXMuZ2V0TG9jYXRpb24oKTtcbiAgICAgIH0pXG4gICAgICAudGhlbigoKSA9PiB7XG4gICAgICAgIHRoaXMud2F0Y2hJZCA9IGdlb2xvY2F0aW9uLndhdGNoTG9jYXRpb24odGhpcy5sb2NhdGlvblJlY2VpdmVkLCB0aGlzLmVycm9yLCB7XG4gICAgICAgICAgZGVzaXJlZEFjY3VyYWN5OiAxMCxcbiAgICAgICAgICB1cGRhdGVEaXN0YW5jZTogMTAsXG4gICAgICAgICAgbWluaW11bVVwZGF0ZVRpbWU6IDEwMDAwLFxuICAgICAgICAgIG1heGltdW1BZ2U6IDYwMDAwXG4gICAgICAgIH0pO1xuICAgICAgfSwgdGhpcy5lcnJvcik7XG4gICAgdGhpcy5nZXRGcmllbmRzKCk7XG4gICAgdGhpcy5zdWJzY3JpYmVGcmllbmRMb2NhdGlvblVwZGF0ZSgpO1xuICB9O1xuXG4gIG1hcFRhcHBlZCA9IChldmVudCkgPT4ge1xuICAgIC8vIGNvbnNvbGUubG9nKCdNYXAgVGFwcGVkJyk7XG5cbiAgICAvLyB0aGlzLnRhcExpbmUgPSB0aGlzLmFkZFBvaW50VG9MaW5lKHtcbiAgICAvLyAgIGNvbG9yOiBuZXcgQ29sb3IoJ1JlZCcpLFxuICAgIC8vICAgbGluZTogdGhpcy50YXBMaW5lLFxuICAgIC8vICAgbG9jYXRpb246IGV2ZW50LnBvc2l0aW9uLFxuICAgIC8vICAgZ2VvZGVzaWM6IHRydWUsXG4gICAgLy8gICB3aWR0aDogMTBcbiAgICAvLyB9KTtcblxuICAgIC8vIHRoaXMucmVtb3ZlTWFya2VyKHRoaXMudGFwTWFya2VyKTtcbiAgICAvLyB0aGlzLnRhcE1hcmtlciA9IHRoaXMuYWRkTWFya2VyKHtcbiAgICAvLyAgIGxvY2F0aW9uOiBldmVudC5wb3NpdGlvbixcbiAgICAvLyAgIHRpdGxlOiAnVGFwIExvY2F0aW9uJ1xuICAgIC8vIH0pO1xuICB9O1xuXG4gIGxvY2F0aW9uUmVjZWl2ZWQgPSAocG9zaXRpb246IFBvc2l0aW9uKSA9PiB7XG4gICAgY29uc29sZS5sb2coJ0dQUyBVcGRhdGUgUmVjZWl2ZWQnKTtcblxuICAgIGlmICh0aGlzLm1hcFZpZXcgJiYgcG9zaXRpb24pIHtcbiAgICAgIHRoaXMubWFwVmlldy5sYXRpdHVkZSA9IHBvc2l0aW9uLmxhdGl0dWRlO1xuICAgICAgdGhpcy5tYXBWaWV3LmxvbmdpdHVkZSA9IHBvc2l0aW9uLmxvbmdpdHVkZTtcbiAgICAgIHRoaXMubWFwVmlldy56b29tID0gNjtcbiAgICAgIHRoaXMuY2VudGVyZWRPbkxvY2F0aW9uID0gdHJ1ZTtcbiAgICB9XG5cbiAgICAvLyB0aGlzLmdwc0xpbmUgPSB0aGlzLmFkZFBvaW50VG9MaW5lKHtcbiAgICAvLyAgIGNvbG9yOiBuZXcgQ29sb3IoJ0dyZWVuJyksXG4gICAgLy8gICBsaW5lOiB0aGlzLmdwc0xpbmUsXG4gICAgLy8gICBsb2NhdGlvbjogcG9zaXRpb24sXG4gICAgLy8gICBnZW9kZXNpYzogdHJ1ZSxcbiAgICAvLyAgIHdpZHRoOiAxMFxuICAgIC8vIH0pO1xuXG4gICAgdGhpcy5yZW1vdmVNYXJrZXIodGhpcy5ncHNNYXJrZXIpO1xuICAgIHRoaXMuZ3BzTWFya2VyID0gdGhpcy5hZGRNYXJrZXIoe1xuICAgICAgbG9jYXRpb246IHBvc2l0aW9uLFxuICAgICAgdGl0bGU6ICdHUFMgTG9jYXRpb24nXG4gICAgfSk7XG4gIH07XG5cbiAgYWRkUG9pbnRUb0xpbmUoYXJnczogQWRkTGluZUFyZ3MpIHtcbiAgICBpZiAoIXRoaXMubWFwVmlldyB8fCAhYXJncyB8fCAhYXJncy5sb2NhdGlvbikgcmV0dXJuO1xuXG4gICAgbGV0IGxpbmUgPSBhcmdzLmxpbmU7XG5cbiAgICBpZiAoIWxpbmUpIHtcbiAgICAgIGxpbmUgPSBuZXcgUG9seWxpbmUoKTtcbiAgICAgIGxpbmUudmlzaWJsZSA9IHRydWU7XG4gICAgICBsaW5lLndpZHRoID0gYXJncy53aWR0aCB8fCAxMDtcbiAgICAgIGxpbmUuY29sb3IgPSBhcmdzLmNvbG9yIHx8IG5ldyBDb2xvcignUmVkJyk7XG4gICAgICBsaW5lLmdlb2Rlc2ljID0gYXJncy5nZW9kZXNpYyAhPSB1bmRlZmluZWQgPyBhcmdzLmdlb2Rlc2ljIDogdHJ1ZTtcbiAgICAgIHRoaXMubWFwVmlldy5hZGRQb2x5bGluZShsaW5lKTtcbiAgICB9XG4gICAgbGluZS5hZGRQb2ludChQb3NpdGlvbi5wb3NpdGlvbkZyb21MYXRMbmcoYXJncy5sb2NhdGlvbi5sYXRpdHVkZSwgYXJncy5sb2NhdGlvbi5sb25naXR1ZGUpKTtcblxuICAgIHJldHVybiBsaW5lO1xuICB9XG4gIGFkZE1hcmtlcihhcmdzOiBBZGRNYXJrZXJBcmdzKTogTWFya2VyIHtcbiAgICBpZiAoIXRoaXMubWFwVmlldyB8fCAhYXJncyB8fCAhYXJncy5sb2NhdGlvbikgcmV0dXJuO1xuXG4gICAgbGV0IG1hcmtlciA9IG5ldyBNYXJrZXIoKTtcbiAgICBtYXJrZXIucG9zaXRpb24gPSBQb3NpdGlvbi5wb3NpdGlvbkZyb21MYXRMbmcoYXJncy5sb2NhdGlvbi5sYXRpdHVkZSwgYXJncy5sb2NhdGlvbi5sb25naXR1ZGUpO1xuICAgIG1hcmtlci50aXRsZSA9IGFyZ3MudGl0bGU7XG4gICAgbWFya2VyLnNuaXBwZXQgPSBhcmdzLnRpdGxlO1xuICAgIHRoaXMubWFwVmlldy5hZGRNYXJrZXIobWFya2VyKTtcblxuICAgIHJldHVybiBtYXJrZXI7XG4gIH07XG5cbiAgY2xlYXJHcHNMaW5lKCkge1xuICAgIHRoaXMucmVtb3ZlTGluZSh0aGlzLmdwc0xpbmUpO1xuICAgIHRoaXMuZ3BzTGluZSA9IG51bGw7XG4gICAgdGhpcy5jbG9zZURyYXdlcigpO1xuICB9O1xuXG4gIGNsZWFyVGFwTGluZSgpIHtcbiAgICB0aGlzLnJlbW92ZUxpbmUodGhpcy50YXBMaW5lKTtcbiAgICB0aGlzLnRhcExpbmUgPSBudWxsO1xuICAgIHRoaXMucmVtb3ZlTWFya2VyKHRoaXMudGFwTWFya2VyKTtcbiAgICB0aGlzLnRhcE1hcmtlciA9IG51bGw7XG4gICAgdGhpcy5jbG9zZURyYXdlcigpO1xuICB9XG5cbiAgcmVtb3ZlTGluZShsaW5lOiBQb2x5bGluZSkge1xuICAgIGlmIChsaW5lKSB7XG4gICAgICBsaW5lLnJlbW92ZUFsbFBvaW50cygpO1xuICAgIH1cbiAgfVxuXG4gIHJlbW92ZU1hcmtlcihtYXJrZXI6IE1hcmtlcikge1xuICAgIGlmICh0aGlzLm1hcFZpZXcgJiYgbWFya2VyKSB7XG4gICAgICB0aGlzLm1hcFZpZXcucmVtb3ZlTWFya2VyKG1hcmtlcik7XG4gICAgfVxuICB9XG5cbiAgZXJyb3IoZXJyKSB7XG4gICAgY29uc29sZS5sb2coJ0Vycm9yOiAnICsgSlNPTi5zdHJpbmdpZnkoZXJyKSk7XG4gIH1cblxuICBvbk1hcmtlclNlbGVjdChldmVudCkge1xuICAgIGNvbnNvbGUubG9nKCdDbGlja2VkIG9uICcgKyBldmVudC5tYXJrZXIudGl0bGUpO1xuICB9XG5cbiAgb25DYW1lcmFDaGFuZ2VkKGV2ZW50KSB7XG4gICAgY29uc29sZS5sb2coJ0NhbWVyYSBjaGFuZ2VkOiAnICsgSlNPTi5zdHJpbmdpZnkoZXZlbnQuY2FtZXJhKSk7XG4gIH1cbiAgcHJpdmF0ZSB1cGRhdGVGcmllbmRMb2NhdGlvbihmcmllbmQ6IEZyaWVuZFBvc2l0aW9uKTogdm9pZCB7XG4gICAgdmFyIGEgPSBmcmllbmQ7XG4gIH1cbiAgcHJpdmF0ZSBzdWJzY3JpYmVGcmllbmRMb2NhdGlvblVwZGF0ZSgpIHtcbiAgICAvL01lIHN1c2NyaWJvIGFsIG1ldG9kbyBkZSBhY3R1YWxpemFjaW9uIHBhcmEgb2J0ZW5lciBhY3R1YWxpemFjaW9uIGRlIHViaWNhY2lvbiBkZSBtaXMgYW1pZ29zXG4gICAgdGhpcy5mcmllbmRzTGl2ZVNlcnZpY2UudXBkYXRlRnJpZW5kTG9jYXRpb24oKGYpID0+IHRoaXMudXBkYXRlRnJpZW5kTG9jYXRpb24oZikpO1xuXG4gIH1cbiAgcHJpdmF0ZSBnZXRGcmllbmRzKCk6IHZvaWQge1xuICAgIHRoaXMuZnJpZW5kc0xpdmVTZXJ2aWNlLmdldEZyaWVuZHNCeUdyb3VwKDEpLnN1YnNjcmliZSh4ID0+IHtcbiAgICAgIGZvciAodmFyIGl0ZW0gb2YgeCkge1xuICAgICAgICB0aGlzLmZyaWVuZHMucHVzaChpdGVtKTtcbiAgICAgICAgdGhpcy5yZW1vdmVNYXJrZXIodGhpcy50YXBNYXJrZXIpO1xuICAgICAgICB2YXIgbWFyayA9IG5ldyBBZGRNYXJrZXJBcmdzKCk7XG4gICAgICAgIG1hcmsudGl0bGUgPSBcIlByaW1lcm9vXCI7XG4gICAgICAgIG1hcmsubG9jYXRpb24gPSBuZXcgUG9zaXRpb24oKTtcbiAgICAgICAgbWFyay5sb2NhdGlvbi5sYXRpdHVkZSA9IGl0ZW0ubGF0aXR1ZGU7XG4gICAgICAgIG1hcmsubG9jYXRpb24ubG9uZ2l0dWRlID0gaXRlbS5sb25naXR1ZGU7XG4gICAgICAgIHZhciBtYXBNYXJrOiBNYXJrZXIgPSB0aGlzLmFkZE1hcmtlcihtYXJrKTtcbiAgICAgICAgbWFwTWFyay5zbmlwcGV0ID0gXCJQcmltZXJvXCI7XG4gICAgICAgIHRoaXMubWFwVmlldy5hZGRNYXJrZXIobWFwTWFyayk7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cblxufVxuXG5leHBvcnQgY2xhc3MgQWRkTGluZUFyZ3Mge1xuICBwdWJsaWMgY29sb3I6IENvbG9yO1xuICBwdWJsaWMgbGluZTogUG9seWxpbmU7XG4gIHB1YmxpYyBsb2NhdGlvbjogUG9zaXRpb247XG4gIHB1YmxpYyBnZW9kZXNpYzogYm9vbGVhbjtcbiAgcHVibGljIHdpZHRoOiBudW1iZXI7XG59XG5cbmV4cG9ydCBjbGFzcyBBZGRNYXJrZXJBcmdzIHtcbiAgcHVibGljIGxvY2F0aW9uOiBQb3NpdGlvbjtcbiAgcHVibGljIHRpdGxlOiBzdHJpbmc7XG59Il19