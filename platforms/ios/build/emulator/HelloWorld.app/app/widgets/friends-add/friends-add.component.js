"use strict";
var core_1 = require("@angular/core");
var friends_service_1 = require("../../shared/friends/friends.service");
var FriendsAddComponent = (function () {
    function FriendsAddComponent(friendService) {
        this.friendService = friendService;
        this.isLoading = false;
        this.doesNotFound = true;
        this.friendFound = false;
        this.isAdded = false;
        this.addFriendError = false;
    }
    FriendsAddComponent.prototype.ngOnInit = function () {
    };
    //Public Methods
    FriendsAddComponent.prototype.searchFriend = function () {
        var _this = this;
        this.isLoading = true;
        this.friendService.getFriendByIEmail(this.email)
            .subscribe(function (f) {
            _this.friendPreview = f;
            _this.isLoading = false;
        }, function (e) {
            _this.doesNotFound = false;
            _this.isLoading = false;
        });
    };
    FriendsAddComponent.prototype.addFriend = function () {
        var _this = this;
        this.friendService.addFriend(this.friendPreview)
            .subscribe(function (f) {
            _this.isAdded = f;
            if (!f)
                _this.addFriendError = true;
        }, function (e) {
            _this.addFriendError = true;
        });
    };
    return FriendsAddComponent;
}());
FriendsAddComponent = __decorate([
    core_1.Component({
        selector: "friends-add",
        templateUrl: "widgets/friends-add/friends-add.html",
        styleUrls: ["widgets/friends-add/friends-add-common.css",
            "widgets/friends-add/friends-add.css"]
    }),
    __metadata("design:paramtypes", [friends_service_1.FriendsService])
], FriendsAddComponent);
exports.FriendsAddComponent = FriendsAddComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZnJpZW5kcy1hZGQuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiZnJpZW5kcy1hZGQuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxzQ0FBeUQ7QUFDekQsd0VBQXNFO0FBVXRFLElBQWEsbUJBQW1CO0lBUTlCLDZCQUFvQixhQUE2QjtRQUE3QixrQkFBYSxHQUFiLGFBQWEsQ0FBZ0I7UUFOMUMsY0FBUyxHQUFZLEtBQUssQ0FBQztRQUMzQixpQkFBWSxHQUFZLElBQUksQ0FBQztRQUU3QixnQkFBVyxHQUFZLEtBQUssQ0FBQztRQUM3QixZQUFPLEdBQVksS0FBSyxDQUFDO1FBQ3pCLG1CQUFjLEdBQVksS0FBSyxDQUFDO0lBR3ZDLENBQUM7SUFDRCxzQ0FBUSxHQUFSO0lBQ0EsQ0FBQztJQUVELGdCQUFnQjtJQUNULDBDQUFZLEdBQW5CO1FBQUEsaUJBV0M7UUFWQyxJQUFJLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQztRQUN0QixJQUFJLENBQUMsYUFBYSxDQUFDLGlCQUFpQixDQUFDLElBQUksQ0FBQyxLQUFLLENBQUM7YUFDN0MsU0FBUyxDQUFDLFVBQUEsQ0FBQztZQUNWLEtBQUksQ0FBQyxhQUFhLEdBQUcsQ0FBQyxDQUFDO1lBQ3ZCLEtBQUksQ0FBQyxTQUFTLEdBQUcsS0FBSyxDQUFDO1FBQ3pCLENBQUMsRUFDRCxVQUFBLENBQUM7WUFDQyxLQUFJLENBQUMsWUFBWSxHQUFHLEtBQUssQ0FBQztZQUMxQixLQUFJLENBQUMsU0FBUyxHQUFHLEtBQUssQ0FBQztRQUN6QixDQUFDLENBQUMsQ0FBQztJQUNQLENBQUM7SUFDTSx1Q0FBUyxHQUFoQjtRQUFBLGlCQVdDO1FBVkMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQzthQUM3QyxTQUFTLENBQUMsVUFBQSxDQUFDO1lBQ1YsS0FBSSxDQUFDLE9BQU8sR0FBRyxDQUFDLENBQUM7WUFDakIsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQ0wsS0FBSSxDQUFDLGNBQWMsR0FBRyxJQUFJLENBQUM7UUFDL0IsQ0FBQyxFQUNELFVBQUEsQ0FBQztZQUNDLEtBQUksQ0FBQyxjQUFjLEdBQUcsSUFBSSxDQUFDO1FBQzdCLENBQUMsQ0FBQyxDQUFDO0lBRVAsQ0FBQztJQUNILDBCQUFDO0FBQUQsQ0FBQyxBQXZDRCxJQXVDQztBQXZDWSxtQkFBbUI7SUFOL0IsZ0JBQVMsQ0FBQztRQUNULFFBQVEsRUFBRSxhQUFhO1FBQ3ZCLFdBQVcsRUFBRSxzQ0FBc0M7UUFDbkQsU0FBUyxFQUFFLENBQUMsNENBQTRDO1lBQ3RELHFDQUFxQyxDQUFDO0tBQ3pDLENBQUM7cUNBU21DLGdDQUFjO0dBUnRDLG1CQUFtQixDQXVDL0I7QUF2Q1ksa0RBQW1CIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBJbnB1dCwgT25Jbml0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBGcmllbmRzU2VydmljZSB9IGZyb20gJy4uLy4uL3NoYXJlZC9mcmllbmRzL2ZyaWVuZHMuc2VydmljZSc7XG5pbXBvcnQgeyBGcmllbmQgfSBmcm9tICcuLi8uLi9zaGFyZWQvZnJpZW5kcy9mcmllbmQnO1xuaW1wb3J0IGFjdGl2aXR5SW5kaWNhdG9yTW9kdWxlID0gcmVxdWlyZShcInVpL2FjdGl2aXR5LWluZGljYXRvclwiKTtcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiBcImZyaWVuZHMtYWRkXCIsXG4gIHRlbXBsYXRlVXJsOiBcIndpZGdldHMvZnJpZW5kcy1hZGQvZnJpZW5kcy1hZGQuaHRtbFwiLFxuICBzdHlsZVVybHM6IFtcIndpZGdldHMvZnJpZW5kcy1hZGQvZnJpZW5kcy1hZGQtY29tbW9uLmNzc1wiLFxuICAgIFwid2lkZ2V0cy9mcmllbmRzLWFkZC9mcmllbmRzLWFkZC5jc3NcIl1cbn0pXG5leHBvcnQgY2xhc3MgRnJpZW5kc0FkZENvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XG4gIHB1YmxpYyBlbWFpbDogc3RyaW5nO1xuICBwdWJsaWMgaXNMb2FkaW5nOiBib29sZWFuID0gZmFsc2U7XG4gIHB1YmxpYyBkb2VzTm90Rm91bmQ6IGJvb2xlYW4gPSB0cnVlO1xuICBwdWJsaWMgZnJpZW5kUHJldmlldzogRnJpZW5kO1xuICBwdWJsaWMgZnJpZW5kRm91bmQ6IGJvb2xlYW4gPSBmYWxzZTtcbiAgcHVibGljIGlzQWRkZWQ6IGJvb2xlYW4gPSBmYWxzZTtcbiAgcHVibGljIGFkZEZyaWVuZEVycm9yOiBib29sZWFuID0gZmFsc2U7XG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgZnJpZW5kU2VydmljZTogRnJpZW5kc1NlcnZpY2UpIHtcblxuICB9XG4gIG5nT25Jbml0KCkge1xuICB9XG5cbiAgLy9QdWJsaWMgTWV0aG9kc1xuICBwdWJsaWMgc2VhcmNoRnJpZW5kKCk6IHZvaWQge1xuICAgIHRoaXMuaXNMb2FkaW5nID0gdHJ1ZTtcbiAgICB0aGlzLmZyaWVuZFNlcnZpY2UuZ2V0RnJpZW5kQnlJRW1haWwodGhpcy5lbWFpbClcbiAgICAgIC5zdWJzY3JpYmUoZiA9PiB7XG4gICAgICAgIHRoaXMuZnJpZW5kUHJldmlldyA9IGY7XG4gICAgICAgIHRoaXMuaXNMb2FkaW5nID0gZmFsc2U7XG4gICAgICB9LFxuICAgICAgZSA9PiB7XG4gICAgICAgIHRoaXMuZG9lc05vdEZvdW5kID0gZmFsc2U7XG4gICAgICAgIHRoaXMuaXNMb2FkaW5nID0gZmFsc2U7XG4gICAgICB9KTtcbiAgfVxuICBwdWJsaWMgYWRkRnJpZW5kKCk6IHZvaWQge1xuICAgIHRoaXMuZnJpZW5kU2VydmljZS5hZGRGcmllbmQodGhpcy5mcmllbmRQcmV2aWV3KVxuICAgICAgLnN1YnNjcmliZShmID0+IHtcbiAgICAgICAgdGhpcy5pc0FkZGVkID0gZjtcbiAgICAgICAgaWYgKCFmKVxuICAgICAgICAgIHRoaXMuYWRkRnJpZW5kRXJyb3IgPSB0cnVlO1xuICAgICAgfSxcbiAgICAgIGUgPT4ge1xuICAgICAgICB0aGlzLmFkZEZyaWVuZEVycm9yID0gdHJ1ZTtcbiAgICAgIH0pO1xuXG4gIH1cbn0iXX0=