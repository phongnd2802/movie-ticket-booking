import Image from "next/image";
import PropTypes from "prop-types"; // Optional for runtime type checking

/**
 * Enhanced Image component that wraps Next.js Image with sensible defaults
 *
 * @param {Object} props - The component props
 * @returns {JSX.Element} The image component
 */
export default function MyImage({
  path,
  alt,
  width,
  height,
  className = "",
  priority = false,
  quality = 80,
  fill = false,
  sizes,
  placeholder,
  blurDataURL,
}) {
  const imageProps = {
    src: path,
    alt,
    quality,
    priority,
    placeholder,
    blurDataURL,
  };

  if (fill) {
    imageProps.fill = true;
    imageProps.sizes = sizes || "100vw";
  } else {
    if (!width || !height) {
      console.error(
        "MyImage: width and height are required when fill is false"
      );
    }
    imageProps.width = width;
    imageProps.height = height;
  }

  return (
    <Image
      {...imageProps}
      className={`${fill ? "object-cover" : ""} ${className}`}
    />
  );
}

MyImage.propTypes = {
  path: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
  width: PropTypes.number,
  height: PropTypes.number,
  className: PropTypes.string,
  priority: PropTypes.bool,
  quality: PropTypes.number,
  fill: PropTypes.bool,
  sizes: PropTypes.string,
  placeholder: PropTypes.oneOf(["blur", "empty"]),
  blurDataURL: PropTypes.string,
};
