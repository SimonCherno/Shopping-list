import { 
    TOGGLE_DELIVERY, 
    ADD_STORAGE_TO_STATE,
    ADD_TO_DELIVERY,
    UPDATE_RATE,
    SET_IS_START_ERROR,
    SET_CURRENCY,
    TOGGLE_MODE,
    SET_FETCH_TIME,
    DELETE_ITEM,
    DELETE_ALL_ITEMS
} from './actionTypes';

export const toggleDelivery = (items, id) => {
    let index = items.findIndex((item) => item.id === id);
    items[index].inDelivery = !items[index].inDelivery;
    return ({
        type: TOGGLE_DELIVERY,
        payload: items
    })
}
export const addStorageToState = (storage) => ({
    type: ADD_STORAGE_TO_STATE,
    payload: storage
})
export const addToDelivery = (data) => ({
      type:ADD_TO_DELIVERY, 
      payload: data
})
export const updateRate = (newRate) => ({
    type:UPDATE_RATE, 
    payload:newRate
})
export const setIsStartError = (value) => ({
    type: SET_IS_START_ERROR,
    payload:value
})
export const setCurrency = (newCurrency) => ({
    type: SET_CURRENCY, 
    payload: newCurrency
})
export const toggleMode = () => ({
    type: TOGGLE_MODE,
})
export const setFetchTime = (time) => ({
    type: SET_FETCH_TIME, 
    payload: time
})
export const deleteItem = (items, id) => {
    const newItems = items.filter((item) => item.id !== id);
    return ({
        type: DELETE_ITEM, 
        payload: newItems
    })
}
export const deleteAllItems = () => ({
    type: DELETE_ALL_ITEMS
})