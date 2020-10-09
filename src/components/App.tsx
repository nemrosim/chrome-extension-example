import React, { useEffect, useState } from 'react';
import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import '../assets/styles/App.css';
import { Box, Button, CircularProgress, Link, Typography } from "@material-ui/core";
import image from '../assets/images/orel_small.gif'
import { LocalFile, ZIF } from './zif';
import JSZip from "jszip";
import { convertZifBlobToBase64, removeMetaDataFromBase64 } from "../utils/utils";
import { LinearProgressWithLabel } from "./LinearProgresBar";

export const App = () => {

    const [imageUrls, setImageUrls] = useState();
    const [zifUrls, setZifUrls] = useState();
    const [error, setError] = useState();
    const [link, setLink] = useState();

    const [isFileLoading, setIsFileLoading] = useState(false);
    const [percentCompleted, setPercentCompleted] = useState<Array<number>>([]);
    const [totalPercent, setTotalPercent] = useState(0);


    const [amountOfFilesDownloaded, setAmountOfFilesDownloaded] = useState(0);
    const [amountOfFilesProcessed, setAmountOfFilesProcessed] = useState(0);

    const [isGeneratingZip, setIsGeneratingZip] = useState(false);

    const [imageLink, setImageLink] = useState();

    useEffect(() => {
        try {
            if (imageUrls) {
                handleSaveToPC(imageUrls);
                setImageUrls(imageUrls);
            }
        } catch (error) {
            setError(error.message)
        }
    }, [imageUrls])

    const getLargeImageUrlsFromTheDOMHandler = () => {
        chrome.tabs && chrome.tabs.query({
            active: true,
            currentWindow: true
        }, tabs => {
            // ...and send a request for the DOM info...
            chrome.tabs.sendMessage(
                tabs[0].id,
                {from: 'popup', subject: 'imageUrls'},
                // ...also specifying a callback to be called
                //    from the receiving end (content script).
                (response) => {
                    setImageUrls(response)
                });
        });
    };

    const getZifImageUrlsFromTheDOMHandler = () => {
        chrome.tabs && chrome.tabs.query({
            active: true,
            currentWindow: true
        }, tabs => {
            // ...and send a request for the DOM info...
            chrome.tabs.sendMessage(
                tabs[0].id,
                {from: 'popup', subject: 'zifUrls'},
                // ...also specifying a callback to be called
                //    from the receiving end (content script).
                (response) => {
                    console.log('response', response)
                    setZifUrls(response)
                });
        });
    };

    const handleSaveToPC = array => {
        let fileData = '';
        array.forEach(el => {
            fileData += el + '\n';
        })
        const blob = new Blob([fileData], {type: "text/plain"});
        const url = URL.createObjectURL(blob);


        /**
         * Will automatically downloaded
         */
        // const link = document.createElement('a');
        // link.download = 'filename.txt';
        // link.href = url;
        // link.click();

        /**
         * Other way
         */
        setLink({
            download: 'filename.txt',
            href: url,
        })
    }

    const downloadHandler = () => {
        axios.get(imageUrls[0], {responseType: 'arraybuffer'}).then(({data}) => {

            const blob = new Blob([data], {type: 'image/jpeg'});

            // const blob = new Blob([data], {type: "image/jpeg"});
            const url = URL.createObjectURL(blob);
            setImageLink({
                download: 'image.jpg',
                href: url,
            })
        })
    }

    const test = () => {
        axios.get('http://rgada.info/kueh/1/381_1_47/0001.zif', {responseType: 'blob'}).then(({data}) => {

            const localFile = new LocalFile(data);
            console.log('Local file', localFile)
            const zif = new ZIF(localFile);
            console.log('Zif', zif)


            zif.getLevel(0).then((levels) => {
                console.log('LEVELS', levels)
                const dimensions = levels.dimensions();
                console.log('DIMENTIONS', dimensions);
                const canvas = document.createElement('canvas');
                canvas.width = dimensions[0];
                canvas.height = dimensions[1];

                const ctx = canvas.getContext("2d");
                var loadAmount = 0

                const xWidth = levels.widthInTiles();
                const yWidth = levels.heightInTiles();

                new Promise((resolve, reject) => {
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
                                        resolve(canvas.toDataURL());
                                    }
                                }
                            }.bind({x: x, y: y}));
                        }
                    }
                }).then((dataUrl: string) => {


                    var zip = new JSZip();
                    zip.folder("images").file("smile.jpg", dataUrl.split(',')[1], {base64: true});
                    zip.generateAsync({type: "blob"}).then((result) => {

                        const url = URL.createObjectURL(result);

                        const link = document.createElement('a');
                        link.download = 'images';
                        link.href = url;
                        // link.click();
                    })


                })
            });

            //
            // const blob = new Blob([data], {type: 'image/jpeg'});
            // const url = URL.createObjectURL(blob);
            // console.log(url);
        })
    }

    const test_v2 = async () => {
        setIsFileLoading(true);

        const config = {
            responseType: 'blob',
            onUploadProgress: progressEvent => {
                let com = Math.floor((progressEvent.loaded * 100) / progressEvent.total);

                // do whatever you like with the percentage complete
                // maybe dispatch an action that will update a progress bar or something
            }
        } as AxiosRequestConfig;

        const {data} = await axios.get('http://rgada.info/kueh/1/381_1_47/0001.zif', config);

        setIsFileLoading(false);

        const a = await convertZifBlobToBase64(data, 'asd', () => {
        });
        return removeMetaDataFromBase64(a);

        var zip = new JSZip();
        zip.folder("images")

        // .file("smile.jpg", b, {base64: true});
        zip.generateAsync({type: "blob"}).then((result) => {

            const url = URL.createObjectURL(result);

            const link = document.createElement('a');
            link.download = 'images';
            link.href = url;
            link.click();
        })

    }

    const downloadAndSaveAllZifs = async () => {
        setIsFileLoading(true);

        const length = zifUrls.length;

        const axiosGets = [];

        const asd = [];

        zifUrls && zifUrls.slice(0, 5).forEach((zifUrl, index) => {
            const config = {
                responseType: 'blob',
                onDownloadProgress: (progressEvent) => {
                    let compl = Math.floor((progressEvent.loaded * 100) / progressEvent.total);
                    asd[index] = compl || 0;


                    console.log(asd);
                    const a = asd.reduce(function (a, b) {
                        return a + b;
                    }, 0);

                    console.log(a);

                    setTotalPercent(Math.floor(a / length))
                },
            } as AxiosRequestConfig;
            axiosGets.push(axios.get(zifUrl, config));
        });

        const res = await Promise.all(axiosGets);

        setAmountOfFilesDownloaded(res.length);

        setIsFileLoading(false);

        const list = [];
        res.forEach((response: AxiosResponse) => {
                const URL = response.config.url;
                const temp = URL.split('/');
                const fileName = temp[temp.length - 1].split('.')[0];

                list.push(convertZifBlobToBase64(response.data, fileName, () => {
                    setAmountOfFilesProcessed((prev) => prev + 1)
                }))
            }
        )

        const resList = await Promise.all(list);

        console.log('reslist', resList)

        setIsGeneratingZip(true);

        const zip = new JSZip();
        resList.forEach(e => {
            zip.file(`nested/${e.fileName}.jpg`, e.base64, {base64: true});
        })

        const zipres = await zip.generateAsync({type: "blob"});

        const url = URL.createObjectURL(zipres);

        const link = document.createElement('a');
        link.download = 'images';
        link.href = url;
        link.click();

        setIsGeneratingZip(false);
    }

    const save = () => {
        const a = (document.getElementById('canvas') as HTMLCanvasElement).toDataURL('image/jpeg')

        console.log(a);

        const link = document.createElement('a');
        link.download = 'some.jpeg';
        link.href = a;
        link.click();
    }

    const downloadZifFileHandler = () => {
        axios.get(imageUrls[0], {responseType: 'arraybuffer'}).then(({data}) => {

            const blob = new Blob([data], {type: 'image/jpeg'});

            // const blob = new Blob([data], {type: "image/jpeg"});
            const url = URL.createObjectURL(blob);
            setImageLink({
                download: 'image.jpg',
                href: url,
            })
        })
    }

    const isProcessingDownloadedFiles = amountOfFilesDownloaded !== 0 && (amountOfFilesDownloaded !== amountOfFilesProcessed);

    if (isProcessingDownloadedFiles) {
        const get = () => {
            if (amountOfFilesProcessed === 0) {
                return 0
            } else {
                return Math.floor((amountOfFilesProcessed / amountOfFilesDownloaded) * 100)
            }
        }
        return (
            <div className="container">
                <Box m={2}>
                    <img src={image} style={{height: '130px'}}/>
                </Box>
                <Typography variant="h6">
                    Файлы обрабатываються...
                </Typography>
                <Typography variant="h6">
                    Это может занять какое-то время.
                </Typography>
                <LinearProgressWithLabel percentCompleted={get()}/>
                <Typography variant="subtitle2">
                    {`Количество скачанных файлов: ${amountOfFilesDownloaded}`}
                </Typography>
                <Typography variant="subtitle2">
                    {`Количество обработанных файлов: ${amountOfFilesProcessed}`}
                </Typography>
            </div>
        )
    }

    if (isGeneratingZip) {
        return (
            <div className="container">
                <Box m={2}>
                    <img src={image} style={{height: '130px'}}/>
                </Box>
                <Typography variant="h6">
                    Последний штрих...
                </Typography>
                <Typography variant="subtitle2">
                    Создаём архив с изображениями...
                </Typography>
                <Box position="relative" display="inline-flex" m={2}>
                    <CircularProgress/>
                </Box>
            </div>
        )
    }

    return (
        <div className="container">
            {
                isFileLoading && (<LinearProgressWithLabel percentCompleted={totalPercent}/>)
            }
            <Box m={2}>
                <Typography variant="h4">
                    rgada.info
                </Typography>
            </Box>
            <Box m={2}>
                <img src={image} style={{height: '120px'}}/>
            </Box>
            <pre>
                {
                    imageUrls && imageUrls.map(e => (
                        <>
                            <Typography>
                                {e.imageUrl}
                            </Typography>
                            <Typography>
                                {e.zifUrl}
                            </Typography>
                        </>
                    ))
                }
            </pre>
            {
                imageLink && (
                    <a {...imageLink}>Download a file</a>
                )
            }
            {
                imageUrls && imageUrls.length && (
                    <Box m={1}>
                        <Button onClick={downloadHandler} variant='contained' color="primary">
                            Download one file
                        </Button>
                    </Box>
                )
            }
            {
                zifUrls && zifUrls.length && (
                    <Box m={1}>
                        <Button onClick={() => {
                            handleSaveToPC(zifUrls)
                        }} variant='contained' color="primary">
                            Download ZIF urls
                        </Button>
                    </Box>
                )
            }
            {/*<Box m={1}>*/}
            {/*    <Button onClick={getLargeImageUrlsFromTheDOMHandler} variant='contained' color="primary">*/}
            {/*        Get large image Url-s*/}
            {/*    </Button>*/}
            {/*</Box>*/}
            <Box m={1}>
                <Button onClick={getZifImageUrlsFromTheDOMHandler} variant='contained' color="primary">
                    Get zif image Url-s
                </Button>
            </Box>
            {
                zifUrls && zifUrls && (
                    <Box m={1}>
                        <Button onClick={downloadAndSaveAllZifs} variant='contained' color="primary">
                            Download all files
                        </Button>
                    </Box>
                )
            }

            {/*<Box m={1}>*/}
            {/*    <Button onClick={test} variant='contained' color="primary">*/}
            {/*        test*/}
            {/*    </Button>*/}
            {/*</Box>*/}
            {/*<Box m={1}>*/}
            {/*    <Button onClick={test_v2} variant='contained' color="primary">*/}
            {/*        Test 2*/}
            {/*    </Button>*/}
            {/*</Box>*/}
            {/*<Box m={1}>*/}
            {/*    <Button onClick={save} variant='contained' color="primary">*/}
            {/*        save*/}
            {/*    </Button>*/}
            {/*</Box>*/}
            <Box>
                {
                    imageLink && (
                        <Link {...imageLink}>Download a file</Link>
                    )
                }
            </Box>
            <Box m={1}>
                {
                    link && (
                        <Link {...link}>Download text</Link>
                    )
                }
            </Box>
        </div>
    );
}
