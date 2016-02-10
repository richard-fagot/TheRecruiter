function injectTheScript() {
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        // query the active tab, which will be only one tab
        //and inject the script in it
        chrome.tabs.executeScript(null, {file:'jquery-2.2.0.min.js'});
        chrome.tabs.executeScript(tabs[0].id, {file: "content_script.js"});
    });
}

document.getElementById('clickactivity').addEventListener('click', injectTheScript);