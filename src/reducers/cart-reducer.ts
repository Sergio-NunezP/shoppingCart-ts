import { db } from "../data/db"
import { CartItem, Guitar } from "../types"

//Definir Acciones
export type CartActions =
    { type: 'add-to-cart', payload: { item: Guitar } } |
    { type: 'remove-from-cart', payload: { id: Guitar['id'] } } |
    { type: 'decreas-quantity', payload: { id: Guitar['id'] } } |
    { type: 'increase-quantity', payload: { id: Guitar['id'] } } |
    { type: 'clear-cart' }

// type del state
export type CartState = {
    data: Guitar[],
    cart: CartItem[]
}

// State inicial
export const initialState: CartState = {
    data: db,
    cart: []
}


// Definir el reducer
export const cartReducer = (
    // para tener autocompletado
    state: CartState = initialState,
    action: CartActions
) => {

    if (action.type === 'add-to-cart') {
        return {
            ...state
        }
    }

    if (action.type === 'remove-from-cart') {
        return {
            ...state
        }
    }

    if (action.type === 'decreas-quantity') {
        return {
            ...state
        }
    }

    if (action.type === 'increase-quantity') {
        return {
            ...state
        }
    }

    if (action.type === 'clear-cart') {
        return {
            ...state
        }
    }
    return state
}