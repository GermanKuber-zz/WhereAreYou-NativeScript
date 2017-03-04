"use strict";
var core_1 = require("@angular/core");
var Observable_1 = require("rxjs/Observable");
require("rxjs/add/operator/do");
require("rxjs/add/operator/map");
var Subject_1 = require("rxjs/Subject");
var external_map_service_1 = require("../services/map/external-map.service");
var mark_manager_service_1 = require("../services/map/mark-manager.service");
var FriendsService = (function () {
    function FriendsService(externalMapService, markManagerService) {
        this.externalMapService = externalMapService;
        this.markManagerService = markManagerService;
        this.friendUpdate$ = new Subject_1.Subject();
        // Observable string sources
        this.friendsP = new Subject_1.Subject();
        // Observable string streams
        this.friends$ = this.friendsP.asObservable();
        this.friendUpdate$.next(mockListFriend);
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
        mark_manager_service_1.MarkManagerService])
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
    email: "primero@gmail.com",
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZnJpZW5kcy5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiZnJpZW5kcy5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxzQ0FBMkM7QUFDM0MsOENBQTZDO0FBQzdDLGdDQUE4QjtBQUM5QixpQ0FBK0I7QUFJL0Isd0NBQXVDO0FBQ3ZDLDZFQUFtSTtBQUNuSSw2RUFBMEU7QUFJMUUsSUFBYSxjQUFjO0lBR3pCLHdCQUFvQixrQkFBc0MsRUFDaEQsa0JBQXNDO1FBRDVCLHVCQUFrQixHQUFsQixrQkFBa0IsQ0FBb0I7UUFDaEQsdUJBQWtCLEdBQWxCLGtCQUFrQixDQUFvQjtRQUhoRCxrQkFBYSxHQUEyQixJQUFJLGlCQUFPLEVBQWlCLENBQUM7UUFVckUsNEJBQTRCO1FBQ3BCLGFBQVEsR0FBRyxJQUFJLGlCQUFPLEVBQVUsQ0FBQztRQUV6Qyw0QkFBNEI7UUFDNUIsYUFBUSxHQUF1QixJQUFJLENBQUMsUUFBUSxDQUFDLFlBQVksRUFBRSxDQUFDO1FBVjFELElBQUksQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxDQUFDO0lBRTFDLENBQUM7SUFVRCwyQkFBMkI7SUFDM0Isa0NBQVMsR0FBVCxVQUFVLE9BQWU7UUFDdkIsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUM7SUFDOUIsQ0FBQztJQUVELDBDQUFpQixHQUFqQixVQUFrQixFQUFVO1FBQzFCLE1BQU0sQ0FBQyx1QkFBVSxDQUFDLEVBQUUsQ0FBVyxjQUFjLENBQUMsQ0FBQztJQUNqRCxDQUFDO0lBRUQsc0NBQWEsR0FBYjtRQUNFLElBQUksTUFBTSxHQUFHLHVCQUFVLENBQUMsTUFBTSxDQUFDLFVBQUEsUUFBUTtZQUNyQyxRQUFRLENBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxDQUFDO1FBQ2hDLENBQUMsQ0FBQyxDQUFDO1FBQ0gsTUFBTSxDQUFDLE1BQU0sQ0FBQztJQUNoQixDQUFDO0lBQ0QscUNB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RSxDQUFDO0lBQ0wsS0FBSyxFQUFFLGtCQUFrQjtJQUN6QixJQUFJLEVBQUUsVUFBVTtJQUNoQixRQUFRLEVBQUUsWUFBWTtJQUN0QixXQUFXLEVBQUUsZ0JBQWdCO0lBQzdCLE9BQU8sRUFBRSxDQUFDO0lBQ1YsUUFBUSxFQUFFLElBQUk7SUFDZCxZQUFZLEVBQUUsS0FBSztDQUNwQixDQUFDLENBQUE7QUFDRixjQUFjLENBQUMsSUFBSSxDQUFTO0lBQzFCLEVBQUUsRUFBRSxDQUFDO0lBQ0wsS0FBSyxFQUFFLGtCQUFrQjtJQUN6QixJQUFJLEVBQUUsVUFBVTtJQUNoQixRQUFRLEVBQUUsWUFBWTtJQUN0QixXQUFXLEVBQUUsZ0JBQWdCO0lBQzdCLE9BQU8sRUFBRSxDQUFDO0lBQ1YsUUFBUSxFQUFFLElBQUk7SUFDZCxZQUFZLEVBQUUsS0FBSztDQUNwQixDQUFDLENBQUE7QUFDRixjQUFjLENBQUMsSUFBSSxDQUFTO0lBQzFCLEVBQUUsRUFBRSxFQUFFO0lBQ04sS0FBSyxFQUFFLGtCQUFrQjtJQUN6QixJQUFJLEVBQUUsV0FBVztJQUNqQixRQUFRLEVBQUUsWUFBWTtJQUN0QixXQUFXLEVBQUUsZ0JBQWdCO0lBQzdCLE9BQU8sRUFBRSxDQUFDO0lBQ1YsUUFBUSxFQUFFLElBQUk7SUFDZCxZQUFZLEVBQUUsS0FBSztDQUNwQixDQUFDLENBQUEiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcbmltcG9ydCB7IE9ic2VydmFibGUgfSBmcm9tICdyeGpzL09ic2VydmFibGUnO1xuaW1wb3J0IFwicnhqcy9hZGQvb3BlcmF0b3IvZG9cIjtcbmltcG9ydCBcInJ4anMvYWRkL29wZXJhdG9yL21hcFwiO1xuaW1wb3J0IHsgRnJpZW5kIH0gZnJvbSBcIi4vZnJpZW5kXCI7XG5pbXBvcnQgeyBldmVyeSB9IGZyb20gJ3J4anMvc3JjL29wZXJhdG9yL2V2ZXJ5JztcbmltcG9ydCB7IE9ic2VydmVyIH0gZnJvbSAncnhqcy9zcmMvT2JzZXJ2ZXInO1xuaW1wb3J0IHsgU3ViamVjdCB9IGZyb20gJ3J4anMvU3ViamVjdCc7XG5pbXBvcnQgeyBFeHRlcm5hbE1hcFNlcnZpY2UsIEdldERpc3RhbmNlUmVxdWVzdCwgRGlzdGFuY2VSZXF1ZXN0V3JhcHBlciwgV2F5TW9kZUVudW0gfSBmcm9tICcuLi9zZXJ2aWNlcy9tYXAvZXh0ZXJuYWwtbWFwLnNlcnZpY2UnO1xuaW1wb3J0IHsgTWFya01hbmFnZXJTZXJ2aWNlIH0gZnJvbSAnLi4vc2VydmljZXMvbWFwL21hcmstbWFuYWdlci5zZXJ2aWNlJztcblxuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgRnJpZW5kc1NlcnZpY2Uge1xuICBmcmllbmRVcGRhdGUkOiBTdWJqZWN0PEFycmF5PEZyaWVuZD4+ID0gbmV3IFN1YmplY3Q8QXJyYXk8RnJpZW5kPj4oKTtcblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIGV4dGVybmFsTWFwU2VydmljZTogRXh0ZXJuYWxNYXBTZXJ2aWNlLFxuICAgIHByaXZhdGUgbWFya01hbmFnZXJTZXJ2aWNlOiBNYXJrTWFuYWdlclNlcnZpY2UpIHtcbiAgICB0aGlzLmZyaWVuZFVwZGF0ZSQubmV4dChtb2NrTGlzdEZyaWVuZCk7XG5cbiAgfVxuXG5cblxuICAvLyBPYnNlcnZhYmxlIHN0cmluZyBzb3VyY2VzXG4gIHByaXZhdGUgZnJpZW5kc1AgPSBuZXcgU3ViamVjdDxGcmllbmQ+KCk7XG5cbiAgLy8gT2JzZXJ2YWJsZSBzdHJpbmcgc3RyZWFtc1xuICBmcmllbmRzJDogT2JzZXJ2YWJsZTxGcmllbmQ+ID0gdGhpcy5mcmllbmRzUC5hc09ic2VydmFibGUoKTtcblxuICAvLyBTZXJ2aWNlIG1lc3NhZ2UgY29tbWFuZHNcbiAgYWRkRnJpZW5kKG1pc3Npb246IEZyaWVuZCkge1xuICAgIHRoaXMuZnJpZW5kc1AubmV4dChtaXNzaW9uKTtcbiAgfVxuXG4gIGdldEZyaWVuZHNCeUdyb3VwKGlkOiBudW1iZXIpOiBPYnNlcnZhYmxlPEFycmF5PEZyaWVuZD4+IHtcbiAgICByZXR1cm4gT2JzZXJ2YWJsZS5vZjxGcmllbmRbXT4obW9ja0xpc3RGcmllbmQpO1xuICB9XG5cbiAgZ2V0QWxsRnJpZW5kcygpOiBPYnNlcnZhYmxlPEFycmF5PEZyaWVuZD4+IHtcbiAgICBsZXQgc291cmNlID0gT2JzZXJ2YWJsZS5jcmVhdGUob2JzZXJ2ZXIgPT4ge1xuICAgICAgb2JzZXJ2ZXIubmV4dChtb2NrTGlzdEZyaWVuZCk7XG4gICAgfSk7XG4gICAgcmV0dXJuIHNvdXJjZTtcbiAgfVxuICB1cGRhdGVGcmllbmQoZnJpZW5kOiBGcmllbmQpOiB2b2lkIHtcbiAgICB2YXIgaW5kZXggPSAwO1xuICAgIGZvciAodmFyIGl0ZW0gb2YgbW9ja0xpc3RGcmllbmQpIHtcbiAgICAgIGlmIChpdGVtLmlkID09IGZyaWVuZC5pZClcbiAgICAgICAgbW9ja0xpc3RGcmllbmRbaW5kZXhdID0gZnJpZW5kO1xuICAgICAgKytpbmRleDtcbiAgICB9XG4gICAgdGhpcy5mcmllbmRVcGRhdGUkLm5leHQobW9ja0xpc3RGcmllbmQpO1xuICB9XG4gIGRlbGV0ZUZyaWVuZChmcmllbmQ6IEZyaWVuZCk6IHZvaWQge1xuICAgIHZhciBpbmRleCA9IG1vY2tMaXN0RnJpZW5kLmluZGV4T2YoZnJpZW5kLCAwKTtcbiAgICBpZiAoaW5kZXggPiAtMSkge1xuICAgICAgbW9ja0xpc3RGcmllbmQuc3BsaWNlKGluZGV4LCAxKTtcbiAgICB9XG4gICAgdGhpcy5mcmllbmRVcGRhdGUkLm5leHQobW9ja0xpc3RGcmllbmQpO1xuICB9XG4gIGdldEZyaWVuZEJ5SWQoaWQ6IG51bWJlcik6IEZyaWVuZCB7XG4gICAgZm9yICh2YXIgZnJpZW5kIG9mIG1vY2tMaXN0RnJpZW5kKSB7XG4gICAgICBpZiAoZnJpZW5kLmlkID09IGlkKVxuICAgICAgICByZXR1cm4gZnJpZW5kO1xuICAgIH1cbiAgfVxuICBoYW5kbGVFcnJvcnMoZXJyb3I6IFJlc3BvbnNlKSB7XG4gICAgY29uc29sZS5sb2coSlNPTi5zdHJpbmdpZnkoZXJyb3IuanNvbigpKSk7XG4gICAgcmV0dXJuIE9ic2VydmFibGUudGhyb3coZXJyb3IpO1xuICB9XG4gIHVwZGF0ZURpc3RhbmNlQWxsRnJpZW5kcygpOiB2b2lkIHtcbiAgICBpZiAodGhpcy5tYXJrTWFuYWdlclNlcnZpY2UuaGFzTWUpIHtcbiAgICAgIHZhciBnZXREaXN0YW5jZSA9IG5ldyBHZXREaXN0YW5jZVJlcXVlc3QoKTtcbiAgICAgIGdldERpc3RhbmNlLm9yaWdpbiA9IHRoaXMubWFya01hbmFnZXJTZXJ2aWNlLm1lLnBvc2l0aW9uO1xuICAgICAgdGhpcy5tYXJrTWFuYWdlclNlcnZpY2UubWFya3NGcmllbmRzLmZvckVhY2goeCA9PiB7XG4gICAgICAgIHZhciBuZXdJdGVtID0gbmV3IERpc3RhbmNlUmVxdWVzdFdyYXBwZXIoeC5tYXJrSWQsIHgubWFyay5wb3NpdGlvbik7XG4gICAgICAgIGdldERpc3RhbmNlLmRlc3RpbmF0aW9uLnB1c2gobmV3SXRlbSk7XG4gICAgICB9KTtcbiAgICAgIHRoaXMuZXh0ZXJuYWxNYXBTZXJ2aWNlLmdldERpc3RhbmNlKGdldERpc3RhbmNlLCBXYXlNb2RlRW51bS5kcml2aW5nKVxuICAgICAgICAuc3Vic2NyaWJlKHggPT4ge1xuICAgICAgICAgIHguZGVzdGluYXRpb24uZm9yRWFjaCh4ID0+IHtcbiAgICAgICAgICAgIG1vY2tMaXN0RnJpZW5kLmZvckVhY2gocyA9PiB7XG4gICAgICAgICAgICAgIGlmIChzLmlkID09IHguaWQpIHtcbiAgICAgICAgICAgICAgICBzLmRpc3RhbmNlVG9NZSA9IHguZGlzdGFuY2U7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgIH0pO1xuICAgICAgICAgIHRoaXMuZnJpZW5kVXBkYXRlJC5uZXh0KG1vY2tMaXN0RnJpZW5kKTtcbiAgICAgICAgfSk7XG4gICAgfVxuICB9XG59XG5leHBvcnQgY2xhc3MgV3JhcHBlckluZm9ybWF0aW9uRnJpZW5kIHtcbiAgY29uc3RydWN0b3IocHVibGljIGZyaWVuZDogRnJpZW5kKSB7IH1cbn1cblxudmFyIG1vY2tMaXN0RnJpZW5kID0gbmV3IEFycmF5PEZyaWVuZD4oKTtcblxubW9ja0xpc3RGcmllbmQucHVzaCg8RnJpZW5kPntcbiAgaWQ6IDEsXG4gIGVtYWlsOiBcInByaW1lcm9AZ21haWwuY29tXCIsXG4gIG5hbWU6IFwiTm9tYnJlIDFcIixcbiAgbGFzdE5hbWU6IFwiQXBlbGxpZG8gMVwiLFxuICBkaXNwbGF5TmFtZTogXCJEaXNwbGF5IE5hbWUgMVwiLFxuICBncm91cElkOiAxLFxuICBhY3RpdmF0ZTogdHJ1ZSxcbiAgZHJhd1dheXRUb01lOiBmYWxzZVxufSlcbm1vY2tMaXN0RnJpZW5kLnB1c2goPEZyaWVuZD57XG4gIGlkOiAyLFxuICBlbWFpbDogXCJzZWd1bmRvQGdtYWlsLmNvbVwiLFxuICBuYW1lOiBcIk5vbWJyZSAyXCIsXG4gIGxhc3ROYW1lOiBcIkFwZWxsaWRvIDFcIixcbiAgZGlzcGxheU5hbWU6IFwiRGlzcGxheSBOYW1lIDJcIixcbiAgZ3JvdXBJZDogMSxcbiAgYWN0aXZhdGU6IGZhbHNlLFxuICBkcmF3V2F5dFRvTWU6IGZhbHNlXG59KVxubW9ja0xpc3RGcmllbmQucHVzaCg8RnJpZW5kPntcbiAgaWQ6IDMsXG4gIGVtYWlsOiBcInRlcmNlcm9AZ21haWwuY29tXCIsXG4gIG5hbWU6IFwiTm9tYnJlIDNcIixcbiAgbGFzdE5hbWU6IFwiQXBlbGxpZG8gMVwiLFxuICBkaXNwbGF5TmFtZTogXCJEaXNwbGF5IE5hbWUgM1wiLFxuICBncm91cElkOiAxLFxuICBhY3RpdmF0ZTogdHJ1ZSxcbiAgZHJhd1dheXRUb01lOiBmYWxzZVxufSlcbm1vY2tMaXN0RnJpZW5kLnB1c2goPEZyaWVuZD57XG4gIGlkOiA0LFxuICBlbWFpbDogXCJjdWFydG9AZ21haWwuY29tXCIsXG4gIG5hbWU6IFwiTm9tYnJlIDRcIixcbiAgbGFzdE5hbWU6IFwiQXBlbGxpZG8gMVwiLFxuICBkaXNwbGF5TmFtZTogXCJEaXNwbGF5IE5hbWUgNFwiLFxuICBncm91cElkOiAxLFxuICBhY3RpdmF0ZTogdHJ1ZSxcbiAgZHJhd1dheXRUb01lOiBmYWxzZVxufSlcbm1vY2tMaXN0RnJpZW5kLnB1c2goPEZyaWVuZD57XG4gIGlkOiA1LFxuICBlbWFpbDogXCJxdWludG9AZ21haWwuY29tXCIsXG4gIG5hbWU6IFwiTm9tYnJlIDVcIixcbiAgbGFzdE5hbWU6IFwiQXBlbGxpZG8gMVwiLFxuICBkaXNwbGF5TmFtZTogXCJEaXNwbGF5IE5hbWUgNVwiLFxuICBncm91cElkOiAxLFxuICBhY3RpdmF0ZTogdHJ1ZSxcbiAgZHJhd1dheXRUb01lOiBmYWxzZVxufSlcbm1vY2tMaXN0RnJpZW5kLnB1c2goPEZyaWVuZD57XG4gIGlkOiA2LFxuICBlbWFpbDogXCJzZXh0b0BnbWFpbC5jb21cIixcbiAgbmFtZTogXCJOb21icmUgNlwiLFxuICBsYXN0TmFtZTogXCJBcGVsbGlkbyAxXCIsXG4gIGRpc3BsYXlOYW1lOiBcIkRpc3BsYXkgTmFtZSA2XCIsXG4gIGdyb3VwSWQ6IDEsXG4gIGFjdGl2YXRlOiB0cnVlLFxuICBkcmF3V2F5dFRvTWU6IGZhbHNlXG59KVxubW9ja0xpc3RGcmllbmQucHVzaCg8RnJpZW5kPntcbiAgaWQ6IDcsXG4gIGVtYWlsOiBcInNlcHRpbW9AZ21haWwuY29tXCIsXG4gIG5hbWU6IFwiTm9tYnJlIDdcIixcbiAgbGFzdE5hbWU6IFwiQXBlbGxpZG8gMVwiLFxuICBkaXNwbGF5TmFtZTogXCJEaXNwbGF5IE5hbWUgN1wiLFxuICBncm91cElkOiAxLFxuICBhY3RpdmF0ZTogdHJ1ZSxcbiAgZHJhd1dheXRUb01lOiBmYWxzZVxufSlcbm1vY2tMaXN0RnJpZW5kLnB1c2goPEZyaWVuZD57XG4gIGlkOiA4LFxuICBlbWFpbDogXCJvY3Rhdm9AZ21haWwuY29tXCIsXG4gIG5hbWU6IFwiTm9tYnJlIDhcIixcbiAgbGFzdE5hbWU6IFwiQXBlbGxpZG8gMVwiLFxuICBkaXNwbGF5TmFtZTogXCJEaXNwbGF5IE5hbWUgN1wiLFxuICBncm91cElkOiAxLFxuICBhY3RpdmF0ZTogdHJ1ZSxcbiAgZHJhd1dheXRUb01lOiBmYWxzZVxufSlcbm1vY2tMaXN0RnJpZW5kLnB1c2goPEZyaWVuZD57XG4gIGlkOiA5LFxuICBlbWFpbDogXCJub3Zlbm9AZ21haWwuY29tXCIsXG4gIG5hbWU6IFwiTm9tYnJlIDlcIixcbiAgbGFzdE5hbWU6IFwiQXBlbGxpZG8gMVwiLFxuICBkaXNwbGF5TmFtZTogXCJEaXNwbGF5IE5hbWUgN1wiLFxuICBncm91cElkOiAxLFxuICBhY3RpdmF0ZTogdHJ1ZSxcbiAgZHJhd1dheXRUb01lOiBmYWxzZVxufSlcbm1vY2tMaXN0RnJpZW5kLnB1c2goPEZyaWVuZD57XG4gIGlkOiAxMCxcbiAgZW1haWw6IFwiZGVjaW1vQGdtYWlsLmNvbVwiLFxuICBuYW1lOiBcIk5vbWJyZSAxMFwiLFxuICBsYXN0TmFtZTogXCJBcGVsbGlkbyAxXCIsXG4gIGRpc3BsYXlOYW1lOiBcIkRpc3BsYXkgTmFtZSA3XCIsXG4gIGdyb3VwSWQ6IDEsXG4gIGFjdGl2YXRlOiB0cnVlLFxuICBkcmF3V2F5dFRvTWU6IGZhbHNlXG59KSJdfQ==