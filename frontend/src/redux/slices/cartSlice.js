import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

const initialState = {
  cart: localStorage.getItem("products")
    ? JSON.parse(localStorage.getItem("products"))
    : [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart(state, action) {
      const data = action.payload;
      console.log(data);
      const productIndex = state.cart.findIndex((item) => item.id === data.id);
      if (productIndex === -1) {
        const newData = { ...data, quantity: 1 };
        state.cart.push(newData);
      } else {
        if (state.cart[productIndex].quantity === 5) {
          toast.error("maximum quantity reached");
          return;
        }
        state.cart[productIndex].quantity += 1;
      }
      localStorage.setItem("products", JSON.stringify(state.cart));
      toast.success("Added to cart");
    },

    removeFromCart(state, action) {
      const id = action.payload;
      state.cart = state.cart.filter((item) => item.id !== id);
      localStorage.setItem("products", JSON.stringify(state.cart));
      toast.success("removed");
    },

    updateQuantity(state, action) {
      const data = action.payload;

      const productIndex = state.cart.findIndex((item) => item.id === data.id);

      if (productIndex === -1) {
        toast.error("Can't update quantity, Product not found");
      } else {
        state.cart[productIndex].quantity = Number(data.quantity);
        localStorage.setItem("products", JSON.stringify(state.cart));
        toast.success("Quantity updated");
      }
    },

    resetCart(state) {
      state.cart = [];
      localStorage.removeItem("products");
    },
  },
});

export const { addToCart, removeFromCart, updateQuantity, resetCart } =
  cartSlice.actions;
export default cartSlice.reducer;
