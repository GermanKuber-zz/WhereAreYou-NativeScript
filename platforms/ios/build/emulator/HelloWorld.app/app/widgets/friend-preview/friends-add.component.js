"use strict";
var core_1 = require("@angular/core");
var friends_service_1 = require("../../shared/friends/friends.service");
var FriendsAddComponent = (function () {
    function FriendsAddComponent(friendService) {
        this.friendService = friendService;
        this.isLoading = false;
        this.previewAddFriend = true;
    }
    FriendsAddComponent.prototype.ngOnInit = function () {
    };
    //Public Methods
    FriendsAddComponent.prototype.addFriend = function () {
        this.isLoading = !this.isLoading;
        this.previewAddFriend = !this.previewAddFriend;
    };
    return FriendsAddComponent;
}());
FriendsAddComponent = __decorate([
    core_1.Component({
        selector: "friends-add",
        templateUrl: "widgets/friends-add/friends-add.html",
        styleUrls: ["widgets/friends-add/friends-add-common.css",
            "widgets/friends-add/friends-add.css"]
    }),
    __metadata("design:paramtypes", [friends_service_1.FriendsService])
], FriendsAddComponent);
exports.FriendsAddComponent = FriendsAddComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZnJpZW5kcy1hZGQuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiZnJpZW5kcy1hZGQuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxzQ0FBeUQ7QUFDekQsd0VBQXNFO0FBU3RFLElBQWEsbUJBQW1CO0lBSTlCLDZCQUFvQixhQUE2QjtRQUE3QixrQkFBYSxHQUFiLGFBQWEsQ0FBZ0I7UUFGMUMsY0FBUyxHQUFZLEtBQUssQ0FBQztRQUMzQixxQkFBZ0IsR0FBVyxJQUFJLENBQUM7SUFJdkMsQ0FBQztJQUNELHNDQUFRLEdBQVI7SUFDQSxDQUFDO0lBRUQsZ0JBQWdCO0lBQ1QsdUNBQVMsR0FBaEI7UUFDRSxJQUFJLENBQUMsU0FBUyxHQUFHLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQztRQUNqQyxJQUFJLENBQUMsZ0JBQWdCLEdBQUcsQ0FBQyxJQUFJLENBQUMsZ0JBQWdCLENBQUM7SUFDakQsQ0FBQztJQUNILDBCQUFDO0FBQUQsQ0FBQyxBQWhCRCxJQWdCQztBQWhCWSxtQkFBbUI7SUFOL0IsZ0JBQVMsQ0FBQztRQUNULFFBQVEsRUFBRSxhQUFhO1FBQ3ZCLFdBQVcsRUFBRSxzQ0FBc0M7UUFDbkQsU0FBUyxFQUFFLENBQUMsNENBQTRDO1lBQ3RELHFDQUFxQyxDQUFDO0tBQ3pDLENBQUM7cUNBS21DLGdDQUFjO0dBSnRDLG1CQUFtQixDQWdCL0I7QUFoQlksa0RBQW1CIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBJbnB1dCwgT25Jbml0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBGcmllbmRzU2VydmljZSB9IGZyb20gJy4uLy4uL3NoYXJlZC9mcmllbmRzL2ZyaWVuZHMuc2VydmljZSc7XG5pbXBvcnQgYWN0aXZpdHlJbmRpY2F0b3JNb2R1bGUgPSByZXF1aXJlKFwidWkvYWN0aXZpdHktaW5kaWNhdG9yXCIpO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6IFwiZnJpZW5kcy1hZGRcIixcbiAgdGVtcGxhdGVVcmw6IFwid2lkZ2V0cy9mcmllbmRzLWFkZC9mcmllbmRzLWFkZC5odG1sXCIsXG4gIHN0eWxlVXJsczogW1wid2lkZ2V0cy9mcmllbmRzLWFkZC9mcmllbmRzLWFkZC1jb21tb24uY3NzXCIsXG4gICAgXCJ3aWRnZXRzL2ZyaWVuZHMtYWRkL2ZyaWVuZHMtYWRkLmNzc1wiXVxufSlcbmV4cG9ydCBjbGFzcyBGcmllbmRzQWRkQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcbiAgcHVibGljIGVtYWlsOiBzdHJpbmc7XG4gIHB1YmxpYyBpc0xvYWRpbmc6IGJvb2xlYW4gPSBmYWxzZTtcbiAgcHVibGljIHByZXZpZXdBZGRGcmllbmQ6Ym9vbGVhbiA9IHRydWU7XG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgZnJpZW5kU2VydmljZTogRnJpZW5kc1NlcnZpY2VcbiAgKSB7XG5cbiAgfVxuICBuZ09uSW5pdCgpIHtcbiAgfVxuXG4gIC8vUHVibGljIE1ldGhvZHNcbiAgcHVibGljIGFkZEZyaWVuZCgpOiB2b2lkIHtcbiAgICB0aGlzLmlzTG9hZGluZyA9ICF0aGlzLmlzTG9hZGluZztcbiAgICB0aGlzLnByZXZpZXdBZGRGcmllbmQgPSAhdGhpcy5wcmV2aWV3QWRkRnJpZW5kO1xuICB9XG59Il19