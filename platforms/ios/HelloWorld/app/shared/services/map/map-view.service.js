"use strict";
var core_1 = require("@angular/core");
var Rx_1 = require("rxjs/Rx");
require("rxjs/add/operator/do");
require("rxjs/add/operator/map");
require("rxjs/add/operator/catch");
var nativescript_google_maps_sdk_1 = require("nativescript-google-maps-sdk");
var mapsModule = require("nativescript-google-maps-sdk");
var geolocation = require('nativescript-geolocation');
var style = require('./map-style.json');
var color_1 = require("color");
var friends_service_1 = require("../../../shared/friends/friends.service");
var http_1 = require("@angular/http");
var mark_manager_service_1 = require("./mark-manager.service");
var MapViewService = (function () {
    function MapViewService(friendService, markManagerService, http) {
        var _this = this;
        this.friendService = friendService;
        this.markManagerService = markManagerService;
        this.http = http;
        //#Mapa 
        this.mapView = null;
        this.watchId = null;
        this.centeredOnLocation = false;
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
            if (!_this.markManagerService.hasMe) {
                var markContainer = _this.markManagerService.addMeMark(position.latitude, position.longitude);
                _this.mapView.addMarker(markContainer.mark);
            }
            else {
                _this.locationReceivedMapBehavior();
                _this.markManagerService.moveMe(position.latitude, position.longitude);
            }
        };
        //Test
        this.first = true;
        if (!geolocation.isEnabled()) {
            geolocation.enableLocationRequest();
        }
    }
    MapViewService.prototype.ngOnInit = function () {
    };
    //Public Methods
    MapViewService.prototype.addFriendnMark = function (markInfo, markId) {
        var markContainer = this.markManagerService.addFriendMark(markInfo, markId);
        this.mapView.addMarker(markContainer.mark);
    };
    MapViewService.prototype.updateFriendMark = function (markInfo, markId) {
        this.markManagerService.updateMark(markInfo, markId);
    };
    MapViewService.prototype.removeCommonMark = function (markInfo, markId) {
        this.markManagerService.removeMark(markId);
    };
    //Private Methods
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
            var location = geolocation.getCurrentLocation(this.getLocationObjectParameter());
            return location;
        }
        return Promise.reject('Geolocation not enabled.');
    };
    MapViewService.prototype.getLocationObjectParameter = function () {
        return {
            desiredAccuracy: 10,
            updateDistance: 10,
            minimumUpdateTime: 1000
        };
    };
    //Map events
    //Map Events - Public Methods
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
            _this.watchId = geolocation.watchLocation(function (p) { _this.locationReceived(p); }, _this.error, _this.getLocationObjectParameter());
        }, this.error);
    };
    ;
    //TODO: Asignarle Tipo a Events
    MapViewService.prototype.mapTapped = function (event) {
        console.log('Map Tapped');
    };
    ;
    //Map Events - Private Methods
    MapViewService.prototype.addMarkToMap = function (mark) {
        if (!this.mapView || !mark || !mark.position)
            return;
        this.mapView.addMarker(mark);
    };
    ;
    MapViewService.prototype.locationReceivedMapBehavior = function () {
        //TODO: Este metodo debe de ser customizado para que el comportamiento dependa de si fue o no tocado el mapa
        this.mapView.latitude = this.markManagerService.me.position.latitude;
        this.mapView.longitude = this.markManagerService.me.position.longitude;
    };
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
    MapViewService.prototype.error = function (err) {
        console.log('Error: ' + JSON.stringify(err));
    };
    MapViewService.prototype.onMarkerSelect = function (event) {
        console.log('Clicked on ' + event.marker.title);
    };
    MapViewService.prototype.onCameraChanged = function (event) {
        console.log('Camera changed: ' + JSON.stringify(event.camera));
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
    return MapViewService;
}());
MapViewService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [friends_service_1.FriendsService,
        mark_manager_service_1.MarkManagerService,
        http_1.Http])
], MapViewService);
exports.MapViewService = MapViewService;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFwLXZpZXcuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIm1hcC12aWV3LnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLHNDQUEyQztBQUMzQyw4QkFBcUM7QUFDckMsZ0NBQThCO0FBQzlCLGlDQUErQjtBQUMvQixtQ0FBaUM7QUFFakMsNkVBQW1GO0FBQ25GLElBQUksVUFBVSxHQUFHLE9BQU8sQ0FBQyw4QkFBOEIsQ0FBQyxDQUFDO0FBQ3pELElBQUksV0FBVyxHQUFHLE9BQU8sQ0FBQywwQkFBMEIsQ0FBQyxDQUFDO0FBQ3RELElBQUksS0FBSyxHQUFHLE9BQU8sQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDO0FBQ3hDLCtCQUE4QjtBQUM5QiwyRUFBeUU7QUFDekUsc0NBQStDO0FBSS9DLCtEQUE0RDtBQUU1RCxJQUFhLGNBQWM7SUFXdkIsd0JBQW9CLGFBQTZCLEVBQ3JDLGtCQUFzQyxFQUN0QyxJQUFVO1FBRnRCLGlCQU9DO1FBUG1CLGtCQUFhLEdBQWIsYUFBYSxDQUFnQjtRQUNyQyx1QkFBa0IsR0FBbEIsa0JBQWtCLENBQW9CO1FBQ3RDLFNBQUksR0FBSixJQUFJLENBQU07UUFadEIsUUFBUTtRQUNBLFlBQU8sR0FBWSxJQUFJLENBQUM7UUFDaEMsWUFBTyxHQUFXLElBQUksQ0FBQztRQU12Qix1QkFBa0IsR0FBWSxLQUFLLENBQUM7UUFzRnBDLDRCQUE0QjtRQUNwQiwwQkFBcUIsR0FBRyxLQUFLLENBQUM7UUFDOUIscUJBQWdCLEdBQUcsVUFBQyxRQUFrQjtZQUMxQyxFQUFFLENBQUMsQ0FBQyxLQUFJLENBQUMsT0FBTyxJQUFJLFFBQVEsSUFBSSxDQUFDLEtBQUksQ0FBQyxxQkFBcUIsQ0FBQyxDQUFDLENBQUM7Z0JBQzFELEtBQUksQ0FBQyxPQUFPLENBQUMsUUFBUSxHQUFHLFFBQVEsQ0FBQyxRQUFRLENBQUM7Z0JBQzFDLEtBQUksQ0FBQyxPQUFPLENBQUMsU0FBUyxHQUFHLFFBQVEsQ0FBQyxT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dGFibGUgfSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSB9IGZyb20gXCJyeGpzL1J4XCI7XG5pbXBvcnQgXCJyeGpzL2FkZC9vcGVyYXRvci9kb1wiO1xuaW1wb3J0IFwicnhqcy9hZGQvb3BlcmF0b3IvbWFwXCI7XG5pbXBvcnQgJ3J4anMvYWRkL29wZXJhdG9yL2NhdGNoJztcbmltcG9ydCB7IEltYWdlIH0gZnJvbSBcInVpL2ltYWdlXCI7XG5pbXBvcnQgeyBNYXBWaWV3LCBNYXJrZXIsIFBvbHlsaW5lLCBQb3NpdGlvbiB9IGZyb20gJ25hdGl2ZXNjcmlwdC1nb29nbGUtbWFwcy1zZGsnO1xudmFyIG1hcHNNb2R1bGUgPSByZXF1aXJlKFwibmF0aXZlc2NyaXB0LWdvb2dsZS1tYXBzLXNka1wiKTtcbmxldCBnZW9sb2NhdGlvbiA9IHJlcXVpcmUoJ25hdGl2ZXNjcmlwdC1nZW9sb2NhdGlvbicpO1xudmFyIHN0eWxlID0gcmVxdWlyZSgnLi9tYXAtc3R5bGUuanNvbicpO1xuaW1wb3J0IHsgQ29sb3IgfSBmcm9tICdjb2xvcic7XG5pbXBvcnQgeyBGcmllbmRzU2VydmljZSB9IGZyb20gJy4uLy4uLy4uL3NoYXJlZC9mcmllbmRzL2ZyaWVuZHMuc2VydmljZSc7XG5pbXBvcnQgeyBIdHRwLCBSZXNwb25zZSB9IGZyb20gJ0Bhbmd1bGFyL2h0dHAnO1xuaW1wb3J0IHsgcm91dGVzIH0gZnJvbSAnLi4vLi4vLi4vYXBwLnJvdXRpbmcnO1xuaW1wb3J0IHsgTGlzdCB9IGZyb20gJ2xpbnF0cyc7XG5pbXBvcnQgeyBNYXJrV3JhcHBlciwgTWFya1dyYXBwZXJUeXBlRW51bSwgQWRkTWFya2VyQXJncywgQWRkTGluZUFyZ3MsIE1hcmtDb250YWluZXIgfSBmcm9tICcuL2NvcmUvTWFya0NvbnRhaW5lcic7XG5pbXBvcnQgeyBNYXJrTWFuYWdlclNlcnZpY2UgfSBmcm9tICcuL21hcmstbWFuYWdlci5zZXJ2aWNlJztcbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBNYXBWaWV3U2VydmljZSB7XG4gICAgLy8jTWFwYSBcbiAgICBwcml2YXRlIG1hcFZpZXc6IE1hcFZpZXcgPSBudWxsO1xuICAgIHdhdGNoSWQ6IG51bWJlciA9IG51bGw7XG4gICAgZ3BzTGluZTogUG9seWxpbmU7XG4gICAgdGVzdExpbmU6IFBvbHlsaW5lO1xuICAgIHRhcExpbmU6IFBvbHlsaW5lO1xuICAgIHRhcE1hcmtlcjogYW55O1xuICAgIGdwc01hcmtlcjogTWFya0NvbnRhaW5lcjtcbiAgICBjZW50ZXJlZE9uTG9jYXRpb246IGJvb2xlYW4gPSBmYWxzZTtcblxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgZnJpZW5kU2VydmljZTogRnJpZW5kc1NlcnZpY2UsXG4gICAgICAgIHByaXZhdGUgbWFya01hbmFnZXJTZXJ2aWNlOiBNYXJrTWFuYWdlclNlcnZpY2UsXG4gICAgICAgIHByaXZhdGUgaHR0cDogSHR0cCkge1xuICAgICAgICBpZiAoIWdlb2xvY2F0aW9uLmlzRW5hYmxlZCgpKSB7XG4gICAgICAgICAgICBnZW9sb2NhdGlvbi5lbmFibGVMb2NhdGlvblJlcXVlc3QoKTtcbiAgICAgICAgfVxuXG4gICAgfVxuXG4gICAgbmdPbkluaXQoKSB7XG5cbiAgICB9XG5cblxuXG4gICAgLy9QdWJsaWMgTWV0aG9kc1xuICAgIHB1YmxpYyBhZGRGcmllbmRuTWFyayhtYXJrSW5mbzogQWRkTWFya2VyQXJncywgbWFya0lkOiBudW1iZXIpOiB2b2lkIHtcbiAgICAgICAgdmFyIG1hcmtDb250YWluZXIgPSB0aGlzLm1hcmtNYW5hZ2VyU2VydmljZS5hZGRGcmllbmRNYXJrKG1hcmtJbmZvLCBtYXJrSWQpO1xuICAgICAgICB0aGlzLm1hcFZpZXcuYWRkTWFya2VyKG1hcmtDb250YWluZXIubWFyayk7XG4gICAgfVxuICAgIHB1YmxpYyB1cGRhdGVGcmllbmRNYXJrKG1hcmtJbmZvOiBBZGRNYXJrZXJBcmdzLCBtYXJrSWQ6IG51bWJlcik6IHZvaWQge1xuICAgICAgICB0aGlzLm1hcmtNYW5hZ2VyU2VydmljZS51cGRhdGVNYXJrKG1hcmtJbmZvLCBtYXJrSWQpO1xuICAgIH1cbiAgICBwdWJsaWMgcmVtb3ZlQ29tbW9uTWFyayhtYXJrSW5mbzogQWRkTWFya2VyQXJncywgbWFya0lkOiBudW1iZXIpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5tYXJrTWFuYWdlclNlcnZpY2UucmVtb3ZlTWFyayhtYXJrSWQpO1xuICAgIH1cbiAgICAvL1ByaXZhdGUgTWV0aG9kc1xuICAgIHByaXZhdGUgZW5hYmxlTG9jYXRpb24oKSB7XG4gICAgICAgIGlmICghZ2VvbG9jYXRpb24uaXNFbmFibGVkKCkpIHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCdMb2NhdGlvbiBub3QgZW5hYmxlZCwgcmVxdWVzdGluZy4nKTtcbiAgICAgICAgICAgIHJldHVybiBnZW9sb2NhdGlvbi5lbmFibGVMb2NhdGlvblJlcXVlc3QoKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUodHJ1ZSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwcml2YXRlIGdldExvY2F0aW9uKCkge1xuICAgICAgICBpZiAoZ2VvbG9jYXRpb24uaXNFbmFibGVkKCkpIHtcbiAgICAgICAgICAgIHZhciBsb2NhdGlvbiA9IGdlb2xvY2F0aW9uLmdldEN1cnJlbnRMb2NhdGlvbih0aGlzLmdldExvY2F0aW9uT2JqZWN0UGFyYW1ldGVyKCkpO1xuICAgICAgICAgICAgcmV0dXJuIGxvY2F0aW9uO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBQcm9taXNlLnJlamVjdCgnR2VvbG9jYXRpb24gbm90IGVuYWJsZWQuJyk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBnZXRMb2NhdGlvbk9iamVjdFBhcmFtZXRlcigpIHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIGRlc2lyZWRBY2N1cmFjeTogMTAsXG4gICAgICAgICAgICB1cGRhdGVEaXN0YW5jZTogMTAsXG4gICAgICAgICAgICBtaW5pbXVtVXBkYXRlVGltZTogMTAwMFxuICAgICAgICB9O1xuICAgIH1cbiAgICAvL01hcCBldmVudHNcbiAgICAvL01hcCBFdmVudHMgLSBQdWJsaWMgTWV0aG9kc1xuICAgIHB1YmxpYyBvbk1hcFJlYWR5KGV2ZW50LCBtYXBSZWFkeU5vdGlmeTogKCkgPT4gdm9pZCkge1xuICAgICAgICBpZiAodGhpcy5tYXBWaWV3IHx8ICFldmVudC5vYmplY3QpIHJldHVybjtcbiAgICAgICAgdGhpcy5tYXBWaWV3ID0gZXZlbnQub2JqZWN0O1xuICAgICAgICB0aGlzLm1hcFZpZXcuc2V0U3R5bGUoc3R5bGUpO1xuICAgICAgICAvL05vdGlmaWNvIGN1YW5kbyBlbCBtYXBhIGVzdGEgbGlzdG9cbiAgICAgICAgdGhpcy5tYXBWaWV3Lm5vdGlmeU1hcFJlYWR5ID0gKCkgPT4ge1xuICAgICAgICAgICAgbWFwUmVhZHlOb3RpZnkoKTtcbiAgICAgICAgfVxuICAgICAgICAvLyB0aGlzLm1hcFZpZXcubWFya2VyU2VsZWN0ID0gdGhpcy5vbk1hcmtlclNlbGVjdDtcbiAgICAgICAgLy8gdGhpcy5tYXBWaWV3LmNhbWVyYUNoYW5nZWQgPSB0aGlzLm9uQ2FtZXJhQ2hhbmdlZDtcblxuICAgICAgICB0aGlzLmVuYWJsZUxvY2F0aW9uKClcbiAgICAgICAgICAgIC50aGVuKCgpID0+IHtcbiAgICAgICAgICAgICAgICB2YXIgbG9jYXRpb24gPSB0aGlzLmdldExvY2F0aW9uKCk7XG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgLnRoZW4oKCkgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMud2F0Y2hJZCA9IGdlb2xvY2F0aW9uLndhdGNoTG9jYXRpb24oKHApID0+IHsgdGhpcy5sb2NhdGlvblJlY2VpdmVkKHApIH0sIHRoaXMuZXJyb3IsXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZ2V0TG9jYXRpb25PYmplY3RQYXJhbWV0ZXIoKSk7XG4gICAgICAgICAgICB9LCB0aGlzLmVycm9yKTtcbiAgICB9O1xuXG4gICAgLy9UT0RPOiBBc2lnbmFybGUgVGlwbyBhIEV2ZW50c1xuICAgIHB1YmxpYyBtYXBUYXBwZWQoZXZlbnQpIHtcblxuICAgICAgICBjb25zb2xlLmxvZygnTWFwIFRhcHBlZCcpO1xuICAgIH07XG4gICAgLy9NYXAgRXZlbnRzIC0gUHJpdmF0ZSBNZXRob2RzXG4gICAgcHJpdmF0ZSBhZGRNYXJrVG9NYXAobWFyazogTWFya2VyKSB7XG4gICAgICAgIGlmICghdGhpcy5tYXBWaWV3IHx8ICFtYXJrIHx8ICFtYXJrLnBvc2l0aW9uKSByZXR1cm47XG4gICAgICAgIHRoaXMubWFwVmlldy5hZGRNYXJrZXIobWFyayk7XG4gICAgfTtcbiAgICAvL0ZsYWcgcHJpbWVyYSBjb25maWd1cmFjaW9uXG4gICAgcHJpdmF0ZSBmaXJzdENvbmZpZ3VyYXRpb25NYXAgPSBmYWxzZTtcbiAgICBwcml2YXRlIGxvY2F0aW9uUmVjZWl2ZWQgPSAocG9zaXRpb246IFBvc2l0aW9uKSA9PiB7XG4gICAgICAgIGlmICh0aGlzLm1hcFZpZXcgJiYgcG9zaXRpb24gJiYgIXRoaXMuZmlyc3RDb25maWd1cmF0aW9uTWFwKSB7XG4gICAgICAgICAgICB0aGlzLm1hcFZpZXcubGF0aXR1ZGUgPSBwb3NpdGlvbi5sYXRpdHVkZTtcbiAgICAgICAgICAgIHRoaXMubWFwVmlldy5sb25naXR1ZGUgPSBwb3NpdGlvbi5sb25naXR1ZGU7XG4gICAgICAgICAgICB0aGlzLm1hcFZpZXcuem9vbSA9IDI7XG4gICAgICAgICAgICB0aGlzLmNlbnRlcmVkT25Mb2NhdGlvbiA9IHRydWU7XG4gICAgICAgICAgICB0aGlzLmZpcnN0Q29uZmlndXJhdGlvbk1hcCA9IHRydWU7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKCF0aGlzLm1hcmtNYW5hZ2VyU2VydmljZS5oYXNNZSkge1xuICAgICAgICAgICAgdmFyIG1hcmtDb250YWluZXIgPSB0aGlzLm1hcmtNYW5hZ2VyU2VydmljZS5hZGRNZU1hcmsocG9zaXRpb24ubGF0aXR1ZGUsIHBvc2l0aW9uLmxvbmdpdHVkZSk7XG4gICAgICAgICAgICB0aGlzLm1hcFZpZXcuYWRkTWFya2VyKG1hcmtDb250YWluZXIubWFyaylcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMubG9jYXRpb25SZWNlaXZlZE1hcEJlaGF2aW9yKCk7XG4gICAgICAgICAgICB0aGlzLm1hcmtNYW5hZ2VyU2VydmljZS5tb3ZlTWUocG9zaXRpb24ubGF0aXR1ZGUsIHBvc2l0aW9uLmxvbmdpdHVkZSk7XG4gICAgICAgIH1cbiAgICB9O1xuICAgIHByaXZhdGUgbG9jYXRpb25SZWNlaXZlZE1hcEJlaGF2aW9yKCk6IHZvaWQge1xuICAgICAgICAvL1RPRE86IEVzdGUgbWV0b2RvIGRlYmUgZGUgc2VyIGN1c3RvbWl6YWRvIHBhcmEgcXVlIGVsIGNvbXBvcnRhbWllbnRvIGRlcGVuZGEgZGUgc2kgZnVlIG8gbm8gdG9jYWRvIGVsIG1hcGFcbiAgICAgICAgdGhpcy5tYXBWaWV3LmxhdGl0dWRlID0gdGhpcy5tYXJrTWFuYWdlclNlcnZpY2UubWUucG9zaXRpb24ubGF0aXR1ZGU7XG4gICAgICAgIHRoaXMubWFwVmlldy5sb25naXR1ZGUgPSB0aGlzLm1hcmtNYW5hZ2VyU2VydmljZS5tZS5wb3NpdGlvbi5sb25naXR1ZGU7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBhZGRQb2ludFRvTGluZShhcmdzOiBBZGRMaW5lQXJncykge1xuICAgICAgICBpZiAoIXRoaXMubWFwVmlldyB8fCAhYXJncyB8fCAhYXJncy5sb2NhdGlvbikgcmV0dXJuO1xuICAgICAgICBsZXQgbGluZSA9IGFyZ3MubGluZTtcbiAgICAgICAgaWYgKCFsaW5lKSB7XG4gICAgICAgICAgICBsaW5lID0gbmV3IFBvbHlsaW5lKCk7XG4gICAgICAgICAgICBsaW5lLnZpc2libGUgPSB0cnVlO1xuICAgICAgICAgICAgbGluZS53aWR0aCA9IGFyZ3Mud2lkdGggfHwgMTA7XG4gICAgICAgICAgICBsaW5lLmNvbG9yID0gYXJncy5jb2xvciB8fCBuZXcgQ29sb3IoJ1JlZCcpO1xuICAgICAgICAgICAgbGluZS5nZW9kZXNpYyA9IGFyZ3MuZ2VvZGVzaWMgIT0gdW5kZWZpbmVkID8gYXJncy5nZW9kZXNpYyA6IHRydWU7XG4gICAgICAgICAgICB0aGlzLm1hcFZpZXcuYWRkUG9seWxpbmUobGluZSk7XG4gICAgICAgIH1cbiAgICAgICAgbGluZS5hZGRQb2ludChQb3NpdGlvbi5wb3NpdGlvbkZyb21MYXRMbmcoYXJncy5sb2NhdGlvbi5sYXRpdHVkZSwgYXJncy5sb2NhdGlvbi5sb25naXR1ZGUpKTtcbiAgICAgICAgcmV0dXJuIGxpbmU7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBlcnJvcihlcnIpIHtcbiAgICAgICAgY29uc29sZS5sb2coJ0Vycm9yOiAnICsgSlNPTi5zdHJpbmdpZnkoZXJyKSk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBvbk1hcmtlclNlbGVjdChldmVudCkge1xuICAgICAgICBjb25zb2xlLmxvZygnQ2xpY2tlZCBvbiAnICsgZXZlbnQubWFya2VyLnRpdGxlKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIG9uQ2FtZXJhQ2hhbmdlZChldmVudCkge1xuICAgICAgICBjb25zb2xlLmxvZygnQ2FtZXJhIGNoYW5nZWQ6ICcgKyBKU09OLnN0cmluZ2lmeShldmVudC5jYW1lcmEpKTtcbiAgICB9XG5cblxuXG5cblxuICAgIC8vVGVzdFxuICAgIHByaXZhdGUgZmlyc3QgPSB0cnVlO1xuICAgIGdldEhlcm9lcygpOiBPYnNlcnZhYmxlPFJlc3BvbnNlPiB7XG4gICAgICAgIHJldHVybiB0aGlzLmh0dHAuZ2V0KFwiaHR0cHM6Ly9tYXBzLmdvb2dsZWFwaXMuY29tL21hcHMvYXBpL2RpcmVjdGlvbnMvanNvbj9vcmlnaW49VG9yb250byZkZXN0aW5hdGlvbj1Nb250cmVhbCZhdm9pZD1oaWdod2F5cyZtb2RlPWRyaXZpbmcma2V5PUFJemFTeUMxWnpqQUQ5MU40Y2Y2Q0tvbjJhaU5BRm9qdTlWNlIzSVwiKVxuICAgICAgICAgICAgLmNhdGNoKHRoaXMuaGFuZGxlRXJyb3IpO1xuICAgIH1cbiAgICBwcml2YXRlIGhhbmRsZUVycm9yKGVycm9yOiBSZXNwb25zZSB8IGFueSk6IGFueSB7XG4gICAgICAgIC8vIEluIGEgcmVhbCB3b3JsZCBhcHAsIHdlIG1pZ2h0IHVzZSBhIHJlbW90ZSBsb2dnaW5nIGluZnJhc3RydWN0dXJlXG4gICAgICAgIGxldCBlcnJNc2c6IHN0cmluZztcbiAgICAgICAgaWYgKGVycm9yIGluc3RhbmNlb2YgUmVzcG9uc2UpIHtcbiAgICAgICAgICAgIGNvbnN0IGJvZHkgPSBlcnJvci5qc29uKCkgfHwgJyc7XG4gICAgICAgICAgICBjb25zdCBlcnIgPSAoPGFueT5ib2R5KS5lcnJvciB8fCBKU09OLnN0cmluZ2lmeShib2R5KTtcbiAgICAgICAgICAgIGVyck1zZyA9IGAke2Vycm9yLnN0YXR1c30gLSAke2Vycm9yLnN0YXR1c1RleHQgfHwgJyd9ICR7ZXJyfWA7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBlcnJNc2cgPSBlcnJvci5tZXNzYWdlID8gZXJyb3IubWVzc2FnZSA6IGVycm9yLnRvU3RyaW5nKCk7XG4gICAgICAgIH1cbiAgICAgICAgY29uc29sZS5lcnJvcihlcnJNc2cpO1xuICAgICAgICByZXR1cm4gT2JzZXJ2YWJsZS50aHJvdyhlcnJNc2cpO1xuICAgIH1cbiAgICBwcml2YXRlIGV4dHJhY3REYXRhKHJlczogUmVzcG9uc2UpOiBhbnkge1xuICAgICAgICBsZXQgYm9keSA9IHJlcy5qc29uKCk7XG4gICAgICAgIHJldHVybiAoPGFueT5ib2R5KS5kYXRhIHx8IHt9O1xuICAgIH1cblxuICAgIC8vZGlidWphIHVuIGNhbWlubywgY29uIGxhcyBwb3NpdGlvbnMgcXVlIHJlY2liZSBjb21vIHBhcmFtZXRyb1xuICAgIHByaXZhdGUgZHJhd1dheShwb3NpdGlvbnM6IEFycmF5PFBvc2l0aW9uPik6IHZvaWQge1xuICAgICAgICB2YXIgcG9saTogUG9seWxpbmU7XG4gICAgICAgIGZvciAodmFyIGl0ZW0gb2YgcG9zaXRpb25zKSB7XG5cbiAgICAgICAgICAgIHBvbGkgPSB0aGlzLmFkZFBvaW50VG9MaW5lKHtcbiAgICAgICAgICAgICAgICBjb2xvcjogbmV3IENvbG9yKCdQaW5rJyksXG4gICAgICAgICAgICAgICAgbGluZTogcG9saSxcbiAgICAgICAgICAgICAgICBsb2NhdGlvbjogaXRlbSxcbiAgICAgICAgICAgICAgICBnZW9kZXNpYzogdHJ1ZSxcbiAgICAgICAgICAgICAgICB3aWR0aDogMTBcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgIH1cbiAgICB9XG5cbn1cblxuIl19