[![Build Status](https://travis-ci.org/PeterStaev/nativescript-azure-mobile-apps.svg?branch=master)](https://travis-ci.org/PeterStaev/nativescript-azure-mobile-apps)
[![npm downloads](https://img.shields.io/npm/dm/nativescript-azure-mobile-apps.svg)](https://www.npmjs.com/package/nativescript-azure-mobile-apps)
[![npm downloads](https://img.shields.io/npm/dt/nativescript-azure-mobile-apps.svg)](https://www.npmjs.com/package/nativescript-azure-mobile-apps)
[![npm](https://img.shields.io/npm/v/nativescript-azure-mobile-apps.svg)](https://www.npmjs.com/package/nativescript-azure-mobile-apps)

A NativeScript Azure Mobile Apps plugin.

## Installation
Run the following command from the root of your project:

`tns plugin add nativescript-azure-mobile-apps`

This command automatically installs the necessary files, as well as stores nativescript-azure-mobile-apps as a dependency in your project's package.json file.

## Usage

### Create a client
```typescript
/// <reference path="../node_modules/nativescript-azure-mobile-apps/azure-mobile-apps.d.ts" />
import { MobileServiceClient } from "nativescript-azure-mobile-apps/client";
var client = new MobileServiceClient("https://<PORTAL_NAME>.azurewebsites.net");
```
### Get a reference to a table
```typescript
var todoItemTable = client.getTable("TodoItem");
```
### Get all items in a table
```typescript
todoItemTable.read<TodoItem>().then(function(results) {
    // results is array of TodoItem-s
    console.log(results.length);
    console.log(results[0].id);
});
```
### Add an item to a table
```typescript
var item = new TodoItem();
item.text = "NativeScript Rocks!";
todoItemTable.insert(item).then(function(result) {
    // result is the inserted item with the id changed
    console.log(result.id);
});
```

### Update an item
```typescript
item.text = "Changed Text";
todoItemTable.update(item).then(function(result) {
    // result is the updated item
    console.log(result);
});
```
### Delete an item
```typescript
todoItemTable.deleteItem(item).then(function() {
    console.log("Deleted!");
});
```
### Delete an item by ID
```typescript
todoItemTable.deleteById("some id").then(function() {
    console.log("Deleted!");
});
```

### Query table
```typescript
todoItemTable.where().field("completed").eq(true).read().then(function(results) {
    console.log("There are " + results.length.toString() + "completed items");
});
```
Currently the following filters are supported:
* **eq(value)** - Equals
* **ne(value)** - Not Equals
* **gt(value)** - Greater
* **ge(value)** - Greater or Equal
* **lt(value)** - Lower
* **le(value)** - Lower or Equal
* **startsWith(field, value)** - String starts with
* **endsWith(field, value)** - String ends with

If you want to filter the result by more than one condition, you can add additional filters by using `and()` and `or()` methods.

### Sorting
```typescript
import { SortDir } from "nativescript-azure-mobile-apps/query";
todoItemTable.where().field("completed").eq(true).orderBy("createdAt", SortDir.Desc).read().then(function(results) {
    // ...
});
```

### Paging
```typescript
import { SortDir } from "nativescript-azure-mobile-apps/query";
todoItemTable.where().field("completed").eq(true).orderBy("createdAt", SortDir.Asc).skip(2).top(3).read().then(function(results) {
    // Skips 2 completed tasks and returns the next 3 ordered chronologically by creation. 
});
```

### User Authentication (Social Sign In)

#### iOS login requirements
In versions 1.0.0 and lower login on iOS leveraged an in-app browser. This will be banned so we needed to
switch to SafariViewController which is not "in-app". So we need to be able to switch back and forth between
the external browser. The main benefit is this browser can leverage cookies already set by for instance a Facebook
login, so the user doesn't have to enter his credentials again.

It's a bit of work, but it's a one time effort and should take you about 5 minutes to complete these steps:

##### Custom URL Scheme
Switching to the external browser is not a problem, but switching back requires you to configure a 'Custom URL Scheme'.
Open `app/App_Resources/iOS/Info.plist` and add:

```xml
<key>CFBundleURLTypes</key>
<array>
  <dict>
    <key>CFBundleTypeRole</key>
    <string>Editor</string>
    <key>CFBundleURLName</key>
    <string>my.bundle.id</string>
    <key>CFBundleURLSchemes</key>
    <array>
      <string>x-msauth-tns-azure-sample</string>
    </array>
  </dict>
</array>
``` 

Make sure the Custom URL Scheme string `x-msauth-tns-azure-sample` above is unique on the device of the user,
so including your bundle id would be a good start (replace the dots by dashes).

Also, replace `my.bundle.id` by your bundle id.

##### Add ALLOWED EXTERNAL REDIRECT URLS
Add `x-msauth-tns-azure-sample://easyauth.callback` to [the 'ALLOWED EXTERNAL REDIRECT URLS' field in these screenshots](https://github.com/Azure/azure-mobile-apps-ios-client/issues/123#issuecomment-272959238) of your Azure backend.

_Make sure to replace `x-msauth-tns-azure-sample` by your own Custom URL Scheme._

##### App Delegate wiring
Now that your app can be called from the external party it still can't switch back to the foreground unless
you wire up a method in the App Delegate. Don't worry, this plugin takes care of that for you, the only thing
you need to do is add this line just before `app.start()` in `app.js` / `app.ts`:

```js
// add this
require("nativescript-azure-mobile-apps/client").MobileServiceClient.configureClientAuthAppDelegate();

// something like this is already there
application.start({ moduleName: "main-page" });
```

##### Passing the URL Scheme to `login`
Note that calling `login` has changed a bit; you now need to pass a second parameter to this function to use the
new login mechanism. Failing to do so will fall back to the deprecated in-app browser authentication method.
Make sure to replace `x-msauth-tns-azure-sample` by the scheme you configured in `Info.plist` before.
You can leave it out if you only target Android.

```typescript
import { AuthenticationProvider } from "nativescript-azure-mobile-apps/user";
client.login(AuthenticationProvider.Google, "x-msauth-tns-azure-sample").then((user) => {  
    console.log(`Logged In! UserID:${user.userId}`);
}, (e) => {
    console.log("Error Logging in!", e);
});
```

Once authenticated the userId and token are cached so you can login by simply calling:

```typescript
client.loginFromCache(); // Will return true if there are cached credentials and will setup the client accordingly
```

If you want to get additional information about the user (like  provider token, name, email, profile photo etc.) you can do this by calling `getProviderCredentials()`:

```typescript
client.user.getProviderCredentials().then((result) => {
    console.log(`Surname: ${result.surname}`);
    console.log(`Given Name: ${result.givenName}`);
    console.log(`Name: ${result.name}`);
});
```
Note: Since each provider provides different amount of details (also depends on what you have authorized in the Azure portal), 
if you are looking for some specific information, you should check the `claims` property of the result. 
It is a dictionary containing all the information that is returned from Azure. 

If you want to remove the cached authentication info you should use:

```typescript
import { MobileServiceUser } from "nativescript-azure-mobile-apps/user";
MobileServiceUser.clearCachedAuthenticationInfo();
```

### Push Notifications
**NOTE:** In order to work with push notifications you also need to install the `nativescript-pusn-notifications` plugin. 
You can do this by running the following command:
```
tns install nativescript-push-notifications
```
You can read more on how to use the push plugin [here](https://github.com/NativeScript/push-plugin/).

#### Register
You need to call the push register with Azure in the success callback of the push plugin by passing the registration token 
returned by the push plugin. 

```typescript
pushPlugin.register(pushSettings, (data) => {
    if (pushPlugin.onMessageReceived) {
        pushPlugin.onMessageReceived(pushSettings.notificationCallbackAndroid);
    }
    client.push.register(data)
        .then(() => console.log("Azure Register OK!"))
        .catch((e) => console.log(e));
}, (e) => { console.log(e); });
```

#### Register with a template
If you want to use a custom template for the notifications, you can use the `registerWithTemplate` method to pass 
your template name and body.

```typescript
let pushTemplates = {};
pushTemplates[platform.platformNames.android] = "{\"data\":{\"message\":\"$(param)\"}}";
pushTemplates[platform.platformNames.ios] = "{\"aps\":{\"alert\":\"$(param)\"}}";

pushPlugin.register(pushSettings, (data) => {
    if (pushPlugin.onMessageReceived) {
        pushPlugin.onMessageReceived(pushSettings.notificationCallbackAndroid);
    }
    client.push.registerWithTemplate(data, "MyTemplate", pushTemplates[platform.device.os])
        .then(() => console.log("Azure Register OK!"))
        .catch((e) => console.log(e));
}, (e) => { console.log(e); });
```

#### Unregister
```typescript
pushPlugin.unregister(() => {
    console.log("Device Unregister OK!");
    client.push.unregister()
        .then(() => console.log("Azure Unregister OK!"))
        .catch((e) => console.log(e));
}, (e) => console.log(e), pushSettings);
```