"use client";
import sendIcon from '@/public/images/icon/Send-Icon.svg'
import { Archivo } from 'next/font/google';
import Image from 'next/image'
import { useState } from 'react';

const characters = [
    { id: 1, name: "MarioAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA", image: "https://i.imgur.com/uIgDDDd.png" },
    { id: 2, name: "mariO2", image: "https://i.imgur.com/JrXiehh.png" },
    { id: 3, name: "Peach", image: "https://i.imgur.com/0fR9hNG.png" },
    { id: 4, name: "Bowser", image: "https://i.imgur.com/Sy9m8jq.png" },
];

const archivoBold = Archivo({
    subsets: ['latin'],
    weight: "700",
},);

export default function InputCharacter() {
    const [query, setQuery] = useState("");
    const [showList, setShowList] = useState(false);

    const filtered = characters.filter((char) =>
        char.name.toLowerCase().includes(query.toLowerCase())
    );

    const handleSelect = (id: number) => {
        console.log("Personagem selecionado:", id);
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
                                key={char.id}
                                onClick={() => handleSelect(char.id)}
                                className={`${archivoBold.className} text-[var(--White)] text-xl flex items-center gap-2 w-full text-left px-[4] py-[4] hover:bg-[var(--Primary)] bg-[var(--Accent)]`}
                            >
                                <img
                                    src={char.image}
                                    alt={char.name}
                                    className="w-[48] h-[48] rounded-2xl"
                                />
                                <span>{char.name}</span>
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