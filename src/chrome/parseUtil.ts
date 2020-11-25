export const parseIrbis = (): Array<string> => {
    const htmlCollectionOfImages = document.getElementsByTagName('img')

    let htmlImageElement: HTMLImageElement;

    Array.from(htmlCollectionOfImages).forEach((imageElement: HTMLImageElement) => {
        if (imageElement.src.includes('irbis_ir/images/full_text.png')) {
            htmlImageElement = imageElement;
        }
    })

    // @ts-ignore
    if (htmlImageElement) {

        const result: Array<string> = []

        const parentElement = htmlImageElement.parentElement;

        const anchors = parentElement?.getElementsByTagName('a');

        if (anchors && anchors.length) {
            Array.from(anchors).forEach((anchorElement: HTMLAnchorElement) => {


                const anchorHref = anchorElement.href;

                const slittedStringList = anchorHref.split('&');

                const lastIndex = slittedStringList.length - 1;

                const fileNameWith = slittedStringList[lastIndex];

                const fileName = fileNameWith.split('=');
                const a = fileName[fileName.length - 1];

                result.push(`http://irbis-nbuv.gov.ua/E_LIB/PDF/${a}.pdf`);
            })
        }
        return result;
    } else {
        return []
    }
}

type ImageFormat = 'jpeg' | 'zif';

export const parseRgada = (imageFormat: ImageFormat): Array<string> | undefined => {
    const htmlCollectionOf = document.getElementsByClassName('es-carousel');

    if (htmlCollectionOf.length === 1) {

        const ulList = htmlCollectionOf[0].getElementsByTagName('ul');

        if (ulList.length === 1) {
            const htmlCollectionOImages = ulList[0].getElementsByTagName('img');

            const HOST = 'http://rgada.info/kueh/';

            const imagesList = Array.from(htmlCollectionOImages);

            const attributeName = imageFormat === 'jpeg' ? 'data-large' : 'data-largeim';

            const result: Array<string> = [];

            imagesList.forEach(image => {
                const imageUrl = image.getAttribute(attributeName);
                imageUrl && result.push(HOST + imageUrl);
            });

            return result;
        }
    }
}
