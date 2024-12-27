import { create } from "zustand";

import {
  createDecorationImagesSlice,
  createDecorationInfoSlice,
  createSubmitDecorationSlice,
} from "./slices";
import { DecorationImageSlice } from "./slices/createDecorationImagesSlice";
import { DecorationInfoSlice } from "./slices/createDecorationInfoSlice";
import createStepSlice, { StepSlice } from "./slices/createStepSlice";
import { SubmitDecorationSlice } from "./slices/createSubmitDecorationSlice";

const useStore = create<
  DecorationImageSlice & DecorationInfoSlice & SubmitDecorationSlice & StepSlice
>()((...set) => ({
  ...createDecorationImagesSlice(...set),
  ...createDecorationInfoSlice(...set),
  ...createSubmitDecorationSlice(...set),
  ...createStepSlice(...set),
}));

export default useStore;
