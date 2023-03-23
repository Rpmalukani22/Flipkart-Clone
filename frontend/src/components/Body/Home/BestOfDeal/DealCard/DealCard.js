import { Box } from "@mui/material";
import styles from "./DealCard.module.css";

export function DealCard({ dealCategory }) {
  return (
    <Box className={styles["container"]}>
      <Box className={styles["content"]}>
      <div className={styles["img-content"]}>
      <img src={dealCategory.imgUrl}></img>
      </div>
      <div className={styles["text-content"]}>
      <p id={styles["title"]}>{dealCategory.title}</p>
      <p id={styles["sub-title-1"]}>{dealCategory.subTitle1}</p>
      <p id={styles["sub-title-2"]}>{dealCategory.subTitle2}</p>
      </div>
      </Box>
    </Box>
  );
}
