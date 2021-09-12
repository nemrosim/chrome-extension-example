import React from 'react';
import { Box, CircularProgress, Typography } from '@material-ui/core';

export const CircularProgressWithPercentagePage = ({ percentCompleted }) => {
    return (
        <>
            <Box position="relative" display="inline-flex" m={2}>
                <Typography variant="h6" align="center">
                    НЕ ЗАКРЫВАЙТЕ ЭТО ОКНО ВО ВРЕМЯ РАБОТЫ
                </Typography>
            </Box>
            <Box position="relative" display="inline-flex" m={2}>
                <CircularProgress variant="static" value={percentCompleted} size={60} />
                <Box
                    top={0}
                    left={0}
                    bottom={0}
                    right={0}
                    position="absolute"
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                >
                    <Typography variant="caption" component="div" color="textSecondary">
                        {`${percentCompleted}%`}
                    </Typography>
                </Box>
            </Box>
        </>
    );
};
