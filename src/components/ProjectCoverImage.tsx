import Image from "next/image";
import TiltWrapper from "@/components/TiltWrapper";

export default function ProjectCoverImage({
  src,
  alt,
}: {
  src: string;
  alt: string;
}) {
  return (
    <TiltWrapper className="relative aspect-video overflow-hidden border-b border-navy-700 bg-navy-900">
      <Image
        src={src}
        alt={alt}
        fill
        sizes="(min-width: 768px) 768px, 100vw"
        className="object-cover object-top transition-transform duration-500 ease-out group-hover:scale-[1.04]"
      />
    </TiltWrapper>
  );
}
