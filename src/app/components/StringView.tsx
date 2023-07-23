"use client";

import React, { useState, useEffect, useRef } from "react";
import { useRecoilState } from "recoil";
import ROSLIB from "roslib";
import styled from "styled-components";

import { Mode, modeState } from "../utils";

type Props = {
  ros: ROSLIB.Ros;
};

const initialFontSize = 601;
const maxFontSize = 150;

const StringView: React.FC<Props> = ({ ros }) => {
  const [stringData, setStringData] = useState<string>("");
  const [fontSize, setFontSize] = useState<number>(initialFontSize);
  const [fontColor, setFontColor] = useState<"#f0f0f0" | "#282c34">("#f0f0f0");
  const [mode, setMode] = useRecoilState(modeState);

  const stringElm = useRef<HTMLDivElement>(null);

  // subscribe to /ros_react/string and update stringData
  useEffect(() => {
    const stringListener = new ROSLIB.Topic({
      ros: ros,
      name: "/ros_react/string",
      messageType: "std_msgs/String",
    });
    stringListener.subscribe((message) => {
      setMode("string");
      setStringData(message.data);
      setFontColor("#282c34");
      setFontSize(initialFontSize);
    });
    return () => {
      stringListener.unsubscribe();
    };
  }, [ros, setMode]);

  // reduce font size when it overflows vertically
  useEffect(() => {
    if (stringElm.current) {
      const stringElmHeight = stringElm.current.clientHeight;
      if (stringElmHeight > 900) {
        setFontSize(Math.min(fontSize * 0.9, maxFontSize));
      } else {
        setFontColor("#f0f0f0");
      }
    }
  }, [stringData, fontSize]);

  return (
    <StringContainer mode={mode}>
      <StringText ref={stringElm} fontSize={fontSize} color={fontColor}>
        {stringData}
      </StringText>
    </StringContainer>
  );
};

export default StringView;

const StringContainer = styled.div<{ mode: Mode }>`
  position: absolute;
  display: ${(props) => (props.mode === "string" ? "flex" : "none")};
  width: 100%;
  height: 1000px;
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
  white-space: pre-wrap;
  text-align: center;
`;
