import { Component, ElementRef, OnInit, ViewChild } from "@angular/core";
// import * as SocialShare from "nativescript-social-share";
// import { Grocery } from "../../shared/grocery/grocery";
// import { GroceryListService } from "../../shared/grocery/grocery-list.service";
import { TextField } from "ui/text-field";
import { FriendsService } from '../../shared/friends/friends.service';
import { Friend } from '../../shared/friends/friend';
import frames = require("ui/frame");
import tabViewModule = require("ui/tab-view");
@Component({
  selector: "dashboard",
  templateUrl: "pages/dashboard/dashboard.html",
  styleUrls: ["pages/dashboard/dashboard-common.css", "pages/dashboard/dashboard.css"],
  providers: []
})
export class DashboardComponent implements OnInit {
  public friends: Array<Friend> = new Array<Friend>();
  ngOnInit(): void {
    this.friendService.getAllFriends().subscribe(f => {
      this.friends = f;
    });
  }

  constructor(private friendService: FriendsService) {

  }

}