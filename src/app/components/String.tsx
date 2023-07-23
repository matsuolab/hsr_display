"use client";

import React, { useState, useEffect, useRef } from "react";
import ROSLIB from "roslib";
import styled from "styled-components";

type Props = {
  ros: ROSLIB.Ros;
};

const initialFontSize = 600;
const maxFontSize = 150;

const String: React.FC<Props> = ({ ros }) => {
  const [stringData, setStringData] = useState<string>("");
  const [fontSize, setFontSize] = useState<number>(initialFontSize);
  const [fontColor, setFontColor] = useState<"#f0f0f0" | "#282c34">("#f0f0f0");

  const stringElm = useRef<HTMLDivElement>(null);

  // subscribe to /ros_react/string and update stringData
  useEffect(() => {
    const stringListener = new ROSLIB.Topic({
      ros: ros,
      name: "/ros_react/string",
      messageType: "std_msgs/String",
    });
    stringListener.subscribe((message) => {
      setStringData(message.data);
      setFontColor("#282c34");
      setFontSize(initialFontSize);
    });
    return () => {
      stringListener.unsubscribe();
    };
  }, [ros]);

  // reduce font size when it overflows vertically
  useEffect(() => {
    if (stringElm.current) {
      const stringElmHeight = stringElm.current.clientHeight;
      if (stringElmHeight > window.innerHeight * 0.9) {
        setFontSize(Math.min(fontSize * 0.9, maxFontSize));
      } else {
        setFontColor("#f0f0f0");
      }
    }
  }, [stringData, fontSize]);

  return (
    <StringContainer>
      <StringText ref={stringElm} fontSize={fontSize} color={fontColor}>
        {stringData}
      </StringText>
    </StringContainer>
  );
};

export default String;

const StringContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  box-sizing: border-box;
  overflow-y: hidden;
`;

const StringText = styled.div<{ fontSize: number; color: string }>`
  font-size: ${(props) => props.fontSize}px;
  color: ${(props) => props.color};
  width: 90%;
  height: fit-content;
  overflow-wrap: break-word;
  text-align: center;
`;
