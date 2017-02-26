"use strict";
var Observable_1 = require("../Observable");
var subscribeToResult_1 = require("../util/subscribeToResult");
var OuterSubscriber_1 = require("../OuterSubscriber");
/**
 * We need this JSDoc comment for affecting ESDoc.
 * @extends {Ignored}
 * @hide true
 */
var IfObservable = (function (_super) {
    __extends(IfObservable, _super);
    function IfObservable(condition, thenSource, elseSource) {
        var _this = _super.call(this) || this;
        _this.condition = condition;
        _this.thenSource = thenSource;
        _this.elseSource = elseSource;
        return _this;
    }
    IfObservable.create = function (condition, thenSource, elseSource) {
        return new IfObservable(condition, thenSource, elseSource);
    };
    IfObservable.prototype._subscribe = function (subscriber) {
        var _a = this, condition = _a.condition, thenSource = _a.thenSource, elseSource = _a.elseSource;
        return new IfSubscriber(subscriber, condition, thenSource, elseSource);
    };
    return IfObservable;
}(Observable_1.Observable));
exports.IfObservable = IfObservable;
var IfSubscriber = (function (_super) {
    __extends(IfSubscriber, _super);
    function IfSubscriber(destination, condition, thenSource, elseSource) {
        var _this = _super.call(this, destination) || this;
        _this.condition = condition;
        _this.thenSource = thenSource;
        _this.elseSource = elseSource;
        _this.tryIf();
        return _this;
    }
    IfSubscriber.prototype.tryIf = function () {
        var _a = this, condition = _a.condition, thenSource = _a.thenSource, elseSource = _a.elseSource;
        var result;
        try {
            result = condition();
            var source = result ? thenSource : elseSource;
            if (source) {
                this.add(subscribeToResult_1.subscribeToResult(this, source));
            }
            else {
                this._complete();
            }
        }
        catch (err) {
            this._error(err);
        }
    };
    return IfSubscriber;
}(OuterSubscriber_1.OuterSubscriber));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiSWZPYnNlcnZhYmxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiSWZPYnNlcnZhYmxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSw0Q0FBa0U7QUFJbEUsK0RBQThEO0FBQzlELHNEQUFxRDtBQUNyRDs7OztHQUlHO0FBQ0g7SUFBd0MsZ0NBQWE7SUFRbkQsc0JBQW9CLFNBQStCLEVBQy9CLFVBQTRDLEVBQzVDLFVBQTRDO1FBRmhFLFlBR0UsaUJBQU8sU0FDUjtRQUptQixlQUFTLEdBQVQsU0FBUyxDQUFzQjtRQUMvQixnQkFBVSxHQUFWLFVBQVUsQ0FBa0M7UUFDNUMsZ0JBQVUsR0FBVixVQUFVLENBQWtDOztJQUVoRSxDQUFDO0lBVk0sbUJBQU0sR0FBYixVQUFvQixTQUErQixFQUMvQixVQUE0QyxFQUM1QyxVQUE0QztRQUM5RCxNQUFNLENBQUMsSUFBSSxZQUFZLENBQUMsU0FBUyxFQUFFLFVBQVUsRUFBRSxVQUFVLENBQUMsQ0FBQztJQUM3RCxDQUFDO0lBUVMsaUNBQVUsR0FBcEIsVUFBcUIsVUFBMkI7UUFDeEMsSUFBQSxTQUE0QyxFQUExQyx3QkFBUyxFQUFFLDBCQUFVLEVBQUUsMEJBQVUsQ0FBVTtRQUVuRCxNQUFNLENBQUMsSUFBSSxZQUFZLENBQUMsVUFBVSxFQUFFLFNBQVMsRUFBRSxVQUFVLEVBQUUsVUFBVSxDQUFDLENBQUM7SUFDekUsQ0FBQztJQUNILG1CQUFDO0FBQUQsQ0FBQyxBQW5CRCxDQUF3Qyx1QkFBVSxHQW1CakQ7QUFuQlksb0NBQVk7QUFxQnpCO0lBQWlDLGdDQUFxQjtJQUNwRCxzQkFBWSxXQUEwQixFQUNsQixTQUErQixFQUMvQixVQUE0QyxFQUM1QyxVQUE0QztRQUhoRSxZQUlFLGtCQUFNLFdBQVcsQ0FBQyxTQUVuQjtRQUxtQixlQUFTLEdBQVQsU0FBUyxDQUFzQjtRQUMvQixnQkFBVSxHQUFWLFVBQVUsQ0FBa0M7UUFDNUMsZ0JBQVUsR0FBVixVQUFVLENBQWtDO1FBRTlELEtBQUksQ0FBQyxLQUFLLEVBQUUsQ0FBQzs7SUFDZixDQUFDO0lBRU8sNEJBQUssR0FBYjtRQUNRLElBQUEsU0FBNEMsRUFBMUMsd0JBQVMsRUFBRSwwQkFBVSxFQUFFLDBCQUFVLENBQVU7UUFFbkQsSUFBSSxNQUFlLENBQUM7UUFDcEIsSUFBSSxDQUFDO1lBQ0gsTUFBTSxHQUFZLFNBQVMsRUFBRSxDQUFDO1lBQzlCLElBQU0sTUFBTSxHQUFHLE1BQU0sR0FBRyxVQUFVLEdBQUcsVUFBVSxDQUFDO1lBRWhELEVBQUUsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUM7Z0JBQ1gsSUFBSSxDQUFDLEdBQUcsQ0FBQyxxQ0FBaUIsQ0FBQyxJQUFJLEVBQUUsTUFBTSxDQUFDLENBQUMsQ0FBQztZQUM1QyxDQUFDO1lBQUMsSUFBSSxDQUFDLENBQUM7Z0JBQ04sSUFBSSxDQUFDLFNBQVMsRUFBRSxDQUFDO1lBQ25CLENBQUM7UUFDSCxDQUFDO1FBQUMsS0FBSyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztZQUNiLElBQUksQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDbkIsQ0FBQztJQUNILENBQUM7SUFDSCxtQkFBQztBQUFELENBQUMsQUExQkQsQ0FBaUMsaUNBQWUsR0EwQi9DIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgT2JzZXJ2YWJsZSwgU3Vic2NyaWJhYmxlT3JQcm9taXNlIH0gZnJvbSAnLi4vT2JzZXJ2YWJsZSc7XG5pbXBvcnQgeyBTdWJzY3JpYmVyIH0gZnJvbSAnLi4vU3Vic2NyaWJlcic7XG5pbXBvcnQgeyBUZWFyZG93bkxvZ2ljIH0gZnJvbSAnLi4vU3Vic2NyaXB0aW9uJztcblxuaW1wb3J0IHsgc3Vic2NyaWJlVG9SZXN1bHQgfSBmcm9tICcuLi91dGlsL3N1YnNjcmliZVRvUmVzdWx0JztcbmltcG9ydCB7IE91dGVyU3Vic2NyaWJlciB9IGZyb20gJy4uL091dGVyU3Vic2NyaWJlcic7XG4vKipcbiAqIFdlIG5lZWQgdGhpcyBKU0RvYyBjb21tZW50IGZvciBhZmZlY3RpbmcgRVNEb2MuXG4gKiBAZXh0ZW5kcyB7SWdub3JlZH1cbiAqIEBoaWRlIHRydWVcbiAqL1xuZXhwb3J0IGNsYXNzIElmT2JzZXJ2YWJsZTxULCBSPiBleHRlbmRzIE9ic2VydmFibGU8VD4ge1xuXG4gIHN0YXRpYyBjcmVhdGU8VCwgUj4oY29uZGl0aW9uOiAoKSA9PiBib29sZWFuIHwgdm9pZCxcbiAgICAgICAgICAgICAgICAgICAgICB0aGVuU291cmNlPzogU3Vic2NyaWJhYmxlT3JQcm9taXNlPFQ+IHwgdm9pZCxcbiAgICAgICAgICAgICAgICAgICAgICBlbHNlU291cmNlPzogU3Vic2NyaWJhYmxlT3JQcm9taXNlPFI+IHwgdm9pZCk6IE9ic2VydmFibGU8VHxSPiB7XG4gICAgcmV0dXJuIG5ldyBJZk9ic2VydmFibGUoY29uZGl0aW9uLCB0aGVuU291cmNlLCBlbHNlU291cmNlKTtcbiAgfVxuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgY29uZGl0aW9uOiAoKSA9PiBib29sZWFuIHwgdm9pZCxcbiAgICAgICAgICAgICAgcHJpdmF0ZSB0aGVuU291cmNlPzogU3Vic2NyaWJhYmxlT3JQcm9taXNlPFQ+IHwgdm9pZCxcbiAgICAgICAgICAgICAgcHJpdmF0ZSBlbHNlU291cmNlPzogU3Vic2NyaWJhYmxlT3JQcm9taXNlPFI+IHwgdm9pZCkge1xuICAgIHN1cGVyKCk7XG4gIH1cblxuICBwcm90ZWN0ZWQgX3N1YnNjcmliZShzdWJzY3JpYmVyOiBTdWJzY3JpYmVyPFR8Uj4pOiBUZWFyZG93bkxvZ2ljIHtcbiAgICBjb25zdCB7IGNvbmRpdGlvbiwgdGhlblNvdXJjZSwgZWxzZVNvdXJjZSB9ID0gdGhpcztcblxuICAgIHJldHVybiBuZXcgSWZTdWJzY3JpYmVyKHN1YnNjcmliZXIsIGNvbmRpdGlvbiwgdGhlblNvdXJjZSwgZWxzZVNvdXJjZSk7XG4gIH1cbn1cblxuY2xhc3MgSWZTdWJzY3JpYmVyPFQsIFI+IGV4dGVuZHMgT3V0ZXJTdWJzY3JpYmVyPFQsIFQ+IHtcbiAgY29uc3RydWN0b3IoZGVzdGluYXRpb246IFN1YnNjcmliZXI8VD4sXG4gICAgICAgICAgICAgIHByaXZhdGUgY29uZGl0aW9uOiAoKSA9PiBib29sZWFuIHwgdm9pZCxcbiAgICAgICAgICAgICAgcHJpdmF0ZSB0aGVuU291cmNlPzogU3Vic2NyaWJhYmxlT3JQcm9taXNlPFQ+IHwgdm9pZCxcbiAgICAgICAgICAgICAgcHJpdmF0ZSBlbHNlU291cmNlPzogU3Vic2NyaWJhYmxlT3JQcm9taXNlPFI+IHwgdm9pZCkge1xuICAgIHN1cGVyKGRlc3RpbmF0aW9uKTtcbiAgICB0aGlzLnRyeUlmKCk7XG4gIH1cblxuICBwcml2YXRlIHRyeUlmKCk6IHZvaWQge1xuICAgIGNvbnN0IHsgY29uZGl0aW9uLCB0aGVuU291cmNlLCBlbHNlU291cmNlIH0gPSB0aGlzO1xuXG4gICAgbGV0IHJlc3VsdDogYm9vbGVhbjtcbiAgICB0cnkge1xuICAgICAgcmVzdWx0ID0gPGJvb2xlYW4+Y29uZGl0aW9uKCk7XG4gICAgICBjb25zdCBzb3VyY2UgPSByZXN1bHQgPyB0aGVuU291cmNlIDogZWxzZVNvdXJjZTtcblxuICAgICAgaWYgKHNvdXJjZSkge1xuICAgICAgICB0aGlzLmFkZChzdWJzY3JpYmVUb1Jlc3VsdCh0aGlzLCBzb3VyY2UpKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMuX2NvbXBsZXRlKCk7XG4gICAgICB9XG4gICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICB0aGlzLl9lcnJvcihlcnIpO1xuICAgIH1cbiAgfVxufVxuIl19