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
    <>
      <Header>
        <TimeIndicator />
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
  height: 80px;
  justify-content: space-between;
  align-items: center;
  padding: 20px 20px;
  box-sizing: border-box;
`;
