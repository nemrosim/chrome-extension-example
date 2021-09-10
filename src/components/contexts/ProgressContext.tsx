import React, { useContext, useState } from 'react';

export interface ContextProps {
    isImagesDownloading: boolean;
    setIsImagesDownloading: React.Dispatch<React.SetStateAction<boolean>>;

    isGeneratingZip: boolean;
    setIsGeneratingZip: React.Dispatch<React.SetStateAction<boolean>>;

    totalPercent: number;
    setTotalPercent: React.Dispatch<React.SetStateAction<number>>;

    amountOfFilesDownloaded: number;
    setAmountOfFilesDownloaded: React.Dispatch<React.SetStateAction<number>>;

    amountOfFilesProcessed: number;
    setAmountOfFilesProcessed: React.Dispatch<React.SetStateAction<number>>;
}

export const InitialState: ContextProps = {
    isImagesDownloading: false,
    setIsImagesDownloading: () => undefined,

    isGeneratingZip: false,
    setIsGeneratingZip: () => undefined,

    totalPercent: 0,
    setTotalPercent: () => undefined,

    amountOfFilesDownloaded: 0,
    setAmountOfFilesDownloaded: () => undefined,

    amountOfFilesProcessed: 0,
    setAmountOfFilesProcessed: () => undefined,
};

export const ProgressContext = React.createContext<ContextProps>(InitialState);

export const ProgressContextProvider: React.FC = ({ children }) => {
    const [totalPercent, setTotalPercent] = useState(0);
    const [amountOfFilesDownloaded, setAmountOfFilesDownloaded] = useState(0);
    const [amountOfFilesProcessed, setAmountOfFilesProcessed] = useState(0);

    const [isImagesDownloading, setIsImagesDownloading] = useState(false);
    const [isGeneratingZip, setIsGeneratingZip] = useState(false);

    return (
        <ProgressContext.Provider
            value={{
                totalPercent,
                setTotalPercent,

                amountOfFilesDownloaded,
                setAmountOfFilesDownloaded,

                amountOfFilesProcessed,
                setAmountOfFilesProcessed,

                isImagesDownloading,
                setIsImagesDownloading,

                isGeneratingZip,
                setIsGeneratingZip,
            }}
        >
            {children}
        </ProgressContext.Provider>
    );
};

export const useProgressContext = (): ContextProps => {
    const context = useContext<ContextProps>(ProgressContext);

    if (context === null) {
        throw new Error('"useProgressContext" should be used inside a "ProgressContextProvider"');
    }

    return context;
};
