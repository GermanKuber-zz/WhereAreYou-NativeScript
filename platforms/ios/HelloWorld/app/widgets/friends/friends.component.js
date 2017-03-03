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
        if (friend != null && friend.activate) {
            if (friend.drawWaytToMe)
                return "friend-follow ";
            else
                return "friend-enable";
        }
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
        this.swipeLimits = swipeLimits;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZnJpZW5kcy5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJmcmllbmRzLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsc0NBQWdGO0FBQ2hGLHdFQUFzRTtBQUN0RSxzREFBcUQ7QUFJckQsc0NBQXlDO0FBUXpDLElBQWEsZ0JBQWdCO0lBUTNCLDBCQUFvQixhQUE2QjtRQUE3QixrQkFBYSxHQUFiLGFBQWEsQ0FBZ0I7UUFQakQsYUFBUSxHQUFXLElBQUksZUFBTSxFQUFFLENBQUM7SUFVaEMsQ0FBQztJQUVNLHVDQUFZLEdBQW5CLFVBQW9CLE1BQWM7UUFDaEMsRUFBRSxDQUFDLENBQUMsTUFBTSxJQUFJLElBQUksSUFBSSxNQUFNLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQztZQUN0QyxFQUFFLENBQUMsQ0FBQyxNQUFNLENBQUMsWUFBWSxDQUFDO2dCQUN0QixNQUFNLENBQUMsZ0JBQWdCLENBQUM7WUFDMUIsSUFBSTtnQkFDRixNQUFNLENBQUMsZUFBZSxDQUFDO1FBQzNCLENBQUM7UUFDRCxJQUFJO1lBQ0YsTUFBTSxDQUFDLGdCQUFnQixDQUFDO0lBQzVCLENBQUM7SUFDTSw2Q0FBa0IsR0FBekIsVUFBMEIsSUFBdUI7UUFDL0MsSUFBSSxXQUFXLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUM7UUFDeEMsSUFBSSxTQUFTLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBQy9CLElBQUksUUFBUSxHQUFHLFNBQVMsQ0FBQyxXQUFXLENBQUMsV0FBVyxDQUFDLENBQUM7UUFDbEQsSUFBSSxTQUFTLEdBQUcsU0FBUyxDQUFDLFdBQVcsQ0FBQyxhQUFhLENBQUMsQ0FBQztRQUNyRCxXQUFXLENBQUMsSUFBSSxHQUFHLFFBQVEsQ0FBQyxnQkFBZ0IsRUFBRSxDQUFDO1FBQy9DLFdBQVcsQ0FBQyxLQUFLLEdBQUcsU0FBUyxDQUFDLGdCQUFnQixFQUFFLENBQUM7UUFDakQsV0FB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VSxDQUFDOzhCQUFXLGlCQUFVO2tEQUFDO0FBTmpDLGdCQUFnQjtJQUw1QixnQkFBUyxDQUFDO1FBQ1QsUUFBUSxFQUFFLFNBQVM7UUFDbkIsV0FBVyxFQUFFLDhCQUE4QjtRQUMzQyxTQUFTLEVBQUUsQ0FBQyxvQ0FBb0MsRUFBRSw2QkFBNkIsQ0FBQztLQUNqRixDQUFDO3FDQVNtQyxnQ0FBYztHQVJ0QyxnQkFBZ0IsQ0EyRzVCO0FBM0dZLDRDQUFnQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgSW5wdXQsIE9uSW5pdCwgVmlld0NoaWxkLCBFbGVtZW50UmVmIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBGcmllbmRzU2VydmljZSB9IGZyb20gJy4uLy4uL3NoYXJlZC9mcmllbmRzL2ZyaWVuZHMuc2VydmljZSc7XG5pbXBvcnQgeyBGcmllbmQgfSBmcm9tICcuLi8uLi9zaGFyZWQvZnJpZW5kcy9mcmllbmQnO1xuaW1wb3J0IHsgTGlzdFZpZXcgfSBmcm9tICd1aS9saXN0LXZpZXcnO1xuaW1wb3J0IHsgTGlzdFZpZXdFdmVudERhdGEsIFJhZExpc3RWaWV3IH0gZnJvbSAnTmF0aXZlc2NyaXB0LXRlbGVyaWstdWkvbGlzdHZpZXcvaW5kZXgnO1xuaW1wb3J0IGxpc3RWaWV3TW9kdWxlID0gcmVxdWlyZShcInVpL2xpc3Qtdmlld1wiKTtcbmltcG9ydCBmcmFtZU1vZHVsZSA9IHJlcXVpcmUoXCJ1aS9mcmFtZVwiKTtcbmltcG9ydCBsYWJlbE1vZHVsZSA9IHJlcXVpcmUoXCJ1aS9sYWJlbFwiKTtcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiBcImZyaWVuZHNcIixcbiAgdGVtcGxhdGVVcmw6IFwid2lkZ2V0cy9mcmllbmRzL2ZyaWVuZHMuaHRtbFwiLFxuICBzdHlsZVVybHM6IFtcIndpZGdldHMvZnJpZW5kcy9mcmllbmRzLWNvbW1vbi5jc3NcIiwgXCJ3aWRnZXRzL2ZyaWVuZHMvZnJpZW5kcy5jc3NcIl1cbn0pXG5leHBvcnQgY2xhc3MgRnJpZW5kc0NvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XG4gIHNlbGVjdGVkOiBGcmllbmQgPSBuZXcgRnJpZW5kKCk7XG4gIHB1YmxpYyBteUZyaWVuZHM6IEFycmF5PEZyaWVuZD47XG4gIHByaXZhdGUgY291bnRlcjogbnVtYmVyO1xuICBwdWJsaWMgaW52aXRlRnJpZW5kOiBzdHJpbmc7XG4gIC8vIEBWaWV3Q2hpbGQoXCJsaXN0Vmlld1wiKSBsaXN0VmlldzogRWxlbWVudFJlZjtcbiAgQFZpZXdDaGlsZChcImxpc3RWaWV3XCIpIGxpc3RWaWV3OiBFbGVtZW50UmVmO1xuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgZnJpZW5kU2VydmljZTogRnJpZW5kc1NlcnZpY2UpIHtcblxuXG4gIH1cblxuICBwdWJsaWMgZ2V0Q29sb3JJdGVtKGZyaWVuZDogRnJpZW5kKTogc3RyaW5nIHtcbiAgICBpZiAoZnJpZW5kICE9IG51bGwgJiYgZnJpZW5kLmFjdGl2YXRlKSB7XG4gICAgICBpZiAoZnJpZW5kLmRyYXdXYXl0VG9NZSlcbiAgICAgICAgcmV0dXJuIFwiZnJpZW5kLWZvbGxvdyBcIjtcbiAgICAgIGVsc2VcbiAgICAgICAgcmV0dXJuIFwiZnJpZW5kLWVuYWJsZVwiO1xuICAgIH1cbiAgICBlbHNlXG4gICAgICByZXR1cm4gXCJmcmllbmQtZGlzYWJsZVwiO1xuICB9XG4gIHB1YmxpYyBvblN3aXBlQ2VsbFN0YXJ0ZWQoYXJnczogTGlzdFZpZXdFdmVudERhdGEpIHtcbiAgICB2YXIgc3dpcGVMaW1pdHMgPSBhcmdzLmRhdGEuc3dpcGVMaW1pdHM7XG4gICAgdmFyIHN3aXBlVmlldyA9IGFyZ3NbJ29iamVjdCddO1xuICAgIHZhciBsZWZ0SXRlbSA9IHN3aXBlVmlldy5nZXRWaWV3QnlJZCgnbWFyay12aWV3Jyk7XG4gICAgdmFyIHJpZ2h0SXRlbSA9IHN3aXBlVmlldy5nZXRWaWV3QnlJZCgnY29uZmlnLXZpZXcnKTtcbiAgICBzd2lwZUxpbWl0cy5sZWZ0ID0gbGVmdEl0ZW0uZ2V0TWVhc3VyZWRXaWR0aCgpO1xuICAgIHN3aXBlTGltaXRzLnJpZ2h0ID0gcmlnaHRJdGVtLmdldE1lYXN1cmVkV2lkdGgoKTtcbiAgICBzd2lwZUxpbWl0cy50aHJlc2hvbGQgPSBsZWZ0SXRlbS5nZXRNZWFzdXJlZFdpZHRoKCkgLyAyO1xuICAgIHRoaXMuc3dpcGVMaW1pdHMgPSBzd2lwZUxpbWl0cztcbiAgfVxuICBwcml2YXRlIHN3aXBlTGltaXRzO1xuICBwdWJsaWMgb25Td2lwZUNlbGxGaW5pc2hlZChhcmdzOiBMaXN0Vmlld0V2ZW50RGF0YSkge1xuICAgIGlmIChhcmdzLmRhdGEueCA+IDIwMCkge1xuICAgICAgY29uc29sZS5sb2coXCJQZXJmb3JtIGxlZnQgYWN0aW9uXCIpO1xuICAgIH0gZWxzZSBpZiAoYXJncy5kYXRhLnggPCAtMjAwKSB7XG4gICAgICBjb25zb2xlLmxvZyhcIlBlcmZvcm0gcmlnaHQgYWN0aW9uXCIpO1xuICAgIH1cbiAgfVxuICBwdWJsaWMgb25DZWxsU3dpcGluZyhhcmdzOiBMaXN0Vmlld0V2ZW50RGF0YSkge1xuICAgIHZhciBzd2lwZUxpbWl0cyA9IGFyZ3MuZGF0YS5zd2lwZUxpbWl0cztcbiAgICB2YXIgY3VycmVudEl0ZW1WaWV3ID0gYXJncy5vYmplY3Q7XG4gICAgdmFyIGN1cnJlbnRWaWV3O1xuXG4gICAgaWYgKGFyZ3MuZGF0YS54ID4gMjAwKSB7XG4gICAgICBjb25zb2xlLmxvZyhcIk5vdGlmeSBwZXJmb3JtIGxlZnQgYWN0aW9uXCIpO1xuICAgIH0gZWxzZSBpZiAoYXJncy5kYXRhLnggPCAtMjAwKSB7XG4gICAgICBjb25zb2xlLmxvZyhcIk5vdGlmeSBwZXJmb3JtIHJpZ2h0IGFjdGlvblwiKTtcbiAgICB9XG4gIH1cblxuXG4gIHB1YmxpYyBvbkl0ZW1TZWxlY3RlZChhcmdzOiBMaXN0Vmlld0V2ZW50RGF0YSkge1xuICAgIHZhciBsaXN0VmlldyA9IDxSYWRMaXN0Vmlldz5mcmFtZU1vZHVsZS50b3Btb3N0KCkuY3VycmVudFBhZ2UuZ2V0Vmlld0J5SWQoXCJsaXN0Vmlld1wiKTtcbiAgICBsaXN0Vmlldy5ub3RpZnlTd2lwZVRvRXhlY3V0ZUZpbmlzaGVkKCk7XG4gICAgdmFyIGl0ZW1TZWxlY3RlZCA9IDxGcmllbmQ+dGhpcy5teUZyaWVuZHNbYXJncy5pdGVtSW5kZXhdO1xuICAgIGZvciAodmFyIGl0ZW0gb2YgdGhpcy5teUZyaWVuZHMpXG4gICAgICBpZiAoaXRlbS5pZCA9PSBpdGVtU2VsZWN0ZWQuaWQpXG4gICAgICAgIGl0ZW0uYWN0aXZhdGUgPSAhaXRlbS5hY3RpdmF0ZTtcblxuICAgIHRoaXMuZnJpZW5kU2VydmljZS51cGRhdGVGcmllbmQoaXRlbVNlbGVjdGVkKTtcbiAgICBsaXN0Vmlldy5yZWZyZXNoKCk7XG4gIH1cblxuICBwdWJsaWMgb25MZWZ0U3dpcGVDbGljayhhcmdzKSB7XG4gICAgY29uc29sZS5sb2coXCJMZWZ0IHN3aXBlIGNsaWNrXCIpO1xuICB9XG5cbiAgcHVibGljIHdheVRvTWUoYXJncykge1xuICAgIHZhciB1cGRhdGVGcmllbmQgPSA8RnJpZW5kPmFyZ3Mub2JqZWN0LmJpbmRpbmdDb250ZXh0O1xuICAgIHVwZGF0ZUZyaWVuZC5kcmF3V2F5dFRvTWUgPSB0cnVlO1xuICAgIHRoaXMuZnJpZW5kU2VydmljZS51cGRhdGVGcmllbmQodXBkYXRlRnJpZW5kKTtcbiAgfVxuICBwdWJsaWMgZGlzYWJsZVdheVRvTWUoYXJncykge1xuICAgIHZhciB1cGRhdGVGcmllbmQgPSA8RnJpZW5kPmFyZ3Mub2JqZWN0LmJpbmRpbmdDb250ZXh0O1xuICAgIHVwZGF0ZUZyaWVuZC5kcmF3V2F5dFRvTWUgPSBmYWxzZTtcbiAgICB0aGlzLmZyaWVuZFNlcnZpY2UudXBkYXRlRnJpZW5kKHVwZGF0ZUZyaWVuZCk7XG4gIH1cblxuICBwdWJsaWMgb25JdGVtVGFwKGFyZ3MpIHtcbiAgICBsZXQgbGlzdFZpZXc6IExpc3RWaWV3ID0gdGhpcy5saXN0Vmlldy5uYXRpdmVFbGVtZW50O1xuICAgIHZhciBpdGVtU2VsZWN0ZWQgPSA8RnJpZW5kPnRoaXMubXlGcmllbmRzW2FyZ3MuaW5kZXhdO1xuICAgIGZvciAodmFyIGl0ZW0gb2YgdGhpcy5teUZyaWVuZHMpXG4gICAgICBpZiAoaXRlbS5pZCA9PSBpdGVtU2VsZWN0ZWQuaWQpIHtcbiAgICAgICAgLy9UT0RPOiBTZSBkZWJlIGFncmVnYXIgdW4gYm90b24gZXNwZWNpYWwgcGFyYSBhY3RpdmFyIGVsIHNldWltaWVudG9cbiAgICAgICAgaXRlbS5hY3RpdmF0ZSA9ICFpdGVtLmFjdGl2YXRlO1xuICAgICAgfVxuXG4gICAgdGhpcy5mcmllbmRTZXJ2aWNlLnVwZGF0ZUZyaWVuZChpdGVtU2VsZWN0ZWQpO1xuICAgIGxpc3RWaWV3LnJlZnJlc2goKTtcbiAgfVxuICBsaXN0Vmlld0l0ZW1UYXAoYXJncykge1xuICAgIHZhciBpdGVtSW5kZXggPSBhcmdzLmluZGV4O1xuICB9XG5cblxuICBuZ09uSW5pdCgpIHtcbiAgICB0aGlzLm15RnJpZW5kcyA9IG5ldyBBcnJheTxGcmllbmQ+KCk7XG4gICAgdGhpcy5mcmllbmRTZXJ2aWNlLmdldEFsbEZyaWVuZHMoKS5zdWJzY3JpYmUoeCA9PiB7XG4gICAgICB0aGlzLm15RnJpZW5kcyA9IHg7XG4gICAgfSk7XG4gICAgdGhpcy5mcmllbmRTZXJ2aWNlLmZyaWVuZFVwZGF0ZSQuc3Vic2NyaWJlKHggPT4ge1xuICAgICAgdGhpcy5teUZyaWVuZHMgPSB4O1xuICAgIH0pO1xuICB9XG59Il19