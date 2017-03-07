"use strict";
var core_1 = require("@angular/core");
var user_1 = require("../../shared/user/user");
var user_service_1 = require("../../shared/user/user.service");
var navigation_service_1 = require("../../shared/navigation.service");
var RegisterComponent = (function () {
    function RegisterComponent(navigationService, userService) {
        this.navigationService = navigationService;
        this.userService = userService;
        this.user = new user_1.UserRegister();
    }
    RegisterComponent.prototype.ngOnInit = function () {
    };
    RegisterComponent.prototype.back = function () {
        // this.navigationService.back();
    };
    RegisterComponent.prototype.register = function () {
        var error = false;
        if (!this.user.isValidEmail()) {
            alert("Ingrese un email correcto!");
            error = true;
        }
        if (!this.user.isValidEmail()) {
            alert("El Re Password no es igual al Password");
            error = true;
        }
        if (!error) {
            //TODO: Validar todas las propiedades y mostrar errores
            this.userService.register(this.user);
            this.navigationService.navigateClear(navigation_service_1.ViewsEnum.dashboard);
        }
    };
    return RegisterComponent;
}());
RegisterComponent = __decorate([
    core_1.Component({
        selector: "wy-register",
        templateUrl: "pages/register/register.html",
        styleUrls: ["pages/register/register-common.css", "pages/register/register.css"]
    }),
    __metadata("design:paramtypes", [navigation_service_1.NavigationService,
        user_service_1.UserService])
], RegisterComponent);
exports.RegisterComponent = RegisterComponent;
var core_2 = require("@angular/core");
var ErrorMessageDirective = (function () {
    function ErrorMessageDirective(el) {
        el.nativeElement.style.backgroundColor = 'yellow';
        el.nativeElement.value = this.message;
    }
    return ErrorMessageDirective;
}());
__decorate([
    core_2.Input("wy-error-visible"),
    __metadata("design:type", Boolean)
], ErrorMessageDirective.prototype, "errorVisible", void 0);
__decorate([
    core_2.Input("wy-error-message"),
    __metadata("design:type", Boolean)
], ErrorMessageDirective.prototype, "message", void 0);
ErrorMessageDirective = __decorate([
    core_2.Directive({ selector: '[wy-error]' }),
    __metadata("design:paramtypes", [core_1.ElementRef])
], ErrorMessageDirective);
exports.ErrorMessageDirective = ErrorMessageDirective;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVnaXN0ZXIuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsicmVnaXN0ZXIuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxzQ0FBeUU7QUFDekUsK0NBQTREO0FBQzVELCtEQUE2RDtBQU83RCxzRUFBK0U7QUFNL0UsSUFBYSxpQkFBaUI7SUFFMUIsMkJBQW9CLGlCQUFvQyxFQUM1QyxXQUF3QjtRQURoQixzQkFBaUIsR0FBakIsaUJBQWlCLENBQW1CO1FBQzVDLGdCQUFXLEdBQVgsV0FBVyxDQUFhO1FBQ2hDLElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxtQkFBWSxFQUFFLENBQUM7SUFFbkMsQ0FBQztJQUVELG9DQUFRLEdBQVI7SUFFQSxDQUFDO0lBRUQsZ0NBQUksR0FBSjtRQUNJLGlDQUFpQztJQUNyQyxDQUFDO0lBQ0Qsb0NBQVEsR0FBUjtRQUNJLElBQUksS0FBSyxHQUFHLEtBQUssQ0FBQztRQUNsQixFQUFFLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsWUFBWSxFQUFFLENBQUMsQ0FBQyxDQUFDO1lBQzVCLEtBQUssQ0FBQyw0QkFBNEIsQ0FBQyxDQUFDO1lBQ3BDLEtBQUssR0FBRyxJQUFJLENBQUM7UUFDakIsQ0FBQztRQUNELEVBQUUsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxZQUFZLEVBQUUsQ0FBQyxDQUFDLENBQUM7WUFDNUIsS0FBSyxDQUFDLHdDQUF3QyxDQUFDLENBQUM7WUFDaEQsS0FBSyxHQUFHLElBQUksQ0FBQztRQUNqQixDQUFDO1FBQ0QsRUFBRSxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO1lBQ1QsdURBQXVEO1lBQ3ZELElBQUksQ0FBQyxXQUFXLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQTtZQUNwQyxJQUFJLENBQUMsaUJBQWlCLENBQUMsYUFBYSxDQUFDLDhCQUFTLENBQUMsU0FBUyxDQUFDLENBQUM7UUFDOUQsQ0FBQztJQUNMLENBQUM7SUFDTCx3QkFBQztBQUFELENBQUMsQUEvQkQsSUErQkM7QUEvQlksaUJBQWlCO0lBTDdCLGdCQUFTLENBQUM7UUFDUCxRQUFRLEVBQUUsYUFBYTtRQUN2QixXQUFXLEVBQUUsOEJBQThCO1FBQzNDLFNBQVMsRUFBRSxDQUFDLG9DQUFvQyxFQUFFLDZCQUE2QixDQUFDO0tBQ25GLENBQUM7cUNBR3lDLHNDQUFpQjtRQUMvQiwwQkFBVztHQUgzQixpQkFBaUIsQ0ErQjdCO0FBL0JZLDhDQUFpQjtBQXFDOUIsc0NBQWlEO0FBRWpELElBQWEscUJBQXFCO0lBRzlCLCtCQUFZLEVBQWM7UUFDdEIsRUFBRSxDQUFDLGFBQWEsQ0FBQyxLQUFLLENBQUMsZUFBZSxHQUFHLFFBQVEsQ0FBQztRQUNsRCxFQUFFLENBQUMsYUFBYSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDO0lBQzFDLENBQUM7SUFDTCw0QkFBQztBQUFELENBQUMsQUFQRCxJQU9DO0FBTjhCO0lBQTFCLFlBQUssQ0FBQyxrQkFBa0IsQ0FBQzs7MkRBQXVCO0FBQ3RCO0lBQTFCLFlBQUssQ0FBQyxrQkFBa0IsQ0FBQzs7c0RBQWtCO0FBRm5DLHFCQUFxQjtJQURqQyxnQkFBUyxDQUFDLEVBQUUsUUFBUSxFQUFFLFlBQVksRUFBRSxDQUFDO3FDQUlsQixpQkFBVTtHQUhqQixxQkFBcUIsQ0FPakM7QUFQWSxzREFBcUIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIEVsZW1lbnRSZWYsIE9uSW5pdCwgVmlld0NoaWxkIH0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcbmltcG9ydCB7IFVzZXIsIFVzZXJSZWdpc3RlciB9IGZyb20gJy4uLy4uL3NoYXJlZC91c2VyL3VzZXInO1xuaW1wb3J0IHsgVXNlclNlcnZpY2UgfSBmcm9tIFwiLi4vLi4vc2hhcmVkL3VzZXIvdXNlci5zZXJ2aWNlXCI7XG5pbXBvcnQgeyBSb3V0ZXIgfSBmcm9tIFwiQGFuZ3VsYXIvcm91dGVyXCI7XG5pbXBvcnQgeyBQYWdlIH0gZnJvbSAndWkvcGFnZSc7XG5pbXBvcnQgeyBDb2xvciB9IGZyb20gXCJjb2xvclwiO1xuaW1wb3J0IHsgVmlldyB9IGZyb20gXCJ1aS9jb3JlL3ZpZXdcIjtcbmltcG9ydCB7IHNldEhpbnRDb2xvciB9IGZyb20gXCIuLi8uLi91dGlscy9oaW50LXV0aWxcIjtcbmltcG9ydCB7IFRleHRGaWVsZCB9IGZyb20gXCJ1aS90ZXh0LWZpZWxkXCI7XG5pbXBvcnQgeyBOYXZpZ2F0aW9uU2VydmljZSwgVmlld3NFbnVtIH0gZnJvbSAnLi4vLi4vc2hhcmVkL25hdmlnYXRpb24uc2VydmljZSc7XG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogXCJ3eS1yZWdpc3RlclwiLFxuICAgIHRlbXBsYXRlVXJsOiBcInBhZ2VzL3JlZ2lzdGVyL3JlZ2lzdGVyLmh0bWxcIixcbiAgICBzdHlsZVVybHM6IFtcInBhZ2VzL3JlZ2lzdGVyL3JlZ2lzdGVyLWNvbW1vbi5jc3NcIiwgXCJwYWdlcy9yZWdpc3Rlci9yZWdpc3Rlci5jc3NcIl1cbn0pXG5leHBvcnQgY2xhc3MgUmVnaXN0ZXJDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xuICAgIHVzZXI6IFVzZXJSZWdpc3RlcjtcbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIG5hdmlnYXRpb25TZXJ2aWNlOiBOYXZpZ2F0aW9uU2VydmljZSxcbiAgICAgICAgcHJpdmF0ZSB1c2VyU2VydmljZTogVXNlclNlcnZpY2UpIHtcbiAgICAgICAgdGhpcy51c2VyID0gbmV3IFVzZXJSZWdpc3RlcigpO1xuXG4gICAgfVxuXG4gICAgbmdPbkluaXQoKSB7XG5cbiAgICB9XG5cbiAgICBiYWNrKCkge1xuICAgICAgICAvLyB0aGlzLm5hdmlnYXRpb25TZXJ2aWNlLmJhY2soKTtcbiAgICB9XG4gICAgcmVnaXN0ZXIoKSB7XG4gICAgICAgIHZhciBlcnJvciA9IGZhbHNlO1xuICAgICAgICBpZiAoIXRoaXMudXNlci5pc1ZhbGlkRW1haWwoKSkge1xuICAgICAgICAgICAgYWxlcnQoXCJJbmdyZXNlIHVuIGVtYWlsIGNvcnJlY3RvIVwiKTtcbiAgICAgICAgICAgIGVycm9yID0gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoIXRoaXMudXNlci5pc1ZhbGlkRW1haWwoKSkge1xuICAgICAgICAgICAgYWxlcnQoXCJFbCBSZSBQYXNzd29yZCBubyBlcyBpZ3VhbCBhbCBQYXNzd29yZFwiKTtcbiAgICAgICAgICAgIGVycm9yID0gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoIWVycm9yKSB7XG4gICAgICAgICAgICAvL1RPRE86IFZhbGlkYXIgdG9kYXMgbGFzIHByb3BpZWRhZGVzIHkgbW9zdHJhciBlcnJvcmVzXG4gICAgICAgICAgICB0aGlzLnVzZXJTZXJ2aWNlLnJlZ2lzdGVyKHRoaXMudXNlcilcbiAgICAgICAgICAgIHRoaXMubmF2aWdhdGlvblNlcnZpY2UubmF2aWdhdGVDbGVhcihWaWV3c0VudW0uZGFzaGJvYXJkKTtcbiAgICAgICAgfVxuICAgIH1cbn1cblxuXG5cblxuXG5pbXBvcnQgeyBEaXJlY3RpdmUsIElucHV0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5ARGlyZWN0aXZlKHsgc2VsZWN0b3I6ICdbd3ktZXJyb3JdJyB9KVxuZXhwb3J0IGNsYXNzIEVycm9yTWVzc2FnZURpcmVjdGl2ZSB7XG4gICAgQElucHV0KFwid3ktZXJyb3ItdmlzaWJsZVwiKSBlcnJvclZpc2libGU6IGJvb2xlYW47XG4gICAgQElucHV0KFwid3ktZXJyb3ItbWVzc2FnZVwiKSBtZXNzYWdlOiBib29sZWFuO1xuICAgIGNvbnN0cnVjdG9yKGVsOiBFbGVtZW50UmVmKSB7XG4gICAgICAgIGVsLm5hdGl2ZUVsZW1lbnQuc3R5bGUuYmFja2dyb3VuZENvbG9yID0gJ3llbGxvdyc7XG4gICAgICAgIGVsLm5hdGl2ZUVsZW1lbnQudmFsdWUgPSB0aGlzLm1lc3NhZ2U7XG4gICAgfVxufSJdfQ==