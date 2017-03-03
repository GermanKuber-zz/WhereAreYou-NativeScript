import { Component, ElementRef, OnInit, ViewChild } from "@angular/core";
// import { User } from "../../shared/user/user";
// import { UserService } from "../../shared/user/user.service";
// import { Router } from "@angular/router";
// import { Page } from 'ui/page';
// import { Color } from "color";
// import { View } from "ui/core/view";
// import { setHintColor } from "../../utils/hint-util";
import { TextField } from "ui/text-field";
@Component({
    selector: "my-app",
    templateUrl: "pages/login/login.html",
    styleUrls: ["pages/login/login-common.css", "pages/login/login.css"]
})
export class LoginComponent  {
    // user: User;
    // isLoggingIn = true;
    // @ViewChild("container") container: ElementRef;
    // @ViewChild("email") email: ElementRef;
    // @ViewChild("password") password: ElementRef;
    // constructor(private router: Router, private userService: UserService, private page: Page) {

    //     this.user = new User();
    //     this.user.email = "user@nativescript.org";
    //     this.user.password = "password";
    // }
    // setTextFieldColors() {
    //     let emailTextField = <TextField>this.email.nativeElement;
    //     let passwordTextField = <TextField>this.password.nativeElement;

    //     let mainTextColor = new Color(this.isLoggingIn ? "black" : "#C4AFB4");
    //     emailTextField.color = mainTextColor;
    //     passwordTextField.color = mainTextColor;

    //     let hintColor = new Color(this.isLoggingIn ? "#ACA6A7" : "#C4AFB4");
    //     setHintColor({ view: emailTextField, color: hintColor });
    //     setHintColor({ view: passwordTextField, color: hintColor });
    // }
    // toggleDisplay() {
        
        
    //     this.isLoggingIn = !this.isLoggingIn;
    //     let container = <View>this.container.nativeElement;
    //     container.animate({
    //         backgroundColor: this.isLoggingIn ? new Color("white") : new Color("#301217"),
    //         duration: 200
    //     });
    // }

    // ngOnInit() {
    //     this.page.actionBarHidden = true;
    //     this.page.backgroundImage = "res://bg_login";
    // }
    // submit() {
    //     this.router.navigate(["/dashboard"]);
    //     if (!this.user.isValidEmail()) {
    //         alert("Enter a valid email address.");
    //         return;
    //     }
    // }
    // login() {
    //     this.userService.login(this.user)
    //         .subscribe(
    //         () => this.router.navigate(["/dashboard"]),
    //         (error) => alert("Unfortunately we could not find your account.")
    //         );
    // }
    // signUp() {
    //     this.userService.register(this.user)
    //         .subscribe(
    //         () => {
    //             alert("Your account was successfully created.");
    //             this.toggleDisplay();
    //         },
    //         () => alert("Unfortunately we were unable to create your account.")
    //         );
    // }
}