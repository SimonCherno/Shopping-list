import React from 'react'
import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import { useLocation, useNavigate } from 'react-router-dom';
import {FaHome, FaStore} from 'react-icons/fa'

export default function NavigationBtns({sidebar = false}) {
  const {pathname} = useLocation();
  const [value, setValue] = React.useState(pathname);
  const navigate = useNavigate();
  const handleChange = (event, newValue) => {
    setValue(newValue);
};

  return (
    <Box sx={{ width: '100%' }}>
      <Tabs 
        value={value} 
        onChange={handleChange} 
        orientation={sidebar ? 'vertical' : 'horizontal'}
        variant={sidebar ? 'fullWidth' : 'standard'}
        sx={{
          '.MuiTabs-indicator': {
            left: 0,
            width: 5
          },
        }}
      >
        <Tab
          value={'/'}
          icon={sidebar ? <FaHome className='icon' /> : null} 
          label="Home" 
          onClick={() => navigate('/')} 
          sx={sidebar ? 
            {
              flexDirection: 'row',
              fontSize: 'xx-large'
            } : null
          }
          />
        <Tab 
          value={'/stores'}
          icon={sidebar ? <FaStore className='icon' /> : null}
          label="Stores" 
          onClick={() => navigate('/stores')} 
          sx={sidebar 
            ? {
              flexDirection: 'row',
              fontSize: 'xx-large'
            } : null
          }
        />
      </Tabs>
    </Box>
  );
}