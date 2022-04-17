import React from 'react'
import { Box } from '@mui/material'
import CurrencySelect from './CurrencySelect'
import SetCurrencyUpdateTime from './SetCurrencyUpdateTime'
import { IconButton } from '@mui/material'
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';

const ActionBtns = ({boxStyle, toggleMode, mode, sidebar = false}) => {
  return (
    <div className={sidebar ? 'sidebar-footer' : "right-corner"}>
        <Box sx={boxStyle}>
            <CurrencySelect />
        </Box>
        <Box sx={boxStyle}>
            <SetCurrencyUpdateTime />
        </Box>
        <Box sx={boxStyle}>
            <IconButton 
                onClick={toggleMode} 
                sx={{
                    color: 'text.secondary'
                }}
            >
                {mode === 'dark' 
                    ? <Brightness7Icon /> 
                    : <Brightness4Icon />}
            </IconButton>
        </Box>
    </div>
  )
}

export default ActionBtns