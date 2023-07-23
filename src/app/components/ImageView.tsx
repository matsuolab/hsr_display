"use client";

import React, { useState, useEffect } from "react";
import ROSLIB from "roslib";
import styled from "styled-components";

type Props = {
  ros: ROSLIB.Ros;
};

const ImageView: React.FC<Props> = ({ ros }) => {
  const [imageData, setImageData] = useState<string>("");

  // subscribe to /ros_react/image and update imageData
  useEffect(() => {
    const imageListener = new ROSLIB.Topic({
      ros: ros,
      name: "/ros_react/image_compressed/compressed",
      messageType: "sensor_msgs/CompressedImage",
    });
    imageListener.subscribe((message) => {
      setImageData("data:image/jpeg;base64," + message.data);
    });
    return () => {
      imageListener.unsubscribe();
    };
  }, [ros]);

  return (
    <ImageContainer>
      <ImageText src={imageData}></ImageText>
    </ImageContainer>
  );
};

export default ImageView;

const ImageContainer = styled.div`
  width: 100%;
  height: 100%;
`;

const ImageText = styled.img`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;
