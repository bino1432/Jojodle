"use client"
import Header from "@/components/Header"
import MinigameSelector from "@/components/MinigameSelector";
import HintButtons from "@/components/HintButtons";
import PartClueIcon from "@/public/images/icon/PartClue-Icon.png";
import TechniqueClueIcon from "@/public/images/icon/TechniqueClue-Icon.png";
import { Archivo } from "next/font/google";
import { useEffect, useState } from "react";
import classicJson from "@/data/json/classicMinigame.json";
import InputCharacter from "@/components/InputCharacter";

const archivoBold = Archivo({
  subsets: ['latin'],
  weight: "700",
},);

let correctCharacter = {
  ID: 0,
  Name: "",
  Gender: "",
  Height: "",
  Age: 0,
  Nationality: "",
  Affiliation: "",
  Occupation: "",
  StandType: "",
  Debut: "",
  Technique: "",
  Difficulty: "",
  Image: ""
}

export default function Classicpage() {
  useEffect(() => {
    correctCharacter = classicJson[Math.floor(Math.random() * (4 - 0 + 1)) + 0]
    console.log(correctCharacter)
  }, []);

  const [attempts, setAttempts] = useState(0);
  const [currentHint, setCurrentHint] = useState("");
  const [side, setSide] = useState("");
  const [isLeft, setIsLeft] = useState(false);
  const [isRight, setIsRight] = useState(false);
  const [triedCharacter, setTriedCharacter] = useState<number[]>([]);

  const reciveHintAndSideFromComponent = (hint: string, side: string, left: boolean, right: boolean) => {
    setCurrentHint(hint);
    setSide(side);
    setIsLeft(left);
    setIsRight(right);
  };

  const reciveCharacterIdFromComponent = (id: number) => {
    setTriedCharacter([...triedCharacter, id]);
    console.log(triedCharacter);
  }

  return (
    <main>
      <div>
        <Header />
        <MinigameSelector />
        <div className="flex flex-col p-4 bg-[var(--Background)] items-center text-center mt-4 max-w-98 rounded-lg m-auto gap-4">
          <p className={`${archivoBold.className} text-xl text-white text-balance`}>Take a guess at today's Jojo's Bizarre Adventure character!</p>
          <div className="flex gap-4">
            <HintButtons title="Part Clue" guesses={3} image={PartClueIcon} attempts={attempts} hint={correctCharacter.Debut} reciveHintAndSide={reciveHintAndSideFromComponent} side={"left"} isRounded={isRight} />
            <HintButtons title="Technique Clue" guesses={6} image={TechniqueClueIcon} attempts={attempts} hint={correctCharacter.Technique} reciveHintAndSide={reciveHintAndSideFromComponent} side={"right"} isRounded={isLeft} />
          </div>
          <p className={currentHint == "" ? "hidden" : `${archivoBold.className} text-white p-2 w-full bg-[var(--Primary)] rounded-lg
          ${side == "left" ? "rounded-tl-none" : "rounded-tr-none"}`} id="fadeIn">{currentHint}</p>
        </div>
        <div>
          <InputCharacter reciveId={reciveCharacterIdFromComponent} characterJson={classicJson}/>
        </div>
        <button className="cursor-pointer p-2 bg-[var(--Accent)] text-white" onClick={() => setAttempts(attempts + 1)}>PRA TESTAR O BUTAO DAS DICKS</button>
      </div>
    </main>
  );
}
