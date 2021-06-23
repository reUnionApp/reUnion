import React from 'react';
import { Link } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Navigation, Pagination, A11y } from 'swiper';

import 'swiper/swiper.scss';
import 'swiper/components/navigation/navigation.scss';
import 'swiper/components/pagination/pagination.scss';
import '../styles/landingPage.css';

SwiperCore.use([Navigation, Pagination, A11y]);

const LandingPage = (props) => {
  return (
    <div id="LPMaster" className="flex column jContentC aItemsC">
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
            <img src="reUnion_Title.png" alt="reUnion title" id="LPTitle-Img" />
            <img src="reUnion_Logo.png" alt="reUnion logo" id="LPLogo-Img" />
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <p style={{ color: '#e40065' }} className="titleClass openSans ">
            Plan
          </p>
          <div className="image-container">
            <img id="LPPlanImg" src="plan.jpg" alt="plan art" />
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <p style={{ color: '#e40065' }} className="titleClass openSans ">
            Invite
          </p>
          <div className="image-container">
            <img id="LPInviteImg" src="invite.jpg" alt="invite art" />
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <p style={{ color: '#e40065' }} className="titleClass openSans ">
            re-Unite
          </p>
          <div className="image-container">
            <img id="LPReuniteImg" src="reunite.jpg" alt="reunite art" />
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
  );
};

export default LandingPage;
