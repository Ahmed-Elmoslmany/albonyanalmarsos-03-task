import React from 'react';

const CartContext = React.createContext({
  items: [],
  addItem: (item) => {},
  removeItem: (id) => {},
  removeFromCart: (id) => {}
});

export default CartContext;