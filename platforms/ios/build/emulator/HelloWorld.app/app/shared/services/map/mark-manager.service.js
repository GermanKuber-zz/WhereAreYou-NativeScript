"use strict";
var core_1 = require("@angular/core");
require("rxjs/add/operator/do");
require("rxjs/add/operator/map");
require("rxjs/add/operator/catch");
var MarkContainer_1 = require("./core/MarkContainer");
var linqts_1 = require("linqts");
var nativescript_google_maps_sdk_1 = require("nativescript-google-maps-sdk");
var MarkManagerService = (function () {
    function MarkManagerService() {
        this.meId = -99999999;
        this.markList = new linqts_1.List();
    }
    Object.defineProperty(MarkManagerService.prototype, "me", {
        get: function () {
            return this._me.mark;
        },
        enumerable: true,
        configurable: true
    });
    //Public Methods
    MarkManagerService.prototype.getMarkWrapper = function (markId) {
        return this.markList.Where(function (x) { return x.markId == markId; }).FirstOrDefault();
    };
    MarkManagerService.prototype.addFriendMark = function (markInfo, markId) {
        if (!this.markList.Any(function (x) { return x.markId == markId; })) {
            var markContainer = new MarkContainer_1.MarkContainer(markInfo, markId, MarkContainer_1.MarkWrapperTypeEnum.Friend);
            this.markList.Add(markContainer);
        }
        else {
            throw new Error("Esta intentando agregar una Mark con un Id repetido");
        }
    };
    MarkManagerService.prototype.addMeMark = function (lat, long) {
        var markInfo = new MarkContainer_1.AddMarkerArgs();
        markInfo.title = "Principal";
        markInfo.location = nativescript_google_maps_sdk_1.Position.positionFromLatLng(lat, long);
        this._me = new MarkContainer_1.MarkContainer(markInfo, this.meId, MarkContainer_1.MarkWrapperTypeEnum.Me);
        return this._me;
    };
    MarkManagerService.prototype.updateMark = function (markInfo, markId) {
        var markWrapper = this.getMarkWrapper(markId);
        if (markWrapper != null) {
            markWrapper.mark.position = markInfo.location;
        }
    };
    MarkManagerService.prototype.removeMark = function (markId) {
        var markContainer = this.markList.Where(function (x) { return x.markId == markId; }).FirstOrDefault();
        if (markContainer != null) {
            this.markList.Remove(markContainer);
        }
    };
    MarkManagerService.prototype.moveMe = function (lat, long) {
        this._me.mark.position.latitude = lat;
        this._me.mark.position.longitude = long;
    };
    return MarkManagerService;
}());
MarkManagerService = __decorate([
    core_1.Injectable()
], MarkManagerService);
exports.MarkManagerService = MarkManagerService;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFyay1tYW5hZ2VyLnNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJtYXJrLW1hbmFnZXIuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsc0NBQTJDO0FBRTNDLGdDQUE4QjtBQUM5QixpQ0FBK0I7QUFDL0IsbUNBQWlDO0FBQ2pDLHNEQUF5RjtBQUN6RixpQ0FBOEI7QUFDOUIsNkVBQWdFO0FBR2hFLElBQWEsa0JBQWtCO0lBRC9CO1FBRVksU0FBSSxHQUFXLENBQUMsUUFBUSxDQUFDO1FBQ3pCLGFBQVEsR0FBd0IsSUFBSSxhQUFJLEVBQWlCLENBQUM7SUF3Q3RFLENBQUM7SUF0Q0csc0JBQUksa0NBQUU7YUFBTjtZQUNJLE1BQU0sQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQztRQUN6QixDQUFDOzs7T0FBQTtJQUNELGdCQUFnQjtJQUNULDJDQUFjLEdBQXJCLFVBQXNCLE1BQWM7UUFDaEMsTUFBTSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLFVBQUEsQ0FBQyxJQUFJLE9BQUEsQ0FBQyxDQUFDLE1BQU0sSUFBSSxNQUFNLEVBQWxCLENBQWtCLENBQUMsQ0FBQyxjQUFjLEVBQUUsQ0FBQztJQUN6RSxDQUFDO0lBQ00sMENBQWEsR0FBcEIsVUFBcUIsUUFBdUIsRUFBRSxNQUFjO1FBQ3hELEVBQUUsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsVUFBQSxDQUFDLElBQUksT0FBQSxDQUFDLENBQUMsTUFBTSxJQUFJLE1BQU0sRUFBbEIsQ0FBa0IsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUM5QyxJQUFJLGFBQWEsR0FBRyxJQUFJLDZCQUFhLENBQUMsUUFBUSxFQUFFLE1BQU0sRUFBRSxtQ0FBbUIsQ0FBQyxNQUFNLENBQUMsQ0FBQztZQUNwRixJQUFJLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxhQUFhLENBQUMsQ0FBQztRQUNyQyxDQUFDO1FBQUMsSUFBSSxDQUFDLENBQUM7WUFDSixNQUFNLElBQUksS0FBSyxDQUFDLHFEQUFxRCxDQUFDLENBQUM7UUFDM0UsQ0FBQztJQUNMLENBQUM7SUFDTSxzQ0FBUyxHQUFoQixVQUFpQixHQUFXLEVBQUUsSUFBWTtRQUN0QyxJQUFJLFFBQVEsR0FBRyxJQUFJLDZCQUFhLEVBQUUsQ0FBQztRQUNuQyxRQUFRLENBQUMsS0FBSyxHQUFHLFdBQVcsQ0FBQztRQUM3QixRQUFRLENBQUMsUUFBUSxHQUFHLHVDQUFRLENBQUMsa0JBQWtCLENBQUMsR0FBRyxFQUFFLElBQUksQ0FBQyxDQUFDO1FBQzNELElBQUksQ0FBQyxHQUFHLEdBQUcsSUFBSSw2QkFBYSxDQUFDLFFBQVEsRUFBRSxJQUFJLENBQUMsSUFBSSxFQUFFLG1DQUFtQixDQUFDLEVBQUUsQ0FBQyxDQUFDO1FBQzFFLE1BQU0sQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDO0lBQ3BCLENBQUM7SUFDTSx1Q0FBVSxHQUFqQixVQUFrQixRQUF1QixFQUFFLE1BQWM7UUFDckQsSUFBSSxXQUFXLEdBQUcsSUFBSSxDQUFDLGNBQWMsQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUM5QyxFQUFFLENBQUMsQ0FBQyxXQUFXLElBQUksSUFBSSxDQUFDLENBQUMsQ0FBQztZQUN0QixXQUFXLENBQUMsSUFBSSxDQUFDLFFBQVEsR0FBRyxRQUFRLENBQUMsUUFBUSxDQUFDO1FBQ2xELENBQUM7SUFDTCxDQUFDO0lBQ00sdUNBQVUsR0FBakIsVUFBa0IsTUFBYztRQUM1QixJQUFJLGFBQWEsR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxVQUFBLENBQUMsSUFBSSxPQUFBLENBQUMsQ0FBQyxNQUFNLElBQUksTUFBTSxFQUFsQixDQUFrQixDQUFDLENBQUMsY0FBYyxFQUFFLENBQUM7UUFDbEYsRUFBRSxDQUFDLENBQUMsYUFBYSxJQUFJLElBQUksQ0FBQyxDQUFDLENBQUM7WUFDeEIsSUFBSSxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsYUFBYSxDQUFDLENBQUM7UUFDeEMsQ0FBQztJQUNMLENBQUM7SUFDTSxtQ0FBTSxHQUFiLFVBQWMsR0FBVyxFQUFFLElBQVk7UUFDbkMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLFFBQVEsR0FBRyxHQUFHLENBQUM7UUFDdEMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUM7SUFDNUMsQ0FBQztJQUNMLHlCQUFDO0FBQUQsQ0FBQyxBQTFDRCxJQTBDQztBQTFDWSxrQkFBa0I7SUFEOUIsaUJBQVUsRUFBRTtHQUNBLGtCQUFrQixDQTBDOUI7QUExQ1ksZ0RBQWtCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XG5pbXBvcnQgeyBPYnNlcnZhYmxlIH0gZnJvbSBcInJ4anMvUnhcIjtcbmltcG9ydCBcInJ4anMvYWRkL29wZXJhdG9yL2RvXCI7XG5pbXBvcnQgXCJyeGpzL2FkZC9vcGVyYXRvci9tYXBcIjtcbmltcG9ydCAncnhqcy9hZGQvb3BlcmF0b3IvY2F0Y2gnO1xuaW1wb3J0IHsgTWFya0NvbnRhaW5lciwgTWFya1dyYXBwZXJUeXBlRW51bSwgQWRkTWFya2VyQXJncyB9IGZyb20gJy4vY29yZS9NYXJrQ29udGFpbmVyJztcbmltcG9ydCB7IExpc3QgfSBmcm9tICdsaW5xdHMnO1xuaW1wb3J0IHsgTWFya2VyLCBQb3NpdGlvbiB9IGZyb20gJ25hdGl2ZXNjcmlwdC1nb29nbGUtbWFwcy1zZGsnO1xuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgTWFya01hbmFnZXJTZXJ2aWNlIHtcbiAgICBwcml2YXRlIG1lSWQ6IG51bWJlciA9IC05OTk5OTk5OTtcbiAgICBwcml2YXRlIG1hcmtMaXN0OiBMaXN0PE1hcmtDb250YWluZXI+ID0gbmV3IExpc3Q8TWFya0NvbnRhaW5lcj4oKTtcbiAgICBwcml2YXRlIF9tZTogTWFya0NvbnRhaW5lcjtcbiAgICBnZXQgbWUoKTogTWFya2VyIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX21lLm1hcms7XG4gICAgfVxuICAgIC8vUHVibGljIE1ldGhvZHNcbiAgICBwdWJsaWMgZ2V0TWFya1dyYXBwZXIobWFya0lkOiBudW1iZXIpOiBNYXJrQ29udGFpbmVyIHtcbiAgICAgICAgcmV0dXJuIHRoaXMubWFya0xpc3QuV2hlcmUoeCA9PiB4Lm1hcmtJZCA9PSBtYXJrSWQpLkZpcnN0T3JEZWZhdWx0KCk7XG4gICAgfVxuICAgIHB1YmxpYyBhZGRGcmllbmRNYXJrKG1hcmtJbmZvOiBBZGRNYXJrZXJBcmdzLCBtYXJrSWQ6IG51bWJlcikge1xuICAgICAgICBpZiAoIXRoaXMubWFya0xpc3QuQW55KHggPT4geC5tYXJrSWQgPT0gbWFya0lkKSkge1xuICAgICAgICAgICAgdmFyIG1hcmtDb250YWluZXIgPSBuZXcgTWFya0NvbnRhaW5lcihtYXJrSW5mbywgbWFya0lkLCBNYXJrV3JhcHBlclR5cGVFbnVtLkZyaWVuZCk7XG4gICAgICAgICAgICB0aGlzLm1hcmtMaXN0LkFkZChtYXJrQ29udGFpbmVyKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcIkVzdGEgaW50ZW50YW5kbyBhZ3JlZ2FyIHVuYSBNYXJrIGNvbiB1biBJZCByZXBldGlkb1wiKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBwdWJsaWMgYWRkTWVNYXJrKGxhdDogbnVtYmVyLCBsb25nOiBudW1iZXIpOiBNYXJrQ29udGFpbmVyIHtcbiAgICAgICAgdmFyIG1hcmtJbmZvID0gbmV3IEFkZE1hcmtlckFyZ3MoKTtcbiAgICAgICAgbWFya0luZm8udGl0bGUgPSBcIlByaW5jaXBhbFwiO1xuICAgICAgICBtYXJrSW5mby5sb2NhdGlvbiA9IFBvc2l0aW9uLnBvc2l0aW9uRnJvbUxhdExuZyhsYXQsIGxvbmcpO1xuICAgICAgICB0aGlzLl9tZSA9IG5ldyBNYXJrQ29udGFpbmVyKG1hcmtJbmZvLCB0aGlzLm1lSWQsIE1hcmtXcmFwcGVyVHlwZUVudW0uTWUpO1xuICAgICAgICByZXR1cm4gdGhpcy5fbWU7XG4gICAgfVxuICAgIHB1YmxpYyB1cGRhdGVNYXJrKG1hcmtJbmZvOiBBZGRNYXJrZXJBcmdzLCBtYXJrSWQ6IG51bWJlcik6IHZvaWQge1xuICAgICAgICB2YXIgbWFya1dyYXBwZXIgPSB0aGlzLmdldE1hcmtXcmFwcGVyKG1hcmtJZCk7XG4gICAgICAgIGlmIChtYXJrV3JhcHBlciAhPSBudWxsKSB7XG4gICAgICAgICAgICBtYXJrV3JhcHBlci5tYXJrLnBvc2l0aW9uID0gbWFya0luZm8ubG9jYXRpb247XG4gICAgICAgIH1cbiAgICB9XG4gICAgcHVibGljIHJlbW92ZU1hcmsobWFya0lkOiBudW1iZXIpOiB2b2lkIHtcbiAgICAgICAgdmFyIG1hcmtDb250YWluZXIgPSB0aGlzLm1hcmtMaXN0LldoZXJlKHggPT4geC5tYXJrSWQgPT0gbWFya0lkKS5GaXJzdE9yRGVmYXVsdCgpO1xuICAgICAgICBpZiAobWFya0NvbnRhaW5lciAhPSBudWxsKSB7XG4gICAgICAgICAgICB0aGlzLm1hcmtMaXN0LlJlbW92ZShtYXJrQ29udGFpbmVyKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBwdWJsaWMgbW92ZU1lKGxhdDogbnVtYmVyLCBsb25nOiBudW1iZXIpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5fbWUubWFyay5wb3NpdGlvbi5sYXRpdHVkZSA9IGxhdDtcbiAgICAgICAgdGhpcy5fbWUubWFyay5wb3NpdGlvbi5sb25naXR1ZGUgPSBsb25nO1xuICAgIH1cbn0iXX0=