import { Injectable } from "@angular/core";
import { Observable } from "rxjs/Rx";
import "rxjs/add/operator/do";
import "rxjs/add/operator/map";

import { FriendPosition } from './friend';

@Injectable()
export class FriendsLiveService {
  private mockListFriend = new Array<FriendPosition>();
  constructor() {
    this.mockListFriend.push(<FriendPosition>{
      id: 1,
      latitude: 37.33233141,
      longitude: -122.0312186
    })
    this.mockListFriend.push(<FriendPosition>{
      id: 2,
      latitude: 37.33253141,
      longitude: -122.0312186
    })
    this.mockListFriend.push(<FriendPosition>{
      id: 3,
      latitude: 37.33263121,
      longitude: -122.0315187
    })
  }

  getFriendsByGroup(idGroup: number): Observable<Array<FriendPosition>> {
    return Observable.of<FriendPosition[]>(this.mockListFriend);
  }
  getFriendsLocations(): Observable<FriendPosition> {
    //TODO: Meotodo que debo remplazar con el comportamiento de SignalR
    let source = Observable.create(observer => {
      this.autoCall(observer);
    });
    return source;

  }
  private autoCall(observer) {
    setTimeout(() => {
      var friend = this.generateRanonMove();
      observer.next(friend);;
      this.autoCall(observer);
    }, 2000);
  }
  //TODO: Metodo mock donde simulto el movimiento de un amigo Demo eliminar
  private generateRanonMove(): FriendPosition {
    var friend = this.mockListFriend[this.getRandomInt(0, 3)]
    var test = (Math.random() * (0.00002000 - 0.00055120) + 0.00055120).toFixed(4);
    var test2 = (Math.random() * (0.00004000 - 0.00079120) + 0.00079120).toFixed(4);
    friend.latitude = friend.latitude + +test;
    friend.longitude = friend.longitude + +test2;
    return friend;
  }


  handleErrors(error: Response) {
    console.log(JSON.stringify(error.json()));
    return Observable.throw(error);
  }
  private getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
  }
}
