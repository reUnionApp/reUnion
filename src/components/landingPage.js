import React from 'react';
import { Link } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Navigation, Pagination, A11y } from 'swiper';

import 'swiper/swiper.scss';
import 'swiper/components/navigation/navigation.scss';
import 'swiper/components/pagination/pagination.scss';
import '../styles/landingPage.css';

SwiperCore.use([Navigation, Pagination, A11y]);

const LandingPage = () => {
  return (
    <div
      className="flex column jContentC aItemsC"
      style={{
        height: '100vh',
      }}
    >
      <div>
        <Swiper
          className="landing-wrapper"
          effect="fade"
          spaceBetween={0}
          slidesPerView={1}
          navigation
          pagination={{ clickable: true, dynamicBullets: true }}
        >
          <SwiperSlide>
            <div className="image-container">
              <img
                style={{ maxWidth: '350px' }}
                src="reUnion_Title.png"
                alt="reUnion title"
                id="title-img"
              />
              <img
                style={{ maxWidth: '200px', margin: '100px 0px 0px 0px' }}
                src="reUnion_Logo.png"
                alt="reUnion logo"
                id="logo-img"
              />
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <p style={{ color: '#e40065' }} className="titleClass openSans ">
              Plan
            </p>
            <div className="image-container">
              <img
                style={{ maxWidth: '250px' }}
                src="plan.jpg"
                alt="plan image"
              />
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <p style={{ color: '#e40065' }} className="titleClass openSans ">
              Invite
            </p>
            <div className="image-container">
              <img
                style={{ maxWidth: '250px' }}
                src="invite.jpg"
                alt="invite image"
              />
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <p style={{ color: '#e40065' }} className="titleClass openSans ">
              re-Unite
            </p>
            <div className="image-container">
              <img
                style={{ maxWidth: '350px' }}
                src="reunite.jpg"
                alt="reunite image"
              />
            </div>
          </SwiperSlide>
        </Swiper>
        <div className="button-container flex jContentC ">
          <button className="button pink-black" id="landing-page-btn">
            <Link
              style={{
                textDecoration: 'none',
                color: 'white',
                fontSize: '18px',
              }}
              to="/login"
              className="get-started"
            >
              Get Started
            </Link>
          </button>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
