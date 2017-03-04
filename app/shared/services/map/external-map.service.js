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
        this.apiUrl = "https://maps.googleapis.com/maps/api/distancematrix/json?";
    }
    ExternalMapService.prototype.getDistance = function (getDistance, typeWay) {
        var _this = this;
        var destinations = "";
        for (var _i = 0, _a = getDistance.destination; _i < _a.length; _i++) {
            var item = _a[_i];
            destinations = destinations + (item.destination.latitude + "," + item.destination.longitude + "|");
        }
        if (destinations.length > 0)
            destinations = destinations.substring(0, destinations.length - 1);
        var apiUrlLocal = this.apiUrl + "origins=" + getDistance.origin.latitude + "," + getDistance.origin.longitude + "&destinations=" + destinations + "&mode=" + typeWay + "&language=es-ES&key=" + this.appKey;
        return this.http.get(this.apiUrl + "origins=" + getDistance.origin.latitude + "," + getDistance.origin.longitude + "&destinations=" + destinations + "&mode=" + typeWay + "&language=es-ES&key=" + this.appKey)
            .map(function (x) {
            var data = _this.extractData(x);
            var returnData = new GetDistanceResponse(getDistance, data.rows);
            return returnData;
        })
            .catch(this.handleError);
    };
    //Public Methods
    ExternalMapService.prototype.getWayPositions = function (origin, destination, typeWay) {
        var _this = this;
        return this.http.get(this.apiUrl + "origin=" + origin[0] + "," + origin[1] + "&destination=" + destination[0] + "," + destination[1] + "&avoid=highways&mode=" + typeWay + "&key=" + this.appKey)
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXh0ZXJuYWwtbWFwLnNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJleHRlcm5hbC1tYXAuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsc0NBQTJDO0FBQzNDLDhCQUFxQztBQUNyQyxnQ0FBOEI7QUFDOUIsaUNBQStCO0FBQy9CLG1DQUFpQztBQUVqQyxzQ0FBK0M7QUFDL0MsaUNBQThCO0FBQzlCLDZFQUF3RDtBQUd4RCxJQUFhLGtCQUFrQjtJQUczQiw0QkFBb0IsSUFBVTtRQUFWLFNBQUksR0FBSixJQUFJLENBQU07UUFGdEIsV0FBTSxHQUFHLHlDQUF5QyxDQUFDO1FBQ25ELFdBQU0sR0FBRywyREFBMkQsQ0FBQTtJQUk1RSxDQUFDO0lBRU0sd0NBQVcsR0FBbEIsVUFBbUIsV0FBK0IsRUFBRSxPQUFvQjtRQUF4RSxpQkFrQkM7UUFqQkcsSUFBSSxZQUFZLEdBQUcsRUFBRSxDQUFDO1FBQ3RCLEdBQUcsQ0FBQyxDQUFhLFVBQXVCLEVBQXZCLEtBQUEsV0FBVyxDQUFDLFdBQVcsRUFBdkIsY0FBdUIsRUFBdkIsSUFBdUI7WUFBbkMsSUFBSSxJQUFJLFNBQUE7WUFDVCxZQUFZLEdBQUcsWUFBWSxJQUFNLElBQUksQ0FBQyxXQUFXLENBQUMsUUFBUSxTQUFJLElBQUksQ0FBQyxXQUFXLENBQUMsU0FBUyxNQUFHLENBQUEsQ0FBQTtTQUM5RjtRQUVELEVBQUUsQ0FBQyxDQUFDLFlBQVksQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDO1lBQ3hCLFlBQVksR0FBRyxZQUFZLENBQUMsU0FBUyxDQUFDLENBQUMsRUFBRSxZQUFZLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQyxDQUFDO1FBRXRFLElBQUksV0FBVyxHQUFNLElBQUksQ0FBQyxNQUFNLGdCQUFXLFdBQVcsQ0FBQyxNQUFNLENBQUMsUUFBUSxTQUFJLFdBQVcsQ0FBQyxNQUFNLENBQUMsU0FBUyxzQkFBaUIsWUFBWSxjQUFTLE9BQU8sNEJBQXVCLElBQUks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QUFtQyxFQUFFLFFBQWlEO1FBRGxHLGdCQUFXLEdBQW1DLElBQUksS0FBSyxFQUEyQixDQUFDO1FBRS9FLElBQUksQ0FBQyxFQUFFLEdBQUcsZUFBZSxDQUFDLEVBQUUsQ0FBQztRQUM3QixJQUFJLENBQUMsTUFBTSxHQUFHLGVBQWUsQ0FBQyxNQUFNLENBQUM7UUFDckMsSUFBSSxLQUFLLEdBQUcsQ0FBQyxDQUFDO1FBQ2QsR0FBRyxDQUFDLENBQWEsVUFBMkIsRUFBM0IsS0FBQSxlQUFlLENBQUMsV0FBVyxFQUEzQixjQUEyQixFQUEzQixJQUEyQjtZQUF2QyxJQUFJLElBQUksU0FBQTtZQUNULElBQUksUUFBUSxHQUFHLFFBQVEsQ0FBQyxLQUFLLENBQUMsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQztZQUMxRCxJQUFJLE1BQU0sR0FBRyxJQUFJLHVCQUF1QixDQUFDLElBQUksRUFBRSxRQUFRLENBQUMsQ0FBQztZQUN6RCxJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztZQUM5QixFQUFFLEtBQUssQ0FBQztTQUNYO0lBQ0wsQ0FBQztJQVhrRixDQUFDO0lBWXhGLDBCQUFDO0FBQUQsQ0FBQyxBQWZELElBZUM7QUFmWSxrREFBbUI7QUFnQmhDO0lBSUksaUNBQVksc0JBQThDLEVBQy9DLFFBQWdCO1FBQWhCLGFBQVEsR0FBUixRQUFRLENBQVE7UUFDdkIsSUFBSSxDQUFDLEVBQUUsR0FBRyxzQkFBc0IsQ0FBQyxFQUFFLENBQUM7UUFDcEMsSUFBSSxDQUFDLFdBQVcsR0FBRyxzQkFBc0IsQ0FBQyxXQUFXLENBQUM7SUFDMUQsQ0FBQztJQUVMLDhCQUFDO0FBQUQsQ0FBQyxBQVZELElBVUM7QUFWWSwwREFBdUIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcbmltcG9ydCB7IE9ic2VydmFibGUgfSBmcm9tIFwicnhqcy9SeFwiO1xuaW1wb3J0IFwicnhqcy9hZGQvb3BlcmF0b3IvZG9cIjtcbmltcG9ydCBcInJ4anMvYWRkL29wZXJhdG9yL21hcFwiO1xuaW1wb3J0ICdyeGpzL2FkZC9vcGVyYXRvci9jYXRjaCc7XG5cbmltcG9ydCB7IEh0dHAsIFJlc3BvbnNlIH0gZnJvbSAnQGFuZ3VsYXIvaHR0cCc7XG5pbXBvcnQgeyBMaXN0IH0gZnJvbSAnbGlucXRzJztcbmltcG9ydCB7IFBvc2l0aW9uIH0gZnJvbSAnbmF0aXZlc2NyaXB0LWdvb2dsZS1tYXBzLXNkayc7XG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBFeHRlcm5hbE1hcFNlcnZpY2Uge1xuICAgIHByaXZhdGUgYXBwS2V5ID0gXCJBSXphU3lDMVp6akFEOTFONGNmNkNLb24yYWlOQUZvanU5VjZSM0lcIjtcbiAgICBwcml2YXRlIGFwaVVybCA9IFwiaHR0cHM6Ly9tYXBzLmdvb2dsZWFwaXMuY29tL21hcHMvYXBpL2Rpc3RhbmNlbWF0cml4L2pzb24/XCJcbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIGh0dHA6IEh0dHApIHtcblxuXG4gICAgfVxuXG4gICAgcHVibGljIGdldERpc3RhbmNlKGdldERpc3RhbmNlOiBHZXREaXN0YW5jZVJlcXVlc3QsIHR5cGVXYXk6IFdheU1vZGVFbnVtKTogT2JzZXJ2YWJsZTxHZXREaXN0YW5jZVJlc3BvbnNlPiB7XG4gICAgICAgIHZhciBkZXN0aW5hdGlvbnMgPSBcIlwiO1xuICAgICAgICBmb3IgKHZhciBpdGVtIG9mIGdldERpc3RhbmNlLmRlc3RpbmF0aW9uKSB7XG4gICAgICAgICAgICBkZXN0aW5hdGlvbnMgPSBkZXN0aW5hdGlvbnMgKyBgJHtpdGVtLmRlc3RpbmF0aW9uLmxhdGl0dWRlfSwke2l0ZW0uZGVzdGluYXRpb24ubG9uZ2l0dWRlfXxgXG4gICAgICAgIH1cblxuICAgICAgICBpZiAoZGVzdGluYXRpb25zLmxlbmd0aCA+IDApXG4gICAgICAgICAgICBkZXN0aW5hdGlvbnMgPSBkZXN0aW5hdGlvbnMuc3Vic3RyaW5nKDAsIGRlc3RpbmF0aW9ucy5sZW5ndGggLSAxKTtcbiAgICBcbiAgICAgICAgdmFyIGFwaVVybExvY2FsID0gYCR7dGhpcy5hcGlVcmx9b3JpZ2lucz0ke2dldERpc3RhbmNlLm9yaWdpbi5sYXRpdHVkZX0sJHtnZXREaXN0YW5jZS5vcmlnaW4ubG9uZ2l0dWRlfSZkZXN0aW5hdGlvbnM9JHtkZXN0aW5hdGlvbnN9Jm1vZGU9JHt0eXBlV2F5fSZsYW5ndWFnZT1lcy1FUyZrZXk9JHt0aGlzLmFwcEtleX1gO1xuXG4gICAgICAgIHJldHVybiB0aGlzLmh0dHAuZ2V0KGAke3RoaXMuYXBpVXJsfW9yaWdpbnM9JHtnZXREaXN0YW5jZS5vcmlnaW4ubGF0aXR1ZGV9LCR7Z2V0RGlzdGFuY2Uub3JpZ2luLmxvbmdpdHVkZX0mZGVzdGluYXRpb25zPSR7ZGVzdGluYXRpb25zfSZtb2RlPSR7dHlwZVdheX0mbGFuZ3VhZ2U9ZXMtRVMma2V5PSR7dGhpcy5hcHBLZXl9YClcbiAgICAgICAgICAgIC5tYXAoeCA9PiB7XG4gICAgICAgICAgICAgICAgdmFyIGRhdGE6IGdvb2dsZS5tYXBzLkRpc3RhbmNlTWF0cml4UmVzcG9uc2UgPSB0aGlzLmV4dHJhY3REYXRhKHgpO1xuICAgICAgICAgICAgICAgIHZhciByZXR1cm5EYXRhID0gbmV3IEdldERpc3RhbmNlUmVzcG9uc2UoZ2V0RGlzdGFuY2UsIGRhdGEucm93cyk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHJldHVybkRhdGE7XG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgLmNhdGNoKHRoaXMuaGFuZGxlRXJyb3IpO1xuICAgIH1cbiAgICAvL1B1YmxpYyBNZXRob2RzXG4gICAgcHVibGljIGdldFdheVBvc2l0aW9ucyhvcmlnaW46IFtudW1iZXIsIG51bWJlcl0sIGRlc3RpbmF0aW9uOiBbbnVtYmVyLCBudW1iZXJdLCB0eXBlV2F5OiBXYXlNb2RlRW51bSk6IE9ic2VydmFibGU8TGlzdDxQb3NpdGlvbj4+IHtcblxuICAgICAgICByZXR1cm4gdGhpcy5odHRwLmdldChgJHt0aGlzLmFwaVVybH1vcmlnaW49JHtvcmlnaW5bMF19LCR7b3JpZ2luWzFdfSZkZXN0aW5hdGlvbj0ke2Rlc3RpbmF0aW9uWzBdfSwke2Rlc3RpbmF0aW9uWzFdfSZhdm9pZD1oaWdod2F5cyZtb2RlPSR7dHlwZVdheX0ma2V5PSR7dGhpcy5hcHBLZXl9YClcbiAgICAgICAgICAgIC5tYXAoeCA9PiB7XG4gICAgICAgICAgICAgICAgdmFyIGRhdGE6IGdvb2dsZS5tYXBzLkRpcmVjdGlvbnNSZXN1bHQgPSB0aGlzLmV4dHJhY3REYXRhKHgpO1xuICAgICAgICAgICAgICAgIHZhciByZXR1cm5MaXN0ID0gbmV3IExpc3Q8UG9zaXRpb24+KCk7XG4gICAgICAgICAgICAgICAgZm9yICh2YXIgaXRlbSBvZiBkYXRhLnJvdXRlc1swXS5sZWdzWzBdLnN0ZXBzKSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciBuZXdQU3RhcnRvc2l0aW9uID0gbmV3IFBvc2l0aW9uKCk7XG4gICAgICAgICAgICAgICAgICAgIG5ld1BTdGFydG9zaXRpb24ubGF0aXR1ZGUgPSAoPGFueT5pdGVtKS5zdGFydF9sb2NhdGlvbi5sYXQ7XG4gICAgICAgICAgICAgICAgICAgIG5ld1BTdGFydG9zaXRpb24ubG9uZ2l0dWRlID0gKDxhbnk+aXRlbSkuc3RhcnRfbG9jYXRpb24ubG5nO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm5MaXN0LkFkZChuZXdQU3RhcnRvc2l0aW9uKTtcbiAgICAgICAgICAgICAgICAgICAgdmFyIG5ld0VuZFBvc2l0aW9uID0gbmV3IFBvc2l0aW9uKCk7XG4gICAgICAgICAgICAgICAgICAgIG5ld0VuZFBvc2l0aW9uLmxhdGl0dWRlID0gKDxhbnk+aXRlbS5lbmRfbG9jYXRpb24pLmxhdDtcbiAgICAgICAgICAgICAgICAgICAgbmV3RW5kUG9zaXRpb24ubG9uZ2l0dWRlID0gKDxhbnk+aXRlbS5lbmRfbG9jYXRpb24pLmxuZztcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuTGlzdC5BZGQobmV3RW5kUG9zaXRpb24pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICByZXR1cm4gcmV0dXJuTGlzdDtcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAuY2F0Y2godGhpcy5oYW5kbGVFcnJvcik7XG4gICAgfVxuXG4gICAgLy9Qcml2YXRlIE1ldGhvZHNcbiAgICBwcml2YXRlIGhhbmRsZUVycm9yKGVycm9yOiBSZXNwb25zZSB8IGFueSk6IGFueSB7XG4gICAgICAgIC8vIEluIGEgcmVhbCB3b3JsZCBhcHAsIHdlIG1pZ2h0IHVzZSBhIHJlbW90ZSBsb2dnaW5nIGluZnJhc3RydWN0dXJlXG4gICAgICAgIGxldCBlcnJNc2c6IHN0cmluZztcbiAgICAgICAgaWYgKGVycm9yIGluc3RhbmNlb2YgUmVzcG9uc2UpIHtcbiAgICAgICAgICAgIGNvbnN0IGJvZHkgPSBlcnJvci5qc29uKCkgfHwgJyc7XG4gICAgICAgICAgICBjb25zdCBlcnIgPSAoPGFueT5ib2R5KS5lcnJvciB8fCBKU09OLnN0cmluZ2lmeShib2R5KTtcbiAgICAgICAgICAgIGVyck1zZyA9IGAke2Vycm9yLnN0YXR1c30gLSAke2Vycm9yLnN0YXR1c1RleHQgfHwgJyd9ICR7ZXJyfWA7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBlcnJNc2cgPSBlcnJvci5tZXNzYWdlID8gZXJyb3IubWVzc2FnZSA6IGVycm9yLnRvU3RyaW5nKCk7XG4gICAgICAgIH1cbiAgICAgICAgY29uc29sZS5lcnJvcihlcnJNc2cpO1xuICAgICAgICByZXR1cm4gT2JzZXJ2YWJsZS50aHJvdyhlcnJNc2cpO1xuICAgIH1cbiAgICBwcml2YXRlIGV4dHJhY3REYXRhKHJlczogUmVzcG9uc2UpOiBhbnkge1xuICAgICAgICBsZXQgYm9keSA9IHJlcy5qc29uKCk7XG4gICAgICAgIHJldHVybiAoPGFueT5ib2R5KSB8fCB7fTtcbiAgICB9XG5cbn1cblxuZXhwb3J0IGNsYXNzIFdheU1vZGVFbnVtIHtcbiAgICBzdGF0aWMgZHJpdmluZyA9IFwiZHJpdmluZ1wiO1xuICAgIHN0YXRpYyB3YWxraW5nID0gXCJ3YWxraW5nXCI7XG4gICAgc3RhdGljIGJpY3ljbGluZyA9IFwiYmljeWNsaW5nXCI7XG4gICAgc3RhdGljIHRyYW5zaXQgPSBcInRyYW5zaXRcIjtcbn1cbmV4cG9ydCBjbGFzcyBHZXREaXN0YW5jZVJlcXVlc3Qge1xuICAgIGlkOiBudW1iZXI7XG4gICAgb3JpZ2luOiBQb3NpdGlvbjtcbiAgICBkZXN0aW5hdGlvbjogQXJyYXk8RGlzdGFuY2VSZXF1ZXN0V3JhcHBlcj4gPSBuZXcgQXJyYXk8RGlzdGFuY2VSZXF1ZXN0V3JhcHBlcj4oKTtcbn1cbmV4cG9ydCBjbGFzcyBEaXN0YW5jZVJlcXVlc3RXcmFwcGVyIHtcbiAgICBjb25zdHJ1Y3RvcihwdWJsaWMgaWQ6IG51bWJlciwgcHVibGljIGRlc3RpbmF0aW9uOiBQb3NpdGlvbikgeyB9XG59XG5cbmV4cG9ydCBjbGFzcyBHZXREaXN0YW5jZVJlc3BvbnNlIHtcbiAgICBpZDogbnVtYmVyO1xuICAgIG9yaWdpbjogUG9zaXRpb247XG4gICAgZGVzdGluYXRpb246IEFycmF5PERpc3RhbmNlUmVzcG9uc2VXcmFwcGVyPiA9IG5ldyBBcnJheTxEaXN0YW5jZVJlc3BvbnNlV3JhcHBlcj4oKTs7XG4gICAgY29uc3RydWN0b3IoZGlzdGFuY2VSZXF1ZXN0OiBHZXREaXN0YW5jZVJlcXVlc3QsIHJlc3BvbnNlOiBnb29nbGUubWFwcy5EaXN0YW5jZU1hdHJpeFJlc3BvbnNlUm93W10pIHtcbiAgICAgICAgdGhpcy5pZCA9IGRpc3RhbmNlUmVxdWVzdC5pZDtcbiAgICAgICAgdGhpcy5vcmlnaW4gPSBkaXN0YW5jZVJlcXVlc3Qub3JpZ2luO1xuICAgICAgICB2YXIgY291bnQgPSAwO1xuICAgICAgICBmb3IgKHZhciBpdGVtIG9mIGRpc3RhbmNlUmVxdWVzdC5kZXN0aW5hdGlvbikge1xuICAgICAgICAgICAgdmFyIGRpc3RhbmNlID0gcmVzcG9uc2VbY291bnRdLmVsZW1lbnRzWzBdLmRpc3RhbmNlLnZhbHVlO1xuICAgICAgICAgICAgdmFyIG5ld1JlcyA9IG5ldyBEaXN0YW5jZVJlc3BvbnNlV3JhcHBlcihpdGVtLCBkaXN0YW5jZSk7XG4gICAgICAgICAgICB0aGlzLmRlc3RpbmF0aW9uLnB1c2gobmV3UmVzKTtcbiAgICAgICAgICAgICsrY291bnQ7XG4gICAgICAgIH1cbiAgICB9XG59XG5leHBvcnQgY2xhc3MgRGlzdGFuY2VSZXNwb25zZVdyYXBwZXIge1xuICAgIGlkOiBudW1iZXI7XG4gICAgZGVzdGluYXRpb246IFBvc2l0aW9uO1xuXG4gICAgY29uc3RydWN0b3IoZGlzdGFuY2VSZXF1ZXN0V3JhcHBlcjogRGlzdGFuY2VSZXF1ZXN0V3JhcHBlcixcbiAgICAgICAgcHVibGljIGRpc3RhbmNlOiBudW1iZXIpIHtcbiAgICAgICAgdGhpcy5pZCA9IGRpc3RhbmNlUmVxdWVzdFdyYXBwZXIuaWQ7XG4gICAgICAgIHRoaXMuZGVzdGluYXRpb24gPSBkaXN0YW5jZVJlcXVlc3RXcmFwcGVyLmRlc3RpbmF0aW9uO1xuICAgIH1cblxufSJdfQ==