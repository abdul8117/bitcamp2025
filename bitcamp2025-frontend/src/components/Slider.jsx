import React from 'react';
import {Swiper, SwiperSlide} from 'swiper/react';
import {Mousewheel, Pagination} from 'swiper';
// import {gsap} from 'gsap';
import styles from './Slider.module.css';
import "swiper/css";
import "swiper/css/pagination";
import house1 from "../assets/house1.png";
import house2 from "../assets/house2.png";
import house3 from "../assets/house3.png";
import house4 from "../assets/house4.png";
import house5 from "../assets/house5.png";
import house6 from "../assets/house6.png";



const images = [
  { src: house1, title: "House 1" },
  { src: house2, title: "House 2" },
  { src: house3, title: "House 3" },
  { src: house4, title: "House 4" },
  { src: house5, title: "House 5" },
  { src: house6, title: "House 6" }
];
const Slider = () => {
  const swiperWrapperRef = React.useRef(null);


function adjustMargin() {
  const screenWidth = window.innerWidth;

  if (swiperWrapperRef.current) {
    swiperWrapperRef.current.style.marginLeft = screenWidth <= 600 ? "-75px" : screenWidth <= 900 ? "-90px" : "150px";
  }
}

  return (
    <div className={styles.sliderContainer}>
      <Swiper
        modules={[Mousewheel, Pagination]}
        grabCursor={true}
        initialSlide={4}
        centeredSlides={true}
        slidesPerView={1}
        spaceBetween={10}
        speed={1000}
        slideToClickedSlide={true}
        pagination={{ clickable: true }}
        mousewheel={{ thresholdDelta: 30 }}
        onSwiper={(swiper) => {
          swiperWrapperRef.current = swiper.wrapperEl;
          swiper.on("resize", () => {
            adjustMargin();
          });
        }}
        className={styles.mySwiper}>

        {images.map((image, index) => (
          <SwiperSlide key={index} className={styles.slide}>
            <img src={image.src} alt={image.title} className={styles.image} />
            <p>{image.title}</p>
          </SwiperSlide>
        ))}
        
      </Swiper>
    </div>
  );
}
export default Slider;