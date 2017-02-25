import { Component, ViewChild, AfterViewInit, OnInit } from '@angular/core';
import { registerElement } from 'nativescript-angular/element-registry';
let geolocation = require('nativescript-geolocation');
import { MapView, Marker, Polyline, Position } from 'nativescript-google-maps-sdk';
import sideDrawerModule = require('nativescript-telerik-ui/sidedrawer');
var style = require('./map-style.json');
import { Color } from 'color';
import { RadSideDrawerComponent, SideDrawerType } from 'nativescript-telerik-ui/sidedrawer/angular';
import { FriendsLiveService } from '../../shared/friends/friends-lives.service';
import { FriendsService } from '../../shared/friends/friends.service';
import { Observable } from '../../../platforms/ios/build/emulator/HelloWorld.app/app/tns_modules/rxjs/src/Observable';
import { FriendPosition } from '../../shared/friends/friend';

console.log('Registering MapView');
registerElement('MapView', () => MapView);

@Component({
  selector: "friends-map",
  templateUrl: "widgets/friends-map/friends-map.html",
  styleUrls: ["widgets/friends-map/friends-map-common.css", "widgets/friends-map/friends-map.css"],
  providers: [FriendsLiveService, FriendsService]
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


  constructor(private friendsLiveService: FriendsLiveService) {

    this.friends = new Array<FriendPosition>();
  }


  ngOnInit() {

    if (!geolocation.isEnabled()) {
      geolocation.enableLocationRequest();
    }
    this.friendsLiveService.getFriendsByGroup(1).subscribe(x => {
      for (var item of x) {
        this.friends.push(item);
        this.removeMarker(this.tapMarker);

        var mark = new AddMarkerArgs();
        mark.title = "Primeroo";
        mark.location = new Position();
        mark.location.latitude = item.latitude;
        mark.location.longitude = item.longitude;
        this.tapMarker = this.addMarker(mark);
      }

    });
    // this.groceryListService.load()
    // .subscribe(loadedGroceries => {
    //   loadedGroceries.forEach((groceryObject) => {
    //     this.groceryList.unshift(groceryObject);
    //   });
    //   this.isLoading = false;
    //   this.listLoaded = true;
    // });
  }

  @ViewChild(RadSideDrawerComponent) public drawerComponent: RadSideDrawerComponent;
  private drawer: SideDrawerType;


  openDrawer() {
    this.drawer.showDrawer();
  }

  closeDrawer() {
    this.drawer.closeDrawer();
  }
  enableLocation() {
    if (!geolocation.isEnabled()) {
      console.log('Location not enabled, requesting.');
      return geolocation.enableLocationRequest();
    } else {
      return Promise.resolve(true);
    }
  }

  getLocation() {
    if (geolocation.isEnabled()) {
      var location = geolocation.getCurrentLocation({
        desiredAccuracy: 10,
        updateDistance: 10,
        minimumUpdateTime: 1000,
        maximumAge: 10000
      })
      return location;
    }
    return Promise.reject('Geolocation not enabled.');
  }

  //Map events
  onMapReady(event) {
    console.log('Map Ready');
    if (this.mapView || !event.object) return;

    this.mapView = event.object;

    this.mapView.setStyle(style);

    // this.mapView.markerSelect = this.onMarkerSelect;
    // this.mapView.cameraChanged = this.onCameraChanged;

    this.enableLocation()
      .then(() => {
        var location = this.getLocation();
      })
      .then(() => {
        this.watchId = geolocation.watchLocation(this.locationReceived, this.error, {
          desiredAccuracy: 10,
          updateDistance: 10,
          minimumUpdateTime: 10000,
          maximumAge: 60000
        });
      }, this.error);
  };

  mapTapped = (event) => {
    console.log('Map Tapped');

    this.tapLine = this.addPointToLine({
      color: new Color('Red'),
      line: this.tapLine,
      location: event.position,
      geodesic: true,
      width: 10
    });

    this.removeMarker(this.tapMarker);
    this.tapMarker = this.addMarker({
      location: event.position,
      title: 'Tap Location'
    });
  };

  locationReceived = (position: Position) => {
    console.log('GPS Update Received');

    if (this.mapView && position) {
      this.mapView.latitude = position.latitude;
      this.mapView.longitude = position.longitude;
      this.mapView.zoom = 16;
      this.centeredOnLocation = true;
    }

    // this.gpsLine = this.addPointToLine({
    //   color: new Color('Green'),
    //   line: this.gpsLine,
    //   location: position,
    //   geodesic: true,
    //   width: 10
    // });

    this.removeMarker(this.gpsMarker);
    this.gpsMarker = this.addMarker({
      location: position,
      title: 'GPS Location'
    });
  };

  addPointToLine(args: AddLineArgs) {
    if (!this.mapView || !args || !args.location) return;

    let line = args.line;

    if (!line) {
      line = new Polyline();
      line.visible = true;
      line.width = args.width || 10;
      line.color = args.color || new Color('Red');
      line.geodesic = args.geodesic != undefined ? args.geodesic : true;
      this.mapView.addPolyline(line);
    }
    line.addPoint(Position.positionFromLatLng(args.location.latitude, args.location.longitude));

    return line;
  }

  addMarker(args: AddMarkerArgs) {
    if (!this.mapView || !args || !args.location) return;

    let marker = new Marker();
    marker.position = Position.positionFromLatLng(args.location.latitude, args.location.longitude);
    marker.title = args.title;
    marker.snippet = args.title;
    this.mapView.addMarker(marker);

    return marker;
  };

  clearGpsLine() {
    this.removeLine(this.gpsLine);
    this.gpsLine = null;
    this.closeDrawer();
  };

  clearTapLine() {
    this.removeLine(this.tapLine);
    this.tapLine = null;
    this.removeMarker(this.tapMarker);
    this.tapMarker = null;
    this.closeDrawer();
  }

  removeLine(line: Polyline) {
    if (line) {
      line.removeAllPoints();
    }
  }

  removeMarker(marker: Marker) {
    if (this.mapView && marker) {
      this.mapView.removeMarker(marker);
    }
  }

  error(err) {
    console.log('Error: ' + JSON.stringify(err));
  }

  onMarkerSelect(event) {
    console.log('Clicked on ' + event.marker.title);
  }

  onCameraChanged(event) {
    console.log('Camera changed: ' + JSON.stringify(event.camera));
  }

}

export class AddLineArgs {
  public color: Color;
  public line: Polyline;
  public location: Position;
  public geodesic: boolean;
  public width: number;
}

export class AddMarkerArgs {
  public location: Position;
  public title: string;
}