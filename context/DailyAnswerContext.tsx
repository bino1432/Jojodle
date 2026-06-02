"use client";
import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { getTodayAnswers, DailyAnswer } from "@/lib/dailyAnswerServices";

interface DailyAnswerContextType {
    answers: DailyAnswer | null;
    loading: boolean;
}

const DailyAnswerContext = createContext<DailyAnswerContextType | undefined>(undefined);

export function DailyAnswerProvider({ children }: { children: ReactNode }) {
    const [answers, setAnswers] = useState<DailyAnswer | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getTodayAnswers().then(data => {
            setAnswers(data);
            setLoading(false);
        });
    }, []);

    return (
        <DailyAnswerContext.Provider value={{ answers, loading }}>
            {children}
        </DailyAnswerContext.Provider>
    );
}

export function useDailyAnswer(): DailyAnswerContextType {
    const context = useContext(DailyAnswerContext);
    if (!context) {
        throw new Error("useDailyAnswer must be used inside a <DailyAnswerProvider>");
    }
    return context;
}