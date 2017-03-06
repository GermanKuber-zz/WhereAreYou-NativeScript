import { Injectable } from "@angular/core";
import { Observable } from 'rxjs/Observable';
import "rxjs/add/operator/do";
import "rxjs/add/operator/map";
import { Observer } from 'rxjs/src/Observer';
import * as Rx from 'rxjs/Rx';

import { MobileServiceClient } from "nativescript-azure-mobile-apps/client";
var client = new MobileServiceClient("http://word-memory.azurewebsites.net");

import firebase = require("nativescript-plugin-firebase");

@Injectable()
export class RemoteRepositoryService {

  constructor() {

    firebase.login({ type: firebase.LoginType.ANONYMOUS })
      .then(x => {
        var a = x;
      }).catch(e => {
      });
  }
  update<T>(type: RemoteRepoType, value: T) {
    firebase.update(
      `/${type}`,
      value
    ).then(x => { });
  }
  add<T>(type: RemoteRepoType, value: T) {
    firebase.push(`/${type}`, value);
  }
  getById<T>(type: RemoteRepoType, id: string) {
    var onQueryEvent = function (result) {
      if (!result.error) {
        var returnData = new Array<any>();
        for (var key in result.value) {
          var valueAdd = result.value[key];
          valueAdd.id = key;
          returnData.push(valueAdd)
        }
        return returnData;
      }
    };
    firebase.query(
      onQueryEvent,
      `/${type}`,
      {
        singleEvent: true,
        // order by company.country
        orderBy: {
          type: firebase.QueryOrderByType.CHILD,
          value: 'since' // mandatory when type is 'child'
        },
        range: {
          value: id,
          type: firebase.QueryRangeType.EQUAL_TO
        }
      }
    );
  }
  getAll<T>(type: RemoteRepoType) {
    var onQueryEvent = function (result) {
      if (!result.error) {
        var returnData = new Array<any>();
        for (var key in result.value) {
          var valueAdd = result.value[key];
          valueAdd.id = key;
          returnData.push(valueAdd)
        }
        return returnData;
      }
    };
    firebase.query(
      onQueryEvent,
      `/${type}`,
      {
        singleEvent: true,
        // order by company.country
        orderBy: {
          type: firebase.QueryOrderByType.CHILD,
          value: 'since' // mandatory when type is 'child'
        }
      }
    );
  }
}


export class RemoteRepoType {
  static users = "Users";
  static friend = "Friends";
  static invitation = "Invitation";
  static messages = "Messages";
}