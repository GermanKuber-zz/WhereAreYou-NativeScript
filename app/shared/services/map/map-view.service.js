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
        if (!geolocation.isEnabled()) {
            geolocation.enableLocationRequest();
        }
    }
    MapViewService.prototype.setMapView = function (map) {
        var _this = this;
        if (map == null)
            throw new Error("El parametro 'map' no puede ser null");
        this.mapView = map;
        this.mapView.notifyMapReady = function () { return _this.onMapReady; };
    };
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
    MapViewService.prototype.onMapReady = function (event) {
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
    MapViewService.prototype.getFriends = function () {
        this.removeMarker(this.tapMarker);
        var mark = new AddMarkerArgs();
        mark.title = "Primeroo";
        mark.location = new nativescript_google_maps_sdk_1.Position();
        // mark.location.latitude = item.latitude;
        // mark.location.longitude = item.longitude;
        var mapMark = this.addMarker(mark);
        mapMark.snippet = "Primero";
        this.mapView.addMarker(mapMark);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFwLXZpZXcuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIm1hcC12aWV3LnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLHNDQUEyQztBQUUzQyxnQ0FBOEI7QUFDOUIsaUNBQStCO0FBQy9CLDZFQUFtRjtBQUNuRixJQUFJLFdBQVcsR0FBRyxPQUFPLENBQUMsMEJBQTBCLENBQUMsQ0FBQztBQUN0RCxJQUFJLEtBQUssR0FBRyxPQUFPLENBQUMsa0JBQWtCLENBQUMsQ0FBQztBQUN4QywrQkFBOEI7QUFFOUIsSUFBYSxjQUFjO0lBVXpCO1FBQUEsaUJBSUM7UUFiRCxRQUFRO1FBQ0EsWUFBTyxHQUFZLElBQUksQ0FBQztRQUNoQyxZQUFPLEdBQVcsSUFBSSxDQUFDO1FBS3ZCLHVCQUFrQixHQUFZLEtBQUssQ0FBQztRQWlGcEMsY0FBUyxHQUFHLFVBQUMsS0FBSztZQUNoQiw2QkFBNkI7WUFFN0IsdUNBQXVDO1lBQ3ZDLDZCQUE2QjtZQUM3Qix3QkFBd0I7WUFDeEIsOEJBQThCO1lBQzlCLG9CQUFvQjtZQUNwQixjQUFjO1lBQ2QsTUFBTTtZQUVOLHFDQUFxQztZQUNyQyxvQ0FBb0M7WUFDcEMsOEJBQThCO1lBQzlCLDBCQUEwQjtZQUMxQixNQUFNO1FBQ1IsQ0FBQyxDQUFDO1FBRUYscUJBQWdCLEdBQUcsVUFBQyxRQUFrQjtZQUNwQyxPQUFPLENBQUMsR0FBRyxDQUFDLHFCQUFxQixDQUFDLENBQUM7WUFFbkMsRUFBRSxDQUFDLENBQUMsS0FBSSxDQUFDLE9BQU8sSUFBSSxRQUFRLENBQUMsQ0FBQyxDQUFDO2dCQUM3QixLQUFJLENBQUMsT0FBTyxDQUFDLFFBQVEsR0FBRyxRQUFRLENBQUMsUUFBUSxDQUFDO2dCQUMxQyxLQUFJLENBQUMsT0FBTyxDQUFDLFNBQVMsR0FBRyxRQUFRLENBQUMsU0FBUyxDQUFDO2dCQUM1QyxLQUFJLENBQUMsT0FBTyxDQUFDLElBQUksR0FBRyxDQUFDLENBQUM7Z0JBQ3RC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QUFDO0lBR0gscUJBQUM7QUFBRCxDQUFDLEFBck5ELElBcU5DO0FBck5ZLGNBQWM7SUFEMUIsaUJBQVUsRUFBRTs7R0FDQSxjQUFjLENBcU4xQjtBQXJOWSx3Q0FBYztBQXdOM0I7SUFBQTtJQU1BLENBQUM7SUFBRCxrQkFBQztBQUFELENBQUMsQUFORCxJQU1DO0FBTlksa0NBQVc7QUFReEI7SUFBQTtJQUdBLENBQUM7SUFBRCxvQkFBQztBQUFELENBQUMsQUFIRCxJQUdDO0FBSFksc0NBQWEiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcbmltcG9ydCB7IE9ic2VydmFibGUgfSBmcm9tIFwicnhqcy9SeFwiO1xuaW1wb3J0IFwicnhqcy9hZGQvb3BlcmF0b3IvZG9cIjtcbmltcG9ydCBcInJ4anMvYWRkL29wZXJhdG9yL21hcFwiO1xuaW1wb3J0IHsgTWFwVmlldywgTWFya2VyLCBQb2x5bGluZSwgUG9zaXRpb24gfSBmcm9tICduYXRpdmVzY3JpcHQtZ29vZ2xlLW1hcHMtc2RrJztcbmxldCBnZW9sb2NhdGlvbiA9IHJlcXVpcmUoJ25hdGl2ZXNjcmlwdC1nZW9sb2NhdGlvbicpO1xudmFyIHN0eWxlID0gcmVxdWlyZSgnLi9tYXAtc3R5bGUuanNvbicpO1xuaW1wb3J0IHsgQ29sb3IgfSBmcm9tICdjb2xvcic7XG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgTWFwVmlld1NlcnZpY2Uge1xuICAvLyNNYXBhIFxuICBwcml2YXRlIG1hcFZpZXc6IE1hcFZpZXcgPSBudWxsO1xuICB3YXRjaElkOiBudW1iZXIgPSBudWxsO1xuICBncHNMaW5lOiBQb2x5bGluZTtcbiAgdGFwTGluZTogUG9seWxpbmU7XG4gIHRhcE1hcmtlcjogYW55O1xuICBncHNNYXJrZXI6IGFueTtcbiAgY2VudGVyZWRPbkxvY2F0aW9uOiBib29sZWFuID0gZmFsc2U7XG5cbiAgY29uc3RydWN0b3IoKSB7XG4gICAgaWYgKCFnZW9sb2NhdGlvbi5pc0VuYWJsZWQoKSkge1xuICAgICAgZ2VvbG9jYXRpb24uZW5hYmxlTG9jYXRpb25SZXF1ZXN0KCk7XG4gICAgfVxuICB9XG5cblxuICBzZXRNYXBWaWV3KG1hcDogTWFwVmlldyk6IHZvaWQge1xuICAgIGlmIChtYXAgPT0gbnVsbClcbiAgICAgIHRocm93IG5ldyBFcnJvcihcIkVsIHBhcmFtZXRybyAnbWFwJyBubyBwdWVkZSBzZXIgbnVsbFwiKTtcbiAgICB0aGlzLm1hcFZpZXcgPSBtYXA7XG5cbiAgICB0aGlzLm1hcFZpZXcubm90aWZ5TWFwUmVhZHkgPSAoKSA9PiB0aGlzLm9uTWFwUmVhZHk7XG5cbiAgfVxuXG5cbiAgbmdPbkluaXQoKSB7XG5cblxuXG4gICAgLy8gdGhpcy5ncm9jZXJ5TGlzdFNlcnZpY2UubG9hZCgpXG4gICAgLy8gLnN1YnNjcmliZShsb2FkZWRHcm9jZXJpZXMgPT4ge1xuICAgIC8vICAgbG9hZGVkR3JvY2VyaWVzLmZvckVhY2goKGdyb2NlcnlPYmplY3QpID0+IHtcbiAgICAvLyAgICAgdGhpcy5ncm9jZXJ5TGlzdC51bnNoaWZ0KGdyb2NlcnlPYmplY3QpO1xuICAgIC8vICAgfSk7XG4gICAgLy8gICB0aGlzLmlzTG9hZGluZyA9IGZhbHNlO1xuICAgIC8vICAgdGhpcy5saXN0TG9hZGVkID0gdHJ1ZTtcbiAgICAvLyB9KTtcbiAgfVxuXG4gIHByaXZhdGUgZW5hYmxlTG9jYXRpb24oKSB7XG4gICAgaWYgKCFnZW9sb2NhdGlvbi5pc0VuYWJsZWQoKSkge1xuICAgICAgY29uc29sZS5sb2coJ0xvY2F0aW9uIG5vdCBlbmFibGVkLCByZXF1ZXN0aW5nLicpO1xuICAgICAgcmV0dXJuIGdlb2xvY2F0aW9uLmVuYWJsZUxvY2F0aW9uUmVxdWVzdCgpO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKHRydWUpO1xuICAgIH1cbiAgfVxuXG4gIGdldExvY2F0aW9uKCkge1xuICAgIGlmIChnZW9sb2NhdGlvbi5pc0VuYWJsZWQoKSkge1xuICAgICAgdmFyIGxvY2F0aW9uID0gZ2VvbG9jYXRpb24uZ2V0Q3VycmVudExvY2F0aW9uKHtcbiAgICAgICAgZGVzaXJlZEFjY3VyYWN5OiAxMCxcbiAgICAgICAgdXBkYXRlRGlzdGFuY2U6IDEwLFxuICAgICAgICBtaW5pbXVtVXBkYXRlVGltZTogMTAwMCxcbiAgICAgICAgbWF4aW11bUFnZTogMTAwMDBcbiAgICAgIH0pXG4gICAgICByZXR1cm4gbG9jYXRpb247XG4gICAgfVxuICAgIHJldHVybiBQcm9taXNlLnJlamVjdCgnR2VvbG9jYXRpb24gbm90IGVuYWJsZWQuJyk7XG4gIH1cblxuICAvL01hcCBldmVudHNcbiAgb25NYXBSZWFkeShldmVudCkge1xuICAgIGlmICh0aGlzLm1hcFZpZXcgfHwgIWV2ZW50Lm9iamVjdCkgcmV0dXJuO1xuXG4gICAgdGhpcy5tYXBWaWV3ID0gZXZlbnQub2JqZWN0O1xuXG4gICAgdGhpcy5tYXBWaWV3LnNldFN0eWxlKHN0eWxlKTtcblxuICAgIC8vIHRoaXMubWFwVmlldy5tYXJrZXJTZWxlY3QgPSB0aGlzLm9uTWFya2VyU2VsZWN0O1xuICAgIC8vIHRoaXMubWFwVmlldy5jYW1lcmFDaGFuZ2VkID0gdGhpcy5vbkNhbWVyYUNoYW5nZWQ7XG5cbiAgICB0aGlzLmVuYWJsZUxvY2F0aW9uKClcbiAgICAgIC50aGVuKCgpID0+IHtcbiAgICAgICAgdmFyIGxvY2F0aW9uID0gdGhpcy5nZXRMb2NhdGlvbigpO1xuICAgICAgfSlcbiAgICAgIC50aGVuKCgpID0+IHtcbiAgICAgICAgdGhpcy53YXRjaElkID0gZ2VvbG9jYXRpb24ud2F0Y2hMb2NhdGlvbih0aGlzLmxvY2F0aW9uUmVjZWl2ZWQsIHRoaXMuZXJyb3IsIHtcbiAgICAgICAgICBkZXNpcmVkQWNjdXJhY3k6IDEwLFxuICAgICAgICAgIHVwZGF0ZURpc3RhbmNlOiAxMCxcbiAgICAgICAgICBtaW5pbXVtVXBkYXRlVGltZTogMTAwMDAsXG4gICAgICAgICAgbWF4aW11bUFnZTogNjAwMDBcbiAgICAgICAgfSk7XG4gICAgICB9LCB0aGlzLmVycm9yKTtcblxuICB9O1xuXG4gIG1hcFRhcHBlZCA9IChldmVudCkgPT4ge1xuICAgIC8vIGNvbnNvbGUubG9nKCdNYXAgVGFwcGVkJyk7XG5cbiAgICAvLyB0aGlzLnRhcExpbmUgPSB0aGlzLmFkZFBvaW50VG9MaW5lKHtcbiAgICAvLyAgIGNvbG9yOiBuZXcgQ29sb3IoJ1JlZCcpLFxuICAgIC8vICAgbGluZTogdGhpcy50YXBMaW5lLFxuICAgIC8vICAgbG9jYXRpb246IGV2ZW50LnBvc2l0aW9uLFxuICAgIC8vICAgZ2VvZGVzaWM6IHRydWUsXG4gICAgLy8gICB3aWR0aDogMTBcbiAgICAvLyB9KTtcblxuICAgIC8vIHRoaXMucmVtb3ZlTWFya2VyKHRoaXMudGFwTWFya2VyKTtcbiAgICAvLyB0aGlzLnRhcE1hcmtlciA9IHRoaXMuYWRkTWFya2VyKHtcbiAgICAvLyAgIGxvY2F0aW9uOiBldmVudC5wb3NpdGlvbixcbiAgICAvLyAgIHRpdGxlOiAnVGFwIExvY2F0aW9uJ1xuICAgIC8vIH0pO1xuICB9O1xuXG4gIGxvY2F0aW9uUmVjZWl2ZWQgPSAocG9zaXRpb246IFBvc2l0aW9uKSA9PiB7XG4gICAgY29uc29sZS5sb2coJ0dQUyBVcGRhdGUgUmVjZWl2ZWQnKTtcblxuICAgIGlmICh0aGlzLm1hcFZpZXcgJiYgcG9zaXRpb24pIHtcbiAgICAgIHRoaXMubWFwVmlldy5sYXRpdHVkZSA9IHBvc2l0aW9uLmxhdGl0dWRlO1xuICAgICAgdGhpcy5tYXBWaWV3LmxvbmdpdHVkZSA9IHBvc2l0aW9uLmxvbmdpdHVkZTtcbiAgICAgIHRoaXMubWFwVmlldy56b29tID0gNjtcbiAgICAgIHRoaXMuY2VudGVyZWRPbkxvY2F0aW9uID0gdHJ1ZTtcbiAgICB9XG5cbiAgICAvLyB0aGlzLmdwc0xpbmUgPSB0aGlzLmFkZFBvaW50VG9MaW5lKHtcbiAgICAvLyAgIGNvbG9yOiBuZXcgQ29sb3IoJ0dyZWVuJyksXG4gICAgLy8gICBsaW5lOiB0aGlzLmdwc0xpbmUsXG4gICAgLy8gICBsb2NhdGlvbjogcG9zaXRpb24sXG4gICAgLy8gICBnZW9kZXNpYzogdHJ1ZSxcbiAgICAvLyAgIHdpZHRoOiAxMFxuICAgIC8vIH0pO1xuXG4gICAgdGhpcy5yZW1vdmVNYXJrZXIodGhpcy5ncHNNYXJrZXIpO1xuICAgIHRoaXMuZ3BzTWFya2VyID0gdGhpcy5hZGRNYXJrZXIoe1xuICAgICAgbG9jYXRpb246IHBvc2l0aW9uLFxuICAgICAgdGl0bGU6ICdHUFMgTG9jYXRpb24nXG4gICAgfSk7XG4gIH07XG5cbiAgYWRkUG9pbnRUb0xpbmUoYXJnczogQWRkTGluZUFyZ3MpIHtcbiAgICBpZiAoIXRoaXMubWFwVmlldyB8fCAhYXJncyB8fCAhYXJncy5sb2NhdGlvbikgcmV0dXJuO1xuXG4gICAgbGV0IGxpbmUgPSBhcmdzLmxpbmU7XG5cbiAgICBpZiAoIWxpbmUpIHtcbiAgICAgIGxpbmUgPSBuZXcgUG9seWxpbmUoKTtcbiAgICAgIGxpbmUudmlzaWJsZSA9IHRydWU7XG4gICAgICBsaW5lLndpZHRoID0gYXJncy53aWR0aCB8fCAxMDtcbiAgICAgIGxpbmUuY29sb3IgPSBhcmdzLmNvbG9yIHx8IG5ldyBDb2xvcignUmVkJyk7XG4gICAgICBsaW5lLmdlb2Rlc2ljID0gYXJncy5nZW9kZXNpYyAhPSB1bmRlZmluZWQgPyBhcmdzLmdlb2Rlc2ljIDogdHJ1ZTtcbiAgICAgIHRoaXMubWFwVmlldy5hZGRQb2x5bGluZShsaW5lKTtcbiAgICB9XG4gICAgbGluZS5hZGRQb2ludChQb3NpdGlvbi5wb3NpdGlvbkZyb21MYXRMbmcoYXJncy5sb2NhdGlvbi5sYXRpdHVkZSwgYXJncy5sb2NhdGlvbi5sb25naXR1ZGUpKTtcblxuICAgIHJldHVybiBsaW5lO1xuICB9XG4gIGFkZE1hcmtlcihhcmdzOiBBZGRNYXJrZXJBcmdzKTogTWFya2VyIHtcbiAgICBpZiAoIXRoaXMubWFwVmlldyB8fCAhYXJncyB8fCAhYXJncy5sb2NhdGlvbikgcmV0dXJuO1xuXG4gICAgbGV0IG1hcmtlciA9IG5ldyBNYXJrZXIoKTtcbiAgICBtYXJrZXIucG9zaXRpb24gPSBQb3NpdGlvbi5wb3NpdGlvbkZyb21MYXRMbmcoYXJncy5sb2NhdGlvbi5sYXRpdHVkZSwgYXJncy5sb2NhdGlvbi5sb25naXR1ZGUpO1xuICAgIG1hcmtlci50aXRsZSA9IGFyZ3MudGl0bGU7XG4gICAgbWFya2VyLnNuaXBwZXQgPSBhcmdzLnRpdGxlO1xuICAgIHRoaXMubWFwVmlldy5hZGRNYXJrZXIobWFya2VyKTtcblxuICAgIHJldHVybiBtYXJrZXI7XG4gIH07XG5cbiAgY2xlYXJHcHNMaW5lKCkge1xuICAgIHRoaXMucmVtb3ZlTGluZSh0aGlzLmdwc0xpbmUpO1xuICAgIHRoaXMuZ3BzTGluZSA9IG51bGw7XG5cbiAgfTtcblxuICBjbGVhclRhcExpbmUoKSB7XG4gICAgdGhpcy5yZW1vdmVMaW5lKHRoaXMudGFwTGluZSk7XG4gICAgdGhpcy50YXBMaW5lID0gbnVsbDtcbiAgICB0aGlzLnJlbW92ZU1hcmtlcih0aGlzLnRhcE1hcmtlcik7XG4gICAgdGhpcy50YXBNYXJrZXIgPSBudWxsO1xuXG4gIH1cblxuICByZW1vdmVMaW5lKGxpbmU6IFBvbHlsaW5lKSB7XG4gICAgaWYgKGxpbmUpIHtcbiAgICAgIGxpbmUucmVtb3ZlQWxsUG9pbnRzKCk7XG4gICAgfVxuICB9XG5cbiAgcmVtb3ZlTWFya2VyKG1hcmtlcjogTWFya2VyKSB7XG4gICAgaWYgKHRoaXMubWFwVmlldyAmJiBtYXJrZXIpIHtcbiAgICAgIHRoaXMubWFwVmlldy5yZW1vdmVNYXJrZXIobWFya2VyKTtcbiAgICB9XG4gIH1cblxuICBlcnJvcihlcnIpIHtcbiAgICBjb25zb2xlLmxvZygnRXJyb3I6ICcgKyBKU09OLnN0cmluZ2lmeShlcnIpKTtcbiAgfVxuXG4gIG9uTWFya2VyU2VsZWN0KGV2ZW50KSB7XG4gICAgY29uc29sZS5sb2coJ0NsaWNrZWQgb24gJyArIGV2ZW50Lm1hcmtlci50aXRsZSk7XG4gIH1cblxuICBvbkNhbWVyYUNoYW5nZWQoZXZlbnQpIHtcbiAgICBjb25zb2xlLmxvZygnQ2FtZXJhIGNoYW5nZWQ6ICcgKyBKU09OLnN0cmluZ2lmeShldmVudC5jYW1lcmEpKTtcbiAgfVxuXG4gIHByaXZhdGUgZ2V0RnJpZW5kcygpOiB2b2lkIHtcblxuICAgIHRoaXMucmVtb3ZlTWFya2VyKHRoaXMudGFwTWFya2VyKTtcbiAgICB2YXIgbWFyayA9IG5ldyBBZGRNYXJrZXJBcmdzKCk7XG4gICAgbWFyay50aXRsZSA9IFwiUHJpbWVyb29cIjtcbiAgICBtYXJrLmxvY2F0aW9uID0gbmV3IFBvc2l0aW9uKCk7XG4gICAgLy8gbWFyay5sb2NhdGlvbi5sYXRpdHVkZSA9IGl0ZW0ubGF0aXR1ZGU7XG4gICAgLy8gbWFyay5sb2NhdGlvbi5sb25naXR1ZGUgPSBpdGVtLmxvbmdpdHVkZTtcbiAgICB2YXIgbWFwTWFyazogTWFya2VyID0gdGhpcy5hZGRNYXJrZXIobWFyayk7XG4gICAgbWFwTWFyay5zbmlwcGV0ID0gXCJQcmltZXJvXCI7XG4gICAgdGhpcy5tYXBWaWV3LmFkZE1hcmtlcihtYXBNYXJrKTtcbiAgfVxuXG5cbn1cblxuXG5leHBvcnQgY2xhc3MgQWRkTGluZUFyZ3Mge1xuICBwdWJsaWMgY29sb3I6IENvbG9yO1xuICBwdWJsaWMgbGluZTogUG9seWxpbmU7XG4gIHB1YmxpYyBsb2NhdGlvbjogUG9zaXRpb247XG4gIHB1YmxpYyBnZW9kZXNpYzogYm9vbGVhbjtcbiAgcHVibGljIHdpZHRoOiBudW1iZXI7XG59XG5cbmV4cG9ydCBjbGFzcyBBZGRNYXJrZXJBcmdzIHtcbiAgcHVibGljIGxvY2F0aW9uOiBQb3NpdGlvbjtcbiAgcHVibGljIHRpdGxlOiBzdHJpbmc7XG59Il19