import Header from "../../ShopWeb/header/Header";
import Footer from "../../ShopWeb/footer/Footer";
import "../Home/Home.css";
import AOS from 'aos'; 
import 'aos/dist/aos.css';
import { LuShirt } from "react-icons/lu";
import SBC_men from "../../imgs/SBC_men.png";
import SBC_women from "../../imgs/SBC_women.png";
import { TbBrandRedhat } from "react-icons/tb";
import { PiHoodieLight } from "react-icons/pi";
import { GiPoloShirt } from "react-icons/gi";
import Slider from "../../ShopWeb/slider/BannerSlider";
import BrandSlider from "../../ShopWeb/slider/BrandSlider";
import ProductSlider from "../../ShopWeb/slider/ProductSlider";
import { NavLink } from "reactstrap";
import ScrollUp from "../../ShopWeb/scrollUp/ScrollUp";

export default function Home() {
  AOS.init();
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
      <section className="colection text-center">
        <h1>Colections</h1>
        <div className="colections row text-center">
        <div className="men_colection col-lg-4"  data-aos="fade-right" data-aos-delay="200">
            <div className="box__men_colection p-3">
              <a href="/products/men"><img src={SBC_men}></img><button className="btn-filter btn btn-outline-secondary">Men's</button></a>
              
            </div>
        </div>
        <div className="women_colection col-lg-4" data-aos="fade-left" data-aos-delay="200">
            <div className="box_women_colection p-3">
              <a href="/products/women"><img src={SBC_women}></img><button className="btn-filter btn btn-outline-secondary">Women's</button></a>
              
            </div>
        </div>
        </div>
      </section>
      <section className="brandSlider text-center">
        <h1>Our Brands</h1>
        <BrandSlider/>
      </section>
      <section className="category container text-center mt-3">
        <h1>Trending Category</h1>
        <div className="row " id="row">
          <div className="box col-md-4" >
            <NavLink className="icon" data-aos="flip-left" data-aos-delay="300" href=""><LuShirt /></NavLink>
          </div>
          <div className="box col-md-4">
            <NavLink className="icon" data-aos="flip-left" data-aos-delay="500" href=""><PiHoodieLight /></NavLink>
          </div>
          <div className="box col-md-4">
            <NavLink className="icon" data-aos="flip-left" data-aos-delay="700" href=""><TbBrandRedhat /></NavLink>
          </div>
          <div className="box col-md-4">
            <NavLink className="icon" data-aos="flip-left" data-aos-delay="900" href=""><GiPoloShirt /></NavLink>
          </div>
        </div>
      </section>
      <Footer />
      <ScrollUp/>
    </div>
  );
}
