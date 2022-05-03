import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import CachedIcon from '@mui/icons-material/Cached';
import { setFetchTime } from '../services/store/actions';
import { useSelector, useDispatch } from 'react-redux';
import { IconButton } from '@mui/material';

const CurrencyFetchTimeDialog = () => {
  const { fetchTime } = useSelector(state => state);
  const dispatch = useDispatch();
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState(fetchTime);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setValue(fetchTime);
  };

  const handleSet = () => {
    dispatch(setFetchTime(Number(value)));
    setOpen(false);
  }

  return (
    <div>
      <IconButton 
        sx={{
          color: 'text.secondary'
        }}
        onClick = {handleClickOpen}
      >
        <CachedIcon />
      </IconButton>
      <Dialog open={open} onClose={handleClose}>
          <DialogTitle>Set Currency Update Time</DialogTitle>
          <DialogContent>
            <DialogContentText>
                Plese Set currency update time in seconds
            </DialogContentText>
            <TextField
                autoFocus
                margin="dense"
                label="Update Time"
                type="number"
                variant="standard"
                value={value}
                onChange={(e) => setValue(e.target.value)}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button onClick={handleSet}>Set</Button>
          </DialogActions>
      </Dialog>
    </div>
  );
}

export default CurrencyFetchTimeDialog;