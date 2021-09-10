import axios, { AxiosRequestConfig } from 'axios';
import { Dispatch, SetStateAction } from 'react';
import { ImageFormat, ImageData } from '../types';

const onDownloadAxiosProgressHandler = ({
    progressEvent,
    index,
    amountOfUrls,
    listOfPercentages,
    setter,
}: {
    progressEvent: ProgressEvent;
    index: number;
    amountOfUrls: number;
    listOfPercentages: Array<number>;
    setter: Dispatch<SetStateAction<number>>;
}) => {
    let currentPercentage = Math.floor((progressEvent.loaded * 100) / progressEvent.total);
    listOfPercentages[index] = currentPercentage || 0;

    const totalPercentage = listOfPercentages.reduce((a, b) => a + b, 0);

    setter(Math.floor(totalPercentage / amountOfUrls));
};

interface DownloadFilesProps {
    format: ImageFormat;
    imageUrls: Array<ImageData>;
    setter: Dispatch<SetStateAction<number>>;
}

export const downloadFiles = async ({ imageUrls, format, setter }: DownloadFilesProps) => {
    const axiosPromises: Array<Promise<any>> = [];
    const listOfPercentages: Array<number> = [];

    imageUrls &&
        imageUrls.forEach((zifUrl, index) => {
            const config = {
                responseType: format === 'jpeg' ? 'arraybuffer' : 'blob',
                onDownloadProgress: (progressEvent) =>
                    onDownloadAxiosProgressHandler({
                        progressEvent,
                        listOfPercentages,
                        index,
                        amountOfUrls: imageUrls.length,
                        setter,
                    }),
            } as AxiosRequestConfig;
            axiosPromises.push(axios.get(zifUrl.url, config));
        });

    return await Promise.all(axiosPromises);
};
