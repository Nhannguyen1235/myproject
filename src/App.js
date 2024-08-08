import React from 'react'
import { Provider } from 'react-redux';
import { BrowserRouter, HashRouter, Route, Routes } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import Home from './pages/Home/Home';
import store from './ShopWeb/redux/store';
import './style.css'
import Contact from './pages/Contact/Contact';
import Products from './pages/Products/Products';
import ProductDetail from './pages/ProductDetail/ProductDetail';
import Carts from './pages/Carts/Carts';

export default function App() {
  return (
    <div>
      <Provider store={store}>
        {/* nhớ đổi qua hashRouter khi đưa lên domain */}
      <BrowserRouter basename="/">
        <Routes>
          <Route index element={<Home />} exact />
          <Route path="/contact" element={<Contact />} exact />
          <Route path="/cart" element={<Carts />} exact />
          <Route path="/product/:productId" element={<ProductDetail />} exact />
          <Route path="/products" element={<Products />} exact />
          <Route path="/products/:category/:price/:search" element={<Products />} />
          <Route path="/products/:category/:price" element={<Products />} />
          <Route path="/products/:category/" element={<Products />} />
          <Route path="/products/search/:search/" element={<Products />} />
          <Route path="/products/:price" element={<Products />} />
        </Routes>
      </BrowserRouter>
    </Provider>
    </div>
  )
}
