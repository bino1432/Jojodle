"use client"
import { Archivo } from "next/font/google";
import Image, { StaticImageData } from "next/image";
import { useState } from "react";

interface TipsButtonProps {
  title: string;
  guesses: number;
  image: StaticImageData;
  attempts: number;
  hint: string;
  reciveHint: (valor: string) => void;
}

const archivoBold = Archivo({
  subsets: ['latin'],
  weight: "700",
},);

const archivo = Archivo({
  subsets: ['latin'],
  weight: "400",
},);


export default function HintButtons({ title, guesses, image, attempts, hint, reciveHint }: TipsButtonProps) {
  
  const [currentHint, setCurrentHint] = useState('');

  const giveHint = (e: string | void) => {
    if(guesses <= attempts){
      setCurrentHint(hint);
      reciveHint(hint);
    }
  };

return (
  <div className="flex flex-col items-center gap-1 p-2 min-w-43 bg-[var(--Accent)] hover:bg-[var(--Primary)] rounded-xl cursor-pointer" onClick={() => giveHint()}>
    <h2 className={`${archivoBold.className} text-xl text-white`}>{title}</h2>
    <p className={`${archivo.className} text-sm text-white`}>{guesses > attempts ? `in ${guesses - attempts} guesse(s)` : "Click to reveal"}</p>
    <Image className="w-10 h-10" src={image} alt="Button icon" />
  </div>
);
}