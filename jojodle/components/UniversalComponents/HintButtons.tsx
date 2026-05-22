"use client"
import { Archivo } from "next/font/google";
import Image, { StaticImageData } from "next/image";
import { useState } from "react";

const archivoBold = Archivo({
  subsets: ['latin'],
  weight: "700",
});

const archivo = Archivo({
  subsets: ['latin'],
  weight: "400",
});

interface TipsButtonProps {
  title: string;
  guesses: number;
  image: StaticImageData;
  attempts: number;
  hint: string;
  side: "left" | "middle" | "right";
  reciveHintAndSide: (hint: string, side: string, isLeft: boolean, isMiddle: boolean, isRight: boolean) => void;
  isRounded: boolean;
}

export default function HintButtons({title, guesses, image, attempts, hint, reciveHintAndSide, side, isRounded}: TipsButtonProps) {

  const [currentHint, setCurrentHint] = useState('');
  const [isClicked, setIsclicked] = useState(false);

  const giveHint = () => {
    if (guesses <= attempts) {
      setCurrentHint(hint);
      reciveHintAndSide(hint, side, side === "left", side === "middle", side === "right");
      setIsclicked(true);
    }
  };

  const getRoundedClass = () => {
    if (isRounded) return "";

    if (isClicked) {
      if (side === "left") return "rounded-bl-none";
      if (side === "right") return "rounded-br-none";
      if (side === "middle") return "rounded-b-none";
    }

    return "";
  };

  return (
    <div className={`flex flex-col items-center gap-1 p-2 min-w-43 bg-[var(--Accent)] hover:bg-[var(--Primary)] rounded-xl cursor-pointer ${isClicked && !isRounded ? "bg-[var(--Primary)]" : ""} ${getRoundedClass()}`} onClick={giveHint}>
      <h2 className={`${archivoBold.className} text-xl text-white`}>
        {title}
      </h2>

      <p className={`${archivo.className} text-sm text-white`}>
        {guesses > attempts ? `in ${guesses - attempts} guesse(s)` : !isClicked ? `click to reveal` : `revealed`}
      </p>

      <Image className="w-10 h-10" src={image} alt="Button icon"/>
    </div>
  );
}