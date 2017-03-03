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
        if (friend.activate)
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZnJpZW5kcy5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJmcmllbmRzLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsc0NBQWdGO0FBQ2hGLHdFQUFzRTtBQUN0RSxzREFBcUQ7QUFJckQsc0NBQXlDO0FBUXpDLElBQWEsZ0JBQWdCO0lBUTNCLDBCQUFvQixhQUE2QjtRQUE3QixrQkFBYSxHQUFiLGFBQWEsQ0FBZ0I7UUFQakQsYUFBUSxHQUFXLElBQUksZUFBTSxFQUFFLENBQUM7SUFVaEMsQ0FBQztJQUNNLG9DQUFTLEdBQWhCO1FBQ0UsSUFBSSxDQUFDLEdBQUksSUFBSSxDQUFDLFlBQVksQ0FBQztJQUM3QixDQUFDO0lBQ00sdUNBQVksR0FBbkIsVUFBb0IsTUFBYztRQUNoQyxFQUFFLENBQUMsQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDO1lBQ2xCLE1BQU0sQ0FBQyxlQUFlLENBQUM7UUFDekIsSUFBSTtZQUNGLE1BQU0sQ0FBQyxnQkFBZ0IsQ0FBQztJQUM1QixDQUFDO0lBQ00sNkNBQWtCLEdBQXpCLFVBQTBCLElBQXVCO1FBQy9DLElBQUksV0FBVyxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDO1FBQ3hDLElBQUksU0FBUyxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUMvQixJQUFJLFFBQVEsR0FBRyxTQUFTLENBQUMsV0FBVyxDQUFDLFdBQVcsQ0FBQyxDQUFDO1FBQ2xELElBQUksU0FBUyxHQUFHLFNBQVMsQ0FBQyxXQUFXLENBQUMsYUFBYSxDQUFDLENBQUM7UUFDckQsV0FBVyxDQUFDLElBQUksR0FBRyxRQUFRLENBQUMsZ0JBQWdCLEVBQUUsQ0FBQztRQUMvQyxXQUFXLENBQUMsS0FBSyxHQUFHLFNBQVMsQ0FBQyxnQkFBZ0IsRUFBRSxDQUFDO1FBQ2pELFdBQVcsQ0FBQyxTQUFTLEdBQUcsUUFBUSxDQUFDLGdCQUFnQixFQUFFLEdBQUcsQ0FBQyxDQUFD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QUksQ0FBQyxRQUFRLENBQUM7U0FBQTtRQUVuQyxJQUFJLENBQUMsYUFBYSxDQUFDLFlBQVksQ0FBQyxZQUFZLENBQUMsQ0FBQztRQUM5QyxRQUFRLENBQUMsT0FBTyxFQUFFLENBQUM7SUFDckIsQ0FBQztJQUNELDBDQUFlLEdBQWYsVUFBZ0IsSUFBSTtRQUNsQixJQUFJLFNBQVMsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDO0lBQzdCLENBQUM7SUFHRCxtQ0FBUSxHQUFSO1FBQUEsaUJBUUM7UUFQQyxJQUFJLENBQUMsU0FBUyxHQUFHLElBQUksS0FBSyxFQUFVLENBQUM7UUFDckMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxhQUFhLEVBQUUsQ0FBQyxTQUFTLENBQUMsVUFBQSxDQUFDO1lBQzVDLEtBQUksQ0FBQyxTQUFTLEdBQUcsQ0FBQyxDQUFDO1FBQ3JCLENBQUMsQ0FBQyxDQUFDO1FBQ0gsSUFBSSxDQUFDLGFBQWEsQ0FBQyxhQUFhLENBQUMsU0FBUyxDQUFDLFVBQUEsQ0FBQztZQUMxQyxLQUFJLENBQUMsU0FBUyxHQUFHLENBQUMsQ0FBQztRQUNyQixDQUFDLENBQUMsQ0FBQztJQUNMLENBQUM7SUFDSCx1QkFBQztBQUFELENBQUMsQUFoR0QsSUFnR0M7QUExRndCO0lBQXRCLGdCQUFTLENBQUMsVUFBVSxDQUFDOzhCQUFXLGlCQUFVO2tEQUFDO0FBTmpDLGdCQUFnQjtJQUw1QixnQkFBUyxDQUFDO1FBQ1QsUUFBUSxFQUFFLFNBQVM7UUFDbkIsV0FBVyxFQUFFLDhCQUE4QjtRQUMzQyxTQUFTLEVBQUUsQ0FBQyxvQ0FBb0MsRUFBRSw2QkFBNkIsQ0FBQztLQUNqRixDQUFDO3FDQVNtQyxnQ0FBYztHQVJ0QyxnQkFBZ0IsQ0FnRzVCO0FBaEdZLDRDQUFnQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgSW5wdXQsIE9uSW5pdCwgVmlld0NoaWxkLCBFbGVtZW50UmVmIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBGcmllbmRzU2VydmljZSB9IGZyb20gJy4uLy4uL3NoYXJlZC9mcmllbmRzL2ZyaWVuZHMuc2VydmljZSc7XG5pbXBvcnQgeyBGcmllbmQgfSBmcm9tICcuLi8uLi9zaGFyZWQvZnJpZW5kcy9mcmllbmQnO1xuaW1wb3J0IHsgTGlzdFZpZXcgfSBmcm9tICd1aS9saXN0LXZpZXcnO1xuaW1wb3J0IHsgTGlzdFZpZXdFdmVudERhdGEsIFJhZExpc3RWaWV3IH0gZnJvbSAnTmF0aXZlc2NyaXB0LXRlbGVyaWstdWkvbGlzdHZpZXcvaW5kZXgnO1xuaW1wb3J0IGxpc3RWaWV3TW9kdWxlID0gcmVxdWlyZShcInVpL2xpc3Qtdmlld1wiKTtcbmltcG9ydCBmcmFtZU1vZHVsZSA9IHJlcXVpcmUoXCJ1aS9mcmFtZVwiKTtcbmltcG9ydCBsYWJlbE1vZHVsZSA9IHJlcXVpcmUoXCJ1aS9sYWJlbFwiKTtcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiBcImZyaWVuZHNcIixcbiAgdGVtcGxhdGVVcmw6IFwid2lkZ2V0cy9mcmllbmRzL2ZyaWVuZHMuaHRtbFwiLFxuICBzdHlsZVVybHM6IFtcIndpZGdldHMvZnJpZW5kcy9mcmllbmRzLWNvbW1vbi5jc3NcIiwgXCJ3aWRnZXRzL2ZyaWVuZHMvZnJpZW5kcy5jc3NcIl1cbn0pXG5leHBvcnQgY2xhc3MgRnJpZW5kc0NvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XG4gIHNlbGVjdGVkOiBGcmllbmQgPSBuZXcgRnJpZW5kKCk7XG4gIHB1YmxpYyBteUZyaWVuZHM6IEFycmF5PEZyaWVuZD47XG4gIHByaXZhdGUgY291bnRlcjogbnVtYmVyO1xuICBwdWJsaWMgaW52aXRlRnJpZW5kOnN0cmluZztcbiAgLy8gQFZpZXdDaGlsZChcImxpc3RWaWV3XCIpIGxpc3RWaWV3OiBFbGVtZW50UmVmO1xuICBAVmlld0NoaWxkKFwibGlzdFZpZXdcIikgbGlzdFZpZXc6IEVsZW1lbnRSZWY7XG5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSBmcmllbmRTZXJ2aWNlOiBGcmllbmRzU2VydmljZSkge1xuXG5cbiAgfVxuICBwdWJsaWMgYWRkRnJpZW5kKCl7XG4gICAgdmFyIGEgPSAgdGhpcy5pbnZpdGVGcmllbmQ7XG4gIH1cbiAgcHVibGljIGdldENvbG9ySXRlbShmcmllbmQ6IEZyaWVuZCk6IHN0cmluZyB7XG4gICAgaWYgKGZyaWVuZC5hY3RpdmF0ZSlcbiAgICAgIHJldHVybiBcImZyaWVuZC1lbmFibGVcIjtcbiAgICBlbHNlXG4gICAgICByZXR1cm4gXCJmcmllbmQtZGlzYWJsZVwiO1xuICB9XG4gIHB1YmxpYyBvblN3aXBlQ2VsbFN0YXJ0ZWQoYXJnczogTGlzdFZpZXdFdmVudERhdGEpIHtcbiAgICB2YXIgc3dpcGVMaW1pdHMgPSBhcmdzLmRhdGEuc3dpcGVMaW1pdHM7XG4gICAgdmFyIHN3aXBlVmlldyA9IGFyZ3NbJ29iamVjdCddO1xuICAgIHZhciBsZWZ0SXRlbSA9IHN3aXBlVmlldy5nZXRWaWV3QnlJZCgnbWFyay12aWV3Jyk7XG4gICAgdmFyIHJpZ2h0SXRlbSA9IHN3aXBlVmlldy5nZXRWaWV3QnlJZCgnZGVsZXRlLXZpZXcnKTtcbiAgICBzd2lwZUxpbWl0cy5sZWZ0ID0gbGVmdEl0ZW0uZ2V0TWVhc3VyZWRXaWR0aCgpO1xuICAgIHN3aXBlTGltaXRzLnJpZ2h0ID0gcmlnaHRJdGVtLmdldE1lYXN1cmVkV2lkdGgoKTtcbiAgICBzd2lwZUxpbWl0cy50aHJlc2hvbGQgPSBsZWZ0SXRlbS5nZXRNZWFzdXJlZFdpZHRoKCkgLyAyO1xuICB9XG5cbiAgcHVibGljIG9uU3dpcGVDZWxsRmluaXNoZWQoYXJnczogTGlzdFZpZXdFdmVudERhdGEpIHtcbiAgICBpZiAoYXJncy5kYXRhLnggPiAyMDApIHtcbiAgICAgIGNvbnNvbGUubG9nKFwiUGVyZm9ybSBsZWZ0IGFjdGlvblwiKTtcbiAgICB9IGVsc2UgaWYgKGFyZ3MuZGF0YS54IDwgLTIwMCkge1xuICAgICAgY29uc29sZS5sb2coXCJQZXJmb3JtIHJpZ2h0IGFjdGlvblwiKTtcbiAgICB9XG4gIH1cbiAgcHVibGljIG9uQ2VsbFN3aXBpbmcoYXJnczogTGlzdFZpZXdFdmVudERhdGEpIHtcbiAgICB2YXIgc3dpcGVMaW1pdHMgPSBhcmdzLmRhdGEuc3dpcGVMaW1pdHM7XG4gICAgdmFyIGN1cnJlbnRJdGVtVmlldyA9IGFyZ3Mub2JqZWN0O1xuICAgIHZhciBjdXJyZW50VmlldztcblxuICAgIGlmIChhcmdzLmRhdGEueCA+IDIwMCkge1xuICAgICAgY29uc29sZS5sb2coXCJOb3RpZnkgcGVyZm9ybSBsZWZ0IGFjdGlvblwiKTtcbiAgICB9IGVsc2UgaWYgKGFyZ3MuZGF0YS54IDwgLTIwMCkge1xuICAgICAgY29uc29sZS5sb2coXCJOb3RpZnkgcGVyZm9ybSByaWdodCBhY3Rpb25cIik7XG4gICAgfVxuICB9XG5cblxuICBwdWJsaWMgb25JdGVtU2VsZWN0ZWQoYXJnczogTGlzdFZpZXdFdmVudERhdGEpIHtcbiAgICB2YXIgbGlzdFZpZXcgPSA8UmFkTGlzdFZpZXc+ZnJhbWVNb2R1bGUudG9wbW9zdCgpLmN1cnJlbnRQYWdlLmdldFZpZXdCeUlkKFwibGlzdFZpZXdcIik7XG4gICAgbGlzdFZpZXcubm90aWZ5U3dpcGVUb0V4ZWN1dGVGaW5pc2hlZCgpO1xuICAgIHZhciBpdGVtU2VsZWN0ZWQgPSA8RnJpZW5kPnRoaXMubXlGcmllbmRzW2FyZ3MuaXRlbUluZGV4XTtcbiAgICBmb3IgKHZhciBpdGVtIG9mIHRoaXMubXlGcmllbmRzKVxuICAgICAgaWYgKGl0ZW0uaWQgPT0gaXRlbVNlbGVjdGVkLmlkKVxuICAgICAgICBpdGVtLmFjdGl2YXRlID0gIWl0ZW0uYWN0aXZhdGU7XG5cbiAgICB0aGlzLmZyaWVuZFNlcnZpY2UudXBkYXRlRnJpZW5kKGl0ZW1TZWxlY3RlZCk7XG4gICAgbGlzdFZpZXcucmVmcmVzaCgpO1xuICB9XG5cbiAgcHVibGljIG9uTGVmdFN3aXBlQ2xpY2soYXJncykge1xuICAgIGNvbnNvbGUubG9nKFwiTGVmdCBzd2lwZSBjbGlja1wiKTtcbiAgfVxuXG4gIHB1YmxpYyBvblJpZ2h0U3dpcGVDbGljayhhcmdzKSB7XG4gICAgdmFyIHJlbW92ZUZyaWVuZCA9IDxGcmllbmQ+YXJncy5vYmplY3QuYmluZGluZ0NvbnRleHQ7XG4gICAgdGhpcy5mcmllbmRTZXJ2aWNlLmRlbGV0ZUZyaWVuZChyZW1vdmVGcmllbmQpO1xuICB9XG5cbiAgcHVibGljIG9uSXRlbVRhcChhcmdzKSB7XG4gICAgbGV0IGxpc3RWaWV3OiBMaXN0VmlldyA9IHRoaXMubGlzdFZpZXcubmF0aXZlRWxlbWVudDtcbiAgICB2YXIgaXRlbVNlbGVjdGVkID0gPEZyaWVuZD50aGlzLm15RnJpZW5kc1thcmdzLmluZGV4XTtcbiAgICBmb3IgKHZhciBpdGVtIG9mIHRoaXMubXlGcmllbmRzKVxuICAgICAgaWYgKGl0ZW0uaWQgPT0gaXRlbVNlbGVjdGVkLmlkKVxuICAgICAgICBpdGVtLmFjdGl2YXRlID0gIWl0ZW0uYWN0aXZhdGU7XG5cbiAgICB0aGlzLmZyaWVuZFNlcnZpY2UudXBkYXRlRnJpZW5kKGl0ZW1TZWxlY3RlZCk7XG4gICAgbGlzdFZpZXcucmVmcmVzaCgpO1xuICB9XG4gIGxpc3RWaWV3SXRlbVRhcChhcmdzKSB7XG4gICAgdmFyIGl0ZW1JbmRleCA9IGFyZ3MuaW5kZXg7XG4gIH1cblxuXG4gIG5nT25Jbml0KCkge1xuICAgIHRoaXMubXlGcmllbmRzID0gbmV3IEFycmF5PEZyaWVuZD4oKTtcbiAgICB0aGlzLmZyaWVuZFNlcnZpY2UuZ2V0QWxsRnJpZW5kcygpLnN1YnNjcmliZSh4ID0+IHtcbiAgICAgIHRoaXMubXlGcmllbmRzID0geDtcbiAgICB9KTtcbiAgICB0aGlzLmZyaWVuZFNlcnZpY2UuZnJpZW5kVXBkYXRlJC5zdWJzY3JpYmUoeCA9PiB7XG4gICAgICB0aGlzLm15RnJpZW5kcyA9IHg7XG4gICAgfSk7XG4gIH1cbn0iXX0=