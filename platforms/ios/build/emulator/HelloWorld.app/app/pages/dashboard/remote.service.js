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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVtb3RlLnNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJyZW1vdGUuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsc0NBQTJDO0FBRTNDLGdDQUE4QjtBQUM5QixpQ0FBK0I7QUFJL0IsZ0VBQTRFO0FBQzVFLElBQUksTUFBTSxHQUFHLElBQUksNEJBQW1CLENBQUMsc0NBQXNDLENBQUMsQ0FBQztBQUU3RSx1REFBMEQ7QUFHMUQsSUFBYSx1QkFBdUI7SUFFbEM7UUFFRSxRQUFRLENBQUMsS0FBSyxDQUFDLEVBQUUsSUFBSSxFQUFFLFFBQVEsQ0FBQyxTQUFTLENBQUMsU0FBUyxFQUFFLENBQUM7YUFDbkQsSUFBSSxDQUFDLFVBQUEsQ0FBQztZQUNMLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUNaLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxVQUFBLENBQUM7UUFDVixDQUFDLENBQUMsQ0FBQztJQUNQLENBQUM7SUFDRCx3Q0FBTSxHQUFOLFVBQVUsSUFBb0IsRUFBRSxLQUFRO1FBQ3RDLFFBQVEsQ0FBQyxNQUFNLENBQ2IsTUFBSSxJQUFNLEVBQ1YsS0FBSyxDQUNOLENBQUMsSUFBSSxDQUFDLFVBQUEsQ0FBQyxJQUFNLENBQUMsQ0FBQyxDQUFDO0lBQ25CLENBQUM7SUFDRCxxQ0FBRyxHQUFILFVBQU8sSUFBb0IsRUFBRSxLQUFRO1FBQ25DLFFBQVEsQ0FBQyxJQUFJLENBQUMsTUFBSSxJQUFNLEVBQUUsS0FBSyxDQUFDLENBQUM7SUFDbkMsQ0FBQztJQUNELHlDQUFPLEdBQVAsVUFBVyxJQUFvQixFQUFFLEVBQVU7UUFDekMsSUFBSSxZQUFZLEdBQUcsVUFBVSxNQUFNO1lBQ2pDLEVBQUUsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7Z0JBQ2xCLElBQUksVUFBVSxHQUFHLElBQUksS0FBSyxFQUFPLENBQUM7Z0JBQ2xDLEdBQUcsQ0FBQyxDQUFDLElBQUksR0FBRyxJQUFJLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO29CQUM3QixJQUFJLFFBQVEsR0FBRyxNQUFNLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDO29CQUNqQyxRQUFRLENBQUMsRUFBRSxHQUFHLEdBQUcsQ0FBQztvQkFDbEIsVUFBVSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQTtnQkFDM0IsQ0FBQztnQkFDRCxNQUFNLENBQUMsVUFBVSxDQUFDO1lBQ3BCLENBQUM7UUFDSCxDQUFDLENBQUM7UUFDRixRQUFRLENBQUMsS0FBSyxDQUNaLFlBQVksRUFDWixNQUFJLElBQU0sRUFDVjtZQUNFLFdBQVcsRUFBRSxJQUFJO1lBQ2pCLDJCQUEyQjtZQUMzQixPQUFPLEVBQUU7Z0JBQ1AsSUFBSSxFQUFFLFFBQVEsQ0FBQyxnQkFBZ0IsQ0FBQyxLQUFLO2dCQUNyQyxLQUFLLEVBQUUsT0FBTyxDQUFDLGlDQUFpQzthQUNqRDtZQUNELEtBQUssRUFBRTtnQkFDTCxLQUFLLEVBQUUsRUFBRTtnQkFDVCxJQUFJLEVBQUUsUUFBUSxDQUFDLGNBQWMsQ0FBQyxRQUFRO2FBQ3ZDO1NBQ0YsQ0FDRixDQUFDO0lBQ0osQ0FBQztJQUNELHdDQUFNLEdBQU4sVUFBVSxJQUFvQjtRQUM1QixJQUFJLFlBQVksR0FBRyxVQUFVLE1BQU07WUFDakMsRUFBRSxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQztnQkFDbEIsSUFBSSxVQUFVLEdBQUcsSUFBSSxLQUFLLEVBQU8sQ0FBQztnQkFDbEMsR0FBRyxDQUFDLENBQUMsSUFBSSxHQUFHLElBQUksTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7b0JBQzdCLElBQUksUUFBUSxHQUFHLE1BQU0sQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUM7b0JBQ2pDLFFBQVEsQ0FBQyxFQUFFLEdBQUcsR0FBRyxDQUFDO29CQUNsQixVQUFVLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFBO2dCQUMzQixDQUFDO2dCQUNELE1BQU0sQ0FBQyxVQUFVLENBQUM7WUFDcEIsQ0FBQztRQUNILENBQUMsQ0FBQztRQUNGLFFBQVEsQ0FBQyxLQUFLLENBQ1osWUFBWSxFQUNaLE1BQUksSUFBTSxFQUNWO1lBQ0UsV0FBVyxFQUFFLElBQUk7WUFDakIsMkJBQTJCO1lBQzNCLE9BQU8sRUFBRTtnQkFDUCxJQUFJLEVBQUUsUUFBUSxDQUFDLGdCQUFnQixDQUFDLEtBQUs7Z0JBQ3JDLEtBQUssRUFBRSxPQUFPLENBQUMsaUNBQWlDO2FBQ2pEO1NBQ0YsQ0FDRixDQUFDO0lBQ0osQ0FBQztJQUNILDhCQUFDO0FBQUQsQ0FBQyxBQXpFRCxJQXlFQztBQXpFWSx1QkFBdUI7SUFEbkMsaUJBQVUsRUFBRTs7R0FDQSx1QkFBdUIsQ0F5RW5DO0FBekVZLDBEQUF1QjtBQTRFcEM7SUFBQTtJQUtBLENBQUM7SUFBRCxxQkFBQztBQUFELENBQUMsQUFMRDtBQUNTLG9CQUFLLEdBQUcsT0FBTyxDQUFDO0FBQ2hCLHFCQUFNLEdBQUcsU0FBUyxDQUFDO0FBQ25CLHlCQUFVLEdBQUcsWUFBWSxDQUFDO0FBQzFCLHVCQUFRLEdBQUcsVUFBVSxDQUFDO0FBSmxCLHdDQUFjIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XG5pbXBvcnQgeyBPYnNlcnZhYmxlIH0gZnJvbSAncnhqcy9PYnNlcnZhYmxlJztcbmltcG9ydCBcInJ4anMvYWRkL29wZXJhdG9yL2RvXCI7XG5pbXBvcnQgXCJyeGpzL2FkZC9vcGVyYXRvci9tYXBcIjtcbmltcG9ydCB7IE9ic2VydmVyIH0gZnJvbSAncnhqcy9zcmMvT2JzZXJ2ZXInO1xuaW1wb3J0ICogYXMgUnggZnJvbSAncnhqcy9SeCc7XG5cbmltcG9ydCB7IE1vYmlsZVNlcnZpY2VDbGllbnQgfSBmcm9tIFwibmF0aXZlc2NyaXB0LWF6dXJlLW1vYmlsZS1hcHBzL2NsaWVudFwiO1xudmFyIGNsaWVudCA9IG5ldyBNb2JpbGVTZXJ2aWNlQ2xpZW50KFwiaHR0cDovL3dvcmQtbWVtb3J5LmF6dXJld2Vic2l0ZXMubmV0XCIpO1xuXG5pbXBvcnQgZmlyZWJhc2UgPSByZXF1aXJlKFwibmF0aXZlc2NyaXB0LXBsdWdpbi1maXJlYmFzZVwiKTtcblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIFJlbW90ZVJlcG9zaXRvcnlTZXJ2aWNlIHtcblxuICBjb25zdHJ1Y3RvcigpIHtcblxuICAgIGZpcmViYXNlLmxvZ2luKHsgdHlwZTogZmlyZWJhc2UuTG9naW5UeXBlLkFOT05ZTU9VUyB9KVxuICAgICAgLnRoZW4oeCA9PiB7XG4gICAgICAgIHZhciBhID0geDtcbiAgICAgIH0pLmNhdGNoKGUgPT4ge1xuICAgICAgfSk7XG4gIH1cbiAgdXBkYXRlPFQ+KHR5cGU6IFJlbW90ZVJlcG9UeXBlLCB2YWx1ZTogVCkge1xuICAgIGZpcmViYXNlLnVwZGF0ZShcbiAgICAgIGAvJHt0eXBlfWAsXG4gICAgICB2YWx1ZVxuICAgICkudGhlbih4ID0+IHsgfSk7XG4gIH1cbiAgYWRkPFQ+KHR5cGU6IFJlbW90ZVJlcG9UeXBlLCB2YWx1ZTogVCkge1xuICAgIGZpcmViYXNlLnB1c2goYC8ke3R5cGV9YCwgdmFsdWUpO1xuICB9XG4gIGdldEJ5SWQ8VD4odHlwZTogUmVtb3RlUmVwb1R5cGUsIGlkOiBzdHJpbmcpIHtcbiAgICB2YXIgb25RdWVyeUV2ZW50ID0gZnVuY3Rpb24gKHJlc3VsdCkge1xuICAgICAgaWYgKCFyZXN1bHQuZXJyb3IpIHtcbiAgICAgICAgdmFyIHJldHVybkRhdGEgPSBuZXcgQXJyYXk8YW55PigpO1xuICAgICAgICBmb3IgKHZhciBrZXkgaW4gcmVzdWx0LnZhbHVlKSB7XG4gICAgICAgICAgdmFyIHZhbHVlQWRkID0gcmVzdWx0LnZhbHVlW2tleV07XG4gICAgICAgICAgdmFsdWVBZGQuaWQgPSBrZXk7XG4gICAgICAgICAgcmV0dXJuRGF0YS5wdXNoKHZhbHVlQWRkKVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiByZXR1cm5EYXRhO1xuICAgICAgfVxuICAgIH07XG4gICAgZmlyZWJhc2UucXVlcnkoXG4gICAgICBvblF1ZXJ5RXZlbnQsXG4gICAgICBgLyR7dHlwZX1gLFxuICAgICAge1xuICAgICAgICBzaW5nbGVFdmVudDogdHJ1ZSxcbiAgICAgICAgLy8gb3JkZXIgYnkgY29tcGFueS5jb3VudHJ5XG4gICAgICAgIG9yZGVyQnk6IHtcbiAgICAgICAgICB0eXBlOiBmaXJlYmFzZS5RdWVyeU9yZGVyQnlUeXBlLkNISUxELFxuICAgICAgICAgIHZhbHVlOiAnc2luY2UnIC8vIG1hbmRhdG9yeSB3aGVuIHR5cGUgaXMgJ2NoaWxkJ1xuICAgICAgICB9LFxuICAgICAgICByYW5nZToge1xuICAgICAgICAgIHZhbHVlOiBpZCxcbiAgICAgICAgICB0eXBlOiBmaXJlYmFzZS5RdWVyeVJhbmdlVHlwZS5FUVVBTF9UT1xuICAgICAgICB9XG4gICAgICB9XG4gICAgKTtcbiAgfVxuICBnZXRBbGw8VD4odHlwZTogUmVtb3RlUmVwb1R5cGUpIHtcbiAgICB2YXIgb25RdWVyeUV2ZW50ID0gZnVuY3Rpb24gKHJlc3VsdCkge1xuICAgICAgaWYgKCFyZXN1bHQuZXJyb3IpIHtcbiAgICAgICAgdmFyIHJldHVybkRhdGEgPSBuZXcgQXJyYXk8YW55PigpO1xuICAgICAgICBmb3IgKHZhciBrZXkgaW4gcmVzdWx0LnZhbHVlKSB7XG4gICAgICAgICAgdmFyIHZhbHVlQWRkID0gcmVzdWx0LnZhbHVlW2tleV07XG4gICAgICAgICAgdmFsdWVBZGQuaWQgPSBrZXk7XG4gICAgICAgICAgcmV0dXJuRGF0YS5wdXNoKHZhbHVlQWRkKVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiByZXR1cm5EYXRhO1xuICAgICAgfVxuICAgIH07XG4gICAgZmlyZWJhc2UucXVlcnkoXG4gICAgICBvblF1ZXJ5RXZlbnQsXG4gICAgICBgLyR7dHlwZX1gLFxuICAgICAge1xuICAgICAgICBzaW5nbGVFdmVudDogdHJ1ZSxcbiAgICAgICAgLy8gb3JkZXIgYnkgY29tcGFueS5jb3VudHJ5XG4gICAgICAgIG9yZGVyQnk6IHtcbiAgICAgICAgICB0eXBlOiBmaXJlYmFzZS5RdWVyeU9yZGVyQnlUeXBlLkNISUxELFxuICAgICAgICAgIHZhbHVlOiAnc2luY2UnIC8vIG1hbmRhdG9yeSB3aGVuIHR5cGUgaXMgJ2NoaWxkJ1xuICAgICAgICB9XG4gICAgICB9XG4gICAgKTtcbiAgfVxufVxuXG5cbmV4cG9ydCBjbGFzcyBSZW1vdGVSZXBvVHlwZSB7XG4gIHN0YXRpYyB1c2VycyA9IFwiVXNlcnNcIjtcbiAgc3RhdGljIGZyaWVuZCA9IFwiRnJpZW5kc1wiO1xuICBzdGF0aWMgaW52aXRhdGlvbiA9IFwiSW52aXRhdGlvblwiO1xuICBzdGF0aWMgbWVzc2FnZXMgPSBcIk1lc3NhZ2VzXCI7XG59Il19