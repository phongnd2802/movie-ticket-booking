// // "use client";

// // import { useEffect, useState } from "react";
// // import { IKImage } from "imagekitio-next";

// // const URL_ENDPOINT = process.env.NEXT_PUBLIC_URL_ENDPOINT;

// // export default function Image({ path, alt, width, height, className }) {
// //   const [isLoading, setIsLoading] = useState(true);
// //   const [hasError, setHasError] = useState(false);

// //   if (!URL_ENDPOINT) {
// //     console.error("Missing NEXT_PUBLIC_URL_ENDPOINT environment variable");
// //     return (
// //       <div
// //         className={`bg-gray-200 flex items-center justify-center ${
// //           className || ""
// //         }`}
// //         style={{ width, height }}
// //         role="img"
// //         aria-label={alt}
// //       >
// //         <span className="text-gray-500">Image unavailable</span>
// //       </div>
// //     );
// //   }

// //   // Calculate aspect ratio for responsive sizing
// //   const aspectRatio = width / height;

// //   return (
// //     <>
// //       {isLoading && (
// //         <div
// //           className={`bg-gray-100 animate-pulse ${className || ""}`}
// //           style={{
// //             width,
// //             height,
// //             aspectRatio: aspectRatio,
// //           }}
// //         />
// //       )}

// //       {hasError && (
// //         <div
// //           className={`bg-gray-200 flex items-center justify-center ${
// //             className || ""
// //           }`}
// //           style={{ width, height }}
// //           role="img"
// //           aria-label={`Failed to load image: ${alt}`}
// //         >
// //           <span className="text-gray-500">Failed to load image</span>
// //         </div>
// //       )}

// //       <IKImage
// //         urlEndpoint={URL_ENDPOINT}
// //         path={path}
// //         alt={alt}
// //         width={width}
// //         height={height}
// //         className={`w-full h-full object-cover ${className || ""} ${
// //           isLoading ? "hidden" : ""
// //         }`}
// //         onLoad={() => setIsLoading(false)}
// //         onError={() => {
// //           setIsLoading(false);
// //           setHasError(true);
// //         }}
// //         transformation={[
// //           {
// //             width: width,
// //             height: "auto",
// //             aspectRatio: aspectRatio.toFixed(2),
// //           },
// //         ]}
// //         // lqip={{ active: true, quality: 20, blur: 10 }}
// //       />
// //     </>
// //   );
// // }

// "use client";

// import { IKImage } from "imagekitio-next";

// const URL_ENDPOINT = process.env.NEXT_PUBLIC_URL_ENDPOINT;

// function Image({ path, alt, width, height, className }) {
//   return (
//     <IKImage
//       urlEndpoint={URL_ENDPOINT}
//       path={path}
//       alt={alt}
//       width={width}
//       height={height}
//       className={`w-full h-full object-cover ${className}`}
//     />
//   );
// }

// export default Image;

import Image from "next/image";

function MyImage({ path, alt, width, height, className }) {
  return (
    <Image
      src={path}
      alt={alt}
      width={width}
      height={height}
      className={`w-full h-full object-cover ${className}`}
    />
  );
}

export default MyImage;
