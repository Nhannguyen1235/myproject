import React from "react";
import Header from "../../ShopWeb/header/Header";
import Products from "../../ShopWeb/products/Products";
import Footer from "../../ShopWeb/footer.js/Footer";
import "../Home/Home.css";
import Slider from "../../ShopWeb/slider/Slider";



export default function Home() {
  return (
    <div>
      <Header />
      <main className="main">
      <Slider/>
      </main>
      <section className="newProduct">
        
      </section>
      <Products />
      <Footer />
    </div>
  );
}
