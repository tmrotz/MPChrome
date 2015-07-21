// Copyright (c) 2014 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

/**
 * Get the current URL.
 *
 * @param {function(string)} callback - called when the URL of the current tab
 *   is found.
 */
function getCurrentTabUrl(callback) {
  // Query filter to be passed to chrome.tabs.query - see
  // https://developer.chrome.com/extensions/tabs#method-query
  var queryInfo = {
    active: true,
    currentWindow: true
  };

  chrome.tabs.query(queryInfo, function(tabs) {
    // chrome.tabs.query invokes the callback with a list of tabs that match the
    // query. When the popup is opened, there is certainly a window and at least
    // one tab, so we can safely assume that |tabs| is a non-empty array.
    // A window can only have one active tab at a time, so the array consists of
    // exactly one tab.
    var tab = tabs[0];

    // A tab is a plain object that provides information about the tab.
    // See https://developer.chrome.com/extensions/tabs#type-Tab
    var url = tab.url;

    // tab.url is only available if the "activeTab" permission is declared.
    // If you want to see the URL of other tabs (e.g. after removing active:true
    // from |queryInfo|), then the "tabs" permission is required to see their
    // "url" properties.
    console.assert(typeof url == 'string', 'tab.url should be a string');

    callback(url);
  });

  // Most methods of the Chrome extension APIs are asynchronous. This means that
  // you CANNOT do something like this:
  //
  // var url;
  // chrome.tabs.query(queryInfo, function(tabs) {
  //   url = tabs[0].url;
  // });
  // alert(url); // Shows "undefined", because chrome.tabs.query is async.
}

var PIN     = "pin";
var SHORT   = "short";
var BASIC   = "basic";
var MEDIUM  = "medium";
var LONG    = "long";
var MAXIMUM = "maximum";
var NAME    = "name";
var PHRASE  = "phrase";

var full_name = "Adam Becker Chillman";
var master_password = "abcdefghijklmnopqrstuvwxyz";

var mpw = new MPW( full_name, master_password );
var domain = "google.com";

mpw.generatePassword( domain, 1, LONG )
  .then( function (sitePassword) {
    console.log("Password: " + sitePassword);
  }, function (reason) {
    console.log("Something went wrong... " + reason);
  });

// getCurrentTabUrl(function(url) {

//   var matches = url.match(/^(?!:\/\/)([a-zA-Z0-9]+\.)?[a-zA-Z0-9][a-zA-Z0-9-]+\.[a-zA-Z]{2,6}?$/i);



// });

//javascript:function E(){ f0=document.forms[0];f0['userName'].value='yourusername'; f0['password'].value='yourpassword'; f0['login button ID'].click(); }E()
