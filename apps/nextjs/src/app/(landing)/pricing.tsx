import { CheckIcon } from "lucide-react";

import { Button } from "@acme/ui/button";

import { Heading } from "../_components/heading";
import { MaxWidthWrapper } from "../_components/max-width-wrapper";

export const Pricing = () => {
  const INCLUDED_FEATURES = [
    "10.000 real-time events per month",
    "10 event categories",
    "Advanced analytics and insights",
    "Priority support",
  ];
  return (
    <div className="bg-background py-24 sm:py-32">
      <MaxWidthWrapper>
        <div className="mx-auto max-w-2xl sm:text-center">
          <Heading className="text-center">
            Upgrade to Christmas Lights App Pro
          </Heading>
          <p className="mt-6 max-w-prose text-pretty text-center text-base/7 text-gray-600">
            Create, save and see more amazing decorations with Christmas lights
            App Pro.
          </p>
        </div>

        <div className="mx-auto mt-16 max-w-2xl rounded-3xl bg-white ring-1 ring-gray-200 sm:mt-20 lg:mx-0 lg:flex lg:max-w-none">
          <div className="p-8 sm:p-10 lg:flex-auto">
            <h3 className="font-heading text-3xl font-semibold tracking-tight text-gray-900">
              Lifetime access
            </h3>

            <p className="mt-6 text-base/7 text-gray-600">
              Invest once in PingPanda and transform how you monitor your SaaS
              forever. Get instant alerts, track critical metrics and never miss
              a beat in your business growth.
            </p>
            <div className="mt-10 flex items-center gap-x-4">
              <h4 className="flex-none text-sm font-semibold leading-6 text-primary">
                What's included
              </h4>
              <div className="h-px flex-auto bg-gray-100" />
            </div>

            <ul className="mt-8 grid grid-cols-1 gap-4 text-sm/6 text-gray-600 sm:grid-cols-2 sm:gap-6">
              {INCLUDED_FEATURES.map((feature) => (
                <li key={feature} className="flex gap-3">
                  <CheckIcon className="h-6 w-5 flex-none text-primary" />
                  {feature}
                </li>
              ))}
            </ul>
          </div>

          <div className="-mt-2 p-2 lg:mt-0 lg:w-full lg:max-w-md lg:flex-shrink-0">
            <div className="rounded-2xl bg-gray-50 py-10 text-center ring-1 ring-inset ring-gray-900/5 lg:flex lg:flex-col lg:justify-center lg:py-16">
              <div className="mx-auto max-w-xs py-8">
                <p className="text-base font-semibold text-gray-600">
                  One small yearly fee
                </p>
                <p className="mt-6 flex items-baseline justify-center gap-x-2">
                  <span className="text-5xl font-bold tracking-tight text-gray-900">
                    $9
                  </span>
                  <span className="text-sm font-semibold leading-6 tracking-wide text-gray-600">
                    /yr
                  </span>
                </p>

                <Button className="mt-6 px-20">Get PingPanda</Button>
                <p className="mt-6 text-xs leading-5 text-gray-600">
                  Secure payment. Start creating in minutes.
                </p>
              </div>
            </div>
          </div>
        </div>
      </MaxWidthWrapper>
    </div>
  );
};
