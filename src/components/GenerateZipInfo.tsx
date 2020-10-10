import { Box, CircularProgress, Typography } from "@material-ui/core";
import image from "../assets/images/orel_small.gif";
import React from "react";

export const GenerateZipInfo = () => {
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
