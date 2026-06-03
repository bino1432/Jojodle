"use client";
import { useState, useEffect, useCallback } from "react";
import CloseIcon from '@/public/images/icon/Close-Icon';
import StarIcon from '@/public/images/icon/Star-Icon';
import StandIcon from '@/public/images/icon/Stand-Icon';
import QuoteIcon from '@/public/images/icon/Quote-Icon';
import PoseIcon from '@/public/images/icon/Pose-Icon';
import DedicationIcon from '@/public/images/icon/Dedication-Icon';
import GlobalIcon from '@/public/images/icon/Global-Icon';
import MasteryIcon from '@/public/images/icon/Mastery-Icon';
import SkillIcon from '@/public/images/icon/Skill-Icon';
import { Archivo } from 'next/font/google';
import Image from 'next/image';
import Characters from '@/data/json/classic.en.json';
import {
    fetchLeaderboard,
    type BoardTab,
    type ModeTab,
    type TimeTab,
    type LeaderboardEntry,
} from "@/lib/leaderboardServices";

type Character = { ID: number; Name: string; Image: string; [key: string]: unknown };
const characters = Characters as Character[];

const archivoRegular = Archivo({ subsets: ['latin'], weight: "400" });
const archivoBold    = Archivo({ subsets: ['latin'], weight: "700" });

function RankMedal({ rank }: { rank: number }) {
    if (rank === 1) return <span className={`${archivoBold.className} text-yellow-400 text-xl w-8 text-center`}>1</span>;
    if (rank === 2) return <span className={`${archivoBold.className} text-slate-300  text-xl w-8 text-center`}>2</span>;
    if (rank === 3) return <span className={`${archivoBold.className} text-amber-600  text-xl w-8 text-center`}>3</span>;
    return                 <span className={`${archivoBold.className} text-[var(--White)] opacity-50 text-xl w-8 text-center`}>{rank}</span>;
}

function EntryRow({ entry }: { entry: LeaderboardEntry }) {
    const isTop3 = entry.rank <= 3;
    const character = characters.find(c => c.ID === entry.pictureId);
    const avatarSrc = character?.Image ?? '/images/icon/character/SC/SC_1.png';
    const avatarAlt = character?.Name ?? entry.username;

    return (
        <div className={`flex items-center gap-3 px-3 py-2 rounded-sm transition-colors
            ${isTop3 ? 'bg-[var(--Accent)]' : 'hover:bg-[var(--Accent)]/50'}`}>
            <RankMedal rank={entry.rank} />
            <div className="bg-[var(--Accent)] p-1 rounded-xl flex-shrink-0">
                <Image
                    className="rounded-lg"
                    src={avatarSrc}
                    alt={avatarAlt}
                    width={56}
                    height={56}
                />
            </div>
            <div className="flex flex-col flex-1 min-w-0">
                <p className={`${archivoBold.className} text-[var(--White)] text-2xl leading-6`}>
                    {entry.username}
                </p>
                <p className={`${archivoRegular.className} text-[var(--White)] opacity-50 text-xl leading-6`}>
                    {entry.title}
                </p>
            </div>
            <div className="flex flex-col items-end gap-0.5 flex-shrink-0">
                <span className={`${archivoBold.className} bg-[var(--Primary)] text-[var(--White)] text-lg px-2 py-0.5 rounded-sm`}>
                    {entry.valueLabel}
                </span>
                {entry.secondary && (
                    <span className={`${archivoRegular.className} text-[var(--White)] opacity-40 text-sm`}>
                        {entry.secondary}
                    </span>
                )}
            </div>
        </div>
    );
}

function LoadingRows() {
    return (
        <>
            {Array.from({ length: 5 }).map((_, i) => (
                <div key={i} className="flex items-center gap-3 px-3 py-2 rounded-sm animate-pulse">
                    <div className="w-8 h-5 bg-[var(--Accent)] rounded-sm opacity-40" />
                    <div className="w-14 h-14 bg-[var(--Accent)] rounded-xl opacity-40 flex-shrink-0" />
                    <div className="flex flex-col flex-1 gap-1">
                        <div className="h-4 w-32 bg-[var(--Accent)] rounded-sm opacity-40" />
                        <div className="h-3 w-20 bg-[var(--Accent)] rounded-sm opacity-20" />
                    </div>
                    <div className="h-7 w-14 bg-[var(--Accent)] rounded-sm opacity-40" />
                </div>
            ))}
        </>
    );
}

export default function Leaderboard({ onClose }: { onClose: () => void }) {
    const [boardTab, setBoardTab] = useState<BoardTab>('Skill');
    const [modeTab,  setModeTab]  = useState<ModeTab>('Global');
    const [timeTab,  setTimeTab]  = useState<TimeTab>('All-time');

    const [entries, setEntries] = useState<LeaderboardEntry[]>([]);
    const [loading, setLoading] = useState(true);
    const [error,   setError]   = useState(false);

    const load = useCallback(async () => {
        setLoading(true);
        setError(false);
        const result = await fetchLeaderboard(boardTab, modeTab, timeTab);
        setEntries(result);
        setLoading(false);
    }, [boardTab, modeTab, timeTab]);

    useEffect(() => { load(); }, [load]);

    const boardTabs: { label: BoardTab; icon: (active: boolean) => React.ReactNode }[] = [
        { label: 'Dedication', icon: (a) => <DedicationIcon use={a ? "user-white" : "user"} /> },
        { label: 'Skill',      icon: (a) => <SkillIcon      use={a ? "user-white" : "user"} /> },
        { label: 'Mastery',    icon: (a) => <MasteryIcon    use={a ? "user-white" : "user"} /> },
    ];

    const modeTabs: { label: ModeTab; icon?: (active: boolean) => React.ReactNode }[] = [
        { label: 'Global',  icon: (a) => <GlobalIcon use={a ? "user-white" : "user"} /> },
        { label: 'Classic', icon: (a) => <StarIcon   correctPath="/Classic" currentPath="/Classic" use={a ? "user-white" : "user"} /> },
        { label: 'Stand',   icon: (a) => <StandIcon  correctPath="/Classic" currentPath="/Classic" use={a ? "user-white" : "user"} /> },
        { label: 'Quote',   icon: (a) => <QuoteIcon  correctPath="/Classic" currentPath="/Classic" use={a ? "user-white" : "user"} /> },
        { label: 'Pose',    icon: (a) => <PoseIcon   correctPath="/Classic" currentPath="/Classic" use={a ? "user-white" : "user"} /> },
    ];

    const timeTabs: TimeTab[] = ['All-time', 'Weekly', 'Monthly'];

    const boardDescriptions: Record<BoardTab, string> = {
        Dedication: 'They have the Dark Determination. Ranked by streak and games played.',
        Skill:      'I always come first! I\'m number one! Ranked by win rate and avg. guesses.',
        Mastery:    'When you take shortcuts, you lose sight of the truth. Ranked by no-hint wins.',
    };

    const boardValueLabel: Record<BoardTab, string> = {
        Dedication: 'Streak',
        Skill:      'Win rate',
        Mastery:    'No-hint wins',
    };

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/60"
            onClick={onClose}
        >
            <div
                className="flex flex-col gap-4 p-4 bg-[var(--Background)] rounded-lg overflow-y-auto"
                onClick={e => e.stopPropagation()}
            >
                <div className="flex justify-between items-start">
                    <div>
                        <h2 className={`${archivoBold.className} text-[var(--White)] text-2xl`}>
                            「Hey Ya!」
                        </h2>
                        <p className={`${archivoRegular.className} text-[var(--White)] text-xl`}>
                            The true winners of <a className='text-[var(--Primary)]' href='/'>JoJodle</a>.
                        </p>
                    </div>
                    <button onClick={onClose} aria-label="Close">
                        <CloseIcon />
                    </button>
                </div>

                <div className="flex flex-col gap-2">
                    <div className="flex gap-2">
                        {boardTabs.map(({ label, icon }) => {
                            const isActive = boardTab === label;
                            return (
                                <button
                                    key={label}
                                    onClick={() => setBoardTab(label)}
                                    className={`${archivoBold.className} group flex items-center justify-center gap-2 px-4 h-10 rounded-sm cursor-pointer text-[var(--White)] text-lg transition-colors
                                        ${isActive
                                            ? 'bg-[var(--Primary)]'
                                            : 'bg-[var(--Accent)] hover:bg-[var(--Light)]'}`}
                                >
                                    {icon(isActive)}
                                    {label}
                                </button>
                            );
                        })}
                    </div>

                    <p className={`${archivoRegular.className} overflow-wrap: break-word; text-[var(--White)] text-xl`}>
                        {boardDescriptions[boardTab]}
                    </p>
                </div>

                <div className="rounded-sm overflow-hidden">
                    <div className="flex gap-2">
                        {modeTabs.map(({ label, icon }) => {
                            const isActive = modeTab === label;
                            return (
                                <button
                                    key={label}
                                    onClick={() => setModeTab(label)}
                                    className={`${archivoBold.className} w-34 group flex items-center justify-center gap-2 px-4 h-12 cursor-pointer transition-colors rounded-t-sm
                                        ${isActive
                                            ? 'bg-[var(--Primary)]'
                                            : 'bg-[var(--Accent)] hover:bg-[var(--Light)]'}`}
                                >
                                    {icon?.(isActive)}
                                    <p className={`${archivoBold.className} text-[var(--White)] text-xl leading-6.5`}>
                                        {label}
                                    </p>
                                </button>
                            );
                        })}
                    </div>

                    <div className="bg-[var(--Primary)] rounded-b-sm w-178">

                        <div className="flex gap-2 p-3 pb-0">
                            {timeTabs.map(tab => (
                                <button
                                    key={tab}
                                    onClick={() => setTimeTab(tab)}
                                    className={`${archivoBold.className} px-3 h-8 rounded-sm cursor-pointer text-[var(--White)] text-base transition-colors
                                        ${timeTab === tab
                                            ? 'bg-[var(--Accent)]'
                                            : 'opacity-50 hover:opacity-80'}`}
                                >
                                    {tab}
                                </button>
                            ))}
                        </div>

                        <div className="flex items-center gap-3 px-3 pt-3 pb-1">
                            <span className={`${archivoBold.className} text-[var(--White)] opacity-40 text  -sm tracking-widest w-8 text-center`}>#</span>
                            <span className={`${archivoBold.className} text-[var(--White)] opacity-40 text-sm tracking-widest flex-1`}>PLAYER</span>
                            <span className={`${archivoBold.className} text-[var(--White)] opacity-40 text-sm tracking-widest`}>
                                {boardValueLabel[boardTab].toUpperCase()}
                            </span>
                        </div>

                        <div className="flex flex-col gap-1 p-3 pt-0 min-h-[120px]">
                            {loading ? (
                                <LoadingRows />
                            ) : entries.length === 0 ? (
                                <p className={`${archivoRegular.className} text-[var(--White)] opacity-40 text-lg text-center py-6`}>
                                    No data yet.
                                </p>
                            ) : (
                                entries.map(entry => <EntryRow key={entry.rank} entry={entry} />)
                            )}
                        </div>
                    </div>
                </div>

                <div className="flex justify-end">
                    <button
                        onClick={onClose}
                        className={`${archivoBold.className} flex items-center h-9.5 p-2 rounded-sm cursor-pointer text-[var(--White)] text-xl bg-[var(--Primary)] hover:bg-[var(--Light)] transition-colors`}
                    >
                        Okay, Master!
                    </button>
                </div>
            </div>
        </div>
    );
}