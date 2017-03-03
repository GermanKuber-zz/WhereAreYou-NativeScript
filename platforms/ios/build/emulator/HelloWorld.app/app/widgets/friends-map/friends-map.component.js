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
        this.getFriendsPositions();
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZnJpZW5kcy1tYXAuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiZnJpZW5kcy1tYXAuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxzQ0FBNEU7QUFDNUUsMEVBQXdFO0FBQ3hFLDZFQUFtRjtBQUduRixvRkFBZ0Y7QUFHaEYsK0VBQTRFO0FBQzVFLHdFQUFzRTtBQUN0RSw4RUFBNkU7QUFDN0UsaUNBQThCO0FBRzlCLGtDQUFlLENBQUMsU0FBUyxFQUFFLGNBQU0sT0FBQSxzQ0FBTyxFQUFQLENBQU8sQ0FBQyxDQUFDO0FBUTFDLElBQWEsbUJBQW1CO0lBSzlCLDZCQUFvQixjQUE4QixFQUN4QyxrQkFBc0MsRUFDdEMsY0FBOEI7UUFGcEIsbUJBQWMsR0FBZCxjQUFjLENBQWdCO1FBQ3hDLHVCQUFrQixHQUFsQixrQkFBa0IsQ0FBb0I7UUFDdEMsbUJBQWMsR0FBZCxjQUFjLENBQWdCO1FBTnhDLFNBQVM7UUFDVCx5Q0FBeUM7UUFDakMsY0FBUyxHQUFpQixJQUFJLGFBQUksRUFBVSxDQUFDO0lBTXJELENBQUM7SUFOb0QsQ0FBQztJQU90RCxRQUFRO0lBQ1Isc0NBQVEsR0FBUjtRQUFBLGlCQU9DO1FBTkMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxhQUFhLENBQUMsU0FBUyxDQUFDLFVBQUEsQ0FBQztZQUMzQyxLQUFJLENBQUMsYUFBYSxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ3hCLENBQUMsQ0FBQyxDQUFDO1FBQ0gsSUFBSSxDQUFDLGNBQWMsQ0FBQyxhQUFhLEVBQUUsQ0FBQyxTQUFTLENBQUMsVUFBQSxDQUFDO1lBQzdDLEtBQUksQ0FBQyxhQUFhLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDeEIsQ0FBQyxDQUFDLENBQUM7SUFDTCxDQUFDO0lBRUQsWUFBWTtJQUNaLHdDQUFVLEdBQVYsVUFBVyxLQUFLO1FBQWhCLGlCQUlDO1FBSEMsRUFBRSxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDO1lBQUMsTUFBTSxDQUFDO1FBQzFCLElBQUksQ0FBQyxjQUFjLENBQUMsVUFBVSxDQUFDLEtBQUssRUFBRSxjQUFNLE9BQUEsS0FBSSxDQUFDLGNBQWMsRUFBRSxFQUFyQixDQUFxQixDQUFDLENBQUM7SUFFckUsQ0FBQztJQUNELHVDQUFTLEdBQVQsVUFBVSxLQUFLO1FBQ2IsSUFBSSxDQUFDLGNBQWMsQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDdkMsQ0FBQztJQUNELGlCQUFpQjtJQUNULDRDQUFjLEdBQXRCO1FBRUUsSUFBSSxDQUFDLG1CQUFtQixFQUFFLENBQUM7UUFDM0IsSUFBSSxDQUFDLDZCQUE2QixFQUFFLENBQUM7SUFDdkMsQ0FBQztJQUNPLDJDQUFhLEdBQXJCLFVBQXNCLE9BQXNCO1FBQzFDLElBQUksQ0FBQyxTQUFTLEdBQUcsSUFBSSxhQUFJLEVBQVUsQ0FBQztRQUNwQyxHQUFHLENBQUMsQ0FBYSxVQUFPLEVBQVAsbUJBQU8sRUFBUCxxQkFBTyxFQUFQLElBQU87WUFBbkIsSUFBSSxJQUFJLGdCQUFBO1lBQ1gsSUFBSSxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUM7WUFDekIsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxDQUFDLENBQUM7Z0JBQ3RCLElBQUksQ0FBQyxjQUFjLENBQUMsaUJBQWlCLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDO1lBQ2pELENBQUM7WUFBQSxJQUFJLENBQUEsQ0FBQztnQkFDSixJQUFJLENBQUMsY0FBYyxDQUFDLGtCQUFrQixDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQztZQUNsRCxDQUFDO1NBQ0Y7SUFDSCxDQUFDO0lBRU8sa0RBQW9CLEdBQTVCLFVBQTZCLE1BQXNCO1FBQ2pELElBQUksYUFBYSxHQUFHLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUNsRCxFQUFFLENBQUMsQ0FBQyxhQUFhLElBQUksSUFBSSxDQUFDO1lBQ3hCLElBQUksQ0FBQyxjQUFjLENBQUMsZ0JBQWdCLENBQUMsYUFBYSxDQUFDLENBQUMsQ0FBQyxFQUFFLGFBQWEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQztJQUNoRixDQUFDO0lBQ08sMkRBQTZCLEdBQXJDO1FBQUEsaUJBTUM7UUFMQyw4RkFBOEY7UUFDOUYsSUFBSSxDQUFDLGtCQUFrQixDQUFDLG1CQUFtQixFQUFFLENBQUMsU0FBUyxDQUFDLFVBQUEsQ0FBQztZQUN2RCxLQUFJLENBQUMsb0JBQW9CLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDL0IsQ0FBQyxDQUFDLENBQUM7SUFFTCxDQUFDO0lBQ08saURBQW1CLEdBQTNCO1FBQUEsaUJBU0M7UUFSQyx1RUFBdUU7UUFDdkUsSUFBSSxDQUFDLGtCQUFrQixDQUFDLGlCQUFpQixDQUFDLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxVQUFBLGVBQWU7WUFDcEUsR0FBRyxDQUFDLENBQWEsVUFBZSxFQUFmLG1DQUFlLEVBQWYsNkJBQWUsRUFBZixJQUFlO2dCQUEzQixJQUFJLElBQUksd0JBQUE7Z0JBQ1gsSUFBSSxhQUFhLEdBQUcsS0FBSSxDQUFDLGdCQUFnQixDQUFDLElBQUksQ0FBQyxDQUFDO2dCQUNoRCxFQUFFLENBQUMsQ0FBQyxhQUFhLElBQUksSUFBSSxDQUFDO29CQUN4QixLQUFJLENBQUMsY0FBYyxDQUFDLGNBQWMsQ0FBQyxhQUFhLENBQUMsQ0FBQyxDQUFDLEVBQUUsYUFBYSxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDO2FBQzdFO1FBQ0gsQ0FBQyxDQUFDLENBQUM7SUFDTCxDQUFDO0lBRU8sOENBQWdCLEdBQXhCLFVBQXlCLFFBQXdCO1FBQy9DLElBQUksSUFBSSxHQUFHLElBQUksNkJBQWEsRUFBRSxDQUFDO1FBQy9CLElBQUksTUFBTSxHQUFHLElBQUksQ0FBQyxjQUFjLENBQUMsYUFBYSxDQUFDLFFBQVEsQ0FBQyxFQUFFLENBQUMsQ0FBQztRQUM1RCxFQUFFLENBQUMsQ0FBQyxNQUFNLElBQUksSUFBSSxJQUFJLE1BQU0sQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDO1lBQ3RDLElBQUksQ0FBQyxLQUFLLEdBQUcsTUFBTSxDQUFDLFdBQVcsQ0FBQztZQUNoQyxJQUFJLENBQUMsUUFBUSxHQUFHLElBQUksdUNBQVEsRUFBRSxDQUFDO1lBQy9CLElBQUksQ0FBQyxRQUFRLENBQUMsUUFBUSxHQUFHLFFBQVEsQ0FBQyxRQUFRLENBQUM7WUFDM0MsSUFBSSxDQUFDLFFBQVEsQ0FBQyxTQUFTLEdBQUcsUUFBUSxDQUFDLFNBQVMsQ0FBQztZQUM3QyxNQUFNLENBQUMsQ0FBQyxJQUFJLEVBQUUsTUFBTSxDQUFDLENBQUM7UUFDeEIsQ0FBQztRQUFDLElBQUksQ0FBQyxDQUFDO1lBQ04sTUFBTSxDQUFDLElBQUksQ0FBQztRQUNkLENBQUM7SUFFSCxDQUFDO0lBYUgsMEJBQUM7QUFBRCxDQUFDLEFBaEdELElBZ0dDO0FBaEdZLG1CQUFtQjtJQU4vQixnQkFBUyxDQUFDO1FBQ1QsUUFBUSxFQUFFLGFBQWE7UUFDdkIsV0FBVyxFQUFFLHNDQUFzQztRQUNuRCxTQUFTLEVBQUUsQ0FBQyw0Q0FBNEMsRUFBRSxxQ0FBcUMsQ0FBQztRQUNoRyxTQUFTLEVBQUUsQ0FBQywwQ0FBa0IsRUFBRSxpQ0FBYyxDQUFDO0tBQ2hELENBQUM7cUNBTW9DLGdDQUFjO1FBQ3BCLDBDQUFrQjtRQUN0QixpQ0FBYztHQVA3QixtQkFBbUIsQ0FnRy9CO0FBaEdZLGtEQUFtQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgVmlld0NoaWxkLCBBZnRlclZpZXdJbml0LCBPbkluaXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IHJlZ2lzdGVyRWxlbWVudCB9IGZyb20gJ25hdGl2ZXNjcmlwdC1hbmd1bGFyL2VsZW1lbnQtcmVnaXN0cnknO1xuaW1wb3J0IHsgTWFwVmlldywgTWFya2VyLCBQb2x5bGluZSwgUG9zaXRpb24gfSBmcm9tICduYXRpdmVzY3JpcHQtZ29vZ2xlLW1hcHMtc2RrJztcbmltcG9ydCBzaWRlRHJhd2VyTW9kdWxlID0gcmVxdWlyZSgnbmF0aXZlc2NyaXB0LXRlbGVyaWstdWkvc2lkZWRyYXdlcicpO1xuaW1wb3J0IHsgUmFkU2lkZURyYXdlckNvbXBvbmVudCwgU2lkZURyYXdlclR5cGUgfSBmcm9tICduYXRpdmVzY3JpcHQtdGVsZXJpay11aS9zaWRlZHJhd2VyL2FuZ3VsYXInO1xuaW1wb3J0IHsgRnJpZW5kc0xpdmVTZXJ2aWNlIH0gZnJvbSAnLi4vLi4vc2hhcmVkL2ZyaWVuZHMvZnJpZW5kcy1saXZlcy5zZXJ2aWNlJztcbmltcG9ydCB7IE9ic2VydmFibGUgfSBmcm9tICcuLi8uLi8uLi9wbGF0Zm9ybXMvaW9zL2J1aWxkL2VtdWxhdG9yL0hlbGxvV29ybGQuYXBwL2FwcC90bnNfbW9kdWxlcy9yeGpzL3NyYy9PYnNlcnZhYmxlJztcbmltcG9ydCB7IEZyaWVuZFBvc2l0aW9uLCBGcmllbmQgfSBmcm9tICcuLi8uLi9zaGFyZWQvZnJpZW5kcy9mcmllbmQnO1xuaW1wb3J0IHsgTWFwVmlld1NlcnZpY2UgfSBmcm9tICcuLi8uLi9zaGFyZWQvc2VydmljZXMvbWFwL21hcC12aWV3LnNlcnZpY2UnO1xuaW1wb3J0IHsgRnJpZW5kc1NlcnZpY2UgfSBmcm9tICcuLi8uLi9zaGFyZWQvZnJpZW5kcy9mcmllbmRzLnNlcnZpY2UnO1xuaW1wb3J0IHsgQWRkTWFya2VyQXJncyB9IGZyb20gJy4uLy4uL3NoYXJlZC9zZXJ2aWNlcy9tYXAvY29yZS9NYXJrQ29udGFpbmVyJztcbmltcG9ydCB7IExpc3QgfSBmcm9tICdsaW5xdHMnO1xuXG5cbnJlZ2lzdGVyRWxlbWVudCgnTWFwVmlldycsICgpID0+IE1hcFZpZXcpO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6IFwiZnJpZW5kcy1tYXBcIixcbiAgdGVtcGxhdGVVcmw6IFwid2lkZ2V0cy9mcmllbmRzLW1hcC9mcmllbmRzLW1hcC5odG1sXCIsXG4gIHN0eWxlVXJsczogW1wid2lkZ2V0cy9mcmllbmRzLW1hcC9mcmllbmRzLW1hcC1jb21tb24uY3NzXCIsIFwid2lkZ2V0cy9mcmllbmRzLW1hcC9mcmllbmRzLW1hcC5jc3NcIl0sXG4gIHByb3ZpZGVyczogW0ZyaWVuZHNMaXZlU2VydmljZSwgTWFwVmlld1NlcnZpY2VdXG59KVxuZXhwb3J0IGNsYXNzIEZyaWVuZHNNYXBDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xuICAvLyNBbWlnb3NcbiAgLy8gcHVibGljIGZyaWVuZHM6IEFycmF5PEZyaWVuZFBvc2l0aW9uPjtcbiAgcHJpdmF0ZSBteUZyaWVuZHM6IExpc3Q8RnJpZW5kPiA9IG5ldyBMaXN0PEZyaWVuZD4oKTs7XG5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSBmcmllbmRzU2VydmljZTogRnJpZW5kc1NlcnZpY2UsXG4gICAgcHJpdmF0ZSBmcmllbmRzTGl2ZVNlcnZpY2U6IEZyaWVuZHNMaXZlU2VydmljZSxcbiAgICBwcml2YXRlIG1hcFZpZXdTZXJ2aWNlOiBNYXBWaWV3U2VydmljZSkge1xuXG4gIH1cbiAgLy9FdmVudHNcbiAgbmdPbkluaXQoKSB7XG4gICAgdGhpcy5mcmllbmRzU2VydmljZS5mcmllbmRVcGRhdGUkLnN1YnNjcmliZShmID0+IHtcbiAgICAgIHRoaXMuYWRkQWxsRnJpZW5kcyhmKTtcbiAgICB9KTtcbiAgICB0aGlzLmZyaWVuZHNTZXJ2aWNlLmdldEFsbEZyaWVuZHMoKS5zdWJzY3JpYmUoZiA9PiB7XG4gICAgICB0aGlzLmFkZEFsbEZyaWVuZHMoZik7XG4gICAgfSk7XG4gIH1cblxuICAvL01hcCBFdmVudHNcbiAgb25NYXBSZWFkeShldmVudCkge1xuICAgIGlmICghZXZlbnQub2JqZWN0KSByZXR1cm47XG4gICAgdGhpcy5tYXBWaWV3U2VydmljZS5vbk1hcFJlYWR5KGV2ZW50LCAoKSA9PiB0aGlzLm1hcFJlYWR5Tm90aWZ5KCkpO1xuXG4gIH1cbiAgbWFwVGFwcGVkKGV2ZW50KSB7XG4gICAgdGhpcy5tYXBWaWV3U2VydmljZS5tYXBUYXBwZWQoZXZlbnQpO1xuICB9XG4gIC8vUHJpdmF0ZSBNZXRob2RzXG4gIHByaXZhdGUgbWFwUmVhZHlOb3RpZnkoKSB7XG5cbiAgICB0aGlzLmdldEZyaWVuZHNQb3NpdGlvbnMoKTtcbiAgICB0aGlzLnN1YnNjcmliZUZyaWVuZExvY2F0aW9uVXBkYXRlKCk7XG4gIH1cbiAgcHJpdmF0ZSBhZGRBbGxGcmllbmRzKGZyaWVuZHM6IEFycmF5PEZyaWVuZD4pIHtcbiAgICB0aGlzLm15RnJpZW5kcyA9IG5ldyBMaXN0PEZyaWVuZD4oKTtcbiAgICBmb3IgKHZhciBpdGVtIG9mIGZyaWVuZHMpIHtcbiAgICAgIHRoaXMubXlGcmllbmRzLkFkZChpdGVtKTtcbiAgICAgIGlmIChpdGVtLmRyYXdXYXl0VG9NZSkge1xuICAgICAgICB0aGlzLm1hcFZpZXdTZXJ2aWNlLmVuYWJsZURyYXdXYXlUb01lKGl0ZW0uaWQpO1xuICAgICAgfWVsc2V7XG4gICAgICAgIHRoaXMubWFwVmlld1NlcnZpY2UuZGlzYWJsZURyYXdXYXlUb01lKGl0ZW0uaWQpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgdXBkYXRlRnJpZW5kTG9jYXRpb24oZnJpZW5kOiBGcmllbmRQb3NpdGlvbik6IHZvaWQge1xuICAgIHZhciBuZXdNYXJrRnJpZW5kID0gdGhpcy5jcmVhdGVNYXJrZXJBcmdzKGZyaWVuZCk7XG4gICAgaWYgKG5ld01hcmtGcmllbmQgIT0gbnVsbClcbiAgICAgIHRoaXMubWFwVmlld1NlcnZpY2UudXBkYXRlRnJpZW5kTWFyayhuZXdNYXJrRnJpZW5kWzBdLCBuZXdNYXJrRnJpZW5kWzFdLmlkKTtcbiAgfVxuICBwcml2YXRlIHN1YnNjcmliZUZyaWVuZExvY2F0aW9uVXBkYXRlKCkge1xuICAgIC8vTWUgc3VzY3JpYm8gYWwgbWV0b2RvIGRlIGFjdHVhbGl6YWNpb24gcGFyYSBvYnRlbmVyIGFjdHVhbGl6YWNpb24gZGUgdWJpY2FjaW9uIGRlIG1pcyBhbWlnb3NcbiAgICB0aGlzLmZyaWVuZHNMaXZlU2VydmljZS5nZXRGcmllbmRzTG9jYXRpb25zKCkuc3Vic2NyaWJlKGYgPT4ge1xuICAgICAgdGhpcy51cGRhdGVGcmllbmRMb2NhdGlvbihmKTtcbiAgICB9KTtcblxuICB9XG4gIHByaXZhdGUgZ2V0RnJpZW5kc1Bvc2l0aW9ucygpOiB2b2lkIHtcbiAgICAvL09idGVuZ28gdG9kb3MgbG9zIGFtaWdvcyBjb25lY3RhZG9zIHBvciBncnVwbyB5IGxvcyBkaWJ1am8gZW4gZWwgbWFwYVxuICAgIHRoaXMuZnJpZW5kc0xpdmVTZXJ2aWNlLmdldEZyaWVuZHNCeUdyb3VwKDEpLnN1YnNjcmliZShmcmllbmRzUG9zaXRpb24gPT4ge1xuICAgICAgZm9yICh2YXIgaXRlbSBvZiBmcmllbmRzUG9zaXRpb24pIHtcbiAgICAgICAgdmFyIG5ld01hcmtGcmllbmQgPSB0aGlzLmNyZWF0ZU1hcmtlckFyZ3MoaXRlbSk7XG4gICAgICAgIGlmIChuZXdNYXJrRnJpZW5kICE9IG51bGwpXG4gICAgICAgICAgdGhpcy5tYXBWaWV3U2VydmljZS5hZGRGcmllbmRuTWFyayhuZXdNYXJrRnJpZW5kWzBdLCBuZXdNYXJrRnJpZW5kWzFdLmlkKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuXG4gIHByaXZhdGUgY3JlYXRlTWFya2VyQXJncyhwb3NpdGlvbjogRnJpZW5kUG9zaXRpb24pOiBbQWRkTWFya2VyQXJncywgRnJpZW5kXSB7XG4gICAgdmFyIG1hcmsgPSBuZXcgQWRkTWFya2VyQXJncygpO1xuICAgIHZhciBmcmllbmQgPSB0aGlzLmZyaWVuZHNTZXJ2aWNlLmdldEZyaWVuZEJ5SWQocG9zaXRpb24uaWQpO1xuICAgIGlmIChmcmllbmQgIT0gbnVsbCAmJiBmcmllbmQuYWN0aXZhdGUpIHtcbiAgICAgIG1hcmsudGl0bGUgPSBmcmllbmQuZGlzcGxheU5hbWU7XG4gICAgICBtYXJrLmxvY2F0aW9uID0gbmV3IFBvc2l0aW9uKCk7XG4gICAgICBtYXJrLmxvY2F0aW9uLmxhdGl0dWRlID0gcG9zaXRpb24ubGF0aXR1ZGU7XG4gICAgICBtYXJrLmxvY2F0aW9uLmxvbmdpdHVkZSA9IHBvc2l0aW9uLmxvbmdpdHVkZTtcbiAgICAgIHJldHVybiBbbWFyaywgZnJpZW5kXTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuXG4gIH1cbiAgLy8gQFZpZXdDaGlsZChSYWRTaWRlRHJhd2VyQ29tcG9uZW50KSBwdWJsaWMgZHJhd2VyQ29tcG9uZW50OiBSYWRTaWRlRHJhd2VyQ29tcG9uZW50O1xuICAvLyBwcml2YXRlIGRyYXdlcjogU2lkZURyYXdlclR5cGU7XG5cblxuICAvLyBvcGVuRHJhd2VyKCkge1xuICAvLyAgIHRoaXMuZHJhd2VyLnNob3dEcmF3ZXIoKTtcbiAgLy8gfVxuXG4gIC8vIGNsb3NlRHJhd2VyKCkge1xuICAvLyAgIHRoaXMuZHJhd2VyLmNsb3NlRHJhd2VyKCk7XG4gIC8vIH1cblxufVxuXG5cbiJdfQ==