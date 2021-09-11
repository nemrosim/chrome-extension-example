import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import { Dispatch, SetStateAction } from 'react';
import { ImageFormat, ImageData } from '../types';
import { rejects } from 'assert';
import { splitArrayIntoChunks } from './utils';

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
    imageDataList: Array<ImageData>;
    setter: Dispatch<SetStateAction<number>>;
}

export const createRequestsIntoPromiseAll = async ({
    imageDataList,
    format,
    setter,
}: DownloadFilesProps) => {
    if (imageDataList?.length) {
        const listOfPercentages: Array<number> = [];

        const axiosInstanceList = imageDataList.map(({ url }, index) =>
            axios.get(url, {
                responseType: format === 'jpeg' ? 'arraybuffer' : 'blob',
                onDownloadProgress: (progressEvent) =>
                    onDownloadAxiosProgressHandler({
                        progressEvent,
                        listOfPercentages,
                        index,
                        amountOfUrls: imageDataList.length,
                        setter,
                    }),
            }),
        );

        /**
         * [ [axios1, axios2, axios3], [axios4,axios5,axios6] ]
         */
        const chunks = splitArrayIntoChunks(axiosInstanceList, 5);

        return chunks.map((axiosInstanceListChunk) => Promise.all(axiosInstanceListChunk));
    }
};
