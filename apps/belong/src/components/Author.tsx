import { SanityImageSource } from "@sanity/image-url/lib/types/types";
import { SanityImage } from "./SanityImage";

export async function Author({ name, role, image}: {name: string,
  role: string,
  image: SanityImageSource,}) {

  return (
    <div className="flex items-center leading-tight space-x-3">
      <div className="rounded-full overflow-clip">
        <SanityImage
          alt={`Photo of ${name}`}
          width={56}
          height={56}
          image={image}
        />
      </div>
      <p>
        <span className="font-semibold">{name}</span> <br />
        {role}
      </p>
    </div>
  );
}
