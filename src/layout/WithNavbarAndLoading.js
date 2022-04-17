import * as React from 'react';
import './../styles/WithNavbarAndLoading.scss';
import Currency from "../components/Currency";
import { useDispatch, useSelector } from "react-redux";
import { customTheme } from '../services/utils/utils';
import logo from '../assets/logo.png'
// material ui imports
import { Button } from "@mui/material"
import { CircularProgress } from "@mui/material";
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { toggleMode } from '../services/store/actions';
import ClearAll from '../components/ClearAll';
import NavigationBtns from '../components/NavigationBtns';
import { FaBars } from 'react-icons/fa'
import Sidebar from '../components/Sidebar';
import ActionBtns from '../components/ActionBtns';

const WithNavbarAndLoading = (ComposedComponent) => {
    const WrapperComponent = () => {
        const { isStartError, rate, isDark, items } = useSelector(state => state);
        const mode = isDark ? 'dark' : 'light';
        const dispatch = useDispatch();
        const [openSidebar, setOpenSidebar] = React.useState(false);
        const [isShowAnimation, setIsShowAnimation] = React.useState(false);
        const theme = createTheme(customTheme(mode));
        React.useEffect(() => {
            return () => setIsShowAnimation(true);
        }, [rate]);

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
                    <div className={isShowAnimation ? 'navbar-animation' : null}>
                        <Box sx={{bgcolor: 'navbar', boxShadow: 3}}>
                            <div className="navbar-wrapper">
                                <nav className='navbar section-center'>
                                    <img src={logo} alt='shopping tracker' className='logo'/>
                                    <div className="navigation-btns-wrapper">
                                        <Box sx = {boxStyle}>
                                            <NavigationBtns />
                                        </Box>
                                    </div>
                                    <ActionBtns
                                        boxStyle={boxStyle} 
                                        toggleMode={() => dispatch(toggleMode())} 
                                        mode={theme.palette.mode} 
                                    />
                                    <div 
                                        className="aside-btn"
                                        onClick={() => setOpenSidebar(true)}
                                    >
                                        <IconButton>
                                            <FaBars />
                                        </IconButton>
                                    </div>
                                </nav>
                            </div>
                        </Box>
                    </div>   
                        <Sidebar 
                            openSidebar={openSidebar} 
                            setOpenSidebar={setOpenSidebar}
                            mode={mode} 
                        >
                            <ActionBtns
                                boxStyle={boxStyle} 
                                toggleMode={() => dispatch(toggleMode())} 
                                mode={theme.palette.mode} 
                                sidebar={true}
                            />
                        </Sidebar>
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