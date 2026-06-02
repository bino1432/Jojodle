"use client";
import { Archivo } from 'next/font/google';
import Image from 'next/image'
import UpArrow from "@/public/images/icon/Arrows/UpArrow.svg"
import DownArrow from "@/public/images/icon/Arrows/DownArrow.svg"
import { useEffect, useState } from 'react';

interface character {
    ID: number,
    Name: string,
    Gender: string,
    Height: string,
    Age: number | null,
    Nationality: string,
    Affiliation: string,
    Occupation: string,
    StandType: string,
    Debut: string,
    Technique: string,
    Image: string
}

const archivo = Archivo({
    subsets: ['latin'],
    weight: "700",
});

interface characterCardProps {
    imageUrl: string,
    name: string,
    gender: string,
    height: string,
    age: number | null,
    nationality: string,
    affiliation: string,
    occupation: string,
    standType: string,
    debutPart: string,
    character: character,
    winGame: (win: boolean) => void
}

const fitText = (text: string): string => {
    const words = text.split(/[\s,]+/);
    const longestWord = words.reduce((a, b) => a.length > b.length ? a : b, "");
    const wordLen = longestWord.length;
    const totalLen = text.length;

    if (wordLen <= 2 && totalLen <= 4)   return "text-4xl leading-8";
    if (wordLen <= 3 && totalLen <= 6)   return "text-3xl leading-7";
    if (wordLen <= 5 && totalLen <= 10)  return "text-2xl leading-6";
    if (wordLen <= 7 && totalLen <= 18)  return "text-xl leading-5";
    if (wordLen <= 9 && totalLen <= 28)  return "text-base leading-4.5";
    if (wordLen <= 12)                   return "text-sm leading-4";
    return "text-xs leading-3.5";
};

const box = "relative w-24 h-24 flex items-center justify-center rounded-lg p-2 text-center overflow-hidden break-words";

export default function CharacterCard({
    imageUrl, name, gender, height, age, nationality,
    affiliation, occupation, standType, debutPart, character, winGame
}: characterCardProps) {
    const [partNumber, setPartNumber] = useState(0);
    const [attemptPartNumber, setAttemptPartNumber] = useState(0);
    const [characterHeight, setCharacterHeight] = useState(0);
    const [attemptCharacterHeight, setAttemptCharacterHeight] = useState(0);
    const [characterAge, setCharacterAge] = useState<number>(0);
    const [attemptCharacterAge, setAttemptCharacterAge] = useState<number>(0);

    useEffect(() => {
        setPartNumber(getPartNumber(character.Debut));
        setAttemptPartNumber(getPartNumber(debutPart));
        setCharacterHeight(parseHeight(character.Height));
        setAttemptCharacterHeight(parseHeight(height));
        setCharacterAge(parseAge(character.Age));
        setAttemptCharacterAge(parseAge(age));
        verifyIfWinGame(name, character.Name);
    }, []);

    const parseHeight = (h: string) => Number(h.match(/\d+/)?.[0] ?? 0);
    const parseAge    = (a: number | null) => a ?? 0;

    const getPartNumber = (part: string): number => ({
        "Phantom Blood": 1,
        "Battle Tendency": 2,
        "Stardust Crusaders": 3,
        "Diamond is Unbreakable": 4,
        "Golden Wind": 5,
        "Stone Ocean": 6,
        "Steel Ball Run": 7,
        "JoJolion": 8,
        "The JOJOLands": 9,
    }[part] ?? 0);

    const verifyIfWinGame = (attempt: string, correct: string) => {
        if (attempt === correct) winGame(true);
    };

    const isPartialMatch = (attempt: string, correct: string): boolean => {
        const a = attempt.split(",");
        const b = correct.split(",");
        return a.some(x => b.includes(x));
    };

    const matchColor = (attempt: string, correct: string, partial = false): string => {
        if (attempt === correct) return "bg-[var(--Correct)]";
        if (partial && isPartialMatch(attempt, correct)) return "bg-[var(--Partial)]";
        return "bg-[var(--Wrong)]";
    };

    const DirectionArrow = ({ attempt, target }: { attempt: number; target: number }) => {
        if (attempt === target) return null;
        const src = attempt < target ? UpArrow : DownArrow;
        return <Image src={src} alt="" width={40} height={64} className="absolute opacity-40" />;
    };

    const unknownText = (val: string | number | null) => {
        if (val === "Unknown" || val === null) return "?";
        if (typeof val === "number") return val.toLocaleString();
        return String(val);
    };

    return (
        <div className={`${archivo.className} flex justify-center gap-2 text-[var(--White)] mt-2`}>

            <div className="relative overflow-hidden group w-24 h-24 rounded-lg flex-shrink-0">
                <Image src={imageUrl} alt="Character" width={96} height={96} className="rounded-lg" />
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300">
                    <div className="bg-[var(--Background)] rounded-lg px-1 py-1 max-w-[90%]">
                        <h3 className={`font-bold tracking-tight text-white ${fitText(name)}`}>{name}</h3>
                    </div>
                </div>
            </div>

            <div className={`${box} ${matchColor(gender, character.Gender)}`}>
                <h2 className={fitText(unknownText(gender))}>{unknownText(gender)}</h2>
            </div>

            <div className={`${box} ${matchColor(height, character.Height)}`}>
                <DirectionArrow attempt={attemptCharacterHeight} target={characterHeight} />
                <h2 className={`relative z-[1] ${fitText(unknownText(height))}`}>{unknownText(height)}</h2>
            </div>

            <div className={`${box} ${matchColor(String(age), String(character.Age))}`}>
                <DirectionArrow attempt={attemptCharacterAge} target={characterAge} />
                <h2 className={`relative z-[1] ${fitText(unknownText(age))}`}>
                    {unknownText(age)}
                </h2>
            </div>

            <div className={`${box} ${matchColor(nationality, character.Nationality)}`}>
                <img src={nationality} alt="Flag" width={80} height={60} className="rounded-lg" />
            </div>

            <div className={`${box} ${matchColor(affiliation, character.Affiliation, true)}`}>
                <h2 className={fitText(affiliation)}>{affiliation}</h2>
            </div>

            <div className={`${box} ${matchColor(occupation, character.Occupation, true)}`}>
                <h2 className={fitText(occupation)}>{occupation}</h2>
            </div>

            <div className={`${box} ${matchColor(standType, character.StandType, true)}`}>
                <h2 className={fitText(standType)}>{standType}</h2>
            </div>

            <div className={`${box} ${matchColor(debutPart, character.Debut)}`}>
                <DirectionArrow attempt={attemptPartNumber} target={partNumber} />
                <h2 className={`relative z-[1] ${fitText(debutPart)}`}>{debutPart}</h2>
            </div>

        </div>
    );
}