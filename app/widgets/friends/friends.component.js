"use strict";
var core_1 = require("@angular/core");
var friends_service_1 = require("../../shared/friends/friends.service");
var friend_1 = require("../../shared/friends/friend");
var FriendsComponent = (function () {
    function FriendsComponent(friendService) {
        this.friendService = friendService;
        this.selected = new friend_1.Friend();
    }
    FriendsComponent.prototype.getColorItem = function (friend) {
        if (friend.activate)
            return "friend-enable";
        else
            return "friend-disable";
    };
    FriendsComponent.prototype.onItemTap = function (args) {
        var itemSelected = this.myItems[args.index];
        itemSelected.activate = !itemSelected.activate;
        this.friendService.updateFriend(itemSelected);
    };
    FriendsComponent.prototype.listViewItemTap = function (args) {
        var itemIndex = args.index;
    };
    FriendsComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.myItems = new Array();
        this.friendService.getAllFriends().subscribe(function (x) {
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
        styleUrls: ["widgets/friends/friends-common.css", "widgets/friends/friends.css"]
    }),
    __metadata("design:paramtypes", [friends_service_1.FriendsService])
], FriendsComponent);
exports.FriendsComponent = FriendsComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZnJpZW5kcy5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJmcmllbmRzLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsc0NBQXlEO0FBQ3pELHdFQUFzRTtBQUN0RSxzREFBcUQ7QUFVckQsSUFBYSxnQkFBZ0I7SUFJM0IsMEJBQW9CLGFBQTZCO1FBQTdCLGtCQUFhLEdBQWIsYUFBYSxDQUFnQjtRQUhqRCxhQUFRLEdBQVcsSUFBSSxlQUFNLEVBQUUsQ0FBQztJQUtoQyxDQUFDO0lBQ00sdUNBQVksR0FBbkIsVUFBb0IsTUFBYztRQUNoQyxFQUFFLENBQUMsQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDO1lBQ2xCLE1BQU0sQ0FBQyxlQUFlLENBQUM7UUFDekIsSUFBSTtZQUNGLE1BQU0sQ0FBQyxnQkFBZ0IsQ0FBQztJQUM1QixDQUFDO0lBRU0sb0NBQVMsR0FBaEIsVUFBaUIsSUFBSTtRQUNuQixJQUFJLFlBQVksR0FBVyxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUNwRCxZQUFZLENBQUMsUUFBUSxHQUFHLENBQUMsWUFBWSxDQUFDLFFBQVEsQ0FBQztRQUMvQyxJQUFJLENBQUMsYUFBYSxDQUFDLFlBQVksQ0FBQyxZQUFZLENBQUMsQ0FBQztJQUNoRCxDQUFDO0lBQ0QsMENBQWUsR0FBZixVQUFnQixJQUFJO1FBQ2xCLElBQUksU0FBUyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUM7SUFDN0IsQ0FBQztJQUdELG1DQUFRLEdBQVI7UUFBQSxpQkFnQkM7UUFmQyxJQUFJLENBQUMsT0FBTyxHQUFHLElBQUksS0FBSyxFQUFVLENBQUM7UUFDbkMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxhQUFhLEVBQUUsQ0FBQyxTQUFTLENBQUMsVUFBQSxDQUFDO1lBQzVDLENBQUMsQ0FBQyxPQUFPLENBQUMsVUFBQSxDQUFDO2dCQUNULEtBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ3ZCLENBQUMsQ0FBQyxDQUFDO1FBQ0wsQ0FBQyxDQUFDLENBQUM7UUFFSCxpQ0FBaUM7UUFDakMsa0NBQWtDO1FBQ2xDLGlEQUFpRDtRQUNqRCwrQ0FBK0M7UUFDL0MsUUFBUTtRQUNSLDRCQUE0QjtRQUM1Qiw0QkFBNEI7UUFDNUIsTUFBTTtJQUNSLENBQUM7SUFFSCx1QkFBQztBQUFELENBQUMsQUExQ0QsSUEwQ0M7QUExQ1ksZ0JBQWdCO0lBTDVCLGdCQUFTLENBQUM7UUFDVCxRQUFRLEVBQUUsU0FBUztRQUNuQixXQUFXLEVBQUUsOEJBQThCO1FBQzNDLFNBQVMsRUFBRSxDQUFDLG9DQUFvQyxFQUFFLDZCQUE2QixDQUFDO0tBQ2pGLENBQUM7cUNBS21DLGdDQUFjO0dBSnRDLGdCQUFnQixDQTBDNUI7QUExQ1ksNENBQWdCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBJbnB1dCwgT25Jbml0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBGcmllbmRzU2VydmljZSB9IGZyb20gJy4uLy4uL3NoYXJlZC9mcmllbmRzL2ZyaWVuZHMuc2VydmljZSc7XG5pbXBvcnQgeyBGcmllbmQgfSBmcm9tICcuLi8uLi9zaGFyZWQvZnJpZW5kcy9mcmllbmQnO1xuaW1wb3J0IGxpc3RWaWV3TW9kdWxlID0gcmVxdWlyZShcInVpL2xpc3Qtdmlld1wiKTtcblxuaW1wb3J0IGxhYmVsTW9kdWxlID0gcmVxdWlyZShcInVpL2xhYmVsXCIpO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6IFwiZnJpZW5kc1wiLFxuICB0ZW1wbGF0ZVVybDogXCJ3aWRnZXRzL2ZyaWVuZHMvZnJpZW5kcy5odG1sXCIsXG4gIHN0eWxlVXJsczogW1wid2lkZ2V0cy9mcmllbmRzL2ZyaWVuZHMtY29tbW9uLmNzc1wiLCBcIndpZGdldHMvZnJpZW5kcy9mcmllbmRzLmNzc1wiXVxufSlcbmV4cG9ydCBjbGFzcyBGcmllbmRzQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcbiAgc2VsZWN0ZWQ6IEZyaWVuZCA9IG5ldyBGcmllbmQoKTtcbiAgcHVibGljIG15SXRlbXM6IEFycmF5PEZyaWVuZD47XG4gIHByaXZhdGUgY291bnRlcjogbnVtYmVyO1xuICBjb25zdHJ1Y3Rvcihwcml2YXRlIGZyaWVuZFNlcnZpY2U6IEZyaWVuZHNTZXJ2aWNlKSB7XG5cbiAgfVxuICBwdWJsaWMgZ2V0Q29sb3JJdGVtKGZyaWVuZDogRnJpZW5kKTogc3RyaW5nIHtcbiAgICBpZiAoZnJpZW5kLmFjdGl2YXRlKVxuICAgICAgcmV0dXJuIFwiZnJpZW5kLWVuYWJsZVwiO1xuICAgIGVsc2VcbiAgICAgIHJldHVybiBcImZyaWVuZC1kaXNhYmxlXCI7XG4gIH1cblxuICBwdWJsaWMgb25JdGVtVGFwKGFyZ3MpIHtcbiAgICB2YXIgaXRlbVNlbGVjdGVkID0gPEZyaWVuZD50aGlzLm15SXRlbXNbYXJncy5pbmRleF07XG4gICAgaXRlbVNlbGVjdGVkLmFjdGl2YXRlID0gIWl0ZW1TZWxlY3RlZC5hY3RpdmF0ZTtcbiAgICB0aGlzLmZyaWVuZFNlcnZpY2UudXBkYXRlRnJpZW5kKGl0ZW1TZWxlY3RlZCk7XG4gIH1cbiAgbGlzdFZpZXdJdGVtVGFwKGFyZ3MpIHtcbiAgICB2YXIgaXRlbUluZGV4ID0gYXJncy5pbmRleDtcbiAgfVxuXG5cbiAgbmdPbkluaXQoKSB7XG4gICAgdGhpcy5teUl0ZW1zID0gbmV3IEFycmF5PEZyaWVuZD4oKTtcbiAgICB0aGlzLmZyaWVuZFNlcnZpY2UuZ2V0QWxsRnJpZW5kcygpLnN1YnNjcmliZSh4ID0+IHtcbiAgICAgIHguZm9yRWFjaChzID0+IHtcbiAgICAgICAgdGhpcy5teUl0ZW1zLnB1c2gocyk7XG4gICAgICB9KTtcbiAgICB9KTtcblxuICAgIC8vIHRoaXMuZ3JvY2VyeUxpc3RTZXJ2aWNlLmxvYWQoKVxuICAgIC8vIC5zdWJzY3JpYmUobG9hZGVkR3JvY2VyaWVzID0+IHtcbiAgICAvLyAgIGxvYWRlZEdyb2Nlcmllcy5mb3JFYWNoKChncm9jZXJ5T2JqZWN0KSA9PiB7XG4gICAgLy8gICAgIHRoaXMuZ3JvY2VyeUxpc3QudW5zaGlmdChncm9jZXJ5T2JqZWN0KTtcbiAgICAvLyAgIH0pO1xuICAgIC8vICAgdGhpcy5pc0xvYWRpbmcgPSBmYWxzZTtcbiAgICAvLyAgIHRoaXMubGlzdExvYWRlZCA9IHRydWU7XG4gICAgLy8gfSk7XG4gIH1cblxufSJdfQ==