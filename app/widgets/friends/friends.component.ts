import { Component, Input, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FriendsService } from '../../shared/friends/friends.service';
import { Friend } from '../../shared/friends/friend';
import { ListView } from 'ui/list-view';
import { ListViewEventData, RadListView } from 'Nativescript-telerik-ui/listview/index';
import { ExternalMapService } from '../../shared/services/map/external-map.service';
import listViewModule = require("ui/list-view");
import frameModule = require("ui/frame");
import labelModule = require("ui/label");

@Component({
  selector: "friends",
  templateUrl: "widgets/friends/friends.html",
  styleUrls: ["widgets/friends/friends-common.css", "widgets/friends/friends.css"]
})
export class FriendsComponent implements OnInit {
  selected: Friend = new Friend();
  public myFriends: Array<Friend>;
  private counter: number;
  public inviteFriend: string;
  // @ViewChild("listView") listView: ElementRef;
  @ViewChild("listView") listView: ElementRef;

  constructor(private friendService: FriendsService) {
    this.updateFriedDistance();
  }

  private updateFriedDistance() {
    setTimeout(() => {
      this.friendService.updateDistanceAllFriends();
    }, 5000);
  }
  public getColorItem(friend: Friend): string {
    if (friend != null && friend.activate) {
      if (friend.drawWaytToMe)
        return "friend-follow ";
      else
        return "friend-enable";
    }
    else
      return "friend-disable";
  }
  public onSwipeCellStarted(args: ListViewEventData) {
    var swipeLimits = args.data.swipeLimits;
    var swipeView = args['object'];
    var leftItem = swipeView.getViewById('mark-view');
    var rightItem = swipeView.getViewById('config-view');
    swipeLimits.left = leftItem.getMeasuredWidth();
    swipeLimits.right = rightItem.getMeasuredWidth();
    swipeLimits.threshold = leftItem.getMeasuredWidth() / 2;
    this.swipeLimits = swipeLimits;
  }
  private swipeLimits;
  public onSwipeCellFinished(args: ListViewEventData) {
    if (args.data.x > 200) {
      console.log("Perform left action");
    } else if (args.data.x < -200) {
      console.log("Perform right action");
    }
  }
  public onCellSwiping(args: ListViewEventData) {
    var swipeLimits = args.data.swipeLimits;
    var currentItemView = args.object;
    var currentView;

    if (args.data.x > 200) {
      console.log("Notify perform left action");
    } else if (args.data.x < -200) {
      console.log("Notify perform right action");
    }
  }


  public onItemSelected(args: ListViewEventData) {
    var listView = <RadListView>frameModule.topmost().currentPage.getViewById("listView");
    listView.notifySwipeToExecuteFinished();
    var itemSelected = <Friend>this.myFriends[args.itemIndex];
    for (var item of this.myFriends)
      if (item.id == itemSelected.id)
        item.activate = !item.activate;

    this.friendService.updateFriend(itemSelected);
    listView.refresh();
  }

  public onLeftSwipeClick(args) {
    console.log("Left swipe click");
  }

  public wayToMe(args) {
    var updateFriend = <Friend>args.object.bindingContext;
    updateFriend.drawWaytToMe = true;
    this.friendService.updateFriend(updateFriend);
  }
  public disableWayToMe(args) {
    var updateFriend = <Friend>args.object.bindingContext;
    updateFriend.drawWaytToMe = false;
    this.friendService.updateFriend(updateFriend);
  }

  public onItemTap(args) {
    let listView: ListView = this.listView.nativeElement;
    var itemSelected = <Friend>this.myFriends[args.index];
    for (var item of this.myFriends)
      if (item.id == itemSelected.id) {
        //TODO: Se debe agregar un boton especial para activar el seuimiento
        item.activate = !item.activate;
      }

    this.friendService.updateFriend(itemSelected);
    listView.refresh();
  }
  listViewItemTap(args) {
    var itemIndex = args.index;
  }


  ngOnInit() {
    this.myFriends = new Array<Friend>();
    this.friendService.getAllFriends().subscribe(x => {
      this.myFriends = x;
    });
    this.friendService.friendUpdate$.subscribe(x => {
      this.myFriends = x;
    });
  }
}