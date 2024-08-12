import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/autoplay';
import 'bootstrap/dist/css/bootstrap.min.css';
import './ProductSlider.css';
import { fetchProducts } from '../redux/productSlice';
import { Link } from 'react-router-dom';
import { addCart } from '../redux/cartSlice';
import Swal from 'sweetalert2';

export default function ProductSlider() {
  const dispatch = useDispatch();
  const [currentProductSlide, setCurrentProductSlide] = useState(0);
  const { products, status, error } = useSelector((state) => state.products);

  const handleProductSlideChange = (swiper) => {
    setCurrentProductSlide(swiper.activeIndex);
  };

  const handleNext = () => {
    setCurrentProductSlide((prevSlide) => prevSlide + 1);
  };

  const handlePrev = () => {
    setCurrentProductSlide((prevSlide) => prevSlide - 1);
  };
  const handleAddToCart = (product) => {
    dispatch(addCart(product)); // Dispatch action thêm sản phẩm vào giỏ hàng
    Swal.fire({
      title: "Great!",
      text: "Added to cart successfully!",
      icon: "success"
    }); // Hiển thị thông báo thành công
  };


  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  useEffect(() => {
    const swiper = document.querySelector('.product-slider .swiper')?.swiper;
    if (swiper) {
      swiper.slideTo(currentProductSlide);
    }
  }, [currentProductSlide]);

  if (status === 'loading') {
    return <div>Loading...</div>;
  }

  if (status === 'failed') {
    return <div>Error: {error}</div>;
  }
  const firstFiveProducts = products.slice(0, 5);

  return (
    <div className="product-slider container mt-4">
      <Swiper
        onSlideChange={handleProductSlideChange}
        spaceBetween={10}
        slidesPerView={4}
        loop={true}
        pagination={{ clickable: true }}
        navigation
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        modules={[Autoplay, Pagination, Navigation]}
        breakpoints={{
          320: { slidesPerView: 2, spaceBetween: 10 },
          576: { slidesPerView: 2, spaceBetween: 10 },
          768: { slidesPerView: 3, spaceBetween: 10 },
          992: { slidesPerView: 4, spaceBetween: 10 },
          1200: { slidesPerView: 4, spaceBetween: 10 },
        }}
      >
        {firstFiveProducts.map((product, index) => {
          const productImage = require(`../../imgs/${product.image}.jpg`);

          return (
            <SwiperSlide key={index}>
              <div key={product.id} className="">
                  <div className="card h-100" data-aos="zoom-in-up">
                    <Link to={`/product/${product.id}`}>
                      <img
                        src={productImage}
                        className="card-img-top"
                        alt={product.name}
                      />
                    </Link>
                    <div className="card-body">
                      <div className="card-content">
                        <h5 className="card-name-slider">{product.name}</h5>
                        <p className="card-text">Price: ${product.price}</p>
                        <p className="card-text">
                          Category:{" "}
                          {product.category.map((cat, index) => (
                            <span key={index}>
                              <Link
                                to={`/products/${cat.toLowerCase()}`}
                                className="category-link"
                              >
                                {cat}
                              </Link>
                              {index < product.category.length - 1 && ", "}
                            </span>
                          ))}
                        </p>
                      </div>
                      <Link
                        to={`/product/${product.id}`}
                        className="btn btn-view btn-outline-dark"
                      >
                        View Details
                      </Link>
                      <button
                        onClick={() => handleAddToCart(product)}
                        className="btn btn-view btn-outline-dark"
                      >
                        Add To Cart
                      </button>
                    </div>
                  </div>
                </div>
            </SwiperSlide>
          );
        })}
      </Swiper>
      <div className="button justify-content-between mt-3">
        <button className="prev-button" onClick={handlePrev}>{"<"}</button>
        <button className="next-button" onClick={handleNext}>{">"}</button>
      </div>
    </div>
  );
}