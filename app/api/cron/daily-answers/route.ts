import { NextResponse } from "next/server";
import { getAdminDb } from "@/lib/firebase-admin";

import classicData from "@/data/json/classic.en.json";
import standData   from "@/data/json/stand.en.json";
import quoteData   from "@/data/json/quote.en.json";
import poseData    from "@/data/json/pose.en.json";

function randomIndex(length: number): number {
    return Math.floor(Math.random() * length);
}

export async function GET(request: Request) {
    const authHeader = request.headers.get("authorization");
    if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    try {
        const today = new Date().toLocaleDateString("en-CA", {
            timeZone: "America/Sao_Paulo",
        });

        const classicChar = classicData[randomIndex(classicData.length)];

        const standChar = standData[randomIndex(standData.length)];
        const standIndex = randomIndex(standChar.Stands.length);

        const quoteChar = quoteData[randomIndex(quoteData.length)];
        const quoteIndex = randomIndex(quoteChar.Quotes.length);

        const poseChar = poseData[randomIndex(poseData.length)];
        const poseTokens = poseChar.Image_ID.split(",").map(t => t.trim()).filter(Boolean);
        const poseIndex = randomIndex(poseTokens.length);

        const answers = {
            classic:    classicChar.ID,
            stand:      standChar.ID,
            standIndex,
            quote:      quoteChar.ID,
            quoteIndex,
            pose:       poseChar.ID,
            poseIndex,
        };

        const adminDb = getAdminDb();
        await adminDb.collection("daily_answers").doc(today).set(answers);

        console.log(`Daily answers set for ${today}:`, answers);
        return NextResponse.json({ success: true, date: today, answers });
    } catch (err) {
        console.error("Cron error:", err);
        return NextResponse.json({ error: "Failed to set daily answers" }, { status: 500 });
    }
}
