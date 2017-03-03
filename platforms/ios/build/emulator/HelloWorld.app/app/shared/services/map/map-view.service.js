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
        //Flag primera configuracion
        this.firstConfigurationMap = false;
        this.locationReceived = function (position) {
            if (_this.mapView && position && !_this.firstConfigurationMap) {
                _this.mapView.latitude = position.latitude;
                _this.mapView.longitude = position.longitude;
                _this.mapView.zoom = 16;
                _this.centeredOnLocation = true;
                _this.firstConfigurationMap = true;
            }
            if (_this.gpsMarker == null) {
                var mark = _this.createMark({
                    location: position,
                    title: 'GPS Location'
                }, "~/images/me-marker.png");
                var markInfo = new AddMarkerArgs();
                markInfo.title = "Principal";
                markInfo.location = position;
                var wrp = _this.createMarkWrapper(markInfo, 1234, MarkWrapperTypeEnum.Me);
                _this.markList.push(wrp);
                _this.gpsMarker = wrp;
                _this.mapView.addMarker(wrp.mark);
            }
            else {
                _this.mapView.latitude = position.latitude;
                _this.mapView.longitude = position.longitude;
                var wrp = _this.getMarkWrapper(1234);
                _this.mapView.removeMarker(wrp.mark);
                wrp.mark.position.latitude = position.latitude;
                wrp.mark.position.longitude = position.longitude;
                _this.mapView.addMarker(wrp.mark);
            }
        };
        if (!geolocation.isEnabled()) {
            geolocation.enableLocationRequest();
        }
    }
    MapViewService.prototype.ngOnInit = function () {
    };
    //Private Methods
    MapViewService.prototype.createMarkWrapper = function (markInfo, markId, markType) {
        //Creo un MarkWrapper el cual relaciona el Marker con el id del usuario dibujado
        var mark = new AddMarkerArgs();
        mark.title = markInfo.title;
        mark.location = new nativescript_google_maps_sdk_1.Position();
        mark.location.latitude = markInfo.location.latitude;
        mark.location.longitude = markInfo.location.longitude;
        var mapMark = null;
        if (markType == MarkWrapperTypeEnum.Me)
            mapMark = this.createMark(mark, "~/images/me-marker.png");
        else
            mapMark = this.createMark(mark);
        var markWrapper = new MarkWrapper(mapMark, markType);
        markWrapper.markId = markId;
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
        var markWrapper = this.createMarkWrapper(markInfo, markId, MarkWrapperTypeEnum.Friend);
        this.markList.push(markWrapper);
        this.mapView.addMarker(markWrapper.mark);
    };
    MapViewService.prototype.updateCommonMark = function (markInfo, markId) {
        var markWrapper = this.getMarkWrapper(markId);
        if (markWrapper != null) {
            // this.mapView.removeMarker(markWrapper.mark);
            markWrapper.mark.position = markInfo.location;
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
            _this.watchId = geolocation.watchLocation(function (p) { _this.locationReceived(p); }, _this.error, {
                desiredAccuracy: 50,
                updateDistance: 50,
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
    MapViewService.prototype.createMark = function (args, imgSrc) {
        if (imgSrc === void 0) { imgSrc = "~/images/friend-marker.png"; }
        if (!this.mapView || !args || !args.location)
            return;
        var mark = new nativescript_google_maps_sdk_1.Marker();
        mark.position = nativescript_google_maps_sdk_1.Position.positionFromLatLng(args.location.latitude, args.location.longitude);
        mark.title = args.title;
        mark.snippet = args.title;
        var image = new image_1.Image();
        image.src = imgSrc;
        image.width = 10;
        image.height = 10;
        mark.icon = image;
        // (<any>mark).infoWindowTemplate = '~/shared/services/map/info-window';
        // this.mapView.addMarker(mark);
        //mark.showInfoWindow();
        //   var  markers = new mapsModule.Marker();
        //     markers.position = mapsModule.Position.positionFromLatLng(-33.66, 151.20);
        //     markers.title = "Seeeeeeeeeeee";
        //     (<any>markers).infoWindowTemplate = '~/shared/services/map/info-window';
        //      this.mapView.addMarker(markers);
        //     markers.showInfoWindow();
        return mark;
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
    function MarkWrapper(mark, markType) {
        this.mark = mark;
        this.markType = markType;
    }
    return MarkWrapper;
}());
var MarkWrapperTypeEnum;
(function (MarkWrapperTypeEnum) {
    MarkWrapperTypeEnum[MarkWrapperTypeEnum["Friend"] = 0] = "Friend";
    MarkWrapperTypeEnum[MarkWrapperTypeEnum["Me"] = 1] = "Me";
    MarkWrapperTypeEnum[MarkWrapperTypeEnum["Group"] = 2] = "Group";
})(MarkWrapperTypeEnum || (MarkWrapperTypeEnum = {}));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFwLXZpZXcuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIm1hcC12aWV3LnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLHNDQUEyQztBQUUzQyxnQ0FBOEI7QUFDOUIsaUNBQStCO0FBQy9CLGtDQUFpQztBQUNqQyw2RUFBbUY7QUFDbkYsSUFBSSxVQUFVLEdBQUcsT0FBTyxDQUFDLDhCQUE4QixDQUFDLENBQUM7QUFDekQsSUFBSSxXQUFXLEdBQUcsT0FBTyxDQUFDLDBCQUEwQixDQUFDLENBQUM7QUFDdEQsSUFBSSxLQUFLLEdBQUcsT0FBTyxDQUFDLGtCQUFrQixDQUFDLENBQUM7QUFDeEMsK0JBQThCO0FBQzlCLDJFQUF5RTtBQUV6RSxJQUFhLGNBQWM7SUFVdkIsd0JBQW9CLGFBQTZCO1FBQWpELGlCQUlDO1FBSm1CLGtCQUFhLEdBQWIsYUFBYSxDQUFnQjtRQVRqRCxRQUFRO1FBQ0EsWUFBTyxHQUFZLElBQUksQ0FBQztRQUNoQyxZQUFPLEdBQVcsSUFBSSxDQUFDO1FBS3ZCLHVCQUFrQixHQUFZLEtBQUssQ0FBQztRQUM1QixhQUFRLEdBQXVCLElBQUksS0FBSyxFQUFlLENBQUM7UUEwR3hELGNBQVMsR0FBRyxVQUFDLEtBQUs7UUFDMUIsQ0FBQyxDQUFDO1FBQ0YsNEJBQTRCO1FBQ3BCLDBCQUFxQixHQUFHLEtBQUssQ0FBQztRQUM5QixxQkFBZ0IsR0FBRyxVQUFDLFFBQWtCO1lBQzFDLEVBQUUsQ0FBQyxDQUFDLEtBQUksQ0FBQyxPQUFPLElBQUksUUFBUSxJQUFJLENBQUMsS0FBSSxDQUFDLHFCQUFxQixDQUFDLENBQUMsQ0FBQztnQkFDMUQsS0FBSSxDQUFDLE9BQU8sQ0FBQyxRQUFRLEdBQUcsUUFBUSxDQUFDLFFBQVEsQ0FBQztnQkFDMUMsS0FBSSxDQUFDLE9BQU8sQ0FBQyxTQUFTLEdBQUcsUUFBUSxDQUFDLFNBQVMsQ0FBQztnQkFDNUMsS0FBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLEdBQUcsRUFBRSxDQUFDO2dCQUN2QixLQUFJLENBQUMsa0JBQWtCLEdBQUcsSUFBSSxDQUFDO2dCQUUvQixLQUFJLENBQUMscUJBQXFCLEdBQUcsSUFBSSxDQUFDO1lBQ3RDLENBQUM7WUFDRCxFQUFFLENBQUMsQ0FBQyxLQUFJLENBQUMsU0FBUyxJQUFJLElBQUksQ0FBQyxDQUFDLENBQUM7Z0JBR3pCLElBQUksSUFBSSxHQUFHLEtBQUksQ0FBQyxVQUFVLENBQUM7b0JBQ3ZCLFFBQVEsRUFBRSxRQUFRO29CQUNsQixLQUFLLEVBQUUsY0FBYztpQkFDeEIsRUFBRSx3QkFBd0IsQ0FBQyxDQUFDO2dCQUM3QixJQUFJLFFBQVEsR0FBRyxJQUFJLGFBQWEsRUFBRSxDQUFDO2dCQUNuQyxRQUFRLENBQUMsS0FBSyxHQUFHLFdBQVcsQ0FBQztnQkFDN0IsUUFBUSxDQUFDLFFBQVEsR0FBRyxRQUFRLENBQUM7Z0JBQzdCLElBQUksR0FBRyxHQUFHLEtBQUksQ0FBQyxpQkFBaUIsQ0FBQyxRQUFRLEVBQUUsSUFBSSxFQUFFLG1CQUFtQixDQUFDLEVBQUUsQ0FBQyxDQUFDO2dCQUN6RSxLQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQztnQkFDeEIsS0FBSSxDQUFDLFNBQVMsR0FBRyxHQUFHLENBQUM7Z0JBQ3JCLEtBQUksQ0FBQyxPQUFPLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQTtZQUVwQyxDQUFDO1lBQUMsSUFBSSxDQUFDLENBQUM7Z0JBQ0osS0FBSSxDQUFDLE9BQU8sQ0FBQyxRQUFRLEdBQUcsUUFBUSxDQUFDLFFBQVEsQ0FBQztnQkFDMUMsS0FBSSxDQUFDLE9BQU8sQ0FBQyxTQUFTLEdBQUcsUUFBUSxDQUFDLFNBQVMsQ0FBQztnQkFDNUMsSUFBSSxHQUFHLEdBQUcsS0FBSSxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsQ0FBQztnQkFDcEMsS0FBSSxDQUFDLE9BQU8sQ0FBQyxZQUFZLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDO2dCQUNwQyxHQUFHLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxRQUFRLEdBQUcsUUFBUSxDQUFDLFFBQVEsQ0FBQztnQkFDL0MsR0FBRyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsU0FBUyxHQUFHLFFBQVEsQ0FBQyxTQUFTLENBQUM7Z0JBQ2pELEtBQUksQ0FBQyxPQUFPLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQTtZQUVwQyxDQUFDO1FBQ0wsQ0FBQyxDQUFDO1FBOUlFLEVBQUUsQ0FBQyxDQUFDLENBQUMsV0FBVyxDQUFDLFNBQVMsRUFBRSxDQUFDLENBQUMsQ0FBQztZQUMzQixXQUFXLENBQUMscUJBQXFCLEVBQUUsQ0FBQztRQUN4QyxDQUFDO0lBQ0wsQ0FBQztJQUVELGlDQUFRLEdBQVI7SUFFQSxDQUFDO0lBRUQsaUJBQWlCO0lBQ1YsMENBQWlCLEdBQXhCLFVBQXlCLFFBQXVCLEVBQUUsTUFBYyxFQUFFLFFBQTZCO1FBQzNGLGdGQUFnRjtRQUNoRixJQUFJLElBQUksR0FBRyxJQUFJLGFBQWEsRUFBRSxDQUFDO1FBQy9CLElBQUksQ0FBQyxLQUFLLEdBQUcsUUFBUSxDQUFDLEtBQUssQ0FBQztRQUM1QixJQUFJLENBQUMsUUFBUSxHQUFHLElBQUksdUNBQVEsRUFBRSxDQUFDO1FBQy9CLElBQUksQ0FBQyxRQUFRLENBQUMsUUFBUSxHQUFHLFFBQVEsQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDO1FBQ3BELElBQUksQ0FBQyxRQUFRLENBQUMsU0FBUyxHQUFHLFFBQVEsQ0FBQyxRQUFRLENBQUMsU0FBUyxDQUFDO1FBRXRELElBQUksT0FBTyxHQUFXLElBQUksQ0FBQztRQUMzQixFQUFFLENBQUMsQ0FBQyxRQUFRLElBQUksbUJBQW1CLENBQUMsRUFBRSxDQUFDO1lBQ25DLE9BQU8sR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksRUFBRSx3QkFBd0IsQ0FBQyxDQUFDO1FBQzlELElBQUk7WUFDQSxPQUFPLEdBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUNwQyxJQUFJLFdBQVcsR0FBRyxJQUFJLFdBQVcsQ0FBQyxPQUFPLEVBQUUsUUFBUSxDQUFDLENBQUM7UUFDckQsV0FBVyxDQUFDLE1BQU0sR0FBRyxNQUFNLENBQUM7UUFDNUIsTUFBTSxDQUFDLFdBQVcsQ0FBQztJQUN2QixDQUFDO0lBQ08sdUNBQWMsR0FBdEIsVUFBdUIsTUFBYztRQUNqQywrQkFBK0I7UUFDL0IsR0FBRyxDQUFDLENBQWEsVUFBYSxFQUFiLEtBQUEsSUFBSSxDQUFDLFFBQVEsRUFBYixjQUFhLEVBQWIsSUFBYTtZQUF6QixJQUFJLElBQUksU0FBQTtZQUNULEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxNQUFNLElBQUksTUFBTSxDQUFDO2dCQUN0QixNQUFNLENBQUMsSUFBSSxDQUFDO1NBQUE7SUFFeEIsQ0FBQztJQUNELGdCQUFnQjtJQUNULHNDQUFhLEdBQXBCLFVBQXFCLFFBQXVCLEVBQUUsTUFBYztRQUN4RCxJQUFJLFdBQVcsR0FBRyxJQUFJLENBQUMsaUJBQWlCLENBQUMsUUFBUSxFQUFFLE1BQU0sRUFBRSxtQkFBbUIsQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUN2RixJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQztRQUNoQyxJQUFJLENBQUMsT0FBTyxDQUFDLFNBQVMsQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLENBQUM7SUFHN0MsQ0FBQztJQUNNLHlDQUFnQixHQUF2QixVQUF3QixRQUF1QixFQUFFLE1BQWM7UUFDM0QsSUFBSSxXQUFXLEdBQUcsSUFBSSxDQUFDLGNBQWMsQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUM5QyxFQUFFLENBQUMsQ0FBQyxXQUFXLElBQUksSUFBSSxDQUFDLENBQUMsQ0FBQztZQUN0QiwrQ0FBK0M7WUFDL0MsV0FBVyxDQUFDLElBQUksQ0FBQyxRQUFRLEdBQUcsUUFBUSxDQUFDLFFBQVEsQ0FBQztRQUdsRCxDQUFDO0lBQ0wsQ0FBQztJQUNNLHlDQUFnQixHQUF2QixVQUF3QixRQUF1QixFQUFFLE1BQWM7UUFDM0QsSUFBSSxXQUFXLEdBQUcsSUFBSSxDQUFDLGNBQWMsQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUM5QyxJQUFJLENBQUMsT0FBTyxDQUFDLFlBQVksQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDaEQsQ0FBQztJQUdPLHVDQUFjLEdBQXRCO1FBQ0ksRUFBRSxDQUFDLENBQUMsQ0FBQyxXQUFXLENBQUMsU0FBUyxFQUFFLENBQUMsQ0FBQyxDQUFDO1lBQzNCLE9BQU8sQ0FBQyxHQUFHLENBQUMsbUNBQW1DLENBQUMsQ0FBQztZQUNqRCxNQUFNLENBQUMsV0FBVyxDQUFDLHFCQUFxQixFQUFFLENBQUM7UUFDL0MsQ0FBQztRQUFDLElBQUksQ0FBQyxDQUFDO1lBQ0osTUFBTSxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDakMsQ0FBQztJQUNMLENBQUM7SUFFTyxvQ0FBVyxHQUFuQjtRQUNJLEVBQUUsQ0FBQyxDQUFDLFdBQVcsQ0FBQyxTQUFTLEVBQUUsQ0FBQyxDQUFDLENBQUM7WUFDMUIsSUFBSSxRQUFRLEdBQUcsV0FBVyxDQUFDLGtCQUFrQixDQUFDO2dCQUMxQyxlQUFlLEVBQUUsRUFBRTtnQkFDbkIsY0FBYyxFQUFFLEVBQUU7Z0JBQ2xCLGlCQUFpQixFQUFFLElBQUk7Z0JBQ3ZCLFVBQVUsRUFBRSxLQUFLO2FBQ3BCLENBQUMsQ0FBQTtZQUNGLE1BQU0sQ0FBQyxRQUFRLENBQUM7UUFDcEIsQ0FBQztRQUNELE1BQU0sQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLDBCQUEwQixDQUFDLENBQUM7SUFDdEQsQ0FBQztJQUVELFlBQVk7SUFDTCxtQ0FBVSxHQUFqQixVQUFrQixLQUFLLEVBQUUsY0FBMEI7UUFBbkQsaUJBc0JDO1FBckJHLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxPQUFPLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDO1lBQUMsTUFBTSxDQUFDO1FBQzFDLElBQUksQ0FBQyxPQUFPLEdBQUcsS0FBSyxDQUFDLE1BQU0sQ0FBQztRQUM1QixJQUFJLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUM3QixvQ0FBb0M7UUFDcEMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxjQUFjLEdBQUc7WUFDMUIsY0FBYyxFQUFFLENBQUM7UUFDckIsQ0FBQyxDQUFBO1FBQ0QsbURBQW1EO1FBQ25ELHFEQUFxRDtRQUNyRCxJQUFJLENBQUMsY0FBYyxFQUFFO2FBQ2hCLElBQUksQ0FBQztZQUNGLElBQUksUUFBUSxHQUFHLEtBQUksQ0FBQyxXQUFXLEVBQUUsQ0FBQztRQUN0QyxDQUFDLENBQUM7YUFDRCxJQUFJLENBQUM7WUFDRixLQUFJLENBQUMsT0FBTyxHQUFHLFdBQVcsQ0FBQyxhQUFhLENBQUMsVUFBQyxDQUFDLElBQU8sS0FBSSxDQUFDLGdCQUFnQixDQUFDLENBQUMsQ0FBQyxDQUFBLENBQUMsQ0FBQyxFQUFFLEtBQUksQ0FBQyxLQUFLLEVBQUU7Z0JBQ3RGLGVBQWUsRUFBRSxFQUFFO2dCQUNuQixjQUFjLEVBQUUsRUFBRTtnQkFDbEIsaUJBQWlCLEVBQUUsS0FBSztnQkFDeEIsVUFBVSxFQUFFLEtBQUs7YUFDcEIsQ0FBQyxDQUFDO1FBQ1AsQ0FBQyxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUN2QixDQUFDO0lBQUEsQ0FBQztJQTBDTSx1Q0FBYyxHQUF0QixVQUF1QixJQUFpQjtRQUNwQyxFQUFFLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxPQUFPLElBQUksQ0FBQyxJQUFJLElBQUksQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDO1lBQUMsTUFBTSxDQUFDO1FBRXJELElBQUksSUFBSSxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUM7UUFFckIsRUFBRSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO1lBQ1IsSUFBSSxHQUFHLElBQUksdUNBQVEsRUFBRSxDQUFDO1lBQ3RCLElBQUksQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDO1lBQ3BCLElBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDLEtBQUssSUFBSSxFQUFFLENBQUM7WUFDOUIsSUFBSSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUMsS0FBSyxJQUFJLElBQUksYUFBSyxDQUFDLEtBQUssQ0FBQyxDQUFDO1lBQzVDLElBQUksQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDLFFBQVEsSUFBSSxTQUFTLEdBQUcsSUFBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUM7WUFDbEUsSUFBSSxDQUFDLE9BQU8sQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDbkMsQ0FBQztRQUNELElBQUksQ0FBQyxRQUFRLENBQUMsdUNBQVEsQ0FBQyxrQkFBa0IsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLFFBQVEsRUFBRSxJQUFJLENBQUMsUUFBUSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUM7UUFFNUYsTUFBTSxDQUFDLElBQUksQ0FBQztJQUNoQixDQUFDO0lBQ08sbUNBQVUsR0FBbEIsVUFBbUIsSUFBbUIsRUFBRSxNQUE2QztRQUE3Qyx1QkFBQSxFQUFBLHFDQUE2QztRQUNqRixFQUFFLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxPQUFPLElBQUksQ0FBQyxJQUFJLElBQUksQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDO1lBQUMsTUFBTSxDQUFDO1FBRXJELElBQUksSUFBSSxHQUFHLElBQUkscUNBQU0sRUFBRSxDQUFDO1FBQ3hCLElBQUksQ0FBQyxRQUFRLEdBQUcsdUNBQVEsQ0FBQyxrQkFBa0IsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLFFBQVEsRUFBRSxJQUFJLENBQUMsUUFBUSxDQUFDLFNBQVMsQ0FBQyxDQUFDO1FBQzdGLElBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQztRQUN4QixJQUFJLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUM7UUFDMUIsSUFBSSxLQUFLLEdBQUcsSUFBSSxhQUFLLEVBQUUsQ0FBQztRQUN4QixLQUFLLENBQUMsR0FBRyxHQUFHLE1BQU0sQ0FBQztRQUNuQixLQUFLLENBQUMsS0FBSyxHQUFHLEVBQUUsQ0FBQztRQUNqQixLQUFLLENBQUMsTUFBTSxHQUFHLEVBQUUsQ0FBQztRQUNsQixJQUFJLENBQUMsSUFBSSxHQUFHLEtBQUssQ0FBQztRQUVsQix3RUFBd0U7UUFDeEUsZ0NBQWdDO1FBQ2hDLHdCQUF3QjtRQUV4Qiw0Q0FBNEM7UUFDNUMsaUZBQWlGO1FBQ2pGLHVDQUF1QztRQUN2QywrRUFBK0U7UUFDL0Usd0NBQXdDO1FBQ3hDLGdDQUFnQztRQUVoQyxNQUFNLENBQUMsSUFBSSxDQUFDO0lBQ2hCLENBQUM7SUFBQSxDQUFDO0lBRU0scUNBQVksR0FBcEI7UUFDSSxJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUM5QixJQUFJLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQztJQUV4QixDQUFDO0lBQUEsQ0FBQztJQUVNLHFDQUFZLEdBQXBCO1FBQ0ksSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUM7UUFDOUIsSUFBSSxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUM7UUFDcEIsSUFBSSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUM7UUFDbEMsSUFBSSxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUM7SUFFMUIsQ0FBQztJQUVPLG1DQUFVLEdBQWxCLFVBQW1CLElBQWM7UUFDN0IsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztZQUNQLElBQUksQ0FBQyxlQUFlLEVBQUUsQ0FBQztRQUMzQixDQUFDO0lBQ0wsQ0FBQztJQUVPLHFDQUFZLEdBQXBCLFVBQXFCLE1BQWM7UUFDL0IsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLE9BQU8sSUFBSSxNQUFNLENBQUMsQ0FBQyxDQUFDO1lBQ3pCLElBQUksQ0FBQyxPQUFPLENBQUMsWUFBWSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQ3RDLENBQUM7SUFDTCxDQUFDO0lBRU8sOEJBQUssR0FBYixVQUFjLEdBQUc7UUFDYixPQUFPLENBQUMsR0FBRyxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7SUFDakQsQ0FBQztJQUVPLHVDQUFjLEdBQXRCLFVBQXVCLEtBQUs7UUFDeEIsT0FBTyxDQUFDLEdBQUcsQ0FBQyxhQUFhLEdBQUcsS0FBSyxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUNwRCxDQUFDO0lBRU8sd0NBQWUsR0FBdkIsVUFBd0IsS0FBSztRQUN6QixPQUFPLENBQUMsR0FBRyxDQUFDLGtCQUFrQixHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUM7SUFDbkUsQ0FBQztJQUNMLHFCQUFDO0FBQUQsQ0FBQyxBQTVPRCxJQTRPQztBQTVPWSxjQUFjO0lBRDFCLGlCQUFVLEVBQUU7cUNBVzBCLGdDQUFjO0dBVnhDLGNBQWMsQ0E0TzFCO0FBNU9ZLHdDQUFjO0FBK08zQjtJQUFBO0lBTUEsQ0FBQztJQUFELGtCQUFDO0FBQUQsQ0FBQyxBQU5ELElBTUM7QUFOWSxrQ0FBVztBQVF4QjtJQUFBO0lBR0EsQ0FBQztJQUFELG9CQUFDO0FBQUQsQ0FBQyxBQUhELElBR0M7QUFIWSxzQ0FBYTtBQUsxQjtJQUVJLHFCQUFtQixJQUFZLEVBQVUsUUFBNkI7UUFBbkQsU0FBSSxHQUFKLElBQUksQ0FBUTtRQUFVLGFBQVEsR0FBUixRQUFRLENBQXFCO0lBQUksQ0FBQztJQUMvRSxrQkFBQztBQUFELENBQUMsQUFIRCxJQUdDO0FBQ0QsSUFBSyxtQkFJSjtBQUpELFdBQUssbUJBQW1CO0lBQ3BCLGlFQUFNLENBQUE7SUFDTix5REFBRSxDQUFBO0lBQ0YsK0RBQUssQ0FBQTtBQUNULENBQUMsRUFKSSxtQkFBbUIsS0FBbkIsbUJBQW1CLFFBSXZCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XG5pbXBvcnQgeyBPYnNlcnZhYmxlIH0gZnJvbSBcInJ4anMvUnhcIjtcbmltcG9ydCBcInJ4anMvYWRkL29wZXJhdG9yL2RvXCI7XG5pbXBvcnQgXCJyeGpzL2FkZC9vcGVyYXRvci9tYXBcIjtcbmltcG9ydCB7IEltYWdlIH0gZnJvbSBcInVpL2ltYWdlXCI7XG5pbXBvcnQgeyBNYXBWaWV3LCBNYXJrZXIsIFBvbHlsaW5lLCBQb3NpdGlvbiB9IGZyb20gJ25hdGl2ZXNjcmlwdC1nb29nbGUtbWFwcy1zZGsnO1xudmFyIG1hcHNNb2R1bGUgPSByZXF1aXJlKFwibmF0aXZlc2NyaXB0LWdvb2dsZS1tYXBzLXNka1wiKTtcbmxldCBnZW9sb2NhdGlvbiA9IHJlcXVpcmUoJ25hdGl2ZXNjcmlwdC1nZW9sb2NhdGlvbicpO1xudmFyIHN0eWxlID0gcmVxdWlyZSgnLi9tYXAtc3R5bGUuanNvbicpO1xuaW1wb3J0IHsgQ29sb3IgfSBmcm9tICdjb2xvcic7XG5pbXBvcnQgeyBGcmllbmRzU2VydmljZSB9IGZyb20gJy4uLy4uLy4uL3NoYXJlZC9mcmllbmRzL2ZyaWVuZHMuc2VydmljZSc7XG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgTWFwVmlld1NlcnZpY2Uge1xuICAgIC8vI01hcGEgXG4gICAgcHJpdmF0ZSBtYXBWaWV3OiBNYXBWaWV3ID0gbnVsbDtcbiAgICB3YXRjaElkOiBudW1iZXIgPSBudWxsO1xuICAgIGdwc0xpbmU6IFBvbHlsaW5lO1xuICAgIHRhcExpbmU6IFBvbHlsaW5lO1xuICAgIHRhcE1hcmtlcjogYW55O1xuICAgIGdwc01hcmtlcjogTWFya1dyYXBwZXI7XG4gICAgY2VudGVyZWRPbkxvY2F0aW9uOiBib29sZWFuID0gZmFsc2U7XG4gICAgcHJpdmF0ZSBtYXJrTGlzdDogQXJyYXk8TWFya1dyYXBwZXI+ID0gbmV3IEFycmF5PE1hcmtXcmFwcGVyPigpO1xuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgZnJpZW5kU2VydmljZTogRnJpZW5kc1NlcnZpY2UpIHtcbiAgICAgICAgaWYgKCFnZW9sb2NhdGlvbi5pc0VuYWJsZWQoKSkge1xuICAgICAgICAgICAgZ2VvbG9jYXRpb24uZW5hYmxlTG9jYXRpb25SZXF1ZXN0KCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBuZ09uSW5pdCgpIHtcblxuICAgIH1cblxuICAgIC8vUHJpdmF0ZSBNZXRob2RzXG4gICAgcHVibGljIGNyZWF0ZU1hcmtXcmFwcGVyKG1hcmtJbmZvOiBBZGRNYXJrZXJBcmdzLCBtYXJrSWQ6IG51bWJlciwgbWFya1R5cGU6IE1hcmtXcmFwcGVyVHlwZUVudW0pOiBNYXJrV3JhcHBlciB7XG4gICAgICAgIC8vQ3JlbyB1biBNYXJrV3JhcHBlciBlbCBjdWFsIHJlbGFjaW9uYSBlbCBNYXJrZXIgY29uIGVsIGlkIGRlbCB1c3VhcmlvIGRpYnVqYWRvXG4gICAgICAgIHZhciBtYXJrID0gbmV3IEFkZE1hcmtlckFyZ3MoKTtcbiAgICAgICAgbWFyay50aXRsZSA9IG1hcmtJbmZvLnRpdGxlO1xuICAgICAgICBtYXJrLmxvY2F0aW9uID0gbmV3IFBvc2l0aW9uKCk7XG4gICAgICAgIG1hcmsubG9jYXRpb24ubGF0aXR1ZGUgPSBtYXJrSW5mby5sb2NhdGlvbi5sYXRpdHVkZTtcbiAgICAgICAgbWFyay5sb2NhdGlvbi5sb25naXR1ZGUgPSBtYXJrSW5mby5sb2NhdGlvbi5sb25naXR1ZGU7XG5cbiAgICAgICAgdmFyIG1hcE1hcms6IE1hcmtlciA9IG51bGw7XG4gICAgICAgIGlmIChtYXJrVHlwZSA9PSBNYXJrV3JhcHBlclR5cGVFbnVtLk1lKVxuICAgICAgICAgICAgbWFwTWFyayA9IHRoaXMuY3JlYXRlTWFyayhtYXJrLCBcIn4vaW1hZ2VzL21lLW1hcmtlci5wbmdcIik7XG4gICAgICAgIGVsc2VcbiAgICAgICAgICAgIG1hcE1hcmsgPSB0aGlzLmNyZWF0ZU1hcmsobWFyayk7XG4gICAgICAgIHZhciBtYXJrV3JhcHBlciA9IG5ldyBNYXJrV3JhcHBlcihtYXBNYXJrLCBtYXJrVHlwZSk7XG4gICAgICAgIG1hcmtXcmFwcGVyLm1hcmtJZCA9IG1hcmtJZDtcbiAgICAgICAgcmV0dXJuIG1hcmtXcmFwcGVyO1xuICAgIH1cbiAgICBwcml2YXRlIGdldE1hcmtXcmFwcGVyKG1hcmtJZDogbnVtYmVyKTogTWFya1dyYXBwZXIge1xuICAgICAgICAvL1JlZ3Jlc28gdW4gbWFya1dyYXBwZXIgcG9yIElEXG4gICAgICAgIGZvciAodmFyIGl0ZW0gb2YgdGhpcy5tYXJrTGlzdClcbiAgICAgICAgICAgIGlmIChpdGVtLm1hcmtJZCA9PSBtYXJrSWQpXG4gICAgICAgICAgICAgICAgcmV0dXJuIGl0ZW07XG5cbiAgICB9XG4gICAgLy9QdWJsaWMgTWV0aG9kc1xuICAgIHB1YmxpYyBhZGRDb21tb25NYXJrKG1hcmtJbmZvOiBBZGRNYXJrZXJBcmdzLCBtYXJrSWQ6IG51bWJlcik6IHZvaWQge1xuICAgICAgICB2YXIgbWFya1dyYXBwZXIgPSB0aGlzLmNyZWF0ZU1hcmtXcmFwcGVyKG1hcmtJbmZvLCBtYXJrSWQsIE1hcmtXcmFwcGVyVHlwZUVudW0uRnJpZW5kKTtcbiAgICAgICAgdGhpcy5tYXJrTGlzdC5wdXNoKG1hcmtXcmFwcGVyKTtcbiAgICAgICAgdGhpcy5tYXBWaWV3LmFkZE1hcmtlcihtYXJrV3JhcHBlci5tYXJrKTtcblxuXG4gICAgfVxuICAgIHB1YmxpYyB1cGRhdGVDb21tb25NYXJrKG1hcmtJbmZvOiBBZGRNYXJrZXJBcmdzLCBtYXJrSWQ6IG51bWJlcik6IHZvaWQge1xuICAgICAgICB2YXIgbWFya1dyYXBwZXIgPSB0aGlzLmdldE1hcmtXcmFwcGVyKG1hcmtJZCk7XG4gICAgICAgIGlmIChtYXJrV3JhcHBlciAhPSBudWxsKSB7XG4gICAgICAgICAgICAvLyB0aGlzLm1hcFZpZXcucmVtb3ZlTWFya2VyKG1hcmtXcmFwcGVyLm1hcmspO1xuICAgICAgICAgICAgbWFya1dyYXBwZXIubWFyay5wb3NpdGlvbiA9IG1hcmtJbmZvLmxvY2F0aW9uO1xuICAgICAgICAgICAgLy8gdGhpcy5tYXBWaWV3LmFkZE1hcmtlcihtYXJrV3JhcHBlci5tYXJrKTtcblxuICAgICAgICB9XG4gICAgfVxuICAgIHB1YmxpYyByZW1vdmVDb21tb25NYXJrKG1hcmtJbmZvOiBBZGRNYXJrZXJBcmdzLCBtYXJrSWQ6IG51bWJlcik6IHZvaWQge1xuICAgICAgICB2YXIgbWFya1dyYXBwZXIgPSB0aGlzLmdldE1hcmtXcmFwcGVyKG1hcmtJZCk7XG4gICAgICAgIHRoaXMubWFwVmlldy5yZW1vdmVNYXJrZXIobWFya1dyYXBwZXIubWFyayk7XG4gICAgfVxuXG5cbiAgICBwcml2YXRlIGVuYWJsZUxvY2F0aW9uKCkge1xuICAgICAgICBpZiAoIWdlb2xvY2F0aW9uLmlzRW5hYmxlZCgpKSB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZygnTG9jYXRpb24gbm90IGVuYWJsZWQsIHJlcXVlc3RpbmcuJyk7XG4gICAgICAgICAgICByZXR1cm4gZ2VvbG9jYXRpb24uZW5hYmxlTG9jYXRpb25SZXF1ZXN0KCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKHRydWUpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBnZXRMb2NhdGlvbigpIHtcbiAgICAgICAgaWYgKGdlb2xvY2F0aW9uLmlzRW5hYmxlZCgpKSB7XG4gICAgICAgICAgICB2YXIgbG9jYXRpb24gPSBnZW9sb2NhdGlvbi5nZXRDdXJyZW50TG9jYXRpb24oe1xuICAgICAgICAgICAgICAgIGRlc2lyZWRBY2N1cmFjeTogMTAsXG4gICAgICAgICAgICAgICAgdXBkYXRlRGlzdGFuY2U6IDEwLFxuICAgICAgICAgICAgICAgIG1pbmltdW1VcGRhdGVUaW1lOiAxMDAwLFxuICAgICAgICAgICAgICAgIG1heGltdW1BZ2U6IDEwMDAwXG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgcmV0dXJuIGxvY2F0aW9uO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBQcm9taXNlLnJlamVjdCgnR2VvbG9jYXRpb24gbm90IGVuYWJsZWQuJyk7XG4gICAgfVxuXG4gICAgLy9NYXAgZXZlbnRzXG4gICAgcHVibGljIG9uTWFwUmVhZHkoZXZlbnQsIG1hcFJlYWR5Tm90aWZ5OiAoKSA9PiB2b2lkKSB7XG4gICAgICAgIGlmICh0aGlzLm1hcFZpZXcgfHwgIWV2ZW50Lm9iamVjdCkgcmV0dXJuO1xuICAgICAgICB0aGlzLm1hcFZpZXcgPSBldmVudC5vYmplY3Q7XG4gICAgICAgIHRoaXMubWFwVmlldy5zZXRTdHlsZShzdHlsZSk7XG4gICAgICAgIC8vTm90aWZpY28gY3VhbmRvIGVsIG1hcGEgZXN0YSBsaXN0b1xuICAgICAgICB0aGlzLm1hcFZpZXcubm90aWZ5TWFwUmVhZHkgPSAoKSA9PiB7XG4gICAgICAgICAgICBtYXBSZWFkeU5vdGlmeSgpO1xuICAgICAgICB9XG4gICAgICAgIC8vIHRoaXMubWFwVmlldy5tYXJrZXJTZWxlY3QgPSB0aGlzLm9uTWFya2VyU2VsZWN0O1xuICAgICAgICAvLyB0aGlzLm1hcFZpZXcuY2FtZXJhQ2hhbmdlZCA9IHRoaXMub25DYW1lcmFDaGFuZ2VkO1xuICAgICAgICB0aGlzLmVuYWJsZUxvY2F0aW9uKClcbiAgICAgICAgICAgIC50aGVuKCgpID0+IHtcbiAgICAgICAgICAgICAgICB2YXIgbG9jYXRpb24gPSB0aGlzLmdldExvY2F0aW9uKCk7XG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgLnRoZW4oKCkgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMud2F0Y2hJZCA9IGdlb2xvY2F0aW9uLndhdGNoTG9jYXRpb24oKHApID0+IHsgdGhpcy5sb2NhdGlvblJlY2VpdmVkKHApIH0sIHRoaXMuZXJyb3IsIHtcbiAgICAgICAgICAgICAgICAgICAgZGVzaXJlZEFjY3VyYWN5OiA1MCxcbiAgICAgICAgICAgICAgICAgICAgdXBkYXRlRGlzdGFuY2U6IDUwLFxuICAgICAgICAgICAgICAgICAgICBtaW5pbXVtVXBkYXRlVGltZTogMTAwMDAsXG4gICAgICAgICAgICAgICAgICAgIG1heGltdW1BZ2U6IDYwMDAwXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9LCB0aGlzLmVycm9yKTtcbiAgICB9O1xuXG4gICAgcHJpdmF0ZSBtYXBUYXBwZWQgPSAoZXZlbnQpID0+IHtcbiAgICB9O1xuICAgIC8vRmxhZyBwcmltZXJhIGNvbmZpZ3VyYWNpb25cbiAgICBwcml2YXRlIGZpcnN0Q29uZmlndXJhdGlvbk1hcCA9IGZhbHNlO1xuICAgIHByaXZhdGUgbG9jYXRpb25SZWNlaXZlZCA9IChwb3NpdGlvbjogUG9zaXRpb24pID0+IHtcbiAgICAgICAgaWYgKHRoaXMubWFwVmlldyAmJiBwb3NpdGlvbiAmJiAhdGhpcy5maXJzdENvbmZpZ3VyYXRpb25NYXApIHtcbiAgICAgICAgICAgIHRoaXMubWFwVmlldy5sYXRpdHVkZSA9IHBvc2l0aW9uLmxhdGl0dWRlO1xuICAgICAgICAgICAgdGhpcy5tYXBWaWV3LmxvbmdpdHVkZSA9IHBvc2l0aW9uLmxvbmdpdHVkZTtcbiAgICAgICAgICAgIHRoaXMubWFwVmlldy56b29tID0gMTY7XG4gICAgICAgICAgICB0aGlzLmNlbnRlcmVkT25Mb2NhdGlvbiA9IHRydWU7XG5cbiAgICAgICAgICAgIHRoaXMuZmlyc3RDb25maWd1cmF0aW9uTWFwID0gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgICBpZiAodGhpcy5ncHNNYXJrZXIgPT0gbnVsbCkge1xuXG5cbiAgICAgICAgICAgIHZhciBtYXJrID0gdGhpcy5jcmVhdGVNYXJrKHtcbiAgICAgICAgICAgICAgICBsb2NhdGlvbjogcG9zaXRpb24sXG4gICAgICAgICAgICAgICAgdGl0bGU6ICdHUFMgTG9jYXRpb24nXG4gICAgICAgICAgICB9LCBcIn4vaW1hZ2VzL21lLW1hcmtlci5wbmdcIik7XG4gICAgICAgICAgICB2YXIgbWFya0luZm8gPSBuZXcgQWRkTWFya2VyQXJncygpO1xuICAgICAgICAgICAgbWFya0luZm8udGl0bGUgPSBcIlByaW5jaXBhbFwiO1xuICAgICAgICAgICAgbWFya0luZm8ubG9jYXRpb24gPSBwb3NpdGlvbjtcbiAgICAgICAgICAgIHZhciB3cnAgPSB0aGlzLmNyZWF0ZU1hcmtXcmFwcGVyKG1hcmtJbmZvLCAxMjM0LCBNYXJrV3JhcHBlclR5cGVFbnVtLk1lKTtcbiAgICAgICAgICAgIHRoaXMubWFya0xpc3QucHVzaCh3cnApO1xuICAgICAgICAgICAgdGhpcy5ncHNNYXJrZXIgPSB3cnA7XG4gICAgICAgICAgICB0aGlzLm1hcFZpZXcuYWRkTWFya2VyKHdycC5tYXJrKVxuXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLm1hcFZpZXcubGF0aXR1ZGUgPSBwb3NpdGlvbi5sYXRpdHVkZTtcbiAgICAgICAgICAgIHRoaXMubWFwVmlldy5sb25naXR1ZGUgPSBwb3NpdGlvbi5sb25naXR1ZGU7XG4gICAgICAgICAgICB2YXIgd3JwID0gdGhpcy5nZXRNYXJrV3JhcHBlcigxMjM0KTtcbiAgICAgICAgICAgIHRoaXMubWFwVmlldy5yZW1vdmVNYXJrZXIod3JwLm1hcmspO1xuICAgICAgICAgICAgd3JwLm1hcmsucG9zaXRpb24ubGF0aXR1ZGUgPSBwb3NpdGlvbi5sYXRpdHVkZTtcbiAgICAgICAgICAgIHdycC5tYXJrLnBvc2l0aW9uLmxvbmdpdHVkZSA9IHBvc2l0aW9uLmxvbmdpdHVkZTtcbiAgICAgICAgICAgIHRoaXMubWFwVmlldy5hZGRNYXJrZXIod3JwLm1hcmspXG5cbiAgICAgICAgfVxuICAgIH07XG5cbiAgICBwcml2YXRlIGFkZFBvaW50VG9MaW5lKGFyZ3M6IEFkZExpbmVBcmdzKSB7XG4gICAgICAgIGlmICghdGhpcy5tYXBWaWV3IHx8ICFhcmdzIHx8ICFhcmdzLmxvY2F0aW9uKSByZXR1cm47XG5cbiAgICAgICAgbGV0IGxpbmUgPSBhcmdzLmxpbmU7XG5cbiAgICAgICAgaWYgKCFsaW5lKSB7XG4gICAgICAgICAgICBsaW5lID0gbmV3IFBvbHlsaW5lKCk7XG4gICAgICAgICAgICBsaW5lLnZpc2libGUgPSB0cnVlO1xuICAgICAgICAgICAgbGluZS53aWR0aCA9IGFyZ3Mud2lkdGggfHwgMTA7XG4gICAgICAgICAgICBsaW5lLmNvbG9yID0gYXJncy5jb2xvciB8fCBuZXcgQ29sb3IoJ1JlZCcpO1xuICAgICAgICAgICAgbGluZS5nZW9kZXNpYyA9IGFyZ3MuZ2VvZGVzaWMgIT0gdW5kZWZpbmVkID8gYXJncy5nZW9kZXNpYyA6IHRydWU7XG4gICAgICAgICAgICB0aGlzLm1hcFZpZXcuYWRkUG9seWxpbmUobGluZSk7XG4gICAgICAgIH1cbiAgICAgICAgbGluZS5hZGRQb2ludChQb3NpdGlvbi5wb3NpdGlvbkZyb21MYXRMbmcoYXJncy5sb2NhdGlvbi5sYXRpdHVkZSwgYXJncy5sb2NhdGlvbi5sb25naXR1ZGUpKTtcblxuICAgICAgICByZXR1cm4gbGluZTtcbiAgICB9XG4gICAgcHJpdmF0ZSBjcmVhdGVNYXJrKGFyZ3M6IEFkZE1hcmtlckFyZ3MsIGltZ1NyYzogc3RyaW5nID0gXCJ+L2ltYWdlcy9mcmllbmQtbWFya2VyLnBuZ1wiKTogTWFya2VyIHtcbiAgICAgICAgaWYgKCF0aGlzLm1hcFZpZXcgfHwgIWFyZ3MgfHwgIWFyZ3MubG9jYXRpb24pIHJldHVybjtcblxuICAgICAgICBsZXQgbWFyayA9IG5ldyBNYXJrZXIoKTtcbiAgICAgICAgbWFyay5wb3NpdGlvbiA9IFBvc2l0aW9uLnBvc2l0aW9uRnJvbUxhdExuZyhhcmdzLmxvY2F0aW9uLmxhdGl0dWRlLCBhcmdzLmxvY2F0aW9uLmxvbmdpdHVkZSk7XG4gICAgICAgIG1hcmsudGl0bGUgPSBhcmdzLnRpdGxlO1xuICAgICAgICBtYXJrLnNuaXBwZXQgPSBhcmdzLnRpdGxlO1xuICAgICAgICB2YXIgaW1hZ2UgPSBuZXcgSW1hZ2UoKTtcbiAgICAgICAgaW1hZ2Uuc3JjID0gaW1nU3JjO1xuICAgICAgICBpbWFnZS53aWR0aCA9IDEwO1xuICAgICAgICBpbWFnZS5oZWlnaHQgPSAxMDtcbiAgICAgICAgbWFyay5pY29uID0gaW1hZ2U7XG5cbiAgICAgICAgLy8gKDxhbnk+bWFyaykuaW5mb1dpbmRvd1RlbXBsYXRlID0gJ34vc2hhcmVkL3NlcnZpY2VzL21hcC9pbmZvLXdpbmRvdyc7XG4gICAgICAgIC8vIHRoaXMubWFwVmlldy5hZGRNYXJrZXIobWFyayk7XG4gICAgICAgIC8vbWFyay5zaG93SW5mb1dpbmRvdygpO1xuXG4gICAgICAgIC8vICAgdmFyICBtYXJrZXJzID0gbmV3IG1hcHNNb2R1bGUuTWFya2VyKCk7XG4gICAgICAgIC8vICAgICBtYXJrZXJzLnBvc2l0aW9uID0gbWFwc01vZHVsZS5Qb3NpdGlvbi5wb3NpdGlvbkZyb21MYXRMbmcoLTMzLjY2LCAxNTEuMjApO1xuICAgICAgICAvLyAgICAgbWFya2Vycy50aXRsZSA9IFwiU2VlZWVlZWVlZWVlZVwiO1xuICAgICAgICAvLyAgICAgKDxhbnk+bWFya2VycykuaW5mb1dpbmRvd1RlbXBsYXRlID0gJ34vc2hhcmVkL3NlcnZpY2VzL21hcC9pbmZvLXdpbmRvdyc7XG4gICAgICAgIC8vICAgICAgdGhpcy5tYXBWaWV3LmFkZE1hcmtlcihtYXJrZXJzKTtcbiAgICAgICAgLy8gICAgIG1hcmtlcnMuc2hvd0luZm9XaW5kb3coKTtcblxuICAgICAgICByZXR1cm4gbWFyaztcbiAgICB9O1xuXG4gICAgcHJpdmF0ZSBjbGVhckdwc0xpbmUoKSB7XG4gICAgICAgIHRoaXMucmVtb3ZlTGluZSh0aGlzLmdwc0xpbmUpO1xuICAgICAgICB0aGlzLmdwc0xpbmUgPSBudWxsO1xuXG4gICAgfTtcblxuICAgIHByaXZhdGUgY2xlYXJUYXBMaW5lKCkge1xuICAgICAgICB0aGlzLnJlbW92ZUxpbmUodGhpcy50YXBMaW5lKTtcbiAgICAgICAgdGhpcy50YXBMaW5lID0gbnVsbDtcbiAgICAgICAgdGhpcy5yZW1vdmVNYXJrZXIodGhpcy50YXBNYXJrZXIpO1xuICAgICAgICB0aGlzLnRhcE1hcmtlciA9IG51bGw7XG5cbiAgICB9XG5cbiAgICBwcml2YXRlIHJlbW92ZUxpbmUobGluZTogUG9seWxpbmUpIHtcbiAgICAgICAgaWYgKGxpbmUpIHtcbiAgICAgICAgICAgIGxpbmUucmVtb3ZlQWxsUG9pbnRzKCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwcml2YXRlIHJlbW92ZU1hcmtlcihtYXJrZXI6IE1hcmtlcikge1xuICAgICAgICBpZiAodGhpcy5tYXBWaWV3ICYmIG1hcmtlcikge1xuICAgICAgICAgICAgdGhpcy5tYXBWaWV3LnJlbW92ZU1hcmtlcihtYXJrZXIpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBlcnJvcihlcnIpIHtcbiAgICAgICAgY29uc29sZS5sb2coJ0Vycm9yOiAnICsgSlNPTi5zdHJpbmdpZnkoZXJyKSk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBvbk1hcmtlclNlbGVjdChldmVudCkge1xuICAgICAgICBjb25zb2xlLmxvZygnQ2xpY2tlZCBvbiAnICsgZXZlbnQubWFya2VyLnRpdGxlKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIG9uQ2FtZXJhQ2hhbmdlZChldmVudCkge1xuICAgICAgICBjb25zb2xlLmxvZygnQ2FtZXJhIGNoYW5nZWQ6ICcgKyBKU09OLnN0cmluZ2lmeShldmVudC5jYW1lcmEpKTtcbiAgICB9XG59XG5cblxuZXhwb3J0IGNsYXNzIEFkZExpbmVBcmdzIHtcbiAgICBwdWJsaWMgY29sb3I6IENvbG9yO1xuICAgIHB1YmxpYyBsaW5lOiBQb2x5bGluZTtcbiAgICBwdWJsaWMgbG9jYXRpb246IFBvc2l0aW9uO1xuICAgIHB1YmxpYyBnZW9kZXNpYzogYm9vbGVhbjtcbiAgICBwdWJsaWMgd2lkdGg6IG51bWJlcjtcbn1cblxuZXhwb3J0IGNsYXNzIEFkZE1hcmtlckFyZ3Mge1xuICAgIHB1YmxpYyBsb2NhdGlvbjogUG9zaXRpb247XG4gICAgcHVibGljIHRpdGxlOiBzdHJpbmc7XG59XG5cbmNsYXNzIE1hcmtXcmFwcGVyIHtcbiAgICBtYXJrSWQ6IG51bWJlcjtcbiAgICBjb25zdHJ1Y3RvcihwdWJsaWMgbWFyazogTWFya2VyLCBwcml2YXRlIG1hcmtUeXBlOiBNYXJrV3JhcHBlclR5cGVFbnVtKSB7IH1cbn1cbmVudW0gTWFya1dyYXBwZXJUeXBlRW51bSB7XG4gICAgRnJpZW5kLFxuICAgIE1lLFxuICAgIEdyb3VwXG59Il19