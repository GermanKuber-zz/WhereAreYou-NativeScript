"use strict";
var core_1 = require("@angular/core");
var Observable_1 = require("rxjs/Observable");
require("rxjs/add/operator/do");
require("rxjs/add/operator/map");
var Subject_1 = require("rxjs/Subject");
var FriendsService = (function () {
    function FriendsService() {
        this.friendUpdate$ = new Subject_1.Subject();
        // Observable string sources
        this.friendsP = new Subject_1.Subject();
        this.missionConfirmedSource = new Subject_1.Subject();
        // Observable string streams
        this.friends$ = this.friendsP.asObservable();
    }
    // Service message commands
    FriendsService.prototype.addFriend = function (mission) {
        this.friendsP.next(mission);
    };
    FriendsService.prototype.getFriendsByGroup = function (id) {
        return Observable_1.Observable.of(mockListFriend);
    };
    FriendsService.prototype.getAllFriends = function () {
        var source = Observable_1.Observable.create(function (observer) {
            observer.next(mockListFriend);
        });
        return source;
    };
    FriendsService.prototype.updateFriend = function (friend) {
        var index = 0;
        for (var _i = 0, mockListFriend_1 = mockListFriend; _i < mockListFriend_1.length; _i++) {
            var item = mockListFriend_1[_i];
            if (item.id == friend.id)
                mockListFriend[index] = friend;
            ++index;
        }
        this.friendUpdate$.next(mockListFriend);
    };
    FriendsService.prototype.deleteFriend = function (friend) {
        var index = mockListFriend.indexOf(friend, 0);
        if (index > -1) {
            mockListFriend.splice(index, 1);
        }
        this.friendUpdate$.next(mockListFriend);
    };
    FriendsService.prototype.getFriendById = function (id) {
        for (var _i = 0, mockListFriend_2 = mockListFriend; _i < mockListFriend_2.length; _i++) {
            var friend = mockListFriend_2[_i];
            if (friend.id == id)
                return friend;
        }
    };
    FriendsService.prototype.handleErrors = function (error) {
        console.log(JSON.stringify(error.json()));
        return Observable_1.Observable.throw(error);
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
    groupId: 1,
    activate: true
});
mockListFriend.push({
    id: 2,
    email: "segundo@gmail.com",
    name: "Nombre 2",
    lastName: "Apellido 1",
    displayName: "Display Name 2",
    groupId: 1,
    activate: false
});
mockListFriend.push({
    id: 3,
    email: "tercero@gmail.com",
    name: "Nombre 3",
    lastName: "Apellido 1",
    displayName: "Display Name 3",
    groupId: 1,
    activate: true
});
mockListFriend.push({
    id: 4,
    email: "cuarto@gmail.com",
    name: "Nombre 4",
    lastName: "Apellido 1",
    displayName: "Display Name 4",
    groupId: 1,
    activate: true
});
mockListFriend.push({
    id: 5,
    email: "quinto@gmail.com",
    name: "Nombre 5",
    lastName: "Apellido 1",
    displayName: "Display Name 5",
    groupId: 1,
    activate: true
});
mockListFriend.push({
    id: 6,
    email: "sexto@gmail.com",
    name: "Nombre 6",
    lastName: "Apellido 1",
    displayName: "Display Name 6",
    groupId: 1,
    activate: true
});
mockListFriend.push({
    id: 7,
    email: "septimo@gmail.com",
    name: "Nombre 7",
    lastName: "Apellido 1",
    displayName: "Display Name 7",
    groupId: 1,
    activate: true
});
mockListFriend.push({
    id: 8,
    email: "octavo@gmail.com",
    name: "Nombre 8",
    lastName: "Apellido 1",
    displayName: "Display Name 7",
    groupId: 1,
    activate: true
});
mockListFriend.push({
    id: 9,
    email: "noveno@gmail.com",
    name: "Nombre 9",
    lastName: "Apellido 1",
    displayName: "Display Name 7",
    groupId: 1,
    activate: true
});
mockListFriend.push({
    id: 10,
    email: "decimo@gmail.com",
    name: "Nombre 10",
    lastName: "Apellido 1",
    displayName: "Display Name 7",
    groupId: 1,
    activate: true
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZnJpZW5kcy5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiZnJpZW5kcy5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxzQ0FBMkM7QUFDM0MsOENBQTZDO0FBQzdDLGdDQUE4QjtBQUM5QixpQ0FBK0I7QUFJL0Isd0NBQXVDO0FBSXZDLElBQWEsY0FBYztJQU96QjtRQUZBLGtCQUFhLEdBQTJCLElBQUksaUJBQU8sRUFBaUIsQ0FBQztRQVFyRSw0QkFBNEI7UUFDcEIsYUFBUSxHQUFHLElBQUksaUJBQU8sRUFBVSxDQUFDO1FBQ2pDLDJCQUFzQixHQUFHLElBQUksaUJBQU8sRUFBVSxDQUFDO1FBQ3ZELDRCQUE0QjtRQUM1QixhQUFRLEdBQXVCLElBQUksQ0FBQyxRQUFRLENBQUMsWUFBWSxFQUFFLENBQUM7SUFSNUQsQ0FBQztJQVVELDJCQUEyQjtJQUMzQixrQ0FBUyxHQUFULFVBQVUsT0FBZTtRQUN2QixJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQztJQUM5QixDQUFDO0lBRUQsMENBQWlCLEdBQWpCLFVBQWtCLEVBQVU7UUFDMUIsTUFBTSxDQUFDLHVCQUFVLENBQUMsRUFBRSxDQUFXLGNBQWMsQ0FBQyxDQUFDO0lBQ2pELENBQUM7SUFFRCxzQ0FBYSxHQUFiO1FBQ0UsSUFBSSxNQUFNLEdBQUcsdUJBQVUsQ0FBQyxNQUFNLENBQUMsVUFBQSxRQUFRO1lBQ3JDLFFBQVEsQ0FBQyxJQUFJLENBQUMsY0FBYyxDQUFDLENBQUM7UUFDaEMsQ0FBQyxDQUFDLENBQUM7UUFDSCxNQUFNLENBQUMsTUFBTSxDQUFDO0lBQ2hCLENBQUM7SUFDRCxxQ0FBWSxHQUFaLFVBQWEsTUFBYztRQUN6QixJQUFJLEtBQUssR0FBRyxDQUFDLENBQUM7UUFDZCxHQUFHLENBQUMsQ0FBYSxVQUFjLEVBQWQsaUNBQWMsRUFBZCw0QkFBYyxFQUFkLElBQWM7WUFBMUIsSUFBSSxJQUFJLHVCQUFBO1lB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QUUsRUFBRTtJQUNOLEtBQUssRUFBRSxrQkFBa0I7SUFDekIsSUFBSSxFQUFFLFdBQVc7SUFDakIsUUFBUSxFQUFFLFlBQVk7SUFDdEIsV0FBVyxFQUFFLGdCQUFnQjtJQUM3QixPQUFPLEVBQUUsQ0FBQztJQUNWLFFBQVEsRUFBRSxJQUFJO0NBQ2YsQ0FBQyxDQUFBIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XG5pbXBvcnQgeyBPYnNlcnZhYmxlIH0gZnJvbSAncnhqcy9PYnNlcnZhYmxlJztcbmltcG9ydCBcInJ4anMvYWRkL29wZXJhdG9yL2RvXCI7XG5pbXBvcnQgXCJyeGpzL2FkZC9vcGVyYXRvci9tYXBcIjtcbmltcG9ydCB7IEZyaWVuZCB9IGZyb20gXCIuL2ZyaWVuZFwiO1xuaW1wb3J0IHsgZXZlcnkgfSBmcm9tICdyeGpzL3NyYy9vcGVyYXRvci9ldmVyeSc7XG5pbXBvcnQgeyBPYnNlcnZlciB9IGZyb20gJ3J4anMvc3JjL09ic2VydmVyJztcbmltcG9ydCB7IFN1YmplY3QgfSBmcm9tICdyeGpzL1N1YmplY3QnO1xuXG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBGcmllbmRzU2VydmljZSB7XG4gIHByaXZhdGUgZnJpZW5kOiBPYnNlcnZhYmxlPEZyaWVuZFtdPjtcbiAgcHJpdmF0ZSBkYXRhOiBPYnNlcnZhYmxlPEFycmF5PEZyaWVuZD4+O1xuICBwcml2YXRlIGRhdGFPYnNlcnZlcjogT2JzZXJ2ZXI8QXJyYXk8RnJpZW5kPj47XG5cbiAgZnJpZW5kVXBkYXRlJDogU3ViamVjdDxBcnJheTxGcmllbmQ+PiA9IG5ldyBTdWJqZWN0PEFycmF5PEZyaWVuZD4+KCk7XG5cbiAgY29uc3RydWN0b3IoKSB7XG5cbiAgfVxuXG5cblxuICAvLyBPYnNlcnZhYmxlIHN0cmluZyBzb3VyY2VzXG4gIHByaXZhdGUgZnJpZW5kc1AgPSBuZXcgU3ViamVjdDxGcmllbmQ+KCk7XG4gIHByaXZhdGUgbWlzc2lvbkNvbmZpcm1lZFNvdXJjZSA9IG5ldyBTdWJqZWN0PEZyaWVuZD4oKTtcbiAgLy8gT2JzZXJ2YWJsZSBzdHJpbmcgc3RyZWFtc1xuICBmcmllbmRzJDogT2JzZXJ2YWJsZTxGcmllbmQ+ID0gdGhpcy5mcmllbmRzUC5hc09ic2VydmFibGUoKTtcblxuICAvLyBTZXJ2aWNlIG1lc3NhZ2UgY29tbWFuZHNcbiAgYWRkRnJpZW5kKG1pc3Npb246IEZyaWVuZCkge1xuICAgIHRoaXMuZnJpZW5kc1AubmV4dChtaXNzaW9uKTtcbiAgfVxuXG4gIGdldEZyaWVuZHNCeUdyb3VwKGlkOiBudW1iZXIpOiBPYnNlcnZhYmxlPEFycmF5PEZyaWVuZD4+IHtcbiAgICByZXR1cm4gT2JzZXJ2YWJsZS5vZjxGcmllbmRbXT4obW9ja0xpc3RGcmllbmQpO1xuICB9XG5cbiAgZ2V0QWxsRnJpZW5kcygpOiBPYnNlcnZhYmxlPEFycmF5PEZyaWVuZD4+IHtcbiAgICBsZXQgc291cmNlID0gT2JzZXJ2YWJsZS5jcmVhdGUob2JzZXJ2ZXIgPT4ge1xuICAgICAgb2JzZXJ2ZXIubmV4dChtb2NrTGlzdEZyaWVuZCk7XG4gICAgfSk7XG4gICAgcmV0dXJuIHNvdXJjZTtcbiAgfVxuICB1cGRhdGVGcmllbmQoZnJpZW5kOiBGcmllbmQpOiB2b2lkIHtcbiAgICB2YXIgaW5kZXggPSAwO1xuICAgIGZvciAodmFyIGl0ZW0gb2YgbW9ja0xpc3RGcmllbmQpIHtcbiAgICAgIGlmIChpdGVtLmlkID09IGZyaWVuZC5pZClcbiAgICAgICAgbW9ja0xpc3RGcmllbmRbaW5kZXhdID0gZnJpZW5kO1xuICAgICAgKytpbmRleDtcbiAgICB9XG4gICAgdGhpcy5mcmllbmRVcGRhdGUkLm5leHQobW9ja0xpc3RGcmllbmQpO1xuICB9XG4gIGRlbGV0ZUZyaWVuZChmcmllbmQ6IEZyaWVuZCk6IHZvaWQge1xuICAgIHZhciBpbmRleCA9IG1vY2tMaXN0RnJpZW5kLmluZGV4T2YoZnJpZW5kLCAwKTtcbiAgICBpZiAoaW5kZXggPiAtMSkge1xuICAgICAgbW9ja0xpc3RGcmllbmQuc3BsaWNlKGluZGV4LCAxKTtcbiAgICB9XG4gICAgdGhpcy5mcmllbmRVcGRhdGUkLm5leHQobW9ja0xpc3RGcmllbmQpO1xuICB9XG4gIGdldEZyaWVuZEJ5SWQoaWQ6IG51bWJlcik6IEZyaWVuZCB7XG4gICAgZm9yICh2YXIgZnJpZW5kIG9mIG1vY2tMaXN0RnJpZW5kKSB7XG4gICAgICBpZiAoZnJpZW5kLmlkID09IGlkKVxuICAgICAgICByZXR1cm4gZnJpZW5kO1xuICAgIH1cbiAgfVxuXG4gIGhhbmRsZUVycm9ycyhlcnJvcjogUmVzcG9uc2UpIHtcbiAgICBjb25zb2xlLmxvZyhKU09OLnN0cmluZ2lmeShlcnJvci5qc29uKCkpKTtcbiAgICByZXR1cm4gT2JzZXJ2YWJsZS50aHJvdyhlcnJvcik7XG4gIH1cbn1cblxuXG52YXIgbW9ja0xpc3RGcmllbmQgPSBuZXcgQXJyYXk8RnJpZW5kPigpO1xuXG5tb2NrTGlzdEZyaWVuZC5wdXNoKDxGcmllbmQ+e1xuICBpZDogMSxcbiAgZW1haWw6IFwicHJpbWVyb0BnbWFpbC5jb21cIixcbiAgbmFtZTogXCJOb21icmUgMVwiLFxuICBsYXN0TmFtZTogXCJBcGVsbGlkbyAxXCIsXG4gIGRpc3BsYXlOYW1lOiBcIkRpc3BsYXkgTmFtZSAxXCIsXG4gIGdyb3VwSWQ6IDEsXG4gIGFjdGl2YXRlOiB0cnVlXG59KVxubW9ja0xpc3RGcmllbmQucHVzaCg8RnJpZW5kPntcbiAgaWQ6IDIsXG4gIGVtYWlsOiBcInNlZ3VuZG9AZ21haWwuY29tXCIsXG4gIG5hbWU6IFwiTm9tYnJlIDJcIixcbiAgbGFzdE5hbWU6IFwiQXBlbGxpZG8gMVwiLFxuICBkaXNwbGF5TmFtZTogXCJEaXNwbGF5IE5hbWUgMlwiLFxuICBncm91cElkOiAxLFxuICBhY3RpdmF0ZTogZmFsc2Vcbn0pXG5tb2NrTGlzdEZyaWVuZC5wdXNoKDxGcmllbmQ+e1xuICBpZDogMyxcbiAgZW1haWw6IFwidGVyY2Vyb0BnbWFpbC5jb21cIixcbiAgbmFtZTogXCJOb21icmUgM1wiLFxuICBsYXN0TmFtZTogXCJBcGVsbGlkbyAxXCIsXG4gIGRpc3BsYXlOYW1lOiBcIkRpc3BsYXkgTmFtZSAzXCIsXG4gIGdyb3VwSWQ6IDEsXG4gIGFjdGl2YXRlOiB0cnVlXG59KVxubW9ja0xpc3RGcmllbmQucHVzaCg8RnJpZW5kPntcbiAgaWQ6IDQsXG4gIGVtYWlsOiBcImN1YXJ0b0BnbWFpbC5jb21cIixcbiAgbmFtZTogXCJOb21icmUgNFwiLFxuICBsYXN0TmFtZTogXCJBcGVsbGlkbyAxXCIsXG4gIGRpc3BsYXlOYW1lOiBcIkRpc3BsYXkgTmFtZSA0XCIsXG4gIGdyb3VwSWQ6IDEsXG4gIGFjdGl2YXRlOiB0cnVlXG59KVxubW9ja0xpc3RGcmllbmQucHVzaCg8RnJpZW5kPntcbiAgaWQ6IDUsXG4gIGVtYWlsOiBcInF1aW50b0BnbWFpbC5jb21cIixcbiAgbmFtZTogXCJOb21icmUgNVwiLFxuICBsYXN0TmFtZTogXCJBcGVsbGlkbyAxXCIsXG4gIGRpc3BsYXlOYW1lOiBcIkRpc3BsYXkgTmFtZSA1XCIsXG4gIGdyb3VwSWQ6IDEsXG4gIGFjdGl2YXRlOiB0cnVlXG59KVxubW9ja0xpc3RGcmllbmQucHVzaCg8RnJpZW5kPntcbiAgaWQ6IDYsXG4gIGVtYWlsOiBcInNleHRvQGdtYWlsLmNvbVwiLFxuICBuYW1lOiBcIk5vbWJyZSA2XCIsXG4gIGxhc3ROYW1lOiBcIkFwZWxsaWRvIDFcIixcbiAgZGlzcGxheU5hbWU6IFwiRGlzcGxheSBOYW1lIDZcIixcbiAgZ3JvdXBJZDogMSxcbiAgYWN0aXZhdGU6IHRydWVcbn0pXG5tb2NrTGlzdEZyaWVuZC5wdXNoKDxGcmllbmQ+e1xuICBpZDogNyxcbiAgZW1haWw6IFwic2VwdGltb0BnbWFpbC5jb21cIixcbiAgbmFtZTogXCJOb21icmUgN1wiLFxuICBsYXN0TmFtZTogXCJBcGVsbGlkbyAxXCIsXG4gIGRpc3BsYXlOYW1lOiBcIkRpc3BsYXkgTmFtZSA3XCIsXG4gIGdyb3VwSWQ6IDEsXG4gIGFjdGl2YXRlOiB0cnVlXG59KVxubW9ja0xpc3RGcmllbmQucHVzaCg8RnJpZW5kPntcbiAgaWQ6IDgsXG4gIGVtYWlsOiBcIm9jdGF2b0BnbWFpbC5jb21cIixcbiAgbmFtZTogXCJOb21icmUgOFwiLFxuICBsYXN0TmFtZTogXCJBcGVsbGlkbyAxXCIsXG4gIGRpc3BsYXlOYW1lOiBcIkRpc3BsYXkgTmFtZSA3XCIsXG4gIGdyb3VwSWQ6IDEsXG4gIGFjdGl2YXRlOiB0cnVlXG59KVxubW9ja0xpc3RGcmllbmQucHVzaCg8RnJpZW5kPntcbiAgaWQ6IDksXG4gIGVtYWlsOiBcIm5vdmVub0BnbWFpbC5jb21cIixcbiAgbmFtZTogXCJOb21icmUgOVwiLFxuICBsYXN0TmFtZTogXCJBcGVsbGlkbyAxXCIsXG4gIGRpc3BsYXlOYW1lOiBcIkRpc3BsYXkgTmFtZSA3XCIsXG4gIGdyb3VwSWQ6IDEsXG4gIGFjdGl2YXRlOiB0cnVlXG59KVxubW9ja0xpc3RGcmllbmQucHVzaCg8RnJpZW5kPntcbiAgaWQ6IDEwLFxuICBlbWFpbDogXCJkZWNpbW9AZ21haWwuY29tXCIsXG4gIG5hbWU6IFwiTm9tYnJlIDEwXCIsXG4gIGxhc3ROYW1lOiBcIkFwZWxsaWRvIDFcIixcbiAgZGlzcGxheU5hbWU6IFwiRGlzcGxheSBOYW1lIDdcIixcbiAgZ3JvdXBJZDogMSxcbiAgYWN0aXZhdGU6IHRydWVcbn0pIl19