"use strict";
var isArray_1 = require("./util/isArray");
var isObject_1 = require("./util/isObject");
var isFunction_1 = require("./util/isFunction");
var tryCatch_1 = require("./util/tryCatch");
var errorObject_1 = require("./util/errorObject");
var UnsubscriptionError_1 = require("./util/UnsubscriptionError");
/**
 * Represents a disposable resource, such as the execution of an Observable. A
 * Subscription has one important method, `unsubscribe`, that takes no argument
 * and just disposes the resource held by the subscription.
 *
 * Additionally, subscriptions may be grouped together through the `add()`
 * method, which will attach a child Subscription to the current Subscription.
 * When a Subscription is unsubscribed, all its children (and its grandchildren)
 * will be unsubscribed as well.
 *
 * @class Subscription
 */
var Subscription = (function () {
    /**
     * @param {function(): void} [unsubscribe] A function describing how to
     * perform the disposal of resources when the `unsubscribe` method is called.
     */
    function Subscription(unsubscribe) {
        /**
         * A flag to indicate whether this Subscription has already been unsubscribed.
         * @type {boolean}
         */
        this.closed = false;
        if (unsubscribe) {
            this._unsubscribe = unsubscribe;
        }
    }
    /**
     * Disposes the resources held by the subscription. May, for instance, cancel
     * an ongoing Observable execution or cancel any other type of work that
     * started when the Subscription was created.
     * @return {void}
     */
    Subscription.prototype.unsubscribe = function () {
        var hasErrors = false;
        var errors;
        if (this.closed) {
            return;
        }
        this.closed = true;
        var _a = this, _unsubscribe = _a._unsubscribe, _subscriptions = _a._subscriptions;
        this._subscriptions = null;
        if (isFunction_1.isFunction(_unsubscribe)) {
            var trial = tryCatch_1.tryCatch(_unsubscribe).call(this);
            if (trial === errorObject_1.errorObject) {
                hasErrors = true;
                errors = errors || (errorObject_1.errorObject.e instanceof UnsubscriptionError_1.UnsubscriptionError ?
                    flattenUnsubscriptionErrors(errorObject_1.errorObject.e.errors) : [errorObject_1.errorObject.e]);
            }
        }
        if (isArray_1.isArray(_subscriptions)) {
            var index = -1;
            var len = _subscriptions.length;
            while (++index < len) {
                var sub = _subscriptions[index];
                if (isObject_1.isObject(sub)) {
                    var trial = tryCatch_1.tryCatch(sub.unsubscribe).call(sub);
                    if (trial === errorObject_1.errorObject) {
                        hasErrors = true;
                        errors = errors || [];
                        var err = errorObject_1.errorObject.e;
                        if (err instanceof UnsubscriptionError_1.UnsubscriptionError) {
                            errors = errors.concat(flattenUnsubscriptionErrors(err.errors));
                        }
                        else {
                            errors.push(err);
                        }
                    }
                }
            }
        }
        if (hasErrors) {
            throw new UnsubscriptionError_1.UnsubscriptionError(errors);
        }
    };
    /**
     * Adds a tear down to be called during the unsubscribe() of this
     * Subscription.
     *
     * If the tear down being added is a subscription that is already
     * unsubscribed, is the same reference `add` is being called on, or is
     * `Subscription.EMPTY`, it will not be added.
     *
     * If this subscription is already in an `closed` state, the passed
     * tear down logic will be executed immediately.
     *
     * @param {TeardownLogic} teardown The additional logic to execute on
     * teardown.
     * @return {Subscription} Returns the Subscription used or created to be
     * added to the inner subscriptions list. This Subscription can be used with
     * `remove()` to remove the passed teardown logic from the inner subscriptions
     * list.
     */
    Subscription.prototype.add = function (teardown) {
        if (!teardown || (teardown === Subscription.EMPTY)) {
            return Subscription.EMPTY;
        }
        if (teardown === this) {
            return this;
        }
        var sub = teardown;
        switch (typeof teardown) {
            case 'function':
                sub = new Subscription(teardown);
            case 'object':
                if (sub.closed || typeof sub.unsubscribe !== 'function') {
                    return sub;
                }
                else if (this.closed) {
                    sub.unsubscribe();
                    return sub;
                }
                break;
            default:
                throw new Error('unrecognized teardown ' + teardown + ' added to Subscription.');
        }
        var childSub = new ChildSubscription(sub, this);
        this._subscriptions = this._subscriptions || [];
        this._subscriptions.push(childSub);
        return childSub;
    };
    /**
     * Removes a Subscription from the internal list of subscriptions that will
     * unsubscribe during the unsubscribe process of this Subscription.
     * @param {Subscription} subscription The subscription to remove.
     * @return {void}
     */
    Subscription.prototype.remove = function (subscription) {
        // HACK: This might be redundant because of the logic in `add()`
        if (subscription == null || (subscription === this) || (subscription === Subscription.EMPTY)) {
            return;
        }
        var subscriptions = this._subscriptions;
        if (subscriptions) {
            var subscriptionIndex = subscriptions.indexOf(subscription);
            if (subscriptionIndex !== -1) {
                subscriptions.splice(subscriptionIndex, 1);
            }
        }
    };
    return Subscription;
}());
Subscription.EMPTY = (function (empty) {
    empty.closed = true;
    return empty;
}(new Subscription()));
exports.Subscription = Subscription;
var ChildSubscription = (function (_super) {
    __extends(ChildSubscription, _super);
    function ChildSubscription(_innerSub, _parent) {
        var _this = _super.call(this) || this;
        _this._innerSub = _innerSub;
        _this._parent = _parent;
        return _this;
    }
    ChildSubscription.prototype._unsubscribe = function () {
        var _a = this, _innerSub = _a._innerSub, _parent = _a._parent;
        _parent.remove(this);
        _innerSub.unsubscribe();
    };
    return ChildSubscription;
}(Subscription));
exports.ChildSubscription = ChildSubscription;
function flattenUnsubscriptionErrors(errors) {
    return errors.reduce(function (errs, err) { return errs.concat((err instanceof UnsubscriptionError_1.UnsubscriptionError) ? err.errors : err); }, []);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU3Vic2NyaXB0aW9uLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiU3Vic2NyaXB0aW9uLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSwwQ0FBeUM7QUFDekMsNENBQTJDO0FBQzNDLGdEQUErQztBQUMvQyw0Q0FBMkM7QUFDM0Msa0RBQWlEO0FBQ2pELGtFQUFpRTtBQWFqRTs7Ozs7Ozs7Ozs7R0FXRztBQUNIO0lBY0U7OztPQUdHO0lBQ0gsc0JBQVksV0FBd0I7UUFacEM7OztXQUdHO1FBQ0ksV0FBTSxHQUFZLEtBQUssQ0FBQztRQVM3QixFQUFFLENBQUMsQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDO1lBQ1QsSUFBSyxDQUFDLFlBQVksR0FBRyxXQUFXLENBQUM7UUFDMUMsQ0FBQztJQUNILENBQUM7SUFFRDs7Ozs7T0FLRztJQUNILGtDQUFXLEdBQVg7UUFDRSxJQUFJLFNBQVMsR0FBRyxLQUFLLENBQUM7UUFDdEIsSUFBSSxNQUFhLENBQUM7UUFFbEIsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUM7WUFDaEIsTUFBTSxDQUFDO1FBQ1QsQ0FBQztRQUVELElBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDO1FBRWIsSUFBQSxTQUErQyxFQUE3Qyw4QkFBWSxFQUFFLGtDQUFjLENBQWtCO1FBRS9DLElBQUssQ0FBQyxjQUFjLEdBQUcsSUFBSSxDQUFDO1FBRW5DLEVBQUUsQ0FBQyxDQUFDLHVCQUFVLENBQUMsWUFBWSxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQzdCLElBQUksS0FBSyxHQUFHLG1CQUFRLENBQUMsWUFBWSxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO1lBQzlDLEVBQUUsQ0FBQyxDQUFDLEtBQUssS0FBSyx5QkFBVyxDQUFDLENBQUMsQ0FBQztnQkFDMUIsU0FBUyxHQUFHLElBQUksQ0FBQztnQkFDakIsTUFBTSxHQUFHLE1BQU0sSUFBSSxDQUNqQix5QkFBVyxDQUFD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d0IsRUFBVSxPQUFxQjtRQUEzRSxZQUNFLGlCQUFPLFNBQ1I7UUFGbUIsZUFBUyxHQUFULFNBQVMsQ0FBZTtRQUFVLGFBQU8sR0FBUCxPQUFPLENBQWM7O0lBRTNFLENBQUM7SUFFRCx3Q0FBWSxHQUFaO1FBQ1EsSUFBQSxTQUE2QixFQUEzQix3QkFBUyxFQUFFLG9CQUFPLENBQVU7UUFDcEMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUNyQixTQUFTLENBQUMsV0FBVyxFQUFFLENBQUM7SUFDMUIsQ0FBQztJQUNILHdCQUFDO0FBQUQsQ0FBQyxBQVZELENBQXVDLFlBQVksR0FVbEQ7QUFWWSw4Q0FBaUI7QUFZOUIscUNBQXFDLE1BQWE7SUFDakQsTUFBTSxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsVUFBQyxJQUFJLEVBQUUsR0FBRyxJQUFLLE9BQUEsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLEdBQUcsWUFBWSx5Q0FBbUIsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxNQUFNLEdBQUcsR0FBRyxDQUFDLEVBQXBFLENBQW9FLEVBQUUsRUFBRSxDQUFDLENBQUM7QUFDL0csQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IGlzQXJyYXkgfSBmcm9tICcuL3V0aWwvaXNBcnJheSc7XG5pbXBvcnQgeyBpc09iamVjdCB9IGZyb20gJy4vdXRpbC9pc09iamVjdCc7XG5pbXBvcnQgeyBpc0Z1bmN0aW9uIH0gZnJvbSAnLi91dGlsL2lzRnVuY3Rpb24nO1xuaW1wb3J0IHsgdHJ5Q2F0Y2ggfSBmcm9tICcuL3V0aWwvdHJ5Q2F0Y2gnO1xuaW1wb3J0IHsgZXJyb3JPYmplY3QgfSBmcm9tICcuL3V0aWwvZXJyb3JPYmplY3QnO1xuaW1wb3J0IHsgVW5zdWJzY3JpcHRpb25FcnJvciB9IGZyb20gJy4vdXRpbC9VbnN1YnNjcmlwdGlvbkVycm9yJztcblxuZXhwb3J0IGludGVyZmFjZSBBbm9ueW1vdXNTdWJzY3JpcHRpb24ge1xuICB1bnN1YnNjcmliZSgpOiB2b2lkO1xufVxuXG5leHBvcnQgdHlwZSBUZWFyZG93bkxvZ2ljID0gQW5vbnltb3VzU3Vic2NyaXB0aW9uIHwgRnVuY3Rpb24gfCB2b2lkO1xuXG5leHBvcnQgaW50ZXJmYWNlIElTdWJzY3JpcHRpb24gZXh0ZW5kcyBBbm9ueW1vdXNTdWJzY3JpcHRpb24ge1xuICB1bnN1YnNjcmliZSgpOiB2b2lkO1xuICBjbG9zZWQ6IGJvb2xlYW47XG59XG5cbi8qKlxuICogUmVwcmVzZW50cyBhIGRpc3Bvc2FibGUgcmVzb3VyY2UsIHN1Y2ggYXMgdGhlIGV4ZWN1dGlvbiBvZiBhbiBPYnNlcnZhYmxlLiBBXG4gKiBTdWJzY3JpcHRpb24gaGFzIG9uZSBpbXBvcnRhbnQgbWV0aG9kLCBgdW5zdWJzY3JpYmVgLCB0aGF0IHRha2VzIG5vIGFyZ3VtZW50XG4gKiBhbmQganVzdCBkaXNwb3NlcyB0aGUgcmVzb3VyY2UgaGVsZCBieSB0aGUgc3Vic2NyaXB0aW9uLlxuICpcbiAqIEFkZGl0aW9uYWxseSwgc3Vic2NyaXB0aW9ucyBtYXkgYmUgZ3JvdXBlZCB0b2dldGhlciB0aHJvdWdoIHRoZSBgYWRkKClgXG4gKiBtZXRob2QsIHdoaWNoIHdpbGwgYXR0YWNoIGEgY2hpbGQgU3Vic2NyaXB0aW9uIHRvIHRoZSBjdXJyZW50IFN1YnNjcmlwdGlvbi5cbiAqIFdoZW4gYSBTdWJzY3JpcHRpb24gaXMgdW5zdWJzY3JpYmVkLCBhbGwgaXRzIGNoaWxkcmVuIChhbmQgaXRzIGdyYW5kY2hpbGRyZW4pXG4gKiB3aWxsIGJlIHVuc3Vic2NyaWJlZCBhcyB3ZWxsLlxuICpcbiAqIEBjbGFzcyBTdWJzY3JpcHRpb25cbiAqL1xuZXhwb3J0IGNsYXNzIFN1YnNjcmlwdGlvbiBpbXBsZW1lbnRzIElTdWJzY3JpcHRpb24ge1xuICBwdWJsaWMgc3RhdGljIEVNUFRZOiBTdWJzY3JpcHRpb24gPSAoZnVuY3Rpb24oZW1wdHk6IGFueSl7XG4gICAgZW1wdHkuY2xvc2VkID0gdHJ1ZTtcbiAgICByZXR1cm4gZW1wdHk7XG4gIH0obmV3IFN1YnNjcmlwdGlvbigpKSk7XG5cbiAgLyoqXG4gICAqIEEgZmxhZyB0byBpbmRpY2F0ZSB3aGV0aGVyIHRoaXMgU3Vic2NyaXB0aW9uIGhhcyBhbHJlYWR5IGJlZW4gdW5zdWJzY3JpYmVkLlxuICAgKiBAdHlwZSB7Ym9vbGVhbn1cbiAgICovXG4gIHB1YmxpYyBjbG9zZWQ6IGJvb2xlYW4gPSBmYWxzZTtcblxuICBwcml2YXRlIF9zdWJzY3JpcHRpb25zOiBJU3Vic2NyaXB0aW9uW107XG5cbiAgLyoqXG4gICAqIEBwYXJhbSB7ZnVuY3Rpb24oKTogdm9pZH0gW3Vuc3Vic2NyaWJlXSBBIGZ1bmN0aW9uIGRlc2NyaWJpbmcgaG93IHRvXG4gICAqIHBlcmZvcm0gdGhlIGRpc3Bvc2FsIG9mIHJlc291cmNlcyB3aGVuIHRoZSBgdW5zdWJzY3JpYmVgIG1ldGhvZCBpcyBjYWxsZWQuXG4gICAqL1xuICBjb25zdHJ1Y3Rvcih1bnN1YnNjcmliZT86ICgpID0+IHZvaWQpIHtcbiAgICBpZiAodW5zdWJzY3JpYmUpIHtcbiAgICAgICg8YW55PiB0aGlzKS5fdW5zdWJzY3JpYmUgPSB1bnN1YnNjcmliZTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogRGlzcG9zZXMgdGhlIHJlc291cmNlcyBoZWxkIGJ5IHRoZSBzdWJzY3JpcHRpb24uIE1heSwgZm9yIGluc3RhbmNlLCBjYW5jZWxcbiAgICogYW4gb25nb2luZyBPYnNlcnZhYmxlIGV4ZWN1dGlvbiBvciBjYW5jZWwgYW55IG90aGVyIHR5cGUgb2Ygd29yayB0aGF0XG4gICAqIHN0YXJ0ZWQgd2hlbiB0aGUgU3Vic2NyaXB0aW9uIHdhcyBjcmVhdGVkLlxuICAgKiBAcmV0dXJuIHt2b2lkfVxuICAgKi9cbiAgdW5zdWJzY3JpYmUoKTogdm9pZCB7XG4gICAgbGV0IGhhc0Vycm9ycyA9IGZhbHNlO1xuICAgIGxldCBlcnJvcnM6IGFueVtdO1xuXG4gICAgaWYgKHRoaXMuY2xvc2VkKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgdGhpcy5jbG9zZWQgPSB0cnVlO1xuXG4gICAgY29uc3QgeyBfdW5zdWJzY3JpYmUsIF9zdWJzY3JpcHRpb25zIH0gPSAoPGFueT4gdGhpcyk7XG5cbiAgICAoPGFueT4gdGhpcykuX3N1YnNjcmlwdGlvbnMgPSBudWxsO1xuXG4gICAgaWYgKGlzRnVuY3Rpb24oX3Vuc3Vic2NyaWJlKSkge1xuICAgICAgbGV0IHRyaWFsID0gdHJ5Q2F0Y2goX3Vuc3Vic2NyaWJlKS5jYWxsKHRoaXMpO1xuICAgICAgaWYgKHRyaWFsID09PSBlcnJvck9iamVjdCkge1xuICAgICAgICBoYXNFcnJvcnMgPSB0cnVlO1xuICAgICAgICBlcnJvcnMgPSBlcnJvcnMgfHwgKFxuICAgICAgICAgIGVycm9yT2JqZWN0LmUgaW5zdGFuY2VvZiBVbnN1YnNjcmlwdGlvbkVycm9yID9cbiAgICAgICAgICAgIGZsYXR0ZW5VbnN1YnNjcmlwdGlvbkVycm9ycyhlcnJvck9iamVjdC5lLmVycm9ycykgOiBbZXJyb3JPYmplY3QuZV1cbiAgICAgICAgKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBpZiAoaXNBcnJheShfc3Vic2NyaXB0aW9ucykpIHtcblxuICAgICAgbGV0IGluZGV4ID0gLTE7XG4gICAgICBjb25zdCBsZW4gPSBfc3Vic2NyaXB0aW9ucy5sZW5ndGg7XG5cbiAgICAgIHdoaWxlICgrK2luZGV4IDwgbGVuKSB7XG4gICAgICAgIGNvbnN0IHN1YiA9IF9zdWJzY3JpcHRpb25zW2luZGV4XTtcbiAgICAgICAgaWYgKGlzT2JqZWN0KHN1YikpIHtcbiAgICAgICAgICBsZXQgdHJpYWwgPSB0cnlDYXRjaChzdWIudW5zdWJzY3JpYmUpLmNhbGwoc3ViKTtcbiAgICAgICAgICBpZiAodHJpYWwgPT09IGVycm9yT2JqZWN0KSB7XG4gICAgICAgICAgICBoYXNFcnJvcnMgPSB0cnVlO1xuICAgICAgICAgICAgZXJyb3JzID0gZXJyb3JzIHx8IFtdO1xuICAgICAgICAgICAgbGV0IGVyciA9IGVycm9yT2JqZWN0LmU7XG4gICAgICAgICAgICBpZiAoZXJyIGluc3RhbmNlb2YgVW5zdWJzY3JpcHRpb25FcnJvcikge1xuICAgICAgICAgICAgICBlcnJvcnMgPSBlcnJvcnMuY29uY2F0KGZsYXR0ZW5VbnN1YnNjcmlwdGlvbkVycm9ycyhlcnIuZXJyb3JzKSk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICBlcnJvcnMucHVzaChlcnIpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIGlmIChoYXNFcnJvcnMpIHtcbiAgICAgIHRocm93IG5ldyBVbnN1YnNjcmlwdGlvbkVycm9yKGVycm9ycyk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIEFkZHMgYSB0ZWFyIGRvd24gdG8gYmUgY2FsbGVkIGR1cmluZyB0aGUgdW5zdWJzY3JpYmUoKSBvZiB0aGlzXG4gICAqIFN1YnNjcmlwdGlvbi5cbiAgICpcbiAgICogSWYgdGhlIHRlYXIgZG93biBiZWluZyBhZGRlZCBpcyBhIHN1YnNjcmlwdGlvbiB0aGF0IGlzIGFscmVhZHlcbiAgICogdW5zdWJzY3JpYmVkLCBpcyB0aGUgc2FtZSByZWZlcmVuY2UgYGFkZGAgaXMgYmVpbmcgY2FsbGVkIG9uLCBvciBpc1xuICAgKiBgU3Vic2NyaXB0aW9uLkVNUFRZYCwgaXQgd2lsbCBub3QgYmUgYWRkZWQuXG4gICAqXG4gICAqIElmIHRoaXMgc3Vic2NyaXB0aW9uIGlzIGFscmVhZHkgaW4gYW4gYGNsb3NlZGAgc3RhdGUsIHRoZSBwYXNzZWRcbiAgICogdGVhciBkb3duIGxvZ2ljIHdpbGwgYmUgZXhlY3V0ZWQgaW1tZWRpYXRlbHkuXG4gICAqXG4gICAqIEBwYXJhbSB7VGVhcmRvd25Mb2dpY30gdGVhcmRvd24gVGhlIGFkZGl0aW9uYWwgbG9naWMgdG8gZXhlY3V0ZSBvblxuICAgKiB0ZWFyZG93bi5cbiAgICogQHJldHVybiB7U3Vic2NyaXB0aW9ufSBSZXR1cm5zIHRoZSBTdWJzY3JpcHRpb24gdXNlZCBvciBjcmVhdGVkIHRvIGJlXG4gICAqIGFkZGVkIHRvIHRoZSBpbm5lciBzdWJzY3JpcHRpb25zIGxpc3QuIFRoaXMgU3Vic2NyaXB0aW9uIGNhbiBiZSB1c2VkIHdpdGhcbiAgICogYHJlbW92ZSgpYCB0byByZW1vdmUgdGhlIHBhc3NlZCB0ZWFyZG93biBsb2dpYyBmcm9tIHRoZSBpbm5lciBzdWJzY3JpcHRpb25zXG4gICAqIGxpc3QuXG4gICAqL1xuICBhZGQodGVhcmRvd246IFRlYXJkb3duTG9naWMpOiBTdWJzY3JpcHRpb24ge1xuICAgIGlmICghdGVhcmRvd24gfHwgKHRlYXJkb3duID09PSBTdWJzY3JpcHRpb24uRU1QVFkpKSB7XG4gICAgICByZXR1cm4gU3Vic2NyaXB0aW9uLkVNUFRZO1xuICAgIH1cblxuICAgIGlmICh0ZWFyZG93biA9PT0gdGhpcykge1xuICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuXG4gICAgbGV0IHN1YiA9ICg8U3Vic2NyaXB0aW9uPiB0ZWFyZG93bik7XG5cbiAgICBzd2l0Y2ggKHR5cGVvZiB0ZWFyZG93bikge1xuICAgICAgY2FzZSAnZnVuY3Rpb24nOlxuICAgICAgICBzdWIgPSBuZXcgU3Vic2NyaXB0aW9uKDwoKCkgPT4gdm9pZCkgPiB0ZWFyZG93bik7XG4gICAgICBjYXNlICdvYmplY3QnOlxuICAgICAgICBpZiAoc3ViLmNsb3NlZCB8fCB0eXBlb2Ygc3ViLnVuc3Vic2NyaWJlICE9PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgcmV0dXJuIHN1YjtcbiAgICAgICAgfSBlbHNlIGlmICh0aGlzLmNsb3NlZCkge1xuICAgICAgICAgIHN1Yi51bnN1YnNjcmliZSgpO1xuICAgICAgICAgIHJldHVybiBzdWI7XG4gICAgICAgIH1cbiAgICAgICAgYnJlYWs7XG4gICAgICBkZWZhdWx0OlxuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ3VucmVjb2duaXplZCB0ZWFyZG93biAnICsgdGVhcmRvd24gKyAnIGFkZGVkIHRvIFN1YnNjcmlwdGlvbi4nKTtcbiAgICB9XG5cbiAgICBjb25zdCBjaGlsZFN1YiA9IG5ldyBDaGlsZFN1YnNjcmlwdGlvbihzdWIsIHRoaXMpO1xuICAgIHRoaXMuX3N1YnNjcmlwdGlvbnMgPSB0aGlzLl9zdWJzY3JpcHRpb25zIHx8IFtdO1xuICAgIHRoaXMuX3N1YnNjcmlwdGlvbnMucHVzaChjaGlsZFN1Yik7XG4gICAgcmV0dXJuIGNoaWxkU3ViO1xuICB9XG5cbiAgLyoqXG4gICAqIFJlbW92ZXMgYSBTdWJzY3JpcHRpb24gZnJvbSB0aGUgaW50ZXJuYWwgbGlzdCBvZiBzdWJzY3JpcHRpb25zIHRoYXQgd2lsbFxuICAgKiB1bnN1YnNjcmliZSBkdXJpbmcgdGhlIHVuc3Vic2NyaWJlIHByb2Nlc3Mgb2YgdGhpcyBTdWJzY3JpcHRpb24uXG4gICAqIEBwYXJhbSB7U3Vic2NyaXB0aW9ufSBzdWJzY3JpcHRpb24gVGhlIHN1YnNjcmlwdGlvbiB0byByZW1vdmUuXG4gICAqIEByZXR1cm4ge3ZvaWR9XG4gICAqL1xuICByZW1vdmUoc3Vic2NyaXB0aW9uOiBTdWJzY3JpcHRpb24pOiB2b2lkIHtcblxuICAgIC8vIEhBQ0s6IFRoaXMgbWlnaHQgYmUgcmVkdW5kYW50IGJlY2F1c2Ugb2YgdGhlIGxvZ2ljIGluIGBhZGQoKWBcbiAgICBpZiAoc3Vic2NyaXB0aW9uID09IG51bGwgICB8fCAoXG4gICAgICAgIHN1YnNjcmlwdGlvbiA9PT0gdGhpcykgfHwgKFxuICAgICAgICBzdWJzY3JpcHRpb24gPT09IFN1YnNjcmlwdGlvbi5FTVBUWSkpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBjb25zdCBzdWJzY3JpcHRpb25zID0gKDxhbnk+IHRoaXMpLl9zdWJzY3JpcHRpb25zO1xuXG4gICAgaWYgKHN1YnNjcmlwdGlvbnMpIHtcbiAgICAgIGNvbnN0IHN1YnNjcmlwdGlvbkluZGV4ID0gc3Vic2NyaXB0aW9ucy5pbmRleE9mKHN1YnNjcmlwdGlvbik7XG4gICAgICBpZiAoc3Vic2NyaXB0aW9uSW5kZXggIT09IC0xKSB7XG4gICAgICAgIHN1YnNjcmlwdGlvbnMuc3BsaWNlKHN1YnNjcmlwdGlvbkluZGV4LCAxKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cbn1cblxuZXhwb3J0IGNsYXNzIENoaWxkU3Vic2NyaXB0aW9uIGV4dGVuZHMgU3Vic2NyaXB0aW9uIHtcbiAgY29uc3RydWN0b3IocHJpdmF0ZSBfaW5uZXJTdWI6IElTdWJzY3JpcHRpb24sIHByaXZhdGUgX3BhcmVudDogU3Vic2NyaXB0aW9uKSB7XG4gICAgc3VwZXIoKTtcbiAgfVxuXG4gIF91bnN1YnNjcmliZSgpIHtcbiAgICBjb25zdCB7IF9pbm5lclN1YiwgX3BhcmVudCB9ID0gdGhpcztcbiAgICBfcGFyZW50LnJlbW92ZSh0aGlzKTtcbiAgICBfaW5uZXJTdWIudW5zdWJzY3JpYmUoKTtcbiAgfVxufVxuXG5mdW5jdGlvbiBmbGF0dGVuVW5zdWJzY3JpcHRpb25FcnJvcnMoZXJyb3JzOiBhbnlbXSkge1xuIHJldHVybiBlcnJvcnMucmVkdWNlKChlcnJzLCBlcnIpID0+IGVycnMuY29uY2F0KChlcnIgaW5zdGFuY2VvZiBVbnN1YnNjcmlwdGlvbkVycm9yKSA/IGVyci5lcnJvcnMgOiBlcnIpLCBbXSk7XG59Il19