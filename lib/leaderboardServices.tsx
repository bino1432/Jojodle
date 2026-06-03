import { db } from "@/lib/firebase";
import {
    collection,
    getDocs,
    orderBy,
    query,
    limit,
} from "firebase/firestore";
import { UserData, GameDays } from "@/lib/userServices";

export type BoardTab = "Dedication" | "Skill" | "Mastery";
export type ModeTab  = "Global" | "Classic" | "Stand" | "Quote" | "Pose";
export type TimeTab  = "All-time" | "Weekly" | "Monthly";

export type LeaderboardEntry = {
    rank:        number;
    username:    string;
    title:       string;
    pictureId:   number;
    value:       number;
    valueLabel:  string;
    secondary?:  string;
};

type Prefix = "c" | "s" | "q" | "p";

const MODE_PREFIX: Record<ModeTab, Prefix | null> = {
    Global:  null,
    Classic: "c",
    Stand:   "s",
    Quote:   "q",
    Pose:    "p",
};

function getDateWindow(timeTab: TimeTab): { from: string; to: string } | null {
    if (timeTab === "All-time") return null;

    const now = new Date();
    const toDate = now.toLocaleDateString("en-CA", { timeZone: "America/Sao_Paulo" });

    if (timeTab === "Weekly") {
        const from = new Date(now);
        from.setDate(now.getDate() - 6);
        return {
            from: from.toLocaleDateString("en-CA", { timeZone: "America/Sao_Paulo" }),
            to:   toDate,
        };
    }

    const from = new Date(now.getFullYear(), now.getMonth(), 1);
    return {
        from: from.toLocaleDateString("en-CA", { timeZone: "America/Sao_Paulo" }),
        to:   toDate,
    };
}

function countDaysInWindow(
    gameDays: GameDays,
    mode: "classic" | "stand" | "quote" | "pose" | "any",
    window: { from: string; to: string }
): number {
    return Object.entries(gameDays).filter(([date, entry]) => {
        if (date < window.from || date > window.to) return false;
        if (mode === "any") return entry.classic || entry.stand || entry.quote || entry.pose;
        return entry[mode];
    }).length;
}

function modeToGameDayKey(modeTab: ModeTab): "classic" | "stand" | "quote" | "pose" | "any" {
    const map: Record<ModeTab, "classic" | "stand" | "quote" | "pose" | "any"> = {
        Global:  "any",
        Classic: "classic",
        Stand:   "stand",
        Quote:   "quote",
        Pose:    "pose",
    };
    return map[modeTab];
}

async function fetchDedication(
    modeTab: ModeTab,
    timeTab: TimeTab
): Promise<LeaderboardEntry[]> {
    const prefix = MODE_PREFIX[modeTab];
    const window = getDateWindow(timeTab);

    if (timeTab === "All-time") {
        const usersRef = collection(db, "users");

        let docs: UserData[];

        if (prefix !== null) {
            const q = query(usersRef, orderBy(`stats.${prefix}BestStreak`, "desc"), limit(10));
            const snap = await getDocs(q);
            docs = snap.docs.map(d => d.data() as UserData);
        } else {
            const snap = await getDocs(usersRef);
            docs = snap.docs
                .map(d => d.data() as UserData)
                .sort((a, b) => {
                    const bestA = Math.max(a.stats.cBestStreak, a.stats.sBestStreak, a.stats.qBestStreak, a.stats.pBestStreak);
                    const bestB = Math.max(b.stats.cBestStreak, b.stats.sBestStreak, b.stats.qBestStreak, b.stats.pBestStreak);
                    return bestB - bestA;
                })
                .slice(0, 10);
        }

        return docs.map((u, i) => {
            const best    = prefix ? u.stats[`${prefix}BestStreak`]    : Math.max(u.stats.cBestStreak, u.stats.sBestStreak, u.stats.qBestStreak, u.stats.pBestStreak);
            const current = prefix ? u.stats[`${prefix}CurrentStreak`] : Math.max(u.stats.cCurrentStreak, u.stats.sCurrentStreak, u.stats.qCurrentStreak, u.stats.pCurrentStreak);
            return {
                rank:       i + 1,
                username:   u.username,
                title:      u.title,
                pictureId:  u.pictureId,
                value:      best,
                valueLabel: `${best}d`,
                secondary:  `${current}d current`,
            };
        });
    }

    const snap = await getDocs(collection(db, "users"));
    const gameDayKey = modeToGameDayKey(modeTab);

    const ranked = snap.docs
        .map(d => {
            const u = d.data() as UserData;
            const days = countDaysInWindow(u.gameDays ?? {}, gameDayKey, window!);
            return { u, days };
        })
        .filter(({ days }) => days > 0)
        .sort((a, b) => b.days - a.days)
        .slice(0, 10);

    return ranked.map(({ u, days }, i) => ({
        rank:       i + 1,
        username:   u.username,
        title:      u.title,
        pictureId:  u.pictureId,
        value:      days,
        valueLabel: `${days}d`,
        secondary:  undefined,
    }));
}

async function fetchSkill(
    modeTab: ModeTab,
    timeTab: TimeTab
): Promise<LeaderboardEntry[]> {
    const prefix = MODE_PREFIX[modeTab];

    if (timeTab === "All-time") {
        const usersRef = collection(db, "users");
        let docs: UserData[];

        if (prefix !== null) {
            const q = query(usersRef, orderBy(`stats.${prefix}Wins`, "desc"), limit(50));
            const snap = await getDocs(q);
            docs = snap.docs.map(d => d.data() as UserData);
        } else {
            const snap = await getDocs(usersRef);
            docs = snap.docs.map(d => d.data() as UserData)
                .sort((a, b) => {
                    const wA = a.stats.cWins + a.stats.sWins + a.stats.qWins + a.stats.pWins;
                    const wB = b.stats.cWins + b.stats.sWins + b.stats.qWins + b.stats.pWins;
                    return wB - wA;
                });
        }

        const MIN_GAMES = 5;
        const entries: LeaderboardEntry[] = [];

        for (const u of docs) {
            if (entries.length >= 10) break;

            let games: number, wins: number;
            if (prefix) {
                games = u.stats[`${prefix}Games`];
                wins  = u.stats[`${prefix}Wins`];
            } else {
                games = u.stats.cGames + u.stats.sGames + u.stats.qGames + u.stats.pGames;
                wins  = u.stats.cWins  + u.stats.sWins  + u.stats.qWins  + u.stats.pWins;
            }

            if (games < MIN_GAMES) continue;

            const winRate = Math.round((wins / games) * 100);
            entries.push({
                rank:       entries.length + 1,
                username:   u.username,
                title:      u.title,
                pictureId:  u.pictureId,
                value:      winRate,
                valueLabel: `${winRate}%`,
                secondary:  `${wins} wins`,
            });
        }

        return entries;
    }

    const window = getDateWindow(timeTab)!;
    const gameDayKey = modeToGameDayKey(modeTab);
    const snap = await getDocs(collection(db, "users"));

    const ranked = snap.docs
        .map(d => {
            const u = d.data() as UserData;
            const days = countDaysInWindow(u.gameDays ?? {}, gameDayKey, window);

            let games: number, wins: number;
            if (prefix) {
                games = u.stats[`${prefix}Games`];
                wins  = u.stats[`${prefix}Wins`];
            } else {
                games = u.stats.cGames + u.stats.sGames + u.stats.qGames + u.stats.pGames;
                wins  = u.stats.cWins  + u.stats.sWins  + u.stats.qWins  + u.stats.pWins;
            }
            const winRate = games >= 5 ? Math.round((wins / games) * 100) : 0;
            return { u, days, winRate, wins, games };
        })
        .filter(({ days, games }) => days > 0 && games >= 5)
        .sort((a, b) => b.winRate - a.winRate || b.days - a.days)
        .slice(0, 10);

    return ranked.map(({ u, winRate, wins }, i) => ({
        rank:       i + 1,
        username:   u.username,
        title:      u.title,
        pictureId:  u.pictureId,
        value:      winRate,
        valueLabel: `${winRate}%`,
        secondary:  `${wins} wins`,
    }));
}

async function fetchMastery(
    modeTab: ModeTab,
    timeTab: TimeTab
): Promise<LeaderboardEntry[]> {
    const prefix = MODE_PREFIX[modeTab];
    const window = getDateWindow(timeTab);

    const usersRef = collection(db, "users");
    let docs: UserData[];

    if (prefix !== null && timeTab === "All-time") {
        const q = query(usersRef, orderBy(`stats.${prefix}NoHintWins`, "desc"), limit(10));
        const snap = await getDocs(q);
        docs = snap.docs.map(d => d.data() as UserData);
    } else {
        const snap = await getDocs(usersRef);
        docs = snap.docs.map(d => d.data() as UserData);
    }

    type Candidate = { u: UserData; noHint: number; wins: number };
    const candidates: Candidate[] = docs.map(u => {
        let noHint: number, wins: number;
        if (prefix) {
            noHint = u.stats[`${prefix}NoHintWins`];
            wins   = u.stats[`${prefix}Wins`];
        } else {
            noHint = u.stats.cNoHintWins + u.stats.sNoHintWins + u.stats.qNoHintWins + u.stats.pNoHintWins;
            wins   = u.stats.cWins       + u.stats.sWins       + u.stats.qWins       + u.stats.pWins;
        }

        if (window) {
            const gameDayKey = modeToGameDayKey(modeTab);
            const days = countDaysInWindow(u.gameDays ?? {}, gameDayKey, window);
            if (days === 0) return null;
        }

        return { u, noHint, wins };
    }).filter((x): x is Candidate => x !== null && x.noHint > 0);

    candidates.sort((a, b) => b.noHint - a.noHint);
    const top = candidates.slice(0, 10);

    return top.map(({ u, noHint, wins }, i) => {
        const rate = wins > 0 ? Math.round((noHint / wins) * 100) : 0;
        return {
            rank:       i + 1,
            username:   u.username,
            title:      u.title,
            pictureId:  u.pictureId,
            value:      noHint,
            valueLabel: String(noHint),
            secondary:  `${rate}% of wins`,
        };
    });
}

export async function fetchLeaderboard(
    boardTab: BoardTab,
    modeTab:  ModeTab,
    timeTab:  TimeTab
): Promise<LeaderboardEntry[]> {
    try {
        if (boardTab === "Dedication") return await fetchDedication(modeTab, timeTab);
        if (boardTab === "Skill")      return await fetchSkill(modeTab, timeTab);
        if (boardTab === "Mastery")    return await fetchMastery(modeTab, timeTab);
        return [];
    } catch (err) {
        console.error("fetchLeaderboard error:", err);
        return [];
    }
}