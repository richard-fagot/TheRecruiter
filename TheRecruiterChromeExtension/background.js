chrome.runtime.onInstalled.addListener(function() {
    chrome.declarativeContent.onPageChanged.removeRules(undefined, function() {
        chrome.declarativeContent.onPageChanged.addRules([{
            conditions: [
                new chrome.declarativeContent.PageStateMatcher({
                    pageUrl: {
                        hostContains: 'viadeo.com',
                        pathContains: 'search'
                    }
                }),
                new chrome.declarativeContent.PageStateMatcher({
                    pageUrl: {
                        hostContains: 'viadeo.com',
                        pathContains: '/p/'
                    }
                })
            ],
            actions: [new chrome.declarativeContent.ShowPageAction()]
        }]);
    });
});