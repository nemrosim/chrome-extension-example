import { LocalFile, ZIF } from "../components/zif";

/**
 * Removes
 */
export const removeMetaDataFromBase64 = (base64: string) => {
    if (base64.startsWith('data:image')) {
        return base64.split(',')[1]
    } else {
        return base64;
    }
}

export const getCanvas = (dimensions: Array<number>) => {
    const canvas = document.createElement('canvas');
    canvas.width = dimensions[0];
    canvas.height = dimensions[1];
    return canvas;
}

export const drawZifImageOnACanvas = async (levels): Promise<any> => {
    let loadAmount = 0;
    const xWidth = levels.widthInTiles();
    const yWidth = levels.heightInTiles();

    const canvas = getCanvas(levels.dimensions());
    const ctx = canvas.getContext("2d");

    const promise = new Promise((resolve) => {
        for (let x = 0; x < xWidth; x++) {
            for (let y = 0; y < yWidth; y++) {
                levels.getTile(x, y).then(function (blob) {
                    const img = new Image;
                    img.src = URL.createObjectURL(blob);
                    img.onload = () => {
                        ctx.drawImage(img, this.x * 256, this.y * 256);
                        loadAmount++;

                        if (loadAmount === (xWidth * yWidth)) {
                            /**
                             * Base 64
                             */
                            const a = canvas.toDataURL();
                            resolve(a);
                        }
                    }
                }.bind({x: x, y: y}));
            }
        }
    });

    return await promise;
}

export const fetchDataAndReturnBase64StringForZipFolder = () => {


}
export const convertZifBlobToBase64 = async (data: Blob, fileName: string, callback: Function): Promise<any> => {
    if (!(data instanceof Blob)) {
        throw new Error('Input data is not a Blob type')
    }

    const localFile = new LocalFile(data);
    const zif = new ZIF(localFile);

    const levels = await zif.getLevel(0);
    const base64 =  await drawZifImageOnACanvas(levels);

    const temp = removeMetaDataFromBase64(base64);
    callback();
    return {
        base64: temp,
        fileName,
    }
}

export const addFileToZipFolder = ()=>{

}

