import { createContext, useReducer, useContext, useEffect } from 'react';

const CartContext = createContext();
const cartReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_TO_CART':
      return {
        ...state,
        cart: [...state.cart, action.payload],
      };
    case 'REMOVE_FROM_CART':
      return {
        ...state,
        cart: state.cart.filter(item => item.id !== action.payload.id),
      };
    case 'SET_CART':
      return {
        ...state,
        cart: action.payload.cart,
      };
    case 'INCREMENT_QUANTITY':
      return {
        ...state,
        cart: state.cart.map(item =>
          item.id === action.payload.id
            ? { ...item, qty: item.qty + 1 }
            : item
        ),
      };
    case 'DECREMENT_QUANTITY':
      return {
        ...state,
        cart: state.cart.map(item =>
          item.id === action.payload.id && item.qty > 1
            ? { ...item, qty: item.qty - 1 }
            : item
        ),
      };
    case 'RESET_CART':
      return {
        ...state,
        cart: [],
      };
    default:
      return state;
  }
};
const CartProvider = ({ children }) => {
    // Check localStorage for existing cart data
    const storedCart = JSON.parse(localStorage.getItem('cart'));
  
    const [state, dispatch] = useReducer(
      cartReducer,
      // Use storedCart as initial state if available, or default to an empty cart
      { cart: storedCart || [] }
    );

  useEffect(() => {
    // Save cart data to localStorage whenever the cart changes
    localStorage.setItem('cart', JSON.stringify(state.cart));
  }, [state.cart]);

  return (
    <CartContext.Provider value={{ state, dispatch }}>
      {children}
    </CartContext.Provider>
  );
};

const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

export { CartProvider, useCart };
