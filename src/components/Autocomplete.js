import React, {useEffect, useState} from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import CircularProgress from '@mui/material/CircularProgress';

const AutoComplete = ({
  item,
  setItem, 
  setItemWithPrice, 
  setToastMessage, 
  setIsSnackbarOpen
}) => {
  const [open, setOpen] = useState(false);
  const [options, setOptions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const controller = new AbortController();
    if (!open) {
      setOptions([]);
    } else {
        fetchData(controller);
    }
    return (() => {
      controller.abort();
    })
   // eslint-disable-next-line
  }, [open]);

  const fetchData = async (controller) => {
    setIsLoading(true);
    try {
      const resp = await fetch('http://fakestoreapi.com/products', {signal: controller.signal});
      if (resp.ok) {
        const data = await resp.json();
        setOptions(data);
      }
      else{
        throw new Error();
      }
    } catch (err) {
      if (err.name !== 'AbortError'){
        setToastMessage({
          message: 'Could not get suggestions',
          severity: 'error'
        });
        setIsSnackbarOpen(true);
      }
    }
    setIsLoading(false);
  }

  return (
    <Autocomplete
      onChange={(event, newValue) => {
          setItemWithPrice(newValue);
      }}
      onInputChange={(event, newInputValue) => {
          setItem(newInputValue);
      }}      
      open={open}
      onOpen={() => {
        setOpen(true);
      }}
      onClose={() => {
        setOpen(false);
      }}
      isOptionEqualToValue={(option, value) => option.title === value.title}
      getOptionLabel={(option) => option.title}
      options={options}
      loading={isLoading}
      freeSolo
      inputValue={item}
      renderInput={(params) => (
        <TextField
          {...params}
          variant="standard"
          label="Items"
          InputProps={{
            ...params.InputProps,
            endAdornment: (
              <React.Fragment>
                {isLoading ? <CircularProgress color="inherit" size={20} /> : null}
                {params.InputProps.endAdornment}
              </React.Fragment>
            ),
          }}
        />
      )}
    />
  );
}

export default AutoComplete;
