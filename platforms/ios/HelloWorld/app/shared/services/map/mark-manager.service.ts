import { Injectable } from "@angular/core";
import { Observable } from "rxjs/Rx";
import "rxjs/add/operator/do";
import "rxjs/add/operator/map";
import 'rxjs/add/operator/catch';
import { MarkContainer, MarkWrapperTypeEnum, AddMarkerArgs, MarkWrapper } from './core/MarkContainer';
import { List } from 'linqts';
import { Marker, Position } from 'nativescript-google-maps-sdk';
import { Friend } from '../../friends/friend';

@Injectable()
export class MarkManagerService {
    private meId: number = -99999999;
    private markFriendsList: List<MarkContainer> = new List<MarkContainer>();
    private _me: MarkContainer;
    get me(): Marker {
        if (this._me != null)
            return this._me.mark;
        else
            return null;
    }
    get hasMe(): boolean {
        if (this._me != null)
            return true;
        else
            return false;
    }
    get marksFriends(): MarkWrapper[] {
        var returnData = new Array<MarkWrapper>();
        this.markFriendsList.ForEach(x => {
            returnData.push(x.markwrapper);
        });
        return returnData;

    }



    //Public Methods
    public getMarkContainer(markId: number): MarkContainer {
        return this.markFriendsList.Where(x => x.markId == markId).FirstOrDefault();
    }
    public addFriendMark(markInfo: AddMarkerArgs, markId: number): MarkContainer {
        if (!this.markFriendsList.Any(x => x.markId == markId)) {
            var markContainer = new MarkContainer(markInfo, markId, MarkWrapperTypeEnum.Friend);
            this.markFriendsList.Add(markContainer);
            return markContainer;
        } else {
            throw new Error("Esta intentando agregar una Mark con un Id repetido");
        }
    }
    public addMeMark(lat: number, long: number): MarkContainer {
        var markInfo = new AddMarkerArgs();
        markInfo.title = "Principal";
        markInfo.location = Position.positionFromLatLng(lat, long);
        this._me = new MarkContainer(markInfo, this.meId, MarkWrapperTypeEnum.Me);
        return this._me;
    }
    public updateMark(markInfo: AddMarkerArgs, markId: number): MarkContainer {
        var markContainer = this.getMarkContainer(markId);
        if (markContainer != null) {
            markContainer.mark.position = markInfo.location;
        }
        return markContainer;
    }
    public removeFriendMark(markId: number): MarkContainer {
        var markContainer = this.markFriendsList.Where(x => x.markId == markId).FirstOrDefault();
        if (markContainer != null) {
            this.markFriendsList.Remove(markContainer);
        }
        return markContainer;
    }
    public enableDrawWayToMe(markId: number): void {
        var markContainer = this.markFriendsList.Where(x => x.markId == markId).FirstOrDefault();
        if (markContainer != null) {
            markContainer.addMarkDrawWay(this._me.markwrapper)
        }
    }
    public disableDrawWayToMe(markId: number): void {
        var markContainer = this.markFriendsList.Where(x => x.markId == markId).FirstOrDefault();
        if (markContainer != null) {
            markContainer.removeMarkDrawWay(this._me.markwrapper)
        }
    }
    public moveMe(lat: number, long: number): void {
        this._me.mark.position.latitude = lat;
        this._me.mark.position.longitude = long;
    }
}