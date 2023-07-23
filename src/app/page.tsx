"use client";

import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import ROSLIB from "roslib";
import styled from "styled-components";

import ImageView from "./components/ImageView";
import RosConnection from "./components/RosConnection";
import StringView from "./components/StringView";
import TimeIndicator from "./components/TimeIndicator";
import { modeState } from "./utils";

export default function Home() {
  const [ros, setRos] = useState<ROSLIB.Ros>();
  const [mode, setMode] = useRecoilState(modeState);

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
  width: 1920px;
  height: 1000px;
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
