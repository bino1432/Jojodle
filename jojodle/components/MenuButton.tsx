import Image, { StaticImageData } from "next/image";
import { Archivo } from "next/font/google";
import Link from "next/link";

const archivo = Archivo({
  subsets: ['latin'],
  weight: "700",
  
});

interface MenuButtonProps {
    page: string;
    img: StaticImageData,
    title: string,
    alt: string
}

export default function MenuButton({ page, img, title, alt }: MenuButtonProps){
    return(
        <div className="w-full">
            <Link href={page} className="flex justify-center gap-2 items-center p-8 bg-[var(--Background)] max-w-3xs m-auto rounded-lg hover:bg-[var(--Accent)]">
                <Image src={img} alt={alt} />
                <h1 className={`${archivo.className} text-5xl text-white`}>
                    {title}
                </h1>
            </Link>
        </div>
    );
}