// Inform the background page that
// this tab should have a page-action.

import { parseIrbis, parseRgada } from './parseUtil';
import { APP_NAME, MessageHosts } from '../types';

chrome.runtime.sendMessage({
    from: 'content',
    subject: 'showPageAction',
});

/**
 * Listen for messages from the popup.
 */
chrome.runtime.onMessage.addListener((msg, sender, response) => {
    // First, validate the message's structure.
    if (msg.from === APP_NAME) {
        if (msg.host === MessageHosts.RGADA) {
            response(parseRgada(msg.imageFormat));
        }

        if (msg.host === MessageHosts.IRBIS) {
            response(parseIrbis());
        }
    }
});
