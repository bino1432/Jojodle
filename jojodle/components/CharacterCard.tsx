"use client";
import Image from 'next/image'
import { use, useEffect, useState } from 'react';

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
        <div className={`w-[96] h-[96] flex items-center justify-center rounded-lg ${gender == character.Gender ? "bg-[var(--Correct)]" : "bg-[var(--Wrong)]" }`}>
            <h2>{gender}</h2>
        </div>
        <div className='w-[96] h-[96] flex items-center justify-center'>
            <h2>{height}</h2>
        </div>
        <div className='w-[96] h-[96] flex items-center justify-center'>
            <h2>{age}</h2>
        </div>
        <div className='w-[96] h-[96] flex items-center justify-center'>
            <h2>{nationality}</h2>
        </div>
        <div className='w-[96] h-[96] flex items-center justify-center'>
            <h2>{affiliation}</h2>
        </div>
        <div className='w-[96] h-[96] flex items-center justify-center'>
            <h2>{occupation}</h2>
        </div>
        <div className='w-[96] h-[96] flex items-center justify-center'>
            <h2>{standType}</h2>
        </div>
        <div className='w-[96] h-[96] flex items-center justify-center'>
            <h2>{debutPart}</h2>
        </div>
    </div>
    );
}