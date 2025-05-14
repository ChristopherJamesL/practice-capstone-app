import { createContext, useReducer } from "react";

const addCartItem = (cartItems, productToAdd) => {
    const existingCartItem = cartItems.find(cartItem => cartItem.id === productToAdd.id);

    if (existingCartItem) {
        return cartItems.map(cartItem => 
            cartItem.id === productToAdd.id 
                ? {...cartItem, quantity: cartItem.quantity + 1}
                : cartItem
        );  
    }
    return [...cartItems, { ...productToAdd, quantity: 1 }]
}

const removeCartItem = (cartItems, cartItemToRemove) => {
    const existingCartItem = cartItems.find(cartItem => cartItem.id === cartItemToRemove.id);

    if (!existingCartItem) return cartItems;

    if (existingCartItem.quantity === 1) {
        return cartItems.filter(cartItem => cartItem.id !== cartItemToRemove.id)        
    } else {
        return cartItems.map(cartItem => {
            return cartItem.id === cartItemToRemove.id
                ? {...cartItem, quantity: cartItem.quantity - 1}
                : cartItem;
        })
    }
}

const removeCartItems = (cartItems, cartItemToRemove) => {
    return cartItems.filter(cartItem => cartItem.id !== cartItemToRemove.id);
}

export const CartContext = createContext({
    isCartOpen: false,
    cartItems: [],
    cartCount: 0,
    cartTotal: 0,
    setIsCartOpen: () => {},
    addItemToCart: () => {},
    addItemToCount: () => {},
    removeItemFromCart: () => {},
    removeAllOfCartItem: () => {},
    setCartTotal: () => {}
})

export const CART_ACTION_TYPES = {
    SET_CART_ITEMS: 'SET_CART_ITEMS',
    SET_IS_CART_OPEN: 'SET_IS_CART_OPEN'
}

const INITIAL_STATE = {
    isCartOpen: false,
    cartItems: [],
    cartCount: 0,
    cartTotal: 0
}

const cartReducer = (state, action) => {
    const { type, payload } = action;
    switch(type) {
        case CART_ACTION_TYPES.SET_CART_ITEMS:
            return {
                ...state,
                ...payload
            }
        case CART_ACTION_TYPES.SET_IS_CART_OPEN:
            return {
                ...state,
                isCartOpen: payload
            }
        default:
            throw new Error(`unhandled type ${type} in cartReducer`)
    }
}

export const CartProvider = ({ children }) => {
    const [state, dispatch] = useReducer(cartReducer, INITIAL_STATE);
    const { isCartOpen, cartItems, cartCount, cartTotal } = state;
    
    const updateCartItemsReducer = (newCartItems) => {
        const newCartCount = newCartItems.reduce((total, cartItem) => {
            return total + cartItem.quantity;
        }, 0)

        const newCartTotal = newCartItems.reduce((total, cartItem) => {
            return total + cartItem.price * cartItem.quantity;
        }, 0)

        dispatch({
            type: CART_ACTION_TYPES.SET_CART_ITEMS,
            payload: {
                cartItems: newCartItems,
                cartCount: newCartCount,
                cartTotal: newCartTotal
            }
        })
    }

    const setIsCartOpen = (boolean) => {
        dispatch({ type: CART_ACTION_TYPES.SET_IS_CART_OPEN, payload: boolean });
    }

    const addItemToCart = (productToAdd) => {
        const newCartItems = addCartItem(cartItems, productToAdd);
        updateCartItemsReducer(newCartItems);
    }

    const removeItemFromCart = (cartItemToRemove) => {
        const newCartItems = removeCartItem(cartItems, cartItemToRemove);
        updateCartItemsReducer(newCartItems);
    }
    
    const removeAllOfCartItem = (cartItemToRemove) => {
        const newCartItems = removeCartItems(cartItems, cartItemToRemove);
        updateCartItemsReducer(newCartItems);
    }


    const value = { 
        isCartOpen, 
        cartItems, 
        cartCount,
        cartTotal,
        setIsCartOpen,
        addItemToCart, 
        removeItemFromCart ,
        removeAllOfCartItem
    };

    return <CartContext.Provider value={value} >{children}</CartContext.Provider>
}