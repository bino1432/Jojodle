"use client";
import { useState } from "react";
import { useUser } from "@/context/UserContext";
import { updateUserField } from "@/lib/userServices";
import { Archivo } from 'next/font/google';
import StarIcon from '@/public/images/icon/Star-Icon';
import StandIcon from '@/public/images/icon/Stand-Icon';
import QuoteIcon from '@/public/images/icon/Quote-Icon';
import PoseIcon from '@/public/images/icon/Pose-Icon';
import EditIcon from '@/public/images/icon/Edit-Icon';
import CharacterSelector from "@/components/UserComponents/CharacterSelector";
import TitleSelector from "@/components/UserComponents/TitleSelector";
import Image from 'next/image'
import Characters from '@/data/json/classic.en.json';

const archivoRegular = Archivo({
    subsets: ['latin'],
    weight: "400",
},);

const archivoBold = Archivo({
    subsets: ['latin'],
    weight: "700",
},);

export default function UserLoggedIn({ onClose }: { onClose: () => void }) {
    const { user, setUser } = useUser();
    const [showCharacterSelector, setShowCharacterSelector] = useState(false);
    const [showTitleSelector, setShowTitleSelector] = useState(false);
    const [saving, setSaving] = useState(false);
    const [activeTab, setActiveTab] = useState<'Classic' | 'Stand' | 'Quote' | 'Pose' | null>(null);

    type StatMode = {
        label: 'Classic' | 'Stand' | 'Quote' | 'Pose';
        icon: (active: boolean) => React.ReactNode;
        prefix: 'c' | 's' | 'q' | 'p';
    };

    const statModes: StatMode[] = [
        { label: 'Classic', icon: (a) => <StarIcon  correctPath="/Classic" currentPath="/Classic" use={a ? "user-white" : "user"} />, prefix: 'c' },
        { label: 'Stand',   icon: (a) => <StandIcon correctPath="/Classic" currentPath="/Classic" use={a ? "user-white" : "user"} />, prefix: 's' },
        { label: 'Quote',   icon: (a) => <QuoteIcon correctPath="/Classic" currentPath="/Classic" use={a ? "user-white" : "user"} />, prefix: 'q' },
        { label: 'Pose',    icon: (a) => <PoseIcon  correctPath="/Classic" currentPath="/Classic" use={a ? "user-white" : "user"} />,  prefix: 'p' },
    ];

    if (!user) return;
    
    async function handleCharacterConfirm(character: { id: number; name: string }) {
        if (!user) return;

        setSaving(true);
        
        const result = await updateUserField(user.username, { pictureId: character.id });
        
        if (result.success) {
            setUser({ ...user, pictureId: character.id });
        }

        setSaving(false);
        setShowCharacterSelector(false);
    }

    async function handleTitleConfirm(title: string) {
        if (!user) return;
        
        setSaving(true);
        
        const result = await updateUserField(user.username, { title });
        
        if (result.success) {
            setUser({ ...user, title });
        }

        setSaving(false);
        setShowTitleSelector(false);
    }

    type Character = {
        ID: number;
        Name: string;
        Image: string;
        [key: string]: unknown;
    };

    const characters = Characters as Character[];
    const currentCharacter = characters.find(c => c.ID === user.pictureId);

    return (
        <>
            <div className="flex flex-col gap-2">
                <div>
                    <p className={`${archivoBold.className} text-[var(--White)] text-2xl`}>
                    Customization
                    </p>
                    <p className={`${archivoRegular.className} text-[var(--White)] text-lg`}>
                    Customize your profile with avatar and title options.
                    </p>
                </div>

                <div className="flex-1 flex justify-center w-full">
                    <div className="flex gap-4 p-4 bg-[var(--Accent)] rounded-lg w-[420px] min-w-fit">
                        <div className="flex-shrink-0 flex flex-col items-center gap-2">
                            <div className="bg-[var(--Primary)] p-1.5 rounded-2xl">
                                <Image
                                className="rounded-xl"
                                src={currentCharacter?.Image ?? '/images/icon/character/SC/SC_1.png'}
                                alt={currentCharacter?.Name ?? 'User Icon'}
                                width={96}
                                height={96}
                                />
                            </div>

                            <div className="w-full h-1 bg-[var(--Primary)] opacity-40 rounded-full" />
                        </div>

                        <div className="w-1 bg-[var(--Primary)] opacity-40 self-stretch" />

                        <div className="flex flex-col gap-2 flex-1 min-w-0">
                            <p className={`${archivoBold.className} tracking-widest text-base text-[var(--White)] opacity-60`}>
                                JOJODLE CARD
                            </p>

                            <div className="flex flex-col gap-1.5">
                                <div>
                                    <p className={`${archivoBold.className} tracking-widest text-sm text-[var(--White)] opacity-60`}>
                                        USERNAME
                                    </p>
                                    <div className={`${archivoBold.className} bg-[var(--Primary)] px-2 py-1 rounded-sm text-[var(--White)] text-base leading-5 w-full`}>
                                        {user.username}
                                    </div>
                                </div>

                                <div>
                                    <p className={`${archivoBold.className} tracking-widest text-sm text-[var(--White)] opacity-60`}>
                                        AVATAR
                                    </p>
                                    <div className="flex items-center gap-2">
                                        <div className={`${archivoBold.className} bg-[var(--Primary)] px-2 py-1 flex-1 min-w-0 rounded-sm text-[var(--White)] text-base leading-5 truncate`}>
                                            {currentCharacter?.Name ?? '…'}
                                        </div>
                                        <button onClick={() => setShowCharacterSelector(true)} className="flex-shrink-0" disabled={saving}>
                                            <EditIcon />
                                        </button>
                                    </div>
                                </div>

                                <div>
                                    <p className={`${archivoBold.className} tracking-widest text-sm text-[var(--White)] opacity-60`}>
                                        TITLE
                                    </p>
                                    <div className="flex items-center gap-2">
                                        <div className={`${archivoBold.className} bg-[var(--Primary)] px-2 py-1 flex-1 min-w-0 rounded-sm text-[var(--White)] text-base leading-5`}>
                                            {user.title}
                                        </div>
                                        <button onClick={() => setShowTitleSelector(true)} className="flex-shrink-0" disabled={saving}>
                                            <EditIcon />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
            <div className='flex flex-col gap-2 justify-center'>
                <p className={`${archivoBold.className} text-[var(--White)] text-xl leading-5.5`}>Stats</p>
                <p className={`${archivoRegular.className} text-[var(--White)] text-xl leading-5.5`}>View your game statistics. Select a game mode.</p>

                <div className="rounded-sm overflow-hidden">

                    <div className='flex gap-2'>
                        {statModes.map(({ label, icon, prefix }) => {
                            const isActive = activeTab === label;
                            return (
                                <button
                                    key={label}
                                    onClick={() => setActiveTab(isActive ? null : label)}
                                    className={`${archivoBold.className} group flex items-center justify-center gap-2 px-4 h-12 cursor-pointer transition-colors
                                        ${activeTab !== null
                                            ? 'rounded-t-sm'
                                            : 'rounded-sm'
                                        }
                                        ${isActive
                                            ? 'bg-[var(--Primary)]'
                                            : 'bg-[var(--Accent)] hover:bg-[var(--Light)]'
                                        }`}
                                >
                                    {icon(isActive)}
                                    <p className={`${archivoBold.className} text-[var(--White)] text-2xl leading-6.5`}>{label}</p>
                                </button>
                            );
                        })}
                    </div>

                    {activeTab && (() => {
                        const mode = statModes.find(m => m.label === activeTab)!;
                        const p = mode.prefix;
                        const games   = user.stats[`${p}Games`   as keyof typeof user.stats] as number;
                        const wins    = user.stats[`${p}Wins`    as keyof typeof user.stats] as number;
                        const avg     = user.stats[`${p}AvgGuesses` as keyof typeof user.stats] as number;
                        const streak  = user.stats[`${p}CurrentStreak` as keyof typeof user.stats] as number;
                        const best    = user.stats[`${p}BestStreak`    as keyof typeof user.stats] as number;
                        const nohint  = user.stats[`${p}NoHintWins`    as keyof typeof user.stats] as number;
                        const winPct  = games > 0 ? Math.round((wins / games) * 100) : 0;
                        const hintPct = games > 0 ? Math.round((nohint / games) * 100) : 0;

                        return (
                            <div className="bg-[var(--Primary)] p-3 rounded-b-sm grid grid-cols-2 gap-x-6 gap-y-1">
                                {[
                                    { label: 'Games Played',       value: games,   extra: null },
                                    { label: 'Current Streak',     value: `${streak}d`, extra: null },
                                    { label: 'Total Wins',         value: wins,    extra: `(${winPct}%)` },
                                    { label: 'Best Streak',        value: `${best}d`,   extra: null },
                                    { label: 'Avg. Guesses to Win',value: avg,     extra: null },
                                    { label: 'Wins w/o Hints',     value: nohint,  extra: `(${hintPct}%)` },
                                ].map(({ label, value, extra }) => (
                                    <div key={label} className="flex items-center gap-2">
                                        <p className={`${archivoBold.className} text-[var(--White)] text-xl`}>{label}</p>
                                        <span className={`${archivoBold.className} bg-[var(--Accent)] text-[var(--White)] text-xl px-1.5 py-0.5 rounded-sm`}>{value}</span>
                                        {extra && <p className={`${archivoRegular.className} bg-[var(--Accent)] text-xl px-1.5 py-0.5 rounded-sm text-[var(--White)]`}>{extra}</p>}
                                    </div>
                                ))}
                            </div>
                        );
                    })()}
                </div>
            </div>

            <div className='flex gap-2 justify-end'>
                <button
                onClick={onClose}
                className={`${archivoBold.className} flex items-center h-9.5 p-2 rounded-sm cursor-pointer text-[var(--White)] text-xl bg-[var(--Primary)] hover:bg-[var(--Light)] transition-colors`}
                >
                    Okay, Master!
                </button>
            </div>

            {showCharacterSelector && (
            <CharacterSelector
                onClose={() => setShowCharacterSelector(false)}
                onConfirm={handleCharacterConfirm}
            />
            )}
            {showTitleSelector && (
            <TitleSelector
                currentTitle={user.title}
                onClose={() => setShowTitleSelector(false)}
                onConfirm={handleTitleConfirm}
            />
            )}
        </>
    )
}