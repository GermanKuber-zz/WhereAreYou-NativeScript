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
import { MarkWrapper, MarkWrapperTypeEnum, AddMarkerArgs, AddLineArgs, MarkContainer } from './core/MarkContainer';
import { MarkManagerService } from './mark-manager.service';
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

    constructor(private friendService: FriendsService,
        private markManagerService: MarkManagerService,
        private http: Http) {
        if (!geolocation.isEnabled()) {
            geolocation.enableLocationRequest();
        }

    }

    ngOnInit() {

    }



    //Public Methods
    public addFriendnMark(markInfo: AddMarkerArgs, markId: number): void {
        this.markManagerService.addFriendMark(markInfo, markId);
    }
    public updateCommonMark(markInfo: AddMarkerArgs, markId: number): void {
        this.markManagerService.updateMark(markInfo, markId);
    }
    public removeCommonMark(markInfo: AddMarkerArgs, markId: number): void {
        this.markManagerService.removeMark(markId);
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
            var location = geolocation.getCurrentLocation({
                desiredAccuracy: 10,
                updateDistance: 10,
                minimumUpdateTime: 1000,
                maximumAge: 10000
            })
            return location;
        }
        return Promise.reject('Geolocation not enabled.');
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
                this.watchId = geolocation.watchLocation((p) => { this.locationReceived(p) }, this.error, {
                    desiredAccuracy: 50,
                    updateDistance: 50,
                    minimumUpdateTime: 10000,
                    maximumAge: 60000
                });
            }, this.error);
    };

    //TODO: Asignarle Tipo a Events
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
            this.mapView.zoom = 2;
            this.centeredOnLocation = true;
            this.firstConfigurationMap = true;
        }
        if (this.markManagerService.me == null) {
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
    private first = true;
    getHeroes(): Observable<Response> {
        return this.http.get("https://maps.googleapis.com/maps/api/directions/json?origin=Toronto&destination=Montreal&avoid=highways&mode=driving&key=AIzaSyC1ZzjAD91N4cf6CKon2aiNAFoju9V6R3I")
            .catch(this.handleError);
    }
    private handleError(error: Response | any): any {
        // In a real world app, we might use a remote logging infrastructure
        let errMsg: string;
        if (error instanceof Response) {
            const body = error.json() || '';
            const err = (<any>body).error || JSON.stringify(body);
            errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
        } else {
            errMsg = error.message ? error.message : error.toString();
        }
        console.error(errMsg);
        return Observable.throw(errMsg);
    }
    private extractData(res: Response): any {
        let body = res.json();
        return (<any>body).data || {};
    }

    //dibuja un camino, con las positions que recibe como parametro
    private drawWay(positions: Array<Position>): void {
        var poli: Polyline;
        for (var item of positions) {

            poli = this.addPointToLine({
                color: new Color('Pink'),
                line: poli,
                location: item,
                geodesic: true,
                width: 10
            });

        }
    }

}

