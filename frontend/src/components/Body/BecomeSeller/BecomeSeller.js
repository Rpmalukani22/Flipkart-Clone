/*
 * Author: Ruchitesh Malukani
 * Modified By: Ruchitesh Malukani
 * Last Modified: Wednesday, 5th April 2023
 * -----
 * Copyright (c) 2023 Ruchitesh Malukani
 */
import React from "react";
import useGetData from "../../../hooks/useGetData";

export default function BecomeSeller() {
  let banners = useGetData("http://localhost:8080/site-content/banners");
  return (
    <div>
      {banners?.map((banner) => {
        return (
          <img
            key={banner.id}
            endpoint={banner.targetHref}
            src={banner.imgUrl}
          ></img>
        );
      })}

      {JSON.stringify(banners)}
    </div>
  );
}
