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
    constructor(private http: Http) {


    }

    //Public Methods
    public getWayPositions(origin: [number, number], destination: [number, number], typeWay: WayModeEnum): Observable<List<Position>> {
        return this.http.get(`https://maps.googleapis.com/maps/api/directions/json?origin=${origin[0]},${origin[1]}&destination=${destination[0]},${destination[1]}&avoid=highways&mode=${typeWay}&key=${this.appKey}`)
            .map(x => {
                var data: google.maps.DirectionsResult = this.extractData(x);
                var returnList = new List<Position>();
                for (var item of data.routes[0].legs) {
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