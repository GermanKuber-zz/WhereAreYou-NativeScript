"use strict";
var core_1 = require("@angular/core");
require("rxjs/add/operator/do");
require("rxjs/add/operator/map");
require("rxjs/add/operator/catch");
var nativescript_google_maps_sdk_1 = require("nativescript-google-maps-sdk");
var mapsModule = require("nativescript-google-maps-sdk");
var geolocation = require('nativescript-geolocation');
var style = require('./map-style.json');
var color_1 = require("color");
var mark_manager_service_1 = require("./mark-manager.service");
var external_map_service_1 = require("./external-map.service");
var MapViewService = (function () {
    function MapViewService(markManagerService, externalMapService) {
        var _this = this;
        this.markManagerService = markManagerService;
        this.externalMapService = externalMapService;
        //#Mapa 
        this.mapView = null;
        this.watchId = null;
        this.centeredOnLocation = false;
        this.zoom = 11;
        this.locationReceived = function (position) {
            _this.locationReceivedFirstMapBehavior(position);
            if (!_this.markManagerService.hasMe) {
                var markContainer = _this.markManagerService.addMeMark(position.latitude, position.longitude);
                _this.mapView.addMarker(markContainer.mark);
            }
            else {
                _this.locationReceivedMapBehavior();
                _this.markManagerService.moveMe(position.latitude, position.longitude);
            }
        };
        //Flag primera configuracion
        this.firstConfigurationMap = false;
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
        return markContainer;
    };
    MapViewService.prototype.updateFriendMark = function (markInfo, markId) {
        var _this = this;
        var container = this.markManagerService.updateMark(markInfo, markId);
        if (container == null)
            container = this.addFriendnMark(markInfo, markId);
        if (container.isEnableDraw) {
            //si tiene activada la opcion de dibujar
            container.markDrawWayList.ForEach(function (x) {
                _this.externalMapService.getWayPositions([x.markWrapper.mark.position.latitude, x.markWrapper.mark.position.longitude], [container.mark.position.latitude, container.mark.position.longitude], external_map_service_1.WayModeEnum.driving).subscribe(function (points) {
                    _this.drawWay(x, points);
                });
            });
        }
    };
    MapViewService.prototype.removeFriendMark = function (markId) {
        var markContainer = this.markManagerService.removeFriendMark(markId);
        if (markContainer != null)
            this.mapView.removeMarker(markContainer.mark);
    };
    MapViewService.prototype.enableDrawWayToMe = function (markId) {
        //Activa la opcion de dibujar camino desde la markId hasta la position de Me
        this.markManagerService.enableDrawWayToMe(markId);
    };
    MapViewService.prototype.disableDrawWayToMe = function (markId) {
        //Activa la opcion de dibujar camino desde la markId hasta la position de Me
        this.markManagerService.disableDrawWayToMe(markId);
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
    MapViewService.prototype.locationReceivedFirstMapBehavior = function (position) {
        //TODO: Este metodo debe de ser customizado para que el comportamiento dependa de si fue o no tocado el mapa
        if (this.mapView && position && !this.firstConfigurationMap) {
            this.mapView.latitude = position.latitude;
            this.mapView.longitude = position.longitude;
            this.mapView.zoom = this.zoom;
            this.centeredOnLocation = true;
            this.firstConfigurationMap = true;
        }
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
    MapViewService.prototype.drawWay = function (markWrapperConfiguration, positions) {
        var _this = this;
        if (markWrapperConfiguration.polyline != null)
            markWrapperConfiguration.polyline.removeAllPoints();
        positions.ForEach(function (item) {
            markWrapperConfiguration.polyline = _this.addPointToLine({
                color: new color_1.Color(57, 191, 242, 1),
                line: markWrapperConfiguration.polyline,
                location: item,
                geodesic: true,
                width: 10
            });
        });
    };
    return MapViewService;
}());
MapViewService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [mark_manager_service_1.MarkManagerService,
        external_map_service_1.ExternalMapService])
], MapViewService);
exports.MapViewService = MapViewService;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFwLXZpZXcuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIm1hcC12aWV3LnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLHNDQUEyQztBQUUzQyxnQ0FBOEI7QUFDOUIsaUNBQStCO0FBQy9CLG1DQUFpQztBQUVqQyw2RUFBbUY7QUFDbkYsSUFBSSxVQUFVLEdBQUcsT0FBTyxDQUFDLDhCQUE4QixDQUFDLENBQUM7QUFDekQsSUFBSSxXQUFXLEdBQUcsT0FBTyxDQUFDLDBCQUEwQixDQUFDLENBQUM7QUFDdEQsSUFBSSxLQUFLLEdBQUcsT0FBTyxDQUFDLGtCQUFrQixDQUFDLENBQUM7QUFDeEMsK0JBQThCO0FBTTlCLCtEQUE0RDtBQUM1RCwrREFBeUU7QUFFekUsSUFBYSxjQUFjO0lBV3ZCLHdCQUFvQixrQkFBc0MsRUFDOUMsa0JBQXNDO1FBRGxELGlCQU1DO1FBTm1CLHVCQUFrQixHQUFsQixrQkFBa0IsQ0FBb0I7UUFDOUMsdUJBQWtCLEdBQWxCLGtCQUFrQixDQUFvQjtRQVhsRCxRQUFRO1FBQ0EsWUFBTyxHQUFZLElBQUksQ0FBQztRQUNoQyxZQUFPLEdBQVcsSUFBSSxDQUFDO1FBTXZCLHVCQUFrQixHQUFZLEtBQUssQ0FBQztRQUM1QixTQUFJLEdBQVcsRUFBRSxDQUFDO1FBeUdsQixxQkFBZ0IsR0FBRyxVQUFDLFFBQWtCO1lBQzFDLEtBQUksQ0FBQyxnQ0FBZ0MsQ0FBQyxRQUFRLENBQUMsQ0FBQztZQUNoRCxFQUFFLENBQUMsQ0FBQyxDQUFDLEtBQUksQ0FBQyxrQkFBa0IsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO2dCQUNqQyxJQUFJLGFBQWEsR0FBRyxLQUFJLENBQUMsa0JBQWtCLENBQUMsU0FBUyxDQUFDLFFBQVEsQ0FBQyxRQUFRLEVBQUUsUUFBUSxDQUFDLFNBQVMsQ0FBQyxDQUFDO2dCQUM3RixLQUFJLENBQUMsT0FBTyxDQUFDLFNBQVMsQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFD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QUM7Z0JBQ2pDLElBQUksRUFBRSx3QkFBd0IsQ0FBQyxRQUFRO2dCQUN2QyxRQUFRLEVBQUUsSUFBSTtnQkFDZCxRQUFRLEVBQUUsSUFBSTtnQkFDZCxLQUFLLEVBQUUsRUFBRTthQUNaLENBQUMsQ0FBQztRQUNQLENBQUMsQ0FBQyxDQUFDO0lBQ1AsQ0FBQztJQUNMLHFCQUFDO0FBQUQsQ0FBQyxBQXhMRCxJQXdMQztBQXhMWSxjQUFjO0lBRDFCLGlCQUFVLEVBQUU7cUNBWStCLHlDQUFrQjtRQUMxQix5Q0FBa0I7R0FaekMsY0FBYyxDQXdMMUI7QUF4TFksd0NBQWMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcbmltcG9ydCB7IE9ic2VydmFibGUgfSBmcm9tIFwicnhqcy9SeFwiO1xuaW1wb3J0IFwicnhqcy9hZGQvb3BlcmF0b3IvZG9cIjtcbmltcG9ydCBcInJ4anMvYWRkL29wZXJhdG9yL21hcFwiO1xuaW1wb3J0ICdyeGpzL2FkZC9vcGVyYXRvci9jYXRjaCc7XG5pbXBvcnQgeyBJbWFnZSB9IGZyb20gXCJ1aS9pbWFnZVwiO1xuaW1wb3J0IHsgTWFwVmlldywgTWFya2VyLCBQb2x5bGluZSwgUG9zaXRpb24gfSBmcm9tICduYXRpdmVzY3JpcHQtZ29vZ2xlLW1hcHMtc2RrJztcbnZhciBtYXBzTW9kdWxlID0gcmVxdWlyZShcIm5hdGl2ZXNjcmlwdC1nb29nbGUtbWFwcy1zZGtcIik7XG5sZXQgZ2VvbG9jYXRpb24gPSByZXF1aXJlKCduYXRpdmVzY3JpcHQtZ2VvbG9jYXRpb24nKTtcbnZhciBzdHlsZSA9IHJlcXVpcmUoJy4vbWFwLXN0eWxlLmpzb24nKTtcbmltcG9ydCB7IENvbG9yIH0gZnJvbSAnY29sb3InO1xuaW1wb3J0IHsgRnJpZW5kc1NlcnZpY2UgfSBmcm9tICcuLi8uLi8uLi9zaGFyZWQvZnJpZW5kcy9mcmllbmRzLnNlcnZpY2UnO1xuaW1wb3J0IHsgSHR0cCwgUmVzcG9uc2UgfSBmcm9tICdAYW5ndWxhci9odHRwJztcbmltcG9ydCB7IHJvdXRlcyB9IGZyb20gJy4uLy4uLy4uL2FwcC5yb3V0aW5nJztcbmltcG9ydCB7IExpc3QgfSBmcm9tICdsaW5xdHMnO1xuaW1wb3J0IHsgTWFya1dyYXBwZXIsIE1hcmtXcmFwcGVyVHlwZUVudW0sIEFkZE1hcmtlckFyZ3MsIEFkZExpbmVBcmdzLCBNYXJrQ29udGFpbmVyLCBNYXJrV3JhcHBlckNvbmZpZ3VyYXRpb24gfSBmcm9tICcuL2NvcmUvTWFya0NvbnRhaW5lcic7XG5pbXBvcnQgeyBNYXJrTWFuYWdlclNlcnZpY2UgfSBmcm9tICcuL21hcmstbWFuYWdlci5zZXJ2aWNlJztcbmltcG9ydCB7IEV4dGVybmFsTWFwU2VydmljZSwgV2F5TW9kZUVudW0gfSBmcm9tICcuL2V4dGVybmFsLW1hcC5zZXJ2aWNlJztcbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBNYXBWaWV3U2VydmljZSB7XG4gICAgLy8jTWFwYSBcbiAgICBwcml2YXRlIG1hcFZpZXc6IE1hcFZpZXcgPSBudWxsO1xuICAgIHdhdGNoSWQ6IG51bWJlciA9IG51bGw7XG4gICAgZ3BzTGluZTogUG9seWxpbmU7XG4gICAgdGVzdExpbmU6IFBvbHlsaW5lO1xuICAgIHRhcExpbmU6IFBvbHlsaW5lO1xuICAgIHRhcE1hcmtlcjogYW55O1xuICAgIGdwc01hcmtlcjogTWFya0NvbnRhaW5lcjtcbiAgICBjZW50ZXJlZE9uTG9jYXRpb246IGJvb2xlYW4gPSBmYWxzZTtcbiAgICBwcml2YXRlIHpvb206IG51bWJlciA9IDExO1xuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgbWFya01hbmFnZXJTZXJ2aWNlOiBNYXJrTWFuYWdlclNlcnZpY2UsXG4gICAgICAgIHByaXZhdGUgZXh0ZXJuYWxNYXBTZXJ2aWNlOiBFeHRlcm5hbE1hcFNlcnZpY2UpIHtcbiAgICAgICAgaWYgKCFnZW9sb2NhdGlvbi5pc0VuYWJsZWQoKSkge1xuICAgICAgICAgICAgZ2VvbG9jYXRpb24uZW5hYmxlTG9jYXRpb25SZXF1ZXN0KCk7XG4gICAgICAgIH1cblxuICAgIH1cblxuICAgIG5nT25Jbml0KCkge1xuXG4gICAgfVxuXG4gICAgLy9QdWJsaWMgTWV0aG9kc1xuICAgIHB1YmxpYyBhZGRGcmllbmRuTWFyayhtYXJrSW5mbzogQWRkTWFya2VyQXJncywgbWFya0lkOiBudW1iZXIpOiBNYXJrQ29udGFpbmVyIHtcbiAgICAgICAgdmFyIG1hcmtDb250YWluZXIgPSB0aGlzLm1hcmtNYW5hZ2VyU2VydmljZS5hZGRGcmllbmRNYXJrKG1hcmtJbmZvLCBtYXJrSWQpO1xuICAgICAgICB0aGlzLm1hcFZpZXcuYWRkTWFya2VyKG1hcmtDb250YWluZXIubWFyayk7XG4gICAgICAgIHJldHVybiBtYXJrQ29udGFpbmVyO1xuICAgIH1cbiAgICBwdWJsaWMgdXBkYXRlRnJpZW5kTWFyayhtYXJrSW5mbzogQWRkTWFya2VyQXJncywgbWFya0lkOiBudW1iZXIpOiB2b2lkIHtcbiAgICAgICAgdmFyIGNvbnRhaW5lciA9IHRoaXMubWFya01hbmFnZXJTZXJ2aWNlLnVwZGF0ZU1hcmsobWFya0luZm8sIG1hcmtJZCk7XG4gICAgICAgIGlmIChjb250YWluZXIgPT0gbnVsbClcbiAgICAgICAgICAgIGNvbnRhaW5lciA9IHRoaXMuYWRkRnJpZW5kbk1hcmsobWFya0luZm8sIG1hcmtJZCk7XG4gICAgICAgIGlmIChjb250YWluZXIuaXNFbmFibGVEcmF3KSB7XG4gICAgICAgICAgICAvL3NpIHRpZW5lIGFjdGl2YWRhIGxhIG9wY2lvbiBkZSBkaWJ1amFyXG4gICAgICAgICAgICBjb250YWluZXIubWFya0RyYXdXYXlMaXN0LkZvckVhY2goeCA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy5leHRlcm5hbE1hcFNlcnZpY2UuZ2V0V2F5UG9zaXRpb25zKFt4Lm1hcmtXcmFwcGVyLm1hcmsucG9zaXRpb24ubGF0aXR1ZGUsIHgubWFya1dyYXBwZXIubWFyay5wb3NpdGlvbi5sb25naXR1ZGVdLFxuICAgICAgICAgICAgICAgICAgICBbY29udGFpbmVyLm1hcmsucG9zaXRpb24ubGF0aXR1ZGUsIGNvbnRhaW5lci5tYXJrLnBvc2l0aW9uLmxvbmdpdHVkZV0sXG4gICAgICAgICAgICAgICAgICAgIFdheU1vZGVFbnVtLmRyaXZpbmcpLnN1YnNjcmliZShwb2ludHMgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5kcmF3V2F5KHgsIHBvaW50cyk7XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgcHVibGljIHJlbW92ZUZyaWVuZE1hcmsobWFya0lkOiBudW1iZXIpOiB2b2lkIHtcbiAgICAgICAgdmFyIG1hcmtDb250YWluZXIgPSB0aGlzLm1hcmtNYW5hZ2VyU2VydmljZS5yZW1vdmVGcmllbmRNYXJrKG1hcmtJZCk7XG4gICAgICAgIGlmIChtYXJrQ29udGFpbmVyICE9IG51bGwpXG4gICAgICAgICAgICB0aGlzLm1hcFZpZXcucmVtb3ZlTWFya2VyKG1hcmtDb250YWluZXIubWFyayk7XG4gICAgfVxuICAgIHB1YmxpYyBlbmFibGVEcmF3V2F5VG9NZShtYXJrSWQ6IG51bWJlcik6IHZvaWQge1xuICAgICAgICAvL0FjdGl2YSBsYSBvcGNpb24gZGUgZGlidWphciBjYW1pbm8gZGVzZGUgbGEgbWFya0lkIGhhc3RhIGxhIHBvc2l0aW9uIGRlIE1lXG4gICAgICAgIHRoaXMubWFya01hbmFnZXJTZXJ2aWNlLmVuYWJsZURyYXdXYXlUb01lKG1hcmtJZCk7XG4gICAgfVxuICAgIHB1YmxpYyBkaXNhYmxlRHJhd1dheVRvTWUobWFya0lkOiBudW1iZXIpOiB2b2lkIHtcbiAgICAgICAgLy9BY3RpdmEgbGEgb3BjaW9uIGRlIGRpYnVqYXIgY2FtaW5vIGRlc2RlIGxhIG1hcmtJZCBoYXN0YSBsYSBwb3NpdGlvbiBkZSBNZVxuICAgICAgICB0aGlzLm1hcmtNYW5hZ2VyU2VydmljZS5kaXNhYmxlRHJhd1dheVRvTWUobWFya0lkKTtcbiAgICB9XG4gICAgLy9Qcml2YXRlIE1ldGhvZHNcbiAgICBwcml2YXRlIGVuYWJsZUxvY2F0aW9uKCkge1xuICAgICAgICBpZiAoIWdlb2xvY2F0aW9uLmlzRW5hYmxlZCgpKSB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZygnTG9jYXRpb24gbm90IGVuYWJsZWQsIHJlcXVlc3RpbmcuJyk7XG4gICAgICAgICAgICByZXR1cm4gZ2VvbG9jYXRpb24uZW5hYmxlTG9jYXRpb25SZXF1ZXN0KCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKHRydWUpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBnZXRMb2NhdGlvbigpIHtcbiAgICAgICAgaWYgKGdlb2xvY2F0aW9uLmlzRW5hYmxlZCgpKSB7XG4gICAgICAgICAgICB2YXIgbG9jYXRpb24gPSBnZW9sb2NhdGlvbi5nZXRDdXJyZW50TG9jYXRpb24odGhpcy5nZXRMb2NhdGlvbk9iamVjdFBhcmFtZXRlcigpKTtcbiAgICAgICAgICAgIHJldHVybiBsb2NhdGlvbjtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gUHJvbWlzZS5yZWplY3QoJ0dlb2xvY2F0aW9uIG5vdCBlbmFibGVkLicpO1xuICAgIH1cblxuICAgIHByaXZhdGUgZ2V0TG9jYXRpb25PYmplY3RQYXJhbWV0ZXIoKSB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBkZXNpcmVkQWNjdXJhY3k6IDEwLFxuICAgICAgICAgICAgdXBkYXRlRGlzdGFuY2U6IDEwLFxuICAgICAgICAgICAgbWluaW11bVVwZGF0ZVRpbWU6IDEwMDBcbiAgICAgICAgfTtcbiAgICB9XG4gICAgLy9NYXAgZXZlbnRzXG4gICAgLy9NYXAgRXZlbnRzIC0gUHVibGljIE1ldGhvZHNcbiAgICBwdWJsaWMgb25NYXBSZWFkeShldmVudCwgbWFwUmVhZHlOb3RpZnk6ICgpID0+IHZvaWQpIHtcbiAgICAgICAgaWYgKHRoaXMubWFwVmlldyB8fCAhZXZlbnQub2JqZWN0KSByZXR1cm47XG4gICAgICAgIHRoaXMubWFwVmlldyA9IGV2ZW50Lm9iamVjdDtcbiAgICAgICAgdGhpcy5tYXBWaWV3LnNldFN0eWxlKHN0eWxlKTtcbiAgICAgICAgLy9Ob3RpZmljbyBjdWFuZG8gZWwgbWFwYSBlc3RhIGxpc3RvXG4gICAgICAgIHRoaXMubWFwVmlldy5ub3RpZnlNYXBSZWFkeSA9ICgpID0+IHtcbiAgICAgICAgICAgIG1hcFJlYWR5Tm90aWZ5KCk7XG4gICAgICAgIH1cbiAgICAgICAgLy8gdGhpcy5tYXBWaWV3Lm1hcmtlclNlbGVjdCA9IHRoaXMub25NYXJrZXJTZWxlY3Q7XG4gICAgICAgIC8vIHRoaXMubWFwVmlldy5jYW1lcmFDaGFuZ2VkID0gdGhpcy5vbkNhbWVyYUNoYW5nZWQ7XG5cbiAgICAgICAgdGhpcy5lbmFibGVMb2NhdGlvbigpXG4gICAgICAgICAgICAudGhlbigoKSA9PiB7XG4gICAgICAgICAgICAgICAgdmFyIGxvY2F0aW9uID0gdGhpcy5nZXRMb2NhdGlvbigpO1xuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIC50aGVuKCgpID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLndhdGNoSWQgPSBnZW9sb2NhdGlvbi53YXRjaExvY2F0aW9uKChwKSA9PiB7IHRoaXMubG9jYXRpb25SZWNlaXZlZChwKSB9LCB0aGlzLmVycm9yLFxuICAgICAgICAgICAgICAgICAgICB0aGlzLmdldExvY2F0aW9uT2JqZWN0UGFyYW1ldGVyKCkpO1xuICAgICAgICAgICAgfSwgdGhpcy5lcnJvcik7XG4gICAgfTtcblxuXG4gICAgcHVibGljIG1hcFRhcHBlZChldmVudCkge1xuICAgICAgICBjb25zb2xlLmxvZygnTWFwIFRhcHBlZCcpO1xuICAgIH07XG4gICAgLy9NYXAgRXZlbnRzIC0gUHJpdmF0ZSBNZXRob2RzXG4gICAgcHJpdmF0ZSBhZGRNYXJrVG9NYXAobWFyazogTWFya2VyKSB7XG4gICAgICAgIGlmICghdGhpcy5tYXBWaWV3IHx8ICFtYXJrIHx8ICFtYXJrLnBvc2l0aW9uKSByZXR1cm47XG4gICAgICAgIHRoaXMubWFwVmlldy5hZGRNYXJrZXIobWFyayk7XG4gICAgfTtcblxuICAgIHByaXZhdGUgbG9jYXRpb25SZWNlaXZlZCA9IChwb3NpdGlvbjogUG9zaXRpb24pID0+IHtcbiAgICAgICAgdGhpcy5sb2NhdGlvblJlY2VpdmVkRmlyc3RNYXBCZWhhdmlvcihwb3NpdGlvbik7XG4gICAgICAgIGlmICghdGhpcy5tYXJrTWFuYWdlclNlcnZpY2UuaGFzTWUpIHtcbiAgICAgICAgICAgIHZhciBtYXJrQ29udGFpbmVyID0gdGhpcy5tYXJrTWFuYWdlclNlcnZpY2UuYWRkTWVNYXJrKHBvc2l0aW9uLmxhdGl0dWRlLCBwb3NpdGlvbi5sb25naXR1ZGUpO1xuICAgICAgICAgICAgdGhpcy5tYXBWaWV3LmFkZE1hcmtlcihtYXJrQ29udGFpbmVyLm1hcmspXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLmxvY2F0aW9uUmVjZWl2ZWRNYXBCZWhhdmlvcigpO1xuICAgICAgICAgICAgdGhpcy5tYXJrTWFuYWdlclNlcnZpY2UubW92ZU1lKHBvc2l0aW9uLmxhdGl0dWRlLCBwb3NpdGlvbi5sb25naXR1ZGUpO1xuICAgICAgICB9XG4gICAgfTtcbiAgICBwcml2YXRlIGxvY2F0aW9uUmVjZWl2ZWRNYXBCZWhhdmlvcigpOiB2b2lkIHtcbiAgICAgICAgLy9UT0RPOiBFc3RlIG1ldG9kbyBkZWJlIGRlIHNlciBjdXN0b21pemFkbyBwYXJhIHF1ZSBlbCBjb21wb3J0YW1pZW50byBkZXBlbmRhIGRlIHNpIGZ1ZSBvIG5vIHRvY2FkbyBlbCBtYXBhXG4gICAgICAgIHRoaXMubWFwVmlldy5sYXRpdHVkZSA9IHRoaXMubWFya01hbmFnZXJTZXJ2aWNlLm1lLnBvc2l0aW9uLmxhdGl0dWRlO1xuICAgICAgICB0aGlzLm1hcFZpZXcubG9uZ2l0dWRlID0gdGhpcy5tYXJrTWFuYWdlclNlcnZpY2UubWUucG9zaXRpb24ubG9uZ2l0dWRlO1xuICAgIH1cbiAgICAvL0ZsYWcgcHJpbWVyYSBjb25maWd1cmFjaW9uXG4gICAgcHJpdmF0ZSBmaXJzdENvbmZpZ3VyYXRpb25NYXAgPSBmYWxzZTtcbiAgICBwcml2YXRlIGxvY2F0aW9uUmVjZWl2ZWRGaXJzdE1hcEJlaGF2aW9yKHBvc2l0aW9uOiBQb3NpdGlvbik6IHZvaWQge1xuICAgICAgICAvL1RPRE86IEVzdGUgbWV0b2RvIGRlYmUgZGUgc2VyIGN1c3RvbWl6YWRvIHBhcmEgcXVlIGVsIGNvbXBvcnRhbWllbnRvIGRlcGVuZGEgZGUgc2kgZnVlIG8gbm8gdG9jYWRvIGVsIG1hcGFcbiAgICAgICAgaWYgKHRoaXMubWFwVmlldyAmJiBwb3NpdGlvbiAmJiAhdGhpcy5maXJzdENvbmZpZ3VyYXRpb25NYXApIHtcbiAgICAgICAgICAgIHRoaXMubWFwVmlldy5sYXRpdHVkZSA9IHBvc2l0aW9uLmxhdGl0dWRlO1xuICAgICAgICAgICAgdGhpcy5tYXBWaWV3LmxvbmdpdHVkZSA9IHBvc2l0aW9uLmxvbmdpdHVkZTtcbiAgICAgICAgICAgIHRoaXMubWFwVmlldy56b29tID0gdGhpcy56b29tO1xuICAgICAgICAgICAgdGhpcy5jZW50ZXJlZE9uTG9jYXRpb24gPSB0cnVlO1xuICAgICAgICAgICAgdGhpcy5maXJzdENvbmZpZ3VyYXRpb25NYXAgPSB0cnVlO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBhZGRQb2ludFRvTGluZShhcmdzOiBBZGRMaW5lQXJncykge1xuICAgICAgICBpZiAoIXRoaXMubWFwVmlldyB8fCAhYXJncyB8fCAhYXJncy5sb2NhdGlvbikgcmV0dXJuO1xuICAgICAgICBsZXQgbGluZSA9IGFyZ3MubGluZTtcbiAgICAgICAgaWYgKCFsaW5lKSB7XG4gICAgICAgICAgICBsaW5lID0gbmV3IFBvbHlsaW5lKCk7XG4gICAgICAgICAgICBsaW5lLnZpc2libGUgPSB0cnVlO1xuICAgICAgICAgICAgbGluZS53aWR0aCA9IGFyZ3Mud2lkdGggfHwgMTA7XG4gICAgICAgICAgICBsaW5lLmNvbG9yID0gYXJncy5jb2xvciB8fCBuZXcgQ29sb3IoJ1JlZCcpO1xuICAgICAgICAgICAgbGluZS5nZW9kZXNpYyA9IGFyZ3MuZ2VvZGVzaWMgIT0gdW5kZWZpbmVkID8gYXJncy5nZW9kZXNpYyA6IHRydWU7XG4gICAgICAgICAgICB0aGlzLm1hcFZpZXcuYWRkUG9seWxpbmUobGluZSk7XG4gICAgICAgIH1cbiAgICAgICAgbGluZS5hZGRQb2ludChQb3NpdGlvbi5wb3NpdGlvbkZyb21MYXRMbmcoYXJncy5sb2NhdGlvbi5sYXRpdHVkZSwgYXJncy5sb2NhdGlvbi5sb25naXR1ZGUpKTtcbiAgICAgICAgcmV0dXJuIGxpbmU7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBlcnJvcihlcnIpIHtcbiAgICAgICAgY29uc29sZS5sb2coJ0Vycm9yOiAnICsgSlNPTi5zdHJpbmdpZnkoZXJyKSk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBvbk1hcmtlclNlbGVjdChldmVudCkge1xuICAgICAgICBjb25zb2xlLmxvZygnQ2xpY2tlZCBvbiAnICsgZXZlbnQubWFya2VyLnRpdGxlKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIG9uQ2FtZXJhQ2hhbmdlZChldmVudCkge1xuICAgICAgICBjb25zb2xlLmxvZygnQ2FtZXJhIGNoYW5nZWQ6ICcgKyBKU09OLnN0cmluZ2lmeShldmVudC5jYW1lcmEpKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIGRyYXdXYXkobWFya1dyYXBwZXJDb25maWd1cmF0aW9uOiBNYXJrV3JhcHBlckNvbmZpZ3VyYXRpb24sIHBvc2l0aW9uczogTGlzdDxQb3NpdGlvbj4pOiB2b2lkIHtcbiAgICAgICAgaWYgKG1hcmtXcmFwcGVyQ29uZmlndXJhdGlvbi5wb2x5bGluZSAhPSBudWxsKVxuICAgICAgICAgICAgbWFya1dyYXBwZXJDb25maWd1cmF0aW9uLnBvbHlsaW5lLnJlbW92ZUFsbFBvaW50cygpO1xuXG4gICAgICAgIHBvc2l0aW9ucy5Gb3JFYWNoKGl0ZW0gPT4ge1xuICAgICAgICAgICAgbWFya1dyYXBwZXJDb25maWd1cmF0aW9uLnBvbHlsaW5lID0gdGhpcy5hZGRQb2ludFRvTGluZSh7XG4gICAgICAgICAgICAgICAgY29sb3I6IG5ldyBDb2xvcig1NywgMTkxLCAyNDIsIDEpLFxuICAgICAgICAgICAgICAgIGxpbmU6IG1hcmtXcmFwcGVyQ29uZmlndXJhdGlvbi5wb2x5bGluZSxcbiAgICAgICAgICAgICAgICBsb2NhdGlvbjogaXRlbSxcbiAgICAgICAgICAgICAgICBnZW9kZXNpYzogdHJ1ZSxcbiAgICAgICAgICAgICAgICB3aWR0aDogMTBcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICB9XG59XG5cblxuXG4iXX0=