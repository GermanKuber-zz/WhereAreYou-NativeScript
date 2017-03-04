import { Injectable } from "@angular/core";
import { Observable } from 'rxjs/Observable';
import "rxjs/add/operator/do";
import "rxjs/add/operator/map";
import { Friend } from "./friend";
import { every } from 'rxjs/src/operator/every';
import { Observer } from 'rxjs/src/Observer';
import { Subject } from 'rxjs/Subject';
import { ExternalMapService, GetDistanceRequest, DistanceRequestWrapper, WayModeEnum } from '../services/map/external-map.service';
import { MarkManagerService } from '../services/map/mark-manager.service';


@Injectable()
export class FriendsService {
  friendUpdate$: Subject<Array<Friend>> = new Subject<Array<Friend>>();

  constructor(private externalMapService: ExternalMapService,
    private markManagerService: MarkManagerService) {
    this.friendUpdate$.next(mockListFriend);

  }



  // Observable string sources
  private friendsP = new Subject<Friend>();

  // Observable string streams
  friends$: Observable<Friend> = this.friendsP.asObservable();

  // Service message commands
  addFriend(mission: Friend) {
    this.friendsP.next(mission);
  }

  getFriendsByGroup(id: number): Observable<Array<Friend>> {
    return Observable.of<Friend[]>(mockListFriend);
  }

  getAllFriends(): Observable<Array<Friend>> {
    let source = Observable.create(observer => {
      observer.next(mockListFriend);
    });
    return source;
  }
  updateFriend(friend: Friend): void {
    var index = 0;
    for (var item of mockListFriend) {
      if (item.id == friend.id)
        mockListFriend[index] = friend;
      ++index;
    }
    this.friendUpdate$.next(mockListFriend);
  }
  deleteFriend(friend: Friend): void {
    var index = mockListFriend.indexOf(friend, 0);
    if (index > -1) {
      mockListFriend.splice(index, 1);
    }
    this.friendUpdate$.next(mockListFriend);
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
  updateDistanceAllFriends(): void {
    if (this.markManagerService.hasMe) {
      var getDistance = new GetDistanceRequest();
      getDistance.origin = this.markManagerService.me.position;
      this.markManagerService.marksFriends.forEach(x => {
        var newItem = new DistanceRequestWrapper(x.markId, x.mark.position);
        getDistance.destination.push(newItem);
      });
      this.externalMapService.getDistance(getDistance, WayModeEnum.driving)
        .subscribe(x => {
          x.destination.forEach(x => {
            mockListFriend.forEach(s => {
              if (s.id == x.id) {
                s.distanceToMe = x.distance;
              }
            });
          });
          this.friendUpdate$.next(mockListFriend);
        });
    }
  }
}
export class WrapperInformationFriend {
  constructor(public friend: Friend) { }
}

var mockListFriend = new Array<Friend>();

mockListFriend.push(<Friend>{
  id: 1,
  email: "primero@gmail.com",
  name: "Nombre 1",
  lastName: "Apellido 1",
  displayName: "Display Name 1",
  groupId: 1,
  activate: true,
  drawWaytToMe: false
})
mockListFriend.push(<Friend>{
  id: 2,
  email: "segundo@gmail.com",
  name: "Nombre 2",
  lastName: "Apellido 1",
  displayName: "Display Name 2",
  groupId: 1,
  activate: false,
  drawWaytToMe: false
})
mockListFriend.push(<Friend>{
  id: 3,
  email: "tercero@gmail.com",
  name: "Nombre 3",
  lastName: "Apellido 1",
  displayName: "Display Name 3",
  groupId: 1,
  activate: true,
  drawWaytToMe: false
})
mockListFriend.push(<Friend>{
  id: 4,
  email: "cuarto@gmail.com",
  name: "Nombre 4",
  lastName: "Apellido 1",
  displayName: "Display Name 4",
  groupId: 1,
  activate: true,
  drawWaytToMe: false
})
mockListFriend.push(<Friend>{
  id: 5,
  email: "quinto@gmail.com",
  name: "Nombre 5",
  lastName: "Apellido 1",
  displayName: "Display Name 5",
  groupId: 1,
  activate: true,
  drawWaytToMe: false
})
mockListFriend.push(<Friend>{
  id: 6,
  email: "sexto@gmail.com",
  name: "Nombre 6",
  lastName: "Apellido 1",
  displayName: "Display Name 6",
  groupId: 1,
  activate: true,
  drawWaytToMe: false
})
mockListFriend.push(<Friend>{
  id: 7,
  email: "septimo@gmail.com",
  name: "Nombre 7",
  lastName: "Apellido 1",
  displayName: "Display Name 7",
  groupId: 1,
  activate: true,
  drawWaytToMe: false
})
mockListFriend.push(<Friend>{
  id: 8,
  email: "octavo@gmail.com",
  name: "Nombre 8",
  lastName: "Apellido 1",
  displayName: "Display Name 7",
  groupId: 1,
  activate: true,
  drawWaytToMe: false
})
mockListFriend.push(<Friend>{
  id: 9,
  email: "noveno@gmail.com",
  name: "Nombre 9",
  lastName: "Apellido 1",
  displayName: "Display Name 7",
  groupId: 1,
  activate: true,
  drawWaytToMe: false
})
mockListFriend.push(<Friend>{
  id: 10,
  email: "decimo@gmail.com",
  name: "Nombre 10",
  lastName: "Apellido 1",
  displayName: "Display Name 7",
  groupId: 1,
  activate: true,
  drawWaytToMe: false
})