import { Component, Input, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FriendsService } from '../../shared/friends/friends.service';
import { Friend } from '../../shared/friends/friend';
import { ListView } from 'ui/list-view';
import { ListViewEventData, RadListView } from 'Nativescript-telerik-ui/listview/index';
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


  }
  public addFriend() {
    var a = this.inviteFriend;
  }
  public getColorItem(friend: Friend): string {
    if (friend != null && friend.activate)
      return "friend-enable";
    else
      return "friend-disable";
  }
  public onSwipeCellStarted(args: ListViewEventData) {
    var swipeLimits = args.data.swipeLimits;
    var swipeView = args['object'];
    var leftItem = swipeView.getViewById('mark-view');
    var rightItem = swipeView.getViewById('delete-view');
    swipeLimits.left = leftItem.getMeasuredWidth();
    swipeLimits.right = rightItem.getMeasuredWidth();
    swipeLimits.threshold = leftItem.getMeasuredWidth() / 2;
  }

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

  public onRightSwipeClick(args) {
    var removeFriend = <Friend>args.object.bindingContext;
    this.friendService.deleteFriend(removeFriend);
  }

  public onItemTap(args) {
    let listView: ListView = this.listView.nativeElement;
    var itemSelected = <Friend>this.myFriends[args.index];
    for (var item of this.myFriends)
      if (item.id == itemSelected.id)
        item.activate = !item.activate;

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