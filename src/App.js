import React from 'react'
import { Provider } from 'react-redux';
import { HashRouter, Route, Routes } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import Home from './pages/Home/Home';
import store from './ShopWeb/redux/store';
import './style.css'

export default function App() {
  return (
    <div>
      <Provider store={store}>
        <HashRouter>
          <Routes>
            <Route index element={<Home />} />
            {/* <Route path="/cart" element={<Cart />}  */}
          </Routes>
        </HashRouter>
        </Provider>
    </div>
  )
}
