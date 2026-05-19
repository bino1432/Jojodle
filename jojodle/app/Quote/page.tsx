"use client"
import Header from "@/components/UniversalComponents/Header";
import MinigameSelector from "@/components/UniversalComponents/MinigameSelector";
import HintButtons from "@/components/UniversalComponents/HintButtons";
import { Archivo } from "next/font/google";
import PartClueIcon from "@/public/images/icon/PartClue-Icon.svg";
import TargetClueIcon from "@/public/images/icon/TargetClue-Icon.svg";
import { useState } from "react";

const archivoBold = Archivo({
  subsets: ['latin'],
  weight: "700",
},);

export default function Quotepage() {
    const [attempts, setAttempts] = useState(0);
    
    return (
        <main>
            <div>
                <Header />
                <MinigameSelector />
                <div className="flex flex-col p-4 bg-[var(--Background)] items-center text-center mt-4 max-w-138 rounded-lg m-auto gap-4">
                    <p className={`${archivoBold.className} text-xl text-white text-balance`}>Take a guess at today's Jojo's Bizarre Adventure character!</p>
                    <p className={`${archivoBold.className} text-2xl text-white text-balance`}>“Can you remember how many loaves of bread you've eaten in your entire life?”</p>
                    <div className="flex gap-4">
                    </div>
                </div>
            </div>
        </main>
    );
}