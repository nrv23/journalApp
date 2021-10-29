import { types } from "../types";



const initialState = {
    loading: false,
    msgError: null
}

export const uiReducer = (state=initialState,action) => {

    switch(action.type){
        case types.UISETERROR: 
            return  {
                ...state,
                msgError: action.payload
            }

        case types.UIUNSETERROR: 
            return  {
                ...state,
                msgError: null
            }
        case types.UISTARTLOADING: 
            return {
                ...state,
                loading: action.payload
            }
        case types.UIFINISHLOADING:
            return {
                ...state,
                loading: action.payload
            }
        default:
            return state;
    }
}