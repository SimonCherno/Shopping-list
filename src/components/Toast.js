import React from 'react'
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

const Toast = ({isSnackbarOpen, setIsSnackbarOpen, toastMessage}) => {
    
    const Alert = React.forwardRef(function Alert(props, ref) {
        return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
    });    
    
    const handleSnackbarClose = (event, reason) => {
        if (reason === 'clickaway') {
        return;
        }
        setIsSnackbarOpen(false);
    };    
    
    return (
        <Snackbar
            open={isSnackbarOpen}
            autoHideDuration={2000}
            onClose={handleSnackbarClose}
        >
            <Alert onClose={() => setIsSnackbarOpen(false)} severity={toastMessage.severity} sx={{ width: '100%' }}>
            {toastMessage.message}
            </Alert>
        </Snackbar>
    )
}

export default Toast