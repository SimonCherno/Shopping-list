import { useMediaQuery } from '@mui/material';

const UseMediaQueryHook = () => {
    const isSmallScreen = useMediaQuery('(max-width:465px)');
    const responsiveBtns = isSmallScreen ? {margin: 0.4, fontSize: 12} : {margin: 1};
    const responsiveRadio = isSmallScreen ? 'small' : 'medium';
    const responsiveIcons = isSmallScreen ? {width: '19px', height: '19px'} : {width: '24px', height: '24px'}
    const responsiveFont = isSmallScreen ? 13 : 20;
    return {responsiveBtns, responsiveRadio, responsiveIcons, responsiveFont}
}

export default UseMediaQueryHook