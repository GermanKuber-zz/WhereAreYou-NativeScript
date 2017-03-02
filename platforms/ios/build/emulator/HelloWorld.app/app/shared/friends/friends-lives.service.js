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
            latitude: 37.33233141,
            longitude: -122.0312186
        });
        this.mockListFriend.push({
            id: 2,
            latitude: 37.33253141,
            longitude: -122.0312186
        });
        this.mockListFriend.push({
            id: 3,
            latitude: 37.33263121,
            longitude: -122.0315187
        });
    }
    FriendsLiveService.prototype.getFriendsByGroup = function (idGroup) {
        return Rx_1.Observable.of(this.mockListFriend);
    };
    FriendsLiveService.prototype.getFriendsLocations = function () {
        var _this = this;
        //TODO: Meotodo que debo remplazar con el comportamiento de SignalR
        var source = Rx_1.Observable.create(function (observer) {
            _this.autoCall(observer);
        });
        return source;
    };
    FriendsLiveService.prototype.autoCall = function (observer) {
        var _this = this;
        setTimeout(function () {
            var friend = _this.generateRanonMove();
            observer.next(friend);
            ;
            _this.autoCall(observer);
        }, 300);
    };
    //TODO: Metodo mock donde simulto el movimiento de un amigo Demo eliminar
    FriendsLiveService.prototype.generateRanonMove = function () {
        var friend = this.mockListFriend[this.getRandomInt(0, 3)];
        var test = (Math.random() * (0.00002000 - 0.00055120) + 0.00055120).toFixed(4);
        var test2 = (Math.random() * (0.00004000 - 0.00079120) + 0.00079120).toFixed(4);
        friend.latitude = friend.latitude + +test;
        friend.longitude = friend.longitude + +test2;
        return friend;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZnJpZW5kcy1saXZlcy5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiZnJpZW5kcy1saXZlcy5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxzQ0FBMkM7QUFDM0MsOEJBQXFDO0FBQ3JDLGdDQUE4QjtBQUM5QixpQ0FBK0I7QUFLL0IsSUFBYSxrQkFBa0I7SUFFN0I7UUFEUSxtQkFBYyxHQUFHLElBQUksS0FBSyxFQUFrQixDQUFDO1FBRW5ELElBQUksQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFpQjtZQUN2QyxFQUFFLEVBQUUsQ0FBQztZQUNMLFFBQVEsRUFBRSxXQUFXO1lBQ3JCLFNBQVMsRUFBRSxDQUFDLFdBQVc7U0FDeEIsQ0FBQyxDQUFBO1FBQ0YsSUFBSSxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQWlCO1lBQ3ZDLEVBQUUsRUFBRSxDQUFDO1lBQ0wsUUFBUSxFQUFFLFdBQVc7WUFDckIsU0FBUyxFQUFFLENBQUMsV0FBVztTQUN4QixDQUFDLENBQUE7UUFDRixJQUFJLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBaUI7WUFDdkMsRUFBRSxFQUFFLENBQUM7WUFDTCxRQUFRLEVBQUUsV0FBVztZQUNyQixTQUFTLEVBQUUsQ0FBQyxXQUFXO1NBQ3hCLENBQUMsQ0FBQTtJQUNKLENBQUM7SUFFRCw4Q0FBaUIsR0FBakIsVUFBa0IsT0FBZTtRQUMvQixNQUFNLENBQUMsZUFBVSxDQUFDLEVBQUUsQ0FBbUIsSUFBSSxDQUFDLGNBQWMsQ0FBQyxDQUFDO0lBQzlELENBQUM7SUFDRCxnREFBbUIsR0FBbkI7UUFBQSxpQkFPQztRQU5DLG1FQUFtRTtRQUNuRSxJQUFJLE1BQU0sR0FBRyxlQUFVLENBQUMsTUFBTSxDQUFDLFVBQUEsUUFBUTtZQUNyQyxLQUFJLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBQzFCLENBQUMsQ0FBQyxDQUFDO1FBQ0gsTUFBTSxDQUFDLE1BQU0sQ0FBQztJQUVoQixDQUFDO0lBQ08scUNBQVEsR0FBaEIsVUFBaUIsUUFBUTtRQUF6QixpQkFNQztRQUxDLFVBQVUsQ0FBQztZQUNULElBQUksTUFBTSxHQUFHLEtBQUksQ0FBQyxpQkFBaUIsRUFBRSxDQUFDO1lBQ3RDLFFBQVEsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7WUFBQSxDQUFDO1lBQ3ZCLEtBQUksQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLENBQUM7UUFDMUIsQ0FBQyxFQUFFLEdBQUcsQ0FBQyxDQUFDO0lBQ1YsQ0FBQztJQUNELHlFQUF5RTtJQUNqRSw4Q0FBaUIsR0FBekI7UUFDRSxJQUFJLE1BQU0sR0FBRyxJQUFJLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUE7UUFDekQsSUFBSSxJQUFJLEdBQUcsQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFLEdBQUcsQ0FBQyxVQUFVLEdBQUcsVUFBVSxDQUFDLEdBQUcsVUFBVSxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQy9FLElBQUksS0FBSyxHQUFHLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRSxHQUFHLENBQUMsVUFBVSxHQUFHLFVBQVUsQ0FBQyxHQUFHLFVBQVUsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUNoRixNQUFNLENBQUMsUUFBUSxHQUFHLE1BQU0sQ0FBQyxRQUFRLEdBQUcsQ0FBQyxJQUFJLENBQUM7UUFDMUMsTUFBTSxDQUFDLFNBQVMsR0FBRyxNQUFNLENBQUMsU0FBUyxHQUFHLENBQUMsS0FBSyxDQUFDO1FBQzdDLE1BQU0sQ0FBQyxNQUFNLENBQUM7SUFDaEIsQ0FBQztJQUdELHlDQUFZLEdBQVosVUFBYSxLQUFlO1FBQzFCLE9BQU8sQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUMsSUFBSSxFQUFFLENBQUMsQ0FBQyxDQUFDO1FBQzFDLE1BQU0sQ0FBQyxlQUFVLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQ2pDLENBQUM7SUFDTyx5Q0FBWSxHQUFwQixVQUFxQixHQUFHLEVBQUUsR0FBRztRQUMzQixHQUFHLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUNyQixHQUFHLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUN0QixNQUFNLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFLEdBQUcsQ0FBQyxHQUFHLEdBQUcsR0FBRyxDQUFDLENBQUMsR0FBRyxHQUFHLENBQUM7SUFDdkQsQ0FBQztJQUNILHlCQUFDO0FBQUQsQ0FBQyxBQTFERCxJQTBEQztBQTFEWSxrQkFBa0I7SUFEOUIsaUJBQVUsRUFBRTs7R0FDQSxrQkFBa0IsQ0EwRDlCO0FBMURZLGdEQUFrQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSB9IGZyb20gXCJyeGpzL1J4XCI7XG5pbXBvcnQgXCJyeGpzL2FkZC9vcGVyYXRvci9kb1wiO1xuaW1wb3J0IFwicnhqcy9hZGQvb3BlcmF0b3IvbWFwXCI7XG5cbmltcG9ydCB7IEZyaWVuZFBvc2l0aW9uIH0gZnJvbSAnLi9mcmllbmQnO1xuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgRnJpZW5kc0xpdmVTZXJ2aWNlIHtcbiAgcHJpdmF0ZSBtb2NrTGlzdEZyaWVuZCA9IG5ldyBBcnJheTxGcmllbmRQb3NpdGlvbj4oKTtcbiAgY29uc3RydWN0b3IoKSB7XG4gICAgdGhpcy5tb2NrTGlzdEZyaWVuZC5wdXNoKDxGcmllbmRQb3NpdGlvbj57XG4gICAgICBpZDogMSxcbiAgICAgIGxhdGl0dWRlOiAzNy4zMzIzMzE0MSxcbiAgICAgIGxvbmdpdHVkZTogLTEyMi4wMzEyMTg2XG4gICAgfSlcbiAgICB0aGlzLm1vY2tMaXN0RnJpZW5kLnB1c2goPEZyaWVuZFBvc2l0aW9uPntcbiAgICAgIGlkOiAyLFxuICAgICAgbGF0aXR1ZGU6IDM3LjMzMjUzMTQxLFxuICAgICAgbG9uZ2l0dWRlOiAtMTIyLjAzMTIxODZcbiAgICB9KVxuICAgIHRoaXMubW9ja0xpc3RGcmllbmQucHVzaCg8RnJpZW5kUG9zaXRpb24+e1xuICAgICAgaWQ6IDMsXG4gICAgICBsYXRpdHVkZTogMzcuMzMyNjMxMjEsXG4gICAgICBsb25naXR1ZGU6IC0xMjIuMDMxNTE4N1xuICAgIH0pXG4gIH1cblxuICBnZXRGcmllbmRzQnlHcm91cChpZEdyb3VwOiBudW1iZXIpOiBPYnNlcnZhYmxlPEFycmF5PEZyaWVuZFBvc2l0aW9uPj4ge1xuICAgIHJldHVybiBPYnNlcnZhYmxlLm9mPEZyaWVuZFBvc2l0aW9uW10+KHRoaXMubW9ja0xpc3RGcmllbmQpO1xuICB9XG4gIGdldEZyaWVuZHNMb2NhdGlvbnMoKTogT2JzZXJ2YWJsZTxGcmllbmRQb3NpdGlvbj4ge1xuICAgIC8vVE9ETzogTWVvdG9kbyBxdWUgZGVibyByZW1wbGF6YXIgY29uIGVsIGNvbXBvcnRhbWllbnRvIGRlIFNpZ25hbFJcbiAgICBsZXQgc291cmNlID0gT2JzZXJ2YWJsZS5jcmVhdGUob2JzZXJ2ZXIgPT4ge1xuICAgICAgdGhpcy5hdXRvQ2FsbChvYnNlcnZlcik7XG4gICAgfSk7XG4gICAgcmV0dXJuIHNvdXJjZTtcblxuICB9XG4gIHByaXZhdGUgYXV0b0NhbGwob2JzZXJ2ZXIpIHtcbiAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgIHZhciBmcmllbmQgPSB0aGlzLmdlbmVyYXRlUmFub25Nb3ZlKCk7XG4gICAgICBvYnNlcnZlci5uZXh0KGZyaWVuZCk7O1xuICAgICAgdGhpcy5hdXRvQ2FsbChvYnNlcnZlcik7XG4gICAgfSwgMzAwKTtcbiAgfVxuICAvL1RPRE86IE1ldG9kbyBtb2NrIGRvbmRlIHNpbXVsdG8gZWwgbW92aW1pZW50byBkZSB1biBhbWlnbyBEZW1vIGVsaW1pbmFyXG4gIHByaXZhdGUgZ2VuZXJhdGVSYW5vbk1vdmUoKTogRnJpZW5kUG9zaXRpb24ge1xuICAgIHZhciBmcmllbmQgPSB0aGlzLm1vY2tMaXN0RnJpZW5kW3RoaXMuZ2V0UmFuZG9tSW50KDAsIDMpXVxuICAgIHZhciB0ZXN0ID0gKE1hdGgucmFuZG9tKCkgKiAoMC4wMDAwMjAwMCAtIDAuMDAwNTUxMjApICsgMC4wMDA1NTEyMCkudG9GaXhlZCg0KTtcbiAgICB2YXIgdGVzdDIgPSAoTWF0aC5yYW5kb20oKSAqICgwLjAwMDA0MDAwIC0gMC4wMDA3OTEyMCkgKyAwLjAwMDc5MTIwKS50b0ZpeGVkKDQpO1xuICAgIGZyaWVuZC5sYXRpdHVkZSA9IGZyaWVuZC5sYXRpdHVkZSArICt0ZXN0O1xuICAgIGZyaWVuZC5sb25naXR1ZGUgPSBmcmllbmQubG9uZ2l0dWRlICsgK3Rlc3QyO1xuICAgIHJldHVybiBmcmllbmQ7XG4gIH1cblxuXG4gIGhhbmRsZUVycm9ycyhlcnJvcjogUmVzcG9uc2UpIHtcbiAgICBjb25zb2xlLmxvZyhKU09OLnN0cmluZ2lmeShlcnJvci5qc29uKCkpKTtcbiAgICByZXR1cm4gT2JzZXJ2YWJsZS50aHJvdyhlcnJvcik7XG4gIH1cbiAgcHJpdmF0ZSBnZXRSYW5kb21JbnQobWluLCBtYXgpIHtcbiAgICBtaW4gPSBNYXRoLmNlaWwobWluKTtcbiAgICBtYXggPSBNYXRoLmZsb29yKG1heCk7XG4gICAgcmV0dXJuIE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIChtYXggLSBtaW4pKSArIG1pbjtcbiAgfVxufVxuIl19