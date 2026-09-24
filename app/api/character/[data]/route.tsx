import { NextResponse } from "next/server";
import { adminDb } from "@/lib/firebase-admin";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ data: string }> }
) {
  const { data } = await params;
  const url = new URL(request.url);
  const revelar = url.searchParams.get("revelar") === "true";

  const doc = await adminDb.collection("dailyCharacters").doc(data).get();

  if (!doc.exists) {
    return NextResponse.json({ error: "sem personagem para esta data" }, { status: 404 });
  }

  const dados = doc.data()!;

  if (revelar) {
    // usado só depois que o jogador JÁ jogou aquele dia (ou já acertou/desistiu)
    return NextResponse.json({
      data,
      classic: dados.classic,
      pose: dados.pose,
      poseIndex: dados.poseIndex,
      quote: dados.quote,
      quoteIndex: dados.quoteIndex,
      stand: dados.stand,
      standIndex: dados.standIndex,
    });
  }

  // sem revelar: só os índices, igual à rota "today"
  return NextResponse.json({
    data,
    poseIndex: dados.poseIndex,
    quoteIndex: dados.quoteIndex,
    standIndex: dados.standIndex,
  });
}