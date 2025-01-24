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

// para que haya persistencia en el localstorage
const initialCart = (): CartItem[] => {
    const localStorageCart = localStorage.getItem('cart')
    return localStorageCart ? JSON.parse(localStorageCart) : []
}

// State inicial
export const initialState: CartState = {
    data: db,
    cart: initialCart()
}

// Minimo y máximo para elegir
const MIN_ITEMS = 1
const MAX_ITEMS = 5

// Definir el reducer
export const cartReducer = (
    // para tener autocompletado
    state: CartState = initialState,
    action: CartActions
) => {

    if (action.type === 'add-to-cart') {
        const itemExists = state.cart.find(guitar => guitar.id === action.payload.item.id)
        let updateCart: CartItem[] = []
        if (itemExists) { // existe en el carrito
            updateCart = state.cart.map(item => {
                if (item.id === action.payload.item.id && item.quantity < MAX_ITEMS) {
                    return { ...item, quantity: item.quantity + 1 }
                } else {
                    return item
                }
            })
        } else {
            const newItem: CartItem = { ...action.payload.item, quantity: 1 }
            updateCart = [...state.cart, newItem]
        }
        return {
            ...state,
            cart: updateCart
        }
    }

    if (action.type === 'remove-from-cart') {
        const cart = state.cart.filter(item => item.id !== action.payload.id)
        return {
            ...state,
            cart
        }
    }

    if (action.type === 'decreas-quantity') {


        const cart = state.cart.map(item => {
            if (item.id === action.payload.id && item.quantity > MIN_ITEMS) {
                return {
                    ...item,
                    quantity: item.quantity - 1
                }
            }
            return item
        })

        return {
            ...state, cart
        }
    }

    if (action.type === 'increase-quantity') {

        const cart = state.cart.map(item => {
            if (item.id === action.payload.id && item.quantity < MAX_ITEMS) {
                return {
                    ...item,
                    quantity: item.quantity + 1
                }
            }
            return item
        })
        return {
            ...state,
            cart
        }
    }

    if (action.type === 'clear-cart') {

        return {
            ...state,
            cart: []
        }
    }
    return state
}