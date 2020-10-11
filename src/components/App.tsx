import React, { useContext, useEffect, useState } from 'react';
import { Box, Button, Link, TextField, Typography } from "@material-ui/core";
import {
    convertJpegsResponse,
    convertZifFilesToJPEGs,
    createZipFolderWithJPEGs,
    getDownloadLinkProps
} from "../utils/utils";
import { CircularProgressWithPercentage, GenerateZipInfo, Logo, ProcessingFilesInfo } from "./";

import '../assets/styles/App.css';
import { GetUrlsFromDOMButton } from "./GetUrlsFromDOMButton";
import { downloadFiles } from "../utils/downloads";
import { AppContext } from "./AppContextProvider";
import { useSnackbar } from "notistack";

export const App = () => {

    const {rgadaImageUrls, irbisPdfUrl, setRgadaImageUrls} = useContext(AppContext);
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

    const asd = () => {

    }

    const downloadAndSaveAllFiles = async () => {
        setIsImagesDownloading(true);
        setAmountOfFilesDownloaded(0);
        setAmountOfFilesProcessed(0);

        const imageFormat = rgadaImageUrls[0].format;



        const downloadedFiles = await downloadFiles({
            imageUrls: rgadaImageUrls,
            format: imageFormat,
            setter: setTotalPercent
        });

        console.log('downloadedFiles')


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
