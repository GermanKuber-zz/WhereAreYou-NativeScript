import { Component, ViewChild, AfterViewInit, OnInit } from '@angular/core';
import { registerElement } from 'nativescript-angular/element-registry';
import { MapView, Marker, Polyline, Position } from 'nativescript-google-maps-sdk';
import sideDrawerModule = require('nativescript-telerik-ui/sidedrawer');
import { RadSideDrawerComponent, SideDrawerType } from 'nativescript-telerik-ui/sidedrawer/angular';
import { FriendsLiveService } from '../../shared/friends/friends-lives.service';
import { Observable } from '../../../platforms/ios/build/emulator/HelloWorld.app/app/tns_modules/rxjs/src/Observable';
import { FriendPosition, Friend } from '../../shared/friends/friend';
import { MapViewService, AddMarkerArgs } from '../../shared/services/map/map-view.service';
import { FriendsService } from '../../shared/friends/friends.service';


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
  private friendsList: Array<Friend>;

  constructor(private friendsService: FriendsService,
    private friendsLiveService: FriendsLiveService,

    private mapViewService: MapViewService) {
    // this.friends = new Array<FriendPosition>();
  }

  onMapReady(event) {
    if (!event.object) return;
    this.mapViewService.onMapReady(event, () => this.mapReadyNotify());

  }
  private mapReadyNotify() {
    this.friendsList = new Array<Friend>();

    this.getFriends();
    this.subscribeFriendLocationUpdate();
    this.friendsService.getAllFriends().subscribe(x => {
      x.forEach(s => {
        if (!s.activate) {
          //si el amigo esta desactivado lo elimino

        }
      });
    });
  }
  ngOnInit() {

  }

  private updateFriendLocation(friend: FriendPosition): void {
    var newMarkFriend = this.createMark(friend);
    if (newMarkFriend != null)
      this.mapViewService.updateCommonMark(newMarkFriend[0], newMarkFriend[1].id);
  }
  private subscribeFriendLocationUpdate() {
    //Me suscribo al metodo de actualizacion para obtener actualizacion de ubicacion de mis amigos
    this.friendsLiveService.getFriendsLocations().subscribe(f=>{
      this.updateFriendLocation(f); 
    });

  }
  private getFriends(): void {
    //Obtengo todos los amigos conectados por grupo y los dibujo en el mapa
    this.friendsLiveService.getFriendsByGroup(1).subscribe(friendsPosition => {
      for (var item of friendsPosition) {
        var newMarkFriend = this.createMark(item);
        if (newMarkFriend != null)
          this.mapViewService.addCommonMark(newMarkFriend[0], newMarkFriend[1].id);
      }
    });
  }

  private createMark(position: FriendPosition): [AddMarkerArgs, Friend] {
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


