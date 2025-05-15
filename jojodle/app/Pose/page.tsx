"use client"
import Header from "@/components/Header";
import MinigameSelector from "@/components/MinigameSelector";
import { Archivo } from "next/font/google";
import PartClueIcon from "@/public/images/icon/PartClue-Icon.png";
import TechniqueClueIcon from "@/public/images/icon/TechniqueClue-Icon.png";
import TipsButtons from "@/components/TipsButtons";
import Image from "next/image";
import GiornoImage from "@/public/images/image/Giorno-Image.png";
import { useState } from "react";

const archivoBold = Archivo({
  subsets: ['latin'],
  weight: "700",
},);

export default function Posepage() {
    const [attempts, setAttempts] = useState(0);
    return (
        <main>
            <div>
                <Header />
                <MinigameSelector />
                <div className="flex flex-col p-4 bg-[var(--Background)] items-center text-center mt-4 max-w-138 rounded-lg m-auto gap-4">
                    <p className={`${archivoBold.className} text-xl text-white text-balance`}>Take a guess at today's Jojo's Bizarre Adventure character!</p>
                    <div className="p-4 bg-[var(--Accent)] rounded-lg">
                        <Image src={GiornoImage} alt={"Pose Image"} className="blur-[50px]"/>
                    </div>
                    <div className="flex gap-4">
                        <TipsButtons title="Part Clue" guesses={3} image={PartClueIcon} attempts={attempts}/>
                        <TipsButtons title="Technique Clue" guesses={6} image={TechniqueClueIcon} attempts={attempts}/>
                    </div>
                </div>
            </div>
        </main>
    );
}