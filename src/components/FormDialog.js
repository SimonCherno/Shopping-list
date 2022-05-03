import React, {useState, useEffect} from 'react';
import './../styles/AddItemFormDialog.scss';
// Components and more
import AutoComplete from './Autocomplete';
import CurrencySelectorDialog from './CurrencySelectorDialog';
import Toast from './Toast';
import { useDispatch, useSelector } from 'react-redux';
import { addToDelivery, deleteItem } from '../services/store/actions';
import UseMediaQueryHook from '../services/Hooks/UseMediaQueryHook';
// Dialog imports
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import Button from '@mui/material/Button';
import DialogTitle from '@mui/material/DialogTitle';
// Date picker imports
import AdapterMoment from '@mui/lab/AdapterMoment';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DatePicker from '@mui/lab/DatePicker';
import * as moment from 'moment';

const FormDialog = ({ isEditing, setIsEditing, itemData, tab, items }) => {
  const {currency: defaultCurrency, rate} = useSelector(state => state);
  const dispatch = useDispatch();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [item, setItem] = useState('');
  const [itemWithPrice, setItemWithPrice] = useState('');
  const [store, setStore] = useState('');
  const [price, setPrice] = useState('');
  const [date, setDate] = useState(null);
  const [isSnackbarOpen, setIsSnackbarOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState({});
  const [currency, setCurrency] = useState(defaultCurrency);
  const [isDateValid, setIsDateValid] = useState(true);
  const isFormValid = Boolean(item.length !== 0 && store.length !== 0 && price >= 0 && isDateValid && date);
  const {responsiveBtns} = UseMediaQueryHook();
  
  useEffect(() => {
    if (isEditing) {
      const {item, store, price, deliveryDate} = itemData;
      setIsDialogOpen (true);
      setItem(item);
      setStore(store);
      setPrice(currency === 'USD' ? price : (price * rate).toFixed(2));
      setDate(deliveryDate);
    }
    // eslint-disable-next-line
  }, [isEditing]);

  useEffect(() => {
    setCurrency(defaultCurrency);
  }, [defaultCurrency]);
  
  useEffect(() => {
    if (itemWithPrice.price) {
      setPrice(itemWithPrice.price);
      setCurrency('USD');
    }
  }, [itemWithPrice]);

  useEffect (() => {
    if (!date) {
      return
    }
    const validDate = moment(date).startOf('day').isSameOrAfter(moment(new Date()).startOf('day'));
    setIsDateValid(validDate);
  }, [date]);

  const closeDialogWithToast = (message, severity) => {
    setToastMessage({message, severity});
    setIsSnackbarOpen(true);
    resetDialog();
  }
  
  const resetDialog = () => {
    setIsDialogOpen(false); 
    setIsEditing(false);
    setItem('');
    setStore('');
    setPrice('');
    setDate(null);
    setIsDateValid(true);
    setCurrency(defaultCurrency);
  }

  const handleCloseDialog = () => {
    closeDialogWithToast ('Item not added', 'warning');
  };

  const handleSubmit = () => {
    let newPrice = Number(price);
    if (currency === 'ILS') {
      newPrice = newPrice / rate;
    }
    if (isEditing) {
      dispatch(deleteItem(items, itemData.id));
    }
    dispatch(
      addToDelivery({
        id: new Date().getTime(),
        item,
        store,
        price: newPrice,
        deliveryDate: moment(date).toISOString(),
        inDelivery: tab === 'delivery' ? true : false
      })
    )
    closeDialogWithToast (`Item ${isEditing ? 'edited' : 'added'} succssesfully`, 'success');
  }

  return (
    <div>
      <Toast 
        isSnackbarOpen={isSnackbarOpen} 
        toastMessage={toastMessage} 
        setIsSnackbarOpen={setIsSnackbarOpen} 
      />
      <div 
        className="button-wrapper"
        style={tab !== 'delivery' ? {display: 'none'} : null}
      >
        <Button 
          sx={responsiveBtns}
          variant="text" 
          onClick={() => setIsDialogOpen(true)}>
          + Add item
        </Button>
      </div>
      <Dialog 
        open={isDialogOpen} 
        onClose={handleCloseDialog}
      >
        <DialogTitle>{isEditing ? 'Edit Item' : 'Add item'}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Please fill all the fields
          </DialogContentText>
          <div className="form">
            <div className='form-autocomplete'>
              <AutoComplete
                item={item}
                setItem={setItem} 
                setItemWithPrice={setItemWithPrice}
                setToastMessage={setToastMessage}
                setIsSnackbarOpen={setIsSnackbarOpen}
              />
            </div>
            <div className="form-buttom">
              <div className="form-buttom-left">
                <div className='form-input'>
                  <TextField
                    margin="dense"
                    id="price"
                    label="Price"
                    type="number"
                    fullWidth
                    variant="standard"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    InputProps={{
                      inputProps: { 
                        min: 0,
                        step: ".01"
                      }
                    }}
                  />
                </div>
                <div className='form-input date-picker'>
                  <LocalizationProvider dateAdapter={AdapterMoment}>
                    <DatePicker
                      inputFormat="DD/MM/yyyy"
                      label="Delivery Date"
                      value={date}
                      onChange={(newDate) => setDate(newDate)}
                      renderInput={(params) => 
                        <TextField 
                          variant="standard" {...params} 
                          autoComplete='off'
                          error={!isDateValid} 
                          helperText={!isDateValid ? 'Delivery date must be today or in the future' : null}
                        />}
                    />
                  </LocalizationProvider>
                </div>
              </div>
              <div className="form-buttom-right">
                <div className='form-input'>
                  <CurrencySelectorDialog currency={currency} setCurrency={setCurrency} />
                </div>
                <div className='form-input'>
                  <TextField
                    margin="dense"
                    id="store"
                    label="Store"
                    autoComplete='off'
                    type="text"
                    fullWidth
                    variant="standard"
                    value={store}
                    onChange={(e) => setStore(e.target.value)}
                  />
                </div>
              </div>
            </div>
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button disabled={!isFormValid} onClick={handleSubmit}>{isEditing ? 'Edit Item' : 'Add item'}</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
export default FormDialog;