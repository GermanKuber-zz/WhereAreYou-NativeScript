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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFwLXZpZXcuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIm1hcC12aWV3LnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLHNDQUEyQztBQUUzQyxnQ0FBOEI7QUFDOUIsaUNBQStCO0FBQy9CLGtDQUFpQztBQUNqQyw2RUFBbUY7QUFDbkYsSUFBSSxVQUFVLEdBQUcsT0FBTyxDQUFDLDhCQUE4QixDQUFDLENBQUM7QUFDekQsSUFBSSxXQUFXLEdBQUcsT0FBTyxDQUFDLDBCQUEwQixDQUFDLENBQUM7QUFDdEQsSUFBSSxLQUFLLEdBQUcsT0FBTyxDQUFDLGtCQUFrQixDQUFDLENBQUM7QUFDeEMsK0JBQThCO0FBQzlCLDJFQUF5RTtBQUV6RSxJQUFhLGNBQWM7SUFVdkIsd0JBQW9CLGFBQTZCO1FBQWpELGlCQUlDO1FBSm1CLGtCQUFhLEdBQWIsYUFBYSxDQUFnQjtRQVRqRCxRQUFRO1FBQ0EsWUFBTyxHQUFZLElBQUksQ0FBQztRQUNoQyxZQUFPLEdBQVcsSUFBSSxDQUFDO1FBS3ZCLHVCQUFrQixHQUFZLEtBQUssQ0FBQztRQUM1QixhQUFRLEdBQXVCLElBQUksS0FBSyxFQUFlLENBQUM7UUF3SHhELGNBQVMsR0FBRyxVQUFDLEtBQUs7UUFFMUIsQ0FBQyxDQUFDO1FBRU0scUJBQWdCLEdBQUcsVUFBQyxRQUFrQjtZQUMxQyxPQUFPLENBQUMsR0FBRyxDQUFDLHFCQUFxQixDQUFDLENBQUM7WUFFbkMsRUFBRSxDQUFDLENBQUMsS0FBSSxDQUFDLE9BQU8sSUFBSSxRQUFRLENBQUMsQ0FBQyxDQUFDO2dCQUMzQixLQUFJLENBQUMsT0FBTyxDQUFDLFFBQVEsR0FBRyxRQUFRLENBQUMsUUFBUSxDQUFDO2dCQUMxQyxLQUFJLENBQUMsT0FBTyxDQUFDLFNBQVMsR0FBRyxRQUFRLENBQUMsU0FBUyxDQUFDO2dCQUM1QyxLQUFJLENBQUMsT0FBTyxDQUFDLElBQUksR0FBRyxDQUFDLENBQUM7Z0JBQ3RCLEtBQUks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YTtBQUsxQjtJQUFBO0lBR0EsQ0FBQztJQUFELGtCQUFDO0FBQUQsQ0FBQyxBQUhELElBR0MiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcbmltcG9ydCB7IE9ic2VydmFibGUgfSBmcm9tIFwicnhqcy9SeFwiO1xuaW1wb3J0IFwicnhqcy9hZGQvb3BlcmF0b3IvZG9cIjtcbmltcG9ydCBcInJ4anMvYWRkL29wZXJhdG9yL21hcFwiO1xuaW1wb3J0IHsgSW1hZ2UgfSBmcm9tIFwidWkvaW1hZ2VcIjtcbmltcG9ydCB7IE1hcFZpZXcsIE1hcmtlciwgUG9seWxpbmUsIFBvc2l0aW9uIH0gZnJvbSAnbmF0aXZlc2NyaXB0LWdvb2dsZS1tYXBzLXNkayc7XG52YXIgbWFwc01vZHVsZSA9IHJlcXVpcmUoXCJuYXRpdmVzY3JpcHQtZ29vZ2xlLW1hcHMtc2RrXCIpO1xubGV0IGdlb2xvY2F0aW9uID0gcmVxdWlyZSgnbmF0aXZlc2NyaXB0LWdlb2xvY2F0aW9uJyk7XG52YXIgc3R5bGUgPSByZXF1aXJlKCcuL21hcC1zdHlsZS5qc29uJyk7XG5pbXBvcnQgeyBDb2xvciB9IGZyb20gJ2NvbG9yJztcbmltcG9ydCB7IEZyaWVuZHNTZXJ2aWNlIH0gZnJvbSAnLi4vLi4vLi4vc2hhcmVkL2ZyaWVuZHMvZnJpZW5kcy5zZXJ2aWNlJztcbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBNYXBWaWV3U2VydmljZSB7XG4gICAgLy8jTWFwYSBcbiAgICBwcml2YXRlIG1hcFZpZXc6IE1hcFZpZXcgPSBudWxsO1xuICAgIHdhdGNoSWQ6IG51bWJlciA9IG51bGw7XG4gICAgZ3BzTGluZTogUG9seWxpbmU7XG4gICAgdGFwTGluZTogUG9seWxpbmU7XG4gICAgdGFwTWFya2VyOiBhbnk7XG4gICAgZ3BzTWFya2VyOiBhbnk7XG4gICAgY2VudGVyZWRPbkxvY2F0aW9uOiBib29sZWFuID0gZmFsc2U7XG4gICAgcHJpdmF0ZSBtYXJrTGlzdDogQXJyYXk8TWFya1dyYXBwZXI+ID0gbmV3IEFycmF5PE1hcmtXcmFwcGVyPigpO1xuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgZnJpZW5kU2VydmljZTogRnJpZW5kc1NlcnZpY2UpIHtcbiAgICAgICAgaWYgKCFnZW9sb2NhdGlvbi5pc0VuYWJsZWQoKSkge1xuICAgICAgICAgICAgZ2VvbG9jYXRpb24uZW5hYmxlTG9jYXRpb25SZXF1ZXN0KCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBuZ09uSW5pdCgpIHtcblxuICAgICAgICAvLyB0aGlzLmdyb2NlcnlMaXN0U2VydmljZS5sb2FkKClcbiAgICAgICAgLy8gLnN1YnNjcmliZShsb2FkZWRHcm9jZXJpZXMgPT4ge1xuICAgICAgICAvLyAgIGxvYWRlZEdyb2Nlcmllcy5mb3JFYWNoKChncm9jZXJ5T2JqZWN0KSA9PiB7XG4gICAgICAgIC8vICAgICB0aGlzLmdyb2NlcnlMaXN0LnVuc2hpZnQoZ3JvY2VyeU9iamVjdCk7XG4gICAgICAgIC8vICAgfSk7XG4gICAgICAgIC8vICAgdGhpcy5pc0xvYWRpbmcgPSBmYWxzZTtcbiAgICAgICAgLy8gICB0aGlzLmxpc3RMb2FkZWQgPSB0cnVlO1xuICAgICAgICAvLyB9KTtcbiAgICB9XG5cbiAgICAvL1ByaXZhdGUgTWV0aG9kc1xuICAgIHB1YmxpYyBjcmVhdGVNYXJrV3JhcHBlcihtYXJrSW5mbzogQWRkTWFya2VyQXJncywgbWFya0lkOiBudW1iZXIpOiBNYXJrV3JhcHBlciB7XG4gICAgICAgIC8vQ3JlbyB1biBNYXJrV3JhcHBlciBlbCBjdWFsIHJlbGFjaW9uYSBlbCBNYXJrZXIgY29uIGVsIGlkIGRlbCB1c3VhcmlvIGRpYnVqYWRvXG4gICAgICAgIHZhciBtYXJrID0gbmV3IEFkZE1hcmtlckFyZ3MoKTtcbiAgICAgICAgbWFyay50aXRsZSA9IG1hcmtJbmZvLnRpdGxlO1xuICAgICAgICBtYXJrLmxvY2F0aW9uID0gbmV3IFBvc2l0aW9uKCk7XG4gICAgICAgIG1hcmsubG9jYXRpb24ubGF0aXR1ZGUgPSBtYXJrSW5mby5sb2NhdGlvbi5sYXRpdHVkZTtcbiAgICAgICAgbWFyay5sb2NhdGlvbi5sb25naXR1ZGUgPSBtYXJrSW5mby5sb2NhdGlvbi5sb25naXR1ZGU7XG5cbiAgICAgICAgdmFyIG1hcE1hcms6IE1hcmtlciA9IHRoaXMuYWRkTWFya2VyKG1hcmspO1xuICAgICAgICB2YXIgbWFya1dyYXBwZXIgPSBuZXcgTWFya1dyYXBwZXIoKTtcbiAgICAgICAgbWFya1dyYXBwZXIubWFya0lkID0gbWFya0lkO1xuICAgICAgICBtYXJrV3JhcHBlci5tYXJrID0gbWFwTWFyaztcbiAgICAgICAgcmV0dXJuIG1hcmtXcmFwcGVyO1xuICAgIH1cbiAgICBwcml2YXRlIGdldE1hcmtXcmFwcGVyKG1hcmtJZDogbnVtYmVyKTogTWFya1dyYXBwZXIge1xuICAgICAgICAvL1JlZ3Jlc28gdW4gbWFya1dyYXBwZXIgcG9yIElEXG4gICAgICAgIGZvciAodmFyIGl0ZW0gb2YgdGhpcy5tYXJrTGlzdClcbiAgICAgICAgICAgIGlmIChpdGVtLm1hcmtJZCA9PSBtYXJrSWQpXG4gICAgICAgICAgICAgICAgcmV0dXJuIGl0ZW07XG5cbiAgICB9XG4gICAgLy9QdWJsaWMgTWV0aG9kc1xuICAgIHB1YmxpYyBhZGRDb21tb25NYXJrKG1hcmtJbmZvOiBBZGRNYXJrZXJBcmdzLCBtYXJrSWQ6IG51bWJlcik6IHZvaWQge1xuICAgICAgICB2YXIgbWFya1dyYXBwZXIgPSB0aGlzLmNyZWF0ZU1hcmtXcmFwcGVyKG1hcmtJbmZvLCBtYXJrSWQpO1xuICAgICAgICB0aGlzLm1hcmtMaXN0LnB1c2gobWFya1dyYXBwZXIpO1xuICAgICAgICB0aGlzLm1hcFZpZXcuYWRkTWFya2VyKG1hcmtXcmFwcGVyLm1hcmspO1xuICAgICAgICB2YXIgbWFya2VyID0gbmV3IG1hcHNNb2R1bGUuTWFya2VyKCk7XG4gICAgICAgIG1hcmtlci5wb3NpdGlvbiA9IG1hcHNNb2R1bGUuUG9zaXRpb24ucG9zaXRpb25Gcm9tTGF0TG5nKC0zMy42NiwgMTUxLjIwKTtcbiAgICAgICAgbWFya2VyLmluZm9XaW5kb3dUZW1wbGF0ZSA9ICd+L2luZm8td2luZG93JztcbiAgICAgICAgbWFya2VyLnRpdGxlID0gXCJTZWVlZWVlZWVlZWVlXCI7XG4gICAgICAgIHRoaXMubWFwVmlldy5hZGRNYXJrZXIobWFya2VyKTtcbiAgICAgICAgbWFya2VyLnNob3dJbmZvV2luZG93KCk7XG5cbiAgICB9XG4gICAgcHVibGljIHVwZGF0ZUNvbW1vbk1hcmsobWFya0luZm86IEFkZE1hcmtlckFyZ3MsIG1hcmtJZDogbnVtYmVyKTogdm9pZCB7XG4gICAgICAgIHZhciBtYXJrV3JhcHBlciA9IHRoaXMuZ2V0TWFya1dyYXBwZXIobWFya0lkKTtcbiAgICAgICAgaWYgKG1hcmtXcmFwcGVyICE9IG51bGwpIHtcbiAgICAgICAgICAgIHRoaXMubWFwVmlldy5yZW1vdmVNYXJrZXIobWFya1dyYXBwZXIubWFyayk7XG4gICAgICAgICAgICBtYXJrV3JhcHBlci5tYXJrLnBvc2l0aW9uID0gbWFya0luZm8ubG9jYXRpb247XG4gICAgICAgICAgICB0aGlzLm1hcFZpZXcuYWRkTWFya2VyKG1hcmtXcmFwcGVyLm1hcmspO1xuICAgICAgICAgICAgbWFya1dyYXBwZXIubWFyay5zaG93SW5mb1dpbmRvdygpO1xuICAgICAgICB9XG4gICAgfVxuICAgIHB1YmxpYyByZW1vdmVDb21tb25NYXJrKG1hcmtJbmZvOiBBZGRNYXJrZXJBcmdzLCBtYXJrSWQ6IG51bWJlcik6IHZvaWQge1xuICAgICAgICB2YXIgbWFya1dyYXBwZXIgPSB0aGlzLmdldE1hcmtXcmFwcGVyKG1hcmtJZCk7XG4gICAgICAgIHRoaXMubWFwVmlldy5yZW1vdmVNYXJrZXIobWFya1dyYXBwZXIubWFyayk7XG4gICAgfVxuXG5cbiAgICBwcml2YXRlIGVuYWJsZUxvY2F0aW9uKCkge1xuICAgICAgICBpZiAoIWdlb2xvY2F0aW9uLmlzRW5hYmxlZCgpKSB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZygnTG9jYXRpb24gbm90IGVuYWJsZWQsIHJlcXVlc3RpbmcuJyk7XG4gICAgICAgICAgICByZXR1cm4gZ2VvbG9jYXRpb24uZW5hYmxlTG9jYXRpb25SZXF1ZXN0KCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKHRydWUpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBnZXRMb2NhdGlvbigpIHtcbiAgICAgICAgaWYgKGdlb2xvY2F0aW9uLmlzRW5hYmxlZCgpKSB7XG4gICAgICAgICAgICB2YXIgbG9jYXRpb24gPSBnZW9sb2NhdGlvbi5nZXRDdXJyZW50TG9jYXRpb24oe1xuICAgICAgICAgICAgICAgIGRlc2lyZWRBY2N1cmFjeTogMTAsXG4gICAgICAgICAgICAgICAgdXBkYXRlRGlzdGFuY2U6IDEwLFxuICAgICAgICAgICAgICAgIG1pbmltdW1VcGRhdGVUaW1lOiAxMDAwLFxuICAgICAgICAgICAgICAgIG1heGltdW1BZ2U6IDEwMDAwXG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgcmV0dXJuIGxvY2F0aW9uO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBQcm9taXNlLnJlamVjdCgnR2VvbG9jYXRpb24gbm90IGVuYWJsZWQuJyk7XG4gICAgfVxuXG4gICAgLy9NYXAgZXZlbnRzXG4gICAgcHVibGljIG9uTWFwUmVhZHkoZXZlbnQsIG1hcFJlYWR5Tm90aWZ5OiAoKSA9PiB2b2lkKSB7XG4gICAgICAgIGlmICh0aGlzLm1hcFZpZXcgfHwgIWV2ZW50Lm9iamVjdCkgcmV0dXJuO1xuXG4gICAgICAgIHRoaXMubWFwVmlldyA9IGV2ZW50Lm9iamVjdDtcbiAgICAgICAgdGhpcy5tYXBWaWV3LnNldFN0eWxlKHN0eWxlKTtcblxuICAgICAgICAvL05vdGlmaWNvIGN1YW5kbyBlbCBtYXBhIGVzdGEgbGlzdG9cbiAgICAgICAgdGhpcy5tYXBWaWV3Lm5vdGlmeU1hcFJlYWR5ID0gKCkgPT4ge1xuICAgICAgICAgICAgbWFwUmVhZHlOb3RpZnkoKTtcbiAgICAgICAgfVxuICAgICAgICAvLyB0aGlzLm1hcFZpZXcubWFya2VyU2VsZWN0ID0gdGhpcy5vbk1hcmtlclNlbGVjdDtcbiAgICAgICAgLy8gdGhpcy5tYXBWaWV3LmNhbWVyYUNoYW5nZWQgPSB0aGlzLm9uQ2FtZXJhQ2hhbmdlZDtcblxuICAgICAgICB0aGlzLmVuYWJsZUxvY2F0aW9uKClcbiAgICAgICAgICAgIC50aGVuKCgpID0+IHtcbiAgICAgICAgICAgICAgICB2YXIgbG9jYXRpb24gPSB0aGlzLmdldExvY2F0aW9uKCk7XG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgLnRoZW4oKCkgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMud2F0Y2hJZCA9IGdlb2xvY2F0aW9uLndhdGNoTG9jYXRpb24odGhpcy5sb2NhdGlvblJlY2VpdmVkLCB0aGlzLmVycm9yLCB7XG4gICAgICAgICAgICAgICAgICAgIGRlc2lyZWRBY2N1cmFjeTogMTAsXG4gICAgICAgICAgICAgICAgICAgIHVwZGF0ZURpc3RhbmNlOiAxMCxcbiAgICAgICAgICAgICAgICAgICAgbWluaW11bVVwZGF0ZVRpbWU6IDEwMDAwLFxuICAgICAgICAgICAgICAgICAgICBtYXhpbXVtQWdlOiA2MDAwMFxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSwgdGhpcy5lcnJvcik7XG5cbiAgICB9O1xuXG4gICAgcHJpdmF0ZSBtYXBUYXBwZWQgPSAoZXZlbnQpID0+IHtcblxuICAgIH07XG5cbiAgICBwcml2YXRlIGxvY2F0aW9uUmVjZWl2ZWQgPSAocG9zaXRpb246IFBvc2l0aW9uKSA9PiB7XG4gICAgICAgIGNvbnNvbGUubG9nKCdHUFMgVXBkYXRlIFJlY2VpdmVkJyk7XG5cbiAgICAgICAgaWYgKHRoaXMubWFwVmlldyAmJiBwb3NpdGlvbikge1xuICAgICAgICAgICAgdGhpcy5tYXBWaWV3LmxhdGl0dWRlID0gcG9zaXRpb24ubGF0aXR1ZGU7XG4gICAgICAgICAgICB0aGlzLm1hcFZpZXcubG9uZ2l0dWRlID0gcG9zaXRpb24ubG9uZ2l0dWRlO1xuICAgICAgICAgICAgdGhpcy5tYXBWaWV3Lnpvb20gPSAyO1xuICAgICAgICAgICAgdGhpcy5jZW50ZXJlZE9uTG9jYXRpb24gPSB0cnVlO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMucmVtb3ZlTWFya2VyKHRoaXMuZ3BzTWFya2VyKTtcbiAgICAgICAgdGhpcy5ncHNNYXJrZXIgPSB0aGlzLmFkZE1hcmtlcih7XG4gICAgICAgICAgICBsb2NhdGlvbjogcG9zaXRpb24sXG4gICAgICAgICAgICB0aXRsZTogJ0dQUyBMb2NhdGlvbidcbiAgICAgICAgfSk7XG4gICAgfTtcblxuICAgIHByaXZhdGUgYWRkUG9pbnRUb0xpbmUoYXJnczogQWRkTGluZUFyZ3MpIHtcbiAgICAgICAgaWYgKCF0aGlzLm1hcFZpZXcgfHwgIWFyZ3MgfHwgIWFyZ3MubG9jYXRpb24pIHJldHVybjtcblxuICAgICAgICBsZXQgbGluZSA9IGFyZ3MubGluZTtcblxuICAgICAgICBpZiAoIWxpbmUpIHtcbiAgICAgICAgICAgIGxpbmUgPSBuZXcgUG9seWxpbmUoKTtcbiAgICAgICAgICAgIGxpbmUudmlzaWJsZSA9IHRydWU7XG4gICAgICAgICAgICBsaW5lLndpZHRoID0gYXJncy53aWR0aCB8fCAxMDtcbiAgICAgICAgICAgIGxpbmUuY29sb3IgPSBhcmdzLmNvbG9yIHx8IG5ldyBDb2xvcignUmVkJyk7XG4gICAgICAgICAgICBsaW5lLmdlb2Rlc2ljID0gYXJncy5nZW9kZXNpYyAhPSB1bmRlZmluZWQgPyBhcmdzLmdlb2Rlc2ljIDogdHJ1ZTtcbiAgICAgICAgICAgIHRoaXMubWFwVmlldy5hZGRQb2x5bGluZShsaW5lKTtcbiAgICAgICAgfVxuICAgICAgICBsaW5lLmFkZFBvaW50KFBvc2l0aW9uLnBvc2l0aW9uRnJvbUxhdExuZyhhcmdzLmxvY2F0aW9uLmxhdGl0dWRlLCBhcmdzLmxvY2F0aW9uLmxvbmdpdHVkZSkpO1xuXG4gICAgICAgIHJldHVybiBsaW5lO1xuICAgIH1cbiAgICBwcml2YXRlIGFkZE1hcmtlcihhcmdzOiBBZGRNYXJrZXJBcmdzKTogTWFya2VyIHtcbiAgICAgICAgaWYgKCF0aGlzLm1hcFZpZXcgfHwgIWFyZ3MgfHwgIWFyZ3MubG9jYXRpb24pIHJldHVybjtcblxuICAgICAgICBsZXQgbWFya2VyID0gbmV3IE1hcmtlcigpO1xuICAgICAgICBtYXJrZXIucG9zaXRpb24gPSBQb3NpdGlvbi5wb3NpdGlvbkZyb21MYXRMbmcoYXJncy5sb2NhdGlvbi5sYXRpdHVkZSwgYXJncy5sb2NhdGlvbi5sb25naXR1ZGUpO1xuICAgICAgICBtYXJrZXIudGl0bGUgPSBhcmdzLnRpdGxlO1xuICAgICAgICBtYXJrZXIuc25pcHBldCA9IGFyZ3MudGl0bGU7XG4gICAgICAgIHZhciBpbWFnZSA9IG5ldyBJbWFnZSgpO1xuICAgICAgICBpbWFnZS5zcmMgPSBcIn4vaW1hZ2VzL2ZyaWVuZC1tYXJrZXIucG5nXCI7XG4gICAgICAgIGltYWdlLndpZHRoID0gMTA7XG4gICAgICAgIGltYWdlLmhlaWdodCA9IDEwO1xuICAgICAgICBtYXJrZXIuaWNvbiA9IGltYWdlO1xuXG4gICAgICAgICg8YW55Pm1hcmtlcikuaW5mb1dpbmRvd1RlbXBsYXRlID0gJ34vc2hhcmVkL3NlcnZpY2VzL21hcC9pbmZvLXdpbmRvdyc7XG4gICAgICAgIHRoaXMubWFwVmlldy5hZGRNYXJrZXIobWFya2VyKTtcblxuICAgICAgICAvLyAgIHZhciAgbWFya2VycyA9IG5ldyBtYXBzTW9kdWxlLk1hcmtlcigpO1xuICAgICAgICAvLyAgICAgbWFya2Vycy5wb3NpdGlvbiA9IG1hcHNNb2R1bGUuUG9zaXRpb24ucG9zaXRpb25Gcm9tTGF0TG5nKC0zMy42NiwgMTUxLjIwKTtcbiAgICAgICAgLy8gICAgIG1hcmtlcnMudGl0bGUgPSBcIlNlZWVlZWVlZWVlZWVcIjtcbiAgICAgICAgLy8gICAgICg8YW55Pm1hcmtlcnMpLmluZm9XaW5kb3dUZW1wbGF0ZSA9ICd+L3NoYXJlZC9zZXJ2aWNlcy9tYXAvaW5mby13aW5kb3cnO1xuICAgICAgICAvLyAgICAgIHRoaXMubWFwVmlldy5hZGRNYXJrZXIobWFya2Vycyk7XG4gICAgICAgIC8vICAgICBtYXJrZXJzLnNob3dJbmZvV2luZG93KCk7XG5cbiAgICAgICAgcmV0dXJuIG1hcmtlcjtcbiAgICB9O1xuXG4gICAgcHJpdmF0ZSBjbGVhckdwc0xpbmUoKSB7XG4gICAgICAgIHRoaXMucmVtb3ZlTGluZSh0aGlzLmdwc0xpbmUpO1xuICAgICAgICB0aGlzLmdwc0xpbmUgPSBudWxsO1xuXG4gICAgfTtcblxuICAgIHByaXZhdGUgY2xlYXJUYXBMaW5lKCkge1xuICAgICAgICB0aGlzLnJlbW92ZUxpbmUodGhpcy50YXBMaW5lKTtcbiAgICAgICAgdGhpcy50YXBMaW5lID0gbnVsbDtcbiAgICAgICAgdGhpcy5yZW1vdmVNYXJrZXIodGhpcy50YXBNYXJrZXIpO1xuICAgICAgICB0aGlzLnRhcE1hcmtlciA9IG51bGw7XG5cbiAgICB9XG5cbiAgICBwcml2YXRlIHJlbW92ZUxpbmUobGluZTogUG9seWxpbmUpIHtcbiAgICAgICAgaWYgKGxpbmUpIHtcbiAgICAgICAgICAgIGxpbmUucmVtb3ZlQWxsUG9pbnRzKCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwcml2YXRlIHJlbW92ZU1hcmtlcihtYXJrZXI6IE1hcmtlcikge1xuICAgICAgICBpZiAodGhpcy5tYXBWaWV3ICYmIG1hcmtlcikge1xuICAgICAgICAgICAgdGhpcy5tYXBWaWV3LnJlbW92ZU1hcmtlcihtYXJrZXIpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBlcnJvcihlcnIpIHtcbiAgICAgICAgY29uc29sZS5sb2coJ0Vycm9yOiAnICsgSlNPTi5zdHJpbmdpZnkoZXJyKSk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBvbk1hcmtlclNlbGVjdChldmVudCkge1xuICAgICAgICBjb25zb2xlLmxvZygnQ2xpY2tlZCBvbiAnICsgZXZlbnQubWFya2VyLnRpdGxlKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIG9uQ2FtZXJhQ2hhbmdlZChldmVudCkge1xuICAgICAgICBjb25zb2xlLmxvZygnQ2FtZXJhIGNoYW5nZWQ6ICcgKyBKU09OLnN0cmluZ2lmeShldmVudC5jYW1lcmEpKTtcbiAgICB9XG59XG5cblxuZXhwb3J0IGNsYXNzIEFkZExpbmVBcmdzIHtcbiAgICBwdWJsaWMgY29sb3I6IENvbG9yO1xuICAgIHB1YmxpYyBsaW5lOiBQb2x5bGluZTtcbiAgICBwdWJsaWMgbG9jYXRpb246IFBvc2l0aW9uO1xuICAgIHB1YmxpYyBnZW9kZXNpYzogYm9vbGVhbjtcbiAgICBwdWJsaWMgd2lkdGg6IG51bWJlcjtcbn1cblxuZXhwb3J0IGNsYXNzIEFkZE1hcmtlckFyZ3Mge1xuICAgIHB1YmxpYyBsb2NhdGlvbjogUG9zaXRpb247XG4gICAgcHVibGljIHRpdGxlOiBzdHJpbmc7XG59XG5cbmNsYXNzIE1hcmtXcmFwcGVyIHtcbiAgICBtYXJrOiBNYXJrZXI7XG4gICAgbWFya0lkOiBudW1iZXI7XG59Il19