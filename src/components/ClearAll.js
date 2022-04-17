import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Toast from './Toast';
import { useDispatch } from 'react-redux';
import { deleteAllItems } from '../services/store/actions';

const ClearAll = () => {
  const [open, setOpen] = React.useState(false);
  const [isSnackbarOpen, setIsSnackbarOpen] = React.useState(false);
  const [toastMessage, setToastMessage] = React.useState({});
  const dispatch = useDispatch();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = (type) => {
    setOpen(false);
    setIsSnackbarOpen(true);
    if (type === 'cancel'){
        setToastMessage ({message: 'Items not deleted', severity: 'warning'})
        return
    }
    dispatch(deleteAllItems())
    setToastMessage ({message: 'All items deleted', severity: 'success'})
  };
  return (
    <div>
      <Toast 
        isSnackbarOpen={isSnackbarOpen} 
        toastMessage={toastMessage} 
        setIsSnackbarOpen={setIsSnackbarOpen} 
      />
      <Button 
        variant="contained" 
        color='secondary'
        onClick={handleClickOpen}
      >
        clear all items
      </Button>
      <Dialog
        open={open}
        onClose={() => handleClose('cancel')}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Clear all items"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure you want to delete all items form the list?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => handleClose('cancel')}>Cancel</Button>
          <Button onClick={() => handleClose('submit')} autoFocus>
            Yes
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default ClearAll;