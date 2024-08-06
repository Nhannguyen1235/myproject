import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { nextSlide, prevSlide, setSlide } from '../redux/sliderSlice';
import img_slider from '../../imgs/gscd1.jpg';
import img_slider2 from '../../imgs/gscd1.jpg';
import img_slider3 from '../../imgs/gscd1.jpg';
import img_slider4 from '../../imgs/gscd1.jpg';
import './Slider.css';

export default function Slider() {
    const dispatch = useDispatch();
    const { currentSlide } = useSelector((state) => state.slider);
    const totalSlides = 4; 
  
    const handleSlideChange = (swiper) => {
      dispatch(setSlide(swiper.activeIndex));
    };
  
    const handleNext = () => {
      dispatch(nextSlide(totalSlides));
    };
  
    const handlePrev = () => {
      dispatch(prevSlide(totalSlides));
    };
  
    useEffect(() => {
      const swiper = document.querySelector('.events-slider .swiper').swiper;
      swiper.slideTo(currentSlide);
    }, [currentSlide]);

    return (
      <main>
        <div className="events-slider">
          <Swiper
            onSlideChange={handleSlideChange}
            initialSlide={currentSlide}
            pagination={{ clickable: true }}
            navigation
          >
            {[img_slider, img_slider2, img_slider3, img_slider4].map((img, index) => (
              <SwiperSlide key={index}>
                <div className="item">
                  <img src={img} alt={`event-${index}`} />
                  <div className={`content ${currentSlide === index ? 'runleft' : ''}`}>
                    <h1 className="title">aaaâ</h1>
                    <p className="description">aaaâ</p>
                    <button href="" className='btn btn-outline-dark'>Read More</button>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
          <div className="buttons">
            <button onClick={handlePrev} id="prev">{"<"}</button>
            <button onClick={handleNext} id="next">{">"}</button>
          </div>
          <ul className="dots">
            {[...Array(totalSlides)].map((_, index) => (
              <li
                key={index}
                className={index === currentSlide ? 'active' : ''}
                onClick={() => dispatch(setSlide(index))}
              ></li>
            ))}
          </ul>
        </div>
      </main>
    );
}
