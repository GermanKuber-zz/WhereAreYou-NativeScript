"use strict";
var core_1 = require("@angular/core");
var Rx_1 = require("rxjs/Rx");
require("rxjs/add/operator/do");
require("rxjs/add/operator/map");
require("rxjs/add/operator/catch");
var http_1 = require("@angular/http");
var linqts_1 = require("linqts");
var nativescript_google_maps_sdk_1 = require("nativescript-google-maps-sdk");
var ExternalMapService = (function () {
    function ExternalMapService(http) {
        this.http = http;
        this.appKey = "AIzaSyC1ZzjAD91N4cf6CKon2aiNAFoju9V6R3I";
        this.apiUrl = "https://maps.googleapis.com/maps/api";
    }
    ExternalMapService.prototype.getDistance = function (getDistance, typeWay) {
        //TODO: Este metodo debe de pegarle a todas las direcciones, debe de eliminarse el break dentro del for
        //pero actualmente se rompe al sacar ese break y
        var _this = this;
        var destinations = "";
        for (var _i = 0, _a = getDistance.destination; _i < _a.length; _i++) {
            var item = _a[_i];
            destinations = destinations + (item.destination.latitude + "," + item.destination.longitude + "|");
        }
        if (destinations.length > 0)
            destinations = destinations.substring(0, destinations.length - 1);
        var apiUrlLocal = this.apiUrl + "/distancematrix/json?origins=" + getDistance.origin.latitude + "," + getDistance.origin.longitude + "&destinations=" + destinations + "&mode=" + typeWay + "&language=es-ES&key=" + this.appKey;
        try {
            return this.http.get(apiUrlLocal)
                .map(function (x) {
                var data = _this.extractData(x);
                var returnData = new GetDistanceResponse(getDistance, data.rows);
                return returnData;
            })
                .catch(this.handleError);
        }
        catch (e) {
            var a = e;
        }
    };
    //Public Methods
    ExternalMapService.prototype.getWayPositions = function (origin, destination, typeWay) {
        var _this = this;
        return this.http.get(this.apiUrl + "/directions/json?origin=" + origin[0] + "," + origin[1] + "&destination=" + destination[0] + "," + destination[1] + "&avoid=highways&mode=" + typeWay + "&key=" + this.appKey)
            .map(function (x) {
            var data = _this.extractData(x);
            var returnList = new linqts_1.List();
            for (var _i = 0, _a = data.routes[0].legs[0].steps; _i < _a.length; _i++) {
                var item = _a[_i];
                var newPStartosition = new nativescript_google_maps_sdk_1.Position();
                newPStartosition.latitude = item.start_location.lat;
                newPStartosition.longitude = item.start_location.lng;
                returnList.Add(newPStartosition);
                var newEndPosition = new nativescript_google_maps_sdk_1.Position();
                newEndPosition.latitude = item.end_location.lat;
                newEndPosition.longitude = item.end_location.lng;
                returnList.Add(newEndPosition);
            }
            return returnList;
        })
            .catch(this.handleError);
    };
    //Private Methods
    ExternalMapService.prototype.handleError = function (error) {
        // In a real world app, we might use a remote logging infrastructure
        var errMsg;
        if (error instanceof http_1.Response) {
            var body = error.json() || '';
            var err = body.error || JSON.stringify(body);
            errMsg = error.status + " - " + (error.statusText || '') + " " + err;
        }
        else {
            errMsg = error.message ? error.message : error.toString();
        }
        console.error(errMsg);
        return Rx_1.Observable.throw(errMsg);
    };
    ExternalMapService.prototype.extractData = function (res) {
        var body = res.json();
        return body || {};
    };
    return ExternalMapService;
}());
ExternalMapService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [http_1.Http])
], ExternalMapService);
exports.ExternalMapService = ExternalMapService;
var WayModeEnum = (function () {
    function WayModeEnum() {
    }
    return WayModeEnum;
}());
WayModeEnum.driving = "driving";
WayModeEnum.walking = "walking";
WayModeEnum.bicycling = "bicycling";
WayModeEnum.transit = "transit";
exports.WayModeEnum = WayModeEnum;
var GetDistanceRequest = (function () {
    function GetDistanceRequest() {
        this.destination = new Array();
    }
    return GetDistanceRequest;
}());
exports.GetDistanceRequest = GetDistanceRequest;
var DistanceRequestWrapper = (function () {
    function DistanceRequestWrapper(id, destination) {
        this.id = id;
        this.destination = destination;
    }
    return DistanceRequestWrapper;
}());
exports.DistanceRequestWrapper = DistanceRequestWrapper;
var GetDistanceResponse = (function () {
    function GetDistanceResponse(distanceRequest, response) {
        this.destination = new Array();
        this.id = distanceRequest.id;
        this.origin = distanceRequest.origin;
        var count = 0;
        for (var _i = 0, _a = distanceRequest.destination; _i < _a.length; _i++) {
            var item = _a[_i];
            var distance = response[count].elements[0].distance.value;
            var newRes = new DistanceResponseWrapper(item, distance);
            this.destination.push(newRes);
            ++count;
        }
    }
    ;
    return GetDistanceResponse;
}());
exports.GetDistanceResponse = GetDistanceResponse;
var DistanceResponseWrapper = (function () {
    function DistanceResponseWrapper(distanceRequestWrapper, distance) {
        this.distance = distance;
        this.id = distanceRequestWrapper.id;
        this.destination = distanceRequestWrapper.destination;
    }
    return DistanceResponseWrapper;
}());
exports.DistanceResponseWrapper = DistanceResponseWrapper;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXh0ZXJuYWwtbWFwLnNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJleHRlcm5hbC1tYXAuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsc0NBQTJDO0FBQzNDLDhCQUFxQztBQUNyQyxnQ0FBOEI7QUFDOUIsaUNBQStCO0FBQy9CLG1DQUFpQztBQUVqQyxzQ0FBK0M7QUFDL0MsaUNBQThCO0FBQzlCLDZFQUF3RDtBQUd4RCxJQUFhLGtCQUFrQjtJQUczQiw0QkFBb0IsSUFBVTtRQUFWLFNBQUksR0FBSixJQUFJLENBQU07UUFGdEIsV0FBTSxHQUFHLHlDQUF5QyxDQUFDO1FBQ25ELFdBQU0sR0FBRyxzQ0FBc0MsQ0FBQTtJQUl2RCxDQUFDO0lBRU0sd0NBQVcsR0FBbEIsVUFBbUIsV0FBK0IsRUFBRSxPQUFvQjtRQUNyRSx1R0FBdUc7UUFDdkcsZ0RBQWdEO1FBRm5ELGlCQTJCQztRQXZCRyxJQUFJLFlBQVksR0FBRyxFQUFFLENBQUM7UUFDdEIsR0FBRyxDQUFDLENBQWEsVUFBdUIsRUFBdkIsS0FBQSxXQUFXLENBQUMsV0FBVyxFQUF2QixjQUF1QixFQUF2QixJQUF1QjtZQUFuQyxJQUFJLElBQUksU0FBQTtZQUNULFlBQVksR0FBRyxZQUFZLElBQU0sSUFBSSxDQUFDLFdBQVcsQ0FBQyxRQUFRLFNBQUksSUFBSSxDQUFDLFdBQVcsQ0FBQyxTQUFTLE1BQUcsQ0FBQSxDQUFBO1NBRTlGO1FBRUQsRUFBRSxDQUFDLENBQUMsWUFBWSxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUM7WUFDeEIsWUFBWSxHQUFHLFlBQVksQ0FBQyxTQUFTLENBQUMsQ0FBQyxFQUFFLFlBQVksQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDLENBQUM7UUFFdEUsSUFBSSxXQUFXLEdBQU0sSUFBSSxDQUFDLE1BQU0scUNBQWdDLFdBQVcsQ0FBQyxNQUFNLENBQUMsUUFBUSxTQUFJLFdBQVcsQ0FBQyxNQUFNLENBQUMsU0FBUyxzQkFBaUIsWUFBWSxjQUFTLE9BQU8sNEJBQXVCLElBQUksQ0FBQyxNQUFRLENBQUM7UUFDN00sSUFBSSxDQUFDO1lBQ0QsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLFdBQVcsQ0FBQztpQkFDNUIsR0FBRyxDQUFDLFVBQUEsQ0FBQztnQkFDRixJQUFJLElBQUksR0FBdUMsS0FBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDbkUsSUFBSSxVQUFVLEdBQUcsSUFBSSxtQkFBbUIsQ0FBQyxXQUFXLEVBQUUsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO2dCQUNqRSxNQUFNLENBQUMsVUFBVSxDQUFDO1lBQ3RCLENBQUMsQ0FBQztpQkFDRCxLQUFLLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDO1FBRWpDLENBQUM7UUFBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ1QsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQ2QsQ0FBQztJQUVMLENBQUM7SUFDRCxnQkFBZ0I7SUFDVCw0Q0FBZSxHQUF0QixVQUF1QixNQUF3QixFQUFFLFdBQTZCLEVBQUUsT0FBb0I7UUFBcEcsaUJBa0JDO1FBakJHLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBSSxJQUFJLENBQUMsTUFBTSxnQ0FBMkIsTUFBTSxDQUFDLENBQUMsQ0FBQyxTQUFJLE1BQU0sQ0FBQyxDQUFDLENBQUMscUJBQWdCLFdBQVcsQ0FBQyxDQUFDLENBQUMsU0FBSSxXQUFXLENBQUMsQ0FBQyxDQUFDLDZCQUF3QixPQUFPLGFBQVEsSUFBSSxDQUFDLE1BQVEsQ0FBQzthQUNwTCxHQUFHLENBQUMsVUFBQSxDQUFDO1lBQ0YsSUFBSSxJQUFJLEdBQWlDLEtBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDN0QsSUFBSSxVQUFVLEdBQUcsSUFBSSxhQUFJLEVBQVksQ0FBQztZQUN0QyxHQUFHLENBQUMsQ0FBYSxVQUE0QixFQUE1QixLQUFBLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssRUFBNUIsY0FBNEIsRUFBNUIsSUFBNEI7Z0JBQXhDLElBQUksSUFBSSxTQUFBO2dCQUNULElBQUksZ0JBQWdCLEdBQUcsSUFBSSx1Q0FBUSxFQUFFLENBQUM7Z0JBQ3RDLGdCQUFnQixDQUFDLFFBQVEsR0FBUyxJQUFLLENBQUMsY0FBYyxDQUFDLEdBQUcsQ0FBQztnQkFDM0QsZ0JBQWdCLENBQUMsU0FBUyxHQUFTLElBQUssQ0FBQyxjQUFjLENBQUMsR0FBRyxDQUFDO2dCQUM1RCxVQUFVLENBQUMsR0FBRyxDQUFDLGdCQUFnQixDQUFDLENBQUM7Z0JBQ2pDLElBQUksY0FBYyxHQUFHLElBQUksdUNBQVEsRUFBRSxDQUFDO2dCQUNwQyxjQUFjLENBQUMsUUFBUSxHQUFTLElBQUksQ0FBQyxZQUFhLENBQUMsR0FBRyxDQUFDO2dCQUN2RCxjQUFjLENBQUMsU0FBUyxHQUFTLElBQUksQ0FBQyxZQUFhLENBQUMsR0FBRyxDQUFDO2dCQUN4RCxVQUFVLENBQUMsR0FBRyxDQUFDLGNBQWMsQ0FBQyxDQUFDO2FBQ2xDO1lBQ0QsTUFBTSxDQUFDLFVBQVUsQ0FBQztRQUN0QixDQUFDLENBQUM7YUFDRCxLQUFLLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDO0lBQ2pDLENBQUM7SUFFRCxpQkFBaUI7SUFDVCx3Q0FBVyxHQUFuQixVQUFvQixLQUFxQjtRQUNyQyxvRUFBb0U7UUFDcEUsSUFBSSxNQUFjLENBQUM7UUFDbkIsRUFBRSxDQUFDLENBQUMsS0FBSyxZQUFZLGVBQVEsQ0FBQyxDQUFDLENBQUM7WUFDNUIsSUFBTSxJQUFJLEdBQUcsS0FBSyxDQUFDLElBQUksRUFBRSxJQUFJLEVBQUUsQ0FBQztZQUNoQyxJQUFNLEdBQUcsR0FBUyxJQUFLLENBQUMsS0FBSyxJQUFJLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLENBQUM7WUFDdEQsTUFBTSxHQUFNLEtBQUssQ0FBQyxNQUFNLFlBQU0sS0FBSyxDQUFDLFVBQVUsSUFBSSxFQUFFLFVBQUksR0FBSyxDQUFDO1FBQ2xFLENBQUM7UUFBQyxJQUFJLENBQUMsQ0FBQztZQUNKLE1BQU0sR0FBRyxLQUFLLENBQUMsT0FBTyxHQUFHLEtBQUssQ0FBQyxPQUFPLEdBQUcsS0FBSyxDQUFDLFFBQVEsRUFBRSxDQUFDO1FBQzlELENBQUM7UUFDRCxPQUFPLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQ3RCLE1BQU0sQ0FBQyxlQUFVLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxDQUFDO0lBQ3BDLENBQUM7SUFDTyx3Q0FBVyxHQUFuQixVQUFvQixHQUFhO1FBQzdCLElBQUksSUFBSSxHQUFHLEdBQUcsQ0FBQyxJQUFJLEVBQUUsQ0FBQztRQUN0QixNQUFNLENBQU8sSUFBSyxJQUFJLEVBQUUsQ0FBQztJQUM3QixDQUFDO0lBRUwseUJBQUM7QUFBRCxDQUFDLEFBNUVELElBNEVDO0FBNUVZLGtCQUFrQjtJQUQ5QixpQkFBVSxFQUFFO3FDQUlpQixXQUFJO0dBSHJCLGtCQUFrQixDQTRFOUI7QUE1RVksZ0RBQWtCO0FBOEUvQjtJQUFBO0lBS0EsQ0FBQztJQUFELGtCQUFDO0FBQUQsQ0FBQyxBQUxEO0FBQ1csbUJBQU8sR0FBRyxTQUFTLENBQUM7QUFDcEIsbUJBQU8sR0FBRyxTQUFTLENBQUM7QUFDcEIscUJBQVMsR0FBRyxXQUFXLENBQUM7QUFDeEIsbUJBQU8sR0FBRyxTQUFTLENBQUM7QUFKbEIsa0NBQVc7QUFNeEI7SUFBQTtRQUdJLGdCQUFXLEdBQWtDLElBQUksS0FBSyxFQUEwQixDQUFDO0lBQ3JGLENBQUM7SUFBRCx5QkFBQztBQUFELENBQUMsQUFKRCxJQUlDO0FBSlksZ0RBQWtCO0FBSy9CO0lBQ0ksZ0NBQW1CLEVBQVUsRUFBUyxXQUFxQjtRQUF4QyxPQUFFLEdBQUYsRUFBRSxDQUFRO1FBQVMsZ0JBQVcsR0FBWCxXQUFXLENBQVU7SUFBSSxDQUFDO0lBQ3BFLDZCQUFDO0FBQUQsQ0FBQyxBQUZELElBRUM7QUFGWSx3REFBc0I7QUFJbkM7SUFJSSw2QkFBWSxlQUFtQyxFQUFFLFFBQWlEO1FBRGxHLGdCQUFXLEdBQW1DLElBQUksS0FBSyxFQUEyQixDQUFDO1FBRS9FLElBQUksQ0FBQyxFQUFFLEdBQUcsZUFBZSxDQUFDLEVBQUUsQ0FBQztRQUM3QixJQUFJLENBQUMsTUFBTSxHQUFHLGVBQWUsQ0FBQyxNQUFNLENBQUM7UUFDckMsSUFBSSxLQUFLLEdBQUcsQ0FBQyxDQUFDO1FBQ2QsR0FBRyxDQUFDLENBQWEsVUFBMkIsRUFBM0IsS0FBQSxlQUFlLENBQUMsV0FBVyxFQUEzQixjQUEyQixFQUEzQixJQUEyQjtZQUF2QyxJQUFJLElBQUksU0FBQTtZQUNULElBQUksUUFBUSxHQUFHLFFBQVEsQ0FBQyxLQUFLLENBQUMsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQztZQUMxRCxJQUFJLE1BQU0sR0FBRyxJQUFJLHVCQUF1QixDQUFDLElBQUksRUFBRSxRQUFRLENBQUMsQ0FBQztZQUN6RCxJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztZQUM5QixFQUFFLEtBQUssQ0FBQztTQUNYO0lBQ0wsQ0FBQztJQVhrRixDQUFDO0lBWXhGLDBCQUFDO0FBQUQsQ0FBQyxBQWZELElBZUM7QUFmWSxrREFBbUI7QUFnQmhDO0lBSUksaUNBQVksc0JBQThDLEVBQy9DLFFBQWdCO1FBQWhCLGFBQVEsR0FBUixRQUFRLENBQVE7UUFDdkIsSUFBSSxDQUFDLEVBQUUsR0FBRyxzQkFBc0IsQ0FBQyxFQUFFLENBQUM7UUFDcEMsSUFBSSxDQUFDLFdBQVcsR0FBRyxzQkFBc0IsQ0FBQyxXQUFXLENBQUM7SUFDMUQsQ0FBQztJQUVMLDhCQUFDO0FBQUQsQ0FBQyxBQVZELElBVUM7QUFWWSwwREFBdUIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcbmltcG9ydCB7IE9ic2VydmFibGUgfSBmcm9tIFwicnhqcy9SeFwiO1xuaW1wb3J0IFwicnhqcy9hZGQvb3BlcmF0b3IvZG9cIjtcbmltcG9ydCBcInJ4anMvYWRkL29wZXJhdG9yL21hcFwiO1xuaW1wb3J0ICdyeGpzL2FkZC9vcGVyYXRvci9jYXRjaCc7XG5cbmltcG9ydCB7IEh0dHAsIFJlc3BvbnNlIH0gZnJvbSAnQGFuZ3VsYXIvaHR0cCc7XG5pbXBvcnQgeyBMaXN0IH0gZnJvbSAnbGlucXRzJztcbmltcG9ydCB7IFBvc2l0aW9uIH0gZnJvbSAnbmF0aXZlc2NyaXB0LWdvb2dsZS1tYXBzLXNkayc7XG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBFeHRlcm5hbE1hcFNlcnZpY2Uge1xuICAgIHByaXZhdGUgYXBwS2V5ID0gXCJBSXphU3lDMVp6akFEOTFONGNmNkNLb24yYWlOQUZvanU5VjZSM0lcIjtcbiAgICBwcml2YXRlIGFwaVVybCA9IFwiaHR0cHM6Ly9tYXBzLmdvb2dsZWFwaXMuY29tL21hcHMvYXBpXCJcbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIGh0dHA6IEh0dHApIHtcblxuXG4gICAgfVxuXG4gICAgcHVibGljIGdldERpc3RhbmNlKGdldERpc3RhbmNlOiBHZXREaXN0YW5jZVJlcXVlc3QsIHR5cGVXYXk6IFdheU1vZGVFbnVtKTogT2JzZXJ2YWJsZTxHZXREaXN0YW5jZVJlc3BvbnNlPiB7XG4gICAgICAgLy9UT0RPOiBFc3RlIG1ldG9kbyBkZWJlIGRlIHBlZ2FybGUgYSB0b2RhcyBsYXMgZGlyZWNjaW9uZXMsIGRlYmUgZGUgZWxpbWluYXJzZSBlbCBicmVhayBkZW50cm8gZGVsIGZvclxuICAgICAgIC8vcGVybyBhY3R1YWxtZW50ZSBzZSByb21wZSBhbCBzYWNhciBlc2UgYnJlYWsgeVxuXG4gICAgICAgIHZhciBkZXN0aW5hdGlvbnMgPSBcIlwiO1xuICAgICAgICBmb3IgKHZhciBpdGVtIG9mIGdldERpc3RhbmNlLmRlc3RpbmF0aW9uKSB7XG4gICAgICAgICAgICBkZXN0aW5hdGlvbnMgPSBkZXN0aW5hdGlvbnMgKyBgJHtpdGVtLmRlc3RpbmF0aW9uLmxhdGl0dWRlfSwke2l0ZW0uZGVzdGluYXRpb24ubG9uZ2l0dWRlfXxgXG5cbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChkZXN0aW5hdGlvbnMubGVuZ3RoID4gMClcbiAgICAgICAgICAgIGRlc3RpbmF0aW9ucyA9IGRlc3RpbmF0aW9ucy5zdWJzdHJpbmcoMCwgZGVzdGluYXRpb25zLmxlbmd0aCAtIDEpO1xuXG4gICAgICAgIHZhciBhcGlVcmxMb2NhbCA9IGAke3RoaXMuYXBpVXJsfS9kaXN0YW5jZW1hdHJpeC9qc29uP29yaWdpbnM9JHtnZXREaXN0YW5jZS5vcmlnaW4ubGF0aXR1ZGV9LCR7Z2V0RGlzdGFuY2Uub3JpZ2luLmxvbmdpdHVkZX0mZGVzdGluYXRpb25zPSR7ZGVzdGluYXRpb25zfSZtb2RlPSR7dHlwZVdheX0mbGFuZ3VhZ2U9ZXMtRVMma2V5PSR7dGhpcy5hcHBLZXl9YDtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmh0dHAuZ2V0KGFwaVVybExvY2FsKVxuICAgICAgICAgICAgICAgIC5tYXAoeCA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHZhciBkYXRhOiBnb29nbGUubWFwcy5EaXN0YW5jZU1hdHJpeFJlc3BvbnNlID0gdGhpcy5leHRyYWN0RGF0YSh4KTtcbiAgICAgICAgICAgICAgICAgICAgdmFyIHJldHVybkRhdGEgPSBuZXcgR2V0RGlzdGFuY2VSZXNwb25zZShnZXREaXN0YW5jZSwgZGF0YS5yb3dzKTtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHJldHVybkRhdGE7XG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAuY2F0Y2godGhpcy5oYW5kbGVFcnJvcik7XG5cbiAgICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICAgICAgdmFyIGEgPSBlO1xuICAgICAgICB9XG5cbiAgICB9XG4gICAgLy9QdWJsaWMgTWV0aG9kc1xuICAgIHB1YmxpYyBnZXRXYXlQb3NpdGlvbnMob3JpZ2luOiBbbnVtYmVyLCBudW1iZXJdLCBkZXN0aW5hdGlvbjogW251bWJlciwgbnVtYmVyXSwgdHlwZVdheTogV2F5TW9kZUVudW0pOiBPYnNlcnZhYmxlPExpc3Q8UG9zaXRpb24+PiB7XG4gICAgICAgIHJldHVybiB0aGlzLmh0dHAuZ2V0KGAke3RoaXMuYXBpVXJsfS9kaXJlY3Rpb25zL2pzb24/b3JpZ2luPSR7b3JpZ2luWzBdfSwke29yaWdpblsxXX0mZGVzdGluYXRpb249JHtkZXN0aW5hdGlvblswXX0sJHtkZXN0aW5hdGlvblsxXX0mYXZvaWQ9aGlnaHdheXMmbW9kZT0ke3R5cGVXYXl9JmtleT0ke3RoaXMuYXBwS2V5fWApXG4gICAgICAgICAgICAubWFwKHggPT4ge1xuICAgICAgICAgICAgICAgIHZhciBkYXRhOiBnb29nbGUubWFwcy5EaXJlY3Rpb25zUmVzdWx0ID0gdGhpcy5leHRyYWN0RGF0YSh4KTtcbiAgICAgICAgICAgICAgICB2YXIgcmV0dXJuTGlzdCA9IG5ldyBMaXN0PFBvc2l0aW9uPigpO1xuICAgICAgICAgICAgICAgIGZvciAodmFyIGl0ZW0gb2YgZGF0YS5yb3V0ZXNbMF0ubGVnc1swXS5zdGVwcykge1xuICAgICAgICAgICAgICAgICAgICB2YXIgbmV3UFN0YXJ0b3NpdGlvbiA9IG5ldyBQb3NpdGlvbigpO1xuICAgICAgICAgICAgICAgICAgICBuZXdQU3RhcnRvc2l0aW9uLmxhdGl0dWRlID0gKDxhbnk+aXRlbSkuc3RhcnRfbG9jYXRpb24ubGF0O1xuICAgICAgICAgICAgICAgICAgICBuZXdQU3RhcnRvc2l0aW9uLmxvbmdpdHVkZSA9ICg8YW55Pml0ZW0pLnN0YXJ0X2xvY2F0aW9uLmxuZztcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuTGlzdC5BZGQobmV3UFN0YXJ0b3NpdGlvbik7XG4gICAgICAgICAgICAgICAgICAgIHZhciBuZXdFbmRQb3NpdGlvbiA9IG5ldyBQb3NpdGlvbigpO1xuICAgICAgICAgICAgICAgICAgICBuZXdFbmRQb3NpdGlvbi5sYXRpdHVkZSA9ICg8YW55Pml0ZW0uZW5kX2xvY2F0aW9uKS5sYXQ7XG4gICAgICAgICAgICAgICAgICAgIG5ld0VuZFBvc2l0aW9uLmxvbmdpdHVkZSA9ICg8YW55Pml0ZW0uZW5kX2xvY2F0aW9uKS5sbmc7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybkxpc3QuQWRkKG5ld0VuZFBvc2l0aW9uKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcmV0dXJuIHJldHVybkxpc3Q7XG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgLmNhdGNoKHRoaXMuaGFuZGxlRXJyb3IpO1xuICAgIH1cblxuICAgIC8vUHJpdmF0ZSBNZXRob2RzXG4gICAgcHJpdmF0ZSBoYW5kbGVFcnJvcihlcnJvcjogUmVzcG9uc2UgfCBhbnkpOiBhbnkge1xuICAgICAgICAvLyBJbiBhIHJlYWwgd29ybGQgYXBwLCB3ZSBtaWdodCB1c2UgYSByZW1vdGUgbG9nZ2luZyBpbmZyYXN0cnVjdHVyZVxuICAgICAgICBsZXQgZXJyTXNnOiBzdHJpbmc7XG4gICAgICAgIGlmIChlcnJvciBpbnN0YW5jZW9mIFJlc3BvbnNlKSB7XG4gICAgICAgICAgICBjb25zdCBib2R5ID0gZXJyb3IuanNvbigpIHx8ICcnO1xuICAgICAgICAgICAgY29uc3QgZXJyID0gKDxhbnk+Ym9keSkuZXJyb3IgfHwgSlNPTi5zdHJpbmdpZnkoYm9keSk7XG4gICAgICAgICAgICBlcnJNc2cgPSBgJHtlcnJvci5zdGF0dXN9IC0gJHtlcnJvci5zdGF0dXNUZXh0IHx8ICcnfSAke2Vycn1gO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgZXJyTXNnID0gZXJyb3IubWVzc2FnZSA/IGVycm9yLm1lc3NhZ2UgOiBlcnJvci50b1N0cmluZygpO1xuICAgICAgICB9XG4gICAgICAgIGNvbnNvbGUuZXJyb3IoZXJyTXNnKTtcbiAgICAgICAgcmV0dXJuIE9ic2VydmFibGUudGhyb3coZXJyTXNnKTtcbiAgICB9XG4gICAgcHJpdmF0ZSBleHRyYWN0RGF0YShyZXM6IFJlc3BvbnNlKTogYW55IHtcbiAgICAgICAgbGV0IGJvZHkgPSByZXMuanNvbigpO1xuICAgICAgICByZXR1cm4gKDxhbnk+Ym9keSkgfHwge307XG4gICAgfVxuXG59XG5cbmV4cG9ydCBjbGFzcyBXYXlNb2RlRW51bSB7XG4gICAgc3RhdGljIGRyaXZpbmcgPSBcImRyaXZpbmdcIjtcbiAgICBzdGF0aWMgd2Fsa2luZyA9IFwid2Fsa2luZ1wiO1xuICAgIHN0YXRpYyBiaWN5Y2xpbmcgPSBcImJpY3ljbGluZ1wiO1xuICAgIHN0YXRpYyB0cmFuc2l0ID0gXCJ0cmFuc2l0XCI7XG59XG5leHBvcnQgY2xhc3MgR2V0RGlzdGFuY2VSZXF1ZXN0IHtcbiAgICBpZDogbnVtYmVyO1xuICAgIG9yaWdpbjogUG9zaXRpb247XG4gICAgZGVzdGluYXRpb246IEFycmF5PERpc3RhbmNlUmVxdWVzdFdyYXBwZXI+ID0gbmV3IEFycmF5PERpc3RhbmNlUmVxdWVzdFdyYXBwZXI+KCk7XG59XG5leHBvcnQgY2xhc3MgRGlzdGFuY2VSZXF1ZXN0V3JhcHBlciB7XG4gICAgY29uc3RydWN0b3IocHVibGljIGlkOiBudW1iZXIsIHB1YmxpYyBkZXN0aW5hdGlvbjogUG9zaXRpb24pIHsgfVxufVxuXG5leHBvcnQgY2xhc3MgR2V0RGlzdGFuY2VSZXNwb25zZSB7XG4gICAgaWQ6IG51bWJlcjtcbiAgICBvcmlnaW46IFBvc2l0aW9uO1xuICAgIGRlc3RpbmF0aW9uOiBBcnJheTxEaXN0YW5jZVJlc3BvbnNlV3JhcHBlcj4gPSBuZXcgQXJyYXk8RGlzdGFuY2VSZXNwb25zZVdyYXBwZXI+KCk7O1xuICAgIGNvbnN0cnVjdG9yKGRpc3RhbmNlUmVxdWVzdDogR2V0RGlzdGFuY2VSZXF1ZXN0LCByZXNwb25zZTogZ29vZ2xlLm1hcHMuRGlzdGFuY2VNYXRyaXhSZXNwb25zZVJvd1tdKSB7XG4gICAgICAgIHRoaXMuaWQgPSBkaXN0YW5jZVJlcXVlc3QuaWQ7XG4gICAgICAgIHRoaXMub3JpZ2luID0gZGlzdGFuY2VSZXF1ZXN0Lm9yaWdpbjtcbiAgICAgICAgdmFyIGNvdW50ID0gMDtcbiAgICAgICAgZm9yICh2YXIgaXRlbSBvZiBkaXN0YW5jZVJlcXVlc3QuZGVzdGluYXRpb24pIHtcbiAgICAgICAgICAgIHZhciBkaXN0YW5jZSA9IHJlc3BvbnNlW2NvdW50XS5lbGVtZW50c1swXS5kaXN0YW5jZS52YWx1ZTtcbiAgICAgICAgICAgIHZhciBuZXdSZXMgPSBuZXcgRGlzdGFuY2VSZXNwb25zZVdyYXBwZXIoaXRlbSwgZGlzdGFuY2UpO1xuICAgICAgICAgICAgdGhpcy5kZXN0aW5hdGlvbi5wdXNoKG5ld1Jlcyk7XG4gICAgICAgICAgICArK2NvdW50O1xuICAgICAgICB9XG4gICAgfVxufVxuZXhwb3J0IGNsYXNzIERpc3RhbmNlUmVzcG9uc2VXcmFwcGVyIHtcbiAgICBpZDogbnVtYmVyO1xuICAgIGRlc3RpbmF0aW9uOiBQb3NpdGlvbjtcblxuICAgIGNvbnN0cnVjdG9yKGRpc3RhbmNlUmVxdWVzdFdyYXBwZXI6IERpc3RhbmNlUmVxdWVzdFdyYXBwZXIsXG4gICAgICAgIHB1YmxpYyBkaXN0YW5jZTogbnVtYmVyKSB7XG4gICAgICAgIHRoaXMuaWQgPSBkaXN0YW5jZVJlcXVlc3RXcmFwcGVyLmlkO1xuICAgICAgICB0aGlzLmRlc3RpbmF0aW9uID0gZGlzdGFuY2VSZXF1ZXN0V3JhcHBlci5kZXN0aW5hdGlvbjtcbiAgICB9XG5cbn0iXX0=