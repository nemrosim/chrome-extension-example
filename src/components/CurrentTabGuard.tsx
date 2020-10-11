import { Box, Typography } from "@material-ui/core";
import React, { useContext } from "react";
import { AppContext } from "./AppContextProvider";

export const ErrorTypography: React.FC<{ text: string }> = ({text}) => {
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
    const {isRgada, isIrbis} = useContext(AppContext);

    if (chrome.tabs && !isRgada && !isIrbis) {
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
