import { Injectable } from "@angular/core";
import { Router } from '@angular/router';
import { RouterExtensions } from "nativescript-angular/router";

@Injectable()
export class NavigationService {

  constructor(private router: Router,
    private routerExtensions: RouterExtensions) {

  }
  navigate(view: ViewsEnum) {
    this.router.navigate([`/${view}`]);
  }
  back() {
    this.routerExtensions.back();
  }
  navigateClear(view: ViewsEnum) {
    this.routerExtensions.navigate([`/${view}`], { clearHistory: true });
  }
}

export class ViewsEnum {
  static login = "login";
  static dashboard = "dashboard";
  static register = "register";

}