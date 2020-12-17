import React, { useState } from "react";

const Video = () => {

  const style = {
    left: "50%",
    top: "50%",
    width: "auto",
    height: "auto",
    position: "fixed",
    transform: "translate(-50%, -50%)",
    minWidth: "100%",
    minHeight: "100%",
    zIndex: -5,
  };

  const imageStyle = {
    position: "absolute",
    top: "0",
    // right: "-200px",
    height: "100%",
    width: "100%",
    zIndex: -5,
    objectFit: "cover",
  }

  // const getVideoSrc = width => {
  //   if (width >= 1080) return `${process.env.PUBLIC_URL}/assets/background_video_cropped_mirror.mp4`;
  //   if (width >= 720) return `${process.env.PUBLIC_URL}/assets/background_video_cropped_mirror.mp4`;
  //   return `${process.env.PUBLIC_URL}/assets/background_video_cropped_mirror_mobile.mp4`;
  // };

  // const src = getVideoSrc(window.innerWidth);

  const isMobile = (width) => {
    if (width >= 740) { return false }
    return true
  }

  return (
    <>
      {window.innerWidth <= 400 ?
        // <div style={{backgroundImage: `${process.env.PUBLIC_URL}/assets/video_screenshot.jpg`}}>
        //   </div>
        <img
          src={`${process.env.PUBLIC_URL}/assets/video_screenshot3.jpg`}
          alt="thumb"
          style={imageStyle}
        />
        :
        window.innerWidth <= 740 ?
          <img
            src={`${process.env.PUBLIC_URL}/assets/video_screenshot2.jpg`}
            alt="thumb"
            style={imageStyle}
          />
          :
          <video
            src={`${process.env.PUBLIC_URL}/assets/background_video_cropped_mirror.mp4`}
            type={"video/mp4"}
            autoPlay={true}
            loop={true}
            style={style}
            muted={true}
          >
          </video>
      }
    </>
  );
}

export default Video;