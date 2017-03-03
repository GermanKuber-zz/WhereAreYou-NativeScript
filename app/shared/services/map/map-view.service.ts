import { Injectable } from "@angular/core";
import { Observable } from "rxjs/Rx";
import "rxjs/add/operator/do";
import "rxjs/add/operator/map";
import 'rxjs/add/operator/catch';
import { Image } from "ui/image";
import { MapView, Marker, Polyline, Position } from 'nativescript-google-maps-sdk';
var mapsModule = require("nativescript-google-maps-sdk");
let geolocation = require('nativescript-geolocation');
var style = require('./map-style.json');
import { Color } from 'color';
import { FriendsService } from '../../../shared/friends/friends.service';
import { Http, Response } from '@angular/http';
import { routes } from '../../../app.routing';
import { List } from 'linqts';
import { MarkWrapper, MarkWrapperTypeEnum, AddMarkerArgs, AddLineArgs, MarkContainer, MarkWrapperConfiguration } from './core/MarkContainer';
import { MarkManagerService } from './mark-manager.service';
import { ExternalMapService, WayModeEnum } from './external-map.service';
@Injectable()
export class MapViewService {
    //#Mapa 
    private mapView: MapView = null;
    watchId: number = null;
    gpsLine: Polyline;
    testLine: Polyline;
    tapLine: Polyline;
    tapMarker: any;
    gpsMarker: MarkContainer;
    centeredOnLocation: boolean = false;

    constructor(private markManagerService: MarkManagerService,
        private externalMapService: ExternalMapService) {
        if (!geolocation.isEnabled()) {
            geolocation.enableLocationRequest();
        }

    }

    ngOnInit() {

    }

    //Public Methods
    public addFriendnMark(markInfo: AddMarkerArgs, markId: number): void {
        var markContainer = this.markManagerService.addFriendMark(markInfo, markId);
        this.mapView.addMarker(markContainer.mark);
    }
    public updateFriendMark(markInfo: AddMarkerArgs, markId: number): void {
        var container = this.markManagerService.updateMark(markInfo, markId);
        if (container.isEnableDraw) {

            //si tiene activada la opcion de dibujar
            container.markDrawWayList.ForEach(x => {
                this.externalMapService.getWayPositions([x.markWrapper.mark.position.latitude, x.markWrapper.mark.position.longitude],
                    [container.mark.position.latitude, container.mark.position.longitude],
                    WayModeEnum.driving).subscribe(points => {
                        this.drawWay(x, points);
                    });
            });
        }
    }
    public removeCommonMark(markInfo: AddMarkerArgs, markId: number): void {
        this.markManagerService.removeMark(markId);
    }
    public enableDrawWayToMe(markId: number): void {
        //Activa la opcion de dibujar camino desde la markId hasta la position de Me
        this.markManagerService.enableDrawWayToMe(markId);
    }
    public disableDrawWayToMe(markId: number): void {
        //Activa la opcion de dibujar camino desde la markId hasta la position de Me
        this.markManagerService.disableDrawWayToMe(markId);
    }
    //Private Methods
    private enableLocation() {
        if (!geolocation.isEnabled()) {
            console.log('Location not enabled, requesting.');
            return geolocation.enableLocationRequest();
        } else {
            return Promise.resolve(true);
        }
    }

    private getLocation() {
        if (geolocation.isEnabled()) {
            var location = geolocation.getCurrentLocation(this.getLocationObjectParameter());
            return location;
        }
        return Promise.reject('Geolocation not enabled.');
    }

    private getLocationObjectParameter() {
        return {
            desiredAccuracy: 10,
            updateDistance: 10,
            minimumUpdateTime: 1000
        };
    }
    //Map events
    //Map Events - Public Methods
    public onMapReady(event, mapReadyNotify: () => void) {
        if (this.mapView || !event.object) return;
        this.mapView = event.object;
        this.mapView.setStyle(style);
        //Notifico cuando el mapa esta listo
        this.mapView.notifyMapReady = () => {
            mapReadyNotify();
        }
        // this.mapView.markerSelect = this.onMarkerSelect;
        // this.mapView.cameraChanged = this.onCameraChanged;

        this.enableLocation()
            .then(() => {
                var location = this.getLocation();
            })
            .then(() => {
                this.watchId = geolocation.watchLocation((p) => { this.locationReceived(p) }, this.error,
                    this.getLocationObjectParameter());
            }, this.error);
    };


    public mapTapped(event) {
        console.log('Map Tapped');
    };
    //Map Events - Private Methods
    private addMarkToMap(mark: Marker) {
        if (!this.mapView || !mark || !mark.position) return;
        this.mapView.addMarker(mark);
    };
    //Flag primera configuracion
    private firstConfigurationMap = false;
    private locationReceived = (position: Position) => {
        if (this.mapView && position && !this.firstConfigurationMap) {
            this.mapView.latitude = position.latitude;
            this.mapView.longitude = position.longitude;
            this.mapView.zoom = 13;
            this.centeredOnLocation = true;
            this.firstConfigurationMap = true;
        }
        if (!this.markManagerService.hasMe) {
            var markContainer = this.markManagerService.addMeMark(position.latitude, position.longitude);
            this.mapView.addMarker(markContainer.mark)
        } else {
            this.locationReceivedMapBehavior();
            this.markManagerService.moveMe(position.latitude, position.longitude);
        }
    };
    private locationReceivedMapBehavior(): void {
        //TODO: Este metodo debe de ser customizado para que el comportamiento dependa de si fue o no tocado el mapa
        this.mapView.latitude = this.markManagerService.me.position.latitude;
        this.mapView.longitude = this.markManagerService.me.position.longitude;
    }

    private addPointToLine(args: AddLineArgs) {
        if (!this.mapView || !args || !args.location) return;
        let line = args.line;
        if (!line) {
            line = new Polyline();
            line.visible = true;
            line.width = args.width || 10;
            line.color = args.color || new Color('Red');
            line.geodesic = args.geodesic != undefined ? args.geodesic : true;
            this.mapView.addPolyline(line);
        }
        line.addPoint(Position.positionFromLatLng(args.location.latitude, args.location.longitude));
        return line;
    }

    private error(err) {
        console.log('Error: ' + JSON.stringify(err));
    }

    private onMarkerSelect(event) {
        console.log('Clicked on ' + event.marker.title);
    }

    private onCameraChanged(event) {
        console.log('Camera changed: ' + JSON.stringify(event.camera));
    }





    //Test
    //dibuja un camino, con las positions que recibe como parametro
    private drawWay(markWrapperConfiguration: MarkWrapperConfiguration, positions: List<Position>): void {
        if (markWrapperConfiguration.polyline != null)
            markWrapperConfiguration.polyline.removeAllPoints();
            
        positions.ForEach(item => {
            markWrapperConfiguration.polyline = this.addPointToLine({
                color: new Color('Pink'),
                line: markWrapperConfiguration.polyline,
                location: item,
                geodesic: true,
                width: 10
            });
        });
    }
}



