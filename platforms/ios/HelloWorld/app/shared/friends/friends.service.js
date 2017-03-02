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
        this.friendUpdate$.next(friend);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZnJpZW5kcy5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiZnJpZW5kcy5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxzQ0FBMkM7QUFDM0MsOENBQTZDO0FBQzdDLGdDQUE4QjtBQUM5QixpQ0FBK0I7QUFJL0Isd0NBQXVDO0FBSXZDLElBQWEsY0FBYztJQU96QjtRQUZBLGtCQUFhLEdBQW9CLElBQUksaUJBQU8sRUFBVSxDQUFDO1FBUXZELDRCQUE0QjtRQUNwQixhQUFRLEdBQUcsSUFBSSxpQkFBTyxFQUFVLENBQUM7UUFDakMsMkJBQXNCLEdBQUcsSUFBSSxpQkFBTyxFQUFVLENBQUM7UUFDdkQsNEJBQTRCO1FBQzVCLGFBQVEsR0FBdUIsSUFBSSxDQUFDLFFBQVEsQ0FBQyxZQUFZLEVBQUUsQ0FBQztJQVI1RCxDQUFDO0lBVUQsMkJBQTJCO0lBQzNCLGtDQUFTLEdBQVQsVUFBVSxPQUFlO1FBQ3ZCLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDO0lBQzlCLENBQUM7SUFFRCwwQ0FBaUIsR0FBakIsVUFBa0IsRUFBVTtRQUMxQixNQUFNLENBQUMsdUJBQVUsQ0FBQyxFQUFFLENBQVcsY0FBYyxDQUFDLENBQUM7SUFDakQsQ0FBQztJQUVELHNDQUFhLEdBQWI7UUFDRSxJQUFJLE1BQU0sR0FBRyx1QkFBVSxDQUFDLE1BQU0sQ0FBQyxVQUFBLFFBQVE7WUFDckMsUUFBUSxDQUFDLElBQUksQ0FBQyxjQUFjLENBQUMsQ0FBQztRQUNoQyxDQUFDLENBQUMsQ0FBQztRQUNILE1BQU0sQ0FBQyxNQUFNLENBQUM7SUFDaEIsQ0FBQztJQUNELHFDQUFZLEdBQVosVUFBYSxNQUFjO1FBQ3pCLElBQUksS0FBSyxHQUFHLENBQUMsQ0FBQztRQUNkLEdBQUcsQ0FBQyxDQUFhLFVBQWMsRUFBZCxpQ0FBYyxFQUFkLDRCQUFjLEVBQWQsSUFBYztZQUExQixJQUFJLElBQUksdUJBQUE7WUFD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QUFFLElBQUk7Q0FDZixDQUFDLENBQUE7QUFDRixjQUFjLENBQUMsSUFBSSxDQUFTO0lBQzFCLEVBQUUsRUFBRSxDQUFDO0lBQ0wsS0FBSyxFQUFFLG1CQUFtQjtJQUMxQixJQUFJLEVBQUUsVUFBVTtJQUNoQixRQUFRLEVBQUUsWUFBWTtJQUN0QixXQUFXLEVBQUUsZ0JBQWdCO0lBQzdCLE9BQU8sRUFBRSxDQUFDO0lBQ1YsUUFBUSxFQUFFLElBQUk7Q0FDZixDQUFDLENBQUE7QUFDRixjQUFjLENBQUMsSUFBSSxDQUFTO0lBQzFCLEVBQUUsRUFBRSxDQUFDO0lBQ0wsS0FBSyxFQUFFLGtCQUFrQjtJQUN6QixJQUFJLEVBQUUsVUFBVTtJQUNoQixRQUFRLEVBQUUsWUFBWTtJQUN0QixXQUFXLEVBQUUsZ0JBQWdCO0lBQzdCLE9BQU8sRUFBRSxDQUFDO0lBQ1YsUUFBUSxFQUFFLElBQUk7Q0FDZixDQUFDLENBQUE7QUFDRixjQUFjLENBQUMsSUFBSSxDQUFTO0lBQzFCLEVBQUUsRUFBRSxDQUFDO0lBQ0wsS0FBSyxFQUFFLGtCQUFrQjtJQUN6QixJQUFJLEVBQUUsVUFBVTtJQUNoQixRQUFRLEVBQUUsWUFBWTtJQUN0QixXQUFXLEVBQUUsZ0JBQWdCO0lBQzdCLE9BQU8sRUFBRSxDQUFDO0lBQ1YsUUFBUSxFQUFFLElBQUk7Q0FDZixDQUFDLENBQUE7QUFDRixjQUFjLENBQUMsSUFBSSxDQUFTO0lBQzFCLEVBQUUsRUFBRSxFQUFFO0lBQ04sS0FBSyxFQUFFLGtCQUFrQjtJQUN6QixJQUFJLEVBQUUsV0FBVztJQUNqQixRQUFRLEVBQUUsWUFBWTtJQUN0QixXQUFXLEVBQUUsZ0JBQWdCO0lBQzdCLE9BQU8sRUFBRSxDQUFDO0lBQ1YsUUFBUSxFQUFFLElBQUk7Q0FDZixDQUFDLENBQUEiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcbmltcG9ydCB7IE9ic2VydmFibGUgfSBmcm9tICdyeGpzL09ic2VydmFibGUnO1xuaW1wb3J0IFwicnhqcy9hZGQvb3BlcmF0b3IvZG9cIjtcbmltcG9ydCBcInJ4anMvYWRkL29wZXJhdG9yL21hcFwiO1xuaW1wb3J0IHsgRnJpZW5kIH0gZnJvbSBcIi4vZnJpZW5kXCI7XG5pbXBvcnQgeyBldmVyeSB9IGZyb20gJ3J4anMvc3JjL29wZXJhdG9yL2V2ZXJ5JztcbmltcG9ydCB7IE9ic2VydmVyIH0gZnJvbSAncnhqcy9zcmMvT2JzZXJ2ZXInO1xuaW1wb3J0IHsgU3ViamVjdCB9IGZyb20gJ3J4anMvU3ViamVjdCc7XG5cblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIEZyaWVuZHNTZXJ2aWNlIHtcbiAgcHJpdmF0ZSBmcmllbmQ6IE9ic2VydmFibGU8RnJpZW5kW10+O1xuICBwcml2YXRlIGRhdGE6IE9ic2VydmFibGU8QXJyYXk8RnJpZW5kPj47XG4gIHByaXZhdGUgZGF0YU9ic2VydmVyOiBPYnNlcnZlcjxBcnJheTxGcmllbmQ+PjtcblxuICBmcmllbmRVcGRhdGUkOiBTdWJqZWN0PEZyaWVuZD4gPSBuZXcgU3ViamVjdDxGcmllbmQ+KCk7XG5cbiAgY29uc3RydWN0b3IoKSB7XG5cbiAgfVxuXG5cblxuICAvLyBPYnNlcnZhYmxlIHN0cmluZyBzb3VyY2VzXG4gIHByaXZhdGUgZnJpZW5kc1AgPSBuZXcgU3ViamVjdDxGcmllbmQ+KCk7XG4gIHByaXZhdGUgbWlzc2lvbkNvbmZpcm1lZFNvdXJjZSA9IG5ldyBTdWJqZWN0PEZyaWVuZD4oKTtcbiAgLy8gT2JzZXJ2YWJsZSBzdHJpbmcgc3RyZWFtc1xuICBmcmllbmRzJDogT2JzZXJ2YWJsZTxGcmllbmQ+ID0gdGhpcy5mcmllbmRzUC5hc09ic2VydmFibGUoKTtcblxuICAvLyBTZXJ2aWNlIG1lc3NhZ2UgY29tbWFuZHNcbiAgYWRkRnJpZW5kKG1pc3Npb246IEZyaWVuZCkge1xuICAgIHRoaXMuZnJpZW5kc1AubmV4dChtaXNzaW9uKTtcbiAgfVxuXG4gIGdldEZyaWVuZHNCeUdyb3VwKGlkOiBudW1iZXIpOiBPYnNlcnZhYmxlPEFycmF5PEZyaWVuZD4+IHtcbiAgICByZXR1cm4gT2JzZXJ2YWJsZS5vZjxGcmllbmRbXT4obW9ja0xpc3RGcmllbmQpO1xuICB9XG5cbiAgZ2V0QWxsRnJpZW5kcygpOiBPYnNlcnZhYmxlPEFycmF5PEZyaWVuZD4+IHtcbiAgICBsZXQgc291cmNlID0gT2JzZXJ2YWJsZS5jcmVhdGUob2JzZXJ2ZXIgPT4ge1xuICAgICAgb2JzZXJ2ZXIubmV4dChtb2NrTGlzdEZyaWVuZCk7XG4gICAgfSk7XG4gICAgcmV0dXJuIHNvdXJjZTtcbiAgfVxuICB1cGRhdGVGcmllbmQoZnJpZW5kOiBGcmllbmQpOiB2b2lkIHtcbiAgICB2YXIgaW5kZXggPSAwO1xuICAgIGZvciAodmFyIGl0ZW0gb2YgbW9ja0xpc3RGcmllbmQpIHtcbiAgICAgIGlmIChpdGVtLmlkID09IGZyaWVuZC5pZClcbiAgICAgICAgbW9ja0xpc3RGcmllbmRbaW5kZXhdID0gZnJpZW5kO1xuICAgICAgKytpbmRleDtcbiAgICB9XG4gICAgdGhpcy5mcmllbmRVcGRhdGUkLm5leHQoZnJpZW5kKTtcbiAgfVxuICBnZXRGcmllbmRCeUlkKGlkOiBudW1iZXIpOiBGcmllbmQge1xuICAgIGZvciAodmFyIGZyaWVuZCBvZiBtb2NrTGlzdEZyaWVuZCkge1xuICAgICAgaWYgKGZyaWVuZC5pZCA9PSBpZClcbiAgICAgICAgcmV0dXJuIGZyaWVuZDtcbiAgICB9XG4gIH1cblxuICBoYW5kbGVFcnJvcnMoZXJyb3I6IFJlc3BvbnNlKSB7XG4gICAgY29uc29sZS5sb2coSlNPTi5zdHJpbmdpZnkoZXJyb3IuanNvbigpKSk7XG4gICAgcmV0dXJuIE9ic2VydmFibGUudGhyb3coZXJyb3IpO1xuICB9XG59XG5cblxudmFyIG1vY2tMaXN0RnJpZW5kID0gbmV3IEFycmF5PEZyaWVuZD4oKTtcblxubW9ja0xpc3RGcmllbmQucHVzaCg8RnJpZW5kPntcbiAgaWQ6IDEsXG4gIGVtYWlsOiBcInByaW1lcm9AZ21haWwuY29tXCIsXG4gIG5hbWU6IFwiTm9tYnJlIDFcIixcbiAgbGFzdE5hbWU6IFwiQXBlbGxpZG8gMVwiLFxuICBkaXNwbGF5TmFtZTogXCJEaXNwbGF5IE5hbWUgMVwiLFxuICBncm91cElkOiAxLFxuICBhY3RpdmF0ZTogdHJ1ZVxufSlcbm1vY2tMaXN0RnJpZW5kLnB1c2goPEZyaWVuZD57XG4gIGlkOiAyLFxuICBlbWFpbDogXCJzZWd1bmRvQGdtYWlsLmNvbVwiLFxuICBuYW1lOiBcIk5vbWJyZSAyXCIsXG4gIGxhc3ROYW1lOiBcIkFwZWxsaWRvIDFcIixcbiAgZGlzcGxheU5hbWU6IFwiRGlzcGxheSBOYW1lIDJcIixcbiAgZ3JvdXBJZDogMSxcbiAgYWN0aXZhdGU6IGZhbHNlXG59KVxubW9ja0xpc3RGcmllbmQucHVzaCg8RnJpZW5kPntcbiAgaWQ6IDMsXG4gIGVtYWlsOiBcInRlcmNlcm9AZ21haWwuY29tXCIsXG4gIG5hbWU6IFwiTm9tYnJlIDNcIixcbiAgbGFzdE5hbWU6IFwiQXBlbGxpZG8gMVwiLFxuICBkaXNwbGF5TmFtZTogXCJEaXNwbGF5IE5hbWUgM1wiLFxuICBncm91cElkOiAxLFxuICBhY3RpdmF0ZTogdHJ1ZVxufSlcbm1vY2tMaXN0RnJpZW5kLnB1c2goPEZyaWVuZD57XG4gIGlkOiA0LFxuICBlbWFpbDogXCJjdWFydG9AZ21haWwuY29tXCIsXG4gIG5hbWU6IFwiTm9tYnJlIDRcIixcbiAgbGFzdE5hbWU6IFwiQXBlbGxpZG8gMVwiLFxuICBkaXNwbGF5TmFtZTogXCJEaXNwbGF5IE5hbWUgNFwiLFxuICBncm91cElkOiAxLFxuICBhY3RpdmF0ZTogdHJ1ZVxufSlcbm1vY2tMaXN0RnJpZW5kLnB1c2goPEZyaWVuZD57XG4gIGlkOiA1LFxuICBlbWFpbDogXCJxdWludG9AZ21haWwuY29tXCIsXG4gIG5hbWU6IFwiTm9tYnJlIDVcIixcbiAgbGFzdE5hbWU6IFwiQXBlbGxpZG8gMVwiLFxuICBkaXNwbGF5TmFtZTogXCJEaXNwbGF5IE5hbWUgNVwiLFxuICBncm91cElkOiAxLFxuICBhY3RpdmF0ZTogdHJ1ZVxufSlcbm1vY2tMaXN0RnJpZW5kLnB1c2goPEZyaWVuZD57XG4gIGlkOiA2LFxuICBlbWFpbDogXCJzZXh0b0BnbWFpbC5jb21cIixcbiAgbmFtZTogXCJOb21icmUgNlwiLFxuICBsYXN0TmFtZTogXCJBcGVsbGlkbyAxXCIsXG4gIGRpc3BsYXlOYW1lOiBcIkRpc3BsYXkgTmFtZSA2XCIsXG4gIGdyb3VwSWQ6IDEsXG4gIGFjdGl2YXRlOiB0cnVlXG59KVxubW9ja0xpc3RGcmllbmQucHVzaCg8RnJpZW5kPntcbiAgaWQ6IDcsXG4gIGVtYWlsOiBcInNlcHRpbW9AZ21haWwuY29tXCIsXG4gIG5hbWU6IFwiTm9tYnJlIDdcIixcbiAgbGFzdE5hbWU6IFwiQXBlbGxpZG8gMVwiLFxuICBkaXNwbGF5TmFtZTogXCJEaXNwbGF5IE5hbWUgN1wiLFxuICBncm91cElkOiAxLFxuICBhY3RpdmF0ZTogdHJ1ZVxufSlcbm1vY2tMaXN0RnJpZW5kLnB1c2goPEZyaWVuZD57XG4gIGlkOiA4LFxuICBlbWFpbDogXCJvY3Rhdm9AZ21haWwuY29tXCIsXG4gIG5hbWU6IFwiTm9tYnJlIDhcIixcbiAgbGFzdE5hbWU6IFwiQXBlbGxpZG8gMVwiLFxuICBkaXNwbGF5TmFtZTogXCJEaXNwbGF5IE5hbWUgN1wiLFxuICBncm91cElkOiAxLFxuICBhY3RpdmF0ZTogdHJ1ZVxufSlcbm1vY2tMaXN0RnJpZW5kLnB1c2goPEZyaWVuZD57XG4gIGlkOiA5LFxuICBlbWFpbDogXCJub3Zlbm9AZ21haWwuY29tXCIsXG4gIG5hbWU6IFwiTm9tYnJlIDlcIixcbiAgbGFzdE5hbWU6IFwiQXBlbGxpZG8gMVwiLFxuICBkaXNwbGF5TmFtZTogXCJEaXNwbGF5IE5hbWUgN1wiLFxuICBncm91cElkOiAxLFxuICBhY3RpdmF0ZTogdHJ1ZVxufSlcbm1vY2tMaXN0RnJpZW5kLnB1c2goPEZyaWVuZD57XG4gIGlkOiAxMCxcbiAgZW1haWw6IFwiZGVjaW1vQGdtYWlsLmNvbVwiLFxuICBuYW1lOiBcIk5vbWJyZSAxMFwiLFxuICBsYXN0TmFtZTogXCJBcGVsbGlkbyAxXCIsXG4gIGRpc3BsYXlOYW1lOiBcIkRpc3BsYXkgTmFtZSA3XCIsXG4gIGdyb3VwSWQ6IDEsXG4gIGFjdGl2YXRlOiB0cnVlXG59KSJdfQ==