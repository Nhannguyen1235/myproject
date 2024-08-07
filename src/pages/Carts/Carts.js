import React from 'react'
import './Carts.css'
import Header from '../../ShopWeb/header/Header'
import Footer from '../../ShopWeb/footer/Footer'
import Cart from '../../ShopWeb/cart/Cart'

export default function Carts() {
  return (
    <div className="d-flex flex-column min-vh-100">
        <Header/>
        <main className="flex-fill">
        <h1>Cart</h1>
        <Cart/>
        </main>
        <Footer/>
    </div>
  )
}
