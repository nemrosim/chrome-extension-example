import { Box, Button, Typography } from "@material-ui/core";
import React, { useContext } from "react";
import * as Utils from "../utils/chrome";
import { useSnackbar } from "notistack";
import { ImageUrl } from "../types";
import { AppContext } from "./AppContextProvider";

interface GetUrlsFromDOMButtonProps {
    type: 'jpeg' | 'zif',
    text: string
}

export const GetUrlsFromDOMButton: React.FC<GetUrlsFromDOMButtonProps> = ({type, text}) => {
    const {enqueueSnackbar} = useSnackbar();
    const {isRgada, setRgadaImageUrls, setIrbisPdfUrl} = useContext(AppContext);

    const host = isRgada ? 'rgada' : 'irbis'

    const onClickHandler = () => {
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
                        } as ImageUrl
                    })
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
                        } as ImageUrl
                    })
                    setRgadaImageUrls(result);
                }
            }

            if (response && typeof response === 'string') {
                enqueueSnackbar('Готово', {
                    variant: 'success',
                });

                setIrbisPdfUrl(response);
            }
        })
    }
    return (
        <>
            <Typography variant="body1">
                Некоторые изображения занимают по 16 мегабай.
            </Typography>
            <Typography variant="body1">
                Если документ состоит из 170 изабражений
            </Typography>
            <Typography variant="body1">
                общий размер может составить 2 Гигабайта
            </Typography>
            <Typography variant="body1">
                Учитывайте это! Освободите место на диске
            </Typography>
            <Typography variant="body1">
                если требуется
            </Typography>
        <Box m={4}>
            <Button onClick={onClickHandler} variant='contained' color="primary">
                {text}
            </Button>
        </Box>
            </>
    )
}
