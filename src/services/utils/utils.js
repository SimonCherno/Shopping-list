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