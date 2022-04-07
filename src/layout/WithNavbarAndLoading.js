import * as React from 'react';
import './../styles/WithNavbarAndLoading.scss';
import CurrencySelector from "../components/CurrencySelector";
import Currency from "../components/Currency";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import SetCurrencyUpdateTime from '../components/SetCurrencyUpdateTime';
// material ui imports
import { Button } from "@mui/material"
import { CircularProgress } from "@mui/material";
import Box from '@mui/material/Box';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import IconButton from '@mui/material/IconButton';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { toggleMode } from '../services/store/actions';
import UseMediaQueryHook from '../services/Hooks/UseMediaQueryHook';
import ClearAll from '../components/ClearAll';

const WithNavbarAndLoading = (ComposedComponent, location) => {
    const WrapperComponent = () => {
        const { isStartError, rate, isDark, items } = useSelector(state => state);
        const mode = isDark ? 'dark' : 'light';
        const dispatch = useDispatch();
        const theme = createTheme({palette: {mode}});
        const {responsiveBtns, responsiveIcons} = UseMediaQueryHook();
        const boxStyle = {
            color: 'text.primary', 
            display: "flex", 
            flexDirection: "column", 
            justifyContent: "center"
        }
        return <>
              <ThemeProvider theme={theme}>
            <div className="background">
                <Box sx={{bgcolor: 'background.default', height: '100%'}}></Box>
            </div>
            <Currency/>
            {isStartError ? 
                (<div className="full-page">
                    <h2>Could not get currency. Please try again later</h2>
                    <Button style={{width: '100px'}} variant="contained" onClick={() => window.location.reload()}>Refresh</Button>
                </div>) : 
                !rate ? 
                    (<div className="full-page">
                        <h1>Loading...</h1>
                        <CircularProgress color="inherit" size={100} />
                    </div>) : 
                    (<>   
                        <Box sx={{bgcolor: 'divider', boxShadow: 3}}>
                        <div className="navbar-wrapper">
                            <nav className='navbar section-center'>
                                <div className="location-btns">
                                    <Button 
                                        sx={responsiveBtns} 
                                        variant={location === 'home' ? 'contained' : 'outlined'}
                                    >
                                        <Link 
                                            to='/' 
                                            className="link"
                                        >
                                            All items
                                        </Link>
                                    </Button>
                                    <Button 
                                        sx={responsiveBtns}
                                        variant={location === 'stores' ? 'contained' : 'outlined'}>
                                        <Link 
                                            to='/stores' 
                                            className="link"
                                        >Stores</Link>
                                    </Button>
                                </div>
                                <div className="right-corner">
                                    <Box sx={boxStyle}>
                                        <CurrencySelector />
                                    </Box>
                                    <Box sx={boxStyle}>
                                        <SetCurrencyUpdateTime />
                                    </Box>
                                    <Box sx={boxStyle}>
                                        <IconButton  onClick={() => dispatch(toggleMode())} color='inherit'>
                                            {theme.palette.mode === 'dark' 
                                                ? <Brightness7Icon style={responsiveIcons} /> 
                                                : <Brightness4Icon style={responsiveIcons} />}
                                        </IconButton>
                                    </Box>
                                </div>
                            </nav>
                        </div>
                        </Box>
                        <ComposedComponent />
                        { items.length 
                            ? <div className="clear-all-wrapper">
                                <ClearAll />
                            </div> 
                            : null
                        }
                    </>)
            }
            </ThemeProvider>
        </>
    }
    return WrapperComponent
}

export default WithNavbarAndLoading;