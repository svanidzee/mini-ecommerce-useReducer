import { useReducer } from "react";

import CartContext from "./cart-context";
import { ADD_ITEM, REMOVE_ITEM, REMOVE_SINGLE, CLEAR_CART } from "./types";
const defaultCartState = {
  items: [],
  totalAmount: 0,
};

const cartReducer = (state, action) => {
  switch (action.type) {
    case ADD_ITEM: {
      const updatedTotalAmount =
        state.totalAmount + action.item.price * action.item.amount;

      // index of existing item
      const existingCartItemIndex = state.items.findIndex(
        (item) => item.id === action.item.id
      );

      // existing cartitem
      const existingCartItem = state.items[existingCartItemIndex];
      let updatedItems;

      // if item already part of cart items
      if (existingCartItem) {
        const updatedItem = {
          // copy existingCartItem
          ...existingCartItem,
          // update amount of existingCartItem when > 1
          amount: existingCartItem.amount + action.item.amount,
        };
        updatedItems = [...state.items];
        updatedItems[existingCartItemIndex] = updatedItem;
        // when first add to cart
      } else {
        updatedItems = state.items.concat(action.item);
      }

      return {
        items: updatedItems,
        totalAmount: updatedTotalAmount,
      };
    }
  }
  switch (action.type) {
    case REMOVE_ITEM: {
      const existingCartItemIndex = state.items.findIndex(
        (item) => item.id === action.id
      );
      const existingItem = state.items[existingCartItemIndex];
      //   update amount when remove
      const updatedTotalAmount = state.totalAmount - existingItem.price;
      let updatedItems;
      //   if 1 item remove entirly
      if (existingItem.amount === 1) {
        updatedItems = state.items.filter((item) => item.id !== action.id);
      } else {
        const updatedItem = {
          ...existingItem,
          amount: existingItem.amount - 1,
        };
        updatedItems = [...state.items];
        updatedItems[existingCartItemIndex] = updatedItem;
      }

      return {
        items: updatedItems,
        totalAmount: updatedTotalAmount,
      };
    }
  }
  switch (action.type) {
    case REMOVE_SINGLE: {
      const existingCartItemIndex = state.items.findIndex(
        (item) => item.id === action.id
      );
      const existingItem = state.items[existingCartItemIndex];
      const updatedTotalAmount = state.totalAmount - existingItem.price;
      let updatedItems;
      updatedItems = state.items.filter((item) => item.id !== action.id);

      return {
        items: updatedItems,
        totalAmount: updatedTotalAmount,
      };
    }
  }
  switch (action.type) {
    case CLEAR_CART: {
      return { totalAmount: 0, items: [] };
    }
  }

  return defaultCartState;
};

const CartProvider = (props) => {
  const [cartState, dispatchCartAction] = useReducer(
    cartReducer,
    defaultCartState
  );

  const addItemToCartHandler = (item) => {
    dispatchCartAction({ type: ADD_ITEM, item: item });
  };

  const removeItemFromCartHandler = (id) => {
    dispatchCartAction({ type: REMOVE_ITEM, id: id });
  };
  const removeSingleFromCartHandler = (id) => {
    dispatchCartAction({ type: REMOVE_SINGLE, id: id });
  };
  const resetItemsHandler = () => {
    dispatchCartAction({ type: CLEAR_CART });
  };

  const cartContext = {
    items: cartState.items,
    totalAmount: cartState.totalAmount,
    addItem: addItemToCartHandler,
    removeItem: removeItemFromCartHandler,
    removeSingleItem: removeSingleFromCartHandler,
    clearItems: resetItemsHandler,
  };

  return (
    <CartContext.Provider value={cartContext}>
      {props.children}
    </CartContext.Provider>
  );
};

export default CartProvider;
