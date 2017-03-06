"use strict";
function getNativeValueForComparison(value) {
    if (value instanceof Date) {
        return value.toISOString();
    }
    return value;
}
exports.getNativeValueForComparison = getNativeValueForComparison;
function getNativeObject(object) {
    if (object instanceof Array) {
        return getNSArrayFromJsArray(object);
    }
    if (object !== null && object !== undefined && typeof object === "object" && !(object instanceof Date)) {
        return getNSDictionaryFromJsObject(object);
    }
    return object;
}
exports.getNativeObject = getNativeObject;
function getNSArrayFromJsArray(array) {
    var result = NSMutableArray.alloc().init();
    for (var loop = 0; loop < array.length; loop++) {
        result.addObject(getNativeObject(array[loop]));
    }
    return result;
}
function getNSDictionaryFromJsObject(object) {
    var result = NSMutableDictionary.alloc().init();
    for (var key in object) {
        if (object.hasOwnProperty(key)) {
            result.setValueForKey(getNativeObject(object[key]), key);
        }
    }
    return result;
}
function getJsObject(object) {
    if (object instanceof NSDictionary) {
        return getJsObjectFromNSDictionary(object);
    }
    if (object instanceof NSArray) {
        return getJsArrayFromNSArray(object);
    }
    return object;
}
exports.getJsObject = getJsObject;
function getJsArrayFromNSArray(array) {
    var result = [];
    for (var loop = 0; loop < array.count; loop++) {
        result.push(getJsObject(array.objectAtIndex(loop)));
    }
    return result;
}
function getJsObjectFromNSDictionary(dictionary) {
    var keys = dictionary.allKeys;
    var result = {};
    for (var loop = 0; loop < keys.count; loop++) {
        var key = keys[loop];
        var item = dictionary.objectForKey(key);
        result[key] = getJsObject(item);
    }
    return result;
}
function deviceTokenToNsData(token) {
    var result = NSMutableData.alloc().init();
    for (var loop = 0; loop < token.length / 2; loop++) {
        var byteChars = "";
        var byte_1 = void 0;
        byteChars = "" + token[loop * 2] + token[loop * 2 + 1] + "\0";
        byte_1 = strtol(byteChars, null, 16);
        var pointer = new interop.Reference(interop.types.unichar, String.fromCharCode(byte_1));
        result.appendBytesLength(pointer, 1);
    }
    return result;
}
exports.deviceTokenToNsData = deviceTokenToNsData;
