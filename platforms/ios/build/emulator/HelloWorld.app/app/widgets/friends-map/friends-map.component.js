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
                    _this.mapViewService.addFriendnMark(newMarkFriend[0], newMarkFriend[1].id);
            }
        });
    };
    FriendsMapComponent.prototype.createMark = function (position) {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZnJpZW5kcy1tYXAuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiZnJpZW5kcy1tYXAuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxzQ0FBNEU7QUFDNUUsMEVBQXdFO0FBQ3hFLDZFQUFtRjtBQUduRixvRkFBZ0Y7QUFHaEYsK0VBQTRFO0FBQzVFLHdFQUFzRTtBQUN0RSw4RUFBNkU7QUFHN0Usa0NBQWUsQ0FBQyxTQUFTLEVBQUUsY0FBTSxPQUFBLHNDQUFPLEVBQVAsQ0FBTyxDQUFDLENBQUM7QUFRMUMsSUFBYSxtQkFBbUI7SUFLOUIsNkJBQW9CLGNBQThCLEVBQ3hDLGtCQUFzQyxFQUN0QyxjQUE4QjtRQUZwQixtQkFBYyxHQUFkLGNBQWMsQ0FBZ0I7UUFDeEMsdUJBQWtCLEdBQWxCLGtCQUFrQixDQUFvQjtRQUN0QyxtQkFBYyxHQUFkLGNBQWMsQ0FBZ0I7SUFFeEMsQ0FBQztJQUVELHdDQUFVLEdBQVYsVUFBVyxLQUFLO1FBQWhCLGlCQUlDO1FBSEMsRUFBRSxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDO1lBQUMsTUFBTSxDQUFDO1FBQzFCLElBQUksQ0FBQyxjQUFjLENBQUMsVUFBVSxDQUFDLEtBQUssRUFBRSxjQUFNLE9BQUEsS0FBSSxDQUFDLGNBQWMsRUFBRSxFQUFyQixDQUFxQixDQUFDLENBQUM7SUFFckUsQ0FBQztJQUVELHVDQUFTLEdBQVQsVUFBVSxLQUFLO1FBQ1osSUFBSSxDQUFDLGNBQWMsQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDeEMsQ0FBQztJQUNPLDRDQUFjLEdBQXRCO1FBRUUsSUFBSSxDQUFDLG1CQUFtQixFQUFFLENBQUM7UUFDM0IsSUFBSSxDQUFDLDZCQUE2QixFQUFFLENBQUM7SUFDdkMsQ0FBQztJQUNELHNDQUFRLEdBQVI7UUFBQSxpQkFRQztRQVBDLElBQUksQ0FBQyxjQUFjLENBQUMsYUFBYSxDQUFDLFNBQVMsQ0FBQyxV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RUFBRSxDQUFDLDBDQUFrQixFQUFFLGlDQUFjLENBQUM7S0FDaEQsQ0FBQztxQ0FNb0MsZ0NBQWM7UUFDcEIsMENBQWtCO1FBQ3RCLGlDQUFjO0dBUDdCLG1CQUFtQixDQW9GL0I7QUFwRlksa0RBQW1CIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBWaWV3Q2hpbGQsIEFmdGVyVmlld0luaXQsIE9uSW5pdCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgcmVnaXN0ZXJFbGVtZW50IH0gZnJvbSAnbmF0aXZlc2NyaXB0LWFuZ3VsYXIvZWxlbWVudC1yZWdpc3RyeSc7XG5pbXBvcnQgeyBNYXBWaWV3LCBNYXJrZXIsIFBvbHlsaW5lLCBQb3NpdGlvbiB9IGZyb20gJ25hdGl2ZXNjcmlwdC1nb29nbGUtbWFwcy1zZGsnO1xuaW1wb3J0IHNpZGVEcmF3ZXJNb2R1bGUgPSByZXF1aXJlKCduYXRpdmVzY3JpcHQtdGVsZXJpay11aS9zaWRlZHJhd2VyJyk7XG5pbXBvcnQgeyBSYWRTaWRlRHJhd2VyQ29tcG9uZW50LCBTaWRlRHJhd2VyVHlwZSB9IGZyb20gJ25hdGl2ZXNjcmlwdC10ZWxlcmlrLXVpL3NpZGVkcmF3ZXIvYW5ndWxhcic7XG5pbXBvcnQgeyBGcmllbmRzTGl2ZVNlcnZpY2UgfSBmcm9tICcuLi8uLi9zaGFyZWQvZnJpZW5kcy9mcmllbmRzLWxpdmVzLnNlcnZpY2UnO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSB9IGZyb20gJy4uLy4uLy4uL3BsYXRmb3Jtcy9pb3MvYnVpbGQvZW11bGF0b3IvSGVsbG9Xb3JsZC5hcHAvYXBwL3Ruc19tb2R1bGVzL3J4anMvc3JjL09ic2VydmFibGUnO1xuaW1wb3J0IHsgRnJpZW5kUG9zaXRpb24sIEZyaWVuZCB9IGZyb20gJy4uLy4uL3NoYXJlZC9mcmllbmRzL2ZyaWVuZCc7XG5pbXBvcnQgeyBNYXBWaWV3U2VydmljZSB9IGZyb20gJy4uLy4uL3NoYXJlZC9zZXJ2aWNlcy9tYXAvbWFwLXZpZXcuc2VydmljZSc7XG5pbXBvcnQgeyBGcmllbmRzU2VydmljZSB9IGZyb20gJy4uLy4uL3NoYXJlZC9mcmllbmRzL2ZyaWVuZHMuc2VydmljZSc7XG5pbXBvcnQgeyBBZGRNYXJrZXJBcmdzIH0gZnJvbSAnLi4vLi4vc2hhcmVkL3NlcnZpY2VzL21hcC9jb3JlL01hcmtDb250YWluZXInO1xuXG5cbnJlZ2lzdGVyRWxlbWVudCgnTWFwVmlldycsICgpID0+IE1hcFZpZXcpO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6IFwiZnJpZW5kcy1tYXBcIixcbiAgdGVtcGxhdGVVcmw6IFwid2lkZ2V0cy9mcmllbmRzLW1hcC9mcmllbmRzLW1hcC5odG1sXCIsXG4gIHN0eWxlVXJsczogW1wid2lkZ2V0cy9mcmllbmRzLW1hcC9mcmllbmRzLW1hcC1jb21tb24uY3NzXCIsIFwid2lkZ2V0cy9mcmllbmRzLW1hcC9mcmllbmRzLW1hcC5jc3NcIl0sXG4gIHByb3ZpZGVyczogW0ZyaWVuZHNMaXZlU2VydmljZSwgTWFwVmlld1NlcnZpY2VdXG59KVxuZXhwb3J0IGNsYXNzIEZyaWVuZHNNYXBDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xuICAvLyNBbWlnb3NcbiAgLy8gcHVibGljIGZyaWVuZHM6IEFycmF5PEZyaWVuZFBvc2l0aW9uPjtcbiAgcHJpdmF0ZSBteUZyaWVuZHM6IEFycmF5PEZyaWVuZD47XG5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSBmcmllbmRzU2VydmljZTogRnJpZW5kc1NlcnZpY2UsXG4gICAgcHJpdmF0ZSBmcmllbmRzTGl2ZVNlcnZpY2U6IEZyaWVuZHNMaXZlU2VydmljZSxcbiAgICBwcml2YXRlIG1hcFZpZXdTZXJ2aWNlOiBNYXBWaWV3U2VydmljZSkge1xuXG4gIH1cblxuICBvbk1hcFJlYWR5KGV2ZW50KSB7XG4gICAgaWYgKCFldmVudC5vYmplY3QpIHJldHVybjtcbiAgICB0aGlzLm1hcFZpZXdTZXJ2aWNlLm9uTWFwUmVhZHkoZXZlbnQsICgpID0+IHRoaXMubWFwUmVhZHlOb3RpZnkoKSk7XG5cbiAgfVxuXG4gIG1hcFRhcHBlZChldmVudCl7XG4gICAgIHRoaXMubWFwVmlld1NlcnZpY2UubWFwVGFwcGVkKGV2ZW50KTtcbiAgfVxuICBwcml2YXRlIG1hcFJlYWR5Tm90aWZ5KCkge1xuXG4gICAgdGhpcy5nZXRGcmllbmRzUG9zaXRpb25zKCk7XG4gICAgdGhpcy5zdWJzY3JpYmVGcmllbmRMb2NhdGlvblVwZGF0ZSgpO1xuICB9XG4gIG5nT25Jbml0KCkge1xuICAgIHRoaXMuZnJpZW5kc1NlcnZpY2UuZnJpZW5kVXBkYXRlJC5zdWJzY3JpYmUoeCA9PiB7XG4gICAgICB0aGlzLm15RnJpZW5kcyA9IHg7XG4gICAgfSk7XG4gICAgdGhpcy5teUZyaWVuZHMgPSBuZXcgQXJyYXk8RnJpZW5kPigpO1xuICAgIHRoaXMuZnJpZW5kc1NlcnZpY2UuZ2V0QWxsRnJpZW5kcygpLnN1YnNjcmliZSh4ID0+IHtcbiAgICAgIHRoaXMubXlGcmllbmRzID0geDtcbiAgICB9KTtcbiAgfVxuXG4gIHByaXZhdGUgdXBkYXRlRnJpZW5kTG9jYXRpb24oZnJpZW5kOiBGcmllbmRQb3NpdGlvbik6IHZvaWQge1xuICAgIHZhciBuZXdNYXJrRnJpZW5kID0gdGhpcy5jcmVhdGVNYXJrKGZyaWVuZCk7XG4gICAgaWYgKG5ld01hcmtGcmllbmQgIT0gbnVsbClcbiAgICAgIHRoaXMubWFwVmlld1NlcnZpY2UudXBkYXRlQ29tbW9uTWFyayhuZXdNYXJrRnJpZW5kWzBdLCBuZXdNYXJrRnJpZW5kWzFdLmlkKTtcbiAgfVxuICBwcml2YXRlIHN1YnNjcmliZUZyaWVuZExvY2F0aW9uVXBkYXRlKCkge1xuICAgIC8vTWUgc3VzY3JpYm8gYWwgbWV0b2RvIGRlIGFjdHVhbGl6YWNpb24gcGFyYSBvYnRlbmVyIGFjdHVhbGl6YWNpb24gZGUgdWJpY2FjaW9uIGRlIG1pcyBhbWlnb3NcbiAgICB0aGlzLmZyaWVuZHNMaXZlU2VydmljZS5nZXRGcmllbmRzTG9jYXRpb25zKCkuc3Vic2NyaWJlKGYgPT4ge1xuICAgICAgdGhpcy51cGRhdGVGcmllbmRMb2NhdGlvbihmKTtcbiAgICB9KTtcblxuICB9XG4gIHByaXZhdGUgZ2V0RnJpZW5kc1Bvc2l0aW9ucygpOiB2b2lkIHtcbiAgICAvL09idGVuZ28gdG9kb3MgbG9zIGFtaWdvcyBjb25lY3RhZG9zIHBvciBncnVwbyB5IGxvcyBkaWJ1am8gZW4gZWwgbWFwYVxuICAgIHRoaXMuZnJpZW5kc0xpdmVTZXJ2aWNlLmdldEZyaWVuZHNCeUdyb3VwKDEpLnN1YnNjcmliZShmcmllbmRzUG9zaXRpb24gPT4ge1xuICAgICAgZm9yICh2YXIgaXRlbSBvZiBmcmllbmRzUG9zaXRpb24pIHtcbiAgICAgICAgdmFyIG5ld01hcmtGcmllbmQgPSB0aGlzLmNyZWF0ZU1hcmsoaXRlbSk7XG4gICAgICAgIGlmIChuZXdNYXJrRnJpZW5kICE9IG51bGwpXG4gICAgICAgICAgdGhpcy5tYXBWaWV3U2VydmljZS5hZGRGcmllbmRuTWFyayhuZXdNYXJrRnJpZW5kWzBdLCBuZXdNYXJrRnJpZW5kWzFdLmlkKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuXG4gIHByaXZhdGUgY3JlYXRlTWFyayhwb3NpdGlvbjogRnJpZW5kUG9zaXRpb24pOiBbQWRkTWFya2VyQXJncywgRnJpZW5kXSB7XG4gICAgdmFyIG1hcmsgPSBuZXcgQWRkTWFya2VyQXJncygpO1xuICAgIHZhciBmcmllbmQgPSB0aGlzLmZyaWVuZHNTZXJ2aWNlLmdldEZyaWVuZEJ5SWQocG9zaXRpb24uaWQpO1xuICAgIGlmIChmcmllbmQgIT0gbnVsbCAmJiBmcmllbmQuYWN0aXZhdGUpIHtcbiAgICAgIG1hcmsudGl0bGUgPSBmcmllbmQuZGlzcGxheU5hbWU7XG4gICAgICBtYXJrLmxvY2F0aW9uID0gbmV3IFBvc2l0aW9uKCk7XG4gICAgICBtYXJrLmxvY2F0aW9uLmxhdGl0dWRlID0gcG9zaXRpb24ubGF0aXR1ZGU7XG4gICAgICBtYXJrLmxvY2F0aW9uLmxvbmdpdHVkZSA9IHBvc2l0aW9uLmxvbmdpdHVkZTtcbiAgICAgIHJldHVybiBbbWFyaywgZnJpZW5kXTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuXG4gIH1cbiAgLy8gQFZpZXdDaGlsZChSYWRTaWRlRHJhd2VyQ29tcG9uZW50KSBwdWJsaWMgZHJhd2VyQ29tcG9uZW50OiBSYWRTaWRlRHJhd2VyQ29tcG9uZW50O1xuICAvLyBwcml2YXRlIGRyYXdlcjogU2lkZURyYXdlclR5cGU7XG5cblxuICAvLyBvcGVuRHJhd2VyKCkge1xuICAvLyAgIHRoaXMuZHJhd2VyLnNob3dEcmF3ZXIoKTtcbiAgLy8gfVxuXG4gIC8vIGNsb3NlRHJhd2VyKCkge1xuICAvLyAgIHRoaXMuZHJhd2VyLmNsb3NlRHJhd2VyKCk7XG4gIC8vIH1cblxufVxuXG5cbiJdfQ==