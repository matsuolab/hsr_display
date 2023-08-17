"use client";

import { useState } from "react";
import ROSLIB from "roslib";
import styled from "styled-components";

import BatteryInfo from "./components/BatteryInfo";
import ImageView from "./components/ImageView";
import RosConnection from "./components/RosConnection";
import StringView from "./components/StringView";
import TimeIndicator from "./components/TimeIndicator";

export default function Home() {
  const [ros, setRos] = useState<ROSLIB.Ros>();

  return (
    <>
      <Header>
        <TimeIndicator />
        {ros && <BatteryInfo ros={ros} />}
        <RosConnection rosUrl="ws://localhost:9090" setRos={setRos} />
      </Header>
      <Main>
        {ros && (
          <>
            <StringView ros={ros} /> <ImageView ros={ros} />
          </>
        )}
      </Main>
    </>
  );
}

const Main = styled.main`
  width: 100%;
  flex-grow: 1;
  display: flex;
  width: 100%;
  height: 100%;
  justify-content: center;
  align-items: center;
  overflow-y: hidden;
`;

const Header = styled.div`
  display: flex;
  width: 100%;
  height: 44px;
  justify-content: space-between;
  align-items: center;
  padding: 10px 10px;
  box-sizing: border-box;
  > * {
    margin: 0 10px;
  }
`;
