import { Injectable } from "@angular/core";
import { Observable } from "rxjs/Rx";
import "rxjs/add/operator/do";
import "rxjs/add/operator/map";
import 'rxjs/add/operator/catch';
import { MarkContainer, MarkWrapperTypeEnum, AddMarkerArgs } from './core/MarkContainer';
import { List } from 'linqts';
import { Marker, Position } from 'nativescript-google-maps-sdk';

@Injectable()
export class MarkManagerService {
    private meId: number = -99999999;
    private markList: List<MarkContainer> = new List<MarkContainer>();
    private _me: MarkContainer;
    get me(): Marker {
        return this._me.mark;
    }
    //Public Methods
    public getMarkWrapper(markId: number): MarkContainer {
        return this.markList.Where(x => x.markId == markId).FirstOrDefault();
    }
    public addFriendMark(markInfo: AddMarkerArgs, markId: number) {
        if (!this.markList.Any(x => x.markId == markId)) {
            var markContainer = new MarkContainer(markInfo, markId, MarkWrapperTypeEnum.Friend);
            this.markList.Add(markContainer);
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
    public updateMark(markInfo: AddMarkerArgs, markId: number): void {
        var markWrapper = this.getMarkWrapper(markId);
        if (markWrapper != null) {
            markWrapper.mark.position = markInfo.location;
        }
    }
    public removeMark(markId: number): void {
        var markContainer = this.markList.Where(x => x.markId == markId).FirstOrDefault();
        if (markContainer != null) {
            this.markList.Remove(markContainer);
        }
    }
    public moveMe(lat: number, long: number): void {
        this._me.mark.position.latitude = lat;
        this._me.mark.position.longitude = long;
    }
}