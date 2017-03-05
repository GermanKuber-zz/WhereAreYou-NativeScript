"use strict";
var core_1 = require("@angular/core");
var friends_service_1 = require("../../shared/friends/friends.service");
var friend_1 = require("../../shared/friends/friend");
var frameModule = require("ui/frame");
var FriendsComponent = (function () {
    function FriendsComponent(friendService) {
        this.friendService = friendService;
        this.selected = new friend_1.Friend();
        this.updateFriedDistance();
    }
    FriendsComponent.prototype.updateFriedDistance = function () {
        var _this = this;
        setTimeout(function () {
            _this.friendService.updateDistanceAllFriends();
        }, 5000);
    };
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZnJpZW5kcy5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJmcmllbmRzLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsc0NBQWdGO0FBQ2hGLHdFQUFzRTtBQUN0RSxzREFBcUQ7QUFLckQsc0NBQXlDO0FBUXpDLElBQWEsZ0JBQWdCO0lBUTNCLDBCQUFvQixhQUE2QjtRQUE3QixrQkFBYSxHQUFiLGFBQWEsQ0FBZ0I7UUFQakQsYUFBUSxHQUFXLElBQUksZUFBTSxFQUFFLENBQUM7UUFROUIsSUFBSSxDQUFDLG1CQUFtQixFQUFFLENBQUM7SUFDN0IsQ0FBQztJQUVPLDhDQUFtQixHQUEzQjtRQUFBLGlCQUlDO1FBSEMsVUFBVSxDQUFDO1lBQ1QsS0FBSSxDQUFDLGFBQWEsQ0FBQyx3QkFBd0IsRUFBRSxDQUFDO1FBQ2hELENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQztJQUNYLENBQUM7SUFDTSx1Q0FBWSxHQUFuQixVQUFvQixNQUFjO1FBQ2hDLEVBQUUsQ0FBQyxDQUFDLE1BQU0sSUFBSSxJQUFJLElBQUksTUFBTSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUM7WUFDdEMsRUFBRSxDQUFDLENBQUMsTUFBTSxDQUFDLFlBQVksQ0FBQztnQkFDdEIsTUFBTSxDQUFDLGdCQUFnQixDQUFDO1lBQzFCLElBQUk7Z0JBQ0YsTUFBTSxDQUFDLGVBQWUsQ0FBQztRQUMzQixDQUFDO1FBQ0QsSUFBSTtZQUNGLE1BQU0sQ0FBQyxnQkFBZ0IsQ0FBQztJQUM1QixDQUFDO0lBQ00sNkNBQWtCLEdBQXpCLFVBQTBCLElBQXVCO1FBQy9DLElBQUksV0FBVyxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDO1FBQ3hDLElBQUksU0FBUyxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUMvQixJQUFJLFFBQVEsR0FBRyxTQUFTLENBQUMsV0FBVyxDQUFDLFdBQVcsQ0FBQyxDQUFDO1FBQ2xELElBQUks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QUMsYUFBYSxDQUFDLFNBQVMsQ0FBQyxVQUFBLENBQUM7WUFDMUMsS0FBSSxDQUFDLFNBQVMsR0FBRyxDQUFDLENBQUM7UUFDckIsQ0FBQyxDQUFDLENBQUM7SUFDTCxDQUFDO0lBQ0gsdUJBQUM7QUFBRCxDQUFDLEFBL0dELElBK0dDO0FBekd3QjtJQUF0QixnQkFBUyxDQUFDLFVBQVUsQ0FBQzs4QkFBVyxpQkFBVTtrREFBQztBQU5qQyxnQkFBZ0I7SUFMNUIsZ0JBQVMsQ0FBQztRQUNULFFBQVEsRUFBRSxTQUFTO1FBQ25CLFdBQVcsRUFBRSw4QkFBOEI7UUFDM0MsU0FBUyxFQUFFLENBQUMsb0NBQW9DLEVBQUUsNkJBQTZCLENBQUM7S0FDakYsQ0FBQztxQ0FTbUMsZ0NBQWM7R0FSdEMsZ0JBQWdCLENBK0c1QjtBQS9HWSw0Q0FBZ0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIElucHV0LCBPbkluaXQsIFZpZXdDaGlsZCwgRWxlbWVudFJlZiB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgRnJpZW5kc1NlcnZpY2UgfSBmcm9tICcuLi8uLi9zaGFyZWQvZnJpZW5kcy9mcmllbmRzLnNlcnZpY2UnO1xuaW1wb3J0IHsgRnJpZW5kIH0gZnJvbSAnLi4vLi4vc2hhcmVkL2ZyaWVuZHMvZnJpZW5kJztcbmltcG9ydCB7IExpc3RWaWV3IH0gZnJvbSAndWkvbGlzdC12aWV3JztcbmltcG9ydCB7IExpc3RWaWV3RXZlbnREYXRhLCBSYWRMaXN0VmlldyB9IGZyb20gJ05hdGl2ZXNjcmlwdC10ZWxlcmlrLXVpL2xpc3R2aWV3L2luZGV4JztcbmltcG9ydCB7IEV4dGVybmFsTWFwU2VydmljZSB9IGZyb20gJy4uLy4uL3NoYXJlZC9zZXJ2aWNlcy9tYXAvZXh0ZXJuYWwtbWFwLnNlcnZpY2UnO1xuaW1wb3J0IGxpc3RWaWV3TW9kdWxlID0gcmVxdWlyZShcInVpL2xpc3Qtdmlld1wiKTtcbmltcG9ydCBmcmFtZU1vZHVsZSA9IHJlcXVpcmUoXCJ1aS9mcmFtZVwiKTtcbmltcG9ydCBsYWJlbE1vZHVsZSA9IHJlcXVpcmUoXCJ1aS9sYWJlbFwiKTtcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiBcImZyaWVuZHNcIixcbiAgdGVtcGxhdGVVcmw6IFwid2lkZ2V0cy9mcmllbmRzL2ZyaWVuZHMuaHRtbFwiLFxuICBzdHlsZVVybHM6IFtcIndpZGdldHMvZnJpZW5kcy9mcmllbmRzLWNvbW1vbi5jc3NcIiwgXCJ3aWRnZXRzL2ZyaWVuZHMvZnJpZW5kcy5jc3NcIl1cbn0pXG5leHBvcnQgY2xhc3MgRnJpZW5kc0NvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XG4gIHNlbGVjdGVkOiBGcmllbmQgPSBuZXcgRnJpZW5kKCk7XG4gIHB1YmxpYyBteUZyaWVuZHM6IEFycmF5PEZyaWVuZD47XG4gIHByaXZhdGUgY291bnRlcjogbnVtYmVyO1xuICBwdWJsaWMgaW52aXRlRnJpZW5kOiBzdHJpbmc7XG4gIC8vIEBWaWV3Q2hpbGQoXCJsaXN0Vmlld1wiKSBsaXN0VmlldzogRWxlbWVudFJlZjtcbiAgQFZpZXdDaGlsZChcImxpc3RWaWV3XCIpIGxpc3RWaWV3OiBFbGVtZW50UmVmO1xuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgZnJpZW5kU2VydmljZTogRnJpZW5kc1NlcnZpY2UpIHtcbiAgICB0aGlzLnVwZGF0ZUZyaWVkRGlzdGFuY2UoKTtcbiAgfVxuXG4gIHByaXZhdGUgdXBkYXRlRnJpZWREaXN0YW5jZSgpIHtcbiAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgIHRoaXMuZnJpZW5kU2VydmljZS51cGRhdGVEaXN0YW5jZUFsbEZyaWVuZHMoKTtcbiAgICB9LCA1MDAwKTtcbiAgfVxuICBwdWJsaWMgZ2V0Q29sb3JJdGVtKGZyaWVuZDogRnJpZW5kKTogc3RyaW5nIHtcbiAgICBpZiAoZnJpZW5kICE9IG51bGwgJiYgZnJpZW5kLmFjdGl2YXRlKSB7XG4gICAgICBpZiAoZnJpZW5kLmRyYXdXYXl0VG9NZSlcbiAgICAgICAgcmV0dXJuIFwiZnJpZW5kLWZvbGxvdyBcIjtcbiAgICAgIGVsc2VcbiAgICAgICAgcmV0dXJuIFwiZnJpZW5kLWVuYWJsZVwiO1xuICAgIH1cbiAgICBlbHNlXG4gICAgICByZXR1cm4gXCJmcmllbmQtZGlzYWJsZVwiO1xuICB9XG4gIHB1YmxpYyBvblN3aXBlQ2VsbFN0YXJ0ZWQoYXJnczogTGlzdFZpZXdFdmVudERhdGEpIHtcbiAgICB2YXIgc3dpcGVMaW1pdHMgPSBhcmdzLmRhdGEuc3dpcGVMaW1pdHM7XG4gICAgdmFyIHN3aXBlVmlldyA9IGFyZ3NbJ29iamVjdCddO1xuICAgIHZhciBsZWZ0SXRlbSA9IHN3aXBlVmlldy5nZXRWaWV3QnlJZCgnbWFyay12aWV3Jyk7XG4gICAgdmFyIHJpZ2h0SXRlbSA9IHN3aXBlVmlldy5nZXRWaWV3QnlJZCgnY29uZmlnLXZpZXcnKTtcbiAgICBzd2lwZUxpbWl0cy5sZWZ0ID0gbGVmdEl0ZW0uZ2V0TWVhc3VyZWRXaWR0aCgpO1xuICAgIHN3aXBlTGltaXRzLnJpZ2h0ID0gcmlnaHRJdGVtLmdldE1lYXN1cmVkV2lkdGgoKTtcbiAgICBzd2lwZUxpbWl0cy50aHJlc2hvbGQgPSBsZWZ0SXRlbS5nZXRNZWFzdXJlZFdpZHRoKCkgLyAyO1xuICAgIHRoaXMuc3dpcGVMaW1pdHMgPSBzd2lwZUxpbWl0cztcbiAgfVxuICBwcml2YXRlIHN3aXBlTGltaXRzO1xuICBwdWJsaWMgb25Td2lwZUNlbGxGaW5pc2hlZChhcmdzOiBMaXN0Vmlld0V2ZW50RGF0YSkge1xuICAgIGlmIChhcmdzLmRhdGEueCA+IDIwMCkge1xuICAgICAgY29uc29sZS5sb2coXCJQZXJmb3JtIGxlZnQgYWN0aW9uXCIpO1xuICAgIH0gZWxzZSBpZiAoYXJncy5kYXRhLnggPCAtMjAwKSB7XG4gICAgICBjb25zb2xlLmxvZyhcIlBlcmZvcm0gcmlnaHQgYWN0aW9uXCIpO1xuICAgIH1cbiAgfVxuICBwdWJsaWMgb25DZWxsU3dpcGluZyhhcmdzOiBMaXN0Vmlld0V2ZW50RGF0YSkge1xuICAgIHZhciBzd2lwZUxpbWl0cyA9IGFyZ3MuZGF0YS5zd2lwZUxpbWl0cztcbiAgICB2YXIgY3VycmVudEl0ZW1WaWV3ID0gYXJncy5vYmplY3Q7XG4gICAgdmFyIGN1cnJlbnRWaWV3O1xuXG4gICAgaWYgKGFyZ3MuZGF0YS54ID4gMjAwKSB7XG4gICAgICBjb25zb2xlLmxvZyhcIk5vdGlmeSBwZXJmb3JtIGxlZnQgYWN0aW9uXCIpO1xuICAgIH0gZWxzZSBpZiAoYXJncy5kYXRhLnggPCAtMjAwKSB7XG4gICAgICBjb25zb2xlLmxvZyhcIk5vdGlmeSBwZXJmb3JtIHJpZ2h0IGFjdGlvblwiKTtcbiAgICB9XG4gIH1cblxuXG4gIHB1YmxpYyBvbkl0ZW1TZWxlY3RlZChhcmdzOiBMaXN0Vmlld0V2ZW50RGF0YSkge1xuICAgIHZhciBsaXN0VmlldyA9IDxSYWRMaXN0Vmlldz5mcmFtZU1vZHVsZS50b3Btb3N0KCkuY3VycmVudFBhZ2UuZ2V0Vmlld0J5SWQoXCJsaXN0Vmlld1wiKTtcbiAgICBsaXN0Vmlldy5ub3RpZnlTd2lwZVRvRXhlY3V0ZUZpbmlzaGVkKCk7XG4gICAgdmFyIGl0ZW1TZWxlY3RlZCA9IDxGcmllbmQ+dGhpcy5teUZyaWVuZHNbYXJncy5pdGVtSW5kZXhdO1xuICAgIGZvciAodmFyIGl0ZW0gb2YgdGhpcy5teUZyaWVuZHMpXG4gICAgICBpZiAoaXRlbS5pZCA9PSBpdGVtU2VsZWN0ZWQuaWQpXG4gICAgICAgIGl0ZW0uYWN0aXZhdGUgPSAhaXRlbS5hY3RpdmF0ZTtcblxuICAgIHRoaXMuZnJpZW5kU2VydmljZS51cGRhdGVGcmllbmQoaXRlbVNlbGVjdGVkKTtcbiAgICBsaXN0Vmlldy5yZWZyZXNoKCk7XG4gIH1cblxuICBwdWJsaWMgb25MZWZ0U3dpcGVDbGljayhhcmdzKSB7XG4gICAgY29uc29sZS5sb2coXCJMZWZ0IHN3aXBlIGNsaWNrXCIpO1xuICB9XG5cbiAgcHVibGljIHdheVRvTWUoYXJncykge1xuICAgIHZhciB1cGRhdGVGcmllbmQgPSA8RnJpZW5kPmFyZ3Mub2JqZWN0LmJpbmRpbmdDb250ZXh0O1xuICAgIHVwZGF0ZUZyaWVuZC5kcmF3V2F5dFRvTWUgPSB0cnVlO1xuICAgIHRoaXMuZnJpZW5kU2VydmljZS51cGRhdGVGcmllbmQodXBkYXRlRnJpZW5kKTtcbiAgfVxuICBwdWJsaWMgZGlzYWJsZVdheVRvTWUoYXJncykge1xuICAgIHZhciB1cGRhdGVGcmllbmQgPSA8RnJpZW5kPmFyZ3Mub2JqZWN0LmJpbmRpbmdDb250ZXh0O1xuICAgIHVwZGF0ZUZyaWVuZC5kcmF3V2F5dFRvTWUgPSBmYWxzZTtcbiAgICB0aGlzLmZyaWVuZFNlcnZpY2UudXBkYXRlRnJpZW5kKHVwZGF0ZUZyaWVuZCk7XG4gIH1cblxuICBwdWJsaWMgb25JdGVtVGFwKGFyZ3MpIHtcbiAgICBsZXQgbGlzdFZpZXc6IExpc3RWaWV3ID0gdGhpcy5saXN0Vmlldy5uYXRpdmVFbGVtZW50O1xuICAgIHZhciBpdGVtU2VsZWN0ZWQgPSA8RnJpZW5kPnRoaXMubXlGcmllbmRzW2FyZ3MuaW5kZXhdO1xuICAgIGZvciAodmFyIGl0ZW0gb2YgdGhpcy5teUZyaWVuZHMpXG4gICAgICBpZiAoaXRlbS5pZCA9PSBpdGVtU2VsZWN0ZWQuaWQpIHtcbiAgICAgICAgLy9UT0RPOiBTZSBkZWJlIGFncmVnYXIgdW4gYm90b24gZXNwZWNpYWwgcGFyYSBhY3RpdmFyIGVsIHNldWltaWVudG9cbiAgICAgICAgaXRlbS5hY3RpdmF0ZSA9ICFpdGVtLmFjdGl2YXRlO1xuICAgICAgfVxuXG4gICAgdGhpcy5mcmllbmRTZXJ2aWNlLnVwZGF0ZUZyaWVuZChpdGVtU2VsZWN0ZWQpO1xuICAgIGxpc3RWaWV3LnJlZnJlc2goKTtcbiAgfVxuICBsaXN0Vmlld0l0ZW1UYXAoYXJncykge1xuICAgIHZhciBpdGVtSW5kZXggPSBhcmdzLmluZGV4O1xuICB9XG5cblxuICBuZ09uSW5pdCgpIHtcbiAgICB0aGlzLm15RnJpZW5kcyA9IG5ldyBBcnJheTxGcmllbmQ+KCk7XG4gICAgdGhpcy5mcmllbmRTZXJ2aWNlLmdldEFsbEZyaWVuZHMoKS5zdWJzY3JpYmUoeCA9PiB7XG4gICAgICB0aGlzLm15RnJpZW5kcyA9IHg7XG4gICAgfSk7XG4gICAgdGhpcy5mcmllbmRTZXJ2aWNlLmZyaWVuZFVwZGF0ZSQuc3Vic2NyaWJlKHggPT4ge1xuICAgICAgdGhpcy5teUZyaWVuZHMgPSB4O1xuICAgIH0pO1xuICB9XG59Il19