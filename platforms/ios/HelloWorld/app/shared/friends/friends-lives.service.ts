import { Injectable } from "@angular/core";
import { Observable } from "rxjs/Rx";
import "rxjs/add/operator/do";
import "rxjs/add/operator/map";

import { FriendPosition } from './friend';
import { Config } from "../config";

@Injectable()
export class FriendsLiveService {
  constructor() { }

  getFriendsByGroup(idGroup: number): Observable<Array<FriendPosition>> {
    return Observable.of<FriendPosition[]>(mockListFriend);
  }

  handleErrors(error: Response) {
    console.log(JSON.stringify(error.json()));
    return Observable.throw(error);
  }
}


var mockListFriend = new Array<FriendPosition>();

mockListFriend.push(<FriendPosition>{
  id: 1,
  latitude: 37.35322775,
  longitude: -122.10761167
})