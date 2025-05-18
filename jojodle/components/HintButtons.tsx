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
  reciveHintAndSide: (hint: string, side: string, isLeft: boolean, isRight: boolean) => void;
  side: string;
  isRounded: boolean
}

const archivoBold = Archivo({
  subsets: ['latin'],
  weight: "700",
},);

const archivo = Archivo({
  subsets: ['latin'],
  weight: "400",
},);


export default function HintButtons({ title, guesses, image, attempts, hint, reciveHintAndSide, side, isRounded }: TipsButtonProps) {

  const [currentHint, setCurrentHint] = useState('');
  const [isClicked, setIsclicked] = useState(false);

  const giveHint = (e: string | void) => {
    if (guesses <= attempts) {
      setCurrentHint(hint);
      if(side == "left"){
        reciveHintAndSide(hint, side, true, false);
      } else {
        reciveHintAndSide(hint, side, false, true);
      }
      setIsclicked(true);
    }
  };

  return (
    <div className={`
    flex flex-col items-center gap-1 p-2 min-w-43 bg-[var(--Accent)] hover:bg-[var(--Primary)] rounded-xl cursor-pointer 
  ${isClicked != true || isRounded != false ? "" : isClicked == true && side == "left" ? "bg-[var(--Primary)]" : isClicked == true && side == "right" ? "bg-[var(--Primary)]" : ""}
  ${isClicked != true || isRounded != false ? "" : isClicked == true && side == "left" ? "rounded-bl-none" : "rounded-br-none"}`} onClick={() => giveHint()}>
      <h2 className={`${archivoBold.className} text-xl text-white`}>{title}</h2>
      <p className={`${archivo.className} text-sm text-white`}>{guesses > attempts ? `in ${guesses - attempts} guesse(s)` : isClicked == false ? `click to reveal` : `revealed`}</p>
      <Image className="w-10 h-10" src={image} alt="Button icon" />
    </div>
  );
}