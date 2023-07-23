"use client";

import { useState } from "react";
import styles from "./page.module.css";
import ROSLIB from "roslib";
import RosConnection from "./components/RosConnection";
import String from "./components/String";

export default function Home() {
  const [ros, setRos] = useState<ROSLIB.Ros>();
  return (
    <main className={styles.main}>
      <RosConnection rosUrl="ws://localhost:9090" setRos={setRos} />
      {ros && <String ros={ros} />}
    </main>
  );
}
