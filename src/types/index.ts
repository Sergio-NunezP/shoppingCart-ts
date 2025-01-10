export type Guitar = {
    id: number
    name: string
    image: string
    description: string
    price: number
}

export type CartItem = Guitar & {
    quantity: number
}

// Solo podemos pasar un parámetro con este metodo. con pick u omit sería diferente
export type GuitarID = Guitar['id']