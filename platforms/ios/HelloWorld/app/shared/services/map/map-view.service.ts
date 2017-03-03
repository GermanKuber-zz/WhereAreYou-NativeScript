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
@Injectable()
export class MapViewService {
    //#Mapa 
    private mapView: MapView = null;
    watchId: number = null;
    gpsLine: Polyline;
    testLine: Polyline;
    tapLine: Polyline;
    tapMarker: any;
    gpsMarker: MarkWrapper;
    centeredOnLocation: boolean = false;
    private markList: Array<MarkWrapper> = new Array<MarkWrapper>();
    constructor(private friendService: FriendsService,
        private http: Http) {
        if (!geolocation.isEnabled()) {
            geolocation.enableLocationRequest();

        }

    }

    ngOnInit() {

    }

    //Private Methods
    public createMarkWrapper(markInfo: AddMarkerArgs, markId: number, markType: MarkWrapperTypeEnum): MarkWrapper {
        //Creo un MarkWrapper el cual relaciona el Marker con el id del usuario dibujado
        var mark = new AddMarkerArgs();
        mark.title = markInfo.title;
        mark.location = new Position();
        mark.location.latitude = markInfo.location.latitude;
        mark.location.longitude = markInfo.location.longitude;

        var mapMark: Marker = null;
        if (markType == MarkWrapperTypeEnum.Me)
            mapMark = this.createMark(mark, "~/images/me-marker.png");
        else
            mapMark = this.createMark(mark);
        var markWrapper = new MarkWrapper(mapMark, markType);
        markWrapper.markId = markId;
        return markWrapper;
    }
    private getMarkWrapper(markId: number): MarkWrapper {
        //Regreso un markWrapper por ID
        for (var item of this.markList)
            if (item.markId == markId)
                return item;

    }
    //Public Methods
    public addCommonMark(markInfo: AddMarkerArgs, markId: number): void {
        var markWrapper = this.createMarkWrapper(markInfo, markId, MarkWrapperTypeEnum.Friend);
        this.markList.push(markWrapper);
        this.mapView.addMarker(markWrapper.mark);


    }
    public updateCommonMark(markInfo: AddMarkerArgs, markId: number): void {
        var markWrapper = this.getMarkWrapper(markId);
        if (markWrapper != null) {
            // this.mapView.removeMarker(markWrapper.mark);
            markWrapper.mark.position = markInfo.location;
            // this.mapView.addMarker(markWrapper.mark);
            if (this.first) {
                this.first = false;
                this.getHeroes().subscribe(x => {
                    var response: google.maps.DirectionsResult = x.json();
                    var positions: Array<Position> = new Array<Position>();
                    for (var item of response.routes[0].legs[0].steps) {
                        var start: any = item.start_location;
                        var end: any = item.end_location;
                        var positionStart = Position.positionFromLatLng(start.lat, start.lng);
                        positions.push(positionStart);
                        var positionEnd = Position.positionFromLatLng(end.lat, end.lng);
                        positions.push(positionEnd);
                    }
                    this.drawWay(positions)
                });
            }
        }
    }
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
    public removeCommonMark(markInfo: AddMarkerArgs, markId: number): void {
        var markWrapper = this.getMarkWrapper(markId);
        this.mapView.removeMarker(markWrapper.mark);
    }


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
    getDistance(loc1, loc2) {
        console.log("Distance between loc1 and loc2 is: " + geolocation.distance(loc1, loc2));
    }
    mapTapped = (event) => {
        console.log('Map Tapped');

        this.tapLine = this.addPointToLine({
            color: new Color('Red'),
            line: this.tapLine,
            location: event.position,
            geodesic: true,
            width: 10
        });

        this.removeMarker(this.tapMarker);
        this.tapMarker = this.addMarker({
            location: event.position,
            title: 'Tap Location'
        });
    };
    addMarker(args: AddMarkerArgs) {
        if (!this.mapView || !args || !args.location) return;

        let marker = new Marker();
        marker.position = Position.positionFromLatLng(args.location.latitude, args.location.longitude);
        marker.title = args.title;
        marker.snippet = args.title;
        this.mapView.addMarker(marker);

        return marker;
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
        if (this.gpsMarker == null) {
            var mark = this.createMark({
                location: position,
                title: 'GPS Location'
            }, "~/images/me-marker.png");
            var markInfo = new AddMarkerArgs();
            markInfo.title = "Principal";
            markInfo.location = position;
            var wrp = this.createMarkWrapper(markInfo, 1234, MarkWrapperTypeEnum.Me);
            this.markList.push(wrp);
            this.gpsMarker = wrp;
            this.mapView.addMarker(wrp.mark)

        } else {
            this.mapView.latitude = position.latitude;
            this.mapView.longitude = position.longitude;
            var wrp = this.getMarkWrapper(1234);
            this.mapView.removeMarker(wrp.mark);
            wrp.mark.position.latitude = position.latitude;
            wrp.mark.position.longitude = position.longitude;
            this.mapView.addMarker(wrp.mark)
            // this.gpsLine = this.addPointToLine({
            //     color: new Color('Green'),
            //     line: this.gpsLine,
            //     location: position,
            //     geodesic: true,
            //     width: 10
            // });

            this.getDistance(this.markList[0].mark.position, wrp.mark.position);

        }
    };

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
    private createMark(args: AddMarkerArgs, imgSrc: string = "~/images/friend-marker.png"): Marker {
        if (!this.mapView || !args || !args.location) return;

        let mark = new Marker();
        mark.position = Position.positionFromLatLng(args.location.latitude, args.location.longitude);
        mark.title = args.title;
        mark.snippet = args.title;
        var image = new Image();
        image.src = imgSrc;
        image.width = 10;
        image.height = 10;
        mark.icon = image;

        // (<any>mark).infoWindowTemplate = '~/shared/services/map/info-window';
        // this.mapView.addMarker(mark);
        //mark.showInfoWindow();

        //   var  markers = new mapsModule.Marker();
        //     markers.position = mapsModule.Position.positionFromLatLng(-33.66, 151.20);
        //     markers.title = "Seeeeeeeeeeee";
        //     (<any>markers).infoWindowTemplate = '~/shared/services/map/info-window';
        //      this.mapView.addMarker(markers);
        //     markers.showInfoWindow();

        return mark;
    };

    private clearGpsLine() {
        this.removeLine(this.gpsLine);
        this.gpsLine = null;

    };

    private clearTapLine() {
        this.removeLine(this.tapLine);
        this.tapLine = null;
        this.removeMarker(this.tapMarker);
        this.tapMarker = null;

    }

    private removeLine(line: Polyline) {
        if (line) {
            line.removeAllPoints();
        }
    }

    private removeMarker(marker: Marker) {
        if (this.mapView && marker) {
            this.mapView.removeMarker(marker);
        }
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
}


export class AddLineArgs {
    public color: Color;
    public line: Polyline;
    public location: Position;
    public geodesic: boolean;
    public width: number;
}

export class AddMarkerArgs {
    public location: Position;
    public title: string;
}

class MarkWrapper {
    markId: number;
    private markDrawWayList: Array<MarkWrapper> = new Array<MarkWrapper>();
    constructor(public mark: Marker, private markType: MarkWrapperTypeEnum) { }
    addMarkDrawWay(mark :MarkWrapper){

    }
}
enum MarkWrapperTypeEnum {
    Friend,
    Me,
    Group
}