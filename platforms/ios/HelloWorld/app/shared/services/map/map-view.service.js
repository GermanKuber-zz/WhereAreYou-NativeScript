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
    MapViewService.prototype.ngAfterViewInit = function () {
        this.drawer = this.drawerComponent.sideDrawer;
    };
    MapViewService.prototype.openDrawer = function () {
        this.drawer.showDrawer();
    };
    MapViewService.prototype.closeDrawer = function () {
        this.drawer.closeDrawer();
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFwLXZpZXcuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIm1hcC12aWV3LnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLHNDQUFzRDtBQUV0RCxnQ0FBOEI7QUFDOUIsaUNBQStCO0FBQy9CLG1DQUFpQztBQUVqQyw2RUFBbUY7QUFDbkYsSUFBSSxVQUFVLEdBQUcsT0FBTyxDQUFDLDhCQUE4QixDQUFDLENBQUM7QUFDekQsSUFBSSxXQUFXLEdBQUcsT0FBTyxDQUFDLDBCQUEwQixDQUFDLENBQUM7QUFDdEQsSUFBSSxLQUFLLEdBQUcsT0FBTyxDQUFDLGtCQUFrQixDQUFDLENBQUM7QUFDeEMsK0JBQThCO0FBTTlCLCtEQUE0RDtBQUM1RCwrREFBeUU7QUFDekUsc0VBQW9HO0FBRXBHLElBQWEsY0FBYztJQVF2Qix3QkFBb0Isa0JBQXNDLEVBQzlDLGtCQUFzQztRQURsRCxpQkFLQztRQUxtQix1QkFBa0IsR0FBbEIsa0JBQWtCLENBQW9CO1FBQzlDLHVCQUFrQixHQUFsQixrQkFBa0IsQ0FBb0I7UUFSbEQsUUFBUTtRQUNBLFlBQU8sR0FBWSxJQUFJLENBQUM7UUFDaEMsWUFBTyxHQUFXLElBQUksQ0FBQztRQUd2Qix1QkFBa0IsR0FBWSxLQUFLLENBQUM7UUFDNUIsU0FBSSxHQUFXLEVBQUUsQ0FBQztRQXNIbEIscUJBQWdCLEdBQUcsVUFBQyxRQUFrQjtZQUMxQyxLQUFJLENBQUMsZ0NBQWdDLENBQUMsUUFBUSxDQUFDLENBQUM7WUFDaEQsRUFBRSxDQUFDLENBQUMsQ0FBQyxLQUFJLENBQUMsa0JBQWtCLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQztnQkFDakMsSUFBSSxhQUFhLEdBQUcsS0FBSSxDQUFDLGtCQUFrQixDQUFDLFNBQVMsQ0FBQyxRQUFRLENBQUMsUUFBUSxFQUFFLFFBQVEsQ0FBQyxTQUFTLENBQUMsQ0FBQztnQkFDN0YsS0FBSSxDQUFDLE9BQU8sQ0FBQyxTQUFTLENBQUMsYUFBYSxD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QUFNLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDcEQsQ0FBQztJQUVPLHdDQUFlLEdBQXZCLFVBQXdCLEtBQUs7UUFDekIsT0FBTyxDQUFDLEdBQUcsQ0FBQyxrQkFBa0IsR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDO0lBQ25FLENBQUM7SUFFTyxnQ0FBTyxHQUFmLFVBQWdCLHdCQUFrRCxFQUFFLFNBQXlCO1FBQTdGLGlCQWdCQztRQWZHLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQztRQUNiLEVBQUUsQ0FBQyxDQUFDLHdCQUF3QixDQUFDLFFBQVEsSUFBSSxJQUFJLENBQUM7WUFDMUMsd0JBQXdCLENBQUMsUUFBUSxDQUFDLGVBQWUsRUFBRSxDQUFDO1FBRXhELFNBQVMsQ0FBQyxPQUFPLENBQUMsVUFBQSxJQUFJO1lBQ2xCLHdCQUF3QixDQUFDLFFBQVEsR0FBRyxLQUFJLENBQUMsY0FBYyxDQUFDO2dCQUNwRCxLQUFLLEVBQUUsSUFBSSxhQUFLLENBQUMsRUFBRSxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsQ0FBQyxDQUFDO2dCQUNqQyxJQUFJLEVBQUUsd0JBQXdCLENBQUMsUUFBUTtnQkFDdkMsUUFBUSxFQUFFLElBQUk7Z0JBQ2QsUUFBUSxFQUFFLElBQUk7Z0JBQ2QsS0FBSyxFQUFFLEVBQUU7YUFDWixDQUFDLENBQUM7UUFDUCxDQUFDLENBQUMsQ0FBQztJQUdQLENBQUM7SUFFTCxxQkFBQztBQUFELENBQUMsQUEzTUQsSUEyTUM7QUF6THNDO0lBQWxDLGdCQUFTLENBQUMsZ0NBQXNCLENBQUM7OEJBQXlCLGdDQUFzQjt1REFBQztBQWxCekUsY0FBYztJQUQxQixpQkFBVSxFQUFFO3FDQVMrQix5Q0FBa0I7UUFDMUIseUNBQWtCO0dBVHpDLGNBQWMsQ0EyTTFCO0FBM01ZLHdDQUFjIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSwgVmlld0NoaWxkIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBPYnNlcnZhYmxlIH0gZnJvbSBcInJ4anMvUnhcIjtcbmltcG9ydCBcInJ4anMvYWRkL29wZXJhdG9yL2RvXCI7XG5pbXBvcnQgXCJyeGpzL2FkZC9vcGVyYXRvci9tYXBcIjtcbmltcG9ydCAncnhqcy9hZGQvb3BlcmF0b3IvY2F0Y2gnO1xuaW1wb3J0IHsgSW1hZ2UgfSBmcm9tIFwidWkvaW1hZ2VcIjtcbmltcG9ydCB7IE1hcFZpZXcsIE1hcmtlciwgUG9seWxpbmUsIFBvc2l0aW9uIH0gZnJvbSAnbmF0aXZlc2NyaXB0LWdvb2dsZS1tYXBzLXNkayc7XG52YXIgbWFwc01vZHVsZSA9IHJlcXVpcmUoXCJuYXRpdmVzY3JpcHQtZ29vZ2xlLW1hcHMtc2RrXCIpO1xubGV0IGdlb2xvY2F0aW9uID0gcmVxdWlyZSgnbmF0aXZlc2NyaXB0LWdlb2xvY2F0aW9uJyk7XG52YXIgc3R5bGUgPSByZXF1aXJlKCcuL21hcC1zdHlsZS5qc29uJyk7XG5pbXBvcnQgeyBDb2xvciB9IGZyb20gJ2NvbG9yJztcbmltcG9ydCB7IEZyaWVuZHNTZXJ2aWNlIH0gZnJvbSAnLi4vLi4vLi4vc2hhcmVkL2ZyaWVuZHMvZnJpZW5kcy5zZXJ2aWNlJztcbmltcG9ydCB7IEh0dHAsIFJlc3BvbnNlIH0gZnJvbSAnQGFuZ3VsYXIvaHR0cCc7XG5pbXBvcnQgeyByb3V0ZXMgfSBmcm9tICcuLi8uLi8uLi9hcHAucm91dGluZyc7XG5pbXBvcnQgeyBMaXN0IH0gZnJvbSAnbGlucXRzJztcbmltcG9ydCB7IE1hcmtXcmFwcGVyLCBNYXJrV3JhcHBlclR5cGVFbnVtLCBBZGRNYXJrZXJBcmdzLCBBZGRMaW5lQXJncywgTWFya0NvbnRhaW5lciwgTWFya1dyYXBwZXJDb25maWd1cmF0aW9uIH0gZnJvbSAnLi9jb3JlL01hcmtDb250YWluZXInO1xuaW1wb3J0IHsgTWFya01hbmFnZXJTZXJ2aWNlIH0gZnJvbSAnLi9tYXJrLW1hbmFnZXIuc2VydmljZSc7XG5pbXBvcnQgeyBFeHRlcm5hbE1hcFNlcnZpY2UsIFdheU1vZGVFbnVtIH0gZnJvbSAnLi9leHRlcm5hbC1tYXAuc2VydmljZSc7XG5pbXBvcnQgeyBSYWRTaWRlRHJhd2VyQ29tcG9uZW50LCBTaWRlRHJhd2VyVHlwZSB9IGZyb20gJ25hdGl2ZXNjcmlwdC10ZWxlcmlrLXVpL3NpZGVkcmF3ZXIvYW5ndWxhcic7XG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgTWFwVmlld1NlcnZpY2Uge1xuICAgIC8vI01hcGEgXG4gICAgcHJpdmF0ZSBtYXBWaWV3OiBNYXBWaWV3ID0gbnVsbDtcbiAgICB3YXRjaElkOiBudW1iZXIgPSBudWxsO1xuICAgIGdwc0xpbmU6IFBvbHlsaW5lO1xuICAgIHRhcE1hcmtlcjogYW55O1xuICAgIGNlbnRlcmVkT25Mb2NhdGlvbjogYm9vbGVhbiA9IGZhbHNlO1xuICAgIHByaXZhdGUgem9vbTogbnVtYmVyID0gMTI7XG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSBtYXJrTWFuYWdlclNlcnZpY2U6IE1hcmtNYW5hZ2VyU2VydmljZSxcbiAgICAgICAgcHJpdmF0ZSBleHRlcm5hbE1hcFNlcnZpY2U6IEV4dGVybmFsTWFwU2VydmljZSkge1xuICAgICAgICBpZiAoIWdlb2xvY2F0aW9uLmlzRW5hYmxlZCgpKSB7XG4gICAgICAgICAgICBnZW9sb2NhdGlvbi5lbmFibGVMb2NhdGlvblJlcXVlc3QoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIG5nT25Jbml0KCkge1xuXG4gICAgfVxuICAgIEBWaWV3Q2hpbGQoUmFkU2lkZURyYXdlckNvbXBvbmVudCkgcHVibGljIGRyYXdlckNvbXBvbmVudDogUmFkU2lkZURyYXdlckNvbXBvbmVudDtcbiAgICBwcml2YXRlIGRyYXdlcjogU2lkZURyYXdlclR5cGU7XG5cbiAgICBuZ0FmdGVyVmlld0luaXQoKSB7XG4gICAgICAgIHRoaXMuZHJhd2VyID0gdGhpcy5kcmF3ZXJDb21wb25lbnQuc2lkZURyYXdlcjtcbiAgICB9XG5cbiAgICBvcGVuRHJhd2VyKCkge1xuICAgICAgICB0aGlzLmRyYXdlci5zaG93RHJhd2VyKCk7XG4gICAgfVxuXG4gICAgY2xvc2VEcmF3ZXIoKSB7XG4gICAgICAgIHRoaXMuZHJhd2VyLmNsb3NlRHJhd2VyKCk7XG4gICAgfVxuICAgIC8vUHVibGljIE1ldGhvZHNcbiAgICBwdWJsaWMgYWRkRnJpZW5kbk1hcmsobWFya0luZm86IEFkZE1hcmtlckFyZ3MsIG1hcmtJZDogbnVtYmVyKTogTWFya0NvbnRhaW5lciB7XG4gICAgICAgIHZhciBtYXJrQ29udGFpbmVyID0gdGhpcy5tYXJrTWFuYWdlclNlcnZpY2UuYWRkRnJpZW5kTWFyayhtYXJrSW5mbywgbWFya0lkKTtcbiAgICAgICAgdGhpcy5tYXBWaWV3LmFkZE1hcmtlcihtYXJrQ29udGFpbmVyLm1hcmspO1xuICAgICAgICByZXR1cm4gbWFya0NvbnRhaW5lcjtcbiAgICB9XG4gICAgcHVibGljIHVwZGF0ZUZyaWVuZE1hcmsobWFya0luZm86IEFkZE1hcmtlckFyZ3MsIG1hcmtJZDogbnVtYmVyKTogdm9pZCB7XG4gICAgICAgIHZhciBjb250YWluZXIgPSB0aGlzLm1hcmtNYW5hZ2VyU2VydmljZS51cGRhdGVNYXJrKG1hcmtJbmZvLCBtYXJrSWQpO1xuICAgICAgICBpZiAoY29udGFpbmVyID09IG51bGwpXG4gICAgICAgICAgICBjb250YWluZXIgPSB0aGlzLmFkZEZyaWVuZG5NYXJrKG1hcmtJbmZvLCBtYXJrSWQpO1xuICAgICAgICBpZiAoY29udGFpbmVyLmlzRW5hYmxlRHJhdykge1xuICAgICAgICAgICAgLy9zaSB0aWVuZSBhY3RpdmFkYSBsYSBvcGNpb24gZGUgZGlidWphclxuICAgICAgICAgICAgY29udGFpbmVyLm1hcmtEcmF3V2F5TGlzdC5Gb3JFYWNoKHggPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMuZXh0ZXJuYWxNYXBTZXJ2aWNlLmdldFdheVBvc2l0aW9ucyhbeC5tYXJrV3JhcHBlci5tYXJrLnBvc2l0aW9uLmxhdGl0dWRlLCB4Lm1hcmtXcmFwcGVyLm1hcmsucG9zaXRpb24ubG9uZ2l0dWRlXSxcbiAgICAgICAgICAgICAgICAgICAgW2NvbnRhaW5lci5tYXJrLnBvc2l0aW9uLmxhdGl0dWRlLCBjb250YWluZXIubWFyay5wb3NpdGlvbi5sb25naXR1ZGVdLFxuICAgICAgICAgICAgICAgICAgICBXYXlNb2RlRW51bS5kcml2aW5nKS5zdWJzY3JpYmUocG9pbnRzID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZHJhd1dheSh4LCBwb2ludHMpO1xuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgfVxuICAgIHB1YmxpYyByZW1vdmVGcmllbmRNYXJrKG1hcmtJZDogbnVtYmVyKTogdm9pZCB7XG4gICAgICAgIHZhciBtYXJrQ29udGFpbmVyID0gdGhpcy5tYXJrTWFuYWdlclNlcnZpY2UucmVtb3ZlRnJpZW5kTWFyayhtYXJrSWQpO1xuICAgICAgICBpZiAobWFya0NvbnRhaW5lciAhPSBudWxsKVxuICAgICAgICAgICAgdGhpcy5tYXBWaWV3LnJlbW92ZU1hcmtlcihtYXJrQ29udGFpbmVyLm1hcmspO1xuICAgIH1cbiAgICBwdWJsaWMgZW5hYmxlRHJhd1dheVRvTWUobWFya0lkOiBudW1iZXIpOiB2b2lkIHtcbiAgICAgICAgLy9BY3RpdmEgbGEgb3BjaW9uIGRlIGRpYnVqYXIgY2FtaW5vIGRlc2RlIGxhIG1hcmtJZCBoYXN0YSBsYSBwb3NpdGlvbiBkZSBNZVxuICAgICAgICB0aGlzLm1hcmtNYW5hZ2VyU2VydmljZS5lbmFibGVEcmF3V2F5VG9NZShtYXJrSWQpO1xuICAgIH1cbiAgICBwdWJsaWMgZGlzYWJsZURyYXdXYXlUb01lKG1hcmtJZDogbnVtYmVyKTogdm9pZCB7XG4gICAgICAgIC8vQWN0aXZhIGxhIG9wY2lvbiBkZSBkaWJ1amFyIGNhbWlubyBkZXNkZSBsYSBtYXJrSWQgaGFzdGEgbGEgcG9zaXRpb24gZGUgTWVcbiAgICAgICAgdGhpcy5tYXJrTWFuYWdlclNlcnZpY2UuZGlzYWJsZURyYXdXYXlUb01lKG1hcmtJZCk7XG4gICAgfVxuICAgIC8vUHJpdmF0ZSBNZXRob2RzXG4gICAgcHJpdmF0ZSBlbmFibGVMb2NhdGlvbigpIHtcbiAgICAgICAgaWYgKCFnZW9sb2NhdGlvbi5pc0VuYWJsZWQoKSkge1xuICAgICAgICAgICAgY29uc29sZS5sb2coJ0xvY2F0aW9uIG5vdCBlbmFibGVkLCByZXF1ZXN0aW5nLicpO1xuICAgICAgICAgICAgcmV0dXJuIGdlb2xvY2F0aW9uLmVuYWJsZUxvY2F0aW9uUmVxdWVzdCgpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZSh0cnVlKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHByaXZhdGUgZ2V0TG9jYXRpb24oKSB7XG4gICAgICAgIGlmIChnZW9sb2NhdGlvbi5pc0VuYWJsZWQoKSkge1xuICAgICAgICAgICAgdmFyIGxvY2F0aW9uID0gZ2VvbG9jYXRpb24uZ2V0Q3VycmVudExvY2F0aW9uKHRoaXMuZ2V0TG9jYXRpb25PYmplY3RQYXJhbWV0ZXIoKSk7XG4gICAgICAgICAgICByZXR1cm4gbG9jYXRpb247XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIFByb21pc2UucmVqZWN0KCdHZW9sb2NhdGlvbiBub3QgZW5hYmxlZC4nKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIGdldExvY2F0aW9uT2JqZWN0UGFyYW1ldGVyKCkge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgZGVzaXJlZEFjY3VyYWN5OiAxMCxcbiAgICAgICAgICAgIHVwZGF0ZURpc3RhbmNlOiAxMCxcbiAgICAgICAgICAgIG1pbmltdW1VcGRhdGVUaW1lOiAxMDAwXG4gICAgICAgIH07XG4gICAgfVxuICAgIC8vTWFwIGV2ZW50c1xuICAgIC8vTWFwIEV2ZW50cyAtIFB1YmxpYyBNZXRob2RzXG4gICAgcHVibGljIG9uTWFwUmVhZHkoZXZlbnQsIG1hcFJlYWR5Tm90aWZ5OiAoKSA9PiB2b2lkKSB7XG4gICAgICAgIGlmICh0aGlzLm1hcFZpZXcgfHwgIWV2ZW50Lm9iamVjdCkgcmV0dXJuO1xuICAgICAgICB0aGlzLm1hcFZpZXcgPSBldmVudC5vYmplY3Q7XG4gICAgICAgIHRoaXMubWFwVmlldy5zZXRTdHlsZShzdHlsZSk7XG4gICAgICAgIC8vTm90aWZpY28gY3VhbmRvIGVsIG1hcGEgZXN0YSBsaXN0b1xuICAgICAgICAvLyB0aGlzLm1hcFZpZXcubm90aWZ5TWFwUmVhZHkgPSAoKSA9PiB7XG5cbiAgICAgICAgLy8gfVxuICAgICAgICAvLyB0aGlzLm1hcFZpZXcubWFya2VyU2VsZWN0ID0gdGhpcy5vbk1hcmtlclNlbGVjdDtcbiAgICAgICAgLy8gdGhpcy5tYXBWaWV3LmNhbWVyYUNoYW5nZWQgPSB0aGlzLm9uQ2FtZXJhQ2hhbmdlZDtcblxuICAgICAgICB0aGlzLmVuYWJsZUxvY2F0aW9uKClcbiAgICAgICAgICAgIC50aGVuKCgpID0+IHtcbiAgICAgICAgICAgICAgICB2YXIgbG9jYXRpb24gPSB0aGlzLmdldExvY2F0aW9uKCk7XG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgLnRoZW4oKCkgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMud2F0Y2hJZCA9IGdlb2xvY2F0aW9uLndhdGNoTG9jYXRpb24oKHApID0+IHsgdGhpcy5sb2NhdGlvblJlY2VpdmVkKHApIH0sIHRoaXMuZXJyb3IsXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZ2V0TG9jYXRpb25PYmplY3RQYXJhbWV0ZXIoKSk7XG4gICAgICAgICAgICB9LCB0aGlzLmVycm9yKTtcbiAgICAgICAgbWFwUmVhZHlOb3RpZnkoKTtcbiAgICB9O1xuXG5cbiAgICBwdWJsaWMgbWFwVGFwcGVkKGV2ZW50KSB7XG4gICAgICAgIGNvbnNvbGUubG9nKCdNYXAgVGFwcGVkJyk7XG4gICAgfTtcbiAgICAvL01hcCBFdmVudHMgLSBQcml2YXRlIE1ldGhvZHNcbiAgICBwcml2YXRlIGFkZE1hcmtUb01hcChtYXJrOiBNYXJrZXIpIHtcbiAgICAgICAgaWYgKCF0aGlzLm1hcFZpZXcgfHwgIW1hcmsgfHwgIW1hcmsucG9zaXRpb24pIHJldHVybjtcbiAgICAgICAgdGhpcy5tYXBWaWV3LmFkZE1hcmtlcihtYXJrKTtcbiAgICB9O1xuXG4gICAgcHJpdmF0ZSBsb2NhdGlvblJlY2VpdmVkID0gKHBvc2l0aW9uOiBQb3NpdGlvbikgPT4ge1xuICAgICAgICB0aGlzLmxvY2F0aW9uUmVjZWl2ZWRGaXJzdE1hcEJlaGF2aW9yKHBvc2l0aW9uKTtcbiAgICAgICAgaWYgKCF0aGlzLm1hcmtNYW5hZ2VyU2VydmljZS5oYXNNZSkge1xuICAgICAgICAgICAgdmFyIG1hcmtDb250YWluZXIgPSB0aGlzLm1hcmtNYW5hZ2VyU2VydmljZS5hZGRNZU1hcmsocG9zaXRpb24ubGF0aXR1ZGUsIHBvc2l0aW9uLmxvbmdpdHVkZSk7XG4gICAgICAgICAgICB0aGlzLm1hcFZpZXcuYWRkTWFya2VyKG1hcmtDb250YWluZXIubWFyaylcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMubG9jYXRpb25SZWNlaXZlZE1hcEJlaGF2aW9yKCk7XG4gICAgICAgICAgICB0aGlzLm1hcmtNYW5hZ2VyU2VydmljZS5tb3ZlTWUocG9zaXRpb24ubGF0aXR1ZGUsIHBvc2l0aW9uLmxvbmdpdHVkZSk7XG4gICAgICAgICAgICB0aGlzLm1hcFZpZXcucmVtb3ZlTWFya2VyKHRoaXMubWFya01hbmFnZXJTZXJ2aWNlLm1lKTtcbiAgICAgICAgICAgIHZhciBtYXJrQ29udGFpbmVyID0gdGhpcy5tYXJrTWFuYWdlclNlcnZpY2UuYWRkTWVNYXJrKHBvc2l0aW9uLmxhdGl0dWRlLCBwb3NpdGlvbi5sb25naXR1ZGUpO1xuICAgICAgICAgICAgdGhpcy5tYXBWaWV3LmFkZE1hcmtlcihtYXJrQ29udGFpbmVyLm1hcmspXG4gICAgICAgIH1cbiAgICB9O1xuICAgIHByaXZhdGUgbG9jYXRpb25SZWNlaXZlZE1hcEJlaGF2aW9yKCk6IHZvaWQge1xuICAgICAgICAvL1RPRE86IEVzdGUgbWV0b2RvIGRlYmUgZGUgc2VyIGN1c3RvbWl6YWRvIHBhcmEgcXVlIGVsIGNvbXBvcnRhbWllbnRvIGRlcGVuZGEgZGUgc2kgZnVlIG8gbm8gdG9jYWRvIGVsIG1hcGFcbiAgICAgICAgdGhpcy5tYXBWaWV3LmxhdGl0dWRlID0gdGhpcy5tYXJrTWFuYWdlclNlcnZpY2UubWUucG9zaXRpb24ubGF0aXR1ZGU7XG4gICAgICAgIHRoaXMubWFwVmlldy5sb25naXR1ZGUgPSB0aGlzLm1hcmtNYW5hZ2VyU2VydmljZS5tZS5wb3NpdGlvbi5sb25naXR1ZGU7XG4gICAgfVxuICAgIC8vRmxhZyBwcmltZXJhIGNvbmZpZ3VyYWNpb25cbiAgICBwcml2YXRlIGZpcnN0Q29uZmlndXJhdGlvbk1hcCA9IGZhbHNlO1xuICAgIHByaXZhdGUgbG9jYXRpb25SZWNlaXZlZEZpcnN0TWFwQmVoYXZpb3IocG9zaXRpb246IFBvc2l0aW9uKTogdm9pZCB7XG4gICAgICAgIC8vVE9ETzogRXN0ZSBtZXRvZG8gZGViZSBkZSBzZXIgY3VzdG9taXphZG8gcGFyYSBxdWUgZWwgY29tcG9ydGFtaWVudG8gZGVwZW5kYSBkZSBzaSBmdWUgbyBubyB0b2NhZG8gZWwgbWFwYVxuICAgICAgICBpZiAodGhpcy5tYXBWaWV3ICYmIHBvc2l0aW9uICYmICF0aGlzLmZpcnN0Q29uZmlndXJhdGlvbk1hcCkge1xuICAgICAgICAgICAgdGhpcy5tYXBWaWV3LmxhdGl0dWRlID0gcG9zaXRpb24ubGF0aXR1ZGU7XG4gICAgICAgICAgICB0aGlzLm1hcFZpZXcubG9uZ2l0dWRlID0gcG9zaXRpb24ubG9uZ2l0dWRlO1xuICAgICAgICAgICAgdGhpcy5tYXBWaWV3Lnpvb20gPSB0aGlzLnpvb207XG4gICAgICAgICAgICB0aGlzLmNlbnRlcmVkT25Mb2NhdGlvbiA9IHRydWU7XG4gICAgICAgICAgICB0aGlzLmZpcnN0Q29uZmlndXJhdGlvbk1hcCA9IHRydWU7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwcml2YXRlIGFkZFBvaW50VG9MaW5lKGFyZ3M6IEFkZExpbmVBcmdzKSB7XG4gICAgICAgIGlmICghdGhpcy5tYXBWaWV3IHx8ICFhcmdzIHx8ICFhcmdzLmxvY2F0aW9uKSByZXR1cm47XG4gICAgICAgIGxldCBsaW5lID0gYXJncy5saW5lO1xuICAgICAgICBpZiAoIWxpbmUpIHtcbiAgICAgICAgICAgIGxpbmUgPSBuZXcgUG9seWxpbmUoKTtcblxuICAgICAgICAgICAgbGluZS52aXNpYmxlID0gdHJ1ZTtcbiAgICAgICAgICAgIGxpbmUud2lkdGggPSBhcmdzLndpZHRoIHx8IDEwO1xuICAgICAgICAgICAgbGluZS5jb2xvciA9IGFyZ3MuY29sb3IgfHwgbmV3IENvbG9yKCdSZWQnKTtcbiAgICAgICAgICAgIGxpbmUuZ2VvZGVzaWMgPSBhcmdzLmdlb2Rlc2ljICE9IHVuZGVmaW5lZCA/IGFyZ3MuZ2VvZGVzaWMgOiB0cnVlO1xuICAgICAgICAgICAgdGhpcy5tYXBWaWV3LmFkZFBvbHlsaW5lKGxpbmUpO1xuICAgICAgICB9XG5cbiAgICAgICAgbGluZS5hZGRQb2ludChQb3NpdGlvbi5wb3NpdGlvbkZyb21MYXRMbmcoYXJncy5sb2NhdGlvbi5sYXRpdHVkZSwgYXJncy5sb2NhdGlvbi5sb25naXR1ZGUpKTtcbiAgICAgICAgcmV0dXJuIGxpbmU7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBlcnJvcihlcnIpIHtcbiAgICAgICAgY29uc29sZS5sb2coJ0Vycm9yOiAnICsgSlNPTi5zdHJpbmdpZnkoZXJyKSk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBvbk1hcmtlclNlbGVjdChldmVudCkge1xuICAgICAgICBjb25zb2xlLmxvZygnQ2xpY2tlZCBvbiAnICsgZXZlbnQubWFya2VyLnRpdGxlKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIG9uQ2FtZXJhQ2hhbmdlZChldmVudCkge1xuICAgICAgICBjb25zb2xlLmxvZygnQ2FtZXJhIGNoYW5nZWQ6ICcgKyBKU09OLnN0cmluZ2lmeShldmVudC5jYW1lcmEpKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIGRyYXdXYXkobWFya1dyYXBwZXJDb25maWd1cmF0aW9uOiBNYXJrV3JhcHBlckNvbmZpZ3VyYXRpb24sIHBvc2l0aW9uczogTGlzdDxQb3NpdGlvbj4pOiB2b2lkIHtcbiAgICAgICAgKyt0aGlzLmNvdW50O1xuICAgICAgICBpZiAobWFya1dyYXBwZXJDb25maWd1cmF0aW9uLnBvbHlsaW5lICE9IG51bGwpXG4gICAgICAgICAgICBtYXJrV3JhcHBlckNvbmZpZ3VyYXRpb24ucG9seWxpbmUucmVtb3ZlQWxsUG9pbnRzKCk7XG5cbiAgICAgICAgcG9zaXRpb25zLkZvckVhY2goaXRlbSA9PiB7XG4gICAgICAgICAgICBtYXJrV3JhcHBlckNvbmZpZ3VyYXRpb24ucG9seWxpbmUgPSB0aGlzLmFkZFBvaW50VG9MaW5lKHtcbiAgICAgICAgICAgICAgICBjb2xvcjogbmV3IENvbG9yKDU3LCAxOTEsIDI0MiwgMSksXG4gICAgICAgICAgICAgICAgbGluZTogbWFya1dyYXBwZXJDb25maWd1cmF0aW9uLnBvbHlsaW5lLFxuICAgICAgICAgICAgICAgIGxvY2F0aW9uOiBpdGVtLFxuICAgICAgICAgICAgICAgIGdlb2Rlc2ljOiB0cnVlLFxuICAgICAgICAgICAgICAgIHdpZHRoOiAxMFxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuXG5cbiAgICB9XG4gICAgcHJpdmF0ZSBjb3VudCA9IDA7XG59XG5cblxuXG4iXX0=