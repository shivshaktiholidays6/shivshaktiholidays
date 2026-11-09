import Image, { type ImageProps } from "next/image";

type ResponsiveImageProps = Omit<ImageProps, "alt" | "src"> & {
  src: ImageProps["src"];
  alt: string;
  focalPoint?: string;
};

/**
 * Shared media primitive for local assets and future admin-managed image URLs.
 * `focalPoint` accepts CSS object-position values such as "center", "50% 30%",
 * or "left center" so an editor can control cropping without changing layouts.
 */
export function ResponsiveImage({
  alt,
  focalPoint = "center",
  sizes,
  style,
  ...props
}: ResponsiveImageProps) {
  return (
    <Image
      {...props}
      alt={alt}
      sizes={sizes}
      style={{ objectPosition: focalPoint, ...style }}
    />
  );
}
