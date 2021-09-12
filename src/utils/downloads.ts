import axios, { AxiosResponse } from 'axios';
import { Dispatch, SetStateAction } from 'react';

type HandleOnDownloadProgress = (props: {
    progressEvent: ProgressEvent;
    index: number;
    amountOfUrls: number;
    listOfPercentages: Array<number>;
    setter: Dispatch<SetStateAction<number>>;
}) => void;

const handleOnDownloadProgress: HandleOnDownloadProgress = ({
    progressEvent,
    index,
    amountOfUrls,
    listOfPercentages,
    setter,
}) => {
    let currentPercentage = Math.floor((progressEvent.loaded * 100) / progressEvent.total);
    listOfPercentages[index] = currentPercentage || 0;

    const totalPercentage = listOfPercentages.reduce((a, b) => a + b, 0);

    setter(Math.floor(totalPercentage / amountOfUrls));
};

type CreateRequestsList = (props: {
    responseType: 'arraybuffer' | 'blob';
    requestUrls: Array<string>;
    setter: Dispatch<SetStateAction<number>>;
}) => Promise<AxiosResponse<any>>[];

export const createRequestsList: CreateRequestsList = ({ requestUrls, responseType, setter }) => {
    // this should be an external array
    // do not move it into the inner function
    const listOfPercentages: Array<number> = [];

    return requestUrls.map((url, index) =>
        axios.get(url, {
            responseType,
            onDownloadProgress: (progressEvent) => {
                handleOnDownloadProgress({
                    progressEvent,
                    listOfPercentages,
                    index,
                    amountOfUrls: requestUrls.length,
                    setter,
                });
            },
        }),
    );
};
