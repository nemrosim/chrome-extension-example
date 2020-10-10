import { Box, Typography } from "@material-ui/core";
import image from "../assets/images/orel_small.gif";
import { CircularProgressWithPercentage } from "./CircularProgressWithPercentage";
import React from "react";

interface ProcessingFilesInfoProps {
    amountOfFilesProcessed: number;
    amountOfFilesDownloaded: number;
}

export const ProcessingFilesInfo: React.FC<ProcessingFilesInfoProps> = ({
                                                                            amountOfFilesDownloaded,
                                                                            amountOfFilesProcessed
                                                                        }) => {
    const getPercentage = () => {
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
            <CircularProgressWithPercentage percentCompleted={getPercentage()}/>
            <Typography variant="subtitle2">
                {`Количество скачанных файлов: ${amountOfFilesDownloaded}`}
            </Typography>
            <Typography variant="subtitle2">
                {`Количество обработанных файлов: ${amountOfFilesProcessed}`}
            </Typography>
        </div>
    )
}
