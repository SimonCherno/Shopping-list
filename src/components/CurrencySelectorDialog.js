import * as React from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

const CurrencySelectorDialog = ({currency, setCurrency}) => {
  return (
      <FormControl fullWidth variant="standard">
        <InputLabel id="demo-simple-select-label">Currency</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={currency}
          label="Currency"
          onChange={(e) => setCurrency(e.target.value)}
        >
          <MenuItem value={'USD'}>USD - $</MenuItem>
          <MenuItem value={'ILS'}>ILS - ₪</MenuItem>
        </Select>
      </FormControl>
  );
}

export default CurrencySelectorDialog;