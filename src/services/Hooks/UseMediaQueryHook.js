import { useMediaQuery } from '@mui/material';

const UseMediaQueryHook = () => {
    const isSmallScreen = useMediaQuery('(max-width:600px)');
    const responsiveBtns = isSmallScreen ? {margin: 0.4, fontSize: 12} : {margin: 1};
    return {responsiveBtns, isSmallScreen};
};

export default UseMediaQueryHook;