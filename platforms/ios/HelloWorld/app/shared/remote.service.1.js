"use strict";
var core_1 = require("@angular/core");
require("rxjs/add/operator/do");
require("rxjs/add/operator/map");
var client_1 = require("nativescript-azure-mobile-apps/client");
var client = new client_1.MobileServiceClient("http://word-memory.azurewebsites.net");
var firebase = require("nativescript-plugin-firebase");
var RemoteRepositoryService = (function () {
    function RemoteRepositoryService() {
        firebase.login({ type: firebase.LoginType.ANONYMOUS })
            .then(function (x) {
            var a = x;
        }).catch(function (e) {
        });
    }
    RemoteRepositoryService.prototype.update = function (type, value) {
        firebase.update("/" + type, value).then(function (x) { });
    };
    RemoteRepositoryService.prototype.add = function (type, value) {
        firebase.push("/" + type, value);
    };
    RemoteRepositoryService.prototype.getById = function (type, id) {
        var onQueryEvent = function (result) {
            if (!result.error) {
                var returnData = new Array();
                for (var key in result.value) {
                    var valueAdd = result.value[key];
                    valueAdd.id = key;
                    returnData.push(valueAdd);
                }
                return returnData;
            }
        };
        firebase.query(onQueryEvent, "/" + type, {
            singleEvent: true,
            // order by company.country
            orderBy: {
                type: firebase.QueryOrderByType.CHILD,
                value: 'since' // mandatory when type is 'child'
            },
            range: {
                value: id,
                type: firebase.QueryRangeType.EQUAL_TO
            }
        });
    };
    RemoteRepositoryService.prototype.getAll = function (type) {
        var onQueryEvent = function (result) {
            if (!result.error) {
                var returnData = new Array();
                for (var key in result.value) {
                    var valueAdd = result.value[key];
                    valueAdd.id = key;
                    returnData.push(valueAdd);
                }
                return returnData;
            }
        };
        firebase.query(onQueryEvent, "/" + type, {
            singleEvent: true,
            // order by company.country
            orderBy: {
                type: firebase.QueryOrderByType.CHILD,
                value: 'since' // mandatory when type is 'child'
            }
        });
    };
    return RemoteRepositoryService;
}());
RemoteRepositoryService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [])
], RemoteRepositoryService);
exports.RemoteRepositoryService = RemoteRepositoryService;
var RemoteRepoType = (function () {
    function RemoteRepoType() {
    }
    return RemoteRepoType;
}());
RemoteRepoType.users = "Users";
RemoteRepoType.friend = "Friends";
RemoteRepoType.invitation = "Invitation";
RemoteRepoType.messages = "Messages";
exports.RemoteRepoType = RemoteRepoType;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVtb3RlLnNlcnZpY2UuMS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInJlbW90ZS5zZXJ2aWNlLjEudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLHNDQUEyQztBQUUzQyxnQ0FBOEI7QUFDOUIsaUNBQStCO0FBSS9CLGdFQUE0RTtBQUM1RSxJQUFJLE1BQU0sR0FBRyxJQUFJLDRCQUFtQixDQUFDLHNDQUFzQyxDQUFDLENBQUM7QUFFN0UsdURBQTBEO0FBRzFELElBQWEsdUJBQXVCO0lBRWxDO1FBRUUsUUFBUSxDQUFDLEtBQUssQ0FBQyxFQUFFLElBQUksRUFBRSxRQUFRLENBQUMsU0FBUyxDQUFDLFNBQVMsRUFBRSxDQUFDO2FBQ25ELElBQUksQ0FBQyxVQUFBLENBQUM7WUFDTCxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDWixDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsVUFBQSxDQUFDO1FBQ1YsQ0FBQyxDQUFDLENBQUM7SUFDUCxDQUFDO0lBQ0Qsd0NBQU0sR0FBTixVQUFVLElBQW9CLEVBQUUsS0FBUTtRQUN0QyxRQUFRLENBQUMsTUFBTSxDQUNiLE1BQUksSUFBTSxFQUNWLEtBQUssQ0FDTixDQUFDLElBQUksQ0FBQyxVQUFBLENBQUMsSUFBTSxDQUFDLENBQUMsQ0FBQztJQUNuQixDQUFDO0lBQ0QscUNBQUcsR0FBSCxVQUFPLElBQW9CLEVBQUUsS0FBUTtRQUNuQyxRQUFRLENBQUMsSUFBSSxDQUFDLE1BQUksSUFBTSxFQUFFLEtBQUssQ0FBQyxDQUFDO0lBQ25DLENBQUM7SUFDRCx5Q0FBTyxHQUFQLFVBQVcsSUFBb0IsRUFBRSxFQUFVO1FBQ3pDLElBQUksWUFBWSxHQUFHLFVBQVUsTUFBTTtZQUNqQyxFQUFFLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO2dCQUNsQixJQUFJLFVBQVUsR0FBRyxJQUFJLEtBQUssRUFBTyxDQUFDO2dCQUNsQyxHQUFHLENBQUMsQ0FBQyxJQUFJLEdBQUcsSUFBSSxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQztvQkFDN0IsSUFBSSxRQUFRLEdBQUcsTUFBTSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQztvQkFDakMsUUFBUSxDQUFDLEVBQUUsR0FBRyxHQUFHLENBQUM7b0JBQ2xCLFVBQVUsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUE7Z0JBQzNCLENBQUM7Z0JBQ0QsTUFBTSxDQUFDLFVBQVUsQ0FBQztZQUNwQixDQUFDO1FBQ0gsQ0FBQyxDQUFDO1FBQ0YsUUFBUSxDQUFDLEtBQUssQ0FDWixZQUFZLEVBQ1osTUFBSSxJQUFNLEVBQ1Y7WUFDRSxXQUFXLEVBQUUsSUFBSTtZQUNqQiwyQkFBMkI7WUFDM0IsT0FBTyxFQUFFO2dCQUNQLElBQUksRUFBRSxRQUFRLENBQUMsZ0JBQWdCLENBQUMsS0FBSztnQkFDckMsS0FBSyxFQUFFLE9BQU8sQ0FBQyxpQ0FBaUM7YUFDakQ7WUFDRCxLQUFLLEVBQUU7Z0JBQ0wsS0FBSyxFQUFFLEVBQUU7Z0JBQ1QsSUFBSSxFQUFFLFFBQVEsQ0FBQyxjQUFjLENBQUMsUUFBUTthQUN2QztTQUNGLENBQ0YsQ0FBQztJQUNKLENBQUM7SUFDRCx3Q0FBTSxHQUFOLFVBQVUsSUFBb0I7UUFDNUIsSUFBSSxZQUFZLEdBQUcsVUFBVSxNQUFNO1lBQ2pDLEVBQUUsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7Z0JBQ2xCLElBQUksVUFBVSxHQUFHLElBQUksS0FBSyxFQUFPLENBQUM7Z0JBQ2xDLEdBQUcsQ0FBQyxDQUFDLElBQUksR0FBRyxJQUFJLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO29CQUM3QixJQUFJLFFBQVEsR0FBRyxNQUFNLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDO29CQUNqQyxRQUFRLENBQUMsRUFBRSxHQUFHLEdBQUcsQ0FBQztvQkFDbEIsVUFBVSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQTtnQkFDM0IsQ0FBQztnQkFDRCxNQUFNLENBQUMsVUFBVSxDQUFDO1lBQ3BCLENBQUM7UUFDSCxDQUFDLENBQUM7UUFDRixRQUFRLENBQUMsS0FBSyxDQUNaLFlBQVksRUFDWixNQUFJLElBQU0sRUFDVjtZQUNFLFdBQVcsRUFBRSxJQUFJO1lBQ2pCLDJCQUEyQjtZQUMzQixPQUFPLEVBQUU7Z0JBQ1AsSUFBSSxFQUFFLFFBQVEsQ0FBQyxnQkFBZ0IsQ0FBQyxLQUFLO2dCQUNyQyxLQUFLLEVBQUUsT0FBTyxDQUFDLGlDQUFpQzthQUNqRDtTQUNGLENBQ0YsQ0FBQztJQUNKLENBQUM7SUFDSCw4QkFBQztBQUFELENBQUMsQUF6RUQsSUF5RUM7QUF6RVksdUJBQXVCO0lBRG5DLGlCQUFVLEVBQUU7O0dBQ0EsdUJBQXVCLENBeUVuQztBQXpFWSwwREFBdUI7QUE0RXBDO0lBQUE7SUFLQSxDQUFDO0lBQUQscUJBQUM7QUFBRCxDQUFDLEFBTEQ7QUFDUyxvQkFBSyxHQUFHLE9BQU8sQ0FBQztBQUNoQixxQkFBTSxHQUFHLFNBQVMsQ0FBQztBQUNuQix5QkFBVSxHQUFHLFlBQVksQ0FBQztBQUMxQix1QkFBUSxHQUFHLFVBQVUsQ0FBQztBQUpsQix3Q0FBYyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSB9IGZyb20gJ3J4anMvT2JzZXJ2YWJsZSc7XG5pbXBvcnQgXCJyeGpzL2FkZC9vcGVyYXRvci9kb1wiO1xuaW1wb3J0IFwicnhqcy9hZGQvb3BlcmF0b3IvbWFwXCI7XG5pbXBvcnQgeyBPYnNlcnZlciB9IGZyb20gJ3J4anMvc3JjL09ic2VydmVyJztcbmltcG9ydCAqIGFzIFJ4IGZyb20gJ3J4anMvUngnO1xuXG5pbXBvcnQgeyBNb2JpbGVTZXJ2aWNlQ2xpZW50IH0gZnJvbSBcIm5hdGl2ZXNjcmlwdC1henVyZS1tb2JpbGUtYXBwcy9jbGllbnRcIjtcbnZhciBjbGllbnQgPSBuZXcgTW9iaWxlU2VydmljZUNsaWVudChcImh0dHA6Ly93b3JkLW1lbW9yeS5henVyZXdlYnNpdGVzLm5ldFwiKTtcblxuaW1wb3J0IGZpcmViYXNlID0gcmVxdWlyZShcIm5hdGl2ZXNjcmlwdC1wbHVnaW4tZmlyZWJhc2VcIik7XG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBSZW1vdGVSZXBvc2l0b3J5U2VydmljZSB7XG5cbiAgY29uc3RydWN0b3IoKSB7XG5cbiAgICBmaXJlYmFzZS5sb2dpbih7IHR5cGU6IGZpcmViYXNlLkxvZ2luVHlwZS5BTk9OWU1PVVMgfSlcbiAgICAgIC50aGVuKHggPT4ge1xuICAgICAgICB2YXIgYSA9IHg7XG4gICAgICB9KS5jYXRjaChlID0+IHtcbiAgICAgIH0pO1xuICB9XG4gIHVwZGF0ZTxUPih0eXBlOiBSZW1vdGVSZXBvVHlwZSwgdmFsdWU6IFQpIHtcbiAgICBmaXJlYmFzZS51cGRhdGUoXG4gICAgICBgLyR7dHlwZX1gLFxuICAgICAgdmFsdWVcbiAgICApLnRoZW4oeCA9PiB7IH0pO1xuICB9XG4gIGFkZDxUPih0eXBlOiBSZW1vdGVSZXBvVHlwZSwgdmFsdWU6IFQpIHtcbiAgICBmaXJlYmFzZS5wdXNoKGAvJHt0eXBlfWAsIHZhbHVlKTtcbiAgfVxuICBnZXRCeUlkPFQ+KHR5cGU6IFJlbW90ZVJlcG9UeXBlLCBpZDogc3RyaW5nKSB7XG4gICAgdmFyIG9uUXVlcnlFdmVudCA9IGZ1bmN0aW9uIChyZXN1bHQpIHtcbiAgICAgIGlmICghcmVzdWx0LmVycm9yKSB7XG4gICAgICAgIHZhciByZXR1cm5EYXRhID0gbmV3IEFycmF5PGFueT4oKTtcbiAgICAgICAgZm9yICh2YXIga2V5IGluIHJlc3VsdC52YWx1ZSkge1xuICAgICAgICAgIHZhciB2YWx1ZUFkZCA9IHJlc3VsdC52YWx1ZVtrZXldO1xuICAgICAgICAgIHZhbHVlQWRkLmlkID0ga2V5O1xuICAgICAgICAgIHJldHVybkRhdGEucHVzaCh2YWx1ZUFkZClcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gcmV0dXJuRGF0YTtcbiAgICAgIH1cbiAgICB9O1xuICAgIGZpcmViYXNlLnF1ZXJ5KFxuICAgICAgb25RdWVyeUV2ZW50LFxuICAgICAgYC8ke3R5cGV9YCxcbiAgICAgIHtcbiAgICAgICAgc2luZ2xlRXZlbnQ6IHRydWUsXG4gICAgICAgIC8vIG9yZGVyIGJ5IGNvbXBhbnkuY291bnRyeVxuICAgICAgICBvcmRlckJ5OiB7XG4gICAgICAgICAgdHlwZTogZmlyZWJhc2UuUXVlcnlPcmRlckJ5VHlwZS5DSElMRCxcbiAgICAgICAgICB2YWx1ZTogJ3NpbmNlJyAvLyBtYW5kYXRvcnkgd2hlbiB0eXBlIGlzICdjaGlsZCdcbiAgICAgICAgfSxcbiAgICAgICAgcmFuZ2U6IHtcbiAgICAgICAgICB2YWx1ZTogaWQsXG4gICAgICAgICAgdHlwZTogZmlyZWJhc2UuUXVlcnlSYW5nZVR5cGUuRVFVQUxfVE9cbiAgICAgICAgfVxuICAgICAgfVxuICAgICk7XG4gIH1cbiAgZ2V0QWxsPFQ+KHR5cGU6IFJlbW90ZVJlcG9UeXBlKSB7XG4gICAgdmFyIG9uUXVlcnlFdmVudCA9IGZ1bmN0aW9uIChyZXN1bHQpIHtcbiAgICAgIGlmICghcmVzdWx0LmVycm9yKSB7XG4gICAgICAgIHZhciByZXR1cm5EYXRhID0gbmV3IEFycmF5PGFueT4oKTtcbiAgICAgICAgZm9yICh2YXIga2V5IGluIHJlc3VsdC52YWx1ZSkge1xuICAgICAgICAgIHZhciB2YWx1ZUFkZCA9IHJlc3VsdC52YWx1ZVtrZXldO1xuICAgICAgICAgIHZhbHVlQWRkLmlkID0ga2V5O1xuICAgICAgICAgIHJldHVybkRhdGEucHVzaCh2YWx1ZUFkZClcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gcmV0dXJuRGF0YTtcbiAgICAgIH1cbiAgICB9O1xuICAgIGZpcmViYXNlLnF1ZXJ5KFxuICAgICAgb25RdWVyeUV2ZW50LFxuICAgICAgYC8ke3R5cGV9YCxcbiAgICAgIHtcbiAgICAgICAgc2luZ2xlRXZlbnQ6IHRydWUsXG4gICAgICAgIC8vIG9yZGVyIGJ5IGNvbXBhbnkuY291bnRyeVxuICAgICAgICBvcmRlckJ5OiB7XG4gICAgICAgICAgdHlwZTogZmlyZWJhc2UuUXVlcnlPcmRlckJ5VHlwZS5DSElMRCxcbiAgICAgICAgICB2YWx1ZTogJ3NpbmNlJyAvLyBtYW5kYXRvcnkgd2hlbiB0eXBlIGlzICdjaGlsZCdcbiAgICAgICAgfVxuICAgICAgfVxuICAgICk7XG4gIH1cbn1cblxuXG5leHBvcnQgY2xhc3MgUmVtb3RlUmVwb1R5cGUge1xuICBzdGF0aWMgdXNlcnMgPSBcIlVzZXJzXCI7XG4gIHN0YXRpYyBmcmllbmQgPSBcIkZyaWVuZHNcIjtcbiAgc3RhdGljIGludml0YXRpb24gPSBcIkludml0YXRpb25cIjtcbiAgc3RhdGljIG1lc3NhZ2VzID0gXCJNZXNzYWdlc1wiO1xufSJdfQ==