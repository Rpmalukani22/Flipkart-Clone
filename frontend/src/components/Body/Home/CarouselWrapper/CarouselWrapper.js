import React, { useCallback } from "react";
import styles from "./CarouselWrapper.module.css";
import { useNavigate } from "react-router-dom";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { Carousel } from "react-responsive-carousel";

export default function CarouselWrapper({ children }) {
  const navigate = useNavigate();
  const handleCarouselImgClick = useCallback(
    (endPoint) => navigate(`${endPoint}`, { replace: false }),
    [navigate]
  );
  return (
    <Carousel
      infiniteLoop={true}
      autoPlay={true}
      showIndicators={false}
      showThumbs={false}
      showStatus={false}
      showArrows={false}
      stopOnHover={false}
      renderArrowPrev={(clickHandler, hasPrev) => {
        return (
          <div
            id={styles["carousel-arrow-left"]}
            className={styles["carousel-arrow"]}
            onClick={clickHandler}
          >
            <ChevronLeftIcon />
          </div>
        );
      }}
      renderArrowNext={(clickHandler, hasNext) => {
        return (
          <div
            id={styles["carousel-arrow-right"]}
            className={styles["carousel-arrow"]}
            onClick={clickHandler}
          >
            <ChevronRightIcon />
          </div>
        );
      }}
      onClickItem={(idx, item) => {
        handleCarouselImgClick(item.props.endpoint);
      }}
    >
      {children}
    </Carousel>
  );
}
