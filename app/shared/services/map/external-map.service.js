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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXh0ZXJuYWwtbWFwLnNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJleHRlcm5hbC1tYXAuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsc0NBQTJDO0FBQzNDLDhCQUFxQztBQUNyQyxnQ0FBOEI7QUFDOUIsaUNBQStCO0FBQy9CLG1DQUFpQztBQUVqQyxzQ0FBK0M7QUFDL0MsaUNBQThCO0FBQzlCLDZFQUF3RDtBQUd4RCxJQUFhLGtCQUFrQjtJQUUzQiw0QkFBb0IsSUFBVTtRQUFWLFNBQUksR0FBSixJQUFJLENBQU07UUFEdEIsV0FBTSxHQUFHLHlDQUF5QyxDQUFDO0lBSTNELENBQUM7SUFFRCxnQkFBZ0I7SUFDVCw0Q0FBZSxHQUF0QixVQUF1QixNQUF3QixFQUFFLFdBQTZCLEVBQUUsT0FBb0I7UUFBcEcsaUJBa0JDO1FBakJHLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxpRUFBK0QsTUFBTSxDQUFDLENBQUMsQ0FBQyxTQUFJLE1BQU0sQ0FBQyxDQUFDLENBQUMscUJBQWdCLFdBQVcsQ0FBQyxDQUFDLENBQUMsU0FBSSxXQUFXLENBQUMsQ0FBQyxDQUFDLDZCQUF3QixPQUFPLGFBQVEsSUFBSSxDQUFDLE1BQVEsQ0FBQzthQUMxTSxHQUFHLENBQUMsVUFBQSxDQUFDO1lBQ0YsSUFBSSxJQUFJLEdBQWlDLEtBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDN0QsSUFBSSxVQUFVLEdBQUcsSUFBSSxhQUFJLEVBQVksQ0FBQztZQUN0QyxHQUFHLENBQUMsQ0FBYSxVQUE0QixFQUE1QixLQUFBLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssRUFBNUIsY0FBNEIsRUFBNUIsSUFBNEI7Z0JBQXhDLElBQUksSUFBSSxTQUFBO2dCQUNULElBQUksZ0JBQWdCLEdBQUcsSUFBSSx1Q0FBUSxFQUFFLENBQUM7Z0JBQ3RDLGdCQUFnQixDQUFDLFFBQVEsR0FBUyxJQUFLLENBQUMsY0FBYyxDQUFDLEdBQUcsQ0FBQztnQkFDM0QsZ0JBQWdCLENBQUMsU0FBUyxHQUFTLElBQUssQ0FBQyxjQUFjLENBQUMsR0FBRyxDQUFDO2dCQUM1RCxVQUFVLENBQUMsR0FBRyxDQUFDLGdCQUFnQixDQUFDLENBQUM7Z0JBQ2pDLElBQUksY0FBYyxHQUFHLElBQUksdUNBQVEsRUFBRSxDQUFDO2dCQUNwQyxjQUFjLENBQUMsUUFBUSxHQUFTLElBQUksQ0FBQyxZQUFhLENBQUMsR0FBRyxDQUFDO2dCQUN2RCxjQUFjLENBQUMsU0FBUyxHQUFTLElBQUksQ0FBQyxZQUFhLENBQUMsR0FBRyxDQUFDO2dCQUN4RCxVQUFVLENBQUMsR0FBRyxDQUFDLGNBQWMsQ0FBQyxDQUFDO2FBQ2xDO1lBQ0QsTUFBTSxDQUFDLFVBQVUsQ0FBQztRQUN0QixDQUFDLENBQUM7YUFDRCxLQUFLLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDO0lBQ2pDLENBQUM7SUFFRCxpQkFBaUI7SUFDVCx3Q0FBVyxHQUFuQixVQUFvQixLQUFxQjtRQUNyQyxvRUFBb0U7UUFDcEUsSUFBSSxNQUFjLENBQUM7UUFDbkIsRUFBRSxDQUFDLENBQUMsS0FBSyxZQUFZLGVBQVEsQ0FBQyxDQUFDLENBQUM7WUFDNUIsSUFBTSxJQUFJLEdBQUcsS0FBSyxDQUFDLElBQUksRUFBRSxJQUFJLEVBQUUsQ0FBQztZQUNoQyxJQUFNLEdBQUcsR0FBUyxJQUFLLENBQUMsS0FBSyxJQUFJLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLENBQUM7WUFDdEQsTUFBTSxHQUFNLEtBQUssQ0FBQyxNQUFNLFlBQU0sS0FBSyxDQUFDLFVBQVUsSUFBSSxFQUFFLFVBQUksR0FBSyxDQUFDO1FBQ2xFLENBQUM7UUFBQyxJQUFJLENBQUMsQ0FBQztZQUNKLE1BQU0sR0FBRyxLQUFLLENBQUMsT0FBTyxHQUFHLEtBQUssQ0FBQyxPQUFPLEdBQUcsS0FBSyxDQUFDLFFBQVEsRUFBRSxDQUFDO1FBQzlELENBQUM7UUFDRCxPQUFPLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQ3RCLE1BQU0sQ0FBQyxlQUFVLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxDQUFDO0lBQ3BDLENBQUM7SUFDTyx3Q0FBVyxHQUFuQixVQUFvQixHQUFhO1FBQzdCLElBQUksSUFBSSxHQUFHLEdBQUcsQ0FBQyxJQUFJLEVBQUUsQ0FBQztRQUN0QixNQUFNLENBQU8sSUFBSyxJQUFJLEVBQUUsQ0FBQztJQUM3QixDQUFDO0lBRUwseUJBQUM7QUFBRCxDQUFDLEFBL0NELElBK0NDO0FBL0NZLGtCQUFrQjtJQUQ5QixpQkFBVSxFQUFFO3FDQUdpQixXQUFJO0dBRnJCLGtCQUFrQixDQStDOUI7QUEvQ1ksZ0RBQWtCO0FBaUQvQjtJQUFBO0lBS0EsQ0FBQztJQUFELGtCQUFDO0FBQUQsQ0FBQyxBQUxEO0FBQ1csbUJBQU8sR0FBRyxTQUFTLENBQUM7QUFDcEIsbUJBQU8sR0FBRyxTQUFTLENBQUM7QUFDcEIscUJBQVMsR0FBRyxXQUFXLENBQUM7QUFDeEIsbUJBQU8sR0FBRyxTQUFTLENBQUM7QUFKbEIsa0NBQVciLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcbmltcG9ydCB7IE9ic2VydmFibGUgfSBmcm9tIFwicnhqcy9SeFwiO1xuaW1wb3J0IFwicnhqcy9hZGQvb3BlcmF0b3IvZG9cIjtcbmltcG9ydCBcInJ4anMvYWRkL29wZXJhdG9yL21hcFwiO1xuaW1wb3J0ICdyeGpzL2FkZC9vcGVyYXRvci9jYXRjaCc7XG5cbmltcG9ydCB7IEh0dHAsIFJlc3BvbnNlIH0gZnJvbSAnQGFuZ3VsYXIvaHR0cCc7XG5pbXBvcnQgeyBMaXN0IH0gZnJvbSAnbGlucXRzJztcbmltcG9ydCB7IFBvc2l0aW9uIH0gZnJvbSAnbmF0aXZlc2NyaXB0LWdvb2dsZS1tYXBzLXNkayc7XG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBFeHRlcm5hbE1hcFNlcnZpY2Uge1xuICAgIHByaXZhdGUgYXBwS2V5ID0gXCJBSXphU3lDMVp6akFEOTFONGNmNkNLb24yYWlOQUZvanU5VjZSM0lcIjtcbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIGh0dHA6IEh0dHApIHtcblxuXG4gICAgfVxuXG4gICAgLy9QdWJsaWMgTWV0aG9kc1xuICAgIHB1YmxpYyBnZXRXYXlQb3NpdGlvbnMob3JpZ2luOiBbbnVtYmVyLCBudW1iZXJdLCBkZXN0aW5hdGlvbjogW251bWJlciwgbnVtYmVyXSwgdHlwZVdheTogV2F5TW9kZUVudW0pOiBPYnNlcnZhYmxlPExpc3Q8UG9zaXRpb24+PiB7XG4gICAgICAgIHJldHVybiB0aGlzLmh0dHAuZ2V0KGBodHRwczovL21hcHMuZ29vZ2xlYXBpcy5jb20vbWFwcy9hcGkvZGlyZWN0aW9ucy9qc29uP29yaWdpbj0ke29yaWdpblswXX0sJHtvcmlnaW5bMV19JmRlc3RpbmF0aW9uPSR7ZGVzdGluYXRpb25bMF19LCR7ZGVzdGluYXRpb25bMV19JmF2b2lkPWhpZ2h3YXlzJm1vZGU9JHt0eXBlV2F5fSZrZXk9JHt0aGlzLmFwcEtleX1gKVxuICAgICAgICAgICAgLm1hcCh4ID0+IHtcbiAgICAgICAgICAgICAgICB2YXIgZGF0YTogZ29vZ2xlLm1hcHMuRGlyZWN0aW9uc1Jlc3VsdCA9IHRoaXMuZXh0cmFjdERhdGEoeCk7XG4gICAgICAgICAgICAgICAgdmFyIHJldHVybkxpc3QgPSBuZXcgTGlzdDxQb3NpdGlvbj4oKTtcbiAgICAgICAgICAgICAgICBmb3IgKHZhciBpdGVtIG9mIGRhdGEucm91dGVzWzBdLmxlZ3NbMF0uc3RlcHMpIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIG5ld1BTdGFydG9zaXRpb24gPSBuZXcgUG9zaXRpb24oKTtcbiAgICAgICAgICAgICAgICAgICAgbmV3UFN0YXJ0b3NpdGlvbi5sYXRpdHVkZSA9ICg8YW55Pml0ZW0pLnN0YXJ0X2xvY2F0aW9uLmxhdDtcbiAgICAgICAgICAgICAgICAgICAgbmV3UFN0YXJ0b3NpdGlvbi5sb25naXR1ZGUgPSAoPGFueT5pdGVtKS5zdGFydF9sb2NhdGlvbi5sbmc7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybkxpc3QuQWRkKG5ld1BTdGFydG9zaXRpb24pO1xuICAgICAgICAgICAgICAgICAgICB2YXIgbmV3RW5kUG9zaXRpb24gPSBuZXcgUG9zaXRpb24oKTtcbiAgICAgICAgICAgICAgICAgICAgbmV3RW5kUG9zaXRpb24ubGF0aXR1ZGUgPSAoPGFueT5pdGVtLmVuZF9sb2NhdGlvbikubGF0O1xuICAgICAgICAgICAgICAgICAgICBuZXdFbmRQb3NpdGlvbi5sb25naXR1ZGUgPSAoPGFueT5pdGVtLmVuZF9sb2NhdGlvbikubG5nO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm5MaXN0LkFkZChuZXdFbmRQb3NpdGlvbik7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHJldHVybiByZXR1cm5MaXN0O1xuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIC5jYXRjaCh0aGlzLmhhbmRsZUVycm9yKTtcbiAgICB9XG5cbiAgICAvL1ByaXZhdGUgTWV0aG9kc1xuICAgIHByaXZhdGUgaGFuZGxlRXJyb3IoZXJyb3I6IFJlc3BvbnNlIHwgYW55KTogYW55IHtcbiAgICAgICAgLy8gSW4gYSByZWFsIHdvcmxkIGFwcCwgd2UgbWlnaHQgdXNlIGEgcmVtb3RlIGxvZ2dpbmcgaW5mcmFzdHJ1Y3R1cmVcbiAgICAgICAgbGV0IGVyck1zZzogc3RyaW5nO1xuICAgICAgICBpZiAoZXJyb3IgaW5zdGFuY2VvZiBSZXNwb25zZSkge1xuICAgICAgICAgICAgY29uc3QgYm9keSA9IGVycm9yLmpzb24oKSB8fCAnJztcbiAgICAgICAgICAgIGNvbnN0IGVyciA9ICg8YW55PmJvZHkpLmVycm9yIHx8IEpTT04uc3RyaW5naWZ5KGJvZHkpO1xuICAgICAgICAgICAgZXJyTXNnID0gYCR7ZXJyb3Iuc3RhdHVzfSAtICR7ZXJyb3Iuc3RhdHVzVGV4dCB8fCAnJ30gJHtlcnJ9YDtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGVyck1zZyA9IGVycm9yLm1lc3NhZ2UgPyBlcnJvci5tZXNzYWdlIDogZXJyb3IudG9TdHJpbmcoKTtcbiAgICAgICAgfVxuICAgICAgICBjb25zb2xlLmVycm9yKGVyck1zZyk7XG4gICAgICAgIHJldHVybiBPYnNlcnZhYmxlLnRocm93KGVyck1zZyk7XG4gICAgfVxuICAgIHByaXZhdGUgZXh0cmFjdERhdGEocmVzOiBSZXNwb25zZSk6IGFueSB7XG4gICAgICAgIGxldCBib2R5ID0gcmVzLmpzb24oKTtcbiAgICAgICAgcmV0dXJuICg8YW55PmJvZHkpIHx8IHt9O1xuICAgIH1cblxufVxuXG5leHBvcnQgY2xhc3MgV2F5TW9kZUVudW0ge1xuICAgIHN0YXRpYyBkcml2aW5nID0gXCJkcml2aW5nXCI7XG4gICAgc3RhdGljIHdhbGtpbmcgPSBcIndhbGtpbmdcIjtcbiAgICBzdGF0aWMgYmljeWNsaW5nID0gXCJiaWN5Y2xpbmdcIjtcbiAgICBzdGF0aWMgdHJhbnNpdCA9IFwidHJhbnNpdFwiO1xufSJdfQ==