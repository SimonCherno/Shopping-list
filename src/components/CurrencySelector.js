import * as React from 'react';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import { setCurrency } from '../services/store/actions';
import { useDispatch, useSelector } from 'react-redux';
import UseMediaQueryHook from '../services/Hooks/UseMediaQueryHook';
import { Box } from '@mui/system';

const CurrencySelector = () =>  {
  const { currency } = useSelector(state => state);
  const dispatch = useDispatch();
  const {responsiveRadio, responsiveFont} = UseMediaQueryHook();

  return (
    <FormControl>
      <RadioGroup
        row
        aria-labelledby="demo-controlled-radio-buttons-group"
        name="controlled-radio-buttons-group"
        value={currency}
        onChange={(e) => dispatch(setCurrency(e.target.value))}
      >
        <FormControlLabel 
          style={{marginRight: '10px'}} 
          value="USD" control={
            <Radio size={responsiveRadio} />
          } 
          label={
             <Box component="div" fontSize={responsiveFont}>
                $
              </Box>
          } 
        />
        <FormControlLabel 
          style={{marginRight: '10px'}}
          value="ILS" 
          control={
            <Radio size={responsiveRadio} />
          } 
          label={
            <Box  component="div" fontSize={responsiveFont}>
              ₪
            </Box>
          } 
        />
      </RadioGroup>
    </FormControl>
  );
}

export default CurrencySelector;