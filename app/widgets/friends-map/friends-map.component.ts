import { Component, ViewChild, AfterViewInit, OnInit } from '@angular/core';
import { registerElement } from 'nativescript-angular/element-registry';
import { MapView, Marker, Polyline, Position } from 'nativescript-google-maps-sdk';
import sideDrawerModule = require('nativescript-telerik-ui/sidedrawer');
import { RadSideDrawerComponent, SideDrawerType } from 'nativescript-telerik-ui/sidedrawer/angular';
import { FriendsLiveService } from '../../shared/friends/friends-lives.service';
import { FriendsService } from '../../shared/friends/friends.service';
import { Observable } from '../../../platforms/ios/build/emulator/HelloWorld.app/app/tns_modules/rxjs/src/Observable';
import { FriendPosition } from '../../shared/friends/friend';
import { MapViewService } from '../../shared/services/map/map-view.service';

registerElement('MapView', () => MapView);

@Component({
  selector: "friends-map",
  templateUrl: "widgets/friends-map/friends-map.html",
  styleUrls: ["widgets/friends-map/friends-map-common.css", "widgets/friends-map/friends-map.css"],
  providers: [FriendsLiveService, FriendsService, MapViewService]
})
export class FriendsMapComponent implements OnInit {
  //#Mapa 
  mapView: MapView = null;
  watchId: number = null;
  gpsLine: Polyline;
  tapLine: Polyline;
  tapMarker: any;
  gpsMarker: any;
  centeredOnLocation: boolean = false;
  //#Amigos
  public friends: Array<FriendPosition>;


  constructor(private friendsLiveService: FriendsLiveService,
    private mapViewService: MapViewService) {
    this.friends = new Array<FriendPosition>();
  }


  ngOnInit() {
    this.mapViewService.setMapView(this.mapView);

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

