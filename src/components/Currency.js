import React, { useEffect, useState } from 'react'
import UseFetch from '../services/Hooks/UseCurrencyFetch'
import { useDispatch, useSelector } from 'react-redux';
import Toast from './Toast';
import { setIsStartError, updateRate } from '../services/store/actions';

const Currency = () => {
    const fetchTime = useSelector((state) => state.fetchTime);
    const dispatch = useDispatch();
    const [isLoadedOnce, setIsLoadedOnce] = useState(false);
    const [isErrorDisplayedOnce, setIsErrorDisplayedOnce] = useState(false);
    const [isSnackbarOpen, setIsSnackbarOpen] = useState(false);
    const [toastMessage, setToastMessage] = useState({});
    
    const {isLoading, isError, newRate} = UseFetch(fetchTime);
      
    useEffect (() => {
        if (!isLoading && !isError && newRate){
            setIsLoadedOnce(true);
            dispatch(updateRate(newRate));
            if (isErrorDisplayedOnce) {
                setIsSnackbarOpen(true);
                setToastMessage({
                    message: 'Currency rate updated successfully',
                    severity:'success'
                });  
                setIsErrorDisplayedOnce(false);
            }
        }
        if (isError) {
            if (!isErrorDisplayedOnce && isLoadedOnce){
                setIsSnackbarOpen(true);
                setToastMessage({
                    message: `Couldn't update currency rate, using last currency update`,
                    severity:'warning'
                });
                setIsErrorDisplayedOnce(true)
            }
            if (!isLoadedOnce) {
                dispatch(setIsStartError(true));
            }
        }
    // eslint-disable-next-line
    }, [isLoading, newRate]);

    return (
        <div>
            <Toast isSnackbarOpen={isSnackbarOpen} toastMessage={toastMessage} setIsSnackbarOpen={setIsSnackbarOpen} />
        </div>   
    )
}

export default Currency;