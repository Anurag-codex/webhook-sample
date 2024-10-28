"use client";
import { useToast } from "@/hooks/use-toast";
import { dataUrl, getImageSize } from "@/lib/utils";
import { CldImage, CldUploadWidget, CloudinaryUploadWidgetResults } from 'next-cloudinary'; // Use the correct type
import { PlaceholderValue } from "next/dist/shared/lib/get-img-props";
import Image from "next/image";

interface ImageState {
  publicId: string;
  secureURL: string;
  width: number;
  height: number;
}

type MediaUploaderProps = {
  onValueChange: (value: string) => void;
  setImage: React.Dispatch<React.SetStateAction<ImageState>> | null;
  image: ImageState | null;
  publicId: string;
  type: string;
}

const MediaUploader = ({
  onValueChange,
  setImage,
  image,
  publicId,
  type
}: MediaUploaderProps) => {
  const { toast } = useToast();

  const onUploadSuccessHandler = (result: CloudinaryUploadWidgetResults) => {
    const { info } = result;

    if (info && typeof info === 'object' && setImage) {
      setImage((prevState) => ({
        ...(prevState || {}), // Ensure we handle null case
        publicId: info.public_id,
        secureURL: info.secure_url,
        width: info.width,
        height: info.height
      }));
      onValueChange(info.public_id);
      toast({
        title: 'Image uploaded successfully',
        description: '1 credit was deducted from your account',
        duration: 5000,
        className: 'success-toast',
      });
    }
  };


  const onUploadErrorHandler = () => {
    toast({
      title: 'Something went wrong while uploading',
      description: 'Please try again',
      duration: 5000,
      className: 'error-toast',
    });
  };

  return (
    <CldUploadWidget
      uploadPreset="picgenie"
      options={{
        multiple: false,
        resourceType: "image"
      }}
      onSuccess={onUploadSuccessHandler}
      onError={onUploadErrorHandler}
    >
      {({ open }) => (
        <div className="flex flex-col gap-4">
          <h3 className="h3-bold text-dark-600">Original</h3>
          {publicId ? (
            <div className="cursor-pointer overflow-hidden rounded-[10px]">
              <CldImage
                width={getImageSize(type, image || { width: 800, height: 600 }, "width")}
                height={getImageSize(type, image || { width: 800, height: 600 }, "height")}
                src={publicId}
                alt="image"
                sizes={"(max-width: 767px) 100vw, 50vw"}
                placeholder={dataUrl as PlaceholderValue}
                className="media-uploader_cldImage"
              />
            </div>
          ) : (
            <div className="media-uploader_cta" onClick={() => open()}>
              <div className="media-uploader_cta-image">
                <Image
                  src="/assets/icons/add.svg"
                  alt="Add image"
                  width={24}
                  height={24}
                />
              </div>
              <p className="p-14-medium">Click here to upload image</p>
            </div>
          )}
        </div>
      )}
    </CldUploadWidget>
  );
};

export default MediaUploader;
