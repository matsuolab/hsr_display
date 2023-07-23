"use client";

import { useState } from "react";
import ROSLIB from "roslib";
import styled from "styled-components";

import ImageView from "./components/ImageView";
import RosConnection from "./components/RosConnection";
import StringView from "./components/StringView";
import TimeIndicator from "./components/TimeIndicator";

export default function Home() {
  const [ros, setRos] = useState<ROSLIB.Ros>();
  return (
    <Main>
      <TimeIndicator />
      <RosConnection rosUrl="ws://localhost:9090" setRos={setRos} />
      {ros && (
        <>
          <StringView ros={ros} />
          <ImageView ros={ros} />
        </>
      )}
    </Main>
  );
}

const Main = styled.main`
  width: 100vw;
  height: 100vh;
`;
