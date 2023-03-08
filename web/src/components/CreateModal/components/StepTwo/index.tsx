import { Fragment, useRef } from "react";
import { DecorationImage } from "../../../../lib/types";
import { Dialog, Transition } from "@headlessui/react";
import {
  ArrowLeft,
  Cards,
  X,
  PlusCircle,
  CaretRight,
  CaretLeft,
  Circle,
  Info,
} from "phosphor-react";
import { motion } from "framer-motion";
import { CancelModal, RemoveImageModal } from "../../components";

interface Props {
  open: boolean;
  cancelButtonRef: any | null;
  previewImages: DecorationImage[];
  setPreviewImages: (previewImages: DecorationImage[]) => void;
  setCurrentStep: (currentStep: number) => void;
  cancelModalOpen: boolean;
  setCancelModalOpen: (cancelModalOpen: boolean) => void;
  discardDecoration: () => void;
  imageListOpen: boolean;
  setImageListOpen: (imageListOpen: boolean) => void;
  handleImageSelect: (e: any) => void;
  removeSingleImage: (id: string | undefined) => void;
  removeImageModalOpen: boolean;
  setRemoveImageModalOpen: (removeImageModalOpen: boolean) => void;
  currentImage: DecorationImage | undefined;
  setCurrentImage: (currentImage: DecorationImage | undefined) => void;
  changeCurrentImage: (id: string | undefined) => void;
  nextSlide: () => void;
  prevSlide: () => void;
}

export const StepTwo: React.FC<Props> = ({
  open,
  cancelButtonRef,
  previewImages,
  setPreviewImages,
  setCurrentStep,
  cancelModalOpen,
  setCancelModalOpen,
  discardDecoration,
  imageListOpen,
  setImageListOpen,
  handleImageSelect,
  removeSingleImage,
  removeImageModalOpen,
  setRemoveImageModalOpen,
  currentImage,
  changeCurrentImage,
  nextSlide,
  prevSlide,
}) => {
  const dragItem = useRef<any>(null);
  const dragOverItem = useRef<any>(null);

  const handleSort = () => {
    const previewImagesCopy = [...previewImages];
    const draggedItemContent = previewImagesCopy.splice(dragItem.current, 1)[0];
    previewImagesCopy.splice(dragOverItem.current, 0, draggedItemContent);

    dragItem.current = null;
    dragOverItem.current = null;

    setPreviewImages(previewImagesCopy);
  };

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-10"
        initialFocus={cancelButtonRef}
        onClose={setCancelModalOpen}
        onClick={() => setCancelModalOpen(true)}
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
              <Dialog.Panel className="relative h-full w-1/3 overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all">
                <div>
                  <div className="flex justify-between border-b py-2 px-3 text-lg font-bold">
                    <button onClick={() => setCancelModalOpen(true)}>
                      <ArrowLeft size={32} color="#000" />
                    </button>
                    <span>Images</span>
                    <button
                      className="text-base text-ch-red"
                      onClick={() => setCurrentStep(3)}
                    >
                      Next
                    </button>
                  </div>
                  <div className="width-[700px] flex h-[660px] flex-col items-center justify-center overflow-hidden">
                    {previewImages.length > 1 && (
                      <>
                        <div
                          role="button"
                          aria-pressed="false"
                          tabIndex={0}
                          className="absolute right-5 rounded-full bg-black py-1 px-1 opacity-80 transition-all hover:opacity-60"
                          onClick={nextSlide}
                        >
                          <CaretRight size={24} color="#FFFFFF" />
                        </div>
                        <div
                          role="button"
                          aria-pressed="false"
                          tabIndex={0}
                          className="absolute left-5 rounded-full bg-black py-1 px-1 opacity-80 transition-all hover:opacity-60"
                          onClick={prevSlide}
                        >
                          <CaretLeft size={24} color="#FFFFFF" />
                        </div>
                      </>
                    )}

                    <img
                      src={currentImage?.preview}
                      alt="..."
                      className="h-[880px] w-[660px] duration-500"
                      onClick={() => setImageListOpen(false)}
                    />
                  </div>
                  {imageListOpen ? (
                    <>
                      <motion.div
                        className="absolute bottom-16 left-5 flex items-center overflow-x-auto w-[625px]"
                        initial={{ opacity: 0, scale: 0.5 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{
                          duration: 0.3,
                          delay: 0.1,
                          ease: [0, 0.71, 0.2, 1.01],
                        }}
                      >
                        <div className="imageBox flex rounded-xl px-1 pt-3 pb-1 mr-5">
                          {previewImages.map((image, index: number) => (
                            <div
                              key={image.id}
                              draggable
                              onDragStart={(e) => (dragItem.current = index)}
                              onDragEnter={(e) =>
                                (dragOverItem.current = index)
                              }
                              onDragEnd={handleSort}
                              onDragOver={(e) => e.preventDefault()}
                            >
                              <div
                                className="relative ml-2 mr-1 mb-2 cursor-pointer"
                                onClick={() => changeCurrentImage(image.id)}
                              >
                                <img
                                  src={image.preview}
                                  alt="pic"
                                  className={`${
                                    image.id === currentImage?.id
                                      ? "inline-block object-cover object-center h-24 w-24"
                                      : "inline-block object-cover object-center h-24 w-24 brightness-50"
                                  }`}
                                />
                                {image.id === currentImage?.id && (
                                  <div
                                    role="button"
                                    aria-pressed="false"
                                    tabIndex={0}
                                    className="imageBox absolute top-1 right-2 z-50 flex h-6 w-6 cursor-pointer items-center justify-center rounded-full transition-all hover:opacity-75"
                                  >
                                    <X
                                      size={20}
                                      color="#ffffff"
                                      onClick={() =>
                                        setRemoveImageModalOpen(true)
                                      }
                                    />
                                  </div>
                                )}
                              </div>
                            </div>
                          ))}
                          <div
                            role="button"
                            aria-pressed="false"
                            tabIndex={0}
                            className="flex h-1/3 items-center justify-center"
                          >
                            <label htmlFor="additional-image">
                              <PlusCircle
                                size={52}
                                color="#c6c6c6"
                                weight="thin"
                                className="cursor-pointer"
                              />
                            </label>
                            <input
                              id="additional-image"
                              type="file"
                              multiple
                              onChange={handleImageSelect}
                            />
                          </div>
                        </div>
                      </motion.div>

                      <div className="absolute bottom-5 right-5">
                        <div
                          role="button"
                          aria-pressed="false"
                          tabIndex={0}
                          className="rounded-full bg-white px-2 py-2 text-white hover:opacity-70"
                          onClick={() => setImageListOpen(false)}
                        >
                          <Cards size={20} color="#000000" />
                        </div>
                      </div>
                    </>
                  ) : (
                    <div
                      role="button"
                      aria-pressed="false"
                      tabIndex={0}
                      className="absolute bottom-5 right-5 rounded-full bg-gray-800 px-2 py-2 hover:opacity-70"
                      onClick={() => setImageListOpen(true)}
                    >
                      <Cards size={20} color="#FFFFFF" />
                    </div>
                  )}
                  <div className="absolute bottom-5 left-1/2 flex">
                    {previewImages.map(
                      (image: DecorationImage, index: number) => (
                        <Circle
                          key={image.id}
                          size={8}
                          color={
                            image.id === currentImage?.id
                              ? "#E23737"
                              : "#9ca3af"
                          }
                          weight="fill"
                          className="mx-1"
                        />
                      )
                    )}
                  </div>
                  <CancelModal
                    cancelModalOpen={cancelModalOpen}
                    setCancelModalOpen={setCancelModalOpen}
                    discardDecoration={discardDecoration}
                  />
                  <RemoveImageModal
                    removeImageModalOpen={removeImageModalOpen}
                    setRemoveImageModalOpen={setRemoveImageModalOpen}
                    removeSingleImage={removeSingleImage}
                    currentImage={currentImage}
                  />
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
};
