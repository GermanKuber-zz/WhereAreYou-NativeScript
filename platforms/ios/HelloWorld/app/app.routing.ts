import { LoginComponent } from "./pages/login/login.component";
import { DashboardComponent } from './pages/dashboard/dashboard.component';

export const routes = [
  // {
  //   path: "",
  //   component: LoginComponent
  // },
  //TODO : Volver login como primera pagina
  {
    path: "",
    component: DashboardComponent
  },
  { path: "dashboard", component: DashboardComponent }
];
console.log("Constructor!!!");
export const navigatableComponents = [
  LoginComponent, DashboardComponent
];