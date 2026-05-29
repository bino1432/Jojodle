"use client";

import CloseIcon from '@/public/images/icon/Close-Icon';
import BackIcon from '@/public/images/icon/Back-Icon';
import NextIcon from '@/public/images/icon/Next-Icon';
import { Archivo } from 'next/font/google';
import { useMemo, useState } from 'react';

import rawTitles from '@/data/json/titles.en.json';

const archivoRegular = Archivo({
  subsets: ['latin'],
  weight: "400"
});

const archivoBold = Archivo({
  subsets: ['latin'],
  weight: "700"
});

type RawTitle = {
  Title: string;
  Part: string;
};

type TitlesByPart = Record<string, string[]>;

const PART_LABELS: Record<string, string> = {
  "Phantom Blood":        "PB",
  "Battle Tendency":      "BT",
  "Stardust Crusaders":   "SC",
  "Diamond is Ubreakable":"DiU",
  "Vento Aureo":          "VA",
  "Stone Ocean":          "SO",
  "Steel Ball Run":       "SBR",
  "JoJolion":             "JJL",
  "The JOJOLands":        "TJJL",
};

const PART_ORDER = Object.keys(PART_LABELS);

function groupByPart(raw: RawTitle[]): TitlesByPart {
  const map: TitlesByPart = {};
  for (const { Title, Part } of raw) {
    if (!map[Part]) map[Part] = [];
    map[Part].push(Title);
  }
  return map;
}

const TITLES_BY_PART = groupByPart(rawTitles as RawTitle[]);

const PAGE_SIZE = 10;

export default function TitleSelector({ currentTitle, onClose }: { currentTitle?: string; onClose: () => void }) {
  const [activePart, setActivePart] = useState<string>(PART_ORDER[0]);
  const [page, setPage]             = useState(0);
  const [selected, setSelected]     = useState<string | null>(null);

  const titles = TITLES_BY_PART[activePart] ?? [];
  const totalPages = Math.ceil(titles.length / PAGE_SIZE);

  const pageTitles = useMemo(
    () => titles.slice(page * PAGE_SIZE, (page + 1) * PAGE_SIZE),
    [titles, page]
  );

  function handleTabChange(part: string) {
    setActivePart(part);
    setPage(0);
    setSelected(null);
  }

  return (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60" onClick={onClose}>
      <div className="flex flex-col gap-4 p-4 bg-[var(--Background)] rounded-lg w-fit overflow-y-auto" onClick={e => e.stopPropagation()}>
        <div className="flex justify-between items-center">
          <h2 className={`${archivoBold.className} text-[var(--White)] text-xl`}>
            Choose your title!
          </h2>
          <button onClick={onClose} aria-label="Close">
              <CloseIcon />
          </button>
        </div>

        {currentTitle && (
          <div className="flex gap-2 items-center">
            <p className={`${archivoRegular.className} text-[var(--White)] text-xl`}>Current title:</p>
            <p className={`${archivoBold.className} bg-[var(--Accent)] text-[var(--White)] text-xl p-1 rounded-sm`}>
              {currentTitle}
            </p>
          </div>
        )}

        <div>
          <div className="bg-[var(--Background)] flex justify-between items-end gap-1">
            {PART_ORDER.map((part) => (
              <button
                key={part}
                onClick={() => handleTabChange(part)}
                className={`
                  ${archivoBold.className}
                  bg-[var(--Accent)] p-1 rounded-t-sm text-xl cursor-pointer w-fit text-[var(--White)]
                  ${activePart === part
                    ? "bg-[var(--Primary)] h-9"
                    : "hover:bg-[var(--Light)] transition-colors h-8"}
                `}
              >
                {PART_LABELS[part]}
              </button>
            ))}
          </div>

          <div className="bg-[var(--Primary)] rounded-b-lg p-2 flex flex-col gap-2">
            <div className="flex flex-wrap gap-2 justify-center w-104">
              {pageTitles.map((title) => (
                <button
                  key={title}
                  onClick={() => setSelected(title)}
                  className={`
                    ${archivoBold.className}
                    p-1 rounded-lg text-[var(--White)] text-xl cursor-pointer
                    ${selected === title
                      ? "bg-[var(--Light)] border-3 border-[var(--Background)]"
                      : "bg-[var(--Accent)] border-3 border-[var(--Primary)] hover:bg-[var(--Light)] transition-colors"}
                  `}
                >
                  {title}
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
            {selected ?? "…"}
          </p>
          <p className={`${archivoRegular.className} text-[var(--White)] text-xl`}>?</p>
        </div>

        <div className="flex gap-2 justify-center">
          <button
            onClick={onClose}
            disabled={!selected}
            className={`${archivoBold.className} flex items-center h-9 px-3 rounded-sm cursor-pointer text-[var(--White)] text-xl bg-[var(--Primary)] hover:bg-[var(--Light)] disabled:opacity-40`}
          >
            YES, I AM!
          </button>
          <button onClick={onClose} className={`${archivoBold.className} flex items-center h-9 px-3 rounded-sm cursor-pointer text-[var(--White)] text-xl bg-[var(--Accent)] hover:bg-[var(--Light)]`}>
            I refuse.
          </button>
        </div>
      </div>
    </div>
  );
}