import { Box, Typography } from "@material-ui/core";
import React, { useEffect, useState } from "react";

export const ErrorTypography: React.FC<{text:string}> = ({text}) => {
    return (
        <div className="container">
            <Box m={4}>
                <Typography align='center' variant="h6" color='error'>
                    {text}
                </Typography>
            </Box>
        </div>
    )
}

export const CurrentTabGuard: React.FC = ({children}) => {
    const [currentUrl, setCurrentUrl] = useState();

    useEffect(() => {
        const queryInfo = {active: true, lastFocusedWindow: true};

        chrome.tabs && chrome.tabs.query(queryInfo, tabs => {
            const url = tabs[0].url;
            setCurrentUrl(url);
        });
    }, []);

    const isB = currentUrl && currentUrl.startsWith('http://rgada.info/');

    if (chrome.tabs && !isB) {
        return (
            <ErrorTypography text='Это дополнение не предназначено для данного ресурса'/>
        )
    } else {
        return (
            <>
                {children}
            </>
        )
    }
}
