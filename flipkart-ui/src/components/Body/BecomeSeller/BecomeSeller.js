/*
 * Author: Ruchitesh Malukani
 * Modified By: Ruchitesh Malukani
 * Last Modified: Wednesday, 5th April 2023
 * -----
 * Copyright (c) 2023 Ruchitesh Malukani
 */
import React from "react";
import useGetData from "../../../hooks/useGetData";
import { urlService } from "../../../services/urls";

export default function BecomeSeller() {
  let banners = useGetData(urlService.getBanners());
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
