"use strict";
var core_1 = require("@angular/core");
var Observable_1 = require("rxjs/Observable");
require("rxjs/add/operator/do");
require("rxjs/add/operator/map");
var FriendsService = (function () {
    function FriendsService() {
        var _this = this;
        this.friend = new Observable_1.Observable(function (observer) {
            observer.next(mockListFriend);
            _this.observer = observer;
        });
    }
    FriendsService.prototype.getFriendsByGroup = function (id) {
        return Observable_1.Observable.of(mockListFriend);
    };
    FriendsService.prototype.getAllFriends = function () {
        // this.data = new Observable(observer => this.dataObserver = observer);
        // return this.data;
        // this.friend = Observable.of<Friend[]>(mockListFriend);
        return this.friend;
    };
    FriendsService.prototype.updateFriend = function (friend) {
        this.observer.next(mockListFriend);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZnJpZW5kcy5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiZnJpZW5kcy5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxzQ0FBMkM7QUFDM0MsOENBQTZDO0FBQzdDLGdDQUE4QjtBQUM5QixpQ0FBK0I7QUFPL0IsSUFBYSxjQUFjO0lBS3pCO1FBQUEsaUJBS0M7UUFKQyxJQUFJLENBQUMsTUFBTSxHQUFHLElBQUksdUJBQVUsQ0FBTSxVQUFBLFFBQVE7WUFDeEMsUUFBUSxDQUFDLElBQUksQ0FBQyxjQUFjLENBQUMsQ0FBQztZQUM5QixLQUFJLENBQUMsUUFBUSxHQUFHLFFBQVEsQ0FBQztRQUMzQixDQUFDLENBQUMsQ0FBQztJQUNMLENBQUM7SUFDRCwwQ0FBaUIsR0FBakIsVUFBa0IsRUFBVTtRQUMxQixNQUFNLENBQUMsdUJBQVUsQ0FBQyxFQUFFLENBQVcsY0FBYyxDQUFDLENBQUM7SUFDakQsQ0FBQztJQUVELHNDQUFhLEdBQWI7UUFDRSx3RUFBd0U7UUFFeEUsb0JBQW9CO1FBQ3BCLHlEQUF5RDtRQUN6RCxNQUFNLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQztJQUNyQixDQUFDO0lBQ0QscUNBQVksR0FBWixVQUFhLE1BQWM7UUFDekIsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsY0FBYyxDQUFDLENBQUM7SUFDckMsQ0FBQztJQUNELHNDQUFhLEdBQWIsVUFBYyxFQUFVO1FBQ3RCLEdBQUcsQ0FBQyxDQUFlLFVBQWMsRUFBZCxpQ0FBYyxFQUFkLDRCQUFjLEVBQWQsSUFBYztZQUE1QixJQUFJLE1BQU0sdUJBQUE7WUFDYixFQUFFLENBQUMsQ0FBQyxNQUFNLENBQUMsRUFBRSxJQUFJLEVBQUUsQ0FBQztnQkFDbEIsTUFBTSxDQUFDLE1BQU0sQ0FBQztTQUNqQjtJQUNILENBQUM7SUFFRCxxQ0FBWSxHQUFaLFVBQWEsS0FBZTtRQUMxQixPQUFPLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDLElBQUksRUFBRSxDQUFDLENBQUMsQ0FBQztRQUMxQyxNQUFNLENBQUMsdUJBQVUsQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDakMsQ0FBQztJQUNILHFCQUFDO0FBQUQsQ0FBQyxBQXBDRCxJQW9DQztBQXBDWSxjQUFjO0lBRDFCLGlCQUFVLEVBQUU7O0dBQ0EsY0FBYyxDQW9DMUI7QUFwQ1ksd0NBQWM7QUF1QzNCLElBQUksY0FBYyxHQUFHLElBQUksS0FBSyxFQUFVLENBQUM7QUFFekMsY0FBYyxDQUFDLElBQUksQ0FBUztJQUMxQixFQUFFLEVBQUUsQ0FBQztJQUNMLEtBQUssRUFBRSxtQkFBbUI7SUFDMUIsSUFBSSxFQUFFLFVBQVU7SUFDaEIsUUFBUSxFQUFFLFlBQVk7SUFDdEIsV0FBVyxFQUFFLGdCQUFnQjtJQUM3QixPQUFPLEVBQUUsQ0FBQztJQUNWLFFBQVEsRUFBRSxJQUFJO0NBQ2YsQ0FBQyxDQUFBO0FBQ0YsY0FBYyxDQUFDLElBQUksQ0FBUztJQUMxQixFQUFFLEVBQUUsQ0FBQztJQUNMLEtBQUssRUFBRSxtQkFBbUI7SUFDMUIsSUFBSSxFQUFFLFVBQVU7SUFDaEIsUUFBUSxFQUFFLFlBQVk7SUFDdEIsV0FBVyxFQUFFLGdCQUFnQjtJQUM3QixPQUFPLEVBQUUsQ0FBQztJQUNWLFFBQVEsRUFBRSxLQUFLO0NBQ2hCLENBQUMsQ0FBQTtBQUNGLGNBQWMsQ0FBQyxJQUFJLENBQVM7SUFDMUIsRUFBRSxFQUFFLENBQUM7SUFDTCxLQUFLLEVBQUUsbUJBQW1CO0lBQzFCLElBQUksRUFBRSxVQUFVO0lBQ2hCLFFBQVEsRUFBRSxZQUFZO0lBQ3RCLFdBQVcsRUFBRSxnQkFBZ0I7SUFDN0IsT0FBTyxFQUFFLENBQUM7SUFDVixRQUFRLEVBQUUsSUFBSTtDQUNmLENBQUMsQ0FBQTtBQUNGLGNBQWMsQ0FBQyxJQUFJLENBQVM7SUFDMUIsRUFBRSxFQUFFLENBQUM7SUFDTCxLQUFLLEVBQUUsa0JBQWtCO0lBQ3pCLElBQUksRUFBRSxVQUFVO0lBQ2hCLFFBQVEsRUFBRSxZQUFZO0lBQ3RCLFdBQVcsRUFBRSxnQkFBZ0I7SUFDN0IsT0FBTyxFQUFFLENBQUM7SUFDVixRQUFRLEVBQUUsSUFBSTtDQUNmLENBQUMsQ0FBQTtBQUNGLGNBQWMsQ0FBQyxJQUFJLENBQVM7SUFDMUIsRUFBRSxFQUFFLENBQUM7SUFDTCxLQUFLLEVBQUUsa0JBQWtCO0lBQ3pCLElBQUksRUFBRSxVQUFVO0lBQ2hCLFFBQVEsRUFBRSxZQUFZO0lBQ3RCLFdBQVcsRUFBRSxnQkFBZ0I7SUFDN0IsT0FBTyxFQUFFLENBQUM7SUFDVixRQUFRLEVBQUUsSUFBSTtDQUNmLENBQUMsQ0FBQTtBQUNGLGNBQWMsQ0FBQyxJQUFJLENBQVM7SUFDMUIsRUFBRSxFQUFFLENBQUM7SUFDTCxLQUFLLEVBQUUsaUJBQWlCO0lBQ3hCLElBQUksRUFBRSxVQUFVO0lBQ2hCLFFBQVEsRUFBRSxZQUFZO0lBQ3RCLFdBQVcsRUFBRSxnQkFBZ0I7SUFDN0IsT0FBTyxFQUFFLENBQUM7SUFDVixRQUFRLEVBQUUsSUFBSTtDQUNmLENBQUMsQ0FBQTtBQUNGLGNBQWMsQ0FBQyxJQUFJLENBQVM7SUFDMUIsRUFBRSxFQUFFLENBQUM7SUFDTCxLQUFLLEVBQUUsbUJBQW1CO0lBQzFCLElBQUksRUFBRSxVQUFVO0lBQ2hCLFFBQVEsRUFBRSxZQUFZO0lBQ3RCLFdBQVcsRUFBRSxnQkFBZ0I7SUFDN0IsT0FBTyxFQUFFLENBQUM7SUFDVixRQUFRLEVBQUUsSUFBSTtDQUNmLENBQUMsQ0FBQSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSB9IGZyb20gJ3J4anMvT2JzZXJ2YWJsZSc7XG5pbXBvcnQgXCJyeGpzL2FkZC9vcGVyYXRvci9kb1wiO1xuaW1wb3J0IFwicnhqcy9hZGQvb3BlcmF0b3IvbWFwXCI7XG5pbXBvcnQgeyBGcmllbmQgfSBmcm9tIFwiLi9mcmllbmRcIjtcbmltcG9ydCB7IGV2ZXJ5IH0gZnJvbSAnLi4vLi4vLi4vcGxhdGZvcm1zL2lvcy9IZWxsb1dvcmxkL2FwcC90bnNfbW9kdWxlcy9yeGpzL3NyYy9vcGVyYXRvci9ldmVyeSc7XG5pbXBvcnQgeyBPYnNlcnZlciB9IGZyb20gJy4uLy4uLy4uL3BsYXRmb3Jtcy9pb3MvSGVsbG9Xb3JsZC9hcHAvdG5zX21vZHVsZXMvcnhqcy9zcmMvT2JzZXJ2ZXInO1xuXG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBGcmllbmRzU2VydmljZSB7XG4gIHByaXZhdGUgZnJpZW5kOiBPYnNlcnZhYmxlPEZyaWVuZFtdPjtcbiAgcHJpdmF0ZSBkYXRhOiBPYnNlcnZhYmxlPEFycmF5PEZyaWVuZD4+O1xuICBwcml2YXRlIGRhdGFPYnNlcnZlcjogT2JzZXJ2ZXI8QXJyYXk8RnJpZW5kPj47XG4gIHByaXZhdGUgb2JzZXJ2ZXIgOmFueTtcbiAgY29uc3RydWN0b3IoKSB7XG4gICAgdGhpcy5mcmllbmQgPSBuZXcgT2JzZXJ2YWJsZTxhbnk+KG9ic2VydmVyID0+IHtcbiAgICAgIG9ic2VydmVyLm5leHQobW9ja0xpc3RGcmllbmQpO1xuICAgICAgdGhpcy5vYnNlcnZlciA9IG9ic2VydmVyO1xuICAgIH0pO1xuICB9XG4gIGdldEZyaWVuZHNCeUdyb3VwKGlkOiBudW1iZXIpOiBPYnNlcnZhYmxlPEFycmF5PEZyaWVuZD4+IHtcbiAgICByZXR1cm4gT2JzZXJ2YWJsZS5vZjxGcmllbmRbXT4obW9ja0xpc3RGcmllbmQpO1xuICB9XG5cbiAgZ2V0QWxsRnJpZW5kcygpOiBPYnNlcnZhYmxlPEFycmF5PEZyaWVuZD4+IHtcbiAgICAvLyB0aGlzLmRhdGEgPSBuZXcgT2JzZXJ2YWJsZShvYnNlcnZlciA9PiB0aGlzLmRhdGFPYnNlcnZlciA9IG9ic2VydmVyKTtcblxuICAgIC8vIHJldHVybiB0aGlzLmRhdGE7XG4gICAgLy8gdGhpcy5mcmllbmQgPSBPYnNlcnZhYmxlLm9mPEZyaWVuZFtdPihtb2NrTGlzdEZyaWVuZCk7XG4gICAgcmV0dXJuIHRoaXMuZnJpZW5kO1xuICB9XG4gIHVwZGF0ZUZyaWVuZChmcmllbmQ6IEZyaWVuZCk6IHZvaWQge1xuICAgIHRoaXMub2JzZXJ2ZXIubmV4dChtb2NrTGlzdEZyaWVuZCk7XG4gIH1cbiAgZ2V0RnJpZW5kQnlJZChpZDogbnVtYmVyKTogRnJpZW5kIHtcbiAgICBmb3IgKHZhciBmcmllbmQgb2YgbW9ja0xpc3RGcmllbmQpIHtcbiAgICAgIGlmIChmcmllbmQuaWQgPT0gaWQpXG4gICAgICAgIHJldHVybiBmcmllbmQ7XG4gICAgfVxuICB9XG5cbiAgaGFuZGxlRXJyb3JzKGVycm9yOiBSZXNwb25zZSkge1xuICAgIGNvbnNvbGUubG9nKEpTT04uc3RyaW5naWZ5KGVycm9yLmpzb24oKSkpO1xuICAgIHJldHVybiBPYnNlcnZhYmxlLnRocm93KGVycm9yKTtcbiAgfVxufVxuXG5cbnZhciBtb2NrTGlzdEZyaWVuZCA9IG5ldyBBcnJheTxGcmllbmQ+KCk7XG5cbm1vY2tMaXN0RnJpZW5kLnB1c2goPEZyaWVuZD57XG4gIGlkOiAxLFxuICBlbWFpbDogXCJwcmltZXJvQGdtYWlsLmNvbVwiLFxuICBuYW1lOiBcIk5vbWJyZSAxXCIsXG4gIGxhc3ROYW1lOiBcIkFwZWxsaWRvIDFcIixcbiAgZGlzcGxheU5hbWU6IFwiRGlzcGxheSBOYW1lIDFcIixcbiAgZ3JvdXBJZDogMSxcbiAgYWN0aXZhdGU6IHRydWVcbn0pXG5tb2NrTGlzdEZyaWVuZC5wdXNoKDxGcmllbmQ+e1xuICBpZDogMixcbiAgZW1haWw6IFwic2VndW5kb0BnbWFpbC5jb21cIixcbiAgbmFtZTogXCJOb21icmUgMlwiLFxuICBsYXN0TmFtZTogXCJBcGVsbGlkbyAxXCIsXG4gIGRpc3BsYXlOYW1lOiBcIkRpc3BsYXkgTmFtZSAyXCIsXG4gIGdyb3VwSWQ6IDEsXG4gIGFjdGl2YXRlOiBmYWxzZVxufSlcbm1vY2tMaXN0RnJpZW5kLnB1c2goPEZyaWVuZD57XG4gIGlkOiAzLFxuICBlbWFpbDogXCJ0ZXJjZXJvQGdtYWlsLmNvbVwiLFxuICBuYW1lOiBcIk5vbWJyZSAzXCIsXG4gIGxhc3ROYW1lOiBcIkFwZWxsaWRvIDFcIixcbiAgZGlzcGxheU5hbWU6IFwiRGlzcGxheSBOYW1lIDNcIixcbiAgZ3JvdXBJZDogMSxcbiAgYWN0aXZhdGU6IHRydWVcbn0pXG5tb2NrTGlzdEZyaWVuZC5wdXNoKDxGcmllbmQ+e1xuICBpZDogNCxcbiAgZW1haWw6IFwiY3VhcnRvQGdtYWlsLmNvbVwiLFxuICBuYW1lOiBcIk5vbWJyZSA0XCIsXG4gIGxhc3ROYW1lOiBcIkFwZWxsaWRvIDFcIixcbiAgZGlzcGxheU5hbWU6IFwiRGlzcGxheSBOYW1lIDRcIixcbiAgZ3JvdXBJZDogMSxcbiAgYWN0aXZhdGU6IHRydWVcbn0pXG5tb2NrTGlzdEZyaWVuZC5wdXNoKDxGcmllbmQ+e1xuICBpZDogNSxcbiAgZW1haWw6IFwicXVpbnRvQGdtYWlsLmNvbVwiLFxuICBuYW1lOiBcIk5vbWJyZSA1XCIsXG4gIGxhc3ROYW1lOiBcIkFwZWxsaWRvIDFcIixcbiAgZGlzcGxheU5hbWU6IFwiRGlzcGxheSBOYW1lIDVcIixcbiAgZ3JvdXBJZDogMSxcbiAgYWN0aXZhdGU6IHRydWVcbn0pXG5tb2NrTGlzdEZyaWVuZC5wdXNoKDxGcmllbmQ+e1xuICBpZDogNixcbiAgZW1haWw6IFwic2V4dG9AZ21haWwuY29tXCIsXG4gIG5hbWU6IFwiTm9tYnJlIDZcIixcbiAgbGFzdE5hbWU6IFwiQXBlbGxpZG8gMVwiLFxuICBkaXNwbGF5TmFtZTogXCJEaXNwbGF5IE5hbWUgNlwiLFxuICBncm91cElkOiAxLFxuICBhY3RpdmF0ZTogdHJ1ZVxufSlcbm1vY2tMaXN0RnJpZW5kLnB1c2goPEZyaWVuZD57XG4gIGlkOiA3LFxuICBlbWFpbDogXCJzZXB0aW1vQGdtYWlsLmNvbVwiLFxuICBuYW1lOiBcIk5vbWJyZSA3XCIsXG4gIGxhc3ROYW1lOiBcIkFwZWxsaWRvIDFcIixcbiAgZGlzcGxheU5hbWU6IFwiRGlzcGxheSBOYW1lIDdcIixcbiAgZ3JvdXBJZDogMSxcbiAgYWN0aXZhdGU6IHRydWVcbn0pIl19