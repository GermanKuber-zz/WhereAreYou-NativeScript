"use strict";
var core_1 = require("@angular/core");
require("rxjs/add/operator/do");
require("rxjs/add/operator/map");
var nativescript_google_maps_sdk_1 = require("nativescript-google-maps-sdk");
var geolocation = require('nativescript-geolocation');
var style = require('./map-style.json');
var color_1 = require("color");
var MapViewService = (function () {
    function MapViewService() {
        var _this = this;
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
                _this.mapView.zoom = 10;
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
    __metadata("design:paramtypes", [])
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFwLXZpZXcuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIm1hcC12aWV3LnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLHNDQUEyQztBQUUzQyxnQ0FBOEI7QUFDOUIsaUNBQStCO0FBQy9CLDZFQUFtRjtBQUNuRixJQUFJLFdBQVcsR0FBRyxPQUFPLENBQUMsMEJBQTBCLENBQUMsQ0FBQztBQUN0RCxJQUFJLEtBQUssR0FBRyxPQUFPLENBQUMsa0JBQWtCLENBQUMsQ0FBQztBQUN4QywrQkFBOEI7QUFFOUIsSUFBYSxjQUFjO0lBVXZCO1FBQUEsaUJBSUM7UUFiRCxRQUFRO1FBQ0EsWUFBTyxHQUFZLElBQUksQ0FBQztRQUNoQyxZQUFPLEdBQVcsSUFBSSxDQUFDO1FBS3ZCLHVCQUFrQixHQUFZLEtBQUssQ0FBQztRQUM1QixhQUFRLEdBQXVCLElBQUksS0FBSyxFQUFlLENBQUM7UUE0R3hELGNBQVMsR0FBRyxVQUFDLEtBQUs7WUFDdEIsNkJBQTZCO1lBRTdCLHVDQUF1QztZQUN2Qyw2QkFBNkI7WUFDN0Isd0JBQXdCO1lBQ3hCLDhCQUE4QjtZQUM5QixvQkFBb0I7WUFDcEIsY0FBYztZQUNkLE1BQU07WUFFTixxQ0FBcUM7WUFDckMsb0NBQW9DO1lBQ3BDLDhCQUE4QjtZQUM5QiwwQkFBMEI7WUFDMUIsTUFBTTtRQUNWLENBQUMsQ0FBQztRQUVNLHFCQUFnQixHQUFHLFVBQUMsUUFBa0I7WUFDMUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxxQkFBcUIsQ0FBQyxDQUFDO1lBRW5DLEVBQUUsQ0FBQyxDQUFDLEtBQUksQ0FBQyxPQUFPLElBQUksUUFBUSxDQUFDLENBQUMsQ0FBQztnQkFDM0IsS0FBSSxDQUFDLE9BQU8sQ0FBQyxRQUFRLEdBQUcsUUFBUSxDQUFDLFFBQVEsQ0FBQztnQkFDMUMsS0FBSSxDQUFDLE9BQU8sQ0FBQyxTQUFTLEdBQUcsUUFBUSxDQUFDLFNBQVMsQ0FBQztnQkFDNUMsS0FBSSxDQUFD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QztBQUFELENBQUMsQUFsT0QsSUFrT0M7QUFsT1ksY0FBYztJQUQxQixpQkFBVSxFQUFFOztHQUNBLGNBQWMsQ0FrTzFCO0FBbE9ZLHdDQUFjO0FBcU8zQjtJQUFBO0lBTUEsQ0FBQztJQUFELGtCQUFDO0FBQUQsQ0FBQyxBQU5ELElBTUM7QUFOWSxrQ0FBVztBQVF4QjtJQUFBO0lBR0EsQ0FBQztJQUFELG9CQUFDO0FBQUQsQ0FBQyxBQUhELElBR0M7QUFIWSxzQ0FBYTtBQUsxQjtJQUFBO0lBR0EsQ0FBQztJQUFELGtCQUFDO0FBQUQsQ0FBQyxBQUhELElBR0MiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcbmltcG9ydCB7IE9ic2VydmFibGUgfSBmcm9tIFwicnhqcy9SeFwiO1xuaW1wb3J0IFwicnhqcy9hZGQvb3BlcmF0b3IvZG9cIjtcbmltcG9ydCBcInJ4anMvYWRkL29wZXJhdG9yL21hcFwiO1xuaW1wb3J0IHsgTWFwVmlldywgTWFya2VyLCBQb2x5bGluZSwgUG9zaXRpb24gfSBmcm9tICduYXRpdmVzY3JpcHQtZ29vZ2xlLW1hcHMtc2RrJztcbmxldCBnZW9sb2NhdGlvbiA9IHJlcXVpcmUoJ25hdGl2ZXNjcmlwdC1nZW9sb2NhdGlvbicpO1xudmFyIHN0eWxlID0gcmVxdWlyZSgnLi9tYXAtc3R5bGUuanNvbicpO1xuaW1wb3J0IHsgQ29sb3IgfSBmcm9tICdjb2xvcic7XG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgTWFwVmlld1NlcnZpY2Uge1xuICAgIC8vI01hcGEgXG4gICAgcHJpdmF0ZSBtYXBWaWV3OiBNYXBWaWV3ID0gbnVsbDtcbiAgICB3YXRjaElkOiBudW1iZXIgPSBudWxsO1xuICAgIGdwc0xpbmU6IFBvbHlsaW5lO1xuICAgIHRhcExpbmU6IFBvbHlsaW5lO1xuICAgIHRhcE1hcmtlcjogYW55O1xuICAgIGdwc01hcmtlcjogYW55O1xuICAgIGNlbnRlcmVkT25Mb2NhdGlvbjogYm9vbGVhbiA9IGZhbHNlO1xuICAgIHByaXZhdGUgbWFya0xpc3Q6IEFycmF5PE1hcmtXcmFwcGVyPiA9IG5ldyBBcnJheTxNYXJrV3JhcHBlcj4oKTtcbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgaWYgKCFnZW9sb2NhdGlvbi5pc0VuYWJsZWQoKSkge1xuICAgICAgICAgICAgZ2VvbG9jYXRpb24uZW5hYmxlTG9jYXRpb25SZXF1ZXN0KCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBuZ09uSW5pdCgpIHtcblxuICAgICAgICAvLyB0aGlzLmdyb2NlcnlMaXN0U2VydmljZS5sb2FkKClcbiAgICAgICAgLy8gLnN1YnNjcmliZShsb2FkZWRHcm9jZXJpZXMgPT4ge1xuICAgICAgICAvLyAgIGxvYWRlZEdyb2Nlcmllcy5mb3JFYWNoKChncm9jZXJ5T2JqZWN0KSA9PiB7XG4gICAgICAgIC8vICAgICB0aGlzLmdyb2NlcnlMaXN0LnVuc2hpZnQoZ3JvY2VyeU9iamVjdCk7XG4gICAgICAgIC8vICAgfSk7XG4gICAgICAgIC8vICAgdGhpcy5pc0xvYWRpbmcgPSBmYWxzZTtcbiAgICAgICAgLy8gICB0aGlzLmxpc3RMb2FkZWQgPSB0cnVlO1xuICAgICAgICAvLyB9KTtcbiAgICB9XG5cbiAgICAvL1ByaXZhdGUgTWV0aG9kc1xuICAgIHB1YmxpYyBjcmVhdGVNYXJrV3JhcHBlcihtYXJrSW5mbzogQWRkTWFya2VyQXJncywgbWFya0lkOiBudW1iZXIpOiBNYXJrV3JhcHBlciB7XG4gICAgICAgIC8vQ3JlbyB1biBNYXJrV3JhcHBlciBlbCBjdWFsIHJlbGFjaW9uYSBlbCBNYXJrZXIgY29uIGVsIGlkIGRlbCB1c3VhcmlvIGRpYnVqYWRvXG4gICAgICAgIHZhciBtYXJrID0gbmV3IEFkZE1hcmtlckFyZ3MoKTtcbiAgICAgICAgbWFyay50aXRsZSA9IG1hcmtJbmZvLnRpdGxlO1xuICAgICAgICBtYXJrLmxvY2F0aW9uID0gbmV3IFBvc2l0aW9uKCk7XG4gICAgICAgIG1hcmsubG9jYXRpb24ubGF0aXR1ZGUgPSBtYXJrSW5mby5sb2NhdGlvbi5sYXRpdHVkZTtcbiAgICAgICAgbWFyay5sb2NhdGlvbi5sb25naXR1ZGUgPSBtYXJrSW5mby5sb2NhdGlvbi5sb25naXR1ZGU7XG4gICAgICAgIHZhciBtYXBNYXJrOiBNYXJrZXIgPSB0aGlzLmFkZE1hcmtlcihtYXJrKTtcbiAgICAgICAgdmFyIG1hcmtXcmFwcGVyID0gbmV3IE1hcmtXcmFwcGVyKCk7XG4gICAgICAgIG1hcmtXcmFwcGVyLm1hcmtJZCA9IG1hcmtJZDtcbiAgICAgICAgbWFya1dyYXBwZXIubWFyayA9IG1hcE1hcms7XG4gICAgICAgIHJldHVybiBtYXJrV3JhcHBlcjtcbiAgICB9XG4gICAgcHJpdmF0ZSBnZXRNYXJrV3JhcHBlcihtYXJrSWQ6IG51bWJlcik6IE1hcmtXcmFwcGVyIHtcbiAgICAgICAgLy9SZWdyZXNvIHVuIG1hcmtXcmFwcGVyIHBvciBJRFxuICAgICAgICBmb3IgKHZhciBpdGVtIG9mIHRoaXMubWFya0xpc3QpXG4gICAgICAgICAgICBpZiAoaXRlbS5tYXJrSWQgPT0gbWFya0lkKVxuICAgICAgICAgICAgICAgIHJldHVybiBpdGVtO1xuXG4gICAgfVxuICAgIC8vUHVibGljIE1ldGhvZHNcbiAgICBwdWJsaWMgYWRkQ29tbW9uTWFyayhtYXJrSW5mbzogQWRkTWFya2VyQXJncywgbWFya0lkOiBudW1iZXIpOiB2b2lkIHtcbiAgICAgICAgdmFyIG1hcmtXcmFwcGVyID0gdGhpcy5jcmVhdGVNYXJrV3JhcHBlcihtYXJrSW5mbywgbWFya0lkKTtcbiAgICAgICAgdGhpcy5tYXJrTGlzdC5wdXNoKG1hcmtXcmFwcGVyKTtcbiAgICAgICAgdGhpcy5tYXBWaWV3LmFkZE1hcmtlcihtYXJrV3JhcHBlci5tYXJrKTtcblxuICAgIH1cbiAgICBwdWJsaWMgdXBkYXRlQ29tbW9uTWFyayhtYXJrSW5mbzogQWRkTWFya2VyQXJncywgbWFya0lkOiBudW1iZXIpOiB2b2lkIHtcbiAgICAgICAgdmFyIG1hcmtXcmFwcGVyID0gdGhpcy5nZXRNYXJrV3JhcHBlcihtYXJrSWQpO1xuICAgICAgICBpZiAobWFya1dyYXBwZXIgIT0gbnVsbCkge1xuICAgICAgICAgICAgdGhpcy5tYXBWaWV3LnJlbW92ZU1hcmtlcihtYXJrV3JhcHBlci5tYXJrKTtcbiAgICAgICAgICAgIG1hcmtXcmFwcGVyLm1hcmsucG9zaXRpb24gPSBtYXJrSW5mby5sb2NhdGlvbjtcbiAgICAgICAgICAgIHRoaXMubWFwVmlldy5hZGRNYXJrZXIobWFya1dyYXBwZXIubWFyayk7XG4gICAgICAgIH1cbiAgICB9XG5cblxuICAgIHByaXZhdGUgZW5hYmxlTG9jYXRpb24oKSB7XG4gICAgICAgIGlmICghZ2VvbG9jYXRpb24uaXNFbmFibGVkKCkpIHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCdMb2NhdGlvbiBub3QgZW5hYmxlZCwgcmVxdWVzdGluZy4nKTtcbiAgICAgICAgICAgIHJldHVybiBnZW9sb2NhdGlvbi5lbmFibGVMb2NhdGlvblJlcXVlc3QoKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUodHJ1ZSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwcml2YXRlIGdldExvY2F0aW9uKCkge1xuICAgICAgICBpZiAoZ2VvbG9jYXRpb24uaXNFbmFibGVkKCkpIHtcbiAgICAgICAgICAgIHZhciBsb2NhdGlvbiA9IGdlb2xvY2F0aW9uLmdldEN1cnJlbnRMb2NhdGlvbih7XG4gICAgICAgICAgICAgICAgZGVzaXJlZEFjY3VyYWN5OiAxMCxcbiAgICAgICAgICAgICAgICB1cGRhdGVEaXN0YW5jZTogMTAsXG4gICAgICAgICAgICAgICAgbWluaW11bVVwZGF0ZVRpbWU6IDEwMDAsXG4gICAgICAgICAgICAgICAgbWF4aW11bUFnZTogMTAwMDBcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICByZXR1cm4gbG9jYXRpb247XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIFByb21pc2UucmVqZWN0KCdHZW9sb2NhdGlvbiBub3QgZW5hYmxlZC4nKTtcbiAgICB9XG5cbiAgICAvL01hcCBldmVudHNcbiAgICBwdWJsaWMgb25NYXBSZWFkeShldmVudCwgbWFwUmVhZHlOb3RpZnk6ICgpID0+IHZvaWQpIHtcbiAgICAgICAgaWYgKHRoaXMubWFwVmlldyB8fCAhZXZlbnQub2JqZWN0KSByZXR1cm47XG5cbiAgICAgICAgdGhpcy5tYXBWaWV3ID0gZXZlbnQub2JqZWN0O1xuICAgICAgICB0aGlzLm1hcFZpZXcuc2V0U3R5bGUoc3R5bGUpO1xuXG4gICAgICAgIC8vTm90aWZpY28gY3VhbmRvIGVsIG1hcGEgZXN0YSBsaXN0b1xuICAgICAgICB0aGlzLm1hcFZpZXcubm90aWZ5TWFwUmVhZHkgPSAoKSA9PiB7XG4gICAgICAgICAgICBtYXBSZWFkeU5vdGlmeSgpO1xuICAgICAgICB9XG4gICAgICAgIC8vIHRoaXMubWFwVmlldy5tYXJrZXJTZWxlY3QgPSB0aGlzLm9uTWFya2VyU2VsZWN0O1xuICAgICAgICAvLyB0aGlzLm1hcFZpZXcuY2FtZXJhQ2hhbmdlZCA9IHRoaXMub25DYW1lcmFDaGFuZ2VkO1xuXG4gICAgICAgIHRoaXMuZW5hYmxlTG9jYXRpb24oKVxuICAgICAgICAgICAgLnRoZW4oKCkgPT4ge1xuICAgICAgICAgICAgICAgIHZhciBsb2NhdGlvbiA9IHRoaXMuZ2V0TG9jYXRpb24oKTtcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAudGhlbigoKSA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy53YXRjaElkID0gZ2VvbG9jYXRpb24ud2F0Y2hMb2NhdGlvbih0aGlzLmxvY2F0aW9uUmVjZWl2ZWQsIHRoaXMuZXJyb3IsIHtcbiAgICAgICAgICAgICAgICAgICAgZGVzaXJlZEFjY3VyYWN5OiAxMCxcbiAgICAgICAgICAgICAgICAgICAgdXBkYXRlRGlzdGFuY2U6IDEwLFxuICAgICAgICAgICAgICAgICAgICBtaW5pbXVtVXBkYXRlVGltZTogMTAwMDAsXG4gICAgICAgICAgICAgICAgICAgIG1heGltdW1BZ2U6IDYwMDAwXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9LCB0aGlzLmVycm9yKTtcblxuICAgIH07XG5cbiAgICBwcml2YXRlIG1hcFRhcHBlZCA9IChldmVudCkgPT4ge1xuICAgICAgICAvLyBjb25zb2xlLmxvZygnTWFwIFRhcHBlZCcpO1xuXG4gICAgICAgIC8vIHRoaXMudGFwTGluZSA9IHRoaXMuYWRkUG9pbnRUb0xpbmUoe1xuICAgICAgICAvLyAgIGNvbG9yOiBuZXcgQ29sb3IoJ1JlZCcpLFxuICAgICAgICAvLyAgIGxpbmU6IHRoaXMudGFwTGluZSxcbiAgICAgICAgLy8gICBsb2NhdGlvbjogZXZlbnQucG9zaXRpb24sXG4gICAgICAgIC8vICAgZ2VvZGVzaWM6IHRydWUsXG4gICAgICAgIC8vICAgd2lkdGg6IDEwXG4gICAgICAgIC8vIH0pO1xuXG4gICAgICAgIC8vIHRoaXMucmVtb3ZlTWFya2VyKHRoaXMudGFwTWFya2VyKTtcbiAgICAgICAgLy8gdGhpcy50YXBNYXJrZXIgPSB0aGlzLmFkZE1hcmtlcih7XG4gICAgICAgIC8vICAgbG9jYXRpb246IGV2ZW50LnBvc2l0aW9uLFxuICAgICAgICAvLyAgIHRpdGxlOiAnVGFwIExvY2F0aW9uJ1xuICAgICAgICAvLyB9KTtcbiAgICB9O1xuXG4gICAgcHJpdmF0ZSBsb2NhdGlvblJlY2VpdmVkID0gKHBvc2l0aW9uOiBQb3NpdGlvbikgPT4ge1xuICAgICAgICBjb25zb2xlLmxvZygnR1BTIFVwZGF0ZSBSZWNlaXZlZCcpO1xuXG4gICAgICAgIGlmICh0aGlzLm1hcFZpZXcgJiYgcG9zaXRpb24pIHtcbiAgICAgICAgICAgIHRoaXMubWFwVmlldy5sYXRpdHVkZSA9IHBvc2l0aW9uLmxhdGl0dWRlO1xuICAgICAgICAgICAgdGhpcy5tYXBWaWV3LmxvbmdpdHVkZSA9IHBvc2l0aW9uLmxvbmdpdHVkZTtcbiAgICAgICAgICAgIHRoaXMubWFwVmlldy56b29tID0gMTA7XG4gICAgICAgICAgICB0aGlzLmNlbnRlcmVkT25Mb2NhdGlvbiA9IHRydWU7XG4gICAgICAgIH1cblxuICAgICAgICAvLyB0aGlzLmdwc0xpbmUgPSB0aGlzLmFkZFBvaW50VG9MaW5lKHtcbiAgICAgICAgLy8gICBjb2xvcjogbmV3IENvbG9yKCdHcmVlbicpLFxuICAgICAgICAvLyAgIGxpbmU6IHRoaXMuZ3BzTGluZSxcbiAgICAgICAgLy8gICBsb2NhdGlvbjogcG9zaXRpb24sXG4gICAgICAgIC8vICAgZ2VvZGVzaWM6IHRydWUsXG4gICAgICAgIC8vICAgd2lkdGg6IDEwXG4gICAgICAgIC8vIH0pO1xuXG4gICAgICAgIHRoaXMucmVtb3ZlTWFya2VyKHRoaXMuZ3BzTWFya2VyKTtcbiAgICAgICAgdGhpcy5ncHNNYXJrZXIgPSB0aGlzLmFkZE1hcmtlcih7XG4gICAgICAgICAgICBsb2NhdGlvbjogcG9zaXRpb24sXG4gICAgICAgICAgICB0aXRsZTogJ0dQUyBMb2NhdGlvbidcbiAgICAgICAgfSk7XG4gICAgfTtcblxuICAgIHByaXZhdGUgYWRkUG9pbnRUb0xpbmUoYXJnczogQWRkTGluZUFyZ3MpIHtcbiAgICAgICAgaWYgKCF0aGlzLm1hcFZpZXcgfHwgIWFyZ3MgfHwgIWFyZ3MubG9jYXRpb24pIHJldHVybjtcblxuICAgICAgICBsZXQgbGluZSA9IGFyZ3MubGluZTtcblxuICAgICAgICBpZiAoIWxpbmUpIHtcbiAgICAgICAgICAgIGxpbmUgPSBuZXcgUG9seWxpbmUoKTtcbiAgICAgICAgICAgIGxpbmUudmlzaWJsZSA9IHRydWU7XG4gICAgICAgICAgICBsaW5lLndpZHRoID0gYXJncy53aWR0aCB8fCAxMDtcbiAgICAgICAgICAgIGxpbmUuY29sb3IgPSBhcmdzLmNvbG9yIHx8IG5ldyBDb2xvcignUmVkJyk7XG4gICAgICAgICAgICBsaW5lLmdlb2Rlc2ljID0gYXJncy5nZW9kZXNpYyAhPSB1bmRlZmluZWQgPyBhcmdzLmdlb2Rlc2ljIDogdHJ1ZTtcbiAgICAgICAgICAgIHRoaXMubWFwVmlldy5hZGRQb2x5bGluZShsaW5lKTtcbiAgICAgICAgfVxuICAgICAgICBsaW5lLmFkZFBvaW50KFBvc2l0aW9uLnBvc2l0aW9uRnJvbUxhdExuZyhhcmdzLmxvY2F0aW9uLmxhdGl0dWRlLCBhcmdzLmxvY2F0aW9uLmxvbmdpdHVkZSkpO1xuXG4gICAgICAgIHJldHVybiBsaW5lO1xuICAgIH1cbiAgICBwcml2YXRlIGFkZE1hcmtlcihhcmdzOiBBZGRNYXJrZXJBcmdzKTogTWFya2VyIHtcbiAgICAgICAgaWYgKCF0aGlzLm1hcFZpZXcgfHwgIWFyZ3MgfHwgIWFyZ3MubG9jYXRpb24pIHJldHVybjtcblxuICAgICAgICBsZXQgbWFya2VyID0gbmV3IE1hcmtlcigpO1xuICAgICAgICBtYXJrZXIucG9zaXRpb24gPSBQb3NpdGlvbi5wb3NpdGlvbkZyb21MYXRMbmcoYXJncy5sb2NhdGlvbi5sYXRpdHVkZSwgYXJncy5sb2NhdGlvbi5sb25naXR1ZGUpO1xuICAgICAgICBtYXJrZXIudGl0bGUgPSBhcmdzLnRpdGxlO1xuICAgICAgICBtYXJrZXIuc25pcHBldCA9IGFyZ3MudGl0bGU7XG4gICAgICAgIHRoaXMubWFwVmlldy5hZGRNYXJrZXIobWFya2VyKTtcblxuICAgICAgICByZXR1cm4gbWFya2VyO1xuICAgIH07XG5cbiAgICBwcml2YXRlIGNsZWFyR3BzTGluZSgpIHtcbiAgICAgICAgdGhpcy5yZW1vdmVMaW5lKHRoaXMuZ3BzTGluZSk7XG4gICAgICAgIHRoaXMuZ3BzTGluZSA9IG51bGw7XG5cbiAgICB9O1xuXG4gICAgcHJpdmF0ZSBjbGVhclRhcExpbmUoKSB7XG4gICAgICAgIHRoaXMucmVtb3ZlTGluZSh0aGlzLnRhcExpbmUpO1xuICAgICAgICB0aGlzLnRhcExpbmUgPSBudWxsO1xuICAgICAgICB0aGlzLnJlbW92ZU1hcmtlcih0aGlzLnRhcE1hcmtlcik7XG4gICAgICAgIHRoaXMudGFwTWFya2VyID0gbnVsbDtcblxuICAgIH1cblxuICAgIHByaXZhdGUgcmVtb3ZlTGluZShsaW5lOiBQb2x5bGluZSkge1xuICAgICAgICBpZiAobGluZSkge1xuICAgICAgICAgICAgbGluZS5yZW1vdmVBbGxQb2ludHMoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHByaXZhdGUgcmVtb3ZlTWFya2VyKG1hcmtlcjogTWFya2VyKSB7XG4gICAgICAgIGlmICh0aGlzLm1hcFZpZXcgJiYgbWFya2VyKSB7XG4gICAgICAgICAgICB0aGlzLm1hcFZpZXcucmVtb3ZlTWFya2VyKG1hcmtlcik7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwcml2YXRlIGVycm9yKGVycikge1xuICAgICAgICBjb25zb2xlLmxvZygnRXJyb3I6ICcgKyBKU09OLnN0cmluZ2lmeShlcnIpKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIG9uTWFya2VyU2VsZWN0KGV2ZW50KSB7XG4gICAgICAgIGNvbnNvbGUubG9nKCdDbGlja2VkIG9uICcgKyBldmVudC5tYXJrZXIudGl0bGUpO1xuICAgIH1cblxuICAgIHByaXZhdGUgb25DYW1lcmFDaGFuZ2VkKGV2ZW50KSB7XG4gICAgICAgIGNvbnNvbGUubG9nKCdDYW1lcmEgY2hhbmdlZDogJyArIEpTT04uc3RyaW5naWZ5KGV2ZW50LmNhbWVyYSkpO1xuICAgIH1cbn1cblxuXG5leHBvcnQgY2xhc3MgQWRkTGluZUFyZ3Mge1xuICAgIHB1YmxpYyBjb2xvcjogQ29sb3I7XG4gICAgcHVibGljIGxpbmU6IFBvbHlsaW5lO1xuICAgIHB1YmxpYyBsb2NhdGlvbjogUG9zaXRpb247XG4gICAgcHVibGljIGdlb2Rlc2ljOiBib29sZWFuO1xuICAgIHB1YmxpYyB3aWR0aDogbnVtYmVyO1xufVxuXG5leHBvcnQgY2xhc3MgQWRkTWFya2VyQXJncyB7XG4gICAgcHVibGljIGxvY2F0aW9uOiBQb3NpdGlvbjtcbiAgICBwdWJsaWMgdGl0bGU6IHN0cmluZztcbn1cblxuY2xhc3MgTWFya1dyYXBwZXIge1xuICAgIG1hcms6IE1hcmtlcjtcbiAgICBtYXJrSWQ6IG51bWJlcjtcbn0iXX0=