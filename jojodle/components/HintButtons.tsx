"use client"
import { Archivo } from "next/font/google";
import Image, { StaticImageData } from "next/image";

interface TipsButtonProps {
    title: string;
    guesses: number;
    image: StaticImageData;
    attempts: number;
    hint: string
}

const archivoBold = Archivo({
  subsets: ['latin'],
  weight: "700",
},);

const archivo = Archivo({
  subsets: ['latin'],
  weight: "400",
},);

function giveTip(attempts: number, guesses: number, hint: string){
  if(guesses > attempts){
    alert("Não pode bobão");
  } else {
    alert("A dica é: " + hint);
  }
}

export default function HintButtons({title, guesses, image, attempts, hint}: TipsButtonProps){
    return(
        <div className="flex flex-col items-center gap-1 p-2 min-w-43 bg-[var(--Accent)] hover:bg-[var(--Primary)] rounded-xl cursor-pointer" onClick={() => giveTip(attempts, guesses, hint)}>
            <h2 className={`${archivoBold.className} text-xl text-white`}>{title}</h2>
            <p className={`${archivo.className} text-sm text-white`}>{guesses > attempts ? `in ${guesses - attempts} guesse(s)` : "Click to reveal"}</p>
            <Image className="w-10 h-10" src={image} alt="Button icon"/>
        </div>
    );
}