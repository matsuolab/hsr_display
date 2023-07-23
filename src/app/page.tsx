"use client";

import { useState } from "react";
import ROSLIB from "roslib";
import styled from "styled-components";

import RosConnection from "./components/RosConnection";
import String from "./components/String";

export default function Home() {
  const [ros, setRos] = useState<ROSLIB.Ros>();
  return (
    <Main>
      <RosConnection rosUrl="ws://localhost:9090" setRos={setRos} />
      {ros && <String ros={ros} />}
    </Main>
  );
}

const Main = styled.main`
  width: 100vw;
  height: 100vh;
`;
