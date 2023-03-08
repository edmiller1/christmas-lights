import { useEffect, useState } from "react";
import { useMutation } from "@apollo/client";
import { CREATE_DECORATION } from "../../graphql/mutations";
import {
  CreateDecoration as CreateDecorationData,
  CreateDecorationVariables,
} from "../../graphql/mutations/createDecoration/types";
import {
  createDecorationInput,
  DecorationImage,
  GeocoderAddressComponent,
  User,
} from "../../lib/types";
import { toast } from "react-hot-toast";
import { generateUID, getBase64Value } from "../../lib/helper";
import {
  LoadingModal,
  StepOne,
  StepThree,
  StepTwo,
  SuccessModal,
} from "./components";
import { useNavigate } from "react-router-dom";
import { CircleNotch } from "phosphor-react";

interface Props {
  open: boolean;
  setOpen: (open: boolean) => void;
  cancelButtonRef: any | null;
  userId: string | undefined;
}

export const CreateModal: React.FC<Props> = ({
  open,
  setOpen,
  cancelButtonRef,
  userId,
}) => {
  const [success, setSuccess] = useState<boolean>(false);

  const [createDecoration, { loading, data }] = useMutation<
    CreateDecorationData,
    CreateDecorationVariables
  >(CREATE_DECORATION, {
    onCompleted: () => {
      toast.success("Decoration created successfully! 🎄");
      setSuccess(true);
    },
    onError: () => {
      toast.error(
        "Sorry! We weren't able to create your decoration. Please try again later."
      );
    },
  });

  const [invalidFile, setInvalidFile] = useState<boolean>(false);
  const [cancelModalOpen, setCancelModalOpen] = useState<boolean>(false);
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [previewImages, setPreviewImages] = useState<DecorationImage[]>([]);
  const [base64Images, setBase64Images] = useState<string[]>([]);
  const [imageListOpen, setImageListOpen] = useState<boolean>(false);
  const [removeImageModalOpen, setRemoveImageModalOpen] =
    useState<boolean>(false);
  const [currentImage, setCurrentImage] = useState<
    DecorationImage | undefined
  >();
  const [country, setCountry] = useState<
    GeocoderAddressComponent | undefined
  >();
  const [decoration, setDecoration] = useState<createDecorationInput>({
    name: "",
    address: "",
    images: [],
    latitude: 0,
    longitude: 0,
    country: "",
    city: "",
    userId: userId,
    hideRatings: false,
    hideViews: false,
  });

  const [latitude, setLatitude] = useState<any>(
    localStorage.getItem("latitude")
  );
  const [longitude, setLongitude] = useState<any>(
    localStorage.getItem("longitude")
  );

  const getGeocode = (latitude: string, longitude: string) => {
    if (
      localStorage.getItem("latitude") !== null &&
      localStorage.getItem("longitude") !== null
    ) {
      const geocoder = new google.maps.Geocoder();
      const latlng = {
        lat: parseFloat(latitude),
        lng: parseFloat(longitude),
      };
      geocoder.geocode({ location: latlng }).then((response) => {
        if (response.results[0]) {
          setCountry(
            response.results[0].address_components.find((address) =>
              address.types.includes("country")
            )
          );
        }
      });
    }
  };

  useEffect(() => {
    getGeocode(latitude, longitude);
  }, []);

  const handleDragOver = (e: any) => {
    e.preventDefault();
  };

  const handleDrop = (e: any) => {
    const decorationCopy = { ...decoration };
    e.preventDefault();
    e.stopPropagation();
    const previewArray: DecorationImage[] | null = [];
    const base64Array: string[] = [];
    Object.values(e.dataTransfer.files).forEach((item: any, index: number) => {
      if (!e.dataTransfer.files[index].type.includes("image")) {
        setInvalidFile(true);
      } else {
        const file = {
          id: generateUID(),
          image: e.dataTransfer.files[index],
          preview: URL.createObjectURL(e.dataTransfer.files[index]),
          alt: "",
        };
        getBase64Value(e.dataTransfer.files[index], (imageBase64Value) => {
          base64Array.push(imageBase64Value);
        });
        previewArray.push(file);
      }
    });
    decorationCopy.images = base64Array;
    setBase64Images(base64Array);
    setPreviewImages(previewArray);
    setDecoration(decorationCopy);
    setCurrentImage(previewArray[0]);
    setCurrentStep(2);
  };

  const handleImageSelect = (e: any) => {
    const decorationCopy = { ...decoration };
    e.preventDefault();
    e.stopPropagation();
    const previewArray: DecorationImage[] | null = previewImages;
    const base64Array: string[] = [];
    Object.values(e.target.files).forEach((item: any, index: number) => {
      if (!e.target.files[index].type.includes("image")) {
        setInvalidFile(true);
      } else {
        const file = {
          id: generateUID(),
          image: e.target.files[index],
          preview: URL.createObjectURL(e.target.files[index]),
          alt: "",
        };
        getBase64Value(e.target.files[index], (imageBase64Value) => {
          base64Array.push(imageBase64Value);
        });
        previewArray.push(file);
      }
    });
    decorationCopy.images = base64Array;
    setBase64Images(base64Array);
    setPreviewImages(previewArray);
    setCurrentImage(previewArray[previewArray.length - 1]);
    setDecoration(decorationCopy);
    setCurrentStep(2);
  };

  const discardDecoration = () => {
    setCancelModalOpen(false);
    setCurrentStep(1);
    setPreviewImages([]);
    setDecoration({
      name: "",
      address: "",
      images: [],
      latitude: 0,
      longitude: 0,
      country: "",
      city: "",
      userId: "",
      hideRatings: false,
      hideViews: false,
    });
  };

  const removeSingleImage = (id: string | undefined) => {
    const decorationCopy = { ...decoration };
    const previewImagesCopy = previewImages;
    const selectedImage = previewImagesCopy.findIndex(
      (image: DecorationImage) => image.id === id
    );
    previewImagesCopy.splice(selectedImage, 1);
    decorationCopy.images.splice(selectedImage, 1);
    setDecoration(decoration);
    setPreviewImages(previewImagesCopy);
    setRemoveImageModalOpen(false);
    setImageListOpen(false);
    setCurrentImage(previewImages[0]);
  };

  const changeCurrentImage = (id: string | undefined) => {
    const image = previewImages.find(
      (image: DecorationImage) => image.id === id
    );
    setCurrentImage(image);
  };

  const nextSlide = () => {
    if (currentImage) {
      const currentImageIndex = previewImages.indexOf(currentImage);
      if (currentImageIndex === previewImages.length - 1) {
        setCurrentImage(previewImages[0]);
      } else {
        setCurrentImage(previewImages[currentImageIndex + 1]);
      }
    }
  };

  const prevSlide = () => {
    if (currentImage) {
      const currentImageIndex = previewImages.indexOf(currentImage);
      if (currentImageIndex === 0) {
        setCurrentImage(previewImages[previewImages.length - 1]);
      } else {
        setCurrentImage(previewImages[currentImageIndex - 1]);
      }
    }
  };

  const createNewDecoration = () => {
    createDecoration({ variables: { input: decoration } });
  };

  if (loading) {
    return (
      <LoadingModal
        open={open}
        setOpen={setOpen}
        cancelButtonRef={cancelButtonRef}
      />
    );
  }

  if (success) {
    return (
      <SuccessModal
        open={open}
        setOpen={setOpen}
        cancelButtonRef={cancelButtonRef}
        data={data}
      />
    );
  }

  if (previewImages.length > 0 && currentStep === 2) {
    return (
      <StepTwo
        cancelButtonRef={cancelButtonRef}
        cancelModalOpen={cancelModalOpen}
        changeCurrentImage={changeCurrentImage}
        currentImage={currentImage}
        discardDecoration={discardDecoration}
        handleImageSelect={handleImageSelect}
        imageListOpen={imageListOpen}
        open={open}
        previewImages={previewImages}
        removeImageModalOpen={removeImageModalOpen}
        removeSingleImage={removeSingleImage}
        setCancelModalOpen={setCancelModalOpen}
        setCurrentImage={setCurrentImage}
        setCurrentStep={setCurrentStep}
        setImageListOpen={setImageListOpen}
        setPreviewImages={setPreviewImages}
        setRemoveImageModalOpen={setRemoveImageModalOpen}
        nextSlide={nextSlide}
        prevSlide={prevSlide}
      />
    );
  }

  if (currentStep === 3) {
    return (
      <StepThree
        cancelButtonRef={cancelButtonRef}
        cancelModalOpen={cancelModalOpen}
        currentImage={currentImage}
        discardDecoration={discardDecoration}
        nextSlide={nextSlide}
        open={open}
        prevSlide={prevSlide}
        previewImages={previewImages}
        setPreviewImages={setPreviewImages}
        setCancelModalOpen={setCancelModalOpen}
        setCurrentStep={setCurrentStep}
        country={country}
        decoration={decoration}
        setDecoration={setDecoration}
        createNewDecoration={createNewDecoration}
        userId={userId}
      />
    );
  }

  return (
    <StepOne
      open={open}
      setOpen={setOpen}
      cancelButtonRef={cancelButtonRef}
      handleDragOver={handleDragOver}
      handleDrop={handleDrop}
      handleImageSelect={handleImageSelect}
      invalidFile={invalidFile}
    />
  );
};
