import image from "../assets/images/orel_small.gif";
import { Box } from "@material-ui/core";
import React from "react";


export const Logo = () => {
    return (
        <Box m={2}>
            <img src={image} style={{height: '120px'}}/>
        </Box>
    )
}
