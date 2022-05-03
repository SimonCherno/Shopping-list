import { useState, useEffect } from 'react';

const currencyUrl = 'https://v6.exchangerate-api.com/v6/fdc0cc3b44368d5084b69401/latest/USD';

const UseFetch = (fetchTime) => {
    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(false);
    const [newRate, setNewRate] = useState();

    const seconds = fetchTime * 1000;

    useEffect(() => {
        fetchData(currencyUrl);
        const interval = setInterval(() => {
            fetchData(currencyUrl);
        }, seconds);
        return () => {
            clearInterval(interval);
        }; 
    }, [seconds]);

    const fetchData = async (url) => {
        try {
            setIsLoading(true);
            setIsError(false);
            const resp = await fetch(url);
            if (resp.ok) {
                const data = await resp.json();
                setNewRate(data.conversion_rates.ILS)
            } else {
                throw new Error();
            }
        } catch (error) {
            setIsError(true)
        }
        setIsLoading(false);
    }
    return {isLoading, isError, newRate}
}

export default UseFetch