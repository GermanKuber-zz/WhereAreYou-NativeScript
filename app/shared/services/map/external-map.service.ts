import { Injectable } from "@angular/core";
import { Observable } from "rxjs/Rx";
import "rxjs/add/operator/do";
import "rxjs/add/operator/map";
import 'rxjs/add/operator/catch';

import { Http, Response } from '@angular/http';
import { List } from 'linqts';
import { Position } from 'nativescript-google-maps-sdk';

@Injectable()
export class ExternalMapService {
    private appKey = "AIzaSyC1ZzjAD91N4cf6CKon2aiNAFoju9V6R3I";
    private apiUrl = "https://maps.googleapis.com/maps/api"
    constructor(private http: Http) {


    }

    public getDistance(getDistance: GetDistanceRequest, typeWay: WayModeEnum): Observable<GetDistanceResponse> {
       //TODO: Este metodo debe de pegarle a todas las direcciones, debe de eliminarse el break dentro del for
       //pero actualmente se rompe al sacar ese break y

        var destinations = "";
        for (var item of getDistance.destination) {
            destinations = destinations + `${item.destination.latitude},${item.destination.longitude}|`

        }

        if (destinations.length > 0)
            destinations = destinations.substring(0, destinations.length - 1);

        var apiUrlLocal = `${this.apiUrl}/distancematrix/json?origins=${getDistance.origin.latitude},${getDistance.origin.longitude}&destinations=${destinations}&mode=${typeWay}&language=es-ES&key=${this.appKey}`;
        try {
            return this.http.get(apiUrlLocal)
                .map(x => {
                    var data: google.maps.DistanceMatrixResponse = this.extractData(x);
                    var returnData = new GetDistanceResponse(getDistance, data.rows);
                    return returnData;
                })
                .catch(this.handleError);

        } catch (e) {
            var a = e;
        }

    }
    //Public Methods
    public getWayPositions(origin: [number, number], destination: [number, number], typeWay: WayModeEnum): Observable<List<Position>> {
        return this.http.get(`${this.apiUrl}/directions/json?origin=${origin[0]},${origin[1]}&destination=${destination[0]},${destination[1]}&avoid=highways&mode=${typeWay}&key=${this.appKey}`)
            .map(x => {
                var data: google.maps.DirectionsResult = this.extractData(x);
                var returnList = new List<Position>();
                for (var item of data.routes[0].legs[0].steps) {
                    var newPStartosition = new Position();
                    newPStartosition.latitude = (<any>item).start_location.lat;
                    newPStartosition.longitude = (<any>item).start_location.lng;
                    returnList.Add(newPStartosition);
                    var newEndPosition = new Position();
                    newEndPosition.latitude = (<any>item.end_location).lat;
                    newEndPosition.longitude = (<any>item.end_location).lng;
                    returnList.Add(newEndPosition);
                }
                return returnList;
            })
            .catch(this.handleError);
    }

    //Private Methods
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
        return (<any>body) || {};
    }

}

export class WayModeEnum {
    static driving = "driving";
    static walking = "walking";
    static bicycling = "bicycling";
    static transit = "transit";
}
export class GetDistanceRequest {
    id: number;
    origin: Position;
    destination: Array<DistanceRequestWrapper> = new Array<DistanceRequestWrapper>();
}
export class DistanceRequestWrapper {
    constructor(public id: number, public destination: Position) { }
}

export class GetDistanceResponse {
    id: number;
    origin: Position;
    destination: Array<DistanceResponseWrapper> = new Array<DistanceResponseWrapper>();;
    constructor(distanceRequest: GetDistanceRequest, response: google.maps.DistanceMatrixResponseRow[]) {
        this.id = distanceRequest.id;
        this.origin = distanceRequest.origin;
        var count = 0;
        for (var item of distanceRequest.destination) {
            var distance = response[count].elements[0].distance.value;
            var newRes = new DistanceResponseWrapper(item, distance);
            this.destination.push(newRes);
            ++count;
        }
    }
}
export class DistanceResponseWrapper {
    id: number;
    destination: Position;

    constructor(distanceRequestWrapper: DistanceRequestWrapper,
        public distance: number) {
        this.id = distanceRequestWrapper.id;
        this.destination = distanceRequestWrapper.destination;
    }

}