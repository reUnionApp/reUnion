import React from "react";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Navigation, Pagination, A11y } from "swiper";

import "swiper/swiper.scss";
import "swiper/components/navigation/navigation.scss";
import "swiper/components/pagination/pagination.scss";
import "../styles/landingPage.css";

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
            <img
              style={{ width: "50vw", maxWidth: "300px" }}
              src="reUnion_Title.png"
              alt="reUnion title"
              id="title-img"
            />
            <img
              style={{ width: "50vw", maxWidth: "300px" }}
              src="reUnion_Logo.png"
              alt="reUnion logo"
              id="logo-img"
            />
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="image-container">
            <p className="landingDesc">Plan</p>
            <img
              style={{ width: "90vw", maxWidth: "300px" }}
              src="plan.jpg"
              alt="plan image"
            />
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="image-container">
            <p className="landingDesc">Invite</p>
            <img
              style={{ width: "90vw", maxWidth: "300px" }}
              src="invite.jpg"
              alt="invite image"
            />
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="image-container">
            <p className="landingDesc">re-Unite</p>
            <img
              style={{ width: "90vw", maxWidth: "300px" }}
              src="reunite.jpg"
              alt="reunite image"
            />
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
