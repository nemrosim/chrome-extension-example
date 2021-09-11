import React from 'react';
import { Box, CircularProgress, Link, Typography } from '@material-ui/core';
import { Logo } from './Logo';

export const GenerateZipInfo: React.FC<{ anchors: Array<any> }> = ({ anchors }) => {
    return (
        <div className="container">
            <Typography variant="h6">Последний штрих...</Typography>
            <Typography variant="subtitle2">Создаём архив с изображениями...</Typography>
            <Box position="relative" display="inline-flex" m={2}>
                <CircularProgress />
            </Box>
            {anchors &&
                anchors.length !== 0 &&
                anchors.map((e, index) => {
                    return (
                        <Box key={index} mt={0}>
                            <Link {...e}>{`Скачать архив часть ${index + 1}`}</Link>
                        </Box>
                    );
                })}
        </div>
    );
};
