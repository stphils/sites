import { urlFor } from "../lib/sanity";
import Image from "next/image";
import { SanityImageSource } from "@sanity/image-url/lib/types/types";

export function SanityImage({
  image,
  width,
  height,
  alt,
}: {
  image: SanityImageSource;
  width: number;
  height: number;
  alt: string;
}) {
  const imageSrc = urlFor(image)
    .width(width)
    .height(height)
    .auto("format")
    .url();

  return <Image src={imageSrc} width={width} height={height} alt={alt} />;
}
