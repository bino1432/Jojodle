"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import ChevronLeftIcon from '@/public/images/icon/Chevron-Left-Icon';
import ChevronRightIcon from '@/public/images/icon/Chevron-Right-Icon';
import CloseIcon from '@/public/images/icon/Close-Icon';
import { Archivo } from 'next/font/google';
import { db } from "@/lib/firebase";
import { collection, getDocs } from "firebase/firestore";
import { useUser } from "@/context/UserContext";
import { GameDayEntry, getDayStatus, getGameDays } from "@/lib/userServices";

const archivoRegular = Archivo({ subsets: ['latin'], weight: "400" });
const archivoBold = Archivo({ subsets: ['latin'], weight: "700" });

const LaunchYear  = 2026;
const LaunchMonth = 4;

function todayBRT(): Date {
    return new Date(new Date().toLocaleString("en-US", { timeZone: "America/Sao_Paulo" }));
}

function dateKey(year: number, month: number, day: number): string {
    return `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
}

function daysInMonth(year: number, month: number): number {
    return new Date(year, month + 1, 0).getDate();
}

function firstDayOfMonth(year: number, month: number): number {
    return new Date(year, month, 1).getDay();
}

type DayStatus = "completed" | "partial" | "none";

interface CalendarDay {
    day: number;
    key: string;
    hasGame: boolean;
    isToday: boolean;
    isFuture: boolean;
    isBeforeLaunch: boolean;
    userStatus: DayStatus;
}

export default function Calendar({ onClose }: { onClose: () => void }) {
    const router = useRouter();
    const { user } = useUser();

    const today = todayBRT();
    const [viewYear, setViewYear]   = useState(today.getFullYear());
    const [viewMonth, setViewMonth] = useState(today.getMonth());

    const [gameDates, setGameDates] = useState<Set<string>>(new Set());
    const [userGameDays, setUserGameDays] = useState<Record<string, GameDayEntry>>({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchGameDates() {
            try {
                const snapshot = await getDocs(collection(db, "daily_answers"));
                const keys = new Set(snapshot.docs.map(d => d.id));
                setGameDates(keys);
            } catch (err) {
                console.error("Calendar: failed to fetch game dates", err);
            } finally {
                setLoading(false);
            }
        }
        fetchGameDates();
    }, []);

    useEffect(() => {
        if (!user?.username) {
            setUserGameDays({});
            return;
        }
        getGameDays(user.username).then(days => {
            setUserGameDays(days ?? {});
        });
    }, [user?.username]);

    const isLaunchMonth = viewYear === LaunchYear && viewMonth === LaunchMonth;
    const isCurrentMonth = viewYear === today.getFullYear() && viewMonth === today.getMonth();

    function prevMonth() {
        if (isLaunchMonth) return;
        if (viewMonth === 0) { setViewYear(y => y - 1); setViewMonth(11); }
        else setViewMonth(m => m - 1);
    }

    function nextMonth() {
        if (isCurrentMonth) return;
        if (viewMonth === 11) { setViewYear(y => y + 1); setViewMonth(0); }
        else setViewMonth(m => m + 1);
    }

    const totalDays  = daysInMonth(viewYear, viewMonth);
    const firstDay   = firstDayOfMonth(viewYear, viewMonth);
    const todayKey   = dateKey(today.getFullYear(), today.getMonth(), today.getDate());

    const days: CalendarDay[] = Array.from({ length: totalDays }, (_, i) => {
        const day = i + 1;
        const key = dateKey(viewYear, viewMonth, day);
        const isToday   = key === todayKey;
        const isFuture  = key > todayKey;
        const isBeforeLaunch = isLaunchMonth && !gameDates.has(key) && !isToday;

        return {
            day,
            key,
            hasGame: gameDates.has(key),
            isToday,
            isFuture,
            isBeforeLaunch,
            userStatus: getDayStatus(userGameDays[key]),
        };
    });

    function handleDayClick(d: CalendarDay) {
        const clickable = (d.hasGame || d.isToday) && !d.isFuture && !d.isBeforeLaunch;
        if (!clickable) return;
        router.push(`/Classic?date=${d.key}`);
        onClose();
    }

    function cellClass(d: CalendarDay): string {
        const base = `${archivoBold.className} flex items-center justify-center w-26 h-16 rounded-lg text-xl font-bold transition-colors select-none`;
        const clickable = (d.hasGame || d.isToday) && !d.isFuture && !d.isBeforeLaunch;

        if (d.isToday) {
            if (d.userStatus === "completed") {
                return `${base} bg-[var(--Correct)] text-white cursor-pointer hover:bg-[var(--CorrectLight)]`;
            } else if (d.userStatus === "partial") {
                return `${base} bg-[var(--Partial)] text-white cursor-pointer hover:bg-[var(--PartialLight)]`;
            } else {
                return `${base} bg-[var(--Primary)] text-[var(--White)] cursor-pointer hover:bg-[var(--Light)]`;
            }
        }

        if (d.isFuture || d.isBeforeLaunch) {
            return `${base} bg-[var(--Cloudy)] text-[var(--White)] cursor-not-allowed`;
        }

        if (!clickable) {
            return `${base} bg-[var(--Accent)] text-[var(--White)] cursor-not-allowed`;
        }

        if (d.userStatus === "completed") {
            return `${base} bg-[var(--Correct)] text-white cursor-pointer hover:bg-[var(--CorrectLight)]`;
        }
        if (d.userStatus === "partial") {
            return `${base} bg-[var(--Partial)] text-white cursor-pointer hover:bg-[var(--PartialLight)]`;
        }

        return `${base} bg-[var(--Primary)] text-[var(--White)] cursor-pointer hover:bg-[var(--Light)]`;
    }

    const MonthNames = ["january","february","march","april","may","june","july","august","september","october","november","december"];
    const DayNames   = ["sun","mon","tue","wed","thu","fri","sat"];

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60" onClick={onClose}>
            <div
                className="flex flex-col gap-4 p-4 bg-[var(--Background)] rounded-lg w-fit max-h-[90vh] overflow-y-auto"
                onClick={e => e.stopPropagation()}
            >
                <div className="flex justify-between">
                    <h2 className={`${archivoBold.className} text-[var(--White)] text-2xl`}>「Mandom」</h2>
                    <button onClick={onClose} aria-label="Close"><CloseIcon /></button>
                </div>

                <p className={`${archivoRegular.className} text-[var(--White)] text-xl`}>
                    Go back and play previous days of <a className="text-[var(--Primary)]" href="/">JoJodle</a>.
                </p>

                <div className="flex items-center justify-between gap-4">
                    <button
                        onClick={prevMonth}
                        disabled={isLaunchMonth}
                        className="
                            text-[var(--Primary)]
                            disabled:text-[var(--Cloudy)]
                            hover:text-[var(--Light)]
                            transition-colors
                            cursor-pointer
                            disabled:cursor-not-allowed
                        "
                    >
                        <ChevronLeftIcon />
                    </button>

                    <span className={`${archivoBold.className} text-[var(--White)] text-xl`}>
                        {MonthNames[viewMonth]}/{viewYear}
                    </span>

                    <button
                        onClick={nextMonth}
                        disabled={isCurrentMonth}
                        className="
                            text-[var(--Primary)]
                            disabled:text-[var(--Cloudy)]
                            hover:text-[var(--Light)]
                            transition-colors
                            cursor-pointer
                            disabled:cursor-not-allowed
                        "
                        aria-label="Previous month"
                    >
                        <ChevronRightIcon />
                    </button>
                </div>

                <div className="grid grid-cols-7 gap-1">
                    {DayNames.map(d => (
                        <div key={d} className={`${archivoBold.className} flex items-center justify-center w-26 h-8 rounded-lg bg-[var(--Accent)] text-[var(--White)] text-xl`}>
                            {d}
                        </div>
                    ))}

                    {Array.from({ length: firstDay }).map((_, i) => (
                        <div key={`empty-${i}`} className="w-26 h-16" />
                    ))}

                    {days.map(d => (
                        <button
                            key={d.key}
                            onClick={() => handleDayClick(d)}
                            className={cellClass(d)}
                            disabled={d.isFuture || d.isBeforeLaunch || (!d.hasGame && !d.isToday)}
                        >
                            {String(viewMonth + 1).padStart(2, "0")}/{String(d.day).padStart(2, "0")}
                        </button>
                    ))}
                </div>

                <div className={`${archivoRegular.className} flex gap-4 justify-center flex-wrap items-center text-[var(--White)] text-sm`}>
                    <div className="flex items-center gap-2">
                        <div className="w-13 h-8 rounded-sm bg-[var(--Correct)]" />
                        <span className="text-base">Completed</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="w-13 h-8 rounded-sm bg-[var(--Partial)]" />
                        <span className="text-base">Partially completed</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="w-13 h-8 rounded-sm bg-[var(--Primary)] hover:bg-[var(--Light)]" />
                        <span className="text-base">Not played</span>
                    </div>
                </div>
            </div>
        </div>
    );
}