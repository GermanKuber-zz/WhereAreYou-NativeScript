"use strict";
/**
 * An execution context and a data structure to order tasks and schedule their
 * execution. Provides a notion of (potentially virtual) time, through the
 * `now()` getter method.
 *
 * Each unit of work in a Scheduler is called an {@link Action}.
 *
 * ```ts
 * class Scheduler {
 *   now(): number;
 *   schedule(work, delay?, state?): Subscription;
 * }
 * ```
 *
 * @class Scheduler
 */
var Scheduler = (function () {
    function Scheduler(SchedulerAction, now) {
        if (now === void 0) { now = Scheduler.now; }
        this.SchedulerAction = SchedulerAction;
        this.now = now;
    }
    /**
     * Schedules a function, `work`, for execution. May happen at some point in
     * the future, according to the `delay` parameter, if specified. May be passed
     * some context object, `state`, which will be passed to the `work` function.
     *
     * The given arguments will be processed an stored as an Action object in a
     * queue of actions.
     *
     * @param {function(state: ?T): ?Subscription} work A function representing a
     * task, or some unit of work to be executed by the Scheduler.
     * @param {number} [delay] Time to wait before executing the work, where the
     * time unit is implicit and defined by the Scheduler itself.
     * @param {T} [state] Some contextual data that the `work` function uses when
     * called by the Scheduler.
     * @return {Subscription} A subscription in order to be able to unsubscribe
     * the scheduled work.
     */
    Scheduler.prototype.schedule = function (work, delay, state) {
        if (delay === void 0) { delay = 0; }
        return new this.SchedulerAction(this, work).schedule(state, delay);
    };
    return Scheduler;
}());
Scheduler.now = Date.now ? Date.now : function () { return +new Date(); };
exports.Scheduler = Scheduler;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU2NoZWR1bGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiU2NoZWR1bGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFPQTs7Ozs7Ozs7Ozs7Ozs7O0dBZUc7QUFDSDtJQUlFLG1CQUFvQixlQUE4QixFQUN0QyxHQUFpQztRQUFqQyxvQkFBQSxFQUFBLE1BQW9CLFNBQVMsQ0FBQyxHQUFHO1FBRHpCLG9CQUFlLEdBQWYsZUFBZSxDQUFlO1FBRWhELElBQUksQ0FBQyxHQUFHLEdBQUcsR0FBRyxDQUFDO0lBQ2pCLENBQUM7SUFZRDs7Ozs7Ozs7Ozs7Ozs7OztPQWdCRztJQUNJLDRCQUFRLEdBQWYsVUFBbUIsSUFBMEMsRUFBRSxLQUFpQixFQUFFLEtBQVM7UUFBNUIsc0JBQUEsRUFBQSxTQUFpQjtRQUM5RSxNQUFNLENBQUMsSUFBSSxJQUFJLENBQUMsZUFBZSxDQUFJLElBQUksRUFBRSxJQUFJLENBQUMsQ0FBQyxRQUFRLENBQUMsS0FBSyxFQUFFLEtBQUssQ0FBQyxDQUFDO0lBQ3hFLENBQUM7SUFDSCxnQkFBQztBQUFELENBQUMsQUF2Q0Q7QUFFZ0IsYUFBRyxHQUFpQixJQUFJLENBQUMsR0FBRyxHQUFHLElBQUksQ0FBQyxHQUFHLEdBQUcsY0FBTSxPQUFBLENBQUMsSUFBSSxJQUFJLEVBQUUsRUFBWCxDQUFXLENBQUM7QUFGL0QsOEJBQVMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBBY3Rpb24gfSBmcm9tICcuL3NjaGVkdWxlci9BY3Rpb24nO1xuaW1wb3J0IHsgU3Vic2NyaXB0aW9uIH0gZnJvbSAnLi9TdWJzY3JpcHRpb24nO1xuXG5leHBvcnQgaW50ZXJmYWNlIElTY2hlZHVsZXIge1xuICBub3coKTogbnVtYmVyO1xuICBzY2hlZHVsZTxUPih3b3JrOiAodGhpczogQWN0aW9uPFQ+LCBzdGF0ZT86IFQpID0+IHZvaWQsIGRlbGF5PzogbnVtYmVyLCBzdGF0ZT86IFQpOiBTdWJzY3JpcHRpb247XG59XG4vKipcbiAqIEFuIGV4ZWN1dGlvbiBjb250ZXh0IGFuZCBhIGRhdGEgc3RydWN0dXJlIHRvIG9yZGVyIHRhc2tzIGFuZCBzY2hlZHVsZSB0aGVpclxuICogZXhlY3V0aW9uLiBQcm92aWRlcyBhIG5vdGlvbiBvZiAocG90ZW50aWFsbHkgdmlydHVhbCkgdGltZSwgdGhyb3VnaCB0aGVcbiAqIGBub3coKWAgZ2V0dGVyIG1ldGhvZC5cbiAqXG4gKiBFYWNoIHVuaXQgb2Ygd29yayBpbiBhIFNjaGVkdWxlciBpcyBjYWxsZWQgYW4ge0BsaW5rIEFjdGlvbn0uXG4gKlxuICogYGBgdHNcbiAqIGNsYXNzIFNjaGVkdWxlciB7XG4gKiAgIG5vdygpOiBudW1iZXI7XG4gKiAgIHNjaGVkdWxlKHdvcmssIGRlbGF5Pywgc3RhdGU/KTogU3Vic2NyaXB0aW9uO1xuICogfVxuICogYGBgXG4gKlxuICogQGNsYXNzIFNjaGVkdWxlclxuICovXG5leHBvcnQgY2xhc3MgU2NoZWR1bGVyIGltcGxlbWVudHMgSVNjaGVkdWxlciB7XG5cbiAgcHVibGljIHN0YXRpYyBub3c6ICgpID0+IG51bWJlciA9IERhdGUubm93ID8gRGF0ZS5ub3cgOiAoKSA9PiArbmV3IERhdGUoKTtcblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIFNjaGVkdWxlckFjdGlvbjogdHlwZW9mIEFjdGlvbixcbiAgICAgICAgICAgICAgbm93OiAoKSA9PiBudW1iZXIgPSBTY2hlZHVsZXIubm93KSB7XG4gICAgdGhpcy5ub3cgPSBub3c7XG4gIH1cblxuICAvKipcbiAgICogQSBnZXR0ZXIgbWV0aG9kIHRoYXQgcmV0dXJucyBhIG51bWJlciByZXByZXNlbnRpbmcgdGhlIGN1cnJlbnQgdGltZVxuICAgKiAoYXQgdGhlIHRpbWUgdGhpcyBmdW5jdGlvbiB3YXMgY2FsbGVkKSBhY2NvcmRpbmcgdG8gdGhlIHNjaGVkdWxlcidzIG93blxuICAgKiBpbnRlcm5hbCBjbG9jay5cbiAgICogQHJldHVybiB7bnVtYmVyfSBBIG51bWJlciB0aGF0IHJlcHJlc2VudHMgdGhlIGN1cnJlbnQgdGltZS4gTWF5IG9yIG1heSBub3RcbiAgICogaGF2ZSBhIHJlbGF0aW9uIHRvIHdhbGwtY2xvY2sgdGltZS4gTWF5IG9yIG1heSBub3QgcmVmZXIgdG8gYSB0aW1lIHVuaXRcbiAgICogKGUuZy4gbWlsbGlzZWNvbmRzKS5cbiAgICovXG4gIHB1YmxpYyBub3c6ICgpID0+IG51bWJlcjtcblxuICAvKipcbiAgICogU2NoZWR1bGVzIGEgZnVuY3Rpb24sIGB3b3JrYCwgZm9yIGV4ZWN1dGlvbi4gTWF5IGhhcHBlbiBhdCBzb21lIHBvaW50IGluXG4gICAqIHRoZSBmdXR1cmUsIGFjY29yZGluZyB0byB0aGUgYGRlbGF5YCBwYXJhbWV0ZXIsIGlmIHNwZWNpZmllZC4gTWF5IGJlIHBhc3NlZFxuICAgKiBzb21lIGNvbnRleHQgb2JqZWN0LCBgc3RhdGVgLCB3aGljaCB3aWxsIGJlIHBhc3NlZCB0byB0aGUgYHdvcmtgIGZ1bmN0aW9uLlxuICAgKlxuICAgKiBUaGUgZ2l2ZW4gYXJndW1lbnRzIHdpbGwgYmUgcHJvY2Vzc2VkIGFuIHN0b3JlZCBhcyBhbiBBY3Rpb24gb2JqZWN0IGluIGFcbiAgICogcXVldWUgb2YgYWN0aW9ucy5cbiAgICpcbiAgICogQHBhcmFtIHtmdW5jdGlvbihzdGF0ZTogP1QpOiA/U3Vic2NyaXB0aW9ufSB3b3JrIEEgZnVuY3Rpb24gcmVwcmVzZW50aW5nIGFcbiAgICogdGFzaywgb3Igc29tZSB1bml0IG9mIHdvcmsgdG8gYmUgZXhlY3V0ZWQgYnkgdGhlIFNjaGVkdWxlci5cbiAgICogQHBhcmFtIHtudW1iZXJ9IFtkZWxheV0gVGltZSB0byB3YWl0IGJlZm9yZSBleGVjdXRpbmcgdGhlIHdvcmssIHdoZXJlIHRoZVxuICAgKiB0aW1lIHVuaXQgaXMgaW1wbGljaXQgYW5kIGRlZmluZWQgYnkgdGhlIFNjaGVkdWxlciBpdHNlbGYuXG4gICAqIEBwYXJhbSB7VH0gW3N0YXRlXSBTb21lIGNvbnRleHR1YWwgZGF0YSB0aGF0IHRoZSBgd29ya2AgZnVuY3Rpb24gdXNlcyB3aGVuXG4gICAqIGNhbGxlZCBieSB0aGUgU2NoZWR1bGVyLlxuICAgKiBAcmV0dXJuIHtTdWJzY3JpcHRpb259IEEgc3Vic2NyaXB0aW9uIGluIG9yZGVyIHRvIGJlIGFibGUgdG8gdW5zdWJzY3JpYmVcbiAgICogdGhlIHNjaGVkdWxlZCB3b3JrLlxuICAgKi9cbiAgcHVibGljIHNjaGVkdWxlPFQ+KHdvcms6ICh0aGlzOiBBY3Rpb248VD4sIHN0YXRlPzogVCkgPT4gdm9pZCwgZGVsYXk6IG51bWJlciA9IDAsIHN0YXRlPzogVCk6IFN1YnNjcmlwdGlvbiB7XG4gICAgcmV0dXJuIG5ldyB0aGlzLlNjaGVkdWxlckFjdGlvbjxUPih0aGlzLCB3b3JrKS5zY2hlZHVsZShzdGF0ZSwgZGVsYXkpO1xuICB9XG59XG4iXX0=