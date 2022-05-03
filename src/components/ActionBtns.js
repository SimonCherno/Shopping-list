import React from 'react'
import { Box } from '@mui/material'
import CurrencySelector from './CurrencySelector'
import CurrencyFetchTimeDialog from './CurrencyFetchTimeDialog'
import { IconButton } from '@mui/material'
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';

const ActionBtns = ({boxStyle, toggleMode, mode, sidebar = false}) => {
  return (
    <div className={sidebar ? 'sidebar-footer' : "right-corner"}>
        <Box sx={boxStyle}>
            <CurrencySelector />
        </Box>
        <Box sx={boxStyle}>
            <CurrencyFetchTimeDialog />
        </Box>
        <Box sx={boxStyle}>
            <IconButton 
                onClick={toggleMode} 
                sx={{
                    color: 'text.secondary'
                }}
            >
                {mode === 'dark' ? 
                    <Brightness7Icon /> : 
                    <Brightness4Icon />
                }
            </IconButton>
        </Box>
    </div>
  )
}

export default ActionBtns