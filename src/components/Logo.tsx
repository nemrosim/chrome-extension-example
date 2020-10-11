import image from "../assets/images/orel_small.gif";
import { Box, Typography } from "@material-ui/core";
import React, { useContext } from "react";
import { AppContext } from "./AppContextProvider";

export const Logo = () => {
    const {isRgada, isIrbis} = useContext(AppContext);

    if (isRgada) {
        return (
            <>
                <Box m={1}>
                    <img src={image} style={{height: '120px'}} alt='Logo'/>
                </Box>
                <Box m={1}>
                    <Typography variant="h6" align='center'>
                        Федеральное архивное агенство
                    </Typography>
                    <Typography variant="body1" align='center'>
                        Российский государственный архив
                    </Typography>
                    <Typography variant="body1" align='center'>
                        древних актов
                    </Typography>
                </Box>
            </>
        )
    }

    if (isIrbis) {
        return (
            <>
                <Box m={2}>
                    <Typography variant="h4">
                        Национальная библиотека Украины
                    </Typography>
                </Box>
                <Box m={1}>
                    <Typography variant="h4">
                        имени В.И. Вернадсткого
                    </Typography>
                </Box>
                <Box m={2}>
                    <img src={image} style={{height: '120px'}} alt='Logo'/>
                </Box>
            </>
        )
    }

    return null;
}
