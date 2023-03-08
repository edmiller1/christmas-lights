import { Fragment, useState, useEffect, ChangeEvent } from "react";
import {
  createDecorationInput,
  Decoration,
  DecorationImage,
  GeocoderAddressComponent,
} from "../../../../lib/types";
import { Dialog, Transition } from "@headlessui/react";
import {
  ArrowLeft,
  CaretRight,
  CaretLeft,
  Circle,
  MapPin,
  House,
  CaretUp,
  CaretDown,
  X,
} from "phosphor-react";
import { CancelModal } from "../CancelModal";
import usePlacesAutocomplete, {
  getGeocode,
  getLatLng,
} from "use-places-autocomplete";

interface Props {
  open: boolean;
  cancelButtonRef: any | null;
  previewImages: DecorationImage[];
  setPreviewImages: (previewImages: DecorationImage[]) => void;
  setCurrentStep: (currentStep: number) => void;
  cancelModalOpen: boolean;
  setCancelModalOpen: (cancelModalOpen: boolean) => void;
  currentImage: DecorationImage | undefined;
  discardDecoration: () => void;
  nextSlide: () => void;
  prevSlide: () => void;
  country: GeocoderAddressComponent | undefined;
  decoration: createDecorationInput;
  setDecoration: (Decoration: createDecorationInput) => void;
  createNewDecoration: () => void;
  userId: string | undefined;
}

export const StepThree: React.FC<Props> = ({
  cancelButtonRef,
  cancelModalOpen,
  currentImage,
  discardDecoration,
  open,
  previewImages,
  setPreviewImages,
  setCancelModalOpen,
  setCurrentStep,
  nextSlide,
  prevSlide,
  country,
  decoration,
  setDecoration,
  createNewDecoration,
  userId,
}) => {
  const {
    ready,
    value,
    suggestions: { status, data },
    setValue,
    clearSuggestions,
  } = usePlacesAutocomplete({
    callbackName: "YOUR_CALLBACK_NAME",
    requestOptions: {
      /* Define search scope here */
      region: country?.short_name ? country?.short_name : "",
    },
    debounce: 300,
  });

  const [accessibilityOpen, setAccessibilityOpen] = useState<boolean>(false);
  const [advancedSettingsOpen, setAdvancedSettingsOpen] =
    useState<boolean>(false);

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Update the keyword of the input element
    setValue(e.target.value);
  };

  const handleSelect =
    ({ description }: { description: string }) =>
    () => {
      const decorationCopy = { ...decoration };
      // When user selects a place, we can replace the keyword without request data from API
      // by setting the second parameter to "false"
      setValue(description, false);
      decorationCopy.address = description;
      clearSuggestions();

      // Get latitude and longitude via utility functions
      getGeocode({ address: description }).then((results) => {
        //country
        const countryResult = results[0].address_components.find((address) =>
          address.types.includes("country")
        )?.long_name;
        decorationCopy.country = countryResult;
        //city
        const cityResult = results[0].address_components.find((address) =>
          address.types.includes("locality")
        )?.long_name;
        decorationCopy.city = cityResult;

        const { lat, lng } = getLatLng(results[0]);
        decorationCopy.latitude = lat;
        decorationCopy.longitude = lng;
        decorationCopy.userId = userId;
      });
      setDecoration(decorationCopy);
    };

  const renderSuggestions = () =>
    data.map((suggestion) => {
      const {
        place_id,
        structured_formatting: { main_text, secondary_text },
      } = suggestion;

      return (
        <li
          key={place_id}
          onClick={handleSelect(suggestion)}
          className="border-b cursor-pointer hover:bg-gray-200 px-3 py-2"
        >
          <strong>{main_text}</strong> <small>{secondary_text}</small>
        </li>
      );
    });

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const decorationCopy = { ...decoration };
    decorationCopy.name = e.target.value;
    setDecoration(decorationCopy);
  };

  const handleAltChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const decorationCopy = { ...decoration };
    const previewImagesCopy = [...previewImages];
    previewImagesCopy[index].alt = e.target.value;
    setDecoration(decorationCopy);
    setPreviewImages(previewImagesCopy);
  };

  const handleRatingsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.checked);
    const decorationCopy = { ...decoration };
    decorationCopy.hideRatings = e.target.checked;
    setDecoration(decorationCopy);
  };

  const handleViewsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const decorationCopy = { ...decoration };
    decorationCopy.hideViews = e.target.checked;
    setDecoration(decorationCopy);
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
              <Dialog.Panel className="relative h-[700px] w-1/2 overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all">
                <div>
                  <div className="flex justify-between border-b py-2 px-3 text-lg font-bold">
                    <button onClick={() => setCurrentStep(2)}>
                      <ArrowLeft size={32} color="#000" />
                    </button>
                    <span>Edit</span>
                    <button
                      disabled={
                        !decoration.address || !value || !decoration.address
                      }
                      className={`${
                        !decoration.address || !value || !decoration.address
                          ? "text-base text-gray-400"
                          : "text-base text-ch-red"
                      }`}
                      onClick={createNewDecoration}
                    >
                      Create
                    </button>
                  </div>
                  <div className="flex">
                    <div className="flex h-[700px] w-[700px] flex-col items-center justify-center overflow-hidden">
                      {previewImages.length > 1 && (
                        <>
                          <div
                            role="button"
                            aria-pressed="false"
                            tabIndex={0}
                            className="absolute right-[42%] z-50 rounded-full bg-black py-1 px-1 opacity-80 transition-all hover:opacity-60"
                            onClick={nextSlide}
                          >
                            <CaretRight size={24} color="#FFFFFF" />
                          </div>
                          <div
                            role="button"
                            aria-pressed="false"
                            tabIndex={0}
                            className="absolute left-5 z-50 rounded-full bg-black py-1 px-1 opacity-80 transition-all hover:opacity-60"
                            onClick={prevSlide}
                          >
                            <CaretLeft size={24} color="#FFFFFF" />
                          </div>
                        </>
                      )}

                      <img
                        src={currentImage?.preview}
                        alt="..."
                        className="h-[880px] w-[660px] object-fill"
                      />

                      <div className="absolute bottom-5 flex">
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
                    </div>

                    <div className="w-[50%] overflow-y-scroll h-[700px]">
                      <div className="">
                        <div className="relative mt-5">
                          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                            <House size={20} color="#6b7280" />
                          </div>
                          <input
                            onChange={handleNameChange}
                            value={decoration.name}
                            type="text"
                            id="name"
                            className="border-0 border-b border-b-gray-300 text-gray-900 text-sm focus:outline-none focus:border-b focus:border-b-ch-turqiouse block w-full pl-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            placeholder="Decoration Name..."
                          />
                        </div>
                        <div className="relative mt-2">
                          <div
                            className={`${
                              data.length > 0
                                ? "absolute inset-y-0 left-0 top-0 flex items-center pl-3 pointer-events-none"
                                : "absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none"
                            }`}
                          >
                            <MapPin size={20} color="#6b7280" />
                          </div>
                          <input
                            value={value}
                            onChange={handleInput}
                            disabled={!ready}
                            id="address"
                            className="resize-none border-0 border-b border-b-gray-300 text-gray-900 text-sm focus:outline-none focus:border-b focus:border-b-ch-turqiouse block w-full pl-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            placeholder="Decoration Address..."
                          />
                          {value.length > 0 ? (
                            <div
                              className={`${
                                data.length > 0
                                  ? "absolute inset-y-0 right-0 top-0 flex items-center pr-3 cursor-pointer"
                                  : "absolute inset-y-0 right-0 flex items-center pr-3 cursor-pointer"
                              }`}
                              onClick={() => setValue("")}
                            >
                              <X size={20} color="#6b7280" />
                            </div>
                          ) : null}
                        </div>
                        {status === "OK" && <ul>{renderSuggestions()}</ul>}
                      </div>

                      {/* Settings */}
                      <div
                        className="mt-10"
                        id="accordion-flush"
                        data-accordion="collapse"
                        data-active-classes="bg-white dark:bg-gray-900 text-gray-900 dark:text-white"
                        data-inactive-classes="text-gray-500 dark:text-gray-400"
                      >
                        <h2 id="accordion-flush-heading-1">
                          <button
                            onClick={() =>
                              setAdvancedSettingsOpen(!advancedSettingsOpen)
                            }
                            type="button"
                            className="flex items-center justify-between w-full py-5 px-2 font-medium text-left text-gray-500 border-b border-gray-200 dark:border-gray-700 dark:text-gray-400"
                            data-accordion-target="#accordion-flush-body-1"
                            aria-expanded="true"
                            aria-controls="accordion-flush-body-1"
                          >
                            <span
                              className={`${
                                advancedSettingsOpen
                                  ? "font-bold text-black"
                                  : "font-semibold"
                              }`}
                            >
                              Advanced Settings
                            </span>
                            {advancedSettingsOpen ? (
                              <CaretUp
                                size={24}
                                color="#6b7280"
                                weight="bold"
                              />
                            ) : (
                              <CaretDown
                                size={24}
                                color="#6b7280"
                                weight="bold"
                              />
                            )}
                          </button>
                        </h2>
                        {advancedSettingsOpen ? (
                          <div
                            id="accordion-flush-body-1"
                            aria-labelledby="accordion-flush-heading-1"
                          >
                            <div className="py-5 font-light border-b border-gray-200 dark:border-gray-700">
                              <div className="flex items-center justify-between mr-3">
                                <p className="mb-2 px-3 font-semibold text-gray-700 dark:text-gray-400">
                                  Hide the <strong>rating</strong> on this
                                  decoration
                                </p>
                                <label className="relative inline-flex items-center justify-end cursor-pointer mb-1">
                                  <input
                                    onChange={handleRatingsChange}
                                    type="checkbox"
                                    className="sr-only peer"
                                  />
                                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-ch-turqiouse-shade dark:peer-focus:ring-ch-turqiouse rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-ch-turqiouse"></div>
                                </label>
                              </div>
                              <p className="mb-2 px-3 text-xs font-semibold text-gray-500 dark:text-gray-400">
                                Only you will be able to see the rating for this
                                decoration. This setting can be later changed in
                                the decoration settings menu.
                              </p>
                            </div>
                            <div className="py-5 font-light border-b border-gray-200 dark:border-gray-700">
                              <div className="flex items-center justify-between mr-3">
                                <p className="mb-2 px-3 font-semibold text-gray-700 dark:text-gray-400">
                                  Hide the <strong>view</strong> count on this
                                  decoration
                                </p>
                                <label className="relative inline-flex items-center cursor-pointer mb-1">
                                  <input
                                    onChange={handleViewsChange}
                                    type="checkbox"
                                    className="sr-only peer"
                                  />
                                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-ch-turqiouse-shade dark:peer-focus:ring-ch-turqiouse rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-ch-turqiouse"></div>
                                </label>
                              </div>
                              <p className="mb-2 px-3 text-xs font-semibold text-gray-500 dark:text-gray-400">
                                Only you will be able to see the views this
                                decoration has accumulated. This setting can be
                                later changed in the decoration settings menu.
                              </p>
                            </div>
                          </div>
                        ) : null}
                      </div>
                    </div>
                  </div>
                  <CancelModal
                    cancelModalOpen={cancelModalOpen}
                    setCancelModalOpen={setCancelModalOpen}
                    discardDecoration={discardDecoration}
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
