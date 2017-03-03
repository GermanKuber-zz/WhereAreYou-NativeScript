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
        if (!this.markDrawWayList.Any(function (x) { return x.markId == markWrapper.markId; })) {
            this.markDrawWayList.Add(markWrapper);
        }
    };
    MarkContainer.prototype.removeMarkDrawWay = function (markWrapper) {
        //Desactivo el modo de Draw
        if (!this.markDrawWayList.Any(function (x) { return x.markId == markWrapper.markId; })) {
            this.markDrawWayList.Remove(markWrapper);
        }
        //En caso de que no haya mas mark para dibujar desactivo la funcionalidad
        if (this.markDrawWayList.Count() == 0)
            this.enableDraw = false;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiTWFya0NvbnRhaW5lci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIk1hcmtDb250YWluZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUNBLDZFQUEwRTtBQUMxRSxrQ0FBaUM7QUFDakMsaUNBQThCO0FBQzlCO0lBQUE7SUFNQSxDQUFDO0lBQUQsa0JBQUM7QUFBRCxDQUFDLEFBTkQsSUFNQztBQU5ZLGtDQUFXO0FBUXhCO0lBQUE7SUFHQSxDQUFDO0lBQUQsb0JBQUM7QUFBRCxDQUFDLEFBSEQsSUFHQztBQUhZLHNDQUFhO0FBSzFCO0lBRUkscUJBQW1CLElBQVksRUFBVSxRQUE2QjtRQUFuRCxTQUFJLEdBQUosSUFBSSxDQUFRO1FBQVUsYUFBUSxHQUFSLFFBQVEsQ0FBcUI7SUFBSSxDQUFDO0lBRS9FLGtCQUFDO0FBQUQsQ0FBQyxBQUpELElBSUM7QUFKWSxrQ0FBVztBQUt4QjtJQWFJLHVCQUFtQixRQUF1QixFQUFFLE1BQWMsRUFBRSxRQUE2QjtRQVpqRixvQkFBZSxHQUFzQixJQUFJLGFBQUksRUFBZSxDQUFDO1FBQzdELGVBQVUsR0FBWSxLQUFLLENBQUM7UUFZaEMsZ0ZBQWdGO1FBQ2hGLElBQUksSUFBSSxHQUFHLElBQUksYUFBYSxFQUFFLENBQUM7UUFDL0IsSUFBSSxDQUFDLEtBQUssR0FBRyxRQUFRLENBQUMsS0FBSyxDQUFDO1FBQzVCLElBQUksQ0FBQyxRQUFRLEdBQUcsSUFBSSx1Q0FBUSxFQUFFLENBQUM7UUFDL0IsSUFBSSxDQUFDLFFBQVEsQ0FBQyxRQUFRLEdBQUcsUUFBUSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUM7UUFDcEQsSUFBSSxDQUFDLFFBQVEsQ0FBQyxTQUFTLEdBQUcsUUFBUSxDQUFDLFFBQVEsQ0FBQyxTQUFTLENBQUM7UUFDdEQsSUFBSSxPQUFPLEdBQVcsSUFBSSxDQUFDO1FBQzNCLEVBQUUsQ0FBQyxDQUFDLFFBQVEsSUFBSSxtQkFBbUIsQ0FBQyxFQUFFLENBQUM7WUFDbkMsT0FBTyxHQUFH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S0FBbkIsMkJBQW1CLFFBSTlCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29sb3IgfSBmcm9tICdjb2xvcic7XG5pbXBvcnQgeyBQb2x5bGluZSwgTWFya2VyLCBQb3NpdGlvbiB9IGZyb20gJ25hdGl2ZXNjcmlwdC1nb29nbGUtbWFwcy1zZGsnO1xuaW1wb3J0IHsgSW1hZ2UgfSBmcm9tIFwidWkvaW1hZ2VcIjtcbmltcG9ydCB7IExpc3QgfSBmcm9tICdsaW5xdHMnO1xuZXhwb3J0IGNsYXNzIEFkZExpbmVBcmdzIHtcbiAgICBwdWJsaWMgY29sb3I6IENvbG9yO1xuICAgIHB1YmxpYyBsaW5lOiBQb2x5bGluZTtcbiAgICBwdWJsaWMgbG9jYXRpb246IFBvc2l0aW9uO1xuICAgIHB1YmxpYyBnZW9kZXNpYzogYm9vbGVhbjtcbiAgICBwdWJsaWMgd2lkdGg6IG51bWJlcjtcbn1cblxuZXhwb3J0IGNsYXNzIEFkZE1hcmtlckFyZ3Mge1xuICAgIHB1YmxpYyBsb2NhdGlvbjogUG9zaXRpb247XG4gICAgcHVibGljIHRpdGxlOiBzdHJpbmc7XG59XG5cbmV4cG9ydCBjbGFzcyBNYXJrV3JhcHBlciB7XG4gICAgbWFya0lkOiBudW1iZXI7XG4gICAgY29uc3RydWN0b3IocHVibGljIG1hcms6IE1hcmtlciwgcHJpdmF0ZSBtYXJrVHlwZTogTWFya1dyYXBwZXJUeXBlRW51bSkgeyB9XG5cbn1cbmV4cG9ydCBjbGFzcyBNYXJrQ29udGFpbmVyIHtcbiAgICBwcml2YXRlIG1hcmtEcmF3V2F5TGlzdDogTGlzdDxNYXJrV3JhcHBlcj4gPSBuZXcgTGlzdDxNYXJrV3JhcHBlcj4oKTtcbiAgICBwcml2YXRlIGVuYWJsZURyYXc6IGJvb2xlYW4gPSBmYWxzZTtcbiAgICBwcml2YXRlIG1hcmtXcmFwcGVyOiBNYXJrV3JhcHBlcjtcbiAgICBnZXQgbWFya0lkKCk6IG51bWJlciB7XG4gICAgICAgIHJldHVybiB0aGlzLm1hcmtXcmFwcGVyLm1hcmtJZDtcbiAgICB9XG4gICAgZ2V0IG1hcmsoKTogTWFya2VyIHtcbiAgICAgICAgcmV0dXJuIHRoaXMubWFya1dyYXBwZXIubWFyaztcbiAgICB9XG4gICAgZ2V0IG1hcmt3cmFwcGVyKCk6IE1hcmtXcmFwcGVyIHtcbiAgICAgICAgcmV0dXJuIHRoaXMubWFya1dyYXBwZXI7XG4gICAgfVxuICAgIHB1YmxpYyBjb25zdHJ1Y3RvcihtYXJrSW5mbzogQWRkTWFya2VyQXJncywgbWFya0lkOiBudW1iZXIsIG1hcmtUeXBlOiBNYXJrV3JhcHBlclR5cGVFbnVtKSB7XG4gICAgICAgIC8vQ3JlbyB1biBNYXJrV3JhcHBlciBlbCBjdWFsIHJlbGFjaW9uYSBlbCBNYXJrZXIgY29uIGVsIGlkIGRlbCB1c3VhcmlvIGRpYnVqYWRvXG4gICAgICAgIHZhciBtYXJrID0gbmV3IEFkZE1hcmtlckFyZ3MoKTtcbiAgICAgICAgbWFyay50aXRsZSA9IG1hcmtJbmZvLnRpdGxlO1xuICAgICAgICBtYXJrLmxvY2F0aW9uID0gbmV3IFBvc2l0aW9uKCk7XG4gICAgICAgIG1hcmsubG9jYXRpb24ubGF0aXR1ZGUgPSBtYXJrSW5mby5sb2NhdGlvbi5sYXRpdHVkZTtcbiAgICAgICAgbWFyay5sb2NhdGlvbi5sb25naXR1ZGUgPSBtYXJrSW5mby5sb2NhdGlvbi5sb25naXR1ZGU7XG4gICAgICAgIHZhciBtYXBNYXJrOiBNYXJrZXIgPSBudWxsO1xuICAgICAgICBpZiAobWFya1R5cGUgPT0gTWFya1dyYXBwZXJUeXBlRW51bS5NZSlcbiAgICAgICAgICAgIG1hcE1hcmsgPSB0aGlzLmNyZWF0ZU1hcmsobWFyaywgXCJ+L2ltYWdlcy9tZS1tYXJrZXIucG5nXCIpO1xuICAgICAgICBlbHNlXG4gICAgICAgICAgICBtYXBNYXJrID0gdGhpcy5jcmVhdGVNYXJrKG1hcmspO1xuXG4gICAgICAgIHZhciBtYXJrV3JhcHBlciA9IG5ldyBNYXJrV3JhcHBlcihtYXBNYXJrLCBtYXJrVHlwZSk7XG4gICAgICAgIG1hcmtXcmFwcGVyLm1hcmtJZCA9IG1hcmtJZDtcbiAgICAgICAgdGhpcy5tYXJrV3JhcHBlciA9IG1hcmtXcmFwcGVyO1xuICAgIH1cbiAgICBwcml2YXRlIGNyZWF0ZU1hcmsoYXJnczogQWRkTWFya2VyQXJncywgaW1nU3JjOiBzdHJpbmcgPSBcIn4vaW1hZ2VzL2ZyaWVuZC1tYXJrZXIucG5nXCIpOiBNYXJrZXIge1xuXG4gICAgICAgIGxldCBtYXJrID0gbmV3IE1hcmtlcigpO1xuICAgICAgICBtYXJrLnBvc2l0aW9uID0gUG9zaXRpb24ucG9zaXRpb25Gcm9tTGF0TG5nKGFyZ3MubG9jYXRpb24ubGF0aXR1ZGUsIGFyZ3MubG9jYXRpb24ubG9uZ2l0dWRlKTtcbiAgICAgICAgbWFyay50aXRsZSA9IGFyZ3MudGl0bGU7XG4gICAgICAgIG1hcmsuc25pcHBldCA9IGFyZ3MudGl0bGU7XG4gICAgICAgIHZhciBpbWFnZSA9IG5ldyBJbWFnZSgpO1xuICAgICAgICBpbWFnZS5zcmMgPSBpbWdTcmM7XG4gICAgICAgIG1hcmsuaWNvbiA9IGltYWdlO1xuICAgICAgICByZXR1cm4gbWFyaztcbiAgICB9O1xuICAgIGFkZE1hcmtEcmF3V2F5KG1hcmtXcmFwcGVyOiBNYXJrV3JhcHBlcikge1xuICAgICAgICAvL0FjdGl2byBlbCBtb2RvIGRlIERyYXdcbiAgICAgICAgdGhpcy5lbmFibGVEcmF3ID0gdHJ1ZTtcbiAgICAgICAgaWYgKCF0aGlzLm1hcmtEcmF3V2F5TGlzdC5BbnkoeCA9PiB4Lm1hcmtJZCA9PSBtYXJrV3JhcHBlci5tYXJrSWQpKSB7XG4gICAgICAgICAgICB0aGlzLm1hcmtEcmF3V2F5TGlzdC5BZGQobWFya1dyYXBwZXIpO1xuICAgICAgICB9XG4gICAgfVxuICAgIHJlbW92ZU1hcmtEcmF3V2F5KG1hcmtXcmFwcGVyOiBNYXJrV3JhcHBlcikge1xuICAgICAgICAvL0Rlc2FjdGl2byBlbCBtb2RvIGRlIERyYXdcbiAgICAgICAgaWYgKCF0aGlzLm1hcmtEcmF3V2F5TGlzdC5BbnkoeCA9PiB4Lm1hcmtJZCA9PSBtYXJrV3JhcHBlci5tYXJrSWQpKSB7XG4gICAgICAgICAgICB0aGlzLm1hcmtEcmF3V2F5TGlzdC5SZW1vdmUobWFya1dyYXBwZXIpO1xuICAgICAgICB9XG4gICAgICAgIC8vRW4gY2FzbyBkZSBxdWUgbm8gaGF5YSBtYXMgbWFyayBwYXJhIGRpYnVqYXIgZGVzYWN0aXZvIGxhIGZ1bmNpb25hbGlkYWRcbiAgICAgICAgaWYgKHRoaXMubWFya0RyYXdXYXlMaXN0LkNvdW50KCkgPT0gMClcbiAgICAgICAgICAgIHRoaXMuZW5hYmxlRHJhdyA9IGZhbHNlO1xuXG4gICAgfVxufVxuZXhwb3J0IGVudW0gTWFya1dyYXBwZXJUeXBlRW51bSB7XG4gICAgRnJpZW5kLFxuICAgIE1lLFxuICAgIEdyb3VwXG59Il19