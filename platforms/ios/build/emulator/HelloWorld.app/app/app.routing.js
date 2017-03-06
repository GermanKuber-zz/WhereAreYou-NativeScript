"use strict";
var login_component_1 = require("./pages/login/login.component");
var dashboard_component_1 = require("./pages/dashboard/dashboard.component");
exports.routes = [
    {
        path: "",
        component: login_component_1.LoginComponent
    },
    //TODO : Volver login como primera pagina
    // {
    //   path: "",
    //   component: DashboardComponent
    // },
    { path: "dashboard", component: dashboard_component_1.DashboardComponent }
];
console.log("Constructor!!!");
exports.navigatableComponents = [
    login_component_1.LoginComponent, dashboard_component_1.DashboardComponent
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBwLnJvdXRpbmcuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJhcHAucm91dGluZy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsaUVBQStEO0FBQy9ELDZFQUEyRTtBQUU5RCxRQUFBLE1BQU0sR0FBRztJQUNwQjtRQUNFLElBQUksRUFBRSxFQUFFO1FBQ1IsU0FBUyxFQUFFLGdDQUFjO0tBQzFCO0lBQ0QseUNBQXlDO0lBQ3pDLElBQUk7SUFDSixjQUFjO0lBQ2Qsa0NBQWtDO0lBQ2xDLEtBQUs7SUFDTCxFQUFFLElBQUksRUFBRSxXQUFXLEVBQUUsU0FBUyxFQUFFLHdDQUFrQixFQUFFO0NBQ3JELENBQUM7QUFDRixPQUFPLENBQUMsR0FBRyxDQUFDLGdCQUFnQixDQUFDLENBQUM7QUFDakIsUUFBQSxxQkFBcUIsR0FBRztJQUNuQyxnQ0FBYyxFQUFFLHdDQUFrQjtDQUNuQyxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTG9naW5Db21wb25lbnQgfSBmcm9tIFwiLi9wYWdlcy9sb2dpbi9sb2dpbi5jb21wb25lbnRcIjtcbmltcG9ydCB7IERhc2hib2FyZENvbXBvbmVudCB9IGZyb20gJy4vcGFnZXMvZGFzaGJvYXJkL2Rhc2hib2FyZC5jb21wb25lbnQnO1xuXG5leHBvcnQgY29uc3Qgcm91dGVzID0gW1xuICB7XG4gICAgcGF0aDogXCJcIixcbiAgICBjb21wb25lbnQ6IExvZ2luQ29tcG9uZW50XG4gIH0sXG4gIC8vVE9ETyA6IFZvbHZlciBsb2dpbiBjb21vIHByaW1lcmEgcGFnaW5hXG4gIC8vIHtcbiAgLy8gICBwYXRoOiBcIlwiLFxuICAvLyAgIGNvbXBvbmVudDogRGFzaGJvYXJkQ29tcG9uZW50XG4gIC8vIH0sXG4gIHsgcGF0aDogXCJkYXNoYm9hcmRcIiwgY29tcG9uZW50OiBEYXNoYm9hcmRDb21wb25lbnQgfVxuXTtcbmNvbnNvbGUubG9nKFwiQ29uc3RydWN0b3IhISFcIik7XG5leHBvcnQgY29uc3QgbmF2aWdhdGFibGVDb21wb25lbnRzID0gW1xuICBMb2dpbkNvbXBvbmVudCwgRGFzaGJvYXJkQ29tcG9uZW50XG5dOyJdfQ==