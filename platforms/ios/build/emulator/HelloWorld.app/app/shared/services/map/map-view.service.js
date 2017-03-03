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
            if (_this.markManagerService.me == null) {
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
        this.markManagerService.addFriendMark(markInfo, markId);
    };
    MapViewService.prototype.updateCommonMark = function (markInfo, markId) {
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
            _this.watchId = geolocation.watchLocation(function (p) { _this.locationReceived(p); }, _this.error, {
                desiredAccuracy: 50,
                updateDistance: 50,
                minimumUpdateTime: 10000,
                maximumAge: 60000
            });
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFwLXZpZXcuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIm1hcC12aWV3LnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLHNDQUEyQztBQUMzQyw4QkFBcUM7QUFDckMsZ0NBQThCO0FBQzlCLGlDQUErQjtBQUMvQixtQ0FBaUM7QUFFakMsNkVBQW1GO0FBQ25GLElBQUksVUFBVSxHQUFHLE9BQU8sQ0FBQyw4QkFBOEIsQ0FBQyxDQUFDO0FBQ3pELElBQUksV0FBVyxHQUFHLE9BQU8sQ0FBQywwQkFBMEIsQ0FBQyxDQUFDO0FBQ3RELElBQUksS0FBSyxHQUFHLE9BQU8sQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDO0FBQ3hDLCtCQUE4QjtBQUM5QiwyRUFBeUU7QUFDekUsc0NBQStDO0FBSS9DLCtEQUE0RDtBQUU1RCxJQUFhLGNBQWM7SUFXdkIsd0JBQW9CLGFBQTZCLEVBQ3JDLGtCQUFzQyxFQUN0QyxJQUFVO1FBRnRCLGlCQU9DO1FBUG1CLGtCQUFhLEdBQWIsYUFBYSxDQUFnQjtRQUNyQyx1QkFBa0IsR0FBbEIsa0JBQWtCLENBQW9CO1FBQ3RDLFNBQUksR0FBSixJQUFJLENBQU07UUFadEIsUUFBUTtRQUNBLFlBQU8sR0FBWSxJQUFJLENBQUM7UUFDaEMsWUFBTyxHQUFXLElBQUksQ0FBQztRQU12Qix1QkFBa0IsR0FBWSxLQUFLLENBQUM7UUF1RnBDLDRCQUE0QjtRQUNwQiwwQkFBcUIsR0FBRyxLQUFLLENBQUM7UUFDOUIscUJBQWdCLEdBQUcsVUFBQyxRQUFrQjtZQUMxQyxFQUFFLENBQUMsQ0FBQyxLQUFJLENBQUMsT0FBTyxJQUFJLFFBQVEsSUFBSSxDQUFDLEtBQUksQ0FBQyxxQkFBcUIsQ0FBQyxDQUFDLENBQUM7Z0JBQzFELEtBQUksQ0FBQyxPQUFPLENBQUMsUUFBUSxHQUFHLFFBQVEsQ0FBQyxRQUFRLENBQUM7Z0JBQzFDLEtBQUksQ0FBQyxPQUFPLENBQUMsU0FBUyxHQUFHLFFBQVEsQ0FBQyxT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LENBQUM7UUFDbEUsQ0FBQztRQUFDLElBQUksQ0FBQyxDQUFDO1lBQ0osTUFBTSxHQUFHLEtBQUssQ0FBQyxPQUFPLEdBQUcsS0FBSyxDQUFDLE9BQU8sR0FBRyxLQUFLLENBQUMsUUFBUSxFQUFFLENBQUM7UUFDOUQsQ0FBQztRQUNELE9BQU8sQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDdEIsTUFBTSxDQUFDLGVBQVUsQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLENBQUM7SUFDcEMsQ0FBQztJQUNPLG9DQUFXLEdBQW5CLFVBQW9CLEdBQWE7UUFDN0IsSUFBSSxJQUFJLEdBQUcsR0FBRyxDQUFDLElBQUksRUFBRSxDQUFDO1FBQ3RCLE1BQU0sQ0FBTyxJQUFLLENBQUMsSUFBSSxJQUFJLEVBQUUsQ0FBQztJQUNsQyxDQUFDO0lBRUQsK0RBQStEO0lBQ3ZELGdDQUFPLEdBQWYsVUFBZ0IsU0FBMEI7UUFDdEMsSUFBSSxJQUFjLENBQUM7UUFDbkIsR0FBRyxDQUFDLENBQWEsVUFBUyxFQUFULHVCQUFTLEVBQVQsdUJBQVMsRUFBVCxJQUFTO1lBQXJCLElBQUksSUFBSSxrQkFBQTtZQUVULElBQUksR0FBRyxJQUFJLENBQUMsY0FBYyxDQUFDO2dCQUN2QixLQUFLLEVBQUUsSUFBSSxhQUFLLENBQUMsTUFBTSxDQUFDO2dCQUN4QixJQUFJLEVBQUUsSUFBSTtnQkFDVixRQUFRLEVBQUUsSUFBSTtnQkFDZCxRQUFRLEVBQUUsSUFBSTtnQkFDZCxLQUFLLEVBQUUsRUFBRTthQUNaLENBQUMsQ0FBQztTQUVOO0lBQ0wsQ0FBQztJQUVMLHFCQUFDO0FBQUQsQ0FBQyxBQS9MRCxJQStMQztBQS9MWSxjQUFjO0lBRDFCLGlCQUFVLEVBQUU7cUNBWTBCLGdDQUFjO1FBQ2pCLHlDQUFrQjtRQUNoQyxXQUFJO0dBYmIsY0FBYyxDQStMMUI7QUEvTFksd0NBQWMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcbmltcG9ydCB7IE9ic2VydmFibGUgfSBmcm9tIFwicnhqcy9SeFwiO1xuaW1wb3J0IFwicnhqcy9hZGQvb3BlcmF0b3IvZG9cIjtcbmltcG9ydCBcInJ4anMvYWRkL29wZXJhdG9yL21hcFwiO1xuaW1wb3J0ICdyeGpzL2FkZC9vcGVyYXRvci9jYXRjaCc7XG5pbXBvcnQgeyBJbWFnZSB9IGZyb20gXCJ1aS9pbWFnZVwiO1xuaW1wb3J0IHsgTWFwVmlldywgTWFya2VyLCBQb2x5bGluZSwgUG9zaXRpb24gfSBmcm9tICduYXRpdmVzY3JpcHQtZ29vZ2xlLW1hcHMtc2RrJztcbnZhciBtYXBzTW9kdWxlID0gcmVxdWlyZShcIm5hdGl2ZXNjcmlwdC1nb29nbGUtbWFwcy1zZGtcIik7XG5sZXQgZ2VvbG9jYXRpb24gPSByZXF1aXJlKCduYXRpdmVzY3JpcHQtZ2VvbG9jYXRpb24nKTtcbnZhciBzdHlsZSA9IHJlcXVpcmUoJy4vbWFwLXN0eWxlLmpzb24nKTtcbmltcG9ydCB7IENvbG9yIH0gZnJvbSAnY29sb3InO1xuaW1wb3J0IHsgRnJpZW5kc1NlcnZpY2UgfSBmcm9tICcuLi8uLi8uLi9zaGFyZWQvZnJpZW5kcy9mcmllbmRzLnNlcnZpY2UnO1xuaW1wb3J0IHsgSHR0cCwgUmVzcG9uc2UgfSBmcm9tICdAYW5ndWxhci9odHRwJztcbmltcG9ydCB7IHJvdXRlcyB9IGZyb20gJy4uLy4uLy4uL2FwcC5yb3V0aW5nJztcbmltcG9ydCB7IExpc3QgfSBmcm9tICdsaW5xdHMnO1xuaW1wb3J0IHsgTWFya1dyYXBwZXIsIE1hcmtXcmFwcGVyVHlwZUVudW0sIEFkZE1hcmtlckFyZ3MsIEFkZExpbmVBcmdzLCBNYXJrQ29udGFpbmVyIH0gZnJvbSAnLi9jb3JlL01hcmtDb250YWluZXInO1xuaW1wb3J0IHsgTWFya01hbmFnZXJTZXJ2aWNlIH0gZnJvbSAnLi9tYXJrLW1hbmFnZXIuc2VydmljZSc7XG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgTWFwVmlld1NlcnZpY2Uge1xuICAgIC8vI01hcGEgXG4gICAgcHJpdmF0ZSBtYXBWaWV3OiBNYXBWaWV3ID0gbnVsbDtcbiAgICB3YXRjaElkOiBudW1iZXIgPSBudWxsO1xuICAgIGdwc0xpbmU6IFBvbHlsaW5lO1xuICAgIHRlc3RMaW5lOiBQb2x5bGluZTtcbiAgICB0YXBMaW5lOiBQb2x5bGluZTtcbiAgICB0YXBNYXJrZXI6IGFueTtcbiAgICBncHNNYXJrZXI6IE1hcmtDb250YWluZXI7XG4gICAgY2VudGVyZWRPbkxvY2F0aW9uOiBib29sZWFuID0gZmFsc2U7XG5cbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIGZyaWVuZFNlcnZpY2U6IEZyaWVuZHNTZXJ2aWNlLFxuICAgICAgICBwcml2YXRlIG1hcmtNYW5hZ2VyU2VydmljZTogTWFya01hbmFnZXJTZXJ2aWNlLFxuICAgICAgICBwcml2YXRlIGh0dHA6IEh0dHApIHtcbiAgICAgICAgaWYgKCFnZW9sb2NhdGlvbi5pc0VuYWJsZWQoKSkge1xuICAgICAgICAgICAgZ2VvbG9jYXRpb24uZW5hYmxlTG9jYXRpb25SZXF1ZXN0KCk7XG4gICAgICAgIH1cblxuICAgIH1cblxuICAgIG5nT25Jbml0KCkge1xuXG4gICAgfVxuXG5cblxuICAgIC8vUHVibGljIE1ldGhvZHNcbiAgICBwdWJsaWMgYWRkRnJpZW5kbk1hcmsobWFya0luZm86IEFkZE1hcmtlckFyZ3MsIG1hcmtJZDogbnVtYmVyKTogdm9pZCB7XG4gICAgICAgIHRoaXMubWFya01hbmFnZXJTZXJ2aWNlLmFkZEZyaWVuZE1hcmsobWFya0luZm8sIG1hcmtJZCk7XG4gICAgfVxuICAgIHB1YmxpYyB1cGRhdGVDb21tb25NYXJrKG1hcmtJbmZvOiBBZGRNYXJrZXJBcmdzLCBtYXJrSWQ6IG51bWJlcik6IHZvaWQge1xuICAgICAgICB0aGlzLm1hcmtNYW5hZ2VyU2VydmljZS51cGRhdGVNYXJrKG1hcmtJbmZvLCBtYXJrSWQpO1xuICAgIH1cbiAgICBwdWJsaWMgcmVtb3ZlQ29tbW9uTWFyayhtYXJrSW5mbzogQWRkTWFya2VyQXJncywgbWFya0lkOiBudW1iZXIpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5tYXJrTWFuYWdlclNlcnZpY2UucmVtb3ZlTWFyayhtYXJrSWQpO1xuICAgIH1cbiAgICAvL1ByaXZhdGUgTWV0aG9kc1xuICAgIHByaXZhdGUgZW5hYmxlTG9jYXRpb24oKSB7XG4gICAgICAgIGlmICghZ2VvbG9jYXRpb24uaXNFbmFibGVkKCkpIHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCdMb2NhdGlvbiBub3QgZW5hYmxlZCwgcmVxdWVzdGluZy4nKTtcbiAgICAgICAgICAgIHJldHVybiBnZW9sb2NhdGlvbi5lbmFibGVMb2NhdGlvblJlcXVlc3QoKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUodHJ1ZSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwcml2YXRlIGdldExvY2F0aW9uKCkge1xuICAgICAgICBpZiAoZ2VvbG9jYXRpb24uaXNFbmFibGVkKCkpIHtcbiAgICAgICAgICAgIHZhciBsb2NhdGlvbiA9IGdlb2xvY2F0aW9uLmdldEN1cnJlbnRMb2NhdGlvbih7XG4gICAgICAgICAgICAgICAgZGVzaXJlZEFjY3VyYWN5OiAxMCxcbiAgICAgICAgICAgICAgICB1cGRhdGVEaXN0YW5jZTogMTAsXG4gICAgICAgICAgICAgICAgbWluaW11bVVwZGF0ZVRpbWU6IDEwMDAsXG4gICAgICAgICAgICAgICAgbWF4aW11bUFnZTogMTAwMDBcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICByZXR1cm4gbG9jYXRpb247XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIFByb21pc2UucmVqZWN0KCdHZW9sb2NhdGlvbiBub3QgZW5hYmxlZC4nKTtcbiAgICB9XG5cblxuICAgIC8vTWFwIGV2ZW50c1xuICAgIC8vTWFwIEV2ZW50cyAtIFB1YmxpYyBNZXRob2RzXG4gICAgcHVibGljIG9uTWFwUmVhZHkoZXZlbnQsIG1hcFJlYWR5Tm90aWZ5OiAoKSA9PiB2b2lkKSB7XG4gICAgICAgIGlmICh0aGlzLm1hcFZpZXcgfHwgIWV2ZW50Lm9iamVjdCkgcmV0dXJuO1xuICAgICAgICB0aGlzLm1hcFZpZXcgPSBldmVudC5vYmplY3Q7XG4gICAgICAgIHRoaXMubWFwVmlldy5zZXRTdHlsZShzdHlsZSk7XG4gICAgICAgIC8vTm90aWZpY28gY3VhbmRvIGVsIG1hcGEgZXN0YSBsaXN0b1xuICAgICAgICB0aGlzLm1hcFZpZXcubm90aWZ5TWFwUmVhZHkgPSAoKSA9PiB7XG4gICAgICAgICAgICBtYXBSZWFkeU5vdGlmeSgpO1xuICAgICAgICB9XG4gICAgICAgIC8vIHRoaXMubWFwVmlldy5tYXJrZXJTZWxlY3QgPSB0aGlzLm9uTWFya2VyU2VsZWN0O1xuICAgICAgICAvLyB0aGlzLm1hcFZpZXcuY2FtZXJhQ2hhbmdlZCA9IHRoaXMub25DYW1lcmFDaGFuZ2VkO1xuXG4gICAgICAgIHRoaXMuZW5hYmxlTG9jYXRpb24oKVxuICAgICAgICAgICAgLnRoZW4oKCkgPT4ge1xuICAgICAgICAgICAgICAgIHZhciBsb2NhdGlvbiA9IHRoaXMuZ2V0TG9jYXRpb24oKTtcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAudGhlbigoKSA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy53YXRjaElkID0gZ2VvbG9jYXRpb24ud2F0Y2hMb2NhdGlvbigocCkgPT4geyB0aGlzLmxvY2F0aW9uUmVjZWl2ZWQocCkgfSwgdGhpcy5lcnJvciwge1xuICAgICAgICAgICAgICAgICAgICBkZXNpcmVkQWNjdXJhY3k6IDUwLFxuICAgICAgICAgICAgICAgICAgICB1cGRhdGVEaXN0YW5jZTogNTAsXG4gICAgICAgICAgICAgICAgICAgIG1pbmltdW1VcGRhdGVUaW1lOiAxMDAwMCxcbiAgICAgICAgICAgICAgICAgICAgbWF4aW11bUFnZTogNjAwMDBcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0sIHRoaXMuZXJyb3IpO1xuICAgIH07XG5cbiAgICAvL1RPRE86IEFzaWduYXJsZSBUaXBvIGEgRXZlbnRzXG4gICAgcHVibGljIG1hcFRhcHBlZChldmVudCkge1xuICAgICAgICBjb25zb2xlLmxvZygnTWFwIFRhcHBlZCcpO1xuICAgIH07XG4gICAgLy9NYXAgRXZlbnRzIC0gUHJpdmF0ZSBNZXRob2RzXG4gICAgcHJpdmF0ZSBhZGRNYXJrVG9NYXAobWFyazogTWFya2VyKSB7XG4gICAgICAgIGlmICghdGhpcy5tYXBWaWV3IHx8ICFtYXJrIHx8ICFtYXJrLnBvc2l0aW9uKSByZXR1cm47XG4gICAgICAgIHRoaXMubWFwVmlldy5hZGRNYXJrZXIobWFyayk7XG4gICAgfTtcbiAgICAvL0ZsYWcgcHJpbWVyYSBjb25maWd1cmFjaW9uXG4gICAgcHJpdmF0ZSBmaXJzdENvbmZpZ3VyYXRpb25NYXAgPSBmYWxzZTtcbiAgICBwcml2YXRlIGxvY2F0aW9uUmVjZWl2ZWQgPSAocG9zaXRpb246IFBvc2l0aW9uKSA9PiB7XG4gICAgICAgIGlmICh0aGlzLm1hcFZpZXcgJiYgcG9zaXRpb24gJiYgIXRoaXMuZmlyc3RDb25maWd1cmF0aW9uTWFwKSB7XG4gICAgICAgICAgICB0aGlzLm1hcFZpZXcubGF0aXR1ZGUgPSBwb3NpdGlvbi5sYXRpdHVkZTtcbiAgICAgICAgICAgIHRoaXMubWFwVmlldy5sb25naXR1ZGUgPSBwb3NpdGlvbi5sb25naXR1ZGU7XG4gICAgICAgICAgICB0aGlzLm1hcFZpZXcuem9vbSA9IDI7XG4gICAgICAgICAgICB0aGlzLmNlbnRlcmVkT25Mb2NhdGlvbiA9IHRydWU7XG4gICAgICAgICAgICB0aGlzLmZpcnN0Q29uZmlndXJhdGlvbk1hcCA9IHRydWU7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRoaXMubWFya01hbmFnZXJTZXJ2aWNlLm1lID09IG51bGwpIHtcbiAgICAgICAgICAgIHZhciBtYXJrQ29udGFpbmVyID0gdGhpcy5tYXJrTWFuYWdlclNlcnZpY2UuYWRkTWVNYXJrKHBvc2l0aW9uLmxhdGl0dWRlLCBwb3NpdGlvbi5sb25naXR1ZGUpO1xuICAgICAgICAgICAgdGhpcy5tYXBWaWV3LmFkZE1hcmtlcihtYXJrQ29udGFpbmVyLm1hcmspXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLmxvY2F0aW9uUmVjZWl2ZWRNYXBCZWhhdmlvcigpO1xuICAgICAgICAgICAgdGhpcy5tYXJrTWFuYWdlclNlcnZpY2UubW92ZU1lKHBvc2l0aW9uLmxhdGl0dWRlLCBwb3NpdGlvbi5sb25naXR1ZGUpO1xuICAgICAgICB9XG4gICAgfTtcbiAgICBwcml2YXRlIGxvY2F0aW9uUmVjZWl2ZWRNYXBCZWhhdmlvcigpOiB2b2lkIHtcbiAgICAgICAgLy9UT0RPOiBFc3RlIG1ldG9kbyBkZWJlIGRlIHNlciBjdXN0b21pemFkbyBwYXJhIHF1ZSBlbCBjb21wb3J0YW1pZW50byBkZXBlbmRhIGRlIHNpIGZ1ZSBvIG5vIHRvY2FkbyBlbCBtYXBhXG4gICAgICAgIHRoaXMubWFwVmlldy5sYXRpdHVkZSA9IHRoaXMubWFya01hbmFnZXJTZXJ2aWNlLm1lLnBvc2l0aW9uLmxhdGl0dWRlO1xuICAgICAgICB0aGlzLm1hcFZpZXcubG9uZ2l0dWRlID0gdGhpcy5tYXJrTWFuYWdlclNlcnZpY2UubWUucG9zaXRpb24ubG9uZ2l0dWRlO1xuICAgIH1cblxuICAgIHByaXZhdGUgYWRkUG9pbnRUb0xpbmUoYXJnczogQWRkTGluZUFyZ3MpIHtcbiAgICAgICAgaWYgKCF0aGlzLm1hcFZpZXcgfHwgIWFyZ3MgfHwgIWFyZ3MubG9jYXRpb24pIHJldHVybjtcbiAgICAgICAgbGV0IGxpbmUgPSBhcmdzLmxpbmU7XG4gICAgICAgIGlmICghbGluZSkge1xuICAgICAgICAgICAgbGluZSA9IG5ldyBQb2x5bGluZSgpO1xuICAgICAgICAgICAgbGluZS52aXNpYmxlID0gdHJ1ZTtcbiAgICAgICAgICAgIGxpbmUud2lkdGggPSBhcmdzLndpZHRoIHx8IDEwO1xuICAgICAgICAgICAgbGluZS5jb2xvciA9IGFyZ3MuY29sb3IgfHwgbmV3IENvbG9yKCdSZWQnKTtcbiAgICAgICAgICAgIGxpbmUuZ2VvZGVzaWMgPSBhcmdzLmdlb2Rlc2ljICE9IHVuZGVmaW5lZCA/IGFyZ3MuZ2VvZGVzaWMgOiB0cnVlO1xuICAgICAgICAgICAgdGhpcy5tYXBWaWV3LmFkZFBvbHlsaW5lKGxpbmUpO1xuICAgICAgICB9XG4gICAgICAgIGxpbmUuYWRkUG9pbnQoUG9zaXRpb24ucG9zaXRpb25Gcm9tTGF0TG5nKGFyZ3MubG9jYXRpb24ubGF0aXR1ZGUsIGFyZ3MubG9jYXRpb24ubG9uZ2l0dWRlKSk7XG4gICAgICAgIHJldHVybiBsaW5lO1xuICAgIH1cblxuICAgIHByaXZhdGUgZXJyb3IoZXJyKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKCdFcnJvcjogJyArIEpTT04uc3RyaW5naWZ5KGVycikpO1xuICAgIH1cblxuICAgIHByaXZhdGUgb25NYXJrZXJTZWxlY3QoZXZlbnQpIHtcbiAgICAgICAgY29uc29sZS5sb2coJ0NsaWNrZWQgb24gJyArIGV2ZW50Lm1hcmtlci50aXRsZSk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBvbkNhbWVyYUNoYW5nZWQoZXZlbnQpIHtcbiAgICAgICAgY29uc29sZS5sb2coJ0NhbWVyYSBjaGFuZ2VkOiAnICsgSlNPTi5zdHJpbmdpZnkoZXZlbnQuY2FtZXJhKSk7XG4gICAgfVxuXG5cblxuXG5cbiAgICAvL1Rlc3RcbiAgICBwcml2YXRlIGZpcnN0ID0gdHJ1ZTtcbiAgICBnZXRIZXJvZXMoKTogT2JzZXJ2YWJsZTxSZXNwb25zZT4ge1xuICAgICAgICByZXR1cm4gdGhpcy5odHRwLmdldChcImh0dHBzOi8vbWFwcy5nb29nbGVhcGlzLmNvbS9tYXBzL2FwaS9kaXJlY3Rpb25zL2pzb24/b3JpZ2luPVRvcm9udG8mZGVzdGluYXRpb249TW9udHJlYWwmYXZvaWQ9aGlnaHdheXMmbW9kZT1kcml2aW5nJmtleT1BSXphU3lDMVp6akFEOTFONGNmNkNLb24yYWlOQUZvanU5VjZSM0lcIilcbiAgICAgICAgICAgIC5jYXRjaCh0aGlzLmhhbmRsZUVycm9yKTtcbiAgICB9XG4gICAgcHJpdmF0ZSBoYW5kbGVFcnJvcihlcnJvcjogUmVzcG9uc2UgfCBhbnkpOiBhbnkge1xuICAgICAgICAvLyBJbiBhIHJlYWwgd29ybGQgYXBwLCB3ZSBtaWdodCB1c2UgYSByZW1vdGUgbG9nZ2luZyBpbmZyYXN0cnVjdHVyZVxuICAgICAgICBsZXQgZXJyTXNnOiBzdHJpbmc7XG4gICAgICAgIGlmIChlcnJvciBpbnN0YW5jZW9mIFJlc3BvbnNlKSB7XG4gICAgICAgICAgICBjb25zdCBib2R5ID0gZXJyb3IuanNvbigpIHx8ICcnO1xuICAgICAgICAgICAgY29uc3QgZXJyID0gKDxhbnk+Ym9keSkuZXJyb3IgfHwgSlNPTi5zdHJpbmdpZnkoYm9keSk7XG4gICAgICAgICAgICBlcnJNc2cgPSBgJHtlcnJvci5zdGF0dXN9IC0gJHtlcnJvci5zdGF0dXNUZXh0IHx8ICcnfSAke2Vycn1gO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgZXJyTXNnID0gZXJyb3IubWVzc2FnZSA/IGVycm9yLm1lc3NhZ2UgOiBlcnJvci50b1N0cmluZygpO1xuICAgICAgICB9XG4gICAgICAgIGNvbnNvbGUuZXJyb3IoZXJyTXNnKTtcbiAgICAgICAgcmV0dXJuIE9ic2VydmFibGUudGhyb3coZXJyTXNnKTtcbiAgICB9XG4gICAgcHJpdmF0ZSBleHRyYWN0RGF0YShyZXM6IFJlc3BvbnNlKTogYW55IHtcbiAgICAgICAgbGV0IGJvZHkgPSByZXMuanNvbigpO1xuICAgICAgICByZXR1cm4gKDxhbnk+Ym9keSkuZGF0YSB8fCB7fTtcbiAgICB9XG5cbiAgICAvL2RpYnVqYSB1biBjYW1pbm8sIGNvbiBsYXMgcG9zaXRpb25zIHF1ZSByZWNpYmUgY29tbyBwYXJhbWV0cm9cbiAgICBwcml2YXRlIGRyYXdXYXkocG9zaXRpb25zOiBBcnJheTxQb3NpdGlvbj4pOiB2b2lkIHtcbiAgICAgICAgdmFyIHBvbGk6IFBvbHlsaW5lO1xuICAgICAgICBmb3IgKHZhciBpdGVtIG9mIHBvc2l0aW9ucykge1xuXG4gICAgICAgICAgICBwb2xpID0gdGhpcy5hZGRQb2ludFRvTGluZSh7XG4gICAgICAgICAgICAgICAgY29sb3I6IG5ldyBDb2xvcignUGluaycpLFxuICAgICAgICAgICAgICAgIGxpbmU6IHBvbGksXG4gICAgICAgICAgICAgICAgbG9jYXRpb246IGl0ZW0sXG4gICAgICAgICAgICAgICAgZ2VvZGVzaWM6IHRydWUsXG4gICAgICAgICAgICAgICAgd2lkdGg6IDEwXG4gICAgICAgICAgICB9KTtcblxuICAgICAgICB9XG4gICAgfVxuXG59XG5cbiJdfQ==