"use client";

import React from "react";
import { CircleCheck, Images } from "lucide-react";

import { Button } from "@acme/ui/button";
import { Input } from "@acme/ui/input";
import { Label } from "@acme/ui/label";

import { generateUID, getFileBase64 } from "~/lib/helpers";
import useStore from "~/store/useStore";
import { SectionHeader } from "./section-header";
import { StepSidebar } from "./step-sidebar";

export const ImageUpload = () => {
  const { decorationImages, setDecorationImages, increaseStep } = useStore(
    (state) => state,
  );

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const handleDrop = async (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();

    const files = Array.from(e.dataTransfer.files);
    const newImages = await Promise.all(
      files.map(async (file, index) => {
        const base64String = await getFileBase64(file);
        return {
          id: generateUID(),
          url: URL.createObjectURL(file),
          index,
          base64Value: base64String,
        };
      }),
    );

    setDecorationImages([...decorationImages, ...newImages]);
  };

  const handleSelectImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    e.stopPropagation();

    if (!e.target.files) return;

    const files = Array.from(e.target.files);
    const newImages = await Promise.all(
      files.map(async (file, index) => {
        const base64String = await getFileBase64(file);
        return {
          id: generateUID(),
          url: URL.createObjectURL(file),
          index,
          base64Value: base64String,
        };
      }),
    );

    setDecorationImages([...decorationImages, ...newImages]);
  };

  const handleSubmit = () => {
    increaseStep(1);
  };

  return (
    <div className="absolute left-1/2 top-[103px] min-h-[376px] w-96 -translate-x-1/2 rounded-[15px] bg-secondary px-6 py-8 shadow-lg lg:static lg:left-0 lg:mx-auto lg:mt-[103px] lg:flex lg:min-h-[600px] lg:w-[940px] lg:-translate-x-0 lg:gap-10 lg:pt-10">
      <StepSidebar />
      <div className="flex h-full w-full flex-col">
        <SectionHeader
          title="Upload Images"
          description="Add images to your decoration"
        />
        <div className="flex flex-col gap-6">
          {decorationImages.length === 0 ? (
            <div
              className="mt-3 flex h-80 flex-col items-center justify-center rounded-xl border border-dashed border-gray-500"
              onDragOver={handleDragOver}
              onDrop={handleDrop}
            >
              <Images className="h-12 w-12" />
              <p className="hidden sm:mb-5 sm:mt-1 sm:block sm:font-normal">
                Drag photos here
              </p>
              <Button className="mb-2">
                <Label className="cursor-pointer">
                  <Input
                    type="file"
                    multiple
                    accept="image/*"
                    onChange={handleSelectImage}
                  />
                  Select from computer
                </Label>
              </Button>
              <span className="mb-3 text-sm text-gray-500">
                Images up to 6MB, Max 8
              </span>
            </div>
          ) : (
            <div
              className="mt-3 flex h-80 flex-col items-center justify-center rounded-xl border border-dashed border-gray-500 py-8"
              onDragOver={handleDragOver}
              onDrop={handleDrop}
            >
              <CircleCheck className="h-12 w-12" />
              {decorationImages.length === 1 ? (
                <p className="text-base dark:text-gray-100">
                  {decorationImages.length} image selected 🎉
                </p>
              ) : (
                <p className="text-base dark:text-gray-100">
                  {decorationImages.length} images selected 🎉
                </p>
              )}
              <Button className="mt-2">
                <Label className="cursor-pointer">
                  <Input
                    type="file"
                    multiple
                    accept="image/*"
                    onChange={handleSelectImage}
                  />
                  Select more images
                </Label>
              </Button>
            </div>
          )}
          <div className="flex w-full items-center justify-end py-4">
            <Button
              disabled={decorationImages.length === 0}
              onClick={handleSubmit}
            >
              Next
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
