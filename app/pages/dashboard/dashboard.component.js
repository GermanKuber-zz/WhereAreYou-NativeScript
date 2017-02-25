"use strict";
var core_1 = require("@angular/core");
var DashboardComponent = (function () {
    function DashboardComponent() {
        console.log("Constructor!!!");
    }
    DashboardComponent.prototype.ngOnInit = function () {
        var a = "";
    };
    DashboardComponent.prototype.buttonTap = function () {
        console.log("Mensaje");
    };
    return DashboardComponent;
}());
DashboardComponent = __decorate([
    core_1.Component({
        selector: "dashboard",
        templateUrl: "pages/dashboard/dashboard.html",
        styleUrls: ["pages/dashboard/dashboard-common.css", "pages/dashboard/dashboard.css"],
        providers: []
    }),
    __metadata("design:paramtypes", [])
], DashboardComponent);
exports.DashboardComponent = DashboardComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGFzaGJvYXJkLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImRhc2hib2FyZC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLHNDQUF5RTtBQWF6RSxJQUFhLGtCQUFrQjtJQU03QjtRQUNFLE9BQU8sQ0FBQyxHQUFHLENBQUMsZ0JBQWdCLENBQUMsQ0FBQztJQUVoQyxDQUFDO0lBUEQscUNBQVEsR0FBUjtRQUNFLElBQUksQ0FBQyxHQUFHLEVBQUUsQ0FBQztJQUNiLENBQUM7SUFNTSxzQ0FBUyxHQUFoQjtRQUNFLE9BQU8sQ0FBQyxHQUFHLENBQUMsU0FBUyxDQUFDLENBQUM7SUFDekIsQ0FBQztJQUNILHlCQUFDO0FBQUQsQ0FBQyxBQWJELElBYUM7QUFiWSxrQkFBa0I7SUFOOUIsZ0JBQVMsQ0FBQztRQUNULFFBQVEsRUFBRSxXQUFXO1FBQ3JCLFdBQVcsRUFBRSxnQ0FBZ0M7UUFDN0MsU0FBUyxFQUFFLENBQUMsc0NBQXNDLEVBQUUsK0JBQStCLENBQUM7UUFDcEYsU0FBUyxFQUFFLEVBQUU7S0FDZCxDQUFDOztHQUNXLGtCQUFrQixDQWE5QjtBQWJZLGdEQUFrQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgRWxlbWVudFJlZiwgT25Jbml0LCBWaWV3Q2hpbGQgfSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xuLy8gaW1wb3J0ICogYXMgU29jaWFsU2hhcmUgZnJvbSBcIm5hdGl2ZXNjcmlwdC1zb2NpYWwtc2hhcmVcIjtcbi8vIGltcG9ydCB7IEdyb2NlcnkgfSBmcm9tIFwiLi4vLi4vc2hhcmVkL2dyb2NlcnkvZ3JvY2VyeVwiO1xuLy8gaW1wb3J0IHsgR3JvY2VyeUxpc3RTZXJ2aWNlIH0gZnJvbSBcIi4uLy4uL3NoYXJlZC9ncm9jZXJ5L2dyb2NlcnktbGlzdC5zZXJ2aWNlXCI7XG5pbXBvcnQgeyBUZXh0RmllbGQgfSBmcm9tIFwidWkvdGV4dC1maWVsZFwiO1xuaW1wb3J0IGZyYW1lcyA9IHJlcXVpcmUoXCJ1aS9mcmFtZVwiKTtcbmltcG9ydCB0YWJWaWV3TW9kdWxlID0gcmVxdWlyZShcInVpL3RhYi12aWV3XCIpO1xuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiBcImRhc2hib2FyZFwiLFxuICB0ZW1wbGF0ZVVybDogXCJwYWdlcy9kYXNoYm9hcmQvZGFzaGJvYXJkLmh0bWxcIixcbiAgc3R5bGVVcmxzOiBbXCJwYWdlcy9kYXNoYm9hcmQvZGFzaGJvYXJkLWNvbW1vbi5jc3NcIiwgXCJwYWdlcy9kYXNoYm9hcmQvZGFzaGJvYXJkLmNzc1wiXSxcbiAgcHJvdmlkZXJzOiBbXVxufSlcbmV4cG9ydCBjbGFzcyBEYXNoYm9hcmRDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xuICBcbiAgbmdPbkluaXQoKTogdm9pZCB7XG4gICAgdmFyIGEgPSBcIlwiO1xuICB9XG5cbiAgY29uc3RydWN0b3IoKSB7XG4gICAgY29uc29sZS5sb2coXCJDb25zdHJ1Y3RvciEhIVwiKTtcblxuICB9XG4gIHB1YmxpYyBidXR0b25UYXAoKSB7XG4gICAgY29uc29sZS5sb2coXCJNZW5zYWplXCIpO1xuICB9XG59Il19