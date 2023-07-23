"use client";

import React, { useState, useEffect } from "react";
import ROSLIB from "roslib";
import styles from "./String.module.css";

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

  return <div className={styles.string}>{stringData}</div>;
};

export default String;
