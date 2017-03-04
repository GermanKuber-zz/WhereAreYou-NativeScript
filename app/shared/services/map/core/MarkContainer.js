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
        this._markDrawWayList = new linqts_1.List();
        this.enableDraw = false;
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
    Object.defineProperty(MarkContainer.prototype, "markwrapper", {
        get: function () {
            return this.markWrapper;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MarkContainer.prototype, "isEnableDraw", {
        get: function () {
            return this.enableDraw;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MarkContainer.prototype, "markDrawWayList", {
        get: function () {
            return this._markDrawWayList;
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
    MarkContainer.prototype.addMarkDrawWay = function (markWrapper) {
        //Activo el modo de Draw
        this.enableDraw = true;
        if (!this.markDrawWayList.Any(function (x) { return x.markWrapper.markId == markWrapper.markId; })) {
            var markConf = new MarkWrapperConfiguration(markWrapper);
            this.markDrawWayList.Add(markConf);
        }
    };
    MarkContainer.prototype.removeMarkDrawWay = function (markWrapper) {
        //Desactivo el modo de Draw
        var markConf = this.markDrawWayList.Where(function (x) { return x.markWrapper.markId == markWrapper.markId; }).FirstOrDefault();
        if (markConf != null) {
            //Limpio el camino dibujado
            this.clearPoints(markConf);
            this.markDrawWayList.Remove(markConf);
        }
        //En caso de que no haya mas mark para dibujar desactivo la funcionalidad
        if (this.markDrawWayList.Count() == 0)
            this.enableDraw = false;
    };
    //Private Methods
    MarkContainer.prototype.clearPoints = function (markConf) {
        markConf.polyline.removeAllPoints();
        markConf.polyline.addPoint(nativescript_google_maps_sdk_1.Position.positionFromLatLng(0, 0));
        markConf.polyline.addPoint(nativescript_google_maps_sdk_1.Position.positionFromLatLng(0, 0));
        markConf.polyline.addPoint(nativescript_google_maps_sdk_1.Position.positionFromLatLng(0, 0));
    };
    return MarkContainer;
}());
exports.MarkContainer = MarkContainer;
var MarkWrapperConfiguration = (function () {
    function MarkWrapperConfiguration(markWrapper) {
        this.markWrapper = markWrapper;
    }
    Object.defineProperty(MarkWrapperConfiguration.prototype, "polyline", {
        get: function () {
            return this._polyline;
        },
        set: function (polyline) {
            this._polyline = polyline;
        },
        enumerable: true,
        configurable: true
    });
    return MarkWrapperConfiguration;
}());
exports.MarkWrapperConfiguration = MarkWrapperConfiguration;
var MarkWrapperTypeEnum;
(function (MarkWrapperTypeEnum) {
    MarkWrapperTypeEnum[MarkWrapperTypeEnum["Friend"] = 0] = "Friend";
    MarkWrapperTypeEnum[MarkWrapperTypeEnum["Me"] = 1] = "Me";
    MarkWrapperTypeEnum[MarkWrapperTypeEnum["Group"] = 2] = "Group";
})(MarkWrapperTypeEnum = exports.MarkWrapperTypeEnum || (exports.MarkWrapperTypeEnum = {}));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiTWFya0NvbnRhaW5lci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIk1hcmtDb250YWluZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUNBLDZFQUEwRTtBQUMxRSxrQ0FBaUM7QUFDakMsaUNBQThCO0FBQzlCO0lBQUE7SUFNQSxDQUFDO0lBQUQsa0JBQUM7QUFBRCxDQUFDLEFBTkQsSUFNQztBQU5ZLGtDQUFXO0FBUXhCO0lBQUE7SUFHQSxDQUFDO0lBQUQsb0JBQUM7QUFBRCxDQUFDLEFBSEQsSUFHQztBQUhZLHNDQUFhO0FBSzFCO0lBRUkscUJBQW1CLElBQVksRUFBVSxRQUE2QjtRQUFuRCxTQUFJLEdBQUosSUFBSSxDQUFRO1FBQVUsYUFBUSxHQUFSLFFBQVEsQ0FBcUI7SUFBSSxDQUFDO0lBRS9FLGtCQUFDO0FBQUQsQ0FBQyxBQUpELElBSUM7QUFKWSxrQ0FBVztBQUt4QjtJQW1CSSx1QkFBbUIsUUFBdUIsRUFBRSxNQUFjLEVBQUUsUUFBNkI7UUFsQmpGLHFCQUFnQixHQUFtQyxJQUFJLGFBQUksRUFBNEIsQ0FBQztRQUN4RixlQUFVLEdBQVksS0FBSyxDQUFDO1FBa0JoQyxnRkFBZ0Y7UUFDaEYsSUFBSSxJQUFJLEdBQUcsSUFBSSxhQUFhLEVBQUUsQ0FBQztRQUMvQixJQUFJLENBQUMsS0FBSyxHQUFHLFFBQVEsQ0FBQyxLQUFLLENBQUM7UUFDNUIsSUFBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLHVDQUFRLEVBQUUsQ0FBQztRQUMvQixJQUFJLENBQUMsUUFBUSxDQUFDLFFBQVEsR0FBRyxRQUFRLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQztRQUNwRCxJQUFJLENBQUMsUUFBUSxDQUFDLFNBQVMsR0FBRyxRQUFRLENBQUMsUUFBUSxDQUFDLFNBQVMsQ0FBQztRQUN0RCxJQUFJLE9BQU8sR0FBVyxJQUFJLENBQUM7UUFDM0IsRUFBRSxDQUFDLENBQUMsUUFBUSxJQUFJLG1CQUFtQixDQUFDLEVBQUUsQ0FBQztZQUNuQyxPQUFP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Q0FBQTtBQUNULENBQUMsRUFKVyxtQkFBbUIsR0FBbkIsMkJBQW1CLEtBQW5CLDJCQUFtQixRQUk5QiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbG9yIH0gZnJvbSAnY29sb3InO1xuaW1wb3J0IHsgUG9seWxpbmUsIE1hcmtlciwgUG9zaXRpb24gfSBmcm9tICduYXRpdmVzY3JpcHQtZ29vZ2xlLW1hcHMtc2RrJztcbmltcG9ydCB7IEltYWdlIH0gZnJvbSBcInVpL2ltYWdlXCI7XG5pbXBvcnQgeyBMaXN0IH0gZnJvbSAnbGlucXRzJztcbmV4cG9ydCBjbGFzcyBBZGRMaW5lQXJncyB7XG4gICAgcHVibGljIGNvbG9yOiBDb2xvcjtcbiAgICBwdWJsaWMgbGluZTogUG9seWxpbmU7XG4gICAgcHVibGljIGxvY2F0aW9uOiBQb3NpdGlvbjtcbiAgICBwdWJsaWMgZ2VvZGVzaWM6IGJvb2xlYW47XG4gICAgcHVibGljIHdpZHRoOiBudW1iZXI7XG59XG5cbmV4cG9ydCBjbGFzcyBBZGRNYXJrZXJBcmdzIHtcbiAgICBwdWJsaWMgbG9jYXRpb246IFBvc2l0aW9uO1xuICAgIHB1YmxpYyB0aXRsZTogc3RyaW5nO1xufVxuXG5leHBvcnQgY2xhc3MgTWFya1dyYXBwZXIge1xuICAgIG1hcmtJZDogbnVtYmVyO1xuICAgIGNvbnN0cnVjdG9yKHB1YmxpYyBtYXJrOiBNYXJrZXIsIHByaXZhdGUgbWFya1R5cGU6IE1hcmtXcmFwcGVyVHlwZUVudW0pIHsgfVxuXG59XG5leHBvcnQgY2xhc3MgTWFya0NvbnRhaW5lciB7XG4gICAgcHJpdmF0ZSBfbWFya0RyYXdXYXlMaXN0OiBMaXN0PE1hcmtXcmFwcGVyQ29uZmlndXJhdGlvbj4gPSBuZXcgTGlzdDxNYXJrV3JhcHBlckNvbmZpZ3VyYXRpb24+KCk7XG4gICAgcHJpdmF0ZSBlbmFibGVEcmF3OiBib29sZWFuID0gZmFsc2U7XG4gICAgcHJpdmF0ZSBtYXJrV3JhcHBlcjogTWFya1dyYXBwZXI7XG4gICAgZ2V0IG1hcmtJZCgpOiBudW1iZXIge1xuICAgICAgICByZXR1cm4gdGhpcy5tYXJrV3JhcHBlci5tYXJrSWQ7XG4gICAgfVxuICAgIGdldCBtYXJrKCk6IE1hcmtlciB7XG4gICAgICAgIHJldHVybiB0aGlzLm1hcmtXcmFwcGVyLm1hcms7XG4gICAgfVxuICAgIGdldCBtYXJrd3JhcHBlcigpOiBNYXJrV3JhcHBlciB7XG4gICAgICAgIHJldHVybiB0aGlzLm1hcmtXcmFwcGVyO1xuICAgIH1cbiAgICBnZXQgaXNFbmFibGVEcmF3KCk6IGJvb2xlYW4ge1xuICAgICAgICByZXR1cm4gdGhpcy5lbmFibGVEcmF3O1xuICAgIH1cbiAgICBnZXQgbWFya0RyYXdXYXlMaXN0KCk6IExpc3Q8TWFya1dyYXBwZXJDb25maWd1cmF0aW9uPiB7XG4gICAgICAgIHJldHVybiB0aGlzLl9tYXJrRHJhd1dheUxpc3Q7XG4gICAgfVxuICAgIHB1YmxpYyBjb25zdHJ1Y3RvcihtYXJrSW5mbzogQWRkTWFya2VyQXJncywgbWFya0lkOiBudW1iZXIsIG1hcmtUeXBlOiBNYXJrV3JhcHBlclR5cGVFbnVtKSB7XG4gICAgICAgIC8vQ3JlbyB1biBNYXJrV3JhcHBlciBlbCBjdWFsIHJlbGFjaW9uYSBlbCBNYXJrZXIgY29uIGVsIGlkIGRlbCB1c3VhcmlvIGRpYnVqYWRvXG4gICAgICAgIHZhciBtYXJrID0gbmV3IEFkZE1hcmtlckFyZ3MoKTtcbiAgICAgICAgbWFyay50aXRsZSA9IG1hcmtJbmZvLnRpdGxlO1xuICAgICAgICBtYXJrLmxvY2F0aW9uID0gbmV3IFBvc2l0aW9uKCk7XG4gICAgICAgIG1hcmsubG9jYXRpb24ubGF0aXR1ZGUgPSBtYXJrSW5mby5sb2NhdGlvbi5sYXRpdHVkZTtcbiAgICAgICAgbWFyay5sb2NhdGlvbi5sb25naXR1ZGUgPSBtYXJrSW5mby5sb2NhdGlvbi5sb25naXR1ZGU7XG4gICAgICAgIHZhciBtYXBNYXJrOiBNYXJrZXIgPSBudWxsO1xuICAgICAgICBpZiAobWFya1R5cGUgPT0gTWFya1dyYXBwZXJUeXBlRW51bS5NZSlcbiAgICAgICAgICAgIG1hcE1hcmsgPSB0aGlzLmNyZWF0ZU1hcmsobWFyaywgXCJ+L2ltYWdlcy9tZS1tYXJrZXIucG5nXCIpO1xuICAgICAgICBlbHNlXG4gICAgICAgICAgICBtYXBNYXJrID0gdGhpcy5jcmVhdGVNYXJrKG1hcmspO1xuXG4gICAgICAgIHZhciBtYXJrV3JhcHBlciA9IG5ldyBNYXJrV3JhcHBlcihtYXBNYXJrLCBtYXJrVHlwZSk7XG4gICAgICAgIG1hcmtXcmFwcGVyLm1hcmtJZCA9IG1hcmtJZDtcbiAgICAgICAgdGhpcy5tYXJrV3JhcHBlciA9IG1hcmtXcmFwcGVyO1xuICAgIH1cbiAgICBwcml2YXRlIGNyZWF0ZU1hcmsoYXJnczogQWRkTWFya2VyQXJncywgaW1nU3JjOiBzdHJpbmcgPSBcIn4vaW1hZ2VzL2ZyaWVuZC1tYXJrZXIucG5nXCIpOiBNYXJrZXIge1xuXG4gICAgICAgIGxldCBtYXJrID0gbmV3IE1hcmtlcigpO1xuICAgICAgICBtYXJrLnBvc2l0aW9uID0gUG9zaXRpb24ucG9zaXRpb25Gcm9tTGF0TG5nKGFyZ3MubG9jYXRpb24ubGF0aXR1ZGUsIGFyZ3MubG9jYXRpb24ubG9uZ2l0dWRlKTtcbiAgICAgICAgbWFyay50aXRsZSA9IGFyZ3MudGl0bGU7XG4gICAgICAgIG1hcmsuc25pcHBldCA9IGFyZ3MudGl0bGU7XG4gICAgICAgIHZhciBpbWFnZSA9IG5ldyBJbWFnZSgpO1xuICAgICAgICBpbWFnZS5zcmMgPSBpbWdTcmM7XG4gICAgICAgIG1hcmsuaWNvbiA9IGltYWdlO1xuICAgICAgICByZXR1cm4gbWFyaztcbiAgICB9O1xuICAgIGFkZE1hcmtEcmF3V2F5KG1hcmtXcmFwcGVyOiBNYXJrV3JhcHBlcikge1xuICAgICAgICAvL0FjdGl2byBlbCBtb2RvIGRlIERyYXdcbiAgICAgICAgdGhpcy5lbmFibGVEcmF3ID0gdHJ1ZTtcbiAgICAgICAgaWYgKCF0aGlzLm1hcmtEcmF3V2F5TGlzdC5BbnkoeCA9PiB4Lm1hcmtXcmFwcGVyLm1hcmtJZCA9PSBtYXJrV3JhcHBlci5tYXJrSWQpKSB7XG4gICAgICAgICAgICB2YXIgbWFya0NvbmYgPSBuZXcgTWFya1dyYXBwZXJDb25maWd1cmF0aW9uKG1hcmtXcmFwcGVyKTtcbiAgICAgICAgICAgIHRoaXMubWFya0RyYXdXYXlMaXN0LkFkZChtYXJrQ29uZik7XG4gICAgICAgIH1cbiAgICB9XG4gICAgcmVtb3ZlTWFya0RyYXdXYXkobWFya1dyYXBwZXI6IE1hcmtXcmFwcGVyKSB7XG4gICAgICAgIC8vRGVzYWN0aXZvIGVsIG1vZG8gZGUgRHJhd1xuICAgICAgICB2YXIgbWFya0NvbmYgPSB0aGlzLm1hcmtEcmF3V2F5TGlzdC5XaGVyZSh4ID0+IHgubWFya1dyYXBwZXIubWFya0lkID09IG1hcmtXcmFwcGVyLm1hcmtJZCkuRmlyc3RPckRlZmF1bHQoKTtcbiAgICAgICAgaWYgKG1hcmtDb25mICE9IG51bGwpIHtcbiAgICAgICAgICAgIC8vTGltcGlvIGVsIGNhbWlubyBkaWJ1amFkb1xuICAgICAgICAgICAgdGhpcy5jbGVhclBvaW50cyhtYXJrQ29uZik7XG4gICAgICAgICAgICB0aGlzLm1hcmtEcmF3V2F5TGlzdC5SZW1vdmUobWFya0NvbmYpO1xuICAgICAgICB9XG4gICAgICAgIC8vRW4gY2FzbyBkZSBxdWUgbm8gaGF5YSBtYXMgbWFyayBwYXJhIGRpYnVqYXIgZGVzYWN0aXZvIGxhIGZ1bmNpb25hbGlkYWRcbiAgICAgICAgaWYgKHRoaXMubWFya0RyYXdXYXlMaXN0LkNvdW50KCkgPT0gMClcbiAgICAgICAgICAgIHRoaXMuZW5hYmxlRHJhdyA9IGZhbHNlO1xuXG4gICAgfVxuXG4gICAgLy9Qcml2YXRlIE1ldGhvZHNcbiAgICBwcml2YXRlIGNsZWFyUG9pbnRzKG1hcmtDb25mOiBNYXJrV3JhcHBlckNvbmZpZ3VyYXRpb24pIHtcbiAgICAgICAgbWFya0NvbmYucG9seWxpbmUucmVtb3ZlQWxsUG9pbnRzKCk7XG4gICAgICAgIG1hcmtDb25mLnBvbHlsaW5lLmFkZFBvaW50KFBvc2l0aW9uLnBvc2l0aW9uRnJvbUxhdExuZygwLCAwKSk7XG4gICAgICAgIG1hcmtDb25mLnBvbHlsaW5lLmFkZFBvaW50KFBvc2l0aW9uLnBvc2l0aW9uRnJvbUxhdExuZygwLCAwKSk7XG4gICAgICAgICAgbWFya0NvbmYucG9seWxpbmUuYWRkUG9pbnQoUG9zaXRpb24ucG9zaXRpb25Gcm9tTGF0TG5nKDAsIDApKTtcblxuICAgIH1cbn1cbmV4cG9ydCBjbGFzcyBNYXJrV3JhcHBlckNvbmZpZ3VyYXRpb24ge1xuICAgIHByaXZhdGUgX3BvbHlsaW5lOiBQb2x5bGluZTtcbiAgICBnZXQgcG9seWxpbmUoKTogUG9seWxpbmUge1xuICAgICAgICByZXR1cm4gdGhpcy5fcG9seWxpbmU7XG4gICAgfVxuICAgIHNldCBwb2x5bGluZShwb2x5bGluZTogUG9seWxpbmUpIHtcbiAgICAgICAgdGhpcy5fcG9seWxpbmUgPSBwb2x5bGluZTtcbiAgICB9XG4gICAgY29uc3RydWN0b3IocHVibGljIG1hcmtXcmFwcGVyOiBNYXJrV3JhcHBlcikgeyB9XG5cbn1cbmV4cG9ydCBlbnVtIE1hcmtXcmFwcGVyVHlwZUVudW0ge1xuICAgIEZyaWVuZCxcbiAgICBNZSxcbiAgICBHcm91cFxufSJdfQ==