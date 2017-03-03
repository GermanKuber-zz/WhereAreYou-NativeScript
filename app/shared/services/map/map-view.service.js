"use strict";
var core_1 = require("@angular/core");
var Rx_1 = require("rxjs/Rx");
require("rxjs/add/operator/do");
require("rxjs/add/operator/map");
require("rxjs/add/operator/catch");
var image_1 = require("ui/image");
var nativescript_google_maps_sdk_1 = require("nativescript-google-maps-sdk");
var mapsModule = require("nativescript-google-maps-sdk");
var geolocation = require('nativescript-geolocation');
var style = require('./map-style.json');
var color_1 = require("color");
var friends_service_1 = require("../../../shared/friends/friends.service");
var http_1 = require("@angular/http");
var MapViewService = (function () {
    function MapViewService(friendService, http) {
        var _this = this;
        this.friendService = friendService;
        this.http = http;
        //#Mapa 
        this.mapView = null;
        this.watchId = null;
        this.centeredOnLocation = false;
        this.markList = new Array();
        this.first = true;
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
                // this.gpsLine = this.addPointToLine({
                //     color: new Color('Green'),
                //     line: this.gpsLine,
                //     location: position,
                //     geodesic: true,
                //     width: 10
                // });
                _this.getDistance(_this.markList[0].mark.position, wrp.mark.position);
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
        var _this = this;
        var markWrapper = this.getMarkWrapper(markId);
        if (markWrapper != null) {
            // this.mapView.removeMarker(markWrapper.mark);
            markWrapper.mark.position = markInfo.location;
            // this.mapView.addMarker(markWrapper.mark);
            if (this.first) {
                this.first = false;
                this.getHeroes().subscribe(function (x) {
                    var response = x.json();
                    for (var _i = 0, _a = response.routes[0].legs[0].steps; _i < _a.length; _i++) {
                        var item = _a[_i];
                        var start = item.start_location;
                        var end = item.end_location;
                        var position = nativescript_google_maps_sdk_1.Position.positionFromLatLng(start.lat, start.lng);
                        _this.gpsLine = _this.addPointToLine({
                            color: new color_1.Color('Pink'),
                            line: _this.gpsLine,
                            location: position,
                            geodesic: true,
                            width: 10
                        });
                        position = nativescript_google_maps_sdk_1.Position.positionFromLatLng(end.lat, end.lng);
                        _this.gpsLine = _this.addPointToLine({
                            color: new color_1.Color('Pink'),
                            line: _this.gpsLine,
                            location: position,
                            geodesic: true,
                            width: 10
                        });
                    }
                });
            }
        }
    };
    MapViewService.prototype.getHeroes = function () {
        return this.http.get("https://maps.googleapis.com/maps/api/directions/json?origin=Toronto&destination=Montreal&avoid=highways&mode=driving&key=AIzaSyC1ZzjAD91N4cf6CKon2aiNAFoju9V6R3I")
            .catch(this.handleError);
    };
    MapViewService.prototype.handleError = function (error) {
        // In a real world app, we might use a remote logging infrastructure
        var errMsg;
        if (error instanceof http_1.Response) {
            var body = error.json() || '';
            var err = body.error || JSON.stringify(body);
            errMsg = error.status + " - " + (error.statusText || '') + " " + err;
        }
        else {
            errMsg = error.message ? error.message : error.toString();
        }
        console.error(errMsg);
        return Rx_1.Observable.throw(errMsg);
    };
    MapViewService.prototype.extractData = function (res) {
        var body = res.json();
        return body.data || {};
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
    MapViewService.prototype.getDistance = function (loc1, loc2) {
        console.log("Distance between loc1 and loc2 is: " + geolocation.distance(loc1, loc2));
    };
    MapViewService.prototype.addMarker = function (args) {
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
    __metadata("design:paramtypes", [friends_service_1.FriendsService,
        http_1.Http])
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFwLXZpZXcuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIm1hcC12aWV3LnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLHNDQUEyQztBQUMzQyw4QkFBcUM7QUFDckMsZ0NBQThCO0FBQzlCLGlDQUErQjtBQUMvQixtQ0FBaUM7QUFDakMsa0NBQWlDO0FBQ2pDLDZFQUFtRjtBQUNuRixJQUFJLFVBQVUsR0FBRyxPQUFPLENBQUMsOEJBQThCLENBQUMsQ0FBQztBQUN6RCxJQUFJLFdBQVcsR0FBRyxPQUFPLENBQUMsMEJBQTBCLENBQUMsQ0FBQztBQUN0RCxJQUFJLEtBQUssR0FBRyxPQUFPLENBQUMsa0JBQWtCLENBQUMsQ0FBQztBQUN4QywrQkFBOEI7QUFDOUIsMkVBQXlFO0FBQ3pFLHNDQUErQztBQUcvQyxJQUFhLGNBQWM7SUFXdkIsd0JBQW9CLGFBQTZCLEVBQ3JDLElBQVU7UUFEdEIsaUJBT0M7UUFQbUIsa0JBQWEsR0FBYixhQUFhLENBQWdCO1FBQ3JDLFNBQUksR0FBSixJQUFJLENBQU07UUFYdEIsUUFBUTtRQUNBLFlBQU8sR0FBWSxJQUFJLENBQUM7UUFDaEMsWUFBTyxHQUFXLElBQUksQ0FBQztRQU12Qix1QkFBa0IsR0FBWSxLQUFLLENBQUM7UUFDNUIsYUFBUSxHQUF1QixJQUFJLEtBQUssRUFBZSxDQUFDO1FBbUZ4RCxVQUFLLEdBQUcsSUFBSSxDQUFDO1FBOEVyQixjQUFTLEdBQUcsVUFBQyxLQUFLO1lBQ2QsT0FBTyxDQUFDLEdBQUcsQ0FBQyxZQUFZLENBQUMsQ0FBQztZQUUxQixLQUFJLENBQUMsT0FBTyxHQUFHLEtBQUksQ0FBQyxjQUFjLENBQUM7Z0JBQy9CLEtBQUssRUFBRSxJQUFJLGFBQUssQ0FBQyxLQUFLLENBQUM7Z0JBQ3ZCLElBQUksRUFBRSxLQUFJLENBQUMsT0FBTztnQkFDbEIsUUFBUSxFQUFFLEtBQUssQ0FBQyxRQUFRO2dCQUN4QixRQUFRLEVBQUUsSUFBSTtnQkFDZCxLQUFLLEVBQUUsRUFBRTthQUNaLENBQUMsQ0FBQztZQUVILEtBQUksQ0FBQyxZQUFZLENBQUMsS0FBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDO1lBQ2xDLEtBQUksQ0FBQyxTQUFTLEdBQUcsS0FBSSxDQUFDLFNBQVMsQ0FBQztnQkFDNUIsUUFBUSxFQUFFLEtBQUssQ0FBQyxRQUFRO2dCQUN4QixLQUFLLEVBQUUsY0FBYzthQUN4QixDQUFDLENBQUM7UUFDUCxDQUFDLENBQUM7UUFZRiw0QkFBNEI7UUFDcEIsMEJBQXFCLEdBQUcsS0FBSyxDQUFDO1FBQzlCLHFCQUFnQixHQUFHLFVBQUMsUUFBa0I7WUFDMUMsRUFBRSxDQUFDLENBQUMsS0FBSSxDQUFDLE9BQU8sSUFBSSxRQUFRLElBQUksQ0FBQyxLQUFJLENBQUMscUJBQXFCLENBQUMsQ0FBQyxDQUFDO2dCQUMxRCxLQUFJLENBQUMsT0FBTyxDQUFDLFFBQVEsR0FBRyxRQUFRLENBQUMsUUFBUSxDQUFDO2dCQUMxQyxLQUFJLENBQUMsT0FBTyxDQUFDLFNBQVMsR0FBRyxRQUFRLENBQUMsU0FBUyxDQUFDO2dCQUM1QyxLQUFJLENBQUMsT0FBTyxDQUFDLElBQUksR0FBRyxFQUFFLENBQUM7Z0JBQ3ZCLEtBQUksQ0FBQyxrQkFBa0IsR0FBRyxJQUFJLENBQUM7Z0JBRS9CLEtBQUksQ0FBQyxxQkFBcUIsR0FBRyxJQUFJLENBQUM7WUFDdEMsQ0FBQztZQUNELEVBQUUsQ0FBQyxDQUFDLEtBQUksQ0FBQyxTQUFTLElBQUksSUFBSSxDQUFDLENBQUMsQ0FBQztnQkFDekIsSUFBSSxJQUFJLEdBQUcsS0FBSSxDQUFDLFVBQVUsQ0FBQztvQkFDdkIsUUFBUSxFQUFFLFFBQVE7b0JBQ2xCLEtBQUssRUFBRSxjQUFjO2lCQUN4QixFQUFFLHdCQUF3QixDQUFDLENBQUM7Z0JBQzdCLElBQUksUUFBUSxHQUFHLElBQUksYUFBYSxFQUFFLENBQUM7Z0JBQ25DLFFBQVEsQ0FBQyxLQUFLLEdBQUcsV0FBVyxDQUFDO2dCQUM3QixRQUFRLENBQUMsUUFBUSxHQUFHLFFBQVEsQ0FBQztnQkFDN0IsSUFBSSxHQUFHLEdBQUcsS0FBSSxDQUFDLGlCQUFpQixDQUFDLFFBQVEsRUFBRSxJQUFJLEVBQUUsbUJBQW1CLENBQUMsRUFBRSxDQUFDLENBQUM7Z0JBQ3pFLEtBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO2dCQUN4QixLQUFJLENBQUMsU0FBUyxHQUFHLEdBQUcsQ0FBQztnQkFDckIsS0FBSSxDQUFDLE9BQU8sQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFBO1lBRXBDLENBQUM7WUFBQyxJQUFJLENBQUMsQ0FBQztnQkFDSixLQUFJLENBQUMsT0FBTyxDQUFDLFFBQVEsR0FBRyxRQUFRLENBQUMsUUFBUSxDQUFDO2dCQUMxQyxLQUFJLENBQUMsT0FBTyxDQUFDLFNBQVMsR0FBRyxRQUFRLENBQUMsU0FBUyxDQUFDO2dCQUM1QyxJQUFJLEdBQUcsR0FBRyxLQUFJLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxDQUFDO2dCQUNwQyxLQUFJLENBQUMsT0FBTyxDQUFDLFlBQVksQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUM7Z0JBQ3BDLEdBQUcsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLFFBQVEsR0FBRyxRQUFRLENBQUMsUUFBUSxDQUFDO2dCQUMvQyxHQUFHLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxTQUFTLEdBQUcsUUFBUSxDQUFDLFNBQVMsQ0FBQztnQkFDakQsS0FBSSxDQUFDLE9BQU8sQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFBO2dCQUNoQyx1Q0FBdUM7Z0JBQ3ZDLGlDQUFpQztnQkFDakMsMEJBQTBCO2dCQUMxQiwwQkFBMEI7Z0JBQzFCLHNCQUFzQjtnQkFDdEIsZ0JBQWdCO2dCQUNoQixNQUFNO2dCQUVOLEtBQUksQ0FBQyxXQUFXLENBQUMsS0FBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsUUFBUSxFQUFFLEdBQUcsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUM7WUFFeEUsQ0FBQztRQUNMLENBQUMsQ0FBQztRQXJPRSxFQUFFLENBQUMsQ0FBQyxDQUFDLFdBQVcsQ0FBQyxTQUFTLEVBQUUsQ0FBQyxDQUFDLENBQUM7WUFDM0IsV0FBVyxDQUFDLHFCQUFxQixFQUFFLENBQUM7UUFFeEMsQ0FBQztJQUVMLENBQUM7SUFFRCxpQ0FBUSxHQUFSO0lBRUEsQ0FBQztJQUVELGlCQUFpQjtJQUNWLDBDQUFpQixHQUF4QixVQUF5QixRQUF1QixFQUFFLE1BQWMsRUFBRSxRQUE2QjtRQUMzRixnRkFBZ0Y7UUFDaEYsSUFBSSxJQUFJLEdBQUcsSUFBSSxhQUFhLEVBQUUsQ0FBQztRQUMvQixJQUFJLENBQUMsS0FBSyxHQUFHLFFBQVEsQ0FBQyxLQUFLLENBQUM7UUFDNUIsSUFBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLHVDQUFRLEVBQUUsQ0FBQztRQUMvQixJQUFJLENBQUMsUUFBUSxDQUFDLFFBQVEsR0FBRyxRQUFRLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQztRQUNwRCxJQUFJLENBQUMsUUFBUSxDQUFDLFNBQVMsR0FBRyxRQUFRLENBQUMsUUFBUSxDQUFDLFNBQVMsQ0FBQztRQUV0RCxJQUFJLE9BQU8sR0FBVyxJQUFJLENBQUM7UUFDM0IsRUFBRSxDQUFDLENBQUMsUUFBUSxJQUFJLG1CQUFtQixDQUFDLEVBQUUsQ0FBQztZQUNuQyxPQUFPLEdBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLEVBQUUsd0JBQXdCLENBQUMsQ0FBQztRQUM5RCxJQUFJO1lBQ0EsT0FBTyxHQUFHLElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDcEMsSUFBSSxXQUFXLEdBQUcsSUFBSSxXQUFXLENBQUMsT0FBTyxFQUFFLFFBQVEsQ0FBQyxDQUFDO1FBQ3JELFdBQVcsQ0FBQyxNQUFNLEdBQUcsTUFBTSxDQUFDO1FBQzVCLE1BQU0sQ0FBQyxXQUFXLENBQUM7SUFDdkIsQ0FBQztJQUNPLHVDQUFjLEdBQXRCLFVBQXVCLE1BQWM7UUFDakMsK0JBQStCO1FBQy9CLEdBQUcsQ0FBQyxDQUFhLFVBQWEsRUFBYixLQUFBLElBQUksQ0FBQyxRQUFRLEVBQWIsY0FBYSxFQUFiLElBQWE7WUFBekIsSUFBSSxJQUFJLFNBQUE7WUFDVCxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsTUFBTSxJQUFJLE1BQU0sQ0FBQztnQkFDdEIsTUFBTSxDQUFDLElBQUksQ0FBQztTQUFBO0lBRXhCLENBQUM7SUFDRCxnQkFBZ0I7SUFDVCxzQ0FBYSxHQUFwQixVQUFxQixRQUF1QixFQUFFLE1BQWM7UUFDeEQsSUFBSSxXQUFXLEdBQUcsSUFBSSxDQUFDLGlCQUFpQixDQUFDLFFBQVEsRUFBRSxNQUFNLEVBQUUsbUJBQW1CLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDdkYsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUM7UUFDaEMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxTQUFTLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxDQUFDO0lBRzdDLENBQUM7SUFDTSx5Q0FBZ0IsR0FBdkIsVUFBd0IsUUFBdUIsRUFBRSxNQUFjO1FBQS9ELGlCQW1DQztRQWxDRyxJQUFJLFdBQVcsR0FBRyxJQUFJLENBQUMsY0FBYyxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQzlDLEVBQUUsQ0FBQyxDQUFDLFdBQVcsSUFBSSxJQUFJLENBQUMsQ0FBQyxDQUFDO1lBQ3RCLCtDQUErQztZQUMvQyxXQUFXLENBQUMsSUFBSSxDQUFDLFFBQVEsR0FBRyxRQUFRLENBQUMsUUFBUSxDQUFDO1lBQzlDLDRDQUE0QztZQUM1QyxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQztnQkFDYixJQUFJLENBQUMsS0FBSyxHQUFHLEtBQUssQ0FBQztnQkFDbkIsSUFBSSxDQUFDLFNBQVMsRUFBRSxDQUFDLFNBQVMsQ0FBQyxVQUFBLENBQUM7b0JBQ3hCLElBQUksUUFBUSxHQUFpQyxDQUFDLENBQUMsSUFBSSxFQUFFLENBQUM7b0JBRXRELEdBQUcsQ0FBQyxDQUFhLFVBQWdDLEVBQWhDLEtBQUEsUUFBUSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxFQUFoQyxjQUFnQyxFQUFoQyxJQUFnQzt3QkFBNUMsSUFBSSxJQUFJLFNBQUE7d0JBQ1QsSUFBSSxLQUFLLEdBQVEsSUFBSSxDQUFDLGNBQWMsQ0FBQzt3QkFDckMsSUFBSSxHQUFHLEdBQVEsSUFBSSxDQUFDLFlBQVksQ0FBQzt3QkFDakMsSUFBSSxRQUFRLEdBQUcsdUNBQVEsQ0FBQyxrQkFBa0IsQ0FBQyxLQUFLLENBQUMsR0FBRyxFQUFFLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQzt3QkFDakUsS0FBSSxDQUFDLE9BQU8sR0FBRyxLQUFJLENBQUMsY0FBYyxDQUFDOzRCQUMvQixLQUFLLEVBQUUsSUFBSSxhQUFLLENBQUMsTUFBTSxDQUFDOzRCQUN4QixJQUFJLEVBQUUsS0FBSSxDQUFDLE9BQU87NEJBQ2xCLFFBQVEsRUFBRSxRQUFROzRCQUNsQixRQUFRLEVBQUUsSUFBSTs0QkFDZCxLQUFLLEVBQUUsRUFBRTt5QkFDWixDQUFDLENBQUM7d0JBQ0gsUUFBUSxHQUFHLHVDQUFRLENBQUMsa0JBQWtCLENBQUMsR0FBRyxDQUFDLEdBQUcsRUFBRSxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUM7d0JBQ3pELEtBQUksQ0FBQyxPQUFPLEdBQUcsS0FBSSxDQUFDLGNBQWMsQ0FBQzs0QkFDL0IsS0FBSyxFQUFFLElBQUksYUFBSyxDQUFDLE1BQU0sQ0FBQzs0QkFDeEIsSUFBSSxFQUFFLEtBQUksQ0FBQyxPQUFPOzRCQUNsQixRQUFRLEVBQUUsUUFBUTs0QkFDbEIsUUFBUSxFQUFFLElBQUk7NEJBQ2QsS0FBSyxFQUFFLEVBQUU7eUJBQ1osQ0FBQyxDQUFDO3FCQUVOO2dCQUNMLENBQUMsQ0FBQyxDQUFDO1lBQ1AsQ0FBQztRQUNMLENBQUM7SUFDTCxDQUFDO0lBRUQsa0NBQVMsR0FBVDtRQUNJLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxrS0FBa0ssQ0FBQzthQUNuTCxLQUFLLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDO0lBQ2pDLENBQUM7SUFDTyxvQ0FBVyxHQUFuQixVQUFvQixLQUFxQjtRQUNyQyxvRUFBb0U7UUFDcEUsSUFBSSxNQUFjLENBQUM7UUFDbkIsRUFBRSxDQUFDLENBQUMsS0FBSyxZQUFZLGVBQVEsQ0FBQyxDQUFDLENBQUM7WUFDNUIsSUFBTSxJQUFJLEdBQUcsS0FBSyxDQUFDLElBQUksRUFBRSxJQUFJLEVBQUUsQ0FBQztZQUNoQyxJQUFNLEdBQUcsR0FBUyxJQUFLLENBQUMsS0FBSyxJQUFJLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLENBQUM7WUFDdEQsTUFBTSxHQUFNLEtBQUssQ0FBQyxNQUFNLFlBQU0sS0FBSyxDQUFDLFVBQVUsSUFBSSxFQUFFLFVBQUksR0FBSyxDQUFDO1FBQ2xFLENBQUM7UUFBQyxJQUFJLENBQUMsQ0FBQztZQUNKLE1BQU0sR0FBRyxLQUFLLENBQUMsT0FBTyxHQUFHLEtBQUssQ0FBQyxPQUFPLEdBQUcsS0FBSyxDQUFDLFFBQVEsRUFBRSxDQUFDO1FBQzlELENBQUM7UUFDRCxPQUFPLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQ3RCLE1BQU0sQ0FBQyxlQUFVLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxDQUFDO0lBQ3BDLENBQUM7SUFDTyxvQ0FBVyxHQUFuQixVQUFvQixHQUFhO1FBQzdCLElBQUksSUFBSSxHQUFHLEdBQUcsQ0FBQyxJQUFJLEVBQUUsQ0FBQztRQUN0QixNQUFNLENBQU8sSUFBSyxDQUFDLElBQUksSUFBSSxFQUFFLENBQUM7SUFDbEMsQ0FBQztJQUNNLHlDQUFnQixHQUF2QixVQUF3QixRQUF1QixFQUFFLE1BQWM7UUFDM0QsSUFBSSxXQUFXLEdBQUcsSUFBSSxDQUFDLGNBQWMsQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUM5QyxJQUFJLENBQUMsT0FBTyxDQUFDLFlBQVksQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDaEQsQ0FBQztJQUdPLHVDQUFjLEdBQXRCO1FBQ0ksRUFBRSxDQUFDLENBQUMsQ0FBQyxXQUFXLENBQUMsU0FBUyxFQUFFLENBQUMsQ0FBQyxDQUFDO1lBQzNCLE9BQU8sQ0FBQyxHQUFHLENBQUMsbUNBQW1DLENBQUMsQ0FBQztZQUNqRCxNQUFNLENBQUMsV0FBVyxDQUFDLHFCQUFxQixFQUFFLENBQUM7UUFDL0MsQ0FBQztRQUFDLElBQUksQ0FBQyxDQUFDO1lBQ0osTUFBTSxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDakMsQ0FBQztJQUNMLENBQUM7SUFFTyxvQ0FBVyxHQUFuQjtRQUNJLEVBQUUsQ0FBQyxDQUFDLFdBQVcsQ0FBQyxTQUFTLEVBQUUsQ0FBQyxDQUFDLENBQUM7WUFDMUIsSUFBSSxRQUFRLEdBQUcsV0FBVyxDQUFDLGtCQUFrQixDQUFDO2dCQUMxQyxlQUFlLEVBQUUsRUFBRTtnQkFDbkIsY0FBYyxFQUFFLEVBQUU7Z0JBQ2xCLGlCQUFpQixFQUFFLElBQUk7Z0JBQ3ZCLFVBQVUsRUFBRSxLQUFLO2FBQ3BCLENBQUMsQ0FBQTtZQUNGLE1BQU0sQ0FBQyxRQUFRLENBQUM7UUFDcEIsQ0FBQztRQUNELE1BQU0sQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLDBCQUEwQixDQUFDLENBQUM7SUFDdEQsQ0FBQztJQUVELFlBQVk7SUFDTCxtQ0FBVSxHQUFqQixVQUFrQixLQUFLLEVBQUUsY0FBMEI7UUFBbkQsaUJBdUJDO1FBdEJHLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxPQUFPLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDO1lBQUMsTUFBTSxDQUFDO1FBQzFDLElBQUksQ0FBQyxPQUFPLEdBQUcsS0FBSyxDQUFDLE1BQU0sQ0FBQztRQUM1QixJQUFJLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUM3QixvQ0FBb0M7UUFDcEMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxjQUFjLEdBQUc7WUFDMUIsY0FBYyxFQUFFLENBQUM7UUFDckIsQ0FBQyxDQUFBO1FBQ0QsbURBQW1EO1FBQ25ELHFEQUFxRDtRQUVyRCxJQUFJLENBQUMsY0FBYyxFQUFFO2FBQ2hCLElBQUksQ0FBQztZQUNGLElBQUksUUFBUSxHQUFHLEtBQUksQ0FBQyxXQUFXLEVBQUUsQ0FBQztRQUN0QyxDQUFDLENBQUM7YUFDRCxJQUFJLENBQUM7WUFDRixLQUFJLENBQUMsT0FBTyxHQUFHLFdBQVcsQ0FBQyxhQUFhLENBQUMsVUFBQyxDQUFDLElBQU8sS0FBSSxDQUFDLGdCQUFnQixDQUFDLENBQUMsQ0FBQyxDQUFBLENBQUMsQ0FBQyxFQUFFLEtBQUksQ0FBQyxLQUFLLEVBQUU7Z0JBQ3RGLGVBQWUsRUFBRSxFQUFFO2dCQUNuQixjQUFjLEVBQUUsRUFBRTtnQkFDbEIsaUJBQWlCLEVBQUUsS0FBSztnQkFDeEIsVUFBVSxFQUFFLEtBQUs7YUFDcEIsQ0FBQyxDQUFDO1FBQ1AsQ0FBQyxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUN2QixDQUFDO0lBQUEsQ0FBQztJQUNGLG9DQUFXLEdBQVgsVUFBWSxJQUFJLEVBQUUsSUFBSTtRQUNsQixPQUFPLENBQUMsR0FBRyxDQUFDLHFDQUFxQyxHQUFHLFdBQVcsQ0FBQyxRQUFRLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUM7SUFDMUYsQ0FBQztJQWtCRCxrQ0FBUyxHQUFULFVBQVUsSUFBbUI7UUFDekIsRUFBRSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsT0FBTyxJQUFJLENBQUMsSUFBSSxJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQztZQUFDLE1BQU0sQ0FBQztRQUVyRCxJQUFJLE1BQU0sR0FBRyxJQUFJLHFDQUFNLEVBQUUsQ0FBQztRQUMxQixNQUFNLENBQUMsUUFBUSxHQUFHLHVDQUFRLENBQUMsa0JBQWtCLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxRQUFRLEVBQUUsSUFBSSxDQUFDLFFBQVEsQ0FBQyxTQUFTLENBQUMsQ0FBQztRQUMvRixNQUFNLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUM7UUFDMUIsTUFBTSxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDO1FBQzVCLElBQUksQ0FBQyxPQUFPLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBRS9CLE1BQU0sQ0FBQyxNQUFNLENBQUM7SUFDbEIsQ0FBQztJQUFBLENBQUM7SUE4Q00sdUNBQWMsR0FBdEIsVUFBdUIsSUFBaUI7UUFDcEMsRUFBRSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsT0FBTyxJQUFJLENBQUMsSUFBSSxJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQztZQUFDLE1BQU0sQ0FBQztRQUVyRCxJQUFJLElBQUksR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDO1FBRXJCLEVBQUUsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztZQUNSLElBQUksR0FBRyxJQUFJLHVDQUFRLEVBQUUsQ0FBQztZQUN0QixJQUFJLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQztZQUNwQixJQUFJLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQyxLQUFLLElBQUksRUFBRSxDQUFDO1lBQzlCLElBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDLEtBQUssSUFBSSxJQUFJLGFBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQztZQUM1QyxJQUFJLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQyxRQUFRLElBQUksU0FBUyxHQUFHLElBQUksQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDO1lBQ2xFLElBQUksQ0FBQyxPQUFPLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ25DLENBQUM7UUFDRCxJQUFJLENBQUMsUUFBUSxDQUFDLHVDQUFRLENBQUMsa0JBQWtCLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxRQUFRLEVBQUUsSUFBSSxDQUFDLFFBQVEsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDO1FBRTVGLE1BQU0sQ0FBQyxJQUFJLENBQUM7SUFDaEIsQ0FBQztJQUNPLG1DQUFVLEdBQWxCLFVBQW1CLElBQW1CLEVBQUUsTUFBNkM7UUFBN0MsdUJBQUEsRUFBQSxxQ0FBNkM7UUFDakYsRUFBRSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsT0FBTyxJQUFJLENBQUMsSUFBSSxJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQztZQUFDLE1BQU0sQ0FBQztRQUVyRCxJQUFJLElBQUksR0FBRyxJQUFJLHFDQUFNLEVBQUUsQ0FBQztRQUN4QixJQUFJLENBQUMsUUFBUSxHQUFHLHVDQUFRLENBQUMsa0JBQWtCLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxRQUFRLEVBQUUsSUFBSSxDQUFDLFFBQVEsQ0FBQyxTQUFTLENBQUMsQ0FBQztRQUM3RixJQUFJLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUM7UUFDeEIsSUFBSSxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDO1FBQzFCLElBQUksS0FBSyxHQUFHLElBQUksYUFBSyxFQUFFLENBQUM7UUFDeEIsS0FBSyxDQUFDLEdBQUcsR0FBRyxNQUFNLENBQUM7UUFDbkIsS0FBSyxDQUFDLEtBQUssR0FBRyxFQUFFLENBQUM7UUFDakIsS0FBSyxDQUFDLE1BQU0sR0FBRyxFQUFFLENBQUM7UUFDbEIsSUFBSSxDQUFDLElBQUksR0FBRyxLQUFLLENBQUM7UUFFbEIsd0VBQXdFO1FBQ3hFLGdDQUFnQztRQUNoQyx3QkFBd0I7UUFFeEIsNENBQTRDO1FBQzVDLGlGQUFpRjtRQUNqRix1Q0FBdUM7UUFDdkMsK0VBQStFO1FBQy9FLHdDQUF3QztRQUN4QyxnQ0FBZ0M7UUFFaEMsTUFBTSxDQUFDLElBQUksQ0FBQztJQUNoQixDQUFDO0lBQUEsQ0FBQztJQUVNLHFDQUFZLEdBQXBCO1FBQ0ksSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUM7UUFDOUIsSUFBSSxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUM7SUFFeEIsQ0FBQztJQUFBLENBQUM7SUFFTSxxQ0FBWSxHQUFwQjtRQUNJLElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBQzlCLElBQUksQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDO1FBQ3BCLElBQUksQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDO1FBQ2xDLElBQUksQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDO0lBRTFCLENBQUM7SUFFTyxtQ0FBVSxHQUFsQixVQUFtQixJQUFjO1FBQzdCLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7WUFDUCxJQUFJLENBQUMsZUFBZSxFQUFFLENBQUM7UUFDM0IsQ0FBQztJQUNMLENBQUM7SUFFTyxxQ0FBWSxHQUFwQixVQUFxQixNQUFjO1FBQy9CLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxPQUFPLElBQUksTUFBTSxDQUFDLENBQUMsQ0FBQztZQUN6QixJQUFJLENBQUMsT0FBTyxDQUFDLFlBQVksQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUN0QyxDQUFDO0lBQ0wsQ0FBQztJQUVPLDhCQUFLLEdBQWIsVUFBYyxHQUFHO1FBQ2IsT0FBTyxDQUFDLEdBQUcsQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO0lBQ2pELENBQUM7SUFFTyx1Q0FBYyxHQUF0QixVQUF1QixLQUFLO1FBQ3hCLE9BQU8sQ0FBQyxHQUFHLENBQUMsYUFBYSxHQUFHLEtBQUssQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDcEQsQ0FBQztJQUVPLHdDQUFlLEdBQXZCLFVBQXdCLEtBQUs7UUFDekIsT0FBTyxDQUFDLEdBQUcsQ0FBQyxrQkFBa0IsR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDO0lBQ25FLENBQUM7SUFDTCxxQkFBQztBQUFELENBQUMsQUFyVUQsSUFxVUM7QUFyVVksY0FBYztJQUQxQixpQkFBVSxFQUFFO3FDQVkwQixnQ0FBYztRQUMvQixXQUFJO0dBWmIsY0FBYyxDQXFVMUI7QUFyVVksd0NBQWM7QUF3VTNCO0lBQUE7SUFNQSxDQUFDO0lBQUQsa0JBQUM7QUFBRCxDQUFDLEFBTkQsSUFNQztBQU5ZLGtDQUFXO0FBUXhCO0lBQUE7SUFHQSxDQUFDO0lBQUQsb0JBQUM7QUFBRCxDQUFDLEFBSEQsSUFHQztBQUhZLHNDQUFhO0FBSzFCO0lBRUkscUJBQW1CLElBQVksRUFBVSxRQUE2QjtRQUFuRCxTQUFJLEdBQUosSUFBSSxDQUFRO1FBQVUsYUFBUSxHQUFSLFFBQVEsQ0FBcUI7SUFBSSxDQUFDO0lBQy9FLGtCQUFDO0FBQUQsQ0FBQyxBQUhELElBR0M7QUFDRCxJQUFLLG1CQUlKO0FBSkQsV0FBSyxtQkFBbUI7SUFDcEIsaUVBQU0sQ0FBQTtJQUNOLHlEQUFFLENBQUE7SUFDRiwrREFBSyxDQUFBO0FBQ1QsQ0FBQyxFQUpJLG1CQUFtQixLQUFuQixtQkFBbUIsUUFJdkIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcbmltcG9ydCB7IE9ic2VydmFibGUgfSBmcm9tIFwicnhqcy9SeFwiO1xuaW1wb3J0IFwicnhqcy9hZGQvb3BlcmF0b3IvZG9cIjtcbmltcG9ydCBcInJ4anMvYWRkL29wZXJhdG9yL21hcFwiO1xuaW1wb3J0ICdyeGpzL2FkZC9vcGVyYXRvci9jYXRjaCc7XG5pbXBvcnQgeyBJbWFnZSB9IGZyb20gXCJ1aS9pbWFnZVwiO1xuaW1wb3J0IHsgTWFwVmlldywgTWFya2VyLCBQb2x5bGluZSwgUG9zaXRpb24gfSBmcm9tICduYXRpdmVzY3JpcHQtZ29vZ2xlLW1hcHMtc2RrJztcbnZhciBtYXBzTW9kdWxlID0gcmVxdWlyZShcIm5hdGl2ZXNjcmlwdC1nb29nbGUtbWFwcy1zZGtcIik7XG5sZXQgZ2VvbG9jYXRpb24gPSByZXF1aXJlKCduYXRpdmVzY3JpcHQtZ2VvbG9jYXRpb24nKTtcbnZhciBzdHlsZSA9IHJlcXVpcmUoJy4vbWFwLXN0eWxlLmpzb24nKTtcbmltcG9ydCB7IENvbG9yIH0gZnJvbSAnY29sb3InO1xuaW1wb3J0IHsgRnJpZW5kc1NlcnZpY2UgfSBmcm9tICcuLi8uLi8uLi9zaGFyZWQvZnJpZW5kcy9mcmllbmRzLnNlcnZpY2UnO1xuaW1wb3J0IHsgSHR0cCwgUmVzcG9uc2UgfSBmcm9tICdAYW5ndWxhci9odHRwJztcbmltcG9ydCB7IHJvdXRlcyB9IGZyb20gJy4uLy4uLy4uL2FwcC5yb3V0aW5nJztcbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBNYXBWaWV3U2VydmljZSB7XG4gICAgLy8jTWFwYSBcbiAgICBwcml2YXRlIG1hcFZpZXc6IE1hcFZpZXcgPSBudWxsO1xuICAgIHdhdGNoSWQ6IG51bWJlciA9IG51bGw7XG4gICAgZ3BzTGluZTogUG9seWxpbmU7XG4gICAgdGVzdExpbmU6IFBvbHlsaW5lO1xuICAgIHRhcExpbmU6IFBvbHlsaW5lO1xuICAgIHRhcE1hcmtlcjogYW55O1xuICAgIGdwc01hcmtlcjogTWFya1dyYXBwZXI7XG4gICAgY2VudGVyZWRPbkxvY2F0aW9uOiBib29sZWFuID0gZmFsc2U7XG4gICAgcHJpdmF0ZSBtYXJrTGlzdDogQXJyYXk8TWFya1dyYXBwZXI+ID0gbmV3IEFycmF5PE1hcmtXcmFwcGVyPigpO1xuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgZnJpZW5kU2VydmljZTogRnJpZW5kc1NlcnZpY2UsXG4gICAgICAgIHByaXZhdGUgaHR0cDogSHR0cCkge1xuICAgICAgICBpZiAoIWdlb2xvY2F0aW9uLmlzRW5hYmxlZCgpKSB7XG4gICAgICAgICAgICBnZW9sb2NhdGlvbi5lbmFibGVMb2NhdGlvblJlcXVlc3QoKTtcblxuICAgICAgICB9XG5cbiAgICB9XG5cbiAgICBuZ09uSW5pdCgpIHtcblxuICAgIH1cblxuICAgIC8vUHJpdmF0ZSBNZXRob2RzXG4gICAgcHVibGljIGNyZWF0ZU1hcmtXcmFwcGVyKG1hcmtJbmZvOiBBZGRNYXJrZXJBcmdzLCBtYXJrSWQ6IG51bWJlciwgbWFya1R5cGU6IE1hcmtXcmFwcGVyVHlwZUVudW0pOiBNYXJrV3JhcHBlciB7XG4gICAgICAgIC8vQ3JlbyB1biBNYXJrV3JhcHBlciBlbCBjdWFsIHJlbGFjaW9uYSBlbCBNYXJrZXIgY29uIGVsIGlkIGRlbCB1c3VhcmlvIGRpYnVqYWRvXG4gICAgICAgIHZhciBtYXJrID0gbmV3IEFkZE1hcmtlckFyZ3MoKTtcbiAgICAgICAgbWFyay50aXRsZSA9IG1hcmtJbmZvLnRpdGxlO1xuICAgICAgICBtYXJrLmxvY2F0aW9uID0gbmV3IFBvc2l0aW9uKCk7XG4gICAgICAgIG1hcmsubG9jYXRpb24ubGF0aXR1ZGUgPSBtYXJrSW5mby5sb2NhdGlvbi5sYXRpdHVkZTtcbiAgICAgICAgbWFyay5sb2NhdGlvbi5sb25naXR1ZGUgPSBtYXJrSW5mby5sb2NhdGlvbi5sb25naXR1ZGU7XG5cbiAgICAgICAgdmFyIG1hcE1hcms6IE1hcmtlciA9IG51bGw7XG4gICAgICAgIGlmIChtYXJrVHlwZSA9PSBNYXJrV3JhcHBlclR5cGVFbnVtLk1lKVxuICAgICAgICAgICAgbWFwTWFyayA9IHRoaXMuY3JlYXRlTWFyayhtYXJrLCBcIn4vaW1hZ2VzL21lLW1hcmtlci5wbmdcIik7XG4gICAgICAgIGVsc2VcbiAgICAgICAgICAgIG1hcE1hcmsgPSB0aGlzLmNyZWF0ZU1hcmsobWFyayk7XG4gICAgICAgIHZhciBtYXJrV3JhcHBlciA9IG5ldyBNYXJrV3JhcHBlcihtYXBNYXJrLCBtYXJrVHlwZSk7XG4gICAgICAgIG1hcmtXcmFwcGVyLm1hcmtJZCA9IG1hcmtJZDtcbiAgICAgICAgcmV0dXJuIG1hcmtXcmFwcGVyO1xuICAgIH1cbiAgICBwcml2YXRlIGdldE1hcmtXcmFwcGVyKG1hcmtJZDogbnVtYmVyKTogTWFya1dyYXBwZXIge1xuICAgICAgICAvL1JlZ3Jlc28gdW4gbWFya1dyYXBwZXIgcG9yIElEXG4gICAgICAgIGZvciAodmFyIGl0ZW0gb2YgdGhpcy5tYXJrTGlzdClcbiAgICAgICAgICAgIGlmIChpdGVtLm1hcmtJZCA9PSBtYXJrSWQpXG4gICAgICAgICAgICAgICAgcmV0dXJuIGl0ZW07XG5cbiAgICB9XG4gICAgLy9QdWJsaWMgTWV0aG9kc1xuICAgIHB1YmxpYyBhZGRDb21tb25NYXJrKG1hcmtJbmZvOiBBZGRNYXJrZXJBcmdzLCBtYXJrSWQ6IG51bWJlcik6IHZvaWQge1xuICAgICAgICB2YXIgbWFya1dyYXBwZXIgPSB0aGlzLmNyZWF0ZU1hcmtXcmFwcGVyKG1hcmtJbmZvLCBtYXJrSWQsIE1hcmtXcmFwcGVyVHlwZUVudW0uRnJpZW5kKTtcbiAgICAgICAgdGhpcy5tYXJrTGlzdC5wdXNoKG1hcmtXcmFwcGVyKTtcbiAgICAgICAgdGhpcy5tYXBWaWV3LmFkZE1hcmtlcihtYXJrV3JhcHBlci5tYXJrKTtcblxuXG4gICAgfVxuICAgIHB1YmxpYyB1cGRhdGVDb21tb25NYXJrKG1hcmtJbmZvOiBBZGRNYXJrZXJBcmdzLCBtYXJrSWQ6IG51bWJlcik6IHZvaWQge1xuICAgICAgICB2YXIgbWFya1dyYXBwZXIgPSB0aGlzLmdldE1hcmtXcmFwcGVyKG1hcmtJZCk7XG4gICAgICAgIGlmIChtYXJrV3JhcHBlciAhPSBudWxsKSB7XG4gICAgICAgICAgICAvLyB0aGlzLm1hcFZpZXcucmVtb3ZlTWFya2VyKG1hcmtXcmFwcGVyLm1hcmspO1xuICAgICAgICAgICAgbWFya1dyYXBwZXIubWFyay5wb3NpdGlvbiA9IG1hcmtJbmZvLmxvY2F0aW9uO1xuICAgICAgICAgICAgLy8gdGhpcy5tYXBWaWV3LmFkZE1hcmtlcihtYXJrV3JhcHBlci5tYXJrKTtcbiAgICAgICAgICAgIGlmICh0aGlzLmZpcnN0KSB7XG4gICAgICAgICAgICAgICAgdGhpcy5maXJzdCA9IGZhbHNlO1xuICAgICAgICAgICAgICAgIHRoaXMuZ2V0SGVyb2VzKCkuc3Vic2NyaWJlKHggPT4ge1xuICAgICAgICAgICAgICAgICAgICB2YXIgcmVzcG9uc2U6IGdvb2dsZS5tYXBzLkRpcmVjdGlvbnNSZXN1bHQgPSB4Lmpzb24oKTtcblxuICAgICAgICAgICAgICAgICAgICBmb3IgKHZhciBpdGVtIG9mIHJlc3BvbnNlLnJvdXRlc1swXS5sZWdzWzBdLnN0ZXBzKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgc3RhcnQ6IGFueSA9IGl0ZW0uc3RhcnRfbG9jYXRpb247XG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgZW5kOiBhbnkgPSBpdGVtLmVuZF9sb2NhdGlvbjtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBwb3NpdGlvbiA9IFBvc2l0aW9uLnBvc2l0aW9uRnJvbUxhdExuZyhzdGFydC5sYXQsIHN0YXJ0LmxuZyk7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmdwc0xpbmUgPSB0aGlzLmFkZFBvaW50VG9MaW5lKHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb2xvcjogbmV3IENvbG9yKCdQaW5rJyksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGluZTogdGhpcy5ncHNMaW5lLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxvY2F0aW9uOiBwb3NpdGlvbixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBnZW9kZXNpYzogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB3aWR0aDogMTBcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgcG9zaXRpb24gPSBQb3NpdGlvbi5wb3NpdGlvbkZyb21MYXRMbmcoZW5kLmxhdCwgZW5kLmxuZyk7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmdwc0xpbmUgPSB0aGlzLmFkZFBvaW50VG9MaW5lKHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb2xvcjogbmV3IENvbG9yKCdQaW5rJyksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGluZTogdGhpcy5ncHNMaW5lLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxvY2F0aW9uOiBwb3NpdGlvbixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBnZW9kZXNpYzogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB3aWR0aDogMTBcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbiAgICBwcml2YXRlIGZpcnN0ID0gdHJ1ZTtcbiAgICBnZXRIZXJvZXMoKTogT2JzZXJ2YWJsZTxSZXNwb25zZT4ge1xuICAgICAgICByZXR1cm4gdGhpcy5odHRwLmdldChcImh0dHBzOi8vbWFwcy5nb29nbGVhcGlzLmNvbS9tYXBzL2FwaS9kaXJlY3Rpb25zL2pzb24/b3JpZ2luPVRvcm9udG8mZGVzdGluYXRpb249TW9udHJlYWwmYXZvaWQ9aGlnaHdheXMmbW9kZT1kcml2aW5nJmtleT1BSXphU3lDMVp6akFEOTFONGNmNkNLb24yYWlOQUZvanU5VjZSM0lcIilcbiAgICAgICAgICAgIC5jYXRjaCh0aGlzLmhhbmRsZUVycm9yKTtcbiAgICB9XG4gICAgcHJpdmF0ZSBoYW5kbGVFcnJvcihlcnJvcjogUmVzcG9uc2UgfCBhbnkpOiBhbnkge1xuICAgICAgICAvLyBJbiBhIHJlYWwgd29ybGQgYXBwLCB3ZSBtaWdodCB1c2UgYSByZW1vdGUgbG9nZ2luZyBpbmZyYXN0cnVjdHVyZVxuICAgICAgICBsZXQgZXJyTXNnOiBzdHJpbmc7XG4gICAgICAgIGlmIChlcnJvciBpbnN0YW5jZW9mIFJlc3BvbnNlKSB7XG4gICAgICAgICAgICBjb25zdCBib2R5ID0gZXJyb3IuanNvbigpIHx8ICcnO1xuICAgICAgICAgICAgY29uc3QgZXJyID0gKDxhbnk+Ym9keSkuZXJyb3IgfHwgSlNPTi5zdHJpbmdpZnkoYm9keSk7XG4gICAgICAgICAgICBlcnJNc2cgPSBgJHtlcnJvci5zdGF0dXN9IC0gJHtlcnJvci5zdGF0dXNUZXh0IHx8ICcnfSAke2Vycn1gO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgZXJyTXNnID0gZXJyb3IubWVzc2FnZSA/IGVycm9yLm1lc3NhZ2UgOiBlcnJvci50b1N0cmluZygpO1xuICAgICAgICB9XG4gICAgICAgIGNvbnNvbGUuZXJyb3IoZXJyTXNnKTtcbiAgICAgICAgcmV0dXJuIE9ic2VydmFibGUudGhyb3coZXJyTXNnKTtcbiAgICB9XG4gICAgcHJpdmF0ZSBleHRyYWN0RGF0YShyZXM6IFJlc3BvbnNlKTogYW55IHtcbiAgICAgICAgbGV0IGJvZHkgPSByZXMuanNvbigpO1xuICAgICAgICByZXR1cm4gKDxhbnk+Ym9keSkuZGF0YSB8fCB7fTtcbiAgICB9XG4gICAgcHVibGljIHJlbW92ZUNvbW1vbk1hcmsobWFya0luZm86IEFkZE1hcmtlckFyZ3MsIG1hcmtJZDogbnVtYmVyKTogdm9pZCB7XG4gICAgICAgIHZhciBtYXJrV3JhcHBlciA9IHRoaXMuZ2V0TWFya1dyYXBwZXIobWFya0lkKTtcbiAgICAgICAgdGhpcy5tYXBWaWV3LnJlbW92ZU1hcmtlcihtYXJrV3JhcHBlci5tYXJrKTtcbiAgICB9XG5cblxuICAgIHByaXZhdGUgZW5hYmxlTG9jYXRpb24oKSB7XG4gICAgICAgIGlmICghZ2VvbG9jYXRpb24uaXNFbmFibGVkKCkpIHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCdMb2NhdGlvbiBub3QgZW5hYmxlZCwgcmVxdWVzdGluZy4nKTtcbiAgICAgICAgICAgIHJldHVybiBnZW9sb2NhdGlvbi5lbmFibGVMb2NhdGlvblJlcXVlc3QoKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUodHJ1ZSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwcml2YXRlIGdldExvY2F0aW9uKCkge1xuICAgICAgICBpZiAoZ2VvbG9jYXRpb24uaXNFbmFibGVkKCkpIHtcbiAgICAgICAgICAgIHZhciBsb2NhdGlvbiA9IGdlb2xvY2F0aW9uLmdldEN1cnJlbnRMb2NhdGlvbih7XG4gICAgICAgICAgICAgICAgZGVzaXJlZEFjY3VyYWN5OiAxMCxcbiAgICAgICAgICAgICAgICB1cGRhdGVEaXN0YW5jZTogMTAsXG4gICAgICAgICAgICAgICAgbWluaW11bVVwZGF0ZVRpbWU6IDEwMDAsXG4gICAgICAgICAgICAgICAgbWF4aW11bUFnZTogMTAwMDBcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICByZXR1cm4gbG9jYXRpb247XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIFByb21pc2UucmVqZWN0KCdHZW9sb2NhdGlvbiBub3QgZW5hYmxlZC4nKTtcbiAgICB9XG5cbiAgICAvL01hcCBldmVudHNcbiAgICBwdWJsaWMgb25NYXBSZWFkeShldmVudCwgbWFwUmVhZHlOb3RpZnk6ICgpID0+IHZvaWQpIHtcbiAgICAgICAgaWYgKHRoaXMubWFwVmlldyB8fCAhZXZlbnQub2JqZWN0KSByZXR1cm47XG4gICAgICAgIHRoaXMubWFwVmlldyA9IGV2ZW50Lm9iamVjdDtcbiAgICAgICAgdGhpcy5tYXBWaWV3LnNldFN0eWxlKHN0eWxlKTtcbiAgICAgICAgLy9Ob3RpZmljbyBjdWFuZG8gZWwgbWFwYSBlc3RhIGxpc3RvXG4gICAgICAgIHRoaXMubWFwVmlldy5ub3RpZnlNYXBSZWFkeSA9ICgpID0+IHtcbiAgICAgICAgICAgIG1hcFJlYWR5Tm90aWZ5KCk7XG4gICAgICAgIH1cbiAgICAgICAgLy8gdGhpcy5tYXBWaWV3Lm1hcmtlclNlbGVjdCA9IHRoaXMub25NYXJrZXJTZWxlY3Q7XG4gICAgICAgIC8vIHRoaXMubWFwVmlldy5jYW1lcmFDaGFuZ2VkID0gdGhpcy5vbkNhbWVyYUNoYW5nZWQ7XG5cbiAgICAgICAgdGhpcy5lbmFibGVMb2NhdGlvbigpXG4gICAgICAgICAgICAudGhlbigoKSA9PiB7XG4gICAgICAgICAgICAgICAgdmFyIGxvY2F0aW9uID0gdGhpcy5nZXRMb2NhdGlvbigpO1xuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIC50aGVuKCgpID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLndhdGNoSWQgPSBnZW9sb2NhdGlvbi53YXRjaExvY2F0aW9uKChwKSA9PiB7IHRoaXMubG9jYXRpb25SZWNlaXZlZChwKSB9LCB0aGlzLmVycm9yLCB7XG4gICAgICAgICAgICAgICAgICAgIGRlc2lyZWRBY2N1cmFjeTogNTAsXG4gICAgICAgICAgICAgICAgICAgIHVwZGF0ZURpc3RhbmNlOiA1MCxcbiAgICAgICAgICAgICAgICAgICAgbWluaW11bVVwZGF0ZVRpbWU6IDEwMDAwLFxuICAgICAgICAgICAgICAgICAgICBtYXhpbXVtQWdlOiA2MDAwMFxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSwgdGhpcy5lcnJvcik7XG4gICAgfTtcbiAgICBnZXREaXN0YW5jZShsb2MxLCBsb2MyKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKFwiRGlzdGFuY2UgYmV0d2VlbiBsb2MxIGFuZCBsb2MyIGlzOiBcIiArIGdlb2xvY2F0aW9uLmRpc3RhbmNlKGxvYzEsIGxvYzIpKTtcbiAgICB9XG4gICAgbWFwVGFwcGVkID0gKGV2ZW50KSA9PiB7XG4gICAgICAgIGNvbnNvbGUubG9nKCdNYXAgVGFwcGVkJyk7XG5cbiAgICAgICAgdGhpcy50YXBMaW5lID0gdGhpcy5hZGRQb2ludFRvTGluZSh7XG4gICAgICAgICAgICBjb2xvcjogbmV3IENvbG9yKCdSZWQnKSxcbiAgICAgICAgICAgIGxpbmU6IHRoaXMudGFwTGluZSxcbiAgICAgICAgICAgIGxvY2F0aW9uOiBldmVudC5wb3NpdGlvbixcbiAgICAgICAgICAgIGdlb2Rlc2ljOiB0cnVlLFxuICAgICAgICAgICAgd2lkdGg6IDEwXG4gICAgICAgIH0pO1xuXG4gICAgICAgIHRoaXMucmVtb3ZlTWFya2VyKHRoaXMudGFwTWFya2VyKTtcbiAgICAgICAgdGhpcy50YXBNYXJrZXIgPSB0aGlzLmFkZE1hcmtlcih7XG4gICAgICAgICAgICBsb2NhdGlvbjogZXZlbnQucG9zaXRpb24sXG4gICAgICAgICAgICB0aXRsZTogJ1RhcCBMb2NhdGlvbidcbiAgICAgICAgfSk7XG4gICAgfTtcbiAgICBhZGRNYXJrZXIoYXJnczogQWRkTWFya2VyQXJncykge1xuICAgICAgICBpZiAoIXRoaXMubWFwVmlldyB8fCAhYXJncyB8fCAhYXJncy5sb2NhdGlvbikgcmV0dXJuO1xuXG4gICAgICAgIGxldCBtYXJrZXIgPSBuZXcgTWFya2VyKCk7XG4gICAgICAgIG1hcmtlci5wb3NpdGlvbiA9IFBvc2l0aW9uLnBvc2l0aW9uRnJvbUxhdExuZyhhcmdzLmxvY2F0aW9uLmxhdGl0dWRlLCBhcmdzLmxvY2F0aW9uLmxvbmdpdHVkZSk7XG4gICAgICAgIG1hcmtlci50aXRsZSA9IGFyZ3MudGl0bGU7XG4gICAgICAgIG1hcmtlci5zbmlwcGV0ID0gYXJncy50aXRsZTtcbiAgICAgICAgdGhpcy5tYXBWaWV3LmFkZE1hcmtlcihtYXJrZXIpO1xuXG4gICAgICAgIHJldHVybiBtYXJrZXI7XG4gICAgfTtcbiAgICAvL0ZsYWcgcHJpbWVyYSBjb25maWd1cmFjaW9uXG4gICAgcHJpdmF0ZSBmaXJzdENvbmZpZ3VyYXRpb25NYXAgPSBmYWxzZTtcbiAgICBwcml2YXRlIGxvY2F0aW9uUmVjZWl2ZWQgPSAocG9zaXRpb246IFBvc2l0aW9uKSA9PiB7XG4gICAgICAgIGlmICh0aGlzLm1hcFZpZXcgJiYgcG9zaXRpb24gJiYgIXRoaXMuZmlyc3RDb25maWd1cmF0aW9uTWFwKSB7XG4gICAgICAgICAgICB0aGlzLm1hcFZpZXcubGF0aXR1ZGUgPSBwb3NpdGlvbi5sYXRpdHVkZTtcbiAgICAgICAgICAgIHRoaXMubWFwVmlldy5sb25naXR1ZGUgPSBwb3NpdGlvbi5sb25naXR1ZGU7XG4gICAgICAgICAgICB0aGlzLm1hcFZpZXcuem9vbSA9IDE2O1xuICAgICAgICAgICAgdGhpcy5jZW50ZXJlZE9uTG9jYXRpb24gPSB0cnVlO1xuXG4gICAgICAgICAgICB0aGlzLmZpcnN0Q29uZmlndXJhdGlvbk1hcCA9IHRydWU7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRoaXMuZ3BzTWFya2VyID09IG51bGwpIHtcbiAgICAgICAgICAgIHZhciBtYXJrID0gdGhpcy5jcmVhdGVNYXJrKHtcbiAgICAgICAgICAgICAgICBsb2NhdGlvbjogcG9zaXRpb24sXG4gICAgICAgICAgICAgICAgdGl0bGU6ICdHUFMgTG9jYXRpb24nXG4gICAgICAgICAgICB9LCBcIn4vaW1hZ2VzL21lLW1hcmtlci5wbmdcIik7XG4gICAgICAgICAgICB2YXIgbWFya0luZm8gPSBuZXcgQWRkTWFya2VyQXJncygpO1xuICAgICAgICAgICAgbWFya0luZm8udGl0bGUgPSBcIlByaW5jaXBhbFwiO1xuICAgICAgICAgICAgbWFya0luZm8ubG9jYXRpb24gPSBwb3NpdGlvbjtcbiAgICAgICAgICAgIHZhciB3cnAgPSB0aGlzLmNyZWF0ZU1hcmtXcmFwcGVyKG1hcmtJbmZvLCAxMjM0LCBNYXJrV3JhcHBlclR5cGVFbnVtLk1lKTtcbiAgICAgICAgICAgIHRoaXMubWFya0xpc3QucHVzaCh3cnApO1xuICAgICAgICAgICAgdGhpcy5ncHNNYXJrZXIgPSB3cnA7XG4gICAgICAgICAgICB0aGlzLm1hcFZpZXcuYWRkTWFya2VyKHdycC5tYXJrKVxuXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLm1hcFZpZXcubGF0aXR1ZGUgPSBwb3NpdGlvbi5sYXRpdHVkZTtcbiAgICAgICAgICAgIHRoaXMubWFwVmlldy5sb25naXR1ZGUgPSBwb3NpdGlvbi5sb25naXR1ZGU7XG4gICAgICAgICAgICB2YXIgd3JwID0gdGhpcy5nZXRNYXJrV3JhcHBlcigxMjM0KTtcbiAgICAgICAgICAgIHRoaXMubWFwVmlldy5yZW1vdmVNYXJrZXIod3JwLm1hcmspO1xuICAgICAgICAgICAgd3JwLm1hcmsucG9zaXRpb24ubGF0aXR1ZGUgPSBwb3NpdGlvbi5sYXRpdHVkZTtcbiAgICAgICAgICAgIHdycC5tYXJrLnBvc2l0aW9uLmxvbmdpdHVkZSA9IHBvc2l0aW9uLmxvbmdpdHVkZTtcbiAgICAgICAgICAgIHRoaXMubWFwVmlldy5hZGRNYXJrZXIod3JwLm1hcmspXG4gICAgICAgICAgICAvLyB0aGlzLmdwc0xpbmUgPSB0aGlzLmFkZFBvaW50VG9MaW5lKHtcbiAgICAgICAgICAgIC8vICAgICBjb2xvcjogbmV3IENvbG9yKCdHcmVlbicpLFxuICAgICAgICAgICAgLy8gICAgIGxpbmU6IHRoaXMuZ3BzTGluZSxcbiAgICAgICAgICAgIC8vICAgICBsb2NhdGlvbjogcG9zaXRpb24sXG4gICAgICAgICAgICAvLyAgICAgZ2VvZGVzaWM6IHRydWUsXG4gICAgICAgICAgICAvLyAgICAgd2lkdGg6IDEwXG4gICAgICAgICAgICAvLyB9KTtcblxuICAgICAgICAgICAgdGhpcy5nZXREaXN0YW5jZSh0aGlzLm1hcmtMaXN0WzBdLm1hcmsucG9zaXRpb24sIHdycC5tYXJrLnBvc2l0aW9uKTtcblxuICAgICAgICB9XG4gICAgfTtcblxuICAgIHByaXZhdGUgYWRkUG9pbnRUb0xpbmUoYXJnczogQWRkTGluZUFyZ3MpIHtcbiAgICAgICAgaWYgKCF0aGlzLm1hcFZpZXcgfHwgIWFyZ3MgfHwgIWFyZ3MubG9jYXRpb24pIHJldHVybjtcblxuICAgICAgICBsZXQgbGluZSA9IGFyZ3MubGluZTtcblxuICAgICAgICBpZiAoIWxpbmUpIHtcbiAgICAgICAgICAgIGxpbmUgPSBuZXcgUG9seWxpbmUoKTtcbiAgICAgICAgICAgIGxpbmUudmlzaWJsZSA9IHRydWU7XG4gICAgICAgICAgICBsaW5lLndpZHRoID0gYXJncy53aWR0aCB8fCAxMDtcbiAgICAgICAgICAgIGxpbmUuY29sb3IgPSBhcmdzLmNvbG9yIHx8IG5ldyBDb2xvcignUmVkJyk7XG4gICAgICAgICAgICBsaW5lLmdlb2Rlc2ljID0gYXJncy5nZW9kZXNpYyAhPSB1bmRlZmluZWQgPyBhcmdzLmdlb2Rlc2ljIDogdHJ1ZTtcbiAgICAgICAgICAgIHRoaXMubWFwVmlldy5hZGRQb2x5bGluZShsaW5lKTtcbiAgICAgICAgfVxuICAgICAgICBsaW5lLmFkZFBvaW50KFBvc2l0aW9uLnBvc2l0aW9uRnJvbUxhdExuZyhhcmdzLmxvY2F0aW9uLmxhdGl0dWRlLCBhcmdzLmxvY2F0aW9uLmxvbmdpdHVkZSkpO1xuXG4gICAgICAgIHJldHVybiBsaW5lO1xuICAgIH1cbiAgICBwcml2YXRlIGNyZWF0ZU1hcmsoYXJnczogQWRkTWFya2VyQXJncywgaW1nU3JjOiBzdHJpbmcgPSBcIn4vaW1hZ2VzL2ZyaWVuZC1tYXJrZXIucG5nXCIpOiBNYXJrZXIge1xuICAgICAgICBpZiAoIXRoaXMubWFwVmlldyB8fCAhYXJncyB8fCAhYXJncy5sb2NhdGlvbikgcmV0dXJuO1xuXG4gICAgICAgIGxldCBtYXJrID0gbmV3IE1hcmtlcigpO1xuICAgICAgICBtYXJrLnBvc2l0aW9uID0gUG9zaXRpb24ucG9zaXRpb25Gcm9tTGF0TG5nKGFyZ3MubG9jYXRpb24ubGF0aXR1ZGUsIGFyZ3MubG9jYXRpb24ubG9uZ2l0dWRlKTtcbiAgICAgICAgbWFyay50aXRsZSA9IGFyZ3MudGl0bGU7XG4gICAgICAgIG1hcmsuc25pcHBldCA9IGFyZ3MudGl0bGU7XG4gICAgICAgIHZhciBpbWFnZSA9IG5ldyBJbWFnZSgpO1xuICAgICAgICBpbWFnZS5zcmMgPSBpbWdTcmM7XG4gICAgICAgIGltYWdlLndpZHRoID0gMTA7XG4gICAgICAgIGltYWdlLmhlaWdodCA9IDEwO1xuICAgICAgICBtYXJrLmljb24gPSBpbWFnZTtcblxuICAgICAgICAvLyAoPGFueT5tYXJrKS5pbmZvV2luZG93VGVtcGxhdGUgPSAnfi9zaGFyZWQvc2VydmljZXMvbWFwL2luZm8td2luZG93JztcbiAgICAgICAgLy8gdGhpcy5tYXBWaWV3LmFkZE1hcmtlcihtYXJrKTtcbiAgICAgICAgLy9tYXJrLnNob3dJbmZvV2luZG93KCk7XG5cbiAgICAgICAgLy8gICB2YXIgIG1hcmtlcnMgPSBuZXcgbWFwc01vZHVsZS5NYXJrZXIoKTtcbiAgICAgICAgLy8gICAgIG1hcmtlcnMucG9zaXRpb24gPSBtYXBzTW9kdWxlLlBvc2l0aW9uLnBvc2l0aW9uRnJvbUxhdExuZygtMzMuNjYsIDE1MS4yMCk7XG4gICAgICAgIC8vICAgICBtYXJrZXJzLnRpdGxlID0gXCJTZWVlZWVlZWVlZWVlXCI7XG4gICAgICAgIC8vICAgICAoPGFueT5tYXJrZXJzKS5pbmZvV2luZG93VGVtcGxhdGUgPSAnfi9zaGFyZWQvc2VydmljZXMvbWFwL2luZm8td2luZG93JztcbiAgICAgICAgLy8gICAgICB0aGlzLm1hcFZpZXcuYWRkTWFya2VyKG1hcmtlcnMpO1xuICAgICAgICAvLyAgICAgbWFya2Vycy5zaG93SW5mb1dpbmRvdygpO1xuXG4gICAgICAgIHJldHVybiBtYXJrO1xuICAgIH07XG5cbiAgICBwcml2YXRlIGNsZWFyR3BzTGluZSgpIHtcbiAgICAgICAgdGhpcy5yZW1vdmVMaW5lKHRoaXMuZ3BzTGluZSk7XG4gICAgICAgIHRoaXMuZ3BzTGluZSA9IG51bGw7XG5cbiAgICB9O1xuXG4gICAgcHJpdmF0ZSBjbGVhclRhcExpbmUoKSB7XG4gICAgICAgIHRoaXMucmVtb3ZlTGluZSh0aGlzLnRhcExpbmUpO1xuICAgICAgICB0aGlzLnRhcExpbmUgPSBudWxsO1xuICAgICAgICB0aGlzLnJlbW92ZU1hcmtlcih0aGlzLnRhcE1hcmtlcik7XG4gICAgICAgIHRoaXMudGFwTWFya2VyID0gbnVsbDtcblxuICAgIH1cblxuICAgIHByaXZhdGUgcmVtb3ZlTGluZShsaW5lOiBQb2x5bGluZSkge1xuICAgICAgICBpZiAobGluZSkge1xuICAgICAgICAgICAgbGluZS5yZW1vdmVBbGxQb2ludHMoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHByaXZhdGUgcmVtb3ZlTWFya2VyKG1hcmtlcjogTWFya2VyKSB7XG4gICAgICAgIGlmICh0aGlzLm1hcFZpZXcgJiYgbWFya2VyKSB7XG4gICAgICAgICAgICB0aGlzLm1hcFZpZXcucmVtb3ZlTWFya2VyKG1hcmtlcik7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwcml2YXRlIGVycm9yKGVycikge1xuICAgICAgICBjb25zb2xlLmxvZygnRXJyb3I6ICcgKyBKU09OLnN0cmluZ2lmeShlcnIpKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIG9uTWFya2VyU2VsZWN0KGV2ZW50KSB7XG4gICAgICAgIGNvbnNvbGUubG9nKCdDbGlja2VkIG9uICcgKyBldmVudC5tYXJrZXIudGl0bGUpO1xuICAgIH1cblxuICAgIHByaXZhdGUgb25DYW1lcmFDaGFuZ2VkKGV2ZW50KSB7XG4gICAgICAgIGNvbnNvbGUubG9nKCdDYW1lcmEgY2hhbmdlZDogJyArIEpTT04uc3RyaW5naWZ5KGV2ZW50LmNhbWVyYSkpO1xuICAgIH1cbn1cblxuXG5leHBvcnQgY2xhc3MgQWRkTGluZUFyZ3Mge1xuICAgIHB1YmxpYyBjb2xvcjogQ29sb3I7XG4gICAgcHVibGljIGxpbmU6IFBvbHlsaW5lO1xuICAgIHB1YmxpYyBsb2NhdGlvbjogUG9zaXRpb247XG4gICAgcHVibGljIGdlb2Rlc2ljOiBib29sZWFuO1xuICAgIHB1YmxpYyB3aWR0aDogbnVtYmVyO1xufVxuXG5leHBvcnQgY2xhc3MgQWRkTWFya2VyQXJncyB7XG4gICAgcHVibGljIGxvY2F0aW9uOiBQb3NpdGlvbjtcbiAgICBwdWJsaWMgdGl0bGU6IHN0cmluZztcbn1cblxuY2xhc3MgTWFya1dyYXBwZXIge1xuICAgIG1hcmtJZDogbnVtYmVyO1xuICAgIGNvbnN0cnVjdG9yKHB1YmxpYyBtYXJrOiBNYXJrZXIsIHByaXZhdGUgbWFya1R5cGU6IE1hcmtXcmFwcGVyVHlwZUVudW0pIHsgfVxufVxuZW51bSBNYXJrV3JhcHBlclR5cGVFbnVtIHtcbiAgICBGcmllbmQsXG4gICAgTWUsXG4gICAgR3JvdXBcbn0iXX0=