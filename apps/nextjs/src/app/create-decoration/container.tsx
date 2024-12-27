import { cn } from "@acme/ui";

import useStore from "~/store/useStore";
import { Footer } from "./footer";
import { StepSidebar } from "./step-sidebar";

interface Props {
  children: React.ReactNode;
  className?: string;
  onNextStep: () => void;
  onPreviousStep?: () => void;
}

export const Container = ({
  children,
  className,
  onNextStep,
  onPreviousStep,
}: Props) => {
  const { step, isSubmitted } = useStore((state) => state);

  return (
    <>
      <section
        className={cn(
          "absolute left-1/2 top-[103px] min-h-[376px] w-80 -translate-x-1/2 rounded-[15px] bg-secondary px-6 py-8 shadow-lg lg:static lg:left-0 lg:mx-auto lg:mt-[103px] lg:flex lg:min-h-[600px] lg:w-[940px] lg:-translate-x-0 lg:gap-[100px] lg:p-4 lg:pt-10",
          className,
        )}
      >
        <StepSidebar />
        <div className="relative mr-[80px] w-full">
          {children}
          {!isSubmitted && (
            <Footer
              className="hidden lg:absolute lg:bottom-0 lg:left-0 lg:right-0 lg:inline-flex"
              onHandleNextStep={onNextStep}
              onHandlePreviousStep={onPreviousStep}
            />
          )}
        </div>
      </section>
      {!isSubmitted && (
        <Footer
          className={cn(
            "absolute bottom-0 left-0 right-0 inline-flex lg:hidden",
            { "-bottom-32": step === 2 },
          )}
          onHandleNextStep={onNextStep}
          onHandlePreviousStep={onPreviousStep}
        />
      )}
    </>
  );
};
