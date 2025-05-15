import { Archivo } from "next/font/google";
import Image, { StaticImageData } from "next/image";

interface TipsButtonProps {
    title: string;
    guesses: number;
    image: StaticImageData
}

const archivoBold = Archivo({
  subsets: ['latin'],
  weight: "700",
},);

const archivo = Archivo({
  subsets: ['latin'],
  weight: "400",
},);

export default function TipsButtons({title, guesses, image}: TipsButtonProps){
    return(
        <div className="flex flex-col items-center gap-1 p-2 max-w-43 bg-[var(--Accent)] rounded-lg">
            <h2 className={`${archivoBold.className} text-xl text-white`}>{title}</h2>
            <p className={`${archivo.className} text-sm text-white`}>in {guesses} guesse(s)</p>
            <Image className="w-10 h-10" src={image} alt="Button icon"/>
        </div>
    );
}