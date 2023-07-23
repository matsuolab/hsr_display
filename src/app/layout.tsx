"use client";

import styled from "styled-components";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <Body>{children}</Body>
    </html>
  );
}

const Body = styled.body`
  margin: 0;
  padding: 0;
  background-color: #282c34;
  color: #f0f0f0;
`;
