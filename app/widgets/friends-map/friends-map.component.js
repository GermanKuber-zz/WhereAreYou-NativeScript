"use strict";
var core_1 = require("@angular/core");
var element_registry_1 = require("nativescript-angular/element-registry");
var nativescript_google_maps_sdk_1 = require("nativescript-google-maps-sdk");
var friends_lives_service_1 = require("../../shared/friends/friends-lives.service");
var map_view_service_1 = require("../../shared/services/map/map-view.service");
var friends_service_1 = require("../../shared/friends/friends.service");
var MarkContainer_1 = require("../../shared/services/map/core/MarkContainer");
var linqts_1 = require("linqts");
element_registry_1.registerElement('MapView', function () { return nativescript_google_maps_sdk_1.MapView; });
var FriendsMapComponent = (function () {
    function FriendsMapComponent(friendsService, friendsLiveService, mapViewService) {
        this.friendsService = friendsService;
        this.friendsLiveService = friendsLiveService;
        this.mapViewService = mapViewService;
        //#Amigos
        // public friends: Array<FriendPosition>;
        this.myFriends = new linqts_1.List();
    }
    ;
    //Events
    FriendsMapComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.friendsService.friendUpdate$.subscribe(function (f) {
            _this.addAllFriends(f);
        });
        this.friendsService.getAllFriends().subscribe(function (f) {
            _this.addAllFriends(f);
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
        // this.getFriendsPositions();
        this.subscribeFriendLocationUpdate();
    };
    FriendsMapComponent.prototype.addAllFriends = function (friends) {
        this.myFriends = new linqts_1.List();
        for (var _i = 0, friends_1 = friends; _i < friends_1.length; _i++) {
            var item = friends_1[_i];
            this.myFriends.Add(item);
            if (item.drawWaytToMe) {
                this.mapViewService.enableDrawWayToMe(item.id);
            }
            else {
                this.mapViewService.disableDrawWayToMe(item.id);
            }
        }
    };
    FriendsMapComponent.prototype.updateFriendLocation = function (friend) {
        var newMarkFriend = this.createMarkerArgs(friend);
        if (newMarkFriend != null)
            this.mapViewService.updateFriendMark(newMarkFriend[0], newMarkFriend[1].id);
        else
            this.mapViewService.removeFriendMark(friend.id);
    };
    FriendsMapComponent.prototype.subscribeFriendLocationUpdate = function () {
        var _this = this;
        //Me suscribo al metodo de actualizacion para obtener actualizacion de ubicacion de mis amigos
        this.friendsLiveService.getFriendsLocations().subscribe(function (f) {
            _this.updateFriendLocation(f);
        });
    };
    // private getFriendsPositions(): void {
    //   //Obtengo todos los amigos conectados por grupo y los dibujo en el mapa
    //   this.friendsLiveService.getFriendsByGroup(1).subscribe(friendsPosition => {
    //     for (var item of friendsPosition) {
    //       var newMarkFriend = this.createMarkerArgs(item);
    //       if (newMarkFriend != null)
    //         this.mapViewService.addFriendnMark(newMarkFriend[0], newMarkFriend[1].id);
    //     }
    //   });
    // }
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZnJpZW5kcy1tYXAuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiZnJpZW5kcy1tYXAuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxzQ0FBNEU7QUFDNUUsMEVBQXdFO0FBQ3hFLDZFQUFtRjtBQUduRixvRkFBZ0Y7QUFHaEYsK0VBQTRFO0FBQzVFLHdFQUFzRTtBQUN0RSw4RUFBNkU7QUFDN0UsaUNBQThCO0FBRzlCLGtDQUFlLENBQUMsU0FBUyxFQUFFLGNBQU0sT0FBQSxzQ0FBTyxFQUFQLENBQU8sQ0FBQyxDQUFDO0FBUTFDLElBQWEsbUJBQW1CO0lBSzlCLDZCQUFvQixjQUE4QixFQUN4QyxrQkFBc0MsRUFDdEMsY0FBOEI7UUFGcEIsbUJBQWMsR0FBZCxjQUFjLENBQWdCO1FBQ3hDLHVCQUFrQixHQUFsQixrQkFBa0IsQ0FBb0I7UUFDdEMsbUJBQWMsR0FBZCxjQUFjLENBQWdCO1FBTnhDLFNBQVM7UUFDVCx5Q0FBeUM7UUFDakMsY0FBUyxHQUFpQixJQUFJLGFBQUksRUFBVSxDQUFDO0lBTXJELENBQUM7SUFOb0QsQ0FBQztJQU90RCxRQUFRO0lBQ1Isc0NBQVEsR0FBUjtRQUFBLGlCQU9DO1FBTkMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxhQUFhLENBQUMsU0FBUyxDQUFDLFVBQUEsQ0FBQztZQUMzQyxLQUFJLENBQUMsYUFBYSxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ3hCLENBQUMsQ0FBQyxDQUFDO1FBQ0gsSUFBSSxDQUFDLGNBQWMsQ0FBQyxhQUFhLEVBQUUsQ0FBQyxTQUFTLENBQUMsVUFBQSxDQUFDO1lBQzdDLEtBQUksQ0FBQyxhQUFhLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDeEIsQ0FBQyxDQUFDLENBQUM7SUFDTCxDQUFDO0lBRUQsWUFBWTtJQUNaLHdDQUFVLEdBQVYsVUFBVyxLQUFLO1FBQWhCLGlCQUlDO1FBSEMsRUFBRSxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsTUFBTSxD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QyxJQUFJLEVBQUUsTUFBTSxDQUFDLENBQUM7UUFDeEIsQ0FBQztRQUFDLElBQUksQ0FBQyxDQUFDO1lBQ04sTUFBTSxDQUFDLElBQUksQ0FBQztRQUNkLENBQUM7SUFFSCxDQUFDO0lBYUgsMEJBQUM7QUFBRCxDQUFDLEFBbEdELElBa0dDO0FBbEdZLG1CQUFtQjtJQU4vQixnQkFBUyxDQUFDO1FBQ1QsUUFBUSxFQUFFLGFBQWE7UUFDdkIsV0FBVyxFQUFFLHNDQUFzQztRQUNuRCxTQUFTLEVBQUUsQ0FBQyw0Q0FBNEMsRUFBRSxxQ0FBcUMsQ0FBQztRQUNoRyxTQUFTLEVBQUUsQ0FBQywwQ0FBa0IsRUFBRSxpQ0FBYyxDQUFDO0tBQ2hELENBQUM7cUNBTW9DLGdDQUFjO1FBQ3BCLDBDQUFrQjtRQUN0QixpQ0FBYztHQVA3QixtQkFBbUIsQ0FrRy9CO0FBbEdZLGtEQUFtQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgVmlld0NoaWxkLCBBZnRlclZpZXdJbml0LCBPbkluaXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IHJlZ2lzdGVyRWxlbWVudCB9IGZyb20gJ25hdGl2ZXNjcmlwdC1hbmd1bGFyL2VsZW1lbnQtcmVnaXN0cnknO1xuaW1wb3J0IHsgTWFwVmlldywgTWFya2VyLCBQb2x5bGluZSwgUG9zaXRpb24gfSBmcm9tICduYXRpdmVzY3JpcHQtZ29vZ2xlLW1hcHMtc2RrJztcbmltcG9ydCBzaWRlRHJhd2VyTW9kdWxlID0gcmVxdWlyZSgnbmF0aXZlc2NyaXB0LXRlbGVyaWstdWkvc2lkZWRyYXdlcicpO1xuaW1wb3J0IHsgUmFkU2lkZURyYXdlckNvbXBvbmVudCwgU2lkZURyYXdlclR5cGUgfSBmcm9tICduYXRpdmVzY3JpcHQtdGVsZXJpay11aS9zaWRlZHJhd2VyL2FuZ3VsYXInO1xuaW1wb3J0IHsgRnJpZW5kc0xpdmVTZXJ2aWNlIH0gZnJvbSAnLi4vLi4vc2hhcmVkL2ZyaWVuZHMvZnJpZW5kcy1saXZlcy5zZXJ2aWNlJztcbmltcG9ydCB7IE9ic2VydmFibGUgfSBmcm9tICcuLi8uLi8uLi9wbGF0Zm9ybXMvaW9zL2J1aWxkL2VtdWxhdG9yL0hlbGxvV29ybGQuYXBwL2FwcC90bnNfbW9kdWxlcy9yeGpzL3NyYy9PYnNlcnZhYmxlJztcbmltcG9ydCB7IEZyaWVuZFBvc2l0aW9uLCBGcmllbmQgfSBmcm9tICcuLi8uLi9zaGFyZWQvZnJpZW5kcy9mcmllbmQnO1xuaW1wb3J0IHsgTWFwVmlld1NlcnZpY2UgfSBmcm9tICcuLi8uLi9zaGFyZWQvc2VydmljZXMvbWFwL21hcC12aWV3LnNlcnZpY2UnO1xuaW1wb3J0IHsgRnJpZW5kc1NlcnZpY2UgfSBmcm9tICcuLi8uLi9zaGFyZWQvZnJpZW5kcy9mcmllbmRzLnNlcnZpY2UnO1xuaW1wb3J0IHsgQWRkTWFya2VyQXJncyB9IGZyb20gJy4uLy4uL3NoYXJlZC9zZXJ2aWNlcy9tYXAvY29yZS9NYXJrQ29udGFpbmVyJztcbmltcG9ydCB7IExpc3QgfSBmcm9tICdsaW5xdHMnO1xuXG5cbnJlZ2lzdGVyRWxlbWVudCgnTWFwVmlldycsICgpID0+IE1hcFZpZXcpO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6IFwiZnJpZW5kcy1tYXBcIixcbiAgdGVtcGxhdGVVcmw6IFwid2lkZ2V0cy9mcmllbmRzLW1hcC9mcmllbmRzLW1hcC5odG1sXCIsXG4gIHN0eWxlVXJsczogW1wid2lkZ2V0cy9mcmllbmRzLW1hcC9mcmllbmRzLW1hcC1jb21tb24uY3NzXCIsIFwid2lkZ2V0cy9mcmllbmRzLW1hcC9mcmllbmRzLW1hcC5jc3NcIl0sXG4gIHByb3ZpZGVyczogW0ZyaWVuZHNMaXZlU2VydmljZSwgTWFwVmlld1NlcnZpY2VdXG59KVxuZXhwb3J0IGNsYXNzIEZyaWVuZHNNYXBDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xuICAvLyNBbWlnb3NcbiAgLy8gcHVibGljIGZyaWVuZHM6IEFycmF5PEZyaWVuZFBvc2l0aW9uPjtcbiAgcHJpdmF0ZSBteUZyaWVuZHM6IExpc3Q8RnJpZW5kPiA9IG5ldyBMaXN0PEZyaWVuZD4oKTs7XG5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSBmcmllbmRzU2VydmljZTogRnJpZW5kc1NlcnZpY2UsXG4gICAgcHJpdmF0ZSBmcmllbmRzTGl2ZVNlcnZpY2U6IEZyaWVuZHNMaXZlU2VydmljZSxcbiAgICBwcml2YXRlIG1hcFZpZXdTZXJ2aWNlOiBNYXBWaWV3U2VydmljZSkge1xuXG4gIH1cbiAgLy9FdmVudHNcbiAgbmdPbkluaXQoKSB7XG4gICAgdGhpcy5mcmllbmRzU2VydmljZS5mcmllbmRVcGRhdGUkLnN1YnNjcmliZShmID0+IHtcbiAgICAgIHRoaXMuYWRkQWxsRnJpZW5kcyhmKTtcbiAgICB9KTtcbiAgICB0aGlzLmZyaWVuZHNTZXJ2aWNlLmdldEFsbEZyaWVuZHMoKS5zdWJzY3JpYmUoZiA9PiB7XG4gICAgICB0aGlzLmFkZEFsbEZyaWVuZHMoZik7XG4gICAgfSk7XG4gIH1cblxuICAvL01hcCBFdmVudHNcbiAgb25NYXBSZWFkeShldmVudCkge1xuICAgIGlmICghZXZlbnQub2JqZWN0KSByZXR1cm47XG4gICAgdGhpcy5tYXBWaWV3U2VydmljZS5vbk1hcFJlYWR5KGV2ZW50LCAoKSA9PiB0aGlzLm1hcFJlYWR5Tm90aWZ5KCkpO1xuXG4gIH1cbiAgbWFwVGFwcGVkKGV2ZW50KSB7XG4gICAgdGhpcy5tYXBWaWV3U2VydmljZS5tYXBUYXBwZWQoZXZlbnQpO1xuICB9XG4gIC8vUHJpdmF0ZSBNZXRob2RzXG4gIHByaXZhdGUgbWFwUmVhZHlOb3RpZnkoKSB7XG5cbiAgICAvLyB0aGlzLmdldEZyaWVuZHNQb3NpdGlvbnMoKTtcbiAgICB0aGlzLnN1YnNjcmliZUZyaWVuZExvY2F0aW9uVXBkYXRlKCk7XG4gIH1cbiAgcHJpdmF0ZSBhZGRBbGxGcmllbmRzKGZyaWVuZHM6IEFycmF5PEZyaWVuZD4pIHtcbiAgICB0aGlzLm15RnJpZW5kcyA9IG5ldyBMaXN0PEZyaWVuZD4oKTtcbiAgICBmb3IgKHZhciBpdGVtIG9mIGZyaWVuZHMpIHtcbiAgICAgIHRoaXMubXlGcmllbmRzLkFkZChpdGVtKTtcbiAgICAgIGlmIChpdGVtLmRyYXdXYXl0VG9NZSkge1xuICAgICAgICB0aGlzLm1hcFZpZXdTZXJ2aWNlLmVuYWJsZURyYXdXYXlUb01lKGl0ZW0uaWQpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy5tYXBWaWV3U2VydmljZS5kaXNhYmxlRHJhd1dheVRvTWUoaXRlbS5pZCk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSB1cGRhdGVGcmllbmRMb2NhdGlvbihmcmllbmQ6IEZyaWVuZFBvc2l0aW9uKTogdm9pZCB7XG4gICAgdmFyIG5ld01hcmtGcmllbmQgPSB0aGlzLmNyZWF0ZU1hcmtlckFyZ3MoZnJpZW5kKTtcbiAgICBpZiAobmV3TWFya0ZyaWVuZCAhPSBudWxsKVxuICAgICAgdGhpcy5tYXBWaWV3U2VydmljZS51cGRhdGVGcmllbmRNYXJrKG5ld01hcmtGcmllbmRbMF0sIG5ld01hcmtGcmllbmRbMV0uaWQpO1xuICAgIGVsc2VcbiAgICAgIHRoaXMubWFwVmlld1NlcnZpY2UucmVtb3ZlRnJpZW5kTWFyayhmcmllbmQuaWQpO1xuICB9XG4gIHByaXZhdGUgc3Vic2NyaWJlRnJpZW5kTG9jYXRpb25VcGRhdGUoKSB7XG4gICAgLy9NZSBzdXNjcmlibyBhbCBtZXRvZG8gZGUgYWN0dWFsaXphY2lvbiBwYXJhIG9idGVuZXIgYWN0dWFsaXphY2lvbiBkZSB1YmljYWNpb24gZGUgbWlzIGFtaWdvc1xuICAgIHRoaXMuZnJpZW5kc0xpdmVTZXJ2aWNlLmdldEZyaWVuZHNMb2NhdGlvbnMoKS5zdWJzY3JpYmUoZiA9PiB7XG4gICAgICB0aGlzLnVwZGF0ZUZyaWVuZExvY2F0aW9uKGYpO1xuICAgIH0pO1xuXG4gIH1cbiAgLy8gcHJpdmF0ZSBnZXRGcmllbmRzUG9zaXRpb25zKCk6IHZvaWQge1xuICAvLyAgIC8vT2J0ZW5nbyB0b2RvcyBsb3MgYW1pZ29zIGNvbmVjdGFkb3MgcG9yIGdydXBvIHkgbG9zIGRpYnVqbyBlbiBlbCBtYXBhXG4gIC8vICAgdGhpcy5mcmllbmRzTGl2ZVNlcnZpY2UuZ2V0RnJpZW5kc0J5R3JvdXAoMSkuc3Vic2NyaWJlKGZyaWVuZHNQb3NpdGlvbiA9PiB7XG4gIC8vICAgICBmb3IgKHZhciBpdGVtIG9mIGZyaWVuZHNQb3NpdGlvbikge1xuICAvLyAgICAgICB2YXIgbmV3TWFya0ZyaWVuZCA9IHRoaXMuY3JlYXRlTWFya2VyQXJncyhpdGVtKTtcbiAgLy8gICAgICAgaWYgKG5ld01hcmtGcmllbmQgIT0gbnVsbClcbiAgLy8gICAgICAgICB0aGlzLm1hcFZpZXdTZXJ2aWNlLmFkZEZyaWVuZG5NYXJrKG5ld01hcmtGcmllbmRbMF0sIG5ld01hcmtGcmllbmRbMV0uaWQpO1xuICAvLyAgICAgfVxuICAvLyAgIH0pO1xuICAvLyB9XG5cbiAgcHJpdmF0ZSBjcmVhdGVNYXJrZXJBcmdzKHBvc2l0aW9uOiBGcmllbmRQb3NpdGlvbik6IFtBZGRNYXJrZXJBcmdzLCBGcmllbmRdIHtcbiAgICB2YXIgbWFyayA9IG5ldyBBZGRNYXJrZXJBcmdzKCk7XG4gICAgdmFyIGZyaWVuZCA9IHRoaXMuZnJpZW5kc1NlcnZpY2UuZ2V0RnJpZW5kQnlJZChwb3NpdGlvbi5pZCk7XG4gICAgaWYgKGZyaWVuZCAhPSBudWxsICYmIGZyaWVuZC5hY3RpdmF0ZSkge1xuICAgICAgbWFyay50aXRsZSA9IGZyaWVuZC5kaXNwbGF5TmFtZTtcbiAgICAgIG1hcmsubG9jYXRpb24gPSBuZXcgUG9zaXRpb24oKTtcbiAgICAgIG1hcmsubG9jYXRpb24ubGF0aXR1ZGUgPSBwb3NpdGlvbi5sYXRpdHVkZTtcbiAgICAgIG1hcmsubG9jYXRpb24ubG9uZ2l0dWRlID0gcG9zaXRpb24ubG9uZ2l0dWRlO1xuICAgICAgcmV0dXJuIFttYXJrLCBmcmllbmRdO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG5cbiAgfVxuICAvLyBAVmlld0NoaWxkKFJhZFNpZGVEcmF3ZXJDb21wb25lbnQpIHB1YmxpYyBkcmF3ZXJDb21wb25lbnQ6IFJhZFNpZGVEcmF3ZXJDb21wb25lbnQ7XG4gIC8vIHByaXZhdGUgZHJhd2VyOiBTaWRlRHJhd2VyVHlwZTtcblxuXG4gIC8vIG9wZW5EcmF3ZXIoKSB7XG4gIC8vICAgdGhpcy5kcmF3ZXIuc2hvd0RyYXdlcigpO1xuICAvLyB9XG5cbiAgLy8gY2xvc2VEcmF3ZXIoKSB7XG4gIC8vICAgdGhpcy5kcmF3ZXIuY2xvc2VEcmF3ZXIoKTtcbiAgLy8gfVxuXG59XG5cblxuIl19