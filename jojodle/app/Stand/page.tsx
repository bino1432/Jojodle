"use client"
import Header from "@/components/UniversalComponents/Header";
import MinigameSelector from "@/components/UniversalComponents/MinigameSelector";
import HintButtons from "@/components/UniversalComponents/HintButtons";
import { Archivo } from "next/font/google";
import PartClueIcon from "@/public/images/icon/PartClue-Icon.png";
import TypeClueIcon from "@/public/images/icon/TypeClue-Icon.png";
import TechniqueClueIcon from "@/public/images/icon/TechniqueClue-Icon.png";
import { useEffect, useState } from "react";
import standJson from "@/data/json/stand.en.json";
import Footer from "@/components/UniversalComponents/Footer";

const archivoBold = Archivo({
  subsets: ['latin'],
  weight: "700",
},);

interface Character {
    ID: number;
    Name: string;
    Stand: string;
    "Stand Type": string;
    Debut: string;
    Technique: string
}

export default function Standpage() {

    useEffect(() => {
    const randomCharacter = standJson[Math.floor(Math.random() * (269 - 0 + 1)) + 0]
    setCorrectCharacter(randomCharacter);
    console.log(attempts)
    }, []);

    const [correctCharacter, setCorrectCharacter] = useState<Character | null>(null);
    const [attempts, setAttempts] = useState(0);

    return (
        <main>
            <div>
                <Header />
                <MinigameSelector />
                <div className="flex flex-col p-4 bg-[var(--Background)] items-center text-center mt-4 max-w-145 rounded-lg m-auto gap-4">
                    <p className={`${archivoBold.className} text-xl text-white text-balance`}>Take a guess at today's Jojo's Bizarre Adventure Stand user!</p>
                    <p className={`${archivoBold.className} text-2xl text-white`}>「Dirty Deeds Done Dirt Cheap」</p>
                    <div className="flex gap-4">
                        {

                        }
                    </div>
                </div>
                <Footer />
            </div>
        </main>
    );
}