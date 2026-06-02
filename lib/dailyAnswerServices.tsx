import { db } from "@/lib/firebase";
import { doc, getDoc } from "firebase/firestore";

export interface DailyAnswer {
    classic:    number;
    stand:      number;
    standIndex: number;
    quote:      number;
    quoteIndex: number;
    pose:       number;
    poseIndex:  number;
}

function todayKeyBRT(): string {
    return new Date().toLocaleDateString("en-CA", {
        timeZone: "America/Sao_Paulo",
    });
}

export async function getTodayAnswers(): Promise<DailyAnswer | null> {
    return getAnswersByDate(todayKeyBRT());
}

export async function getAnswersByDate(date: string): Promise<DailyAnswer | null> {
    try {
        const ref = doc(db, "daily_answers", date);
        const snapshot = await getDoc(ref);
        if (!snapshot.exists()) return null;
        return snapshot.data() as DailyAnswer;
    } catch (err) {
        console.error("getAnswersByDate error:", err);
        return null;
    }
}