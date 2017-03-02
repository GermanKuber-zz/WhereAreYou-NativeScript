"use strict";
var Subscriber_1 = require("../Subscriber");
/**
 * Returns an Observable that emits whether or not every item of the source satisfies the condition specified.
 *
 * @example <caption>A simple example emitting true if all elements are less than 5, false otherwise</caption>
 *  Observable.of(1, 2, 3, 4, 5, 6)
 *     .every(x => x < 5)
 *     .subscribe(x => console.log(x)); // -> false
 *
 * @param {function} predicate a function for determining if an item meets a specified condition.
 * @param {any} [thisArg] optional object to use for `this` in the callback
 * @return {Observable} an Observable of booleans that determines if all items of the source Observable meet the condition specified.
 * @method every
 * @owner Observable
 */
function every(predicate, thisArg) {
    return this.lift(new EveryOperator(predicate, thisArg, this));
}
exports.every = every;
var EveryOperator = (function () {
    function EveryOperator(predicate, thisArg, source) {
        this.predicate = predicate;
        this.thisArg = thisArg;
        this.source = source;
    }
    EveryOperator.prototype.call = function (observer, source) {
        return source.subscribe(new EverySubscriber(observer, this.predicate, this.thisArg, this.source));
    };
    return EveryOperator;
}());
/**
 * We need this JSDoc comment for affecting ESDoc.
 * @ignore
 * @extends {Ignored}
 */
var EverySubscriber = (function (_super) {
    __extends(EverySubscriber, _super);
    function EverySubscriber(destination, predicate, thisArg, source) {
        var _this = _super.call(this, destination) || this;
        _this.predicate = predicate;
        _this.thisArg = thisArg;
        _this.source = source;
        _this.index = 0;
        _this.thisArg = thisArg || _this;
        return _this;
    }
    EverySubscriber.prototype.notifyComplete = function (everyValueMatch) {
        this.destination.next(everyValueMatch);
        this.destination.complete();
    };
    EverySubscriber.prototype._next = function (value) {
        var result = false;
        try {
            result = this.predicate.call(this.thisArg, value, this.index++, this.source);
        }
        catch (err) {
            this.destination.error(err);
            return;
        }
        if (!result) {
            this.notifyComplete(false);
        }
    };
    EverySubscriber.prototype._complete = function () {
        this.notifyComplete(true);
    };
    return EverySubscriber;
}(Subscriber_1.Subscriber));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXZlcnkuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJldmVyeS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBR0EsNENBQTJDO0FBRTNDOzs7Ozs7Ozs7Ozs7O0dBYUc7QUFDSCxlQUE4QyxTQUFzRSxFQUMzRixPQUFhO0lBQ3BDLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksYUFBYSxDQUFDLFNBQVMsRUFBRSxPQUFPLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQztBQUNoRSxDQUFDO0FBSEQsc0JBR0M7QUFFRDtJQUNFLHVCQUFvQixTQUFzRSxFQUN0RSxPQUFhLEVBQ2IsTUFBc0I7UUFGdEIsY0FBUyxHQUFULFNBQVMsQ0FBNkQ7UUFDdEUsWUFBTyxHQUFQLE9BQU8sQ0FBTTtRQUNiLFdBQU0sR0FBTixNQUFNLENBQWdCO0lBQzFDLENBQUM7SUFFRCw0QkFBSSxHQUFKLFVBQUssUUFBNkIsRUFBRSxNQUFXO1FBQzdDLE1BQU0sQ0FBQyxNQUFNLENBQUMsU0FBUyxDQUFDLElBQUksZUFBZSxDQUFDLFFBQVEsRUFBRSxJQUFJLENBQUMsU0FBUyxFQUFFLElBQUksQ0FBQyxPQUFPLEVBQUUsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUM7SUFDcEcsQ0FBQztJQUNILG9CQUFDO0FBQUQsQ0FBQyxBQVRELElBU0M7QUFFRDs7OztHQUlHO0FBQ0g7SUFBaUMsbUNBQWE7SUFHNUMseUJBQVksV0FBOEIsRUFDdEIsU0FBc0UsRUFDdEUsT0FBWSxFQUNaLE1BQXNCO1FBSDFDLFlBSUUsa0JBQU0sV0FBVyxDQUFDLFNBRW5CO1FBTG1CLGVBQVMsR0FBVCxTQUFTLENBQTZEO1FBQ3RFLGFBQU8sR0FBUCxPQUFPLENBQUs7UUFDWixZQUFNLEdBQU4sTUFBTSxDQUFnQjtRQUxsQyxXQUFLLEdBQVcsQ0FBQyxDQUFDO1FBT3hCLEtBQUksQ0FBQyxPQUFPLEdBQUcsT0FBTyxJQUFJLEtBQUksQ0FBQzs7SUFDakMsQ0FBQztJQUVPLHdDQUFjLEdBQXRCLFVBQXVCLGVBQXdCO1FBQzdDLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxDQUFDO1FBQ3ZDLElBQUksQ0FBQyxXQUFXLENBQUMsUUFBUSxFQUFFLENBQUM7SUFDOUIsQ0FBQztJQUVTLCtCQUFLLEdBQWYsVUFBZ0IsS0FBUTtRQUN0QixJQUFJLE1BQU0sR0FBRyxLQUFLLENBQUM7UUFDbkIsSUFBSSxDQUFDO1lBQ0gsTUFBTSxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLEVBQUUsS0FBSyxFQUFFLElBQUksQ0FBQyxLQUFLLEVBQUUsRUFBRSxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDL0UsQ0FBQztRQUFDLEtBQUssQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7WUFDYixJQUFJLENBQUMsV0FBVyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQztZQUM1QixNQUFNLENBQUM7UUFDVCxDQUFDO1FBRUQsRUFBRSxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDO1lBQ1osSUFBSSxDQUFDLGNBQWMsQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUM3QixDQUFDO0lBQ0gsQ0FBQztJQUVTLG1DQUFTLEdBQW5CO1FBQ0UsSUFBSSxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUM1QixDQUFDO0lBQ0gsc0JBQUM7QUFBRCxDQUFDLEFBakNELENBQWlDLHVCQUFVLEdBaUMxQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE9wZXJhdG9yIH0gZnJvbSAnLi4vT3BlcmF0b3InO1xuaW1wb3J0IHsgT2JzZXJ2ZXIgfSBmcm9tICcuLi9PYnNlcnZlcic7XG5pbXBvcnQgeyBPYnNlcnZhYmxlIH0gZnJvbSAnLi4vT2JzZXJ2YWJsZSc7XG5pbXBvcnQgeyBTdWJzY3JpYmVyIH0gZnJvbSAnLi4vU3Vic2NyaWJlcic7XG5cbi8qKlxuICogUmV0dXJucyBhbiBPYnNlcnZhYmxlIHRoYXQgZW1pdHMgd2hldGhlciBvciBub3QgZXZlcnkgaXRlbSBvZiB0aGUgc291cmNlIHNhdGlzZmllcyB0aGUgY29uZGl0aW9uIHNwZWNpZmllZC5cbiAqXG4gKiBAZXhhbXBsZSA8Y2FwdGlvbj5BIHNpbXBsZSBleGFtcGxlIGVtaXR0aW5nIHRydWUgaWYgYWxsIGVsZW1lbnRzIGFyZSBsZXNzIHRoYW4gNSwgZmFsc2Ugb3RoZXJ3aXNlPC9jYXB0aW9uPlxuICogIE9ic2VydmFibGUub2YoMSwgMiwgMywgNCwgNSwgNilcbiAqICAgICAuZXZlcnkoeCA9PiB4IDwgNSlcbiAqICAgICAuc3Vic2NyaWJlKHggPT4gY29uc29sZS5sb2coeCkpOyAvLyAtPiBmYWxzZVxuICogXG4gKiBAcGFyYW0ge2Z1bmN0aW9ufSBwcmVkaWNhdGUgYSBmdW5jdGlvbiBmb3IgZGV0ZXJtaW5pbmcgaWYgYW4gaXRlbSBtZWV0cyBhIHNwZWNpZmllZCBjb25kaXRpb24uXG4gKiBAcGFyYW0ge2FueX0gW3RoaXNBcmddIG9wdGlvbmFsIG9iamVjdCB0byB1c2UgZm9yIGB0aGlzYCBpbiB0aGUgY2FsbGJhY2tcbiAqIEByZXR1cm4ge09ic2VydmFibGV9IGFuIE9ic2VydmFibGUgb2YgYm9vbGVhbnMgdGhhdCBkZXRlcm1pbmVzIGlmIGFsbCBpdGVtcyBvZiB0aGUgc291cmNlIE9ic2VydmFibGUgbWVldCB0aGUgY29uZGl0aW9uIHNwZWNpZmllZC5cbiAqIEBtZXRob2QgZXZlcnlcbiAqIEBvd25lciBPYnNlcnZhYmxlXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBldmVyeTxUPih0aGlzOiBPYnNlcnZhYmxlPFQ+LCBwcmVkaWNhdGU6ICh2YWx1ZTogVCwgaW5kZXg6IG51bWJlciwgc291cmNlOiBPYnNlcnZhYmxlPFQ+KSA9PiBib29sZWFuLFxuICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXNBcmc/OiBhbnkpOiBPYnNlcnZhYmxlPGJvb2xlYW4+IHtcbiAgcmV0dXJuIHRoaXMubGlmdChuZXcgRXZlcnlPcGVyYXRvcihwcmVkaWNhdGUsIHRoaXNBcmcsIHRoaXMpKTtcbn1cblxuY2xhc3MgRXZlcnlPcGVyYXRvcjxUPiBpbXBsZW1lbnRzIE9wZXJhdG9yPFQsIGJvb2xlYW4+IHtcbiAgY29uc3RydWN0b3IocHJpdmF0ZSBwcmVkaWNhdGU6ICh2YWx1ZTogVCwgaW5kZXg6IG51bWJlciwgc291cmNlOiBPYnNlcnZhYmxlPFQ+KSA9PiBib29sZWFuLFxuICAgICAgICAgICAgICBwcml2YXRlIHRoaXNBcmc/OiBhbnksXG4gICAgICAgICAgICAgIHByaXZhdGUgc291cmNlPzogT2JzZXJ2YWJsZTxUPikge1xuICB9XG5cbiAgY2FsbChvYnNlcnZlcjogU3Vic2NyaWJlcjxib29sZWFuPiwgc291cmNlOiBhbnkpOiBhbnkge1xuICAgIHJldHVybiBzb3VyY2Uuc3Vic2NyaWJlKG5ldyBFdmVyeVN1YnNjcmliZXIob2JzZXJ2ZXIsIHRoaXMucHJlZGljYXRlLCB0aGlzLnRoaXNBcmcsIHRoaXMuc291cmNlKSk7XG4gIH1cbn1cblxuLyoqXG4gKiBXZSBuZWVkIHRoaXMgSlNEb2MgY29tbWVudCBmb3IgYWZmZWN0aW5nIEVTRG9jLlxuICogQGlnbm9yZVxuICogQGV4dGVuZHMge0lnbm9yZWR9XG4gKi9cbmNsYXNzIEV2ZXJ5U3Vic2NyaWJlcjxUPiBleHRlbmRzIFN1YnNjcmliZXI8VD4ge1xuICBwcml2YXRlIGluZGV4OiBudW1iZXIgPSAwO1xuXG4gIGNvbnN0cnVjdG9yKGRlc3RpbmF0aW9uOiBPYnNlcnZlcjxib29sZWFuPixcbiAgICAgICAgICAgICAgcHJpdmF0ZSBwcmVkaWNhdGU6ICh2YWx1ZTogVCwgaW5kZXg6IG51bWJlciwgc291cmNlOiBPYnNlcnZhYmxlPFQ+KSA9PiBib29sZWFuLFxuICAgICAgICAgICAgICBwcml2YXRlIHRoaXNBcmc6IGFueSxcbiAgICAgICAgICAgICAgcHJpdmF0ZSBzb3VyY2U/OiBPYnNlcnZhYmxlPFQ+KSB7XG4gICAgc3VwZXIoZGVzdGluYXRpb24pO1xuICAgIHRoaXMudGhpc0FyZyA9IHRoaXNBcmcgfHwgdGhpcztcbiAgfVxuXG4gIHByaXZhdGUgbm90aWZ5Q29tcGxldGUoZXZlcnlWYWx1ZU1hdGNoOiBib29sZWFuKTogdm9pZCB7XG4gICAgdGhpcy5kZXN0aW5hdGlvbi5uZXh0KGV2ZXJ5VmFsdWVNYXRjaCk7XG4gICAgdGhpcy5kZXN0aW5hdGlvbi5jb21wbGV0ZSgpO1xuICB9XG5cbiAgcHJvdGVjdGVkIF9uZXh0KHZhbHVlOiBUKTogdm9pZCB7XG4gICAgbGV0IHJlc3VsdCA9IGZhbHNlO1xuICAgIHRyeSB7XG4gICAgICByZXN1bHQgPSB0aGlzLnByZWRpY2F0ZS5jYWxsKHRoaXMudGhpc0FyZywgdmFsdWUsIHRoaXMuaW5kZXgrKywgdGhpcy5zb3VyY2UpO1xuICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgdGhpcy5kZXN0aW5hdGlvbi5lcnJvcihlcnIpO1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGlmICghcmVzdWx0KSB7XG4gICAgICB0aGlzLm5vdGlmeUNvbXBsZXRlKGZhbHNlKTtcbiAgICB9XG4gIH1cblxuICBwcm90ZWN0ZWQgX2NvbXBsZXRlKCk6IHZvaWQge1xuICAgIHRoaXMubm90aWZ5Q29tcGxldGUodHJ1ZSk7XG4gIH1cbn1cbiJdfQ==