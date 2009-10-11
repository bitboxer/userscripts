// ==UserScript==
// @name           Feedsportal Ads-Skipper
// @namespace      Feedsportal Ads-Skipper
// @description    Remove Feedsportal Ads
// @include        http://da.feedsportal.com/*
// ==/UserScript==
links = document.evaluate("//div[@align='right']/p/a[1]", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);

if (links.snapshotLength > 0) {
    element = links.snapshotItem(0);
    window.location.href = element;
}