"use client";

import React, { useEffect, useState } from "react";
import ROSLIB from "roslib";
import styled from "styled-components";

type StatusColor = "green" | "red" | "gray";

type Props = {
  rosUrl: string;
  setRos: React.Dispatch<React.SetStateAction<ROSLIB.Ros | undefined>>;
};

const RosConnection: React.FC<Props> = ({ rosUrl, setRos }) => {
  const [statusColor, setStatusColor] = useState<StatusColor>("gray");
  useEffect(() => {
    console.log("Connecting to websocket server.");
    const ros = new ROSLIB.Ros({
      url: rosUrl,
    });
    setRos(ros);
    ros.on("connection", () => {
      console.log("Connected to websocket server.");
      setStatusColor("green");
    });
    ros.on("error", (error) => {
      console.log("Error connecting to websocket server: ", error);
      setStatusColor("red");
      setTimeout(() => {
        ros.connect(rosUrl);
      }, 1000);
    });
    ros.on("close", () => {
      console.log("Connection to websocket server closed.");
      setStatusColor("gray");
      setTimeout(() => {
        ros.connect(rosUrl);
      }, 1000);
    });
    return () => {
      ros.close();
    };
  }, [rosUrl, setRos]);

  return <RosConnectionStatus color={statusColor}></RosConnectionStatus>;
};

export default RosConnection;

const RosConnectionStatus = styled.div<{ color: StatusColor }>`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: ${(props) => props.color};
`;
