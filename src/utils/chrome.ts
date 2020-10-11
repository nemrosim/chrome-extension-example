import { HostType, ImageFormat } from "../types";

export const getUrlsFromTheDOMHandler = (host: HostType, imageFormat: ImageFormat, callback: Function) => {
    const queryInfo = {
        active: true,
        currentWindow: true
    };

    chrome.tabs && chrome.tabs.query(queryInfo, tabs => {
        // ...and send a request for the DOM info...
        chrome.tabs.sendMessage(
            tabs[0].id,
            {from: 'popup', host, imageFormat},
            // ...also specifying a callback to be called
            //    from the receiving end (content script).
            (response) => {
                callback(response);
            });
    });
};
