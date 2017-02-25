"use strict";
/**
 * An error thrown when one or more errors have occurred during the
 * `unsubscribe` of a {@link Subscription}.
 */
var UnsubscriptionError = (function (_super) {
    __extends(UnsubscriptionError, _super);
    function UnsubscriptionError(errors) {
        var _this = _super.call(this) || this;
        _this.errors = errors;
        var err = Error.call(_this, errors ?
            errors.length + " errors occurred during unsubscription:\n  " + errors.map(function (err, i) { return i + 1 + ") " + err.toString(); }).join('\n  ') : '');
        _this.name = err.name = 'UnsubscriptionError';
        _this.stack = err.stack;
        _this.message = err.message;
        return _this;
    }
    return UnsubscriptionError;
}(Error));
exports.UnsubscriptionError = UnsubscriptionError;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiVW5zdWJzY3JpcHRpb25FcnJvci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIlVuc3Vic2NyaXB0aW9uRXJyb3IudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBOzs7R0FHRztBQUNIO0lBQXlDLHVDQUFLO0lBQzVDLDZCQUFtQixNQUFhO1FBQWhDLFlBQ0UsaUJBQU8sU0FPUjtRQVJrQixZQUFNLEdBQU4sTUFBTSxDQUFPO1FBRTlCLElBQU0sR0FBRyxHQUFRLEtBQUssQ0FBQyxJQUFJLENBQUMsS0FBSSxFQUFFLE1BQU07WUFDbkMsTUFBTSxDQUFDLE1BQU0sbURBQ2xCLE1BQU0sQ0FBQyxHQUFHLENBQUMsVUFBQyxHQUFHLEVBQUUsQ0FBQyxJQUFLLE9BQUcsQ0FBQyxHQUFHLENBQUMsVUFBSyxHQUFHLENBQUMsUUFBUSxFQUFJLEVBQTdCLENBQTZCLENBQUMsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFHLEdBQUcsRUFBRSxDQUFDLENBQUM7UUFDcEUsS0FBSyxDQUFDLElBQUksR0FBRyxHQUFHLENBQUMsSUFBSSxHQUFHLHFCQUFxQixDQUFDO1FBQzlDLEtBQUssQ0FBQyxLQUFLLEdBQUcsR0FBRyxDQUFDLEtBQUssQ0FBQztRQUN4QixLQUFLLENBQUMsT0FBTyxHQUFHLEdBQUcsQ0FBQyxPQUFPLENBQUM7O0lBQ3JDLENBQUM7SUFDSCwwQkFBQztBQUFELENBQUMsQUFWRCxDQUF5QyxLQUFLLEdBVTdDO0FBVlksa0RBQW1CIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBBbiBlcnJvciB0aHJvd24gd2hlbiBvbmUgb3IgbW9yZSBlcnJvcnMgaGF2ZSBvY2N1cnJlZCBkdXJpbmcgdGhlXG4gKiBgdW5zdWJzY3JpYmVgIG9mIGEge0BsaW5rIFN1YnNjcmlwdGlvbn0uXG4gKi9cbmV4cG9ydCBjbGFzcyBVbnN1YnNjcmlwdGlvbkVycm9yIGV4dGVuZHMgRXJyb3Ige1xuICBjb25zdHJ1Y3RvcihwdWJsaWMgZXJyb3JzOiBhbnlbXSkge1xuICAgIHN1cGVyKCk7XG4gICAgY29uc3QgZXJyOiBhbnkgPSBFcnJvci5jYWxsKHRoaXMsIGVycm9ycyA/XG4gICAgICBgJHtlcnJvcnMubGVuZ3RofSBlcnJvcnMgb2NjdXJyZWQgZHVyaW5nIHVuc3Vic2NyaXB0aW9uOlxuICAke2Vycm9ycy5tYXAoKGVyciwgaSkgPT4gYCR7aSArIDF9KSAke2Vyci50b1N0cmluZygpfWApLmpvaW4oJ1xcbiAgJyl9YCA6ICcnKTtcbiAgICAoPGFueT4gdGhpcykubmFtZSA9IGVyci5uYW1lID0gJ1Vuc3Vic2NyaXB0aW9uRXJyb3InO1xuICAgICg8YW55PiB0aGlzKS5zdGFjayA9IGVyci5zdGFjaztcbiAgICAoPGFueT4gdGhpcykubWVzc2FnZSA9IGVyci5tZXNzYWdlO1xuICB9XG59XG4iXX0=