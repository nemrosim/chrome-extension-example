// Inform the background page that
// this tab should have a page-action.
chrome.runtime.sendMessage({
    from: 'content',
    subject: 'showPageAction',
});

// Listen for messages from the popup.
chrome.runtime.onMessage.addListener((msg, sender, response) => {
    // First, validate the message's structure.
    if (msg.from === 'popup') {

        const divWithImagesList = document.getElementsByClassName('es-carousel');

        if (divWithImagesList.length === 1) {
            const ulList = divWithImagesList[0].getElementsByTagName('ul');
            if (ulList.length === 1) {
                const imagesList = ulList[0].getElementsByTagName('img');

                if (msg.subject === 'imageUrls') {
                    const result = Array.from(imagesList).map(image => {
                        const imageUrl = image.getAttribute('data-large');
                        if (imageUrl) {
                            const host = 'http://rgada.info/kueh/';
                            return host + imageUrl
                        }
                    });
                    response(result);
                }

                if (msg.subject === 'zifUrls') {
                    const result = Array.from(imagesList).map(image => {
                        const zifUrl = image.getAttribute('data-largeim');
                        if (zifUrl) {
                            const host = 'http://rgada.info/kueh/';
                            return host + zifUrl
                        }
                    });
                    response(result);
                }
            }
        }
    }
});
