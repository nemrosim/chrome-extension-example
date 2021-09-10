export const logSuccess = (data) => {
    console.log('%c%s', 'color: green; font-size: 1rem;', data);
};

export const logInfo = (data) => {
    console.log('%c%s', 'color: yellow; font-size: 1rem;', data);
};

export const logError = (data) => {
    console.log('%c%s', 'color: wed; font-size: 1.2rem;', data);
};
