// Copyright (c) Vladimir Sibirov 2011-2012. All rights reserved.
// Distributed under terms of BSD License.

// Jamendo album URL regexp
var jamendoAlbumRegExp = /^http:\/\/www\.jamendo\.com\/\w+\/list\/a(\d+)\//i;

// Listener of tab URL change
chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
	if (jamendoAlbumRegExp.test(tab.url)) {
		chrome.pageAction.show(tabId);
	} else {
		chrome.pageAction.hide(tabId);
	}
});

// Listener for dowload action
chrome.pageAction.onClicked.addListener(function(tab) {
	// Get download URL for the album
	var m = jamendoAlbumRegExp.exec(tab.url);
	var albumId = m[1];
	// Create a new tab for the download and run it
	chrome.tabs.create({
		url: 'http://www.jamendo.com/get/album/id/album/archiverestricted/redirect/' + albumId + '/?are=ogg3',
		selected: false
	});
});
