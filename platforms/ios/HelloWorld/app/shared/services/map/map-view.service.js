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
var angular_1 = require("nativescript-telerik-ui/sidedrawer/angular");
var MapViewService = (function () {
    function MapViewService(markManagerService, externalMapService) {
        var _this = this;
        this.markManagerService = markManagerService;
        this.externalMapService = externalMapService;
        //#Mapa 
        this.mapView = null;
        this.watchId = null;
        this.centeredOnLocation = false;
        this.zoom = 12;
        this.locationReceived = function (position) {
            _this.locationReceivedFirstMapBehavior(position);
            if (!_this.markManagerService.hasMe) {
                var markContainer = _this.markManagerService.addMeMark(position.latitude, position.longitude);
                _this.mapView.addMarker(markContainer.mark);
            }
            else {
                _this.locationReceivedMapBehavior();
                _this.markManagerService.moveMe(position.latitude, position.longitude);
                _this.mapView.removeMarker(_this.markManagerService.me);
                var markContainer = _this.markManagerService.addMeMark(position.latitude, position.longitude);
                _this.mapView.addMarker(markContainer.mark);
            }
        };
        //Flag primera configuracion
        this.firstConfigurationMap = false;
        this.count = 0;
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
        // this.mapView.notifyMapReady = () => {
        // }
        // this.mapView.markerSelect = this.onMarkerSelect;
        // this.mapView.cameraChanged = this.onCameraChanged;
        this.enableLocation()
            .then(function () {
            var location = _this.getLocation();
        })
            .then(function () {
            _this.watchId = geolocation.watchLocation(function (p) { _this.locationReceived(p); }, _this.error, _this.getLocationObjectParameter());
        }, this.error);
        mapReadyNotify();
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
        this.mapView.notifyMarkerEvent;
    };
    MapViewService.prototype.onMarkerSelect = function (event) {
        console.log('Clicked on ' + event.marker.title);
    };
    MapViewService.prototype.onCameraChanged = function (event) {
        console.log('Camera changed: ' + JSON.stringify(event.camera));
    };
    MapViewService.prototype.drawWay = function (markWrapperConfiguration, positions) {
        var _this = this;
        ++this.count;
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
__decorate([
    core_1.ViewChild(angular_1.RadSideDrawerComponent),
    __metadata("design:type", angular_1.RadSideDrawerComponent)
], MapViewService.prototype, "drawerComponent", void 0);
MapViewService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [mark_manager_service_1.MarkManagerService,
        external_map_service_1.ExternalMapService])
], MapViewService);
exports.MapViewService = MapViewService;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFwLXZpZXcuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIm1hcC12aWV3LnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLHNDQUFzRDtBQUV0RCxnQ0FBOEI7QUFDOUIsaUNBQStCO0FBQy9CLG1DQUFpQztBQUVqQyw2RUFBbUY7QUFDbkYsSUFBSSxVQUFVLEdBQUcsT0FBTyxDQUFDLDhCQUE4QixDQUFDLENBQUM7QUFDekQsSUFBSSxXQUFXLEdBQUcsT0FBTyxDQUFDLDBCQUEwQixDQUFDLENBQUM7QUFDdEQsSUFBSSxLQUFLLEdBQUcsT0FBTyxDQUFDLGtCQUFrQixDQUFDLENBQUM7QUFDeEMsK0JBQThCO0FBTTlCLCtEQUE0RDtBQUM1RCwrREFBeUU7QUFDekUsc0VBQW9HO0FBRXBHLElBQWEsY0FBYztJQVF2Qix3QkFBb0Isa0JBQXNDLEVBQzlDLGtCQUFzQztRQURsRCxpQkFLQztRQUxtQix1QkFBa0IsR0FBbEIsa0JBQWtCLENBQW9CO1FBQzlDLHVCQUFrQixHQUFsQixrQkFBa0IsQ0FBb0I7UUFSbEQsUUFBUTtRQUNBLFlBQU8sR0FBWSxJQUFJLENBQUM7UUFDaEMsWUFBTyxHQUFXLElBQUksQ0FBQztRQUd2Qix1QkFBa0IsR0FBWSxLQUFLLENBQUM7UUFDNUIsU0FBSSxHQUFXLEVBQUUsQ0FBQztRQTRHbEIscUJBQWdCLEdBQUcsVUFBQyxRQUFrQjtZQUMxQyxLQUFJLENBQUMsZ0NBQWdDLENBQUMsUUFBUSxDQUFDLENBQUM7WUFDaEQsRUFBRSxDQUFDLENBQUMsQ0FBQyxLQUFJLENBQUMsa0JBQWtCLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQztnQkFDakMsSUFBSSxhQUFhLEdBQUcsS0FBSSxDQUFDLGtCQUFrQixDQUFDLFNBQVMsQ0FBQyxRQUFRLENBQUMsUUFBUSxFQUFFLFFBQVEsQ0FBQyxTQUFTLENBQUMsQ0FBQztnQkFDN0YsS0FBSSxDQUFDLE9BQU8sQ0FBQyxTQUFTLENBQUMsYUFBYSxD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VUFBZ0Isd0JBQWtELEVBQUUsU0FBeUI7UUFBN0YsaUJBZ0JDO1FBZkcsRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDO1FBQ2IsRUFBRSxDQUFDLENBQUMsd0JBQXdCLENBQUMsUUFBUSxJQUFJLElBQUksQ0FBQztZQUMxQyx3QkFBd0IsQ0FBQyxRQUFRLENBQUMsZUFBZSxFQUFFLENBQUM7UUFFeEQsU0FBUyxDQUFDLE9BQU8sQ0FBQyxVQUFBLElBQUk7WUFDbEIsd0JBQXdCLENBQUMsUUFBUSxHQUFHLEtBQUksQ0FBQyxjQUFjLENBQUM7Z0JBQ3BELEtBQUssRUFBRSxJQUFJLGFBQUssQ0FBQyxFQUFFLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxDQUFDLENBQUM7Z0JBQ2pDLElBQUksRUFBRSx3QkFBd0IsQ0FBQyxRQUFRO2dCQUN2QyxRQUFRLEVBQUUsSUFBSTtnQkFDZCxRQUFRLEVBQUUsSUFBSTtnQkFDZCxLQUFLLEVBQUUsRUFBRTthQUNaLENBQUMsQ0FBQztRQUNQLENBQUMsQ0FBQyxDQUFDO0lBR1AsQ0FBQztJQUVMLHFCQUFDO0FBQUQsQ0FBQyxBQWxNRCxJQWtNQztBQWhMc0M7SUFBbEMsZ0JBQVMsQ0FBQyxnQ0FBc0IsQ0FBQzs4QkFBeUIsZ0NBQXNCO3VEQUFDO0FBbEJ6RSxjQUFjO0lBRDFCLGlCQUFVLEVBQUU7cUNBUytCLHlDQUFrQjtRQUMxQix5Q0FBa0I7R0FUekMsY0FBYyxDQWtNMUI7QUFsTVksd0NBQWMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlLCBWaWV3Q2hpbGQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IE9ic2VydmFibGUgfSBmcm9tIFwicnhqcy9SeFwiO1xuaW1wb3J0IFwicnhqcy9hZGQvb3BlcmF0b3IvZG9cIjtcbmltcG9ydCBcInJ4anMvYWRkL29wZXJhdG9yL21hcFwiO1xuaW1wb3J0ICdyeGpzL2FkZC9vcGVyYXRvci9jYXRjaCc7XG5pbXBvcnQgeyBJbWFnZSB9IGZyb20gXCJ1aS9pbWFnZVwiO1xuaW1wb3J0IHsgTWFwVmlldywgTWFya2VyLCBQb2x5bGluZSwgUG9zaXRpb24gfSBmcm9tICduYXRpdmVzY3JpcHQtZ29vZ2xlLW1hcHMtc2RrJztcbnZhciBtYXBzTW9kdWxlID0gcmVxdWlyZShcIm5hdGl2ZXNjcmlwdC1nb29nbGUtbWFwcy1zZGtcIik7XG5sZXQgZ2VvbG9jYXRpb24gPSByZXF1aXJlKCduYXRpdmVzY3JpcHQtZ2VvbG9jYXRpb24nKTtcbnZhciBzdHlsZSA9IHJlcXVpcmUoJy4vbWFwLXN0eWxlLmpzb24nKTtcbmltcG9ydCB7IENvbG9yIH0gZnJvbSAnY29sb3InO1xuaW1wb3J0IHsgRnJpZW5kc1NlcnZpY2UgfSBmcm9tICcuLi8uLi8uLi9zaGFyZWQvZnJpZW5kcy9mcmllbmRzLnNlcnZpY2UnO1xuaW1wb3J0IHsgSHR0cCwgUmVzcG9uc2UgfSBmcm9tICdAYW5ndWxhci9odHRwJztcbmltcG9ydCB7IHJvdXRlcyB9IGZyb20gJy4uLy4uLy4uL2FwcC5yb3V0aW5nJztcbmltcG9ydCB7IExpc3QgfSBmcm9tICdsaW5xdHMnO1xuaW1wb3J0IHsgTWFya1dyYXBwZXIsIE1hcmtXcmFwcGVyVHlwZUVudW0sIEFkZE1hcmtlckFyZ3MsIEFkZExpbmVBcmdzLCBNYXJrQ29udGFpbmVyLCBNYXJrV3JhcHBlckNvbmZpZ3VyYXRpb24gfSBmcm9tICcuL2NvcmUvTWFya0NvbnRhaW5lcic7XG5pbXBvcnQgeyBNYXJrTWFuYWdlclNlcnZpY2UgfSBmcm9tICcuL21hcmstbWFuYWdlci5zZXJ2aWNlJztcbmltcG9ydCB7IEV4dGVybmFsTWFwU2VydmljZSwgV2F5TW9kZUVudW0gfSBmcm9tICcuL2V4dGVybmFsLW1hcC5zZXJ2aWNlJztcbmltcG9ydCB7IFJhZFNpZGVEcmF3ZXJDb21wb25lbnQsIFNpZGVEcmF3ZXJUeXBlIH0gZnJvbSAnbmF0aXZlc2NyaXB0LXRlbGVyaWstdWkvc2lkZWRyYXdlci9hbmd1bGFyJztcbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBNYXBWaWV3U2VydmljZSB7XG4gICAgLy8jTWFwYSBcbiAgICBwcml2YXRlIG1hcFZpZXc6IE1hcFZpZXcgPSBudWxsO1xuICAgIHdhdGNoSWQ6IG51bWJlciA9IG51bGw7XG4gICAgZ3BzTGluZTogUG9seWxpbmU7XG4gICAgdGFwTWFya2VyOiBhbnk7XG4gICAgY2VudGVyZWRPbkxvY2F0aW9uOiBib29sZWFuID0gZmFsc2U7XG4gICAgcHJpdmF0ZSB6b29tOiBudW1iZXIgPSAxMjtcbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIG1hcmtNYW5hZ2VyU2VydmljZTogTWFya01hbmFnZXJTZXJ2aWNlLFxuICAgICAgICBwcml2YXRlIGV4dGVybmFsTWFwU2VydmljZTogRXh0ZXJuYWxNYXBTZXJ2aWNlKSB7XG4gICAgICAgIGlmICghZ2VvbG9jYXRpb24uaXNFbmFibGVkKCkpIHtcbiAgICAgICAgICAgIGdlb2xvY2F0aW9uLmVuYWJsZUxvY2F0aW9uUmVxdWVzdCgpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgbmdPbkluaXQoKSB7XG5cbiAgICB9XG4gICAgQFZpZXdDaGlsZChSYWRTaWRlRHJhd2VyQ29tcG9uZW50KSBwdWJsaWMgZHJhd2VyQ29tcG9uZW50OiBSYWRTaWRlRHJhd2VyQ29tcG9uZW50O1xuICAgIHByaXZhdGUgZHJhd2VyOiBTaWRlRHJhd2VyVHlwZTtcblxuXG4gICAgLy9QdWJsaWMgTWV0aG9kc1xuICAgIHB1YmxpYyBhZGRGcmllbmRuTWFyayhtYXJrSW5mbzogQWRkTWFya2VyQXJncywgbWFya0lkOiBudW1iZXIpOiBNYXJrQ29udGFpbmVyIHtcbiAgICAgICAgdmFyIG1hcmtDb250YWluZXIgPSB0aGlzLm1hcmtNYW5hZ2VyU2VydmljZS5hZGRGcmllbmRNYXJrKG1hcmtJbmZvLCBtYXJrSWQpO1xuICAgICAgICB0aGlzLm1hcFZpZXcuYWRkTWFya2VyKG1hcmtDb250YWluZXIubWFyayk7XG4gICAgICAgIHJldHVybiBtYXJrQ29udGFpbmVyO1xuICAgIH1cbiAgICBwdWJsaWMgdXBkYXRlRnJpZW5kTWFyayhtYXJrSW5mbzogQWRkTWFya2VyQXJncywgbWFya0lkOiBudW1iZXIpOiB2b2lkIHtcbiAgICAgICAgdmFyIGNvbnRhaW5lciA9IHRoaXMubWFya01hbmFnZXJTZXJ2aWNlLnVwZGF0ZU1hcmsobWFya0luZm8sIG1hcmtJZCk7XG4gICAgICAgIGlmIChjb250YWluZXIgPT0gbnVsbClcbiAgICAgICAgICAgIGNvbnRhaW5lciA9IHRoaXMuYWRkRnJpZW5kbk1hcmsobWFya0luZm8sIG1hcmtJZCk7XG4gICAgICAgIGlmIChjb250YWluZXIuaXNFbmFibGVEcmF3KSB7XG4gICAgICAgICAgICAvL3NpIHRpZW5lIGFjdGl2YWRhIGxhIG9wY2lvbiBkZSBkaWJ1amFyXG4gICAgICAgICAgICBjb250YWluZXIubWFya0RyYXdXYXlMaXN0LkZvckVhY2goeCA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy5leHRlcm5hbE1hcFNlcnZpY2UuZ2V0V2F5UG9zaXRpb25zKFt4Lm1hcmtXcmFwcGVyLm1hcmsucG9zaXRpb24ubGF0aXR1ZGUsIHgubWFya1dyYXBwZXIubWFyay5wb3NpdGlvbi5sb25naXR1ZGVdLFxuICAgICAgICAgICAgICAgICAgICBbY29udGFpbmVyLm1hcmsucG9zaXRpb24ubGF0aXR1ZGUsIGNvbnRhaW5lci5tYXJrLnBvc2l0aW9uLmxvbmdpdHVkZV0sXG4gICAgICAgICAgICAgICAgICAgIFdheU1vZGVFbnVtLmRyaXZpbmcpLnN1YnNjcmliZShwb2ludHMgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5kcmF3V2F5KHgsIHBvaW50cyk7XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgcHVibGljIHJlbW92ZUZyaWVuZE1hcmsobWFya0lkOiBudW1iZXIpOiB2b2lkIHtcbiAgICAgICAgdmFyIG1hcmtDb250YWluZXIgPSB0aGlzLm1hcmtNYW5hZ2VyU2VydmljZS5yZW1vdmVGcmllbmRNYXJrKG1hcmtJZCk7XG4gICAgICAgIGlmIChtYXJrQ29udGFpbmVyICE9IG51bGwpXG4gICAgICAgICAgICB0aGlzLm1hcFZpZXcucmVtb3ZlTWFya2VyKG1hcmtDb250YWluZXIubWFyayk7XG4gICAgfVxuICAgIHB1YmxpYyBlbmFibGVEcmF3V2F5VG9NZShtYXJrSWQ6IG51bWJlcik6IHZvaWQge1xuICAgICAgICAvL0FjdGl2YSBsYSBvcGNpb24gZGUgZGlidWphciBjYW1pbm8gZGVzZGUgbGEgbWFya0lkIGhhc3RhIGxhIHBvc2l0aW9uIGRlIE1lXG4gICAgICAgIHRoaXMubWFya01hbmFnZXJTZXJ2aWNlLmVuYWJsZURyYXdXYXlUb01lKG1hcmtJZCk7XG4gICAgfVxuICAgIHB1YmxpYyBkaXNhYmxlRHJhd1dheVRvTWUobWFya0lkOiBudW1iZXIpOiB2b2lkIHtcbiAgICAgICAgLy9BY3RpdmEgbGEgb3BjaW9uIGRlIGRpYnVqYXIgY2FtaW5vIGRlc2RlIGxhIG1hcmtJZCBoYXN0YSBsYSBwb3NpdGlvbiBkZSBNZVxuICAgICAgICB0aGlzLm1hcmtNYW5hZ2VyU2VydmljZS5kaXNhYmxlRHJhd1dheVRvTWUobWFya0lkKTtcbiAgICB9XG4gICAgLy9Qcml2YXRlIE1ldGhvZHNcbiAgICBwcml2YXRlIGVuYWJsZUxvY2F0aW9uKCkge1xuICAgICAgICBpZiAoIWdlb2xvY2F0aW9uLmlzRW5hYmxlZCgpKSB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZygnTG9jYXRpb24gbm90IGVuYWJsZWQsIHJlcXVlc3RpbmcuJyk7XG4gICAgICAgICAgICByZXR1cm4gZ2VvbG9jYXRpb24uZW5hYmxlTG9jYXRpb25SZXF1ZXN0KCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKHRydWUpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBnZXRMb2NhdGlvbigpIHtcbiAgICAgICAgaWYgKGdlb2xvY2F0aW9uLmlzRW5hYmxlZCgpKSB7XG4gICAgICAgICAgICB2YXIgbG9jYXRpb24gPSBnZW9sb2NhdGlvbi5nZXRDdXJyZW50TG9jYXRpb24odGhpcy5nZXRMb2NhdGlvbk9iamVjdFBhcmFtZXRlcigpKTtcbiAgICAgICAgICAgIHJldHVybiBsb2NhdGlvbjtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gUHJvbWlzZS5yZWplY3QoJ0dlb2xvY2F0aW9uIG5vdCBlbmFibGVkLicpO1xuICAgIH1cblxuICAgIHByaXZhdGUgZ2V0TG9jYXRpb25PYmplY3RQYXJhbWV0ZXIoKSB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBkZXNpcmVkQWNjdXJhY3k6IDEwLFxuICAgICAgICAgICAgdXBkYXRlRGlzdGFuY2U6IDEwLFxuICAgICAgICAgICAgbWluaW11bVVwZGF0ZVRpbWU6IDEwMDBcbiAgICAgICAgfTtcbiAgICB9XG4gICAgLy9NYXAgZXZlbnRzXG4gICAgLy9NYXAgRXZlbnRzIC0gUHVibGljIE1ldGhvZHNcbiAgICBwdWJsaWMgb25NYXBSZWFkeShldmVudCwgbWFwUmVhZHlOb3RpZnk6ICgpID0+IHZvaWQpIHtcbiAgICAgICAgaWYgKHRoaXMubWFwVmlldyB8fCAhZXZlbnQub2JqZWN0KSByZXR1cm47XG4gICAgICAgIHRoaXMubWFwVmlldyA9IGV2ZW50Lm9iamVjdDtcbiAgICAgICAgdGhpcy5tYXBWaWV3LnNldFN0eWxlKHN0eWxlKTtcbiAgICAgICAgLy9Ob3RpZmljbyBjdWFuZG8gZWwgbWFwYSBlc3RhIGxpc3RvXG4gICAgICAgIC8vIHRoaXMubWFwVmlldy5ub3RpZnlNYXBSZWFkeSA9ICgpID0+IHtcblxuICAgICAgICAvLyB9XG4gICAgICAgIC8vIHRoaXMubWFwVmlldy5tYXJrZXJTZWxlY3QgPSB0aGlzLm9uTWFya2VyU2VsZWN0O1xuICAgICAgICAvLyB0aGlzLm1hcFZpZXcuY2FtZXJhQ2hhbmdlZCA9IHRoaXMub25DYW1lcmFDaGFuZ2VkO1xuXG4gICAgICAgIHRoaXMuZW5hYmxlTG9jYXRpb24oKVxuICAgICAgICAgICAgLnRoZW4oKCkgPT4ge1xuICAgICAgICAgICAgICAgIHZhciBsb2NhdGlvbiA9IHRoaXMuZ2V0TG9jYXRpb24oKTtcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAudGhlbigoKSA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy53YXRjaElkID0gZ2VvbG9jYXRpb24ud2F0Y2hMb2NhdGlvbigocCkgPT4geyB0aGlzLmxvY2F0aW9uUmVjZWl2ZWQocCkgfSwgdGhpcy5lcnJvcixcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5nZXRMb2NhdGlvbk9iamVjdFBhcmFtZXRlcigpKTtcbiAgICAgICAgICAgIH0sIHRoaXMuZXJyb3IpO1xuICAgICAgICBtYXBSZWFkeU5vdGlmeSgpO1xuICAgIH07XG5cblxuICAgIHB1YmxpYyBtYXBUYXBwZWQoZXZlbnQpIHtcbiAgICAgICAgY29uc29sZS5sb2coJ01hcCBUYXBwZWQnKTtcbiAgICB9O1xuICAgIC8vTWFwIEV2ZW50cyAtIFByaXZhdGUgTWV0aG9kc1xuICAgIHByaXZhdGUgYWRkTWFya1RvTWFwKG1hcms6IE1hcmtlcikge1xuICAgICAgICBpZiAoIXRoaXMubWFwVmlldyB8fCAhbWFyayB8fCAhbWFyay5wb3NpdGlvbikgcmV0dXJuO1xuICAgICAgICB0aGlzLm1hcFZpZXcuYWRkTWFya2VyKG1hcmspO1xuICAgIH07XG5cbiAgICBwcml2YXRlIGxvY2F0aW9uUmVjZWl2ZWQgPSAocG9zaXRpb246IFBvc2l0aW9uKSA9PiB7XG4gICAgICAgIHRoaXMubG9jYXRpb25SZWNlaXZlZEZpcnN0TWFwQmVoYXZpb3IocG9zaXRpb24pO1xuICAgICAgICBpZiAoIXRoaXMubWFya01hbmFnZXJTZXJ2aWNlLmhhc01lKSB7XG4gICAgICAgICAgICB2YXIgbWFya0NvbnRhaW5lciA9IHRoaXMubWFya01hbmFnZXJTZXJ2aWNlLmFkZE1lTWFyayhwb3NpdGlvbi5sYXRpdHVkZSwgcG9zaXRpb24ubG9uZ2l0dWRlKTtcbiAgICAgICAgICAgIHRoaXMubWFwVmlldy5hZGRNYXJrZXIobWFya0NvbnRhaW5lci5tYXJrKVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5sb2NhdGlvblJlY2VpdmVkTWFwQmVoYXZpb3IoKTtcbiAgICAgICAgICAgIHRoaXMubWFya01hbmFnZXJTZXJ2aWNlLm1vdmVNZShwb3NpdGlvbi5sYXRpdHVkZSwgcG9zaXRpb24ubG9uZ2l0dWRlKTtcbiAgICAgICAgICAgIHRoaXMubWFwVmlldy5yZW1vdmVNYXJrZXIodGhpcy5tYXJrTWFuYWdlclNlcnZpY2UubWUpO1xuICAgICAgICAgICAgdmFyIG1hcmtDb250YWluZXIgPSB0aGlzLm1hcmtNYW5hZ2VyU2VydmljZS5hZGRNZU1hcmsocG9zaXRpb24ubGF0aXR1ZGUsIHBvc2l0aW9uLmxvbmdpdHVkZSk7XG4gICAgICAgICAgICB0aGlzLm1hcFZpZXcuYWRkTWFya2VyKG1hcmtDb250YWluZXIubWFyaylcbiAgICAgICAgfVxuICAgIH07XG4gICAgcHJpdmF0ZSBsb2NhdGlvblJlY2VpdmVkTWFwQmVoYXZpb3IoKTogdm9pZCB7XG4gICAgICAgIC8vVE9ETzogRXN0ZSBtZXRvZG8gZGViZSBkZSBzZXIgY3VzdG9taXphZG8gcGFyYSBxdWUgZWwgY29tcG9ydGFtaWVudG8gZGVwZW5kYSBkZSBzaSBmdWUgbyBubyB0b2NhZG8gZWwgbWFwYVxuICAgICAgICB0aGlzLm1hcFZpZXcubGF0aXR1ZGUgPSB0aGlzLm1hcmtNYW5hZ2VyU2VydmljZS5tZS5wb3NpdGlvbi5sYXRpdHVkZTtcbiAgICAgICAgdGhpcy5tYXBWaWV3LmxvbmdpdHVkZSA9IHRoaXMubWFya01hbmFnZXJTZXJ2aWNlLm1lLnBvc2l0aW9uLmxvbmdpdHVkZTtcbiAgICB9XG4gICAgLy9GbGFnIHByaW1lcmEgY29uZmlndXJhY2lvblxuICAgIHByaXZhdGUgZmlyc3RDb25maWd1cmF0aW9uTWFwID0gZmFsc2U7XG4gICAgcHJpdmF0ZSBsb2NhdGlvblJlY2VpdmVkRmlyc3RNYXBCZWhhdmlvcihwb3NpdGlvbjogUG9zaXRpb24pOiB2b2lkIHtcbiAgICAgICAgLy9UT0RPOiBFc3RlIG1ldG9kbyBkZWJlIGRlIHNlciBjdXN0b21pemFkbyBwYXJhIHF1ZSBlbCBjb21wb3J0YW1pZW50byBkZXBlbmRhIGRlIHNpIGZ1ZSBvIG5vIHRvY2FkbyBlbCBtYXBhXG4gICAgICAgIGlmICh0aGlzLm1hcFZpZXcgJiYgcG9zaXRpb24gJiYgIXRoaXMuZmlyc3RDb25maWd1cmF0aW9uTWFwKSB7XG4gICAgICAgICAgICB0aGlzLm1hcFZpZXcubGF0aXR1ZGUgPSBwb3NpdGlvbi5sYXRpdHVkZTtcbiAgICAgICAgICAgIHRoaXMubWFwVmlldy5sb25naXR1ZGUgPSBwb3NpdGlvbi5sb25naXR1ZGU7XG4gICAgICAgICAgICB0aGlzLm1hcFZpZXcuem9vbSA9IHRoaXMuem9vbTtcbiAgICAgICAgICAgIHRoaXMuY2VudGVyZWRPbkxvY2F0aW9uID0gdHJ1ZTtcbiAgICAgICAgICAgIHRoaXMuZmlyc3RDb25maWd1cmF0aW9uTWFwID0gdHJ1ZTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHByaXZhdGUgYWRkUG9pbnRUb0xpbmUoYXJnczogQWRkTGluZUFyZ3MpIHtcbiAgICAgICAgaWYgKCF0aGlzLm1hcFZpZXcgfHwgIWFyZ3MgfHwgIWFyZ3MubG9jYXRpb24pIHJldHVybjtcbiAgICAgICAgbGV0IGxpbmUgPSBhcmdzLmxpbmU7XG4gICAgICAgIGlmICghbGluZSkge1xuICAgICAgICAgICAgbGluZSA9IG5ldyBQb2x5bGluZSgpO1xuXG4gICAgICAgICAgICBsaW5lLnZpc2libGUgPSB0cnVlO1xuICAgICAgICAgICAgbGluZS53aWR0aCA9IGFyZ3Mud2lkdGggfHwgMTA7XG4gICAgICAgICAgICBsaW5lLmNvbG9yID0gYXJncy5jb2xvciB8fCBuZXcgQ29sb3IoJ1JlZCcpO1xuICAgICAgICAgICAgbGluZS5nZW9kZXNpYyA9IGFyZ3MuZ2VvZGVzaWMgIT0gdW5kZWZpbmVkID8gYXJncy5nZW9kZXNpYyA6IHRydWU7XG4gICAgICAgICAgICB0aGlzLm1hcFZpZXcuYWRkUG9seWxpbmUobGluZSk7XG4gICAgICAgIH1cblxuICAgICAgICBsaW5lLmFkZFBvaW50KFBvc2l0aW9uLnBvc2l0aW9uRnJvbUxhdExuZyhhcmdzLmxvY2F0aW9uLmxhdGl0dWRlLCBhcmdzLmxvY2F0aW9uLmxvbmdpdHVkZSkpO1xuICAgICAgICByZXR1cm4gbGluZTtcbiAgICB9XG5cbiAgICBwcml2YXRlIGVycm9yKGVycikge1xuICAgICAgICBjb25zb2xlLmxvZygnRXJyb3I6ICcgKyBKU09OLnN0cmluZ2lmeShlcnIpKTtcbiAgICAgICAgdGhpcy5tYXBWaWV3Lm5vdGlmeU1hcmtlckV2ZW50XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBvbk1hcmtlclNlbGVjdChldmVudCkge1xuICAgICAgICBjb25zb2xlLmxvZygnQ2xpY2tlZCBvbiAnICsgZXZlbnQubWFya2VyLnRpdGxlKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIG9uQ2FtZXJhQ2hhbmdlZChldmVudCkge1xuICAgICAgICBjb25zb2xlLmxvZygnQ2FtZXJhIGNoYW5nZWQ6ICcgKyBKU09OLnN0cmluZ2lmeShldmVudC5jYW1lcmEpKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIGRyYXdXYXkobWFya1dyYXBwZXJDb25maWd1cmF0aW9uOiBNYXJrV3JhcHBlckNvbmZpZ3VyYXRpb24sIHBvc2l0aW9uczogTGlzdDxQb3NpdGlvbj4pOiB2b2lkIHtcbiAgICAgICAgKyt0aGlzLmNvdW50O1xuICAgICAgICBpZiAobWFya1dyYXBwZXJDb25maWd1cmF0aW9uLnBvbHlsaW5lICE9IG51bGwpXG4gICAgICAgICAgICBtYXJrV3JhcHBlckNvbmZpZ3VyYXRpb24ucG9seWxpbmUucmVtb3ZlQWxsUG9pbnRzKCk7XG5cbiAgICAgICAgcG9zaXRpb25zLkZvckVhY2goaXRlbSA9PiB7XG4gICAgICAgICAgICBtYXJrV3JhcHBlckNvbmZpZ3VyYXRpb24ucG9seWxpbmUgPSB0aGlzLmFkZFBvaW50VG9MaW5lKHtcbiAgICAgICAgICAgICAgICBjb2xvcjogbmV3IENvbG9yKDU3LCAxOTEsIDI0MiwgMSksXG4gICAgICAgICAgICAgICAgbGluZTogbWFya1dyYXBwZXJDb25maWd1cmF0aW9uLnBvbHlsaW5lLFxuICAgICAgICAgICAgICAgIGxvY2F0aW9uOiBpdGVtLFxuICAgICAgICAgICAgICAgIGdlb2Rlc2ljOiB0cnVlLFxuICAgICAgICAgICAgICAgIHdpZHRoOiAxMFxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuXG5cbiAgICB9XG4gICAgcHJpdmF0ZSBjb3VudCA9IDA7XG59XG5cblxuXG4iXX0=