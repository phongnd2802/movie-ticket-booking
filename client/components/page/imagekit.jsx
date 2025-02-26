"use client";

import { IKImage } from "imagekitio-next";

const URL_ENDPOINT = process.env.NEXT_PUBLIC_URL_ENDPOINT;

function Image({ path, alt, width, height, className }) {
  return (
    <IKImage
      urlEndpoint={URL_ENDPOINT}
      path={path}
      alt={alt}
      width={width}
      height={height}
      className={`w-full h-full object-cover ${className}`}
    />
  );
}

export default Image;
