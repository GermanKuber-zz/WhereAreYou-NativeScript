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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZnJpZW5kcy1tYXAuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiZnJpZW5kcy1tYXAuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxzQ0FBNEU7QUFDNUUsMEVBQXdFO0FBQ3hFLDZFQUFtRjtBQUduRixvRkFBZ0Y7QUFHaEYsK0VBQTJGO0FBQzNGLHdFQUFzRTtBQUd0RSxrQ0FBZSxDQUFDLFNBQVMsRUFBRSxjQUFNLE9BQUEsc0NBQU8sRUFBUCxDQUFPLENBQUMsQ0FBQztBQVExQyxJQUFhLG1CQUFtQjtJQUs5Qiw2QkFBb0IsY0FBOEIsRUFDeEMsa0JBQXNDLEVBRXRDLGNBQThCO1FBSHBCLG1CQUFjLEdBQWQsY0FBYyxDQUFnQjtRQUN4Qyx1QkFBa0IsR0FBbEIsa0JBQWtCLENBQW9CO1FBRXRDLG1CQUFjLEdBQWQsY0FBYyxDQUFnQjtRQUN0Qyw4Q0FBOEM7SUFDaEQsQ0FBQztJQUVELHdDQUFVLEdBQVYsVUFBVyxLQUFLO1FBQWhCLGlCQUlDO1FBSEMsRUFBRSxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDO1lBQUMsTUFBTSxDQUFDO1FBQzFCLElBQUksQ0FBQyxjQUFjLENBQUMsVUFBVSxDQUFDLEtBQUssRUFBRSxjQUFNLE9BQUEsS0FBSSxDQUFDLGNBQWMsRUFBRSxFQUFyQixDQUFxQixDQUFDLENBQUM7SUFFckUsQ0FBQztJQUNPLDRDQUFjLEdBQXRCO1FBQ0UsSUFBSSxDQUFDLFdBQVcsR0FBRyxJQUFJLEtBQUssRUFBVSxDQUFDO1FBRXZDLElBQUksQ0FBQyxVQUFVLEVBQUUsQ0FBQztRQUNsQixJQUFJLENBQUMsNkJBQTZCLEVBQUUsQ0FBQztRQUNyQyxJQUFJLENBQUMsY0FBYyxDQUFDLGFBQWEsRUFBRSxDQUFDLFNBQVMsQ0FBQyxVQUFBLENBQUM7WUFDN0MsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxVQUFBLENBQUM7Z0JBQ1QsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFD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dCB7IENvbXBvbmVudCwgVmlld0NoaWxkLCBBZnRlclZpZXdJbml0LCBPbkluaXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IHJlZ2lzdGVyRWxlbWVudCB9IGZyb20gJ25hdGl2ZXNjcmlwdC1hbmd1bGFyL2VsZW1lbnQtcmVnaXN0cnknO1xuaW1wb3J0IHsgTWFwVmlldywgTWFya2VyLCBQb2x5bGluZSwgUG9zaXRpb24gfSBmcm9tICduYXRpdmVzY3JpcHQtZ29vZ2xlLW1hcHMtc2RrJztcbmltcG9ydCBzaWRlRHJhd2VyTW9kdWxlID0gcmVxdWlyZSgnbmF0aXZlc2NyaXB0LXRlbGVyaWstdWkvc2lkZWRyYXdlcicpO1xuaW1wb3J0IHsgUmFkU2lkZURyYXdlckNvbXBvbmVudCwgU2lkZURyYXdlclR5cGUgfSBmcm9tICduYXRpdmVzY3JpcHQtdGVsZXJpay11aS9zaWRlZHJhd2VyL2FuZ3VsYXInO1xuaW1wb3J0IHsgRnJpZW5kc0xpdmVTZXJ2aWNlIH0gZnJvbSAnLi4vLi4vc2hhcmVkL2ZyaWVuZHMvZnJpZW5kcy1saXZlcy5zZXJ2aWNlJztcbmltcG9ydCB7IE9ic2VydmFibGUgfSBmcm9tICcuLi8uLi8uLi9wbGF0Zm9ybXMvaW9zL2J1aWxkL2VtdWxhdG9yL0hlbGxvV29ybGQuYXBwL2FwcC90bnNfbW9kdWxlcy9yeGpzL3NyYy9PYnNlcnZhYmxlJztcbmltcG9ydCB7IEZyaWVuZFBvc2l0aW9uLCBGcmllbmQgfSBmcm9tICcuLi8uLi9zaGFyZWQvZnJpZW5kcy9mcmllbmQnO1xuaW1wb3J0IHsgTWFwVmlld1NlcnZpY2UsIEFkZE1hcmtlckFyZ3MgfSBmcm9tICcuLi8uLi9zaGFyZWQvc2VydmljZXMvbWFwL21hcC12aWV3LnNlcnZpY2UnO1xuaW1wb3J0IHsgRnJpZW5kc1NlcnZpY2UgfSBmcm9tICcuLi8uLi9zaGFyZWQvZnJpZW5kcy9mcmllbmRzLnNlcnZpY2UnO1xuXG5cbnJlZ2lzdGVyRWxlbWVudCgnTWFwVmlldycsICgpID0+IE1hcFZpZXcpO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6IFwiZnJpZW5kcy1tYXBcIixcbiAgdGVtcGxhdGVVcmw6IFwid2lkZ2V0cy9mcmllbmRzLW1hcC9mcmllbmRzLW1hcC5odG1sXCIsXG4gIHN0eWxlVXJsczogW1wid2lkZ2V0cy9mcmllbmRzLW1hcC9mcmllbmRzLW1hcC1jb21tb24uY3NzXCIsIFwid2lkZ2V0cy9mcmllbmRzLW1hcC9mcmllbmRzLW1hcC5jc3NcIl0sXG4gIHByb3ZpZGVyczogW0ZyaWVuZHNMaXZlU2VydmljZSwgTWFwVmlld1NlcnZpY2VdXG59KVxuZXhwb3J0IGNsYXNzIEZyaWVuZHNNYXBDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xuICAvLyNBbWlnb3NcbiAgLy8gcHVibGljIGZyaWVuZHM6IEFycmF5PEZyaWVuZFBvc2l0aW9uPjtcbiAgcHJpdmF0ZSBmcmllbmRzTGlzdDogQXJyYXk8RnJpZW5kPjtcblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIGZyaWVuZHNTZXJ2aWNlOiBGcmllbmRzU2VydmljZSxcbiAgICBwcml2YXRlIGZyaWVuZHNMaXZlU2VydmljZTogRnJpZW5kc0xpdmVTZXJ2aWNlLFxuXG4gICAgcHJpdmF0ZSBtYXBWaWV3U2VydmljZTogTWFwVmlld1NlcnZpY2UpIHtcbiAgICAvLyB0aGlzLmZyaWVuZHMgPSBuZXcgQXJyYXk8RnJpZW5kUG9zaXRpb24+KCk7XG4gIH1cblxuICBvbk1hcFJlYWR5KGV2ZW50KSB7XG4gICAgaWYgKCFldmVudC5vYmplY3QpIHJldHVybjtcbiAgICB0aGlzLm1hcFZpZXdTZXJ2aWNlLm9uTWFwUmVhZHkoZXZlbnQsICgpID0+IHRoaXMubWFwUmVhZHlOb3RpZnkoKSk7XG5cbiAgfVxuICBwcml2YXRlIG1hcFJlYWR5Tm90aWZ5KCkge1xuICAgIHRoaXMuZnJpZW5kc0xpc3QgPSBuZXcgQXJyYXk8RnJpZW5kPigpO1xuXG4gICAgdGhpcy5nZXRGcmllbmRzKCk7XG4gICAgdGhpcy5zdWJzY3JpYmVGcmllbmRMb2NhdGlvblVwZGF0ZSgpO1xuICAgIHRoaXMuZnJpZW5kc1NlcnZpY2UuZ2V0QWxsRnJpZW5kcygpLnN1YnNjcmliZSh4ID0+IHtcbiAgICAgIHguZm9yRWFjaChzID0+IHtcbiAgICAgICAgaWYgKCFzLmFjdGl2YXRlKSB7XG4gICAgICAgICAgLy9zaSBlbCBhbWlnbyBlc3RhIGRlc2FjdGl2YWRvIGxvIGVsaW1pbm9cblxuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9KTtcbiAgfVxuICBuZ09uSW5pdCgpIHtcblxuICB9XG5cbiAgcHJpdmF0ZSB1cGRhdGVGcmllbmRMb2NhdGlvbihmcmllbmQ6IEZyaWVuZFBvc2l0aW9uKTogdm9pZCB7XG4gICAgdmFyIG5ld01hcmtGcmllbmQgPSB0aGlzLmNyZWF0ZU1hcmsoZnJpZW5kKTtcbiAgICBpZiAobmV3TWFya0ZyaWVuZCAhPSBudWxsKVxuICAgICAgdGhpcy5tYXBWaWV3U2VydmljZS51cGRhdGVDb21tb25NYXJrKG5ld01hcmtGcmllbmRbMF0sIG5ld01hcmtGcmllbmRbMV0uaWQpO1xuICB9XG4gIHByaXZhdGUgc3Vic2NyaWJlRnJpZW5kTG9jYXRpb25VcGRhdGUoKSB7XG4gICAgLy9NZSBzdXNjcmlibyBhbCBtZXRvZG8gZGUgYWN0dWFsaXphY2lvbiBwYXJhIG9idGVuZXIgYWN0dWFsaXphY2lvbiBkZSB1YmljYWNpb24gZGUgbWlzIGFtaWdvc1xuICAgIHRoaXMuZnJpZW5kc0xpdmVTZXJ2aWNlLnVwZGF0ZUZyaWVuZExvY2F0aW9uKChmKSA9PiB0aGlzLnVwZGF0ZUZyaWVuZExvY2F0aW9uKGYpKTtcblxuICB9XG4gIHByaXZhdGUgZ2V0RnJpZW5kcygpOiB2b2lkIHtcbiAgICAvL09idGVuZ28gdG9kb3MgbG9zIGFtaWdvcyBjb25lY3RhZG9zIHBvciBncnVwbyB5IGxvcyBkaWJ1am8gZW4gZWwgbWFwYVxuICAgIHRoaXMuZnJpZW5kc0xpdmVTZXJ2aWNlLmdldEZyaWVuZHNCeUdyb3VwKDEpLnN1YnNjcmliZShmcmllbmRzUG9zaXRpb24gPT4ge1xuICAgICAgZm9yICh2YXIgaXRlbSBvZiBmcmllbmRzUG9zaXRpb24pIHtcbiAgICAgICAgdmFyIG5ld01hcmtGcmllbmQgPSB0aGlzLmNyZWF0ZU1hcmsoaXRlbSk7XG4gICAgICAgIGlmIChuZXdNYXJrRnJpZW5kICE9IG51bGwpXG4gICAgICAgICAgdGhpcy5tYXBWaWV3U2VydmljZS5hZGRDb21tb25NYXJrKG5ld01hcmtGcmllbmRbMF0sIG5ld01hcmtGcmllbmRbMV0uaWQpO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG5cbiAgcHJpdmF0ZSBjcmVhdGVNYXJrKHBvc2l0aW9uOiBGcmllbmRQb3NpdGlvbik6IFtBZGRNYXJrZXJBcmdzLCBGcmllbmRdIHtcbiAgICB2YXIgbWFyayA9IG5ldyBBZGRNYXJrZXJBcmdzKCk7XG4gICAgdmFyIGZyaWVuZCA9IHRoaXMuZnJpZW5kc1NlcnZpY2UuZ2V0RnJpZW5kQnlJZChwb3NpdGlvbi5pZCk7XG4gICAgaWYgKGZyaWVuZCAhPSBudWxsICYmIGZyaWVuZC5hY3RpdmF0ZSkge1xuICAgICAgbWFyay50aXRsZSA9IGZyaWVuZC5kaXNwbGF5TmFtZTtcbiAgICAgIG1hcmsubG9jYXRpb24gPSBuZXcgUG9zaXRpb24oKTtcbiAgICAgIG1hcmsubG9jYXRpb24ubGF0aXR1ZGUgPSBwb3NpdGlvbi5sYXRpdHVkZTtcbiAgICAgIG1hcmsubG9jYXRpb24ubG9uZ2l0dWRlID0gcG9zaXRpb24ubG9uZ2l0dWRlO1xuICAgICAgcmV0dXJuIFttYXJrLCBmcmllbmRdO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG5cbiAgfVxuICAvLyBAVmlld0NoaWxkKFJhZFNpZGVEcmF3ZXJDb21wb25lbnQpIHB1YmxpYyBkcmF3ZXJDb21wb25lbnQ6IFJhZFNpZGVEcmF3ZXJDb21wb25lbnQ7XG4gIC8vIHByaXZhdGUgZHJhd2VyOiBTaWRlRHJhd2VyVHlwZTtcblxuXG4gIC8vIG9wZW5EcmF3ZXIoKSB7XG4gIC8vICAgdGhpcy5kcmF3ZXIuc2hvd0RyYXdlcigpO1xuICAvLyB9XG5cbiAgLy8gY2xvc2VEcmF3ZXIoKSB7XG4gIC8vICAgdGhpcy5kcmF3ZXIuY2xvc2VEcmF3ZXIoKTtcbiAgLy8gfVxuXG59XG5cblxuIl19