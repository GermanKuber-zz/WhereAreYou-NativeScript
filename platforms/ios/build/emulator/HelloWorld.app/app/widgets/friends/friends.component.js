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
        var rightItem = swipeView.getViewById('config-view');
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
    FriendsComponent.prototype.wayToMe = function (args) {
        var updateFriend = args.object.bindingContext;
        updateFriend.drawWaytToMe = true;
        this.friendService.updateFriend(updateFriend);
    };
    FriendsComponent.prototype.disableWayToMe = function (args) {
        var updateFriend = args.object.bindingContext;
        updateFriend.drawWaytToMe = false;
        this.friendService.updateFriend(updateFriend);
    };
    FriendsComponent.prototype.onItemTap = function (args) {
        var listView = this.listView.nativeElement;
        var itemSelected = this.myFriends[args.index];
        for (var _i = 0, _a = this.myFriends; _i < _a.length; _i++) {
            var item = _a[_i];
            if (item.id == itemSelected.id) {
                //TODO: Se debe agregar un boton especial para activar el seuimiento
                item.activate = !item.activate;
            }
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZnJpZW5kcy5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJmcmllbmRzLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsc0NBQWdGO0FBQ2hGLHdFQUFzRTtBQUN0RSxzREFBcUQ7QUFJckQsc0NBQXlDO0FBUXpDLElBQWEsZ0JBQWdCO0lBUTNCLDBCQUFvQixhQUE2QjtRQUE3QixrQkFBYSxHQUFiLGFBQWEsQ0FBZ0I7UUFQakQsYUFBUSxHQUFXLElBQUksZUFBTSxFQUFFLENBQUM7SUFVaEMsQ0FBQztJQUNNLG9DQUFTLEdBQWhCO1FBQ0UsSUFBSSxDQUFDLEdBQUcsSUFBSSxDQUFDLFlBQVksQ0FBQztJQUM1QixDQUFDO0lBQ00sdUNBQVksR0FBbkIsVUFBb0IsTUFBYztRQUNoQyxFQUFFLENBQUMsQ0FBQyxNQUFNLElBQUksSUFBSSxJQUFJLE1BQU0sQ0FBQyxRQUFRLENBQUM7WUFDcEMsTUFBTSxDQUFDLGVBQWUsQ0FBQztRQUN6QixJQUFJO1lBQ0YsTUFBTSxDQUFDLGdCQUFnQixDQUFDO0lBQzVCLENBQUM7SUFDTSw2Q0FBa0IsR0FBekIsVUFBMEIsSUFBdUI7UUFDL0MsSUFBSSxXQUFXLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUM7UUFDeEMsSUFBSSxTQUFTLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBQy9CLElBQUksUUFBUSxHQUFHLFNBQVMsQ0FBQyxXQUFXLENBQUMsV0FBVyxDQUFDLENBQUM7UUFDbEQsSUFBSSxTQUFTLEdBQUcsU0FBUyxDQUFDLFdBQVcsQ0FBQyxhQUFhLENBQUMsQ0FBQztRQUNyRCxXQUFXLENBQUMsSUFBSSxHQUFHLFFBQVEsQ0FBQyxnQkFBZ0IsRUFBRSxDQUFDO1FBQy9DLFdBQVcsQ0FBQyxLQUFLLEdBQUcsU0FBUyxDQUFDLGdCQUFnQixFQUFFLENBQUM7UUFDakQsV0FBVyxDQUFDLFNBQVMsR0FBRyxRQUFRLENBQUMsZ0JBQWdC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LFNBQVM7UUFDbkIsV0FBVyxFQUFFLDhCQUE4QjtRQUMzQyxTQUFTLEVBQUUsQ0FBQyxvQ0FBb0MsRUFBRSw2QkFBNkIsQ0FBQztLQUNqRixDQUFDO3FDQVNtQyxnQ0FBYztHQVJ0QyxnQkFBZ0IsQ0F3RzVCO0FBeEdZLDRDQUFnQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgSW5wdXQsIE9uSW5pdCwgVmlld0NoaWxkLCBFbGVtZW50UmVmIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBGcmllbmRzU2VydmljZSB9IGZyb20gJy4uLy4uL3NoYXJlZC9mcmllbmRzL2ZyaWVuZHMuc2VydmljZSc7XG5pbXBvcnQgeyBGcmllbmQgfSBmcm9tICcuLi8uLi9zaGFyZWQvZnJpZW5kcy9mcmllbmQnO1xuaW1wb3J0IHsgTGlzdFZpZXcgfSBmcm9tICd1aS9saXN0LXZpZXcnO1xuaW1wb3J0IHsgTGlzdFZpZXdFdmVudERhdGEsIFJhZExpc3RWaWV3IH0gZnJvbSAnTmF0aXZlc2NyaXB0LXRlbGVyaWstdWkvbGlzdHZpZXcvaW5kZXgnO1xuaW1wb3J0IGxpc3RWaWV3TW9kdWxlID0gcmVxdWlyZShcInVpL2xpc3Qtdmlld1wiKTtcbmltcG9ydCBmcmFtZU1vZHVsZSA9IHJlcXVpcmUoXCJ1aS9mcmFtZVwiKTtcbmltcG9ydCBsYWJlbE1vZHVsZSA9IHJlcXVpcmUoXCJ1aS9sYWJlbFwiKTtcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiBcImZyaWVuZHNcIixcbiAgdGVtcGxhdGVVcmw6IFwid2lkZ2V0cy9mcmllbmRzL2ZyaWVuZHMuaHRtbFwiLFxuICBzdHlsZVVybHM6IFtcIndpZGdldHMvZnJpZW5kcy9mcmllbmRzLWNvbW1vbi5jc3NcIiwgXCJ3aWRnZXRzL2ZyaWVuZHMvZnJpZW5kcy5jc3NcIl1cbn0pXG5leHBvcnQgY2xhc3MgRnJpZW5kc0NvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XG4gIHNlbGVjdGVkOiBGcmllbmQgPSBuZXcgRnJpZW5kKCk7XG4gIHB1YmxpYyBteUZyaWVuZHM6IEFycmF5PEZyaWVuZD47XG4gIHByaXZhdGUgY291bnRlcjogbnVtYmVyO1xuICBwdWJsaWMgaW52aXRlRnJpZW5kOiBzdHJpbmc7XG4gIC8vIEBWaWV3Q2hpbGQoXCJsaXN0Vmlld1wiKSBsaXN0VmlldzogRWxlbWVudFJlZjtcbiAgQFZpZXdDaGlsZChcImxpc3RWaWV3XCIpIGxpc3RWaWV3OiBFbGVtZW50UmVmO1xuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgZnJpZW5kU2VydmljZTogRnJpZW5kc1NlcnZpY2UpIHtcblxuXG4gIH1cbiAgcHVibGljIGFkZEZyaWVuZCgpIHtcbiAgICB2YXIgYSA9IHRoaXMuaW52aXRlRnJpZW5kO1xuICB9XG4gIHB1YmxpYyBnZXRDb2xvckl0ZW0oZnJpZW5kOiBGcmllbmQpOiBzdHJpbmcge1xuICAgIGlmIChmcmllbmQgIT0gbnVsbCAmJiBmcmllbmQuYWN0aXZhdGUpXG4gICAgICByZXR1cm4gXCJmcmllbmQtZW5hYmxlXCI7XG4gICAgZWxzZVxuICAgICAgcmV0dXJuIFwiZnJpZW5kLWRpc2FibGVcIjtcbiAgfVxuICBwdWJsaWMgb25Td2lwZUNlbGxTdGFydGVkKGFyZ3M6IExpc3RWaWV3RXZlbnREYXRhKSB7XG4gICAgdmFyIHN3aXBlTGltaXRzID0gYXJncy5kYXRhLnN3aXBlTGltaXRzO1xuICAgIHZhciBzd2lwZVZpZXcgPSBhcmdzWydvYmplY3QnXTtcbiAgICB2YXIgbGVmdEl0ZW0gPSBzd2lwZVZpZXcuZ2V0Vmlld0J5SWQoJ21hcmstdmlldycpO1xuICAgIHZhciByaWdodEl0ZW0gPSBzd2lwZVZpZXcuZ2V0Vmlld0J5SWQoJ2NvbmZpZy12aWV3Jyk7XG4gICAgc3dpcGVMaW1pdHMubGVmdCA9IGxlZnRJdGVtLmdldE1lYXN1cmVkV2lkdGgoKTtcbiAgICBzd2lwZUxpbWl0cy5yaWdodCA9IHJpZ2h0SXRlbS5nZXRNZWFzdXJlZFdpZHRoKCk7XG4gICAgc3dpcGVMaW1pdHMudGhyZXNob2xkID0gbGVmdEl0ZW0uZ2V0TWVhc3VyZWRXaWR0aCgpIC8gMjtcbiAgfVxuXG4gIHB1YmxpYyBvblN3aXBlQ2VsbEZpbmlzaGVkKGFyZ3M6IExpc3RWaWV3RXZlbnREYXRhKSB7XG4gICAgaWYgKGFyZ3MuZGF0YS54ID4gMjAwKSB7XG4gICAgICBjb25zb2xlLmxvZyhcIlBlcmZvcm0gbGVmdCBhY3Rpb25cIik7XG4gICAgfSBlbHNlIGlmIChhcmdzLmRhdGEueCA8IC0yMDApIHtcbiAgICAgIGNvbnNvbGUubG9nKFwiUGVyZm9ybSByaWdodCBhY3Rpb25cIik7XG4gICAgfVxuICB9XG4gIHB1YmxpYyBvbkNlbGxTd2lwaW5nKGFyZ3M6IExpc3RWaWV3RXZlbnREYXRhKSB7XG4gICAgdmFyIHN3aXBlTGltaXRzID0gYXJncy5kYXRhLnN3aXBlTGltaXRzO1xuICAgIHZhciBjdXJyZW50SXRlbVZpZXcgPSBhcmdzLm9iamVjdDtcbiAgICB2YXIgY3VycmVudFZpZXc7XG5cbiAgICBpZiAoYXJncy5kYXRhLnggPiAyMDApIHtcbiAgICAgIGNvbnNvbGUubG9nKFwiTm90aWZ5IHBlcmZvcm0gbGVmdCBhY3Rpb25cIik7XG4gICAgfSBlbHNlIGlmIChhcmdzLmRhdGEueCA8IC0yMDApIHtcbiAgICAgIGNvbnNvbGUubG9nKFwiTm90aWZ5IHBlcmZvcm0gcmlnaHQgYWN0aW9uXCIpO1xuICAgIH1cbiAgfVxuXG5cbiAgcHVibGljIG9uSXRlbVNlbGVjdGVkKGFyZ3M6IExpc3RWaWV3RXZlbnREYXRhKSB7XG4gICAgdmFyIGxpc3RWaWV3ID0gPFJhZExpc3RWaWV3PmZyYW1lTW9kdWxlLnRvcG1vc3QoKS5jdXJyZW50UGFnZS5nZXRWaWV3QnlJZChcImxpc3RWaWV3XCIpO1xuICAgIGxpc3RWaWV3Lm5vdGlmeVN3aXBlVG9FeGVjdXRlRmluaXNoZWQoKTtcbiAgICB2YXIgaXRlbVNlbGVjdGVkID0gPEZyaWVuZD50aGlzLm15RnJpZW5kc1thcmdzLml0ZW1JbmRleF07XG4gICAgZm9yICh2YXIgaXRlbSBvZiB0aGlzLm15RnJpZW5kcylcbiAgICAgIGlmIChpdGVtLmlkID09IGl0ZW1TZWxlY3RlZC5pZClcbiAgICAgICAgaXRlbS5hY3RpdmF0ZSA9ICFpdGVtLmFjdGl2YXRlO1xuXG4gICAgdGhpcy5mcmllbmRTZXJ2aWNlLnVwZGF0ZUZyaWVuZChpdGVtU2VsZWN0ZWQpO1xuICAgIGxpc3RWaWV3LnJlZnJlc2goKTtcbiAgfVxuXG4gIHB1YmxpYyBvbkxlZnRTd2lwZUNsaWNrKGFyZ3MpIHtcbiAgICBjb25zb2xlLmxvZyhcIkxlZnQgc3dpcGUgY2xpY2tcIik7XG4gIH1cblxuICBwdWJsaWMgd2F5VG9NZShhcmdzKSB7XG4gICAgdmFyIHVwZGF0ZUZyaWVuZCA9IDxGcmllbmQ+YXJncy5vYmplY3QuYmluZGluZ0NvbnRleHQ7XG4gICAgdXBkYXRlRnJpZW5kLmRyYXdXYXl0VG9NZSA9IHRydWU7XG4gICAgdGhpcy5mcmllbmRTZXJ2aWNlLnVwZGF0ZUZyaWVuZCh1cGRhdGVGcmllbmQpO1xuICB9XG4gIHB1YmxpYyBkaXNhYmxlV2F5VG9NZShhcmdzKSB7XG4gICAgdmFyIHVwZGF0ZUZyaWVuZCA9IDxGcmllbmQ+YXJncy5vYmplY3QuYmluZGluZ0NvbnRleHQ7XG4gICAgdXBkYXRlRnJpZW5kLmRyYXdXYXl0VG9NZSA9IGZhbHNlO1xuICAgIHRoaXMuZnJpZW5kU2VydmljZS51cGRhdGVGcmllbmQodXBkYXRlRnJpZW5kKTtcbiAgfVxuXG4gIHB1YmxpYyBvbkl0ZW1UYXAoYXJncykge1xuICAgIGxldCBsaXN0VmlldzogTGlzdFZpZXcgPSB0aGlzLmxpc3RWaWV3Lm5hdGl2ZUVsZW1lbnQ7XG4gICAgdmFyIGl0ZW1TZWxlY3RlZCA9IDxGcmllbmQ+dGhpcy5teUZyaWVuZHNbYXJncy5pbmRleF07XG4gICAgZm9yICh2YXIgaXRlbSBvZiB0aGlzLm15RnJpZW5kcylcbiAgICAgIGlmIChpdGVtLmlkID09IGl0ZW1TZWxlY3RlZC5pZCkge1xuICAgICAgICAvL1RPRE86IFNlIGRlYmUgYWdyZWdhciB1biBib3RvbiBlc3BlY2lhbCBwYXJhIGFjdGl2YXIgZWwgc2V1aW1pZW50b1xuICAgICAgICBpdGVtLmFjdGl2YXRlID0gIWl0ZW0uYWN0aXZhdGU7XG4gICAgICB9XG5cbiAgICB0aGlzLmZyaWVuZFNlcnZpY2UudXBkYXRlRnJpZW5kKGl0ZW1TZWxlY3RlZCk7XG4gICAgbGlzdFZpZXcucmVmcmVzaCgpO1xuICB9XG4gIGxpc3RWaWV3SXRlbVRhcChhcmdzKSB7XG4gICAgdmFyIGl0ZW1JbmRleCA9IGFyZ3MuaW5kZXg7XG4gIH1cblxuXG4gIG5nT25Jbml0KCkge1xuICAgIHRoaXMubXlGcmllbmRzID0gbmV3IEFycmF5PEZyaWVuZD4oKTtcbiAgICB0aGlzLmZyaWVuZFNlcnZpY2UuZ2V0QWxsRnJpZW5kcygpLnN1YnNjcmliZSh4ID0+IHtcbiAgICAgIHRoaXMubXlGcmllbmRzID0geDtcbiAgICB9KTtcbiAgICB0aGlzLmZyaWVuZFNlcnZpY2UuZnJpZW5kVXBkYXRlJC5zdWJzY3JpYmUoeCA9PiB7XG4gICAgICB0aGlzLm15RnJpZW5kcyA9IHg7XG4gICAgfSk7XG4gIH1cbn0iXX0=