import { Box, CircularProgress, LinearProgress, Typography } from "@material-ui/core";
import React from "react";

export const LinearProgressWithLabel = ({percentCompleted}) => {
    return (
        <Box position="relative" display="inline-flex" m={2}>
            <CircularProgress variant="static" value={percentCompleted} />
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
                <Typography variant="caption" component="div" color="textSecondary">{`${percentCompleted}%`}</Typography>
            </Box>
        </Box>
    );
}
