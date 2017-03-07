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
        var _this = this;
        var error = false;
        if (!this.user.isValidEmail()) {
            alert("Ingrese un email correcto!");
            error = true;
        }
        if (!this.user.isValidRePassword()) {
            alert("Verifique el Password ingresado");
            error = true;
        }
        if (!error) {
            //TODO: Validar todas las propiedades y mostrar errores
            this.userService.register(this.user)
                .subscribe(function (x) {
                _this.userService.login(_this.user)
                    .subscribe(function () { return _this.navigationService.navigateClear(navigation_service_1.ViewsEnum.dashboard); }, function (error) {
                    _this.navigationService.back();
                });
            }, function (e) {
            });
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVnaXN0ZXIuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsicmVnaXN0ZXIuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxzQ0FBeUU7QUFDekUsK0NBQTREO0FBQzVELCtEQUE2RDtBQU83RCxzRUFBK0U7QUFNL0UsSUFBYSxpQkFBaUI7SUFFMUIsMkJBQW9CLGlCQUFvQyxFQUM1QyxXQUF3QjtRQURoQixzQkFBaUIsR0FBakIsaUJBQWlCLENBQW1CO1FBQzVDLGdCQUFXLEdBQVgsV0FBVyxDQUFhO1FBQ2hDLElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxtQkFBWSxFQUFFLENBQUM7SUFFbkMsQ0FBQztJQUVELG9DQUFRLEdBQVI7SUFFQSxDQUFDO0lBRUQsZ0NBQUksR0FBSjtRQUNJLGlDQUFpQztJQUNyQyxDQUFDO0lBQ0Qsb0NBQVEsR0FBUjtRQUFBLGlCQTBCQztRQXpCRyxJQUFJLEtBQUssR0FBRyxLQUFLLENBQUM7UUFDbEIsRUFBRSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFlBQVksRUFBRSxDQUFDLENBQUMsQ0FBQztZQUM1QixLQUFLLENBQUMsNEJBQTRCLENBQUMsQ0FBQztZQUNwQyxLQUFLLEdBQUcsSUFBSSxDQUFDO1FBQ2pCLENBQUM7UUFDRCxFQUFFLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsaUJBQWlCLEVBQUUsQ0FBQyxDQUFDLENBQUM7WUFDakMsS0FBSyxDQUFDLGlDQUFpQyxDQUFDLENBQUM7WUFDekMsS0FBSyxHQUFHLElBQUksQ0FBQztRQUNqQixDQUFDO1FBQ0QsRUFBRSxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO1lBQ1QsdURBQXVEO1lBQ3ZELElBQUksQ0FBQyxXQUFXLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUM7aUJBQy9CLFNBQVMsQ0FBQyxVQUFBLENBQUM7Z0JBQ1IsS0FBSSxDQUFDLFdBQVcsQ0FBQyxLQUFLLENBQUMsS0FBSSxDQUFDLElBQUksQ0FBQztxQkFDNUIsU0FBUyxDQUNWLGNBQU0sT0FBQSxLQUFJLENBQUMsaUJBQWlCLENBQUMsYUFBYSxDQUFDLDhCQUFTLENBQUMsU0FBUyxDQUFDLEVBQXpELENBQXlELEVBQy9ELFVBQUMsS0FBSztvQkFDRixLQUFJLENBQUMsaUJBQWlCLENBQUMsSUFBSSxFQUFFLENBQUM7Z0JBQ2xDLENBQUMsQ0FBQyxDQUFDO1lBQ1gsQ0FBQyxFQUNELFVBQUEsQ0FBQztZQUVELENBQUMsQ0FBQyxDQUFDO1FBRVgsQ0FBQztJQUNMLENBQUM7SUFDTCx3QkFBQztBQUFELENBQUMsQUExQ0QsSUEwQ0M7QUExQ1ksaUJBQWlCO0lBTDdCLGdCQUFTLENBQUM7UUFDUCxRQUFRLEVBQUUsYUFBYTtRQUN2QixXQUFXLEVBQUUsOEJBQThCO1FBQzNDLFNBQVMsRUFBRSxDQUFDLG9DQUFvQyxFQUFFLDZCQUE2QixDQUFDO0tBQ25GLENBQUM7cUNBR3lDLHNDQUFpQjtRQUMvQiwwQkFBVztHQUgzQixpQkFBaUIsQ0EwQzdCO0FBMUNZLDhDQUFpQjtBQWdEOUIsc0NBQWlEO0FBRWpELElBQWEscUJBQXFCO0lBRzlCLCtCQUFZLEVBQWM7UUFDdEIsRUFBRSxDQUFDLGFBQWEsQ0FBQyxLQUFLLENBQUMsZUFBZSxHQUFHLFFBQVEsQ0FBQztRQUNsRCxFQUFFLENBQUMsYUFBYSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDO0lBQzFDLENBQUM7SUFDTCw0QkFBQztBQUFELENBQUMsQUFQRCxJQU9DO0FBTjhCO0lBQTFCLFlBQUssQ0FBQyxrQkFBa0IsQ0FBQzs7MkRBQXVCO0FBQ3RCO0lBQTFCLFlBQUssQ0FBQyxrQkFBa0IsQ0FBQzs7c0RBQWtCO0FBRm5DLHFCQUFxQjtJQURqQyxnQkFBUyxDQUFDLEVBQUUsUUFBUSxFQUFFLFlBQVksRUFBRSxDQUFDO3FDQUlsQixpQkFBVTtHQUhqQixxQkFBcUIsQ0FPakM7QUFQWSxzREFBcUIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIEVsZW1lbnRSZWYsIE9uSW5pdCwgVmlld0NoaWxkIH0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcbmltcG9ydCB7IFVzZXIsIFVzZXJSZWdpc3RlciB9IGZyb20gJy4uLy4uL3NoYXJlZC91c2VyL3VzZXInO1xuaW1wb3J0IHsgVXNlclNlcnZpY2UgfSBmcm9tIFwiLi4vLi4vc2hhcmVkL3VzZXIvdXNlci5zZXJ2aWNlXCI7XG5pbXBvcnQgeyBSb3V0ZXIgfSBmcm9tIFwiQGFuZ3VsYXIvcm91dGVyXCI7XG5pbXBvcnQgeyBQYWdlIH0gZnJvbSAndWkvcGFnZSc7XG5pbXBvcnQgeyBDb2xvciB9IGZyb20gXCJjb2xvclwiO1xuaW1wb3J0IHsgVmlldyB9IGZyb20gXCJ1aS9jb3JlL3ZpZXdcIjtcbmltcG9ydCB7IHNldEhpbnRDb2xvciB9IGZyb20gXCIuLi8uLi91dGlscy9oaW50LXV0aWxcIjtcbmltcG9ydCB7IFRleHRGaWVsZCB9IGZyb20gXCJ1aS90ZXh0LWZpZWxkXCI7XG5pbXBvcnQgeyBOYXZpZ2F0aW9uU2VydmljZSwgVmlld3NFbnVtIH0gZnJvbSAnLi4vLi4vc2hhcmVkL25hdmlnYXRpb24uc2VydmljZSc7XG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogXCJ3eS1yZWdpc3RlclwiLFxuICAgIHRlbXBsYXRlVXJsOiBcInBhZ2VzL3JlZ2lzdGVyL3JlZ2lzdGVyLmh0bWxcIixcbiAgICBzdHlsZVVybHM6IFtcInBhZ2VzL3JlZ2lzdGVyL3JlZ2lzdGVyLWNvbW1vbi5jc3NcIiwgXCJwYWdlcy9yZWdpc3Rlci9yZWdpc3Rlci5jc3NcIl1cbn0pXG5leHBvcnQgY2xhc3MgUmVnaXN0ZXJDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xuICAgIHVzZXI6IFVzZXJSZWdpc3RlcjtcbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIG5hdmlnYXRpb25TZXJ2aWNlOiBOYXZpZ2F0aW9uU2VydmljZSxcbiAgICAgICAgcHJpdmF0ZSB1c2VyU2VydmljZTogVXNlclNlcnZpY2UpIHtcbiAgICAgICAgdGhpcy51c2VyID0gbmV3IFVzZXJSZWdpc3RlcigpO1xuXG4gICAgfVxuXG4gICAgbmdPbkluaXQoKSB7XG5cbiAgICB9XG5cbiAgICBiYWNrKCkge1xuICAgICAgICAvLyB0aGlzLm5hdmlnYXRpb25TZXJ2aWNlLmJhY2soKTtcbiAgICB9XG4gICAgcmVnaXN0ZXIoKSB7XG4gICAgICAgIHZhciBlcnJvciA9IGZhbHNlO1xuICAgICAgICBpZiAoIXRoaXMudXNlci5pc1ZhbGlkRW1haWwoKSkge1xuICAgICAgICAgICAgYWxlcnQoXCJJbmdyZXNlIHVuIGVtYWlsIGNvcnJlY3RvIVwiKTtcbiAgICAgICAgICAgIGVycm9yID0gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoIXRoaXMudXNlci5pc1ZhbGlkUmVQYXNzd29yZCgpKSB7XG4gICAgICAgICAgICBhbGVydChcIlZlcmlmaXF1ZSBlbCBQYXNzd29yZCBpbmdyZXNhZG9cIik7XG4gICAgICAgICAgICBlcnJvciA9IHRydWU7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKCFlcnJvcikge1xuICAgICAgICAgICAgLy9UT0RPOiBWYWxpZGFyIHRvZGFzIGxhcyBwcm9waWVkYWRlcyB5IG1vc3RyYXIgZXJyb3Jlc1xuICAgICAgICAgICAgdGhpcy51c2VyU2VydmljZS5yZWdpc3Rlcih0aGlzLnVzZXIpXG4gICAgICAgICAgICAgICAgLnN1YnNjcmliZSh4ID0+IHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy51c2VyU2VydmljZS5sb2dpbih0aGlzLnVzZXIpXG4gICAgICAgICAgICAgICAgICAgICAgICAuc3Vic2NyaWJlKFxuICAgICAgICAgICAgICAgICAgICAgICAgKCkgPT4gdGhpcy5uYXZpZ2F0aW9uU2VydmljZS5uYXZpZ2F0ZUNsZWFyKFZpZXdzRW51bS5kYXNoYm9hcmQpLFxuICAgICAgICAgICAgICAgICAgICAgICAgKGVycm9yKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5uYXZpZ2F0aW9uU2VydmljZS5iYWNrKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIGUgPT4ge1xuXG4gICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgfVxuICAgIH1cbn1cblxuXG5cblxuXG5pbXBvcnQgeyBEaXJlY3RpdmUsIElucHV0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5ARGlyZWN0aXZlKHsgc2VsZWN0b3I6ICdbd3ktZXJyb3JdJyB9KVxuZXhwb3J0IGNsYXNzIEVycm9yTWVzc2FnZURpcmVjdGl2ZSB7XG4gICAgQElucHV0KFwid3ktZXJyb3ItdmlzaWJsZVwiKSBlcnJvclZpc2libGU6IGJvb2xlYW47XG4gICAgQElucHV0KFwid3ktZXJyb3ItbWVzc2FnZVwiKSBtZXNzYWdlOiBib29sZWFuO1xuICAgIGNvbnN0cnVjdG9yKGVsOiBFbGVtZW50UmVmKSB7XG4gICAgICAgIGVsLm5hdGl2ZUVsZW1lbnQuc3R5bGUuYmFja2dyb3VuZENvbG9yID0gJ3llbGxvdyc7XG4gICAgICAgIGVsLm5hdGl2ZUVsZW1lbnQudmFsdWUgPSB0aGlzLm1lc3NhZ2U7XG4gICAgfVxufSJdfQ==