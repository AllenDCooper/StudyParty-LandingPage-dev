import React, { useState } from "react";

const BannerImg = () => {

  const style = {
    left: "50%",
    top: "0",
    width: "100%",
    height: "auto",
    position: "fixed",
    transform: "translate(-50%, -50%)",
    minWidth: "100%",
    minHeight: "0",
    zIndex: -5,
    marginTop: '210px',
    backgroundImage: `${process.env.PUBLIC_URL}/assets/video_screenshot3.jpg`
  };

  const imageStyle = {
    // position: "absolute",
    // top: "0",
    // right: "-200px",
    height: "100%",
    width: "100%",
    // zIndex: -5,
    // objectFit: "cover",
  }


  return (
    <div style={style}>
      <img style={imageStyle} src={`${process.env.PUBLIC_URL}/assets/video_screenshot.jpg`} />
    </div>
  );
}

export default BannerImg;