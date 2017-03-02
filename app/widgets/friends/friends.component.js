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
        console.log("Right swipe click");
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
            var count = 0;
            for (var _i = 0, _a = _this.myFriends; _i < _a.length; _i++) {
                var item = _a[_i];
                if (item.id == x.id) {
                    _this.myFriends[count] = x;
                }
                ++count;
            }
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZnJpZW5kcy5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJmcmllbmRzLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsc0NBQWdGO0FBQ2hGLHdFQUFzRTtBQUN0RSxzREFBcUQ7QUFJckQsc0NBQXlDO0FBUXpDLElBQWEsZ0JBQWdCO0lBTzNCLDBCQUFvQixhQUE2QjtRQUE3QixrQkFBYSxHQUFiLGFBQWEsQ0FBZ0I7UUFOakQsYUFBUSxHQUFXLElBQUksZUFBTSxFQUFFLENBQUM7SUFTaEMsQ0FBQztJQUNNLHVDQUFZLEdBQW5CLFVBQW9CLE1BQWM7UUFDaEMsRUFBRSxDQUFDLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQztZQUNsQixNQUFNLENBQUMsZUFBZSxDQUFDO1FBQ3pCLElBQUk7WUFDRixNQUFNLENBQUMsZ0JBQWdCLENBQUM7SUFDNUIsQ0FBQztJQUNNLDZDQUFrQixHQUF6QixVQUEwQixJQUF1QjtRQUMvQyxJQUFJLFdBQVcsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQztRQUN4QyxJQUFJLFNBQVMsR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUM7UUFDL0IsSUFBSSxRQUFRLEdBQUcsU0FBUyxDQUFDLFdBQVcsQ0FBQyxXQUFXLENBQUMsQ0FBQztRQUNsRCxJQUFJLFNBQVMsR0FBRyxTQUFTLENBQUMsV0FBVyxDQUFDLGFBQWEsQ0FBQyxDQUFDO1FBQ3JELFdBQVcsQ0FBQyxJQUFJLEdBQUcsUUFBUSxDQUFDLGdCQUFnQixFQUFFLENBQUM7UUFDL0MsV0FBVyxDQUFDLEtBQUssR0FBRyxTQUFTLENBQUMsZ0JBQWdCLEVBQUUsQ0FBQztRQUNqRCxXQUFXLENBQUMsU0FBUyxHQUFHLFFBQVEsQ0FBQyxnQkFBZ0IsRUFBRSxHQUFHLENBQUMsQ0FBQztJQUMxRCxDQUFDO0lBRU0sOENBQW1CLEdBQTFCLFVBQTJCLElBQXVCO1FBQ2hELEVBQUUsQ0FBQyxDQUFDLElBQUks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ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgSW5wdXQsIE9uSW5pdCwgVmlld0NoaWxkLCBFbGVtZW50UmVmIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBGcmllbmRzU2VydmljZSB9IGZyb20gJy4uLy4uL3NoYXJlZC9mcmllbmRzL2ZyaWVuZHMuc2VydmljZSc7XG5pbXBvcnQgeyBGcmllbmQgfSBmcm9tICcuLi8uLi9zaGFyZWQvZnJpZW5kcy9mcmllbmQnO1xuaW1wb3J0IHsgTGlzdFZpZXcgfSBmcm9tICd1aS9saXN0LXZpZXcnO1xuaW1wb3J0IHsgTGlzdFZpZXdFdmVudERhdGEsIFJhZExpc3RWaWV3IH0gZnJvbSAnTmF0aXZlc2NyaXB0LXRlbGVyaWstdWkvbGlzdHZpZXcvaW5kZXgnO1xuaW1wb3J0IGxpc3RWaWV3TW9kdWxlID0gcmVxdWlyZShcInVpL2xpc3Qtdmlld1wiKTtcbmltcG9ydCBmcmFtZU1vZHVsZSA9IHJlcXVpcmUoXCJ1aS9mcmFtZVwiKTtcbmltcG9ydCBsYWJlbE1vZHVsZSA9IHJlcXVpcmUoXCJ1aS9sYWJlbFwiKTtcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiBcImZyaWVuZHNcIixcbiAgdGVtcGxhdGVVcmw6IFwid2lkZ2V0cy9mcmllbmRzL2ZyaWVuZHMuaHRtbFwiLFxuICBzdHlsZVVybHM6IFtcIndpZGdldHMvZnJpZW5kcy9mcmllbmRzLWNvbW1vbi5jc3NcIiwgXCJ3aWRnZXRzL2ZyaWVuZHMvZnJpZW5kcy5jc3NcIl1cbn0pXG5leHBvcnQgY2xhc3MgRnJpZW5kc0NvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XG4gIHNlbGVjdGVkOiBGcmllbmQgPSBuZXcgRnJpZW5kKCk7XG4gIHB1YmxpYyBteUZyaWVuZHM6IEFycmF5PEZyaWVuZD47XG4gIHByaXZhdGUgY291bnRlcjogbnVtYmVyO1xuICAvLyBAVmlld0NoaWxkKFwibGlzdFZpZXdcIikgbGlzdFZpZXc6IEVsZW1lbnRSZWY7XG4gIEBWaWV3Q2hpbGQoXCJsaXN0Vmlld1wiKSBsaXN0VmlldzogRWxlbWVudFJlZjtcblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIGZyaWVuZFNlcnZpY2U6IEZyaWVuZHNTZXJ2aWNlKSB7XG5cblxuICB9XG4gIHB1YmxpYyBnZXRDb2xvckl0ZW0oZnJpZW5kOiBGcmllbmQpOiBzdHJpbmcge1xuICAgIGlmIChmcmllbmQuYWN0aXZhdGUpXG4gICAgICByZXR1cm4gXCJmcmllbmQtZW5hYmxlXCI7XG4gICAgZWxzZVxuICAgICAgcmV0dXJuIFwiZnJpZW5kLWRpc2FibGVcIjtcbiAgfVxuICBwdWJsaWMgb25Td2lwZUNlbGxTdGFydGVkKGFyZ3M6IExpc3RWaWV3RXZlbnREYXRhKSB7XG4gICAgdmFyIHN3aXBlTGltaXRzID0gYXJncy5kYXRhLnN3aXBlTGltaXRzO1xuICAgIHZhciBzd2lwZVZpZXcgPSBhcmdzWydvYmplY3QnXTtcbiAgICB2YXIgbGVmdEl0ZW0gPSBzd2lwZVZpZXcuZ2V0Vmlld0J5SWQoJ21hcmstdmlldycpO1xuICAgIHZhciByaWdodEl0ZW0gPSBzd2lwZVZpZXcuZ2V0Vmlld0J5SWQoJ2RlbGV0ZS12aWV3Jyk7XG4gICAgc3dpcGVMaW1pdHMubGVmdCA9IGxlZnRJdGVtLmdldE1lYXN1cmVkV2lkdGgoKTtcbiAgICBzd2lwZUxpbWl0cy5yaWdodCA9IHJpZ2h0SXRlbS5nZXRNZWFzdXJlZFdpZHRoKCk7XG4gICAgc3dpcGVMaW1pdHMudGhyZXNob2xkID0gbGVmdEl0ZW0uZ2V0TWVhc3VyZWRXaWR0aCgpIC8gMjtcbiAgfVxuXG4gIHB1YmxpYyBvblN3aXBlQ2VsbEZpbmlzaGVkKGFyZ3M6IExpc3RWaWV3RXZlbnREYXRhKSB7XG4gICAgaWYgKGFyZ3MuZGF0YS54ID4gMjAwKSB7XG4gICAgICBjb25zb2xlLmxvZyhcIlBlcmZvcm0gbGVmdCBhY3Rpb25cIik7XG4gICAgfSBlbHNlIGlmIChhcmdzLmRhdGEueCA8IC0yMDApIHtcbiAgICAgIGNvbnNvbGUubG9nKFwiUGVyZm9ybSByaWdodCBhY3Rpb25cIik7XG4gICAgfVxuICB9XG4gIHB1YmxpYyBvbkNlbGxTd2lwaW5nKGFyZ3M6IExpc3RWaWV3RXZlbnREYXRhKSB7XG4gICAgdmFyIHN3aXBlTGltaXRzID0gYXJncy5kYXRhLnN3aXBlTGltaXRzO1xuICAgIHZhciBjdXJyZW50SXRlbVZpZXcgPSBhcmdzLm9iamVjdDtcbiAgICB2YXIgY3VycmVudFZpZXc7XG5cbiAgICBpZiAoYXJncy5kYXRhLnggPiAyMDApIHtcbiAgICAgIGNvbnNvbGUubG9nKFwiTm90aWZ5IHBlcmZvcm0gbGVmdCBhY3Rpb25cIik7XG4gICAgfSBlbHNlIGlmIChhcmdzLmRhdGEueCA8IC0yMDApIHtcbiAgICAgIGNvbnNvbGUubG9nKFwiTm90aWZ5IHBlcmZvcm0gcmlnaHQgYWN0aW9uXCIpO1xuICAgIH1cbiAgfVxuXG5cbiAgcHVibGljIG9uSXRlbVNlbGVjdGVkKGFyZ3M6IExpc3RWaWV3RXZlbnREYXRhKSB7XG4gICAgdmFyIGxpc3RWaWV3ID0gPFJhZExpc3RWaWV3PmZyYW1lTW9kdWxlLnRvcG1vc3QoKS5jdXJyZW50UGFnZS5nZXRWaWV3QnlJZChcImxpc3RWaWV3XCIpO1xuICAgIGxpc3RWaWV3Lm5vdGlmeVN3aXBlVG9FeGVjdXRlRmluaXNoZWQoKTtcbiAgICAgdmFyIGl0ZW1TZWxlY3RlZCA9IDxGcmllbmQ+dGhpcy5teUZyaWVuZHNbYXJncy5pdGVtSW5kZXhdO1xuICAgIGZvciAodmFyIGl0ZW0gb2YgdGhpcy5teUZyaWVuZHMpXG4gICAgICBpZiAoaXRlbS5pZCA9PSBpdGVtU2VsZWN0ZWQuaWQpXG4gICAgICAgIGl0ZW0uYWN0aXZhdGUgPSAhaXRlbS5hY3RpdmF0ZTtcblxuICAgIHRoaXMuZnJpZW5kU2VydmljZS51cGRhdGVGcmllbmQoaXRlbVNlbGVjdGVkKTtcbiAgICBsaXN0Vmlldy5yZWZyZXNoKCk7XG4gIH1cblxuICBwdWJsaWMgb25MZWZ0U3dpcGVDbGljayhhcmdzKSB7XG4gICAgY29uc29sZS5sb2coXCJMZWZ0IHN3aXBlIGNsaWNrXCIpO1xuICB9XG5cbiAgcHVibGljIG9uUmlnaHRTd2lwZUNsaWNrKGFyZ3MpIHtcbiAgICBjb25zb2xlLmxvZyhcIlJpZ2h0IHN3aXBlIGNsaWNrXCIpO1xuICB9XG5cbiAgcHVibGljIG9uSXRlbVRhcChhcmdzKSB7XG4gICAgbGV0IGxpc3RWaWV3OiBMaXN0VmlldyA9IHRoaXMubGlzdFZpZXcubmF0aXZlRWxlbWVudDtcbiAgICB2YXIgaXRlbVNlbGVjdGVkID0gPEZyaWVuZD50aGlzLm15RnJpZW5kc1thcmdzLmluZGV4XTtcbiAgICBmb3IgKHZhciBpdGVtIG9mIHRoaXMubXlGcmllbmRzKVxuICAgICAgaWYgKGl0ZW0uaWQgPT0gaXRlbVNlbGVjdGVkLmlkKVxuICAgICAgICBpdGVtLmFjdGl2YXRlID0gIWl0ZW0uYWN0aXZhdGU7XG5cbiAgICB0aGlzLmZyaWVuZFNlcnZpY2UudXBkYXRlRnJpZW5kKGl0ZW1TZWxlY3RlZCk7XG4gICAgbGlzdFZpZXcucmVmcmVzaCgpO1xuICB9XG4gIGxpc3RWaWV3SXRlbVRhcChhcmdzKSB7XG4gICAgdmFyIGl0ZW1JbmRleCA9IGFyZ3MuaW5kZXg7XG4gIH1cblxuXG4gIG5nT25Jbml0KCkge1xuICAgIHRoaXMubXlGcmllbmRzID0gbmV3IEFycmF5PEZyaWVuZD4oKTtcbiAgICB0aGlzLmZyaWVuZFNlcnZpY2UuZ2V0QWxsRnJpZW5kcygpLnN1YnNjcmliZSh4ID0+IHtcbiAgICAgIHRoaXMubXlGcmllbmRzID0geDtcbiAgICB9KTtcbiAgICB0aGlzLmZyaWVuZFNlcnZpY2UuZnJpZW5kVXBkYXRlJC5zdWJzY3JpYmUoeCA9PiB7XG4gICAgICB2YXIgY291bnQgPSAwO1xuICAgICAgZm9yICh2YXIgaXRlbSBvZiB0aGlzLm15RnJpZW5kcykge1xuICAgICAgICBpZiAoaXRlbS5pZCA9PSB4LmlkKSB7XG4gICAgICAgICAgdGhpcy5teUZyaWVuZHNbY291bnRdID0geDtcbiAgICAgICAgfVxuICAgICAgICArK2NvdW50O1xuICAgICAgfVxuICAgIH0pO1xuICB9XG59Il19