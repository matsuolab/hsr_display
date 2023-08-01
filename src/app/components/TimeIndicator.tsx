"use client";

import React, { useState } from "react";
import styled from "styled-components";

const TimeIndicator = () => {
  const [timeString, setTimeString] = useState("");

  setInterval(() => {
    const time = new Date();
    const localeString = time.toLocaleString("ja-JP", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false,
    });
    setTimeString(localeString);
  }, 10);

  return <TimeIndicatorContainer>{timeString}</TimeIndicatorContainer>;
};

export default TimeIndicator;

const TimeIndicatorContainer = styled.div`
  font-size: 30px;
  color: #b0b0b0;
  flex-grow: 1;
`;
