import { Component, ViewChild, AfterViewInit, OnInit } from '@angular/core';
import { registerElement } from 'nativescript-angular/element-registry';
import { MapView, Marker, Polyline, Position } from 'nativescript-google-maps-sdk';
import sideDrawerModule = require('nativescript-telerik-ui/sidedrawer');
import { RadSideDrawerComponent, SideDrawerType } from 'nativescript-telerik-ui/sidedrawer/angular';
import { FriendsLiveService } from '../../shared/friends/friends-lives.service';
import { Observable } from '../../../platforms/ios/build/emulator/HelloWorld.app/app/tns_modules/rxjs/src/Observable';
import { FriendPosition, Friend } from '../../shared/friends/friend';
import { MapViewService } from '../../shared/services/map/map-view.service';
import { FriendsService } from '../../shared/friends/friends.service';
import { AddMarkerArgs } from '../../shared/services/map/core/MarkContainer';
import { List } from 'linqts';


registerElement('MapView', () => MapView);

@Component({
  selector: "friends-map",
  templateUrl: "widgets/friends-map/friends-map.html",
  styleUrls: ["widgets/friends-map/friends-map-common.css", "widgets/friends-map/friends-map.css"],
  providers: [FriendsLiveService, MapViewService]
})
export class FriendsMapComponent implements OnInit {
  //#Amigos
  // public friends: Array<FriendPosition>;
  private myFriends: List<Friend> = new List<Friend>();;

  constructor(private friendsService: FriendsService,
    private friendsLiveService: FriendsLiveService,
    private mapViewService: MapViewService) {

  }
  //Events
  ngOnInit() {
    this.friendsService.friendUpdate$.subscribe(f => {
      this.addAllFriends(f);
    });
    this.friendsService.getAllFriends().subscribe(f => {
      this.addAllFriends(f);
    });
  }

  //Map Events
  onMapReady(event) {
    if (!event.object) return;
    this.mapViewService.onMapReady(event, () => this.mapReadyNotify());

  }
  mapTapped(event) {
    this.mapViewService.mapTapped(event);
  }
  //Private Methods
  private mapReadyNotify() {

    // this.getFriendsPositions();
    this.subscribeFriendLocationUpdate();
  }
  private addAllFriends(friends: Array<Friend>) {
    this.myFriends = new List<Friend>();
    for (var item of friends) {
      this.myFriends.Add(item);
      if (item.drawWaytToMe) {
        this.mapViewService.enableDrawWayToMe(item.id);
      } else {
        this.mapViewService.disableDrawWayToMe(item.id);
      }
    }
  }

  private updateFriendLocation(friend: FriendPosition): void {
    var newMarkFriend = this.createMarkerArgs(friend);
    if (newMarkFriend != null)
      this.mapViewService.updateFriendMark(newMarkFriend[0], newMarkFriend[1].id);
    else
      this.mapViewService.removeFriendMark(friend.id);
  }
  private subscribeFriendLocationUpdate() {
    //Me suscribo al metodo de actualizacion para obtener actualizacion de ubicacion de mis amigos
    this.friendsLiveService.getFriendsLocations().subscribe(f => {
      this.updateFriendLocation(f);
    });
  }


  private createMarkerArgs(position: FriendPosition): [AddMarkerArgs, Friend] {
    var mark = new AddMarkerArgs();
    var friend = this.friendsService.getFriendById(position.id);
    if (friend != null && friend.activate) {
      mark.title = friend.displayName;
      mark.location = new Position();
      mark.location.latitude = position.latitude;
      mark.location.longitude = position.longitude;
      return [mark, friend];
    } else {
      return null;
    }

  }
  // @ViewChild(RadSideDrawerComponent) public drawerComponent: RadSideDrawerComponent;
  // private drawer: SideDrawerType;


  // openDrawer() {
  //   this.drawer.showDrawer();
  // }

  // closeDrawer() {
  //   this.drawer.closeDrawer();
  // }

}


