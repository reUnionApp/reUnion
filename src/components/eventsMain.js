import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Navigation, Pagination, A11y } from 'swiper';
import { getEvent, createEvent, updateEvent, removeEvent } from '../store'

import 'swiper/swiper.scss';
import 'swiper/components/navigation/navigation.scss';
import 'swiper/components/pagination/pagination.scss';

SwiperCore.use([Navigation, Pagination, A11y]);

const EventsMain = () => {
  return (
    <div>
      <h1>Plan Your First Event</h1>
      <form>
        <Swiper effect="fade" spaceBetween={0} slidesPerView={1} navigation>
          <SwiperSlide>
            <input
              type="email"
              name="email"
              placeholder="email"
              value="email"
            ></input>
          </SwiperSlide>
          <SwiperSlide>
            <input
              type="password"
              name="password"
              placeholder="password"
              value="password"
            ></input>
          </SwiperSlide>
        </Swiper>
      </form>
      <button>Get Started</button>
    </div>
  );
};

const mapState = (state) => ({
  event: state.eventReducer.event,
  user: state.authReducer.user
});

const mapDispatch = (dispatch) => ({
  getEvent: (id) => dispatch(getEvent(id)),
  createEvent: (event) => dispatch(createEvent(event)),
  updateEvent: (event) => dispatch(updateEvent(event)),
  removeEvent: (id) => dispatch(removeEvent(id)),
});

export default connect(mapState, mapDispatch)(EventsMain);
