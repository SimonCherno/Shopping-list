export const formatPrice = (price, rate, currency) => {
    if (currency === 'USD') {
        return `${price.toFixed(2)} $`;
    } else {
        return `${(price * rate).toFixed(2)} ₪`
    }
}

export const getLocalStorage = () => {
  let data = localStorage.getItem('localStorageData');
  if (data){
    return JSON.parse(data);
  } else {
    return {};
  }
}

export const customTheme = (mode) => ({
  palette: {
      mode,
      ...(mode === 'light'
          ? {
              primary: {
                  main: '#d4c6b0', // buttons
                  contrastText: '#54BAB9' // text in buttons
              },
              secondary: {
                  main:  '#ff5c5c'   // clear btn           
              },
              background: {
                  default: '#FBF8F1', // background
              },
              text: {
                  primary: '#54BAB9', // text 
                  secondary: '#54BAB9' // icons
              },
              navbar: '#F7ECDE' //navbar
          }
          : {
              primary: {
                  main: '#EEEEEE', // buttons
                  contrastText: '#4ECCA3' // text in buttons
              },
              secondary: {
                  main:  '#ff5c5c'  // clear btn            
              },
              background: {
                  default: '#232931', // background
              },
              text: {
                  primary: '#4ECCA3', // text
                  secondary: '#799395' // icons
              },
              navbar: '#94B49F' //navbar
          }
      )
  }
})