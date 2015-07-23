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

  var queryInfo = {
    active: true,
    currentWindow: true
  };

  chrome.tabs.query(queryInfo, function(tabs) {
    var tab = tabs[0];
    var url = tab.url;
    console.assert(typeof url == 'string', 'tab.url should be a string');

    callback(url);
  });
}

/**
 * Extract domain from URL. Example: http://www.google.com -> google.com
 *
 * @param {string}
 */
function extractDomain(url) {
    var domain;
    //find & remove protocol (http, ftp, etc.) and get domain
    if (url.indexOf("://") > -1) {
        domain = url.split('/')[2];
    } else {
        domain = url.split('/')[0];
    }

    //find & remove port number
    domain = domain.split(':')[0];

    return domain;
}

/**
 * Generate password using Master Password.
 *
 * @param {string}
 */
function generatePassword(template) {

  var full_name = "Adam Becker Chillman";
  var master_password = "abcdefghijklmnopqrstuvwxyz";

  var mpw = new MPW( full_name, master_password );

  getCurrentTabUrl(function(url) {

    var domain = extractDomain(url);

    mpw.generatePassword( domain, 1, template )
      .then( function (sitePassword) {
        console.log("Password: " + sitePassword);
      }, function (reason) {
        console.log("Something went wrong... " + reason);
      });
  });
}

var templates = [];
templates.PIN     = "pin";
templates.SHORT   = "short";
templates.BASIC   = "basic";
templates.MEDIUM  = "medium";
templates.LONG    = "long";
templates.MAXIMUM = "maximum";
templates.NAME    = "name";
templates.PHRASE  = "phrase";

$(document).ready(function () {
    $("#generate_password").click(function() {
        generatePassword(templates.LONG);
    });
});
