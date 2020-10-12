import React, { Dispatch, SetStateAction, useContext, useEffect, useState } from 'react';
import { Box, Button, Link, TextField, Typography } from "@material-ui/core";
import {
    convertJpegsResponse,
    convertZifFilesToJPEGs,
    createZipFolderWithJPEGs,
    getDownloadLinkProps,
    splitArrayToChunks
} from "../utils/utils";
import { CircularProgressWithPercentage, GenerateZipInfo, Logo, ProcessingFilesInfo } from "./";

import '../assets/styles/App.css';
import { GetUrlsFromDOMButton } from "./GetUrlsFromDOMButton";
import { downloadFiles } from "../utils/downloads";
import { AppContext } from "./AppContextProvider";
import { useSnackbar } from "notistack";
import { LocalStorageContext } from "./LocalStorageProvider";
import { ImageData, ImageFormat } from "../types";
import { logInfo, logSuccess } from "../utils/console";

interface DOW {
    urls: Array<ImageData>,
    imageFormat: ImageFormat,
    setter: Dispatch<SetStateAction<number>>,
}

export const App = () => {

    const {
        currentUrl,
        rgadaImageUrls,
        irbisPdfUrl,
        setRgadaImageUrls
    } = useContext(AppContext);

    const {
        isDataSetToLocalStorage,
        setIsDataSetToLocalStorage,
        currentUrlLocalStorageData,
        setCurrentUrlLocalStorageData
    } = useContext(LocalStorageContext);

    const {enqueueSnackbar} = useSnackbar();

    const [downloadLinkForDomImageUrls, setDownloadLinkForDomImageUrls] = useState<Pick<HTMLAnchorElement, 'download' | 'href'>>();

    const [totalPercent, setTotalPercent] = useState(0);

    const [archiveName, setArchiveName] = useState<string>();
    const [isUserClickedReady, setIsUserClickedReady] = useState<boolean>(false);


    const [amountOfFilesDownloaded, setAmountOfFilesDownloaded] = useState(0);
    const [amountOfFilesProcessed, setAmountOfFilesProcessed] = useState(0);

    const [isImagesDownloading, setIsImagesDownloading] = useState(false);
    const [isGeneratingZip, setIsGeneratingZip] = useState(false);

    const [downloadLinkPropsForProcessedFiles, setDownloadLinkPropsForProcessedFiles] = useState();


    const [anchors, setAnchors] = useState([]);

    useEffect(() => {
        /**
         * If image URLs were successfully parsed from DOM
         */
        if (rgadaImageUrls) {
            handleSaveToPC();
        }
        if (irbisPdfUrl) {
            const htmlAnchorElement = document.createElement('a');

            htmlAnchorElement.download = 'images';
            htmlAnchorElement.href = irbisPdfUrl;
            htmlAnchorElement.click()
        }
    }, [irbisPdfUrl, rgadaImageUrls])

    const handleSaveToPC = () => {

        let textData = '';
        rgadaImageUrls.forEach(el => {
            textData += el.url + '\n';
        });

        const domImageURLsBlob = new Blob([textData], {type: "text/plain"});
        const url = URL.createObjectURL(domImageURLsBlob);

        setDownloadLinkForDomImageUrls({
            download: 'filename.txt',
            href: url,
        })

    }


    const downloadDataByChunks = async ({urls, imageFormat, setter}: DOW) => {

        chrome.storage.local.remove([currentUrl], () => {
            console.log('Storage is cleared')
        })

        if (currentUrlLocalStorageData) {
            console.log('Storage not empty', currentUrlLocalStorageData)
            const a = urls.filter(imageData => {
                const found = currentUrlLocalStorageData.downloadedFiles.find(file => {
                    return file.config.url === imageData.url
                })

                console.log('found', found);

                if (found) {
                    return true;
                } else {
                    return false
                }
            })

            console.log("AAAA", a);
        }


        const imageUrlChunks = splitArrayToChunks(urls, 2);

        const result = []
        for (const urls of imageUrlChunks) {
            const downloadedFiles = await downloadFiles({
                imageUrls: urls,
                format: imageFormat,
                setter
            });

            console.log('downloaded files', downloadedFiles)

            chrome.storage.local.set({[currentUrl]: downloadedFiles}, ()=>{
                logSuccess("data is saved")
            })


            // chrome.storage.local.get([currentUrl], (result) => {
            //     if (result[currentUrl]) {
            //         console.log('RESULT', result[currentUrl]);
            //
            //         const a = JSON.parse(result[currentUrl]);
            //
            //         console.log('ZZZ', a)
            //
            //         const tempCopy = [...a.downloadedFiles];
            //
            //         console.log('TEMP', tempCopy);
            //
            //         const res = [...tempCopy, ...downloadedFiles];
            //
            //         console.log('ARRAY RESULT', res);
            //
            //         const value = {
            //             currentUrl,
            //             rgadaImageUrls,
            //             downloadedFiles: [...tempCopy, ...downloadedFiles],
            //             imageFormat,
            //         };
            //
            //         JSON.stringify(value);
            //
            //         chrome.storage
            //             .local.set({[currentUrl]: JSON.stringify(value)}, () => {
            //             logSuccess("Data is set to local storage");
            //         });
            //     } else {
            //         logInfo('Storage is empty');
            //         chrome.storage
            //             .local.set({[currentUrl]: JSON.stringify(value)}, () => {
            //             logSuccess("Data is set to local storage");
            //         });
            //     }
            // });
            result.push(downloadedFiles);
        }
        return result;
    }

    const processChunk = async (temp) => {
        const result = []
        for (const files of temp) {
            const contents = await convertZifFilesToJPEGs(files, setAmountOfFilesProcessed)
            result.push(contents);
        }
        return result;
    }

    const processZipChunk = async (temp) => {
        let part = 0;
        for (const files of temp) {
            part++;
            const name = `${archiveName}-часть${part}`;
            const contents = await createZipFolderWithJPEGs(files, true, name);
            const anchorProps = getDownloadLinkProps(contents, name);

            setAnchors(prev => {
                return [...prev, anchorProps];
            })

        }
    }

    const saveToStorage = () => {

    }

    const downloadAndSaveAllFiles = async () => {
        setIsImagesDownloading(true);
        setAmountOfFilesDownloaded(0);
        setAmountOfFilesProcessed(0);

        const imageFormat = rgadaImageUrls[0].format;

        const downloadedFiles = await downloadDataByChunks({
            imageFormat,
            urls: rgadaImageUrls.slice(0, 2),
            setter: setTotalPercent
        });

        chrome.storage.local.get([currentUrl], (result) => {
            console.log('!!! Value currently is ', result[currentUrl]);
        });


        //
        // setAmountOfFilesDownloaded(downloadedFiles.length);
        //
        // setIsImagesDownloading(false);
        //
        // if (imageFormat === 'zif') {
        //
        //     const temp = [];
        //     let i, j, chunk = 34;
        //     for (i = 0, j = downloadedFiles.length; i < j; i += chunk) {
        //         temp.push(downloadedFiles.slice(i, i + chunk))
        //     }
        //
        //     const convertedJPEGs = await processChunk(temp);
        //
        //     setIsGeneratingZip(true);
        //
        //     await processZipChunk(convertedJPEGs);
        //
        //     enqueueSnackbar('Теперь Вы можете скачать файлы нажав на ссылку выше', {
        //         variant: 'info',
        //     });
        //
        //     enqueueSnackbar('Файлы успешно обработаны', {
        //         variant: 'success',
        //     });
        //
        //     setIsGeneratingZip(false);
        // }

        if (imageFormat === 'jpeg') {
            const convertedJPEGs = await convertJpegsResponse(downloadedFiles)

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
    }

    const isProcessingDownloadedFiles = amountOfFilesDownloaded !== 0 && (amountOfFilesDownloaded !== amountOfFilesProcessed);

    if (rgadaImageUrls && rgadaImageUrls.length && rgadaImageUrls[0].format === 'zif' && isProcessingDownloadedFiles) {
        return (
            <ProcessingFilesInfo
                amountOfFilesDownloaded={amountOfFilesDownloaded}
                amountOfFilesProcessed={amountOfFilesProcessed}
            />
        );
    }

    if (isGeneratingZip) {
        return (<GenerateZipInfo anchors={anchors}/>)
    }

    if (downloadLinkPropsForProcessedFiles) {
        return (
            <div className="container">
                <Logo/>
                <Box mt={4}>
                    <Link {...downloadLinkPropsForProcessedFiles}>
                        Сакачать обработанные файлы
                    </Link>
                </Box>
            </div>
        )
    }

    const shouldShowInputField = !isImagesDownloading && !isGeneratingZip && rgadaImageUrls && !isUserClickedReady;
    const shouldShowDownloadFiles = !isImagesDownloading && !isGeneratingZip && rgadaImageUrls && archiveName && isUserClickedReady;

    return (
        <div className="container">
            {
                isImagesDownloading && (<CircularProgressWithPercentage percentCompleted={totalPercent}/>)
            }
            <Logo/>
            {
                !isImagesDownloading && !rgadaImageUrls && (
                    <GetUrlsFromDOMButton
                        type='zif'
                        text='Получить ссылки на файлы'
                    />
                )
            }
            {
                shouldShowInputField && (
                    <>
                        <Box m={1}>
                            <Typography variant="h6" align='center'>
                                Введите имя документа
                            </Typography>
                        </Box>
                        <Box m={1}>
                            <TextField label="Имя документа" variant="outlined" onChange={(e) => {
                                setArchiveName(e.currentTarget.value)
                            }}/>
                        </Box>
                        <Box m={1}>
                            <Button disabled={!Boolean(archiveName)} onClick={() => {
                                setIsUserClickedReady(true)
                            }} variant='contained' color="primary">
                                Готово
                            </Button>
                        </Box>
                    </>
                )
            }
            {
                shouldShowDownloadFiles && (
                    <Box m={4}>
                        <Button onClick={downloadAndSaveAllFiles} variant='contained' color="primary">
                            {rgadaImageUrls && rgadaImageUrls[0] && rgadaImageUrls[0].format === 'zif' ? 'Обработать файлы' : 'Скачать файлы'}
                        </Button>
                    </Box>
                )
            }
            {
                downloadLinkForDomImageUrls && !isGeneratingZip && !isImagesDownloading && !isUserClickedReady && (
                    <Box mt={4}>
                        <Link {...downloadLinkForDomImageUrls}>
                            Загрузить ссылки на изображения
                        </Link>
                    </Box>
                )
            }
            {
                downloadLinkPropsForProcessedFiles && !isUserClickedReady && (
                    <Box mt={4}>
                        <Link {...downloadLinkPropsForProcessedFiles}>
                            Загрузить ссылки на изображения
                        </Link>
                    </Box>
                )
            }
            {
                anchors && anchors.length !== 0 && anchors.map((e, index) => {
                        return (
                            <Box mt={0}>
                                <Link {...e}>
                                    {`Скачать архив часть ${index + 1}`}
                                </Link>
                            </Box>
                        )
                    }
                )
            }
        </div>
    );
}
