"use strict";
var core_1 = require("@angular/core");
var http_1 = require("@angular/http");
var Rx_1 = require("rxjs/Rx");
require("rxjs/add/operator/do");
require("rxjs/add/operator/map");
var FriendsService = (function () {
    function FriendsService(http) {
        this.http = http;
    }
    FriendsService.prototype.getFriendsByGroup = function (id) {
        return Rx_1.Observable.of(mockListFriend);
    };
    FriendsService.prototype.getAllFriends = function () {
        return Rx_1.Observable.of(mockListFriend);
    };
    FriendsService.prototype.handleErrors = function (error) {
        console.log(JSON.stringify(error.json()));
        return Rx_1.Observable.throw(error);
    };
    return FriendsService;
}());
FriendsService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [http_1.Http])
], FriendsService);
exports.FriendsService = FriendsService;
var mockListFriend = new Array();
mockListFriend.push({
    id: 1,
    email: "primero@gmail.com",
    name: "Nombre 1",
    lastName: "Apellido 1",
    groupId: 1
});
mockListFriend.push({
    id: 2,
    email: "segundo@gmail.com",
    name: "Nombre 2",
    lastName: "Apellido 1",
    groupId: 1
});
mockListFriend.push({
    id: 3,
    email: "tercero@gmail.com",
    name: "Nombre 3",
    lastName: "Apellido 1",
    groupId: 1
});
mockListFriend.push({
    id: 4,
    email: "cuarto@gmail.com",
    name: "Nombre 4",
    lastName: "Apellido 1",
    groupId: 1
});
mockListFriend.push({
    id: 5,
    email: "quinto@gmail.com",
    name: "Nombre 5",
    lastName: "Apellido 1",
    groupId: 1
});
mockListFriend.push({
    id: 6,
    email: "sexto@gmail.com",
    name: "Nombre 6",
    lastName: "Apellido 1",
    groupId: 1
});
mockListFriend.push({
    id: 7,
    email: "septimo@gmail.com",
    name: "Nombre 7",
    lastName: "Apellido 1",
    groupId: 1
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZnJpZW5kcy5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiZnJpZW5kcy5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxzQ0FBMkM7QUFDM0Msc0NBQXdEO0FBQ3hELDhCQUFxQztBQUNyQyxnQ0FBOEI7QUFDOUIsaUNBQStCO0FBTS9CLElBQWEsY0FBYztJQUN6Qix3QkFBb0IsSUFBVTtRQUFWLFNBQUksR0FBSixJQUFJLENBQU07SUFBSSxDQUFDO0lBRW5DLDBDQUFpQixHQUFqQixVQUFrQixFQUFVO1FBQzFCLE1BQU0sQ0FBQyxlQUFVLENBQUMsRUFBRSxDQUFXLGNBQWMsQ0FBQyxDQUFDO0lBQ2pELENBQUM7SUFFRCxzQ0FBYSxHQUFiO1FBQ0UsTUFBTSxDQUFDLGVBQVUsQ0FBQyxFQUFFLENBQVcsY0FBYyxDQUFDLENBQUM7SUFDakQsQ0FBQztJQUdELHFDQUFZLEdBQVosVUFBYSxLQUFlO1FBQzFCLE9BQU8sQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUMsSUFBSSxFQUFFLENBQUMsQ0FBQyxDQUFDO1FBQzFDLE1BQU0sQ0FBQyxlQUFVLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQ2pDLENBQUM7SUFDSCxxQkFBQztBQUFELENBQUMsQUFoQkQsSUFnQkM7QUFoQlksY0FBYztJQUQxQixpQkFBVSxFQUFFO3FDQUVlLFdBQUk7R0FEbkIsY0FBYyxDQWdCMUI7QUFoQlksd0NBQWM7QUFtQjNCLElBQUksY0FBYyxHQUFHLElBQUksS0FBSyxFQUFVLENBQUM7QUFFekMsY0FBYyxDQUFDLElBQUksQ0FBUztJQUMxQixFQUFFLEVBQUUsQ0FBQztJQUNMLEtBQUssRUFBRSxtQkFBbUI7SUFDMUIsSUFBSSxFQUFFLFVBQVU7SUFDaEIsUUFBUSxFQUFFLFlBQVk7SUFDdEIsT0FBTyxFQUFFLENBQUM7Q0FDWCxDQUFDLENBQUE7QUFDRixjQUFjLENBQUMsSUFBSSxDQUFTO0lBQzFCLEVBQUUsRUFBRSxDQUFDO0lBQ0wsS0FBSyxFQUFFLG1CQUFtQjtJQUMxQixJQUFJLEVBQUUsVUFBVTtJQUNoQixRQUFRLEVBQUUsWUFBWTtJQUN0QixPQUFPLEVBQUUsQ0FBQztDQUNYLENBQUMsQ0FBQTtBQUNGLGNBQWMsQ0FBQyxJQUFJLENBQVM7SUFDMUIsRUFBRSxFQUFFLENBQUM7SUFDTCxLQUFLLEVBQUUsbUJBQW1CO0lBQzFCLElBQUksRUFBRSxVQUFVO0lBQ2hCLFFBQVEsRUFBRSxZQUFZO0lBQ3RCLE9BQU8sRUFBRSxDQUFDO0NBQ1gsQ0FBQyxDQUFBO0FBQ0YsY0FBYyxDQUFDLElBQUksQ0FBUztJQUMxQixFQUFFLEVBQUUsQ0FBQztJQUNMLEtBQUssRUFBRSxrQkFBa0I7SUFDekIsSUFBSSxFQUFFLFVBQVU7SUFDaEIsUUFBUSxFQUFFLFlBQVk7SUFDdEIsT0FBTyxFQUFFLENBQUM7Q0FDWCxDQUFDLENBQUE7QUFDRixjQUFjLENBQUMsSUFBSSxDQUFTO0lBQzFCLEVBQUUsRUFBRSxDQUFDO0lBQ0wsS0FBSyxFQUFFLGtCQUFrQjtJQUN6QixJQUFJLEVBQUUsVUFBVTtJQUNoQixRQUFRLEVBQUUsWUFBWTtJQUN0QixPQUFPLEVBQUUsQ0FBQztDQUNYLENBQUMsQ0FBQTtBQUNGLGNBQWMsQ0FBQyxJQUFJLENBQVM7SUFDMUIsRUFBRSxFQUFFLENBQUM7SUFDTCxLQUFLLEVBQUUsaUJBQWlCO0lBQ3hCLElBQUksRUFBRSxVQUFVO0lBQ2hCLFFBQVEsRUFBRSxZQUFZO0lBQ3RCLE9BQU8sRUFBRSxDQUFDO0NBQ1gsQ0FBQyxDQUFBO0FBQ0YsY0FBYyxDQUFDLElBQUksQ0FBUztJQUMxQixFQUFFLEVBQUUsQ0FBQztJQUNMLEtBQUssRUFBRSxtQkFBbUI7SUFDMUIsSUFBSSxFQUFFLFVBQVU7SUFDaEIsUUFBUSxFQUFFLFlBQVk7SUFDdEIsT0FBTyxFQUFFLENBQUM7Q0FDWCxDQUFDLENBQUEiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcbmltcG9ydCB7IEh0dHAsIEhlYWRlcnMsIFJlc3BvbnNlIH0gZnJvbSBcIkBhbmd1bGFyL2h0dHBcIjtcbmltcG9ydCB7IE9ic2VydmFibGUgfSBmcm9tIFwicnhqcy9SeFwiO1xuaW1wb3J0IFwicnhqcy9hZGQvb3BlcmF0b3IvZG9cIjtcbmltcG9ydCBcInJ4anMvYWRkL29wZXJhdG9yL21hcFwiO1xuXG5pbXBvcnQgeyBGcmllbmQgfSBmcm9tIFwiLi9mcmllbmRcIjtcbmltcG9ydCB7IENvbmZpZyB9IGZyb20gXCIuLi9jb25maWdcIjtcblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIEZyaWVuZHNTZXJ2aWNlIHtcbiAgY29uc3RydWN0b3IocHJpdmF0ZSBodHRwOiBIdHRwKSB7IH1cblxuICBnZXRGcmllbmRzQnlHcm91cChpZDogbnVtYmVyKTogT2JzZXJ2YWJsZTxBcnJheTxGcmllbmQ+PiB7XG4gICAgcmV0dXJuIE9ic2VydmFibGUub2Y8RnJpZW5kW10+KG1vY2tMaXN0RnJpZW5kKTtcbiAgfVxuXG4gIGdldEFsbEZyaWVuZHMoKTogT2JzZXJ2YWJsZTxBcnJheTxGcmllbmQ+PiB7XG4gICAgcmV0dXJuIE9ic2VydmFibGUub2Y8RnJpZW5kW10+KG1vY2tMaXN0RnJpZW5kKTtcbiAgfVxuXG5cbiAgaGFuZGxlRXJyb3JzKGVycm9yOiBSZXNwb25zZSkge1xuICAgIGNvbnNvbGUubG9nKEpTT04uc3RyaW5naWZ5KGVycm9yLmpzb24oKSkpO1xuICAgIHJldHVybiBPYnNlcnZhYmxlLnRocm93KGVycm9yKTtcbiAgfVxufVxuXG5cbnZhciBtb2NrTGlzdEZyaWVuZCA9IG5ldyBBcnJheTxGcmllbmQ+KCk7XG5cbm1vY2tMaXN0RnJpZW5kLnB1c2goPEZyaWVuZD57XG4gIGlkOiAxLFxuICBlbWFpbDogXCJwcmltZXJvQGdtYWlsLmNvbVwiLFxuICBuYW1lOiBcIk5vbWJyZSAxXCIsXG4gIGxhc3ROYW1lOiBcIkFwZWxsaWRvIDFcIixcbiAgZ3JvdXBJZDogMVxufSlcbm1vY2tMaXN0RnJpZW5kLnB1c2goPEZyaWVuZD57XG4gIGlkOiAyLFxuICBlbWFpbDogXCJzZWd1bmRvQGdtYWlsLmNvbVwiLFxuICBuYW1lOiBcIk5vbWJyZSAyXCIsXG4gIGxhc3ROYW1lOiBcIkFwZWxsaWRvIDFcIixcbiAgZ3JvdXBJZDogMVxufSlcbm1vY2tMaXN0RnJpZW5kLnB1c2goPEZyaWVuZD57XG4gIGlkOiAzLFxuICBlbWFpbDogXCJ0ZXJjZXJvQGdtYWlsLmNvbVwiLFxuICBuYW1lOiBcIk5vbWJyZSAzXCIsXG4gIGxhc3ROYW1lOiBcIkFwZWxsaWRvIDFcIixcbiAgZ3JvdXBJZDogMVxufSlcbm1vY2tMaXN0RnJpZW5kLnB1c2goPEZyaWVuZD57XG4gIGlkOiA0LFxuICBlbWFpbDogXCJjdWFydG9AZ21haWwuY29tXCIsXG4gIG5hbWU6IFwiTm9tYnJlIDRcIixcbiAgbGFzdE5hbWU6IFwiQXBlbGxpZG8gMVwiLFxuICBncm91cElkOiAxXG59KVxubW9ja0xpc3RGcmllbmQucHVzaCg8RnJpZW5kPntcbiAgaWQ6IDUsXG4gIGVtYWlsOiBcInF1aW50b0BnbWFpbC5jb21cIixcbiAgbmFtZTogXCJOb21icmUgNVwiLFxuICBsYXN0TmFtZTogXCJBcGVsbGlkbyAxXCIsXG4gIGdyb3VwSWQ6IDFcbn0pXG5tb2NrTGlzdEZyaWVuZC5wdXNoKDxGcmllbmQ+e1xuICBpZDogNixcbiAgZW1haWw6IFwic2V4dG9AZ21haWwuY29tXCIsXG4gIG5hbWU6IFwiTm9tYnJlIDZcIixcbiAgbGFzdE5hbWU6IFwiQXBlbGxpZG8gMVwiLFxuICBncm91cElkOiAxXG59KVxubW9ja0xpc3RGcmllbmQucHVzaCg8RnJpZW5kPntcbiAgaWQ6IDcsXG4gIGVtYWlsOiBcInNlcHRpbW9AZ21haWwuY29tXCIsXG4gIG5hbWU6IFwiTm9tYnJlIDdcIixcbiAgbGFzdE5hbWU6IFwiQXBlbGxpZG8gMVwiLFxuICBncm91cElkOiAxXG59KSJdfQ==