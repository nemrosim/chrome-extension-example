export type ImageFormat = 'jpeg' | 'zif';
export type SizeType = 'original' | 'large';
export type HostType = 'rgada' | 'irbis';

export interface ImageUrl {
    format: ImageFormat,
    size: SizeType,
    url: string
}

