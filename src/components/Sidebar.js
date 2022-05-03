import React, { useEffect } from 'react'
import '../styles/Sidebar.scss'
import { Box } from '@mui/system'
import UseMediaQueryHook from '../services/Hooks/UseMediaQueryHook'
import logo from '../assets/logo.png'
import { FaTimes } from 'react-icons/fa'
import NavigationBtns from './NavigationBtns'

const Sidebar = ({openSidebar, setOpenSidebar, children, mode}) => {
    const {isSmallScreen} = UseMediaQueryHook();
    useEffect(() => {
        if (!isSmallScreen){
            setOpenSidebar(false)
        }
        // eslint-disable-next-line
    }, [isSmallScreen]);
    return (
        <div className={`sidebar-wrapper ${openSidebar ? 'show-sidebar' : ''}`}>
            <Box
                sx={{
                    bgcolor: 'background.default', 
                    height: '100%'
                }}
            >
                <aside 
                    className='sidebar'
                >
                    <header className="sidebar-header">
                        <img src={logo} alt="logo" className={`sidebar-logo ${mode === 'dark' && 'invert'}`} />
                        <button onClick={() => setOpenSidebar(false)} className="close-btn">
                            <FaTimes/>
                        </button>
                    </header>
                    <NavigationBtns sidebar={true} />
                    <footer className='footer'>
                        {children}
                    </footer>
                </aside>
            </Box>
        </div>
    )
}

export default Sidebar