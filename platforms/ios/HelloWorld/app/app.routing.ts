import { LoginComponent } from "./pages/login/login.component";
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { RegisterComponent } from './pages/register/register.component';

export const routes = [
  {
    path: "",
    component: LoginComponent
  },
  {
    path: "register",
    component: RegisterComponent
  },
  { path: "dashboard", component: DashboardComponent }
];
console.log("Constructor!!!");
export const navigatableComponents = [
  LoginComponent, DashboardComponent
];