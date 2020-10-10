import React, { useEffect, useState } from 'react';
import { Box, Button, Link, Typography } from "@material-ui/core";
import {
    convertJpegsResponse,
    convertZifFilesToJPEGs,
    createLinkForDownload,
    createZipFolderWithJPEGs
} from "../utils/utils";
import { CircularProgressWithPercentage, GenerateZipInfo, Logo, ProcessingFilesInfo } from "./";

import '../assets/styles/App.css';
import { GetUrlsFromDOMButton } from "./GetUrlsFromDOMButton";
import { ImageUrl } from "../types";
import { downloadFiles } from "../utils/downloads";

export const App = () => {

    const [domImageUrls, setDomImageUrls] = useState<Array<ImageUrl>>();

    const [downloadLinkForDomImageUrls, setDownloadLinkForDomImageUrls] = useState<Pick<HTMLAnchorElement, 'download' | 'href'>>();

    const [totalPercent, setTotalPercent] = useState(0);

    const [amountOfFilesDownloaded, setAmountOfFilesDownloaded] = useState(0);
    const [amountOfFilesProcessed, setAmountOfFilesProcessed] = useState(0);

    const [isImagesDownloading, setIsImagesDownloading] = useState(false);
    const [isGeneratingZip, setIsGeneratingZip] = useState(false);


    useEffect(() => {
        /**
         * If image URLs were successfully parsed from DOM
         */
        if (domImageUrls) {
            handleSaveToPC();
        }
    }, [domImageUrls])

    const handleSaveToPC = () => {

        let textData = '';
        domImageUrls.forEach(el => {
            textData += el.url + '\n';
        });

        const domImageURLsBlob = new Blob([textData], {type: "text/plain"});
        const url = URL.createObjectURL(domImageURLsBlob);

        setDownloadLinkForDomImageUrls({
            download: 'filename.txt',
            href: url,
        })
    }

    const downloadAndSaveAllFiles = async () => {
        setIsImagesDownloading(true);

        const imageFormat = domImageUrls[0].format;
        const downloadedFiles = await downloadFiles({
            imageUrls: domImageUrls,
            format: imageFormat,
            setter: setTotalPercent
        })

        setAmountOfFilesDownloaded(downloadedFiles.length);

        setIsImagesDownloading(false);

        if (imageFormat === 'zif') {
            const convertedJPEGs = await convertZifFilesToJPEGs(downloadedFiles, setAmountOfFilesProcessed)

            setIsGeneratingZip(true);

            const zippedJPEGs = await createZipFolderWithJPEGs(convertedJPEGs)

            createLinkForDownload(zippedJPEGs);

            setIsGeneratingZip(false);
        }

        if (imageFormat === 'jpeg') {
            const convertedJPEGs = await convertJpegsResponse(downloadedFiles)

            setIsGeneratingZip(true);

            const zippedJPEGs = await createZipFolderWithJPEGs(convertedJPEGs, false);

            createLinkForDownload(zippedJPEGs, true);

            setIsGeneratingZip(false);
        }
    }

    const isProcessingDownloadedFiles = amountOfFilesDownloaded !== 0 && (amountOfFilesDownloaded !== amountOfFilesProcessed);

    if (domImageUrls && domImageUrls.length && domImageUrls[0].format === 'zif' && isProcessingDownloadedFiles) {
        return (
            <ProcessingFilesInfo
                amountOfFilesDownloaded={amountOfFilesDownloaded}
                amountOfFilesProcessed={amountOfFilesProcessed}
            />
        );
    }

    if (isGeneratingZip) {
        return (<GenerateZipInfo/>)
    }

    return (
        <div className="container">
            {
                isImagesDownloading && (<CircularProgressWithPercentage percentCompleted={totalPercent}/>)
            }
            <Box m={2}>
                <Typography variant="h4">
                    rgada.info
                </Typography>
            </Box>
            <Logo/>
            <GetUrlsFromDOMButton setter={setDomImageUrls} type='zif' text='Получить ссылки на ZIF файлы'/>
            <GetUrlsFromDOMButton setter={setDomImageUrls} type='jpeg' text='Получить ссылки на JPEG файлы'/>
            {
                domImageUrls && domImageUrls && (
                    <Box m={1}>
                        <Button onClick={downloadAndSaveAllFiles} variant='contained' color="primary">
                            Download all ZIFs
                        </Button>
                    </Box>
                )
            }
            {
                downloadLinkForDomImageUrls && (
                    <Box mt={1}>
                        <Link {...downloadLinkForDomImageUrls}>
                            Скачать ссылки на изображения
                        </Link>
                    </Box>

                )
            }
        </div>
    );
}
