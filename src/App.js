import React from 'react'
import { HashRouter, Route, Routes } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import Home from './pages/Home/Home';
import './style.css'

export default function App() {
  return (
    <div>
        <HashRouter>
          <Routes>
            <Route index element={<Home />} />
            {/* <Route path="/card" element={<Card />}  */}
          </Routes>
        </HashRouter>
    </div>
  )
}
