"use client"
import Header from "@/components/UniversalComponents/Header";
import MinigameSelector from "@/components/UniversalComponents/MinigameSelector";
import HintButtons from "@/components/UniversalComponents/HintButtons";
import { Archivo } from "next/font/google";
import PartClueIcon from "@/public/images/icon/PartClue-Icon.svg";
import TypeClueIcon from "@/public/images/icon/TypeClue-Icon.svg";
import TechniqueClueIcon from "@/public/images/icon/TechniqueClue-Icon.svg";
import { useEffect, useState } from "react";
import standJson from "@/data/json/stand.en.json";
import Footer from "@/components/UniversalComponents/Footer";
import SearchInput from "@/components/UniversalComponents/SearchInput";
import StandCard from "@/components/StandComponents/StandCard";

const archivoBold = Archivo({
    subsets: ['latin'],
    weight: "700",
},);

interface StandInfo {
    Stand: string,
    "Stand Type": string,
    Debut: string,
    Technique: string
}

interface Character {
    ID: number;
    Name: string;
    Stands: StandInfo[],
    Image: string;
}

export default function Standpage() {

    useEffect(() => {
        const randomCharacter = standJson[Math.floor(Math.random() * standJson.length)]
        setCorrectCharacter(randomCharacter);
        setShowedStand(verifyStand(randomCharacter.Stands));
        console.log(attempts)
    }, []);

    const [correctCharacter, setCorrectCharacter] = useState<Character | null>(null);

    useEffect(() => {
        console.log(correctCharacter)
    }, [correctCharacter]);

    const [triedCharacter, setTriedCharacter] = useState<number[]>([]);
    const [attempts, setAttempts] = useState(0);
    const [winGame, setWinGame] = useState(false);
    const [correctStandIndex, setCorrectStandIndex] = useState(0)
    const [showedStand, setShowedStand] = useState("");
    const [currentHint, setCurrentHint] = useState("");
    const [side, setSide] = useState("");
    const [isLeft, setIsLeft] = useState(false);
    const [isRight, setIsRight] = useState(false);
    const [isMiddle, setIsMiddle] = useState(false);

    const receiveCharacterIdFromComponent = (id: number) => {
        setTriedCharacter([...triedCharacter, id]);
        if (triedCharacter.length !== 0) {
            setAttempts(attempts + 1);
        }
        console.log(attempts);
        console.log(triedCharacter);
    }

    const receiveIfWinGame = (win: boolean) => {
        setWinGame(win);
    }

    const reciveHintAndSideFromComponent = (hint: string, side: string, left: boolean, middle: boolean, right: boolean) => {
        setCurrentHint(hint);
        setSide(side);
        setIsMiddle(!middle);
        if(middle){
            setIsLeft(!left);
            setIsRight(!right);
        } else {
            setIsLeft(left);
            setIsRight(right);
        }
    };

    const verifyStand = (stand: StandInfo[]) => {
        if (stand.length === 1) {
            console.log(stand[0])
            return stand[0].Stand
        } else {
            const index = Math.floor(Math.random() * stand.length)
            const randStand = stand[index]
            setCorrectStandIndex(index)
            console.log(stand[index])
            return randStand.Stand
        }
    }

    return (
        <main>
            <div>
                <Header />
                <MinigameSelector />
                <div className="flex flex-col p-4 bg-[var(--Background)] items-center text-center mt-4  size-fit rounded-lg m-auto gap-4">
                    <p className={`${archivoBold.className} text-xl text-white leading-5.5 text-balance`}>Take a guess at today's JoJo's <br/> Bizarre Adventure Stand user!</p>
                    <p className={`${archivoBold.className} text-2xl text-white leading-6.5`}>「{showedStand}」</p>
                    <div className="flex gap-4">
                        {triedCharacter.length !== 0 && correctCharacter ? (<>
                            <HintButtons title="Type Clue" guesses={3} image={TypeClueIcon} attempts={attempts} hint={correctCharacter.Stands[correctStandIndex]["Stand Type"]} receiveHintAndSide={reciveHintAndSideFromComponent} side={"left"} isRounded={isRight} />
                            <HintButtons title="Part Clue" guesses={5} image={PartClueIcon} attempts={attempts} hint={correctCharacter.Stands[correctStandIndex].Debut} receiveHintAndSide={reciveHintAndSideFromComponent} side={"middle"} isRounded={isMiddle} />
                            <HintButtons title="Technique Clue" guesses={7} image={TechniqueClueIcon} attempts={attempts} hint={correctCharacter.Stands[correctStandIndex].Technique} receiveHintAndSide={reciveHintAndSideFromComponent} side={"right"} isRounded={isLeft} />
                        </>) : null
                        }
                    </div>
                    <p className={currentHint == "" ? "hidden" : `${archivoBold.className} text-white p-2 w-137 bg-[var(--Primary)] rounded-lg
                    ${side == "left" ? "rounded-tl-none" : side == "right" ? "rounded-tr-none" : "rounded-t-none"}`} id="fadeIn">{currentHint}</p>
                </div>

                <div>
                    <SearchInput receiveId={receiveCharacterIdFromComponent} characterJson={standJson} winGame={winGame} />
                </div>

                <div className="mt-4">
                    {triedCharacter.length !== 0 && (
                        <div className="flex flex-col-reverse relative">
                            {triedCharacter.map((id) => {
                                const characterData = standJson.find(char => char.ID === id);
                                if (!characterData) return null

                                    return (
                                    correctCharacter && (
                                        <StandCard
                                            key={characterData.ID}
                                            imageUrl={characterData.Image}
                                            name={characterData.Name}
                                            character={correctCharacter}
                                            attemptedCharacter={characterData}
                                            showedStand={showedStand}
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