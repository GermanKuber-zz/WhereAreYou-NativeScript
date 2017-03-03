"use strict";
var login_component_1 = require("./pages/login/login.component");
var dashboard_component_1 = require("./pages/dashboard/dashboard.component");
exports.routes = [
    // {
    //   path: "",
    //   component: LoginComponent
    // },
    //TODO : Volver login como primera pagina
    {
        path: "",
        component: dashboard_component_1.DashboardComponent
    },
    { path: "dashboard", component: dashboard_component_1.DashboardComponent }
];
console.log("Constructor!!!");
exports.navigatableComponents = [
    login_component_1.LoginComponent, dashboard_component_1.DashboardComponent
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBwLnJvdXRpbmcuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJhcHAucm91dGluZy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsaUVBQStEO0FBQy9ELDZFQUEyRTtBQUU5RCxRQUFBLE1BQU0sR0FBRztJQUNwQixJQUFJO0lBQ0osY0FBYztJQUNkLDhCQUE4QjtJQUM5QixLQUFLO0lBQ0wseUNBQXlDO0lBQ3ZDO1FBQ0EsSUFBSSxFQUFFLEVBQUU7UUFDUixTQUFTLEVBQUUsd0NBQWtCO0tBQzlCO0lBQ0QsRUFBRSxJQUFJLEVBQUUsV0FBVyxFQUFFLFNBQVMsRUFBRSx3Q0FBa0IsRUFBRTtDQUNyRCxDQUFDO0FBQ0EsT0FBTyxDQUFDLEdBQUcsQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDO0FBQ25CLFFBQUEscUJBQXFCLEdBQUc7SUFDbkMsZ0NBQWMsRUFBRSx3Q0FBa0I7Q0FDbkMsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IExvZ2luQ29tcG9uZW50IH0gZnJvbSBcIi4vcGFnZXMvbG9naW4vbG9naW4uY29tcG9uZW50XCI7XG5pbXBvcnQgeyBEYXNoYm9hcmRDb21wb25lbnQgfSBmcm9tICcuL3BhZ2VzL2Rhc2hib2FyZC9kYXNoYm9hcmQuY29tcG9uZW50JztcblxuZXhwb3J0IGNvbnN0IHJvdXRlcyA9IFtcbiAgLy8ge1xuICAvLyAgIHBhdGg6IFwiXCIsXG4gIC8vICAgY29tcG9uZW50OiBMb2dpbkNvbXBvbmVudFxuICAvLyB9LFxuICAvL1RPRE8gOiBWb2x2ZXIgbG9naW4gY29tbyBwcmltZXJhIHBhZ2luYVxuICAgIHtcbiAgICBwYXRoOiBcIlwiLFxuICAgIGNvbXBvbmVudDogRGFzaGJvYXJkQ29tcG9uZW50XG4gIH0sXG4gIHsgcGF0aDogXCJkYXNoYm9hcmRcIiwgY29tcG9uZW50OiBEYXNoYm9hcmRDb21wb25lbnQgfVxuXTtcbiAgY29uc29sZS5sb2coXCJDb25zdHJ1Y3RvciEhIVwiKTtcbmV4cG9ydCBjb25zdCBuYXZpZ2F0YWJsZUNvbXBvbmVudHMgPSBbXG4gIExvZ2luQ29tcG9uZW50LCBEYXNoYm9hcmRDb21wb25lbnRcbl07Il19