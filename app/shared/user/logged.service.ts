import { Injectable } from "@angular/core";
import { Me } from './me';


@Injectable()
export class LoggedService {
  public me: Me;
  constructor() { }
  loginMe(me: Me) {
    this.me = me;
  }

}