import React from "react";
import { useState } from "react";

export default function CategoryImage({ src, width, size }) {
  const [loading, setLoading] = useState(true);
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: width ? width : "100%",
      }}
    >
      <img
        src={src}
        style={{
          display: loading ? "none" : "block",
          width: "100%",
          animation: "fadeIn 0.5s",
        }}
        onLoad={(e) => {
          setLoading(false);
        }}
      ></img>
      <div
        className="spinner"
        style={{
          display: loading ? "block" : "none",
          fontSize: size ? size : "24px",
        }}
      ></div>
    </div>
  );
}
