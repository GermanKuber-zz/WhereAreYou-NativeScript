"use strict";
var Friend = (function () {
    function Friend() {
        this.invitationSended = false;
        //Si esta en true se dibujara el camino desde la posicion del este amigo hasta la posicion de Me
        this.drawWaytToMe = false;
        this.drawWaytToMe = false;
        this.distanceToMe = 0;
    }
    return Friend;
}());
exports.Friend = Friend;
var FriendPosition = (function () {
    function FriendPosition() {
    }
    return FriendPosition;
}());
exports.FriendPosition = FriendPosition;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZnJpZW5kLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiZnJpZW5kLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQTtJQWFFO1FBSkEscUJBQWdCLEdBQVMsS0FBSyxDQUFDO1FBRS9CLGdHQUFnRztRQUNoRyxpQkFBWSxHQUFZLEtBQUssQ0FBQztRQUU1QixJQUFJLENBQUMsWUFBWSxHQUFHLEtBQUssQ0FBQztRQUMxQixJQUFJLENBQUMsWUFBWSxHQUFHLENBQUMsQ0FBQztJQUN4QixDQUFDO0lBQ0gsYUFBQztBQUFELENBQUMsQUFqQkQsSUFpQkM7QUFqQlksd0JBQU07QUFrQm5CO0lBQUE7SUFJQSxDQUFDO0lBQUQscUJBQUM7QUFBRCxDQUFDLEFBSkQsSUFJQztBQUpZLHdDQUFjIiwic291cmNlc0NvbnRlbnQiOlsiZXhwb3J0IGNsYXNzIEZyaWVuZCB7XG4gIGlkOiBudW1iZXI7XG4gIGVtYWlsOiBzdHJpbmc7XG4gIG5hbWU6IHN0cmluZztcbiAgbGFzdE5hbWU6IHN0cmluZztcbiAgZ3JvdXBJZDogbnVtYmVyO1xuICBkaXNwbGF5TmFtZTogc3RyaW5nO1xuICBhY3RpdmF0ZTogYm9vbGVhbjtcbiAgaW1hZ2U6IHN0cmluZztcbiAgaW52aXRhdGlvblNlbmRlZDpib29sZWFuPWZhbHNlO1xuICBkaXN0YW5jZVRvTWU6IG51bWJlcjtcbiAgLy9TaSBlc3RhIGVuIHRydWUgc2UgZGlidWphcmEgZWwgY2FtaW5vIGRlc2RlIGxhIHBvc2ljaW9uIGRlbCBlc3RlIGFtaWdvIGhhc3RhIGxhIHBvc2ljaW9uIGRlIE1lXG4gIGRyYXdXYXl0VG9NZTogYm9vbGVhbiA9IGZhbHNlO1xuICBjb25zdHJ1Y3RvcigpIHtcbiAgICB0aGlzLmRyYXdXYXl0VG9NZSA9IGZhbHNlO1xuICAgIHRoaXMuZGlzdGFuY2VUb01lID0gMDtcbiAgfVxufVxuZXhwb3J0IGNsYXNzIEZyaWVuZFBvc2l0aW9uIHtcbiAgaWQ6IG51bWJlcjtcbiAgbGF0aXR1ZGU6IG51bWJlcjtcbiAgbG9uZ2l0dWRlOiBudW1iZXI7XG59Il19