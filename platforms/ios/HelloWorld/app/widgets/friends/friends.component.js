"use strict";
var core_1 = require("@angular/core");
var friends_service_1 = require("../../shared/friends/friends.service");
var friend_1 = require("../../shared/friends/friend");
var FriendsComponent = (function () {
    function FriendsComponent(friendService) {
        this.friendService = friendService;
        this.classMap = { 'friend-enable': true, 'friend-disable': false };
        this.selected = new friend_1.Friend();
    }
    FriendsComponent.prototype.getColorItem = function (friend) {
        if (friend.activate)
            return "friend-enable";
        else
            return "friend-disable";
    };
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZnJpZW5kcy5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJmcmllbmRzLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsc0NBQXlEO0FBQ3pELHdFQUFzRTtBQUN0RSxzREFBcUQ7QUFXckQsSUFBYSxnQkFBZ0I7SUFLM0IsMEJBQW9CLGFBQTZCO1FBQTdCLGtCQUFhLEdBQWIsYUFBYSxDQUFnQjtRQUpqRCxhQUFRLEdBQUcsRUFBRSxlQUFlLEVBQUUsSUFBSSxFQUFFLGdCQUFnQixFQUFFLEtBQUssRUFBRSxDQUFDO1FBQzlELGFBQVEsR0FBVyxJQUFJLGVBQU0sRUFBRSxDQUFDO0lBS2hDLENBQUM7SUFDTSx1Q0FBWSxHQUFuQixVQUFvQixNQUFjO1FBQ2hDLEVBQUUsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUM7WUFDbEIsTUFBTSxDQUFDLGVBQWUsQ0FBQztRQUN6QixJQUFJO1lBQ0YsTUFBTSxDQUFDLGdCQUFnQixDQUFDO0lBQzVCLENBQUM7SUFFTSxvQ0FBUyxHQUFoQixVQUFpQixJQUFJO1FBQ25CLElBQUksQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7SUFFM0MsQ0FBQztJQUNELDBDQUFlLEdBQWYsVUFBZ0IsSUFBSTtRQUNsQixJQUFJLFNBQVMsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDO0lBQzdCLENBQUM7SUFHRCxtQ0FBUSxHQUFSO1FBQUEsaUJBZUM7UUFkQyxJQUFJLENBQUMsYUFBYSxDQUFDLGFBQWEsRUFBRSxDQUFDLFNBQVMsQ0FBQyxVQUFBLENBQUM7WUFDNUMsS0FBSSxDQUFDLE9BQU8sR0FBRyxJQUFJLEtBQUssRUFBVSxDQUFDO1lBQ25DLENBQUMsQ0FBQyxPQUFPLENBQUMsVUFBQSxDQUFDO2dCQUNULEtBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ3ZCLENBQUMsQ0FBQyxDQUFDO1FBQ0wsQ0FBQyxDQUFDLENBQUM7UUFDSCxpQ0FBaUM7UUFDakMsa0NBQWtDO1FBQ2xDLGlEQUFpRDtRQUNqRCwrQ0FBK0M7UUFDL0MsUUFBUTtRQUNSLDRCQUE0QjtRQUM1Qiw0QkFBNEI7UUFDNUIsTUFBTTtJQUNSLENBQUM7SUFFSCx1QkFBQztBQUFELENBQUMsQUF6Q0QsSUF5Q0M7QUF6Q1ksZ0JBQWdCO0lBTjVCLGdCQUFTLENBQUM7UUFDVCxRQUFRLEVBQUUsU0FBUztRQUNuQixXQUFXLEVBQUUsOEJBQThCO1FBQzNDLFNBQVMsRUFBRSxDQUFDLG9DQUFvQyxFQUFFLDZCQUE2QixDQUFDO1FBQ2hGLFNBQVMsRUFBRSxDQUFDLGdDQUFjLENBQUM7S0FDNUIsQ0FBQztxQ0FNbUMsZ0NBQWM7R0FMdEMsZ0JBQWdCLENBeUM1QjtBQXpDWSw0Q0FBZ0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIElucHV0LCBPbkluaXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEZyaWVuZHNTZXJ2aWNlIH0gZnJvbSAnLi4vLi4vc2hhcmVkL2ZyaWVuZHMvZnJpZW5kcy5zZXJ2aWNlJztcbmltcG9ydCB7IEZyaWVuZCB9IGZyb20gJy4uLy4uL3NoYXJlZC9mcmllbmRzL2ZyaWVuZCc7XG5pbXBvcnQgbGlzdFZpZXdNb2R1bGUgPSByZXF1aXJlKFwidWkvbGlzdC12aWV3XCIpO1xuaW1wb3J0IG9ic2VydmFibGVBcnJheSA9IHJlcXVpcmUoXCJkYXRhL29ic2VydmFibGUtYXJyYXlcIik7XG5pbXBvcnQgbGFiZWxNb2R1bGUgPSByZXF1aXJlKFwidWkvbGFiZWxcIik7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogXCJmcmllbmRzXCIsXG4gIHRlbXBsYXRlVXJsOiBcIndpZGdldHMvZnJpZW5kcy9mcmllbmRzLmh0bWxcIixcbiAgc3R5bGVVcmxzOiBbXCJ3aWRnZXRzL2ZyaWVuZHMvZnJpZW5kcy1jb21tb24uY3NzXCIsIFwid2lkZ2V0cy9mcmllbmRzL2ZyaWVuZHMuY3NzXCJdLFxuICBwcm92aWRlcnM6IFtGcmllbmRzU2VydmljZV1cbn0pXG5leHBvcnQgY2xhc3MgRnJpZW5kc0NvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XG4gIGNsYXNzTWFwID0geyAnZnJpZW5kLWVuYWJsZSc6IHRydWUsICdmcmllbmQtZGlzYWJsZSc6IGZhbHNlIH07XG4gIHNlbGVjdGVkOiBGcmllbmQgPSBuZXcgRnJpZW5kKCk7XG4gIHB1YmxpYyBteUl0ZW1zOiBBcnJheTxGcmllbmQ+O1xuICBwcml2YXRlIGNvdW50ZXI6IG51bWJlcjtcbiAgY29uc3RydWN0b3IocHJpdmF0ZSBmcmllbmRTZXJ2aWNlOiBGcmllbmRzU2VydmljZSkge1xuXG4gIH1cbiAgcHVibGljIGdldENvbG9ySXRlbShmcmllbmQ6IEZyaWVuZCk6IHN0cmluZyB7XG4gICAgaWYgKGZyaWVuZC5hY3RpdmF0ZSlcbiAgICAgIHJldHVybiBcImZyaWVuZC1lbmFibGVcIjtcbiAgICBlbHNlXG4gICAgICByZXR1cm4gXCJmcmllbmQtZGlzYWJsZVwiO1xuICB9XG5cbiAgcHVibGljIG9uSXRlbVRhcChhcmdzKSB7XG4gICAgdGhpcy5zZWxlY3RlZCA9IHRoaXMubXlJdGVtc1thcmdzLmluZGV4XTtcblxuICB9XG4gIGxpc3RWaWV3SXRlbVRhcChhcmdzKSB7XG4gICAgdmFyIGl0ZW1JbmRleCA9IGFyZ3MuaW5kZXg7XG4gIH1cblxuXG4gIG5nT25Jbml0KCkge1xuICAgIHRoaXMuZnJpZW5kU2VydmljZS5nZXRBbGxGcmllbmRzKCkuc3Vic2NyaWJlKHggPT4ge1xuICAgICAgdGhpcy5teUl0ZW1zID0gbmV3IEFycmF5PEZyaWVuZD4oKTtcbiAgICAgIHguZm9yRWFjaChzID0+IHtcbiAgICAgICAgdGhpcy5teUl0ZW1zLnB1c2gocyk7XG4gICAgICB9KTtcbiAgICB9KTtcbiAgICAvLyB0aGlzLmdyb2NlcnlMaXN0U2VydmljZS5sb2FkKClcbiAgICAvLyAuc3Vic2NyaWJlKGxvYWRlZEdyb2NlcmllcyA9PiB7XG4gICAgLy8gICBsb2FkZWRHcm9jZXJpZXMuZm9yRWFjaCgoZ3JvY2VyeU9iamVjdCkgPT4ge1xuICAgIC8vICAgICB0aGlzLmdyb2NlcnlMaXN0LnVuc2hpZnQoZ3JvY2VyeU9iamVjdCk7XG4gICAgLy8gICB9KTtcbiAgICAvLyAgIHRoaXMuaXNMb2FkaW5nID0gZmFsc2U7XG4gICAgLy8gICB0aGlzLmxpc3RMb2FkZWQgPSB0cnVlO1xuICAgIC8vIH0pO1xuICB9XG5cbn0iXX0=