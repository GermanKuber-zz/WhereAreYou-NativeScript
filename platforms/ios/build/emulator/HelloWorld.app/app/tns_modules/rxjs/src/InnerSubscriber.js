"use strict";
var Subscriber_1 = require("./Subscriber");
/**
 * We need this JSDoc comment for affecting ESDoc.
 * @ignore
 * @extends {Ignored}
 */
var InnerSubscriber = (function (_super) {
    __extends(InnerSubscriber, _super);
    function InnerSubscriber(parent, outerValue, outerIndex) {
        var _this = _super.call(this) || this;
        _this.parent = parent;
        _this.outerValue = outerValue;
        _this.outerIndex = outerIndex;
        _this.index = 0;
        return _this;
    }
    InnerSubscriber.prototype._next = function (value) {
        this.parent.notifyNext(this.outerValue, value, this.outerIndex, this.index++, this);
    };
    InnerSubscriber.prototype._error = function (error) {
        this.parent.notifyError(error, this);
        this.unsubscribe();
    };
    InnerSubscriber.prototype._complete = function () {
        this.parent.notifyComplete(this);
        this.unsubscribe();
    };
    return InnerSubscriber;
}(Subscriber_1.Subscriber));
exports.InnerSubscriber = InnerSubscriber;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiSW5uZXJTdWJzY3JpYmVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiSW5uZXJTdWJzY3JpYmVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSwyQ0FBMEM7QUFHMUM7Ozs7R0FJRztBQUNIO0lBQTJDLG1DQUFhO0lBR3RELHlCQUFvQixNQUE2QixFQUFVLFVBQWEsRUFBVSxVQUFrQjtRQUFwRyxZQUNFLGlCQUFPLFNBQ1I7UUFGbUIsWUFBTSxHQUFOLE1BQU0sQ0FBdUI7UUFBVSxnQkFBVSxHQUFWLFVBQVUsQ0FBRztRQUFVLGdCQUFVLEdBQVYsVUFBVSxDQUFRO1FBRjVGLFdBQUssR0FBVyxDQUFDLENBQUM7O0lBSTFCLENBQUM7SUFFUywrQkFBSyxHQUFmLFVBQWdCLEtBQVE7UUFDdEIsSUFBSSxDQUFDLE1BQU0sQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLFVBQVUsRUFBRSxLQUFLLEVBQUUsSUFBSSxDQUFDLFVBQVUsRUFBRSxJQUFJLENBQUMsS0FBSyxFQUFFLEVBQUUsSUFBSSxDQUFDLENBQUM7SUFDdEYsQ0FBQztJQUVTLGdDQUFNLEdBQWhCLFVBQWlCLEtBQVU7UUFDekIsSUFBSSxDQUFDLE1BQU0sQ0FBQyxXQUFXLENBQUMsS0FBSyxFQUFFLElBQUksQ0FBQyxDQUFDO1FBQ3JDLElBQUksQ0FBQyxXQUFXLEVBQUUsQ0FBQztJQUNyQixDQUFDO0lBRVMsbUNBQVMsR0FBbkI7UUFDRSxJQUFJLENBQUMsTUFBTSxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUNqQyxJQUFJLENBQUMsV0FBVyxFQUFFLENBQUM7SUFDckIsQ0FBQztJQUNILHNCQUFDO0FBQUQsQ0FBQyxBQXBCRCxDQUEyQyx1QkFBVSxHQW9CcEQ7QUFwQlksMENBQWUiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBTdWJzY3JpYmVyIH0gZnJvbSAnLi9TdWJzY3JpYmVyJztcbmltcG9ydCB7IE91dGVyU3Vic2NyaWJlciB9IGZyb20gJy4vT3V0ZXJTdWJzY3JpYmVyJztcblxuLyoqXG4gKiBXZSBuZWVkIHRoaXMgSlNEb2MgY29tbWVudCBmb3IgYWZmZWN0aW5nIEVTRG9jLlxuICogQGlnbm9yZVxuICogQGV4dGVuZHMge0lnbm9yZWR9XG4gKi9cbmV4cG9ydCBjbGFzcyBJbm5lclN1YnNjcmliZXI8VCwgUj4gZXh0ZW5kcyBTdWJzY3JpYmVyPFI+IHtcbiAgcHJpdmF0ZSBpbmRleDogbnVtYmVyID0gMDtcblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIHBhcmVudDogT3V0ZXJTdWJzY3JpYmVyPFQsIFI+LCBwcml2YXRlIG91dGVyVmFsdWU6IFQsIHByaXZhdGUgb3V0ZXJJbmRleDogbnVtYmVyKSB7XG4gICAgc3VwZXIoKTtcbiAgfVxuXG4gIHByb3RlY3RlZCBfbmV4dCh2YWx1ZTogUik6IHZvaWQge1xuICAgIHRoaXMucGFyZW50Lm5vdGlmeU5leHQodGhpcy5vdXRlclZhbHVlLCB2YWx1ZSwgdGhpcy5vdXRlckluZGV4LCB0aGlzLmluZGV4KyssIHRoaXMpO1xuICB9XG5cbiAgcHJvdGVjdGVkIF9lcnJvcihlcnJvcjogYW55KTogdm9pZCB7XG4gICAgdGhpcy5wYXJlbnQubm90aWZ5RXJyb3IoZXJyb3IsIHRoaXMpO1xuICAgIHRoaXMudW5zdWJzY3JpYmUoKTtcbiAgfVxuXG4gIHByb3RlY3RlZCBfY29tcGxldGUoKTogdm9pZCB7XG4gICAgdGhpcy5wYXJlbnQubm90aWZ5Q29tcGxldGUodGhpcyk7XG4gICAgdGhpcy51bnN1YnNjcmliZSgpO1xuICB9XG59XG4iXX0=