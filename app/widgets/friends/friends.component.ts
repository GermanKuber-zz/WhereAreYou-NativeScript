import { Component, Input, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FriendsService } from '../../shared/friends/friends.service';
import { Friend } from '../../shared/friends/friend';
import { ListView } from 'ui/list-view';
import listViewModule = require("ui/list-view");

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
  @ViewChild("listView") listView: ElementRef;

  constructor(private friendService: FriendsService) {

  }
  public getColorItem(friend: Friend): string {
    if (friend.activate)
      return "friend-enable";
    else
      return "friend-disable";
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
  }
}