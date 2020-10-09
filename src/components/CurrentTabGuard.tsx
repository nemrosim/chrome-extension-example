import { Box, Typography } from "@material-ui/core";
import React, { useEffect, useState } from "react";

export const CurrentTabGuard: React.FC = ({children}) => {
    const [currentUrl, setCurrentUrl] = useState();

    useEffect(() => {
        chrome.tabs && chrome.tabs.query({active: true, lastFocusedWindow: true}, tabs => {
            let url = tabs[0].url;
            setCurrentUrl(url);
        });
    }, []);

    const isB = currentUrl && currentUrl.startsWith('http://rgada.info/');

    if (chrome.tabs && !isB) {
        return (
            <div className="container">
                <Box m={4}>
                    <Typography align='center' variant="h6" color='error'>
                        Это дополнение не предназначено для данного ресурса
                    </Typography>
                </Box>
            </div>
        )
    } else {
        return (
            <>
                {children}
            </>
        )
    }
}
