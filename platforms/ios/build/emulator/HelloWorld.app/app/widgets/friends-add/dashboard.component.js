"use strict";
var core_1 = require("@angular/core");
var SocialShare = require("nativescript-social-share");
var grocery_list_service_1 = require("../../shared/grocery/grocery-list.service");
var DataItem = (function () {
    function DataItem(itemDesc) {
        this.itemDesc = itemDesc;
    }
    return DataItem;
}());
exports.DataItem = DataItem;
var DashboardComponent = (function () {
    function DashboardComponent() {
        this.groceryList = [];
        this.grocery = "";
        this.isLoading = false;
        this.listLoaded = false;
        this.items = new Array();
        for (var i = 0; i < 5; i++) {
            this.items.push(new DataItem("item " + i));
        }
    }
    DashboardComponent.prototype.ngOnInit = function () {
        this.isLoading = true;
        // this.groceryListService.load()
        // .subscribe(loadedGroceries => {
        //   loadedGroceries.forEach((groceryObject) => {
        //     this.groceryList.unshift(groceryObject);
        //   });
        //   this.isLoading = false;
        //   this.listLoaded = true;
        // });
    };
    DashboardComponent.prototype.share = function () {
        var list = [];
        for (var i = 0, size = this.groceryList.length; i < size; i++) {
            list.push(this.groceryList[i].name);
        }
        var listString = list.join(", ").trim();
        SocialShare.shareText(listString);
    };
    DashboardComponent.prototype.add = function () {
        if (this.grocery.trim() === "") {
            alert("Enter a grocery item");
            return;
        }
        // Dismiss the keyboard
        var textField = this.groceryTextField.nativeElement;
        textField.dismissSoftInput();
        // this.groceryListService.add(this.grocery)
        //   .subscribe(
        //   groceryObject => {
        //     this.groceryList.unshift(groceryObject);
        //     this.grocery = "";
        //   },
        //   () => {
        //     alert({
        //       message: "An error occurred while adding an item to your list.",
        //       okButtonText: "OK"
        //     });
        //     this.grocery = "";
        //   }
        //   )
    };
    return DashboardComponent;
}());
__decorate([
    core_1.ViewChild("groceryTextField"),
    __metadata("design:type", core_1.ElementRef)
], DashboardComponent.prototype, "groceryTextField", void 0);
DashboardComponent = __decorate([
    core_1.Component({
        selector: "dashboard",
        templateUrl: "pages/dashboard/dashboard.html",
        styleUrls: ["pages/dashboard/dashboard-common.css", "pages/dashboard/dashboard.css"],
        providers: [grocery_list_service_1.GroceryListService]
    }),
    __metadata("design:paramtypes", [])
], DashboardComponent);
exports.DashboardComponent = DashboardComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGFzaGJvYXJkLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImRhc2hib2FyZC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLHNDQUF5RTtBQUN6RSx1REFBeUQ7QUFFekQsa0ZBQStFO0FBRy9FO0lBQ0ksa0JBQW1CLFFBQWdCO1FBQWhCLGFBQVEsR0FBUixRQUFRLENBQVE7SUFBRyxDQUFDO0lBQzNDLGVBQUM7QUFBRCxDQUFDLEFBRkQsSUFFQztBQUZZLDRCQUFRO0FBWXJCLElBQWEsa0JBQWtCO0lBTzNCO1FBTkYsZ0JBQVcsR0FBbUIsRUFBRSxDQUFDO1FBQ2pDLFlBQU8sR0FBRyxFQUFFLENBQUM7UUF1QmIsY0FBUyxHQUFHLEtBQUssQ0FBQztRQUNsQixlQUFVLEdBQUcsS0FBSyxDQUFDO1FBbEJiLElBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSxLQUFLLEVBQVksQ0FBQztRQUNuQyxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEVBQUUsRUFBRSxDQUFDO1lBQ3pCLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLElBQUksUUFBUSxDQUFDLE9BQU8sR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQy9DLENBQUM7SUFDTCxDQUFDO0lBQ0gscUNBQVEsR0FBUjtRQUNFLElBQUksQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDO1FBQ3RCLGlDQUFpQztRQUMvQixrQ0FBa0M7UUFDbEMsaURBQWlEO1FBQ2pELCtDQUErQztRQUMvQyxRQUFRO1FBQ1IsNEJBQTRCO1FBQzVCLDRCQUE0QjtRQUM1QixNQUFNO0lBQ1YsQ0FBQztJQUlELGtDQUFLLEdBQUw7UUFDRSxJQUFJLElBQUksR0FBRyxFQUFFLENBQUM7UUFDZCxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsSUFBSSxHQUFHLElBQUksQ0FBQyxXQUFXLENBQUMsTUFBTSxFQUFFLENBQUMsR0FBRyxJQUFJLEVBQUUsQ0FBQyxFQUFFLEVBQUUsQ0FBQztZQUM5RCxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDdEMsQ0FBQztRQUVELElBQUksVUFBVSxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsSUFBSSxFQUFFLENBQUM7UUFDeEMsV0FBVyxDQUFDLFNBQVMsQ0FBQyxVQUFVLENBQUMsQ0FBQztJQUNwQyxDQUFDO0lBQ0QsZ0NBQUcsR0FBSDtRQUNFLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxFQUFFLEtBQUssRUFBRSxDQUFDLENBQUMsQ0FBQztZQUMvQixLQUFLLENBQUMsc0JBQXNCLENBQUMsQ0FBQztZQUM5QixNQUFNLENBQUM7UUFDVCxDQUFDO1FBRUQsdUJBQXVCO1FBQ3ZCLElBQUksU0FBUyxHQUFjLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxhQUFhLENBQUM7UUFDL0QsU0FBUyxDQUFDLGdCQUFnQixFQUFFLENBQUM7UUFFN0IsNENBQTRDO1FBQzVDLGdCQUFnQjtRQUNoQix1QkFBdUI7UUFDdkIsK0NBQStDO1FBQy9DLHlCQUF5QjtRQUN6QixPQUFPO1FBQ1AsWUFBWTtRQUNaLGNBQWM7UUFDZCx5RUFBeUU7UUFDekUsMkJBQTJCO1FBQzNCLFVBQVU7UUFDVix5QkFBeUI7UUFDekIsTUFBTTtRQUNOLE1BQU07SUFDUixDQUFDO0lBQ0gseUJBQUM7QUFBRCxDQUFDLEFBN0RELElBNkRDO0FBMURnQztJQUE5QixnQkFBUyxDQUFDLGtCQUFrQixDQUFDOzhCQUFtQixpQkFBVTs0REFBQztBQUhqRCxrQkFBa0I7SUFOOUIsZ0JBQVMsQ0FBQztRQUNULFFBQVEsRUFBRSxXQUFXO1FBQ3JCLFdBQVcsRUFBRSxnQ0FBZ0M7UUFDN0MsU0FBUyxFQUFFLENBQUMsc0NBQXNDLEVBQUUsK0JBQStCLENBQUM7UUFDcEYsU0FBUyxFQUFFLENBQUMseUNBQWtCLENBQUM7S0FDaEMsQ0FBQzs7R0FDVyxrQkFBa0IsQ0E2RDlCO0FBN0RZLGdEQUFrQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgRWxlbWVudFJlZiwgT25Jbml0LCBWaWV3Q2hpbGQgfSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xuaW1wb3J0ICogYXMgU29jaWFsU2hhcmUgZnJvbSBcIm5hdGl2ZXNjcmlwdC1zb2NpYWwtc2hhcmVcIjtcbmltcG9ydCB7IEdyb2NlcnkgfSBmcm9tIFwiLi4vLi4vc2hhcmVkL2dyb2NlcnkvZ3JvY2VyeVwiO1xuaW1wb3J0IHsgR3JvY2VyeUxpc3RTZXJ2aWNlIH0gZnJvbSBcIi4uLy4uL3NoYXJlZC9ncm9jZXJ5L2dyb2NlcnktbGlzdC5zZXJ2aWNlXCI7XG5pbXBvcnQgeyBUZXh0RmllbGQgfSBmcm9tIFwidWkvdGV4dC1maWVsZFwiO1xuXG5leHBvcnQgY2xhc3MgRGF0YUl0ZW0ge1xuICAgIGNvbnN0cnVjdG9yKHB1YmxpYyBpdGVtRGVzYzogc3RyaW5nKSB7fVxufVxuXG5cblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiBcImRhc2hib2FyZFwiLFxuICB0ZW1wbGF0ZVVybDogXCJwYWdlcy9kYXNoYm9hcmQvZGFzaGJvYXJkLmh0bWxcIixcbiAgc3R5bGVVcmxzOiBbXCJwYWdlcy9kYXNoYm9hcmQvZGFzaGJvYXJkLWNvbW1vbi5jc3NcIiwgXCJwYWdlcy9kYXNoYm9hcmQvZGFzaGJvYXJkLmNzc1wiXSxcbiAgcHJvdmlkZXJzOiBbR3JvY2VyeUxpc3RTZXJ2aWNlXVxufSlcbmV4cG9ydCBjbGFzcyBEYXNoYm9hcmRDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xuICBncm9jZXJ5TGlzdDogQXJyYXk8R3JvY2VyeT4gPSBbXTtcbiAgZ3JvY2VyeSA9IFwiXCI7XG4gIEBWaWV3Q2hpbGQoXCJncm9jZXJ5VGV4dEZpZWxkXCIpIGdyb2NlcnlUZXh0RmllbGQ6IEVsZW1lbnRSZWY7XG4gIC8vIGNvbnN0cnVjdG9yKHByaXZhdGUgZ3JvY2VyeUxpc3RTZXJ2aWNlOiBHcm9jZXJ5TGlzdFNlcnZpY2UpIHsgfVxuIHB1YmxpYyBpdGVtczogQXJyYXk8RGF0YUl0ZW0+O1xuXG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHRoaXMuaXRlbXMgPSBuZXcgQXJyYXk8RGF0YUl0ZW0+KCk7XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgNTsgaSsrKSB7XG4gICAgICAgICAgICB0aGlzLml0ZW1zLnB1c2gobmV3IERhdGFJdGVtKFwiaXRlbSBcIiArIGkpKTtcbiAgICAgICAgfVxuICAgIH1cbiAgbmdPbkluaXQoKSB7XG4gICAgdGhpcy5pc0xvYWRpbmcgPSB0cnVlO1xuICAgIC8vIHRoaXMuZ3JvY2VyeUxpc3RTZXJ2aWNlLmxvYWQoKVxuICAgICAgLy8gLnN1YnNjcmliZShsb2FkZWRHcm9jZXJpZXMgPT4ge1xuICAgICAgLy8gICBsb2FkZWRHcm9jZXJpZXMuZm9yRWFjaCgoZ3JvY2VyeU9iamVjdCkgPT4ge1xuICAgICAgLy8gICAgIHRoaXMuZ3JvY2VyeUxpc3QudW5zaGlmdChncm9jZXJ5T2JqZWN0KTtcbiAgICAgIC8vICAgfSk7XG4gICAgICAvLyAgIHRoaXMuaXNMb2FkaW5nID0gZmFsc2U7XG4gICAgICAvLyAgIHRoaXMubGlzdExvYWRlZCA9IHRydWU7XG4gICAgICAvLyB9KTtcbiAgfVxuXG4gIGlzTG9hZGluZyA9IGZhbHNlO1xuICBsaXN0TG9hZGVkID0gZmFsc2U7XG4gIHNoYXJlKCkge1xuICAgIGxldCBsaXN0ID0gW107XG4gICAgZm9yIChsZXQgaSA9IDAsIHNpemUgPSB0aGlzLmdyb2NlcnlMaXN0Lmxlbmd0aDsgaSA8IHNpemU7IGkrKykge1xuICAgICAgbGlzdC5wdXNoKHRoaXMuZ3JvY2VyeUxpc3RbaV0ubmFtZSk7XG4gICAgfVxuICAgIFxuICAgIGxldCBsaXN0U3RyaW5nID0gbGlzdC5qb2luKFwiLCBcIikudHJpbSgpO1xuICAgIFNvY2lhbFNoYXJlLnNoYXJlVGV4dChsaXN0U3RyaW5nKTtcbiAgfVxuICBhZGQoKSB7XG4gICAgaWYgKHRoaXMuZ3JvY2VyeS50cmltKCkgPT09IFwiXCIpIHtcbiAgICAgIGFsZXJ0KFwiRW50ZXIgYSBncm9jZXJ5IGl0ZW1cIik7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgLy8gRGlzbWlzcyB0aGUga2V5Ym9hcmRcbiAgICBsZXQgdGV4dEZpZWxkID0gPFRleHRGaWVsZD50aGlzLmdyb2NlcnlUZXh0RmllbGQubmF0aXZlRWxlbWVudDtcbiAgICB0ZXh0RmllbGQuZGlzbWlzc1NvZnRJbnB1dCgpO1xuXG4gICAgLy8gdGhpcy5ncm9jZXJ5TGlzdFNlcnZpY2UuYWRkKHRoaXMuZ3JvY2VyeSlcbiAgICAvLyAgIC5zdWJzY3JpYmUoXG4gICAgLy8gICBncm9jZXJ5T2JqZWN0ID0+IHtcbiAgICAvLyAgICAgdGhpcy5ncm9jZXJ5TGlzdC51bnNoaWZ0KGdyb2NlcnlPYmplY3QpO1xuICAgIC8vICAgICB0aGlzLmdyb2NlcnkgPSBcIlwiO1xuICAgIC8vICAgfSxcbiAgICAvLyAgICgpID0+IHtcbiAgICAvLyAgICAgYWxlcnQoe1xuICAgIC8vICAgICAgIG1lc3NhZ2U6IFwiQW4gZXJyb3Igb2NjdXJyZWQgd2hpbGUgYWRkaW5nIGFuIGl0ZW0gdG8geW91ciBsaXN0LlwiLFxuICAgIC8vICAgICAgIG9rQnV0dG9uVGV4dDogXCJPS1wiXG4gICAgLy8gICAgIH0pO1xuICAgIC8vICAgICB0aGlzLmdyb2NlcnkgPSBcIlwiO1xuICAgIC8vICAgfVxuICAgIC8vICAgKVxuICB9XG59Il19