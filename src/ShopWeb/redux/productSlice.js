import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const url = 'https://66a07af87053166bcabb8822.mockapi.io/product';

// Lấy danh sách sản phẩm từ API
export const fetchProducts = createAsyncThunk('products/fetchProducts', async () => {
    const response = await axios.get(url);
    return response.data;
});

// Khởi tạo trạng thái ban đầu
const initialState = {
    products: [],            // Danh sách tất cả các sản phẩm
    filteredProducts: [],    // Danh sách sản phẩm đã được lọc
    status: 'idle',          // Trạng thái của yêu cầu (idle, loading, succeeded, failed)
    error: '',               // Lỗi nếu có khi lấy sản phẩm từ API
    selectedCategory: 'all', // Danh mục sản phẩm đã chọn
    selectedPrice: 'all',    // Phạm vi giá đã chọn
    searchTerm: '',          // Từ khóa tìm kiếm
};

// Tạo slice Redux
const productSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {
        // Cập nhật danh mục lọc sản phẩm
        setCategory: (state, action) => {
            const category = action.payload.toLowerCase();
            state.selectedCategory = category;
            // Áp dụng bộ lọc dựa trên danh mục, phạm vi giá và từ khóa tìm kiếm
            state.filteredProducts = state.products.filter(product =>
                (category === 'all' || product.category.map(c => c.toLowerCase()).includes(category)) &&
                (state.searchTerm === '' || product.name.toLowerCase().includes(state.searchTerm)) &&
                (state.selectedPrice === 'all' ||
                (state.selectedPrice === 'under $50' && product.price < 50) ||
                (state.selectedPrice === '$50 - $100' && product.price >= 50 && product.price <= 100) ||
                (state.selectedPrice === 'above $100' && product.price > 100))
            );
        },
        // Cập nhật phạm vi giá lọc sản phẩm
        setPrice: (state, action) => {
            const priceRange = action.payload.toLowerCase();
            state.selectedPrice = priceRange;
            // Áp dụng bộ lọc dựa trên phạm vi giá, danh mục và từ khóa tìm kiếm
            state.filteredProducts = state.products.filter(product =>
                (state.selectedCategory === 'all' || product.category.map(c => c.toLowerCase()).includes(state.selectedCategory)) &&
                (state.searchTerm === '' || product.name.toLowerCase().includes(state.searchTerm)) &&
                (priceRange === 'all' ||
                (priceRange === 'under $50' && product.price < 50) ||
                (priceRange === '$50 - $100' && product.price >= 50 && product.price <= 100) ||
                (priceRange === 'above $100' && product.price > 100))
            );
        },
        // Cập nhật từ khóa tìm kiếm
        setSearchTerm: (state, action) => {
            const searchTerm = action.payload.toLowerCase();
            state.searchTerm = searchTerm;
            // Áp dụng bộ lọc tìm kiếm
            state.filteredProducts = state.products.filter(product =>
                (state.selectedCategory === 'all' || product.category.map(c => c.toLowerCase()).includes(state.selectedCategory)) &&
                (state.selectedPrice === 'all' ||
                (state.selectedPrice === 'under $50' && product.price < 50) ||
                (state.selectedPrice === '$50 - $100' && product.price >= 50 && product.price <= 100) ||
                (state.selectedPrice === 'above $100' && product.price > 100)) &&
                (product.name.toLowerCase().includes(searchTerm))
            );
        },
    },
    extraReducers: (builder) => {
        builder
            // Khi yêu cầu lấy sản phẩm từ API đang chờ phản hồi
            .addCase(fetchProducts.pending, (state) => {
                state.status = 'loading';
            })
            // Khi lấy sản phẩm từ API thành công
            .addCase(fetchProducts.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.products = action.payload;
                // Áp dụng bộ lọc ban đầu dựa trên các trạng thái tìm kiếm, danh mục và giá
                state.filteredProducts = action.payload.filter(product =>
                    (state.selectedCategory === 'all' || product.category.map(c => c.toLowerCase()).includes(state.selectedCategory)) &&
                    (state.selectedPrice === 'all' ||
                    (state.selectedPrice === 'under $50' && product.price < 50) ||
                    (state.selectedPrice === '$50 - $100' && product.price >= 50 && product.price <= 100) ||
                    (state.selectedPrice === 'above $100' && product.price > 100)) &&
                    (product.name.toLowerCase().includes(state.searchTerm.toLowerCase()))
                );
            })
            // Khi yêu cầu lấy sản phẩm từ API bị lỗi
            .addCase(fetchProducts.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            });
    },
});

export const { setCategory, setPrice, setSearchTerm } = productSlice.actions;

export default productSlice.reducer;
