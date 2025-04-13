import React, { useState, useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import styles from "./SimpleSlider.module.css";

import house1 from "../assets/house1.png";
import house2 from "../assets/house2.png";
import house3 from "../assets/house3.png";
import house4 from "../assets/house4.png";
import house5 from "../assets/house5.png";
import house6 from "../assets/house6.png";

async function getUserHouses() {
  // get request
  try {
    const response = await fetch("http://127.0.0.1:5000/get-houses/", {
      credentials: "include",
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Network response was not ok " + response.statusText);
    }

    const data = await response.json();

    return data;
  } catch (error) {
    throw new Error("Error fetching houses: " + error.message);
  }
}

const house_names = await getUserHouses().then((data) => {
  console.log(data);
  return data;
});

const images = [
  house_names.map((house) => {
    return {
      src: house.image,
      title: house.name,
    };
  }),
];

// const images = [
//   { src: house1, title: "Modern Villa" },
//   { src: house2, title: "Rustic Cottage" },
//   { src: house3, title: "Urban Loft" },
//   { src: house4, title: "Beach House" },
//   { src: house5, title: "Mountain Cabin" },
//   { src: house6, title: "Luxury Estate" },
// ];

const SimpleSlider = ({ onHouseClick }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const swiperRef = useRef(null);

  return (
    <div className={styles.sliderWrapper}>
      <div className={styles.houseName}>{images[activeIndex].title}</div>

      <Swiper
        slidesPerView={1.5}
        spaceBetween={20}
        centeredSlides={true}
        loop={true}
        onSwiper={(swiper) => (swiperRef.current = swiper)}
        onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
        className={styles.swiper}
      >
        {images.map((img, index) => (
          <SwiperSlide key={index} className={styles.slide}>
            <button
              onClick={() => {
                if (
                  swiperRef.current &&
                  swiperRef.current.realIndex !== index
                ) {
                  swiperRef.current.slideToLoop(index);
                } else {
                  // Call the onHouseClick passed down from GroupoptionPage
                  onHouseClick(index);
                }
              }}
              style={{
                all: "unset",
                width: "100%",
                height: "100%",
                cursor: "pointer",
              }}
            >
              <div
                className={`${styles.imageWrapper} ${
                  activeIndex === index ? styles.activeImage : ""
                }`}
              >
                <img src={img.src} alt={img.title} />
              </div>
            </button>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default SimpleSlider;
