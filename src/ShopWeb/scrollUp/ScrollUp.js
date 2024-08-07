import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { hideScrollUp, setScrollUp } from '../redux/scrollUpSlice';
import { FaArrowUp } from 'react-icons/fa';
import './ScrollUp.css';

export default function ScrollUp() {
  const dispatch = useDispatch();
  const showButton = useSelector((state) => state.scrollUp.scrollUp);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleScroll = () => {
    if (window.scrollY > 300) {
      dispatch(setScrollUp());
    } else {
      dispatch(hideScrollUp());
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <button
      id="scrollTopButton"
      className="scroll-to-top"
      onClick={scrollToTop}
      style={{ display: showButton ? 'block' : 'none' }}
    >
      <FaArrowUp />
    </button>
  );
}
