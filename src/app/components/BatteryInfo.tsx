"use client";

import React, { useEffect, useState } from "react";
import ROSLIB from "roslib";
import styled from "styled-components";

type Props = {
  ros: ROSLIB.Ros;
};

const BatteryInfo: React.FC<Props> = ({ ros }) => {
  const [power, setPower] = useState<number>(0);
  useEffect(() => {
    const batteryListener = new ROSLIB.Topic({
      ros: ros,
      name: "/hsrb/battery_state",
      messageType: "tmc_msgs/BatteryState",
    });
    batteryListener.subscribe((message) => {
      //@ts-ignore
      setPower(parseFloat(message.power as string));
    });
    return () => {
      batteryListener.unsubscribe();
    };
  });
  return <BatteryInfoContainer power={power}>{power.toFixed(2)} %</BatteryInfoContainer>;
};

export default BatteryInfo;

const BatteryInfoContainer = styled.div<{ power: number }>`
  font-size: 30px;
  color: ${(props) => {
    if (props.power > 50) {
      return "lime";
    } else if (props.power > 20) {
      return "orange";
    } else {
      return "red";
    }
  }};
`;
