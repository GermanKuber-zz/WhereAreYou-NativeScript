"use strict";
var core_1 = require("@angular/core");
require("rxjs/add/operator/do");
require("rxjs/add/operator/map");
var image_1 = require("ui/image");
var nativescript_google_maps_sdk_1 = require("nativescript-google-maps-sdk");
var mapsModule = require("nativescript-google-maps-sdk");
var geolocation = require('nativescript-geolocation');
var style = require('./map-style.json');
var color_1 = require("color");
var friends_service_1 = require("../../../shared/friends/friends.service");
var MapViewService = (function () {
    function MapViewService(friendService) {
        var _this = this;
        this.friendService = friendService;
        //#Mapa 
        this.mapView = null;
        this.watchId = null;
        this.centeredOnLocation = false;
        this.markList = new Array();
        this.mapTapped = function (event) {
        };
        this.locationReceived = function (position) {
            console.log('GPS Update Received');
            if (_this.mapView && position) {
                _this.mapView.latitude = position.latitude;
                _this.mapView.longitude = position.longitude;
                _this.mapView.zoom = 2;
                _this.centeredOnLocation = true;
            }
            _this.removeMarker(_this.gpsMarker);
            _this.gpsMarker = _this.addMarker({
                location: position,
                title: 'GPS Location'
            });
        };
        if (!geolocation.isEnabled()) {
            geolocation.enableLocationRequest();
        }
    }
    MapViewService.prototype.ngOnInit = function () {
        // this.groceryListService.load()
        // .subscribe(loadedGroceries => {
        //   loadedGroceries.forEach((groceryObject) => {
        //     this.groceryList.unshift(groceryObject);
        //   });
        //   this.isLoading = false;
        //   this.listLoaded = true;
        // });
    };
    //Private Methods
    MapViewService.prototype.createMarkWrapper = function (markInfo, markId) {
        //Creo un MarkWrapper el cual relaciona el Marker con el id del usuario dibujado
        var mark = new AddMarkerArgs();
        mark.title = markInfo.title;
        mark.location = new nativescript_google_maps_sdk_1.Position();
        mark.location.latitude = markInfo.location.latitude;
        mark.location.longitude = markInfo.location.longitude;
        var mapMark = this.addMarker(mark);
        var markWrapper = new MarkWrapper();
        markWrapper.markId = markId;
        markWrapper.mark = mapMark;
        return markWrapper;
    };
    MapViewService.prototype.getMarkWrapper = function (markId) {
        //Regreso un markWrapper por ID
        for (var _i = 0, _a = this.markList; _i < _a.length; _i++) {
            var item = _a[_i];
            if (item.markId == markId)
                return item;
        }
    };
    //Public Methods
    MapViewService.prototype.addCommonMark = function (markInfo, markId) {
        var markWrapper = this.createMarkWrapper(markInfo, markId);
        this.markList.push(markWrapper);
        this.mapView.addMarker(markWrapper.mark);
        var marker = new mapsModule.Marker();
        marker.position = mapsModule.Position.positionFromLatLng(-33.66, 151.20);
        marker.infoWindowTemplate = '~/info-window';
        marker.title = "Seeeeeeeeeeee";
        this.mapView.addMarker(marker);
        marker.showInfoWindow();
    };
    MapViewService.prototype.updateCommonMark = function (markInfo, markId) {
        var markWrapper = this.getMarkWrapper(markId);
        if (markWrapper != null) {
            this.mapView.removeMarker(markWrapper.mark);
            markWrapper.mark.position = markInfo.location;
            this.mapView.addMarker(markWrapper.mark);
            markWrapper.mark.showInfoWindow();
        }
    };
    MapViewService.prototype.removeCommonMark = function (markInfo, markId) {
        var markWrapper = this.getMarkWrapper(markId);
        this.mapView.removeMarker(markWrapper.mark);
    };
    MapViewService.prototype.enableLocation = function () {
        if (!geolocation.isEnabled()) {
            console.log('Location not enabled, requesting.');
            return geolocation.enableLocationRequest();
        }
        else {
            return Promise.resolve(true);
        }
    };
    MapViewService.prototype.getLocation = function () {
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
    MapViewService.prototype.onMapReady = function (event, mapReadyNotify) {
        var _this = this;
        if (this.mapView || !event.object)
            return;
        var mapView = event.object.android;
        var gMap = mapView.getMap();
        this.mapView = event.object;
        this.mapView.setStyle(style);
        //Notifico cuando el mapa esta listo
        this.mapView.notifyMapReady = function () {
            mapReadyNotify();
        };
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
    MapViewService.prototype.addPointToLine = function (args) {
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
    MapViewService.prototype.addMarker = function (args) {
        if (!this.mapView || !args || !args.location)
            return;
        var marker = new nativescript_google_maps_sdk_1.Marker();
        marker.position = nativescript_google_maps_sdk_1.Position.positionFromLatLng(args.location.latitude, args.location.longitude);
        marker.title = args.title;
        marker.snippet = args.title;
        var image = new image_1.Image();
        image.src = "~/images/friend-marker.png";
        image.width = 10;
        image.height = 10;
        marker.icon = image;
        marker.infoWindowTemplate = '~/shared/services/map/info-window';
        this.mapView.addMarker(marker);
        //   var  markers = new mapsModule.Marker();
        //     markers.position = mapsModule.Position.positionFromLatLng(-33.66, 151.20);
        //     markers.title = "Seeeeeeeeeeee";
        //     (<any>markers).infoWindowTemplate = '~/shared/services/map/info-window';
        //      this.mapView.addMarker(markers);
        //     markers.showInfoWindow();
        return marker;
    };
    ;
    MapViewService.prototype.clearGpsLine = function () {
        this.removeLine(this.gpsLine);
        this.gpsLine = null;
    };
    ;
    MapViewService.prototype.clearTapLine = function () {
        this.removeLine(this.tapLine);
        this.tapLine = null;
        this.removeMarker(this.tapMarker);
        this.tapMarker = null;
    };
    MapViewService.prototype.removeLine = function (line) {
        if (line) {
            line.removeAllPoints();
        }
    };
    MapViewService.prototype.removeMarker = function (marker) {
        if (this.mapView && marker) {
            this.mapView.removeMarker(marker);
        }
    };
    MapViewService.prototype.error = function (err) {
        console.log('Error: ' + JSON.stringify(err));
    };
    MapViewService.prototype.onMarkerSelect = function (event) {
        console.log('Clicked on ' + event.marker.title);
    };
    MapViewService.prototype.onCameraChanged = function (event) {
        console.log('Camera changed: ' + JSON.stringify(event.camera));
    };
    return MapViewService;
}());
MapViewService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [friends_service_1.FriendsService])
], MapViewService);
exports.MapViewService = MapViewService;
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
var MarkWrapper = (function () {
    function MarkWrapper() {
    }
    return MarkWrapper;
}());
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFwLXZpZXcuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIm1hcC12aWV3LnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLHNDQUEyQztBQUUzQyxnQ0FBOEI7QUFDOUIsaUNBQStCO0FBQy9CLGtDQUFpQztBQUNqQyw2RUFBbUY7QUFDbkYsSUFBSSxVQUFVLEdBQUcsT0FBTyxDQUFDLDhCQUE4QixDQUFDLENBQUM7QUFDekQsSUFBSSxXQUFXLEdBQUcsT0FBTyxDQUFDLDBCQUEwQixDQUFDLENBQUM7QUFDdEQsSUFBSSxLQUFLLEdBQUcsT0FBTyxDQUFDLGtCQUFrQixDQUFDLENBQUM7QUFDeEMsK0JBQThCO0FBQzlCLDJFQUF5RTtBQUV6RSxJQUFhLGNBQWM7SUFVdkIsd0JBQW9CLGFBQTZCO1FBQWpELGlCQUlDO1FBSm1CLGtCQUFhLEdBQWIsYUFBYSxDQUFnQjtRQVRqRCxRQUFRO1FBQ0EsWUFBTyxHQUFZLElBQUksQ0FBQztRQUNoQyxZQUFPLEdBQVcsSUFBSSxDQUFDO1FBS3ZCLHVCQUFrQixHQUFZLEtBQUssQ0FBQztRQUM1QixhQUFRLEdBQXVCLElBQUksS0FBSyxFQUFlLENBQUM7UUErSHhELGNBQVMsR0FBRyxVQUFDLEtBQUs7UUFFMUIsQ0FBQyxDQUFDO1FBRU0scUJBQWdCLEdBQUcsVUFBQyxRQUFrQjtZQUMxQyxPQUFPLENBQUMsR0FBRyxDQUFDLHFCQUFxQixDQUFDLENBQUM7WUFFbkMsRUFBRSxDQUFDLENBQUMsS0FBSSxDQUFDLE9BQU8sSUFBSSxRQUFRLENBQUMsQ0FBQyxDQUFDO2dCQUMzQixLQUFJLENBQUMsT0FBTyxDQUFDLFFBQVEsR0FBRyxRQUFRLENBQUMsUUFBUSxDQUFDO2dCQUMxQyxLQUFJLENBQUMsT0FBTyxDQUFDLFNBQVMsR0FBRyxRQUFRLENBQUMsU0FBUyxDQUFDO2dCQUM1QyxLQUFJLENBQUMsT0FBTyxDQUFDLElBQUksR0FBRyxDQUFDLENBQUM7Z0JBQ3RCLEtBQUksQ0FBQyxrQkFBa0IsR0FBRyxJQUFJLENBQUM7WUFDbkMsQ0FBQztZQUNELEtBQUksQ0FBQyxZQUFZLENBQUMsS0FBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDO1lBQ2xDLEtBQUksQ0FBQyxTQUFTLEdBQUcsS0FBSSxDQUFDLFNBQVMsQ0FBQztnQkFDNUIsUUFBUSxFQUFFLFFBQVE7Z0JBQ2xCLEtBQUssRUFBRSxjQUFjO2FBQ3hCLENBQUMsQ0FBQztRQUNQLENBQUMsQ0FBQztRQS9JRSxFQUFFLENBQUMsQ0FBQyxDQUFDLFdBQVcsQ0FBQyxTQUFTLEVBQUUsQ0FBQyxDQUFDLENBQUM7WUFDM0IsV0FBVyxDQUFDLHFCQUFxQixFQUFFLENBQUM7UUFDeEMsQ0FBQztJQUNMLENBQUM7SUFFRCxpQ0FBUSxHQUFSO1FBRUksaUNBQWlDO1FBQ2pDLGtDQUFrQztRQUNsQyxpREFBaUQ7UUFDakQsK0NBQStDO1FBQy9DLFFBQVE7UUFDUiw0QkFBNEI7UUFDNUIsNEJBQTRCO1FBQzVCLE1BQU07SUFDVixDQUFDO0lBRUQsaUJBQWlCO0lBQ1YsMENBQWlCLEdBQXhCLFVBQXlCLFFBQXVCLEVBQUUsTUFBYztRQUM1RCxnRkFBZ0Y7UUFDaEYsSUFBSSxJQUFJLEdBQUcsSUFBSSxhQUFhLEVBQUUsQ0FBQztRQUMvQixJQUFJLENBQUMsS0FBSyxHQUFHLFFBQVEsQ0FBQyxLQUFLLENBQUM7UUFDNUIsSUFBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLHVDQUFRLEVBQUUsQ0FBQztRQUMvQixJQUFJLENBQUMsUUFBUSxDQUFDLFFBQVEsR0FBRyxRQUFRLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQztRQUNwRCxJQUFJLENBQUMsUUFBUSxDQUFDLFNBQVMsR0FBRyxRQUFRLENBQUMsUUFBUSxDQUFDLFNBQVMsQ0FBQztRQUV0RCxJQUFJLE9BQU8sR0FBVyxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQzNDLElBQUksV0FBVyxHQUFHLElBQUksV0FBVyxFQUFFLENBQUM7UUFDcEMsV0FBVyxDQUFDLE1BQU0sR0FBRyxNQUFNLENBQUM7UUFDNUIsV0FBVyxDQUFDLElBQUksR0FBRyxPQUFPLENBQUM7UUFDM0IsTUFBTSxDQUFDLFdBQVcsQ0FBQztJQUN2QixDQUFDO0lBQ08sdUNBQWMsR0FBdEIsVUFBdUIsTUFBYztRQUNqQywrQkFBK0I7UUFDL0IsR0FBRyxDQUFDLENBQWEsVUFBYSxFQUFiLEtBQUEsSUFBSSxDQUFDLFFBQVEsRUFBYixjQUFhLEVBQWIsSUFBYTtZQUF6QixJQUFJLElBQUksU0FBQTtZQUNULEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxNQUFNLElBQUksTUFBTSxDQUFDO2dCQUN0QixNQUFNLENBQUMsSUFBSSxDQUFDO1NBQUE7SUFFeEIsQ0FBQztJQUNELGdCQUFnQjtJQUNULHNDQUFhLEdBQXBCLFVBQXFCLFFBQXVCLEVBQUUsTUFBYztRQUN4RCxJQUFJLFdBQVcsR0FBRyxJQUFJLENBQUMsaUJBQWlCLENBQUMsUUFBUSxFQUFFLE1BQU0sQ0FBQyxDQUFDO1FBQzNELElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDO1FBQ2hDLElBQUksQ0FBQyxPQUFPLENBQUMsU0FBUyxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUN6QyxJQUFJLE1BQU0sR0FBRyxJQUFJLFVBQVUsQ0FBQyxNQUFNLEVBQUUsQ0FBQztRQUNyQyxNQUFNLENBQUMsUUFBUSxHQUFHLFVBQVUsQ0FBQyxRQUFRLENBQUMsa0JBQWtCLENBQUMsQ0FBQyxLQUFLLEVBQUUsTUFBTSxDQUFDLENBQUM7UUFDekUsTUFBTSxDQUFDLGtCQUFrQixHQUFHLGVBQWUsQ0FBQztRQUM1QyxNQUFNLENBQUMsS0FBSyxHQUFHLGVBQWUsQ0FBQztRQUMvQixJQUFJLENBQUMsT0FBTyxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUMvQixNQUFNLENBQUMsY0FBYyxFQUFFLENBQUM7SUFFNUIsQ0FBQztJQUNNLHlDQUFnQixHQUF2QixVQUF3QixRQUF1QixFQUFFLE1BQWM7UUFDM0QsSUFBSSxXQUFXLEdBQUcsSUFBSSxDQUFDLGNBQWMsQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUM5QyxFQUFFLENBQUMsQ0FBQyxXQUFXLElBQUksSUFBSSxDQUFDLENBQUMsQ0FBQztZQUN0QixJQUFJLENBQUMsT0FBTyxDQUFDLFlBQVksQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLENBQUM7WUFDNUMsV0FBVyxDQUFDLElBQUksQ0FBQyxRQUFRLEdBQUcsUUFBUSxDQUFDLFFBQVEsQ0FBQztZQUM5QyxJQUFJLENBQUMsT0FBTyxDQUFDLFNBQVMsQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLENBQUM7WUFDekMsV0FBVyxDQUFDLElBQUksQ0FBQyxjQUFjLEVBQUUsQ0FBQztRQUN0QyxDQUFDO0lBQ0wsQ0FBQztJQUNNLHlDQUFnQixHQUF2QixVQUF3QixRQUF1QixFQUFFLE1BQWM7UUFDM0QsSUFBSSxXQUFXLEdBQUcsSUFBSSxDQUFDLGNBQWMsQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUM5QyxJQUFJLENBQUMsT0FBTyxDQUFDLFlBQVksQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDaEQsQ0FBQztJQUdPLHVDQUFjLEdBQXRCO1FBQ0ksRUFBRSxDQUFDLENBQUMsQ0FBQyxXQUFXLENBQUMsU0FBUyxFQUFFLENBQUMsQ0FBQyxDQUFDO1lBQzNCLE9BQU8sQ0FBQyxHQUFHLENBQUMsbUNBQW1DLENBQUMsQ0FBQztZQUNqRCxNQUFNLENBQUMsV0FBVyxDQUFDLHFCQUFxQixFQUFFLENBQUM7UUFDL0MsQ0FBQztRQUFDLElBQUksQ0FBQyxDQUFDO1lBQ0osTUFBTSxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDakMsQ0FBQztJQUNMLENBQUM7SUFFTyxvQ0FBVyxHQUFuQjtRQUNJLEVBQUUsQ0FBQyxDQUFDLFdBQVcsQ0FBQyxTQUFTLEVBQUUsQ0FBQyxDQUFDLENBQUM7WUFDMUIsSUFBSSxRQUFRLEdBQUcsV0FBVyxDQUFDLGtCQUFrQixDQUFDO2dCQUMxQyxlQUFlLEVBQUUsRUFBRTtnQkFDbkIsY0FBYyxFQUFFLEVBQUU7Z0JBQ2xCLGlCQUFpQixFQUFFLElBQUk7Z0JBQ3ZCLFVBQVUsRUFBRSxLQUFLO2FBQ3BCLENBQUMsQ0FBQTtZQUNGLE1BQU0sQ0FBQyxRQUFRLENBQUM7UUFDcEIsQ0FBQztRQUNELE1BQU0sQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLDBCQUEwQixDQUFDLENBQUM7SUFDdEQsQ0FBQztJQUVELFlBQVk7SUFDTCxtQ0FBVSxHQUFqQixVQUFrQixLQUFLLEVBQUUsY0FBMEI7UUFBbkQsaUJBaUNDO1FBaENHLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxPQUFPLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDO1lBQUMsTUFBTSxDQUFDO1FBRWpELElBQUksT0FBTyxHQUFHLEtBQUssQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDO1FBRWhDLElBQUksSUFBSSxHQUFHLE9BQU8sQ0FBQyxNQUFNLEVBQUUsQ0FBQztRQUd4QixJQUFJLENBQUMsT0FBTyxHQUFHLEtBQUssQ0FBQyxNQUFNLENBQUM7UUFDNUIsSUFBSSxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLENBQUM7UUFFN0Isb0NBQW9DO1FBQ3BDLElBQUksQ0FBQyxPQUFPLENBQUMsY0FBYyxHQUFHO1lBQzFCLGNBQWMsRUFBRSxDQUFDO1FBQ3JCLENBQUMsQ0FBQTtRQUNELG1EQUFtRDtRQUNuRCxxREFBcUQ7UUFFckQsSUFBSSxDQUFDLGNBQWMsRUFBRTthQUNoQixJQUFJLENBQUM7WUFDRixJQUFJLFFBQVEsR0FBRyxLQUFJLENBQUMsV0FBVyxFQUFFLENBQUM7UUFDdEMsQ0FBQyxDQUFDO2FBQ0QsSUFBSSxDQUFDO1lBQ0YsS0FBSSxDQUFDLE9BQU8sR0FBRyxXQUFXLENBQUMsYUFBYSxDQUFDLEtBQUksQ0FBQyxnQkFBZ0IsRUFBRSxLQUFJLENBQUMsS0FBSyxFQUFFO2dCQUN4RSxlQUFlLEVBQUUsRUFBRTtnQkFDbkIsY0FBYyxFQUFFLEVBQUU7Z0JBQ2xCLGlCQUFpQixFQUFFLEtBQUs7Z0JBQ3hCLFVBQVUsRUFBRSxLQUFLO2FBQ3BCLENBQUMsQ0FBQztRQUNQLENBQUMsRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7SUFJdkIsQ0FBQztJQUFBLENBQUM7SUFzQk0sdUNBQWMsR0FBdEIsVUFBdUIsSUFBaUI7UUFDcEMsRUFBRSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsT0FBTyxJQUFJLENBQUMsSUFBSSxJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQztZQUFDLE1BQU0sQ0FBQztRQUVyRCxJQUFJLElBQUksR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDO1FBRXJCLEVBQUUsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztZQUNSLElBQUksR0FBRyxJQUFJLHVDQUFRLEVBQUUsQ0FBQztZQUN0QixJQUFJLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQztZQUNwQixJQUFJLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQyxLQUFLLElBQUksRUFBRSxDQUFDO1lBQzlCLElBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDLEtBQUssSUFBSSxJQUFJLGFBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQztZQUM1QyxJQUFJLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQyxRQUFRLElBQUksU0FBUyxHQUFHLElBQUksQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDO1lBQ2xFLElBQUksQ0FBQyxPQUFPLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ25DLENBQUM7UUFDRCxJQUFJLENBQUMsUUFBUSxDQUFDLHVDQUFRLENBQUMsa0JBQWtCLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxRQUFRLEVBQUUsSUFBSSxDQUFDLFFBQVEsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDO1FBRTVGLE1BQU0sQ0FBQyxJQUFJLENBQUM7SUFDaEIsQ0FBQztJQUNPLGtDQUFTLEdBQWpCLFVBQWtCLElBQW1CO1FBQ2pDLEVBQUUsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLE9BQU8sSUFBSSxDQUFDLElBQUksSUFBSSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUM7WUFBQyxNQUFNLENBQUM7UUFFckQsSUFBSSxNQUFNLEdBQUcsSUFBSSxxQ0FBTSxFQUFFLENBQUM7UUFDMUIsTUFBTSxDQUFDLFFBQVEsR0FBRyx1Q0FBUSxDQUFDLGtCQUFrQixDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsUUFBUSxFQUFFLElBQUksQ0FBQyxRQUFRLENBQUMsU0FBUyxDQUFDLENBQUM7UUFDL0YsTUFBTSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDO1FBQzFCLE1BQU0sQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQztRQUM1QixJQUFJLEtBQUssR0FBRyxJQUFJLGFBQUssRUFBRSxDQUFDO1FBQ3hCLEtBQUssQ0FBQyxHQUFHLEdBQUcsNEJBQTRCLENBQUM7UUFDekMsS0FBSyxDQUFDLEtBQUssR0FBRyxFQUFFLENBQUM7UUFDakIsS0FBSyxDQUFDLE1BQU0sR0FBRyxFQUFFLENBQUM7UUFDbEIsTUFBTSxDQUFDLElBQUksR0FBRyxLQUFLLENBQUM7UUFFZCxNQUFPLENBQUMsa0JBQWtCLEdBQUcsbUNBQW1DLENBQUM7UUFDdkUsSUFBSSxDQUFDLE9BQU8sQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLENBQUM7UUFFL0IsNENBQTRDO1FBQzVDLGlGQUFpRjtRQUNqRix1Q0FBdUM7UUFDdkMsK0VBQStFO1FBQy9FLHdDQUF3QztRQUN4QyxnQ0FBZ0M7UUFFaEMsTUFBTSxDQUFDLE1BQU0sQ0FBQztJQUNsQixDQUFDO0lBQUEsQ0FBQztJQUVNLHFDQUFZLEdBQXBCO1FBQ0ksSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUM7UUFDOUIsSUFBSSxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUM7SUFFeEIsQ0FBQztJQUFBLENBQUM7SUFFTSxxQ0FBWSxHQUFwQjtRQUNJLElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBQzlCLElBQUksQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDO1FBQ3BCLElBQUksQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDO1FBQ2xDLElBQUksQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDO0lBRTFCLENBQUM7SUFFTyxtQ0FBVSxHQUFsQixVQUFtQixJQUFjO1FBQzdCLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7WUFDUCxJQUFJLENBQUMsZUFBZSxFQUFFLENBQUM7UUFDM0IsQ0FBQztJQUNMLENBQUM7SUFFTyxxQ0FBWSxHQUFwQixVQUFxQixNQUFjO1FBQy9CLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxPQUFPLElBQUksTUFBTSxDQUFDLENBQUMsQ0FBQztZQUN6QixJQUFJLENBQUMsT0FBTyxDQUFDLFlBQVksQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUN0QyxDQUFDO0lBQ0wsQ0FBQztJQUVPLDhCQUFLLEdBQWIsVUFBYyxHQUFHO1FBQ2IsT0FBTyxDQUFDLEdBQUcsQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO0lBQ2pELENBQUM7SUFFTyx1Q0FBYyxHQUF0QixVQUF1QixLQUFLO1FBQ3hCLE9BQU8sQ0FBQyxHQUFHLENBQUMsYUFBYSxHQUFHLEtBQUssQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDcEQsQ0FBQztJQUVPLHdDQUFlLEdBQXZCLFVBQXdCLEtBQUs7UUFDekIsT0FBTyxDQUFDLEdBQUcsQ0FBQyxrQkFBa0IsR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDO0lBQ25FLENBQUM7SUFDTCxxQkFBQztBQUFELENBQUMsQUE1T0QsSUE0T0M7QUE1T1ksY0FBYztJQUQxQixpQkFBVSxFQUFFO3FDQVcwQixnQ0FBYztHQVZ4QyxjQUFjLENBNE8xQjtBQTVPWSx3Q0FBYztBQStPM0I7SUFBQTtJQU1BLENBQUM7SUFBRCxrQkFBQztBQUFELENBQUMsQUFORCxJQU1DO0FBTlksa0NBQVc7QUFReEI7SUFBQTtJQUdBLENBQUM7SUFBRCxvQkFBQztBQUFELENBQUMsQUFIRCxJQUdDO0FBSFksc0NBQWE7QUFLMUI7SUFBQTtJQUdBLENBQUM7SUFBRCxrQkFBQztBQUFELENBQUMsQUFIRCxJQUdDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XG5pbXBvcnQgeyBPYnNlcnZhYmxlIH0gZnJvbSBcInJ4anMvUnhcIjtcbmltcG9ydCBcInJ4anMvYWRkL29wZXJhdG9yL2RvXCI7XG5pbXBvcnQgXCJyeGpzL2FkZC9vcGVyYXRvci9tYXBcIjtcbmltcG9ydCB7IEltYWdlIH0gZnJvbSBcInVpL2ltYWdlXCI7XG5pbXBvcnQgeyBNYXBWaWV3LCBNYXJrZXIsIFBvbHlsaW5lLCBQb3NpdGlvbiB9IGZyb20gJ25hdGl2ZXNjcmlwdC1nb29nbGUtbWFwcy1zZGsnO1xudmFyIG1hcHNNb2R1bGUgPSByZXF1aXJlKFwibmF0aXZlc2NyaXB0LWdvb2dsZS1tYXBzLXNka1wiKTtcbmxldCBnZW9sb2NhdGlvbiA9IHJlcXVpcmUoJ25hdGl2ZXNjcmlwdC1nZW9sb2NhdGlvbicpO1xudmFyIHN0eWxlID0gcmVxdWlyZSgnLi9tYXAtc3R5bGUuanNvbicpO1xuaW1wb3J0IHsgQ29sb3IgfSBmcm9tICdjb2xvcic7XG5pbXBvcnQgeyBGcmllbmRzU2VydmljZSB9IGZyb20gJy4uLy4uLy4uL3NoYXJlZC9mcmllbmRzL2ZyaWVuZHMuc2VydmljZSc7XG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgTWFwVmlld1NlcnZpY2Uge1xuICAgIC8vI01hcGEgXG4gICAgcHJpdmF0ZSBtYXBWaWV3OiBNYXBWaWV3ID0gbnVsbDtcbiAgICB3YXRjaElkOiBudW1iZXIgPSBudWxsO1xuICAgIGdwc0xpbmU6IFBvbHlsaW5lO1xuICAgIHRhcExpbmU6IFBvbHlsaW5lO1xuICAgIHRhcE1hcmtlcjogYW55O1xuICAgIGdwc01hcmtlcjogYW55O1xuICAgIGNlbnRlcmVkT25Mb2NhdGlvbjogYm9vbGVhbiA9IGZhbHNlO1xuICAgIHByaXZhdGUgbWFya0xpc3Q6IEFycmF5PE1hcmtXcmFwcGVyPiA9IG5ldyBBcnJheTxNYXJrV3JhcHBlcj4oKTtcbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIGZyaWVuZFNlcnZpY2U6IEZyaWVuZHNTZXJ2aWNlKSB7XG4gICAgICAgIGlmICghZ2VvbG9jYXRpb24uaXNFbmFibGVkKCkpIHtcbiAgICAgICAgICAgIGdlb2xvY2F0aW9uLmVuYWJsZUxvY2F0aW9uUmVxdWVzdCgpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgbmdPbkluaXQoKSB7XG5cbiAgICAgICAgLy8gdGhpcy5ncm9jZXJ5TGlzdFNlcnZpY2UubG9hZCgpXG4gICAgICAgIC8vIC5zdWJzY3JpYmUobG9hZGVkR3JvY2VyaWVzID0+IHtcbiAgICAgICAgLy8gICBsb2FkZWRHcm9jZXJpZXMuZm9yRWFjaCgoZ3JvY2VyeU9iamVjdCkgPT4ge1xuICAgICAgICAvLyAgICAgdGhpcy5ncm9jZXJ5TGlzdC51bnNoaWZ0KGdyb2NlcnlPYmplY3QpO1xuICAgICAgICAvLyAgIH0pO1xuICAgICAgICAvLyAgIHRoaXMuaXNMb2FkaW5nID0gZmFsc2U7XG4gICAgICAgIC8vICAgdGhpcy5saXN0TG9hZGVkID0gdHJ1ZTtcbiAgICAgICAgLy8gfSk7XG4gICAgfVxuXG4gICAgLy9Qcml2YXRlIE1ldGhvZHNcbiAgICBwdWJsaWMgY3JlYXRlTWFya1dyYXBwZXIobWFya0luZm86IEFkZE1hcmtlckFyZ3MsIG1hcmtJZDogbnVtYmVyKTogTWFya1dyYXBwZXIge1xuICAgICAgICAvL0NyZW8gdW4gTWFya1dyYXBwZXIgZWwgY3VhbCByZWxhY2lvbmEgZWwgTWFya2VyIGNvbiBlbCBpZCBkZWwgdXN1YXJpbyBkaWJ1amFkb1xuICAgICAgICB2YXIgbWFyayA9IG5ldyBBZGRNYXJrZXJBcmdzKCk7XG4gICAgICAgIG1hcmsudGl0bGUgPSBtYXJrSW5mby50aXRsZTtcbiAgICAgICAgbWFyay5sb2NhdGlvbiA9IG5ldyBQb3NpdGlvbigpO1xuICAgICAgICBtYXJrLmxvY2F0aW9uLmxhdGl0dWRlID0gbWFya0luZm8ubG9jYXRpb24ubGF0aXR1ZGU7XG4gICAgICAgIG1hcmsubG9jYXRpb24ubG9uZ2l0dWRlID0gbWFya0luZm8ubG9jYXRpb24ubG9uZ2l0dWRlO1xuXG4gICAgICAgIHZhciBtYXBNYXJrOiBNYXJrZXIgPSB0aGlzLmFkZE1hcmtlcihtYXJrKTtcbiAgICAgICAgdmFyIG1hcmtXcmFwcGVyID0gbmV3IE1hcmtXcmFwcGVyKCk7XG4gICAgICAgIG1hcmtXcmFwcGVyLm1hcmtJZCA9IG1hcmtJZDtcbiAgICAgICAgbWFya1dyYXBwZXIubWFyayA9IG1hcE1hcms7XG4gICAgICAgIHJldHVybiBtYXJrV3JhcHBlcjtcbiAgICB9XG4gICAgcHJpdmF0ZSBnZXRNYXJrV3JhcHBlcihtYXJrSWQ6IG51bWJlcik6IE1hcmtXcmFwcGVyIHtcbiAgICAgICAgLy9SZWdyZXNvIHVuIG1hcmtXcmFwcGVyIHBvciBJRFxuICAgICAgICBmb3IgKHZhciBpdGVtIG9mIHRoaXMubWFya0xpc3QpXG4gICAgICAgICAgICBpZiAoaXRlbS5tYXJrSWQgPT0gbWFya0lkKVxuICAgICAgICAgICAgICAgIHJldHVybiBpdGVtO1xuXG4gICAgfVxuICAgIC8vUHVibGljIE1ldGhvZHNcbiAgICBwdWJsaWMgYWRkQ29tbW9uTWFyayhtYXJrSW5mbzogQWRkTWFya2VyQXJncywgbWFya0lkOiBudW1iZXIpOiB2b2lkIHtcbiAgICAgICAgdmFyIG1hcmtXcmFwcGVyID0gdGhpcy5jcmVhdGVNYXJrV3JhcHBlcihtYXJrSW5mbywgbWFya0lkKTtcbiAgICAgICAgdGhpcy5tYXJrTGlzdC5wdXNoKG1hcmtXcmFwcGVyKTtcbiAgICAgICAgdGhpcy5tYXBWaWV3LmFkZE1hcmtlcihtYXJrV3JhcHBlci5tYXJrKTtcbiAgICAgICAgdmFyIG1hcmtlciA9IG5ldyBtYXBzTW9kdWxlLk1hcmtlcigpO1xuICAgICAgICBtYXJrZXIucG9zaXRpb24gPSBtYXBzTW9kdWxlLlBvc2l0aW9uLnBvc2l0aW9uRnJvbUxhdExuZygtMzMuNjYsIDE1MS4yMCk7XG4gICAgICAgIG1hcmtlci5pbmZvV2luZG93VGVtcGxhdGUgPSAnfi9pbmZvLXdpbmRvdyc7XG4gICAgICAgIG1hcmtlci50aXRsZSA9IFwiU2VlZWVlZWVlZWVlZVwiO1xuICAgICAgICB0aGlzLm1hcFZpZXcuYWRkTWFya2VyKG1hcmtlcik7XG4gICAgICAgIG1hcmtlci5zaG93SW5mb1dpbmRvdygpO1xuXG4gICAgfVxuICAgIHB1YmxpYyB1cGRhdGVDb21tb25NYXJrKG1hcmtJbmZvOiBBZGRNYXJrZXJBcmdzLCBtYXJrSWQ6IG51bWJlcik6IHZvaWQge1xuICAgICAgICB2YXIgbWFya1dyYXBwZXIgPSB0aGlzLmdldE1hcmtXcmFwcGVyKG1hcmtJZCk7XG4gICAgICAgIGlmIChtYXJrV3JhcHBlciAhPSBudWxsKSB7XG4gICAgICAgICAgICB0aGlzLm1hcFZpZXcucmVtb3ZlTWFya2VyKG1hcmtXcmFwcGVyLm1hcmspO1xuICAgICAgICAgICAgbWFya1dyYXBwZXIubWFyay5wb3NpdGlvbiA9IG1hcmtJbmZvLmxvY2F0aW9uO1xuICAgICAgICAgICAgdGhpcy5tYXBWaWV3LmFkZE1hcmtlcihtYXJrV3JhcHBlci5tYXJrKTtcbiAgICAgICAgICAgIG1hcmtXcmFwcGVyLm1hcmsuc2hvd0luZm9XaW5kb3coKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBwdWJsaWMgcmVtb3ZlQ29tbW9uTWFyayhtYXJrSW5mbzogQWRkTWFya2VyQXJncywgbWFya0lkOiBudW1iZXIpOiB2b2lkIHtcbiAgICAgICAgdmFyIG1hcmtXcmFwcGVyID0gdGhpcy5nZXRNYXJrV3JhcHBlcihtYXJrSWQpO1xuICAgICAgICB0aGlzLm1hcFZpZXcucmVtb3ZlTWFya2VyKG1hcmtXcmFwcGVyLm1hcmspO1xuICAgIH1cblxuXG4gICAgcHJpdmF0ZSBlbmFibGVMb2NhdGlvbigpIHtcbiAgICAgICAgaWYgKCFnZW9sb2NhdGlvbi5pc0VuYWJsZWQoKSkge1xuICAgICAgICAgICAgY29uc29sZS5sb2coJ0xvY2F0aW9uIG5vdCBlbmFibGVkLCByZXF1ZXN0aW5nLicpO1xuICAgICAgICAgICAgcmV0dXJuIGdlb2xvY2F0aW9uLmVuYWJsZUxvY2F0aW9uUmVxdWVzdCgpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZSh0cnVlKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHByaXZhdGUgZ2V0TG9jYXRpb24oKSB7XG4gICAgICAgIGlmIChnZW9sb2NhdGlvbi5pc0VuYWJsZWQoKSkge1xuICAgICAgICAgICAgdmFyIGxvY2F0aW9uID0gZ2VvbG9jYXRpb24uZ2V0Q3VycmVudExvY2F0aW9uKHtcbiAgICAgICAgICAgICAgICBkZXNpcmVkQWNjdXJhY3k6IDEwLFxuICAgICAgICAgICAgICAgIHVwZGF0ZURpc3RhbmNlOiAxMCxcbiAgICAgICAgICAgICAgICBtaW5pbXVtVXBkYXRlVGltZTogMTAwMCxcbiAgICAgICAgICAgICAgICBtYXhpbXVtQWdlOiAxMDAwMFxuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIHJldHVybiBsb2NhdGlvbjtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gUHJvbWlzZS5yZWplY3QoJ0dlb2xvY2F0aW9uIG5vdCBlbmFibGVkLicpO1xuICAgIH1cblxuICAgIC8vTWFwIGV2ZW50c1xuICAgIHB1YmxpYyBvbk1hcFJlYWR5KGV2ZW50LCBtYXBSZWFkeU5vdGlmeTogKCkgPT4gdm9pZCkge1xuICAgICAgICBpZiAodGhpcy5tYXBWaWV3IHx8ICFldmVudC5vYmplY3QpIHJldHVybjtcblxuIHZhciBtYXBWaWV3ID0gZXZlbnQub2JqZWN0LmFuZHJvaWQ7XG4gXG4gICAgdmFyIGdNYXAgPSBtYXBWaWV3LmdldE1hcCgpO1xuXG5cbiAgICAgICAgdGhpcy5tYXBWaWV3ID0gZXZlbnQub2JqZWN0O1xuICAgICAgICB0aGlzLm1hcFZpZXcuc2V0U3R5bGUoc3R5bGUpO1xuXG4gICAgICAgIC8vTm90aWZpY28gY3VhbmRvIGVsIG1hcGEgZXN0YSBsaXN0b1xuICAgICAgICB0aGlzLm1hcFZpZXcubm90aWZ5TWFwUmVhZHkgPSAoKSA9PiB7XG4gICAgICAgICAgICBtYXBSZWFkeU5vdGlmeSgpO1xuICAgICAgICB9XG4gICAgICAgIC8vIHRoaXMubWFwVmlldy5tYXJrZXJTZWxlY3QgPSB0aGlzLm9uTWFya2VyU2VsZWN0O1xuICAgICAgICAvLyB0aGlzLm1hcFZpZXcuY2FtZXJhQ2hhbmdlZCA9IHRoaXMub25DYW1lcmFDaGFuZ2VkO1xuXG4gICAgICAgIHRoaXMuZW5hYmxlTG9jYXRpb24oKVxuICAgICAgICAgICAgLnRoZW4oKCkgPT4ge1xuICAgICAgICAgICAgICAgIHZhciBsb2NhdGlvbiA9IHRoaXMuZ2V0TG9jYXRpb24oKTtcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAudGhlbigoKSA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy53YXRjaElkID0gZ2VvbG9jYXRpb24ud2F0Y2hMb2NhdGlvbih0aGlzLmxvY2F0aW9uUmVjZWl2ZWQsIHRoaXMuZXJyb3IsIHtcbiAgICAgICAgICAgICAgICAgICAgZGVzaXJlZEFjY3VyYWN5OiAxMCxcbiAgICAgICAgICAgICAgICAgICAgdXBkYXRlRGlzdGFuY2U6IDEwLFxuICAgICAgICAgICAgICAgICAgICBtaW5pbXVtVXBkYXRlVGltZTogMTAwMDAsXG4gICAgICAgICAgICAgICAgICAgIG1heGltdW1BZ2U6IDYwMDAwXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9LCB0aGlzLmVycm9yKTtcblxuXG5cbiAgICB9O1xuXG4gICAgcHJpdmF0ZSBtYXBUYXBwZWQgPSAoZXZlbnQpID0+IHtcblxuICAgIH07XG5cbiAgICBwcml2YXRlIGxvY2F0aW9uUmVjZWl2ZWQgPSAocG9zaXRpb246IFBvc2l0aW9uKSA9PiB7XG4gICAgICAgIGNvbnNvbGUubG9nKCdHUFMgVXBkYXRlIFJlY2VpdmVkJyk7XG5cbiAgICAgICAgaWYgKHRoaXMubWFwVmlldyAmJiBwb3NpdGlvbikge1xuICAgICAgICAgICAgdGhpcy5tYXBWaWV3LmxhdGl0dWRlID0gcG9zaXRpb24ubGF0aXR1ZGU7XG4gICAgICAgICAgICB0aGlzLm1hcFZpZXcubG9uZ2l0dWRlID0gcG9zaXRpb24ubG9uZ2l0dWRlO1xuICAgICAgICAgICAgdGhpcy5tYXBWaWV3Lnpvb20gPSAyO1xuICAgICAgICAgICAgdGhpcy5jZW50ZXJlZE9uTG9jYXRpb24gPSB0cnVlO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMucmVtb3ZlTWFya2VyKHRoaXMuZ3BzTWFya2VyKTtcbiAgICAgICAgdGhpcy5ncHNNYXJrZXIgPSB0aGlzLmFkZE1hcmtlcih7XG4gICAgICAgICAgICBsb2NhdGlvbjogcG9zaXRpb24sXG4gICAgICAgICAgICB0aXRsZTogJ0dQUyBMb2NhdGlvbidcbiAgICAgICAgfSk7XG4gICAgfTtcblxuICAgIHByaXZhdGUgYWRkUG9pbnRUb0xpbmUoYXJnczogQWRkTGluZUFyZ3MpIHtcbiAgICAgICAgaWYgKCF0aGlzLm1hcFZpZXcgfHwgIWFyZ3MgfHwgIWFyZ3MubG9jYXRpb24pIHJldHVybjtcblxuICAgICAgICBsZXQgbGluZSA9IGFyZ3MubGluZTtcblxuICAgICAgICBpZiAoIWxpbmUpIHtcbiAgICAgICAgICAgIGxpbmUgPSBuZXcgUG9seWxpbmUoKTtcbiAgICAgICAgICAgIGxpbmUudmlzaWJsZSA9IHRydWU7XG4gICAgICAgICAgICBsaW5lLndpZHRoID0gYXJncy53aWR0aCB8fCAxMDtcbiAgICAgICAgICAgIGxpbmUuY29sb3IgPSBhcmdzLmNvbG9yIHx8IG5ldyBDb2xvcignUmVkJyk7XG4gICAgICAgICAgICBsaW5lLmdlb2Rlc2ljID0gYXJncy5nZW9kZXNpYyAhPSB1bmRlZmluZWQgPyBhcmdzLmdlb2Rlc2ljIDogdHJ1ZTtcbiAgICAgICAgICAgIHRoaXMubWFwVmlldy5hZGRQb2x5bGluZShsaW5lKTtcbiAgICAgICAgfVxuICAgICAgICBsaW5lLmFkZFBvaW50KFBvc2l0aW9uLnBvc2l0aW9uRnJvbUxhdExuZyhhcmdzLmxvY2F0aW9uLmxhdGl0dWRlLCBhcmdzLmxvY2F0aW9uLmxvbmdpdHVkZSkpO1xuXG4gICAgICAgIHJldHVybiBsaW5lO1xuICAgIH1cbiAgICBwcml2YXRlIGFkZE1hcmtlcihhcmdzOiBBZGRNYXJrZXJBcmdzKTogTWFya2VyIHtcbiAgICAgICAgaWYgKCF0aGlzLm1hcFZpZXcgfHwgIWFyZ3MgfHwgIWFyZ3MubG9jYXRpb24pIHJldHVybjtcblxuICAgICAgICBsZXQgbWFya2VyID0gbmV3IE1hcmtlcigpO1xuICAgICAgICBtYXJrZXIucG9zaXRpb24gPSBQb3NpdGlvbi5wb3NpdGlvbkZyb21MYXRMbmcoYXJncy5sb2NhdGlvbi5sYXRpdHVkZSwgYXJncy5sb2NhdGlvbi5sb25naXR1ZGUpO1xuICAgICAgICBtYXJrZXIudGl0bGUgPSBhcmdzLnRpdGxlO1xuICAgICAgICBtYXJrZXIuc25pcHBldCA9IGFyZ3MudGl0bGU7XG4gICAgICAgIHZhciBpbWFnZSA9IG5ldyBJbWFnZSgpO1xuICAgICAgICBpbWFnZS5zcmMgPSBcIn4vaW1hZ2VzL2ZyaWVuZC1tYXJrZXIucG5nXCI7XG4gICAgICAgIGltYWdlLndpZHRoID0gMTA7XG4gICAgICAgIGltYWdlLmhlaWdodCA9IDEwO1xuICAgICAgICBtYXJrZXIuaWNvbiA9IGltYWdlO1xuXG4gICAgICAgICg8YW55Pm1hcmtlcikuaW5mb1dpbmRvd1RlbXBsYXRlID0gJ34vc2hhcmVkL3NlcnZpY2VzL21hcC9pbmZvLXdpbmRvdyc7XG4gICAgICAgIHRoaXMubWFwVmlldy5hZGRNYXJrZXIobWFya2VyKTtcblxuICAgICAgICAvLyAgIHZhciAgbWFya2VycyA9IG5ldyBtYXBzTW9kdWxlLk1hcmtlcigpO1xuICAgICAgICAvLyAgICAgbWFya2Vycy5wb3NpdGlvbiA9IG1hcHNNb2R1bGUuUG9zaXRpb24ucG9zaXRpb25Gcm9tTGF0TG5nKC0zMy42NiwgMTUxLjIwKTtcbiAgICAgICAgLy8gICAgIG1hcmtlcnMudGl0bGUgPSBcIlNlZWVlZWVlZWVlZWVcIjtcbiAgICAgICAgLy8gICAgICg8YW55Pm1hcmtlcnMpLmluZm9XaW5kb3dUZW1wbGF0ZSA9ICd+L3NoYXJlZC9zZXJ2aWNlcy9tYXAvaW5mby13aW5kb3cnO1xuICAgICAgICAvLyAgICAgIHRoaXMubWFwVmlldy5hZGRNYXJrZXIobWFya2Vycyk7XG4gICAgICAgIC8vICAgICBtYXJrZXJzLnNob3dJbmZvV2luZG93KCk7XG5cbiAgICAgICAgcmV0dXJuIG1hcmtlcjtcbiAgICB9O1xuXG4gICAgcHJpdmF0ZSBjbGVhckdwc0xpbmUoKSB7XG4gICAgICAgIHRoaXMucmVtb3ZlTGluZSh0aGlzLmdwc0xpbmUpO1xuICAgICAgICB0aGlzLmdwc0xpbmUgPSBudWxsO1xuXG4gICAgfTtcblxuICAgIHByaXZhdGUgY2xlYXJUYXBMaW5lKCkge1xuICAgICAgICB0aGlzLnJlbW92ZUxpbmUodGhpcy50YXBMaW5lKTtcbiAgICAgICAgdGhpcy50YXBMaW5lID0gbnVsbDtcbiAgICAgICAgdGhpcy5yZW1vdmVNYXJrZXIodGhpcy50YXBNYXJrZXIpO1xuICAgICAgICB0aGlzLnRhcE1hcmtlciA9IG51bGw7XG5cbiAgICB9XG5cbiAgICBwcml2YXRlIHJlbW92ZUxpbmUobGluZTogUG9seWxpbmUpIHtcbiAgICAgICAgaWYgKGxpbmUpIHtcbiAgICAgICAgICAgIGxpbmUucmVtb3ZlQWxsUG9pbnRzKCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwcml2YXRlIHJlbW92ZU1hcmtlcihtYXJrZXI6IE1hcmtlcikge1xuICAgICAgICBpZiAodGhpcy5tYXBWaWV3ICYmIG1hcmtlcikge1xuICAgICAgICAgICAgdGhpcy5tYXBWaWV3LnJlbW92ZU1hcmtlcihtYXJrZXIpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBlcnJvcihlcnIpIHtcbiAgICAgICAgY29uc29sZS5sb2coJ0Vycm9yOiAnICsgSlNPTi5zdHJpbmdpZnkoZXJyKSk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBvbk1hcmtlclNlbGVjdChldmVudCkge1xuICAgICAgICBjb25zb2xlLmxvZygnQ2xpY2tlZCBvbiAnICsgZXZlbnQubWFya2VyLnRpdGxlKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIG9uQ2FtZXJhQ2hhbmdlZChldmVudCkge1xuICAgICAgICBjb25zb2xlLmxvZygnQ2FtZXJhIGNoYW5nZWQ6ICcgKyBKU09OLnN0cmluZ2lmeShldmVudC5jYW1lcmEpKTtcbiAgICB9XG59XG5cblxuZXhwb3J0IGNsYXNzIEFkZExpbmVBcmdzIHtcbiAgICBwdWJsaWMgY29sb3I6IENvbG9yO1xuICAgIHB1YmxpYyBsaW5lOiBQb2x5bGluZTtcbiAgICBwdWJsaWMgbG9jYXRpb246IFBvc2l0aW9uO1xuICAgIHB1YmxpYyBnZW9kZXNpYzogYm9vbGVhbjtcbiAgICBwdWJsaWMgd2lkdGg6IG51bWJlcjtcbn1cblxuZXhwb3J0IGNsYXNzIEFkZE1hcmtlckFyZ3Mge1xuICAgIHB1YmxpYyBsb2NhdGlvbjogUG9zaXRpb247XG4gICAgcHVibGljIHRpdGxlOiBzdHJpbmc7XG59XG5cbmNsYXNzIE1hcmtXcmFwcGVyIHtcbiAgICBtYXJrOiBNYXJrZXI7XG4gICAgbWFya0lkOiBudW1iZXI7XG59Il19