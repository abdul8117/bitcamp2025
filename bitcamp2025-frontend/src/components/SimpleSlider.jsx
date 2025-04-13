import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import styles from "./SimpleSlider.module.css";

import house1 from "../assets/house1.png";
import house2 from "../assets/house2.png";
import house3 from "../assets/house3.png";
import house4 from "../assets/house4.png";
import house5 from "../assets/house5.png";
import house6 from "../assets/house6.png";

const images = [house1, house2, house3, house4, house5, house6];

const SimpleSlider = () => {
  return (
    <div className={styles.sliderWrapper}>
      <Swiper
        slidesPerView={1}
        spaceBetween={20}
        loop={true}
        className={styles.swiper}
      >
        {images.map((src, index) => (
          <SwiperSlide key={index} className={styles.slide}>
            <img src={src} alt={`House ${index + 1}`} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default SimpleSlider;
