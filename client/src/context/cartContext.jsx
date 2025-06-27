import { createContext, useContext, useReducer, useEffect } from "react";

const CartContext = createContext();

// Get initial state from localStorage or use empty cart
const initialState = {
  cart: JSON.parse(localStorage.getItem('cart')) || [],
};

function cartReducer(state, action) {
  let newState;
  
  switch (action.type) {
    case "ADD_TO_CART":
      const existingItem = state.cart.find(item => item.id === action.payload.id);
      if (existingItem) {
        newState = {
          ...state,
          cart: state.cart.map(item =>
            item.id === action.payload.id
              ? { ...item, quantity: (item.quantity || 1) + (action.payload.quantity || 1) }
              : item
          ),
        };
      } else {
        newState = {
          ...state,
          cart: [...state.cart, { ...action.payload, quantity: action.payload.quantity || 1 }],
        };
      }
      break;

    case "REMOVE_FROM_CART":
      newState = {
        ...state,
        cart: state.cart.filter(item => item.id !== action.payload),
      };
      break;

    case "CLEAR_CART":
      newState = {
        ...state,
        cart: [],
      };
      break;

    case "HYDRATE_CART":
      newState = {
        ...state,
        cart: action.payload,
      };
      break;

    default:
      return state;
  }
  
  // Save to localStorage after each state change
  localStorage.setItem('cart', JSON.stringify(newState.cart));
  return newState;
}

export function CartProvider({ children }) {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  // Load cart from localStorage on initial render
  useEffect(() => {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      dispatch({
        type: "HYDRATE_CART",
        payload: JSON.parse(savedCart)
      });
    }
  }, []);

  return (
    <CartContext.Provider value={{ cart: state.cart, dispatch }}>
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};