import {
     TOGGLE_DELIVERY,
     ADD_TO_DELIVERY,
     UPDATE_RATE,
     SET_CURRENCY,
     SET_IS_START_ERROR,
     ADD_STORAGE_TO_STATE,
     TOGGLE_MODE,
     SET_FETCH_TIME,
     DELETE_ITEM,
     DELETE_ALL_ITEMS
} from "./actionTypes";

import { initalState } from "./initalState";

export const reducer = (state=initalState, action ={}) => {
    switch (action.type) {
        case TOGGLE_DELIVERY:
            return {
                ...state, 
                items: action.payload
            }    
        case ADD_TO_DELIVERY:
            return {
                ...state, 
                items: [...state.items, action.payload]
            }
        case UPDATE_RATE:
            return {
                ...state,
                rate:action.payload
            }
        case SET_CURRENCY:
            return {
                ...state, 
                currency: action.payload
            }
        case SET_IS_START_ERROR:
            return {
                ...state, 
                isStartError:action.payload
            }
        case ADD_STORAGE_TO_STATE:
            const {items} = action.payload;
            return {
                ...state, 
                items
            } 
        case TOGGLE_MODE:
            return {
                ...state, 
                isDark: !state.isDark
            }
        case SET_FETCH_TIME:
            return {
                ...state, 
                fetchTime: action.payload
            }
        case DELETE_ITEM:
            return {
                ...state, 
                items: action.payload
            }
        case DELETE_ALL_ITEMS:
            return {
                ...state,
                items: []
            }
        default:
            return state;
    }
}
