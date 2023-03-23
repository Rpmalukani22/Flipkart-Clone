import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import React, { Children, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { Autoplay } from "swiper";
import "swiper/css";
import { Swiper, SwiperSlide } from "swiper/react";
import styles from "./CarouselWrapper.module.css";

export default function CarouselWrapper(props) {
  const swiperRef = useRef();
  const [arrowVisiblitySettings, setArrowVisiblitySettings] = useState(
    props.arrowVisiblitySettings || {
      enabled: true,
      showLeft: false,
      showRight: true,
    }
  );
  const defaultSettings = {
    spaceBetween: 50,
    slidesPerView: 1,
    loop: true,
    autoplay: {
      delay: 3000,
      disableOnInteraction: false,
    },
    modules: [Autoplay],
  };
  let settings = props.carouselSettings
    ? { ...defaultSettings, ...props.carouselSettings }
    : defaultSettings;

  return (
    <div className={styles["carousel-wrapper"]}>
      <button
        id={styles["carousel-arrow-left"]}
        className={`${styles["carousel-arrow"]}`}
        style={
          arrowVisiblitySettings.enabled
            ? { display: arrowVisiblitySettings.showLeft ? "flex" : "none" }
            : { display: "flex" }
        }
        onClick={() => swiperRef.current?.slidePrev()}
      >
        <ChevronLeftIcon />
      </button>
      <Swiper
        {...settings}
        navigation
        onSwiper={(swiper) => {
          swiperRef.current = swiper;
        }}
        onSlideChange={(swiper) => {
          if (swiper.isEnd)
            setArrowVisiblitySettings((prev) => {
              return {
                enabled: prev.enabled,
                showLeft: true,
                showRight: false,
              };
            });
          else if (swiper.isBeginning)
            setArrowVisiblitySettings((prev) => {
              return {
                enabled: prev.enabled,
                showLeft: false,
                showRight: true,
              };
            });
          else
            setArrowVisiblitySettings((prev) => {
              return { enabled: prev.enabled, showLeft: true, showRight: true };
            });
        }}
      >
        {props.children &&
          Children.map(props.children, (child, index) => {
            return (
              <SwiperSlide key={child.props.id}>
                <Link {...child.props?.linkSettings} to={child.props.endpoint}>{child}</Link>
              </SwiperSlide>
            );
          })}
      </Swiper>
      <button
        id={styles["carousel-arrow-right"]}
        className={`${styles["carousel-arrow"]}`}
        style={
          arrowVisiblitySettings.enabled
            ? { display: arrowVisiblitySettings.showRight ? "flex" : "none" }
            : { display: "flex" }
        }
        onClick={() => {
          swiperRef.current?.slideNext();
        }}
      >
        <ChevronRightIcon />
      </button>
    </div>
  );
}
