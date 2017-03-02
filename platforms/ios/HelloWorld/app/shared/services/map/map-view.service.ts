import { Injectable } from "@angular/core";
import { Observable } from "rxjs/Rx";
import "rxjs/add/operator/do";
import "rxjs/add/operator/map";
import { MapView, Marker, Polyline, Position } from 'nativescript-google-maps-sdk';
let geolocation = require('nativescript-geolocation');
var style = require('./map-style.json');
import { Color } from 'color';
import { FriendsService } from '../../../shared/friends/friends.service';
@Injectable()
export class MapViewService {
    //#Mapa 
    private mapView: MapView = null;
    watchId: number = null;
    gpsLine: Polyline;
    tapLine: Polyline;
    tapMarker: any;
    gpsMarker: any;
    centeredOnLocation: boolean = false;
    private markList: Array<MarkWrapper> = new Array<MarkWrapper>();
    constructor(private friendService: FriendsService) {
        if (!geolocation.isEnabled()) {
            geolocation.enableLocationRequest();
        }
    }

    ngOnInit() {

        // this.groceryListService.load()
        // .subscribe(loadedGroceries => {
        //   loadedGroceries.forEach((groceryObject) => {
        //     this.groceryList.unshift(groceryObject);
        //   });
        //   this.isLoading = false;
        //   this.listLoaded = true;
        // });
    }

    //Private Methods
    public createMarkWrapper(markInfo: AddMarkerArgs, markId: number): MarkWrapper {
        //Creo un MarkWrapper el cual relaciona el Marker con el id del usuario dibujado
        var mark = new AddMarkerArgs();
        mark.title = markInfo.title;
        mark.location = new Position();
        mark.location.latitude = markInfo.location.latitude;
        mark.location.longitude = markInfo.location.longitude;
        var mapMark: Marker = this.addMarker(mark);
        var markWrapper = new MarkWrapper();
        markWrapper.markId = markId;
        markWrapper.mark = mapMark;
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
        var markWrapper = this.createMarkWrapper(markInfo, markId);
        this.markList.push(markWrapper);
        this.mapView.addMarker(markWrapper.mark);

    }
    public updateCommonMark(markInfo: AddMarkerArgs, markId: number): void {
        var markWrapper = this.getMarkWrapper(markId);
        if (markWrapper != null) {
            this.mapView.removeMarker(markWrapper.mark);
            markWrapper.mark.position = markInfo.location;
            this.mapView.addMarker(markWrapper.mark);
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
                this.watchId = geolocation.watchLocation(this.locationReceived, this.error, {
                    desiredAccuracy: 10,
                    updateDistance: 10,
                    minimumUpdateTime: 10000,
                    maximumAge: 60000
                });
            }, this.error);

    };

    private mapTapped = (event) => {

        // console.log('Map Tapped');

        // this.tapLine = this.addPointToLine({
        //   color: new Color('Red'),
        //   line: this.tapLine,
        //   location: event.position,
        //   geodesic: true,
        //   width: 10
        // });

        // this.removeMarker(this.tapMarker);
        // this.tapMarker = this.addMarker({
        //   location: event.position,
        //   title: 'Tap Location'
        // });
    };

    private locationReceived = (position: Position) => {
        console.log('GPS Update Received');

        if (this.mapView && position) {
            this.mapView.latitude = position.latitude;
            this.mapView.longitude = position.longitude;
            this.mapView.zoom = 13;
            this.centeredOnLocation = true;
        }

        // this.gpsLine = this.addPointToLine({
        //   color: new Color('Green'),
        //   line: this.gpsLine,
        //   location: position,
        //   geodesic: true,
        //   width: 10
        // });

        this.removeMarker(this.gpsMarker);
        this.gpsMarker = this.addMarker({
            location: position,
            title: 'GPS Location'
        });
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
    private addMarker(args: AddMarkerArgs): Marker {
        if (!this.mapView || !args || !args.location) return;

        let marker = new Marker();
        marker.position = Position.positionFromLatLng(args.location.latitude, args.location.longitude);
        marker.title = args.title;
        marker.snippet = args.title;
        this.mapView.addMarker(marker);

        return marker;
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
    mark: Marker;
    markId: number;
}