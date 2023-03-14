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
