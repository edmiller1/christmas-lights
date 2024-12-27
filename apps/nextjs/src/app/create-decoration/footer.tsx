"use client";

import { cn } from "@acme/ui";
import { Button } from "@acme/ui/button";

import useStore from "~/store/useStore";

interface Props {
  className?: string;
  onHandleNextStep?: () => void;
  onHandlePreviousStep?: () => void;
}

export const Footer = ({
  className,
  onHandleNextStep,
  onHandlePreviousStep,
}: Props) => {
  const step = useStore((state) => state.step);

  return (
    <footer
      className={cn(
        "flex items-center justify-between bg-secondary p-4",
        className,
      )}
    >
      {step === 1 && <div className="w-full" />}

      {step > 1 && (
        <Button variant="ghost" onClick={onHandlePreviousStep}>
          Go Back
        </Button>
      )}
      <Button onClick={onHandleNextStep}>
        {step === 4 ? "Confirm" : "Next Step"}
      </Button>
    </footer>
  );
};
