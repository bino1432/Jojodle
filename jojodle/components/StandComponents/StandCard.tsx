"use client";
import { Archivo } from "next/font/google";
import { useEffect } from "react";

const archivoBold = Archivo({
  subsets: ['latin'],
  weight: "700",
},);

interface character {
    ID: number;
    Name: string;
    Image: string;
}

interface characterCardProps {
    imageUrl: string,
    name: string,
    character: character,
    winGame: (win: boolean) => void
}

export default function StandCard({ imageUrl, name, character, winGame }: characterCardProps) {

    useEffect(() => {
        verifyIfWinGame(name, character.Name)
    })

    const verifyIfWinGame = (attemptCharacterName: string, correctCharacterName: string) => {
        if(attemptCharacterName == correctCharacterName){
            winGame(true);
        }
        return false;
    }

    return (
        <div className={`
        ${name == character.Name ? 'bg-[var(--Correct)]' : 'bg-[var(--Wrong)]'} 
        flex 
        flex-col 
        items-center 
        justify-center
        gap-2 
        mb-4 
        p-2
        w-74
        m-auto
        rounded-lg`}>
            <img className="w-24 h-24 rounded-lg" src={imageUrl} alt={name} />
            <p className={`${archivoBold.className} text-white text-2xl`}>{name}</p>
        </div>
    );
}