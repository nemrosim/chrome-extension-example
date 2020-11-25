// Inform the background page that
// this tab should have a page-action.

// @ts-ignore
import { parseIrbis, parseRgada } from "./parseUtil";

chrome.runtime.sendMessage({
    from: 'content',
    subject: 'showPageAction',
});

// Listen for messages from the popup.
chrome.runtime.onMessage.addListener((msg, sender, response) => {
    // First, validate the message's structure.
    if (msg.from === 'popup') {
        if (msg.host === 'rgada') {
            response(parseRgada(msg.imageFormat))
        }

        if (msg.host === 'irbis') {
            response(parseIrbis());
        }
    }
});
