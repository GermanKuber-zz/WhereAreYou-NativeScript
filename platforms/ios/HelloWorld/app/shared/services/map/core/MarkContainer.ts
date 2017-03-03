import { Color } from 'color';
import { Polyline, Marker, Position } from 'nativescript-google-maps-sdk';
import { Image } from "ui/image";
import { List } from 'linqts';
export class AddLineArgs {
    public color: Color;
    public line: Polyline;
    public location: Position;
    public geodesic: boolean;
    public width: number;
}

export class AddMarkerArgs {
    public location: Position;
    public title: string;
}

export class MarkWrapper {
    markId: number;
    constructor(public mark: Marker, private markType: MarkWrapperTypeEnum) { }

}
export class MarkContainer {
    private markDrawWayList: List<MarkWrapper> = new List<MarkWrapper>();
    private enableDraw: boolean = false;
    private markWrapper: MarkWrapper;
    get markId(): number {
        return this.markWrapper.markId;
    }
    get mark(): Marker {
        return this.markWrapper.mark;
    }
    get markwrapper(): MarkWrapper {
        return this.markWrapper;
    }
    public constructor(markInfo: AddMarkerArgs, markId: number, markType: MarkWrapperTypeEnum) {
        //Creo un MarkWrapper el cual relaciona el Marker con el id del usuario dibujado
        var mark = new AddMarkerArgs();
        mark.title = markInfo.title;
        mark.location = new Position();
        mark.location.latitude = markInfo.location.latitude;
        mark.location.longitude = markInfo.location.longitude;
        var mapMark: Marker = null;
        if (markType == MarkWrapperTypeEnum.Me)
            mapMark = this.createMark(mark, "~/images/me-marker.png");
        else
            mapMark = this.createMark(mark);

        var markWrapper = new MarkWrapper(mapMark, markType);
        markWrapper.markId = markId;
        this.markWrapper = markWrapper;
    }
    private createMark(args: AddMarkerArgs, imgSrc: string = "~/images/friend-marker.png"): Marker {

        let mark = new Marker();
        mark.position = Position.positionFromLatLng(args.location.latitude, args.location.longitude);
        mark.title = args.title;
        mark.snippet = args.title;
        var image = new Image();
        image.src = imgSrc;
        mark.icon = image;
        return mark;
    };
    addMarkDrawWay(markWrapper: MarkWrapper) {
        //Activo el modo de Draw
        this.enableDraw = true;
        if (!this.markDrawWayList.Any(x => x.markId == markWrapper.markId)) {
            this.markDrawWayList.Add(markWrapper);
        }
    }
    removeMarkDrawWay(markWrapper: MarkWrapper) {
        //Desactivo el modo de Draw
        if (!this.markDrawWayList.Any(x => x.markId == markWrapper.markId)) {
            this.markDrawWayList.Remove(markWrapper);
        }
        //En caso de que no haya mas mark para dibujar desactivo la funcionalidad
        if (this.markDrawWayList.Count() == 0)
            this.enableDraw = false;

    }
}
export enum MarkWrapperTypeEnum {
    Friend,
    Me,
    Group
}