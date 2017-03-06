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
        var a = this.remoteRepositoryService.getAll(remote_service_1.RemoteRepoType.users);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZnJpZW5kcy5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiZnJpZW5kcy5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxzQ0FBMkM7QUFDM0MsOENBQTZDO0FBQzdDLGdDQUE4QjtBQUM5QixpQ0FBK0I7QUFJL0Isd0NBQXVDO0FBQ3ZDLDZFQUFtSTtBQUNuSSw2RUFBMEU7QUFDMUUseURBQXVEO0FBQ3ZELG9EQUE0RTtBQUs1RSxJQUFhLGNBQWM7SUFHekIsd0JBQW9CLGtCQUFzQyxFQUNoRCxrQkFBc0MsRUFDdEMsYUFBNEIsRUFDNUIsdUJBQWdEO1FBSHRDLHVCQUFrQixHQUFsQixrQkFBa0IsQ0FBb0I7UUFDaEQsdUJBQWtCLEdBQWxCLGtCQUFrQixDQUFvQjtRQUN0QyxrQkFBYSxHQUFiLGFBQWEsQ0FBZTtRQUM1Qiw0QkFBdUIsR0FBdkIsdUJBQXVCLENBQXlCO1FBTDFELGtCQUFhLEdBQTJCLElBQUksaUJBQU8sRUFBaUIsQ0FBQztRQU1uRSxJQUFJLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxjQUFjLENBQUMsQ0FBQztJQUUxQyxDQUFDO0lBRUQsMkJBQTJCO0lBQzNCLGtDQUFTLEdBQVQsVUFBVSxNQUFjO1FBQXhCLGlCQWNDO1FBYkgsSUFBSSxDQUFDLEdBQUcsSUFBSSxDQUFDLHVCQUF1QixDQUFDLE1BQU0sQ0FBUywrQkFBYyxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBRXRFLElBQUksQ0FBQyx1QkFBdUIsQ0FBQyxHQUFHLENBQUMsK0JBQWMsQ0FBQyxLQUFLLEVBQUMsTUFBTSxDQUFDLENBQUM7UUFDOUQsSUFBSSxNQUFNLEdBQUcsdUJBQVUsQ0FBQyxNQUFNLENBQUMsVUFBQSxRQUFRO1lBQ3JDLElBQUksRUFBRSxHQUFHLEtBQUksQ0FBQyxhQUFhLENBQUMsRUFBRSxDQUFDO1lBQy9CLEVBQUUsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxFQUFFLElBQUksQ0FBQyxJQUFJLE1BQU0sQ0FBQyxFQUFF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cmVcIjtcbmltcG9ydCB7IE9ic2VydmFibGUgfSBmcm9tICdyeGpzL09ic2VydmFibGUnO1xuaW1wb3J0IFwicnhqcy9hZGQvb3BlcmF0b3IvZG9cIjtcbmltcG9ydCBcInJ4anMvYWRkL29wZXJhdG9yL21hcFwiO1xuaW1wb3J0IHsgRnJpZW5kIH0gZnJvbSBcIi4vZnJpZW5kXCI7XG5pbXBvcnQgeyBldmVyeSB9IGZyb20gJ3J4anMvc3JjL29wZXJhdG9yL2V2ZXJ5JztcbmltcG9ydCB7IE9ic2VydmVyIH0gZnJvbSAncnhqcy9zcmMvT2JzZXJ2ZXInO1xuaW1wb3J0IHsgU3ViamVjdCB9IGZyb20gJ3J4anMvU3ViamVjdCc7XG5pbXBvcnQgeyBFeHRlcm5hbE1hcFNlcnZpY2UsIEdldERpc3RhbmNlUmVxdWVzdCwgRGlzdGFuY2VSZXF1ZXN0V3JhcHBlciwgV2F5TW9kZUVudW0gfSBmcm9tICcuLi9zZXJ2aWNlcy9tYXAvZXh0ZXJuYWwtbWFwLnNlcnZpY2UnO1xuaW1wb3J0IHsgTWFya01hbmFnZXJTZXJ2aWNlIH0gZnJvbSAnLi4vc2VydmljZXMvbWFwL21hcmstbWFuYWdlci5zZXJ2aWNlJztcbmltcG9ydCB7IExvZ2dlZFNlcnZpY2UgfSBmcm9tICcuLi91c2VyL2xvZ2dlZC5zZXJ2aWNlJztcbmltcG9ydCB7IFJlbW90ZVJlcG9zaXRvcnlTZXJ2aWNlLCBSZW1vdGVSZXBvVHlwZSB9IGZyb20gJy4uL3JlbW90ZS5zZXJ2aWNlJztcbmltcG9ydCB7IFVzZXIgfSBmcm9tICcuLi91c2VyL3VzZXInO1xuXG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBGcmllbmRzU2VydmljZSB7XG4gIGZyaWVuZFVwZGF0ZSQ6IFN1YmplY3Q8QXJyYXk8RnJpZW5kPj4gPSBuZXcgU3ViamVjdDxBcnJheTxGcmllbmQ+PigpO1xuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgZXh0ZXJuYWxNYXBTZXJ2aWNlOiBFeHRlcm5hbE1hcFNlcnZpY2UsXG4gICAgcHJpdmF0ZSBtYXJrTWFuYWdlclNlcnZpY2U6IE1hcmtNYW5hZ2VyU2VydmljZSxcbiAgICBwcml2YXRlIGxvZ2dlZFNlcnZpY2U6IExvZ2dlZFNlcnZpY2UsXG4gICAgcHJpdmF0ZSByZW1vdGVSZXBvc2l0b3J5U2VydmljZTogUmVtb3RlUmVwb3NpdG9yeVNlcnZpY2UpIHtcbiAgICB0aGlzLmZyaWVuZFVwZGF0ZSQubmV4dChtb2NrTGlzdEZyaWVuZCk7XG5cbiAgfVxuXG4gIC8vIFNlcnZpY2UgbWVzc2FnZSBjb21tYW5kc1xuICBhZGRGcmllbmQoZnJpZW5kOiBGcmllbmQpOiBPYnNlcnZhYmxlPGJvb2xlYW4+IHtcbnZhciBhID0gdGhpcy5yZW1vdGVSZXBvc2l0b3J5U2VydmljZS5nZXRBbGw8VXNlcltdPihSZW1vdGVSZXBvVHlwZS51c2Vycyk7XG5cbiAgICB0aGlzLnJlbW90ZVJlcG9zaXRvcnlTZXJ2aWNlLmFkZChSZW1vdGVSZXBvVHlwZS51c2VycyxmcmllbmQpO1xuICAgIGxldCBzb3VyY2UgPSBPYnNlcnZhYmxlLmNyZWF0ZShvYnNlcnZlciA9PiB7XG4gICAgICB2YXIgbWUgPSB0aGlzLmxvZ2dlZFNlcnZpY2UubWU7XG4gICAgICBpZiAoZnJpZW5kLmlkID09IDAgfHwgZnJpZW5kLmlkID09IG51bGwpXG4gICAgICAgIGZyaWVuZC5pZCA9IG1vY2tMaXN0RnJpZW5kW21vY2tMaXN0RnJpZW5kLmxlbmd0aCAtIDFdLmlkICsgMTtcbiAgICAgIGZyaWVuZC5pbnZpdGF0aW9uU2VuZGVkID0gdHJ1ZTtcbiAgICAgIG1vY2tMaXN0RnJpZW5kLnB1c2goZnJpZW5kKTtcbiAgICAgIHRoaXMuZnJpZW5kVXBkYXRlJC5uZXh0KG1vY2tMaXN0RnJpZW5kKTtcbiAgICAgIG9ic2VydmVyLm5leHQodHJ1ZSk7XG4gICAgfSk7XG4gICAgcmV0dXJuIHNvdXJjZTtcbiAgfVxuXG4gIGdldEZyaWVuZHNCeUdyb3VwKGlkOiBudW1iZXIpOiBPYnNlcnZhYmxlPEFycmF5PEZyaWVuZD4+IHtcbiAgICByZXR1cm4gT2JzZXJ2YWJsZS5vZjxGcmllbmRbXT4obW9ja0xpc3RGcmllbmQpO1xuICB9XG5cbiAgZ2V0QWxsRnJpZW5kcygpOiBPYnNlcnZhYmxlPEFycmF5PEZyaWVuZD4+IHtcbiAgICBsZXQgc291cmNlID0gT2JzZXJ2YWJsZS5jcmVhdGUob2JzZXJ2ZXIgPT4ge1xuICAgICAgb2JzZXJ2ZXIubmV4dChtb2NrTGlzdEZyaWVuZCk7XG4gICAgfSk7XG4gICAgcmV0dXJuIHNvdXJjZTtcbiAgfVxuICB1cGRhdGVGcmllbmQoZnJpZW5kOiBGcmllbmQpOiB2b2lkIHtcbiAgICB2YXIgaW5kZXggPSAwO1xuICAgIGZvciAodmFyIGl0ZW0gb2YgbW9ja0xpc3RGcmllbmQpIHtcbiAgICAgIGlmIChpdGVtLmlkID09IGZyaWVuZC5pZClcbiAgICAgICAgbW9ja0xpc3RGcmllbmRbaW5kZXhdID0gZnJpZW5kO1xuICAgICAgKytpbmRleDtcbiAgICB9XG4gICAgdGhpcy5mcmllbmRVcGRhdGUkLm5leHQobW9ja0xpc3RGcmllbmQpO1xuICB9XG4gIGRlbGV0ZUZyaWVuZChmcmllbmQ6IEZyaWVuZCk6IHZvaWQge1xuICAgIHZhciBpbmRleCA9IG1vY2tMaXN0RnJpZW5kLmluZGV4T2YoZnJpZW5kLCAwKTtcbiAgICBpZiAoaW5kZXggPiAtMSkge1xuICAgICAgbW9ja0xpc3RGcmllbmQuc3BsaWNlKGluZGV4LCAxKTtcbiAgICB9XG4gICAgdGhpcy5mcmllbmRVcGRhdGUkLm5leHQobW9ja0xpc3RGcmllbmQpO1xuICB9XG4gIGdldEZyaWVuZEJ5SWQoaWQ6IG51bWJlcik6IEZyaWVuZCB7XG4gICAgZm9yICh2YXIgZnJpZW5kIG9mIG1vY2tMaXN0RnJpZW5kKSB7XG4gICAgICBpZiAoZnJpZW5kLmlkID09IGlkKVxuICAgICAgICByZXR1cm4gZnJpZW5kO1xuICAgIH1cbiAgfVxuICBnZXRGcmllbmRCeUlFbWFpbChlbWFpbDogc3RyaW5nKTogT2JzZXJ2YWJsZTxGcmllbmQ+IHtcbiAgICBsZXQgc291cmNlID0gT2JzZXJ2YWJsZS5jcmVhdGUob2JzZXJ2ZXIgPT4ge1xuICAgICAgdmFyIGZpbmQgPSBmYWxzZTtcbiAgICAgIGZvciAodmFyIGZyaWVuZCBvZiBtb2NrTGlzdEZyaWVuZCkge1xuICAgICAgICBpZiAoZnJpZW5kLmVtYWlsLnRvVXBwZXJDYXNlKCkgPT0gZW1haWwudG9VcHBlckNhc2UoKSkge1xuICAgICAgICAgIGZpbmQgPSB0cnVlO1xuICAgICAgICAgIG9ic2VydmVyLm5leHQoZnJpZW5kKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgaWYgKCFmaW5kKVxuICAgICAgICBvYnNlcnZlci5lcnJvcihcIk5vIHNlIGVuY29udHJvIG5pbmd1biBhbWlnbyBjb24gZXNlIG5vbWJyZVwiKVxuICAgIH0pO1xuICAgIHJldHVybiBzb3VyY2U7XG4gIH1cbiAgaGFuZGxlRXJyb3JzKGVycm9yOiBSZXNwb25zZSkge1xuICAgIGNvbnNvbGUubG9nKEpTT04uc3RyaW5naWZ5KGVycm9yLmpzb24oKSkpO1xuICAgIHJldHVybiBPYnNlcnZhYmxlLnRocm93KGVycm9yKTtcbiAgfVxuICB1cGRhdGVEaXN0YW5jZUFsbEZyaWVuZHMoKTogdm9pZCB7XG4gICAgaWYgKHRoaXMubWFya01hbmFnZXJTZXJ2aWNlLmhhc01lKSB7XG4gICAgICB2YXIgZ2V0RGlzdGFuY2UgPSBuZXcgR2V0RGlzdGFuY2VSZXF1ZXN0KCk7XG4gICAgICBnZXREaXN0YW5jZS5vcmlnaW4gPSB0aGlzLm1hcmtNYW5hZ2VyU2VydmljZS5tZS5wb3NpdGlvbjtcbiAgICAgIHRoaXMubWFya01hbmFnZXJTZXJ2aWNlLm1hcmtzRnJpZW5kcy5mb3JFYWNoKHggPT4ge1xuICAgICAgICB2YXIgbmV3SXRlbSA9IG5ldyBEaXN0YW5jZVJlcXVlc3RXcmFwcGVyKHgubWFya0lkLCB4Lm1hcmsucG9zaXRpb24pO1xuICAgICAgICBnZXREaXN0YW5jZS5kZXN0aW5hdGlvbi5wdXNoKG5ld0l0ZW0pO1xuICAgICAgfSk7XG5cbiAgICAgIHRoaXMuZXh0ZXJuYWxNYXBTZXJ2aWNlLmdldERpc3RhbmNlKGdldERpc3RhbmNlLCBXYXlNb2RlRW51bS5kcml2aW5nKVxuICAgICAgICAuc3Vic2NyaWJlKHggPT4ge1xuICAgICAgICAgIHguZGVzdGluYXRpb24uZm9yRWFjaCh4ID0+IHtcbiAgICAgICAgICAgIG1vY2tMaXN0RnJpZW5kLmZvckVhY2gocyA9PiB7XG4gICAgICAgICAgICAgIGlmIChzLmlkID09IHguaWQpIHtcbiAgICAgICAgICAgICAgICBzLmRpc3RhbmNlVG9NZSA9IHguZGlzdGFuY2U7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgIH0pO1xuICAgICAgICAgIHRoaXMuZnJpZW5kVXBkYXRlJC5uZXh0KG1vY2tMaXN0RnJpZW5kKTtcbiAgICAgICAgfSk7XG4gICAgfVxuICB9XG59XG5leHBvcnQgY2xhc3MgV3JhcHBlckluZm9ybWF0aW9uRnJpZW5kIHtcbiAgY29uc3RydWN0b3IocHVibGljIGZyaWVuZDogRnJpZW5kKSB7IH1cbn1cblxudmFyIG1vY2tMaXN0RnJpZW5kID0gbmV3IEFycmF5PEZyaWVuZD4oKTtcblxubW9ja0xpc3RGcmllbmQucHVzaCg8RnJpZW5kPntcbiAgaWQ6IDEsXG4gIGVtYWlsOiBcInBAcC5wXCIsXG4gIGltYWdlOiBcImh0dHBzOi8vcGJzLnR3aW1nLmNvbS9wcm9maWxlX2ltYWdlcy8xNzE3OTU2NDMxL0JQLWhlYWRzaG90LWZiLXByb2ZpbGUtcGhvdG9fNDAweDQwMC5qcGdcIixcbiAgbmFtZTogXCJOb21icmUgMVwiLFxuICBsYXN0TmFtZTogXCJBcGVsbGlkbyAxXCIsXG4gIGRpc3BsYXlOYW1lOiBcIkRpc3BsYXkgTmFtZSAxXCIsXG4gIGdyb3VwSWQ6IDEsXG4gIGFjdGl2YXRlOiB0cnVlLFxuICBkcmF3V2F5dFRvTWU6IGZhbHNlXG59KVxubW9ja0xpc3RGcmllbmQucHVzaCg8RnJpZW5kPntcbiAgaWQ6IDIsXG4gIGVtYWlsOiBcInNlZ3VuZG9AZ21haWwuY29tXCIsXG4gIG5hbWU6IFwiTm9tYnJlIDJcIixcbiAgbGFzdE5hbWU6IFwiQXBlbGxpZG8gMVwiLFxuICBkaXNwbGF5TmFtZTogXCJEaXNwbGF5IE5hbWUgMlwiLFxuICBncm91cElkOiAxLFxuICBhY3RpdmF0ZTogZmFsc2UsXG4gIGRyYXdXYXl0VG9NZTogZmFsc2Vcbn0pXG5tb2NrTGlzdEZyaWVuZC5wdXNoKDxGcmllbmQ+e1xuICBpZDogMyxcbiAgZW1haWw6IFwidGVyY2Vyb0BnbWFpbC5jb21cIixcbiAgbmFtZTogXCJOb21icmUgM1wiLFxuICBsYXN0TmFtZTogXCJBcGVsbGlkbyAxXCIsXG4gIGRpc3BsYXlOYW1lOiBcIkRpc3BsYXkgTmFtZSAzXCIsXG4gIGdyb3VwSWQ6IDEsXG4gIGFjdGl2YXRlOiB0cnVlLFxuICBkcmF3V2F5dFRvTWU6IGZhbHNlXG59KVxubW9ja0xpc3RGcmllbmQucHVzaCg8RnJpZW5kPntcbiAgaWQ6IDQsXG4gIGVtYWlsOiBcImN1YXJ0b0BnbWFpbC5jb21cIixcbiAgbmFtZTogXCJOb21icmUgNFwiLFxuICBsYXN0TmFtZTogXCJBcGVsbGlkbyAxXCIsXG4gIGRpc3BsYXlOYW1lOiBcIkRpc3BsYXkgTmFtZSA0XCIsXG4gIGdyb3VwSWQ6IDEsXG4gIGFjdGl2YXRlOiB0cnVlLFxuICBkcmF3V2F5dFRvTWU6IGZhbHNlXG59KVxubW9ja0xpc3RGcmllbmQucHVzaCg8RnJpZW5kPntcbiAgaWQ6IDUsXG4gIGVtYWlsOiBcInF1aW50b0BnbWFpbC5jb21cIixcbiAgbmFtZTogXCJOb21icmUgNVwiLFxuICBsYXN0TmFtZTogXCJBcGVsbGlkbyAxXCIsXG4gIGRpc3BsYXlOYW1lOiBcIkRpc3BsYXkgTmFtZSA1XCIsXG4gIGdyb3VwSWQ6IDEsXG4gIGFjdGl2YXRlOiB0cnVlLFxuICBkcmF3V2F5dFRvTWU6IGZhbHNlXG59KVxubW9ja0xpc3RGcmllbmQucHVzaCg8RnJpZW5kPntcbiAgaWQ6IDYsXG4gIGVtYWlsOiBcInNleHRvQGdtYWlsLmNvbVwiLFxuICBuYW1lOiBcIk5vbWJyZSA2XCIsXG4gIGxhc3ROYW1lOiBcIkFwZWxsaWRvIDFcIixcbiAgZGlzcGxheU5hbWU6IFwiRGlzcGxheSBOYW1lIDZcIixcbiAgZ3JvdXBJZDogMSxcbiAgYWN0aXZhdGU6IHRydWUsXG4gIGRyYXdXYXl0VG9NZTogZmFsc2Vcbn0pXG5tb2NrTGlzdEZyaWVuZC5wdXNoKDxGcmllbmQ+e1xuICBpZDogNyxcbiAgZW1haWw6IFwic2VwdGltb0BnbWFpbC5jb21cIixcbiAgbmFtZTogXCJOb21icmUgN1wiLFxuICBsYXN0TmFtZTogXCJBcGVsbGlkbyAxXCIsXG4gIGRpc3BsYXlOYW1lOiBcIkRpc3BsYXkgTmFtZSA3XCIsXG4gIGdyb3VwSWQ6IDEsXG4gIGFjdGl2YXRlOiB0cnVlLFxuICBkcmF3V2F5dFRvTWU6IGZhbHNlXG59KVxubW9ja0xpc3RGcmllbmQucHVzaCg8RnJpZW5kPntcbiAgaWQ6IDgsXG4gIGVtYWlsOiBcIm9jdGF2b0BnbWFpbC5jb21cIixcbiAgbmFtZTogXCJOb21icmUgOFwiLFxuICBsYXN0TmFtZTogXCJBcGVsbGlkbyAxXCIsXG4gIGRpc3BsYXlOYW1lOiBcIkRpc3BsYXkgTmFtZSA3XCIsXG4gIGdyb3VwSWQ6IDEsXG4gIGFjdGl2YXRlOiB0cnVlLFxuICBkcmF3V2F5dFRvTWU6IGZhbHNlXG59KVxubW9ja0xpc3RGcmllbmQucHVzaCg8RnJpZW5kPntcbiAgaWQ6IDksXG4gIGVtYWlsOiBcIm5vdmVub0BnbWFpbC5jb21cIixcbiAgbmFtZTogXCJOb21icmUgOVwiLFxuICBsYXN0TmFtZTogXCJBcGVsbGlkbyAxXCIsXG4gIGRpc3BsYXlOYW1lOiBcIkRpc3BsYXkgTmFtZSA3XCIsXG4gIGdyb3VwSWQ6IDEsXG4gIGFjdGl2YXRlOiB0cnVlLFxuICBkcmF3V2F5dFRvTWU6IGZhbHNlXG59KVxubW9ja0xpc3RGcmllbmQucHVzaCg8RnJpZW5kPntcbiAgaWQ6IDEwLFxuICBlbWFpbDogXCJkZWNpbW9AZ21haWwuY29tXCIsXG4gIG5hbWU6IFwiTm9tYnJlIDEwXCIsXG4gIGxhc3ROYW1lOiBcIkFwZWxsaWRvIDFcIixcbiAgZGlzcGxheU5hbWU6IFwiRGlzcGxheSBOYW1lIDdcIixcbiAgZ3JvdXBJZDogMSxcbiAgYWN0aXZhdGU6IHRydWUsXG4gIGRyYXdXYXl0VG9NZTogZmFsc2Vcbn0pIl19