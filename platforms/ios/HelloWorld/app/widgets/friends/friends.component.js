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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZnJpZW5kcy5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJmcmllbmRzLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsc0NBQWdGO0FBQ2hGLHdFQUFzRTtBQUN0RSxzREFBcUQ7QUFXckQsSUFBYSxnQkFBZ0I7SUFNM0IsMEJBQW9CLGFBQTZCO1FBQTdCLGtCQUFhLEdBQWIsYUFBYSxDQUFnQjtRQUxqRCxhQUFRLEdBQVcsSUFBSSxlQUFNLEVBQUUsQ0FBQztJQVFoQyxDQUFDO0lBQ00sdUNBQVksR0FBbkIsVUFBb0IsTUFBYztRQUNoQyxFQUFFLENBQUMsQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDO1lBQ2xCLE1BQU0sQ0FBQyxlQUFlLENBQUM7UUFDekIsSUFBSTtZQUNGLE1BQU0sQ0FBQyxnQkFBZ0IsQ0FBQztJQUM1QixDQUFDO0lBRU0sb0NBQVMsR0FBaEIsVUFBaUIsSUFBSTtRQUNuQixJQUFJLFFBQVEsR0FBYSxJQUFJLENBQUMsUUFBUSxDQUFDLGFBQWEsQ0FBQztRQUNyRCxJQUFJLFlBQVksR0FBVyxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUN0RCxHQUFHLENBQUMsQ0FBYSxVQUFjLEVBQWQsS0FBQSxJQUFJLENBQUMsU0FBUyxFQUFkLGNBQWMsRUFBZCxJQUFjO1lBQTFCLElBQUksSUFBSSxTQUFBO1lBQ1gsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLEVBQUUsSUFBSSxZQUFZLENBQUMsRUFBRSxDQUFDO2dCQUM3QixJQUFJLENBQUMsUUFBUSxHQUFHLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQztTQUFBO1FBRW5DLElBQUksQ0FBQyxhQUFhLENBQUMsWUFBWSxDQUFDLFlBQVksQ0FBQyxDQUFDO1FBQzlDLFFBQVEsQ0FBQyxPQUFPLEVBQUUsQ0FBQztJQUNyQixDQUFDO0lBQ0QsMENBQWUsR0FBZixVQUFnQixJQUFJO1FBQ2xCLElBQUksU0FBUyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUM7SUFDN0IsQ0FBQztJQUdELG1DQUFRLEdBQVI7UUFBQSxpQkFjQztRQWJDLElBQUksQ0FBQyxTQUFTLEdBQUcsSUFBSSxLQUFLLEVBQVUsQ0FBQztRQUNyQyxJQUFJLENBQUMsYUFBYSxDQUFDLGFBQWEsRUFBRSxDQUFDLFNBQVMsQ0FBQyxVQUFBLENBQUM7WUFDNUMsS0FBSSxDQUFDLFNBQVMsR0FBRyxDQUFDLENBQUM7UUFDckIsQ0FBQyxDQUFDLENBQUM7UUFDSCxJQUFJLENBQUMsYUFBYSxDQUFDLGFBQWEsQ0FBQyxTQUFTLENBQUMsVUFBQSxDQUFDO1lBQzFDLElBQUksS0FBSyxHQUFHLENBQUMsQ0FBQztZQUNkLEdBQUcsQ0FBQyxDQUFhLFVBQWMsRUFBZCxLQUFBLEtBQUksQ0FBQyxTQUFTLEVBQWQsY0FBYyxFQUFkLElBQWM7Z0JBQTFCLElBQUksSUFBSSxTQUFBO2dCQUNYLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7b0JBQ3BCLEtBQUksQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDO2dCQUM1QixDQUFDO2dCQUNELEVBQUUsS0FBSyxDQUFDO2FBQ1Q7UUFDSCxDQUFDLENBQUMsQ0FBQztJQUNMLENBQUM7SUFDSCx1QkFBQztBQUFELENBQUMsQUEvQ0QsSUErQ0M7QUEzQ3dCO0lBQXRCLGdCQUFTLENBQUMsVUFBVSxDQUFDOzhCQUFXLGlCQUFVO2tEQUFDO0FBSmpDLGdCQUFnQjtJQUw1QixnQkFBUyxDQUFDO1FBQ1QsUUFBUSxFQUFFLFNBQVM7UUFDbkIsV0FBVyxFQUFFLDhCQUE4QjtRQUMzQyxTQUFTLEVBQUUsQ0FBQyxvQ0FBb0MsRUFBRSw2QkFBNkIsQ0FBQztLQUNqRixDQUFDO3FDQU9tQyxnQ0FBYztHQU50QyxnQkFBZ0IsQ0ErQzVCO0FBL0NZLDRDQUFnQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgSW5wdXQsIE9uSW5pdCwgVmlld0NoaWxkLCBFbGVtZW50UmVmIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBGcmllbmRzU2VydmljZSB9IGZyb20gJy4uLy4uL3NoYXJlZC9mcmllbmRzL2ZyaWVuZHMuc2VydmljZSc7XG5pbXBvcnQgeyBGcmllbmQgfSBmcm9tICcuLi8uLi9zaGFyZWQvZnJpZW5kcy9mcmllbmQnO1xuaW1wb3J0IHsgTGlzdFZpZXcgfSBmcm9tICd1aS9saXN0LXZpZXcnO1xuaW1wb3J0IGxpc3RWaWV3TW9kdWxlID0gcmVxdWlyZShcInVpL2xpc3Qtdmlld1wiKTtcblxuaW1wb3J0IGxhYmVsTW9kdWxlID0gcmVxdWlyZShcInVpL2xhYmVsXCIpO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6IFwiZnJpZW5kc1wiLFxuICB0ZW1wbGF0ZVVybDogXCJ3aWRnZXRzL2ZyaWVuZHMvZnJpZW5kcy5odG1sXCIsXG4gIHN0eWxlVXJsczogW1wid2lkZ2V0cy9mcmllbmRzL2ZyaWVuZHMtY29tbW9uLmNzc1wiLCBcIndpZGdldHMvZnJpZW5kcy9mcmllbmRzLmNzc1wiXVxufSlcbmV4cG9ydCBjbGFzcyBGcmllbmRzQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcbiAgc2VsZWN0ZWQ6IEZyaWVuZCA9IG5ldyBGcmllbmQoKTtcbiAgcHVibGljIG15RnJpZW5kczogQXJyYXk8RnJpZW5kPjtcbiAgcHJpdmF0ZSBjb3VudGVyOiBudW1iZXI7XG4gIEBWaWV3Q2hpbGQoXCJsaXN0Vmlld1wiKSBsaXN0VmlldzogRWxlbWVudFJlZjtcblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIGZyaWVuZFNlcnZpY2U6IEZyaWVuZHNTZXJ2aWNlKSB7XG5cblxuICB9XG4gIHB1YmxpYyBnZXRDb2xvckl0ZW0oZnJpZW5kOiBGcmllbmQpOiBzdHJpbmcge1xuICAgIGlmIChmcmllbmQuYWN0aXZhdGUpXG4gICAgICByZXR1cm4gXCJmcmllbmQtZW5hYmxlXCI7XG4gICAgZWxzZVxuICAgICAgcmV0dXJuIFwiZnJpZW5kLWRpc2FibGVcIjtcbiAgfVxuXG4gIHB1YmxpYyBvbkl0ZW1UYXAoYXJncykge1xuICAgIGxldCBsaXN0VmlldzogTGlzdFZpZXcgPSB0aGlzLmxpc3RWaWV3Lm5hdGl2ZUVsZW1lbnQ7XG4gICAgdmFyIGl0ZW1TZWxlY3RlZCA9IDxGcmllbmQ+dGhpcy5teUZyaWVuZHNbYXJncy5pbmRleF07XG4gICAgZm9yICh2YXIgaXRlbSBvZiB0aGlzLm15RnJpZW5kcylcbiAgICAgIGlmIChpdGVtLmlkID09IGl0ZW1TZWxlY3RlZC5pZClcbiAgICAgICAgaXRlbS5hY3RpdmF0ZSA9ICFpdGVtLmFjdGl2YXRlO1xuXG4gICAgdGhpcy5mcmllbmRTZXJ2aWNlLnVwZGF0ZUZyaWVuZChpdGVtU2VsZWN0ZWQpO1xuICAgIGxpc3RWaWV3LnJlZnJlc2goKTtcbiAgfVxuICBsaXN0Vmlld0l0ZW1UYXAoYXJncykge1xuICAgIHZhciBpdGVtSW5kZXggPSBhcmdzLmluZGV4O1xuICB9XG5cblxuICBuZ09uSW5pdCgpIHtcbiAgICB0aGlzLm15RnJpZW5kcyA9IG5ldyBBcnJheTxGcmllbmQ+KCk7XG4gICAgdGhpcy5mcmllbmRTZXJ2aWNlLmdldEFsbEZyaWVuZHMoKS5zdWJzY3JpYmUoeCA9PiB7XG4gICAgICB0aGlzLm15RnJpZW5kcyA9IHg7XG4gICAgfSk7XG4gICAgdGhpcy5mcmllbmRTZXJ2aWNlLmZyaWVuZFVwZGF0ZSQuc3Vic2NyaWJlKHggPT4ge1xuICAgICAgdmFyIGNvdW50ID0gMDtcbiAgICAgIGZvciAodmFyIGl0ZW0gb2YgdGhpcy5teUZyaWVuZHMpIHtcbiAgICAgICAgaWYgKGl0ZW0uaWQgPT0geC5pZCkge1xuICAgICAgICAgIHRoaXMubXlGcmllbmRzW2NvdW50XSA9IHg7XG4gICAgICAgIH1cbiAgICAgICAgKytjb3VudDtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxufSJdfQ==