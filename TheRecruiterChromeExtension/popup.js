// <!-- c382e92243b2a290c107a12222fe01d635046d49794ab555d7c12f4294bc7b96 -->

function injectTheScript() {
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        // query the active tab, which will be only one tab
        //and inject the script in it
        chrome.tabs.executeScript(null, {file:'jquery-2.2.0.min.js'});
        chrome.tabs.executeScript(tabs[0].id, {file: "content_script.js"});
    });
}

document.getElementById('clickactivity').addEventListener('click', injectTheScript);

Trello.deauthorize();
// location.reload();
Trello.setKey('b1f2a0219e4c69b472b5721208b95535');
Trello.authorize(
    {
        name: "Trello Helper Extension",
        type: "redirect",
        expiration: "never",
        interactive: true,
        scope: {read: true, write: false},
        success: function () {
        },
        error: function () {
        }
    });

var success = function(successMsg) {
  console.log('Trello call succeded');
};

var error = function(errorMsg) {
  console.log('Oups : '+errorMsg);
};
Trello.get('/member/me/boards', success, error);