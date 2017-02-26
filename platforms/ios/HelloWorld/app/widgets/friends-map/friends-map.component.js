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
        this.friendsLiveService.updateFriendLocation(function (f) { return _this.updateFriendLocation(f); });
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
        if (friend != null) {
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
        providers: [friends_lives_service_1.FriendsLiveService, friends_service_1.FriendsService, map_view_service_1.MapViewService]
    }),
    __metadata("design:paramtypes", [friends_service_1.FriendsService,
        friends_lives_service_1.FriendsLiveService,
        map_view_service_1.MapViewService])
], FriendsMapComponent);
exports.FriendsMapComponent = FriendsMapComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZnJpZW5kcy1tYXAuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiZnJpZW5kcy1tYXAuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxzQ0FBNEU7QUFDNUUsMEVBQXdFO0FBQ3hFLDZFQUFtRjtBQUduRixvRkFBZ0Y7QUFHaEYsK0VBQTJGO0FBQzNGLHdFQUFzRTtBQUd0RSxrQ0FBZSxDQUFDLFNBQVMsRUFBRSxjQUFNLE9BQUEsc0NBQU8sRUFBUCxDQUFPLENBQUMsQ0FBQztBQVExQyxJQUFhLG1CQUFtQjtJQUs5Qiw2QkFBb0IsY0FBOEIsRUFDeEMsa0JBQXNDLEVBRXRDLGNBQThCO1FBSHBCLG1CQUFjLEdBQWQsY0FBYyxDQUFnQjtRQUN4Qyx1QkFBa0IsR0FBbEIsa0JBQWtCLENBQW9CO1FBRXRDLG1CQUFjLEdBQWQsY0FBYyxDQUFnQjtRQUN0Qyw4Q0FBOEM7SUFDaEQsQ0FBQztJQUVELHdDQUFVLEdBQVYsVUFBVyxLQUFLO1FBQWhCLGlCQUlDO1FBSEMsRUFBRSxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDO1lBQUMsTUFBTSxDQUFDO1FBQzFCLElBQUksQ0FBQyxjQUFjLENBQUMsVUFBVSxDQUFDLEtBQUssRUFBRSxjQUFNLE9BQUEsS0FBSSxDQUFDLGNBQWMsRUFBRSxFQUFyQixDQUFxQixDQUFDLENBQUM7SUFFckUsQ0FBQztJQUNPLDRDQUFjLEdBQXRCO1FBQ0UsSUFBSSxDQUFDLFdBQVcsR0FBRyxJQUFJLEtBQUssRUFBVSxDQUFDO1FBRXZDLElBQUksQ0FBQyxVQUFVLEVBQUUsQ0FBQztRQUNsQixJQUFJLENBQUMsNkJBQTZCLEVBQUUsQ0FBQztJQUN2QyxDQUFDO0lBQ0Qsc0NBQVEsR0FBUjtJQUVBLENBQUM7SUFFTyxrREFBb0IsR0FBNUIsVUFBNkIsTUFBc0I7UUFDakQsSUFBSSxhQUFhLEdBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUM1QyxFQUFFLENBQUMsQ0FBQyxhQUFhLElBQUksSUFBSSxDQUFDO1lBQ3BCLElBQUksQ0FBQyxjQUFjLENBQUMsZ0JBQWdCLENBQUMsYUFBYSxDQUFDLENBQUMsQ0FBQyxFQUFFLGFBQWEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQztJQUNwRixDQUFDO0lBQ08sMkRBQTZCLEdBQXJDO1FBQUEsaUJBSUM7UUFIQyw4RkFBOEY7UUFDOUYsSUFBSSxDQUFDLGtCQUFrQixDQUFDLG9CQUFvQixDQUFDLFVBQUMsQ0FBQyxJQUFLLE9BQUEsS0FBSSxDQUFDLG9CQUFvQixDQUFDLENBQUMsQ0FBQyxFQUE1QixDQUE0QixDQUFDLENBQUM7SUFFcEYsQ0FBQztJQUNPLHdDQUFVLEdBQWxCO1FBQUEsaUJBU0M7UUFSQyx1RUFBdUU7UUFDdkUsSUFBSSxDQUFDLGtCQUFrQixDQUFDLGlCQUFpQixDQUFDLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxVQUFBLGVBQWU7WUFDcEUsR0FBRyxDQUFDLENBQWEsVUFBZSxFQUFmLG1DQUFlLEVBQWYsNkJBQWUsRUFBZixJQUFlO2dCQUEzQixJQUFJLElBQUksd0JBQUE7Z0JBQ1gsSUFBSSxhQUFhLEdBQUcsS0FBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsQ0FBQztnQkFDMUMsRUFBRSxDQUFDLENBQUMsYUFBYSxJQUFJLElBQUksQ0FBQztvQkFDeEIsS0FBSSxDQUFDLGNBQWMsQ0FBQyxhQUFhLENBQUMsYUFBYSxDQUFDLENBQUMsQ0FBQyxFQUFFLGFBQWEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQzthQUM1RTtRQUNILENBQUMsQ0FBQyxDQUFDO0lBQ0wsQ0FBQztJQUVPLHdDQUFVLEdBQWxCLFVBQW1CLFFBQXdCO1FBQ3pDLElBQUksSUFBSSxHQUFHLElBQUksZ0NBQWEsRUFBRSxDQUFDO1FBQy9CLElBQUksTUFBTSxHQUFHLElBQUksQ0FBQyxjQUFjLENBQUMsYUFBYSxDQUFDLFFBQVEsQ0FBQyxFQUFFLENBQUMsQ0FBQztRQUM1RCxFQUFFLENBQUMsQ0FBQyxNQUFNLElBQUksSUFBSSxDQUFDLENBQUMsQ0FBQztZQUNuQixJQUFJLENBQUMsS0FBSyxHQUFHLE1BQU0sQ0FBQyxXQUFXLENBQUM7WUFDaEMsSUFBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLHVDQUFRLEVBQUUsQ0FBQztZQUMvQixJQUFJLENBQUMsUUFBUSxDQUFDLFFBQVEsR0FBRyxRQUFRLENBQUMsUUFBUSxDQUFDO1lBQzNDLElBQUksQ0FBQyxRQUFRLENBQUMsU0FBUyxHQUFHLFFBQVEsQ0FBQyxTQUFTLENBQUM7WUFDN0MsTUFBTSxDQUFDLENBQUMsSUFBSSxFQUFFLE1BQU0sQ0FBQyxDQUFDO1FBQ3hCLENBQUM7UUFBQyxJQUFJLENBQUMsQ0FBQztZQUNOLE1BQU0sQ0FBQyxJQUFJLENBQUM7UUFDZCxDQUFDO0lBRUgsQ0FBQztJQWFILDBCQUFDO0FBQUQsQ0FBQyxBQTFFRCxJQTBFQztBQTFFWSxtQkFBbUI7SUFOL0IsZ0JBQVMsQ0FBQztRQUNULFFBQVEsRUFBRSxhQUFhO1FBQ3ZCLFdBQVcsRUFBRSxzQ0FBc0M7UUFDbkQsU0FBUyxFQUFFLENBQUMsNENBQTRDLEVBQUUscUNBQXFDLENBQUM7UUFDaEcsU0FBUyxFQUFFLENBQUMsMENBQWtCLEVBQUUsZ0NBQWMsRUFBRSxpQ0FBYyxDQUFDO0tBQ2hFLENBQUM7cUNBTW9DLGdDQUFjO1FBQ3BCLDBDQUFrQjtRQUV0QixpQ0FBYztHQVI3QixtQkFBbUIsQ0EwRS9CO0FBMUVZLGtEQUFtQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgVmlld0NoaWxkLCBBZnRlclZpZXdJbml0LCBPbkluaXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IHJlZ2lzdGVyRWxlbWVudCB9IGZyb20gJ25hdGl2ZXNjcmlwdC1hbmd1bGFyL2VsZW1lbnQtcmVnaXN0cnknO1xuaW1wb3J0IHsgTWFwVmlldywgTWFya2VyLCBQb2x5bGluZSwgUG9zaXRpb24gfSBmcm9tICduYXRpdmVzY3JpcHQtZ29vZ2xlLW1hcHMtc2RrJztcbmltcG9ydCBzaWRlRHJhd2VyTW9kdWxlID0gcmVxdWlyZSgnbmF0aXZlc2NyaXB0LXRlbGVyaWstdWkvc2lkZWRyYXdlcicpO1xuaW1wb3J0IHsgUmFkU2lkZURyYXdlckNvbXBvbmVudCwgU2lkZURyYXdlclR5cGUgfSBmcm9tICduYXRpdmVzY3JpcHQtdGVsZXJpay11aS9zaWRlZHJhd2VyL2FuZ3VsYXInO1xuaW1wb3J0IHsgRnJpZW5kc0xpdmVTZXJ2aWNlIH0gZnJvbSAnLi4vLi4vc2hhcmVkL2ZyaWVuZHMvZnJpZW5kcy1saXZlcy5zZXJ2aWNlJztcbmltcG9ydCB7IE9ic2VydmFibGUgfSBmcm9tICcuLi8uLi8uLi9wbGF0Zm9ybXMvaW9zL2J1aWxkL2VtdWxhdG9yL0hlbGxvV29ybGQuYXBwL2FwcC90bnNfbW9kdWxlcy9yeGpzL3NyYy9PYnNlcnZhYmxlJztcbmltcG9ydCB7IEZyaWVuZFBvc2l0aW9uLCBGcmllbmQgfSBmcm9tICcuLi8uLi9zaGFyZWQvZnJpZW5kcy9mcmllbmQnO1xuaW1wb3J0IHsgTWFwVmlld1NlcnZpY2UsIEFkZE1hcmtlckFyZ3MgfSBmcm9tICcuLi8uLi9zaGFyZWQvc2VydmljZXMvbWFwL21hcC12aWV3LnNlcnZpY2UnO1xuaW1wb3J0IHsgRnJpZW5kc1NlcnZpY2UgfSBmcm9tICcuLi8uLi9zaGFyZWQvZnJpZW5kcy9mcmllbmRzLnNlcnZpY2UnO1xuXG5cbnJlZ2lzdGVyRWxlbWVudCgnTWFwVmlldycsICgpID0+IE1hcFZpZXcpO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6IFwiZnJpZW5kcy1tYXBcIixcbiAgdGVtcGxhdGVVcmw6IFwid2lkZ2V0cy9mcmllbmRzLW1hcC9mcmllbmRzLW1hcC5odG1sXCIsXG4gIHN0eWxlVXJsczogW1wid2lkZ2V0cy9mcmllbmRzLW1hcC9mcmllbmRzLW1hcC1jb21tb24uY3NzXCIsIFwid2lkZ2V0cy9mcmllbmRzLW1hcC9mcmllbmRzLW1hcC5jc3NcIl0sXG4gIHByb3ZpZGVyczogW0ZyaWVuZHNMaXZlU2VydmljZSwgRnJpZW5kc1NlcnZpY2UsIE1hcFZpZXdTZXJ2aWNlXVxufSlcbmV4cG9ydCBjbGFzcyBGcmllbmRzTWFwQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcbiAgLy8jQW1pZ29zXG4gIC8vIHB1YmxpYyBmcmllbmRzOiBBcnJheTxGcmllbmRQb3NpdGlvbj47XG4gIHByaXZhdGUgZnJpZW5kc0xpc3Q6IEFycmF5PEZyaWVuZD47XG5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSBmcmllbmRzU2VydmljZTogRnJpZW5kc1NlcnZpY2UsXG4gICAgcHJpdmF0ZSBmcmllbmRzTGl2ZVNlcnZpY2U6IEZyaWVuZHNMaXZlU2VydmljZSxcblxuICAgIHByaXZhdGUgbWFwVmlld1NlcnZpY2U6IE1hcFZpZXdTZXJ2aWNlKSB7XG4gICAgLy8gdGhpcy5mcmllbmRzID0gbmV3IEFycmF5PEZyaWVuZFBvc2l0aW9uPigpO1xuICB9XG5cbiAgb25NYXBSZWFkeShldmVudCkge1xuICAgIGlmICghZXZlbnQub2JqZWN0KSByZXR1cm47XG4gICAgdGhpcy5tYXBWaWV3U2VydmljZS5vbk1hcFJlYWR5KGV2ZW50LCAoKSA9PiB0aGlzLm1hcFJlYWR5Tm90aWZ5KCkpO1xuXG4gIH1cbiAgcHJpdmF0ZSBtYXBSZWFkeU5vdGlmeSgpIHtcbiAgICB0aGlzLmZyaWVuZHNMaXN0ID0gbmV3IEFycmF5PEZyaWVuZD4oKTtcblxuICAgIHRoaXMuZ2V0RnJpZW5kcygpO1xuICAgIHRoaXMuc3Vic2NyaWJlRnJpZW5kTG9jYXRpb25VcGRhdGUoKTtcbiAgfVxuICBuZ09uSW5pdCgpIHtcblxuICB9XG5cbiAgcHJpdmF0ZSB1cGRhdGVGcmllbmRMb2NhdGlvbihmcmllbmQ6IEZyaWVuZFBvc2l0aW9uKTogdm9pZCB7XG4gICAgdmFyIG5ld01hcmtGcmllbmQgPSB0aGlzLmNyZWF0ZU1hcmsoZnJpZW5kKTtcbiAgICBpZiAobmV3TWFya0ZyaWVuZCAhPSBudWxsKVxuICAgICAgICAgIHRoaXMubWFwVmlld1NlcnZpY2UudXBkYXRlQ29tbW9uTWFyayhuZXdNYXJrRnJpZW5kWzBdLCBuZXdNYXJrRnJpZW5kWzFdLmlkKTtcbiAgfVxuICBwcml2YXRlIHN1YnNjcmliZUZyaWVuZExvY2F0aW9uVXBkYXRlKCkge1xuICAgIC8vTWUgc3VzY3JpYm8gYWwgbWV0b2RvIGRlIGFjdHVhbGl6YWNpb24gcGFyYSBvYnRlbmVyIGFjdHVhbGl6YWNpb24gZGUgdWJpY2FjaW9uIGRlIG1pcyBhbWlnb3NcbiAgICB0aGlzLmZyaWVuZHNMaXZlU2VydmljZS51cGRhdGVGcmllbmRMb2NhdGlvbigoZikgPT4gdGhpcy51cGRhdGVGcmllbmRMb2NhdGlvbihmKSk7XG5cbiAgfVxuICBwcml2YXRlIGdldEZyaWVuZHMoKTogdm9pZCB7XG4gICAgLy9PYnRlbmdvIHRvZG9zIGxvcyBhbWlnb3MgY29uZWN0YWRvcyBwb3IgZ3J1cG8geSBsb3MgZGlidWpvIGVuIGVsIG1hcGFcbiAgICB0aGlzLmZyaWVuZHNMaXZlU2VydmljZS5nZXRGcmllbmRzQnlHcm91cCgxKS5zdWJzY3JpYmUoZnJpZW5kc1Bvc2l0aW9uID0+IHtcbiAgICAgIGZvciAodmFyIGl0ZW0gb2YgZnJpZW5kc1Bvc2l0aW9uKSB7XG4gICAgICAgIHZhciBuZXdNYXJrRnJpZW5kID0gdGhpcy5jcmVhdGVNYXJrKGl0ZW0pO1xuICAgICAgICBpZiAobmV3TWFya0ZyaWVuZCAhPSBudWxsKVxuICAgICAgICAgIHRoaXMubWFwVmlld1NlcnZpY2UuYWRkQ29tbW9uTWFyayhuZXdNYXJrRnJpZW5kWzBdLCBuZXdNYXJrRnJpZW5kWzFdLmlkKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuXG4gIHByaXZhdGUgY3JlYXRlTWFyayhwb3NpdGlvbjogRnJpZW5kUG9zaXRpb24pOiBbQWRkTWFya2VyQXJncywgRnJpZW5kXSB7XG4gICAgdmFyIG1hcmsgPSBuZXcgQWRkTWFya2VyQXJncygpO1xuICAgIHZhciBmcmllbmQgPSB0aGlzLmZyaWVuZHNTZXJ2aWNlLmdldEZyaWVuZEJ5SWQocG9zaXRpb24uaWQpO1xuICAgIGlmIChmcmllbmQgIT0gbnVsbCkge1xuICAgICAgbWFyay50aXRsZSA9IGZyaWVuZC5kaXNwbGF5TmFtZTtcbiAgICAgIG1hcmsubG9jYXRpb24gPSBuZXcgUG9zaXRpb24oKTtcbiAgICAgIG1hcmsubG9jYXRpb24ubGF0aXR1ZGUgPSBwb3NpdGlvbi5sYXRpdHVkZTtcbiAgICAgIG1hcmsubG9jYXRpb24ubG9uZ2l0dWRlID0gcG9zaXRpb24ubG9uZ2l0dWRlO1xuICAgICAgcmV0dXJuIFttYXJrLCBmcmllbmRdO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG5cbiAgfVxuICAvLyBAVmlld0NoaWxkKFJhZFNpZGVEcmF3ZXJDb21wb25lbnQpIHB1YmxpYyBkcmF3ZXJDb21wb25lbnQ6IFJhZFNpZGVEcmF3ZXJDb21wb25lbnQ7XG4gIC8vIHByaXZhdGUgZHJhd2VyOiBTaWRlRHJhd2VyVHlwZTtcblxuXG4gIC8vIG9wZW5EcmF3ZXIoKSB7XG4gIC8vICAgdGhpcy5kcmF3ZXIuc2hvd0RyYXdlcigpO1xuICAvLyB9XG5cbiAgLy8gY2xvc2VEcmF3ZXIoKSB7XG4gIC8vICAgdGhpcy5kcmF3ZXIuY2xvc2VEcmF3ZXIoKTtcbiAgLy8gfVxuXG59XG5cblxuIl19