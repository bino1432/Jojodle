"use client";
import sendIcon from '@/public/images/icon/Send-Icon.svg'
import { Archivo } from 'next/font/google';
import Image from 'next/image'
import { useEffect, useState } from 'react';

type Character = {
  ID: number;
  Name: string;
  Variants?: string | null;
  Image: string
}

interface inputProps {
    reciveId: (id: number) => void;
    winGame: boolean;
    characterJson: Character[];
}

const archivoBold = Archivo({
    subsets: ['latin'],
    weight: "700",
},);

export default function SearchInput({reciveId, winGame, characterJson}: inputProps) {
    const [query, setQuery] = useState("");
    const [showList, setShowList] = useState(false);
    const [characterList, setCharacterList] = useState<Character[]>([]);

    useEffect(() => {
        setCharacterList(characterJson);
    }, [characterJson]);

    const filtered = characterList.filter((char) => {
        if (!query?.trim()) return true;

        const q = query.toLowerCase().trim();

        const nameMatch = char.Name.toLowerCase().includes(q);

        const variantMatch = char.Variants
            ? char.Variants
                .split(',')
                .map(v => v.trim().toLowerCase())
                .some(v => v.includes(q))
            : false;

        return nameMatch || variantMatch;
    });

    const removeCharacter = (id: number) => {
        setCharacterList(prev => prev.filter(char => char.ID !== Number(id)));
        console.log("Personagem removido:", id);
        console.log("Lista atualizada:", characterList);
    }

    const handleSelect = (id: number) => {
        console.log("Personagem selecionado:", id);
        reciveId(id);
        removeCharacter(id);
        setQuery("");
        setShowList(false);
    };

    return (
        <div>
            <div className='flex gap-2 p-[8] bg-[var(--Background)] rounded-lg mt-4 m-auto max-w-[464]'>
                <input
                    disabled={winGame}
                    type="text"
                    placeholder={"Type in the character name..."}
                    value={query}
                    onChange={(e) => {
                        setQuery(e.target.value);
                        setShowList(true);
                    }}
                    className={`${archivoBold.className} rounded-lg bg-[var(--Accent)] max-w-[392] w-full placeholder-[var(--Cloudy)] pl-[8] text-[var(--Cloudy)] outline-none`} />
                <Image src={sendIcon} alt="Send Icon" className='cursor-pointer' />
            </div>
            <div className={`bg-[var(--Background)] z-10 ${query == "" ? "" : "p-[8]"} mt-1 min-w-[392] max-h-[296] m-auto overflow-y-auto absolute justify-self-center`}>
                {showList && query.trim() !== "" && (
                <div className="rounded-sm truncate z-[2]">
                    {filtered.length > 0 ? (
                        filtered.map((char) => (
                            <button
                                key={char.ID}
                                onClick={() => handleSelect(char.ID)}
                                className={`${archivoBold.className} text-[var(--White)] text-xl flex items-center gap-2 w-full text-left px-[4] py-[4] hover:bg-[var(--Primary)] bg-[var(--Accent)]`}
                            >
                                <Image
                                    src={char.Image}
                                    alt={char.Name}
                                    width={48}
                                    height={48}
                                    className="rounded-lg"
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