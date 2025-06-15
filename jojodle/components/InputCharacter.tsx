"use client";
import sendIcon from '@/public/images/icon/Send-Icon.svg'
import { Archivo } from 'next/font/google';
import Image from 'next/image'
import { use, useEffect, useState } from 'react';

type Character = {
  ID: number;
  Name: string;
  Gender: string,
  Height: string,
  Age: number,
  Nationality: string,
  Affiliation: string,
  Occupation: string,
  StandType: string,
  Debut: string,
  Technique: string,
  Difficulty: string
}

interface inputProps {
    reciveId: (id: number) => void;
    characterJson: Character[];
}

const archivoBold = Archivo({
    subsets: ['latin'],
    weight: "700",
},);

export default function InputCharacter({reciveId, characterJson}: inputProps) {
    const [query, setQuery] = useState("");
    const [showList, setShowList] = useState(false);
    const [characterList, setCharacterList] = useState<Character[]>([]);

    useEffect(() => {
        setCharacterList(characterJson);
    })

    const filtered = characterList.filter((char) =>
        char.Name.toLowerCase().includes(query.toLowerCase())
    );

    const handleSelect = (id: number) => {
        console.log("Personagem selecionado:", id);
        reciveId(id);
        setQuery("");
        setShowList(false);
    };

    return (
        <div>
            <div className='flex gap-2 p-[8] bg-[var(--Background)] rounded-lg mt-4 m-auto max-w-[464]'>
                <input
                    type="text"
                    placeholder="Type in the character name"
                    value={query}
                    onChange={(e) => {
                        setQuery(e.target.value);
                        setShowList(true);
                    }}
                    className={`${archivoBold.className} rounded-lg bg-[var(--Accent)] max-w-[392] w-full placeholder-[var(--Cloudy)] pl-[8] text-[var(--Cloudy)] outline-none`} />
                <Image src={sendIcon} alt="Send Icon" className='cursor-pointer' />
            </div>
            <div className={`bg-[var(--Background)] z-10 ${query == "" ? "" : "p-[8]"} mt-1 max-w-[392] max-h-[296] m-auto`}>
                {showList && query.trim() !== "" && (
                <div className="rounded-sm truncate">
                    {filtered.length > 0 ? (
                        filtered.map((char) => (
                            <button
                                key={char.ID}
                                onClick={() => handleSelect(char.ID)}
                                className={`${archivoBold.className} text-[var(--White)] text-xl flex items-center gap-2 w-full text-left px-[4] py-[4] hover:bg-[var(--Primary)] bg-[var(--Accent)]`}
                            >
                                <img
                                    src={"https://www.google.com/url?sa=i&url=https%3A%2F%2Fsoundcloud.com%2Fuser-239026526%2Ffamily-friend-toca-da-capivara&psig=AOvVaw36eyWCSLJyFTnaO4CEYbiy&ust=1750054252073000&source=images&cd=vfe&opi=89978449&ved=0CBEQjRxqFwoTCODn8qHi8o0DFQAAAAAdAAAAABAE"}
                                    alt={char.Name}
                                    className="w-[48] h-[48] rounded-2xl"
                                />
                                <span>{char.Name}</span>
                            </button>
                        ))
                    ) : (
                        <p className={`${archivoBold.className} text-[var(--Cloudy)] px-4 py-2`}>No characters found.</p>
                    )}
                </div>
            )}
            </div>
        </div>
    )
}