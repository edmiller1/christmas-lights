import { Heading } from "../_components/heading";
import { MaxWidthWrapper } from "../_components/max-width-wrapper";
import { ShinyButton } from "../_components/shiny-button";
import { Features } from "./features";
import { Footer } from "./footer";
import { Pricing } from "./pricing";

const LandingPage = () => {
  return (
    <>
      <section className="bg-brand-25 relative py-24 sm:py-32">
        <MaxWidthWrapper className="text-center">
          <div className="relative mx-auto flex flex-col items-center gap-10 text-center">
            <div>
              <Heading>
                <span>Create and discover amazing</span>
                <br />
                <span className="text-primary">Christmas Decorations</span>
              </Heading>
            </div>

            <div className="flex w-full max-w-96 items-center space-x-5">
              <ShinyButton
                href="/sign-up"
                className="relative z-10 h-14 w-full text-base shadow-lg transition-shadow duration-300 hover:shadow-xl"
              >
                Get the app
              </ShinyButton>
              <ShinyButton
                href="/sign-up"
                className="relative z-10 h-14 w-full text-base shadow-lg transition-shadow duration-300 hover:shadow-xl"
              >
                Get Started
              </ShinyButton>
            </div>
          </div>
        </MaxWidthWrapper>
      </section>

      <section className="relative bg-gray-50 pb-4">
        <Features />
      </section>

      <section className="relative bg-gray-50 pb-4">
        <Pricing />
      </section>

      <Footer />
    </>
  );
};

export default LandingPage;
