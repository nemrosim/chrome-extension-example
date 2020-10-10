export type ImageFormat = 'jpeg' | 'zif';
export type SizeType = 'original' | 'large';

export interface ImageUrl {
    format: ImageFormat,
    size: SizeType,
    url: string
}

