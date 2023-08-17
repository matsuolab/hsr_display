"use client";

import React, { useState, useEffect, useRef } from "react";
import { useRecoilState } from "recoil";
import ROSLIB from "roslib";
import styled from "styled-components";

import { Mode, modeState } from "../utils";

type Props = {
  ros: ROSLIB.Ros;
};

const initialFontSize = 622;
const maxFontSize = 150;
const defaultFontColor = "#f0f0f0";

const StringView: React.FC<Props> = ({ ros }) => {
  const [stringData, setStringData] = useState<string>("");
  const [fontSize, setFontSize] = useState<number>(initialFontSize);
  const [visible, setVisible] = useState<boolean>(true);
  const [fontColor, setFontColor] = useState<string>(defaultFontColor);
  const [mode, setMode] = useRecoilState(modeState);

  const stringElm = useRef<HTMLDivElement>(null);

  // subscribe to /ros_react/string and update stringData
  useEffect(() => {
    const stringListener = new ROSLIB.Topic({
      ros: ros,
      name: "/hsr_monitor/string",
      messageType: "std_msgs/String",
    });
    const colorParam = new ROSLIB.Param({
      ros: ros,
      name: "/hsr_monitor/font_color",
    });
    stringListener.subscribe((message) => {
      setMode("string");
      //@ts-ignore
      setStringData(message.data);
      setVisible(false);
      colorParam.get((value) => {
        //@ts-ignore
        setFontColor(value);
      });
      colorParam.delete(() => {});
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
      if (stringElmHeight > 520) {
        setFontSize(Math.min(fontSize * 0.9, maxFontSize));
      } else {
        setVisible(true);
      }
    }
  }, [stringData, fontSize]);

  return (
    <StringText mode={mode} ref={stringElm} fontSize={fontSize} visible={visible} color={fontColor}>
      {stringData}
    </StringText>
  );
};

export default StringView;

const StringText = styled.div<{ mode: Mode; fontSize: number; visible: boolean; color: string }>`
  display: ${(props) => (props.mode === "string" ? "block" : "none")};
  font-size: ${(props) => props.fontSize}px;
  color: ${(props) => (props.visible ? props.color : "transparent")};
  width: 90%;
  height: fit-content;
  overflow-wrap: break-word;
  white-space: pre-wrap;
  text-align: center;
  transition: ${(props) => (props.visible ? "color 0.2s ease-in-out" : "")};
`;
