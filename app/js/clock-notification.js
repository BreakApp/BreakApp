'use strict';
/* jshint ignore:start */

function startTime() {
  var today = new Date();
  var h = today.getHours();
  var m = today.getMinutes();
  var s = today.getSeconds();
  m = checkTime(m);
  s = checkTime(s);
  document.getElementById('txt').innerHTML = h+':'+m+':'+s;
  var t = setTimeout(function(){startTime();}, 500);
}

function checkTime(i) {
  if (i < 10) {i = '0' + i;}  // add zero in front of numbers < 10
  return i;
}

var Notification = window.Notification || window.mozNotification || window.webkitNotification;
Notification.requestPermission(function (permission) {});

function show(){
  var instance = new Notification(
    'Break Time!', {
      body: 'Time to get away from the computer for a minute'
    }
  );
  return false;
}
/* jshint ignore:end */
