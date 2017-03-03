"use strict";
var nativescript_google_maps_sdk_1 = require("nativescript-google-maps-sdk");
var image_1 = require("ui/image");
var linqts_1 = require("linqts");
var AddLineArgs = (function () {
    function AddLineArgs() {
    }
    return AddLineArgs;
}());
exports.AddLineArgs = AddLineArgs;
var AddMarkerArgs = (function () {
    function AddMarkerArgs() {
    }
    return AddMarkerArgs;
}());
exports.AddMarkerArgs = AddMarkerArgs;
var MarkWrapper = (function () {
    function MarkWrapper(mark, markType) {
        this.mark = mark;
        this.markType = markType;
    }
    return MarkWrapper;
}());
exports.MarkWrapper = MarkWrapper;
var MarkContainer = (function () {
    function MarkContainer(markInfo, markId, markType) {
        this.markDrawWayList = new linqts_1.List();
        //Creo un MarkWrapper el cual relaciona el Marker con el id del usuario dibujado
        var mark = new AddMarkerArgs();
        mark.title = markInfo.title;
        mark.location = new nativescript_google_maps_sdk_1.Position();
        mark.location.latitude = markInfo.location.latitude;
        mark.location.longitude = markInfo.location.longitude;
        var mapMark = null;
        if (markType == MarkWrapperTypeEnum.Me)
            mapMark = this.createMark(mark, "~/images/me-marker.png");
        else
            mapMark = this.createMark(mark);
        var markWrapper = new MarkWrapper(mapMark, markType);
        markWrapper.markId = markId;
        this.markWrapper = markWrapper;
    }
    Object.defineProperty(MarkContainer.prototype, "markId", {
        get: function () {
            return this.markWrapper.markId;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MarkContainer.prototype, "mark", {
        get: function () {
            return this.markWrapper.mark;
        },
        enumerable: true,
        configurable: true
    });
    MarkContainer.prototype.createMark = function (args, imgSrc) {
        if (imgSrc === void 0) { imgSrc = "~/images/friend-marker.png"; }
        var mark = new nativescript_google_maps_sdk_1.Marker();
        mark.position = nativescript_google_maps_sdk_1.Position.positionFromLatLng(args.location.latitude, args.location.longitude);
        mark.title = args.title;
        mark.snippet = args.title;
        var image = new image_1.Image();
        image.src = imgSrc;
        mark.icon = image;
        return mark;
    };
    ;
    MarkContainer.prototype.addMarkDrawWay = function (mark) {
        if (!this.markDrawWayList.Any(function (x) { return x.markId == mark.markId; })) {
            this.markDrawWayList.Add(mark);
        }
    };
    return MarkContainer;
}());
exports.MarkContainer = MarkContainer;
var MarkWrapperTypeEnum;
(function (MarkWrapperTypeEnum) {
    MarkWrapperTypeEnum[MarkWrapperTypeEnum["Friend"] = 0] = "Friend";
    MarkWrapperTypeEnum[MarkWrapperTypeEnum["Me"] = 1] = "Me";
    MarkWrapperTypeEnum[MarkWrapperTypeEnum["Group"] = 2] = "Group";
})(MarkWrapperTypeEnum = exports.MarkWrapperTypeEnum || (exports.MarkWrapperTypeEnum = {}));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiTWFya0NvbnRhaW5lci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIk1hcmtDb250YWluZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUNBLDZFQUEwRTtBQUMxRSxrQ0FBaUM7QUFDakMsaUNBQThCO0FBQzlCO0lBQUE7SUFNQSxDQUFDO0lBQUQsa0JBQUM7QUFBRCxDQUFDLEFBTkQsSUFNQztBQU5ZLGtDQUFXO0FBUXhCO0lBQUE7SUFHQSxDQUFDO0lBQUQsb0JBQUM7QUFBRCxDQUFDLEFBSEQsSUFHQztBQUhZLHNDQUFhO0FBSzFCO0lBRUkscUJBQW1CLElBQVksRUFBVSxRQUE2QjtRQUFuRCxTQUFJLEdBQUosSUFBSSxDQUFRO1FBQVUsYUFBUSxHQUFSLFFBQVEsQ0FBcUI7SUFBSSxDQUFDO0lBRS9FLGtCQUFDO0FBQUQsQ0FBQyxBQUpELElBSUM7QUFKWSxrQ0FBVztBQUt4QjtJQVNJLHVCQUFtQixRQUF1QixFQUFFLE1BQWMsRUFBRSxRQUE2QjtRQVJqRixvQkFBZSxHQUFzQixJQUFJLGFBQUksRUFBZSxDQUFDO1FBU2pFLGdGQUFnRjtRQUNoRixJQUFJLElBQUksR0FBRyxJQUFJLGFBQWEsRUFBRSxDQUFDO1FBQy9CLElBQUksQ0FBQyxLQUFLLEdBQUcsUUFBUSxDQUFDLEtBQUssQ0FBQztRQUM1QixJQUFJLENBQUMsUUFBUSxHQUFHLElBQUksdUNBQVEsRUFBRSxDQUFDO1FBQy9CLElBQUksQ0FBQyxRQUFRLENBQUMsUUFBUSxHQUFHLFFBQVEsQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDO1FBQ3BELElBQUksQ0FBQyxRQUFRLENBQUMsU0FBUyxHQUFHLFFBQVEsQ0FBQyxRQUFRLENBQUMsU0FBUyxDQUFDO1FBQ3RELElBQUksT0FBTyxHQUFXLElBQUksQ0FBQztRQUMzQixFQUFFLENBQUMsQ0FBQyxRQUFRLElBQUksbUJBQW1CLENBQUMsRUFBRSxDQUFDO1lBQ25DLE9BQU8sR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksRUFBRSx3QkFBd0IsQ0FBQyxDQUFDO1FBQzlELElBQUk7WUFDQSxPQUFPLEdBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUVwQyxJQUFJLFdBQVcsR0FBRyxJQUFJLFdBQVcsQ0FBQyxPQUFPLEVBQUUsUUFBUSxDQUFDLENBQUM7UUFDckQsV0FBVyxDQUFDLE1BQU0sR0FBRyxNQUFNLENBQUM7UUFDNUIsSUFBSSxDQUFDLFdBQVcsR0FBRyxXQUFXLENBQUM7SUFDbkMsQ0FBQztJQXRCRCxzQkFBSSxpQ0FBTTthQUFWO1lBQ0ksTUFBTSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsTUFBTSxDQUFDO1FBQ25DLENBQUM7OztPQUFBO0lBQ0Qsc0JBQUksK0JBQUk7YUFBUjtZQUNJLE1BQU0sQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQztRQUNqQyxDQUFDOzs7T0FBQTtJQWtCTyxrQ0FBVSxHQUFsQixVQUFtQixJQUFtQixFQUFFLE1BQTZDO1FBQTdDLHVCQUFBLEVBQUEscUNBQTZDO1FBRWpGLElBQUksSUFBSSxHQUFHLElBQUkscUNBQU0sRUFBRSxDQUFDO1FBQ3hCLElBQUksQ0FBQyxRQUFRLEdBQUcsdUNBQVEsQ0FBQyxrQkFBa0IsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLFFBQVEsRUFBRSxJQUFJLENBQUMsUUFBUSxDQUFDLFNBQVMsQ0FBQyxDQUFDO1FBQzdGLElBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQztRQUN4QixJQUFJLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUM7UUFDMUIsSUFBSSxLQUFLLEdBQUcsSUFBSSxhQUFLLEVBQUUsQ0FBQztRQUN4QixLQUFLLENBQUMsR0FBRyxHQUFHLE1BQU0sQ0FBQztRQUNuQixJQUFJLENBQUMsSUFBSSxHQUFHLEtBQUssQ0FBQztRQUNsQixNQUFNLENBQUMsSUFBSSxDQUFDO0lBQ2hCLENBQUM7SUFBQSxDQUFDO0lBQ0Ysc0NBQWMsR0FBZCxVQUFlLElBQWlCO1FBQzVCLEVBQUUsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxHQUFHLENBQUMsVUFBQSxDQUFDLElBQUksT0FBQSxDQUFDLENBQUMsTUFBTSxJQUFJLElBQUksQ0FBQyxNQUFNLEVBQXZCLENBQXVCLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDMUQsSUFBSSxDQUFDLGVBQWUsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDbkMsQ0FBQztJQUNMLENBQUM7SUFDTCxvQkFBQztBQUFELENBQUMsQUExQ0QsSUEwQ0M7QUExQ1ksc0NBQWE7QUEyQzFCLElBQVksbUJBSVg7QUFKRCxXQUFZLG1CQUFtQjtJQUMzQixpRUFBTSxDQUFBO0lBQ04seURBQUUsQ0FBQTtJQUNGLCtEQUFLLENBQUE7QUFDVCxDQUFDLEVBSlcsbUJBQW1CLEdBQW5CLDJCQUFtQixLQUFuQiwyQkFBbUIsUUFJOUIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb2xvciB9IGZyb20gJ2NvbG9yJztcbmltcG9ydCB7IFBvbHlsaW5lLCBNYXJrZXIsIFBvc2l0aW9uIH0gZnJvbSAnbmF0aXZlc2NyaXB0LWdvb2dsZS1tYXBzLXNkayc7XG5pbXBvcnQgeyBJbWFnZSB9IGZyb20gXCJ1aS9pbWFnZVwiO1xuaW1wb3J0IHsgTGlzdCB9IGZyb20gJ2xpbnF0cyc7XG5leHBvcnQgY2xhc3MgQWRkTGluZUFyZ3Mge1xuICAgIHB1YmxpYyBjb2xvcjogQ29sb3I7XG4gICAgcHVibGljIGxpbmU6IFBvbHlsaW5lO1xuICAgIHB1YmxpYyBsb2NhdGlvbjogUG9zaXRpb247XG4gICAgcHVibGljIGdlb2Rlc2ljOiBib29sZWFuO1xuICAgIHB1YmxpYyB3aWR0aDogbnVtYmVyO1xufVxuXG5leHBvcnQgY2xhc3MgQWRkTWFya2VyQXJncyB7XG4gICAgcHVibGljIGxvY2F0aW9uOiBQb3NpdGlvbjtcbiAgICBwdWJsaWMgdGl0bGU6IHN0cmluZztcbn1cblxuZXhwb3J0IGNsYXNzIE1hcmtXcmFwcGVyIHtcbiAgICBtYXJrSWQ6IG51bWJlcjtcbiAgICBjb25zdHJ1Y3RvcihwdWJsaWMgbWFyazogTWFya2VyLCBwcml2YXRlIG1hcmtUeXBlOiBNYXJrV3JhcHBlclR5cGVFbnVtKSB7IH1cblxufVxuZXhwb3J0IGNsYXNzIE1hcmtDb250YWluZXIge1xuICAgIHByaXZhdGUgbWFya0RyYXdXYXlMaXN0OiBMaXN0PE1hcmtXcmFwcGVyPiA9IG5ldyBMaXN0PE1hcmtXcmFwcGVyPigpO1xuICAgIHByaXZhdGUgbWFya1dyYXBwZXI6IE1hcmtXcmFwcGVyO1xuICAgIGdldCBtYXJrSWQoKTogbnVtYmVyIHtcbiAgICAgICAgcmV0dXJuIHRoaXMubWFya1dyYXBwZXIubWFya0lkO1xuICAgIH1cbiAgICBnZXQgbWFyaygpOiBNYXJrZXIge1xuICAgICAgICByZXR1cm4gdGhpcy5tYXJrV3JhcHBlci5tYXJrO1xuICAgIH1cbiAgICBwdWJsaWMgY29uc3RydWN0b3IobWFya0luZm86IEFkZE1hcmtlckFyZ3MsIG1hcmtJZDogbnVtYmVyLCBtYXJrVHlwZTogTWFya1dyYXBwZXJUeXBlRW51bSkge1xuICAgICAgICAvL0NyZW8gdW4gTWFya1dyYXBwZXIgZWwgY3VhbCByZWxhY2lvbmEgZWwgTWFya2VyIGNvbiBlbCBpZCBkZWwgdXN1YXJpbyBkaWJ1amFkb1xuICAgICAgICB2YXIgbWFyayA9IG5ldyBBZGRNYXJrZXJBcmdzKCk7XG4gICAgICAgIG1hcmsudGl0bGUgPSBtYXJrSW5mby50aXRsZTtcbiAgICAgICAgbWFyay5sb2NhdGlvbiA9IG5ldyBQb3NpdGlvbigpO1xuICAgICAgICBtYXJrLmxvY2F0aW9uLmxhdGl0dWRlID0gbWFya0luZm8ubG9jYXRpb24ubGF0aXR1ZGU7XG4gICAgICAgIG1hcmsubG9jYXRpb24ubG9uZ2l0dWRlID0gbWFya0luZm8ubG9jYXRpb24ubG9uZ2l0dWRlO1xuICAgICAgICB2YXIgbWFwTWFyazogTWFya2VyID0gbnVsbDtcbiAgICAgICAgaWYgKG1hcmtUeXBlID09IE1hcmtXcmFwcGVyVHlwZUVudW0uTWUpXG4gICAgICAgICAgICBtYXBNYXJrID0gdGhpcy5jcmVhdGVNYXJrKG1hcmssIFwifi9pbWFnZXMvbWUtbWFya2VyLnBuZ1wiKTtcbiAgICAgICAgZWxzZVxuICAgICAgICAgICAgbWFwTWFyayA9IHRoaXMuY3JlYXRlTWFyayhtYXJrKTtcblxuICAgICAgICB2YXIgbWFya1dyYXBwZXIgPSBuZXcgTWFya1dyYXBwZXIobWFwTWFyaywgbWFya1R5cGUpO1xuICAgICAgICBtYXJrV3JhcHBlci5tYXJrSWQgPSBtYXJrSWQ7XG4gICAgICAgIHRoaXMubWFya1dyYXBwZXIgPSBtYXJrV3JhcHBlcjtcbiAgICB9XG4gICAgcHJpdmF0ZSBjcmVhdGVNYXJrKGFyZ3M6IEFkZE1hcmtlckFyZ3MsIGltZ1NyYzogc3RyaW5nID0gXCJ+L2ltYWdlcy9mcmllbmQtbWFya2VyLnBuZ1wiKTogTWFya2VyIHtcblxuICAgICAgICBsZXQgbWFyayA9IG5ldyBNYXJrZXIoKTtcbiAgICAgICAgbWFyay5wb3NpdGlvbiA9IFBvc2l0aW9uLnBvc2l0aW9uRnJvbUxhdExuZyhhcmdzLmxvY2F0aW9uLmxhdGl0dWRlLCBhcmdzLmxvY2F0aW9uLmxvbmdpdHVkZSk7XG4gICAgICAgIG1hcmsudGl0bGUgPSBhcmdzLnRpdGxlO1xuICAgICAgICBtYXJrLnNuaXBwZXQgPSBhcmdzLnRpdGxlO1xuICAgICAgICB2YXIgaW1hZ2UgPSBuZXcgSW1hZ2UoKTtcbiAgICAgICAgaW1hZ2Uuc3JjID0gaW1nU3JjO1xuICAgICAgICBtYXJrLmljb24gPSBpbWFnZTtcbiAgICAgICAgcmV0dXJuIG1hcms7XG4gICAgfTtcbiAgICBhZGRNYXJrRHJhd1dheShtYXJrOiBNYXJrV3JhcHBlcikge1xuICAgICAgICBpZiAoIXRoaXMubWFya0RyYXdXYXlMaXN0LkFueSh4ID0+IHgubWFya0lkID09IG1hcmsubWFya0lkKSkge1xuICAgICAgICAgICAgdGhpcy5tYXJrRHJhd1dheUxpc3QuQWRkKG1hcmspO1xuICAgICAgICB9XG4gICAgfVxufVxuZXhwb3J0IGVudW0gTWFya1dyYXBwZXJUeXBlRW51bSB7XG4gICAgRnJpZW5kLFxuICAgIE1lLFxuICAgIEdyb3VwXG59Il19