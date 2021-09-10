import React from 'react';
import { Typography } from '@material-ui/core';
import { CircularProgressWithPercentage } from './CircularProgressWithPercentage';
import { Logo } from './Logo';

interface ProcessingFilesInfoProps {
    amountOfFilesProcessed: number;
    amountOfFilesDownloaded: number;
}

export const ProcessingFilesInfo: React.FC<ProcessingFilesInfoProps> = ({
    amountOfFilesDownloaded,
    amountOfFilesProcessed,
}) => {
    const getPercentage = () => {
        if (amountOfFilesProcessed === 0) {
            return 0;
        } else {
            return Math.floor((amountOfFilesProcessed / amountOfFilesDownloaded) * 100);
        }
    };
    return (
        <div className="container">
            <Logo />
            <Typography variant="h6">Файлы обрабатываються...</Typography>
            <Typography variant="h6">Это может занять какое-то время.</Typography>
            <Typography variant="h6">! Не закрывайте это окно !</Typography>
            <CircularProgressWithPercentage percentCompleted={getPercentage()} />
            <Typography variant="subtitle2">
                {`Количество скачанных файлов: ${amountOfFilesDownloaded}`}
            </Typography>
            <Typography variant="subtitle2">
                {`Количество обработанных файлов: ${amountOfFilesProcessed}`}
            </Typography>
        </div>
    );
};
