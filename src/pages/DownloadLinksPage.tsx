import { Box, Link } from '@material-ui/core';
import React from 'react';

interface DownloadLinksPageProps {
    download: string;
    href: string;
    text: string;
}

export const DownloadLinksPage: React.FC<DownloadLinksPageProps> = ({ download, href, text }) => {
    return (
        <Box mt={4}>
            <Link download={download} href={href}>
                {text}
            </Link>
        </Box>
    );
};
