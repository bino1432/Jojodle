import { NextResponse } from "next/server";
import { garantirPersonagemDoDia, getDataHojeBRT } from "@/lib/daily-character";

export async function GET() {
  const hoje = getDataHojeBRT();
  const doc = await garantirPersonagemDoDia(hoje);

  return NextResponse.json({
    data: hoje,
    poseIndex: doc.poseIndex,
    quoteIndex: doc.quoteIndex,
    standIndex: doc.standIndex,
  });
}