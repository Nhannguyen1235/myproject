import React from "react";
import Header from "../../ShopWeb/header/Header";
import Footer from "../../ShopWeb/footer.js/Footer";
import "../Home/Home.css";
import { FaTshirt } from "react-icons/fa";
import Slider from "../../ShopWeb/slider/BannerSlider";
import BrandSlider from "../../ShopWeb/slider/BrandSlider";
import ProductSlider from "../../ShopWeb/slider/ProductSlider";
import { NavLink } from "reactstrap";

export default function Home() {
  return (
    <div>
      <Header />
      <main className="main">
        <Slider/>
      </main>
      <section className="productSlider text-center">
        <h1>New Arrival</h1>
        <ProductSlider/>
      </section>
      <section className="brandSlider text-center">
        <h1>Our Brands</h1>
        <BrandSlider/>
      </section>
      <section className="category container text-center mt-3">
        <h1>Trending Category</h1>
        <div className="row " id="row">
          <div className="box col-md-4">
            <NavLink className="icon" href=""><FaTshirt /></NavLink>
          </div>
          <div className="box col-md-4">
            <NavLink className="icon" href=""><FaTshirt /></NavLink>
          </div>
          <div className="box col-md-4">
            <NavLink className="icon" href=""><FaTshirt /></NavLink>
          </div>
          <div className="box col-md-4">
            <NavLink className="icon" href=""><FaTshirt /></NavLink>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}
