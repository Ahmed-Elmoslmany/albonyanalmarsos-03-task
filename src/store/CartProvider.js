import { useReducer } from "react";

import CartContext from "./cart-context";

const defaultCartState = {
  items: JSON.parse(localStorage.getItem("cartItems")) || [],
};

console.log(defaultCartState);
const cartReducer = (state, action) => {
  if (action.type === "ADD") {
    // action.item.carsNumber = action.item.carsNumber + 1
    const existingItem = state.items.find((item) => item.id === action.item.id);
    if (existingItem) {
      return {
        ...state,
        items: state.items.map((item) => {
          if (item.id === action.item.id) {
            return {
              ...item,
              carsNumber: item.carsNumber + 1,
            };
          } else {
            return item;
          }
        }),
      };
    } else {
      return {
        ...state,
        items: [...state.items, { ...action.item, carsNumber: 1 }],
      };
    }
  }
  if (action.type === "REMOVE") {
    const existingCartIndex = state.items.findIndex(
      (item) => item.id === action.id
    );
    const existingItem = state.items[existingCartIndex];
    let updatedItems;
    if (existingItem.carsNumber === 1) {
      updatedItems = state.items.filter((item) => item.id !== action.id);
    } else {
      const updatedItem = {
        ...existingItem,
        carsNumber: existingItem.carsNumber - 1,
      };
      updatedItems = [...state.items];
      updatedItems[existingCartIndex] = updatedItem;
    }

    return {
      items: updatedItems,
    };
  }
  if (action.type === "REMOVEFROMCART") {
    const updatedItems = state.items.filter((item) => item.id !== action.id);
    return { items: updatedItems };
  }

  return defaultCartState;
};

const CartProvider = (props) => {
  const [cartState, dispatchCartAction] = useReducer(
    cartReducer,
    defaultCartState
  );

  const addItemToCartHandler = (item) => {
    dispatchCartAction({ type: "ADD", item: item });
  };

  const removeItemFromCartHandler = (id) => {
    dispatchCartAction({ type: "REMOVE", id: id });
  };

  const removeCartItemHandler = (id) => {
    dispatchCartAction({ type: "REMOVEFROMCART", id: id });
  };

  const cartContext = {
    items: cartState.items,
    totalAmount: cartState.totalAmount,
    addItem: addItemToCartHandler,
    removeItem: removeItemFromCartHandler,
    removeFromCart: removeCartItemHandler,
  };

  return (
    <CartContext.Provider value={cartContext}>
      {props.children}
    </CartContext.Provider>
  );
};

export default CartProvider;
