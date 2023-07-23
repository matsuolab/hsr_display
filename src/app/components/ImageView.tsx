"use client";

import React, { useState, useEffect } from "react";
import { useRecoilState } from "recoil";
import ROSLIB from "roslib";
import styled from "styled-components";

import { Mode, modeState } from "../utils";

type Props = {
  ros: ROSLIB.Ros;
};

const ImageView: React.FC<Props> = ({ ros }) => {
  const [imageData, setImageData] = useState<string>("");
  const [mode, setMode] = useRecoilState(modeState);

  // subscribe to /ros_react/image and update imageData
  useEffect(() => {
    const imageListener = new ROSLIB.Topic({
      ros: ros,
      name: "/ros_react/image_compressed/compressed",
      messageType: "sensor_msgs/CompressedImage",
    });
    imageListener.subscribe((message) => {
      setMode("image");
      setImageData("data:image/jpeg;base64," + message.data);
    });
    return () => {
      imageListener.unsubscribe();
    };
  }, [ros, setMode]);

  return (
    <ImageContainer mode={mode}>
      <ImageText src={imageData}></ImageText>
    </ImageContainer>
  );
};

export default ImageView;

const ImageContainer = styled.div<{ mode: Mode }>`
  width: 100%;
  height: 100%;
  display: ${(props) => (props.mode === "image" ? "flex" : "none")};
  align-items: center;
  justify-content: center;
`;

const ImageText = styled.img`
  width: 100%;
`;
