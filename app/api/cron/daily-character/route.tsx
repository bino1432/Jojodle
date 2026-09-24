import { NextResponse } from "next/server";
import { garantirPersonagemDoDia, getDataHojeBRT } from "@/lib/daily-character";

export async function GET(request: Request) {
  const authHeader = request.headers.get("authorization");
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }

  const hoje = getDataHojeBRT();
  const doc = await garantirPersonagemDoDia(hoje);

  return NextResponse.json({ ok: true, data: hoje, doc });
}