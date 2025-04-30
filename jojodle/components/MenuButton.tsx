import Image, { StaticImageData } from "next/image";
import { Archivo } from "next/font/google";

const archivo = Archivo({
  subsets: ['latin'],
  weight: "700",
  
});

interface MenuButtonProps {
    img: StaticImageData,
    title: string,
    alt: string
}

export default function MenuButton({ img, title, alt }: MenuButtonProps){
    return(
        <div className="w-full">
            <a href="#" className="flex justify-center gap-4 items-center p-8 bg-[#220D23] max-w-3xs m-auto">
                <Image src={img} alt={alt} />
                <h1 className={`${archivo.className}`}>
                    {title}
                </h1>
            </a>
        </div>
    );
}