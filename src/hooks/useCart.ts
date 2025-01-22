import { useState, useEffect, useMemo } from 'react'
import type { Guitar, CartItem } from '../types'

export const useCart = () => {

    // para que haya persistencia en el localstorage
    const initialCart = (): CartItem[] => {
        const localStorageCart = localStorage.getItem('cart')
        return localStorageCart ? JSON.parse(localStorageCart) : []
    }

    const [cart, setCart] = useState(initialCart) // inicia con esa variable para revisar si hay elementos

    // useEffect para tener sincronizado nuestro carrito y estar escribiendo en localstorage  
    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cart))
    }, [cart]) // cada de cambie cart se actualiza en automatico con useEffect

    const MIN_ITEMS = 1
    const MAX_ITEMS = 5

    function removeFromCart(id: Guitar['id']) {
        setCart(prevCart => prevCart.filter(guitar => guitar.id !== id))
    }

    function decreasQuantity(id: Guitar['id']) {
        const updateCart = cart.map(item => {
            if (item.id === id && item.quantity > MIN_ITEMS) {
                return {
                    ...item,
                    quantity: item.quantity - 1
                }
            }
            return item
        })
        setCart(updateCart)
    }

    function increaseQuantity(id: Guitar['id']) {
        const updateCart = cart.map(item => {
            if (item.id === id && item.quantity < MAX_ITEMS) {
                return {
                    ...item,
                    quantity: item.quantity + 1
                }
            }
            return item
        })
        setCart(updateCart)
    }

    function clearCart() {
        setCart([])
    }

    //State Derivado
    const isEmpty = useMemo(() => cart.length === 0, [cart])
    const cartTotal = useMemo(() => cart.reduce((total, item) => total + (item.quantity * item.price), 0), [cart])


    return {
        cart,
        removeFromCart,
        decreasQuantity,
        increaseQuantity,
        clearCart,
        isEmpty,
        cartTotal
    }
}