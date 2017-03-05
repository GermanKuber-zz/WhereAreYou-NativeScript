"use strict";
var core_1 = require("@angular/core");
var friends_service_1 = require("../../shared/friends/friends.service");
var friend_1 = require("../../shared/friends/friend");
var config_service_1 = require("../../shared/services/map/config.service");
var frameModule = require("ui/frame");
var FriendsComponent = (function () {
    function FriendsComponent(friendService, configService) {
        this.friendService = friendService;
        this.configService = configService;
        this.selected = new friend_1.Friend();
        this.updateFriedDistance();
    }
    FriendsComponent.prototype.updateFriedDistance = function () {
        var _this = this;
        setTimeout(function () {
            if (_this.configService.calculateDistanceToFriends)
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
    __metadata("design:paramtypes", [friends_service_1.FriendsService,
        config_service_1.ConfigService])
], FriendsComponent);
exports.FriendsComponent = FriendsComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZnJpZW5kcy5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJmcmllbmRzLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsc0NBQWdGO0FBQ2hGLHdFQUFzRTtBQUN0RSxzREFBcUQ7QUFJckQsMkVBQXlFO0FBRXpFLHNDQUF5QztBQVF6QyxJQUFhLGdCQUFnQjtJQVEzQiwwQkFBb0IsYUFBNkIsRUFDdkMsYUFBNEI7UUFEbEIsa0JBQWEsR0FBYixhQUFhLENBQWdCO1FBQ3ZDLGtCQUFhLEdBQWIsYUFBYSxDQUFlO1FBUnRDLGFBQVEsR0FBVyxJQUFJLGVBQU0sRUFBRSxDQUFDO1FBUzlCLElBQUksQ0FBQyxtQkFBbUIsRUFBRSxDQUFDO0lBQzdCLENBQUM7SUFFTyw4Q0FBbUIsR0FBM0I7UUFBQSxpQkFLQztRQUpDLFVBQVUsQ0FBQztZQUNULEVBQUUsQ0FBQyxDQUFDLEtBQUksQ0FBQyxhQUFhLENBQUMsMEJBQTBCLENBQUM7Z0JBQ2hELEtBQUksQ0FBQyxhQUFhLENBQUMsd0JBQXdCLEVBQUUsQ0FBQztRQUNsRCxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUM7SUFDWCxDQUFDO0lBQ00sdUNBQVksR0FBbkIsVUFBb0IsTUFBYztRQUNoQyxFQUFFLENBQUMsQ0FBQyxNQUFNLElBQUksSUFBSSxJQUFJLE1BQU0sQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDO1lBQ3RDLEVBQUUsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxZQUFZLENBQUM7Z0JBQ3RCLE1BQU0sQ0FBQyxnQkFBZ0IsQ0FBQztZQUMxQixJQUFJO2dCQUNGLE1BQU0sQ0FBQyxlQUFlLENBQUM7UUFDM0IsQ0FBQztRQUNELElBQUk7WUFDRixNQUFNLENBQUMsZ0JBQWdCLENBQUM7SUFDNUIsQ0FBQztJQUNNLDZDQUFrQixHQUF6QixVQUEwQixJQUF1QjtRQUMvQyxJQUFJLFdBQVcsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQztRQUN4QyxJ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RSxDQUFDLFNBQVMsQ0FBQyxVQUFBLENBQUM7WUFDNUMsS0FBSSxDQUFDLFNBQVMsR0FBRyxDQUFDLENBQUM7UUFDckIsQ0FBQyxDQUFDLENBQUM7UUFDSCxJQUFJLENBQUMsYUFBYSxDQUFDLGFBQWEsQ0FBQyxTQUFTLENBQUMsVUFBQSxDQUFDO1lBQzFDLEtBQUksQ0FBQyxTQUFTLEdBQUcsQ0FBQyxDQUFDO1FBQ3JCLENBQUMsQ0FBQyxDQUFDO0lBQ0wsQ0FBQztJQUNILHVCQUFDO0FBQUQsQ0FBQyxBQWpIRCxJQWlIQztBQTNHd0I7SUFBdEIsZ0JBQVMsQ0FBQyxVQUFVLENBQUM7OEJBQVcsaUJBQVU7a0RBQUM7QUFOakMsZ0JBQWdCO0lBTDVCLGdCQUFTLENBQUM7UUFDVCxRQUFRLEVBQUUsU0FBUztRQUNuQixXQUFXLEVBQUUsOEJBQThCO1FBQzNDLFNBQVMsRUFBRSxDQUFDLG9DQUFvQyxFQUFFLDZCQUE2QixDQUFDO0tBQ2pGLENBQUM7cUNBU21DLGdDQUFjO1FBQ3hCLDhCQUFhO0dBVDNCLGdCQUFnQixDQWlINUI7QUFqSFksNENBQWdCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBJbnB1dCwgT25Jbml0LCBWaWV3Q2hpbGQsIEVsZW1lbnRSZWYgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEZyaWVuZHNTZXJ2aWNlIH0gZnJvbSAnLi4vLi4vc2hhcmVkL2ZyaWVuZHMvZnJpZW5kcy5zZXJ2aWNlJztcbmltcG9ydCB7IEZyaWVuZCB9IGZyb20gJy4uLy4uL3NoYXJlZC9mcmllbmRzL2ZyaWVuZCc7XG5pbXBvcnQgeyBMaXN0VmlldyB9IGZyb20gJ3VpL2xpc3Qtdmlldyc7XG5pbXBvcnQgeyBMaXN0Vmlld0V2ZW50RGF0YSwgUmFkTGlzdFZpZXcgfSBmcm9tICdOYXRpdmVzY3JpcHQtdGVsZXJpay11aS9saXN0dmlldy9pbmRleCc7XG5pbXBvcnQgeyBFeHRlcm5hbE1hcFNlcnZpY2UgfSBmcm9tICcuLi8uLi9zaGFyZWQvc2VydmljZXMvbWFwL2V4dGVybmFsLW1hcC5zZXJ2aWNlJztcbmltcG9ydCB7IENvbmZpZ1NlcnZpY2UgfSBmcm9tICcuLi8uLi9zaGFyZWQvc2VydmljZXMvbWFwL2NvbmZpZy5zZXJ2aWNlJztcbmltcG9ydCBsaXN0Vmlld01vZHVsZSA9IHJlcXVpcmUoXCJ1aS9saXN0LXZpZXdcIik7XG5pbXBvcnQgZnJhbWVNb2R1bGUgPSByZXF1aXJlKFwidWkvZnJhbWVcIik7XG5pbXBvcnQgbGFiZWxNb2R1bGUgPSByZXF1aXJlKFwidWkvbGFiZWxcIik7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogXCJmcmllbmRzXCIsXG4gIHRlbXBsYXRlVXJsOiBcIndpZGdldHMvZnJpZW5kcy9mcmllbmRzLmh0bWxcIixcbiAgc3R5bGVVcmxzOiBbXCJ3aWRnZXRzL2ZyaWVuZHMvZnJpZW5kcy1jb21tb24uY3NzXCIsIFwid2lkZ2V0cy9mcmllbmRzL2ZyaWVuZHMuY3NzXCJdXG59KVxuZXhwb3J0IGNsYXNzIEZyaWVuZHNDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xuICBzZWxlY3RlZDogRnJpZW5kID0gbmV3IEZyaWVuZCgpO1xuICBwdWJsaWMgbXlGcmllbmRzOiBBcnJheTxGcmllbmQ+O1xuICBwcml2YXRlIGNvdW50ZXI6IG51bWJlcjtcbiAgcHVibGljIGludml0ZUZyaWVuZDogc3RyaW5nO1xuICAvLyBAVmlld0NoaWxkKFwibGlzdFZpZXdcIikgbGlzdFZpZXc6IEVsZW1lbnRSZWY7XG4gIEBWaWV3Q2hpbGQoXCJsaXN0Vmlld1wiKSBsaXN0VmlldzogRWxlbWVudFJlZjtcblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIGZyaWVuZFNlcnZpY2U6IEZyaWVuZHNTZXJ2aWNlLFxuICAgIHByaXZhdGUgY29uZmlnU2VydmljZTogQ29uZmlnU2VydmljZSkge1xuICAgIHRoaXMudXBkYXRlRnJpZWREaXN0YW5jZSgpO1xuICB9XG5cbiAgcHJpdmF0ZSB1cGRhdGVGcmllZERpc3RhbmNlKCkge1xuICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgaWYgKHRoaXMuY29uZmlnU2VydmljZS5jYWxjdWxhdGVEaXN0YW5jZVRvRnJpZW5kcylcbiAgICAgICAgdGhpcy5mcmllbmRTZXJ2aWNlLnVwZGF0ZURpc3RhbmNlQWxsRnJpZW5kcygpO1xuICAgIH0sIDUwMDApO1xuICB9XG4gIHB1YmxpYyBnZXRDb2xvckl0ZW0oZnJpZW5kOiBGcmllbmQpOiBzdHJpbmcge1xuICAgIGlmIChmcmllbmQgIT0gbnVsbCAmJiBmcmllbmQuYWN0aXZhdGUpIHtcbiAgICAgIGlmIChmcmllbmQuZHJhd1dheXRUb01lKVxuICAgICAgICByZXR1cm4gXCJmcmllbmQtZm9sbG93IFwiO1xuICAgICAgZWxzZVxuICAgICAgICByZXR1cm4gXCJmcmllbmQtZW5hYmxlXCI7XG4gICAgfVxuICAgIGVsc2VcbiAgICAgIHJldHVybiBcImZyaWVuZC1kaXNhYmxlXCI7XG4gIH1cbiAgcHVibGljIG9uU3dpcGVDZWxsU3RhcnRlZChhcmdzOiBMaXN0Vmlld0V2ZW50RGF0YSkge1xuICAgIHZhciBzd2lwZUxpbWl0cyA9IGFyZ3MuZGF0YS5zd2lwZUxpbWl0cztcbiAgICB2YXIgc3dpcGVWaWV3ID0gYXJnc1snb2JqZWN0J107XG4gICAgdmFyIGxlZnRJdGVtID0gc3dpcGVWaWV3LmdldFZpZXdCeUlkKCdtYXJrLXZpZXcnKTtcbiAgICB2YXIgcmlnaHRJdGVtID0gc3dpcGVWaWV3LmdldFZpZXdCeUlkKCdjb25maWctdmlldycpO1xuICAgIHN3aXBlTGltaXRzLmxlZnQgPSBsZWZ0SXRlbS5nZXRNZWFzdXJlZFdpZHRoKCk7XG4gICAgc3dpcGVMaW1pdHMucmlnaHQgPSByaWdodEl0ZW0uZ2V0TWVhc3VyZWRXaWR0aCgpO1xuICAgIHN3aXBlTGltaXRzLnRocmVzaG9sZCA9IGxlZnRJdGVtLmdldE1lYXN1cmVkV2lkdGgoKSAvIDI7XG4gICAgdGhpcy5zd2lwZUxpbWl0cyA9IHN3aXBlTGltaXRzO1xuICB9XG4gIHByaXZhdGUgc3dpcGVMaW1pdHM7XG4gIHB1YmxpYyBvblN3aXBlQ2VsbEZpbmlzaGVkKGFyZ3M6IExpc3RWaWV3RXZlbnREYXRhKSB7XG4gICAgaWYgKGFyZ3MuZGF0YS54ID4gMjAwKSB7XG4gICAgICBjb25zb2xlLmxvZyhcIlBlcmZvcm0gbGVmdCBhY3Rpb25cIik7XG4gICAgfSBlbHNlIGlmIChhcmdzLmRhdGEueCA8IC0yMDApIHtcbiAgICAgIGNvbnNvbGUubG9nKFwiUGVyZm9ybSByaWdodCBhY3Rpb25cIik7XG4gICAgfVxuICB9XG4gIHB1YmxpYyBvbkNlbGxTd2lwaW5nKGFyZ3M6IExpc3RWaWV3RXZlbnREYXRhKSB7XG4gICAgdmFyIHN3aXBlTGltaXRzID0gYXJncy5kYXRhLnN3aXBlTGltaXRzO1xuICAgIHZhciBjdXJyZW50SXRlbVZpZXcgPSBhcmdzLm9iamVjdDtcbiAgICB2YXIgY3VycmVudFZpZXc7XG5cbiAgICBpZiAoYXJncy5kYXRhLnggPiAyMDApIHtcbiAgICAgIGNvbnNvbGUubG9nKFwiTm90aWZ5IHBlcmZvcm0gbGVmdCBhY3Rpb25cIik7XG4gICAgfSBlbHNlIGlmIChhcmdzLmRhdGEueCA8IC0yMDApIHtcbiAgICAgIGNvbnNvbGUubG9nKFwiTm90aWZ5IHBlcmZvcm0gcmlnaHQgYWN0aW9uXCIpO1xuICAgIH1cbiAgfVxuXG5cbiAgcHVibGljIG9uSXRlbVNlbGVjdGVkKGFyZ3M6IExpc3RWaWV3RXZlbnREYXRhKSB7XG4gICAgdmFyIGxpc3RWaWV3ID0gPFJhZExpc3RWaWV3PmZyYW1lTW9kdWxlLnRvcG1vc3QoKS5jdXJyZW50UGFnZS5nZXRWaWV3QnlJZChcImxpc3RWaWV3XCIpO1xuICAgIGxpc3RWaWV3Lm5vdGlmeVN3aXBlVG9FeGVjdXRlRmluaXNoZWQoKTtcbiAgICB2YXIgaXRlbVNlbGVjdGVkID0gPEZyaWVuZD50aGlzLm15RnJpZW5kc1thcmdzLml0ZW1JbmRleF07XG4gICAgZm9yICh2YXIgaXRlbSBvZiB0aGlzLm15RnJpZW5kcylcbiAgICAgIGlmIChpdGVtLmlkID09IGl0ZW1TZWxlY3RlZC5pZClcbiAgICAgICAgaXRlbS5hY3RpdmF0ZSA9ICFpdGVtLmFjdGl2YXRlO1xuXG4gICAgdGhpcy5mcmllbmRTZXJ2aWNlLnVwZGF0ZUZyaWVuZChpdGVtU2VsZWN0ZWQpO1xuICAgIGxpc3RWaWV3LnJlZnJlc2goKTtcbiAgfVxuXG4gIHB1YmxpYyBvbkxlZnRTd2lwZUNsaWNrKGFyZ3MpIHtcbiAgICBjb25zb2xlLmxvZyhcIkxlZnQgc3dpcGUgY2xpY2tcIik7XG4gIH1cblxuICBwdWJsaWMgd2F5VG9NZShhcmdzKSB7XG4gICAgdmFyIHVwZGF0ZUZyaWVuZCA9IDxGcmllbmQ+YXJncy5vYmplY3QuYmluZGluZ0NvbnRleHQ7XG4gICAgdXBkYXRlRnJpZW5kLmRyYXdXYXl0VG9NZSA9IHRydWU7XG4gICAgdGhpcy5mcmllbmRTZXJ2aWNlLnVwZGF0ZUZyaWVuZCh1cGRhdGVGcmllbmQpO1xuICB9XG4gIHB1YmxpYyBkaXNhYmxlV2F5VG9NZShhcmdzKSB7XG4gICAgdmFyIHVwZGF0ZUZyaWVuZCA9IDxGcmllbmQ+YXJncy5vYmplY3QuYmluZGluZ0NvbnRleHQ7XG4gICAgdXBkYXRlRnJpZW5kLmRyYXdXYXl0VG9NZSA9IGZhbHNlO1xuICAgIHRoaXMuZnJpZW5kU2VydmljZS51cGRhdGVGcmllbmQodXBkYXRlRnJpZW5kKTtcbiAgfVxuXG4gIHB1YmxpYyBvbkl0ZW1UYXAoYXJncykge1xuICAgIGxldCBsaXN0VmlldzogTGlzdFZpZXcgPSB0aGlzLmxpc3RWaWV3Lm5hdGl2ZUVsZW1lbnQ7XG4gICAgdmFyIGl0ZW1TZWxlY3RlZCA9IDxGcmllbmQ+dGhpcy5teUZyaWVuZHNbYXJncy5pbmRleF07XG4gICAgZm9yICh2YXIgaXRlbSBvZiB0aGlzLm15RnJpZW5kcylcbiAgICAgIGlmIChpdGVtLmlkID09IGl0ZW1TZWxlY3RlZC5pZCkge1xuICAgICAgICAvL1RPRE86IFNlIGRlYmUgYWdyZWdhciB1biBib3RvbiBlc3BlY2lhbCBwYXJhIGFjdGl2YXIgZWwgc2V1aW1pZW50b1xuICAgICAgICBpdGVtLmFjdGl2YXRlID0gIWl0ZW0uYWN0aXZhdGU7XG4gICAgICB9XG5cbiAgICB0aGlzLmZyaWVuZFNlcnZpY2UudXBkYXRlRnJpZW5kKGl0ZW1TZWxlY3RlZCk7XG4gICAgbGlzdFZpZXcucmVmcmVzaCgpO1xuICB9XG4gIGxpc3RWaWV3SXRlbVRhcChhcmdzKSB7XG4gICAgdmFyIGl0ZW1JbmRleCA9IGFyZ3MuaW5kZXg7XG4gIH1cblxuXG4gIG5nT25Jbml0KCkge1xuICAgIHRoaXMubXlGcmllbmRzID0gbmV3IEFycmF5PEZyaWVuZD4oKTtcbiAgICB0aGlzLmZyaWVuZFNlcnZpY2UuZ2V0QWxsRnJpZW5kcygpLnN1YnNjcmliZSh4ID0+IHtcbiAgICAgIHRoaXMubXlGcmllbmRzID0geDtcbiAgICB9KTtcbiAgICB0aGlzLmZyaWVuZFNlcnZpY2UuZnJpZW5kVXBkYXRlJC5zdWJzY3JpYmUoeCA9PiB7XG4gICAgICB0aGlzLm15RnJpZW5kcyA9IHg7XG4gICAgfSk7XG4gIH1cbn0iXX0=