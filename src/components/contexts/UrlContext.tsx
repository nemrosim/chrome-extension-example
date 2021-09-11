import React, {
    createContext,
    Dispatch,
    FC,
    SetStateAction,
    useContext,
    useEffect,
    useState,
} from 'react';
import { ImageData } from '../../types';

interface ContextProps {
    currentUrl?: string;
    isRgada?: boolean;
    isIrbis?: boolean;

    rgadaImageUrls: Array<ImageData>;
    setRgadaImageUrls: Dispatch<SetStateAction<Array<ImageData>>>;

    irbisPdfUrl: string;
    setIrbisPdfUrl: Dispatch<SetStateAction<string>>;
}

export const UrlContext = createContext<ContextProps>({
    currentUrl: undefined,
    isRgada: undefined,
    isIrbis: undefined,

    rgadaImageUrls: undefined,
    setRgadaImageUrls: () => undefined,

    irbisPdfUrl: undefined,
    setIrbisPdfUrl: () => undefined,
});

export const UrlContextProvider: FC = ({ children }) => {
    const [currentUrl, setCurrentUrl] = useState<string>();
    const [isRgada, setIsRgada] = useState<boolean>();
    const [isIrbis, setIsIrbis] = useState<boolean>();

    const [rgadaImageUrls, setRgadaImageUrls] = useState<Array<ImageData>>();
    const [irbisPdfUrl, setIrbisPdfUrl] = useState<string>();

    useEffect(() => {
        const queryInfo = { active: true, lastFocusedWindow: true };

        chrome.tabs &&
            chrome.tabs.query(queryInfo, (tabs) => {
                const url = tabs[0].url;
                setCurrentUrl(url);
            });
    }, []);

    useEffect(() => {
        if (currentUrl) {
            const isRgada = currentUrl.startsWith('http://rgada.info');
            const isIrbis = currentUrl.startsWith('http://irbis-nbuv.gov.ua');

            setIsIrbis(isIrbis);
            setIsRgada(isRgada);
        }
    }, [currentUrl, setIsIrbis, setIsRgada]);

    return (
        <UrlContext.Provider
            value={{
                currentUrl,
                isIrbis,
                isRgada,

                rgadaImageUrls: rgadaImageUrls,
                setRgadaImageUrls: setRgadaImageUrls,

                irbisPdfUrl: irbisPdfUrl,
                setIrbisPdfUrl: setIrbisPdfUrl,
            }}
        >
            {children}
        </UrlContext.Provider>
    );
};

export const useUrlContext = (): ContextProps => {
    const context = useContext<ContextProps>(UrlContext);

    if (context === null) {
        throw new Error('"useUrlContext" should be used inside a "UrlContextProvider"');
    }

    return context;
};
