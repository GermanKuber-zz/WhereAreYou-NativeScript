"use strict";
var core_1 = require("@angular/core");
require("rxjs/add/operator/do");
require("rxjs/add/operator/map");
var nativescript_google_maps_sdk_1 = require("nativescript-google-maps-sdk");
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
                _this.mapView.zoom = 13;
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
    };
    MapViewService.prototype.updateCommonMark = function (markInfo, markId) {
        var markWrapper = this.getMarkWrapper(markId);
        if (markWrapper != null) {
            this.mapView.removeMarker(markWrapper.mark);
            markWrapper.mark.position = markInfo.location;
            this.mapView.addMarker(markWrapper.mark);
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
        this.mapView.addMarker(marker);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFwLXZpZXcuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIm1hcC12aWV3LnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLHNDQUEyQztBQUUzQyxnQ0FBOEI7QUFDOUIsaUNBQStCO0FBQy9CLDZFQUFtRjtBQUNuRixJQUFJLFdBQVcsR0FBRyxPQUFPLENBQUMsMEJBQTBCLENBQUMsQ0FBQztBQUN0RCxJQUFJLEtBQUssR0FBRyxPQUFPLENBQUMsa0JBQWtCLENBQUMsQ0FBQztBQUN4QywrQkFBOEI7QUFDOUIsMkVBQXlFO0FBRXpFLElBQWEsY0FBYztJQVV2Qix3QkFBb0IsYUFBNkI7UUFBakQsaUJBSUM7UUFKbUIsa0JBQWEsR0FBYixhQUFhLENBQWdCO1FBVGpELFFBQVE7UUFDQSxZQUFPLEdBQVksSUFBSSxDQUFDO1FBQ2hDLFlBQU8sR0FBVyxJQUFJLENBQUM7UUFLdkIsdUJBQWtCLEdBQVksS0FBSyxDQUFDO1FBQzVCLGFBQVEsR0FBdUIsSUFBSSxLQUFLLEVBQWUsQ0FBQztRQWdIeEQsY0FBUyxHQUFHLFVBQUMsS0FBSztZQUV0Qiw2QkFBNkI7WUFFN0IsdUNBQXVDO1lBQ3ZDLDZCQUE2QjtZQUM3Qix3QkFBd0I7WUFDeEIsOEJBQThCO1lBQzlCLG9CQUFvQjtZQUNwQixjQUFjO1lBQ2QsTUFBTTtZQUVOLHFDQUFxQztZQUNyQyxvQ0FBb0M7WUFDcEMsOEJBQThCO1lBQzlCLDBCQUEwQjtZQUMxQixNQUFNO1FBQ1YsQ0FBQyxDQUFDO1FBRU0scUJBQWdCLEdBQUcsVUFBQyxRQUFrQjtZQUMxQyxPQUFPLENBQUMsR0FBRyxDQUFDLHFCQUFxQixDQUFDLENBQUM7WUFFbkMsRUFBRSxDQUFDLENBQUMsS0FBSSxDQUFDLE9BQU8sSUFBSSxRQUFRLENBQUMsQ0FBQyxDQUFDO2dCQUMzQixLQUFJLENBQUMsT0FBTyxDQUFDLFFBQVEsR0FBRyxRQUFRLENBQUMsUUFBUSxDQUFDO2dCQUMxQyxLQUFJLENBQUMs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LEtBQUs7UUFDeEIsT0FBTyxDQUFDLEdBQUcsQ0FBQyxhQUFhLEdBQUcsS0FBSyxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUNwRCxDQUFDO0lBRU8sd0NBQWUsR0FBdkIsVUFBd0IsS0FBSztRQUN6QixPQUFPLENBQUMsR0FBRyxDQUFDLGtCQUFrQixHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUM7SUFDbkUsQ0FBQztJQUNMLHFCQUFDO0FBQUQsQ0FBQyxBQXZPRCxJQXVPQztBQXZPWSxjQUFjO0lBRDFCLGlCQUFVLEVBQUU7cUNBVzBCLGdDQUFjO0dBVnhDLGNBQWMsQ0F1TzFCO0FBdk9ZLHdDQUFjO0FBME8zQjtJQUFBO0lBTUEsQ0FBQztJQUFELGtCQUFDO0FBQUQsQ0FBQyxBQU5ELElBTUM7QUFOWSxrQ0FBVztBQVF4QjtJQUFBO0lBR0EsQ0FBQztJQUFELG9CQUFDO0FBQUQsQ0FBQyxBQUhELElBR0M7QUFIWSxzQ0FBYTtBQUsxQjtJQUFBO0lBR0EsQ0FBQztJQUFELGtCQUFDO0FBQUQsQ0FBQyxBQUhELElBR0MiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcbmltcG9ydCB7IE9ic2VydmFibGUgfSBmcm9tIFwicnhqcy9SeFwiO1xuaW1wb3J0IFwicnhqcy9hZGQvb3BlcmF0b3IvZG9cIjtcbmltcG9ydCBcInJ4anMvYWRkL29wZXJhdG9yL21hcFwiO1xuaW1wb3J0IHsgTWFwVmlldywgTWFya2VyLCBQb2x5bGluZSwgUG9zaXRpb24gfSBmcm9tICduYXRpdmVzY3JpcHQtZ29vZ2xlLW1hcHMtc2RrJztcbmxldCBnZW9sb2NhdGlvbiA9IHJlcXVpcmUoJ25hdGl2ZXNjcmlwdC1nZW9sb2NhdGlvbicpO1xudmFyIHN0eWxlID0gcmVxdWlyZSgnLi9tYXAtc3R5bGUuanNvbicpO1xuaW1wb3J0IHsgQ29sb3IgfSBmcm9tICdjb2xvcic7XG5pbXBvcnQgeyBGcmllbmRzU2VydmljZSB9IGZyb20gJy4uLy4uLy4uL3NoYXJlZC9mcmllbmRzL2ZyaWVuZHMuc2VydmljZSc7XG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgTWFwVmlld1NlcnZpY2Uge1xuICAgIC8vI01hcGEgXG4gICAgcHJpdmF0ZSBtYXBWaWV3OiBNYXBWaWV3ID0gbnVsbDtcbiAgICB3YXRjaElkOiBudW1iZXIgPSBudWxsO1xuICAgIGdwc0xpbmU6IFBvbHlsaW5lO1xuICAgIHRhcExpbmU6IFBvbHlsaW5lO1xuICAgIHRhcE1hcmtlcjogYW55O1xuICAgIGdwc01hcmtlcjogYW55O1xuICAgIGNlbnRlcmVkT25Mb2NhdGlvbjogYm9vbGVhbiA9IGZhbHNlO1xuICAgIHByaXZhdGUgbWFya0xpc3Q6IEFycmF5PE1hcmtXcmFwcGVyPiA9IG5ldyBBcnJheTxNYXJrV3JhcHBlcj4oKTtcbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIGZyaWVuZFNlcnZpY2U6IEZyaWVuZHNTZXJ2aWNlKSB7XG4gICAgICAgIGlmICghZ2VvbG9jYXRpb24uaXNFbmFibGVkKCkpIHtcbiAgICAgICAgICAgIGdlb2xvY2F0aW9uLmVuYWJsZUxvY2F0aW9uUmVxdWVzdCgpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgbmdPbkluaXQoKSB7XG5cbiAgICAgICAgLy8gdGhpcy5ncm9jZXJ5TGlzdFNlcnZpY2UubG9hZCgpXG4gICAgICAgIC8vIC5zdWJzY3JpYmUobG9hZGVkR3JvY2VyaWVzID0+IHtcbiAgICAgICAgLy8gICBsb2FkZWRHcm9jZXJpZXMuZm9yRWFjaCgoZ3JvY2VyeU9iamVjdCkgPT4ge1xuICAgICAgICAvLyAgICAgdGhpcy5ncm9jZXJ5TGlzdC51bnNoaWZ0KGdyb2NlcnlPYmplY3QpO1xuICAgICAgICAvLyAgIH0pO1xuICAgICAgICAvLyAgIHRoaXMuaXNMb2FkaW5nID0gZmFsc2U7XG4gICAgICAgIC8vICAgdGhpcy5saXN0TG9hZGVkID0gdHJ1ZTtcbiAgICAgICAgLy8gfSk7XG4gICAgfVxuXG4gICAgLy9Qcml2YXRlIE1ldGhvZHNcbiAgICBwdWJsaWMgY3JlYXRlTWFya1dyYXBwZXIobWFya0luZm86IEFkZE1hcmtlckFyZ3MsIG1hcmtJZDogbnVtYmVyKTogTWFya1dyYXBwZXIge1xuICAgICAgICAvL0NyZW8gdW4gTWFya1dyYXBwZXIgZWwgY3VhbCByZWxhY2lvbmEgZWwgTWFya2VyIGNvbiBlbCBpZCBkZWwgdXN1YXJpbyBkaWJ1amFkb1xuICAgICAgICB2YXIgbWFyayA9IG5ldyBBZGRNYXJrZXJBcmdzKCk7XG4gICAgICAgIG1hcmsudGl0bGUgPSBtYXJrSW5mby50aXRsZTtcbiAgICAgICAgbWFyay5sb2NhdGlvbiA9IG5ldyBQb3NpdGlvbigpO1xuICAgICAgICBtYXJrLmxvY2F0aW9uLmxhdGl0dWRlID0gbWFya0luZm8ubG9jYXRpb24ubGF0aXR1ZGU7XG4gICAgICAgIG1hcmsubG9jYXRpb24ubG9uZ2l0dWRlID0gbWFya0luZm8ubG9jYXRpb24ubG9uZ2l0dWRlO1xuICAgICAgICB2YXIgbWFwTWFyazogTWFya2VyID0gdGhpcy5hZGRNYXJrZXIobWFyayk7XG4gICAgICAgIHZhciBtYXJrV3JhcHBlciA9IG5ldyBNYXJrV3JhcHBlcigpO1xuICAgICAgICBtYXJrV3JhcHBlci5tYXJrSWQgPSBtYXJrSWQ7XG4gICAgICAgIG1hcmtXcmFwcGVyLm1hcmsgPSBtYXBNYXJrO1xuICAgICAgICByZXR1cm4gbWFya1dyYXBwZXI7XG4gICAgfVxuICAgIHByaXZhdGUgZ2V0TWFya1dyYXBwZXIobWFya0lkOiBudW1iZXIpOiBNYXJrV3JhcHBlciB7XG4gICAgICAgIC8vUmVncmVzbyB1biBtYXJrV3JhcHBlciBwb3IgSURcbiAgICAgICAgZm9yICh2YXIgaXRlbSBvZiB0aGlzLm1hcmtMaXN0KVxuICAgICAgICAgICAgaWYgKGl0ZW0ubWFya0lkID09IG1hcmtJZClcbiAgICAgICAgICAgICAgICByZXR1cm4gaXRlbTtcblxuICAgIH1cbiAgICAvL1B1YmxpYyBNZXRob2RzXG4gICAgcHVibGljIGFkZENvbW1vbk1hcmsobWFya0luZm86IEFkZE1hcmtlckFyZ3MsIG1hcmtJZDogbnVtYmVyKTogdm9pZCB7XG4gICAgICAgIHZhciBtYXJrV3JhcHBlciA9IHRoaXMuY3JlYXRlTWFya1dyYXBwZXIobWFya0luZm8sIG1hcmtJZCk7XG4gICAgICAgIHRoaXMubWFya0xpc3QucHVzaChtYXJrV3JhcHBlcik7XG4gICAgICAgIHRoaXMubWFwVmlldy5hZGRNYXJrZXIobWFya1dyYXBwZXIubWFyayk7XG5cbiAgICB9XG4gICAgcHVibGljIHVwZGF0ZUNvbW1vbk1hcmsobWFya0luZm86IEFkZE1hcmtlckFyZ3MsIG1hcmtJZDogbnVtYmVyKTogdm9pZCB7XG4gICAgICAgIHZhciBtYXJrV3JhcHBlciA9IHRoaXMuZ2V0TWFya1dyYXBwZXIobWFya0lkKTtcbiAgICAgICAgaWYgKG1hcmtXcmFwcGVyICE9IG51bGwpIHtcbiAgICAgICAgICAgIHRoaXMubWFwVmlldy5yZW1vdmVNYXJrZXIobWFya1dyYXBwZXIubWFyayk7XG4gICAgICAgICAgICBtYXJrV3JhcHBlci5tYXJrLnBvc2l0aW9uID0gbWFya0luZm8ubG9jYXRpb247XG4gICAgICAgICAgICB0aGlzLm1hcFZpZXcuYWRkTWFya2VyKG1hcmtXcmFwcGVyLm1hcmspO1xuICAgICAgICB9XG4gICAgfVxuICAgIHB1YmxpYyByZW1vdmVDb21tb25NYXJrKG1hcmtJbmZvOiBBZGRNYXJrZXJBcmdzLCBtYXJrSWQ6IG51bWJlcik6IHZvaWQge1xuICAgICAgICB2YXIgbWFya1dyYXBwZXIgPSB0aGlzLmdldE1hcmtXcmFwcGVyKG1hcmtJZCk7XG4gICAgICAgIHRoaXMubWFwVmlldy5yZW1vdmVNYXJrZXIobWFya1dyYXBwZXIubWFyayk7XG4gICAgfVxuXG5cbiAgICBwcml2YXRlIGVuYWJsZUxvY2F0aW9uKCkge1xuICAgICAgICBpZiAoIWdlb2xvY2F0aW9uLmlzRW5hYmxlZCgpKSB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZygnTG9jYXRpb24gbm90IGVuYWJsZWQsIHJlcXVlc3RpbmcuJyk7XG4gICAgICAgICAgICByZXR1cm4gZ2VvbG9jYXRpb24uZW5hYmxlTG9jYXRpb25SZXF1ZXN0KCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKHRydWUpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBnZXRMb2NhdGlvbigpIHtcbiAgICAgICAgaWYgKGdlb2xvY2F0aW9uLmlzRW5hYmxlZCgpKSB7XG4gICAgICAgICAgICB2YXIgbG9jYXRpb24gPSBnZW9sb2NhdGlvbi5nZXRDdXJyZW50TG9jYXRpb24oe1xuICAgICAgICAgICAgICAgIGRlc2lyZWRBY2N1cmFjeTogMTAsXG4gICAgICAgICAgICAgICAgdXBkYXRlRGlzdGFuY2U6IDEwLFxuICAgICAgICAgICAgICAgIG1pbmltdW1VcGRhdGVUaW1lOiAxMDAwLFxuICAgICAgICAgICAgICAgIG1heGltdW1BZ2U6IDEwMDAwXG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgcmV0dXJuIGxvY2F0aW9uO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBQcm9taXNlLnJlamVjdCgnR2VvbG9jYXRpb24gbm90IGVuYWJsZWQuJyk7XG4gICAgfVxuXG4gICAgLy9NYXAgZXZlbnRzXG4gICAgcHVibGljIG9uTWFwUmVhZHkoZXZlbnQsIG1hcFJlYWR5Tm90aWZ5OiAoKSA9PiB2b2lkKSB7XG4gICAgICAgIGlmICh0aGlzLm1hcFZpZXcgfHwgIWV2ZW50Lm9iamVjdCkgcmV0dXJuO1xuXG4gICAgICAgIHRoaXMubWFwVmlldyA9IGV2ZW50Lm9iamVjdDtcbiAgICAgICAgdGhpcy5tYXBWaWV3LnNldFN0eWxlKHN0eWxlKTtcblxuICAgICAgICAvL05vdGlmaWNvIGN1YW5kbyBlbCBtYXBhIGVzdGEgbGlzdG9cbiAgICAgICAgdGhpcy5tYXBWaWV3Lm5vdGlmeU1hcFJlYWR5ID0gKCkgPT4ge1xuICAgICAgICAgICAgbWFwUmVhZHlOb3RpZnkoKTtcbiAgICAgICAgfVxuICAgICAgICAvLyB0aGlzLm1hcFZpZXcubWFya2VyU2VsZWN0ID0gdGhpcy5vbk1hcmtlclNlbGVjdDtcbiAgICAgICAgLy8gdGhpcy5tYXBWaWV3LmNhbWVyYUNoYW5nZWQgPSB0aGlzLm9uQ2FtZXJhQ2hhbmdlZDtcblxuICAgICAgICB0aGlzLmVuYWJsZUxvY2F0aW9uKClcbiAgICAgICAgICAgIC50aGVuKCgpID0+IHtcbiAgICAgICAgICAgICAgICB2YXIgbG9jYXRpb24gPSB0aGlzLmdldExvY2F0aW9uKCk7XG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgLnRoZW4oKCkgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMud2F0Y2hJZCA9IGdlb2xvY2F0aW9uLndhdGNoTG9jYXRpb24odGhpcy5sb2NhdGlvblJlY2VpdmVkLCB0aGlzLmVycm9yLCB7XG4gICAgICAgICAgICAgICAgICAgIGRlc2lyZWRBY2N1cmFjeTogMTAsXG4gICAgICAgICAgICAgICAgICAgIHVwZGF0ZURpc3RhbmNlOiAxMCxcbiAgICAgICAgICAgICAgICAgICAgbWluaW11bVVwZGF0ZVRpbWU6IDEwMDAwLFxuICAgICAgICAgICAgICAgICAgICBtYXhpbXVtQWdlOiA2MDAwMFxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSwgdGhpcy5lcnJvcik7XG5cbiAgICB9O1xuXG4gICAgcHJpdmF0ZSBtYXBUYXBwZWQgPSAoZXZlbnQpID0+IHtcblxuICAgICAgICAvLyBjb25zb2xlLmxvZygnTWFwIFRhcHBlZCcpO1xuXG4gICAgICAgIC8vIHRoaXMudGFwTGluZSA9IHRoaXMuYWRkUG9pbnRUb0xpbmUoe1xuICAgICAgICAvLyAgIGNvbG9yOiBuZXcgQ29sb3IoJ1JlZCcpLFxuICAgICAgICAvLyAgIGxpbmU6IHRoaXMudGFwTGluZSxcbiAgICAgICAgLy8gICBsb2NhdGlvbjogZXZlbnQucG9zaXRpb24sXG4gICAgICAgIC8vICAgZ2VvZGVzaWM6IHRydWUsXG4gICAgICAgIC8vICAgd2lkdGg6IDEwXG4gICAgICAgIC8vIH0pO1xuXG4gICAgICAgIC8vIHRoaXMucmVtb3ZlTWFya2VyKHRoaXMudGFwTWFya2VyKTtcbiAgICAgICAgLy8gdGhpcy50YXBNYXJrZXIgPSB0aGlzLmFkZE1hcmtlcih7XG4gICAgICAgIC8vICAgbG9jYXRpb246IGV2ZW50LnBvc2l0aW9uLFxuICAgICAgICAvLyAgIHRpdGxlOiAnVGFwIExvY2F0aW9uJ1xuICAgICAgICAvLyB9KTtcbiAgICB9O1xuXG4gICAgcHJpdmF0ZSBsb2NhdGlvblJlY2VpdmVkID0gKHBvc2l0aW9uOiBQb3NpdGlvbikgPT4ge1xuICAgICAgICBjb25zb2xlLmxvZygnR1BTIFVwZGF0ZSBSZWNlaXZlZCcpO1xuXG4gICAgICAgIGlmICh0aGlzLm1hcFZpZXcgJiYgcG9zaXRpb24pIHtcbiAgICAgICAgICAgIHRoaXMubWFwVmlldy5sYXRpdHVkZSA9IHBvc2l0aW9uLmxhdGl0dWRlO1xuICAgICAgICAgICAgdGhpcy5tYXBWaWV3LmxvbmdpdHVkZSA9IHBvc2l0aW9uLmxvbmdpdHVkZTtcbiAgICAgICAgICAgIHRoaXMubWFwVmlldy56b29tID0gMTM7XG4gICAgICAgICAgICB0aGlzLmNlbnRlcmVkT25Mb2NhdGlvbiA9IHRydWU7XG4gICAgICAgIH1cblxuICAgICAgICAvLyB0aGlzLmdwc0xpbmUgPSB0aGlzLmFkZFBvaW50VG9MaW5lKHtcbiAgICAgICAgLy8gICBjb2xvcjogbmV3IENvbG9yKCdHcmVlbicpLFxuICAgICAgICAvLyAgIGxpbmU6IHRoaXMuZ3BzTGluZSxcbiAgICAgICAgLy8gICBsb2NhdGlvbjogcG9zaXRpb24sXG4gICAgICAgIC8vICAgZ2VvZGVzaWM6IHRydWUsXG4gICAgICAgIC8vICAgd2lkdGg6IDEwXG4gICAgICAgIC8vIH0pO1xuXG4gICAgICAgIHRoaXMucmVtb3ZlTWFya2VyKHRoaXMuZ3BzTWFya2VyKTtcbiAgICAgICAgdGhpcy5ncHNNYXJrZXIgPSB0aGlzLmFkZE1hcmtlcih7XG4gICAgICAgICAgICBsb2NhdGlvbjogcG9zaXRpb24sXG4gICAgICAgICAgICB0aXRsZTogJ0dQUyBMb2NhdGlvbidcbiAgICAgICAgfSk7XG4gICAgfTtcblxuICAgIHByaXZhdGUgYWRkUG9pbnRUb0xpbmUoYXJnczogQWRkTGluZUFyZ3MpIHtcbiAgICAgICAgaWYgKCF0aGlzLm1hcFZpZXcgfHwgIWFyZ3MgfHwgIWFyZ3MubG9jYXRpb24pIHJldHVybjtcblxuICAgICAgICBsZXQgbGluZSA9IGFyZ3MubGluZTtcblxuICAgICAgICBpZiAoIWxpbmUpIHtcbiAgICAgICAgICAgIGxpbmUgPSBuZXcgUG9seWxpbmUoKTtcbiAgICAgICAgICAgIGxpbmUudmlzaWJsZSA9IHRydWU7XG4gICAgICAgICAgICBsaW5lLndpZHRoID0gYXJncy53aWR0aCB8fCAxMDtcbiAgICAgICAgICAgIGxpbmUuY29sb3IgPSBhcmdzLmNvbG9yIHx8IG5ldyBDb2xvcignUmVkJyk7XG4gICAgICAgICAgICBsaW5lLmdlb2Rlc2ljID0gYXJncy5nZW9kZXNpYyAhPSB1bmRlZmluZWQgPyBhcmdzLmdlb2Rlc2ljIDogdHJ1ZTtcbiAgICAgICAgICAgIHRoaXMubWFwVmlldy5hZGRQb2x5bGluZShsaW5lKTtcbiAgICAgICAgfVxuICAgICAgICBsaW5lLmFkZFBvaW50KFBvc2l0aW9uLnBvc2l0aW9uRnJvbUxhdExuZyhhcmdzLmxvY2F0aW9uLmxhdGl0dWRlLCBhcmdzLmxvY2F0aW9uLmxvbmdpdHVkZSkpO1xuXG4gICAgICAgIHJldHVybiBsaW5lO1xuICAgIH1cbiAgICBwcml2YXRlIGFkZE1hcmtlcihhcmdzOiBBZGRNYXJrZXJBcmdzKTogTWFya2VyIHtcbiAgICAgICAgaWYgKCF0aGlzLm1hcFZpZXcgfHwgIWFyZ3MgfHwgIWFyZ3MubG9jYXRpb24pIHJldHVybjtcblxuICAgICAgICBsZXQgbWFya2VyID0gbmV3IE1hcmtlcigpO1xuICAgICAgICBtYXJrZXIucG9zaXRpb24gPSBQb3NpdGlvbi5wb3NpdGlvbkZyb21MYXRMbmcoYXJncy5sb2NhdGlvbi5sYXRpdHVkZSwgYXJncy5sb2NhdGlvbi5sb25naXR1ZGUpO1xuICAgICAgICBtYXJrZXIudGl0bGUgPSBhcmdzLnRpdGxlO1xuICAgICAgICBtYXJrZXIuc25pcHBldCA9IGFyZ3MudGl0bGU7XG4gICAgICAgIHRoaXMubWFwVmlldy5hZGRNYXJrZXIobWFya2VyKTtcblxuICAgICAgICByZXR1cm4gbWFya2VyO1xuICAgIH07XG5cbiAgICBwcml2YXRlIGNsZWFyR3BzTGluZSgpIHtcbiAgICAgICAgdGhpcy5yZW1vdmVMaW5lKHRoaXMuZ3BzTGluZSk7XG4gICAgICAgIHRoaXMuZ3BzTGluZSA9IG51bGw7XG5cbiAgICB9O1xuXG4gICAgcHJpdmF0ZSBjbGVhclRhcExpbmUoKSB7XG4gICAgICAgIHRoaXMucmVtb3ZlTGluZSh0aGlzLnRhcExpbmUpO1xuICAgICAgICB0aGlzLnRhcExpbmUgPSBudWxsO1xuICAgICAgICB0aGlzLnJlbW92ZU1hcmtlcih0aGlzLnRhcE1hcmtlcik7XG4gICAgICAgIHRoaXMudGFwTWFya2VyID0gbnVsbDtcblxuICAgIH1cblxuICAgIHByaXZhdGUgcmVtb3ZlTGluZShsaW5lOiBQb2x5bGluZSkge1xuICAgICAgICBpZiAobGluZSkge1xuICAgICAgICAgICAgbGluZS5yZW1vdmVBbGxQb2ludHMoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHByaXZhdGUgcmVtb3ZlTWFya2VyKG1hcmtlcjogTWFya2VyKSB7XG4gICAgICAgIGlmICh0aGlzLm1hcFZpZXcgJiYgbWFya2VyKSB7XG4gICAgICAgICAgICB0aGlzLm1hcFZpZXcucmVtb3ZlTWFya2VyKG1hcmtlcik7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwcml2YXRlIGVycm9yKGVycikge1xuICAgICAgICBjb25zb2xlLmxvZygnRXJyb3I6ICcgKyBKU09OLnN0cmluZ2lmeShlcnIpKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIG9uTWFya2VyU2VsZWN0KGV2ZW50KSB7XG4gICAgICAgIGNvbnNvbGUubG9nKCdDbGlja2VkIG9uICcgKyBldmVudC5tYXJrZXIudGl0bGUpO1xuICAgIH1cblxuICAgIHByaXZhdGUgb25DYW1lcmFDaGFuZ2VkKGV2ZW50KSB7XG4gICAgICAgIGNvbnNvbGUubG9nKCdDYW1lcmEgY2hhbmdlZDogJyArIEpTT04uc3RyaW5naWZ5KGV2ZW50LmNhbWVyYSkpO1xuICAgIH1cbn1cblxuXG5leHBvcnQgY2xhc3MgQWRkTGluZUFyZ3Mge1xuICAgIHB1YmxpYyBjb2xvcjogQ29sb3I7XG4gICAgcHVibGljIGxpbmU6IFBvbHlsaW5lO1xuICAgIHB1YmxpYyBsb2NhdGlvbjogUG9zaXRpb247XG4gICAgcHVibGljIGdlb2Rlc2ljOiBib29sZWFuO1xuICAgIHB1YmxpYyB3aWR0aDogbnVtYmVyO1xufVxuXG5leHBvcnQgY2xhc3MgQWRkTWFya2VyQXJncyB7XG4gICAgcHVibGljIGxvY2F0aW9uOiBQb3NpdGlvbjtcbiAgICBwdWJsaWMgdGl0bGU6IHN0cmluZztcbn1cblxuY2xhc3MgTWFya1dyYXBwZXIge1xuICAgIG1hcms6IE1hcmtlcjtcbiAgICBtYXJrSWQ6IG51bWJlcjtcbn0iXX0=