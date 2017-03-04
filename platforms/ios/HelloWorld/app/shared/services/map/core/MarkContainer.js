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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiTWFya0NvbnRhaW5lci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIk1hcmtDb250YWluZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUNBLDZFQUEwRTtBQUMxRSxrQ0FBaUM7QUFDakMsaUNBQThCO0FBQzlCO0lBQUE7SUFNQSxDQUFDO0lBQUQsa0JBQUM7QUFBRCxDQUFDLEFBTkQsSUFNQztBQU5ZLGtDQUFXO0FBUXhCO0lBQUE7SUFHQSxDQUFDO0lBQUQsb0JBQUM7QUFBRCxDQUFDLEFBSEQsSUFHQztBQUhZLHNDQUFhO0FBSzFCO0lBRUkscUJBQW1CLElBQVksRUFBVSxRQUE2QjtRQUFuRCxTQUFJLEdBQUosSUFBSSxDQUFRO1FBQVUsYUFBUSxHQUFSLFFBQVEsQ0FBcUI7SUFBSSxDQUFDO0lBRS9FLGtCQUFDO0FBQUQsQ0FBQyxBQUpELElBSUM7QUFKWSxrQ0FBVztBQUt4QjtJQW1CSSx1QkFBbUIsUUFBdUIsRUFBRSxNQUFjLEVBQUUsUUFBNkI7UUFsQmpGLHFCQUFnQixHQUFtQyxJQUFJLGFBQUksRUFBNEIsQ0FBQztRQUN4RixlQUFVLEdBQVksS0FBSyxDQUFDO1FBa0JoQyxnRkFBZ0Y7UUFDaEYsSUFBSSxJQUFJLEdBQUcsSUFBSSxhQUFhLEVBQUUsQ0FBQztRQUMvQixJQUFJLENBQUMsS0FBSyxHQUFHLFFBQVEsQ0FBQyxLQUFLLENBQUM7UUFDNUIsSUFBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLHVDQUFRLEVBQUUsQ0FBQztRQUMvQixJQUFJLENBQUMsUUFBUSxDQUFDLFFBQVEsR0FBRyxRQUFRLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQztRQUNwRCxJQUFJLENBQUMsUUFBUSxDQUFDLFNBQVMsR0FBRyxRQUFRLENBQUMsUUFBUSxDQUFDLFNBQVMsQ0FBQztRQUN0RCxJQUFJLE9BQU8sR0FBVyxJQUFJLENBQUM7UUFDM0IsRUFBRSxDQUFDLENBQUMsUUFBUSxJQUFJLG1CQUFtQixDQUFDLEVBQUUsQ0FBQztZQUNuQyxPQUFP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QTtJQUNGLCtEQUFLLENBQUE7QUFDVCxDQUFDLEVBSlcsbUJBQW1CLEdBQW5CLDJCQUFtQixLQUFuQiwyQkFBbUIsUUFJOUIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb2xvciB9IGZyb20gJ2NvbG9yJztcbmltcG9ydCB7IFBvbHlsaW5lLCBNYXJrZXIsIFBvc2l0aW9uIH0gZnJvbSAnbmF0aXZlc2NyaXB0LWdvb2dsZS1tYXBzLXNkayc7XG5pbXBvcnQgeyBJbWFnZSB9IGZyb20gXCJ1aS9pbWFnZVwiO1xuaW1wb3J0IHsgTGlzdCB9IGZyb20gJ2xpbnF0cyc7XG5leHBvcnQgY2xhc3MgQWRkTGluZUFyZ3Mge1xuICAgIHB1YmxpYyBjb2xvcjogQ29sb3I7XG4gICAgcHVibGljIGxpbmU6IFBvbHlsaW5lO1xuICAgIHB1YmxpYyBsb2NhdGlvbjogUG9zaXRpb247XG4gICAgcHVibGljIGdlb2Rlc2ljOiBib29sZWFuO1xuICAgIHB1YmxpYyB3aWR0aDogbnVtYmVyO1xufVxuXG5leHBvcnQgY2xhc3MgQWRkTWFya2VyQXJncyB7XG4gICAgcHVibGljIGxvY2F0aW9uOiBQb3NpdGlvbjtcbiAgICBwdWJsaWMgdGl0bGU6IHN0cmluZztcbn1cblxuZXhwb3J0IGNsYXNzIE1hcmtXcmFwcGVyIHtcbiAgICBtYXJrSWQ6IG51bWJlcjtcbiAgICBjb25zdHJ1Y3RvcihwdWJsaWMgbWFyazogTWFya2VyLCBwcml2YXRlIG1hcmtUeXBlOiBNYXJrV3JhcHBlclR5cGVFbnVtKSB7IH1cblxufVxuZXhwb3J0IGNsYXNzIE1hcmtDb250YWluZXIge1xuICAgIHByaXZhdGUgX21hcmtEcmF3V2F5TGlzdDogTGlzdDxNYXJrV3JhcHBlckNvbmZpZ3VyYXRpb24+ID0gbmV3IExpc3Q8TWFya1dyYXBwZXJDb25maWd1cmF0aW9uPigpO1xuICAgIHByaXZhdGUgZW5hYmxlRHJhdzogYm9vbGVhbiA9IGZhbHNlO1xuICAgIHByaXZhdGUgbWFya1dyYXBwZXI6IE1hcmtXcmFwcGVyO1xuICAgIGdldCBtYXJrSWQoKTogbnVtYmVyIHtcbiAgICAgICAgcmV0dXJuIHRoaXMubWFya1dyYXBwZXIubWFya0lkO1xuICAgIH1cbiAgICBnZXQgbWFyaygpOiBNYXJrZXIge1xuICAgICAgICByZXR1cm4gdGhpcy5tYXJrV3JhcHBlci5tYXJrO1xuICAgIH1cbiAgICBnZXQgbWFya3dyYXBwZXIoKTogTWFya1dyYXBwZXIge1xuICAgICAgICByZXR1cm4gdGhpcy5tYXJrV3JhcHBlcjtcbiAgICB9XG4gICAgZ2V0IGlzRW5hYmxlRHJhdygpOiBib29sZWFuIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZW5hYmxlRHJhdztcbiAgICB9XG4gICAgZ2V0IG1hcmtEcmF3V2F5TGlzdCgpOiBMaXN0PE1hcmtXcmFwcGVyQ29uZmlndXJhdGlvbj4ge1xuICAgICAgICByZXR1cm4gdGhpcy5fbWFya0RyYXdXYXlMaXN0O1xuICAgIH1cbiAgICBwdWJsaWMgY29uc3RydWN0b3IobWFya0luZm86IEFkZE1hcmtlckFyZ3MsIG1hcmtJZDogbnVtYmVyLCBtYXJrVHlwZTogTWFya1dyYXBwZXJUeXBlRW51bSkge1xuICAgICAgICAvL0NyZW8gdW4gTWFya1dyYXBwZXIgZWwgY3VhbCByZWxhY2lvbmEgZWwgTWFya2VyIGNvbiBlbCBpZCBkZWwgdXN1YXJpbyBkaWJ1amFkb1xuICAgICAgICB2YXIgbWFyayA9IG5ldyBBZGRNYXJrZXJBcmdzKCk7XG4gICAgICAgIG1hcmsudGl0bGUgPSBtYXJrSW5mby50aXRsZTtcbiAgICAgICAgbWFyay5sb2NhdGlvbiA9IG5ldyBQb3NpdGlvbigpO1xuICAgICAgICBtYXJrLmxvY2F0aW9uLmxhdGl0dWRlID0gbWFya0luZm8ubG9jYXRpb24ubGF0aXR1ZGU7XG4gICAgICAgIG1hcmsubG9jYXRpb24ubG9uZ2l0dWRlID0gbWFya0luZm8ubG9jYXRpb24ubG9uZ2l0dWRlO1xuICAgICAgICB2YXIgbWFwTWFyazogTWFya2VyID0gbnVsbDtcbiAgICAgICAgaWYgKG1hcmtUeXBlID09IE1hcmtXcmFwcGVyVHlwZUVudW0uTWUpXG4gICAgICAgICAgICBtYXBNYXJrID0gdGhpcy5jcmVhdGVNYXJrKG1hcmssIFwifi9pbWFnZXMvbWUtbWFya2VyLnBuZ1wiKTtcbiAgICAgICAgZWxzZVxuICAgICAgICAgICAgbWFwTWFyayA9IHRoaXMuY3JlYXRlTWFyayhtYXJrKTtcblxuICAgICAgICB2YXIgbWFya1dyYXBwZXIgPSBuZXcgTWFya1dyYXBwZXIobWFwTWFyaywgbWFya1R5cGUpO1xuICAgICAgICBtYXJrV3JhcHBlci5tYXJrSWQgPSBtYXJrSWQ7XG4gICAgICAgIHRoaXMubWFya1dyYXBwZXIgPSBtYXJrV3JhcHBlcjtcbiAgICB9XG4gICAgcHJpdmF0ZSBjcmVhdGVNYXJrKGFyZ3M6IEFkZE1hcmtlckFyZ3MsIGltZ1NyYzogc3RyaW5nID0gXCJ+L2ltYWdlcy9mcmllbmQtbWFya2VyLnBuZ1wiKTogTWFya2VyIHtcblxuICAgICAgICBsZXQgbWFyayA9IG5ldyBNYXJrZXIoKTtcbiAgICAgICAgbWFyay5wb3NpdGlvbiA9IFBvc2l0aW9uLnBvc2l0aW9uRnJvbUxhdExuZyhhcmdzLmxvY2F0aW9uLmxhdGl0dWRlLCBhcmdzLmxvY2F0aW9uLmxvbmdpdHVkZSk7XG4gICAgICAgIG1hcmsudGl0bGUgPSBhcmdzLnRpdGxlO1xuICAgICAgICBtYXJrLnNuaXBwZXQgPSBhcmdzLnRpdGxlO1xuICAgICAgICB2YXIgaW1hZ2UgPSBuZXcgSW1hZ2UoKTtcbiAgICAgICAgaW1hZ2Uuc3JjID0gaW1nU3JjO1xuICAgICAgICBtYXJrLmljb24gPSBpbWFnZTtcbiAgICAgICAgcmV0dXJuIG1hcms7XG4gICAgfTtcbiAgICBhZGRNYXJrRHJhd1dheShtYXJrV3JhcHBlcjogTWFya1dyYXBwZXIpIHtcbiAgICAgICAgLy9BY3Rpdm8gZWwgbW9kbyBkZSBEcmF3XG4gICAgICAgIHRoaXMuZW5hYmxlRHJhdyA9IHRydWU7XG4gICAgICAgIGlmICghdGhpcy5tYXJrRHJhd1dheUxpc3QuQW55KHggPT4geC5tYXJrV3JhcHBlci5tYXJrSWQgPT0gbWFya1dyYXBwZXIubWFya0lkKSkge1xuICAgICAgICAgICAgdmFyIG1hcmtDb25mID0gbmV3IE1hcmtXcmFwcGVyQ29uZmlndXJhdGlvbihtYXJrV3JhcHBlcik7XG4gICAgICAgICAgICB0aGlzLm1hcmtEcmF3V2F5TGlzdC5BZGQobWFya0NvbmYpO1xuICAgICAgICB9XG4gICAgfVxuICAgIHJlbW92ZU1hcmtEcmF3V2F5KG1hcmtXcmFwcGVyOiBNYXJrV3JhcHBlcikge1xuICAgICAgICAvL0Rlc2FjdGl2byBlbCBtb2RvIGRlIERyYXdcbiAgICAgICAgdmFyIG1hcmtDb25mID0gdGhpcy5tYXJrRHJhd1dheUxpc3QuV2hlcmUoeCA9PiB4Lm1hcmtXcmFwcGVyLm1hcmtJZCA9PSBtYXJrV3JhcHBlci5tYXJrSWQpLkZpcnN0T3JEZWZhdWx0KCk7XG4gICAgICAgIGlmIChtYXJrQ29uZiAhPSBudWxsKSB7XG4gICAgICAgICAgICAvL0xpbXBpbyBlbCBjYW1pbm8gZGlidWphZG9cbiAgICAgICAgICAgIHRoaXMuY2xlYXJQb2ludHMobWFya0NvbmYpO1xuICAgICAgICAgICAgdGhpcy5tYXJrRHJhd1dheUxpc3QuUmVtb3ZlKG1hcmtDb25mKTtcbiAgICAgICAgfVxuICAgICAgICAvL0VuIGNhc28gZGUgcXVlIG5vIGhheWEgbWFzIG1hcmsgcGFyYSBkaWJ1amFyIGRlc2FjdGl2byBsYSBmdW5jaW9uYWxpZGFkXG4gICAgICAgIGlmICh0aGlzLm1hcmtEcmF3V2F5TGlzdC5Db3VudCgpID09IDApXG4gICAgICAgICAgICB0aGlzLmVuYWJsZURyYXcgPSBmYWxzZTtcblxuICAgIH1cblxuICAgIC8vUHJpdmF0ZSBNZXRob2RzXG4gICAgcHJpdmF0ZSBjbGVhclBvaW50cyhtYXJrQ29uZjogTWFya1dyYXBwZXJDb25maWd1cmF0aW9uKSB7XG4gICAgICAgIG1hcmtDb25mLnBvbHlsaW5lLnJlbW92ZUFsbFBvaW50cygpO1xuICAgICAgICAvL1NlIGVqZWN1dGEgMyB2ZWNlcyB5YSBxdWUgc2kgbm8gbm8sIHNlIGxpbXBpYSBlbCBjYW1pbm8gcHJldmlhbWVudGUgZGlidWphZG9cbiAgICAgICAgbWFya0NvbmYucG9seWxpbmUuYWRkUG9pbnQoUG9zaXRpb24ucG9zaXRpb25Gcm9tTGF0TG5nKDAsIDApKTtcbiAgICAgICAgbWFya0NvbmYucG9seWxpbmUuYWRkUG9pbnQoUG9zaXRpb24ucG9zaXRpb25Gcm9tTGF0TG5nKDAsIDApKTtcbiAgICAgICAgbWFya0NvbmYucG9seWxpbmUuYWRkUG9pbnQoUG9zaXRpb24ucG9zaXRpb25Gcm9tTGF0TG5nKDAsIDApKTtcblxuICAgIH1cbn1cbmV4cG9ydCBjbGFzcyBNYXJrV3JhcHBlckNvbmZpZ3VyYXRpb24ge1xuICAgIHByaXZhdGUgX3BvbHlsaW5lOiBQb2x5bGluZTtcbiAgICBnZXQgcG9seWxpbmUoKTogUG9seWxpbmUge1xuICAgICAgICByZXR1cm4gdGhpcy5fcG9seWxpbmU7XG4gICAgfVxuICAgIHNldCBwb2x5bGluZShwb2x5bGluZTogUG9seWxpbmUpIHtcbiAgICAgICAgdGhpcy5fcG9seWxpbmUgPSBwb2x5bGluZTtcbiAgICB9XG4gICAgY29uc3RydWN0b3IocHVibGljIG1hcmtXcmFwcGVyOiBNYXJrV3JhcHBlcikgeyB9XG5cbn1cbmV4cG9ydCBlbnVtIE1hcmtXcmFwcGVyVHlwZUVudW0ge1xuICAgIEZyaWVuZCxcbiAgICBNZSxcbiAgICBHcm91cFxufSJdfQ==