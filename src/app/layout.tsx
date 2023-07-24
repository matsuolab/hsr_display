"use client";

import { RecoilRoot } from "recoil";
import styled from "styled-components";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <RecoilRoot>
        <Body>{children}</Body>
      </RecoilRoot>
    </html>
  );
}

const Body = styled.body`
  @font-face {
    font-family: "Noto Sans JP";
    src: url("NotoSansJP-Regular.ttf");
  }
  font-family: "Noto Sans JP", sans-serif;
  width: 1920px;
  height: 1080px;
  margin: 0;
  padding: 0;
  background-color: #282c34;
  color: #f0f0f0;
  display: flex;
  flex-direction: column;
`;
