"use client";

import { useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, X } from "lucide-react";

import { Button } from "@acme/ui/button";

import { DecorationImage } from "~/store/slices/createDecorationImagesSlice";
import useStore from "~/store/useStore";
import { SectionHeader } from "./section-header";
import { StepSidebar } from "./step-sidebar";

export const ImageView = () => {
  const { decorationImages, setDecorationImages, increaseStep } = useStore(
    (state) => state,
  );

  const [currentImage, setCurrentImage] = useState<DecorationImage | undefined>(
    decorationImages[0],
  );

  return (
    <div className="absolute left-1/2 top-[103px] min-h-[376px] w-96 -translate-x-1/2 rounded-[15px] bg-secondary px-6 py-8 shadow-lg lg:static lg:left-0 lg:mx-auto lg:mt-[103px] lg:flex lg:min-h-[600px] lg:w-[940px] lg:-translate-x-0 lg:gap-10 lg:pt-10">
      <StepSidebar />
      <div className="flex h-full w-full flex-col">
        <SectionHeader
          title="View Images"
          description="Add, remove and reorder images"
        />
        <div className="relative mt-2">
          {decorationImages.length > 1 ? (
            <>
              <div
                role="button"
                className="animate-fade-in absolute left-5 top-[45%] cursor-pointer rounded-full bg-black p-1 opacity-80 transition-all duration-100 hover:opacity-60 sm:hidden"
              >
                <ChevronLeft className="h-6 w-6 text-white" />
              </div>
              <div className="animate-fade-in absolute right-5 top-[45%] cursor-pointer rounded-full bg-black p-1 opacity-80 transition-all duration-100 hover:opacity-60 sm:hidden">
                <ChevronRight className="h-6 w-6 text-white" />
              </div>
            </>
          ) : null}

          <div
            role="button"
            className="animate-fade-in absolute right-2 top-2 z-50 rounded-full bg-black px-2 py-2 opacity-80 hover:opacity-60 sm:hidden"
          >
            <X className="h-6 w-6 text-white" />
          </div>
          <Image
            src={currentImage?.url ?? ""}
            alt="Decoration image"
            className="h-[400px] w-[400px] rounded-lg object-cover"
          />
        </div>
        <div className="flex w-full items-center justify-between py-4">
          <Button>Previous</Button>
          <Button>Next</Button>
        </div>
      </div>
    </div>
  );
};
