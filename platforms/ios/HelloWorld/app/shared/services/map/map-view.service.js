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
        //Flag primera configuracion
        this.firstConfigurationMap = false;
        this.locationReceived = function (position) {
            if (_this.mapView && position && !_this.firstConfigurationMap) {
                _this.mapView.latitude = position.latitude;
                _this.mapView.longitude = position.longitude;
                _this.mapView.zoom = 13;
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
        var _this = this;
        var container = this.markManagerService.updateMark(markInfo, markId);
        if (container.isEnableDraw) {
            //si tiene activada la opcion de dibujar
            container.markDrawWayList.ForEach(function (x) {
                _this.externalMapService.getWayPositions([x.markWrapper.mark.position.latitude, x.markWrapper.mark.position.longitude], [container.mark.position.latitude, container.mark.position.longitude], external_map_service_1.WayModeEnum.driving).subscribe(function (points) {
                    _this.drawWay(x, points);
                });
            });
        }
    };
    MapViewService.prototype.removeCommonMark = function (markInfo, markId) {
        this.markManagerService.removeMark(markId);
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
    //Test
    //dibuja un camino, con las positions que recibe como parametro
    MapViewService.prototype.drawWay = function (markWrapperConfiguration, positions) {
        var _this = this;
        if (markWrapperConfiguration.polyline != null)
            markWrapperConfiguration.polyline.removeAllPoints();
        positions.ForEach(function (item) {
            markWrapperConfiguration.polyline = _this.addPointToLine({
                color: new color_1.Color('Pink'),
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFwLXZpZXcuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIm1hcC12aWV3LnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLHNDQUEyQztBQUUzQyxnQ0FBOEI7QUFDOUIsaUNBQStCO0FBQy9CLG1DQUFpQztBQUVqQyw2RUFBbUY7QUFDbkYsSUFBSSxVQUFVLEdBQUcsT0FBTyxDQUFDLDhCQUE4QixDQUFDLENBQUM7QUFDekQsSUFBSSxXQUFXLEdBQUcsT0FBTyxDQUFDLDBCQUEwQixDQUFDLENBQUM7QUFDdEQsSUFBSSxLQUFLLEdBQUcsT0FBTyxDQUFDLGtCQUFrQixDQUFDLENBQUM7QUFDeEMsK0JBQThCO0FBTTlCLCtEQUE0RDtBQUM1RCwrREFBeUU7QUFFekUsSUFBYSxjQUFjO0lBV3ZCLHdCQUFvQixrQkFBc0MsRUFDOUMsa0JBQXNDO1FBRGxELGlCQU1DO1FBTm1CLHVCQUFrQixHQUFsQixrQkFBa0IsQ0FBb0I7UUFDOUMsdUJBQWtCLEdBQWxCLGtCQUFrQixDQUFvQjtRQVhsRCxRQUFRO1FBQ0EsWUFBTyxHQUFZLElBQUksQ0FBQztRQUNoQyxZQUFPLEdBQVcsSUFBSSxDQUFDO1FBTXZCLHVCQUFrQixHQUFZLEtBQUssQ0FBQztRQXFHcEMsNEJBQTRCO1FBQ3BCLDBCQUFxQixHQUFHLEtBQUssQ0FBQztRQUM5QixxQkFBZ0IsR0FBRyxVQUFDLFFBQWtCO1lBQzFDLEVBQUUsQ0FBQyxDQUFDLEtBQUksQ0FBQyxPQUFPLElBQUksUUFBUSxJQUFJLENBQUMsS0FBSSxDQUFDLHFCQUFxQixDQUFDLENBQUMsQ0FBQztnQkFDMUQsS0FBSSxDQUFDLE9BQU8sQ0FBQyxRQUFRLEdBQUcsUUFBUSxDQUFDLFFBQVEsQ0FBQztnQkFDMUMsS0FBSSxDQUFDLE9BQU8sQ0FBQyxTQUFTLEdBQUcsUUFBUSxDQUFDLFNBQVMsQ0FBQztnQkFDNUMsS0FBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLEdBQUcsRUFBRSxDQUFDO2dCQUN2QixLQUFJLENBQUMsa0JBQWtCLEdBQUcsSUFBSSxDQUFDO2dCQUMvQixLQUFJLENBQUMscUJBQXFCLEdBQUcsSUFBSSxDQUFDO1lBQ3RDLENBQUM7WUFDRCxFQUFFLENBQUMsQ0FBQyxDQUFDLEtBQUksQ0FBQyxrQkFBa0IsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO2dCQUNqQyxJQUFJLGFBQWEsR0FBRyxLQUFJLENBQUMsa0JBQWtCLENBQUMsU0FBUyxDQUFDLFFBQVEsQ0FBQyxRQUFRLEVBQUUsUUFBUSxDQUFDLFNBQVMsQ0FBQyxDQUFDO2dCQUM3RixLQUFJLENBQUMsT0FBTyxDQUFDLFNBQVMsQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLENBQUE7WUFDOUMsQ0FBQztZQUFDLElBQUksQ0FBQyxDQUFDO2dCQUNKLEtBQUksQ0FBQywyQkFBMkIsRUFBRSxDQUFDO2dCQUNuQyxLQUFJLENBQUMsa0JBQWtCLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxRQUFRLEVBQUUsUUFBUSxDQUFDLFNBQVMsQ0FBQyxDQUFDO1lBQzFFLENBQUM7UUFDTCxDQUFDLENBQUM7UUFsSEUsRUFBRSxDQUFDLENBQUMsQ0FBQyxXQUFXLENBQUMsU0FBUyxFQUFFLENBQUMsQ0FBQyxDQUFDO1lBQzNCLFdBQVcsQ0FBQyxxQkFBcUIsRUFBRSxDQUFDO1FBQ3hDLENBQUM7SUFFTCxDQUFDO0lBRUQsaUNBQVEsR0FBUjtJQUVBLENBQUM7SUFFRCxnQkFBZ0I7SUFDVCx1Q0FBYyxHQUFyQixVQUFzQixRQUF1QixFQUFFLE1BQWM7UUFDekQsSUFBSSxhQUFhLEdBQUcsSUFBSSxDQUFDLGtCQUFrQixDQUFDLGFBQWEsQ0FBQyxRQUFRLEVBQUUsTUFBTSxDQUFDLENBQUM7UUFDNUUsSUFBSSxDQUFDLE9BQU8sQ0FBQyxTQUFTLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQy9DLENBQUM7SUFDTSx5Q0FBZ0IsR0FBdkIsVUFBd0IsUUFBdUIsRUFBRSxNQUFjO1FBQS9ELGlCQWFDO1FBWkcsSUFBSSxTQUFTLEdBQUcsSUFBSSxDQUFDLGtCQUFrQixDQUFDLFVBQVUsQ0FBQyxRQUFRLEVBQUUsTUFBTSxDQUFDLENBQUM7UUFDckUsRUFBRSxDQUFDLENBQUMsU0FBUyxDQUFDLFlBQVksQ0FBQyxDQUFDLENBQUM7WUFFekIsd0NBQXdDO1lBQ3hDLFNBQVMsQ0FBQyxlQUFlLENBQUMsT0FBTyxDQUFDLFVBQUEsQ0FBQztnQkFDL0IsS0FBSSxDQUFDLGtCQUFrQixDQUFDLGVBQWUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxRQUFRLEVBQUUsQ0FBQyxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLFNBQVMsQ0FBQyxFQUNqSCxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLFFBQVEsRUFBRSxTQUFTLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxTQUFTLENBQUMsRUFDckUsa0NBQVcsQ0FBQyxPQUFPLENBQUMsQ0FBQyxTQUFTLENBQUMsVUFBQSxNQUFNO29CQUNqQyxLQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsRUFBRSxNQUFNLENBQUMsQ0FBQztnQkFDNUIsQ0FBQyxDQUFDLENBQUM7WUFDWCxDQUFDLENBQUMsQ0FBQztRQUNQLENBQUM7SUFDTCxDQUFDO0lBQ00seUNBQWdCLEdBQXZCLFVBQXdCLFFBQXVCLEVBQUUsTUFBYztRQUMzRCxJQUFJLENBQUMsa0JBQWtCLENBQUMsVUFBVSxDQUFDLE1BQU0sQ0FBQyxDQUFDO0lBQy9DLENBQUM7SUFDTSwwQ0FBaUIsR0FBeEIsVUFBeUIsTUFBYztRQUNuQyw0RUFBNEU7UUFDNUUsSUFBSSxDQUFDLGtCQUFrQixDQUFDLGlCQUFpQixDQUFDLE1BQU0sQ0FBQyxDQUFDO0lBQ3RELENBQUM7SUFDTSwyQ0FBa0IsR0FBekIsVUFBMEIsTUFBYztRQUNwQyw0RUFBNEU7UUFDNUUsSUFBSSxDQUFDLGtCQUFrQixDQUFDLGtCQUFrQixDQUFDLE1BQU0sQ0FBQyxDQUFDO0lBQ3ZELENBQUM7SUFDRCxpQkFBaUI7SUFDVCx1Q0FBYyxHQUF0QjtRQUNJLEVBQUUsQ0FBQyxDQUFDLENBQUMsV0FBVyxDQUFDLFNBQVMsRUFBRSxDQUFDLENBQUMsQ0FBQztZQUMzQixPQUFPLENBQUMsR0FBRyxDQUFDLG1DQUFtQyxDQUFDLENBQUM7WUFDakQsTUFBTSxDQUFDLFdBQVcsQ0FBQyxxQkFBcUIsRUFBRSxDQUFDO1FBQy9DLENBQUM7UUFBQyxJQUFJLENBQUMsQ0FBQztZQUNKLE1BQU0sQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ2pDLENBQUM7SUFDTCxDQUFDO0lBRU8sb0NBQVcsR0FBbkI7UUFDSSxFQUFFLENBQUMsQ0FBQyxXQUFXLENBQUMsU0FBUyxFQUFFLENBQUMsQ0FBQyxDQUFDO1lBQzFCLElBQUksUUFBUSxHQUFHLFdBQVcsQ0FBQyxrQkFBa0IsQ0FBQyxJQUFJLENBQUMsMEJBQTBCLEVBQUUsQ0FBQyxDQUFDO1lBQ2pGLE1BQU0sQ0FBQyxRQUFRLENBQUM7UUFDcEIsQ0FBQztRQUNELE1BQU0sQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLDBCQUEwQixDQUFDLENBQUM7SUFDdEQsQ0FBQztJQUVPLG1EQUEwQixHQUFsQztRQUNJLE1BQU0sQ0FBQztZQUNILGVBQWUsRUFBRSxFQUFFO1lBQ25CLGNBQWMsRUFBRSxFQUFFO1lBQ2xCLGlCQUFpQixFQUFFLElBQUk7U0FDMUIsQ0FBQztJQUNOLENBQUM7SUFDRCxZQUFZO0lBQ1osNkJBQTZCO0lBQ3RCLG1DQUFVLEdBQWpCLFVBQWtCLEtBQUssRUFBRSxjQUEwQjtRQUFuRCxpQkFtQkM7UUFsQkcsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLE9BQU8sSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUM7WUFBQyxNQUFNLENBQUM7UUFDMUMsSUFBSSxDQUFDLE9BQU8sR0FBRyxLQUFLLENBQUMsTUFBTSxDQUFDO1FBQzVCLElBQUksQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQzdCLG9DQUFvQztRQUNwQyxJQUFJLENBQUMsT0FBTyxDQUFDLGNBQWMsR0FBRztZQUMxQixjQUFjLEVBQUUsQ0FBQztRQUNyQixDQUFDLENBQUE7UUFDRCxtREFBbUQ7UUFDbkQscURBQXFEO1FBRXJELElBQUksQ0FBQyxjQUFjLEVBQUU7YUFDaEIsSUFBSSxDQUFDO1lBQ0YsSUFBSSxRQUFRLEdBQUcsS0FBSSxDQUFDLFdBQVcsRUFBRSxDQUFDO1FBQ3RDLENBQUMsQ0FBQzthQUNELElBQUksQ0FBQztZQUNGLEtBQUksQ0FBQyxPQUFPLEdBQUcsV0FBVyxDQUFDLGFBQWEsQ0FBQyxVQUFDLENBQUMsSUFBTyxLQUFJLENBQUMsZ0JBQWdCLENBQUMsQ0FBQyxDQUFDLENBQUEsQ0FBQyxDQUFDLEVBQUUsS0FBSSxDQUFDLEtBQUssRUFDcEYsS0FBSSxDQUFDLDBCQUEwQixFQUFFLENBQUMsQ0FBQztRQUMzQyxDQUFDLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQ3ZCLENBQUM7SUFBQSxDQUFDO0lBR0ssa0NBQVMsR0FBaEIsVUFBaUIsS0FBSztRQUNsQixPQUFPLENBQUMsR0FBRyxDQUFDLFlBQVksQ0FBQyxDQUFDO0lBQzlCLENBQUM7SUFBQSxDQUFDO0lBQ0YsOEJBQThCO0lBQ3RCLHFDQUFZLEdBQXBCLFVBQXFCLElBQVk7UUFDN0IsRUFBRSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsT0FBTyxJQUFJLENBQUMsSUFBSSxJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQztZQUFDLE1BQU0sQ0FBQztRQUNyRCxJQUFJLENBQUMsT0FBTyxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUNqQyxDQUFDO0lBQUEsQ0FBQztJQW1CTSxvREFBMkIsR0FBbkM7UUFDSSw0R0FBNEc7UUFDNUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDLGtCQUFrQixDQUFDLEVBQUUsQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDO1FBQ3JFLElBQUksQ0FBQyxPQUFPLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxFQUFFLENBQUMsUUFBUSxDQUFDLFNBQVMsQ0FBQztJQUMzRSxDQUFDO0lBRU8sdUNBQWMsR0FBdEIsVUFBdUIsSUFBaUI7UUFDcEMsRUFBRSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsT0FBTyxJQUFJLENBQUMsSUFBSSxJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQztZQUFDLE1BQU0sQ0FBQztRQUNyRCxJQUFJLElBQUksR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDO1FBQ3JCLEVBQUUsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztZQUNSLElBQUksR0FBRyxJQUFJLHVDQUFRLEVBQUUsQ0FBQztZQUN0QixJQUFJLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQztZQUNwQixJQUFJLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQyxLQUFLLElBQUksRUFBRSxDQUFDO1lBQzlCLElBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDLEtBQUssSUFBSSxJQUFJLGFBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQztZQUM1QyxJQUFJLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQyxRQUFRLElBQUksU0FBUyxHQUFHLElBQUksQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDO1lBQ2xFLElBQUksQ0FBQyxPQUFPLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ25DLENBQUM7UUFDRCxJQUFJLENBQUMsUUFBUSxDQUFDLHVDQUFRLENBQUMsa0JBQWtCLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxRQUFRLEVBQUUsSUFBSSxDQUFDLFFBQVEsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDO1FBQzVGLE1BQU0sQ0FBQyxJQUFJLENBQUM7SUFDaEIsQ0FBQztJQUVPLDhCQUFLLEdBQWIsVUFBYyxHQUFHO1FBQ2IsT0FBTyxDQUFDLEdBQUcsQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO0lBQ2pELENBQUM7SUFFTyx1Q0FBYyxHQUF0QixVQUF1QixLQUFLO1FBQ3hCLE9BQU8sQ0FBQyxHQUFHLENBQUMsYUFBYSxHQUFHLEtBQUssQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDcEQsQ0FBQztJQUVPLHdDQUFlLEdBQXZCLFVBQXdCLEtBQUs7UUFDekIsT0FBTyxDQUFDLEdBQUcsQ0FBQyxrQkFBa0IsR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDO0lBQ25FLENBQUM7SUFNRCxNQUFNO0lBQ04sK0RBQStEO0lBQ3ZELGdDQUFPLEdBQWYsVUFBZ0Isd0JBQWtELEVBQUUsU0FBeUI7UUFBN0YsaUJBYUM7UUFaRyxFQUFFLENBQUMsQ0FBQyx3QkFBd0IsQ0FBQyxRQUFRLElBQUksSUFBSSxDQUFDO1lBQzFDLHdCQUF3QixDQUFDLFFBQVEsQ0FBQyxlQUFlLEVBQUUsQ0FBQztRQUV4RCxTQUFTLENBQUMsT0FBTyxDQUFDLFVBQUEsSUFBSTtZQUNsQix3QkFBd0IsQ0FBQyxRQUFRLEdBQUcsS0FBSSxDQUFDLGNBQWMsQ0FBQztnQkFDcEQsS0FBSyxFQUFFLElBQUksYUFBSyxDQUFDLE1BQU0sQ0FBQztnQkFDeEIsSUFBSSxFQUFFLHdCQUF3QixDQUFDLFFBQVE7Z0JBQ3ZDLFFBQVEsRUFBRSxJQUFJO2dCQUNkLFFBQVEsRUFBRSxJQUFJO2dCQUNkLEtBQUssRUFBRSxFQUFFO2FBQ1osQ0FBQyxDQUFDO1FBQ1AsQ0FBQyxDQUFDLENBQUM7SUFDUCxDQUFDO0lBQ0wscUJBQUM7QUFBRCxDQUFDLEFBckxELElBcUxDO0FBckxZLGNBQWM7SUFEMUIsaUJBQVUsRUFBRTtxQ0FZK0IseUNBQWtCO1FBQzFCLHlDQUFrQjtHQVp6QyxjQUFjLENBcUwxQjtBQXJMWSx3Q0FBYyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSB9IGZyb20gXCJyeGpzL1J4XCI7XG5pbXBvcnQgXCJyeGpzL2FkZC9vcGVyYXRvci9kb1wiO1xuaW1wb3J0IFwicnhqcy9hZGQvb3BlcmF0b3IvbWFwXCI7XG5pbXBvcnQgJ3J4anMvYWRkL29wZXJhdG9yL2NhdGNoJztcbmltcG9ydCB7IEltYWdlIH0gZnJvbSBcInVpL2ltYWdlXCI7XG5pbXBvcnQgeyBNYXBWaWV3LCBNYXJrZXIsIFBvbHlsaW5lLCBQb3NpdGlvbiB9IGZyb20gJ25hdGl2ZXNjcmlwdC1nb29nbGUtbWFwcy1zZGsnO1xudmFyIG1hcHNNb2R1bGUgPSByZXF1aXJlKFwibmF0aXZlc2NyaXB0LWdvb2dsZS1tYXBzLXNka1wiKTtcbmxldCBnZW9sb2NhdGlvbiA9IHJlcXVpcmUoJ25hdGl2ZXNjcmlwdC1nZW9sb2NhdGlvbicpO1xudmFyIHN0eWxlID0gcmVxdWlyZSgnLi9tYXAtc3R5bGUuanNvbicpO1xuaW1wb3J0IHsgQ29sb3IgfSBmcm9tICdjb2xvcic7XG5pbXBvcnQgeyBGcmllbmRzU2VydmljZSB9IGZyb20gJy4uLy4uLy4uL3NoYXJlZC9mcmllbmRzL2ZyaWVuZHMuc2VydmljZSc7XG5pbXBvcnQgeyBIdHRwLCBSZXNwb25zZSB9IGZyb20gJ0Bhbmd1bGFyL2h0dHAnO1xuaW1wb3J0IHsgcm91dGVzIH0gZnJvbSAnLi4vLi4vLi4vYXBwLnJvdXRpbmcnO1xuaW1wb3J0IHsgTGlzdCB9IGZyb20gJ2xpbnF0cyc7XG5pbXBvcnQgeyBNYXJrV3JhcHBlciwgTWFya1dyYXBwZXJUeXBlRW51bSwgQWRkTWFya2VyQXJncywgQWRkTGluZUFyZ3MsIE1hcmtDb250YWluZXIsIE1hcmtXcmFwcGVyQ29uZmlndXJhdGlvbiB9IGZyb20gJy4vY29yZS9NYXJrQ29udGFpbmVyJztcbmltcG9ydCB7IE1hcmtNYW5hZ2VyU2VydmljZSB9IGZyb20gJy4vbWFyay1tYW5hZ2VyLnNlcnZpY2UnO1xuaW1wb3J0IHsgRXh0ZXJuYWxNYXBTZXJ2aWNlLCBXYXlNb2RlRW51bSB9IGZyb20gJy4vZXh0ZXJuYWwtbWFwLnNlcnZpY2UnO1xuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIE1hcFZpZXdTZXJ2aWNlIHtcbiAgICAvLyNNYXBhIFxuICAgIHByaXZhdGUgbWFwVmlldzogTWFwVmlldyA9IG51bGw7XG4gICAgd2F0Y2hJZDogbnVtYmVyID0gbnVsbDtcbiAgICBncHNMaW5lOiBQb2x5bGluZTtcbiAgICB0ZXN0TGluZTogUG9seWxpbmU7XG4gICAgdGFwTGluZTogUG9seWxpbmU7XG4gICAgdGFwTWFya2VyOiBhbnk7XG4gICAgZ3BzTWFya2VyOiBNYXJrQ29udGFpbmVyO1xuICAgIGNlbnRlcmVkT25Mb2NhdGlvbjogYm9vbGVhbiA9IGZhbHNlO1xuXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSBtYXJrTWFuYWdlclNlcnZpY2U6IE1hcmtNYW5hZ2VyU2VydmljZSxcbiAgICAgICAgcHJpdmF0ZSBleHRlcm5hbE1hcFNlcnZpY2U6IEV4dGVybmFsTWFwU2VydmljZSkge1xuICAgICAgICBpZiAoIWdlb2xvY2F0aW9uLmlzRW5hYmxlZCgpKSB7XG4gICAgICAgICAgICBnZW9sb2NhdGlvbi5lbmFibGVMb2NhdGlvblJlcXVlc3QoKTtcbiAgICAgICAgfVxuXG4gICAgfVxuXG4gICAgbmdPbkluaXQoKSB7XG5cbiAgICB9XG5cbiAgICAvL1B1YmxpYyBNZXRob2RzXG4gICAgcHVibGljIGFkZEZyaWVuZG5NYXJrKG1hcmtJbmZvOiBBZGRNYXJrZXJBcmdzLCBtYXJrSWQ6IG51bWJlcik6IHZvaWQge1xuICAgICAgICB2YXIgbWFya0NvbnRhaW5lciA9IHRoaXMubWFya01hbmFnZXJTZXJ2aWNlLmFkZEZyaWVuZE1hcmsobWFya0luZm8sIG1hcmtJZCk7XG4gICAgICAgIHRoaXMubWFwVmlldy5hZGRNYXJrZXIobWFya0NvbnRhaW5lci5tYXJrKTtcbiAgICB9XG4gICAgcHVibGljIHVwZGF0ZUZyaWVuZE1hcmsobWFya0luZm86IEFkZE1hcmtlckFyZ3MsIG1hcmtJZDogbnVtYmVyKTogdm9pZCB7XG4gICAgICAgIHZhciBjb250YWluZXIgPSB0aGlzLm1hcmtNYW5hZ2VyU2VydmljZS51cGRhdGVNYXJrKG1hcmtJbmZvLCBtYXJrSWQpO1xuICAgICAgICBpZiAoY29udGFpbmVyLmlzRW5hYmxlRHJhdykge1xuXG4gICAgICAgICAgICAvL3NpIHRpZW5lIGFjdGl2YWRhIGxhIG9wY2lvbiBkZSBkaWJ1amFyXG4gICAgICAgICAgICBjb250YWluZXIubWFya0RyYXdXYXlMaXN0LkZvckVhY2goeCA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy5leHRlcm5hbE1hcFNlcnZpY2UuZ2V0V2F5UG9zaXRpb25zKFt4Lm1hcmtXcmFwcGVyLm1hcmsucG9zaXRpb24ubGF0aXR1ZGUsIHgubWFya1dyYXBwZXIubWFyay5wb3NpdGlvbi5sb25naXR1ZGVdLFxuICAgICAgICAgICAgICAgICAgICBbY29udGFpbmVyLm1hcmsucG9zaXRpb24ubGF0aXR1ZGUsIGNvbnRhaW5lci5tYXJrLnBvc2l0aW9uLmxvbmdpdHVkZV0sXG4gICAgICAgICAgICAgICAgICAgIFdheU1vZGVFbnVtLmRyaXZpbmcpLnN1YnNjcmliZShwb2ludHMgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5kcmF3V2F5KHgsIHBvaW50cyk7XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgcHVibGljIHJlbW92ZUNvbW1vbk1hcmsobWFya0luZm86IEFkZE1hcmtlckFyZ3MsIG1hcmtJZDogbnVtYmVyKTogdm9pZCB7XG4gICAgICAgIHRoaXMubWFya01hbmFnZXJTZXJ2aWNlLnJlbW92ZU1hcmsobWFya0lkKTtcbiAgICB9XG4gICAgcHVibGljIGVuYWJsZURyYXdXYXlUb01lKG1hcmtJZDogbnVtYmVyKTogdm9pZCB7XG4gICAgICAgIC8vQWN0aXZhIGxhIG9wY2lvbiBkZSBkaWJ1amFyIGNhbWlubyBkZXNkZSBsYSBtYXJrSWQgaGFzdGEgbGEgcG9zaXRpb24gZGUgTWVcbiAgICAgICAgdGhpcy5tYXJrTWFuYWdlclNlcnZpY2UuZW5hYmxlRHJhd1dheVRvTWUobWFya0lkKTtcbiAgICB9XG4gICAgcHVibGljIGRpc2FibGVEcmF3V2F5VG9NZShtYXJrSWQ6IG51bWJlcik6IHZvaWQge1xuICAgICAgICAvL0FjdGl2YSBsYSBvcGNpb24gZGUgZGlidWphciBjYW1pbm8gZGVzZGUgbGEgbWFya0lkIGhhc3RhIGxhIHBvc2l0aW9uIGRlIE1lXG4gICAgICAgIHRoaXMubWFya01hbmFnZXJTZXJ2aWNlLmRpc2FibGVEcmF3V2F5VG9NZShtYXJrSWQpO1xuICAgIH1cbiAgICAvL1ByaXZhdGUgTWV0aG9kc1xuICAgIHByaXZhdGUgZW5hYmxlTG9jYXRpb24oKSB7XG4gICAgICAgIGlmICghZ2VvbG9jYXRpb24uaXNFbmFibGVkKCkpIHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCdMb2NhdGlvbiBub3QgZW5hYmxlZCwgcmVxdWVzdGluZy4nKTtcbiAgICAgICAgICAgIHJldHVybiBnZW9sb2NhdGlvbi5lbmFibGVMb2NhdGlvblJlcXVlc3QoKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUodHJ1ZSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwcml2YXRlIGdldExvY2F0aW9uKCkge1xuICAgICAgICBpZiAoZ2VvbG9jYXRpb24uaXNFbmFibGVkKCkpIHtcbiAgICAgICAgICAgIHZhciBsb2NhdGlvbiA9IGdlb2xvY2F0aW9uLmdldEN1cnJlbnRMb2NhdGlvbih0aGlzLmdldExvY2F0aW9uT2JqZWN0UGFyYW1ldGVyKCkpO1xuICAgICAgICAgICAgcmV0dXJuIGxvY2F0aW9uO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBQcm9taXNlLnJlamVjdCgnR2VvbG9jYXRpb24gbm90IGVuYWJsZWQuJyk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBnZXRMb2NhdGlvbk9iamVjdFBhcmFtZXRlcigpIHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIGRlc2lyZWRBY2N1cmFjeTogMTAsXG4gICAgICAgICAgICB1cGRhdGVEaXN0YW5jZTogMTAsXG4gICAgICAgICAgICBtaW5pbXVtVXBkYXRlVGltZTogMTAwMFxuICAgICAgICB9O1xuICAgIH1cbiAgICAvL01hcCBldmVudHNcbiAgICAvL01hcCBFdmVudHMgLSBQdWJsaWMgTWV0aG9kc1xuICAgIHB1YmxpYyBvbk1hcFJlYWR5KGV2ZW50LCBtYXBSZWFkeU5vdGlmeTogKCkgPT4gdm9pZCkge1xuICAgICAgICBpZiAodGhpcy5tYXBWaWV3IHx8ICFldmVudC5vYmplY3QpIHJldHVybjtcbiAgICAgICAgdGhpcy5tYXBWaWV3ID0gZXZlbnQub2JqZWN0O1xuICAgICAgICB0aGlzLm1hcFZpZXcuc2V0U3R5bGUoc3R5bGUpO1xuICAgICAgICAvL05vdGlmaWNvIGN1YW5kbyBlbCBtYXBhIGVzdGEgbGlzdG9cbiAgICAgICAgdGhpcy5tYXBWaWV3Lm5vdGlmeU1hcFJlYWR5ID0gKCkgPT4ge1xuICAgICAgICAgICAgbWFwUmVhZHlOb3RpZnkoKTtcbiAgICAgICAgfVxuICAgICAgICAvLyB0aGlzLm1hcFZpZXcubWFya2VyU2VsZWN0ID0gdGhpcy5vbk1hcmtlclNlbGVjdDtcbiAgICAgICAgLy8gdGhpcy5tYXBWaWV3LmNhbWVyYUNoYW5nZWQgPSB0aGlzLm9uQ2FtZXJhQ2hhbmdlZDtcblxuICAgICAgICB0aGlzLmVuYWJsZUxvY2F0aW9uKClcbiAgICAgICAgICAgIC50aGVuKCgpID0+IHtcbiAgICAgICAgICAgICAgICB2YXIgbG9jYXRpb24gPSB0aGlzLmdldExvY2F0aW9uKCk7XG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgLnRoZW4oKCkgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMud2F0Y2hJZCA9IGdlb2xvY2F0aW9uLndhdGNoTG9jYXRpb24oKHApID0+IHsgdGhpcy5sb2NhdGlvblJlY2VpdmVkKHApIH0sIHRoaXMuZXJyb3IsXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZ2V0TG9jYXRpb25PYmplY3RQYXJhbWV0ZXIoKSk7XG4gICAgICAgICAgICB9LCB0aGlzLmVycm9yKTtcbiAgICB9O1xuXG5cbiAgICBwdWJsaWMgbWFwVGFwcGVkKGV2ZW50KSB7XG4gICAgICAgIGNvbnNvbGUubG9nKCdNYXAgVGFwcGVkJyk7XG4gICAgfTtcbiAgICAvL01hcCBFdmVudHMgLSBQcml2YXRlIE1ldGhvZHNcbiAgICBwcml2YXRlIGFkZE1hcmtUb01hcChtYXJrOiBNYXJrZXIpIHtcbiAgICAgICAgaWYgKCF0aGlzLm1hcFZpZXcgfHwgIW1hcmsgfHwgIW1hcmsucG9zaXRpb24pIHJldHVybjtcbiAgICAgICAgdGhpcy5tYXBWaWV3LmFkZE1hcmtlcihtYXJrKTtcbiAgICB9O1xuICAgIC8vRmxhZyBwcmltZXJhIGNvbmZpZ3VyYWNpb25cbiAgICBwcml2YXRlIGZpcnN0Q29uZmlndXJhdGlvbk1hcCA9IGZhbHNlO1xuICAgIHByaXZhdGUgbG9jYXRpb25SZWNlaXZlZCA9IChwb3NpdGlvbjogUG9zaXRpb24pID0+IHtcbiAgICAgICAgaWYgKHRoaXMubWFwVmlldyAmJiBwb3NpdGlvbiAmJiAhdGhpcy5maXJzdENvbmZpZ3VyYXRpb25NYXApIHtcbiAgICAgICAgICAgIHRoaXMubWFwVmlldy5sYXRpdHVkZSA9IHBvc2l0aW9uLmxhdGl0dWRlO1xuICAgICAgICAgICAgdGhpcy5tYXBWaWV3LmxvbmdpdHVkZSA9IHBvc2l0aW9uLmxvbmdpdHVkZTtcbiAgICAgICAgICAgIHRoaXMubWFwVmlldy56b29tID0gMTM7XG4gICAgICAgICAgICB0aGlzLmNlbnRlcmVkT25Mb2NhdGlvbiA9IHRydWU7XG4gICAgICAgICAgICB0aGlzLmZpcnN0Q29uZmlndXJhdGlvbk1hcCA9IHRydWU7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKCF0aGlzLm1hcmtNYW5hZ2VyU2VydmljZS5oYXNNZSkge1xuICAgICAgICAgICAgdmFyIG1hcmtDb250YWluZXIgPSB0aGlzLm1hcmtNYW5hZ2VyU2VydmljZS5hZGRNZU1hcmsocG9zaXRpb24ubGF0aXR1ZGUsIHBvc2l0aW9uLmxvbmdpdHVkZSk7XG4gICAgICAgICAgICB0aGlzLm1hcFZpZXcuYWRkTWFya2VyKG1hcmtDb250YWluZXIubWFyaylcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMubG9jYXRpb25SZWNlaXZlZE1hcEJlaGF2aW9yKCk7XG4gICAgICAgICAgICB0aGlzLm1hcmtNYW5hZ2VyU2VydmljZS5tb3ZlTWUocG9zaXRpb24ubGF0aXR1ZGUsIHBvc2l0aW9uLmxvbmdpdHVkZSk7XG4gICAgICAgIH1cbiAgICB9O1xuICAgIHByaXZhdGUgbG9jYXRpb25SZWNlaXZlZE1hcEJlaGF2aW9yKCk6IHZvaWQge1xuICAgICAgICAvL1RPRE86IEVzdGUgbWV0b2RvIGRlYmUgZGUgc2VyIGN1c3RvbWl6YWRvIHBhcmEgcXVlIGVsIGNvbXBvcnRhbWllbnRvIGRlcGVuZGEgZGUgc2kgZnVlIG8gbm8gdG9jYWRvIGVsIG1hcGFcbiAgICAgICAgdGhpcy5tYXBWaWV3LmxhdGl0dWRlID0gdGhpcy5tYXJrTWFuYWdlclNlcnZpY2UubWUucG9zaXRpb24ubGF0aXR1ZGU7XG4gICAgICAgIHRoaXMubWFwVmlldy5sb25naXR1ZGUgPSB0aGlzLm1hcmtNYW5hZ2VyU2VydmljZS5tZS5wb3NpdGlvbi5sb25naXR1ZGU7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBhZGRQb2ludFRvTGluZShhcmdzOiBBZGRMaW5lQXJncykge1xuICAgICAgICBpZiAoIXRoaXMubWFwVmlldyB8fCAhYXJncyB8fCAhYXJncy5sb2NhdGlvbikgcmV0dXJuO1xuICAgICAgICBsZXQgbGluZSA9IGFyZ3MubGluZTtcbiAgICAgICAgaWYgKCFsaW5lKSB7XG4gICAgICAgICAgICBsaW5lID0gbmV3IFBvbHlsaW5lKCk7XG4gICAgICAgICAgICBsaW5lLnZpc2libGUgPSB0cnVlO1xuICAgICAgICAgICAgbGluZS53aWR0aCA9IGFyZ3Mud2lkdGggfHwgMTA7XG4gICAgICAgICAgICBsaW5lLmNvbG9yID0gYXJncy5jb2xvciB8fCBuZXcgQ29sb3IoJ1JlZCcpO1xuICAgICAgICAgICAgbGluZS5nZW9kZXNpYyA9IGFyZ3MuZ2VvZGVzaWMgIT0gdW5kZWZpbmVkID8gYXJncy5nZW9kZXNpYyA6IHRydWU7XG4gICAgICAgICAgICB0aGlzLm1hcFZpZXcuYWRkUG9seWxpbmUobGluZSk7XG4gICAgICAgIH1cbiAgICAgICAgbGluZS5hZGRQb2ludChQb3NpdGlvbi5wb3NpdGlvbkZyb21MYXRMbmcoYXJncy5sb2NhdGlvbi5sYXRpdHVkZSwgYXJncy5sb2NhdGlvbi5sb25naXR1ZGUpKTtcbiAgICAgICAgcmV0dXJuIGxpbmU7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBlcnJvcihlcnIpIHtcbiAgICAgICAgY29uc29sZS5sb2coJ0Vycm9yOiAnICsgSlNPTi5zdHJpbmdpZnkoZXJyKSk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBvbk1hcmtlclNlbGVjdChldmVudCkge1xuICAgICAgICBjb25zb2xlLmxvZygnQ2xpY2tlZCBvbiAnICsgZXZlbnQubWFya2VyLnRpdGxlKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIG9uQ2FtZXJhQ2hhbmdlZChldmVudCkge1xuICAgICAgICBjb25zb2xlLmxvZygnQ2FtZXJhIGNoYW5nZWQ6ICcgKyBKU09OLnN0cmluZ2lmeShldmVudC5jYW1lcmEpKTtcbiAgICB9XG5cblxuXG5cblxuICAgIC8vVGVzdFxuICAgIC8vZGlidWphIHVuIGNhbWlubywgY29uIGxhcyBwb3NpdGlvbnMgcXVlIHJlY2liZSBjb21vIHBhcmFtZXRyb1xuICAgIHByaXZhdGUgZHJhd1dheShtYXJrV3JhcHBlckNvbmZpZ3VyYXRpb246IE1hcmtXcmFwcGVyQ29uZmlndXJhdGlvbiwgcG9zaXRpb25zOiBMaXN0PFBvc2l0aW9uPik6IHZvaWQge1xuICAgICAgICBpZiAobWFya1dyYXBwZXJDb25maWd1cmF0aW9uLnBvbHlsaW5lICE9IG51bGwpXG4gICAgICAgICAgICBtYXJrV3JhcHBlckNvbmZpZ3VyYXRpb24ucG9seWxpbmUucmVtb3ZlQWxsUG9pbnRzKCk7XG4gICAgICAgICAgICBcbiAgICAgICAgcG9zaXRpb25zLkZvckVhY2goaXRlbSA9PiB7XG4gICAgICAgICAgICBtYXJrV3JhcHBlckNvbmZpZ3VyYXRpb24ucG9seWxpbmUgPSB0aGlzLmFkZFBvaW50VG9MaW5lKHtcbiAgICAgICAgICAgICAgICBjb2xvcjogbmV3IENvbG9yKCdQaW5rJyksXG4gICAgICAgICAgICAgICAgbGluZTogbWFya1dyYXBwZXJDb25maWd1cmF0aW9uLnBvbHlsaW5lLFxuICAgICAgICAgICAgICAgIGxvY2F0aW9uOiBpdGVtLFxuICAgICAgICAgICAgICAgIGdlb2Rlc2ljOiB0cnVlLFxuICAgICAgICAgICAgICAgIHdpZHRoOiAxMFxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgIH1cbn1cblxuXG5cbiJdfQ==