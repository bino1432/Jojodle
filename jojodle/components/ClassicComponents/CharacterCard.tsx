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

export default function CharacterCard({ imageUrl, name, gender, height, age, nationality, affiliation, occupation, standType, debutPart, character, winGame }: characterCardProps) {
    const [partNumber, setPartNumber] = useState(0);
    const [attemptPartNumber, setAttemptPartNumber] = useState(0);
    const [characterHeight, setCharacterHeight] = useState(0);
    const [attemptCharacterHeight, setAttemptCharacterHeight] = useState(0);
    const [characterAge, setCharacterAge] = useState<number>(0);
    const [attemptCharacterAge, setAttemptCharacterAge] = useState<number>(0);

    useEffect(() => {
        setPartNumber(getPartNumber(character.Debut));
        setAttemptPartNumber(getPartNumber(debutPart))
        setCharacterHeight(getHeight(character.Height));
        setAttemptCharacterHeight(getHeight(height));
        setCharacterAge(getAge(character.Age));
        setAttemptCharacterAge(getAge(age));
        verifyIfWinGame(name, character.Name);
    }, [])

    const getHeight = (height: string) => {
        const match = height.match(/\d+/);
        if (match) {
            return Number(match[0]);
        }
        return 0;
    }

    const getAge = (age: number | null) => {
        if (age === null) {
            return 0;
        }
        return age;
    }

    const getPartNumber = (part: string) => {
        if (part == "Phantom Blood") {
            return 1;
        } else if (part == "Battle Tendency") {
            return 2;
        } else if (part == "Stardust Crusaders") {
            return 3;
        } else if (part == "Diamond is Unbreakable") {
            return 4;
        } else if (part == "Golden Wind") {
            return 5;
        } else if (part == "Stone Ocean") {
            return 6;
        } else if (part == "Steel Ball Run") {
            return 7;
        } else if (part == "JoJolion") {
            return 8;
        } else if (part == "The JOJOLands") {
            return 9;
        } else {
            return 0;
        }
    }

    const verifyIfWinGame = (attemptCharacterName: string, correctCharacterName: string) => {
        if(attemptCharacterName == correctCharacterName){
            winGame(true);
        }
        return false;
    }

    const verifyIfIsPartiallyCorrect = (attemptedCharacter: string, correctCharacter: string) => {
        const attemptedArray = attemptedCharacter.split(",");
        const correctArray = correctCharacter.split(",");   
        for(let i = 0; i < correctArray.length; i++){
            for(let x = 0; x < attemptedArray.length; x++){
                if(correctArray[i] == attemptedArray[x]){
                    return "bg-[var(--Partial)]";
                }
            }
        }
        return "bg-[var(--Wrong)]"
    }

    return (
        <div className='flex justify-center gap-[8] text-[var(--White)] mt-2'>
            <Image
                src={imageUrl}
                alt={'Character Image'}
                width={96}
                height={96}
                className="rounded-lg"
            ></Image>
            <div className={`
                ${archivo.className}
                w-[96] 
                h-[96] 
                flex items-center 
                justify-center 
                rounded-lg 
                ${gender != "Unknown" ? "text-2xl" : "text-5xl"}
                ${gender == character.Gender ? "bg-[var(--Correct)]" : "bg-[var(--Wrong)]"}`}>
                <h2>{gender != "Unknown" ? gender : "?"}</h2>
            </div>
            <div className={`
                relative
                ${archivo.className}
                text-center
                w-[96] 
                h-[96] 
                flex 
                items-center 
                justify-center 
                rounded-lg 
                ${height != "Unknown" ? "text-xl" : "text-5xl"}
                ${height == character.Height ? "bg-[var(--Correct)]" : "bg-[var(--Wrong)]"}`}>

                {
                    attemptCharacterHeight < characterHeight ?
                        <Image
                            src={UpArrow}
                            alt={'Character Image'}
                            width={40}
                            height={64}
                            className="absolute"
                        ></Image> :
                        attemptCharacterHeight > characterHeight ?
                            <Image
                                src={DownArrow}
                                alt={'Character Image'}
                                width={40}
                                height={64}
                                className="absolute"
                            ></Image> :
                            null
                }

                <h2 className='relative z-[1]'>{height != "Unknown" ? height : "?"}</h2>
            </div>
            <div className={`
                relative
                ${archivo.className}
                ${attemptCharacterAge >= 1000 ? "text-xl" : "text-5xl"}
                w-[96] 
                h-[96] 
                flex 
                items-center 
                justify-center 
                rounded-lg 
                ${age == character.Age ? "bg-[var(--Correct)]" : "bg-[var(--Wrong)]"}`}>

                {
                    attemptCharacterAge < characterAge ?
                        <Image
                            src={UpArrow}
                            alt={'Character Image'}
                            width={40}
                            height={64}
                            className="absolute"
                        ></Image> :
                        attemptCharacterAge > characterAge ?
                            <Image
                                src={DownArrow}
                                alt={'Character Image'}
                                width={40}
                                height={64}
                                className="absolute"
                            ></Image> :
                            null
                }

                <h2 className='relative z-[1]'>{age != null ? age : "?"}</h2>
            </div>
            <div className={`
                text-center
                w-[96] 
                h-[96] 
                flex 
                items-center 
                justify-center 
                rounded-lg 
                ${nationality == character.Nationality ? "bg-[var(--Correct)]" : "bg-[var(--Wrong)]"}`}>
                <img
                    src={nationality}
                    alt={'Flag Image'}
                    width={80}
                    height={60}
                    className="rounded-lg"
                ></img>
            </div>
            <div className={`
                ${archivo.className}
                ${affiliation.length <= 15 ? "text-xl" : affiliation.length > 50 ? "text-xs" : affiliation.length > 30 ? "text-sm" : ""}
                text-center
                w-[96] 
                h-[96] 
                flex 
                items-center 
                justify-center 
                rounded-lg 
                ${affiliation == character.Affiliation ? "bg-[var(--Correct)]" : verifyIfIsPartiallyCorrect(affiliation, character.Affiliation)}`}>
                <h2>{affiliation}</h2>
            </div>
            <div className={`
                ${archivo.className}
                ${occupation.length > 12 ? "text-sm" : occupation.length > 8 ? "" : "text-2xl"}
                text-center
                w-[96] 
                h-[96] 
                flex 
                items-center 
                justify-center 
                rounded-lg 
                ${occupation == character.Occupation ? "bg-[var(--Correct)]" : verifyIfIsPartiallyCorrect(occupation, character.Occupation)}`}>
                <h2>{occupation}</h2>
            </div>
            <div className={`
                ${archivo.className}
                ${standType.length < 5 ? "text-5xl" : standType.length > 25 ? "text-sm" : ""}
                text-center
                w-[96] 
                h-[96] 
                flex 
                items-center 
                justify-center 
                rounded-lg 
                ${standType == character.StandType ? "bg-[var(--Correct)]" : verifyIfIsPartiallyCorrect(standType, character.StandType)}`}>
                <h2>{standType}</h2>
            </div>
            <div className={`
                relative
                ${archivo.className}
                ${debutPart.length > 12 ? "" : "text-xl"}
                text-center
                w-[96] 
                h-[96] 
                flex 
                items-center 
                justify-center 
                rounded-lg 
                ${debutPart == character.Debut ? "bg-[var(--Correct)]" : "bg-[var(--Wrong)]"}`}>

                {
                    attemptPartNumber < partNumber ?
                        <Image
                            src={UpArrow}
                            alt={'Character Image'}
                            width={40}
                            height={64}
                            className="absolute"
                        ></Image> :
                        attemptPartNumber > partNumber ?
                            <Image
                                src={DownArrow}
                                alt={'Character Image'}
                                width={40}
                                height={64}
                                className="absolute"
                            ></Image> :
                            null
                }
                <h2 className='relative z-[1]'>{debutPart}</h2>
            </div>
        </div>
    );
}