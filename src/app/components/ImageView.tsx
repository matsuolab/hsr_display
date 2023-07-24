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
      name: "/ros_react/image/compressed",
      messageType: "sensor_msgs/CompressedImage",
    });
    imageListener.subscribe((message) => {
      setMode("image");
      //@ts-ignore
      setImageData("data:image/jpeg;base64," + message.data);
    });
    return () => {
      imageListener.unsubscribe();
    };
  }, [ros, setMode]);

  return <ImageText mode={mode} src={imageData}></ImageText>;
};

export default ImageView;

const ImageText = styled.img<{ mode: Mode }>`
  display: ${(props) => (props.mode === "image" ? "block" : "none")};
  width: 100%;
  height: 100%;
  padding: 20px;
  box-sizing: border-box;
  object-fit: contain;
`;
