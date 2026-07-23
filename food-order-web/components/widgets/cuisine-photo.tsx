import Image from "next/image";

export default function CuisinePhoto({src, width, height, className} : {src? : string, width? : number, height? : number, className? : string}) {
    return (
        <Image
            src={`${process.env.NEXT_PUBLIC_IMAGE_BASE}/${src}`}
            alt={src || 'Photo'}
            width={width}
            height={height}
            unoptimized
            className={className || 'h-56 w-full object-cover'}
        />
    )
}