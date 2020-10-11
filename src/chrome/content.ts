// Inform the background page that
// this tab should have a page-action.

// @ts-ignore
chrome.runtime.sendMessage({
    from: 'content',
    subject: 'showPageAction',
});

// Listen for messages from the popup.
chrome.runtime.onMessage.addListener((msg, sender, response) => {
    // First, validate the message's structure.
    if (msg.from === 'popup') {


        /**
         * Parse image urls from rgada
         */
        if (msg.host === 'rgada') {

            const divWithImagesList = document.getElementsByClassName('es-carousel');

            if (divWithImagesList.length === 1) {

                const ulList = divWithImagesList[0].getElementsByTagName('ul');
                if (ulList.length === 1) {

                    const imagesList = ulList[0].getElementsByTagName('img');


                    if (msg.imageFormat === 'jpeg') {

                        const result = Array.from(imagesList).map(image => {
                            const imageUrl = image.getAttribute('data-large');
                            if (imageUrl) {
                                const host = 'http://rgada.info/kueh/';
                                return host + imageUrl
                            }
                        });
                        response(result);
                    }

                    if (msg.imageFormat === 'zif') {

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


        if (msg.host === 'irbis') {
            const imgs = document.getElementsByTagName('img')

            let result;
            Array.from(imgs).forEach(e => {
                if (e.src && e.src.includes('irbis_ir/images/full_text.png')) {
                    result = e;
                }
            })

            if (result) {
                const p = result.parentElement;

                const anchors = p.getElementsByTagName('a');

                if (anchors && anchors.length) {
                    const href = anchors[0].href;
                    const splitRes = href.split('&');
                    const fileNameWith = splitRes[splitRes.length - 1];
                    const fileName = fileNameWith.split('=');
                    const a = fileName[fileName.length - 1];
                    response(`http://irbis-nbuv.gov.ua/E_LIB/PDF/${a}.pdf`);
                }
            }
        }
    }
});
