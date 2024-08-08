import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  carts: [],
  checkAll: false,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addCart(state, action) {
      const product = action.payload;
      const existingProduct = state.carts.find(
        (item) => item.id === product.id
      );
      if (existingProduct) {
        // Nếu sản phẩm đã có trong giỏ hàng, cập nhật số lượng
        existingProduct.quantity += 1;
      } else {
        // Nếu sản phẩm chưa có trong giỏ hàng, thêm sản phẩm mới
        state.carts.push({ ...product, checked: true, quantity: 1 });
      }
    },
    deleteCart(state, action) {
      const productId = action.payload;
      state.carts = state.carts.filter((item) => item.id !== productId);
    },
    clearCart(state) {
      state.carts = state.carts.filter((item) => !item.checked);
    },
    toggleCheckAll(state, action) {
      const isChecked = action.payload;
      state.checkAll = isChecked;
      state.carts = state.carts.map((item) => ({
        ...item,
        checked: isChecked,
      }));
    },
    toggleCheck(state, action) {
      const productId = action.payload;
      state.carts = state.carts.map((item) =>
        item.id === productId ? { ...item, checked: !item.checked } : item
      );
    },
    overwriteCarts(state, action) {
      state.carts = action.payload;
    },
  },
});

export const {
  addCart,
  deleteCart,
  clearCart,
  toggleCheckAll,
  toggleCheck,
  overwriteCarts,
} = cartSlice.actions;
export default cartSlice.reducer;
