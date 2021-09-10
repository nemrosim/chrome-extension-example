/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { Dispatch, SetStateAction, useCallback, useEffect, useState } from 'react';
import { Box, Button, Link, TextField, Typography } from '@material-ui/core';
import {
    convertJpegsResponse,
    convertZifFilesToJPEGs,
    createZipFolderWithJPEGs,
    getDownloadLinkProps,
    splitArrayToChunks,
    downloadFiles,
    logError,
} from './utils';
import {
    CircularProgressWithPercentage,
    GenerateZipInfo,
    ProcessingFilesInfo,
    GetUrlsFromDOMButton,
    DownloadLinks,
} from './components';

import { useSnackbar } from 'notistack';
import { useLocalStorageContext, useProgressContext, useUrlContext } from './components/contexts';
import { ImageData, ImageFormat } from './types';
import { logInfo, logSuccess } from './utils';
import axios, { AxiosResponse } from 'axios';

interface DOW {
    urls: Array<ImageData>;
    imageFormat: ImageFormat;
    setter: Dispatch<SetStateAction<number>>;
}

const ChromeStorage = chrome.storage.local;

const saveToLocalStorage = (key, data) => {
    logInfo('Saving to local storage');
    chrome.storage.local.set({ [key]: data }, () => {
        logSuccess(`Data is saved to local storage. Key: ${key}`);
    });
};

const getFromLocalStorage = (key) => {
    logInfo(`Getting from local storage. Key: ${key}`);

    chrome.storage.local.get([key], (items) => {
        console.log('6. [Chrome.storage.get] Value currently is ', items);
    });
};

const removeFromLocalStorage = async ({ key }: { key: string }) => {
    return new Promise((resolve, reject) => {
        if (key) {
            logInfo(`Removing from local storage. Key: ${key}`);

            chrome.storage.local.remove([key], () => {
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
        await removeFromLocalStorage({ key: currentUrl });

        if (currentUrlLocalStorageData) {
            console.log('Storage not empty', currentUrlLocalStorageData);
            const a = urls.filter((imageData) => {
                const found = currentUrlLocalStorageData.downloadedFiles.find((file) => {
                    return file.config.url === imageData.url;
                });

                console.log('found', found);

                if (found) {
                    return true;
                } else {
                    return false;
                }
            });

            console.log('AAAA', a);
        }

        logInfo('---URLS---');
        console.log('URL', urls);

        const imageUrlChunks = splitArrayToChunks(urls, 2);

        logInfo('--- CHUNKS ---');
        console.log('Image URL chunks', imageUrlChunks);

        const result = [];
        for (const urls of imageUrlChunks) {
            console.log('urls', urls);
            const downloadedFiles = await downloadFiles({
                imageUrls: urls,
                format: imageFormat,
                setter,
            });

            console.log('downloaded files', downloadedFiles);

            saveToLocalStorage(currentUrl, downloadedFiles);

            chrome.storage.local.get([currentUrl], (result) => {
                logInfo('--> SET');
                console.log('[RESULT]', result[currentUrl]);
                if (result[currentUrl]) {
                    logSuccess('4. IF');

                    const a = JSON.parse(result[currentUrl]);

                    console.log('ZZZ', a);

                    const tempCopy = [...a.downloadedFiles];

                    console.log('TEMP', tempCopy);

                    const res = [...tempCopy, ...downloadedFiles];

                    console.log('ARRAY RESULT', res);

                    const value = {
                        currentUrl,
                        rgadaImageUrls,
                        downloadedFiles: [...tempCopy, ...downloadedFiles],
                        imageFormat,
                    };

                    JSON.stringify(value);

                    chrome.storage.local.set({ [currentUrl]: JSON.stringify(value) }, () => {
                        logSuccess('Data is set to local storage');
                    });
                } else {
                    logInfo('Storage is empty');
                    // chrome.storage
                    //     .local.set({[currentUrl]: JSON.stringify(value)}, () => {
                    //     logSuccess("Data is set to local storage");
                    // });
                }
            });
            result.push(downloadedFiles);
        }
        return result;
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
            console.log(items['one']);
        });
        axios
            .get('http://rgada.info/kueh/1/381_1_47/0001.zif', { responseType: 'blob' })
            .then((response) => {
                console.log('RESPONSE', response);

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
        console.log('[Function] downloadAndSaveAllFiles');
        setIsImagesDownloading(true);
        setAmountOfFilesDownloaded(0);
        setAmountOfFilesProcessed(0);

        const imageFormat = rgadaImageUrls[0].format;
        const imageUrls = rgadaImageUrls.slice(0, 2);

        const downloadedFiles = await downloadDataByChunks({
            imageFormat,
            urls: imageUrls,
            setter: setTotalPercent,
        });

        console.log('5. Downloaded files', downloadedFiles);
        console.log('5. Current URL', currentUrl);

        getFromLocalStorage(currentUrl);

        setAmountOfFilesDownloaded(downloadedFiles.length);
        setIsImagesDownloading(false);

        console.log('7. Image format', imageFormat);

        if (imageFormat === 'zif') {
            const temp = [];
            let i,
                j,
                chunk = 34;
            for (i = 0, j = downloadedFiles.length; i < j; i += chunk) {
                temp.push(downloadedFiles.slice(i, i + chunk));
            }

            const convertedJPEGs = await processChunk(temp);

            setIsGeneratingZip(true);

            await processZipChunk(convertedJPEGs);

            enqueueSnackbar('Теперь Вы можете скачать файлы нажав на ссылку выше', {
                variant: 'info',
            });

            enqueueSnackbar('Файлы успешно обработаны', {
                variant: 'success',
            });

            setIsGeneratingZip(false);
        }

        if (imageFormat === 'jpeg') {
            console.log('8. JPEG block', downloadedFiles);
            const convertedJPEGs = convertJpegsResponse(downloadedFiles[0]);

            console.log('9. Converted jpegs', convertedJPEGs);

            setIsGeneratingZip(true);

            const zippedJPEGs = await createZipFolderWithJPEGs(convertedJPEGs, false, archiveName);

            console.log('10. ZippedJPEGs', zippedJPEGs);

            const anchorProps = getDownloadLinkProps(zippedJPEGs, archiveName);

            console.log('11. Anchor props', anchorProps);

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

    console.log('IS GENERATING ZIP', isGeneratingZip);

    if (a) {
        return (
            <ProcessingFilesInfo
                amountOfFilesDownloaded={amountOfFilesDownloaded}
                amountOfFilesProcessed={amountOfFilesProcessed}
            />
        );
    }

    if (isGeneratingZip) {
        console.log('RENDER ZIP COMPONENT');
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

    console.log('Is images downloading', isImagesDownloading);

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
