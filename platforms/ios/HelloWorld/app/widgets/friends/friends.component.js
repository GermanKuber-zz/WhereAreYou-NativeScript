"use strict";
var core_1 = require("@angular/core");
var friends_service_1 = require("../../shared/friends/friends.service");
var friend_1 = require("../../shared/friends/friend");
var FriendsComponent = (function () {
    function FriendsComponent(friendService) {
        this.friendService = friendService;
        this.selected = new friend_1.Friend();
    }
    FriendsComponent.prototype.onItemTap = function (args) {
        this.selected = this.myItems[args.index];
    };
    FriendsComponent.prototype.listViewItemTap = function (args) {
        var itemIndex = args.index;
    };
    FriendsComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.friendService.getAllFriends().subscribe(function (x) {
            _this.myItems = new Array();
            x.forEach(function (s) {
                _this.myItems.push(s);
            });
        });
        // this.groceryListService.load()
        // .subscribe(loadedGroceries => {
        //   loadedGroceries.forEach((groceryObject) => {
        //     this.groceryList.unshift(groceryObject);
        //   });
        //   this.isLoading = false;
        //   this.listLoaded = true;
        // });
    };
    return FriendsComponent;
}());
FriendsComponent = __decorate([
    core_1.Component({
        selector: "friends",
        templateUrl: "widgets/friends/friends.html",
        styleUrls: ["widgets/friends/friends-common.css", "widgets/friends/friends.css"],
        providers: [friends_service_1.FriendsService]
    }),
    __metadata("design:paramtypes", [friends_service_1.FriendsService])
], FriendsComponent);
exports.FriendsComponent = FriendsComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZnJpZW5kcy5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJmcmllbmRzLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsc0NBQXlEO0FBQ3pELHdFQUFzRTtBQUN0RSxzREFBcUQ7QUFXckQsSUFBYSxnQkFBZ0I7SUFJM0IsMEJBQW9CLGFBQTZCO1FBQTdCLGtCQUFhLEdBQWIsYUFBYSxDQUFnQjtRQUhqRCxhQUFRLEdBQVcsSUFBSSxlQUFNLEVBQUUsQ0FBQztJQUtoQyxDQUFDO0lBR00sb0NBQVMsR0FBaEIsVUFBaUIsSUFBSTtRQUNuQixJQUFJLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBRTNDLENBQUM7SUFDRCwwQ0FBZSxHQUFmLFVBQWdCLElBQUk7UUFDbEIsSUFBSSxTQUFTLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQztJQUM3QixDQUFDO0lBRUQsbUNBQVEsR0FBUjtRQUFBLGlCQWVDO1FBZEMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxhQUFhLEVBQUUsQ0FBQyxTQUFTLENBQUMsVUFBQSxDQUFDO1lBQzVDLEtBQUksQ0FBQyxPQUFPLEdBQUcsSUFBSSxLQUFLLEVBQVUsQ0FBQztZQUNuQyxDQUFDLENBQUMsT0FBTyxDQUFDLFVBQUEsQ0FBQztnQkFDVCxLQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUN2QixDQUFDLENBQUMsQ0FBQztRQUNMLENBQUMsQ0FBQyxDQUFDO1FBQ0gsaUNBQWlDO1FBQ2pDLGtDQUFrQztRQUNsQyxpREFBaUQ7UUFDakQsK0NBQStDO1FBQy9DLFFBQVE7UUFDUiw0QkFBNEI7UUFDNUIsNEJBQTRCO1FBQzVCLE1BQU07SUFDUixDQUFDO0lBRUgsdUJBQUM7QUFBRCxDQUFDLEFBbENELElBa0NDO0FBbENZLGdCQUFnQjtJQU41QixnQkFBUyxDQUFDO1FBQ1QsUUFBUSxFQUFFLFNBQVM7UUFDbkIsV0FBVyxFQUFFLDhCQUE4QjtRQUMzQyxTQUFTLEVBQUUsQ0FBQyxvQ0FBb0MsRUFBRSw2QkFBNkIsQ0FBQztRQUNoRixTQUFTLEVBQUUsQ0FBQyxnQ0FBYyxDQUFDO0tBQzVCLENBQUM7cUNBS21DLGdDQUFjO0dBSnRDLGdCQUFnQixDQWtDNUI7QUFsQ1ksNENBQWdCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBJbnB1dCwgT25Jbml0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBGcmllbmRzU2VydmljZSB9IGZyb20gJy4uLy4uL3NoYXJlZC9mcmllbmRzL2ZyaWVuZHMuc2VydmljZSc7XG5pbXBvcnQgeyBGcmllbmQgfSBmcm9tICcuLi8uLi9zaGFyZWQvZnJpZW5kcy9mcmllbmQnO1xuaW1wb3J0IGxpc3RWaWV3TW9kdWxlID0gcmVxdWlyZShcInVpL2xpc3Qtdmlld1wiKTtcbmltcG9ydCBvYnNlcnZhYmxlQXJyYXkgPSByZXF1aXJlKFwiZGF0YS9vYnNlcnZhYmxlLWFycmF5XCIpO1xuaW1wb3J0IGxhYmVsTW9kdWxlID0gcmVxdWlyZShcInVpL2xhYmVsXCIpO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6IFwiZnJpZW5kc1wiLFxuICB0ZW1wbGF0ZVVybDogXCJ3aWRnZXRzL2ZyaWVuZHMvZnJpZW5kcy5odG1sXCIsXG4gIHN0eWxlVXJsczogW1wid2lkZ2V0cy9mcmllbmRzL2ZyaWVuZHMtY29tbW9uLmNzc1wiLCBcIndpZGdldHMvZnJpZW5kcy9mcmllbmRzLmNzc1wiXSxcbiAgcHJvdmlkZXJzOiBbRnJpZW5kc1NlcnZpY2VdXG59KVxuZXhwb3J0IGNsYXNzIEZyaWVuZHNDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xuICBzZWxlY3RlZDogRnJpZW5kID0gbmV3IEZyaWVuZCgpO1xuICBwdWJsaWMgbXlJdGVtczogQXJyYXk8RnJpZW5kPjtcbiAgcHJpdmF0ZSBjb3VudGVyOiBudW1iZXI7XG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgZnJpZW5kU2VydmljZTogRnJpZW5kc1NlcnZpY2UpIHtcblxuICB9XG5cblxuICBwdWJsaWMgb25JdGVtVGFwKGFyZ3MpIHtcbiAgICB0aGlzLnNlbGVjdGVkID0gdGhpcy5teUl0ZW1zW2FyZ3MuaW5kZXhdO1xuXG4gIH1cbiAgbGlzdFZpZXdJdGVtVGFwKGFyZ3MpIHtcbiAgICB2YXIgaXRlbUluZGV4ID0gYXJncy5pbmRleDtcbiAgfVxuXG4gIG5nT25Jbml0KCkge1xuICAgIHRoaXMuZnJpZW5kU2VydmljZS5nZXRBbGxGcmllbmRzKCkuc3Vic2NyaWJlKHggPT4ge1xuICAgICAgdGhpcy5teUl0ZW1zID0gbmV3IEFycmF5PEZyaWVuZD4oKTtcbiAgICAgIHguZm9yRWFjaChzID0+IHtcbiAgICAgICAgdGhpcy5teUl0ZW1zLnB1c2gocyk7XG4gICAgICB9KTtcbiAgICB9KTtcbiAgICAvLyB0aGlzLmdyb2NlcnlMaXN0U2VydmljZS5sb2FkKClcbiAgICAvLyAuc3Vic2NyaWJlKGxvYWRlZEdyb2NlcmllcyA9PiB7XG4gICAgLy8gICBsb2FkZWRHcm9jZXJpZXMuZm9yRWFjaCgoZ3JvY2VyeU9iamVjdCkgPT4ge1xuICAgIC8vICAgICB0aGlzLmdyb2NlcnlMaXN0LnVuc2hpZnQoZ3JvY2VyeU9iamVjdCk7XG4gICAgLy8gICB9KTtcbiAgICAvLyAgIHRoaXMuaXNMb2FkaW5nID0gZmFsc2U7XG4gICAgLy8gICB0aGlzLmxpc3RMb2FkZWQgPSB0cnVlO1xuICAgIC8vIH0pO1xuICB9XG5cbn0iXX0=