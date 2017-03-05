export class Friend {
  id: number;
  email: string;
  name: string;
  lastName: string;
  groupId: number;
  displayName: string;
  activate: boolean;
  image: string;
  distanceToMe: number;
  //Si esta en true se dibujara el camino desde la posicion del este amigo hasta la posicion de Me
  drawWaytToMe: boolean = false;
  constructor() {
    this.drawWaytToMe = false;
    this.distanceToMe = 0;
  }
}
export class FriendPosition {
  id: number;
  latitude: number;
  longitude: number;
}