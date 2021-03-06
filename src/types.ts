import { AxiosResponse } from "axios";

export type ImageFormat = 'jpeg' | 'zif';
export type SizeType = 'original' | 'large';
export type HostType = 'rgada' | 'irbis';

export interface ImageData {
    format: ImageFormat,
    size: SizeType,
    url: string
}

export interface LocalStorageType {
    currentUrl: string,
    rgadaImageUrls: Array<ImageData>,
    downloadedFiles: Array<AxiosResponse>,
    imageFormat: ImageFormat,

}

