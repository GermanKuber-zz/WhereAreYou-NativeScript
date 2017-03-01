"use strict";
var core_1 = require("@angular/core");
var element_registry_1 = require("nativescript-angular/element-registry");
var nativescript_google_maps_sdk_1 = require("nativescript-google-maps-sdk");
var friends_lives_service_1 = require("../../shared/friends/friends-lives.service");
var map_view_service_1 = require("../../shared/services/map/map-view.service");
var friends_service_1 = require("../../shared/friends/friends.service");
element_registry_1.registerElement('MapView', function () { return nativescript_google_maps_sdk_1.MapView; });
var FriendsMapComponent = (function () {
    function FriendsMapComponent(friendsService, friendsLiveService, mapViewService) {
        this.friendsService = friendsService;
        this.friendsLiveService = friendsLiveService;
        this.mapViewService = mapViewService;
        // this.friends = new Array<FriendPosition>();
    }
    FriendsMapComponent.prototype.onMapReady = function (event) {
        var _this = this;
        if (!event.object)
            return;
        this.mapViewService.onMapReady(event, function () { return _this.mapReadyNotify(); });
    };
    FriendsMapComponent.prototype.mapReadyNotify = function () {
        this.friendsList = new Array();
        this.getFriends();
        this.subscribeFriendLocationUpdate();
        this.friendsService.getAllFriends().subscribe(function (x) {
            x.forEach(function (s) {
                if (!s.activate) {
                }
            });
        });
    };
    FriendsMapComponent.prototype.ngOnInit = function () {
    };
    FriendsMapComponent.prototype.updateFriendLocation = function (friend) {
        var newMarkFriend = this.createMark(friend);
        if (newMarkFriend != null)
            this.mapViewService.updateCommonMark(newMarkFriend[0], newMarkFriend[1].id);
    };
    FriendsMapComponent.prototype.subscribeFriendLocationUpdate = function () {
        var _this = this;
        //Me suscribo al metodo de actualizacion para obtener actualizacion de ubicacion de mis amigos
        this.friendsLiveService.getFriendsLocations().subscribe(function (f) {
            _this.updateFriendLocation(f);
        });
    };
    FriendsMapComponent.prototype.getFriends = function () {
        var _this = this;
        //Obtengo todos los amigos conectados por grupo y los dibujo en el mapa
        this.friendsLiveService.getFriendsByGroup(1).subscribe(function (friendsPosition) {
            for (var _i = 0, friendsPosition_1 = friendsPosition; _i < friendsPosition_1.length; _i++) {
                var item = friendsPosition_1[_i];
                var newMarkFriend = _this.createMark(item);
                if (newMarkFriend != null)
                    _this.mapViewService.addCommonMark(newMarkFriend[0], newMarkFriend[1].id);
            }
        });
    };
    FriendsMapComponent.prototype.createMark = function (position) {
        var mark = new map_view_service_1.AddMarkerArgs();
        var friend = this.friendsService.getFriendById(position.id);
        if (friend != null && friend.activate) {
            mark.title = friend.displayName;
            mark.location = new nativescript_google_maps_sdk_1.Position();
            mark.location.latitude = position.latitude;
            mark.location.longitude = position.longitude;
            return [mark, friend];
        }
        else {
            return null;
        }
    };
    return FriendsMapComponent;
}());
FriendsMapComponent = __decorate([
    core_1.Component({
        selector: "friends-map",
        templateUrl: "widgets/friends-map/friends-map.html",
        styleUrls: ["widgets/friends-map/friends-map-common.css", "widgets/friends-map/friends-map.css"],
        providers: [friends_lives_service_1.FriendsLiveService, map_view_service_1.MapViewService]
    }),
    __metadata("design:paramtypes", [friends_service_1.FriendsService,
        friends_lives_service_1.FriendsLiveService,
        map_view_service_1.MapViewService])
], FriendsMapComponent);
exports.FriendsMapComponent = FriendsMapComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZnJpZW5kcy1tYXAuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiZnJpZW5kcy1tYXAuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxzQ0FBNEU7QUFDNUUsMEVBQXdFO0FBQ3hFLDZFQUFtRjtBQUduRixvRkFBZ0Y7QUFHaEYsK0VBQTJGO0FBQzNGLHdFQUFzRTtBQUd0RSxrQ0FBZSxDQUFDLFNBQVMsRUFBRSxjQUFNLE9BQUEsc0NBQU8sRUFBUCxDQUFPLENBQUMsQ0FBQztBQVExQyxJQUFhLG1CQUFtQjtJQUs5Qiw2QkFBb0IsY0FBOEIsRUFDeEMsa0JBQXNDLEVBRXRDLGNBQThCO1FBSHBCLG1CQUFjLEdBQWQsY0FBYyxDQUFnQjtRQUN4Qyx1QkFBa0IsR0FBbEIsa0JBQWtCLENBQW9CO1FBRXRDLG1CQUFjLEdBQWQsY0FBYyxDQUFnQjtRQUN0Qyw4Q0FBOEM7SUFDaEQsQ0FBQztJQUVELHdDQUFVLEdBQVYsVUFBVyxLQUFLO1FBQWhCLGlCQUlDO1FBSEMsRUFBRSxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDO1lBQUMsTUFBTSxDQUFDO1FBQzFCLElBQUksQ0FBQyxjQUFjLENBQUMsVUFBVSxDQUFDLEtBQUssRUFBRSxjQUFNLE9BQUEsS0FBSSxDQUFDLGNBQWMsRUFBRSxFQUFyQixDQUFxQixDQUFDLENBQUM7SUFFckUsQ0FBQztJQUNPLDRDQUFjLEdBQXRCO1FBQ0UsSUFBSSxDQUFDLFdBQVcsR0FBRyxJQUFJLEtBQUssRUFBVSxDQUFDO1FBRXZDLElBQUksQ0FBQyxVQUFVLEVBQUUsQ0FBQztRQUNsQixJQUFJLENBQUMsNkJBQTZCLEVBQUUsQ0FBQztRQUNyQyxJQUFJLENBQUMsY0FBYyxDQUFDLGFBQWEsRUFBRSxDQUFDLFNBQVMsQ0FBQyxVQUFBLENBQUM7WUFDN0MsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxVQUFBLENBQUM7Z0JBQ1QsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFD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bnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBWaWV3Q2hpbGQsIEFmdGVyVmlld0luaXQsIE9uSW5pdCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgcmVnaXN0ZXJFbGVtZW50IH0gZnJvbSAnbmF0aXZlc2NyaXB0LWFuZ3VsYXIvZWxlbWVudC1yZWdpc3RyeSc7XG5pbXBvcnQgeyBNYXBWaWV3LCBNYXJrZXIsIFBvbHlsaW5lLCBQb3NpdGlvbiB9IGZyb20gJ25hdGl2ZXNjcmlwdC1nb29nbGUtbWFwcy1zZGsnO1xuaW1wb3J0IHNpZGVEcmF3ZXJNb2R1bGUgPSByZXF1aXJlKCduYXRpdmVzY3JpcHQtdGVsZXJpay11aS9zaWRlZHJhd2VyJyk7XG5pbXBvcnQgeyBSYWRTaWRlRHJhd2VyQ29tcG9uZW50LCBTaWRlRHJhd2VyVHlwZSB9IGZyb20gJ25hdGl2ZXNjcmlwdC10ZWxlcmlrLXVpL3NpZGVkcmF3ZXIvYW5ndWxhcic7XG5pbXBvcnQgeyBGcmllbmRzTGl2ZVNlcnZpY2UgfSBmcm9tICcuLi8uLi9zaGFyZWQvZnJpZW5kcy9mcmllbmRzLWxpdmVzLnNlcnZpY2UnO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSB9IGZyb20gJy4uLy4uLy4uL3BsYXRmb3Jtcy9pb3MvYnVpbGQvZW11bGF0b3IvSGVsbG9Xb3JsZC5hcHAvYXBwL3Ruc19tb2R1bGVzL3J4anMvc3JjL09ic2VydmFibGUnO1xuaW1wb3J0IHsgRnJpZW5kUG9zaXRpb24sIEZyaWVuZCB9IGZyb20gJy4uLy4uL3NoYXJlZC9mcmllbmRzL2ZyaWVuZCc7XG5pbXBvcnQgeyBNYXBWaWV3U2VydmljZSwgQWRkTWFya2VyQXJncyB9IGZyb20gJy4uLy4uL3NoYXJlZC9zZXJ2aWNlcy9tYXAvbWFwLXZpZXcuc2VydmljZSc7XG5pbXBvcnQgeyBGcmllbmRzU2VydmljZSB9IGZyb20gJy4uLy4uL3NoYXJlZC9mcmllbmRzL2ZyaWVuZHMuc2VydmljZSc7XG5cblxucmVnaXN0ZXJFbGVtZW50KCdNYXBWaWV3JywgKCkgPT4gTWFwVmlldyk7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogXCJmcmllbmRzLW1hcFwiLFxuICB0ZW1wbGF0ZVVybDogXCJ3aWRnZXRzL2ZyaWVuZHMtbWFwL2ZyaWVuZHMtbWFwLmh0bWxcIixcbiAgc3R5bGVVcmxzOiBbXCJ3aWRnZXRzL2ZyaWVuZHMtbWFwL2ZyaWVuZHMtbWFwLWNvbW1vbi5jc3NcIiwgXCJ3aWRnZXRzL2ZyaWVuZHMtbWFwL2ZyaWVuZHMtbWFwLmNzc1wiXSxcbiAgcHJvdmlkZXJzOiBbRnJpZW5kc0xpdmVTZXJ2aWNlLCBNYXBWaWV3U2VydmljZV1cbn0pXG5leHBvcnQgY2xhc3MgRnJpZW5kc01hcENvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XG4gIC8vI0FtaWdvc1xuICAvLyBwdWJsaWMgZnJpZW5kczogQXJyYXk8RnJpZW5kUG9zaXRpb24+O1xuICBwcml2YXRlIGZyaWVuZHNMaXN0OiBBcnJheTxGcmllbmQ+O1xuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgZnJpZW5kc1NlcnZpY2U6IEZyaWVuZHNTZXJ2aWNlLFxuICAgIHByaXZhdGUgZnJpZW5kc0xpdmVTZXJ2aWNlOiBGcmllbmRzTGl2ZVNlcnZpY2UsXG5cbiAgICBwcml2YXRlIG1hcFZpZXdTZXJ2aWNlOiBNYXBWaWV3U2VydmljZSkge1xuICAgIC8vIHRoaXMuZnJpZW5kcyA9IG5ldyBBcnJheTxGcmllbmRQb3NpdGlvbj4oKTtcbiAgfVxuXG4gIG9uTWFwUmVhZHkoZXZlbnQpIHtcbiAgICBpZiAoIWV2ZW50Lm9iamVjdCkgcmV0dXJuO1xuICAgIHRoaXMubWFwVmlld1NlcnZpY2Uub25NYXBSZWFkeShldmVudCwgKCkgPT4gdGhpcy5tYXBSZWFkeU5vdGlmeSgpKTtcblxuICB9XG4gIHByaXZhdGUgbWFwUmVhZHlOb3RpZnkoKSB7XG4gICAgdGhpcy5mcmllbmRzTGlzdCA9IG5ldyBBcnJheTxGcmllbmQ+KCk7XG5cbiAgICB0aGlzLmdldEZyaWVuZHMoKTtcbiAgICB0aGlzLnN1YnNjcmliZUZyaWVuZExvY2F0aW9uVXBkYXRlKCk7XG4gICAgdGhpcy5mcmllbmRzU2VydmljZS5nZXRBbGxGcmllbmRzKCkuc3Vic2NyaWJlKHggPT4ge1xuICAgICAgeC5mb3JFYWNoKHMgPT4ge1xuICAgICAgICBpZiAoIXMuYWN0aXZhdGUpIHtcbiAgICAgICAgICAvL3NpIGVsIGFtaWdvIGVzdGEgZGVzYWN0aXZhZG8gbG8gZWxpbWlub1xuXG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH0pO1xuICB9XG4gIG5nT25Jbml0KCkge1xuXG4gIH1cblxuICBwcml2YXRlIHVwZGF0ZUZyaWVuZExvY2F0aW9uKGZyaWVuZDogRnJpZW5kUG9zaXRpb24pOiB2b2lkIHtcbiAgICB2YXIgbmV3TWFya0ZyaWVuZCA9IHRoaXMuY3JlYXRlTWFyayhmcmllbmQpO1xuICAgIGlmIChuZXdNYXJrRnJpZW5kICE9IG51bGwpXG4gICAgICB0aGlzLm1hcFZpZXdTZXJ2aWNlLnVwZGF0ZUNvbW1vbk1hcmsobmV3TWFya0ZyaWVuZFswXSwgbmV3TWFya0ZyaWVuZFsxXS5pZCk7XG4gIH1cbiAgcHJpdmF0ZSBzdWJzY3JpYmVGcmllbmRMb2NhdGlvblVwZGF0ZSgpIHtcbiAgICAvL01lIHN1c2NyaWJvIGFsIG1ldG9kbyBkZSBhY3R1YWxpemFjaW9uIHBhcmEgb2J0ZW5lciBhY3R1YWxpemFjaW9uIGRlIHViaWNhY2lvbiBkZSBtaXMgYW1pZ29zXG4gICAgdGhpcy5mcmllbmRzTGl2ZVNlcnZpY2UuZ2V0RnJpZW5kc0xvY2F0aW9ucygpLnN1YnNjcmliZShmPT57XG4gICAgICB0aGlzLnVwZGF0ZUZyaWVuZExvY2F0aW9uKGYpOyBcbiAgICB9KTtcblxuICB9XG4gIHByaXZhdGUgZ2V0RnJpZW5kcygpOiB2b2lkIHtcbiAgICAvL09idGVuZ28gdG9kb3MgbG9zIGFtaWdvcyBjb25lY3RhZG9zIHBvciBncnVwbyB5IGxvcyBkaWJ1am8gZW4gZWwgbWFwYVxuICAgIHRoaXMuZnJpZW5kc0xpdmVTZXJ2aWNlLmdldEZyaWVuZHNCeUdyb3VwKDEpLnN1YnNjcmliZShmcmllbmRzUG9zaXRpb24gPT4ge1xuICAgICAgZm9yICh2YXIgaXRlbSBvZiBmcmllbmRzUG9zaXRpb24pIHtcbiAgICAgICAgdmFyIG5ld01hcmtGcmllbmQgPSB0aGlzLmNyZWF0ZU1hcmsoaXRlbSk7XG4gICAgICAgIGlmIChuZXdNYXJrRnJpZW5kICE9IG51bGwpXG4gICAgICAgICAgdGhpcy5tYXBWaWV3U2VydmljZS5hZGRDb21tb25NYXJrKG5ld01hcmtGcmllbmRbMF0sIG5ld01hcmtGcmllbmRbMV0uaWQpO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG5cbiAgcHJpdmF0ZSBjcmVhdGVNYXJrKHBvc2l0aW9uOiBGcmllbmRQb3NpdGlvbik6IFtBZGRNYXJrZXJBcmdzLCBGcmllbmRdIHtcbiAgICB2YXIgbWFyayA9IG5ldyBBZGRNYXJrZXJBcmdzKCk7XG4gICAgdmFyIGZyaWVuZCA9IHRoaXMuZnJpZW5kc1NlcnZpY2UuZ2V0RnJpZW5kQnlJZChwb3NpdGlvbi5pZCk7XG4gICAgaWYgKGZyaWVuZCAhPSBudWxsICYmIGZyaWVuZC5hY3RpdmF0ZSkge1xuICAgICAgbWFyay50aXRsZSA9IGZyaWVuZC5kaXNwbGF5TmFtZTtcbiAgICAgIG1hcmsubG9jYXRpb24gPSBuZXcgUG9zaXRpb24oKTtcbiAgICAgIG1hcmsubG9jYXRpb24ubGF0aXR1ZGUgPSBwb3NpdGlvbi5sYXRpdHVkZTtcbiAgICAgIG1hcmsubG9jYXRpb24ubG9uZ2l0dWRlID0gcG9zaXRpb24ubG9uZ2l0dWRlO1xuICAgICAgcmV0dXJuIFttYXJrLCBmcmllbmRdO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG5cbiAgfVxuICAvLyBAVmlld0NoaWxkKFJhZFNpZGVEcmF3ZXJDb21wb25lbnQpIHB1YmxpYyBkcmF3ZXJDb21wb25lbnQ6IFJhZFNpZGVEcmF3ZXJDb21wb25lbnQ7XG4gIC8vIHByaXZhdGUgZHJhd2VyOiBTaWRlRHJhd2VyVHlwZTtcblxuXG4gIC8vIG9wZW5EcmF3ZXIoKSB7XG4gIC8vICAgdGhpcy5kcmF3ZXIuc2hvd0RyYXdlcigpO1xuICAvLyB9XG5cbiAgLy8gY2xvc2VEcmF3ZXIoKSB7XG4gIC8vICAgdGhpcy5kcmF3ZXIuY2xvc2VEcmF3ZXIoKTtcbiAgLy8gfVxuXG59XG5cblxuIl19