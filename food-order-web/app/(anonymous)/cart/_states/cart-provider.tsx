"use client"

import React, { createContext, useContext, useReducer } from "react"
import { CartItem } from "@/lib/model/output/cart.model"
import { CuisineListItem } from "@/lib/model/output/master-data.model"

type CartAction =
    | { type: "ADD_ITEM"; cuisine: CuisineListItem }
    | { type: "CHANGE_QUANTITY"; cuisineId: number; delta: number }
    | { type: "REMOVE_ITEM"; cuisineId: number }
    | { type: "CLEAR" }

function cartReducer(items: CartItem[], action: CartAction): CartItem[] {
    switch (action.type) {
        case "ADD_ITEM": {
            const { cuisine } = action

            if (items.some((item) => item.cuisineId === cuisine.id)) {
                return items.map((item) =>
                    item.cuisineId === cuisine.id ? { ...item, quantity: item.quantity + 1 } : item
                )
            }

            return [
                ...items,
                { cuisineId: cuisine.id, name: cuisine.name, price: cuisine.price, quantity: 1 },
            ]
        }

        case "CHANGE_QUANTITY":
            return items
                .map((item) =>
                    item.cuisineId === action.cuisineId
                        ? { ...item, quantity: item.quantity + action.delta }
                        : item
                )
                .filter((item) => item.quantity > 0)

        case "REMOVE_ITEM":
            return items.filter((item) => item.cuisineId !== action.cuisineId)

        case "CLEAR":
            return []
    }
}

type CartContextType = {
    items: CartItem[]
    subtotal: number
    addItem: (cuisine: CuisineListItem) => void
    changeQuantity: (cuisineId: number, delta: number) => void
    removeItem: (cuisineId: number) => void
    clear: () => void
}

const CartContext = createContext<CartContextType | undefined>(undefined)

export function useCart() {
    const context = useContext(CartContext)

    if (!context) {
        throw Error("Invalid usage of cart context.")
    }

    return context
}

export function CartProvider({ children }: { children: React.ReactNode }) {
    const [items, dispatch] = useReducer(cartReducer, [])

    const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0)

    const value: CartContextType = {
        items,
        subtotal,
        addItem: (cuisine) => dispatch({ type: "ADD_ITEM", cuisine }),
        changeQuantity: (cuisineId, delta) =>
            dispatch({ type: "CHANGE_QUANTITY", cuisineId, delta }),
        removeItem: (cuisineId) => dispatch({ type: "REMOVE_ITEM", cuisineId }),
        clear: () => dispatch({ type: "CLEAR" }),
    }

    return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}
