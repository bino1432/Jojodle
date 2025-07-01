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
import CharacterCard from "@/components/CharacterCard";
import ClassicInfoComponent from "@/components/ClassicInfoComponent";

const archivoBold = Archivo({
  subsets: ['latin'],
  weight: "700",
},);

export default function Classicpage() {

  useEffect(() => {
    const randomCharacter = classicJson[Math.floor(Math.random() * (5 - 0 + 1)) + 0]
    setCorrectCharacter(randomCharacter);
    console.log(attempts)
  }, []);

  const [correctCharacter, setCorrectCharacter] = useState({
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
  });

  useEffect(() => {
    console.log(correctCharacter)
  }, [correctCharacter]);

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
    if (triedCharacter.length !== 0) {
      setAttempts(attempts + 1);
    }
    console.log(attempts);
    console.log(triedCharacter);
  }

  return (
    <main>
      <div>
        <Header />
        <MinigameSelector />
        <div className={`flex flex-col p-4 bg-[var(--Background)] items-center text-center mt-4 max-w-98 rounded-lg m-auto ${triedCharacter.length !== 0 ? "gap-4" : ""}`}>
          <p className={`${archivoBold.className} text-xl text-white text-balance`}>Take a guess at today's Jojo's Bizarre Adventure character!</p>
          <div className="flex gap-4">
            {triedCharacter.length !== 0 ? (<>
              <HintButtons title="Part Clue" guesses={3} image={PartClueIcon} attempts={attempts} hint={correctCharacter.Debut} reciveHintAndSide={reciveHintAndSideFromComponent} side={"left"} isRounded={isRight} />
              <HintButtons title="Technique Clue" guesses={6} image={TechniqueClueIcon} attempts={attempts} hint={correctCharacter.Technique} reciveHintAndSide={reciveHintAndSideFromComponent} side={"right"} isRounded={isLeft} />
            </>) : null
            }
          </div>
          <p className={currentHint == "" ? "hidden" : `${archivoBold.className} text-white p-2 w-full bg-[var(--Primary)] rounded-lg
          ${side == "left" ? "rounded-tl-none" : "rounded-tr-none"}`} id="fadeIn">{currentHint}</p>
        </div>
        <div>
          <InputCharacter reciveId={reciveCharacterIdFromComponent} characterJson={classicJson} />
        </div>
        {triedCharacter.length !== 0 ? (<div className="flex justify-center gap-[8] text-[var(--White)] text-center mt-4">
          <p className="min-w-[96] p-2 rounded-lg bg-[var(--Background)]">Character</p>
          <p className="min-w-[96] p-2 rounded-lg bg-[var(--Background)]">Gender</p>
          <p className="min-w-[96] p-2 rounded-lg bg-[var(--Background)]">Height</p>
          <p className="min-w-[96] p-2 rounded-lg bg-[var(--Background)]">Age</p>
          <p className="min-w-[96] p-2 rounded-lg bg-[var(--Background)]">Nationality</p>
          <p className="min-w-[96] p-2 rounded-lg bg-[var(--Background)]">Affiliation</p>
          <p className="min-w-[96] p-2 rounded-lg bg-[var(--Background)]">Occupation</p>
          <p className="min-w-[96] p-2 rounded-lg bg-[var(--Background)]">Stand Type</p>
          <p className="min-w-[96] p-2 rounded-lg bg-[var(--Background)]">Debut Part</p>
        </div>) : null
        }
        {triedCharacter.length !== 0 && (
          <div className="flex flex-col-reverse relative">
            {triedCharacter.map((id) => {
              const characterData = classicJson.find(char => char.ID === id);
              if (!characterData) return null;

              return (
                <CharacterCard
                  key={characterData.ID}
                  imageUrl={characterData.Image}
                  gender={characterData.Gender}
                  height={characterData.Height}
                  age={characterData.Age}
                  nationality={characterData.Nationality}
                  affiliation={characterData.Affiliation}
                  occupation={characterData.Occupation}
                  standType={characterData.StandType}
                  debutPart={characterData.Debut}
                  character={correctCharacter}
                />
              );
            })}
          </div>
        )}
        <ClassicInfoComponent />
      </div>
    </main >
  );
}
