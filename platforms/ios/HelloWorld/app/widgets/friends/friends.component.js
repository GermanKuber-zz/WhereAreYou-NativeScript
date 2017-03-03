"use strict";
var core_1 = require("@angular/core");
var friends_service_1 = require("../../shared/friends/friends.service");
var friend_1 = require("../../shared/friends/friend");
var frameModule = require("ui/frame");
var FriendsComponent = (function () {
    function FriendsComponent(friendService) {
        this.friendService = friendService;
        this.selected = new friend_1.Friend();
    }
    FriendsComponent.prototype.addFriend = function () {
        var a = this.inviteFriend;
    };
    FriendsComponent.prototype.getColorItem = function (friend) {
        if (friend != null && friend.activate)
            return "friend-enable";
        else
            return "friend-disable";
    };
    FriendsComponent.prototype.onSwipeCellStarted = function (args) {
        var swipeLimits = args.data.swipeLimits;
        var swipeView = args['object'];
        var leftItem = swipeView.getViewById('mark-view');
        var rightItem = swipeView.getViewById('delete-view');
        swipeLimits.left = leftItem.getMeasuredWidth();
        swipeLimits.right = rightItem.getMeasuredWidth();
        swipeLimits.threshold = leftItem.getMeasuredWidth() / 2;
    };
    FriendsComponent.prototype.onSwipeCellFinished = function (args) {
        if (args.data.x > 200) {
            console.log("Perform left action");
        }
        else if (args.data.x < -200) {
            console.log("Perform right action");
        }
    };
    FriendsComponent.prototype.onCellSwiping = function (args) {
        var swipeLimits = args.data.swipeLimits;
        var currentItemView = args.object;
        var currentView;
        if (args.data.x > 200) {
            console.log("Notify perform left action");
        }
        else if (args.data.x < -200) {
            console.log("Notify perform right action");
        }
    };
    FriendsComponent.prototype.onItemSelected = function (args) {
        var listView = frameModule.topmost().currentPage.getViewById("listView");
        listView.notifySwipeToExecuteFinished();
        var itemSelected = this.myFriends[args.itemIndex];
        for (var _i = 0, _a = this.myFriends; _i < _a.length; _i++) {
            var item = _a[_i];
            if (item.id == itemSelected.id)
                item.activate = !item.activate;
        }
        this.friendService.updateFriend(itemSelected);
        listView.refresh();
    };
    FriendsComponent.prototype.onLeftSwipeClick = function (args) {
        console.log("Left swipe click");
    };
    FriendsComponent.prototype.onRightSwipeClick = function (args) {
        var removeFriend = args.object.bindingContext;
        this.friendService.deleteFriend(removeFriend);
    };
    FriendsComponent.prototype.onItemTap = function (args) {
        var listView = this.listView.nativeElement;
        var itemSelected = this.myFriends[args.index];
        for (var _i = 0, _a = this.myFriends; _i < _a.length; _i++) {
            var item = _a[_i];
            if (item.id == itemSelected.id)
                item.activate = !item.activate;
        }
        this.friendService.updateFriend(itemSelected);
        listView.refresh();
    };
    FriendsComponent.prototype.listViewItemTap = function (args) {
        var itemIndex = args.index;
    };
    FriendsComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.myFriends = new Array();
        this.friendService.getAllFriends().subscribe(function (x) {
            _this.myFriends = x;
        });
        this.friendService.friendUpdate$.subscribe(function (x) {
            _this.myFriends = x;
        });
    };
    return FriendsComponent;
}());
__decorate([
    core_1.ViewChild("listView"),
    __metadata("design:type", core_1.ElementRef)
], FriendsComponent.prototype, "listView", void 0);
FriendsComponent = __decorate([
    core_1.Component({
        selector: "friends",
        templateUrl: "widgets/friends/friends.html",
        styleUrls: ["widgets/friends/friends-common.css", "widgets/friends/friends.css"]
    }),
    __metadata("design:paramtypes", [friends_service_1.FriendsService])
], FriendsComponent);
exports.FriendsComponent = FriendsComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZnJpZW5kcy5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJmcmllbmRzLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsc0NBQWdGO0FBQ2hGLHdFQUFzRTtBQUN0RSxzREFBcUQ7QUFJckQsc0NBQXlDO0FBUXpDLElBQWEsZ0JBQWdCO0lBUTNCLDBCQUFvQixhQUE2QjtRQUE3QixrQkFBYSxHQUFiLGFBQWEsQ0FBZ0I7UUFQakQsYUFBUSxHQUFXLElBQUksZUFBTSxFQUFFLENBQUM7SUFVaEMsQ0FBQztJQUNNLG9DQUFTLEdBQWhCO1FBQ0UsSUFBSSxDQUFDLEdBQUcsSUFBSSxDQUFDLFlBQVksQ0FBQztJQUM1QixDQUFDO0lBQ00sdUNBQVksR0FBbkIsVUFBb0IsTUFBYztRQUNoQyxFQUFFLENBQUMsQ0FBQyxNQUFNLElBQUksSUFBSSxJQUFJLE1BQU0sQ0FBQyxRQUFRLENBQUM7WUFDcEMsTUFBTSxDQUFDLGVBQWUsQ0FBQztRQUN6QixJQUFJO1lBQ0YsTUFBTSxDQUFDLGdCQUFnQixDQUFDO0lBQzVCLENBQUM7SUFDTSw2Q0FBa0IsR0FBekIsVUFBMEIsSUFBdUI7UUFDL0MsSUFBSSxXQUFXLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUM7UUFDeEMsSUFBSSxTQUFTLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBQy9CLElBQUksUUFBUSxHQUFHLFNBQVMsQ0FBQyxXQUFXLENBQUMsV0FBVyxDQUFDLENBQUM7UUFDbEQsSUFBSSxTQUFTLEdBQUcsU0FBUyxDQUFDLFdBQVcsQ0FBQyxhQUFhLENBQUMsQ0FBQztRQUNyRCxXQUFXLENBQUMsSUFBSSxHQUFHLFFBQVEsQ0FBQyxnQkFBZ0IsRUFBRSxDQUFDO1FBQy9DLFdBQVcsQ0FBQyxLQUFLLEdBQUcsU0FBUyxDQUFDLGdCQUFnQixFQUFFLENBQUM7UUFDakQsV0FBVyxDQUFDLFNBQVMsR0FBRyxRQUFRLENBQUMsZ0JBQWdC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QUMsUUFBUSxHQUFHLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQztTQUFBO1FBRW5DLElBQUksQ0FBQyxhQUFhLENBQUMsWUFBWSxDQUFDLFlBQVksQ0FBQyxDQUFDO1FBQzlDLFFBQVEsQ0FBQyxPQUFPLEVBQUUsQ0FBQztJQUNyQixDQUFDO0lBQ0QsMENBQWUsR0FBZixVQUFnQixJQUFJO1FBQ2xCLElBQUksU0FBUyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUM7SUFDN0IsQ0FBQztJQUdELG1DQUFRLEdBQVI7UUFBQSxpQkFRQztRQVBDLElBQUksQ0FBQyxTQUFTLEdBQUcsSUFBSSxLQUFLLEVBQVUsQ0FBQztRQUNyQyxJQUFJLENBQUMsYUFBYSxDQUFDLGFBQWEsRUFBRSxDQUFDLFNBQVMsQ0FBQyxVQUFBLENBQUM7WUFDNUMsS0FBSSxDQUFDLFNBQVMsR0FBRyxDQUFDLENBQUM7UUFDckIsQ0FBQyxDQUFDLENBQUM7UUFDSCxJQUFJLENBQUMsYUFBYSxDQUFDLGFBQWEsQ0FBQyxTQUFTLENBQUMsVUFBQSxDQUFDO1lBQzFDLEtBQUksQ0FBQyxTQUFTLEdBQUcsQ0FBQyxDQUFDO1FBQ3JCLENBQUMsQ0FBQyxDQUFDO0lBQ0wsQ0FBQztJQUNILHVCQUFDO0FBQUQsQ0FBQyxBQWhHRCxJQWdHQztBQTFGd0I7SUFBdEIsZ0JBQVMsQ0FBQyxVQUFVLENBQUM7OEJBQVcsaUJBQVU7a0RBQUM7QUFOakMsZ0JBQWdCO0lBTDVCLGdCQUFTLENBQUM7UUFDVCxRQUFRLEVBQUUsU0FBUztRQUNuQixXQUFXLEVBQUUsOEJBQThCO1FBQzNDLFNBQVMsRUFBRSxDQUFDLG9DQUFvQyxFQUFFLDZCQUE2QixDQUFDO0tBQ2pGLENBQUM7cUNBU21DLGdDQUFjO0dBUnRDLGdCQUFnQixDQWdHNUI7QUFoR1ksNENBQWdCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBJbnB1dCwgT25Jbml0LCBWaWV3Q2hpbGQsIEVsZW1lbnRSZWYgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEZyaWVuZHNTZXJ2aWNlIH0gZnJvbSAnLi4vLi4vc2hhcmVkL2ZyaWVuZHMvZnJpZW5kcy5zZXJ2aWNlJztcbmltcG9ydCB7IEZyaWVuZCB9IGZyb20gJy4uLy4uL3NoYXJlZC9mcmllbmRzL2ZyaWVuZCc7XG5pbXBvcnQgeyBMaXN0VmlldyB9IGZyb20gJ3VpL2xpc3Qtdmlldyc7XG5pbXBvcnQgeyBMaXN0Vmlld0V2ZW50RGF0YSwgUmFkTGlzdFZpZXcgfSBmcm9tICdOYXRpdmVzY3JpcHQtdGVsZXJpay11aS9saXN0dmlldy9pbmRleCc7XG5pbXBvcnQgbGlzdFZpZXdNb2R1bGUgPSByZXF1aXJlKFwidWkvbGlzdC12aWV3XCIpO1xuaW1wb3J0IGZyYW1lTW9kdWxlID0gcmVxdWlyZShcInVpL2ZyYW1lXCIpO1xuaW1wb3J0IGxhYmVsTW9kdWxlID0gcmVxdWlyZShcInVpL2xhYmVsXCIpO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6IFwiZnJpZW5kc1wiLFxuICB0ZW1wbGF0ZVVybDogXCJ3aWRnZXRzL2ZyaWVuZHMvZnJpZW5kcy5odG1sXCIsXG4gIHN0eWxlVXJsczogW1wid2lkZ2V0cy9mcmllbmRzL2ZyaWVuZHMtY29tbW9uLmNzc1wiLCBcIndpZGdldHMvZnJpZW5kcy9mcmllbmRzLmNzc1wiXVxufSlcbmV4cG9ydCBjbGFzcyBGcmllbmRzQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcbiAgc2VsZWN0ZWQ6IEZyaWVuZCA9IG5ldyBGcmllbmQoKTtcbiAgcHVibGljIG15RnJpZW5kczogQXJyYXk8RnJpZW5kPjtcbiAgcHJpdmF0ZSBjb3VudGVyOiBudW1iZXI7XG4gIHB1YmxpYyBpbnZpdGVGcmllbmQ6IHN0cmluZztcbiAgLy8gQFZpZXdDaGlsZChcImxpc3RWaWV3XCIpIGxpc3RWaWV3OiBFbGVtZW50UmVmO1xuICBAVmlld0NoaWxkKFwibGlzdFZpZXdcIikgbGlzdFZpZXc6IEVsZW1lbnRSZWY7XG5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSBmcmllbmRTZXJ2aWNlOiBGcmllbmRzU2VydmljZSkge1xuXG5cbiAgfVxuICBwdWJsaWMgYWRkRnJpZW5kKCkge1xuICAgIHZhciBhID0gdGhpcy5pbnZpdGVGcmllbmQ7XG4gIH1cbiAgcHVibGljIGdldENvbG9ySXRlbShmcmllbmQ6IEZyaWVuZCk6IHN0cmluZyB7XG4gICAgaWYgKGZyaWVuZCAhPSBudWxsICYmIGZyaWVuZC5hY3RpdmF0ZSlcbiAgICAgIHJldHVybiBcImZyaWVuZC1lbmFibGVcIjtcbiAgICBlbHNlXG4gICAgICByZXR1cm4gXCJmcmllbmQtZGlzYWJsZVwiO1xuICB9XG4gIHB1YmxpYyBvblN3aXBlQ2VsbFN0YXJ0ZWQoYXJnczogTGlzdFZpZXdFdmVudERhdGEpIHtcbiAgICB2YXIgc3dpcGVMaW1pdHMgPSBhcmdzLmRhdGEuc3dpcGVMaW1pdHM7XG4gICAgdmFyIHN3aXBlVmlldyA9IGFyZ3NbJ29iamVjdCddO1xuICAgIHZhciBsZWZ0SXRlbSA9IHN3aXBlVmlldy5nZXRWaWV3QnlJZCgnbWFyay12aWV3Jyk7XG4gICAgdmFyIHJpZ2h0SXRlbSA9IHN3aXBlVmlldy5nZXRWaWV3QnlJZCgnZGVsZXRlLXZpZXcnKTtcbiAgICBzd2lwZUxpbWl0cy5sZWZ0ID0gbGVmdEl0ZW0uZ2V0TWVhc3VyZWRXaWR0aCgpO1xuICAgIHN3aXBlTGltaXRzLnJpZ2h0ID0gcmlnaHRJdGVtLmdldE1lYXN1cmVkV2lkdGgoKTtcbiAgICBzd2lwZUxpbWl0cy50aHJlc2hvbGQgPSBsZWZ0SXRlbS5nZXRNZWFzdXJlZFdpZHRoKCkgLyAyO1xuICB9XG5cbiAgcHVibGljIG9uU3dpcGVDZWxsRmluaXNoZWQoYXJnczogTGlzdFZpZXdFdmVudERhdGEpIHtcbiAgICBpZiAoYXJncy5kYXRhLnggPiAyMDApIHtcbiAgICAgIGNvbnNvbGUubG9nKFwiUGVyZm9ybSBsZWZ0IGFjdGlvblwiKTtcbiAgICB9IGVsc2UgaWYgKGFyZ3MuZGF0YS54IDwgLTIwMCkge1xuICAgICAgY29uc29sZS5sb2coXCJQZXJmb3JtIHJpZ2h0IGFjdGlvblwiKTtcbiAgICB9XG4gIH1cbiAgcHVibGljIG9uQ2VsbFN3aXBpbmcoYXJnczogTGlzdFZpZXdFdmVudERhdGEpIHtcbiAgICB2YXIgc3dpcGVMaW1pdHMgPSBhcmdzLmRhdGEuc3dpcGVMaW1pdHM7XG4gICAgdmFyIGN1cnJlbnRJdGVtVmlldyA9IGFyZ3Mub2JqZWN0O1xuICAgIHZhciBjdXJyZW50VmlldztcblxuICAgIGlmIChhcmdzLmRhdGEueCA+IDIwMCkge1xuICAgICAgY29uc29sZS5sb2coXCJOb3RpZnkgcGVyZm9ybSBsZWZ0IGFjdGlvblwiKTtcbiAgICB9IGVsc2UgaWYgKGFyZ3MuZGF0YS54IDwgLTIwMCkge1xuICAgICAgY29uc29sZS5sb2coXCJOb3RpZnkgcGVyZm9ybSByaWdodCBhY3Rpb25cIik7XG4gICAgfVxuICB9XG5cblxuICBwdWJsaWMgb25JdGVtU2VsZWN0ZWQoYXJnczogTGlzdFZpZXdFdmVudERhdGEpIHtcbiAgICB2YXIgbGlzdFZpZXcgPSA8UmFkTGlzdFZpZXc+ZnJhbWVNb2R1bGUudG9wbW9zdCgpLmN1cnJlbnRQYWdlLmdldFZpZXdCeUlkKFwibGlzdFZpZXdcIik7XG4gICAgbGlzdFZpZXcubm90aWZ5U3dpcGVUb0V4ZWN1dGVGaW5pc2hlZCgpO1xuICAgIHZhciBpdGVtU2VsZWN0ZWQgPSA8RnJpZW5kPnRoaXMubXlGcmllbmRzW2FyZ3MuaXRlbUluZGV4XTtcbiAgICBmb3IgKHZhciBpdGVtIG9mIHRoaXMubXlGcmllbmRzKVxuICAgICAgaWYgKGl0ZW0uaWQgPT0gaXRlbVNlbGVjdGVkLmlkKVxuICAgICAgICBpdGVtLmFjdGl2YXRlID0gIWl0ZW0uYWN0aXZhdGU7XG5cbiAgICB0aGlzLmZyaWVuZFNlcnZpY2UudXBkYXRlRnJpZW5kKGl0ZW1TZWxlY3RlZCk7XG4gICAgbGlzdFZpZXcucmVmcmVzaCgpO1xuICB9XG5cbiAgcHVibGljIG9uTGVmdFN3aXBlQ2xpY2soYXJncykge1xuICAgIGNvbnNvbGUubG9nKFwiTGVmdCBzd2lwZSBjbGlja1wiKTtcbiAgfVxuXG4gIHB1YmxpYyBvblJpZ2h0U3dpcGVDbGljayhhcmdzKSB7XG4gICAgdmFyIHJlbW92ZUZyaWVuZCA9IDxGcmllbmQ+YXJncy5vYmplY3QuYmluZGluZ0NvbnRleHQ7XG4gICAgdGhpcy5mcmllbmRTZXJ2aWNlLmRlbGV0ZUZyaWVuZChyZW1vdmVGcmllbmQpO1xuICB9XG5cbiAgcHVibGljIG9uSXRlbVRhcChhcmdzKSB7XG4gICAgbGV0IGxpc3RWaWV3OiBMaXN0VmlldyA9IHRoaXMubGlzdFZpZXcubmF0aXZlRWxlbWVudDtcbiAgICB2YXIgaXRlbVNlbGVjdGVkID0gPEZyaWVuZD50aGlzLm15RnJpZW5kc1thcmdzLmluZGV4XTtcbiAgICBmb3IgKHZhciBpdGVtIG9mIHRoaXMubXlGcmllbmRzKVxuICAgICAgaWYgKGl0ZW0uaWQgPT0gaXRlbVNlbGVjdGVkLmlkKVxuICAgICAgICBpdGVtLmFjdGl2YXRlID0gIWl0ZW0uYWN0aXZhdGU7XG5cbiAgICB0aGlzLmZyaWVuZFNlcnZpY2UudXBkYXRlRnJpZW5kKGl0ZW1TZWxlY3RlZCk7XG4gICAgbGlzdFZpZXcucmVmcmVzaCgpO1xuICB9XG4gIGxpc3RWaWV3SXRlbVRhcChhcmdzKSB7XG4gICAgdmFyIGl0ZW1JbmRleCA9IGFyZ3MuaW5kZXg7XG4gIH1cblxuXG4gIG5nT25Jbml0KCkge1xuICAgIHRoaXMubXlGcmllbmRzID0gbmV3IEFycmF5PEZyaWVuZD4oKTtcbiAgICB0aGlzLmZyaWVuZFNlcnZpY2UuZ2V0QWxsRnJpZW5kcygpLnN1YnNjcmliZSh4ID0+IHtcbiAgICAgIHRoaXMubXlGcmllbmRzID0geDtcbiAgICB9KTtcbiAgICB0aGlzLmZyaWVuZFNlcnZpY2UuZnJpZW5kVXBkYXRlJC5zdWJzY3JpYmUoeCA9PiB7XG4gICAgICB0aGlzLm15RnJpZW5kcyA9IHg7XG4gICAgfSk7XG4gIH1cbn0iXX0=