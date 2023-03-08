import { Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { CircleNotch, ImageSquare, WarningCircle } from "phosphor-react";

interface Props {
  open: boolean;
  setOpen: (open: boolean) => void;
  cancelButtonRef: any | null;
}

export const LoadingModal: React.FC<Props> = ({
  open,
  setOpen,
  cancelButtonRef,
}) => {
  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-10"
        initialFocus={cancelButtonRef}
        onClose={setOpen}
      >
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-700 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex min-h-full items-end justify-center text-center sm:items-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative h-[700px] w-1/3 transform overflow-hidden rounded-lg bg-white pb-4 text-left shadow-xl transition-all">
                <div>
                  <div className="flex justify-center border-b py-2 text-lg font-bold">
                    Creating Decoration
                  </div>
                  <div className="mt-48 flex flex-col items-center justify-center">
                    <CircleNotch
                      size={120}
                      color="#000"
                      weight="thin"
                      className="animate-spin"
                    />
                  </div>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
};
