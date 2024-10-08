import React from 'react';
import { Provider } from 'react-redux';
import { HashRouter, Route, Routes } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Home from './pages/Home/Home';
import store from './ShopWeb/redux/store';
import './style.css';
import Contact from './pages/Contact/Contact';
import Products from './pages/Products/Products';
import ProductDetail from './pages/ProductDetail/ProductDetail';
import Carts from './pages/Carts/Carts';
import CheckOut from './pages/CheckOut/CheckOut';
import Login from './pages/Login/Login';

export default function App() {
  return (
    <Provider store={store}>
      <HashRouter basename="/">
        <Routes>
          <Route index element={<Home />} exact />
          <Route path="/contact" element={<Contact />} />
          <Route path="/cart" element={<Carts />} />
          <Route path="/product/:productId" element={<ProductDetail />} />
          <Route path="/products" element={<Products />} />
          <Route path="/products/:category/:price/:search" element={<Products />} />
          <Route path="/products/:category/:price" element={<Products />} />
          <Route path="/checkouts/" element={<CheckOut />} />
          <Route path="/products/:category/" element={<Products />} />
          <Route path="/products/search/:search/" element={<Products />} />
          <Route path="/products/:price" element={<Products />} />
          <Route path="/login" element={<Login />} />
          <Route path="*" element={<Home />} />
        </Routes>
      </HashRouter>
    </Provider>
  );
}
