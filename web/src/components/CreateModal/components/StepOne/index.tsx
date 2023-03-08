import { Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { ImageSquare, WarningCircle } from "phosphor-react";

interface Props {
  open: boolean;
  setOpen: (open: boolean) => void;
  cancelButtonRef: any | null;
  handleDragOver: (e: any) => void;
  handleDrop: (e: any) => void;
  handleImageSelect: (e: any) => void;
  invalidFile: boolean;
}

export const StepOne: React.FC<Props> = ({
  open,
  setOpen,
  cancelButtonRef,
  handleDragOver,
  handleDrop,
  handleImageSelect,
  invalidFile,
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
              <Dialog.Panel
                className="relative h-[700px] w-1/3 transform overflow-hidden rounded-lg bg-white pb-4 text-left shadow-xl transition-all"
                onDragOver={handleDragOver}
                onDrop={handleDrop}
              >
                {invalidFile ? (
                  <div>
                    <div className="flex justify-center border-b py-2 text-lg font-bold">
                      File couldn't be uploaded
                    </div>
                    <div className="mt-48 flex flex-col items-center justify-center">
                      <WarningCircle size={120} color="#000" weight="thin" />
                      <p className="mt-1 mb-5 text-2xl font-light">
                        This file is not supported
                      </p>
                      <label className="cursor-pointer rounded-lg bg-ch-red px-4 py-2 font-semibold text-white hover:opacity-90">
                        <input
                          type="file"
                          onChange={handleImageSelect}
                          multiple
                          accept="image/*"
                        />
                        Select other files
                      </label>
                    </div>
                  </div>
                ) : (
                  <div>
                    <div className="flex justify-center border-b py-2 text-lg font-bold">
                      Create new decoration
                    </div>
                    <div className="mt-48 flex flex-col items-center justify-center">
                      <ImageSquare size={120} color="#000" weight="thin" />
                      <p className="mt-1 mb-5 text-2xl font-light">
                        Drag photos here
                      </p>
                      <label className="cursor-pointer rounded-lg bg-ch-red px-4 py-2 font-semibold text-white hover:opacity-90">
                        <input
                          type="file"
                          onChange={handleImageSelect}
                          multiple
                          accept="image/*"
                        />
                        Select from computer
                      </label>
                    </div>
                  </div>
                )}
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
};
