"use strict";
var errorObject_1 = require("./errorObject");
var tryCatchTarget;
function tryCatcher() {
    try {
        return tryCatchTarget.apply(this, arguments);
    }
    catch (e) {
        errorObject_1.errorObject.e = e;
        return errorObject_1.errorObject;
    }
}
function tryCatch(fn) {
    tryCatchTarget = fn;
    return tryCatcher;
}
exports.tryCatch = tryCatch;
;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHJ5Q2F0Y2guanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJ0cnlDYXRjaC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsNkNBQTRDO0FBRTVDLElBQUksY0FBd0IsQ0FBQztBQUU3QjtJQUNFLElBQUksQ0FBQztRQUNILE1BQU0sQ0FBQyxjQUFjLENBQUMsS0FBSyxDQUFDLElBQUksRUFBRSxTQUFTLENBQUMsQ0FBQztJQUMvQyxDQUFDO0lBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUNYLHlCQUFXLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUNsQixNQUFNLENBQUMseUJBQVcsQ0FBQztJQUNyQixDQUFDO0FBQ0gsQ0FBQztBQUVELGtCQUE2QyxFQUFLO0lBQ2hELGNBQWMsR0FBRyxFQUFFLENBQUM7SUFDcEIsTUFBTSxDQUFNLFVBQVUsQ0FBQztBQUN6QixDQUFDO0FBSEQsNEJBR0M7QUFBQSxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgZXJyb3JPYmplY3QgfSBmcm9tICcuL2Vycm9yT2JqZWN0JztcblxubGV0IHRyeUNhdGNoVGFyZ2V0OiBGdW5jdGlvbjtcblxuZnVuY3Rpb24gdHJ5Q2F0Y2hlcih0aGlzOiBhbnkpOiBhbnkge1xuICB0cnkge1xuICAgIHJldHVybiB0cnlDYXRjaFRhcmdldC5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuICB9IGNhdGNoIChlKSB7XG4gICAgZXJyb3JPYmplY3QuZSA9IGU7XG4gICAgcmV0dXJuIGVycm9yT2JqZWN0O1xuICB9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiB0cnlDYXRjaDxUIGV4dGVuZHMgRnVuY3Rpb24+KGZuOiBUKTogVCB7XG4gIHRyeUNhdGNoVGFyZ2V0ID0gZm47XG4gIHJldHVybiA8YW55PnRyeUNhdGNoZXI7XG59O1xuIl19