import { Step } from "./step";

export const StepSidebar = () => {
  return (
    <aside className="hidden rounded-lg pt-10 lg:flex lg:h-[568px] lg:w-[274px] lg:flex-shrink-0 lg:flex-col lg:gap-8 lg:bg-[url('/bg-sidebar-desktop.svg')] lg:px-8">
      <Step
        stepNumber={1}
        smallTitle="Step 1"
        sectionTitle="Decoration images"
      />
      <Step stepNumber={2} smallTitle="Step 2" sectionTitle="View Images" />
    </aside>
  );
};
