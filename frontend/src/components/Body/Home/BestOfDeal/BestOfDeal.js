import { Box, Button } from "@mui/material";
import CarouselWrapper from "../CarouselWrapper/CarouselWrapper";
import styles from "./BestOfDeal.module.css";
import { DealCard } from "./DealCard/DealCard";

export default function BestOfDeal({ deal }) {
  return (
    <Box className={styles["container"]}>
      <Box
        style={{ backgroundImage: `url(${deal.leftBgImgUrl})` }}
        className={styles["heading-box"]}
      >
        <Box className={styles["heading-content"]}>
          <h1>{deal.title}</h1>
          <Button sx={{ borderRadius: 0 }} disableRipple variant="contained">
            VIEW ALL
          </Button>
        </Box>
      </Box>
      <Box className={styles["deals-container"]}>
        <CarouselWrapper
          carouselSettings={{
            spaceBetween: 1,
            slidesPerView: 5,
            loop: false,
            autoPlay: {},
            modules: []
          }}
          
        >
          {deal.categories.map((dealCategory, index) => {
            return (
              <DealCard
                key={dealCategory + index}
                dealCategory={dealCategory}
                linkSettings={{
                  style:{
                    textDecoration:'none',
                  },
                }}
              ></DealCard>
            );
          })}
        </CarouselWrapper>
      </Box>
    </Box>
  );
}
