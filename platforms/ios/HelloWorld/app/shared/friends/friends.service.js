"use strict";
var core_1 = require("@angular/core");
var Observable_1 = require("rxjs/Observable");
require("rxjs/add/operator/do");
require("rxjs/add/operator/map");
var Subject_1 = require("rxjs/Subject");
var external_map_service_1 = require("../services/map/external-map.service");
var mark_manager_service_1 = require("../services/map/mark-manager.service");
var logged_service_1 = require("../user/logged.service");
var FriendsService = (function () {
    function FriendsService(externalMapService, markManagerService, loggedService) {
        this.externalMapService = externalMapService;
        this.markManagerService = markManagerService;
        this.loggedService = loggedService;
        this.friendUpdate$ = new Subject_1.Subject();
        this.friendUpdate$.next(mockListFriend);
    }
    // Service message commands
    FriendsService.prototype.addFriend = function (friend) {
        var _this = this;
        var source = Observable_1.Observable.create(function (observer) {
            var me = _this.loggedService.me;
            if (friend.id == 0 || friend.id == null)
                friend.id = mockListFriend[mockListFriend.length - 1].id + 1;
            friend.invitationSended = true;
            mockListFriend.push(friend);
            _this.friendUpdate$.next(mockListFriend);
            observer.next(true);
        });
        return source;
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
    FriendsService.prototype.getFriendByIEmail = function (email) {
        var source = Observable_1.Observable.create(function (observer) {
            var find = false;
            for (var _i = 0, mockListFriend_3 = mockListFriend; _i < mockListFriend_3.length; _i++) {
                var friend = mockListFriend_3[_i];
                if (friend.email.toUpperCase() == email.toUpperCase()) {
                    find = true;
                    observer.next(friend);
                }
            }
            if (!find)
                observer.error("No se encontro ningun amigo con ese nombre");
        });
        return source;
    };
    FriendsService.prototype.handleErrors = function (error) {
        console.log(JSON.stringify(error.json()));
        return Observable_1.Observable.throw(error);
    };
    FriendsService.prototype.updateDistanceAllFriends = function () {
        var _this = this;
        if (this.markManagerService.hasMe) {
            var getDistance = new external_map_service_1.GetDistanceRequest();
            getDistance.origin = this.markManagerService.me.position;
            this.markManagerService.marksFriends.forEach(function (x) {
                var newItem = new external_map_service_1.DistanceRequestWrapper(x.markId, x.mark.position);
                getDistance.destination.push(newItem);
            });
            this.externalMapService.getDistance(getDistance, external_map_service_1.WayModeEnum.driving)
                .subscribe(function (x) {
                x.destination.forEach(function (x) {
                    mockListFriend.forEach(function (s) {
                        if (s.id == x.id) {
                            s.distanceToMe = x.distance;
                        }
                    });
                });
                _this.friendUpdate$.next(mockListFriend);
            });
        }
    };
    return FriendsService;
}());
FriendsService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [external_map_service_1.ExternalMapService,
        mark_manager_service_1.MarkManagerService,
        logged_service_1.LoggedService])
], FriendsService);
exports.FriendsService = FriendsService;
var WrapperInformationFriend = (function () {
    function WrapperInformationFriend(friend) {
        this.friend = friend;
    }
    return WrapperInformationFriend;
}());
exports.WrapperInformationFriend = WrapperInformationFriend;
var mockListFriend = new Array();
mockListFriend.push({
    id: 1,
    email: "p@p.p",
    image: "https://pbs.twimg.com/profile_images/1717956431/BP-headshot-fb-profile-photo_400x400.jpg",
    name: "Nombre 1",
    lastName: "Apellido 1",
    displayName: "Display Name 1",
    groupId: 1,
    activate: true,
    drawWaytToMe: false
});
mockListFriend.push({
    id: 2,
    email: "segundo@gmail.com",
    name: "Nombre 2",
    lastName: "Apellido 1",
    displayName: "Display Name 2",
    groupId: 1,
    activate: false,
    drawWaytToMe: false
});
mockListFriend.push({
    id: 3,
    email: "tercero@gmail.com",
    name: "Nombre 3",
    lastName: "Apellido 1",
    displayName: "Display Name 3",
    groupId: 1,
    activate: true,
    drawWaytToMe: false
});
mockListFriend.push({
    id: 4,
    email: "cuarto@gmail.com",
    name: "Nombre 4",
    lastName: "Apellido 1",
    displayName: "Display Name 4",
    groupId: 1,
    activate: true,
    drawWaytToMe: false
});
mockListFriend.push({
    id: 5,
    email: "quinto@gmail.com",
    name: "Nombre 5",
    lastName: "Apellido 1",
    displayName: "Display Name 5",
    groupId: 1,
    activate: true,
    drawWaytToMe: false
});
mockListFriend.push({
    id: 6,
    email: "sexto@gmail.com",
    name: "Nombre 6",
    lastName: "Apellido 1",
    displayName: "Display Name 6",
    groupId: 1,
    activate: true,
    drawWaytToMe: false
});
mockListFriend.push({
    id: 7,
    email: "septimo@gmail.com",
    name: "Nombre 7",
    lastName: "Apellido 1",
    displayName: "Display Name 7",
    groupId: 1,
    activate: true,
    drawWaytToMe: false
});
mockListFriend.push({
    id: 8,
    email: "octavo@gmail.com",
    name: "Nombre 8",
    lastName: "Apellido 1",
    displayName: "Display Name 7",
    groupId: 1,
    activate: true,
    drawWaytToMe: false
});
mockListFriend.push({
    id: 9,
    email: "noveno@gmail.com",
    name: "Nombre 9",
    lastName: "Apellido 1",
    displayName: "Display Name 7",
    groupId: 1,
    activate: true,
    drawWaytToMe: false
});
mockListFriend.push({
    id: 10,
    email: "decimo@gmail.com",
    name: "Nombre 10",
    lastName: "Apellido 1",
    displayName: "Display Name 7",
    groupId: 1,
    activate: true,
    drawWaytToMe: false
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZnJpZW5kcy5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiZnJpZW5kcy5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxzQ0FBMkM7QUFDM0MsOENBQTZDO0FBQzdDLGdDQUE4QjtBQUM5QixpQ0FBK0I7QUFJL0Isd0NBQXVDO0FBQ3ZDLDZFQUFtSTtBQUNuSSw2RUFBMEU7QUFDMUUseURBQXVEO0FBSXZELElBQWEsY0FBYztJQUd6Qix3QkFBb0Isa0JBQXNDLEVBQ2hELGtCQUFzQyxFQUN0QyxhQUE0QjtRQUZsQix1QkFBa0IsR0FBbEIsa0JBQWtCLENBQW9CO1FBQ2hELHVCQUFrQixHQUFsQixrQkFBa0IsQ0FBb0I7UUFDdEMsa0JBQWEsR0FBYixhQUFhLENBQWU7UUFKdEMsa0JBQWEsR0FBMkIsSUFBSSxpQkFBTyxFQUFpQixDQUFDO1FBS25FLElBQUksQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxDQUFDO0lBRTFDLENBQUM7SUFFRCwyQkFBMkI7SUFDM0Isa0NBQVMsR0FBVCxVQUFVLE1BQWM7UUFBeEIsaUJBV0M7UUFWQyxJQUFJLE1BQU0sR0FBRyx1QkFBVSxDQUFDLE1BQU0sQ0FBQyxVQUFBLFFBQVE7WUFDckMsSUFBSSxFQUFFLEdBQUcsS0FBSSxDQUFDLGFBQWEsQ0FBQyxFQUFFLENBQUM7WUFDL0IsRUFBRSxDQUFDLENBQUMsTUFBTSxDQUFDLEVBQUUsSUFBSSxDQUFDLElBQUksTUFBTSxDQUFDLEVBQUUsSUFBSSxJQUFJLENBQUM7Z0JBQ3RDLE1BQU0sQ0FBQyxFQUFFLEdBQUcsY0FBYyxDQUFDLGNBQWMsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDLENBQUMsRUFBRSxHQUFHLENBQUMsQ0FBQztZQUMvRCxNQUFNLENBQUMsZ0JBQWdCLEdBQUcsSUFBSSxDQUFDO1lBQy9CLGNBQWMsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7WUFDNUIsS0FBSSxDQUFDLGFBQWEsQ0FB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QyxJQUFJLENBQVM7SUFDMUIsRUFBRSxFQUFFLENBQUM7SUFDTCxLQUFLLEVBQUUsa0JBQWtCO0lBQ3pCLElBQUksRUFBRSxVQUFVO0lBQ2hCLFFBQVEsRUFBRSxZQUFZO0lBQ3RCLFdBQVcsRUFBRSxnQkFBZ0I7SUFDN0IsT0FBTyxFQUFFLENBQUM7SUFDVixRQUFRLEVBQUUsSUFBSTtJQUNkLFlBQVksRUFBRSxLQUFLO0NBQ3BCLENBQUMsQ0FBQTtBQUNGLGNBQWMsQ0FBQyxJQUFJLENBQVM7SUFDMUIsRUFBRSxFQUFFLENBQUM7SUFDTCxLQUFLLEVBQUUsa0JBQWtCO0lBQ3pCLElBQUksRUFBRSxVQUFVO0lBQ2hCLFFBQVEsRUFBRSxZQUFZO0lBQ3RCLFdBQVcsRUFBRSxnQkFBZ0I7SUFDN0IsT0FBTyxFQUFFLENBQUM7SUFDVixRQUFRLEVBQUUsSUFBSTtJQUNkLFlBQVksRUFBRSxLQUFLO0NBQ3BCLENBQUMsQ0FBQTtBQUNGLGNBQWMsQ0FBQyxJQUFJLENBQVM7SUFDMUIsRUFBRSxFQUFFLEVBQUU7SUFDTixLQUFLLEVBQUUsa0JBQWtCO0lBQ3pCLElBQUksRUFBRSxXQUFXO0lBQ2pCLFFBQVEsRUFBRSxZQUFZO0lBQ3RCLFdBQVcsRUFBRSxnQkFBZ0I7SUFDN0IsT0FBTyxFQUFFLENBQUM7SUFDVixRQUFRLEVBQUUsSUFBSTtJQUNkLFlBQVksRUFBRSxLQUFLO0NBQ3BCLENBQUMsQ0FBQSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSB9IGZyb20gJ3J4anMvT2JzZXJ2YWJsZSc7XG5pbXBvcnQgXCJyeGpzL2FkZC9vcGVyYXRvci9kb1wiO1xuaW1wb3J0IFwicnhqcy9hZGQvb3BlcmF0b3IvbWFwXCI7XG5pbXBvcnQgeyBGcmllbmQgfSBmcm9tIFwiLi9mcmllbmRcIjtcbmltcG9ydCB7IGV2ZXJ5IH0gZnJvbSAncnhqcy9zcmMvb3BlcmF0b3IvZXZlcnknO1xuaW1wb3J0IHsgT2JzZXJ2ZXIgfSBmcm9tICdyeGpzL3NyYy9PYnNlcnZlcic7XG5pbXBvcnQgeyBTdWJqZWN0IH0gZnJvbSAncnhqcy9TdWJqZWN0JztcbmltcG9ydCB7IEV4dGVybmFsTWFwU2VydmljZSwgR2V0RGlzdGFuY2VSZXF1ZXN0LCBEaXN0YW5jZVJlcXVlc3RXcmFwcGVyLCBXYXlNb2RlRW51bSB9IGZyb20gJy4uL3NlcnZpY2VzL21hcC9leHRlcm5hbC1tYXAuc2VydmljZSc7XG5pbXBvcnQgeyBNYXJrTWFuYWdlclNlcnZpY2UgfSBmcm9tICcuLi9zZXJ2aWNlcy9tYXAvbWFyay1tYW5hZ2VyLnNlcnZpY2UnO1xuaW1wb3J0IHsgTG9nZ2VkU2VydmljZSB9IGZyb20gJy4uL3VzZXIvbG9nZ2VkLnNlcnZpY2UnO1xuXG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBGcmllbmRzU2VydmljZSB7XG4gIGZyaWVuZFVwZGF0ZSQ6IFN1YmplY3Q8QXJyYXk8RnJpZW5kPj4gPSBuZXcgU3ViamVjdDxBcnJheTxGcmllbmQ+PigpO1xuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgZXh0ZXJuYWxNYXBTZXJ2aWNlOiBFeHRlcm5hbE1hcFNlcnZpY2UsXG4gICAgcHJpdmF0ZSBtYXJrTWFuYWdlclNlcnZpY2U6IE1hcmtNYW5hZ2VyU2VydmljZSxcbiAgICBwcml2YXRlIGxvZ2dlZFNlcnZpY2U6IExvZ2dlZFNlcnZpY2UpIHtcbiAgICB0aGlzLmZyaWVuZFVwZGF0ZSQubmV4dChtb2NrTGlzdEZyaWVuZCk7XG5cbiAgfVxuXG4gIC8vIFNlcnZpY2UgbWVzc2FnZSBjb21tYW5kc1xuICBhZGRGcmllbmQoZnJpZW5kOiBGcmllbmQpOiBPYnNlcnZhYmxlPGJvb2xlYW4+IHtcbiAgICBsZXQgc291cmNlID0gT2JzZXJ2YWJsZS5jcmVhdGUob2JzZXJ2ZXIgPT4ge1xuICAgICAgdmFyIG1lID0gdGhpcy5sb2dnZWRTZXJ2aWNlLm1lO1xuICAgICAgaWYgKGZyaWVuZC5pZCA9PSAwIHx8IGZyaWVuZC5pZCA9PSBudWxsKVxuICAgICAgICBmcmllbmQuaWQgPSBtb2NrTGlzdEZyaWVuZFttb2NrTGlzdEZyaWVuZC5sZW5ndGggLSAxXS5pZCArIDE7XG4gICAgICBmcmllbmQuaW52aXRhdGlvblNlbmRlZCA9IHRydWU7XG4gICAgICBtb2NrTGlzdEZyaWVuZC5wdXNoKGZyaWVuZCk7XG4gICAgICB0aGlzLmZyaWVuZFVwZGF0ZSQubmV4dChtb2NrTGlzdEZyaWVuZCk7XG4gICAgICBvYnNlcnZlci5uZXh0KHRydWUpO1xuICAgIH0pO1xuICAgIHJldHVybiBzb3VyY2U7XG4gIH1cblxuICBnZXRGcmllbmRzQnlHcm91cChpZDogbnVtYmVyKTogT2JzZXJ2YWJsZTxBcnJheTxGcmllbmQ+PiB7XG4gICAgcmV0dXJuIE9ic2VydmFibGUub2Y8RnJpZW5kW10+KG1vY2tMaXN0RnJpZW5kKTtcbiAgfVxuXG4gIGdldEFsbEZyaWVuZHMoKTogT2JzZXJ2YWJsZTxBcnJheTxGcmllbmQ+PiB7XG4gICAgbGV0IHNvdXJjZSA9IE9ic2VydmFibGUuY3JlYXRlKG9ic2VydmVyID0+IHtcbiAgICAgIG9ic2VydmVyLm5leHQobW9ja0xpc3RGcmllbmQpO1xuICAgIH0pO1xuICAgIHJldHVybiBzb3VyY2U7XG4gIH1cbiAgdXBkYXRlRnJpZW5kKGZyaWVuZDogRnJpZW5kKTogdm9pZCB7XG4gICAgdmFyIGluZGV4ID0gMDtcbiAgICBmb3IgKHZhciBpdGVtIG9mIG1vY2tMaXN0RnJpZW5kKSB7XG4gICAgICBpZiAoaXRlbS5pZCA9PSBmcmllbmQuaWQpXG4gICAgICAgIG1vY2tMaXN0RnJpZW5kW2luZGV4XSA9IGZyaWVuZDtcbiAgICAgICsraW5kZXg7XG4gICAgfVxuICAgIHRoaXMuZnJpZW5kVXBkYXRlJC5uZXh0KG1vY2tMaXN0RnJpZW5kKTtcbiAgfVxuICBkZWxldGVGcmllbmQoZnJpZW5kOiBGcmllbmQpOiB2b2lkIHtcbiAgICB2YXIgaW5kZXggPSBtb2NrTGlzdEZyaWVuZC5pbmRleE9mKGZyaWVuZCwgMCk7XG4gICAgaWYgKGluZGV4ID4gLTEpIHtcbiAgICAgIG1vY2tMaXN0RnJpZW5kLnNwbGljZShpbmRleCwgMSk7XG4gICAgfVxuICAgIHRoaXMuZnJpZW5kVXBkYXRlJC5uZXh0KG1vY2tMaXN0RnJpZW5kKTtcbiAgfVxuICBnZXRGcmllbmRCeUlkKGlkOiBudW1iZXIpOiBGcmllbmQge1xuICAgIGZvciAodmFyIGZyaWVuZCBvZiBtb2NrTGlzdEZyaWVuZCkge1xuICAgICAgaWYgKGZyaWVuZC5pZCA9PSBpZClcbiAgICAgICAgcmV0dXJuIGZyaWVuZDtcbiAgICB9XG4gIH1cbiAgZ2V0RnJpZW5kQnlJRW1haWwoZW1haWw6IHN0cmluZyk6IE9ic2VydmFibGU8RnJpZW5kPiB7XG4gICAgbGV0IHNvdXJjZSA9IE9ic2VydmFibGUuY3JlYXRlKG9ic2VydmVyID0+IHtcbiAgICAgIHZhciBmaW5kID0gZmFsc2U7XG4gICAgICBmb3IgKHZhciBmcmllbmQgb2YgbW9ja0xpc3RGcmllbmQpIHtcbiAgICAgICAgaWYgKGZyaWVuZC5lbWFpbC50b1VwcGVyQ2FzZSgpID09IGVtYWlsLnRvVXBwZXJDYXNlKCkpIHtcbiAgICAgICAgICBmaW5kID0gdHJ1ZTtcbiAgICAgICAgICBvYnNlcnZlci5uZXh0KGZyaWVuZCk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGlmICghZmluZClcbiAgICAgICAgb2JzZXJ2ZXIuZXJyb3IoXCJObyBzZSBlbmNvbnRybyBuaW5ndW4gYW1pZ28gY29uIGVzZSBub21icmVcIilcbiAgICB9KTtcbiAgICByZXR1cm4gc291cmNlO1xuICB9XG4gIGhhbmRsZUVycm9ycyhlcnJvcjogUmVzcG9uc2UpIHtcbiAgICBjb25zb2xlLmxvZyhKU09OLnN0cmluZ2lmeShlcnJvci5qc29uKCkpKTtcbiAgICByZXR1cm4gT2JzZXJ2YWJsZS50aHJvdyhlcnJvcik7XG4gIH1cbiAgdXBkYXRlRGlzdGFuY2VBbGxGcmllbmRzKCk6IHZvaWQge1xuICAgIGlmICh0aGlzLm1hcmtNYW5hZ2VyU2VydmljZS5oYXNNZSkge1xuICAgICAgdmFyIGdldERpc3RhbmNlID0gbmV3IEdldERpc3RhbmNlUmVxdWVzdCgpO1xuICAgICAgZ2V0RGlzdGFuY2Uub3JpZ2luID0gdGhpcy5tYXJrTWFuYWdlclNlcnZpY2UubWUucG9zaXRpb247XG4gICAgICB0aGlzLm1hcmtNYW5hZ2VyU2VydmljZS5tYXJrc0ZyaWVuZHMuZm9yRWFjaCh4ID0+IHtcbiAgICAgICAgdmFyIG5ld0l0ZW0gPSBuZXcgRGlzdGFuY2VSZXF1ZXN0V3JhcHBlcih4Lm1hcmtJZCwgeC5tYXJrLnBvc2l0aW9uKTtcbiAgICAgICAgZ2V0RGlzdGFuY2UuZGVzdGluYXRpb24ucHVzaChuZXdJdGVtKTtcbiAgICAgIH0pO1xuXG4gICAgICB0aGlzLmV4dGVybmFsTWFwU2VydmljZS5nZXREaXN0YW5jZShnZXREaXN0YW5jZSwgV2F5TW9kZUVudW0uZHJpdmluZylcbiAgICAgICAgLnN1YnNjcmliZSh4ID0+IHtcbiAgICAgICAgICB4LmRlc3RpbmF0aW9uLmZvckVhY2goeCA9PiB7XG4gICAgICAgICAgICBtb2NrTGlzdEZyaWVuZC5mb3JFYWNoKHMgPT4ge1xuICAgICAgICAgICAgICBpZiAocy5pZCA9PSB4LmlkKSB7XG4gICAgICAgICAgICAgICAgcy5kaXN0YW5jZVRvTWUgPSB4LmRpc3RhbmNlO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICB9KTtcbiAgICAgICAgICB0aGlzLmZyaWVuZFVwZGF0ZSQubmV4dChtb2NrTGlzdEZyaWVuZCk7XG4gICAgICAgIH0pO1xuICAgIH1cbiAgfVxufVxuZXhwb3J0IGNsYXNzIFdyYXBwZXJJbmZvcm1hdGlvbkZyaWVuZCB7XG4gIGNvbnN0cnVjdG9yKHB1YmxpYyBmcmllbmQ6IEZyaWVuZCkgeyB9XG59XG5cbnZhciBtb2NrTGlzdEZyaWVuZCA9IG5ldyBBcnJheTxGcmllbmQ+KCk7XG5cbm1vY2tMaXN0RnJpZW5kLnB1c2goPEZyaWVuZD57XG4gIGlkOiAxLFxuICBlbWFpbDogXCJwQHAucFwiLFxuICBpbWFnZTogXCJodHRwczovL3Bicy50d2ltZy5jb20vcHJvZmlsZV9pbWFnZXMvMTcxNzk1NjQzMS9CUC1oZWFkc2hvdC1mYi1wcm9maWxlLXBob3RvXzQwMHg0MDAuanBnXCIsXG4gIG5hbWU6IFwiTm9tYnJlIDFcIixcbiAgbGFzdE5hbWU6IFwiQXBlbGxpZG8gMVwiLFxuICBkaXNwbGF5TmFtZTogXCJEaXNwbGF5IE5hbWUgMVwiLFxuICBncm91cElkOiAxLFxuICBhY3RpdmF0ZTogdHJ1ZSxcbiAgZHJhd1dheXRUb01lOiBmYWxzZVxufSlcbm1vY2tMaXN0RnJpZW5kLnB1c2goPEZyaWVuZD57XG4gIGlkOiAyLFxuICBlbWFpbDogXCJzZWd1bmRvQGdtYWlsLmNvbVwiLFxuICBuYW1lOiBcIk5vbWJyZSAyXCIsXG4gIGxhc3ROYW1lOiBcIkFwZWxsaWRvIDFcIixcbiAgZGlzcGxheU5hbWU6IFwiRGlzcGxheSBOYW1lIDJcIixcbiAgZ3JvdXBJZDogMSxcbiAgYWN0aXZhdGU6IGZhbHNlLFxuICBkcmF3V2F5dFRvTWU6IGZhbHNlXG59KVxubW9ja0xpc3RGcmllbmQucHVzaCg8RnJpZW5kPntcbiAgaWQ6IDMsXG4gIGVtYWlsOiBcInRlcmNlcm9AZ21haWwuY29tXCIsXG4gIG5hbWU6IFwiTm9tYnJlIDNcIixcbiAgbGFzdE5hbWU6IFwiQXBlbGxpZG8gMVwiLFxuICBkaXNwbGF5TmFtZTogXCJEaXNwbGF5IE5hbWUgM1wiLFxuICBncm91cElkOiAxLFxuICBhY3RpdmF0ZTogdHJ1ZSxcbiAgZHJhd1dheXRUb01lOiBmYWxzZVxufSlcbm1vY2tMaXN0RnJpZW5kLnB1c2goPEZyaWVuZD57XG4gIGlkOiA0LFxuICBlbWFpbDogXCJjdWFydG9AZ21haWwuY29tXCIsXG4gIG5hbWU6IFwiTm9tYnJlIDRcIixcbiAgbGFzdE5hbWU6IFwiQXBlbGxpZG8gMVwiLFxuICBkaXNwbGF5TmFtZTogXCJEaXNwbGF5IE5hbWUgNFwiLFxuICBncm91cElkOiAxLFxuICBhY3RpdmF0ZTogdHJ1ZSxcbiAgZHJhd1dheXRUb01lOiBmYWxzZVxufSlcbm1vY2tMaXN0RnJpZW5kLnB1c2goPEZyaWVuZD57XG4gIGlkOiA1LFxuICBlbWFpbDogXCJxdWludG9AZ21haWwuY29tXCIsXG4gIG5hbWU6IFwiTm9tYnJlIDVcIixcbiAgbGFzdE5hbWU6IFwiQXBlbGxpZG8gMVwiLFxuICBkaXNwbGF5TmFtZTogXCJEaXNwbGF5IE5hbWUgNVwiLFxuICBncm91cElkOiAxLFxuICBhY3RpdmF0ZTogdHJ1ZSxcbiAgZHJhd1dheXRUb01lOiBmYWxzZVxufSlcbm1vY2tMaXN0RnJpZW5kLnB1c2goPEZyaWVuZD57XG4gIGlkOiA2LFxuICBlbWFpbDogXCJzZXh0b0BnbWFpbC5jb21cIixcbiAgbmFtZTogXCJOb21icmUgNlwiLFxuICBsYXN0TmFtZTogXCJBcGVsbGlkbyAxXCIsXG4gIGRpc3BsYXlOYW1lOiBcIkRpc3BsYXkgTmFtZSA2XCIsXG4gIGdyb3VwSWQ6IDEsXG4gIGFjdGl2YXRlOiB0cnVlLFxuICBkcmF3V2F5dFRvTWU6IGZhbHNlXG59KVxubW9ja0xpc3RGcmllbmQucHVzaCg8RnJpZW5kPntcbiAgaWQ6IDcsXG4gIGVtYWlsOiBcInNlcHRpbW9AZ21haWwuY29tXCIsXG4gIG5hbWU6IFwiTm9tYnJlIDdcIixcbiAgbGFzdE5hbWU6IFwiQXBlbGxpZG8gMVwiLFxuICBkaXNwbGF5TmFtZTogXCJEaXNwbGF5IE5hbWUgN1wiLFxuICBncm91cElkOiAxLFxuICBhY3RpdmF0ZTogdHJ1ZSxcbiAgZHJhd1dheXRUb01lOiBmYWxzZVxufSlcbm1vY2tMaXN0RnJpZW5kLnB1c2goPEZyaWVuZD57XG4gIGlkOiA4LFxuICBlbWFpbDogXCJvY3Rhdm9AZ21haWwuY29tXCIsXG4gIG5hbWU6IFwiTm9tYnJlIDhcIixcbiAgbGFzdE5hbWU6IFwiQXBlbGxpZG8gMVwiLFxuICBkaXNwbGF5TmFtZTogXCJEaXNwbGF5IE5hbWUgN1wiLFxuICBncm91cElkOiAxLFxuICBhY3RpdmF0ZTogdHJ1ZSxcbiAgZHJhd1dheXRUb01lOiBmYWxzZVxufSlcbm1vY2tMaXN0RnJpZW5kLnB1c2goPEZyaWVuZD57XG4gIGlkOiA5LFxuICBlbWFpbDogXCJub3Zlbm9AZ21haWwuY29tXCIsXG4gIG5hbWU6IFwiTm9tYnJlIDlcIixcbiAgbGFzdE5hbWU6IFwiQXBlbGxpZG8gMVwiLFxuICBkaXNwbGF5TmFtZTogXCJEaXNwbGF5IE5hbWUgN1wiLFxuICBncm91cElkOiAxLFxuICBhY3RpdmF0ZTogdHJ1ZSxcbiAgZHJhd1dheXRUb01lOiBmYWxzZVxufSlcbm1vY2tMaXN0RnJpZW5kLnB1c2goPEZyaWVuZD57XG4gIGlkOiAxMCxcbiAgZW1haWw6IFwiZGVjaW1vQGdtYWlsLmNvbVwiLFxuICBuYW1lOiBcIk5vbWJyZSAxMFwiLFxuICBsYXN0TmFtZTogXCJBcGVsbGlkbyAxXCIsXG4gIGRpc3BsYXlOYW1lOiBcIkRpc3BsYXkgTmFtZSA3XCIsXG4gIGdyb3VwSWQ6IDEsXG4gIGFjdGl2YXRlOiB0cnVlLFxuICBkcmF3V2F5dFRvTWU6IGZhbHNlXG59KSJdfQ==