"use client";
import Header from "@/components/UniversalComponents/Header";
import MinigameSelector from "@/components/UniversalComponents/MinigameSelector";
import HintButtons from "@/components/UniversalComponents/HintButtons";
import { Archivo } from "next/font/google";
import PartClueIcon from "@/public/images/icon/PartClue-Icon.svg";
import TargeClueIcon from "@/public/images/icon/TargetClue-Icon.svg";
import { useEffect, useState } from "react";
import quoteJsonRaw from "@/data/json/quote.en.json";
import Footer from "@/components/UniversalComponents/Footer";
import SearchInput from "@/components/UniversalComponents/SearchInput";
import QuoteCard from "@/components/QuoteComponents/QuoteCard";

const quoteJson = quoteJsonRaw as Character[];
const archivoBold = Archivo({
    subsets: ["latin"],
    weight: "700",
});

interface QuoteItem {
    Quote: string;
    Part: string;
    Target: string;
}

interface Character {
    ID: number;
    Name: string;
    Quotes: QuoteItem[];
    Image: string;
}

export default function Quotepage() {
    useEffect(() => {
        const randomCharacter = quoteJson[Math.floor(Math.random() * quoteJson.length)];
        setCorrectCharacter(randomCharacter);
        const randomQuoteItem = randomCharacter.Quotes[Math.floor(Math.random() * randomCharacter.Quotes.length)];
        setShowedQuote(randomQuoteItem.Quote);
        setSelectedQuote(randomQuoteItem);
        console.log(attempts);
    }, []);

    const [correctCharacter, setCorrectCharacter] = useState<Character | null>(
        null,
    );

    useEffect(() => {
        console.log(correctCharacter);
    }, [correctCharacter]);

    const [triedCharacter, setTriedCharacter] = useState<number[]>([]);
    const [attempts, setAttempts] = useState(0);
    const [currentHint, setCurrentHint] = useState("");
    const [side, setSide] = useState("");
    const [isLeft, setIsLeft] = useState(false);
    const [isRight, setIsRight] = useState(false);
    const [isMiddle, setIsMiddle] = useState(false);
    const [winGame, setWinGame] = useState(false);
    const [showedQuote, setShowedQuote] = useState("");
    const [selectedQuote, setSelectedQuote] = useState<QuoteItem | null>(null);

    const receiveCharacterIdFromComponent = (id: number) => {
        setTriedCharacter([...triedCharacter, id]);
        if (triedCharacter.length !== 0) {
        setAttempts(attempts + 1);
        }
        console.log(attempts);
        console.log(triedCharacter);
    };

    const receiveIfWinGame = (win: boolean) => {
        setWinGame(win);
    };

    const verifyQuote = (quotes: QuoteItem[]) => {
    const randomQuote = quotes[Math.floor(Math.random() * quotes.length)].Quote;
    return randomQuote;
    };

    const receiveHintAndSideFromComponent = (hint: string, side: string, left: boolean, middle: boolean, right: boolean) => {
        setCurrentHint(hint);
        setSide(side);
        setIsLeft(left);
        setIsRight(right);
        setIsMiddle(middle);
    };

    return (
        <main>
        <div>
            <Header />
            <MinigameSelector />
            <div className="flex flex-col p-4 bg-[var(--Background)] items-center text-center mt-4 max-w-138 rounded-lg m-auto gap-4">
                <p className={`${archivoBold.className} text-xl text-white leading-5.5 text-balance`}>Take a guess at today’s JoJo’s Bizarre Adventure quote!</p>
                <p className={`${archivoBold.className} text-2xl text-white leading-6.5`}>“{showedQuote}”</p>
                <div className="flex gap-4">
                    {triedCharacter.length !== 0 && correctCharacter ? (<>
                        <HintButtons title="Part Clue" guesses={3} image={PartClueIcon} attempts={attempts} hint={selectedQuote ? selectedQuote.Part : ""} receiveHintAndSide={receiveHintAndSideFromComponent} side={"left"} isRounded={isRight} winGame={winGame} />
                        <HintButtons title="Target Clue" guesses={6} image={TargeClueIcon} attempts={attempts} hint={selectedQuote ? selectedQuote.Target : ""} receiveHintAndSide={receiveHintAndSideFromComponent} side={"right"} isRounded={isLeft} winGame={winGame} />
                        </>) : null
                    }
                </div>
                <p className={currentHint == "" ? "hidden" : `${archivoBold.className} text-white p-2 w-90 bg-[var(--Primary)] rounded-lg
                ${side == "left" ? "rounded-tl-none" : "rounded-tr-none"}`} id="fadeIn">{currentHint}</p>
            </div>

            <div>
                <SearchInput receiveId={receiveCharacterIdFromComponent} characterJson={quoteJson} winGame={winGame} />
            </div>

                <div className="mt-4">
                    {triedCharacter.length !== 0 && (
                        <div className="flex flex-col-reverse relative">
                            {triedCharacter.map((id) => {
                                const characterData = quoteJson.find(char => char.ID === id);
                                if(!characterData) return null

                                return (
                                    correctCharacter && (
                                        <QuoteCard
                                            key={characterData.ID}
                                            imageUrl={characterData.Image}
                                            name={characterData.Name}
                                            character={correctCharacter}
                                            winGame={receiveIfWinGame}
                                        />
                                    )
                                )
                            })}
                        </div>
                    )}
                </div>

            <Footer />
        </div>
        </main>
    );
}