import { AxiosResponse } from 'axios';

export enum ImageFormat {
    jpeg = 'jpeg',
    zif = 'zif',
}
export type SizeType = 'original' | 'large';
export type HostType = 'rgada' | 'irbis';

export interface ImageData {
    format: ImageFormat;
    size: SizeType;
    url: string;
}

export interface LocalStorageType {
    currentUrl: string;
    rgadaImageUrls: Array<ImageData>;
    downloadedFiles: Array<AxiosResponse>;
    imageFormat: ImageFormat;
}

export const APP_NAME = 'popup';

export enum MessageHosts {
    RGADA = 'rgada',
    IRBIS = 'irbis',
}
