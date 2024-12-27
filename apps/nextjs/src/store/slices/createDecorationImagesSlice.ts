import { StateCreator } from "zustand";

interface DecorationImage {
  id: string;
  url: string;
  index: number;
  base64Value: string;
}

interface DecorationImageSlice {
  decorationImages: DecorationImage[];
  setDecorationImages: (data: DecorationImage[]) => void;
}

const initialState: DecorationImage[] = [];

const createDecorationImagesSlice: StateCreator<DecorationImageSlice> = (
  set,
) => ({
  decorationImages: initialState,
  setDecorationImages: (data) =>
    set((state) => ({
      decorationImages: [...state.decorationImages, ...data],
    })),
});

export default createDecorationImagesSlice;
export type { DecorationImage, DecorationImageSlice };
