import { Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";

interface Props {
  cancelModalOpen: boolean;
  setCancelModalOpen: (cancelModalOpen: boolean) => void;
  discardDecoration: () => void;
}

export const CancelModal: React.FC<Props> = ({
  cancelModalOpen,
  setCancelModalOpen,
  discardDecoration,
}) => {
  return (
    <Transition appear show={cancelModalOpen} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-10"
        onClose={() => setCancelModalOpen(false)}
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
          <div className="fixed inset-0 bg-black bg-opacity-25" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 px-20 text-left align-middle shadow-xl transition-all">
                <Dialog.Title
                  as="h3"
                  className="text-center text-xl font-bold leading-6 text-gray-900"
                >
                  Discard decoration?
                </Dialog.Title>
                <div className="mt-2">
                  <p className="text-center text-base font-medium text-gray-400">
                    If you leave, your edits won&apos;t be saved.
                  </p>
                </div>

                <div className="mt-4 flex justify-between">
                  <button
                    onClick={discardDecoration}
                    type="button"
                    className="mx-3 inline-flex w-1/2 justify-center rounded-md border border-transparent bg-ch-red px-4 py-2 text-sm font-medium text-white hover:opacity-90 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                  >
                    Discard
                  </button>
                  <button
                    onClick={() => setCancelModalOpen(false)}
                    type="button"
                    className="mx-3 inline-flex w-1/2 justify-center rounded-md border border-transparent bg-gray-800 px-4 py-2 text-sm font-medium text-white hover:opacity-90 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                  >
                    Cancel
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};
