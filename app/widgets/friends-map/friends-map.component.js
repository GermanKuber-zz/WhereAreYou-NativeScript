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
    }
    FriendsMapComponent.prototype.onMapReady = function (event) {
        var _this = this;
        if (!event.object)
            return;
        this.mapViewService.onMapReady(event, function () { return _this.mapReadyNotify(); });
    };
    FriendsMapComponent.prototype.mapReadyNotify = function () {
        this.getFriendsPositions();
        this.subscribeFriendLocationUpdate();
    };
    FriendsMapComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.friendsService.friendUpdate$.subscribe(function (x) {
            var count = 0;
            for (var _i = 0, _a = _this.myFriends; _i < _a.length; _i++) {
                var item = _a[_i];
                if (item.id == x.id)
                    _this.myFriends[count] = x;
                ++count;
            }
        });
        this.myFriends = new Array();
        this.friendsService.getAllFriends().subscribe(function (x) {
            _this.myFriends = x;
        });
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
    FriendsMapComponent.prototype.getFriendsPositions = function () {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZnJpZW5kcy1tYXAuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiZnJpZW5kcy1tYXAuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxzQ0FBNEU7QUFDNUUsMEVBQXdFO0FBQ3hFLDZFQUFtRjtBQUduRixvRkFBZ0Y7QUFHaEYsK0VBQTJGO0FBQzNGLHdFQUFzRTtBQUd0RSxrQ0FBZSxDQUFDLFNBQVMsRUFBRSxjQUFNLE9BQUEsc0NBQU8sRUFBUCxDQUFPLENBQUMsQ0FBQztBQVExQyxJQUFhLG1CQUFtQjtJQUs5Qiw2QkFBb0IsY0FBOEIsRUFDeEMsa0JBQXNDLEVBQ3RDLGNBQThCO1FBRnBCLG1CQUFjLEdBQWQsY0FBYyxDQUFnQjtRQUN4Qyx1QkFBa0IsR0FBbEIsa0JBQWtCLENBQW9CO1FBQ3RDLG1CQUFjLEdBQWQsY0FBYyxDQUFnQjtJQUV4QyxDQUFDO0lBRUQsd0NBQVUsR0FBVixVQUFXLEtBQUs7UUFBaEIsaUJBSUM7UUFIQyxFQUFFLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUM7WUFBQyxNQUFNLENBQUM7UUFDMUIsSUFBSSxDQUFDLGNBQWMsQ0FBQyxVQUFVLENBQUMsS0FBSyxFQUFFLGNBQU0sT0FBQSxLQUFJLENBQUMsY0FBYyxFQUFFLEVBQXJCLENBQXFCLENBQUMsQ0FBQztJQUVyRSxDQUFDO0lBQ08sNENBQWMsR0FBdEI7UUFFRSxJQUFJLENBQUMsbUJBQW1CLEVBQUUsQ0FBQztRQUMzQixJQUFJLENBQUMsNkJBQTZCLEVBQUUsQ0FBQztJQUN2QyxDQUFDO0lBQ0Qsc0NBQVEsR0FBUjtRQUFBLGlCQWNDO1FBYkMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxhQUFhLENBQUMsU0FBUyxDQUFDLFVBQUEsQ0FBQztZQUMzQyxJQUFJLEtBQUssR0FBRyxDQUFDLENBQUM7WUFDZCxHQUFHLENBQUMsQ0FBYSxVQUFjLEVBQWQsS0FBQSxLQUFJLENBQUMsU0FBUyxFQUFkLGNBQWMs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RlksbUJBQW1CO0lBTi9CLGdCQUFTLENBQUM7UUFDVCxRQUFRLEVBQUUsYUFBYTtRQUN2QixXQUFXLEVBQUUsc0NBQXNDO1FBQ25ELFNBQVMsRUFBRSxDQUFDLDRDQUE0QyxFQUFFLHFDQUFxQyxDQUFDO1FBQ2hHLFNBQVMsRUFBRSxDQUFDLDBDQUFrQixFQUFFLGlDQUFjLENBQUM7S0FDaEQsQ0FBQztxQ0FNb0MsZ0NBQWM7UUFDcEIsMENBQWtCO1FBQ3RCLGlDQUFjO0dBUDdCLG1CQUFtQixDQXNGL0I7QUF0Rlksa0RBQW1CIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBWaWV3Q2hpbGQsIEFmdGVyVmlld0luaXQsIE9uSW5pdCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgcmVnaXN0ZXJFbGVtZW50IH0gZnJvbSAnbmF0aXZlc2NyaXB0LWFuZ3VsYXIvZWxlbWVudC1yZWdpc3RyeSc7XG5pbXBvcnQgeyBNYXBWaWV3LCBNYXJrZXIsIFBvbHlsaW5lLCBQb3NpdGlvbiB9IGZyb20gJ25hdGl2ZXNjcmlwdC1nb29nbGUtbWFwcy1zZGsnO1xuaW1wb3J0IHNpZGVEcmF3ZXJNb2R1bGUgPSByZXF1aXJlKCduYXRpdmVzY3JpcHQtdGVsZXJpay11aS9zaWRlZHJhd2VyJyk7XG5pbXBvcnQgeyBSYWRTaWRlRHJhd2VyQ29tcG9uZW50LCBTaWRlRHJhd2VyVHlwZSB9IGZyb20gJ25hdGl2ZXNjcmlwdC10ZWxlcmlrLXVpL3NpZGVkcmF3ZXIvYW5ndWxhcic7XG5pbXBvcnQgeyBGcmllbmRzTGl2ZVNlcnZpY2UgfSBmcm9tICcuLi8uLi9zaGFyZWQvZnJpZW5kcy9mcmllbmRzLWxpdmVzLnNlcnZpY2UnO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSB9IGZyb20gJy4uLy4uLy4uL3BsYXRmb3Jtcy9pb3MvYnVpbGQvZW11bGF0b3IvSGVsbG9Xb3JsZC5hcHAvYXBwL3Ruc19tb2R1bGVzL3J4anMvc3JjL09ic2VydmFibGUnO1xuaW1wb3J0IHsgRnJpZW5kUG9zaXRpb24sIEZyaWVuZCB9IGZyb20gJy4uLy4uL3NoYXJlZC9mcmllbmRzL2ZyaWVuZCc7XG5pbXBvcnQgeyBNYXBWaWV3U2VydmljZSwgQWRkTWFya2VyQXJncyB9IGZyb20gJy4uLy4uL3NoYXJlZC9zZXJ2aWNlcy9tYXAvbWFwLXZpZXcuc2VydmljZSc7XG5pbXBvcnQgeyBGcmllbmRzU2VydmljZSB9IGZyb20gJy4uLy4uL3NoYXJlZC9mcmllbmRzL2ZyaWVuZHMuc2VydmljZSc7XG5cblxucmVnaXN0ZXJFbGVtZW50KCdNYXBWaWV3JywgKCkgPT4gTWFwVmlldyk7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogXCJmcmllbmRzLW1hcFwiLFxuICB0ZW1wbGF0ZVVybDogXCJ3aWRnZXRzL2ZyaWVuZHMtbWFwL2ZyaWVuZHMtbWFwLmh0bWxcIixcbiAgc3R5bGVVcmxzOiBbXCJ3aWRnZXRzL2ZyaWVuZHMtbWFwL2ZyaWVuZHMtbWFwLWNvbW1vbi5jc3NcIiwgXCJ3aWRnZXRzL2ZyaWVuZHMtbWFwL2ZyaWVuZHMtbWFwLmNzc1wiXSxcbiAgcHJvdmlkZXJzOiBbRnJpZW5kc0xpdmVTZXJ2aWNlLCBNYXBWaWV3U2VydmljZV1cbn0pXG5leHBvcnQgY2xhc3MgRnJpZW5kc01hcENvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XG4gIC8vI0FtaWdvc1xuICAvLyBwdWJsaWMgZnJpZW5kczogQXJyYXk8RnJpZW5kUG9zaXRpb24+O1xuICBwcml2YXRlIG15RnJpZW5kczogQXJyYXk8RnJpZW5kPjtcblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIGZyaWVuZHNTZXJ2aWNlOiBGcmllbmRzU2VydmljZSxcbiAgICBwcml2YXRlIGZyaWVuZHNMaXZlU2VydmljZTogRnJpZW5kc0xpdmVTZXJ2aWNlLFxuICAgIHByaXZhdGUgbWFwVmlld1NlcnZpY2U6IE1hcFZpZXdTZXJ2aWNlKSB7XG5cbiAgfVxuXG4gIG9uTWFwUmVhZHkoZXZlbnQpIHtcbiAgICBpZiAoIWV2ZW50Lm9iamVjdCkgcmV0dXJuO1xuICAgIHRoaXMubWFwVmlld1NlcnZpY2Uub25NYXBSZWFkeShldmVudCwgKCkgPT4gdGhpcy5tYXBSZWFkeU5vdGlmeSgpKTtcblxuICB9XG4gIHByaXZhdGUgbWFwUmVhZHlOb3RpZnkoKSB7XG5cbiAgICB0aGlzLmdldEZyaWVuZHNQb3NpdGlvbnMoKTtcbiAgICB0aGlzLnN1YnNjcmliZUZyaWVuZExvY2F0aW9uVXBkYXRlKCk7XG4gIH1cbiAgbmdPbkluaXQoKSB7XG4gICAgdGhpcy5mcmllbmRzU2VydmljZS5mcmllbmRVcGRhdGUkLnN1YnNjcmliZSh4ID0+IHtcbiAgICAgIHZhciBjb3VudCA9IDA7XG4gICAgICBmb3IgKHZhciBpdGVtIG9mIHRoaXMubXlGcmllbmRzKSB7XG4gICAgICAgIGlmIChpdGVtLmlkID09IHguaWQpXG4gICAgICAgICAgdGhpcy5teUZyaWVuZHNbY291bnRdID0geDtcblxuICAgICAgICArK2NvdW50O1xuICAgICAgfVxuICAgIH0pO1xuICAgIHRoaXMubXlGcmllbmRzID0gbmV3IEFycmF5PEZyaWVuZD4oKTtcbiAgICB0aGlzLmZyaWVuZHNTZXJ2aWNlLmdldEFsbEZyaWVuZHMoKS5zdWJzY3JpYmUoeCA9PiB7XG4gICAgICB0aGlzLm15RnJpZW5kcyA9IHg7XG4gICAgfSk7XG4gIH1cblxuICBwcml2YXRlIHVwZGF0ZUZyaWVuZExvY2F0aW9uKGZyaWVuZDogRnJpZW5kUG9zaXRpb24pOiB2b2lkIHtcbiAgICB2YXIgbmV3TWFya0ZyaWVuZCA9IHRoaXMuY3JlYXRlTWFyayhmcmllbmQpO1xuICAgIGlmIChuZXdNYXJrRnJpZW5kICE9IG51bGwpXG4gICAgICB0aGlzLm1hcFZpZXdTZXJ2aWNlLnVwZGF0ZUNvbW1vbk1hcmsobmV3TWFya0ZyaWVuZFswXSwgbmV3TWFya0ZyaWVuZFsxXS5pZCk7XG4gIH1cbiAgcHJpdmF0ZSBzdWJzY3JpYmVGcmllbmRMb2NhdGlvblVwZGF0ZSgpIHtcbiAgICAvL01lIHN1c2NyaWJvIGFsIG1ldG9kbyBkZSBhY3R1YWxpemFjaW9uIHBhcmEgb2J0ZW5lciBhY3R1YWxpemFjaW9uIGRlIHViaWNhY2lvbiBkZSBtaXMgYW1pZ29zXG4gICAgdGhpcy5mcmllbmRzTGl2ZVNlcnZpY2UuZ2V0RnJpZW5kc0xvY2F0aW9ucygpLnN1YnNjcmliZShmID0+IHtcbiAgICAgIHRoaXMudXBkYXRlRnJpZW5kTG9jYXRpb24oZik7XG4gICAgfSk7XG5cbiAgfVxuICBwcml2YXRlIGdldEZyaWVuZHNQb3NpdGlvbnMoKTogdm9pZCB7XG4gICAgLy9PYnRlbmdvIHRvZG9zIGxvcyBhbWlnb3MgY29uZWN0YWRvcyBwb3IgZ3J1cG8geSBsb3MgZGlidWpvIGVuIGVsIG1hcGFcbiAgICB0aGlzLmZyaWVuZHNMaXZlU2VydmljZS5nZXRGcmllbmRzQnlHcm91cCgxKS5zdWJzY3JpYmUoZnJpZW5kc1Bvc2l0aW9uID0+IHtcbiAgICAgIGZvciAodmFyIGl0ZW0gb2YgZnJpZW5kc1Bvc2l0aW9uKSB7XG4gICAgICAgIHZhciBuZXdNYXJrRnJpZW5kID0gdGhpcy5jcmVhdGVNYXJrKGl0ZW0pO1xuICAgICAgICBpZiAobmV3TWFya0ZyaWVuZCAhPSBudWxsKVxuICAgICAgICAgIHRoaXMubWFwVmlld1NlcnZpY2UuYWRkQ29tbW9uTWFyayhuZXdNYXJrRnJpZW5kWzBdLCBuZXdNYXJrRnJpZW5kWzFdLmlkKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuXG4gIHByaXZhdGUgY3JlYXRlTWFyayhwb3NpdGlvbjogRnJpZW5kUG9zaXRpb24pOiBbQWRkTWFya2VyQXJncywgRnJpZW5kXSB7XG4gICAgdmFyIG1hcmsgPSBuZXcgQWRkTWFya2VyQXJncygpO1xuICAgIHZhciBmcmllbmQgPSB0aGlzLmZyaWVuZHNTZXJ2aWNlLmdldEZyaWVuZEJ5SWQocG9zaXRpb24uaWQpO1xuICAgIGlmIChmcmllbmQgIT0gbnVsbCAmJiBmcmllbmQuYWN0aXZhdGUpIHtcbiAgICAgIG1hcmsudGl0bGUgPSBmcmllbmQuZGlzcGxheU5hbWU7XG4gICAgICBtYXJrLmxvY2F0aW9uID0gbmV3IFBvc2l0aW9uKCk7XG4gICAgICBtYXJrLmxvY2F0aW9uLmxhdGl0dWRlID0gcG9zaXRpb24ubGF0aXR1ZGU7XG4gICAgICBtYXJrLmxvY2F0aW9uLmxvbmdpdHVkZSA9IHBvc2l0aW9uLmxvbmdpdHVkZTtcbiAgICAgIHJldHVybiBbbWFyaywgZnJpZW5kXTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuXG4gIH1cbiAgLy8gQFZpZXdDaGlsZChSYWRTaWRlRHJhd2VyQ29tcG9uZW50KSBwdWJsaWMgZHJhd2VyQ29tcG9uZW50OiBSYWRTaWRlRHJhd2VyQ29tcG9uZW50O1xuICAvLyBwcml2YXRlIGRyYXdlcjogU2lkZURyYXdlclR5cGU7XG5cblxuICAvLyBvcGVuRHJhd2VyKCkge1xuICAvLyAgIHRoaXMuZHJhd2VyLnNob3dEcmF3ZXIoKTtcbiAgLy8gfVxuXG4gIC8vIGNsb3NlRHJhd2VyKCkge1xuICAvLyAgIHRoaXMuZHJhd2VyLmNsb3NlRHJhd2VyKCk7XG4gIC8vIH1cblxufVxuXG5cbiJdfQ==