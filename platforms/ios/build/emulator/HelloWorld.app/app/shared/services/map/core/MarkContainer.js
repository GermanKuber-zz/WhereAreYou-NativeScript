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
    MarkContainer.prototype.createMarkWithOutImage = function (args) {
        var mark = new nativescript_google_maps_sdk_1.Marker();
        mark.position = nativescript_google_maps_sdk_1.Position.positionFromLatLng(args.location.latitude, args.location.longitude);
        mark.title = args.title;
        mark.snippet = args.title;
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
        //Se ejecuta 3 veces ya que si no no, se limpia el camino previamente dibujado
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiTWFya0NvbnRhaW5lci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIk1hcmtDb250YWluZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUNBLDZFQUEwRTtBQUMxRSxrQ0FBaUM7QUFDakMsaUNBQThCO0FBQzlCO0lBQUE7SUFNQSxDQUFDO0lBQUQsa0JBQUM7QUFBRCxDQUFDLEFBTkQsSUFNQztBQU5ZLGtDQUFXO0FBUXhCO0lBQUE7SUFHQSxDQUFDO0lBQUQsb0JBQUM7QUFBRCxDQUFDLEFBSEQsSUFHQztBQUhZLHNDQUFhO0FBSzFCO0lBRUkscUJBQW1CLElBQVksRUFBVSxRQUE2QjtRQUFuRCxTQUFJLEdBQUosSUFBSSxDQUFRO1FBQVUsYUFBUSxHQUFSLFFBQVEsQ0FBcUI7SUFBSSxDQUFDO0lBRS9FLGtCQUFDO0FBQUQsQ0FBQyxBQUpELElBSUM7QUFKWSxrQ0FBVztBQUt4QjtJQW1CSSx1QkFBbUIsUUFBdUIsRUFBRSxNQUFjLEVBQUUsUUFBNkI7UUFsQmpGLHFCQUFnQixHQUFtQyxJQUFJLGFBQUksRUFBNEIsQ0FBQztRQUN4RixlQUFVLEdBQVksS0FBSyxDQUFDO1FBa0JoQyxnRkFBZ0Y7UUFDaEYsSUFBSSxJQUFJLEdBQUcsSUFBSSxhQUFhLEVBQUUsQ0FBQztRQUMvQixJQUFJLENBQUMsS0FBSyxHQUFHLFFBQVEsQ0FBQyxLQUFLLENBQUM7UUFDNUIsSUFBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLHVDQUFRLEVBQUUsQ0FBQztRQUMvQixJQUFJLENBQUMsUUFBUSxDQUFDLFFBQVEsR0FBRyxRQUFRLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQztRQUNwRCxJQUFJLENBQUMsUUFBUSxDQUFDLFNBQVMsR0FBRyxRQUFRLENBQUMsUUFBUSxDQUFDLFNBQVMsQ0FBQztRQUN0RCxJQUFJLE9BQU8sR0FBVyxJQUFJLENBQUM7UUFDM0IsRUFBRSxDQUFDLENBQUMsUUFBUSxJQUFJLG1CQUFtQixDQUFDLEVBQUUsQ0FBQztZQUNuQyxPQUFP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c0ZDO0FBdEZZLHNDQUFhO0FBdUYxQjtJQVFJLGtDQUFtQixXQUF3QjtRQUF4QixnQkFBVyxHQUFYLFdBQVcsQ0FBYTtJQUFJLENBQUM7SUFOaEQsc0JBQUksOENBQVE7YUFBWjtZQUNJLE1BQU0sQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDO1FBQzFCLENBQUM7YUFDRCxVQUFhLFFBQWtCO1lBQzNCLElBQUksQ0FBQyxTQUFTLEdBQUcsUUFBUSxDQUFDO1FBQzlCLENBQUM7OztPQUhBO0lBTUwsK0JBQUM7QUFBRCxDQUFDLEFBVkQsSUFVQztBQVZZLDREQUF3QjtBQVdyQyxJQUFZLG1CQUlYO0FBSkQsV0FBWSxtQkFBbUI7SUFDM0IsaUVBQU0sQ0FBQTtJQUNOLHlEQUFFLENBQUE7SUFDRiwrREFBSyxDQUFBO0FBQ1QsQ0FBQyxFQUpXLG1CQUFtQixHQUFuQiwyQkFBbUIsS0FBbkIsMkJBQW1CLFFBSTlCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29sb3IgfSBmcm9tICdjb2xvcic7XG5pbXBvcnQgeyBQb2x5bGluZSwgTWFya2VyLCBQb3NpdGlvbiB9IGZyb20gJ25hdGl2ZXNjcmlwdC1nb29nbGUtbWFwcy1zZGsnO1xuaW1wb3J0IHsgSW1hZ2UgfSBmcm9tIFwidWkvaW1hZ2VcIjtcbmltcG9ydCB7IExpc3QgfSBmcm9tICdsaW5xdHMnO1xuZXhwb3J0IGNsYXNzIEFkZExpbmVBcmdzIHtcbiAgICBwdWJsaWMgY29sb3I6IENvbG9yO1xuICAgIHB1YmxpYyBsaW5lOiBQb2x5bGluZTtcbiAgICBwdWJsaWMgbG9jYXRpb246IFBvc2l0aW9uO1xuICAgIHB1YmxpYyBnZW9kZXNpYzogYm9vbGVhbjtcbiAgICBwdWJsaWMgd2lkdGg6IG51bWJlcjtcbn1cblxuZXhwb3J0IGNsYXNzIEFkZE1hcmtlckFyZ3Mge1xuICAgIHB1YmxpYyBsb2NhdGlvbjogUG9zaXRpb247XG4gICAgcHVibGljIHRpdGxlOiBzdHJpbmc7XG59XG5cbmV4cG9ydCBjbGFzcyBNYXJrV3JhcHBlciB7XG4gICAgbWFya0lkOiBudW1iZXI7XG4gICAgY29uc3RydWN0b3IocHVibGljIG1hcms6IE1hcmtlciwgcHJpdmF0ZSBtYXJrVHlwZTogTWFya1dyYXBwZXJUeXBlRW51bSkgeyB9XG5cbn1cbmV4cG9ydCBjbGFzcyBNYXJrQ29udGFpbmVyIHtcbiAgICBwcml2YXRlIF9tYXJrRHJhd1dheUxpc3Q6IExpc3Q8TWFya1dyYXBwZXJDb25maWd1cmF0aW9uPiA9IG5ldyBMaXN0PE1hcmtXcmFwcGVyQ29uZmlndXJhdGlvbj4oKTtcbiAgICBwcml2YXRlIGVuYWJsZURyYXc6IGJvb2xlYW4gPSBmYWxzZTtcbiAgICBwcml2YXRlIG1hcmtXcmFwcGVyOiBNYXJrV3JhcHBlcjtcbiAgICBnZXQgbWFya0lkKCk6IG51bWJlciB7XG4gICAgICAgIHJldHVybiB0aGlzLm1hcmtXcmFwcGVyLm1hcmtJZDtcbiAgICB9XG4gICAgZ2V0IG1hcmsoKTogTWFya2VyIHtcbiAgICAgICAgcmV0dXJuIHRoaXMubWFya1dyYXBwZXIubWFyaztcbiAgICB9XG4gICAgZ2V0IG1hcmt3cmFwcGVyKCk6IE1hcmtXcmFwcGVyIHtcbiAgICAgICAgcmV0dXJuIHRoaXMubWFya1dyYXBwZXI7XG4gICAgfVxuICAgIGdldCBpc0VuYWJsZURyYXcoKTogYm9vbGVhbiB7XG4gICAgICAgIHJldHVybiB0aGlzLmVuYWJsZURyYXc7XG4gICAgfVxuICAgIGdldCBtYXJrRHJhd1dheUxpc3QoKTogTGlzdDxNYXJrV3JhcHBlckNvbmZpZ3VyYXRpb24+IHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX21hcmtEcmF3V2F5TGlzdDtcbiAgICB9XG4gICAgcHVibGljIGNvbnN0cnVjdG9yKG1hcmtJbmZvOiBBZGRNYXJrZXJBcmdzLCBtYXJrSWQ6IG51bWJlciwgbWFya1R5cGU6IE1hcmtXcmFwcGVyVHlwZUVudW0pIHtcbiAgICAgICAgLy9DcmVvIHVuIE1hcmtXcmFwcGVyIGVsIGN1YWwgcmVsYWNpb25hIGVsIE1hcmtlciBjb24gZWwgaWQgZGVsIHVzdWFyaW8gZGlidWphZG9cbiAgICAgICAgdmFyIG1hcmsgPSBuZXcgQWRkTWFya2VyQXJncygpO1xuICAgICAgICBtYXJrLnRpdGxlID0gbWFya0luZm8udGl0bGU7XG4gICAgICAgIG1hcmsubG9jYXRpb24gPSBuZXcgUG9zaXRpb24oKTtcbiAgICAgICAgbWFyay5sb2NhdGlvbi5sYXRpdHVkZSA9IG1hcmtJbmZvLmxvY2F0aW9uLmxhdGl0dWRlO1xuICAgICAgICBtYXJrLmxvY2F0aW9uLmxvbmdpdHVkZSA9IG1hcmtJbmZvLmxvY2F0aW9uLmxvbmdpdHVkZTtcbiAgICAgICAgdmFyIG1hcE1hcms6IE1hcmtlciA9IG51bGw7XG4gICAgICAgIGlmIChtYXJrVHlwZSA9PSBNYXJrV3JhcHBlclR5cGVFbnVtLk1lKVxuICAgICAgICAgICAgbWFwTWFyayA9IHRoaXMuY3JlYXRlTWFyayhtYXJrLCBcIn4vaW1hZ2VzL21lLW1hcmtlci5wbmdcIik7XG4gICAgICAgIGVsc2VcbiAgICAgICAgICAgIG1hcE1hcmsgPSB0aGlzLmNyZWF0ZU1hcmsobWFyayk7XG5cbiAgICAgICAgdmFyIG1hcmtXcmFwcGVyID0gbmV3IE1hcmtXcmFwcGVyKG1hcE1hcmssIG1hcmtUeXBlKTtcbiAgICAgICAgbWFya1dyYXBwZXIubWFya0lkID0gbWFya0lkO1xuICAgICAgICB0aGlzLm1hcmtXcmFwcGVyID0gbWFya1dyYXBwZXI7XG4gICAgfVxuICAgIHByaXZhdGUgY3JlYXRlTWFyayhhcmdzOiBBZGRNYXJrZXJBcmdzLCBpbWdTcmM6IHN0cmluZyA9IFwifi9pbWFnZXMvZnJpZW5kLW1hcmtlci5wbmdcIik6IE1hcmtlciB7XG5cbiAgICAgICAgbGV0IG1hcmsgPSBuZXcgTWFya2VyKCk7XG4gICAgICAgIG1hcmsucG9zaXRpb24gPSBQb3NpdGlvbi5wb3NpdGlvbkZyb21MYXRMbmcoYXJncy5sb2NhdGlvbi5sYXRpdHVkZSwgYXJncy5sb2NhdGlvbi5sb25naXR1ZGUpO1xuICAgICAgICBtYXJrLnRpdGxlID0gYXJncy50aXRsZTtcbiAgICAgICAgbWFyay5zbmlwcGV0ID0gYXJncy50aXRsZTtcbiAgICAgICAgdmFyIGltYWdlID0gbmV3IEltYWdlKCk7XG4gICAgICAgIGltYWdlLnNyYyA9IGltZ1NyYztcbiAgICAgICAgbWFyay5pY29uID0gaW1hZ2U7XG4gICAgICAgIHJldHVybiBtYXJrO1xuICAgIH07XG4gICAgcHJpdmF0ZSBjcmVhdGVNYXJrV2l0aE91dEltYWdlKGFyZ3M6IEFkZE1hcmtlckFyZ3MpOiBNYXJrZXIge1xuXG4gICAgICAgIGxldCBtYXJrID0gbmV3IE1hcmtlcigpO1xuICAgICAgICBtYXJrLnBvc2l0aW9uID0gUG9zaXRpb24ucG9zaXRpb25Gcm9tTGF0TG5nKGFyZ3MubG9jYXRpb24ubGF0aXR1ZGUsIGFyZ3MubG9jYXRpb24ubG9uZ2l0dWRlKTtcbiAgICAgICAgbWFyay50aXRsZSA9IGFyZ3MudGl0bGU7XG4gICAgICAgIG1hcmsuc25pcHBldCA9IGFyZ3MudGl0bGU7XG4gICAgICAgIHJldHVybiBtYXJrO1xuICAgIH07XG4gICAgYWRkTWFya0RyYXdXYXkobWFya1dyYXBwZXI6IE1hcmtXcmFwcGVyKSB7XG4gICAgICAgIC8vQWN0aXZvIGVsIG1vZG8gZGUgRHJhd1xuICAgICAgICB0aGlzLmVuYWJsZURyYXcgPSB0cnVlO1xuICAgICAgICBpZiAoIXRoaXMubWFya0RyYXdXYXlMaXN0LkFueSh4ID0+IHgubWFya1dyYXBwZXIubWFya0lkID09IG1hcmtXcmFwcGVyLm1hcmtJZCkpIHtcbiAgICAgICAgICAgIHZhciBtYXJrQ29uZiA9IG5ldyBNYXJrV3JhcHBlckNvbmZpZ3VyYXRpb24obWFya1dyYXBwZXIpO1xuICAgICAgICAgICAgdGhpcy5tYXJrRHJhd1dheUxpc3QuQWRkKG1hcmtDb25mKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICByZW1vdmVNYXJrRHJhd1dheShtYXJrV3JhcHBlcjogTWFya1dyYXBwZXIpIHtcbiAgICAgICAgLy9EZXNhY3Rpdm8gZWwgbW9kbyBkZSBEcmF3XG4gICAgICAgIHZhciBtYXJrQ29uZiA9IHRoaXMubWFya0RyYXdXYXlMaXN0LldoZXJlKHggPT4geC5tYXJrV3JhcHBlci5tYXJrSWQgPT0gbWFya1dyYXBwZXIubWFya0lkKS5GaXJzdE9yRGVmYXVsdCgpO1xuICAgICAgICBpZiAobWFya0NvbmYgIT0gbnVsbCkge1xuICAgICAgICAgICAgLy9MaW1waW8gZWwgY2FtaW5vIGRpYnVqYWRvXG4gICAgICAgICAgICB0aGlzLmNsZWFyUG9pbnRzKG1hcmtDb25mKTtcbiAgICAgICAgICAgIHRoaXMubWFya0RyYXdXYXlMaXN0LlJlbW92ZShtYXJrQ29uZik7XG4gICAgICAgIH1cbiAgICAgICAgLy9FbiBjYXNvIGRlIHF1ZSBubyBoYXlhIG1hcyBtYXJrIHBhcmEgZGlidWphciBkZXNhY3Rpdm8gbGEgZnVuY2lvbmFsaWRhZFxuICAgICAgICBpZiAodGhpcy5tYXJrRHJhd1dheUxpc3QuQ291bnQoKSA9PSAwKVxuICAgICAgICAgICAgdGhpcy5lbmFibGVEcmF3ID0gZmFsc2U7XG5cbiAgICB9XG5cbiAgICAvL1ByaXZhdGUgTWV0aG9kc1xuICAgIHByaXZhdGUgY2xlYXJQb2ludHMobWFya0NvbmY6IE1hcmtXcmFwcGVyQ29uZmlndXJhdGlvbikge1xuICAgICAgICBtYXJrQ29uZi5wb2x5bGluZS5yZW1vdmVBbGxQb2ludHMoKTtcbiAgICAgICAgLy9TZSBlamVjdXRhIDMgdmVjZXMgeWEgcXVlIHNpIG5vIG5vLCBzZSBsaW1waWEgZWwgY2FtaW5vIHByZXZpYW1lbnRlIGRpYnVqYWRvXG4gICAgICAgIG1hcmtDb25mLnBvbHlsaW5lLmFkZFBvaW50KFBvc2l0aW9uLnBvc2l0aW9uRnJvbUxhdExuZygwLCAwKSk7XG4gICAgICAgIG1hcmtDb25mLnBvbHlsaW5lLmFkZFBvaW50KFBvc2l0aW9uLnBvc2l0aW9uRnJvbUxhdExuZygwLCAwKSk7XG4gICAgICAgIG1hcmtDb25mLnBvbHlsaW5lLmFkZFBvaW50KFBvc2l0aW9uLnBvc2l0aW9uRnJvbUxhdExuZygwLCAwKSk7XG5cbiAgICB9XG59XG5leHBvcnQgY2xhc3MgTWFya1dyYXBwZXJDb25maWd1cmF0aW9uIHtcbiAgICBwcml2YXRlIF9wb2x5bGluZTogUG9seWxpbmU7XG4gICAgZ2V0IHBvbHlsaW5lKCk6IFBvbHlsaW5lIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3BvbHlsaW5lO1xuICAgIH1cbiAgICBzZXQgcG9seWxpbmUocG9seWxpbmU6IFBvbHlsaW5lKSB7XG4gICAgICAgIHRoaXMuX3BvbHlsaW5lID0gcG9seWxpbmU7XG4gICAgfVxuICAgIGNvbnN0cnVjdG9yKHB1YmxpYyBtYXJrV3JhcHBlcjogTWFya1dyYXBwZXIpIHsgfVxuXG59XG5leHBvcnQgZW51bSBNYXJrV3JhcHBlclR5cGVFbnVtIHtcbiAgICBGcmllbmQsXG4gICAgTWUsXG4gICAgR3JvdXBcbn0iXX0=