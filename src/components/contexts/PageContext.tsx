import React, { useContext, useState } from 'react';

export interface PageContextProps {
    isAuthorized: boolean;
    setIsAuthorized: React.Dispatch<React.SetStateAction<boolean>>;
}

export const InitialState: PageContextProps = {
    isAuthorized: false,
    setIsAuthorized: () => undefined,
};

export const PageContext = React.createContext<PageContextProps>(InitialState);

export const PageContextProvider: React.FC = ({ children }) => {
    const [isAuthorized, setIsAuthorized] = useState(false);

    return (
        <PageContext.Provider
            value={{
                isAuthorized,
                setIsAuthorized,
            }}
        >
            {children}
        </PageContext.Provider>
    );
};

export const usePageContext = (): PageContextProps => {
    const context = useContext<PageContextProps>(PageContext);

    if (context === null) {
        throw new Error('"usePageContext" should be used inside a "PageContextProvider"');
    }

    return context;
};
