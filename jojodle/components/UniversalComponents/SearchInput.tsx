"use client";
import sendIcon from '@/public/images/icon/Send-Icon.svg'
import { Archivo } from 'next/font/google';
import Image from 'next/image'
import { useEffect, useRef, useState } from 'react';

type Character = {
  ID: number;
  Name: string;
  Variants?: string | null;
  Image: string
}

interface inputProps {
    receiveId: (id: number) => void;
    winGame: boolean;
    characterJson: Character[];
}

const archivoBold = Archivo({
    subsets: ['latin'],
    weight: "700",
},);

export default function SearchInput({receiveId, winGame, characterJson}: inputProps) {
    const [query, setQuery] = useState("");
    const [showList, setShowList] = useState(false);
    const [characterList, setCharacterList] = useState<Character[]>([]);
    const [highlightedIndex, setHighlightedIndex] = useState(0);
    const listRef = useRef<HTMLDivElement>(null);
    const itemRefs = useRef<(HTMLButtonElement | null)[]>([]);

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
    }

    const handleSelect = (id: number) => {
        receiveId(id);
        removeCharacter(id);
        setQuery("");
        setShowList(false);
        setHighlightedIndex(0);
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (!showList || query.trim() === "") return;

        if (e.key === "ArrowDown") {
            e.preventDefault();
            setHighlightedIndex(prev => {
                const next = Math.min(prev + 1, filtered.length - 1);
                itemRefs.current[next]?.scrollIntoView({ block: "nearest" });
                return next;
            });
        } else if (e.key === "ArrowUp") {
            e.preventDefault();
            setHighlightedIndex(prev => {
                const next = Math.max(prev - 1, 0);
                itemRefs.current[next]?.scrollIntoView({ block: "nearest" });
                return next;
            });
        } else if (e.key === "Enter") {
            e.preventDefault();
            if (filtered[highlightedIndex]) {
                handleSelect(filtered[highlightedIndex].ID);
            }
        } else if (e.key === "Escape") {
            setShowList(false);
            setHighlightedIndex(0);
        }
    };

    return (
        <div className={winGame ? "hidden" : ""}>
            <div className='flex gap-2 p-[8] bg-[var(--Background)] rounded-lg mt-4 m-auto max-w-[464]'>
                <input
                    autoFocus
                    disabled={winGame}
                    type="text"
                    placeholder="Type in the character name..."
                    value={query}
                    onChange={(e) => {
                        setQuery(e.target.value);
                        setShowList(true);
                        setHighlightedIndex(0);
                    }}
                    onKeyDown={handleKeyDown}
                    className={`${archivoBold.className} rounded-lg bg-[var(--Accent)] max-w-[392] w-full placeholder-[var(--Cloudy)] pl-[8] text-[var(--White)] text-xl outline-none`} />
                <Image src={sendIcon} alt="Send Icon" className='cursor-pointer' />
            </div>
            <div
                ref={listRef}
                className={`bg-[var(--Background)] z-10 ${query == "" ? "" : "p-[8]"} mt-1 min-w-[392] max-h-[296] m-auto overflow-y-auto absolute justify-self-center`}
                style={{
                    scrollbarWidth: 'thin',
                    scrollbarColor: `var(--Accent) transparent`,
                }}
            >
                <style>{`
                    .scrollbar-custom::-webkit-scrollbar { width: 8px; height: 8px; }
                    .scrollbar-custom::-webkit-scrollbar-track { background: var(--Background); }
                    .scrollbar-custom::-webkit-scrollbar-thumb { background: var(--Accent); border-radius: 99px; }
                    .scrollbar-custom::-webkit-scrollbar-thumb:hover { background: var(--Primary); }
                `}</style>
                {showList && query.trim() !== "" && (
                <div className="scrollbar-custom rounded-sm truncate z-[2]">
                    {filtered.length > 0 ? (
                        filtered.map((char, index) => (
                            <button
                                key={char.ID}
                                ref={el => { itemRefs.current[index] = el; }}
                                onClick={() => handleSelect(char.ID)}
                                className={`${archivoBold.className} text-[var(--White)] text-xl flex items-center gap-2 w-full text-left px-[4] py-[4] bg-[var(--Accent)] ${
                                    index === highlightedIndex
                                        ? "bg-[var(--Primary)]"
                                        : "hover:bg-[var(--Primary)] transition-colors"
                                }`}
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