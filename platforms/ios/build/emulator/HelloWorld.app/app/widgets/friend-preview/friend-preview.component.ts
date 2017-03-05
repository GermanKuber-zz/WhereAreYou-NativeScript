import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { FriendsService } from '../../shared/friends/friends.service';
import { Friend } from '../../shared/friends/friend';
import activityIndicatorModule = require("ui/activity-indicator");

@Component({
  selector: "friend-preview",
  templateUrl: "widgets/friend-preview/friend-preview.html",
  styleUrls: ["widgets/friend-preview/friend-preview-common.css",
    "widgets/friend-preview/friend-preview.css"]
})
export class FriendPreviewComponent implements OnInit {

  @Input() friend: Friend;


  constructor(private friendService: FriendsService) {

  }
  ngOnInit() {
   
  }

  //Public Methods
  public addFriend(): void {

  }
}