"use client";

import React, { useEffect, useState } from "react";
import ROSLIB from "roslib";
import styles from "./RosConnection.module.css";

type Props = {
  rosUrl: string;
  setRos: React.Dispatch<React.SetStateAction<ROSLIB.Ros | undefined>>;
};

const RosConnection: React.FC<Props> = ({ rosUrl, setRos }) => {
  const [statusColor, setStatusColor] = useState<"green" | "red" | "gray">("gray");
  useEffect(() => {
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
    });
    ros.on("close", () => {
      console.log("Connection to websocket server closed.");
      setStatusColor("gray");
    });
  }, [rosUrl, setRos]);

  return <div className={`${styles.status} ${styles[statusColor]}`}></div>;
};

export default RosConnection;
