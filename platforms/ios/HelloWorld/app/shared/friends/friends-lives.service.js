"use strict";
var core_1 = require("@angular/core");
var Rx_1 = require("rxjs/Rx");
require("rxjs/add/operator/do");
require("rxjs/add/operator/map");
var FriendsLiveService = (function () {
    function FriendsLiveService() {
        this.mockListFriend = new Array();
        this.mockListFriend.push({
            id: 1,
            latitude: 37.93233120,
            longitude: -122.0312120
        });
        this.mockListFriend.push({
            id: 2,
            latitude: 37.53233120,
            longitude: -122.1312120
        });
        this.mockListFriend.push({
            id: 3,
            latitude: 38.13233120,
            longitude: -123.0312120
        });
    }
    FriendsLiveService.prototype.getFriendsByGroup = function (idGroup) {
        return Rx_1.Observable.of(mockListFriend);
    };
    FriendsLiveService.prototype.updateFriendLocation = function (callback) {
        var _this = this;
        //TODO: Meotodo que debo remplazar con el comportamiento de SignalR
        setTimeout(function () {
            _this.generateRanonMove(callback);
            _this.updateFriendLocation(callback);
        }, 3000);
    };
    //TODO: Metodo mock donde simulto el movimiento de un amigo Demo eliminar
    FriendsLiveService.prototype.generateRanonMove = function (callback) {
        var friend = this.mockListFriend[this.getRandomInt(0, 2)];
        friend.latitude = friend.latitude + 0.08233120;
        friend.longitude = friend.longitude + 0.04233120;
        callback(friend);
    };
    FriendsLiveService.prototype.handleErrors = function (error) {
        console.log(JSON.stringify(error.json()));
        return Rx_1.Observable.throw(error);
    };
    FriendsLiveService.prototype.getRandomInt = function (min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min)) + min;
    };
    return FriendsLiveService;
}());
FriendsLiveService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [])
], FriendsLiveService);
exports.FriendsLiveService = FriendsLiveService;
var mockListFriend = new Array();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZnJpZW5kcy1saXZlcy5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiZnJpZW5kcy1saXZlcy5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxzQ0FBMkM7QUFDM0MsOEJBQXFDO0FBQ3JDLGdDQUE4QjtBQUM5QixpQ0FBK0I7QUFLL0IsSUFBYSxrQkFBa0I7SUFFN0I7UUFEUSxtQkFBYyxHQUFHLElBQUksS0FBSyxFQUFrQixDQUFDO1FBRW5ELElBQUksQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFpQjtZQUN2QyxFQUFFLEVBQUUsQ0FBQztZQUNMLFFBQVEsRUFBRSxXQUFXO1lBQ3JCLFNBQVMsRUFBRSxDQUFDLFdBQVc7U0FDeEIsQ0FBQyxDQUFBO1FBQ0YsSUFBSSxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQWlCO1lBQ3ZDLEVBQUUsRUFBRSxDQUFDO1lBQ0wsUUFBUSxFQUFFLFdBQVc7WUFDckIsU0FBUyxFQUFFLENBQUMsV0FBVztTQUN4QixDQUFDLENBQUE7UUFDRixJQUFJLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBaUI7WUFDdkMsRUFBRSxFQUFFLENBQUM7WUFDTCxRQUFRLEVBQUUsV0FBVztZQUNyQixTQUFTLEVBQUUsQ0FBQyxXQUFXO1NBQ3hCLENBQUMsQ0FBQTtJQUNKLENBQUM7SUFFRCw4Q0FBaUIsR0FBakIsVUFBa0IsT0FBZTtRQUMvQixNQUFNLENBQUMsZUFBVSxDQUFDLEVBQUUsQ0FBbUIsY0FBYyxDQUFDLENBQUM7SUFDekQsQ0FBQztJQUNELGlEQUFvQixHQUFwQixVQUFxQixRQUFrQztRQUF2RCxpQkFNQztRQUxDLG1FQUFtRTtRQUNuRSxVQUFVLENBQUM7WUFDVCxLQUFJLENBQUMsaUJBQWlCLENBQUMsUUFBUSxDQUFDLENBQUM7WUFDakMsS0FBSSxDQUFDLG9CQUFvQixDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBQ3RDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQztJQUNYLENBQUM7SUFFRCx5RUFBeUU7SUFDakUsOENBQWlCLEdBQXpCLFVBQTBCLFFBQWtDO1FBQzFELElBQUksTUFBTSxHQUFHLElBQUksQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQTtRQUN6RCxNQUFNLENBQUMsUUFBUSxHQUFHLE1BQU0sQ0FBQyxRQUFRLEdBQUcsVUFBVSxDQUFBO1FBQzlDLE1BQU0sQ0FBQyxTQUFTLEdBQUcsTUFBTSxDQUFDLFNBQVMsR0FBRyxVQUFVLENBQUE7UUFDaEQsUUFBUSxDQUFDLE1BQU0sQ0FBQyxDQUFDO0lBRW5CLENBQUM7SUFHRCx5Q0FBWSxHQUFaLFVBQWEsS0FBZTtRQUMxQixPQUFPLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDLElBQUksRUFBRSxDQUFDLENBQUMsQ0FBQztRQUMxQyxNQUFNLENBQUMsZUFBVSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUNqQyxDQUFDO0lBQ08seUNBQVksR0FBcEIsVUFBcUIsR0FBRyxFQUFFLEdBQUc7UUFDM0IsR0FBRyxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDckIsR0FBRyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDdEIsTUFBTSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRSxHQUFHLENBQUMsR0FBRyxHQUFHLEdBQUcsQ0FBQyxDQUFDLEdBQUcsR0FBRyxDQUFDO0lBQ3ZELENBQUM7SUFDSCx5QkFBQztBQUFELENBQUMsQUFsREQsSUFrREM7QUFsRFksa0JBQWtCO0lBRDlCLGlCQUFVLEVBQUU7O0dBQ0Esa0JBQWtCLENBa0Q5QjtBQWxEWSxnREFBa0I7QUFxRC9CLElBQUksY0FBYyxHQUFHLElBQUksS0FBSyxFQUFrQixDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XG5pbXBvcnQgeyBPYnNlcnZhYmxlIH0gZnJvbSBcInJ4anMvUnhcIjtcbmltcG9ydCBcInJ4anMvYWRkL29wZXJhdG9yL2RvXCI7XG5pbXBvcnQgXCJyeGpzL2FkZC9vcGVyYXRvci9tYXBcIjtcblxuaW1wb3J0IHsgRnJpZW5kUG9zaXRpb24gfSBmcm9tICcuL2ZyaWVuZCc7XG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBGcmllbmRzTGl2ZVNlcnZpY2Uge1xuICBwcml2YXRlIG1vY2tMaXN0RnJpZW5kID0gbmV3IEFycmF5PEZyaWVuZFBvc2l0aW9uPigpO1xuICBjb25zdHJ1Y3RvcigpIHtcbiAgICB0aGlzLm1vY2tMaXN0RnJpZW5kLnB1c2goPEZyaWVuZFBvc2l0aW9uPntcbiAgICAgIGlkOiAxLFxuICAgICAgbGF0aXR1ZGU6IDM3LjkzMjMzMTIwLFxuICAgICAgbG9uZ2l0dWRlOiAtMTIyLjAzMTIxMjBcbiAgICB9KVxuICAgIHRoaXMubW9ja0xpc3RGcmllbmQucHVzaCg8RnJpZW5kUG9zaXRpb24+e1xuICAgICAgaWQ6IDIsXG4gICAgICBsYXRpdHVkZTogMzcuNTMyMzMxMjAsXG4gICAgICBsb25naXR1ZGU6IC0xMjIuMTMxMjEyMFxuICAgIH0pXG4gICAgdGhpcy5tb2NrTGlzdEZyaWVuZC5wdXNoKDxGcmllbmRQb3NpdGlvbj57XG4gICAgICBpZDogMyxcbiAgICAgIGxhdGl0dWRlOiAzOC4xMzIzMzEyMCxcbiAgICAgIGxvbmdpdHVkZTogLTEyMy4wMzEyMTIwXG4gICAgfSlcbiAgfVxuXG4gIGdldEZyaWVuZHNCeUdyb3VwKGlkR3JvdXA6IG51bWJlcik6IE9ic2VydmFibGU8QXJyYXk8RnJpZW5kUG9zaXRpb24+PiB7XG4gICAgcmV0dXJuIE9ic2VydmFibGUub2Y8RnJpZW5kUG9zaXRpb25bXT4obW9ja0xpc3RGcmllbmQpO1xuICB9XG4gIHVwZGF0ZUZyaWVuZExvY2F0aW9uKGNhbGxiYWNrOiAoRnJpZW5kUG9zaXRpb24pID0+IHZvaWQpOiB2b2lkIHtcbiAgICAvL1RPRE86IE1lb3RvZG8gcXVlIGRlYm8gcmVtcGxhemFyIGNvbiBlbCBjb21wb3J0YW1pZW50byBkZSBTaWduYWxSXG4gICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICB0aGlzLmdlbmVyYXRlUmFub25Nb3ZlKGNhbGxiYWNrKTtcbiAgICAgIHRoaXMudXBkYXRlRnJpZW5kTG9jYXRpb24oY2FsbGJhY2spO1xuICAgIH0sIDMwMDApO1xuICB9XG5cbiAgLy9UT0RPOiBNZXRvZG8gbW9jayBkb25kZSBzaW11bHRvIGVsIG1vdmltaWVudG8gZGUgdW4gYW1pZ28gRGVtbyBlbGltaW5hclxuICBwcml2YXRlIGdlbmVyYXRlUmFub25Nb3ZlKGNhbGxiYWNrOiAoRnJpZW5kUG9zaXRpb24pID0+IHZvaWQpOiB2b2lkIHtcbiAgICB2YXIgZnJpZW5kID0gdGhpcy5tb2NrTGlzdEZyaWVuZFt0aGlzLmdldFJhbmRvbUludCgwLCAyKV1cbiAgICBmcmllbmQubGF0aXR1ZGUgPSBmcmllbmQubGF0aXR1ZGUgKyAwLjA4MjMzMTIwXG4gICAgZnJpZW5kLmxvbmdpdHVkZSA9IGZyaWVuZC5sb25naXR1ZGUgKyAwLjA0MjMzMTIwXG4gICAgY2FsbGJhY2soZnJpZW5kKTtcblxuICB9XG5cblxuICBoYW5kbGVFcnJvcnMoZXJyb3I6IFJlc3BvbnNlKSB7XG4gICAgY29uc29sZS5sb2coSlNPTi5zdHJpbmdpZnkoZXJyb3IuanNvbigpKSk7XG4gICAgcmV0dXJuIE9ic2VydmFibGUudGhyb3coZXJyb3IpO1xuICB9XG4gIHByaXZhdGUgZ2V0UmFuZG9tSW50KG1pbiwgbWF4KSB7XG4gICAgbWluID0gTWF0aC5jZWlsKG1pbik7XG4gICAgbWF4ID0gTWF0aC5mbG9vcihtYXgpO1xuICAgIHJldHVybiBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAobWF4IC0gbWluKSkgKyBtaW47XG4gIH1cbn1cblxuXG52YXIgbW9ja0xpc3RGcmllbmQgPSBuZXcgQXJyYXk8RnJpZW5kUG9zaXRpb24+KCk7XG5cbiJdfQ==