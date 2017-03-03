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
                _this.mapView.zoom = 2;
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
                    var positions = new Array();
                    for (var _i = 0, _a = response.routes[0].legs[0].steps; _i < _a.length; _i++) {
                        var item = _a[_i];
                        var start = item.start_location;
                        var end = item.end_location;
                        var positionStart = nativescript_google_maps_sdk_1.Position.positionFromLatLng(start.lat, start.lng);
                        positions.push(positionStart);
                        var positionEnd = nativescript_google_maps_sdk_1.Position.positionFromLatLng(end.lat, end.lng);
                        positions.push(positionEnd);
                    }
                    _this.drawWay(positions);
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
    //dibuja un camino, con las positions que recibe como parametro
    MapViewService.prototype.drawWay = function (positions) {
        var poli;
        for (var _i = 0, positions_1 = positions; _i < positions_1.length; _i++) {
            var item = positions_1[_i];
            poli = this.addPointToLine({
                color: new color_1.Color('Pink'),
                line: poli,
                location: item,
                geodesic: true,
                width: 10
            });
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
        this.markDrawWayList = new Array();
    }
    MarkWrapper.prototype.addMarkDrawWay = function (mark) {
    };
    return MarkWrapper;
}());
var MarkWrapperTypeEnum;
(function (MarkWrapperTypeEnum) {
    MarkWrapperTypeEnum[MarkWrapperTypeEnum["Friend"] = 0] = "Friend";
    MarkWrapperTypeEnum[MarkWrapperTypeEnum["Me"] = 1] = "Me";
    MarkWrapperTypeEnum[MarkWrapperTypeEnum["Group"] = 2] = "Group";
})(MarkWrapperTypeEnum || (MarkWrapperTypeEnum = {}));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFwLXZpZXcuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIm1hcC12aWV3LnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLHNDQUEyQztBQUMzQyw4QkFBcUM7QUFDckMsZ0NBQThCO0FBQzlCLGlDQUErQjtBQUMvQixtQ0FBaUM7QUFDakMsa0NBQWlDO0FBQ2pDLDZFQUFtRjtBQUNuRixJQUFJLFVBQVUsR0FBRyxPQUFPLENBQUMsOEJBQThCLENBQUMsQ0FBQztBQUN6RCxJQUFJLFdBQVcsR0FBRyxPQUFPLENBQUMsMEJBQTBCLENBQUMsQ0FBQztBQUN0RCxJQUFJLEtBQUssR0FBRyxPQUFPLENBQUMsa0JBQWtCLENBQUMsQ0FBQztBQUN4QywrQkFBOEI7QUFDOUIsMkVBQXlFO0FBQ3pFLHNDQUErQztBQUcvQyxJQUFhLGNBQWM7SUFXdkIsd0JBQW9CLGFBQTZCLEVBQ3JDLElBQVU7UUFEdEIsaUJBT0M7UUFQbUIsa0JBQWEsR0FBYixhQUFhLENBQWdCO1FBQ3JDLFNBQUksR0FBSixJQUFJLENBQU07UUFYdEIsUUFBUTtRQUNBLFlBQU8sR0FBWSxJQUFJLENBQUM7UUFDaEMsWUFBTyxHQUFXLElBQUksQ0FBQztRQU12Qix1QkFBa0IsR0FBWSxLQUFLLENBQUM7UUFDNUIsYUFBUSxHQUF1QixJQUFJLEtBQUssRUFBZSxDQUFDO1FBdUV4RCxVQUFLLEdBQUcsSUFBSSxDQUFDO1FBOEZyQixjQUFTLEdBQUcsVUFBQyxLQUFLO1lBQ2QsT0FBTyxDQUFDLEdBQUcsQ0FBQyxZQUFZLENBQUMsQ0FBQztZQUUxQixLQUFJLENBQUMsT0FBTyxHQUFHLEtBQUksQ0FBQyxjQUFjLENBQUM7Z0JBQy9CLEtBQUssRUFBRSxJQUFJLGFBQUssQ0FBQyxLQUFLLENBQUM7Z0JBQ3ZCLElBQUksRUFBRSxLQUFJLENBQUMsT0FBTztnQkFDbEIsUUFBUSxFQUFFLEtBQUssQ0FBQyxRQUFRO2dCQUN4QixRQUFRLEVBQUUsSUFBSTtnQkFD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QyxLQUFLLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQztJQUNuRSxDQUFDO0lBQ0wscUJBQUM7QUFBRCxDQUFDLEFBdlVELElBdVVDO0FBdlVZLGNBQWM7SUFEMUIsaUJBQVUsRUFBRTtxQ0FZMEIsZ0NBQWM7UUFDL0IsV0FBSTtHQVpiLGNBQWMsQ0F1VTFCO0FBdlVZLHdDQUFjO0FBMFUzQjtJQUFBO0lBTUEsQ0FBQztJQUFELGtCQUFDO0FBQUQsQ0FBQyxBQU5ELElBTUM7QUFOWSxrQ0FBVztBQVF4QjtJQUFBO0lBR0EsQ0FBQztJQUFELG9CQUFDO0FBQUQsQ0FBQyxBQUhELElBR0M7QUFIWSxzQ0FBYTtBQUsxQjtJQUdJLHFCQUFtQixJQUFZLEVBQVUsUUFBNkI7UUFBbkQsU0FBSSxHQUFKLElBQUksQ0FBUTtRQUFVLGFBQVEsR0FBUixRQUFRLENBQXFCO1FBRDlELG9CQUFlLEdBQXVCLElBQUksS0FBSyxFQUFlLENBQUM7SUFDRyxDQUFDO0lBQzNFLG9DQUFjLEdBQWQsVUFBZSxJQUFpQjtJQUVoQyxDQUFDO0lBQ0wsa0JBQUM7QUFBRCxDQUFDLEFBUEQsSUFPQztBQUNELElBQUssbUJBSUo7QUFKRCxXQUFLLG1CQUFtQjtJQUNwQixpRUFBTSxDQUFBO0lBQ04seURBQUUsQ0FBQTtJQUNGLCtEQUFLLENBQUE7QUFDVCxDQUFDLEVBSkksbUJBQW1CLEtBQW5CLG1CQUFtQixRQUl2QiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSB9IGZyb20gXCJyeGpzL1J4XCI7XG5pbXBvcnQgXCJyeGpzL2FkZC9vcGVyYXRvci9kb1wiO1xuaW1wb3J0IFwicnhqcy9hZGQvb3BlcmF0b3IvbWFwXCI7XG5pbXBvcnQgJ3J4anMvYWRkL29wZXJhdG9yL2NhdGNoJztcbmltcG9ydCB7IEltYWdlIH0gZnJvbSBcInVpL2ltYWdlXCI7XG5pbXBvcnQgeyBNYXBWaWV3LCBNYXJrZXIsIFBvbHlsaW5lLCBQb3NpdGlvbiB9IGZyb20gJ25hdGl2ZXNjcmlwdC1nb29nbGUtbWFwcy1zZGsnO1xudmFyIG1hcHNNb2R1bGUgPSByZXF1aXJlKFwibmF0aXZlc2NyaXB0LWdvb2dsZS1tYXBzLXNka1wiKTtcbmxldCBnZW9sb2NhdGlvbiA9IHJlcXVpcmUoJ25hdGl2ZXNjcmlwdC1nZW9sb2NhdGlvbicpO1xudmFyIHN0eWxlID0gcmVxdWlyZSgnLi9tYXAtc3R5bGUuanNvbicpO1xuaW1wb3J0IHsgQ29sb3IgfSBmcm9tICdjb2xvcic7XG5pbXBvcnQgeyBGcmllbmRzU2VydmljZSB9IGZyb20gJy4uLy4uLy4uL3NoYXJlZC9mcmllbmRzL2ZyaWVuZHMuc2VydmljZSc7XG5pbXBvcnQgeyBIdHRwLCBSZXNwb25zZSB9IGZyb20gJ0Bhbmd1bGFyL2h0dHAnO1xuaW1wb3J0IHsgcm91dGVzIH0gZnJvbSAnLi4vLi4vLi4vYXBwLnJvdXRpbmcnO1xuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIE1hcFZpZXdTZXJ2aWNlIHtcbiAgICAvLyNNYXBhIFxuICAgIHByaXZhdGUgbWFwVmlldzogTWFwVmlldyA9IG51bGw7XG4gICAgd2F0Y2hJZDogbnVtYmVyID0gbnVsbDtcbiAgICBncHNMaW5lOiBQb2x5bGluZTtcbiAgICB0ZXN0TGluZTogUG9seWxpbmU7XG4gICAgdGFwTGluZTogUG9seWxpbmU7XG4gICAgdGFwTWFya2VyOiBhbnk7XG4gICAgZ3BzTWFya2VyOiBNYXJrV3JhcHBlcjtcbiAgICBjZW50ZXJlZE9uTG9jYXRpb246IGJvb2xlYW4gPSBmYWxzZTtcbiAgICBwcml2YXRlIG1hcmtMaXN0OiBBcnJheTxNYXJrV3JhcHBlcj4gPSBuZXcgQXJyYXk8TWFya1dyYXBwZXI+KCk7XG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSBmcmllbmRTZXJ2aWNlOiBGcmllbmRzU2VydmljZSxcbiAgICAgICAgcHJpdmF0ZSBodHRwOiBIdHRwKSB7XG4gICAgICAgIGlmICghZ2VvbG9jYXRpb24uaXNFbmFibGVkKCkpIHtcbiAgICAgICAgICAgIGdlb2xvY2F0aW9uLmVuYWJsZUxvY2F0aW9uUmVxdWVzdCgpO1xuXG4gICAgICAgIH1cblxuICAgIH1cblxuICAgIG5nT25Jbml0KCkge1xuXG4gICAgfVxuXG4gICAgLy9Qcml2YXRlIE1ldGhvZHNcbiAgICBwdWJsaWMgY3JlYXRlTWFya1dyYXBwZXIobWFya0luZm86IEFkZE1hcmtlckFyZ3MsIG1hcmtJZDogbnVtYmVyLCBtYXJrVHlwZTogTWFya1dyYXBwZXJUeXBlRW51bSk6IE1hcmtXcmFwcGVyIHtcbiAgICAgICAgLy9DcmVvIHVuIE1hcmtXcmFwcGVyIGVsIGN1YWwgcmVsYWNpb25hIGVsIE1hcmtlciBjb24gZWwgaWQgZGVsIHVzdWFyaW8gZGlidWphZG9cbiAgICAgICAgdmFyIG1hcmsgPSBuZXcgQWRkTWFya2VyQXJncygpO1xuICAgICAgICBtYXJrLnRpdGxlID0gbWFya0luZm8udGl0bGU7XG4gICAgICAgIG1hcmsubG9jYXRpb24gPSBuZXcgUG9zaXRpb24oKTtcbiAgICAgICAgbWFyay5sb2NhdGlvbi5sYXRpdHVkZSA9IG1hcmtJbmZvLmxvY2F0aW9uLmxhdGl0dWRlO1xuICAgICAgICBtYXJrLmxvY2F0aW9uLmxvbmdpdHVkZSA9IG1hcmtJbmZvLmxvY2F0aW9uLmxvbmdpdHVkZTtcblxuICAgICAgICB2YXIgbWFwTWFyazogTWFya2VyID0gbnVsbDtcbiAgICAgICAgaWYgKG1hcmtUeXBlID09IE1hcmtXcmFwcGVyVHlwZUVudW0uTWUpXG4gICAgICAgICAgICBtYXBNYXJrID0gdGhpcy5jcmVhdGVNYXJrKG1hcmssIFwifi9pbWFnZXMvbWUtbWFya2VyLnBuZ1wiKTtcbiAgICAgICAgZWxzZVxuICAgICAgICAgICAgbWFwTWFyayA9IHRoaXMuY3JlYXRlTWFyayhtYXJrKTtcbiAgICAgICAgdmFyIG1hcmtXcmFwcGVyID0gbmV3IE1hcmtXcmFwcGVyKG1hcE1hcmssIG1hcmtUeXBlKTtcbiAgICAgICAgbWFya1dyYXBwZXIubWFya0lkID0gbWFya0lkO1xuICAgICAgICByZXR1cm4gbWFya1dyYXBwZXI7XG4gICAgfVxuICAgIHByaXZhdGUgZ2V0TWFya1dyYXBwZXIobWFya0lkOiBudW1iZXIpOiBNYXJrV3JhcHBlciB7XG4gICAgICAgIC8vUmVncmVzbyB1biBtYXJrV3JhcHBlciBwb3IgSURcbiAgICAgICAgZm9yICh2YXIgaXRlbSBvZiB0aGlzLm1hcmtMaXN0KVxuICAgICAgICAgICAgaWYgKGl0ZW0ubWFya0lkID09IG1hcmtJZClcbiAgICAgICAgICAgICAgICByZXR1cm4gaXRlbTtcblxuICAgIH1cbiAgICAvL1B1YmxpYyBNZXRob2RzXG4gICAgcHVibGljIGFkZENvbW1vbk1hcmsobWFya0luZm86IEFkZE1hcmtlckFyZ3MsIG1hcmtJZDogbnVtYmVyKTogdm9pZCB7XG4gICAgICAgIHZhciBtYXJrV3JhcHBlciA9IHRoaXMuY3JlYXRlTWFya1dyYXBwZXIobWFya0luZm8sIG1hcmtJZCwgTWFya1dyYXBwZXJUeXBlRW51bS5GcmllbmQpO1xuICAgICAgICB0aGlzLm1hcmtMaXN0LnB1c2gobWFya1dyYXBwZXIpO1xuICAgICAgICB0aGlzLm1hcFZpZXcuYWRkTWFya2VyKG1hcmtXcmFwcGVyLm1hcmspO1xuXG5cbiAgICB9XG4gICAgcHVibGljIHVwZGF0ZUNvbW1vbk1hcmsobWFya0luZm86IEFkZE1hcmtlckFyZ3MsIG1hcmtJZDogbnVtYmVyKTogdm9pZCB7XG4gICAgICAgIHZhciBtYXJrV3JhcHBlciA9IHRoaXMuZ2V0TWFya1dyYXBwZXIobWFya0lkKTtcbiAgICAgICAgaWYgKG1hcmtXcmFwcGVyICE9IG51bGwpIHtcbiAgICAgICAgICAgIC8vIHRoaXMubWFwVmlldy5yZW1vdmVNYXJrZXIobWFya1dyYXBwZXIubWFyayk7XG4gICAgICAgICAgICBtYXJrV3JhcHBlci5tYXJrLnBvc2l0aW9uID0gbWFya0luZm8ubG9jYXRpb247XG4gICAgICAgICAgICAvLyB0aGlzLm1hcFZpZXcuYWRkTWFya2VyKG1hcmtXcmFwcGVyLm1hcmspO1xuICAgICAgICAgICAgaWYgKHRoaXMuZmlyc3QpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmZpcnN0ID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgdGhpcy5nZXRIZXJvZXMoKS5zdWJzY3JpYmUoeCA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHZhciByZXNwb25zZTogZ29vZ2xlLm1hcHMuRGlyZWN0aW9uc1Jlc3VsdCA9IHguanNvbigpO1xuICAgICAgICAgICAgICAgICAgICB2YXIgcG9zaXRpb25zOiBBcnJheTxQb3NpdGlvbj4gPSBuZXcgQXJyYXk8UG9zaXRpb24+KCk7XG4gICAgICAgICAgICAgICAgICAgIGZvciAodmFyIGl0ZW0gb2YgcmVzcG9uc2Uucm91dGVzWzBdLmxlZ3NbMF0uc3RlcHMpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBzdGFydDogYW55ID0gaXRlbS5zdGFydF9sb2NhdGlvbjtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBlbmQ6IGFueSA9IGl0ZW0uZW5kX2xvY2F0aW9uO1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHBvc2l0aW9uU3RhcnQgPSBQb3NpdGlvbi5wb3NpdGlvbkZyb21MYXRMbmcoc3RhcnQubGF0LCBzdGFydC5sbmcpO1xuICAgICAgICAgICAgICAgICAgICAgICAgcG9zaXRpb25zLnB1c2gocG9zaXRpb25TdGFydCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgcG9zaXRpb25FbmQgPSBQb3NpdGlvbi5wb3NpdGlvbkZyb21MYXRMbmcoZW5kLmxhdCwgZW5kLmxuZyk7XG4gICAgICAgICAgICAgICAgICAgICAgICBwb3NpdGlvbnMucHVzaChwb3NpdGlvbkVuZCk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgdGhpcy5kcmF3V2F5KHBvc2l0aW9ucylcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbiAgICBwcml2YXRlIGZpcnN0ID0gdHJ1ZTtcbiAgICBnZXRIZXJvZXMoKTogT2JzZXJ2YWJsZTxSZXNwb25zZT4ge1xuICAgICAgICByZXR1cm4gdGhpcy5odHRwLmdldChcImh0dHBzOi8vbWFwcy5nb29nbGVhcGlzLmNvbS9tYXBzL2FwaS9kaXJlY3Rpb25zL2pzb24/b3JpZ2luPVRvcm9udG8mZGVzdGluYXRpb249TW9udHJlYWwmYXZvaWQ9aGlnaHdheXMmbW9kZT1kcml2aW5nJmtleT1BSXphU3lDMVp6akFEOTFONGNmNkNLb24yYWlOQUZvanU5VjZSM0lcIilcbiAgICAgICAgICAgIC5jYXRjaCh0aGlzLmhhbmRsZUVycm9yKTtcbiAgICB9XG4gICAgcHJpdmF0ZSBoYW5kbGVFcnJvcihlcnJvcjogUmVzcG9uc2UgfCBhbnkpOiBhbnkge1xuICAgICAgICAvLyBJbiBhIHJlYWwgd29ybGQgYXBwLCB3ZSBtaWdodCB1c2UgYSByZW1vdGUgbG9nZ2luZyBpbmZyYXN0cnVjdHVyZVxuICAgICAgICBsZXQgZXJyTXNnOiBzdHJpbmc7XG4gICAgICAgIGlmIChlcnJvciBpbnN0YW5jZW9mIFJlc3BvbnNlKSB7XG4gICAgICAgICAgICBjb25zdCBib2R5ID0gZXJyb3IuanNvbigpIHx8ICcnO1xuICAgICAgICAgICAgY29uc3QgZXJyID0gKDxhbnk+Ym9keSkuZXJyb3IgfHwgSlNPTi5zdHJpbmdpZnkoYm9keSk7XG4gICAgICAgICAgICBlcnJNc2cgPSBgJHtlcnJvci5zdGF0dXN9IC0gJHtlcnJvci5zdGF0dXNUZXh0IHx8ICcnfSAke2Vycn1gO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgZXJyTXNnID0gZXJyb3IubWVzc2FnZSA/IGVycm9yLm1lc3NhZ2UgOiBlcnJvci50b1N0cmluZygpO1xuICAgICAgICB9XG4gICAgICAgIGNvbnNvbGUuZXJyb3IoZXJyTXNnKTtcbiAgICAgICAgcmV0dXJuIE9ic2VydmFibGUudGhyb3coZXJyTXNnKTtcbiAgICB9XG4gICAgcHJpdmF0ZSBleHRyYWN0RGF0YShyZXM6IFJlc3BvbnNlKTogYW55IHtcbiAgICAgICAgbGV0IGJvZHkgPSByZXMuanNvbigpO1xuICAgICAgICByZXR1cm4gKDxhbnk+Ym9keSkuZGF0YSB8fCB7fTtcbiAgICB9XG5cbiAgICAvL2RpYnVqYSB1biBjYW1pbm8sIGNvbiBsYXMgcG9zaXRpb25zIHF1ZSByZWNpYmUgY29tbyBwYXJhbWV0cm9cbiAgICBwcml2YXRlIGRyYXdXYXkocG9zaXRpb25zOiBBcnJheTxQb3NpdGlvbj4pOiB2b2lkIHtcbiAgICAgICAgdmFyIHBvbGk6IFBvbHlsaW5lO1xuICAgICAgICBmb3IgKHZhciBpdGVtIG9mIHBvc2l0aW9ucykge1xuXG4gICAgICAgICAgICBwb2xpID0gdGhpcy5hZGRQb2ludFRvTGluZSh7XG4gICAgICAgICAgICAgICAgY29sb3I6IG5ldyBDb2xvcignUGluaycpLFxuICAgICAgICAgICAgICAgIGxpbmU6IHBvbGksXG4gICAgICAgICAgICAgICAgbG9jYXRpb246IGl0ZW0sXG4gICAgICAgICAgICAgICAgZ2VvZGVzaWM6IHRydWUsXG4gICAgICAgICAgICAgICAgd2lkdGg6IDEwXG4gICAgICAgICAgICB9KTtcblxuICAgICAgICB9XG4gICAgfVxuICAgIHB1YmxpYyByZW1vdmVDb21tb25NYXJrKG1hcmtJbmZvOiBBZGRNYXJrZXJBcmdzLCBtYXJrSWQ6IG51bWJlcik6IHZvaWQge1xuICAgICAgICB2YXIgbWFya1dyYXBwZXIgPSB0aGlzLmdldE1hcmtXcmFwcGVyKG1hcmtJZCk7XG4gICAgICAgIHRoaXMubWFwVmlldy5yZW1vdmVNYXJrZXIobWFya1dyYXBwZXIubWFyayk7XG4gICAgfVxuXG5cbiAgICBwcml2YXRlIGVuYWJsZUxvY2F0aW9uKCkge1xuICAgICAgICBpZiAoIWdlb2xvY2F0aW9uLmlzRW5hYmxlZCgpKSB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZygnTG9jYXRpb24gbm90IGVuYWJsZWQsIHJlcXVlc3RpbmcuJyk7XG4gICAgICAgICAgICByZXR1cm4gZ2VvbG9jYXRpb24uZW5hYmxlTG9jYXRpb25SZXF1ZXN0KCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKHRydWUpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBnZXRMb2NhdGlvbigpIHtcbiAgICAgICAgaWYgKGdlb2xvY2F0aW9uLmlzRW5hYmxlZCgpKSB7XG4gICAgICAgICAgICB2YXIgbG9jYXRpb24gPSBnZW9sb2NhdGlvbi5nZXRDdXJyZW50TG9jYXRpb24oe1xuICAgICAgICAgICAgICAgIGRlc2lyZWRBY2N1cmFjeTogMTAsXG4gICAgICAgICAgICAgICAgdXBkYXRlRGlzdGFuY2U6IDEwLFxuICAgICAgICAgICAgICAgIG1pbmltdW1VcGRhdGVUaW1lOiAxMDAwLFxuICAgICAgICAgICAgICAgIG1heGltdW1BZ2U6IDEwMDAwXG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgcmV0dXJuIGxvY2F0aW9uO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBQcm9taXNlLnJlamVjdCgnR2VvbG9jYXRpb24gbm90IGVuYWJsZWQuJyk7XG4gICAgfVxuXG4gICAgLy9NYXAgZXZlbnRzXG4gICAgcHVibGljIG9uTWFwUmVhZHkoZXZlbnQsIG1hcFJlYWR5Tm90aWZ5OiAoKSA9PiB2b2lkKSB7XG4gICAgICAgIGlmICh0aGlzLm1hcFZpZXcgfHwgIWV2ZW50Lm9iamVjdCkgcmV0dXJuO1xuICAgICAgICB0aGlzLm1hcFZpZXcgPSBldmVudC5vYmplY3Q7XG4gICAgICAgIHRoaXMubWFwVmlldy5zZXRTdHlsZShzdHlsZSk7XG4gICAgICAgIC8vTm90aWZpY28gY3VhbmRvIGVsIG1hcGEgZXN0YSBsaXN0b1xuICAgICAgICB0aGlzLm1hcFZpZXcubm90aWZ5TWFwUmVhZHkgPSAoKSA9PiB7XG4gICAgICAgICAgICBtYXBSZWFkeU5vdGlmeSgpO1xuICAgICAgICB9XG4gICAgICAgIC8vIHRoaXMubWFwVmlldy5tYXJrZXJTZWxlY3QgPSB0aGlzLm9uTWFya2VyU2VsZWN0O1xuICAgICAgICAvLyB0aGlzLm1hcFZpZXcuY2FtZXJhQ2hhbmdlZCA9IHRoaXMub25DYW1lcmFDaGFuZ2VkO1xuXG4gICAgICAgIHRoaXMuZW5hYmxlTG9jYXRpb24oKVxuICAgICAgICAgICAgLnRoZW4oKCkgPT4ge1xuICAgICAgICAgICAgICAgIHZhciBsb2NhdGlvbiA9IHRoaXMuZ2V0TG9jYXRpb24oKTtcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAudGhlbigoKSA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy53YXRjaElkID0gZ2VvbG9jYXRpb24ud2F0Y2hMb2NhdGlvbigocCkgPT4geyB0aGlzLmxvY2F0aW9uUmVjZWl2ZWQocCkgfSwgdGhpcy5lcnJvciwge1xuICAgICAgICAgICAgICAgICAgICBkZXNpcmVkQWNjdXJhY3k6IDUwLFxuICAgICAgICAgICAgICAgICAgICB1cGRhdGVEaXN0YW5jZTogNTAsXG4gICAgICAgICAgICAgICAgICAgIG1pbmltdW1VcGRhdGVUaW1lOiAxMDAwMCxcbiAgICAgICAgICAgICAgICAgICAgbWF4aW11bUFnZTogNjAwMDBcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0sIHRoaXMuZXJyb3IpO1xuICAgIH07XG4gICAgZ2V0RGlzdGFuY2UobG9jMSwgbG9jMikge1xuICAgICAgICBjb25zb2xlLmxvZyhcIkRpc3RhbmNlIGJldHdlZW4gbG9jMSBhbmQgbG9jMiBpczogXCIgKyBnZW9sb2NhdGlvbi5kaXN0YW5jZShsb2MxLCBsb2MyKSk7XG4gICAgfVxuICAgIG1hcFRhcHBlZCA9IChldmVudCkgPT4ge1xuICAgICAgICBjb25zb2xlLmxvZygnTWFwIFRhcHBlZCcpO1xuXG4gICAgICAgIHRoaXMudGFwTGluZSA9IHRoaXMuYWRkUG9pbnRUb0xpbmUoe1xuICAgICAgICAgICAgY29sb3I6IG5ldyBDb2xvcignUmVkJyksXG4gICAgICAgICAgICBsaW5lOiB0aGlzLnRhcExpbmUsXG4gICAgICAgICAgICBsb2NhdGlvbjogZXZlbnQucG9zaXRpb24sXG4gICAgICAgICAgICBnZW9kZXNpYzogdHJ1ZSxcbiAgICAgICAgICAgIHdpZHRoOiAxMFxuICAgICAgICB9KTtcblxuICAgICAgICB0aGlzLnJlbW92ZU1hcmtlcih0aGlzLnRhcE1hcmtlcik7XG4gICAgICAgIHRoaXMudGFwTWFya2VyID0gdGhpcy5hZGRNYXJrZXIoe1xuICAgICAgICAgICAgbG9jYXRpb246IGV2ZW50LnBvc2l0aW9uLFxuICAgICAgICAgICAgdGl0bGU6ICdUYXAgTG9jYXRpb24nXG4gICAgICAgIH0pO1xuICAgIH07XG4gICAgYWRkTWFya2VyKGFyZ3M6IEFkZE1hcmtlckFyZ3MpIHtcbiAgICAgICAgaWYgKCF0aGlzLm1hcFZpZXcgfHwgIWFyZ3MgfHwgIWFyZ3MubG9jYXRpb24pIHJldHVybjtcblxuICAgICAgICBsZXQgbWFya2VyID0gbmV3IE1hcmtlcigpO1xuICAgICAgICBtYXJrZXIucG9zaXRpb24gPSBQb3NpdGlvbi5wb3NpdGlvbkZyb21MYXRMbmcoYXJncy5sb2NhdGlvbi5sYXRpdHVkZSwgYXJncy5sb2NhdGlvbi5sb25naXR1ZGUpO1xuICAgICAgICBtYXJrZXIudGl0bGUgPSBhcmdzLnRpdGxlO1xuICAgICAgICBtYXJrZXIuc25pcHBldCA9IGFyZ3MudGl0bGU7XG4gICAgICAgIHRoaXMubWFwVmlldy5hZGRNYXJrZXIobWFya2VyKTtcblxuICAgICAgICByZXR1cm4gbWFya2VyO1xuICAgIH07XG4gICAgLy9GbGFnIHByaW1lcmEgY29uZmlndXJhY2lvblxuICAgIHByaXZhdGUgZmlyc3RDb25maWd1cmF0aW9uTWFwID0gZmFsc2U7XG4gICAgcHJpdmF0ZSBsb2NhdGlvblJlY2VpdmVkID0gKHBvc2l0aW9uOiBQb3NpdGlvbikgPT4ge1xuICAgICAgICBpZiAodGhpcy5tYXBWaWV3ICYmIHBvc2l0aW9uICYmICF0aGlzLmZpcnN0Q29uZmlndXJhdGlvbk1hcCkge1xuICAgICAgICAgICAgdGhpcy5tYXBWaWV3LmxhdGl0dWRlID0gcG9zaXRpb24ubGF0aXR1ZGU7XG4gICAgICAgICAgICB0aGlzLm1hcFZpZXcubG9uZ2l0dWRlID0gcG9zaXRpb24ubG9uZ2l0dWRlO1xuICAgICAgICAgICAgdGhpcy5tYXBWaWV3Lnpvb20gPSAyO1xuICAgICAgICAgICAgdGhpcy5jZW50ZXJlZE9uTG9jYXRpb24gPSB0cnVlO1xuXG4gICAgICAgICAgICB0aGlzLmZpcnN0Q29uZmlndXJhdGlvbk1hcCA9IHRydWU7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRoaXMuZ3BzTWFya2VyID09IG51bGwpIHtcbiAgICAgICAgICAgIHZhciBtYXJrID0gdGhpcy5jcmVhdGVNYXJrKHtcbiAgICAgICAgICAgICAgICBsb2NhdGlvbjogcG9zaXRpb24sXG4gICAgICAgICAgICAgICAgdGl0bGU6ICdHUFMgTG9jYXRpb24nXG4gICAgICAgICAgICB9LCBcIn4vaW1hZ2VzL21lLW1hcmtlci5wbmdcIik7XG4gICAgICAgICAgICB2YXIgbWFya0luZm8gPSBuZXcgQWRkTWFya2VyQXJncygpO1xuICAgICAgICAgICAgbWFya0luZm8udGl0bGUgPSBcIlByaW5jaXBhbFwiO1xuICAgICAgICAgICAgbWFya0luZm8ubG9jYXRpb24gPSBwb3NpdGlvbjtcbiAgICAgICAgICAgIHZhciB3cnAgPSB0aGlzLmNyZWF0ZU1hcmtXcmFwcGVyKG1hcmtJbmZvLCAxMjM0LCBNYXJrV3JhcHBlclR5cGVFbnVtLk1lKTtcbiAgICAgICAgICAgIHRoaXMubWFya0xpc3QucHVzaCh3cnApO1xuICAgICAgICAgICAgdGhpcy5ncHNNYXJrZXIgPSB3cnA7XG4gICAgICAgICAgICB0aGlzLm1hcFZpZXcuYWRkTWFya2VyKHdycC5tYXJrKVxuXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLm1hcFZpZXcubGF0aXR1ZGUgPSBwb3NpdGlvbi5sYXRpdHVkZTtcbiAgICAgICAgICAgIHRoaXMubWFwVmlldy5sb25naXR1ZGUgPSBwb3NpdGlvbi5sb25naXR1ZGU7XG4gICAgICAgICAgICB2YXIgd3JwID0gdGhpcy5nZXRNYXJrV3JhcHBlcigxMjM0KTtcbiAgICAgICAgICAgIHRoaXMubWFwVmlldy5yZW1vdmVNYXJrZXIod3JwLm1hcmspO1xuICAgICAgICAgICAgd3JwLm1hcmsucG9zaXRpb24ubGF0aXR1ZGUgPSBwb3NpdGlvbi5sYXRpdHVkZTtcbiAgICAgICAgICAgIHdycC5tYXJrLnBvc2l0aW9uLmxvbmdpdHVkZSA9IHBvc2l0aW9uLmxvbmdpdHVkZTtcbiAgICAgICAgICAgIHRoaXMubWFwVmlldy5hZGRNYXJrZXIod3JwLm1hcmspXG4gICAgICAgICAgICAvLyB0aGlzLmdwc0xpbmUgPSB0aGlzLmFkZFBvaW50VG9MaW5lKHtcbiAgICAgICAgICAgIC8vICAgICBjb2xvcjogbmV3IENvbG9yKCdHcmVlbicpLFxuICAgICAgICAgICAgLy8gICAgIGxpbmU6IHRoaXMuZ3BzTGluZSxcbiAgICAgICAgICAgIC8vICAgICBsb2NhdGlvbjogcG9zaXRpb24sXG4gICAgICAgICAgICAvLyAgICAgZ2VvZGVzaWM6IHRydWUsXG4gICAgICAgICAgICAvLyAgICAgd2lkdGg6IDEwXG4gICAgICAgICAgICAvLyB9KTtcblxuICAgICAgICAgICAgdGhpcy5nZXREaXN0YW5jZSh0aGlzLm1hcmtMaXN0WzBdLm1hcmsucG9zaXRpb24sIHdycC5tYXJrLnBvc2l0aW9uKTtcblxuICAgICAgICB9XG4gICAgfTtcblxuICAgIHByaXZhdGUgYWRkUG9pbnRUb0xpbmUoYXJnczogQWRkTGluZUFyZ3MpIHtcbiAgICAgICAgaWYgKCF0aGlzLm1hcFZpZXcgfHwgIWFyZ3MgfHwgIWFyZ3MubG9jYXRpb24pIHJldHVybjtcbiAgICAgICAgbGV0IGxpbmUgPSBhcmdzLmxpbmU7XG4gICAgICAgIGlmICghbGluZSkge1xuICAgICAgICAgICAgbGluZSA9IG5ldyBQb2x5bGluZSgpO1xuICAgICAgICAgICAgbGluZS52aXNpYmxlID0gdHJ1ZTtcbiAgICAgICAgICAgIGxpbmUud2lkdGggPSBhcmdzLndpZHRoIHx8IDEwO1xuICAgICAgICAgICAgbGluZS5jb2xvciA9IGFyZ3MuY29sb3IgfHwgbmV3IENvbG9yKCdSZWQnKTtcbiAgICAgICAgICAgIGxpbmUuZ2VvZGVzaWMgPSBhcmdzLmdlb2Rlc2ljICE9IHVuZGVmaW5lZCA/IGFyZ3MuZ2VvZGVzaWMgOiB0cnVlO1xuICAgICAgICAgICAgdGhpcy5tYXBWaWV3LmFkZFBvbHlsaW5lKGxpbmUpO1xuICAgICAgICB9XG4gICAgICAgIGxpbmUuYWRkUG9pbnQoUG9zaXRpb24ucG9zaXRpb25Gcm9tTGF0TG5nKGFyZ3MubG9jYXRpb24ubGF0aXR1ZGUsIGFyZ3MubG9jYXRpb24ubG9uZ2l0dWRlKSk7XG5cbiAgICAgICAgcmV0dXJuIGxpbmU7XG4gICAgfVxuICAgIHByaXZhdGUgY3JlYXRlTWFyayhhcmdzOiBBZGRNYXJrZXJBcmdzLCBpbWdTcmM6IHN0cmluZyA9IFwifi9pbWFnZXMvZnJpZW5kLW1hcmtlci5wbmdcIik6IE1hcmtlciB7XG4gICAgICAgIGlmICghdGhpcy5tYXBWaWV3IHx8ICFhcmdzIHx8ICFhcmdzLmxvY2F0aW9uKSByZXR1cm47XG5cbiAgICAgICAgbGV0IG1hcmsgPSBuZXcgTWFya2VyKCk7XG4gICAgICAgIG1hcmsucG9zaXRpb24gPSBQb3NpdGlvbi5wb3NpdGlvbkZyb21MYXRMbmcoYXJncy5sb2NhdGlvbi5sYXRpdHVkZSwgYXJncy5sb2NhdGlvbi5sb25naXR1ZGUpO1xuICAgICAgICBtYXJrLnRpdGxlID0gYXJncy50aXRsZTtcbiAgICAgICAgbWFyay5zbmlwcGV0ID0gYXJncy50aXRsZTtcbiAgICAgICAgdmFyIGltYWdlID0gbmV3IEltYWdlKCk7XG4gICAgICAgIGltYWdlLnNyYyA9IGltZ1NyYztcbiAgICAgICAgaW1hZ2Uud2lkdGggPSAxMDtcbiAgICAgICAgaW1hZ2UuaGVpZ2h0ID0gMTA7XG4gICAgICAgIG1hcmsuaWNvbiA9IGltYWdlO1xuXG4gICAgICAgIC8vICg8YW55Pm1hcmspLmluZm9XaW5kb3dUZW1wbGF0ZSA9ICd+L3NoYXJlZC9zZXJ2aWNlcy9tYXAvaW5mby13aW5kb3cnO1xuICAgICAgICAvLyB0aGlzLm1hcFZpZXcuYWRkTWFya2VyKG1hcmspO1xuICAgICAgICAvL21hcmsuc2hvd0luZm9XaW5kb3coKTtcblxuICAgICAgICAvLyAgIHZhciAgbWFya2VycyA9IG5ldyBtYXBzTW9kdWxlLk1hcmtlcigpO1xuICAgICAgICAvLyAgICAgbWFya2Vycy5wb3NpdGlvbiA9IG1hcHNNb2R1bGUuUG9zaXRpb24ucG9zaXRpb25Gcm9tTGF0TG5nKC0zMy42NiwgMTUxLjIwKTtcbiAgICAgICAgLy8gICAgIG1hcmtlcnMudGl0bGUgPSBcIlNlZWVlZWVlZWVlZWVcIjtcbiAgICAgICAgLy8gICAgICg8YW55Pm1hcmtlcnMpLmluZm9XaW5kb3dUZW1wbGF0ZSA9ICd+L3NoYXJlZC9zZXJ2aWNlcy9tYXAvaW5mby13aW5kb3cnO1xuICAgICAgICAvLyAgICAgIHRoaXMubWFwVmlldy5hZGRNYXJrZXIobWFya2Vycyk7XG4gICAgICAgIC8vICAgICBtYXJrZXJzLnNob3dJbmZvV2luZG93KCk7XG5cbiAgICAgICAgcmV0dXJuIG1hcms7XG4gICAgfTtcblxuICAgIHByaXZhdGUgY2xlYXJHcHNMaW5lKCkge1xuICAgICAgICB0aGlzLnJlbW92ZUxpbmUodGhpcy5ncHNMaW5lKTtcbiAgICAgICAgdGhpcy5ncHNMaW5lID0gbnVsbDtcblxuICAgIH07XG5cbiAgICBwcml2YXRlIGNsZWFyVGFwTGluZSgpIHtcbiAgICAgICAgdGhpcy5yZW1vdmVMaW5lKHRoaXMudGFwTGluZSk7XG4gICAgICAgIHRoaXMudGFwTGluZSA9IG51bGw7XG4gICAgICAgIHRoaXMucmVtb3ZlTWFya2VyKHRoaXMudGFwTWFya2VyKTtcbiAgICAgICAgdGhpcy50YXBNYXJrZXIgPSBudWxsO1xuXG4gICAgfVxuXG4gICAgcHJpdmF0ZSByZW1vdmVMaW5lKGxpbmU6IFBvbHlsaW5lKSB7XG4gICAgICAgIGlmIChsaW5lKSB7XG4gICAgICAgICAgICBsaW5lLnJlbW92ZUFsbFBvaW50cygpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHJpdmF0ZSByZW1vdmVNYXJrZXIobWFya2VyOiBNYXJrZXIpIHtcbiAgICAgICAgaWYgKHRoaXMubWFwVmlldyAmJiBtYXJrZXIpIHtcbiAgICAgICAgICAgIHRoaXMubWFwVmlldy5yZW1vdmVNYXJrZXIobWFya2VyKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHByaXZhdGUgZXJyb3IoZXJyKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKCdFcnJvcjogJyArIEpTT04uc3RyaW5naWZ5KGVycikpO1xuICAgIH1cblxuICAgIHByaXZhdGUgb25NYXJrZXJTZWxlY3QoZXZlbnQpIHtcbiAgICAgICAgY29uc29sZS5sb2coJ0NsaWNrZWQgb24gJyArIGV2ZW50Lm1hcmtlci50aXRsZSk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBvbkNhbWVyYUNoYW5nZWQoZXZlbnQpIHtcbiAgICAgICAgY29uc29sZS5sb2coJ0NhbWVyYSBjaGFuZ2VkOiAnICsgSlNPTi5zdHJpbmdpZnkoZXZlbnQuY2FtZXJhKSk7XG4gICAgfVxufVxuXG5cbmV4cG9ydCBjbGFzcyBBZGRMaW5lQXJncyB7XG4gICAgcHVibGljIGNvbG9yOiBDb2xvcjtcbiAgICBwdWJsaWMgbGluZTogUG9seWxpbmU7XG4gICAgcHVibGljIGxvY2F0aW9uOiBQb3NpdGlvbjtcbiAgICBwdWJsaWMgZ2VvZGVzaWM6IGJvb2xlYW47XG4gICAgcHVibGljIHdpZHRoOiBudW1iZXI7XG59XG5cbmV4cG9ydCBjbGFzcyBBZGRNYXJrZXJBcmdzIHtcbiAgICBwdWJsaWMgbG9jYXRpb246IFBvc2l0aW9uO1xuICAgIHB1YmxpYyB0aXRsZTogc3RyaW5nO1xufVxuXG5jbGFzcyBNYXJrV3JhcHBlciB7XG4gICAgbWFya0lkOiBudW1iZXI7XG4gICAgcHJpdmF0ZSBtYXJrRHJhd1dheUxpc3Q6IEFycmF5PE1hcmtXcmFwcGVyPiA9IG5ldyBBcnJheTxNYXJrV3JhcHBlcj4oKTtcbiAgICBjb25zdHJ1Y3RvcihwdWJsaWMgbWFyazogTWFya2VyLCBwcml2YXRlIG1hcmtUeXBlOiBNYXJrV3JhcHBlclR5cGVFbnVtKSB7IH1cbiAgICBhZGRNYXJrRHJhd1dheShtYXJrIDpNYXJrV3JhcHBlcil7XG5cbiAgICB9XG59XG5lbnVtIE1hcmtXcmFwcGVyVHlwZUVudW0ge1xuICAgIEZyaWVuZCxcbiAgICBNZSxcbiAgICBHcm91cFxufSJdfQ==