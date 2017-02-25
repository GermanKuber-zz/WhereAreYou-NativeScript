import { Injectable } from "@angular/core";
import { Http, Headers, Response } from "@angular/http";
import { Observable } from "rxjs/Rx";
import "rxjs/add/operator/do";
import "rxjs/add/operator/map";

import { Friend } from "./friend";


@Injectable()
export class FriendsService {
  constructor(private http: Http) { }

  getFriendsByGroup(id: number): Observable<Array<Friend>> {
    return Observable.of<Friend[]>(mockListFriend);
  }

  getAllFriends(): Observable<Array<Friend>> {
    return Observable.of<Friend[]>(mockListFriend);
  }


  handleErrors(error: Response) {
    console.log(JSON.stringify(error.json()));
    return Observable.throw(error);
  }
}


var mockListFriend = new Array<Friend>();

mockListFriend.push(<Friend>{
  id: 1,
  email: "primero@gmail.com",
  name: "Nombre 1",
  lastName: "Apellido 1",
  groupId: 1
})
mockListFriend.push(<Friend>{
  id: 2,
  email: "segundo@gmail.com",
  name: "Nombre 2",
  lastName: "Apellido 1",
  groupId: 1
})
mockListFriend.push(<Friend>{
  id: 3,
  email: "tercero@gmail.com",
  name: "Nombre 3",
  lastName: "Apellido 1",
  groupId: 1
})
mockListFriend.push(<Friend>{
  id: 4,
  email: "cuarto@gmail.com",
  name: "Nombre 4",
  lastName: "Apellido 1",
  groupId: 1
})
mockListFriend.push(<Friend>{
  id: 5,
  email: "quinto@gmail.com",
  name: "Nombre 5",
  lastName: "Apellido 1",
  groupId: 1
})
mockListFriend.push(<Friend>{
  id: 6,
  email: "sexto@gmail.com",
  name: "Nombre 6",
  lastName: "Apellido 1",
  groupId: 1
})
mockListFriend.push(<Friend>{
  id: 7,
  email: "septimo@gmail.com",
  name: "Nombre 7",
  lastName: "Apellido 1",
  groupId: 1
})