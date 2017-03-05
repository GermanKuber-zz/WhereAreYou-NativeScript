import { Component, Input, OnInit } from '@angular/core';
import { FriendsService } from '../../shared/friends/friends.service';
import { Friend } from '../../shared/friends/friend';
import activityIndicatorModule = require("ui/activity-indicator");

@Component({
  selector: "friends-add",
  templateUrl: "widgets/friends-add/friends-add.html",
  styleUrls: ["widgets/friends-add/friends-add-common.css",
    "widgets/friends-add/friends-add.css"]
})
export class FriendsAddComponent implements OnInit {
  public email: string;
  public isLoading: boolean = false;
  public doesNotFound: boolean = true;
  public friendPreview: Friend;
  public friendFound: boolean = false;
  public isAdded: boolean = false;
  public addFriendError: boolean = false;
  constructor(private friendService: FriendsService) {

  }
  ngOnInit() {
  }

  //Public Methods
  public searchFriend(): void {
    this.isLoading = true;
    this.friendService.getFriendByIEmail(this.email)
      .subscribe(f => {
        this.friendPreview = f;
        this.isLoading = false;
        this.doesNotFound = true;
        this.friendFound = true;
      },
      e => {
        this.friendPreview = null;
        this.doesNotFound = false;
        this.isLoading = false;
        this.friendFound = false;
      });
  }
  public addFriend(): void {
    this.friendService.addFriend(this.friendPreview)
      .subscribe(f => {
        this.isAdded = f;
        if (!f)
          this.addFriendError = true;
      },
      e => {
        this.addFriendError = true;
      });

  }
}