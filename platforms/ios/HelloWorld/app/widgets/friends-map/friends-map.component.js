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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZnJpZW5kcy1tYXAuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiZnJpZW5kcy1tYXAuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxzQ0FBNEU7QUFDNUUsMEVBQXdFO0FBQ3hFLDZFQUFtRjtBQUduRixvRkFBZ0Y7QUFHaEYsK0VBQTRFO0FBQzVFLHdFQUFzRTtBQUN0RSw4RUFBNkU7QUFDN0UsaUNBQThCO0FBRzlCLGtDQUFlLENBQUMsU0FBUyxFQUFFLGNBQU0sT0FBQSxzQ0FBTyxFQUFQLENBQU8sQ0FBQyxDQUFDO0FBUTFDLElBQWEsbUJBQW1CO0lBSzlCLDZCQUFvQixjQUE4QixFQUN4QyxrQkFBc0MsRUFDdEMsY0FBOEI7UUFGcEIsbUJBQWMsR0FBZCxjQUFjLENBQWdCO1FBQ3hDLHVCQUFrQixHQUFsQixrQkFBa0IsQ0FBb0I7UUFDdEMsbUJBQWMsR0FBZCxjQUFjLENBQWdCO1FBTnhDLFNBQVM7UUFDVCx5Q0FBeUM7UUFDakMsY0FBUyxHQUFpQixJQUFJLGFBQUksRUFBVSxDQUFDO0lBTXJELENBQUM7SUFOb0QsQ0FBQztJQU90RCxRQUFRO0lBQ1Isc0NBQVEsR0FBUjtRQUFBLGlCQU9DO1FBTkMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxhQUFhLENBQUMsU0FBUyxDQUFDLFVBQUEsQ0FBQztZQUMzQyxLQUFJLENBQUMsYUFBYSxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ3hCLENBQUMsQ0FBQyxDQUFDO1FBQ0gsSUFBSSxDQUFDLGNBQWMsQ0FBQyxhQUFhLEVBQUUsQ0FBQyxTQUFTLENBQUMsVUFBQSxDQUFDO1lBQzdDLEtBQUksQ0FBQyxhQUFhLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDeEIsQ0FBQyxDQUFDLENBQUM7SUFDTCxDQUFDO0lBRUQsWUFBWTtJQUNaLHdDQUFVLEdBQVYsVUFBVyxLQUFLO1FBQWhCLGlCQUlDO1FBSEMsRUFBRSxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsTUFBTSxD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QUMsQUE3RUQsSUE2RUM7QUE3RVksbUJBQW1CO0lBTi9CLGdCQUFTLENBQUM7UUFDVCxRQUFRLEVBQUUsYUFBYTtRQUN2QixXQUFXLEVBQUUsc0NBQXNDO1FBQ25ELFNBQVMsRUFBRSxDQUFDLDRDQUE0QyxFQUFFLHFDQUFxQyxDQUFDO1FBQ2hHLFNBQVMsRUFBRSxDQUFDLDBDQUFrQixFQUFFLGlDQUFjLENBQUM7S0FDaEQsQ0FBQztxQ0FNb0MsZ0NBQWM7UUFDcEIsMENBQWtCO1FBQ3RCLGlDQUFjO0dBUDdCLG1CQUFtQixDQTZFL0I7QUE3RVksa0RBQW1CIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBWaWV3Q2hpbGQsIEFmdGVyVmlld0luaXQsIE9uSW5pdCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgcmVnaXN0ZXJFbGVtZW50IH0gZnJvbSAnbmF0aXZlc2NyaXB0LWFuZ3VsYXIvZWxlbWVudC1yZWdpc3RyeSc7XG5pbXBvcnQgeyBNYXBWaWV3LCBNYXJrZXIsIFBvbHlsaW5lLCBQb3NpdGlvbiB9IGZyb20gJ25hdGl2ZXNjcmlwdC1nb29nbGUtbWFwcy1zZGsnO1xuaW1wb3J0IHNpZGVEcmF3ZXJNb2R1bGUgPSByZXF1aXJlKCduYXRpdmVzY3JpcHQtdGVsZXJpay11aS9zaWRlZHJhd2VyJyk7XG5pbXBvcnQgeyBSYWRTaWRlRHJhd2VyQ29tcG9uZW50LCBTaWRlRHJhd2VyVHlwZSB9IGZyb20gJ25hdGl2ZXNjcmlwdC10ZWxlcmlrLXVpL3NpZGVkcmF3ZXIvYW5ndWxhcic7XG5pbXBvcnQgeyBGcmllbmRzTGl2ZVNlcnZpY2UgfSBmcm9tICcuLi8uLi9zaGFyZWQvZnJpZW5kcy9mcmllbmRzLWxpdmVzLnNlcnZpY2UnO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSB9IGZyb20gJy4uLy4uLy4uL3BsYXRmb3Jtcy9pb3MvYnVpbGQvZW11bGF0b3IvSGVsbG9Xb3JsZC5hcHAvYXBwL3Ruc19tb2R1bGVzL3J4anMvc3JjL09ic2VydmFibGUnO1xuaW1wb3J0IHsgRnJpZW5kUG9zaXRpb24sIEZyaWVuZCB9IGZyb20gJy4uLy4uL3NoYXJlZC9mcmllbmRzL2ZyaWVuZCc7XG5pbXBvcnQgeyBNYXBWaWV3U2VydmljZSB9IGZyb20gJy4uLy4uL3NoYXJlZC9zZXJ2aWNlcy9tYXAvbWFwLXZpZXcuc2VydmljZSc7XG5pbXBvcnQgeyBGcmllbmRzU2VydmljZSB9IGZyb20gJy4uLy4uL3NoYXJlZC9mcmllbmRzL2ZyaWVuZHMuc2VydmljZSc7XG5pbXBvcnQgeyBBZGRNYXJrZXJBcmdzIH0gZnJvbSAnLi4vLi4vc2hhcmVkL3NlcnZpY2VzL21hcC9jb3JlL01hcmtDb250YWluZXInO1xuaW1wb3J0IHsgTGlzdCB9IGZyb20gJ2xpbnF0cyc7XG5cblxucmVnaXN0ZXJFbGVtZW50KCdNYXBWaWV3JywgKCkgPT4gTWFwVmlldyk7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogXCJmcmllbmRzLW1hcFwiLFxuICB0ZW1wbGF0ZVVybDogXCJ3aWRnZXRzL2ZyaWVuZHMtbWFwL2ZyaWVuZHMtbWFwLmh0bWxcIixcbiAgc3R5bGVVcmxzOiBbXCJ3aWRnZXRzL2ZyaWVuZHMtbWFwL2ZyaWVuZHMtbWFwLWNvbW1vbi5jc3NcIiwgXCJ3aWRnZXRzL2ZyaWVuZHMtbWFwL2ZyaWVuZHMtbWFwLmNzc1wiXSxcbiAgcHJvdmlkZXJzOiBbRnJpZW5kc0xpdmVTZXJ2aWNlLCBNYXBWaWV3U2VydmljZV1cbn0pXG5leHBvcnQgY2xhc3MgRnJpZW5kc01hcENvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XG4gIC8vI0FtaWdvc1xuICAvLyBwdWJsaWMgZnJpZW5kczogQXJyYXk8RnJpZW5kUG9zaXRpb24+O1xuICBwcml2YXRlIG15RnJpZW5kczogTGlzdDxGcmllbmQ+ID0gbmV3IExpc3Q8RnJpZW5kPigpOztcblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIGZyaWVuZHNTZXJ2aWNlOiBGcmllbmRzU2VydmljZSxcbiAgICBwcml2YXRlIGZyaWVuZHNMaXZlU2VydmljZTogRnJpZW5kc0xpdmVTZXJ2aWNlLFxuICAgIHByaXZhdGUgbWFwVmlld1NlcnZpY2U6IE1hcFZpZXdTZXJ2aWNlKSB7XG5cbiAgfVxuICAvL0V2ZW50c1xuICBuZ09uSW5pdCgpIHtcbiAgICB0aGlzLmZyaWVuZHNTZXJ2aWNlLmZyaWVuZFVwZGF0ZSQuc3Vic2NyaWJlKGYgPT4ge1xuICAgICAgdGhpcy5hZGRBbGxGcmllbmRzKGYpO1xuICAgIH0pO1xuICAgIHRoaXMuZnJpZW5kc1NlcnZpY2UuZ2V0QWxsRnJpZW5kcygpLnN1YnNjcmliZShmID0+IHtcbiAgICAgIHRoaXMuYWRkQWxsRnJpZW5kcyhmKTtcbiAgICB9KTtcbiAgfVxuXG4gIC8vTWFwIEV2ZW50c1xuICBvbk1hcFJlYWR5KGV2ZW50KSB7XG4gICAgaWYgKCFldmVudC5vYmplY3QpIHJldHVybjtcbiAgICB0aGlzLm1hcFZpZXdTZXJ2aWNlLm9uTWFwUmVhZHkoZXZlbnQsICgpID0+IHRoaXMubWFwUmVhZHlOb3RpZnkoKSk7XG5cbiAgfVxuICBtYXBUYXBwZWQoZXZlbnQpIHtcbiAgICB0aGlzLm1hcFZpZXdTZXJ2aWNlLm1hcFRhcHBlZChldmVudCk7XG4gIH1cbiAgLy9Qcml2YXRlIE1ldGhvZHNcbiAgcHJpdmF0ZSBtYXBSZWFkeU5vdGlmeSgpIHtcblxuICAgIC8vIHRoaXMuZ2V0RnJpZW5kc1Bvc2l0aW9ucygpO1xuICAgIHRoaXMuc3Vic2NyaWJlRnJpZW5kTG9jYXRpb25VcGRhdGUoKTtcbiAgfVxuICBwcml2YXRlIGFkZEFsbEZyaWVuZHMoZnJpZW5kczogQXJyYXk8RnJpZW5kPikge1xuICAgIHRoaXMubXlGcmllbmRzID0gbmV3IExpc3Q8RnJpZW5kPigpO1xuICAgIGZvciAodmFyIGl0ZW0gb2YgZnJpZW5kcykge1xuICAgICAgdGhpcy5teUZyaWVuZHMuQWRkKGl0ZW0pO1xuICAgICAgaWYgKGl0ZW0uZHJhd1dheXRUb01lKSB7XG4gICAgICAgIHRoaXMubWFwVmlld1NlcnZpY2UuZW5hYmxlRHJhd1dheVRvTWUoaXRlbS5pZCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLm1hcFZpZXdTZXJ2aWNlLmRpc2FibGVEcmF3V2F5VG9NZShpdGVtLmlkKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBwcml2YXRlIHVwZGF0ZUZyaWVuZExvY2F0aW9uKGZyaWVuZDogRnJpZW5kUG9zaXRpb24pOiB2b2lkIHtcbiAgICB2YXIgbmV3TWFya0ZyaWVuZCA9IHRoaXMuY3JlYXRlTWFya2VyQXJncyhmcmllbmQpO1xuICAgIGlmIChuZXdNYXJrRnJpZW5kICE9IG51bGwpXG4gICAgICB0aGlzLm1hcFZpZXdTZXJ2aWNlLnVwZGF0ZUZyaWVuZE1hcmsobmV3TWFya0ZyaWVuZFswXSwgbmV3TWFya0ZyaWVuZFsxXS5pZCk7XG4gICAgZWxzZVxuICAgICAgdGhpcy5tYXBWaWV3U2VydmljZS5yZW1vdmVGcmllbmRNYXJrKGZyaWVuZC5pZCk7XG4gIH1cbiAgcHJpdmF0ZSBzdWJzY3JpYmVGcmllbmRMb2NhdGlvblVwZGF0ZSgpIHtcbiAgICAvL01lIHN1c2NyaWJvIGFsIG1ldG9kbyBkZSBhY3R1YWxpemFjaW9uIHBhcmEgb2J0ZW5lciBhY3R1YWxpemFjaW9uIGRlIHViaWNhY2lvbiBkZSBtaXMgYW1pZ29zXG4gICAgdGhpcy5mcmllbmRzTGl2ZVNlcnZpY2UuZ2V0RnJpZW5kc0xvY2F0aW9ucygpLnN1YnNjcmliZShmID0+IHtcbiAgICAgIHRoaXMudXBkYXRlRnJpZW5kTG9jYXRpb24oZik7XG4gICAgfSk7XG4gIH1cblxuXG4gIHByaXZhdGUgY3JlYXRlTWFya2VyQXJncyhwb3NpdGlvbjogRnJpZW5kUG9zaXRpb24pOiBbQWRkTWFya2VyQXJncywgRnJpZW5kXSB7XG4gICAgdmFyIG1hcmsgPSBuZXcgQWRkTWFya2VyQXJncygpO1xuICAgIHZhciBmcmllbmQgPSB0aGlzLmZyaWVuZHNTZXJ2aWNlLmdldEZyaWVuZEJ5SWQocG9zaXRpb24uaWQpO1xuICAgIGlmIChmcmllbmQgIT0gbnVsbCAmJiBmcmllbmQuYWN0aXZhdGUpIHtcbiAgICAgIG1hcmsudGl0bGUgPSBmcmllbmQuZGlzcGxheU5hbWU7XG4gICAgICBtYXJrLmxvY2F0aW9uID0gbmV3IFBvc2l0aW9uKCk7XG4gICAgICBtYXJrLmxvY2F0aW9uLmxhdGl0dWRlID0gcG9zaXRpb24ubGF0aXR1ZGU7XG4gICAgICBtYXJrLmxvY2F0aW9uLmxvbmdpdHVkZSA9IHBvc2l0aW9uLmxvbmdpdHVkZTtcbiAgICAgIHJldHVybiBbbWFyaywgZnJpZW5kXTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuXG4gIH1cblxufVxuXG5cbiJdfQ==