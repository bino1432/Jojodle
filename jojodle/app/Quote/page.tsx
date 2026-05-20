"use client"
import Header from "@/components/UniversalComponents/Header";
import MinigameSelector from "@/components/UniversalComponents/MinigameSelector";
import HintButtons from "@/components/UniversalComponents/HintButtons";
import { Archivo } from "next/font/google";
import PartClueIcon from "@/public/images/icon/PartClue-Icon.svg";
import TypeClueIcon from "@/public/images/icon/TypeClue-Icon.svg";
import TechniqueClueIcon from "@/public/images/icon/TechniqueClue-Icon.svg";
import { useEffect, useState } from "react";
import quoteJson from "@/data/json/quote.en.json";
import Footer from "@/components/UniversalComponents/Footer";
import SearchInput from "@/components/UniversalComponents/SearchInput";
import QuoteCard from "@/components/QuoteComponents/QuoteCard";

const archivoBold = Archivo({
  subsets: ['latin'],
  weight: "700",
},);

interface Character {
    ID: number;
    Name: string;
    Quote: string;
    Part: string;
    Target: string;
    Image: string;
}

export default function Quotepage() {

    useEffect(() => {
    const randomCharacter = quoteJson[Math.floor(Math.random() * quoteJson.length)]
    setCorrectCharacter(randomCharacter);
    setShowedQuote(verifyQuote(randomCharacter.Quote));
    console.log(attempts)
    }, []);
    
    const [correctCharacter, setCorrectCharacter] = useState<Character | null>(null);

    useEffect(() => {
        console.log(correctCharacter)
    }, [correctCharacter]);

    const [triedCharacter, setTriedCharacter] = useState<number[]>([]);
    const [attempts, setAttempts] = useState(0);
    const [winGame, setWinGame] = useState(false);
    const [showedQuote, setShowedQuote] = useState("");

    const reciveCharacterIdFromComponent = (id: number) => {
    setTriedCharacter([...triedCharacter, id]);
      if (triedCharacter.length !== 0) {
        setAttempts(attempts + 1);
      }
      console.log(attempts);
      console.log(triedCharacter);
    }

    const reciveIfWinGame = (win: boolean) => {
        setWinGame(win);
    }

    const verifyQuote = (quote: string) => {
        const quoteList = quote.split(",")
        if(quoteList.length === 1) {
            return quote;
        } else {
            return quoteList[Math.floor(Math.random() * quoteList.length)];
        }
    }

    return (
        <main>
            <div>
                <Header />
                <MinigameSelector />
                <div className="flex flex-col p-4 bg-[var(--Background)] items-center text-center mt-4 max-w-138 rounded-lg m-auto gap-4">
                    <p className={`${archivoBold.className} text-xl text-white leading-5.5 text-balance`}>Take a guess at today’s JoJo’s Bizarre Adventure quote!</p>
                    <p className={`${archivoBold.className} text-2xl text-white leading-6.5`}>「{showedQuote}」</p>
                </div>

                <div>
                    <SearchInput reciveId={reciveCharacterIdFromComponent} characterJson={quoteJson} winGame={winGame} />
                </div>

                <div className="mt-4">
                    {correctCharacter && (
                        <QuoteCard
                            imageUrl={correctCharacter.Image}
                            name={correctCharacter.Name}
                            character={correctCharacter}
                            winGame={reciveIfWinGame}
                        />
                    )}
                </div>

                <Footer />
            </div>
        </main>
    );
}