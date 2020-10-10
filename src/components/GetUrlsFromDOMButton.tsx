import { Box, Button } from "@material-ui/core";
import React, { Dispatch, SetStateAction } from "react";
import { getUrlsFromTheDOMHandler } from "../utils/chrome";
import { useSnackbar } from "notistack";
import { ImageUrl } from "../types";

interface GetUrlsFromDOMButtonProps {
    setter: Dispatch<SetStateAction<Array<ImageUrl>>>,
    type: 'jpeg' | 'zif',
    text: string
}

export const GetUrlsFromDOMButton: React.FC<GetUrlsFromDOMButtonProps> = ({setter, type, text}) => {
    const {enqueueSnackbar} = useSnackbar();

    const onClickHandler = () => {
        getUrlsFromTheDOMHandler(type, (response) => {

            if (response && response instanceof Array && response.length > 0) {
                const temp = response[0].split('/');
                if (temp[temp.length - 1].split('.')[1] === 'jpg') {
                    enqueueSnackbar('Это не Zif файлы, а Jpeg', {
                        variant: 'info',
                    });
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
                    setter(result);
                } else {
                    const result = response.map((url) => {
                        return {
                            url,
                            size: 'large',
                            format: 'zif',
                        } as ImageUrl
                    })
                    setter(result);
                }
            }
        })
    }
    return (
        <Box m={1}>
            <Button onClick={onClickHandler} variant='contained' color="primary">
                {text}
            </Button>
        </Box>
    )
}
