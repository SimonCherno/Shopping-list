import * as React from 'react';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { IconButton } from '@mui/material';
import us from '../assets/us.png'
import ils from '../assets/ils.png'
import { useDispatch, useSelector } from 'react-redux';
import { setCurrency } from '../services/store/actions';

export default function CurrencySelect() {
  const { currency } = useSelector(state => state);
  const dispatch = useDispatch();
  return (
    <div>
      <FormControl variant='standard' sx={{ m: 1}}>
        <Select
          disableUnderline
          labelId="demo-simple-select-autowidth-label"
          id="demo-simple-select-autowidth"
          value={currency}
          onChange={(e) => dispatch(setCurrency(e.target.value))}
          autoWidth
          label="Currency"

        >
          <MenuItem value="USD">
              <IconButton>
                  <img style={{width: '24px', height: '24px'}} src={us} alt='us' />
              </IconButton>
          </MenuItem>
          <MenuItem value="ILS">
              <IconButton>
                  <img style={{width: '24px', height: '24px'}} src={ils} alt='ils' />
              </IconButton>
          </MenuItem>
        </Select>
      </FormControl>
    </div>
  );
}
