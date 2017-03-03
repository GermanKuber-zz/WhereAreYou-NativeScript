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
    }
    //Public Methods
    ExternalMapService.prototype.getWayPositions = function (origin, destination, typeWay) {
        var _this = this;
        return this.http.get("https://maps.googleapis.com/maps/api/directions/json?origin=" + origin[0] + "," + origin[1] + "&destination=" + destination[0] + "," + destination[1] + "&avoid=highways&mode=" + typeWay + "&key=" + this.appKey)
            .map(function (x) {
            var data = _this.extractData(x);
            var returnList = new linqts_1.List();
            for (var _i = 0, _a = data.routes[0].legs; _i < _a.length; _i++) {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXh0ZXJuYWwtbWFwLnNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJleHRlcm5hbC1tYXAuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsc0NBQTJDO0FBQzNDLDhCQUFxQztBQUNyQyxnQ0FBOEI7QUFDOUIsaUNBQStCO0FBQy9CLG1DQUFpQztBQUVqQyxzQ0FBK0M7QUFDL0MsaUNBQThCO0FBQzlCLDZFQUF3RDtBQUd4RCxJQUFhLGtCQUFrQjtJQUUzQiw0QkFBb0IsSUFBVTtRQUFWLFNBQUksR0FBSixJQUFJLENBQU07UUFEdEIsV0FBTSxHQUFHLHlDQUF5QyxDQUFDO0lBSTNELENBQUM7SUFFRCxnQkFBZ0I7SUFDVCw0Q0FBZSxHQUF0QixVQUF1QixNQUF3QixFQUFFLFdBQTZCLEVBQUUsT0FBb0I7UUFBcEcsaUJBa0JDO1FBakJHLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxpRUFBK0QsTUFBTSxDQUFDLENBQUMsQ0FBQyxTQUFJLE1BQU0sQ0FBQyxDQUFDLENBQUMscUJBQWdCLFdBQVcsQ0FBQyxDQUFDLENBQUMsU0FBSSxXQUFXLENBQUMsQ0FBQyxDQUFDLDZCQUF3QixPQUFPLGFBQVEsSUFBSSxDQUFDLE1BQVEsQ0FBQzthQUMxTSxHQUFHLENBQUMsVUFBQSxDQUFDO1lBQ0YsSUFBSSxJQUFJLEdBQWlDLEtBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDN0QsSUFBSSxVQUFVLEdBQUcsSUFBSSxhQUFJLEVBQVksQ0FBQztZQUN0QyxHQUFHLENBQUMsQ0FBYSxVQUFtQixFQUFuQixLQUFBLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxFQUFuQixjQUFtQixFQUFuQixJQUFtQjtnQkFBL0IsSUFBSSxJQUFJLFNBQUE7Z0JBQ1QsSUFBSSxnQkFBZ0IsR0FBRyxJQUFJLHVDQUFRLEVBQUUsQ0FBQztnQkFDdEMsZ0JBQWdCLENBQUMsUUFBUSxHQUFTLElBQUssQ0FBQyxjQUFjLENBQUMsR0FBRyxDQUFDO2dCQUMzRCxnQkFBZ0IsQ0FBQyxTQUFTLEdBQVMsSUFBSyxDQUFDLGNBQWMsQ0FBQyxHQUFHLENBQUM7Z0JBQzVELFVBQVUsQ0FBQyxHQUFHLENBQUMsZ0JBQWdCLENBQUMsQ0FBQztnQkFDakMsSUFBSSxjQUFjLEdBQUcsSUFBSSx1Q0FBUSxFQUFFLENBQUM7Z0JBQ3BDLGNBQWMsQ0FBQyxRQUFRLEdBQVMsSUFBSSxDQUFDLFlBQWEsQ0FBQyxHQUFHLENBQUM7Z0JBQ3ZELGNBQWMsQ0FBQyxTQUFTLEdBQVMsSUFBSSxDQUFDLFlBQWEsQ0FBQyxHQUFHLENBQUM7Z0JBQ3hELFVBQVUsQ0FBQyxHQUFHLENBQUMsY0FBYyxDQUFDLENBQUM7YUFDbEM7WUFDRCxNQUFNLENBQUMsVUFBVSxDQUFDO1FBQ3RCLENBQUMsQ0FBQzthQUNELEtBQUssQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUM7SUFDakMsQ0FBQztJQUVELGlCQUFpQjtJQUNULHdDQUFXLEdBQW5CLFVBQW9CLEtBQXFCO1FBQ3JDLG9FQUFvRTtRQUNwRSxJQUFJLE1BQWMsQ0FBQztRQUNuQixFQUFFLENBQUMsQ0FBQyxLQUFLLFlBQVksZUFBUSxDQUFDLENBQUMsQ0FBQztZQUM1QixJQUFNLElBQUksR0FBRyxLQUFLLENBQUMsSUFBSSxFQUFFLElBQUksRUFBRSxDQUFDO1lBQ2hDLElBQU0sR0FBRyxHQUFTLElBQUssQ0FBQyxLQUFLLElBQUksSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUN0RCxNQUFNLEdBQU0sS0FBSyxDQUFDLE1BQU0sWUFBTSxLQUFLLENBQUMsVUFBVSxJQUFJLEVBQUUsVUFBSSxHQUFLLENBQUM7UUFDbEUsQ0FBQztRQUFDLElBQUksQ0FBQyxDQUFDO1lBQ0osTUFBTSxHQUFHLEtBQUssQ0FBQyxPQUFPLEdBQUcsS0FBSyxDQUFDLE9BQU8sR0FBRyxLQUFLLENBQUMsUUFBUSxFQUFFLENBQUM7UUFDOUQsQ0FBQztRQUNELE9BQU8sQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDdEIsTUFBTSxDQUFDLGVBQVUsQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLENBQUM7SUFDcEMsQ0FBQztJQUNPLHdDQUFXLEdBQW5CLFVBQW9CLEdBQWE7UUFDN0IsSUFBSSxJQUFJLEdBQUcsR0FBRyxDQUFDLElBQUksRUFBRSxDQUFDO1FBQ3RCLE1BQU0sQ0FBTyxJQUFLLElBQUksRUFBRSxDQUFDO0lBQzdCLENBQUM7SUFFTCx5QkFBQztBQUFELENBQUMsQUEvQ0QsSUErQ0M7QUEvQ1ksa0JBQWtCO0lBRDlCLGlCQUFVLEVBQUU7cUNBR2lCLFdBQUk7R0FGckIsa0JBQWtCLENBK0M5QjtBQS9DWSxnREFBa0I7QUFpRC9CO0lBQUE7SUFLQSxDQUFDO0lBQUQsa0JBQUM7QUFBRCxDQUFDLEFBTEQ7QUFDVyxtQkFBTyxHQUFHLFNBQVMsQ0FBQztBQUNwQixtQkFBTyxHQUFHLFNBQVMsQ0FBQztBQUNwQixxQkFBUyxHQUFHLFdBQVcsQ0FBQztBQUN4QixtQkFBTyxHQUFHLFNBQVMsQ0FBQztBQUpsQixrQ0FBVyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSB9IGZyb20gXCJyeGpzL1J4XCI7XG5pbXBvcnQgXCJyeGpzL2FkZC9vcGVyYXRvci9kb1wiO1xuaW1wb3J0IFwicnhqcy9hZGQvb3BlcmF0b3IvbWFwXCI7XG5pbXBvcnQgJ3J4anMvYWRkL29wZXJhdG9yL2NhdGNoJztcblxuaW1wb3J0IHsgSHR0cCwgUmVzcG9uc2UgfSBmcm9tICdAYW5ndWxhci9odHRwJztcbmltcG9ydCB7IExpc3QgfSBmcm9tICdsaW5xdHMnO1xuaW1wb3J0IHsgUG9zaXRpb24gfSBmcm9tICduYXRpdmVzY3JpcHQtZ29vZ2xlLW1hcHMtc2RrJztcblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIEV4dGVybmFsTWFwU2VydmljZSB7XG4gICAgcHJpdmF0ZSBhcHBLZXkgPSBcIkFJemFTeUMxWnpqQUQ5MU40Y2Y2Q0tvbjJhaU5BRm9qdTlWNlIzSVwiO1xuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgaHR0cDogSHR0cCkge1xuXG5cbiAgICB9XG5cbiAgICAvL1B1YmxpYyBNZXRob2RzXG4gICAgcHVibGljIGdldFdheVBvc2l0aW9ucyhvcmlnaW46IFtudW1iZXIsIG51bWJlcl0sIGRlc3RpbmF0aW9uOiBbbnVtYmVyLCBudW1iZXJdLCB0eXBlV2F5OiBXYXlNb2RlRW51bSk6IE9ic2VydmFibGU8TGlzdDxQb3NpdGlvbj4+IHtcbiAgICAgICAgcmV0dXJuIHRoaXMuaHR0cC5nZXQoYGh0dHBzOi8vbWFwcy5nb29nbGVhcGlzLmNvbS9tYXBzL2FwaS9kaXJlY3Rpb25zL2pzb24/b3JpZ2luPSR7b3JpZ2luWzBdfSwke29yaWdpblsxXX0mZGVzdGluYXRpb249JHtkZXN0aW5hdGlvblswXX0sJHtkZXN0aW5hdGlvblsxXX0mYXZvaWQ9aGlnaHdheXMmbW9kZT0ke3R5cGVXYXl9JmtleT0ke3RoaXMuYXBwS2V5fWApXG4gICAgICAgICAgICAubWFwKHggPT4ge1xuICAgICAgICAgICAgICAgIHZhciBkYXRhOiBnb29nbGUubWFwcy5EaXJlY3Rpb25zUmVzdWx0ID0gdGhpcy5leHRyYWN0RGF0YSh4KTtcbiAgICAgICAgICAgICAgICB2YXIgcmV0dXJuTGlzdCA9IG5ldyBMaXN0PFBvc2l0aW9uPigpO1xuICAgICAgICAgICAgICAgIGZvciAodmFyIGl0ZW0gb2YgZGF0YS5yb3V0ZXNbMF0ubGVncykge1xuICAgICAgICAgICAgICAgICAgICB2YXIgbmV3UFN0YXJ0b3NpdGlvbiA9IG5ldyBQb3NpdGlvbigpO1xuICAgICAgICAgICAgICAgICAgICBuZXdQU3RhcnRvc2l0aW9uLmxhdGl0dWRlID0gKDxhbnk+aXRlbSkuc3RhcnRfbG9jYXRpb24ubGF0O1xuICAgICAgICAgICAgICAgICAgICBuZXdQU3RhcnRvc2l0aW9uLmxvbmdpdHVkZSA9ICg8YW55Pml0ZW0pLnN0YXJ0X2xvY2F0aW9uLmxuZztcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuTGlzdC5BZGQobmV3UFN0YXJ0b3NpdGlvbik7XG4gICAgICAgICAgICAgICAgICAgIHZhciBuZXdFbmRQb3NpdGlvbiA9IG5ldyBQb3NpdGlvbigpO1xuICAgICAgICAgICAgICAgICAgICBuZXdFbmRQb3NpdGlvbi5sYXRpdHVkZSA9ICg8YW55Pml0ZW0uZW5kX2xvY2F0aW9uKS5sYXQ7XG4gICAgICAgICAgICAgICAgICAgIG5ld0VuZFBvc2l0aW9uLmxvbmdpdHVkZSA9ICg8YW55Pml0ZW0uZW5kX2xvY2F0aW9uKS5sbmc7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybkxpc3QuQWRkKG5ld0VuZFBvc2l0aW9uKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcmV0dXJuIHJldHVybkxpc3Q7XG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgLmNhdGNoKHRoaXMuaGFuZGxlRXJyb3IpO1xuICAgIH1cblxuICAgIC8vUHJpdmF0ZSBNZXRob2RzXG4gICAgcHJpdmF0ZSBoYW5kbGVFcnJvcihlcnJvcjogUmVzcG9uc2UgfCBhbnkpOiBhbnkge1xuICAgICAgICAvLyBJbiBhIHJlYWwgd29ybGQgYXBwLCB3ZSBtaWdodCB1c2UgYSByZW1vdGUgbG9nZ2luZyBpbmZyYXN0cnVjdHVyZVxuICAgICAgICBsZXQgZXJyTXNnOiBzdHJpbmc7XG4gICAgICAgIGlmIChlcnJvciBpbnN0YW5jZW9mIFJlc3BvbnNlKSB7XG4gICAgICAgICAgICBjb25zdCBib2R5ID0gZXJyb3IuanNvbigpIHx8ICcnO1xuICAgICAgICAgICAgY29uc3QgZXJyID0gKDxhbnk+Ym9keSkuZXJyb3IgfHwgSlNPTi5zdHJpbmdpZnkoYm9keSk7XG4gICAgICAgICAgICBlcnJNc2cgPSBgJHtlcnJvci5zdGF0dXN9IC0gJHtlcnJvci5zdGF0dXNUZXh0IHx8ICcnfSAke2Vycn1gO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgZXJyTXNnID0gZXJyb3IubWVzc2FnZSA/IGVycm9yLm1lc3NhZ2UgOiBlcnJvci50b1N0cmluZygpO1xuICAgICAgICB9XG4gICAgICAgIGNvbnNvbGUuZXJyb3IoZXJyTXNnKTtcbiAgICAgICAgcmV0dXJuIE9ic2VydmFibGUudGhyb3coZXJyTXNnKTtcbiAgICB9XG4gICAgcHJpdmF0ZSBleHRyYWN0RGF0YShyZXM6IFJlc3BvbnNlKTogYW55IHtcbiAgICAgICAgbGV0IGJvZHkgPSByZXMuanNvbigpO1xuICAgICAgICByZXR1cm4gKDxhbnk+Ym9keSkgfHwge307XG4gICAgfVxuXG59XG5cbmV4cG9ydCBjbGFzcyBXYXlNb2RlRW51bSB7XG4gICAgc3RhdGljIGRyaXZpbmcgPSBcImRyaXZpbmdcIjtcbiAgICBzdGF0aWMgd2Fsa2luZyA9IFwid2Fsa2luZ1wiO1xuICAgIHN0YXRpYyBiaWN5Y2xpbmcgPSBcImJpY3ljbGluZ1wiO1xuICAgIHN0YXRpYyB0cmFuc2l0ID0gXCJ0cmFuc2l0XCI7XG59Il19