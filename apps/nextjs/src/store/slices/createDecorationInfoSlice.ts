import { StateCreator } from "zustand";

interface DecorationInfo {
  name: string;
  address: string;
}

interface DecorationInfoSlice {
  decorationInfo: DecorationInfo;
  setDecorationInfo: (data: DecorationInfo) => void;
}

const initialState: DecorationInfo = {
  name: "",
  address: "",
};

const createDecorationInfoSlice: StateCreator<DecorationInfoSlice> = (set) => ({
  decorationInfo: initialState,
  setDecorationInfo: (data) =>
    set((state) => ({
      decorationInfo: { ...state.decorationInfo, ...data },
    })),
});

export default createDecorationInfoSlice;
export type { DecorationInfo, DecorationInfoSlice };
