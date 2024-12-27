"use client";

import { cn } from "@acme/ui";

import useStore from "~/store/useStore";

interface Props {
  stepNumber: number;
  smallTitle?: string;
  sectionTitle?: string;
}

export const Step = ({ stepNumber, smallTitle, sectionTitle }: Props) => {
  const step = useStore((state) => state.step);

  return (
    <section className="flex items-center gap-4 uppercase">
      <p
        className={cn(
          "flex h-[33px] w-[33px] items-center justify-center rounded-full border border-white text-sm font-bold text-white",
          {
            "border-primary bg-primary text-secondary": stepNumber === step,
          },
        )}
      >
        {stepNumber}
      </p>
      <div className="flex flex-col">
        <p className="text-xs text-white">{smallTitle}</p>
        <p className="text-sm font-bold text-white">{sectionTitle}</p>
      </div>
    </section>
  );
};
