"use client";
import { Archivo } from 'next/font/google';
import Image from 'next/image'

interface character {
    ID: number,
    Name: string,
    Gender: string,
    Height: string,
    Age: number,
    Nationality: string,
    Affiliation: string,
    Occupation: string,
    StandType: string,
    Debut: string,
    Technique: string,
    Difficulty: string,
    Image: string
}

const archivo = Archivo({
    subsets: ['latin'],
    weight: "700",
});

interface characterCardProps {
    imageUrl: string,
    gender: string,
    height: string,
    age: number,
    nationality: string,
    affiliation: string,
    occupation: string,
    standType: string,
    debutPart: string,
    character: character
}

export default function CharacterCard({ imageUrl, gender, height, age, nationality, affiliation, occupation, standType, debutPart, character }: characterCardProps) {
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
                text-2xl 
                ${gender == character.Gender ? "bg-[var(--Correct)]" : "bg-[var(--Wrong)]"}`}>
                <h2>{gender}</h2>
            </div>
            <div className={`
                ${archivo.className}
                text-center
                w-[96] 
                h-[96] 
                flex 
                items-center 
                justify-center 
                rounded-lg 
                text-xl
                ${height == character.Height ? "bg-[var(--Correct)]" : "bg-[var(--Wrong)]"}`}>
                <h2>{height}</h2>
            </div>
            <div className={`
                ${archivo.className}
                ${age >= 1000 ? "text-xl" : "text-5xl"}
                w-[96] 
                h-[96] 
                flex 
                items-center 
                justify-center 
                rounded-lg 
                ${age == character.Age ? "bg-[var(--Correct)]" : "bg-[var(--Wrong)]"}`}>
                <h2>{age}</h2>
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
                <Image
                    src={nationality}
                    alt={'Character Image'}
                    width={80}
                    height={60}
                    className="rounded-lg"
                ></Image>
            </div>
            <div className={`
                ${archivo.className}
                ${affiliation.length <= 15 ? "text-2xl" : affiliation.length > 30 ? "text-sm" : ""}
                text-center
                w-[96] 
                h-[96] 
                flex 
                items-center 
                justify-center 
                rounded-lg 
                ${affiliation == character.Affiliation ? "bg-[var(--Correct)]" : "bg-[var(--Wrong)]"}`}>
                <h2>{affiliation}</h2>
            </div>
            <div className={`
                ${archivo.className}
                ${occupation.length > 8 ? "" : "text-2xl"}
                text-center
                w-[96] 
                h-[96] 
                flex 
                items-center 
                justify-center 
                rounded-lg 
                ${occupation == character.Occupation ? "bg-[var(--Correct)]" : "bg-[var(--Wrong)]"}`}>
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
                ${standType == character.StandType ? "bg-[var(--Correct)]" : "bg-[var(--Wrong)]"}`}>
                <h2>{standType}</h2>
            </div>
            <div className={`
                ${archivo.className}
                ${debutPart.length > 15 ? "" : "text-xl"}
                text-center
                w-[96] 
                h-[96] 
                flex 
                items-center 
                justify-center 
                rounded-lg 
                ${debutPart == character.Debut ? "bg-[var(--Correct)]" : "bg-[var(--Wrong)]"}`}>
                <h2>{debutPart}</h2>
            </div>
        </div>
    );
}