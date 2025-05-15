"use client"
import Header from "@/components/Header"
import MinigameSelector from "@/components/MinigameSelector";
import TipsButtons from "@/components/TipsButtons";
import PartClueIcon from "@/public/images/icon/PartClue-Icon.png";
import TechniqueClueIcon from "@/public/images/icon/TechniqueClue-Icon.png";
import { Archivo } from "next/font/google";
import { useState } from "react";

const archivoBold = Archivo({
  subsets: ['latin'],
  weight: "700",
},);

export default function Classicpage() {
  const [attempts, setAttempts] = useState(0);
  
  return (
    <main>
      <div>
        <Header />
        <MinigameSelector />
        <div className="flex flex-col p-4 bg-[var(--Background)] items-center text-center mt-4 max-w-98 rounded-lg m-auto gap-4">
          <p className={`${archivoBold.className} text-xl text-white text-balance`}>Take a guess at today's Jojo's Bizarre Adventure character!</p>
          <div className="flex gap-4">
            <TipsButtons title="Part Clue" guesses={3} image={PartClueIcon} attempts={attempts} />
            <TipsButtons title="Technique Clue" guesses={6} image={TechniqueClueIcon} attempts={attempts}/>
          </div>
        </div>
        <button className="cursor-pointer p-2 bg-[var(--Accent)] text-white" onClick={() => setAttempts(attempts + 1)}>PRA TESTAR O BUTAO DAS DICKS</button>
      </div>
    </main>
  );
}