cordova.define('cordova/plugin_list', function(require, exports, module) {
module.exports = [
  {
    "id": "call-number.CallNumber",
    "file": "plugins/call-number/www/CallNumber.js",
    "pluginId": "call-number",
    "clobbers": [
      "call"
    ]
  },
  {
    "id": "cordova-plugin-background-fetch.BackgroundFetch",
    "file": "plugins/cordova-plugin-background-fetch/www/BackgroundFetch.js",
    "pluginId": "cordova-plugin-background-fetch",
    "clobbers": [
      "window.BackgroundFetch"
    ]
  },
  {
    "id": "cordova-background-geolocation-lt.BackgroundGeolocation",
    "file": "plugins/cordova-background-geolocation-lt/www/BackgroundGeolocation.js",
    "pluginId": "cordova-background-geolocation-lt",
    "clobbers": [
      "window.BackgroundGeolocation"
    ]
  },
  {
    "id": "cordova-plugin-android-permissions.Permissions",
    "file": "plugins/cordova-plugin-android-permissions/www/permissions.js",
    "pluginId": "cordova-plugin-android-permissions",
    "clobbers": [
      "cordova.plugins.permissions"
    ]
  },
  {
    "id": "cordova-plugin-device.device",
    "file": "plugins/cordova-plugin-device/www/device.js",
    "pluginId": "cordova-plugin-device",
    "clobbers": [
      "device"
    ]
  }
];
module.exports.metadata = 
// TOP OF METADATA
{
  "call-number": "0.0.2",
  "com.googlemaps.ios": "2.5.0",
  "cordova-plugin-background-fetch": "5.1.1",
  "cordova-background-geolocation-lt": "2.8.5",
  "cordova-plugin-android-permissions": "1.0.0",
  "cordova-plugin-device": "1.1.4"
};
// BOTTOM OF METADATA
});