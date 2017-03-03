"use strict";
var core_1 = require("@angular/core");
var element_registry_1 = require("nativescript-angular/element-registry");
var nativescript_google_maps_sdk_1 = require("nativescript-google-maps-sdk");
var friends_lives_service_1 = require("../../shared/friends/friends-lives.service");
var map_view_service_1 = require("../../shared/services/map/map-view.service");
var friends_service_1 = require("../../shared/friends/friends.service");
var MarkContainer_1 = require("../../shared/services/map/core/MarkContainer");
element_registry_1.registerElement('MapView', function () { return nativescript_google_maps_sdk_1.MapView; });
var FriendsMapComponent = (function () {
    function FriendsMapComponent(friendsService, friendsLiveService, mapViewService) {
        this.friendsService = friendsService;
        this.friendsLiveService = friendsLiveService;
        this.mapViewService = mapViewService;
    }
    //Events
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
    //Map Events
    FriendsMapComponent.prototype.onMapReady = function (event) {
        var _this = this;
        if (!event.object)
            return;
        this.mapViewService.onMapReady(event, function () { return _this.mapReadyNotify(); });
    };
    FriendsMapComponent.prototype.mapTapped = function (event) {
        this.mapViewService.mapTapped(event);
    };
    //Private Methods
    FriendsMapComponent.prototype.mapReadyNotify = function () {
        this.getFriendsPositions();
        this.subscribeFriendLocationUpdate();
    };
    FriendsMapComponent.prototype.updateFriendLocation = function (friend) {
        var newMarkFriend = this.createMarkerArgs(friend);
        if (newMarkFriend != null)
            this.mapViewService.updateFriendMark(newMarkFriend[0], newMarkFriend[1].id);
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
                var newMarkFriend = _this.createMarkerArgs(item);
                if (newMarkFriend != null)
                    _this.mapViewService.addFriendnMark(newMarkFriend[0], newMarkFriend[1].id);
            }
        });
    };
    FriendsMapComponent.prototype.createMarkerArgs = function (position) {
        var mark = new MarkContainer_1.AddMarkerArgs();
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZnJpZW5kcy1tYXAuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiZnJpZW5kcy1tYXAuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxzQ0FBNEU7QUFDNUUsMEVBQXdFO0FBQ3hFLDZFQUFtRjtBQUduRixvRkFBZ0Y7QUFHaEYsK0VBQTRFO0FBQzVFLHdFQUFzRTtBQUN0RSw4RUFBNkU7QUFHN0Usa0NBQWUsQ0FBQyxTQUFTLEVBQUUsY0FBTSxPQUFBLHNDQUFPLEVBQVAsQ0FBTyxDQUFDLENBQUM7QUFRMUMsSUFBYSxtQkFBbUI7SUFLOUIsNkJBQW9CLGNBQThCLEVBQ3hDLGtCQUFzQyxFQUN0QyxjQUE4QjtRQUZwQixtQkFBYyxHQUFkLGNBQWMsQ0FBZ0I7UUFDeEMsdUJBQWtCLEdBQWxCLGtCQUFrQixDQUFvQjtRQUN0QyxtQkFBYyxHQUFkLGNBQWMsQ0FBZ0I7SUFFeEMsQ0FBQztJQUNELFFBQVE7SUFDUixzQ0FBUSxHQUFSO1FBQUEsaUJBUUM7UUFQQyxJQUFJLENBQUMsY0FBYyxDQUFDLGFBQWEsQ0FBQyxTQUFTLENBQUMsVUFBQSxDQUFDO1lBQzNDLEtBQUksQ0FBQyxTQUFTLEdBQUcsQ0FBQyxDQUFDO1FBQ3JCLENBQUMsQ0FBQyxDQUFDO1FBQ0gsSUFBSSxDQUFDLFNBQVMsR0FBRyxJQUFJLEtBQUssRUFBVSxDQUFDO1FBQ3JDLElBQUksQ0FBQyxjQUFjLENBQUMsYUFBYSxFQUFFLENBQUMsU0FBUyxDQUFDLFVBQUEsQ0FBQztZQUM3QyxLQUFJLENBQUMsU0FBUyxHQUFHLENBQUMsQ0FBQztRQUNyQixDQUFDLENBQUMsQ0FBQztJQUNMLENBQUM7SUFFRCxZQUFZO0lBQ1osd0NBQVUsR0FBVixVQUFXLEtBQUs7UUFBaEIsaUJBSUM7UUFIQyxFQUFFLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUM7WUFBQyxNQUFNLENBQUM7UUFDMUIsSUFBSSxDQUFDLGNBQWMsQ0FBQyxVQUFV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Qyw0Q0FBNEMsRUFBRSxxQ0FBcUMsQ0FBQztRQUNoRyxTQUFTLEVBQUUsQ0FBQywwQ0FBa0IsRUFBRSxpQ0FBYyxDQUFDO0tBQ2hELENBQUM7cUNBTW9DLGdDQUFjO1FBQ3BCLDBDQUFrQjtRQUN0QixpQ0FBYztHQVA3QixtQkFBbUIsQ0F1Ri9CO0FBdkZZLGtEQUFtQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgVmlld0NoaWxkLCBBZnRlclZpZXdJbml0LCBPbkluaXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IHJlZ2lzdGVyRWxlbWVudCB9IGZyb20gJ25hdGl2ZXNjcmlwdC1hbmd1bGFyL2VsZW1lbnQtcmVnaXN0cnknO1xuaW1wb3J0IHsgTWFwVmlldywgTWFya2VyLCBQb2x5bGluZSwgUG9zaXRpb24gfSBmcm9tICduYXRpdmVzY3JpcHQtZ29vZ2xlLW1hcHMtc2RrJztcbmltcG9ydCBzaWRlRHJhd2VyTW9kdWxlID0gcmVxdWlyZSgnbmF0aXZlc2NyaXB0LXRlbGVyaWstdWkvc2lkZWRyYXdlcicpO1xuaW1wb3J0IHsgUmFkU2lkZURyYXdlckNvbXBvbmVudCwgU2lkZURyYXdlclR5cGUgfSBmcm9tICduYXRpdmVzY3JpcHQtdGVsZXJpay11aS9zaWRlZHJhd2VyL2FuZ3VsYXInO1xuaW1wb3J0IHsgRnJpZW5kc0xpdmVTZXJ2aWNlIH0gZnJvbSAnLi4vLi4vc2hhcmVkL2ZyaWVuZHMvZnJpZW5kcy1saXZlcy5zZXJ2aWNlJztcbmltcG9ydCB7IE9ic2VydmFibGUgfSBmcm9tICcuLi8uLi8uLi9wbGF0Zm9ybXMvaW9zL2J1aWxkL2VtdWxhdG9yL0hlbGxvV29ybGQuYXBwL2FwcC90bnNfbW9kdWxlcy9yeGpzL3NyYy9PYnNlcnZhYmxlJztcbmltcG9ydCB7IEZyaWVuZFBvc2l0aW9uLCBGcmllbmQgfSBmcm9tICcuLi8uLi9zaGFyZWQvZnJpZW5kcy9mcmllbmQnO1xuaW1wb3J0IHsgTWFwVmlld1NlcnZpY2UgfSBmcm9tICcuLi8uLi9zaGFyZWQvc2VydmljZXMvbWFwL21hcC12aWV3LnNlcnZpY2UnO1xuaW1wb3J0IHsgRnJpZW5kc1NlcnZpY2UgfSBmcm9tICcuLi8uLi9zaGFyZWQvZnJpZW5kcy9mcmllbmRzLnNlcnZpY2UnO1xuaW1wb3J0IHsgQWRkTWFya2VyQXJncyB9IGZyb20gJy4uLy4uL3NoYXJlZC9zZXJ2aWNlcy9tYXAvY29yZS9NYXJrQ29udGFpbmVyJztcblxuXG5yZWdpc3RlckVsZW1lbnQoJ01hcFZpZXcnLCAoKSA9PiBNYXBWaWV3KTtcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiBcImZyaWVuZHMtbWFwXCIsXG4gIHRlbXBsYXRlVXJsOiBcIndpZGdldHMvZnJpZW5kcy1tYXAvZnJpZW5kcy1tYXAuaHRtbFwiLFxuICBzdHlsZVVybHM6IFtcIndpZGdldHMvZnJpZW5kcy1tYXAvZnJpZW5kcy1tYXAtY29tbW9uLmNzc1wiLCBcIndpZGdldHMvZnJpZW5kcy1tYXAvZnJpZW5kcy1tYXAuY3NzXCJdLFxuICBwcm92aWRlcnM6IFtGcmllbmRzTGl2ZVNlcnZpY2UsIE1hcFZpZXdTZXJ2aWNlXVxufSlcbmV4cG9ydCBjbGFzcyBGcmllbmRzTWFwQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcbiAgLy8jQW1pZ29zXG4gIC8vIHB1YmxpYyBmcmllbmRzOiBBcnJheTxGcmllbmRQb3NpdGlvbj47XG4gIHByaXZhdGUgbXlGcmllbmRzOiBBcnJheTxGcmllbmQ+O1xuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgZnJpZW5kc1NlcnZpY2U6IEZyaWVuZHNTZXJ2aWNlLFxuICAgIHByaXZhdGUgZnJpZW5kc0xpdmVTZXJ2aWNlOiBGcmllbmRzTGl2ZVNlcnZpY2UsXG4gICAgcHJpdmF0ZSBtYXBWaWV3U2VydmljZTogTWFwVmlld1NlcnZpY2UpIHtcblxuICB9XG4gIC8vRXZlbnRzXG4gIG5nT25Jbml0KCkge1xuICAgIHRoaXMuZnJpZW5kc1NlcnZpY2UuZnJpZW5kVXBkYXRlJC5zdWJzY3JpYmUoeCA9PiB7XG4gICAgICB0aGlzLm15RnJpZW5kcyA9IHg7XG4gICAgfSk7XG4gICAgdGhpcy5teUZyaWVuZHMgPSBuZXcgQXJyYXk8RnJpZW5kPigpO1xuICAgIHRoaXMuZnJpZW5kc1NlcnZpY2UuZ2V0QWxsRnJpZW5kcygpLnN1YnNjcmliZSh4ID0+IHtcbiAgICAgIHRoaXMubXlGcmllbmRzID0geDtcbiAgICB9KTtcbiAgfVxuXG4gIC8vTWFwIEV2ZW50c1xuICBvbk1hcFJlYWR5KGV2ZW50KSB7XG4gICAgaWYgKCFldmVudC5vYmplY3QpIHJldHVybjtcbiAgICB0aGlzLm1hcFZpZXdTZXJ2aWNlLm9uTWFwUmVhZHkoZXZlbnQsICgpID0+IHRoaXMubWFwUmVhZHlOb3RpZnkoKSk7XG5cbiAgfVxuICBtYXBUYXBwZWQoZXZlbnQpIHtcbiAgICB0aGlzLm1hcFZpZXdTZXJ2aWNlLm1hcFRhcHBlZChldmVudCk7XG4gIH1cbiAgLy9Qcml2YXRlIE1ldGhvZHNcbiAgcHJpdmF0ZSBtYXBSZWFkeU5vdGlmeSgpIHtcblxuICAgIHRoaXMuZ2V0RnJpZW5kc1Bvc2l0aW9ucygpO1xuICAgIHRoaXMuc3Vic2NyaWJlRnJpZW5kTG9jYXRpb25VcGRhdGUoKTtcbiAgfVxuXG5cbiAgcHJpdmF0ZSB1cGRhdGVGcmllbmRMb2NhdGlvbihmcmllbmQ6IEZyaWVuZFBvc2l0aW9uKTogdm9pZCB7XG4gICAgdmFyIG5ld01hcmtGcmllbmQgPSB0aGlzLmNyZWF0ZU1hcmtlckFyZ3MoZnJpZW5kKTtcbiAgICBpZiAobmV3TWFya0ZyaWVuZCAhPSBudWxsKVxuICAgICAgdGhpcy5tYXBWaWV3U2VydmljZS51cGRhdGVGcmllbmRNYXJrKG5ld01hcmtGcmllbmRbMF0sIG5ld01hcmtGcmllbmRbMV0uaWQpO1xuICB9XG4gIHByaXZhdGUgc3Vic2NyaWJlRnJpZW5kTG9jYXRpb25VcGRhdGUoKSB7XG4gICAgLy9NZSBzdXNjcmlibyBhbCBtZXRvZG8gZGUgYWN0dWFsaXphY2lvbiBwYXJhIG9idGVuZXIgYWN0dWFsaXphY2lvbiBkZSB1YmljYWNpb24gZGUgbWlzIGFtaWdvc1xuICAgIHRoaXMuZnJpZW5kc0xpdmVTZXJ2aWNlLmdldEZyaWVuZHNMb2NhdGlvbnMoKS5zdWJzY3JpYmUoZiA9PiB7XG4gICAgICB0aGlzLnVwZGF0ZUZyaWVuZExvY2F0aW9uKGYpO1xuICAgIH0pO1xuXG4gIH1cbiAgcHJpdmF0ZSBnZXRGcmllbmRzUG9zaXRpb25zKCk6IHZvaWQge1xuICAgIC8vT2J0ZW5nbyB0b2RvcyBsb3MgYW1pZ29zIGNvbmVjdGFkb3MgcG9yIGdydXBvIHkgbG9zIGRpYnVqbyBlbiBlbCBtYXBhXG4gICAgdGhpcy5mcmllbmRzTGl2ZVNlcnZpY2UuZ2V0RnJpZW5kc0J5R3JvdXAoMSkuc3Vic2NyaWJlKGZyaWVuZHNQb3NpdGlvbiA9PiB7XG4gICAgICBmb3IgKHZhciBpdGVtIG9mIGZyaWVuZHNQb3NpdGlvbikge1xuICAgICAgICB2YXIgbmV3TWFya0ZyaWVuZCA9IHRoaXMuY3JlYXRlTWFya2VyQXJncyhpdGVtKTtcbiAgICAgICAgaWYgKG5ld01hcmtGcmllbmQgIT0gbnVsbClcbiAgICAgICAgICB0aGlzLm1hcFZpZXdTZXJ2aWNlLmFkZEZyaWVuZG5NYXJrKG5ld01hcmtGcmllbmRbMF0sIG5ld01hcmtGcmllbmRbMV0uaWQpO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG5cbiAgcHJpdmF0ZSBjcmVhdGVNYXJrZXJBcmdzKHBvc2l0aW9uOiBGcmllbmRQb3NpdGlvbik6IFtBZGRNYXJrZXJBcmdzLCBGcmllbmRdIHtcbiAgICB2YXIgbWFyayA9IG5ldyBBZGRNYXJrZXJBcmdzKCk7XG4gICAgdmFyIGZyaWVuZCA9IHRoaXMuZnJpZW5kc1NlcnZpY2UuZ2V0RnJpZW5kQnlJZChwb3NpdGlvbi5pZCk7XG4gICAgaWYgKGZyaWVuZCAhPSBudWxsICYmIGZyaWVuZC5hY3RpdmF0ZSkge1xuICAgICAgbWFyay50aXRsZSA9IGZyaWVuZC5kaXNwbGF5TmFtZTtcbiAgICAgIG1hcmsubG9jYXRpb24gPSBuZXcgUG9zaXRpb24oKTtcbiAgICAgIG1hcmsubG9jYXRpb24ubGF0aXR1ZGUgPSBwb3NpdGlvbi5sYXRpdHVkZTtcbiAgICAgIG1hcmsubG9jYXRpb24ubG9uZ2l0dWRlID0gcG9zaXRpb24ubG9uZ2l0dWRlO1xuICAgICAgcmV0dXJuIFttYXJrLCBmcmllbmRdO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG5cbiAgfVxuICAvLyBAVmlld0NoaWxkKFJhZFNpZGVEcmF3ZXJDb21wb25lbnQpIHB1YmxpYyBkcmF3ZXJDb21wb25lbnQ6IFJhZFNpZGVEcmF3ZXJDb21wb25lbnQ7XG4gIC8vIHByaXZhdGUgZHJhd2VyOiBTaWRlRHJhd2VyVHlwZTtcblxuXG4gIC8vIG9wZW5EcmF3ZXIoKSB7XG4gIC8vICAgdGhpcy5kcmF3ZXIuc2hvd0RyYXdlcigpO1xuICAvLyB9XG5cbiAgLy8gY2xvc2VEcmF3ZXIoKSB7XG4gIC8vICAgdGhpcy5kcmF3ZXIuY2xvc2VEcmF3ZXIoKTtcbiAgLy8gfVxuXG59XG5cblxuIl19