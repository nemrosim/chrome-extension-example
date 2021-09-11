/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { Dispatch, SetStateAction, useCallback, useEffect, useState } from 'react';
import { Box, Button, Link, TextField, Typography } from '@material-ui/core';
import {
    createRequestsIntoPromiseAll,
    convertJpegsResponse,
    convertZifFilesToJPEGs,
    createZipFolderWithJPEGs,
    getDownloadLinkProps,
    logError,
    logInfo,
    logSuccess,
} from './utils';
import {
    CircularProgressWithPercentage,
    DownloadLinks,
    GenerateZipInfo,
    GetUrlsFromDOMButton,
    ProcessingFilesInfo,
} from './components';

import { useSnackbar } from 'notistack';
import { useLocalStorageContext, useProgressContext, useUrlContext } from './components/contexts';
import { ImageData, ImageFormat } from './types';
import axios, { AxiosResponse } from 'axios';

interface DOW {
    urls: Array<ImageData>;
    imageFormat: ImageFormat;
    setter: Dispatch<SetStateAction<number>>;
}

function arrayBufferToBase64(buffer) {
    let binary = '';
    let bytes = new Uint8Array(buffer);
    let len = bytes.byteLength;
    for (let i = 0; i < len; i++) {
        binary += String.fromCharCode(bytes[i]);
    }
    return window.btoa(binary);
}

function base64ToArrayBuffer(base64) {
    let binary_string = window.atob(base64);
    let len = binary_string.length;
    let bytes = new Uint8Array(len);
    for (let i = 0; i < len; i++) {
        bytes[i] = binary_string.charCodeAt(i);
    }
    return bytes.buffer;
}

const ChromeStorage = chrome.storage.local;

const saveToLocalStorage = (key, data) => {
    return new Promise((resolve, reject) => {
        if (key && data) {
            logInfo('Saving to local storage...');
            console.log(data);

            try {
                const setOptions = { [key]: data };
                console.log('SET OPTIONS', setOptions);
                chrome.storage.local.set(setOptions, () => {
                    logSuccess(`Data is saved to local storage. Key: ${key}`);
                    resolve(true);
                });
            } catch (error) {
                console.error('ERROR', error);
                reject(error);
            }
        } else {
            logError('Cant save local storage. Key is undefined');
            reject('Key OR data is undefined');
        }
    });
};

const getFromLocalStorage = (key): Promise<unknown> => {
    return new Promise((resolve, reject) => {
        if (key) {
            logInfo(`Getting from local storage. Key: ${key}`);

            try {
                chrome.storage.local.get(key, (items) => {
                    resolve(items[key]);
                });
            } catch (e) {
                console.error('ERROR', e);
                reject(e);
            }
        } else {
            logError('Cant remove from storage. Key is undefined');
            reject('Key is undefined');
        }
    });
};

const removeFromLocalStorage = async ({ key }: { key: string }) => {
    return new Promise((resolve, reject) => {
        if (key) {
            logInfo(`Removing from local storage. Key: ${key}`);

            chrome.storage.local.remove(key, () => {
                logSuccess('Storage is cleared');
                resolve(true);
            });
        } else {
            logError('Cant remove from storage. Key is undefined');
            reject(false);
        }
    });
};

export const App = () => {
    const { currentUrl, rgadaImageUrls, irbisPdfUrl, setRgadaImageUrls } = useUrlContext();
    const {
        amountOfFilesDownloaded,
        setAmountOfFilesDownloaded,
        amountOfFilesProcessed,
        setAmountOfFilesProcessed,
        totalPercent,
        setTotalPercent,
        isGeneratingZip,
        setIsGeneratingZip,
        isImagesDownloading,
        setIsImagesDownloading,
    } = useProgressContext();

    const LOCAL_STORAGE_KEY = 'KEY';

    const {
        isDataSetToLocalStorage,
        setIsDataSetToLocalStorage,
        currentUrlLocalStorageData,
        setCurrentUrlLocalStorageData,
    } = useLocalStorageContext();

    const { enqueueSnackbar } = useSnackbar();

    /**
     * Ссылка на TXT файл в котором будут ссылки на изображения.
     * Этот файл может быть использован в DownloadMaster
     */
    const [downloadLinkForDomImageUrls, setDownloadLinkForDomImageUrls] =
        useState<Pick<HTMLAnchorElement, 'download' | 'href'>>();

    const [archiveName, setArchiveName] = useState<string>();
    const [isUserClickedReady, setIsUserClickedReady] = useState<boolean>(false);

    const [downloadLinkPropsForProcessedFiles, setDownloadLinkPropsForProcessedFiles] =
        useState<{ download: string; href: string }>();

    const [anchors, setAnchors] = useState([]);

    const createTextFileWithURLsForDownload = useCallback(() => {
        let textData = '';
        rgadaImageUrls.forEach((el) => {
            textData += `${el.url}\n`;
        });

        const domImageURLsBlob = new Blob([textData], { type: 'text/plain' });
        const url = URL.createObjectURL(domImageURLsBlob);

        setDownloadLinkForDomImageUrls({
            download: 'filename.txt',
            href: url,
        });
    }, [rgadaImageUrls]);

    useEffect(() => {
        /**
         * If image URLs were successfully parsed from the DOM
         */
        if (rgadaImageUrls) {
            createTextFileWithURLsForDownload();
        }
        if (irbisPdfUrl) {
            const htmlAnchorElement = document.createElement('a');

            htmlAnchorElement.download = 'images';
            htmlAnchorElement.href = irbisPdfUrl;
            htmlAnchorElement.click();
        }
    }, [irbisPdfUrl, rgadaImageUrls, createTextFileWithURLsForDownload]);

    // http://rgada.info/kueh/1/381_1_47/0001.zif

    const downloadDataByChunks = async ({ urls, imageFormat, setter }: DOW) => {
        /**
         * [PromiseAll, PromiseAll, PromiseAll]
         */
        const promiseAllList = await createRequestsIntoPromiseAll({
            imageDataList: urls,
            format: imageFormat,
            setter,
        });

        // Reading in sequence
        for (const promiseAll of promiseAllList) {
            const contents = await promiseAll;

            // Update local storage
            const a = await getFromLocalStorage(LOCAL_STORAGE_KEY);
            // @ts-ignore
            console.log('From storage', a.length);
            console.log('Downloaded', contents.length);

            const imagesFromResponse = contents.map((response) => {
                // @ts-ignore
                return { url: response.config.url, data: response.data };
            });

            const imagesFromStorage = Array.isArray(a) ? a : [];

            const converted = imagesFromResponse.map((e) => ({
                url: e.url,
                /**
                 * We NEED to convert ArrayBuffer object to Base64 so that we could save data to JSON.
                 */
                data: arrayBufferToBase64(e.data),
            }));

            imagesFromStorage.forEach((elem) => {
                converted.push(elem);
            });

            // @ts-ignore
            const b = await saveToLocalStorage(
                LOCAL_STORAGE_KEY,

                converted,
            );
        }

        logSuccess('AFTER FOR');
    };

    const processChunk = async (temp) => {
        const result = [];
        for (const files of temp) {
            const contents = await convertZifFilesToJPEGs(files, setAmountOfFilesProcessed);
            result.push(contents);
        }
        return result;
    };

    const processZipChunk = async (temp) => {
        let part = 0;
        for (const files of temp) {
            part++;
            const name = `${archiveName}-часть${part}`;
            const contents = await createZipFolderWithJPEGs(files, true, name);
            const anchorProps = getDownloadLinkProps(contents, name);

            setAnchors((prev) => {
                return [...prev, anchorProps];
            });
        }
    };

    const saveToStorage = () => {};

    const testClick = () => {
        ChromeStorage.get(['one'], (items) => {
            logSuccess('Data was get');
        });
        axios
            .get('http://rgada.info/kueh/1/381_1_47/0001.zif', { responseType: 'blob' })
            .then((response) => {
                const res = {
                    ...response,
                    data: URL.createObjectURL(response.data),
                } as AxiosResponse;

                chrome.storage.local.set({ ['one']: res }, () => {
                    logSuccess('Data is set');
                });
            });
    };

    const downloadAndSaveAllFiles = async () => {
        setIsImagesDownloading(true);
        setAmountOfFilesDownloaded(0);
        setAmountOfFilesProcessed(0);

        const imageFormat = rgadaImageUrls[0].format;

        const downloadedFiles = await downloadDataByChunks({
            imageFormat,
            urls: rgadaImageUrls,
            setter: setTotalPercent,
        });

        /**
         * CHECK this
         */
        // const data = await getFromLocalStorage(currentUrl);

        // console.log('==> Data from local storage', data);

        // @ts-ignore
        setAmountOfFilesDownloaded(downloadedFiles.length);
        setIsImagesDownloading(false);

        if (imageFormat === ImageFormat.zif) {
            setIsGeneratingZip(true);

            const temp = [];
            let i,
                j,
                chunk = 34;
            // @ts-ignore
            for (i = 0, j = downloadedFiles.length; i < j; i += chunk) {
                // @ts-ignore
                temp.push(downloadedFiles.slice(i, i + chunk));
            }

            const convertedJPEGs = await processChunk(temp);

            await processZipChunk(convertedJPEGs);

            enqueueSnackbar('Теперь Вы можете скачать файлы нажав на ссылку выше', {
                variant: 'info',
            });

            enqueueSnackbar('Файлы успешно обработаны', {
                variant: 'success',
            });

            setIsGeneratingZip(false);
        }

        if (imageFormat === ImageFormat.jpeg) {
            // @ts-ignore
            const convertedJPEGs = convertJpegsResponse(downloadedFiles);
            setIsGeneratingZip(true);

            const zippedJPEGs = await createZipFolderWithJPEGs(convertedJPEGs, false, archiveName);
            const anchorProps = getDownloadLinkProps(zippedJPEGs, archiveName);

            enqueueSnackbar('Теперь Вы можете скачать файлы нажав на ссылку выше', {
                variant: 'info',
            });

            enqueueSnackbar('Файлы успешно обработаны', {
                variant: 'success',
            });

            setDownloadLinkPropsForProcessedFiles(anchorProps);

            setIsGeneratingZip(false);
        }
    };

    const isProcessingDownloadedFiles =
        amountOfFilesDownloaded !== 0 && amountOfFilesDownloaded !== amountOfFilesProcessed;

    const a =
        rgadaImageUrls?.length && rgadaImageUrls[0].format === 'zif' && isProcessingDownloadedFiles;

    if (a) {
        return (
            <ProcessingFilesInfo
                amountOfFilesDownloaded={amountOfFilesDownloaded}
                amountOfFilesProcessed={amountOfFilesProcessed}
            />
        );
    }

    if (isGeneratingZip) {
        return <GenerateZipInfo anchors={anchors} />;
    }

    if (downloadLinkPropsForProcessedFiles) {
        return (
            <div className="container">
                <Box mt={4}>
                    <Link {...downloadLinkPropsForProcessedFiles}>
                        {`Скачать архив "${downloadLinkPropsForProcessedFiles.download}.zip"`}
                    </Link>
                </Box>
            </div>
        );
    }

    const shouldShowInputField =
        !isImagesDownloading && !isGeneratingZip && rgadaImageUrls && !isUserClickedReady;

    const shouldShowDownloadFiles =
        !isImagesDownloading &&
        !isGeneratingZip &&
        rgadaImageUrls &&
        archiveName &&
        isUserClickedReady;

    const shouldShowLink =
        downloadLinkForDomImageUrls &&
        !isGeneratingZip &&
        !isImagesDownloading &&
        !isUserClickedReady;

    if (isImagesDownloading || isGeneratingZip) {
        return <CircularProgressWithPercentage percentCompleted={totalPercent} />;
    }

    if (!isImagesDownloading && !rgadaImageUrls) {
        return <GetUrlsFromDOMButton type="zif" text="Получить ссылки на файлы" />;
    }

    if (shouldShowInputField) {
        return (
            <>
                <Box m={1}>
                    <Typography align="center">
                        Будет создан архив (zip) после скачивания изображений
                    </Typography>
                    <Typography variant="h6" align="center">
                        Введите имя будущего архива
                    </Typography>
                </Box>
                <Box m={1}>
                    <TextField
                        label="Имя документа"
                        variant="outlined"
                        onChange={(e) => {
                            setArchiveName(e.currentTarget.value);
                        }}
                    />
                </Box>
                <Box m={1}>
                    <Button
                        disabled={!archiveName}
                        onClick={() => {
                            setIsUserClickedReady(true);
                        }}
                        variant="contained"
                        color="primary"
                    >
                        Готово
                    </Button>
                </Box>
            </>
        );
    }

    if (shouldShowDownloadFiles) {
        return (
            <Box m={4}>
                <Button onClick={downloadAndSaveAllFiles} variant="contained" color="primary">
                    {rgadaImageUrls?.length && rgadaImageUrls[0].format === 'zif'
                        ? 'Обработать файлы'
                        : 'Скачать файлы'}
                </Button>
            </Box>
        );
    }

    if (shouldShowLink) {
        return <DownloadLinks link={downloadLinkForDomImageUrls} />;
    }

    if (downloadLinkPropsForProcessedFiles && !isUserClickedReady) {
        return (
            <Box mt={4}>
                <Link {...downloadLinkPropsForProcessedFiles}>Загрузить ссылки на изображения</Link>
            </Box>
        );
    }

    return (
        <>
            {anchors?.length &&
                anchors.map((e, index) => {
                    return (
                        <Box key={index} mt={0}>
                            <Link {...e}>{`Скачать архив часть ${index + 1}`}</Link>
                        </Box>
                    );
                })}
        </>
    );
};
