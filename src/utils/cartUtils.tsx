import { CART } from "../constants/config";
import type { CartItemProps } from "../types/cart";

export const calcTotalPrice = (items: CartItemProps[]) => {
  return items.reduce((sum, item) => item.price * item.count + sum, 0);
};

export const getCartDataFromLocalStorage = () => {
  const cartData = localStorage.getItem("cart");
  const cartItems = cartData ? JSON.parse(cartData) : CART.ITEMS;
  const totalPrice = calcTotalPrice(cartItems);
  return { cartItems, totalPrice };
};
