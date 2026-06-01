// lib/dailyAnswerServices.ts
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

export async function getTodayAnswers(): Promise<DailyAnswer | null> {
    try {
        const today = new Date().toLocaleDateString("en-CA", {
            timeZone: "America/Sao_Paulo",
        });
        const ref = doc(db, "daily_answers", today);
        const snapshot = await getDoc(ref);

        if (!snapshot.exists()) return null;
        return snapshot.data() as DailyAnswer;
    } catch (err) {
        console.error("getTodayAnswers error:", err);
        return null;
    }
}