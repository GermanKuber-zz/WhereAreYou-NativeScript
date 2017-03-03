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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBwLnJvdXRpbmcuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJhcHAucm91dGluZy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsaUVBQStEO0FBQy9ELDZFQUEyRTtBQUU5RCxRQUFBLE1BQU0sR0FBRztJQUNwQixJQUFJO0lBQ0osY0FBYztJQUNkLDhCQUE4QjtJQUM5QixLQUFLO0lBQ0wseUNBQXlDO0lBQ3pDO1FBQ0UsSUFBSSxFQUFFLEVBQUU7UUFDUixTQUFTLEVBQUUsd0NBQWtCO0tBQzlCO0lBQ0QsRUFBRSxJQUFJLEVBQUUsV0FBVyxFQUFFLFNBQVMsRUFBRSx3Q0FBa0IsRUFBRTtDQUNyRCxDQUFDO0FBQ0YsT0FBTyxDQUFDLEdBQUcsQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDO0FBQ2pCLFFBQUEscUJBQXFCLEdBQUc7SUFDbkMsZ0NBQWMsRUFBRSx3Q0FBa0I7Q0FDbkMsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IExvZ2luQ29tcG9uZW50IH0gZnJvbSBcIi4vcGFnZXMvbG9naW4vbG9naW4uY29tcG9uZW50XCI7XG5pbXBvcnQgeyBEYXNoYm9hcmRDb21wb25lbnQgfSBmcm9tICcuL3BhZ2VzL2Rhc2hib2FyZC9kYXNoYm9hcmQuY29tcG9uZW50JztcblxuZXhwb3J0IGNvbnN0IHJvdXRlcyA9IFtcbiAgLy8ge1xuICAvLyAgIHBhdGg6IFwiXCIsXG4gIC8vICAgY29tcG9uZW50OiBMb2dpbkNvbXBvbmVudFxuICAvLyB9LFxuICAvL1RPRE8gOiBWb2x2ZXIgbG9naW4gY29tbyBwcmltZXJhIHBhZ2luYVxuICB7XG4gICAgcGF0aDogXCJcIixcbiAgICBjb21wb25lbnQ6IERhc2hib2FyZENvbXBvbmVudFxuICB9LFxuICB7IHBhdGg6IFwiZGFzaGJvYXJkXCIsIGNvbXBvbmVudDogRGFzaGJvYXJkQ29tcG9uZW50IH1cbl07XG5jb25zb2xlLmxvZyhcIkNvbnN0cnVjdG9yISEhXCIpO1xuZXhwb3J0IGNvbnN0IG5hdmlnYXRhYmxlQ29tcG9uZW50cyA9IFtcbiAgTG9naW5Db21wb25lbnQsIERhc2hib2FyZENvbXBvbmVudFxuXTsiXX0=