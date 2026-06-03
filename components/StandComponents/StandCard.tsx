"use client";
import { Archivo } from "next/font/google";
import { useEffect } from "react";

const archivoBold = Archivo({
  subsets: ['latin'],
  weight: "700",
},);

interface StandInfo {
    Stand: string;
    [key: string]: any;
}

interface Character {
    ID: number;
    Name: string;
    Image: string;
    Stands?: StandInfo[];
}

interface characterCardProps {
    imageUrl: string,
    name: string,
    character: Character,
    attemptedCharacter?: Character,
    showedStand?: string,
    altCharacterNames?: string[],
    winGame: (win: boolean) => void
}

export default function StandCard({ imageUrl, name, character, attemptedCharacter, showedStand, altCharacterNames, winGame }: characterCardProps) {
    useEffect(() => {
        verifyIfWinGame();
    }, [attemptedCharacter, character, showedStand]);  // ADD THIS BACK

    const verifyIfWinGame = () => {
        const attemptMatchesName = name === character.Name || altCharacterNames?.includes(name);
        const attemptMatchesStand = attemptedCharacter?.Stands?.some(s => s.Stand === showedStand);

        if (attemptMatchesName || attemptMatchesStand) {
            winGame(true);
            return true;
        }
        return false;
    }

    const isCorrect =
        name.toLowerCase() === character.Name.toLowerCase() ||
        altCharacterNames?.some(n => n.toLowerCase() === name.toLowerCase()) ||
        attemptedCharacter?.Stands?.some(s => s.Stand.toLowerCase() === showedStand?.toLowerCase());

    return (
        <div className={`
        ${isCorrect ? 'bg-[var(--Correct)]' : 'bg-[var(--Wrong)]'} 
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