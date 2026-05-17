"use client";

import Image from "next/image";
import { CURIE_IMAGE, CURIE_OBJECT_CLASS } from "@/lib/data/curieHero";

type CuriePlateProps = {
  className?: string;
  imageClassName?: string;
};

export default function CuriePlate({
  className = "",
  imageClassName = "img-sepia brightness-[0.58]",
}: CuriePlateProps) {
  return (
    <div className={`absolute inset-0 overflow-hidden ${className}`} aria-hidden>
      <Image
        src={CURIE_IMAGE}
        alt=""
        fill
        priority
        sizes="100vw"
        className={`${CURIE_OBJECT_CLASS} ${imageClassName}`}
      />
    </div>
  );
}
