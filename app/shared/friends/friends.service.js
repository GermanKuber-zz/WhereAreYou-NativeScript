"use strict";
var core_1 = require("@angular/core");
var Rx_1 = require("rxjs/Rx");
require("rxjs/add/operator/do");
require("rxjs/add/operator/map");
var FriendsService = (function () {
    function FriendsService() {
    }
    FriendsService.prototype.getFriendsByGroup = function (id) {
        return Rx_1.Observable.of(mockListFriend);
    };
    FriendsService.prototype.getAllFriends = function () {
        return Rx_1.Observable.of(mockListFriend);
    };
    FriendsService.prototype.getFriendById = function (id) {
        for (var _i = 0, mockListFriend_1 = mockListFriend; _i < mockListFriend_1.length; _i++) {
            var friend = mockListFriend_1[_i];
            if (friend.id == id)
                return friend;
        }
    };
    FriendsService.prototype.handleErrors = function (error) {
        console.log(JSON.stringify(error.json()));
        return Rx_1.Observable.throw(error);
    };
    return FriendsService;
}());
FriendsService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [])
], FriendsService);
exports.FriendsService = FriendsService;
var mockListFriend = new Array();
mockListFriend.push({
    id: 1,
    email: "primero@gmail.com",
    name: "Nombre 1",
    lastName: "Apellido 1",
    displayName: "Display Name 1",
    groupId: 1
});
mockListFriend.push({
    id: 2,
    email: "segundo@gmail.com",
    name: "Nombre 2",
    lastName: "Apellido 1",
    displayName: "Display Name 2",
    groupId: 1
});
mockListFriend.push({
    id: 3,
    email: "tercero@gmail.com",
    name: "Nombre 3",
    lastName: "Apellido 1",
    displayName: "Display Name 3",
    groupId: 1
});
mockListFriend.push({
    id: 4,
    email: "cuarto@gmail.com",
    name: "Nombre 4",
    lastName: "Apellido 1",
    displayName: "Display Name 4",
    groupId: 1
});
mockListFriend.push({
    id: 5,
    email: "quinto@gmail.com",
    name: "Nombre 5",
    lastName: "Apellido 1",
    displayName: "Display Name 5",
    groupId: 1
});
mockListFriend.push({
    id: 6,
    email: "sexto@gmail.com",
    name: "Nombre 6",
    lastName: "Apellido 1",
    displayName: "Display Name 6",
    groupId: 1
});
mockListFriend.push({
    id: 7,
    email: "septimo@gmail.com",
    name: "Nombre 7",
    lastName: "Apellido 1",
    displayName: "Display Name 7",
    groupId: 1
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZnJpZW5kcy5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiZnJpZW5kcy5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxzQ0FBMkM7QUFDM0MsOEJBQXFDO0FBQ3JDLGdDQUE4QjtBQUM5QixpQ0FBK0I7QUFNL0IsSUFBYSxjQUFjO0lBQ3pCO0lBQWdCLENBQUM7SUFDakIsMENBQWlCLEdBQWpCLFVBQWtCLEVBQVU7UUFDMUIsTUFBTSxDQUFDLGVBQVUsQ0FBQyxFQUFFLENBQVcsY0FBYyxDQUFDLENBQUM7SUFDakQsQ0FBQztJQUVELHNDQUFhLEdBQWI7UUFDRSxNQUFNLENBQUMsZUFBVSxDQUFDLEVBQUUsQ0FBVyxjQUFjLENBQUMsQ0FBQztJQUNqRCxDQUFDO0lBQ0Qsc0NBQWEsR0FBYixVQUFjLEVBQVU7UUFDdEIsR0FBRyxDQUFDLENBQWUsVUFBYyxFQUFkLGlDQUFjLEVBQWQsNEJBQWMsRUFBZCxJQUFjO1lBQTVCLElBQUksTUFBTSx1QkFBQTtZQUNiLEVBQUUsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxFQUFFLElBQUksRUFBRSxDQUFDO2dCQUNsQixNQUFNLENBQUMsTUFBTSxDQUFDO1NBQ2pCO0lBQ0gsQ0FBQztJQUVELHFDQUFZLEdBQVosVUFBYSxLQUFlO1FBQzFCLE9BQU8sQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUMsSUFBSSxFQUFFLENBQUMsQ0FBQyxDQUFDO1FBQzFDLE1BQU0sQ0FBQyxlQUFVLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQ2pDLENBQUM7SUFDSCxxQkFBQztBQUFELENBQUMsQUFwQkQsSUFvQkM7QUFwQlksY0FBYztJQUQxQixpQkFBVSxFQUFFOztHQUNBLGNBQWMsQ0FvQjFCO0FBcEJZLHdDQUFjO0FBdUIzQixJQUFJLGNBQWMsR0FBRyxJQUFJLEtBQUssRUFBVSxDQUFDO0FBRXpDLGNBQWMsQ0FBQyxJQUFJLENBQVM7SUFDMUIsRUFBRSxFQUFFLENBQUM7SUFDTCxLQUFLLEVBQUUsbUJBQW1CO0lBQzFCLElBQUksRUFBRSxVQUFVO0lBQ2hCLFFBQVEsRUFBRSxZQUFZO0lBQ3RCLFdBQVcsRUFBRSxnQkFBZ0I7SUFDN0IsT0FBTyxFQUFFLENBQUM7Q0FDWCxDQUFDLENBQUE7QUFDRixjQUFjLENBQUMsSUFBSSxDQUFTO0lBQzFCLEVBQUUsRUFBRSxDQUFDO0lBQ0wsS0FBSyxFQUFFLG1CQUFtQjtJQUMxQixJQUFJLEVBQUUsVUFBVTtJQUNoQixRQUFRLEVBQUUsWUFBWTtJQUN0QixXQUFXLEVBQUUsZ0JBQWdCO0lBQzdCLE9BQU8sRUFBRSxDQUFDO0NBQ1gsQ0FBQyxDQUFBO0FBQ0YsY0FBYyxDQUFDLElBQUksQ0FBUztJQUMxQixFQUFFLEVBQUUsQ0FBQztJQUNMLEtBQUssRUFBRSxtQkFBbUI7SUFDMUIsSUFBSSxFQUFFLFVBQVU7SUFDaEIsUUFBUSxFQUFFLFlBQVk7SUFDdEIsV0FBVyxFQUFFLGdCQUFnQjtJQUM3QixPQUFPLEVBQUUsQ0FBQztDQUNYLENBQUMsQ0FBQTtBQUNGLGNBQWMsQ0FBQyxJQUFJLENBQVM7SUFDMUIsRUFBRSxFQUFFLENBQUM7SUFDTCxLQUFLLEVBQUUsa0JBQWtCO0lBQ3pCLElBQUksRUFBRSxVQUFVO0lBQ2hCLFFBQVEsRUFBRSxZQUFZO0lBQ3RCLFdBQVcsRUFBRSxnQkFBZ0I7SUFDN0IsT0FBTyxFQUFFLENBQUM7Q0FDWCxDQUFDLENBQUE7QUFDRixjQUFjLENBQUMsSUFBSSxDQUFTO0lBQzFCLEVBQUUsRUFBRSxDQUFDO0lBQ0wsS0FBSyxFQUFFLGtCQUFrQjtJQUN6QixJQUFJLEVBQUUsVUFBVTtJQUNoQixRQUFRLEVBQUUsWUFBWTtJQUN0QixXQUFXLEVBQUUsZ0JBQWdCO0lBQzdCLE9BQU8sRUFBRSxDQUFDO0NBQ1gsQ0FBQyxDQUFBO0FBQ0YsY0FBYyxDQUFDLElBQUksQ0FBUztJQUMxQixFQUFFLEVBQUUsQ0FBQztJQUNMLEtBQUssRUFBRSxpQkFBaUI7SUFDeEIsSUFBSSxFQUFFLFVBQVU7SUFDaEIsUUFBUSxFQUFFLFlBQVk7SUFDdEIsV0FBVyxFQUFFLGdCQUFnQjtJQUM3QixPQUFPLEVBQUUsQ0FBQztDQUNYLENBQUMsQ0FBQTtBQUNGLGNBQWMsQ0FBQyxJQUFJLENBQVM7SUFDMUIsRUFBRSxFQUFFLENBQUM7SUFDTCxLQUFLLEVBQUUsbUJBQW1CO0lBQzFCLElBQUksRUFBRSxVQUFVO0lBQ2hCLFFBQVEsRUFBRSxZQUFZO0lBQ3RCLFdBQVcsRUFBRSxnQkFBZ0I7SUFDN0IsT0FBTyxFQUFFLENBQUM7Q0FDWCxDQUFDLENBQUEiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcbmltcG9ydCB7IE9ic2VydmFibGUgfSBmcm9tIFwicnhqcy9SeFwiO1xuaW1wb3J0IFwicnhqcy9hZGQvb3BlcmF0b3IvZG9cIjtcbmltcG9ydCBcInJ4anMvYWRkL29wZXJhdG9yL21hcFwiO1xuXG5pbXBvcnQgeyBGcmllbmQgfSBmcm9tIFwiLi9mcmllbmRcIjtcblxuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgRnJpZW5kc1NlcnZpY2Uge1xuICBjb25zdHJ1Y3RvcigpIHsgfVxuICBnZXRGcmllbmRzQnlHcm91cChpZDogbnVtYmVyKTogT2JzZXJ2YWJsZTxBcnJheTxGcmllbmQ+PiB7XG4gICAgcmV0dXJuIE9ic2VydmFibGUub2Y8RnJpZW5kW10+KG1vY2tMaXN0RnJpZW5kKTtcbiAgfVxuXG4gIGdldEFsbEZyaWVuZHMoKTogT2JzZXJ2YWJsZTxBcnJheTxGcmllbmQ+PiB7XG4gICAgcmV0dXJuIE9ic2VydmFibGUub2Y8RnJpZW5kW10+KG1vY2tMaXN0RnJpZW5kKTtcbiAgfVxuICBnZXRGcmllbmRCeUlkKGlkOiBudW1iZXIpOiBGcmllbmQge1xuICAgIGZvciAodmFyIGZyaWVuZCBvZiBtb2NrTGlzdEZyaWVuZCkge1xuICAgICAgaWYgKGZyaWVuZC5pZCA9PSBpZClcbiAgICAgICAgcmV0dXJuIGZyaWVuZDtcbiAgICB9XG4gIH1cblxuICBoYW5kbGVFcnJvcnMoZXJyb3I6IFJlc3BvbnNlKSB7XG4gICAgY29uc29sZS5sb2coSlNPTi5zdHJpbmdpZnkoZXJyb3IuanNvbigpKSk7XG4gICAgcmV0dXJuIE9ic2VydmFibGUudGhyb3coZXJyb3IpO1xuICB9XG59XG5cblxudmFyIG1vY2tMaXN0RnJpZW5kID0gbmV3IEFycmF5PEZyaWVuZD4oKTtcblxubW9ja0xpc3RGcmllbmQucHVzaCg8RnJpZW5kPntcbiAgaWQ6IDEsXG4gIGVtYWlsOiBcInByaW1lcm9AZ21haWwuY29tXCIsXG4gIG5hbWU6IFwiTm9tYnJlIDFcIixcbiAgbGFzdE5hbWU6IFwiQXBlbGxpZG8gMVwiLFxuICBkaXNwbGF5TmFtZTogXCJEaXNwbGF5IE5hbWUgMVwiLFxuICBncm91cElkOiAxXG59KVxubW9ja0xpc3RGcmllbmQucHVzaCg8RnJpZW5kPntcbiAgaWQ6IDIsXG4gIGVtYWlsOiBcInNlZ3VuZG9AZ21haWwuY29tXCIsXG4gIG5hbWU6IFwiTm9tYnJlIDJcIixcbiAgbGFzdE5hbWU6IFwiQXBlbGxpZG8gMVwiLFxuICBkaXNwbGF5TmFtZTogXCJEaXNwbGF5IE5hbWUgMlwiLFxuICBncm91cElkOiAxXG59KVxubW9ja0xpc3RGcmllbmQucHVzaCg8RnJpZW5kPntcbiAgaWQ6IDMsXG4gIGVtYWlsOiBcInRlcmNlcm9AZ21haWwuY29tXCIsXG4gIG5hbWU6IFwiTm9tYnJlIDNcIixcbiAgbGFzdE5hbWU6IFwiQXBlbGxpZG8gMVwiLFxuICBkaXNwbGF5TmFtZTogXCJEaXNwbGF5IE5hbWUgM1wiLFxuICBncm91cElkOiAxXG59KVxubW9ja0xpc3RGcmllbmQucHVzaCg8RnJpZW5kPntcbiAgaWQ6IDQsXG4gIGVtYWlsOiBcImN1YXJ0b0BnbWFpbC5jb21cIixcbiAgbmFtZTogXCJOb21icmUgNFwiLFxuICBsYXN0TmFtZTogXCJBcGVsbGlkbyAxXCIsXG4gIGRpc3BsYXlOYW1lOiBcIkRpc3BsYXkgTmFtZSA0XCIsXG4gIGdyb3VwSWQ6IDFcbn0pXG5tb2NrTGlzdEZyaWVuZC5wdXNoKDxGcmllbmQ+e1xuICBpZDogNSxcbiAgZW1haWw6IFwicXVpbnRvQGdtYWlsLmNvbVwiLFxuICBuYW1lOiBcIk5vbWJyZSA1XCIsXG4gIGxhc3ROYW1lOiBcIkFwZWxsaWRvIDFcIixcbiAgZGlzcGxheU5hbWU6IFwiRGlzcGxheSBOYW1lIDVcIixcbiAgZ3JvdXBJZDogMVxufSlcbm1vY2tMaXN0RnJpZW5kLnB1c2goPEZyaWVuZD57XG4gIGlkOiA2LFxuICBlbWFpbDogXCJzZXh0b0BnbWFpbC5jb21cIixcbiAgbmFtZTogXCJOb21icmUgNlwiLFxuICBsYXN0TmFtZTogXCJBcGVsbGlkbyAxXCIsXG4gIGRpc3BsYXlOYW1lOiBcIkRpc3BsYXkgTmFtZSA2XCIsXG4gIGdyb3VwSWQ6IDFcbn0pXG5tb2NrTGlzdEZyaWVuZC5wdXNoKDxGcmllbmQ+e1xuICBpZDogNyxcbiAgZW1haWw6IFwic2VwdGltb0BnbWFpbC5jb21cIixcbiAgbmFtZTogXCJOb21icmUgN1wiLFxuICBsYXN0TmFtZTogXCJBcGVsbGlkbyAxXCIsXG4gIGRpc3BsYXlOYW1lOiBcIkRpc3BsYXkgTmFtZSA3XCIsXG4gIGdyb3VwSWQ6IDFcbn0pIl19