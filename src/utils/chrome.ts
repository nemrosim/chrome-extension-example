export const getUrlsFromTheDOMHandler = (type: 'jpeg' | 'zif', callback: Function) => {
    chrome.tabs && chrome.tabs.query({
        active: true,
        currentWindow: true
    }, tabs => {
        // ...and send a request for the DOM info...
        chrome.tabs.sendMessage(
            tabs[0].id,
            {from: 'popup', subject: type === 'jpeg' ? 'imageUrls' : 'zifUrls'},
            // ...also specifying a callback to be called
            //    from the receiving end (content script).
            (response) => {
                callback(response);
            });
    });
};
