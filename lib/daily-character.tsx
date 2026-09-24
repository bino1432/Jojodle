import { adminDb } from "./firebase-admin";
import classicData from "@/data/json/classic.en.json";
import poseData from "@/data/json/pose.en.json";
import quoteData from "@/data/json/quote.en.json";
import standData from "@/data/json/stand.en.json";

export interface DailyDoc {
  classic: number;
  pose: number;
  poseIndex: number;
  quote: number;
  quoteIndex: number;
  stand: number;
  standIndex: number;
  createdAt: Date;
}

interface Personagem {
  ID: number;
  variacoes?: number;
}

// cada nível aponta pro seu próprio JSON
const NIVEIS = [
  { key: "classic", data: classicData as Personagem[], hasIndex: false },
  { key: "pose", data: poseData as Personagem[], hasIndex: true },
  { key: "quote", data: quoteData as Personagem[], hasIndex: true },
  { key: "stand", data: standData as Personagem[], hasIndex: true },
] as const;

function pickRandom<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

async function escolherIdSemRepetir(
  campo: string,
  pool: Personagem[]
): Promise<Personagem> {
  // olha o histórico só desse campo específico, pra não repetir personagem nesse minigame
  const snap = await adminDb
    .collection("dailyCharacters")
    .orderBy("createdAt", "desc")
    .limit(Math.max(pool.length - 1, 1))
    .get();

  const usadosRecentes = new Set(
    snap.docs.map((d) => d.data()[campo]).filter((v) => v !== undefined)
  );

  const disponiveis = pool.filter((p) => !usadosRecentes.has(p.ID));
  return pickRandom(disponiveis.length > 0 ? disponiveis : pool);
}

export async function garantirPersonagemDoDia(data: string): Promise<DailyDoc> {
  const docRef = adminDb.collection("dailyCharacters").doc(data);
  const existing = await docRef.get();

  if (existing.exists) {
    return existing.data() as DailyDoc;
  }

  const novoDoc: any = { createdAt: new Date() };

  for (const nivel of NIVEIS) {
    const escolhido = await escolherIdSemRepetir(nivel.key, nivel.data);
    novoDoc[nivel.key] = escolhido.ID;

    if (nivel.hasIndex) {
      const limite = escolhido.variacoes ?? 1;
      novoDoc[`${nivel.key}Index`] = Math.floor(Math.random() * limite);
    }
  }

  await docRef.set(novoDoc);
  return novoDoc as DailyDoc;
}

export function getDataHojeBRT(): string {
  const agora = new Date();
  const offsetBRT = -3 * 60;
  const localTime = new Date(agora.getTime() + (offsetBRT - agora.getTimezoneOffset()) * 60000);
  return localTime.toISOString().slice(0, 10);
}