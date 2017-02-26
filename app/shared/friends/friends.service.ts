import { Injectable } from "@angular/core";
import { Observable } from 'rxjs/Observable';
import "rxjs/add/operator/do";
import "rxjs/add/operator/map";
import { Friend } from "./friend";
import { every } from '../../../platforms/ios/HelloWorld/app/tns_modules/rxjs/src/operator/every';
import { Observer } from '../../../platforms/ios/HelloWorld/app/tns_modules/rxjs/src/Observer';


@Injectable()
export class FriendsService {
  private friend: Observable<Friend[]>;
  private data: Observable<Array<Friend>>;
  private dataObserver: Observer<Array<Friend>>;
  private observer :any;
  constructor() {
    this.friend = new Observable<any>(observer => {
      observer.next(mockListFriend);
      this.observer = observer;
    });
  }
  getFriendsByGroup(id: number): Observable<Array<Friend>> {
    return Observable.of<Friend[]>(mockListFriend);
  }

  getAllFriends(): Observable<Array<Friend>> {
    // this.data = new Observable(observer => this.dataObserver = observer);

    // return this.data;
    // this.friend = Observable.of<Friend[]>(mockListFriend);
    return this.friend;
  }
  updateFriend(friend: Friend): void {
    this.observer.next(mockListFriend);
  }
  getFriendById(id: number): Friend {
    for (var friend of mockListFriend) {
      if (friend.id == id)
        return friend;
    }
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
  displayName: "Display Name 1",
  groupId: 1,
  activate: true
})
mockListFriend.push(<Friend>{
  id: 2,
  email: "segundo@gmail.com",
  name: "Nombre 2",
  lastName: "Apellido 1",
  displayName: "Display Name 2",
  groupId: 1,
  activate: false
})
mockListFriend.push(<Friend>{
  id: 3,
  email: "tercero@gmail.com",
  name: "Nombre 3",
  lastName: "Apellido 1",
  displayName: "Display Name 3",
  groupId: 1,
  activate: true
})
mockListFriend.push(<Friend>{
  id: 4,
  email: "cuarto@gmail.com",
  name: "Nombre 4",
  lastName: "Apellido 1",
  displayName: "Display Name 4",
  groupId: 1,
  activate: true
})
mockListFriend.push(<Friend>{
  id: 5,
  email: "quinto@gmail.com",
  name: "Nombre 5",
  lastName: "Apellido 1",
  displayName: "Display Name 5",
  groupId: 1,
  activate: true
})
mockListFriend.push(<Friend>{
  id: 6,
  email: "sexto@gmail.com",
  name: "Nombre 6",
  lastName: "Apellido 1",
  displayName: "Display Name 6",
  groupId: 1,
  activate: true
})
mockListFriend.push(<Friend>{
  id: 7,
  email: "septimo@gmail.com",
  name: "Nombre 7",
  lastName: "Apellido 1",
  displayName: "Display Name 7",
  groupId: 1,
  activate: true
})