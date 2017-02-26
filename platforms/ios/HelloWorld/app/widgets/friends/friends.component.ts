import { Component, Input, OnInit } from '@angular/core';
import { FriendsService } from '../../shared/friends/friends.service';
import { Friend } from '../../shared/friends/friend';
import listViewModule = require("ui/list-view");
import observableArray = require("data/observable-array");
import labelModule = require("ui/label");

@Component({
  selector: "friends",
  templateUrl: "widgets/friends/friends.html",
  styleUrls: ["widgets/friends/friends-common.css", "widgets/friends/friends.css"],
  providers: [FriendsService]
})
export class FriendsComponent implements OnInit {
  classMap = { 'friend-enable': true, 'friend-disable': false };
  selected: Friend = new Friend();
  public myItems: Array<Friend>;
  private counter: number;
  constructor(private friendService: FriendsService) {

  }
  public getColorItem(friend: Friend): string {
    if (friend.activate)
      return "friend-enable";
    else
      return "friend-disable";
  }

  public onItemTap(args) {
    this.selected = this.myItems[args.index];

  }
  listViewItemTap(args) {
    var itemIndex = args.index;
  }


  ngOnInit() {
    this.friendService.getAllFriends().subscribe(x => {
      this.myItems = new Array<Friend>();
      x.forEach(s => {
        this.myItems.push(s);
      });
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

}