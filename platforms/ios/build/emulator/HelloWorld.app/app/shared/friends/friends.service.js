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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZnJpZW5kcy5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiZnJpZW5kcy5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxzQ0FBMkM7QUFDM0MsOENBQTZDO0FBQzdDLGdDQUE4QjtBQUM5QixpQ0FBK0I7QUFJL0Isd0NBQXVDO0FBQ3ZDLDZFQUFtSTtBQUNuSSw2RUFBMEU7QUFDMUUseURBQXVEO0FBSXZELElBQWEsY0FBYztJQUd6Qix3QkFBb0Isa0JBQXNDLEVBQ2hELGtCQUFzQyxFQUN0QyxhQUE0QjtRQUZsQix1QkFBa0IsR0FBbEIsa0JBQWtCLENBQW9CO1FBQ2hELHVCQUFrQixHQUFsQixrQkFBa0IsQ0FBb0I7UUFDdEMsa0JBQWEsR0FBYixhQUFhLENBQWU7UUFKdEMsa0JBQWEsR0FBMkIsSUFBSSxpQkFBTyxFQUFpQixDQUFDO1FBS25FLElBQUksQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxDQUFDO0lBRTFDLENBQUM7SUFFRCwyQkFBMkI7SUFDM0Isa0NBQVMsR0FBVCxVQUFVLE1BQWM7UUFBeEIsaUJBVUM7UUFUQyxJQUFJLE1BQU0sR0FBRyx1QkFBVSxDQUFDLE1BQU0sQ0FBQyxVQUFBLFFBQVE7WUFDckMsSUFBSSxFQUFFLEdBQUcsS0FBSSxDQUFDLGFBQWEsQ0FBQyxFQUFFLENBQUM7WUFDL0IsRUFBRSxDQUFDLENBQUMsTUFBTSxDQUFDLEVBQUUsSUFBSSxDQUFDLElBQUksTUFBTSxDQUFDLEVBQUUsSUFBSSxJQUFJLENBQUM7Z0JBQ3RDLE1BQU0sQ0FBQyxFQUFFLEdBQUcsY0FBYyxDQUFDLGNBQWMsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDLENBQUMsRUFBRSxHQUFHLENBQUMsQ0FBQztZQUMvRCxjQUFjLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1lBQzVCLEtBQUksQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxDQUFDO1lBQ3hDLFFBQVEs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S0FBSyxFQUFFLGtCQUFrQjtJQUN6QixJQUFJLEVBQUUsVUFBVTtJQUNoQixRQUFRLEVBQUUsWUFBWTtJQUN0QixXQUFXLEVBQUUsZ0JBQWdCO0lBQzdCLE9BQU8sRUFBRSxDQUFDO0lBQ1YsUUFBUSxFQUFFLElBQUk7SUFDZCxZQUFZLEVBQUUsS0FBSztDQUNwQixDQUFDLENBQUE7QUFDRixjQUFjLENBQUMsSUFBSSxDQUFTO0lBQzFCLEVBQUUsRUFBRSxDQUFDO0lBQ0wsS0FBSyxFQUFFLGtCQUFrQjtJQUN6QixJQUFJLEVBQUUsVUFBVTtJQUNoQixRQUFRLEVBQUUsWUFBWTtJQUN0QixXQUFXLEVBQUUsZ0JBQWdCO0lBQzdCLE9BQU8sRUFBRSxDQUFDO0lBQ1YsUUFBUSxFQUFFLElBQUk7SUFDZCxZQUFZLEVBQUUsS0FBSztDQUNwQixDQUFDLENBQUE7QUFDRixjQUFjLENBQUMsSUFBSSxDQUFTO0lBQzFCLEVBQUUsRUFBRSxFQUFFO0lBQ04sS0FBSyxFQUFFLGtCQUFrQjtJQUN6QixJQUFJLEVBQUUsV0FBVztJQUNqQixRQUFRLEVBQUUsWUFBWTtJQUN0QixXQUFXLEVBQUUsZ0JBQWdCO0lBQzdCLE9BQU8sRUFBRSxDQUFDO0lBQ1YsUUFBUSxFQUFFLElBQUk7SUFDZCxZQUFZLEVBQUUsS0FBSztDQUNwQixDQUFDLENBQUEiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcbmltcG9ydCB7IE9ic2VydmFibGUgfSBmcm9tICdyeGpzL09ic2VydmFibGUnO1xuaW1wb3J0IFwicnhqcy9hZGQvb3BlcmF0b3IvZG9cIjtcbmltcG9ydCBcInJ4anMvYWRkL29wZXJhdG9yL21hcFwiO1xuaW1wb3J0IHsgRnJpZW5kIH0gZnJvbSBcIi4vZnJpZW5kXCI7XG5pbXBvcnQgeyBldmVyeSB9IGZyb20gJ3J4anMvc3JjL29wZXJhdG9yL2V2ZXJ5JztcbmltcG9ydCB7IE9ic2VydmVyIH0gZnJvbSAncnhqcy9zcmMvT2JzZXJ2ZXInO1xuaW1wb3J0IHsgU3ViamVjdCB9IGZyb20gJ3J4anMvU3ViamVjdCc7XG5pbXBvcnQgeyBFeHRlcm5hbE1hcFNlcnZpY2UsIEdldERpc3RhbmNlUmVxdWVzdCwgRGlzdGFuY2VSZXF1ZXN0V3JhcHBlciwgV2F5TW9kZUVudW0gfSBmcm9tICcuLi9zZXJ2aWNlcy9tYXAvZXh0ZXJuYWwtbWFwLnNlcnZpY2UnO1xuaW1wb3J0IHsgTWFya01hbmFnZXJTZXJ2aWNlIH0gZnJvbSAnLi4vc2VydmljZXMvbWFwL21hcmstbWFuYWdlci5zZXJ2aWNlJztcbmltcG9ydCB7IExvZ2dlZFNlcnZpY2UgfSBmcm9tICcuLi91c2VyL2xvZ2dlZC5zZXJ2aWNlJztcblxuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgRnJpZW5kc1NlcnZpY2Uge1xuICBmcmllbmRVcGRhdGUkOiBTdWJqZWN0PEFycmF5PEZyaWVuZD4+ID0gbmV3IFN1YmplY3Q8QXJyYXk8RnJpZW5kPj4oKTtcblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIGV4dGVybmFsTWFwU2VydmljZTogRXh0ZXJuYWxNYXBTZXJ2aWNlLFxuICAgIHByaXZhdGUgbWFya01hbmFnZXJTZXJ2aWNlOiBNYXJrTWFuYWdlclNlcnZpY2UsXG4gICAgcHJpdmF0ZSBsb2dnZWRTZXJ2aWNlOiBMb2dnZWRTZXJ2aWNlKSB7XG4gICAgdGhpcy5mcmllbmRVcGRhdGUkLm5leHQobW9ja0xpc3RGcmllbmQpO1xuXG4gIH1cblxuICAvLyBTZXJ2aWNlIG1lc3NhZ2UgY29tbWFuZHNcbiAgYWRkRnJpZW5kKGZyaWVuZDogRnJpZW5kKTogT2JzZXJ2YWJsZTxib29sZWFuPiB7XG4gICAgbGV0IHNvdXJjZSA9IE9ic2VydmFibGUuY3JlYXRlKG9ic2VydmVyID0+IHtcbiAgICAgIHZhciBtZSA9IHRoaXMubG9nZ2VkU2VydmljZS5tZTtcbiAgICAgIGlmIChmcmllbmQuaWQgPT0gMCB8fCBmcmllbmQuaWQgPT0gbnVsbClcbiAgICAgICAgZnJpZW5kLmlkID0gbW9ja0xpc3RGcmllbmRbbW9ja0xpc3RGcmllbmQubGVuZ3RoIC0gMV0uaWQgKyAxO1xuICAgICAgbW9ja0xpc3RGcmllbmQucHVzaChmcmllbmQpO1xuICAgICAgdGhpcy5mcmllbmRVcGRhdGUkLm5leHQobW9ja0xpc3RGcmllbmQpO1xuICAgICAgb2JzZXJ2ZXIubmV4dCh0cnVlKTtcbiAgICB9KTtcbiAgICByZXR1cm4gc291cmNlO1xuICB9XG5cbiAgZ2V0RnJpZW5kc0J5R3JvdXAoaWQ6IG51bWJlcik6IE9ic2VydmFibGU8QXJyYXk8RnJpZW5kPj4ge1xuICAgIHJldHVybiBPYnNlcnZhYmxlLm9mPEZyaWVuZFtdPihtb2NrTGlzdEZyaWVuZCk7XG4gIH1cblxuICBnZXRBbGxGcmllbmRzKCk6IE9ic2VydmFibGU8QXJyYXk8RnJpZW5kPj4ge1xuICAgIGxldCBzb3VyY2UgPSBPYnNlcnZhYmxlLmNyZWF0ZShvYnNlcnZlciA9PiB7XG4gICAgICBvYnNlcnZlci5uZXh0KG1vY2tMaXN0RnJpZW5kKTtcbiAgICB9KTtcbiAgICByZXR1cm4gc291cmNlO1xuICB9XG4gIHVwZGF0ZUZyaWVuZChmcmllbmQ6IEZyaWVuZCk6IHZvaWQge1xuICAgIHZhciBpbmRleCA9IDA7XG4gICAgZm9yICh2YXIgaXRlbSBvZiBtb2NrTGlzdEZyaWVuZCkge1xuICAgICAgaWYgKGl0ZW0uaWQgPT0gZnJpZW5kLmlkKVxuICAgICAgICBtb2NrTGlzdEZyaWVuZFtpbmRleF0gPSBmcmllbmQ7XG4gICAgICArK2luZGV4O1xuICAgIH1cbiAgICB0aGlzLmZyaWVuZFVwZGF0ZSQubmV4dChtb2NrTGlzdEZyaWVuZCk7XG4gIH1cbiAgZGVsZXRlRnJpZW5kKGZyaWVuZDogRnJpZW5kKTogdm9pZCB7XG4gICAgdmFyIGluZGV4ID0gbW9ja0xpc3RGcmllbmQuaW5kZXhPZihmcmllbmQsIDApO1xuICAgIGlmIChpbmRleCA+IC0xKSB7XG4gICAgICBtb2NrTGlzdEZyaWVuZC5zcGxpY2UoaW5kZXgsIDEpO1xuICAgIH1cbiAgICB0aGlzLmZyaWVuZFVwZGF0ZSQubmV4dChtb2NrTGlzdEZyaWVuZCk7XG4gIH1cbiAgZ2V0RnJpZW5kQnlJZChpZDogbnVtYmVyKTogRnJpZW5kIHtcbiAgICBmb3IgKHZhciBmcmllbmQgb2YgbW9ja0xpc3RGcmllbmQpIHtcbiAgICAgIGlmIChmcmllbmQuaWQgPT0gaWQpXG4gICAgICAgIHJldHVybiBmcmllbmQ7XG4gICAgfVxuICB9XG4gIGdldEZyaWVuZEJ5SUVtYWlsKGVtYWlsOiBzdHJpbmcpOiBPYnNlcnZhYmxlPEZyaWVuZD4ge1xuICAgIGxldCBzb3VyY2UgPSBPYnNlcnZhYmxlLmNyZWF0ZShvYnNlcnZlciA9PiB7XG4gICAgICB2YXIgZmluZCA9IGZhbHNlO1xuICAgICAgZm9yICh2YXIgZnJpZW5kIG9mIG1vY2tMaXN0RnJpZW5kKSB7XG4gICAgICAgIGlmIChmcmllbmQuZW1haWwudG9VcHBlckNhc2UoKSA9PSBlbWFpbC50b1VwcGVyQ2FzZSgpKSB7XG4gICAgICAgICAgZmluZCA9IHRydWU7XG4gICAgICAgICAgb2JzZXJ2ZXIubmV4dChmcmllbmQpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICBpZiAoIWZpbmQpXG4gICAgICAgIG9ic2VydmVyLmVycm9yKFwiTm8gc2UgZW5jb250cm8gbmluZ3VuIGFtaWdvIGNvbiBlc2Ugbm9tYnJlXCIpXG4gICAgfSk7XG4gICAgcmV0dXJuIHNvdXJjZTtcbiAgfVxuICBoYW5kbGVFcnJvcnMoZXJyb3I6IFJlc3BvbnNlKSB7XG4gICAgY29uc29sZS5sb2coSlNPTi5zdHJpbmdpZnkoZXJyb3IuanNvbigpKSk7XG4gICAgcmV0dXJuIE9ic2VydmFibGUudGhyb3coZXJyb3IpO1xuICB9XG4gIHVwZGF0ZURpc3RhbmNlQWxsRnJpZW5kcygpOiB2b2lkIHtcbiAgICBpZiAodGhpcy5tYXJrTWFuYWdlclNlcnZpY2UuaGFzTWUpIHtcbiAgICAgIHZhciBnZXREaXN0YW5jZSA9IG5ldyBHZXREaXN0YW5jZVJlcXVlc3QoKTtcbiAgICAgIGdldERpc3RhbmNlLm9yaWdpbiA9IHRoaXMubWFya01hbmFnZXJTZXJ2aWNlLm1lLnBvc2l0aW9uO1xuICAgICAgdGhpcy5tYXJrTWFuYWdlclNlcnZpY2UubWFya3NGcmllbmRzLmZvckVhY2goeCA9PiB7XG4gICAgICAgIHZhciBuZXdJdGVtID0gbmV3IERpc3RhbmNlUmVxdWVzdFdyYXBwZXIoeC5tYXJrSWQsIHgubWFyay5wb3NpdGlvbik7XG4gICAgICAgIGdldERpc3RhbmNlLmRlc3RpbmF0aW9uLnB1c2gobmV3SXRlbSk7XG4gICAgICB9KTtcblxuICAgICAgdGhpcy5leHRlcm5hbE1hcFNlcnZpY2UuZ2V0RGlzdGFuY2UoZ2V0RGlzdGFuY2UsIFdheU1vZGVFbnVtLmRyaXZpbmcpXG4gICAgICAgIC5zdWJzY3JpYmUoeCA9PiB7XG4gICAgICAgICAgeC5kZXN0aW5hdGlvbi5mb3JFYWNoKHggPT4ge1xuICAgICAgICAgICAgbW9ja0xpc3RGcmllbmQuZm9yRWFjaChzID0+IHtcbiAgICAgICAgICAgICAgaWYgKHMuaWQgPT0geC5pZCkge1xuICAgICAgICAgICAgICAgIHMuZGlzdGFuY2VUb01lID0geC5kaXN0YW5jZTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgfSk7XG4gICAgICAgICAgdGhpcy5mcmllbmRVcGRhdGUkLm5leHQobW9ja0xpc3RGcmllbmQpO1xuICAgICAgICB9KTtcbiAgICB9XG4gIH1cbn1cbmV4cG9ydCBjbGFzcyBXcmFwcGVySW5mb3JtYXRpb25GcmllbmQge1xuICBjb25zdHJ1Y3RvcihwdWJsaWMgZnJpZW5kOiBGcmllbmQpIHsgfVxufVxuXG52YXIgbW9ja0xpc3RGcmllbmQgPSBuZXcgQXJyYXk8RnJpZW5kPigpO1xuXG5tb2NrTGlzdEZyaWVuZC5wdXNoKDxGcmllbmQ+e1xuICBpZDogMSxcbiAgZW1haWw6IFwicEBwLnBcIixcbiAgaW1hZ2U6IFwiaHR0cHM6Ly9wYnMudHdpbWcuY29tL3Byb2ZpbGVfaW1hZ2VzLzE3MTc5NTY0MzEvQlAtaGVhZHNob3QtZmItcHJvZmlsZS1waG90b180MDB4NDAwLmpwZ1wiLFxuICBuYW1lOiBcIk5vbWJyZSAxXCIsXG4gIGxhc3ROYW1lOiBcIkFwZWxsaWRvIDFcIixcbiAgZGlzcGxheU5hbWU6IFwiRGlzcGxheSBOYW1lIDFcIixcbiAgZ3JvdXBJZDogMSxcbiAgYWN0aXZhdGU6IHRydWUsXG4gIGRyYXdXYXl0VG9NZTogZmFsc2Vcbn0pXG5tb2NrTGlzdEZyaWVuZC5wdXNoKDxGcmllbmQ+e1xuICBpZDogMixcbiAgZW1haWw6IFwic2VndW5kb0BnbWFpbC5jb21cIixcbiAgbmFtZTogXCJOb21icmUgMlwiLFxuICBsYXN0TmFtZTogXCJBcGVsbGlkbyAxXCIsXG4gIGRpc3BsYXlOYW1lOiBcIkRpc3BsYXkgTmFtZSAyXCIsXG4gIGdyb3VwSWQ6IDEsXG4gIGFjdGl2YXRlOiBmYWxzZSxcbiAgZHJhd1dheXRUb01lOiBmYWxzZVxufSlcbm1vY2tMaXN0RnJpZW5kLnB1c2goPEZyaWVuZD57XG4gIGlkOiAzLFxuICBlbWFpbDogXCJ0ZXJjZXJvQGdtYWlsLmNvbVwiLFxuICBuYW1lOiBcIk5vbWJyZSAzXCIsXG4gIGxhc3ROYW1lOiBcIkFwZWxsaWRvIDFcIixcbiAgZGlzcGxheU5hbWU6IFwiRGlzcGxheSBOYW1lIDNcIixcbiAgZ3JvdXBJZDogMSxcbiAgYWN0aXZhdGU6IHRydWUsXG4gIGRyYXdXYXl0VG9NZTogZmFsc2Vcbn0pXG5tb2NrTGlzdEZyaWVuZC5wdXNoKDxGcmllbmQ+e1xuICBpZDogNCxcbiAgZW1haWw6IFwiY3VhcnRvQGdtYWlsLmNvbVwiLFxuICBuYW1lOiBcIk5vbWJyZSA0XCIsXG4gIGxhc3ROYW1lOiBcIkFwZWxsaWRvIDFcIixcbiAgZGlzcGxheU5hbWU6IFwiRGlzcGxheSBOYW1lIDRcIixcbiAgZ3JvdXBJZDogMSxcbiAgYWN0aXZhdGU6IHRydWUsXG4gIGRyYXdXYXl0VG9NZTogZmFsc2Vcbn0pXG5tb2NrTGlzdEZyaWVuZC5wdXNoKDxGcmllbmQ+e1xuICBpZDogNSxcbiAgZW1haWw6IFwicXVpbnRvQGdtYWlsLmNvbVwiLFxuICBuYW1lOiBcIk5vbWJyZSA1XCIsXG4gIGxhc3ROYW1lOiBcIkFwZWxsaWRvIDFcIixcbiAgZGlzcGxheU5hbWU6IFwiRGlzcGxheSBOYW1lIDVcIixcbiAgZ3JvdXBJZDogMSxcbiAgYWN0aXZhdGU6IHRydWUsXG4gIGRyYXdXYXl0VG9NZTogZmFsc2Vcbn0pXG5tb2NrTGlzdEZyaWVuZC5wdXNoKDxGcmllbmQ+e1xuICBpZDogNixcbiAgZW1haWw6IFwic2V4dG9AZ21haWwuY29tXCIsXG4gIG5hbWU6IFwiTm9tYnJlIDZcIixcbiAgbGFzdE5hbWU6IFwiQXBlbGxpZG8gMVwiLFxuICBkaXNwbGF5TmFtZTogXCJEaXNwbGF5IE5hbWUgNlwiLFxuICBncm91cElkOiAxLFxuICBhY3RpdmF0ZTogdHJ1ZSxcbiAgZHJhd1dheXRUb01lOiBmYWxzZVxufSlcbm1vY2tMaXN0RnJpZW5kLnB1c2goPEZyaWVuZD57XG4gIGlkOiA3LFxuICBlbWFpbDogXCJzZXB0aW1vQGdtYWlsLmNvbVwiLFxuICBuYW1lOiBcIk5vbWJyZSA3XCIsXG4gIGxhc3ROYW1lOiBcIkFwZWxsaWRvIDFcIixcbiAgZGlzcGxheU5hbWU6IFwiRGlzcGxheSBOYW1lIDdcIixcbiAgZ3JvdXBJZDogMSxcbiAgYWN0aXZhdGU6IHRydWUsXG4gIGRyYXdXYXl0VG9NZTogZmFsc2Vcbn0pXG5tb2NrTGlzdEZyaWVuZC5wdXNoKDxGcmllbmQ+e1xuICBpZDogOCxcbiAgZW1haWw6IFwib2N0YXZvQGdtYWlsLmNvbVwiLFxuICBuYW1lOiBcIk5vbWJyZSA4XCIsXG4gIGxhc3ROYW1lOiBcIkFwZWxsaWRvIDFcIixcbiAgZGlzcGxheU5hbWU6IFwiRGlzcGxheSBOYW1lIDdcIixcbiAgZ3JvdXBJZDogMSxcbiAgYWN0aXZhdGU6IHRydWUsXG4gIGRyYXdXYXl0VG9NZTogZmFsc2Vcbn0pXG5tb2NrTGlzdEZyaWVuZC5wdXNoKDxGcmllbmQ+e1xuICBpZDogOSxcbiAgZW1haWw6IFwibm92ZW5vQGdtYWlsLmNvbVwiLFxuICBuYW1lOiBcIk5vbWJyZSA5XCIsXG4gIGxhc3ROYW1lOiBcIkFwZWxsaWRvIDFcIixcbiAgZGlzcGxheU5hbWU6IFwiRGlzcGxheSBOYW1lIDdcIixcbiAgZ3JvdXBJZDogMSxcbiAgYWN0aXZhdGU6IHRydWUsXG4gIGRyYXdXYXl0VG9NZTogZmFsc2Vcbn0pXG5tb2NrTGlzdEZyaWVuZC5wdXNoKDxGcmllbmQ+e1xuICBpZDogMTAsXG4gIGVtYWlsOiBcImRlY2ltb0BnbWFpbC5jb21cIixcbiAgbmFtZTogXCJOb21icmUgMTBcIixcbiAgbGFzdE5hbWU6IFwiQXBlbGxpZG8gMVwiLFxuICBkaXNwbGF5TmFtZTogXCJEaXNwbGF5IE5hbWUgN1wiLFxuICBncm91cElkOiAxLFxuICBhY3RpdmF0ZTogdHJ1ZSxcbiAgZHJhd1dheXRUb01lOiBmYWxzZVxufSkiXX0=