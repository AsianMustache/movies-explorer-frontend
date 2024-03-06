import { useState, useEffect } from "react";

function useLocalStorageState(storageKey, defaultValue) {
    const [value, setValue] = useState(() => {
        const storedData = localStorage.getItem(storageKey);

        return storedData !== null ? JSON.parse(storedData) : defaultValue;
    });

    useEffect(() => {
        localStorage.setItem(storageKey, JSON.stringify(value));
    }, [storageKey, value]);

    return [value, setValue];
}

export default useLocalStorageState;