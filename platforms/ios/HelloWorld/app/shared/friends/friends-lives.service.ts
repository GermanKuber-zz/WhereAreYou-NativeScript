import { Injectable } from "@angular/core";
import { Observable } from "rxjs/Rx";
import "rxjs/add/operator/do";
import "rxjs/add/operator/map";

import { FriendPosition } from './friend';
import { Config } from "../config";

@Injectable()
export class FriendsLiveService {
  private mockListFriend = new Array<FriendPosition>();
  constructor() {
    this.mockListFriend.push(<FriendPosition>{
      id: 1,
      latitude: 37.93233120,
      longitude: -122.0312120
    })
    this.mockListFriend.push(<FriendPosition>{
      id: 2,
      latitude: 37.53233120,
      longitude: -122.1312120
    })
    this.mockListFriend.push(<FriendPosition>{
      id: 3,
      latitude: 38.13233120,
      longitude: -123.0312120
    })
  }

  getFriendsByGroup(idGroup: number): Observable<Array<FriendPosition>> {
    return Observable.of<FriendPosition[]>(mockListFriend);
  }
  updateFriendLocation(callback: (FriendPosition) => void): void {
    //TODO: Meotodo que debo remplazar con el comportamiento de SignalR
    setTimeout(() => {
      this.generateRanonMove(callback);
      this.updateFriendLocation(callback);
    }, 3000);
  }

  //TODO: Metodo mock donde simulto el movimiento de un amigo Demo eliminar
  private generateRanonMove(callback: (FriendPosition) => void): void {
    var friend = this.mockListFriend[this.getRandomInt(0, 2)]
    friend.latitude = friend.latitude + 0.08233120
    friend.longitude = friend.longitude + 0.04233120
    callback(friend);

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


var mockListFriend = new Array<FriendPosition>();

