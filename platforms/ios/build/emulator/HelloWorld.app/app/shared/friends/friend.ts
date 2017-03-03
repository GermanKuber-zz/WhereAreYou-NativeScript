export class Friend {
  id: number;
  email: string;
  name: string;
  lastName: string;
  groupId: number;
  displayName: string;
  activate: boolean;
  //Si esta en true se dibujara el camino desde la posicion del este amigo hasta la posicion de Me
  drawWaytToMe: boolean = false;
  constructor(){
    this.drawWaytToMe = false;
  }
}
export class FriendPosition {
  id: number;
  latitude: number;
  longitude: number;
}