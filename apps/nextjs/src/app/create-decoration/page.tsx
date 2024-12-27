"use client";

import useStore from "~/store/useStore";
import { ImageUpload } from "./image-upload";
import { ImageView } from "./image-view";
import { Step } from "./step";

const CreateDecorationPage = () => {
  const { step } = useStore((state) => state);

  return (
    <main>
      <section className="relative h-[172px] w-full bg-[url('/christmas.svg')] bg-cover lg:hidden">
        <div className="flex justify-center pb-[34px] pt-[37px]">
          <Step stepNumber={1} />
          <Step stepNumber={2} />
          <Step stepNumber={3} />
          <Step stepNumber={4} />
        </div>
      </section>
      {step === 1 && <ImageUpload />}
      {step === 2 && <ImageView />}
    </main>
  );
};

export default CreateDecorationPage;
