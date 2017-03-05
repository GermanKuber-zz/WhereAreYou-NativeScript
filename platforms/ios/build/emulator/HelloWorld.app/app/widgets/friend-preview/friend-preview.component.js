"use strict";
var core_1 = require("@angular/core");
var friends_service_1 = require("../../shared/friends/friends.service");
var friend_1 = require("../../shared/friends/friend");
var FriendPreviewComponent = (function () {
    function FriendPreviewComponent(friendService) {
        this.friendService = friendService;
    }
    FriendPreviewComponent.prototype.ngOnInit = function () {
    };
    //Public Methods
    FriendPreviewComponent.prototype.addFriend = function () {
    };
    return FriendPreviewComponent;
}());
__decorate([
    core_1.Input(),
    __metadata("design:type", friend_1.Friend)
], FriendPreviewComponent.prototype, "friend", void 0);
FriendPreviewComponent = __decorate([
    core_1.Component({
        selector: "friend-preview",
        templateUrl: "widgets/friend-preview/friend-preview.html",
        styleUrls: ["widgets/friend-preview/friend-preview-common.css",
            "widgets/friend-preview/friend-preview.css"]
    }),
    __metadata("design:paramtypes", [friends_service_1.FriendsService])
], FriendPreviewComponent);
exports.FriendPreviewComponent = FriendPreviewComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZnJpZW5kLXByZXZpZXcuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiZnJpZW5kLXByZXZpZXcuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxzQ0FBK0U7QUFDL0Usd0VBQXNFO0FBQ3RFLHNEQUFxRDtBQVNyRCxJQUFhLHNCQUFzQjtJQUtqQyxnQ0FBb0IsYUFBNkI7UUFBN0Isa0JBQWEsR0FBYixhQUFhLENBQWdCO0lBRWpELENBQUM7SUFDRCx5Q0FBUSxHQUFSO0lBRUEsQ0FBQztJQUVELGdCQUFnQjtJQUNULDBDQUFTLEdBQWhCO0lBRUEsQ0FBQztJQUNILDZCQUFDO0FBQUQsQ0FBQyxBQWhCRCxJQWdCQztBQWRVO0lBQVIsWUFBSyxFQUFFOzhCQUFTLGVBQU07c0RBQUM7QUFGYixzQkFBc0I7SUFObEMsZ0JBQVMsQ0FBQztRQUNULFFBQVEsRUFBRSxnQkFBZ0I7UUFDMUIsV0FBVyxFQUFFLDRDQUE0QztRQUN6RCxTQUFTLEVBQUUsQ0FBQyxrREFBa0Q7WUFDNUQsMkNBQTJDLENBQUM7S0FDL0MsQ0FBQztxQ0FNbUMsZ0NBQWM7R0FMdEMsc0JBQXNCLENBZ0JsQztBQWhCWSx3REFBc0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIElucHV0LCBPbkluaXQsIE91dHB1dCwgRXZlbnRFbWl0dGVyIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBGcmllbmRzU2VydmljZSB9IGZyb20gJy4uLy4uL3NoYXJlZC9mcmllbmRzL2ZyaWVuZHMuc2VydmljZSc7XG5pbXBvcnQgeyBGcmllbmQgfSBmcm9tICcuLi8uLi9zaGFyZWQvZnJpZW5kcy9mcmllbmQnO1xuaW1wb3J0IGFjdGl2aXR5SW5kaWNhdG9yTW9kdWxlID0gcmVxdWlyZShcInVpL2FjdGl2aXR5LWluZGljYXRvclwiKTtcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiBcImZyaWVuZC1wcmV2aWV3XCIsXG4gIHRlbXBsYXRlVXJsOiBcIndpZGdldHMvZnJpZW5kLXByZXZpZXcvZnJpZW5kLXByZXZpZXcuaHRtbFwiLFxuICBzdHlsZVVybHM6IFtcIndpZGdldHMvZnJpZW5kLXByZXZpZXcvZnJpZW5kLXByZXZpZXctY29tbW9uLmNzc1wiLFxuICAgIFwid2lkZ2V0cy9mcmllbmQtcHJldmlldy9mcmllbmQtcHJldmlldy5jc3NcIl1cbn0pXG5leHBvcnQgY2xhc3MgRnJpZW5kUHJldmlld0NvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XG5cbiAgQElucHV0KCkgZnJpZW5kOiBGcmllbmQ7XG5cblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIGZyaWVuZFNlcnZpY2U6IEZyaWVuZHNTZXJ2aWNlKSB7XG5cbiAgfVxuICBuZ09uSW5pdCgpIHtcbiAgIFxuICB9XG5cbiAgLy9QdWJsaWMgTWV0aG9kc1xuICBwdWJsaWMgYWRkRnJpZW5kKCk6IHZvaWQge1xuXG4gIH1cbn0iXX0=