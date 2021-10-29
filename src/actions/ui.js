import { types } from "../types"



export const setError = (error) => {
    
    return {
        type: types.UISETERROR,
        payload: error
    }
}

export const unSetError = () => {
    
    return {
        type: types.UIUNSETERROR
    }
}

export const startLoading = () => {

    return {
        type: types.UISTARTLOADING,
        payload: true
    }
}


export const finishLoading = () => {

    return {
        type: types.UISTARTLOADING,
        payload: false
    }
}