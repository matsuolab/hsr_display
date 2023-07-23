"use client";

import React, { useState, useEffect } from "react";
import ROSLIB from "roslib";
import styled from "styled-components";

type Props = {
  ros: ROSLIB.Ros;
};

const String: React.FC<Props> = ({ ros }) => {
  const [stringData, setStringData] = useState<string>("");

  useEffect(() => {
    const stringListener = new ROSLIB.Topic({
      ros: ros,
      name: "/ros_react/string",
      messageType: "std_msgs/String",
    });
    stringListener.subscribe((message) => {
      setStringData(message.data);
    });
    return () => {
      stringListener.unsubscribe();
    };
  }, [ros]);

  return <StringContainer>{stringData}</StringContainer>;
};

export default String;

const StringContainer = styled.div`
  font-size: 32px;
`;
