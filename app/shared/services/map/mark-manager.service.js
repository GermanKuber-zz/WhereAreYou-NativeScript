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
        this.markFriendsList = new linqts_1.List();
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
        return this.markFriendsList.Where(function (x) { return x.markId == markId; }).FirstOrDefault();
    };
    MarkManagerService.prototype.addFriendMark = function (markInfo, markId) {
        if (!this.markFriendsList.Any(function (x) { return x.markId == markId; })) {
            var markContainer = new MarkContainer_1.MarkContainer(markInfo, markId, MarkContainer_1.MarkWrapperTypeEnum.Friend);
            this.markFriendsList.Add(markContainer);
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
    MarkManagerService.prototype.removeFriendMark = function (markId) {
        var markContainer = this.markFriendsList.Where(function (x) { return x.markId == markId; }).FirstOrDefault();
        if (markContainer != null) {
            this.markFriendsList.Remove(markContainer);
        }
        return markContainer;
    };
    MarkManagerService.prototype.enableDrawWayToMe = function (markId) {
        var markContainer = this.markFriendsList.Where(function (x) { return x.markId == markId; }).FirstOrDefault();
        if (markContainer != null) {
            markContainer.addMarkDrawWay(this._me.markwrapper);
        }
    };
    MarkManagerService.prototype.disableDrawWayToMe = function (markId) {
        var markContainer = this.markFriendsList.Where(function (x) { return x.markId == markId; }).FirstOrDefault();
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFyay1tYW5hZ2VyLnNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJtYXJrLW1hbmFnZXIuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsc0NBQTJDO0FBRTNDLGdDQUE4QjtBQUM5QixpQ0FBK0I7QUFDL0IsbUNBQWlDO0FBQ2pDLHNEQUF5RjtBQUN6RixpQ0FBOEI7QUFDOUIsNkVBQWdFO0FBR2hFLElBQWEsa0JBQWtCO0lBRC9CO1FBRVksU0FBSSxHQUFXLENBQUMsUUFBUSxDQUFDO1FBQ3pCLG9CQUFlLEdBQXdCLElBQUksYUFBSSxFQUFpQixDQUFDO0lBZ0U3RSxDQUFDO0lBOURHLHNCQUFJLGtDQUFFO2FBQU47WUFDSSxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxJQUFJLElBQUksQ0FBQztnQkFDakIsTUFBTSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDO1lBQ3pCLElBQUk7Z0JBQ0EsTUFBTSxDQUFDLElBQUksQ0FBQztRQUNwQixDQUFDOzs7T0FBQTtJQUNELHNCQUFJLHFDQUFLO2FBQVQ7WUFDSSxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxJQUFJLElBQUksQ0FBQztnQkFDakIsTUFBTSxDQUFDLElBQUksQ0FBQztZQUNoQixJQUFJO2dCQUNBLE1BQU0sQ0FBQyxLQUFLLENBQUM7UUFDckIsQ0FBQzs7O09BQUE7SUFDRCxnQkFBZ0I7SUFDVCw2Q0FBZ0IsR0FBdkIsVUFBd0IsTUFBYztRQUNsQyxNQUFNLENBQUMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxLQUFLLENBQUMsVUFBQSxDQUFDLElBQUksT0FBQSxDQUFDLENBQUMsTUFBTSxJQUFJLE1BQU0sRUFBbEIsQ0FBa0IsQ0FBQyxDQUFDLGNBQWMsRUFBRSxDQUFDO0lBQ2hGLENBQUM7SUFDTSwwQ0FBYSxHQUFwQixVQUFxQixRQUF1QixFQUFFLE1BQWM7UUFDeEQsRUFBRSxDQUFDLENBQUMsQ0FBQyxJQUFJLENB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QUFHLENBQUMsV0FBVyxDQUFDLENBQUE7UUFDekQsQ0FBQztJQUNMLENBQUM7SUFDTSxtQ0FBTSxHQUFiLFVBQWMsR0FBVyxFQUFFLElBQVk7UUFDbkMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLFFBQVEsR0FBRyxHQUFHLENBQUM7UUFDdEMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUM7SUFDNUMsQ0FBQztJQUNMLHlCQUFDO0FBQUQsQ0FBQyxBQWxFRCxJQWtFQztBQWxFWSxrQkFBa0I7SUFEOUIsaUJBQVUsRUFBRTtHQUNBLGtCQUFrQixDQWtFOUI7QUFsRVksZ0RBQWtCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XG5pbXBvcnQgeyBPYnNlcnZhYmxlIH0gZnJvbSBcInJ4anMvUnhcIjtcbmltcG9ydCBcInJ4anMvYWRkL29wZXJhdG9yL2RvXCI7XG5pbXBvcnQgXCJyeGpzL2FkZC9vcGVyYXRvci9tYXBcIjtcbmltcG9ydCAncnhqcy9hZGQvb3BlcmF0b3IvY2F0Y2gnO1xuaW1wb3J0IHsgTWFya0NvbnRhaW5lciwgTWFya1dyYXBwZXJUeXBlRW51bSwgQWRkTWFya2VyQXJncyB9IGZyb20gJy4vY29yZS9NYXJrQ29udGFpbmVyJztcbmltcG9ydCB7IExpc3QgfSBmcm9tICdsaW5xdHMnO1xuaW1wb3J0IHsgTWFya2VyLCBQb3NpdGlvbiB9IGZyb20gJ25hdGl2ZXNjcmlwdC1nb29nbGUtbWFwcy1zZGsnO1xuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgTWFya01hbmFnZXJTZXJ2aWNlIHtcbiAgICBwcml2YXRlIG1lSWQ6IG51bWJlciA9IC05OTk5OTk5OTtcbiAgICBwcml2YXRlIG1hcmtGcmllbmRzTGlzdDogTGlzdDxNYXJrQ29udGFpbmVyPiA9IG5ldyBMaXN0PE1hcmtDb250YWluZXI+KCk7XG4gICAgcHJpdmF0ZSBfbWU6IE1hcmtDb250YWluZXI7XG4gICAgZ2V0IG1lKCk6IE1hcmtlciB7XG4gICAgICAgIGlmICh0aGlzLl9tZSAhPSBudWxsKVxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX21lLm1hcms7XG4gICAgICAgIGVsc2VcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgIH1cbiAgICBnZXQgaGFzTWUoKTogYm9vbGVhbiB7XG4gICAgICAgIGlmICh0aGlzLl9tZSAhPSBudWxsKVxuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIGVsc2VcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gICAgLy9QdWJsaWMgTWV0aG9kc1xuICAgIHB1YmxpYyBnZXRNYXJrQ29udGFpbmVyKG1hcmtJZDogbnVtYmVyKTogTWFya0NvbnRhaW5lciB7XG4gICAgICAgIHJldHVybiB0aGlzLm1hcmtGcmllbmRzTGlzdC5XaGVyZSh4ID0+IHgubWFya0lkID09IG1hcmtJZCkuRmlyc3RPckRlZmF1bHQoKTtcbiAgICB9XG4gICAgcHVibGljIGFkZEZyaWVuZE1hcmsobWFya0luZm86IEFkZE1hcmtlckFyZ3MsIG1hcmtJZDogbnVtYmVyKTogTWFya0NvbnRhaW5lciB7XG4gICAgICAgIGlmICghdGhpcy5tYXJrRnJpZW5kc0xpc3QuQW55KHggPT4geC5tYXJrSWQgPT0gbWFya0lkKSkge1xuICAgICAgICAgICAgdmFyIG1hcmtDb250YWluZXIgPSBuZXcgTWFya0NvbnRhaW5lcihtYXJrSW5mbywgbWFya0lkLCBNYXJrV3JhcHBlclR5cGVFbnVtLkZyaWVuZCk7XG4gICAgICAgICAgICB0aGlzLm1hcmtGcmllbmRzTGlzdC5BZGQobWFya0NvbnRhaW5lcik7XG4gICAgICAgICAgICByZXR1cm4gbWFya0NvbnRhaW5lcjtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcIkVzdGEgaW50ZW50YW5kbyBhZ3JlZ2FyIHVuYSBNYXJrIGNvbiB1biBJZCByZXBldGlkb1wiKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBwdWJsaWMgYWRkTWVNYXJrKGxhdDogbnVtYmVyLCBsb25nOiBudW1iZXIpOiBNYXJrQ29udGFpbmVyIHtcbiAgICAgICAgdmFyIG1hcmtJbmZvID0gbmV3IEFkZE1hcmtlckFyZ3MoKTtcbiAgICAgICAgbWFya0luZm8udGl0bGUgPSBcIlByaW5jaXBhbFwiO1xuICAgICAgICBtYXJrSW5mby5sb2NhdGlvbiA9IFBvc2l0aW9uLnBvc2l0aW9uRnJvbUxhdExuZyhsYXQsIGxvbmcpO1xuICAgICAgICB0aGlzLl9tZSA9IG5ldyBNYXJrQ29udGFpbmVyKG1hcmtJbmZvLCB0aGlzLm1lSWQsIE1hcmtXcmFwcGVyVHlwZUVudW0uTWUpO1xuICAgICAgICByZXR1cm4gdGhpcy5fbWU7XG4gICAgfVxuICAgIHB1YmxpYyB1cGRhdGVNYXJrKG1hcmtJbmZvOiBBZGRNYXJrZXJBcmdzLCBtYXJrSWQ6IG51bWJlcik6IE1hcmtDb250YWluZXIge1xuICAgICAgICB2YXIgbWFya0NvbnRhaW5lciA9IHRoaXMuZ2V0TWFya0NvbnRhaW5lcihtYXJrSWQpO1xuICAgICAgICBpZiAobWFya0NvbnRhaW5lciAhPSBudWxsKSB7XG4gICAgICAgICAgICBtYXJrQ29udGFpbmVyLm1hcmsucG9zaXRpb24gPSBtYXJrSW5mby5sb2NhdGlvbjtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gbWFya0NvbnRhaW5lcjtcbiAgICB9XG4gICAgcHVibGljIHJlbW92ZUZyaWVuZE1hcmsobWFya0lkOiBudW1iZXIpOiBNYXJrQ29udGFpbmVyIHtcbiAgICAgICAgdmFyIG1hcmtDb250YWluZXIgPSB0aGlzLm1hcmtGcmllbmRzTGlzdC5XaGVyZSh4ID0+IHgubWFya0lkID09IG1hcmtJZCkuRmlyc3RPckRlZmF1bHQoKTtcbiAgICAgICAgaWYgKG1hcmtDb250YWluZXIgIT0gbnVsbCkge1xuICAgICAgICAgICAgdGhpcy5tYXJrRnJpZW5kc0xpc3QuUmVtb3ZlKG1hcmtDb250YWluZXIpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBtYXJrQ29udGFpbmVyO1xuICAgIH1cbiAgICBwdWJsaWMgZW5hYmxlRHJhd1dheVRvTWUobWFya0lkOiBudW1iZXIpOiB2b2lkIHtcbiAgICAgICAgdmFyIG1hcmtDb250YWluZXIgPSB0aGlzLm1hcmtGcmllbmRzTGlzdC5XaGVyZSh4ID0+IHgubWFya0lkID09IG1hcmtJZCkuRmlyc3RPckRlZmF1bHQoKTtcbiAgICAgICAgaWYgKG1hcmtDb250YWluZXIgIT0gbnVsbCkge1xuICAgICAgICAgICAgbWFya0NvbnRhaW5lci5hZGRNYXJrRHJhd1dheSh0aGlzLl9tZS5tYXJrd3JhcHBlcilcbiAgICAgICAgfVxuICAgIH1cbiAgICBwdWJsaWMgZGlzYWJsZURyYXdXYXlUb01lKG1hcmtJZDogbnVtYmVyKTogdm9pZCB7XG4gICAgICAgIHZhciBtYXJrQ29udGFpbmVyID0gdGhpcy5tYXJrRnJpZW5kc0xpc3QuV2hlcmUoeCA9PiB4Lm1hcmtJZCA9PSBtYXJrSWQpLkZpcnN0T3JEZWZhdWx0KCk7XG4gICAgICAgIGlmIChtYXJrQ29udGFpbmVyICE9IG51bGwpIHtcbiAgICAgICAgICAgIG1hcmtDb250YWluZXIucmVtb3ZlTWFya0RyYXdXYXkodGhpcy5fbWUubWFya3dyYXBwZXIpXG4gICAgICAgIH1cbiAgICB9XG4gICAgcHVibGljIG1vdmVNZShsYXQ6IG51bWJlciwgbG9uZzogbnVtYmVyKTogdm9pZCB7XG4gICAgICAgIHRoaXMuX21lLm1hcmsucG9zaXRpb24ubGF0aXR1ZGUgPSBsYXQ7XG4gICAgICAgIHRoaXMuX21lLm1hcmsucG9zaXRpb24ubG9uZ2l0dWRlID0gbG9uZztcbiAgICB9XG59Il19