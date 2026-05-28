"use client";

import CloseIcon from '@/public/images/icon/Close-Icon';
import BackIcon from '@/public/images/icon/Back-Icon';
import NextIcon from '@/public/images/icon/Next-Icon';
import { Archivo } from 'next/font/google';
import Image from 'next/image';
import { useMemo, useState } from 'react';

import rawCharacters from '@/data/json/classic.en.json';

const archivoRegular = Archivo({
  subsets: ['latin'],
  weight: "400"
});

const archivoBold = Archivo({
  subsets: ['latin'],
  weight: "700"
});

type RawCharacter = {
  ID: number;
  Name: string;
  Image: string;
  [key: string]: unknown;
};

type Character = {
  id: number;
  name: string;
  image: string;
};

type CharactersByPart = Record<string, Character[]>;

const PART_ORDER = ["PB", "BT", "SC", "DiU", "VA", "SO", "SBR", "JJL", "TJJL"] as const;

function groupByPart(raw: RawCharacter[]): CharactersByPart {
  const map: CharactersByPart = {};

  for (const char of raw) {
    const match = char.Image.match(/\/character\/([^/]+)\//);
    if (!match) continue;

    const part = match[1];
    if (!map[part]) map[part] = [];
    map[part].push({ id: char.ID, name: char.Name, image: char.Image });
  }

  return map;
}

const CHARACTERS_BY_PART = groupByPart(rawCharacters as RawCharacter[]);

const PAGE_SIZE = 10;

export default function CharacterSelector() {
  const [activePart, setActivePart] = useState<string>(PART_ORDER[0]);
  const [page, setPage]             = useState(0);
  const [selected, setSelected]     = useState<Character | null>(null);

  const characters = CHARACTERS_BY_PART[activePart] ?? [];
  const totalPages = Math.ceil(characters.length / PAGE_SIZE);

  const pageCharacters = useMemo(
    () => characters.slice(page * PAGE_SIZE, (page + 1) * PAGE_SIZE),
    [characters, page]
  );

  function handleTabChange(part: string) {
    setActivePart(part);
    setPage(0);
    setSelected(null);
  }

  return (
    <div className="flex flex-col gap-4 p-4 bg-[var(--Background)] rounded-lg mt-4 m-auto w-fit">

      <div className="flex justify-between items-center">
        <h2 className={`${archivoBold.className} text-[var(--White)] text-xl`}>
          「Cinderella」
        </h2>
        <CloseIcon />
      </div>

    <div className="">
        <div className="bg-[var(--Background)] flex justify-between items-end gap-1">
            {PART_ORDER.map((part) => (
            <button
                key={part}
                onClick={() => handleTabChange(part)}
                className={`
                ${archivoBold.className}
                bg-[var(--Accent)] p-1 rounded-t-sm text-xl cursor-pointer w-fit h-8 text-[var(--White)] 
                ${activePart === part
                    ? "bg-[var(--Primary)] h-9"
                    : "hover:bg-[var(--Light)] transition-colors"}
                `}
            >
                {part}
            </button>
            ))}
        </div>

      <div className="bg-[var(--Primary)] rounded-b-lg p-2 flex flex-col gap-2">
        <div className="flex flex-wrap gap-1 justify-center w-104">
          {pageCharacters.map((char) => (
            <button
              key={char.id}
              onClick={() => setSelected(char)}
              title={char.name}
              className={`
                rounded border-4 transition-colors w-fit h-fit cursor-pointer rounded-lg
                ${selected?.id === char.id
                  ? "border-[var(--Accent)]"
                  : "border-[var(--Primary)] hover:border-[var(--Light)]"}
              `}
            >
              <Image
                src={char.image}
                alt={char.name}
                width={72}
                height={72}
                className="object-cover w-18 h-18 rounded-md"
              />
            </button>
          ))}
        </div>

        {totalPages > 1 && (
          <div className="flex justify-center gap-2">
            <div
              onClick={() => setPage((p) => p - 1)}
              className={page === 0 ? "pointer-events-none opacity-0" : ""}
            >
              <BackIcon />
            </div>
            <div
              onClick={() => setPage((p) => p + 1)}
              className={page === totalPages - 1 ? "pointer-events-none opacity-0" : ""}
            >
              <NextIcon />
            </div>
          </div>
        )}
      </div>
    </div>

      <div className="flex gap-1 items-center justify-center">
        <p className={`${archivoRegular.className} text-[var(--White)] text-xl`}>Are you</p>
        <p className={`${archivoBold.className} bg-[var(--Accent)] text-[var(--White)] text-xl p-1 rounded-sm`}>
          {selected?.name ?? "…"}
        </p>
        <p className={`${archivoRegular.className} text-[var(--White)] text-xl`}>?</p>
      </div>

      <div className="flex gap-2 justify-center">
        <button
          disabled={!selected}
          className={`${archivoBold.className} flex items-center h-9 px-3 rounded-sm cursor-pointer text-[var(--White)] text-xl bg-[var(--Primary)] hover:bg-[var(--Light)] disabled:opacity-40`}
        >
          YES, I AM!
        </button>
        <button className={`${archivoBold.className} flex items-center h-9 px-3 rounded-sm cursor-pointer text-[var(--White)] text-xl bg-[var(--Accent)] hover:bg-[var(--Light)]`}>
          I refuse.
        </button>
      </div>
    </div>
  );
}