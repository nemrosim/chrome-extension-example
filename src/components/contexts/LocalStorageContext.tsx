import React, {
    createContext,
    Dispatch,
    SetStateAction,
    useContext,
    useEffect,
    useState,
} from 'react';
import { LocalStorageType } from '../../types';

interface ContextProps {
    isDataSetToLocalStorage: boolean;
    setIsDataSetToLocalStorage: Dispatch<SetStateAction<boolean>>;
    currentUrlLocalStorageData?: LocalStorageType;
    setCurrentUrlLocalStorageData?: Dispatch<SetStateAction<LocalStorageType>>;
}

export const LocalStorageContext = createContext<ContextProps>({
    currentUrlLocalStorageData: undefined,
    setCurrentUrlLocalStorageData: () => undefined,

    isDataSetToLocalStorage: undefined,
    setIsDataSetToLocalStorage: () => undefined,
});

export const LocalStorageProvider: React.FC = ({ children }) => {
    const [currentUrlLocalStorageData, setCurrentUrlLocalStorageData] =
        useState<LocalStorageType>();
    const [isDataSetToLocalStorage, setIsDataSetToLocalStorage] = useState<boolean>();

    useEffect(() => {
        const queryInfo = { active: true, lastFocusedWindow: true };

        chrome.tabs &&
            chrome.tabs.query(queryInfo, (tabs) => {
                const url = tabs[0].url;

                chrome.storage.local.get([url], (result) => {
                    if (result[url]) {
                        setCurrentUrlLocalStorageData(JSON.parse(result[url]));
                    }
                });
            });
    }, []);

    return (
        <LocalStorageContext.Provider
            value={{
                currentUrlLocalStorageData,
                setCurrentUrlLocalStorageData,
                isDataSetToLocalStorage,
                setIsDataSetToLocalStorage,
            }}
        >
            {children}
        </LocalStorageContext.Provider>
    );
};

export const useLocalStorageContext = (): ContextProps => {
    const context = useContext<ContextProps>(LocalStorageContext);

    if (context === null) {
        throw new Error('"useLocalStorageContext" should be used inside a "LocalStorageProvider"');
    }

    return context;
};
