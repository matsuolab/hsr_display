import { RecoilRoot, atom, useRecoilState } from "recoil";

export type Mode = "string" | "image";

export const modeState = atom<Mode>({
  key: "mode",
  default: "string",
});
