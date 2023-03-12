import React, { useEffect, useRef } from "react";

export interface ICloudinary {
  access_mode: string,
  asset_id: string,
  batchId: string,
  bytes: number,
  created_at: string,
  etag: string,
  existing: boolean,
  folder: string,
  format: string,
  height: number,
  id: string,
  original_extension: string,
  original_filename: string,
  path: string,
  placeholder: boolean,
  public_id: string,
  resource_type: string,
  secure_url: string,
  signature: string,
  tags: string[],
  thumbnail_url: string,
  type: string,
  url: string,
  version: number,
  version_id: string,
  width: number,
}

interface ICloudinaryResponse {
  event: string;
  info: ICloudinary
}

interface IUploadWidgetProps {
  folder: string;
  onSuccess: (info: ICloudinary) => void
}

export const UploadWidget = ({folder, onSuccess}: IUploadWidgetProps) => {
  const cloudinaryRef = useRef();
  const widgetRef = useRef();

  const openWidget = (e: React.MouseEvent) => {
    e.preventDefault();
    (widgetRef.current as any)?.open();
  };

  useEffect(() => {
    cloudinaryRef.current = (window as any).cloudinary;
    widgetRef.current = (cloudinaryRef.current as any)?.createUploadWidget({
      cloudName: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
      uploadPreset: process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET,
      sources: ["local", "url"],
      multiple: false,
      secure: true,
      resourceType: "image",
      folder,
    }, (error: any, result: ICloudinaryResponse) => {
      if (!error && result && result.event === "success") { 
        onSuccess(result.info);
      }
    })
  }, [folder, onSuccess])

  return (
    <button 
      className="inline-flex mt-4 items-center rounded-md bg-black dark:bg-slate-50 px-4 py-2 text-sm font-medium text-white dark:text-black border-2 border-orange-500 shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2" 
      onClick={openWidget}
    >
      Upload image
    </button>
  )
}
