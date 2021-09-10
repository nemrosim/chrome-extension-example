import { Box, Link } from '@material-ui/core';
import React from 'react';

interface DownloadLinksProps {
    link: Pick<HTMLAnchorElement, 'download' | 'href'>;
}

export const DownloadLinks: React.FC<DownloadLinksProps> = ({ link }) => {
    return (
        <Box mt={4}>
            <Link {...link}>Загрузить ссылки на изображения</Link>
        </Box>
    );
};
