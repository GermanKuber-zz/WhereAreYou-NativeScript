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
    FriendsMapComponent.prototype.mapTapped = function (event) {
        this.mapViewService.mapTapped(event);
    };
    FriendsMapComponent.prototype.mapReadyNotify = function () {
        this.getFriendsPositions();
        this.subscribeFriendLocationUpdate();
    };
    FriendsMapComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.friendsService.friendUpdate$.subscribe(function (x) {
            _this.myFriends = x;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZnJpZW5kcy1tYXAuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiZnJpZW5kcy1tYXAuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxzQ0FBNEU7QUFDNUUsMEVBQXdFO0FBQ3hFLDZFQUFtRjtBQUduRixvRkFBZ0Y7QUFHaEYsK0VBQTJGO0FBQzNGLHdFQUFzRTtBQUd0RSxrQ0FBZSxDQUFDLFNBQVMsRUFBRSxjQUFNLE9BQUEsc0NBQU8sRUFBUCxDQUFPLENBQUMsQ0FBQztBQVExQyxJQUFhLG1CQUFtQjtJQUs5Qiw2QkFBb0IsY0FBOEIsRUFDeEMsa0JBQXNDLEVBQ3RDLGNBQThCO1FBRnBCLG1CQUFjLEdBQWQsY0FBYyxDQUFnQjtRQUN4Qyx1QkFBa0IsR0FBbEIsa0JBQWtCLENBQW9CO1FBQ3RDLG1CQUFjLEdBQWQsY0FBYyxDQUFnQjtJQUV4QyxDQUFDO0lBRUQsd0NBQVUsR0FBVixVQUFXLEtBQUs7UUFBaEIsaUJBSUM7UUFIQyxFQUFFLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUM7WUFBQyxNQUFNLENBQUM7UUFDMUIsSUFBSSxDQUFDLGNBQWMsQ0FBQyxVQUFVLENBQUMsS0FBSyxFQUFFLGNBQU0sT0FBQSxLQUFJLENBQUMsY0FBYyxFQUFFLEVBQXJCLENBQXFCLENBQUMsQ0FBQztJQUVyRSxDQUFDO0lBRUQsdUNBQVMsR0FBVCxVQUFVLEtBQUs7UUFDWixJQUFJLENBQUMsY0FBYyxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUN4QyxDQUFDO0lBQ08sNENBQWMsR0FBdEI7UUFFRSxJQUFJLENBQUMsbUJBQW1CLEVBQUUsQ0FBQztRQUMzQixJQUFJLENBQUMsNkJBQTZCLEVBQUUsQ0FBQztJQUN2QyxDQUFDO0lBQ0Qsc0NBQVEsR0FBUjtRQUFBLGlCQVFDO1FBUEMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxhQUFhLENBQUMsU0FBUyxDQUFDLFVBQUEsQ0FBQztZQUMz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QWtCLEVBQUUsaUNBQWMsQ0FBQztLQUNoRCxDQUFDO3FDQU1vQyxnQ0FBYztRQUNwQiwwQ0FBa0I7UUFDdEIsaUNBQWM7R0FQN0IsbUJBQW1CLENBb0YvQjtBQXBGWSxrREFBbUIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIFZpZXdDaGlsZCwgQWZ0ZXJWaWV3SW5pdCwgT25Jbml0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyByZWdpc3RlckVsZW1lbnQgfSBmcm9tICduYXRpdmVzY3JpcHQtYW5ndWxhci9lbGVtZW50LXJlZ2lzdHJ5JztcbmltcG9ydCB7IE1hcFZpZXcsIE1hcmtlciwgUG9seWxpbmUsIFBvc2l0aW9uIH0gZnJvbSAnbmF0aXZlc2NyaXB0LWdvb2dsZS1tYXBzLXNkayc7XG5pbXBvcnQgc2lkZURyYXdlck1vZHVsZSA9IHJlcXVpcmUoJ25hdGl2ZXNjcmlwdC10ZWxlcmlrLXVpL3NpZGVkcmF3ZXInKTtcbmltcG9ydCB7IFJhZFNpZGVEcmF3ZXJDb21wb25lbnQsIFNpZGVEcmF3ZXJUeXBlIH0gZnJvbSAnbmF0aXZlc2NyaXB0LXRlbGVyaWstdWkvc2lkZWRyYXdlci9hbmd1bGFyJztcbmltcG9ydCB7IEZyaWVuZHNMaXZlU2VydmljZSB9IGZyb20gJy4uLy4uL3NoYXJlZC9mcmllbmRzL2ZyaWVuZHMtbGl2ZXMuc2VydmljZSc7XG5pbXBvcnQgeyBPYnNlcnZhYmxlIH0gZnJvbSAnLi4vLi4vLi4vcGxhdGZvcm1zL2lvcy9idWlsZC9lbXVsYXRvci9IZWxsb1dvcmxkLmFwcC9hcHAvdG5zX21vZHVsZXMvcnhqcy9zcmMvT2JzZXJ2YWJsZSc7XG5pbXBvcnQgeyBGcmllbmRQb3NpdGlvbiwgRnJpZW5kIH0gZnJvbSAnLi4vLi4vc2hhcmVkL2ZyaWVuZHMvZnJpZW5kJztcbmltcG9ydCB7IE1hcFZpZXdTZXJ2aWNlLCBBZGRNYXJrZXJBcmdzIH0gZnJvbSAnLi4vLi4vc2hhcmVkL3NlcnZpY2VzL21hcC9tYXAtdmlldy5zZXJ2aWNlJztcbmltcG9ydCB7IEZyaWVuZHNTZXJ2aWNlIH0gZnJvbSAnLi4vLi4vc2hhcmVkL2ZyaWVuZHMvZnJpZW5kcy5zZXJ2aWNlJztcblxuXG5yZWdpc3RlckVsZW1lbnQoJ01hcFZpZXcnLCAoKSA9PiBNYXBWaWV3KTtcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiBcImZyaWVuZHMtbWFwXCIsXG4gIHRlbXBsYXRlVXJsOiBcIndpZGdldHMvZnJpZW5kcy1tYXAvZnJpZW5kcy1tYXAuaHRtbFwiLFxuICBzdHlsZVVybHM6IFtcIndpZGdldHMvZnJpZW5kcy1tYXAvZnJpZW5kcy1tYXAtY29tbW9uLmNzc1wiLCBcIndpZGdldHMvZnJpZW5kcy1tYXAvZnJpZW5kcy1tYXAuY3NzXCJdLFxuICBwcm92aWRlcnM6IFtGcmllbmRzTGl2ZVNlcnZpY2UsIE1hcFZpZXdTZXJ2aWNlXVxufSlcbmV4cG9ydCBjbGFzcyBGcmllbmRzTWFwQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcbiAgLy8jQW1pZ29zXG4gIC8vIHB1YmxpYyBmcmllbmRzOiBBcnJheTxGcmllbmRQb3NpdGlvbj47XG4gIHByaXZhdGUgbXlGcmllbmRzOiBBcnJheTxGcmllbmQ+O1xuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgZnJpZW5kc1NlcnZpY2U6IEZyaWVuZHNTZXJ2aWNlLFxuICAgIHByaXZhdGUgZnJpZW5kc0xpdmVTZXJ2aWNlOiBGcmllbmRzTGl2ZVNlcnZpY2UsXG4gICAgcHJpdmF0ZSBtYXBWaWV3U2VydmljZTogTWFwVmlld1NlcnZpY2UpIHtcblxuICB9XG5cbiAgb25NYXBSZWFkeShldmVudCkge1xuICAgIGlmICghZXZlbnQub2JqZWN0KSByZXR1cm47XG4gICAgdGhpcy5tYXBWaWV3U2VydmljZS5vbk1hcFJlYWR5KGV2ZW50LCAoKSA9PiB0aGlzLm1hcFJlYWR5Tm90aWZ5KCkpO1xuXG4gIH1cblxuICBtYXBUYXBwZWQoZXZlbnQpe1xuICAgICB0aGlzLm1hcFZpZXdTZXJ2aWNlLm1hcFRhcHBlZChldmVudCk7XG4gIH1cbiAgcHJpdmF0ZSBtYXBSZWFkeU5vdGlmeSgpIHtcblxuICAgIHRoaXMuZ2V0RnJpZW5kc1Bvc2l0aW9ucygpO1xuICAgIHRoaXMuc3Vic2NyaWJlRnJpZW5kTG9jYXRpb25VcGRhdGUoKTtcbiAgfVxuICBuZ09uSW5pdCgpIHtcbiAgICB0aGlzLmZyaWVuZHNTZXJ2aWNlLmZyaWVuZFVwZGF0ZSQuc3Vic2NyaWJlKHggPT4ge1xuICAgICAgdGhpcy5teUZyaWVuZHMgPSB4O1xuICAgIH0pO1xuICAgIHRoaXMubXlGcmllbmRzID0gbmV3IEFycmF5PEZyaWVuZD4oKTtcbiAgICB0aGlzLmZyaWVuZHNTZXJ2aWNlLmdldEFsbEZyaWVuZHMoKS5zdWJzY3JpYmUoeCA9PiB7XG4gICAgICB0aGlzLm15RnJpZW5kcyA9IHg7XG4gICAgfSk7XG4gIH1cblxuICBwcml2YXRlIHVwZGF0ZUZyaWVuZExvY2F0aW9uKGZyaWVuZDogRnJpZW5kUG9zaXRpb24pOiB2b2lkIHtcbiAgICB2YXIgbmV3TWFya0ZyaWVuZCA9IHRoaXMuY3JlYXRlTWFyayhmcmllbmQpO1xuICAgIGlmIChuZXdNYXJrRnJpZW5kICE9IG51bGwpXG4gICAgICB0aGlzLm1hcFZpZXdTZXJ2aWNlLnVwZGF0ZUNvbW1vbk1hcmsobmV3TWFya0ZyaWVuZFswXSwgbmV3TWFya0ZyaWVuZFsxXS5pZCk7XG4gIH1cbiAgcHJpdmF0ZSBzdWJzY3JpYmVGcmllbmRMb2NhdGlvblVwZGF0ZSgpIHtcbiAgICAvL01lIHN1c2NyaWJvIGFsIG1ldG9kbyBkZSBhY3R1YWxpemFjaW9uIHBhcmEgb2J0ZW5lciBhY3R1YWxpemFjaW9uIGRlIHViaWNhY2lvbiBkZSBtaXMgYW1pZ29zXG4gICAgdGhpcy5mcmllbmRzTGl2ZVNlcnZpY2UuZ2V0RnJpZW5kc0xvY2F0aW9ucygpLnN1YnNjcmliZShmID0+IHtcbiAgICAgIHRoaXMudXBkYXRlRnJpZW5kTG9jYXRpb24oZik7XG4gICAgfSk7XG5cbiAgfVxuICBwcml2YXRlIGdldEZyaWVuZHNQb3NpdGlvbnMoKTogdm9pZCB7XG4gICAgLy9PYnRlbmdvIHRvZG9zIGxvcyBhbWlnb3MgY29uZWN0YWRvcyBwb3IgZ3J1cG8geSBsb3MgZGlidWpvIGVuIGVsIG1hcGFcbiAgICB0aGlzLmZyaWVuZHNMaXZlU2VydmljZS5nZXRGcmllbmRzQnlHcm91cCgxKS5zdWJzY3JpYmUoZnJpZW5kc1Bvc2l0aW9uID0+IHtcbiAgICAgIGZvciAodmFyIGl0ZW0gb2YgZnJpZW5kc1Bvc2l0aW9uKSB7XG4gICAgICAgIHZhciBuZXdNYXJrRnJpZW5kID0gdGhpcy5jcmVhdGVNYXJrKGl0ZW0pO1xuICAgICAgICBpZiAobmV3TWFya0ZyaWVuZCAhPSBudWxsKVxuICAgICAgICAgIHRoaXMubWFwVmlld1NlcnZpY2UuYWRkQ29tbW9uTWFyayhuZXdNYXJrRnJpZW5kWzBdLCBuZXdNYXJrRnJpZW5kWzFdLmlkKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuXG4gIHByaXZhdGUgY3JlYXRlTWFyayhwb3NpdGlvbjogRnJpZW5kUG9zaXRpb24pOiBbQWRkTWFya2VyQXJncywgRnJpZW5kXSB7XG4gICAgdmFyIG1hcmsgPSBuZXcgQWRkTWFya2VyQXJncygpO1xuICAgIHZhciBmcmllbmQgPSB0aGlzLmZyaWVuZHNTZXJ2aWNlLmdldEZyaWVuZEJ5SWQocG9zaXRpb24uaWQpO1xuICAgIGlmIChmcmllbmQgIT0gbnVsbCAmJiBmcmllbmQuYWN0aXZhdGUpIHtcbiAgICAgIG1hcmsudGl0bGUgPSBmcmllbmQuZGlzcGxheU5hbWU7XG4gICAgICBtYXJrLmxvY2F0aW9uID0gbmV3IFBvc2l0aW9uKCk7XG4gICAgICBtYXJrLmxvY2F0aW9uLmxhdGl0dWRlID0gcG9zaXRpb24ubGF0aXR1ZGU7XG4gICAgICBtYXJrLmxvY2F0aW9uLmxvbmdpdHVkZSA9IHBvc2l0aW9uLmxvbmdpdHVkZTtcbiAgICAgIHJldHVybiBbbWFyaywgZnJpZW5kXTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuXG4gIH1cbiAgLy8gQFZpZXdDaGlsZChSYWRTaWRlRHJhd2VyQ29tcG9uZW50KSBwdWJsaWMgZHJhd2VyQ29tcG9uZW50OiBSYWRTaWRlRHJhd2VyQ29tcG9uZW50O1xuICAvLyBwcml2YXRlIGRyYXdlcjogU2lkZURyYXdlclR5cGU7XG5cblxuICAvLyBvcGVuRHJhd2VyKCkge1xuICAvLyAgIHRoaXMuZHJhd2VyLnNob3dEcmF3ZXIoKTtcbiAgLy8gfVxuXG4gIC8vIGNsb3NlRHJhd2VyKCkge1xuICAvLyAgIHRoaXMuZHJhd2VyLmNsb3NlRHJhd2VyKCk7XG4gIC8vIH1cblxufVxuXG5cbiJdfQ==