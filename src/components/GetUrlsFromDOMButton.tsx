import React from 'react';
import { Box, Button, Typography } from '@material-ui/core';
import { useSnackbar } from 'notistack';
import { ImageData } from '../types';
import { useUrlContext } from '../components';

import * as Utils from '../utils/chrome';

interface GetUrlsFromDOMButtonProps {
    type: 'jpeg' | 'zif';
    text: string;
}

export const GetUrlsFromDOMButton: React.FC<GetUrlsFromDOMButtonProps> = ({ type, text }) => {
    const { enqueueSnackbar } = useSnackbar();
    const { isRgada, setRgadaImageUrls, setIrbisPdfUrl } = useUrlContext();

    const host = isRgada ? 'rgada' : 'irbis';

    const onClickHandler = () => {
        // @ts-ignore
        Utils.getUrlsFromTheDOMHandler(host, type, (response) => {
            if (response && response instanceof Array && response.length > 0) {
                const temp = response[0].split('/');
                if (temp[temp.length - 1].split('.')[1] === 'jpg') {
                    enqueueSnackbar('Готово', {
                        variant: 'success',
                    });

                    const result = response.map((url) => {
                        return {
                            url,
                            size: 'large',
                            format: 'jpeg',
                        } as ImageData;
                    });
                    setRgadaImageUrls(result);
                } else {
                    enqueueSnackbar('Готово.', {
                        variant: 'success',
                    });

                    const result = response.map((url) => {
                        return {
                            url,
                            size: 'large',
                            format: 'zif',
                        } as ImageData;
                    });
                    setRgadaImageUrls(result);
                }
            }

            if (response && typeof response === 'string') {
                enqueueSnackbar('Готово', {
                    variant: 'success',
                });

                setIrbisPdfUrl(response);
            }
        });
    };
    return (
        <>
            <Box m={1}>
                <Typography variant="body1" align="center" color="secondary">
                    Некоторые изображения занимают по 16 мегабай. Если документ состоит из 170
                    изображений общий размер может составить 2 Гигабайта Учитывайте это! Освободите
                    место на диске если требуется
                </Typography>
            </Box>
            <Box m={4}>
                <Button onClick={onClickHandler} variant="contained" color="primary">
                    {text}
                </Button>
            </Box>
        </>
    );
};
