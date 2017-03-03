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
    MarkManagerService.prototype.getMarkContainer = function (markId) {
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
        var markContainer = this.getMarkContainer(markId);
        if (markContainer != null) {
            markContainer.mark.position = markInfo.location;
        }
        return markContainer;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFyay1tYW5hZ2VyLnNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJtYXJrLW1hbmFnZXIuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsc0NBQTJDO0FBRTNDLGdDQUE4QjtBQUM5QixpQ0FBK0I7QUFDL0IsbUNBQWlDO0FBQ2pDLHNEQUF5RjtBQUN6RixpQ0FBOEI7QUFDOUIsNkVBQWdFO0FBR2hFLElBQWEsa0JBQWtCO0lBRC9CO1FBRVksU0FBSSxHQUFXLENBQUMsUUFBUSxDQUFDO1FBQ3pCLGFBQVEsR0FBd0IsSUFBSSxhQUFJLEVBQWlCLENBQUM7SUErRHRFLENBQUM7SUE3REcsc0JBQUksa0NBQUU7YUFBTjtZQUNJLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLElBQUksSUFBSSxDQUFDO2dCQUNqQixNQUFNLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUM7WUFDekIsSUFBSTtnQkFDQSxNQUFNLENBQUMsSUFBSSxDQUFDO1FBQ3BCLENBQUM7OztPQUFBO0lBQ0Qsc0JBQUkscUNBQUs7YUFBVDtZQUNJLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLElBQUksSUFBSSxDQUFDO2dCQUNqQixNQUFNLENBQUMsSUFBSSxDQUFDO1lBQ2hCLElBQUk7Z0JBQ0EsTUFBTSxDQUFDLEtBQUssQ0FBQztRQUNyQixDQUFDOzs7T0FBQTtJQUNELGdCQUFnQjtJQUNULDZDQUFnQixHQUF2QixVQUF3QixNQUFjO1FBQ2xDLE1BQU0sQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxVQUFBLENBQUMsSUFBSSxPQUFBLENBQUMsQ0FBQyxNQUFNLElBQUksTUFBTSxFQUFsQixDQUFrQixDQUFDLENBQUMsY0FBYyxFQUFFLENBQUM7SUFDekUsQ0FBQztJQUNNLDBDQUFhLEdBQXBCLFVBQXFCLFFBQXVCLEVBQUUsTUFBYztRQUN4RCxFQUFFLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FB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RCxDQUFDO0lBQ0wsQ0FBQztJQUNNLG1DQUFNLEdBQWIsVUFBYyxHQUFXLEVBQUUsSUFBWTtRQUNuQyxJQUFJLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsUUFBUSxHQUFHLEdBQUcsQ0FBQztRQUN0QyxJQUFJLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQztJQUM1QyxDQUFDO0lBQ0wseUJBQUM7QUFBRCxDQUFDLEFBakVELElBaUVDO0FBakVZLGtCQUFrQjtJQUQ5QixpQkFBVSxFQUFFO0dBQ0Esa0JBQWtCLENBaUU5QjtBQWpFWSxnREFBa0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcbmltcG9ydCB7IE9ic2VydmFibGUgfSBmcm9tIFwicnhqcy9SeFwiO1xuaW1wb3J0IFwicnhqcy9hZGQvb3BlcmF0b3IvZG9cIjtcbmltcG9ydCBcInJ4anMvYWRkL29wZXJhdG9yL21hcFwiO1xuaW1wb3J0ICdyeGpzL2FkZC9vcGVyYXRvci9jYXRjaCc7XG5pbXBvcnQgeyBNYXJrQ29udGFpbmVyLCBNYXJrV3JhcHBlclR5cGVFbnVtLCBBZGRNYXJrZXJBcmdzIH0gZnJvbSAnLi9jb3JlL01hcmtDb250YWluZXInO1xuaW1wb3J0IHsgTGlzdCB9IGZyb20gJ2xpbnF0cyc7XG5pbXBvcnQgeyBNYXJrZXIsIFBvc2l0aW9uIH0gZnJvbSAnbmF0aXZlc2NyaXB0LWdvb2dsZS1tYXBzLXNkayc7XG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBNYXJrTWFuYWdlclNlcnZpY2Uge1xuICAgIHByaXZhdGUgbWVJZDogbnVtYmVyID0gLTk5OTk5OTk5O1xuICAgIHByaXZhdGUgbWFya0xpc3Q6IExpc3Q8TWFya0NvbnRhaW5lcj4gPSBuZXcgTGlzdDxNYXJrQ29udGFpbmVyPigpO1xuICAgIHByaXZhdGUgX21lOiBNYXJrQ29udGFpbmVyO1xuICAgIGdldCBtZSgpOiBNYXJrZXIge1xuICAgICAgICBpZiAodGhpcy5fbWUgIT0gbnVsbClcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9tZS5tYXJrO1xuICAgICAgICBlbHNlXG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG4gICAgZ2V0IGhhc01lKCk6IGJvb2xlYW4ge1xuICAgICAgICBpZiAodGhpcy5fbWUgIT0gbnVsbClcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICBlbHNlXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICAgIC8vUHVibGljIE1ldGhvZHNcbiAgICBwdWJsaWMgZ2V0TWFya0NvbnRhaW5lcihtYXJrSWQ6IG51bWJlcik6IE1hcmtDb250YWluZXIge1xuICAgICAgICByZXR1cm4gdGhpcy5tYXJrTGlzdC5XaGVyZSh4ID0+IHgubWFya0lkID09IG1hcmtJZCkuRmlyc3RPckRlZmF1bHQoKTtcbiAgICB9XG4gICAgcHVibGljIGFkZEZyaWVuZE1hcmsobWFya0luZm86IEFkZE1hcmtlckFyZ3MsIG1hcmtJZDogbnVtYmVyKTogTWFya0NvbnRhaW5lciB7XG4gICAgICAgIGlmICghdGhpcy5tYXJrTGlzdC5BbnkoeCA9PiB4Lm1hcmtJZCA9PSBtYXJrSWQpKSB7XG4gICAgICAgICAgICB2YXIgbWFya0NvbnRhaW5lciA9IG5ldyBNYXJrQ29udGFpbmVyKG1hcmtJbmZvLCBtYXJrSWQsIE1hcmtXcmFwcGVyVHlwZUVudW0uRnJpZW5kKTtcbiAgICAgICAgICAgIHRoaXMubWFya0xpc3QuQWRkKG1hcmtDb250YWluZXIpO1xuICAgICAgICAgICAgcmV0dXJuIG1hcmtDb250YWluZXI7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJFc3RhIGludGVudGFuZG8gYWdyZWdhciB1bmEgTWFyayBjb24gdW4gSWQgcmVwZXRpZG9cIik7XG4gICAgICAgIH1cbiAgICB9XG4gICAgcHVibGljIGFkZE1lTWFyayhsYXQ6IG51bWJlciwgbG9uZzogbnVtYmVyKTogTWFya0NvbnRhaW5lciB7XG4gICAgICAgIHZhciBtYXJrSW5mbyA9IG5ldyBBZGRNYXJrZXJBcmdzKCk7XG4gICAgICAgIG1hcmtJbmZvLnRpdGxlID0gXCJQcmluY2lwYWxcIjtcbiAgICAgICAgbWFya0luZm8ubG9jYXRpb24gPSBQb3NpdGlvbi5wb3NpdGlvbkZyb21MYXRMbmcobGF0LCBsb25nKTtcbiAgICAgICAgdGhpcy5fbWUgPSBuZXcgTWFya0NvbnRhaW5lcihtYXJrSW5mbywgdGhpcy5tZUlkLCBNYXJrV3JhcHBlclR5cGVFbnVtLk1lKTtcbiAgICAgICAgcmV0dXJuIHRoaXMuX21lO1xuICAgIH1cbiAgICBwdWJsaWMgdXBkYXRlTWFyayhtYXJrSW5mbzogQWRkTWFya2VyQXJncywgbWFya0lkOiBudW1iZXIpOiBNYXJrQ29udGFpbmVyIHtcbiAgICAgICAgdmFyIG1hcmtDb250YWluZXIgPSB0aGlzLmdldE1hcmtDb250YWluZXIobWFya0lkKTtcbiAgICAgICAgaWYgKG1hcmtDb250YWluZXIgIT0gbnVsbCkge1xuICAgICAgICAgICAgbWFya0NvbnRhaW5lci5tYXJrLnBvc2l0aW9uID0gbWFya0luZm8ubG9jYXRpb247XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIG1hcmtDb250YWluZXI7XG4gICAgfVxuICAgIHB1YmxpYyByZW1vdmVNYXJrKG1hcmtJZDogbnVtYmVyKTogdm9pZCB7XG4gICAgICAgIHZhciBtYXJrQ29udGFpbmVyID0gdGhpcy5tYXJrTGlzdC5XaGVyZSh4ID0+IHgubWFya0lkID09IG1hcmtJZCkuRmlyc3RPckRlZmF1bHQoKTtcbiAgICAgICAgaWYgKG1hcmtDb250YWluZXIgIT0gbnVsbCkge1xuICAgICAgICAgICAgdGhpcy5tYXJrTGlzdC5SZW1vdmUobWFya0NvbnRhaW5lcik7XG4gICAgICAgIH1cbiAgICB9XG4gICAgcHVibGljIGVuYWJsZURyYXdXYXlUb01lKG1hcmtJZDogbnVtYmVyKTogdm9pZCB7XG4gICAgICAgIHZhciBtYXJrQ29udGFpbmVyID0gdGhpcy5tYXJrTGlzdC5XaGVyZSh4ID0+IHgubWFya0lkID09IG1hcmtJZCkuRmlyc3RPckRlZmF1bHQoKTtcbiAgICAgICAgaWYgKG1hcmtDb250YWluZXIgIT0gbnVsbCkge1xuICAgICAgICAgICAgbWFya0NvbnRhaW5lci5hZGRNYXJrRHJhd1dheSh0aGlzLl9tZS5tYXJrd3JhcHBlcilcbiAgICAgICAgfSBcbiAgICB9XG4gICAgcHVibGljIGRpc2FibGVEcmF3V2F5VG9NZShtYXJrSWQ6IG51bWJlcik6IHZvaWQge1xuICAgICAgICB2YXIgbWFya0NvbnRhaW5lciA9IHRoaXMubWFya0xpc3QuV2hlcmUoeCA9PiB4Lm1hcmtJZCA9PSBtYXJrSWQpLkZpcnN0T3JEZWZhdWx0KCk7XG4gICAgICAgIGlmIChtYXJrQ29udGFpbmVyICE9IG51bGwpIHtcbiAgICAgICAgICAgIG1hcmtDb250YWluZXIucmVtb3ZlTWFya0RyYXdXYXkodGhpcy5fbWUubWFya3dyYXBwZXIpXG4gICAgICAgIH1cbiAgICB9XG4gICAgcHVibGljIG1vdmVNZShsYXQ6IG51bWJlciwgbG9uZzogbnVtYmVyKTogdm9pZCB7XG4gICAgICAgIHRoaXMuX21lLm1hcmsucG9zaXRpb24ubGF0aXR1ZGUgPSBsYXQ7XG4gICAgICAgIHRoaXMuX21lLm1hcmsucG9zaXRpb24ubG9uZ2l0dWRlID0gbG9uZztcbiAgICB9XG59Il19