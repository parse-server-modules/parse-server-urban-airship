"use strict";
// UrbanAirshipPushAdapter is an adapter for Parse Server push

const typeToAudience = {
  "ios": "device_token",
  "android": "apid",
  "winrt": "wns",
  "winphone": "mpns",
  "dotnet": "wns"
}

const Parse = require('parse/node').Parse;
const UrbanAirshipPush = require('urban-airship-push');

function UrbanAirshipPushAdapter(pushConfig) {
  this.validPushTypes = ['ios', 'android',  'winrt', 'winphone', 'dotnet'];

  pushConfig = pushConfig || {};

  this.config = {};
  this.config.key = pushConfig.key;
  this.config.secret = pushConfig.secret;
  this.config.masterSecret = pushConfig.masterSecret;

  this.UA = new UrbanAirshipPush(this.config);
}

/**
* Get an array of valid push types.
* @returns {Array} An array of valid push types
*/
UrbanAirshipPushAdapter.prototype.getValidPushTypes = function() {
  return this.validPushTypes;
}

UrbanAirshipPushAdapter.prototype.send = function(data, installations) {
  const requests = UrbanAirshipPushAdapter.createRequests(data, installations);
  const promise = new Parse.Promise();
  this.UA.push.send(requests, function(err, res){
    if (err) {
      promise.reject(err);
    } else {
      promise.resolve(res);
    }
  });
  return promise;
}

UrbanAirshipPushAdapter.createRequests = function(data, installations) {
  return installations.map(function(installation){
    const type = typeToAudience[installation.deviceType];
    if (!type) {
      return;
    }
    const deviceToken = installation.deviceToken;
    if (!deviceToken) {
      return;
    }
    if (!data.data) {
      return;
    }
    const audience = {};
    audience[type] = deviceToken;
    const specificData = {};
    specificData[installation.deviceType] = data.data;

    return {
      audience: audience,
      notification: specificData,
      device_types: "all"
    }
  }).filter(function(obj){
    return obj !== undefined;
  });
}

module.exports = UrbanAirshipPushAdapter;
module.exports.default  = UrbanAirshipPushAdapter;
