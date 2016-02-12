function injectTheScript() {
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        // query the active tab, which will be only one tab
        //and inject the script in it
        console.log("inject script");
        chrome.tabs.executeScript(null, {file:'jquery-2.2.0.min.js'});
        chrome.tabs.executeScript(null, {file: "content_script.js"});
    });
}

function clearLocalStorage() {
    chrome.storage.local.clear();
}


document.getElementById('clickactivity').addEventListener('click', injectTheScript);
document.getElementById('clear').addEventListener('click', clearLocalStorage);