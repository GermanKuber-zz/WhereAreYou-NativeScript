import { Component, ElementRef, OnInit, ViewChild } from "@angular/core";
import { User, UserRegister } from '../../shared/user/user';
import { UserService } from "../../shared/user/user.service";
import { Router } from "@angular/router";
import { Page } from 'ui/page';
import { Color } from "color";
import { View } from "ui/core/view";
import { setHintColor } from "../../utils/hint-util";
import { TextField } from "ui/text-field";
import { NavigationService, ViewsEnum } from '../../shared/navigation.service';
@Component({
    selector: "wy-register",
    templateUrl: "pages/register/register.html",
    styleUrls: ["pages/register/register-common.css", "pages/register/register.css"]
})
export class RegisterComponent implements OnInit {
    user: UserRegister;
    constructor(private navigationService: NavigationService,
        private userService: UserService) {
        this.user = new UserRegister();

    }

    ngOnInit() {

    }

    back() {
        // this.navigationService.back();
    }
    register() {
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
            this.userService.register(this.user)
            this.navigationService.navigateClear(ViewsEnum.dashboard);
        }
    }
}





import { Directive, Input } from '@angular/core';
@Directive({ selector: '[wy-error]' })
export class ErrorMessageDirective {
    @Input("wy-error-visible") errorVisible: boolean;
    @Input("wy-error-message") message: boolean;
    constructor(el: ElementRef) {
        el.nativeElement.style.backgroundColor = 'yellow';
        el.nativeElement.value = this.message;
    }
}