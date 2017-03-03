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
            if (this._me != null)
                return this._me.mark;
            else
                return null;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MarkManagerService.prototype, "hasMe", {
        get: function () {
            if (this._me != null)
                return true;
            else
                return false;
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
            return markContainer;
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
    MarkManagerService.prototype.enableDrawWayToMe = function (markId) {
        var markContainer = this.markList.Where(function (x) { return x.markId == markId; }).FirstOrDefault();
        if (markContainer != null) {
            markContainer.addMarkDrawWay(this._me.markwrapper);
        }
    };
    MarkManagerService.prototype.disableDrawWayToMe = function (markId) {
        var markContainer = this.markList.Where(function (x) { return x.markId == markId; }).FirstOrDefault();
        if (markContainer != null) {
            markContainer.removeMarkDrawWay(this._me.markwrapper);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFyay1tYW5hZ2VyLnNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJtYXJrLW1hbmFnZXIuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsc0NBQTJDO0FBRTNDLGdDQUE4QjtBQUM5QixpQ0FBK0I7QUFDL0IsbUNBQWlDO0FBQ2pDLHNEQUF5RjtBQUN6RixpQ0FBOEI7QUFDOUIsNkVBQWdFO0FBR2hFLElBQWEsa0JBQWtCO0lBRC9CO1FBRVksU0FBSSxHQUFXLENBQUMsUUFBUSxDQUFDO1FBQ3pCLGFBQVEsR0FBd0IsSUFBSSxhQUFJLEVBQWlCLENBQUM7SUE4RHRFLENBQUM7SUE1REcsc0JBQUksa0NBQUU7YUFBTjtZQUNJLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLElBQUksSUFBSSxDQUFDO2dCQUNqQixNQUFNLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUM7WUFDekIsSUFBSTtnQkFDQSxNQUFNLENBQUMsSUFBSSxDQUFDO1FBQ3BCLENBQUM7OztPQUFBO0lBQ0Qsc0JBQUkscUNBQUs7YUFBVDtZQUNJLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLElBQUksSUFBSSxDQUFDO2dCQUNqQixNQUFNLENBQUMsSUFBSSxDQUFDO1lBQ2hCLElBQUk7Z0JBQ0EsTUFBTSxDQUFDLEtBQUssQ0FBQztRQUNyQixDQUFDOzs7T0FBQTtJQUNELGdCQUFnQjtJQUNULDJDQUFjLEdBQXJCLFVBQXNCLE1BQWM7UUFDaEMsTUFBTSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLFVBQUEsQ0FBQyxJQUFJLE9BQUEsQ0FBQyxDQUFDLE1BQU0sSUFBSSxNQUFNLEVBQWxCLENBQWtCLENBQUMsQ0FBQyxjQUFjLEVBQUUsQ0FBQztJQUN6RSxDQUFDO0lBQ00sMENBQWEsR0FBcEIsVUFBcUIsUUFBdUIsRUFBRSxNQUFjO1FBQ3hELEVBQUUsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFD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QUFiLFVBQWMsR0FBVyxFQUFFLElBQVk7UUFDbkMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLFFBQVEsR0FBRyxHQUFHLENBQUM7UUFDdEMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUM7SUFDNUMsQ0FBQztJQUNMLHlCQUFDO0FBQUQsQ0FBQyxBQWhFRCxJQWdFQztBQWhFWSxrQkFBa0I7SUFEOUIsaUJBQVUsRUFBRTtHQUNBLGtCQUFrQixDQWdFOUI7QUFoRVksZ0RBQWtCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XG5pbXBvcnQgeyBPYnNlcnZhYmxlIH0gZnJvbSBcInJ4anMvUnhcIjtcbmltcG9ydCBcInJ4anMvYWRkL29wZXJhdG9yL2RvXCI7XG5pbXBvcnQgXCJyeGpzL2FkZC9vcGVyYXRvci9tYXBcIjtcbmltcG9ydCAncnhqcy9hZGQvb3BlcmF0b3IvY2F0Y2gnO1xuaW1wb3J0IHsgTWFya0NvbnRhaW5lciwgTWFya1dyYXBwZXJUeXBlRW51bSwgQWRkTWFya2VyQXJncyB9IGZyb20gJy4vY29yZS9NYXJrQ29udGFpbmVyJztcbmltcG9ydCB7IExpc3QgfSBmcm9tICdsaW5xdHMnO1xuaW1wb3J0IHsgTWFya2VyLCBQb3NpdGlvbiB9IGZyb20gJ25hdGl2ZXNjcmlwdC1nb29nbGUtbWFwcy1zZGsnO1xuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgTWFya01hbmFnZXJTZXJ2aWNlIHtcbiAgICBwcml2YXRlIG1lSWQ6IG51bWJlciA9IC05OTk5OTk5OTtcbiAgICBwcml2YXRlIG1hcmtMaXN0OiBMaXN0PE1hcmtDb250YWluZXI+ID0gbmV3IExpc3Q8TWFya0NvbnRhaW5lcj4oKTtcbiAgICBwcml2YXRlIF9tZTogTWFya0NvbnRhaW5lcjtcbiAgICBnZXQgbWUoKTogTWFya2VyIHtcbiAgICAgICAgaWYgKHRoaXMuX21lICE9IG51bGwpXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fbWUubWFyaztcbiAgICAgICAgZWxzZVxuICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuICAgIGdldCBoYXNNZSgpOiBib29sZWFuIHtcbiAgICAgICAgaWYgKHRoaXMuX21lICE9IG51bGwpXG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgZWxzZVxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgICAvL1B1YmxpYyBNZXRob2RzXG4gICAgcHVibGljIGdldE1hcmtXcmFwcGVyKG1hcmtJZDogbnVtYmVyKTogTWFya0NvbnRhaW5lciB7XG4gICAgICAgIHJldHVybiB0aGlzLm1hcmtMaXN0LldoZXJlKHggPT4geC5tYXJrSWQgPT0gbWFya0lkKS5GaXJzdE9yRGVmYXVsdCgpO1xuICAgIH1cbiAgICBwdWJsaWMgYWRkRnJpZW5kTWFyayhtYXJrSW5mbzogQWRkTWFya2VyQXJncywgbWFya0lkOiBudW1iZXIpOiBNYXJrQ29udGFpbmVyIHtcbiAgICAgICAgaWYgKCF0aGlzLm1hcmtMaXN0LkFueSh4ID0+IHgubWFya0lkID09IG1hcmtJZCkpIHtcbiAgICAgICAgICAgIHZhciBtYXJrQ29udGFpbmVyID0gbmV3IE1hcmtDb250YWluZXIobWFya0luZm8sIG1hcmtJZCwgTWFya1dyYXBwZXJUeXBlRW51bS5GcmllbmQpO1xuICAgICAgICAgICAgdGhpcy5tYXJrTGlzdC5BZGQobWFya0NvbnRhaW5lcik7XG4gICAgICAgICAgICByZXR1cm4gbWFya0NvbnRhaW5lcjtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcIkVzdGEgaW50ZW50YW5kbyBhZ3JlZ2FyIHVuYSBNYXJrIGNvbiB1biBJZCByZXBldGlkb1wiKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBwdWJsaWMgYWRkTWVNYXJrKGxhdDogbnVtYmVyLCBsb25nOiBudW1iZXIpOiBNYXJrQ29udGFpbmVyIHtcbiAgICAgICAgdmFyIG1hcmtJbmZvID0gbmV3IEFkZE1hcmtlckFyZ3MoKTtcbiAgICAgICAgbWFya0luZm8udGl0bGUgPSBcIlByaW5jaXBhbFwiO1xuICAgICAgICBtYXJrSW5mby5sb2NhdGlvbiA9IFBvc2l0aW9uLnBvc2l0aW9uRnJvbUxhdExuZyhsYXQsIGxvbmcpO1xuICAgICAgICB0aGlzLl9tZSA9IG5ldyBNYXJrQ29udGFpbmVyKG1hcmtJbmZvLCB0aGlzLm1lSWQsIE1hcmtXcmFwcGVyVHlwZUVudW0uTWUpO1xuICAgICAgICByZXR1cm4gdGhpcy5fbWU7XG4gICAgfVxuICAgIHB1YmxpYyB1cGRhdGVNYXJrKG1hcmtJbmZvOiBBZGRNYXJrZXJBcmdzLCBtYXJrSWQ6IG51bWJlcik6IHZvaWQge1xuICAgICAgICB2YXIgbWFya1dyYXBwZXIgPSB0aGlzLmdldE1hcmtXcmFwcGVyKG1hcmtJZCk7XG4gICAgICAgIGlmIChtYXJrV3JhcHBlciAhPSBudWxsKSB7XG4gICAgICAgICAgICBtYXJrV3JhcHBlci5tYXJrLnBvc2l0aW9uID0gbWFya0luZm8ubG9jYXRpb247XG4gICAgICAgIH1cbiAgICB9XG4gICAgcHVibGljIHJlbW92ZU1hcmsobWFya0lkOiBudW1iZXIpOiB2b2lkIHtcbiAgICAgICAgdmFyIG1hcmtDb250YWluZXIgPSB0aGlzLm1hcmtMaXN0LldoZXJlKHggPT4geC5tYXJrSWQgPT0gbWFya0lkKS5GaXJzdE9yRGVmYXVsdCgpO1xuICAgICAgICBpZiAobWFya0NvbnRhaW5lciAhPSBudWxsKSB7XG4gICAgICAgICAgICB0aGlzLm1hcmtMaXN0LlJlbW92ZShtYXJrQ29udGFpbmVyKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBwdWJsaWMgZW5hYmxlRHJhd1dheVRvTWUobWFya0lkOiBudW1iZXIpOiB2b2lkIHtcbiAgICAgICAgdmFyIG1hcmtDb250YWluZXIgPSB0aGlzLm1hcmtMaXN0LldoZXJlKHggPT4geC5tYXJrSWQgPT0gbWFya0lkKS5GaXJzdE9yRGVmYXVsdCgpO1xuICAgICAgICBpZiAobWFya0NvbnRhaW5lciAhPSBudWxsKSB7XG4gICAgICAgICAgICBtYXJrQ29udGFpbmVyLmFkZE1hcmtEcmF3V2F5KHRoaXMuX21lLm1hcmt3cmFwcGVyKVxuICAgICAgICB9IFxuICAgIH1cbiAgICBwdWJsaWMgZGlzYWJsZURyYXdXYXlUb01lKG1hcmtJZDogbnVtYmVyKTogdm9pZCB7XG4gICAgICAgIHZhciBtYXJrQ29udGFpbmVyID0gdGhpcy5tYXJrTGlzdC5XaGVyZSh4ID0+IHgubWFya0lkID09IG1hcmtJZCkuRmlyc3RPckRlZmF1bHQoKTtcbiAgICAgICAgaWYgKG1hcmtDb250YWluZXIgIT0gbnVsbCkge1xuICAgICAgICAgICAgbWFya0NvbnRhaW5lci5yZW1vdmVNYXJrRHJhd1dheSh0aGlzLl9tZS5tYXJrd3JhcHBlcilcbiAgICAgICAgfVxuICAgIH1cbiAgICBwdWJsaWMgbW92ZU1lKGxhdDogbnVtYmVyLCBsb25nOiBudW1iZXIpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5fbWUubWFyay5wb3NpdGlvbi5sYXRpdHVkZSA9IGxhdDtcbiAgICAgICAgdGhpcy5fbWUubWFyay5wb3NpdGlvbi5sb25naXR1ZGUgPSBsb25nO1xuICAgIH1cbn0iXX0=