import React from 'react';
import { Link } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Navigation, Pagination, A11y } from 'swiper';

import 'swiper/swiper.scss';
import 'swiper/components/navigation/navigation.scss';
import 'swiper/components/pagination/pagination.scss';
// import '../styles/landingpagestyle.css';

import plan from '../styles/plan.jpg';
import invite from '../styles/invite.jpg';
import reunite from '../styles/reunite.jpg';
import logo from '../styles/reUnion_Logo.png';
import title from '../styles/reUnion_Title.png';

SwiperCore.use([Navigation, Pagination, A11y]);

const LandingPage = () => {
  return (
    <>
      <Swiper
        effect="fade"
        spaceBetween={0}
        slidesPerView={1}
        navigation
        pagination={{ clickable: true, dynamicBullets: true }}
      >
        <SwiperSlide>
          <div className="image-container">
            <img style={{ width: '50vw' }} src={title} alt="" id="title-img" />
            <img style={{ width: '50vw' }} src={logo} alt="" id="logo-img" />
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="image-container">
            <img style={{ width: '90vw' }} src={plan} alt="plan image" />
            <p className="landingDesc">Plan</p>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="image-container">
            <img style={{ width: '90vw' }} src={invite} alt="invite image" />
            <p className="landingDesc">Invite</p>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="image-container">
            <img style={{ width: '90vw' }} src={reunite} alt="reunite image" />
            <p className="landingDesc">Re-Unite</p>
          </div>
        </SwiperSlide>
      </Swiper>
      <div className="button-container">
        <button id="landing-page-btn">
          <Link to="/login" className="get-started">
            Get Started
          </Link>
        </button>
      </div>
    </>
  );
};

export default LandingPage;
