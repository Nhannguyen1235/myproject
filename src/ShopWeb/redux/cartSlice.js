import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    carts: [],
    checkAll: false,
};

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addCart(state, action) {
            const product = action.payload;
            // Kiểm tra xem sản phẩm đã có trong giỏ hàng chưa
            const existingProduct = state.carts.find(item => item.id === product.id);
            if (existingProduct) {
                // Nếu đã có, không thêm nữa
                return;
            }
            state.carts.push({ ...product, checked: true });
        },
        deleteCart(state, action) {
            const productId = action.payload;
            state.carts = state.carts.filter(item => item.id !== productId);
        },
        clearCart(state) {
            state.carts = [];
        },
        toggleCheckAll(state, action) {
            const isChecked = action.payload;
            state.checkAll = isChecked;
            state.carts = state.carts.map(item => ({ ...item, checked: isChecked }));
        },
        toggleCheck(state, action) {
            const productId = action.payload;
            state.carts = state.carts.map(item =>
                item.id === productId ? { ...item, checked: !item.checked } : item
            );
        }
    }
});

export const { addCart, deleteCart, clearCart, toggleCheckAll, toggleCheck } = cartSlice.actions;
export default cartSlice.reducer;
