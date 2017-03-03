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
        else {
            throw new Error("Esta intentando activar la opcion de DrawWayToMe sobre el MarkId=" + markId + " que no existe");
        }
    };
    MarkManagerService.prototype.disableDrawWayToMe = function (markId) {
        var markContainer = this.markList.Where(function (x) { return x.markId == markId; }).FirstOrDefault();
        if (markContainer != null) {
            markContainer.removeMarkDrawWay(this._me.markwrapper);
        }
        else {
            throw new Error("Esta intentando desctivar la opcion de DrawWayToMe sobre el MarkId=" + markId + " que no existe");
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFyay1tYW5hZ2VyLnNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJtYXJrLW1hbmFnZXIuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsc0NBQTJDO0FBRTNDLGdDQUE4QjtBQUM5QixpQ0FBK0I7QUFDL0IsbUNBQWlDO0FBQ2pDLHNEQUF5RjtBQUN6RixpQ0FBOEI7QUFDOUIsNkVBQWdFO0FBR2hFLElBQWEsa0JBQWtCO0lBRC9CO1FBRVksU0FBSSxHQUFXLENBQUMsUUFBUSxDQUFDO1FBQ3pCLGFBQVEsR0FBd0IsSUFBSSxhQUFJLEVBQWlCLENBQUM7SUFrRXRFLENBQUM7SUFoRUcsc0JBQUksa0NBQUU7YUFBTjtZQUNJLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLElBQUksSUFBSSxDQUFDO2dCQUNqQixNQUFNLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUM7WUFDekIsSUFBSTtnQkFDQSxNQUFNLENBQUMsSUFBSSxDQUFDO1FBQ3BCLENBQUM7OztPQUFBO0lBQ0Qsc0JBQUkscUNBQUs7YUFBVDtZQUNJLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLElBQUksSUFBSSxDQUFDO2dCQUNqQixNQUFNLENBQUMsSUFBSSxDQUFDO1lBQ2hCLElBQUk7Z0JBQ0EsTUFBTSxDQUFDLEtBQUssQ0FBQztRQUNyQixDQUFDOzs7T0FBQTtJQUNELGdCQUFnQjtJQUNULDJDQUFjLEdBQXJCLFVBQXNCLE1BQWM7UUFDaEMsTUFBTSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLFVBQUEsQ0FBQyxJQUFJLE9BQUEsQ0FBQyxDQUFDLE1BQU0sSUFBSSxNQUFNLEVBQWxCLENBQWtCLENBQUMsQ0FBQyxjQUFjLEVBQUUsQ0FBQztJQUN6RSxDQUFDO0lBQ00sMENBQWEsR0FBcEIsVUFBcUIsUUFBdUIsRUFBRSxNQUFjO1FBQ3hELEVBQUUsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFD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Q0FBQyxpQkFBaUIsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLFdBQVcsQ0FBQyxDQUFBO1FBQ3pELENBQUM7UUFBQyxJQUFJLENBQUMsQ0FBQztZQUNKLE1BQU0sSUFBSSxLQUFLLENBQUMsd0VBQXNFLE1BQU0sbUJBQWdCLENBQUMsQ0FBQTtRQUNqSCxDQUFDO0lBQ0wsQ0FBQztJQUNNLG1DQUFNLEdBQWIsVUFBYyxHQUFXLEVBQUUsSUFBWTtRQUNuQyxJQUFJLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsUUFBUSxHQUFHLEdBQUcsQ0FBQztRQUN0QyxJQUFJLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQztJQUM1QyxDQUFDO0lBQ0wseUJBQUM7QUFBRCxDQUFDLEFBcEVELElBb0VDO0FBcEVZLGtCQUFrQjtJQUQ5QixpQkFBVSxFQUFFO0dBQ0Esa0JBQWtCLENBb0U5QjtBQXBFWSxnREFBa0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcbmltcG9ydCB7IE9ic2VydmFibGUgfSBmcm9tIFwicnhqcy9SeFwiO1xuaW1wb3J0IFwicnhqcy9hZGQvb3BlcmF0b3IvZG9cIjtcbmltcG9ydCBcInJ4anMvYWRkL29wZXJhdG9yL21hcFwiO1xuaW1wb3J0ICdyeGpzL2FkZC9vcGVyYXRvci9jYXRjaCc7XG5pbXBvcnQgeyBNYXJrQ29udGFpbmVyLCBNYXJrV3JhcHBlclR5cGVFbnVtLCBBZGRNYXJrZXJBcmdzIH0gZnJvbSAnLi9jb3JlL01hcmtDb250YWluZXInO1xuaW1wb3J0IHsgTGlzdCB9IGZyb20gJ2xpbnF0cyc7XG5pbXBvcnQgeyBNYXJrZXIsIFBvc2l0aW9uIH0gZnJvbSAnbmF0aXZlc2NyaXB0LWdvb2dsZS1tYXBzLXNkayc7XG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBNYXJrTWFuYWdlclNlcnZpY2Uge1xuICAgIHByaXZhdGUgbWVJZDogbnVtYmVyID0gLTk5OTk5OTk5O1xuICAgIHByaXZhdGUgbWFya0xpc3Q6IExpc3Q8TWFya0NvbnRhaW5lcj4gPSBuZXcgTGlzdDxNYXJrQ29udGFpbmVyPigpO1xuICAgIHByaXZhdGUgX21lOiBNYXJrQ29udGFpbmVyO1xuICAgIGdldCBtZSgpOiBNYXJrZXIge1xuICAgICAgICBpZiAodGhpcy5fbWUgIT0gbnVsbClcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9tZS5tYXJrO1xuICAgICAgICBlbHNlXG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG4gICAgZ2V0IGhhc01lKCk6IGJvb2xlYW4ge1xuICAgICAgICBpZiAodGhpcy5fbWUgIT0gbnVsbClcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICBlbHNlXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICAgIC8vUHVibGljIE1ldGhvZHNcbiAgICBwdWJsaWMgZ2V0TWFya1dyYXBwZXIobWFya0lkOiBudW1iZXIpOiBNYXJrQ29udGFpbmVyIHtcbiAgICAgICAgcmV0dXJuIHRoaXMubWFya0xpc3QuV2hlcmUoeCA9PiB4Lm1hcmtJZCA9PSBtYXJrSWQpLkZpcnN0T3JEZWZhdWx0KCk7XG4gICAgfVxuICAgIHB1YmxpYyBhZGRGcmllbmRNYXJrKG1hcmtJbmZvOiBBZGRNYXJrZXJBcmdzLCBtYXJrSWQ6IG51bWJlcik6IE1hcmtDb250YWluZXIge1xuICAgICAgICBpZiAoIXRoaXMubWFya0xpc3QuQW55KHggPT4geC5tYXJrSWQgPT0gbWFya0lkKSkge1xuICAgICAgICAgICAgdmFyIG1hcmtDb250YWluZXIgPSBuZXcgTWFya0NvbnRhaW5lcihtYXJrSW5mbywgbWFya0lkLCBNYXJrV3JhcHBlclR5cGVFbnVtLkZyaWVuZCk7XG4gICAgICAgICAgICB0aGlzLm1hcmtMaXN0LkFkZChtYXJrQ29udGFpbmVyKTtcbiAgICAgICAgICAgIHJldHVybiBtYXJrQ29udGFpbmVyO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiRXN0YSBpbnRlbnRhbmRvIGFncmVnYXIgdW5hIE1hcmsgY29uIHVuIElkIHJlcGV0aWRvXCIpO1xuICAgICAgICB9XG4gICAgfVxuICAgIHB1YmxpYyBhZGRNZU1hcmsobGF0OiBudW1iZXIsIGxvbmc6IG51bWJlcik6IE1hcmtDb250YWluZXIge1xuICAgICAgICB2YXIgbWFya0luZm8gPSBuZXcgQWRkTWFya2VyQXJncygpO1xuICAgICAgICBtYXJrSW5mby50aXRsZSA9IFwiUHJpbmNpcGFsXCI7XG4gICAgICAgIG1hcmtJbmZvLmxvY2F0aW9uID0gUG9zaXRpb24ucG9zaXRpb25Gcm9tTGF0TG5nKGxhdCwgbG9uZyk7XG4gICAgICAgIHRoaXMuX21lID0gbmV3IE1hcmtDb250YWluZXIobWFya0luZm8sIHRoaXMubWVJZCwgTWFya1dyYXBwZXJUeXBlRW51bS5NZSk7XG4gICAgICAgIHJldHVybiB0aGlzLl9tZTtcbiAgICB9XG4gICAgcHVibGljIHVwZGF0ZU1hcmsobWFya0luZm86IEFkZE1hcmtlckFyZ3MsIG1hcmtJZDogbnVtYmVyKTogdm9pZCB7XG4gICAgICAgIHZhciBtYXJrV3JhcHBlciA9IHRoaXMuZ2V0TWFya1dyYXBwZXIobWFya0lkKTtcbiAgICAgICAgaWYgKG1hcmtXcmFwcGVyICE9IG51bGwpIHtcbiAgICAgICAgICAgIG1hcmtXcmFwcGVyLm1hcmsucG9zaXRpb24gPSBtYXJrSW5mby5sb2NhdGlvbjtcbiAgICAgICAgfVxuICAgIH1cbiAgICBwdWJsaWMgcmVtb3ZlTWFyayhtYXJrSWQ6IG51bWJlcik6IHZvaWQge1xuICAgICAgICB2YXIgbWFya0NvbnRhaW5lciA9IHRoaXMubWFya0xpc3QuV2hlcmUoeCA9PiB4Lm1hcmtJZCA9PSBtYXJrSWQpLkZpcnN0T3JEZWZhdWx0KCk7XG4gICAgICAgIGlmIChtYXJrQ29udGFpbmVyICE9IG51bGwpIHtcbiAgICAgICAgICAgIHRoaXMubWFya0xpc3QuUmVtb3ZlKG1hcmtDb250YWluZXIpO1xuICAgICAgICB9XG4gICAgfVxuICAgIHB1YmxpYyBlbmFibGVEcmF3V2F5VG9NZShtYXJrSWQ6IG51bWJlcik6IHZvaWQge1xuICAgICAgICB2YXIgbWFya0NvbnRhaW5lciA9IHRoaXMubWFya0xpc3QuV2hlcmUoeCA9PiB4Lm1hcmtJZCA9PSBtYXJrSWQpLkZpcnN0T3JEZWZhdWx0KCk7XG4gICAgICAgIGlmIChtYXJrQ29udGFpbmVyICE9IG51bGwpIHtcbiAgICAgICAgICAgIG1hcmtDb250YWluZXIuYWRkTWFya0RyYXdXYXkodGhpcy5fbWUubWFya3dyYXBwZXIpXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYEVzdGEgaW50ZW50YW5kbyBhY3RpdmFyIGxhIG9wY2lvbiBkZSBEcmF3V2F5VG9NZSBzb2JyZSBlbCBNYXJrSWQ9JHttYXJrSWR9IHF1ZSBubyBleGlzdGVgKVxuICAgICAgICB9XG4gICAgfVxuICAgIHB1YmxpYyBkaXNhYmxlRHJhd1dheVRvTWUobWFya0lkOiBudW1iZXIpOiB2b2lkIHtcbiAgICAgICAgdmFyIG1hcmtDb250YWluZXIgPSB0aGlzLm1hcmtMaXN0LldoZXJlKHggPT4geC5tYXJrSWQgPT0gbWFya0lkKS5GaXJzdE9yRGVmYXVsdCgpO1xuICAgICAgICBpZiAobWFya0NvbnRhaW5lciAhPSBudWxsKSB7XG4gICAgICAgICAgICBtYXJrQ29udGFpbmVyLnJlbW92ZU1hcmtEcmF3V2F5KHRoaXMuX21lLm1hcmt3cmFwcGVyKVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBFc3RhIGludGVudGFuZG8gZGVzY3RpdmFyIGxhIG9wY2lvbiBkZSBEcmF3V2F5VG9NZSBzb2JyZSBlbCBNYXJrSWQ9JHttYXJrSWR9IHF1ZSBubyBleGlzdGVgKVxuICAgICAgICB9XG4gICAgfVxuICAgIHB1YmxpYyBtb3ZlTWUobGF0OiBudW1iZXIsIGxvbmc6IG51bWJlcik6IHZvaWQge1xuICAgICAgICB0aGlzLl9tZS5tYXJrLnBvc2l0aW9uLmxhdGl0dWRlID0gbGF0O1xuICAgICAgICB0aGlzLl9tZS5tYXJrLnBvc2l0aW9uLmxvbmdpdHVkZSA9IGxvbmc7XG4gICAgfVxufSJdfQ==