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

export default function App() {
  return (
    <div>
      <Provider store={store}>
        {/* nhớ đổi qua hashRouter khi đưa lên domain */}
      <BrowserRouter basename="/">
        <Routes>
          <Route index element={<Home />} exact />
          <Route path="/contact" element={<Contact />} exact />
          <Route path="/product/:productId" element={<ProductDetail />} exact />
          <Route path="/products" element={<Products />} exact />
        </Routes>
      </BrowserRouter>
    </Provider>
    </div>
  )
}
