"use strict";
var core_1 = require("@angular/core");
var Observable_1 = require("rxjs/Observable");
require("rxjs/add/operator/do");
require("rxjs/add/operator/map");
var Subject_1 = require("rxjs/Subject");
var external_map_service_1 = require("../services/map/external-map.service");
var mark_manager_service_1 = require("../services/map/mark-manager.service");
var logged_service_1 = require("../user/logged.service");
var remote_service_1 = require("../remote.service");
var FriendsService = (function () {
    function FriendsService(externalMapService, markManagerService, loggedService, remoteRepositoryService) {
        this.externalMapService = externalMapService;
        this.markManagerService = markManagerService;
        this.loggedService = loggedService;
        this.remoteRepositoryService = remoteRepositoryService;
        this.friendUpdate$ = new Subject_1.Subject();
        this.friendUpdate$.next(mockListFriend);
    }
    // Service message commands
    FriendsService.prototype.addFriend = function (friend) {
        var _this = this;
        this.remoteRepositoryService.add(remote_service_1.RemoteRepoType.users, friend);
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
        logged_service_1.LoggedService,
        remote_service_1.RemoteRepositoryService])
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZnJpZW5kcy5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiZnJpZW5kcy5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxzQ0FBMkM7QUFDM0MsOENBQTZDO0FBQzdDLGdDQUE4QjtBQUM5QixpQ0FBK0I7QUFJL0Isd0NBQXVDO0FBQ3ZDLDZFQUFtSTtBQUNuSSw2RUFBMEU7QUFDMUUseURBQXVEO0FBQ3ZELG9EQUE0RTtBQUs1RSxJQUFhLGNBQWM7SUFHekIsd0JBQW9CLGtCQUFzQyxFQUNoRCxrQkFBc0MsRUFDdEMsYUFBNEIsRUFDNUIsdUJBQWdEO1FBSHRDLHVCQUFrQixHQUFsQixrQkFBa0IsQ0FBb0I7UUFDaEQsdUJBQWtCLEdBQWxCLGtCQUFrQixDQUFvQjtRQUN0QyxrQkFBYSxHQUFiLGFBQWEsQ0FBZTtRQUM1Qiw0QkFBdUIsR0FBdkIsdUJBQXVCLENBQXlCO1FBTDFELGtCQUFhLEdBQTJCLElBQUksaUJBQU8sRUFBaUIsQ0FBQztRQU1uRSxJQUFJLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxjQUFjLENBQUMsQ0FBQztJQUUxQyxDQUFDO0lBRUQsMkJBQTJCO0lBQzNCLGtDQUFTLEdBQVQsVUFBVSxNQUFjO1FBQXhCLGlCQWFDO1FBWEMsSUFBSSxDQUFDLHVCQUF1QixDQUFDLEdBQUcsQ0FBQywrQkFBYyxDQUFDLEtBQUssRUFBRSxNQUFNLENBQUMsQ0FBQztRQUMvRCxJQUFJLE1BQU0sR0FBRyx1QkFBVSxDQUFDLE1BQU0sQ0FBQyxVQUFBLFFBQVE7WUFDckMsSUFBSSxFQUFFLEdBQUcsS0FBSSxDQUFDLGFBQWEsQ0FBQyxFQUFFLENBQUM7WUFDL0IsRUFBRSxDQUFDLENBQUMsTUFBTSxDQUFDLEVBQUUsSUFBSSxDQUFDLElBQUksTUFBTSxDQUFDLEVBQUUsSUFBSSxJQUFJLENBQUM7Z0JBQ3RDLE1BQU0sQ0FBQyxFQUFFLEdBQUcsY0FBYyxDQUFDLGNBQWMsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxD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RUFBRSxVQUFVO0lBQ2hCLFFBQVEsRUFBRSxZQUFZO0lBQ3RCLFdBQVcsRUFBRSxnQkFBZ0I7SUFDN0IsT0FBTyxFQUFFLENBQUM7SUFDVixRQUFRLEVBQUUsSUFBSTtJQUNkLFlBQVksRUFBRSxLQUFLO0NBQ3BCLENBQUMsQ0FBQTtBQUNGLGNBQWMsQ0FBQyxJQUFJLENBQVM7SUFDMUIsRUFBRSxFQUFFLENBQUM7SUFDTCxLQUFLLEVBQUUsa0JBQWtCO0lBQ3pCLElBQUksRUFBRSxVQUFVO0lBQ2hCLFFBQVEsRUFBRSxZQUFZO0lBQ3RCLFdBQVcsRUFBRSxnQkFBZ0I7SUFDN0IsT0FBTyxFQUFFLENBQUM7SUFDVixRQUFRLEVBQUUsSUFBSTtJQUNkLFlBQVksRUFBRSxLQUFLO0NBQ3BCLENBQUMsQ0FBQTtBQUNGLGNBQWMsQ0FBQyxJQUFJLENBQVM7SUFDMUIsRUFBRSxFQUFFLENBQUM7SUFDTCxLQUFLLEVBQUUsa0JBQWtCO0lBQ3pCLElBQUksRUFBRSxVQUFVO0lBQ2hCLFFBQVEsRUFBRSxZQUFZO0lBQ3RCLFdBQVcsRUFBRSxnQkFBZ0I7SUFDN0IsT0FBTyxFQUFFLENBQUM7SUFDVixRQUFRLEVBQUUsSUFBSTtJQUNkLFlBQVksRUFBRSxLQUFLO0NBQ3BCLENBQUMsQ0FBQTtBQUNGLGNBQWMsQ0FBQyxJQUFJLENBQVM7SUFDMUIsRUFBRSxFQUFFLEVBQUU7SUFDTixLQUFLLEVBQUUsa0JBQWtCO0lBQ3pCLElBQUksRUFBRSxXQUFXO0lBQ2pCLFFBQVEsRUFBRSxZQUFZO0lBQ3RCLFdBQVcsRUFBRSxnQkFBZ0I7SUFDN0IsT0FBTyxFQUFFLENBQUM7SUFDVixRQUFRLEVBQUUsSUFBSTtJQUNkLFlBQVksRUFBRSxLQUFLO0NBQ3BCLENBQUMsQ0FBQSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSB9IGZyb20gJ3J4anMvT2JzZXJ2YWJsZSc7XG5pbXBvcnQgXCJyeGpzL2FkZC9vcGVyYXRvci9kb1wiO1xuaW1wb3J0IFwicnhqcy9hZGQvb3BlcmF0b3IvbWFwXCI7XG5pbXBvcnQgeyBGcmllbmQgfSBmcm9tIFwiLi9mcmllbmRcIjtcbmltcG9ydCB7IGV2ZXJ5IH0gZnJvbSAncnhqcy9zcmMvb3BlcmF0b3IvZXZlcnknO1xuaW1wb3J0IHsgT2JzZXJ2ZXIgfSBmcm9tICdyeGpzL3NyYy9PYnNlcnZlcic7XG5pbXBvcnQgeyBTdWJqZWN0IH0gZnJvbSAncnhqcy9TdWJqZWN0JztcbmltcG9ydCB7IEV4dGVybmFsTWFwU2VydmljZSwgR2V0RGlzdGFuY2VSZXF1ZXN0LCBEaXN0YW5jZVJlcXVlc3RXcmFwcGVyLCBXYXlNb2RlRW51bSB9IGZyb20gJy4uL3NlcnZpY2VzL21hcC9leHRlcm5hbC1tYXAuc2VydmljZSc7XG5pbXBvcnQgeyBNYXJrTWFuYWdlclNlcnZpY2UgfSBmcm9tICcuLi9zZXJ2aWNlcy9tYXAvbWFyay1tYW5hZ2VyLnNlcnZpY2UnO1xuaW1wb3J0IHsgTG9nZ2VkU2VydmljZSB9IGZyb20gJy4uL3VzZXIvbG9nZ2VkLnNlcnZpY2UnO1xuaW1wb3J0IHsgUmVtb3RlUmVwb3NpdG9yeVNlcnZpY2UsIFJlbW90ZVJlcG9UeXBlIH0gZnJvbSAnLi4vcmVtb3RlLnNlcnZpY2UnO1xuaW1wb3J0IHsgVXNlciB9IGZyb20gJy4uL3VzZXIvdXNlcic7XG5cblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIEZyaWVuZHNTZXJ2aWNlIHtcbiAgZnJpZW5kVXBkYXRlJDogU3ViamVjdDxBcnJheTxGcmllbmQ+PiA9IG5ldyBTdWJqZWN0PEFycmF5PEZyaWVuZD4+KCk7XG5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSBleHRlcm5hbE1hcFNlcnZpY2U6IEV4dGVybmFsTWFwU2VydmljZSxcbiAgICBwcml2YXRlIG1hcmtNYW5hZ2VyU2VydmljZTogTWFya01hbmFnZXJTZXJ2aWNlLFxuICAgIHByaXZhdGUgbG9nZ2VkU2VydmljZTogTG9nZ2VkU2VydmljZSxcbiAgICBwcml2YXRlIHJlbW90ZVJlcG9zaXRvcnlTZXJ2aWNlOiBSZW1vdGVSZXBvc2l0b3J5U2VydmljZSkge1xuICAgIHRoaXMuZnJpZW5kVXBkYXRlJC5uZXh0KG1vY2tMaXN0RnJpZW5kKTtcblxuICB9XG5cbiAgLy8gU2VydmljZSBtZXNzYWdlIGNvbW1hbmRzXG4gIGFkZEZyaWVuZChmcmllbmQ6IEZyaWVuZCk6IE9ic2VydmFibGU8Ym9vbGVhbj4ge1xuXG4gICAgdGhpcy5yZW1vdGVSZXBvc2l0b3J5U2VydmljZS5hZGQoUmVtb3RlUmVwb1R5cGUudXNlcnMsIGZyaWVuZCk7XG4gICAgbGV0IHNvdXJjZSA9IE9ic2VydmFibGUuY3JlYXRlKG9ic2VydmVyID0+IHtcbiAgICAgIHZhciBtZSA9IHRoaXMubG9nZ2VkU2VydmljZS5tZTtcbiAgICAgIGlmIChmcmllbmQuaWQgPT0gMCB8fCBmcmllbmQuaWQgPT0gbnVsbClcbiAgICAgICAgZnJpZW5kLmlkID0gbW9ja0xpc3RGcmllbmRbbW9ja0xpc3RGcmllbmQubGVuZ3RoIC0gMV0uaWQgKyAxO1xuICAgICAgZnJpZW5kLmludml0YXRpb25TZW5kZWQgPSB0cnVlO1xuICAgICAgbW9ja0xpc3RGcmllbmQucHVzaChmcmllbmQpO1xuICAgICAgdGhpcy5mcmllbmRVcGRhdGUkLm5leHQobW9ja0xpc3RGcmllbmQpO1xuICAgICAgb2JzZXJ2ZXIubmV4dCh0cnVlKTtcbiAgICB9KTtcbiAgICByZXR1cm4gc291cmNlO1xuICB9XG5cbiAgZ2V0RnJpZW5kc0J5R3JvdXAoaWQ6IG51bWJlcik6IE9ic2VydmFibGU8QXJyYXk8RnJpZW5kPj4ge1xuICAgIHJldHVybiBPYnNlcnZhYmxlLm9mPEZyaWVuZFtdPihtb2NrTGlzdEZyaWVuZCk7XG4gIH1cblxuICBnZXRBbGxGcmllbmRzKCk6IE9ic2VydmFibGU8QXJyYXk8RnJpZW5kPj4ge1xuICAgIGxldCBzb3VyY2UgPSBPYnNlcnZhYmxlLmNyZWF0ZShvYnNlcnZlciA9PiB7XG4gICAgICBvYnNlcnZlci5uZXh0KG1vY2tMaXN0RnJpZW5kKTtcbiAgICB9KTtcbiAgICByZXR1cm4gc291cmNlO1xuICB9XG4gIHVwZGF0ZUZyaWVuZChmcmllbmQ6IEZyaWVuZCk6IHZvaWQge1xuICAgIHZhciBpbmRleCA9IDA7XG4gICAgZm9yICh2YXIgaXRlbSBvZiBtb2NrTGlzdEZyaWVuZCkge1xuICAgICAgaWYgKGl0ZW0uaWQgPT0gZnJpZW5kLmlkKVxuICAgICAgICBtb2NrTGlzdEZyaWVuZFtpbmRleF0gPSBmcmllbmQ7XG4gICAgICArK2luZGV4O1xuICAgIH1cbiAgICB0aGlzLmZyaWVuZFVwZGF0ZSQubmV4dChtb2NrTGlzdEZyaWVuZCk7XG4gIH1cbiAgZGVsZXRlRnJpZW5kKGZyaWVuZDogRnJpZW5kKTogdm9pZCB7XG4gICAgdmFyIGluZGV4ID0gbW9ja0xpc3RGcmllbmQuaW5kZXhPZihmcmllbmQsIDApO1xuICAgIGlmIChpbmRleCA+IC0xKSB7XG4gICAgICBtb2NrTGlzdEZyaWVuZC5zcGxpY2UoaW5kZXgsIDEpO1xuICAgIH1cbiAgICB0aGlzLmZyaWVuZFVwZGF0ZSQubmV4dChtb2NrTGlzdEZyaWVuZCk7XG4gIH1cbiAgZ2V0RnJpZW5kQnlJZChpZDogbnVtYmVyKTogRnJpZW5kIHtcbiAgICBmb3IgKHZhciBmcmllbmQgb2YgbW9ja0xpc3RGcmllbmQpIHtcbiAgICAgIGlmIChmcmllbmQuaWQgPT0gaWQpXG4gICAgICAgIHJldHVybiBmcmllbmQ7XG4gICAgfVxuICB9XG4gIGdldEZyaWVuZEJ5SUVtYWlsKGVtYWlsOiBzdHJpbmcpOiBPYnNlcnZhYmxlPEZyaWVuZD4ge1xuICAgIGxldCBzb3VyY2UgPSBPYnNlcnZhYmxlLmNyZWF0ZShvYnNlcnZlciA9PiB7XG4gICAgICB2YXIgZmluZCA9IGZhbHNlO1xuICAgICAgZm9yICh2YXIgZnJpZW5kIG9mIG1vY2tMaXN0RnJpZW5kKSB7XG4gICAgICAgIGlmIChmcmllbmQuZW1haWwudG9VcHBlckNhc2UoKSA9PSBlbWFpbC50b1VwcGVyQ2FzZSgpKSB7XG4gICAgICAgICAgZmluZCA9IHRydWU7XG4gICAgICAgICAgb2JzZXJ2ZXIubmV4dChmcmllbmQpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICBpZiAoIWZpbmQpXG4gICAgICAgIG9ic2VydmVyLmVycm9yKFwiTm8gc2UgZW5jb250cm8gbmluZ3VuIGFtaWdvIGNvbiBlc2Ugbm9tYnJlXCIpXG4gICAgfSk7XG4gICAgcmV0dXJuIHNvdXJjZTtcbiAgfVxuICBoYW5kbGVFcnJvcnMoZXJyb3I6IFJlc3BvbnNlKSB7XG4gICAgY29uc29sZS5sb2coSlNPTi5zdHJpbmdpZnkoZXJyb3IuanNvbigpKSk7XG4gICAgcmV0dXJuIE9ic2VydmFibGUudGhyb3coZXJyb3IpO1xuICB9XG4gIHVwZGF0ZURpc3RhbmNlQWxsRnJpZW5kcygpOiB2b2lkIHtcbiAgICBpZiAodGhpcy5tYXJrTWFuYWdlclNlcnZpY2UuaGFzTWUpIHtcbiAgICAgIHZhciBnZXREaXN0YW5jZSA9IG5ldyBHZXREaXN0YW5jZVJlcXVlc3QoKTtcbiAgICAgIGdldERpc3RhbmNlLm9yaWdpbiA9IHRoaXMubWFya01hbmFnZXJTZXJ2aWNlLm1lLnBvc2l0aW9uO1xuICAgICAgdGhpcy5tYXJrTWFuYWdlclNlcnZpY2UubWFya3NGcmllbmRzLmZvckVhY2goeCA9PiB7XG4gICAgICAgIHZhciBuZXdJdGVtID0gbmV3IERpc3RhbmNlUmVxdWVzdFdyYXBwZXIoeC5tYXJrSWQsIHgubWFyay5wb3NpdGlvbik7XG4gICAgICAgIGdldERpc3RhbmNlLmRlc3RpbmF0aW9uLnB1c2gobmV3SXRlbSk7XG4gICAgICB9KTtcblxuICAgICAgdGhpcy5leHRlcm5hbE1hcFNlcnZpY2UuZ2V0RGlzdGFuY2UoZ2V0RGlzdGFuY2UsIFdheU1vZGVFbnVtLmRyaXZpbmcpXG4gICAgICAgIC5zdWJzY3JpYmUoeCA9PiB7XG4gICAgICAgICAgeC5kZXN0aW5hdGlvbi5mb3JFYWNoKHggPT4ge1xuICAgICAgICAgICAgbW9ja0xpc3RGcmllbmQuZm9yRWFjaChzID0+IHtcbiAgICAgICAgICAgICAgaWYgKHMuaWQgPT0geC5pZCkge1xuICAgICAgICAgICAgICAgIHMuZGlzdGFuY2VUb01lID0geC5kaXN0YW5jZTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgfSk7XG4gICAgICAgICAgdGhpcy5mcmllbmRVcGRhdGUkLm5leHQobW9ja0xpc3RGcmllbmQpO1xuICAgICAgICB9KTtcbiAgICB9XG4gIH1cbn1cbmV4cG9ydCBjbGFzcyBXcmFwcGVySW5mb3JtYXRpb25GcmllbmQge1xuICBjb25zdHJ1Y3RvcihwdWJsaWMgZnJpZW5kOiBGcmllbmQpIHsgfVxufVxuXG52YXIgbW9ja0xpc3RGcmllbmQgPSBuZXcgQXJyYXk8RnJpZW5kPigpO1xuXG5tb2NrTGlzdEZyaWVuZC5wdXNoKDxGcmllbmQ+e1xuICBpZDogMSxcbiAgZW1haWw6IFwicEBwLnBcIixcbiAgaW1hZ2U6IFwiaHR0cHM6Ly9wYnMudHdpbWcuY29tL3Byb2ZpbGVfaW1hZ2VzLzE3MTc5NTY0MzEvQlAtaGVhZHNob3QtZmItcHJvZmlsZS1waG90b180MDB4NDAwLmpwZ1wiLFxuICBuYW1lOiBcIk5vbWJyZSAxXCIsXG4gIGxhc3ROYW1lOiBcIkFwZWxsaWRvIDFcIixcbiAgZGlzcGxheU5hbWU6IFwiRGlzcGxheSBOYW1lIDFcIixcbiAgZ3JvdXBJZDogMSxcbiAgYWN0aXZhdGU6IHRydWUsXG4gIGRyYXdXYXl0VG9NZTogZmFsc2Vcbn0pXG5tb2NrTGlzdEZyaWVuZC5wdXNoKDxGcmllbmQ+e1xuICBpZDogMixcbiAgZW1haWw6IFwic2VndW5kb0BnbWFpbC5jb21cIixcbiAgbmFtZTogXCJOb21icmUgMlwiLFxuICBsYXN0TmFtZTogXCJBcGVsbGlkbyAxXCIsXG4gIGRpc3BsYXlOYW1lOiBcIkRpc3BsYXkgTmFtZSAyXCIsXG4gIGdyb3VwSWQ6IDEsXG4gIGFjdGl2YXRlOiBmYWxzZSxcbiAgZHJhd1dheXRUb01lOiBmYWxzZVxufSlcbm1vY2tMaXN0RnJpZW5kLnB1c2goPEZyaWVuZD57XG4gIGlkOiAzLFxuICBlbWFpbDogXCJ0ZXJjZXJvQGdtYWlsLmNvbVwiLFxuICBuYW1lOiBcIk5vbWJyZSAzXCIsXG4gIGxhc3ROYW1lOiBcIkFwZWxsaWRvIDFcIixcbiAgZGlzcGxheU5hbWU6IFwiRGlzcGxheSBOYW1lIDNcIixcbiAgZ3JvdXBJZDogMSxcbiAgYWN0aXZhdGU6IHRydWUsXG4gIGRyYXdXYXl0VG9NZTogZmFsc2Vcbn0pXG5tb2NrTGlzdEZyaWVuZC5wdXNoKDxGcmllbmQ+e1xuICBpZDogNCxcbiAgZW1haWw6IFwiY3VhcnRvQGdtYWlsLmNvbVwiLFxuICBuYW1lOiBcIk5vbWJyZSA0XCIsXG4gIGxhc3ROYW1lOiBcIkFwZWxsaWRvIDFcIixcbiAgZGlzcGxheU5hbWU6IFwiRGlzcGxheSBOYW1lIDRcIixcbiAgZ3JvdXBJZDogMSxcbiAgYWN0aXZhdGU6IHRydWUsXG4gIGRyYXdXYXl0VG9NZTogZmFsc2Vcbn0pXG5tb2NrTGlzdEZyaWVuZC5wdXNoKDxGcmllbmQ+e1xuICBpZDogNSxcbiAgZW1haWw6IFwicXVpbnRvQGdtYWlsLmNvbVwiLFxuICBuYW1lOiBcIk5vbWJyZSA1XCIsXG4gIGxhc3ROYW1lOiBcIkFwZWxsaWRvIDFcIixcbiAgZGlzcGxheU5hbWU6IFwiRGlzcGxheSBOYW1lIDVcIixcbiAgZ3JvdXBJZDogMSxcbiAgYWN0aXZhdGU6IHRydWUsXG4gIGRyYXdXYXl0VG9NZTogZmFsc2Vcbn0pXG5tb2NrTGlzdEZyaWVuZC5wdXNoKDxGcmllbmQ+e1xuICBpZDogNixcbiAgZW1haWw6IFwic2V4dG9AZ21haWwuY29tXCIsXG4gIG5hbWU6IFwiTm9tYnJlIDZcIixcbiAgbGFzdE5hbWU6IFwiQXBlbGxpZG8gMVwiLFxuICBkaXNwbGF5TmFtZTogXCJEaXNwbGF5IE5hbWUgNlwiLFxuICBncm91cElkOiAxLFxuICBhY3RpdmF0ZTogdHJ1ZSxcbiAgZHJhd1dheXRUb01lOiBmYWxzZVxufSlcbm1vY2tMaXN0RnJpZW5kLnB1c2goPEZyaWVuZD57XG4gIGlkOiA3LFxuICBlbWFpbDogXCJzZXB0aW1vQGdtYWlsLmNvbVwiLFxuICBuYW1lOiBcIk5vbWJyZSA3XCIsXG4gIGxhc3ROYW1lOiBcIkFwZWxsaWRvIDFcIixcbiAgZGlzcGxheU5hbWU6IFwiRGlzcGxheSBOYW1lIDdcIixcbiAgZ3JvdXBJZDogMSxcbiAgYWN0aXZhdGU6IHRydWUsXG4gIGRyYXdXYXl0VG9NZTogZmFsc2Vcbn0pXG5tb2NrTGlzdEZyaWVuZC5wdXNoKDxGcmllbmQ+e1xuICBpZDogOCxcbiAgZW1haWw6IFwib2N0YXZvQGdtYWlsLmNvbVwiLFxuICBuYW1lOiBcIk5vbWJyZSA4XCIsXG4gIGxhc3ROYW1lOiBcIkFwZWxsaWRvIDFcIixcbiAgZGlzcGxheU5hbWU6IFwiRGlzcGxheSBOYW1lIDdcIixcbiAgZ3JvdXBJZDogMSxcbiAgYWN0aXZhdGU6IHRydWUsXG4gIGRyYXdXYXl0VG9NZTogZmFsc2Vcbn0pXG5tb2NrTGlzdEZyaWVuZC5wdXNoKDxGcmllbmQ+e1xuICBpZDogOSxcbiAgZW1haWw6IFwibm92ZW5vQGdtYWlsLmNvbVwiLFxuICBuYW1lOiBcIk5vbWJyZSA5XCIsXG4gIGxhc3ROYW1lOiBcIkFwZWxsaWRvIDFcIixcbiAgZGlzcGxheU5hbWU6IFwiRGlzcGxheSBOYW1lIDdcIixcbiAgZ3JvdXBJZDogMSxcbiAgYWN0aXZhdGU6IHRydWUsXG4gIGRyYXdXYXl0VG9NZTogZmFsc2Vcbn0pXG5tb2NrTGlzdEZyaWVuZC5wdXNoKDxGcmllbmQ+e1xuICBpZDogMTAsXG4gIGVtYWlsOiBcImRlY2ltb0BnbWFpbC5jb21cIixcbiAgbmFtZTogXCJOb21icmUgMTBcIixcbiAgbGFzdE5hbWU6IFwiQXBlbGxpZG8gMVwiLFxuICBkaXNwbGF5TmFtZTogXCJEaXNwbGF5IE5hbWUgN1wiLFxuICBncm91cElkOiAxLFxuICBhY3RpdmF0ZTogdHJ1ZSxcbiAgZHJhd1dheXRUb01lOiBmYWxzZVxufSkiXX0=