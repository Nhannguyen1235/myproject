import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const url = 'https://66a07af87053166bcabb8822.mockapi.io/product';
//lấy danh sách sản phẩm từ api
export const fetchProducts = createAsyncThunk('products/fetchProducts', async () => {
    const response = await axios.get(url);
    return response.data;
});
//khởi tạo trạng thái
const initialState = {
    products: [],
    filteredProducts: [],
    status: 'idle',
    error: '',
    selectedCategory: 'all',
    selectedPrice: 'all',
};
//tạo slice redux
const productSlice = createSlice({
    name: 'products',
    initialState,
    //hàm cập nhật trạng thái
    reducers: {
        setCategory: (state, action) => {
            const category = action.payload.toLowerCase();
            state.selectedCategory = category;
            //lọc theo danh mục
            state.filteredProducts = state.products.filter(product => 
                category === 'all' || 
                product.category.map(c => c.toLowerCase()).includes(category)
            );
        },
        setPrice: (state, action) => {
            const priceRange = action.payload.toLowerCase();
            state.selectedPrice = priceRange;
            // lọc theo giá
            state.filteredProducts = state.products.filter(product => {
                switch (priceRange) {
                    case 'under $50':
                        return product.price < 50;
                    case '$50 - $100':
                        return product.price >= 50 && product.price <= 100;
                    case 'above $100':
                        return product.price > 100;
                    case 'all':
                    default:
                        return true;
                }
            }).filter(product => 
                state.selectedCategory === 'all' || 
                product.category.map(c => c.toLowerCase()).includes(state.selectedCategory)
            );
        },
    },
    //xử lý các tình huống khi lấy sản phẩm từ Api
    extraReducers: (builder) => {
        builder
            // đang gửi yêu cầu và chờ phản hồi
            .addCase(fetchProducts.pending, (state) => {
                state.status = 'loading';
            })
            // đã lấy thành công
            .addCase(fetchProducts.fulfilled, (state, action) => {
                state.status = 'succeeded';
                //action.payload chứa dữ liệu sản phẩm
                state.products = action.payload;
                // Apply initial filters based on URL parameters
                state.filteredProducts = action.payload.filter(product => 
                    (state.selectedCategory === 'all' || 
                    product.category.map(c => c.toLowerCase()).includes(state.selectedCategory)) &&
                    (state.selectedPrice === 'all' || 
                    (state.selectedPrice === 'under $50' && product.price < 50) ||
                    (state.selectedPrice === '$50 - $100' && product.price >= 50 && product.price <= 100) ||
                    (state.selectedPrice === 'above $100' && product.price > 100))
                );
            })
            // xử lý lỗi
            .addCase(fetchProducts.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            });
    },
});

export const { setCategory, setPrice } = productSlice.actions;

export default productSlice.reducer;
