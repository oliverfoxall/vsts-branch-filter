/**
 * Enables popup for visual studio pages only
 */
chrome.runtime.onInstalled.addListener(function (){
    chrome.declarativeContent.onPageChanged.removeRules(undefined, function () {
        chrome.declarativeContent.onPageChanged.addRules([{
            conditions: [new chrome.declarativeContent.PageStateMatcher({
                pageUrl: {urlMatches: '[a-z]*.visualstudio.com\\/\\S*\\/pullrequests\\S*'}
            })],
            actions: [new chrome.declarativeContent.ShowPageAction()]
        }]);
    });
});