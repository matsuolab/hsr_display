"use client";

import React, { useEffect, useState } from "react";
import ROSLIB from "roslib";
import styled from "styled-components";

type Props = {
  ros: ROSLIB.Ros;
};

const BatteryInfo: React.FC<Props> = ({ ros }) => {
  const [batteryData, setBatteryData] = useState<string>("");
  useEffect(() => {
    const batteryListener = new ROSLIB.Topic({
      ros: ros,
      name: "/hsrb/battery_state",
      messageType: "tmc_msgs/BatteryState",
    });
    batteryListener.subscribe((message) => {
      //@ts-ignore
      console.log(message.power);
      setBatteryData(message.power);
    });
    return () => {
      batteryListener.unsubscribe();
    };
  });
  return <>{batteryData}</>;
};

export default BatteryInfo;
