import { StateCreator } from "zustand";

interface SubmitDecorationSlice {
  isSubmitted: boolean;
  onSubmit: (isSubmitted: boolean) => void;
}

const createSubmitFormSlice: StateCreator<SubmitDecorationSlice> = (set) => ({
  isSubmitted: false,
  onSubmit: () =>
    set((state) => ({ ...state, isSubmitted: !state.isSubmitted })),
});

export default createSubmitFormSlice;
export type { SubmitDecorationSlice };
