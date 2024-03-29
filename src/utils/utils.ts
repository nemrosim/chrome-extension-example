import { LocalFile, ZIF } from './zif';
import { AxiosResponse } from 'axios';
import JSZip from 'jszip';

/**
 * Removes
 */
export const removeMetaDataFromBase64 = (base64: string) => {
    if (base64.startsWith('data:image')) {
        return base64.split(',')[1];
    } else {
        return base64;
    }
};

export const getCanvas = (dimensions: Array<number>) => {
    const canvas = document.createElement('canvas');
    canvas.width = dimensions[0];
    canvas.height = dimensions[1];
    return canvas;
};

export const drawZifImageOnACanvas = async (levels): Promise<any> => {
    let loadAmount = 0;
    const xWidth = levels.widthInTiles();
    const yWidth = levels.heightInTiles();

    const canvas = getCanvas(levels.dimensions());
    const ctx = canvas.getContext('2d');

    const promise = new Promise((resolve) => {
        for (let x = 0; x < xWidth; x++) {
            for (let y = 0; y < yWidth; y++) {
                levels.getTile(x, y).then(
                    function (blob) {
                        const img = new Image();
                        img.src = URL.createObjectURL(blob);
                        img.onload = () => {
                            ctx.drawImage(img, this.x * 256, this.y * 256);
                            loadAmount++;

                            if (loadAmount === xWidth * yWidth) {
                                /**
                                 * Base 64
                                 */
                                const a = canvas.toDataURL();
                                resolve(a);
                            }
                        };
                    }.bind({ x: x, y: y }),
                );
            }
        }
    });

    return await promise;
};

export const convertZifBlobToBase64 = async (
    data: Blob,
    fileName: string,
    callback: Function,
): Promise<any> => {
    if (!(data instanceof Blob)) {
        throw new Error('Input data is not a Blob type');
    }

    const localFile = new LocalFile(data);
    const zif = new ZIF(localFile);

    const levels = await zif.getLevel(0);
    const base64 = await drawZifImageOnACanvas(levels);

    const temp = removeMetaDataFromBase64(base64);
    callback();
    return {
        data: temp,
        fileName,
    };
};

export const extractFileFormatFromUrl = (url: string) => {
    const temp = url.split('/');
    return temp[temp.length - 1].split('.')[1];
};

/**
 * What this do?
 * @param url
 */
export const extractFileNameFromUrl = (url: string) => {
    const temp = url.split('/');
    const result = temp[temp.length - 1].split('.')[0];
    return result;
};

export const convertJpegsResponse = (
    downloadedFiles: Array<AxiosResponse> | Array<{ url: string; data: any }>,
) => {
    const result = [];
    downloadedFiles.forEach((response) => {
        const url = response?.config?.url || response.url;
        const fileName = extractFileNameFromUrl(url);

        result.push({
            fileName,
            data: response.data,
        });
    });

    return result;
};
export const convertZifFilesToJPEGs = async (
    downloadedFiles: Array<AxiosResponse>,
    setAmountOfFilesProcessed,
) => {
    const zifPromises = [];
    downloadedFiles.forEach((response: AxiosResponse) => {
        const fileName = extractFileNameFromUrl(response.config.url);
        zifPromises.push(
            convertZifBlobToBase64(response.data, fileName, () => {
                setAmountOfFilesProcessed((prev) => prev + 1);
            }),
        );
    });

    return await Promise.all(zifPromises);
};

export const splitArrayToChunks = (array: Array<any>, chunkAmount: number) => {
    const temp = [];

    let i,
        j,
        chunk = chunkAmount;

    for (i = 0, j = array.length; i < j; i += chunk) {
        temp.push(array.slice(i, i + chunk));
    }

    return temp;
};

export const createZipFolderWithJPEGs = async (
    jpegs,
    isBase64: boolean = true,
    folderName: string,
) => {
    const zip = new JSZip();
    jpegs.forEach((e) => {
        zip.file(`${folderName}/${e.fileName}.jpg`, e.data, { base64: isBase64 });
    });

    return await zip.generateAsync({ type: 'blob' });
};

export const createLinkForDownload = (
    object: any,
    shouldBeDownloadedImmediately: boolean = false,
): HTMLAnchorElement => {
    const url = URL.createObjectURL(object);

    const htmlAnchorElement = document.createElement('a');

    htmlAnchorElement.download = 'images';
    htmlAnchorElement.href = url;

    if (shouldBeDownloadedImmediately) {
        htmlAnchorElement.click();
    }

    return htmlAnchorElement;
};

export const getDownloadLinkProps = (
    object: any,
    downloadName: string,
): { download: string; href: string } => {
    const url = URL.createObjectURL(object);

    return {
        download: downloadName,
        href: url,
    };
};

type SplitArrayIntoChunks = <T>(params: { array: Array<T>; chunk_size: number }) => Array<Array<T>>;

export const splitArrayIntoChunks: SplitArrayIntoChunks = ({ array, chunk_size }) => {
    const results = [];

    while (array.length) {
        results.push(array.splice(0, chunk_size));
    }

    return results;
};
