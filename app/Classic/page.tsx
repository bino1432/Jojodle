"use client"
import Header from "@/components/UniversalComponents/Header"
import MinigameSelector from "@/components/UniversalComponents/MinigameSelector";
import HintButtons from "@/components/UniversalComponents/HintButtons";
import PartClueIcon from "@/public/images/icon/PartClue-Icon.svg";
import TechniqueClueIcon from "@/public/images/icon/TechniqueClue-Icon.svg";
import { Archivo } from "next/font/google";
import { useEffect, useState } from "react";
import classicJson from "@/data/json/classic.en.json";
import CharacterCard from "@/components/ClassicComponents/CharacterCard";
import ClassicInfoComponent from "@/components/ClassicComponents/ClassicInfoComponent";
import Footer from "@/components/UniversalComponents/Footer";
import SearchInput from "@/components/UniversalComponents/SearchInput";
import GuessedInfo from "@/components/UniversalComponents/GuessedInfo";
import { motion } from 'framer-motion';
import WinAnimation from "@/components/UniversalComponents/WinAnimation";

const archivoBold = Archivo({
  subsets: ['latin'],
  weight: "700",
},);

interface Character {
  ID: number;
  Name: string;
  Gender: string;
  Height: string;
  Age: number | null;
  Nationality: string;
  Affiliation: string;
  Occupation: string;
  StandType: string;
  Debut: string;
  Technique: string;
  Image: string;
}

export default function Classicpage() {

  useEffect(() => {
    const randomCharacter = classicJson[Math.floor(Math.random() * classicJson.length)]
    setCorrectCharacter(randomCharacter);
    console.log(attempts)
  }, []);

  const [correctCharacter, setCorrectCharacter] = useState<Character | null>(null);

  useEffect(() => {
    console.log(correctCharacter)
  }, [correctCharacter]);

  const [attempts, setAttempts] = useState(0);
  const [currentHint, setCurrentHint] = useState("");
  const [side, setSide] = useState("");
  const [isLeft, setIsLeft] = useState(false);
  const [isRight, setIsRight] = useState(false);
  const [isMiddle, setIsMiddle] = useState(false);
  const [triedCharacter, setTriedCharacter] = useState<number[]>([]);
  const [winGame, setWinGame] = useState(false);

  const receiveHintAndSideFromComponent = (hint: string, side: string, left: boolean, middle: boolean, right: boolean) => {
    setCurrentHint(hint);
    setSide(side);
    setIsLeft(left);
    setIsRight(right);
    setIsMiddle(middle);
  };

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

  return (
    <main>
      <div>
        <WinAnimation winGame={winGame} />
        <Header />
        <MinigameSelector />
        <div className={`flex flex-col p-4 bg-[var(--Background)] items-center text-center mt-4 max-w-98 rounded-lg m-auto ${triedCharacter.length !== 0 ? "gap-4" : ""}`}>
          <p className={`${archivoBold.className} text-xl text-white leading-5.5 text-balance`}>Take a guess at today's JoJo's Bizarre Adventure character!</p>
          <div className="flex gap-4">
            {triedCharacter.length !== 0 && correctCharacter ? (<>
              <HintButtons title="Part Clue" guesses={3} image={PartClueIcon} attempts={attempts} hint={correctCharacter.Debut} receiveHintAndSide={receiveHintAndSideFromComponent} side={"left"} isRounded={isRight} winGame={winGame} />
              <HintButtons title="Technique Clue" guesses={6} image={TechniqueClueIcon} attempts={attempts} hint={correctCharacter.Technique} receiveHintAndSide={receiveHintAndSideFromComponent} side={"right"} isRounded={isLeft} winGame={winGame} />
            </>) : null
            }
          </div>
          <p className={currentHint == "" ? "hidden" : `${archivoBold.className} text-white p-2 w-90 bg-[var(--Primary)] rounded-lg
          ${side == "left" ? "rounded-tl-none" : "rounded-tr-none"}`} id="fadeIn">{currentHint}</p>
        </div>
        <div>
          <SearchInput receiveId={receiveCharacterIdFromComponent} characterJson={classicJson} winGame={winGame} />
        </div>
        {triedCharacter.length !== 0 ? (<div className={`${archivoBold.className} flex justify-center gap-[8] text-[var(--White)] text-center mt-4`}>
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
                correctCharacter && (
                  <motion.div
                    key={characterData.ID}
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                  >
                    <CharacterCard
                    key={characterData.ID}
                    imageUrl={characterData.Image}
                    name={characterData.Name}
                    gender={characterData.Gender}
                    height={characterData.Height}
                    age={characterData.Age}
                    nationality={characterData.Nationality}
                    affiliation={characterData.Affiliation}
                    occupation={characterData.Occupation}
                    standType={characterData.StandType}
                    debutPart={characterData.Debut}
                    character={correctCharacter}
                    winGame={receiveIfWinGame} />
                  </motion.div>
                )
              );
            })}
          </div>
        )}
        <ClassicInfoComponent />

        {winGame && correctCharacter && (
          <GuessedInfo name={correctCharacter.Name} image={correctCharacter.Image} tries={attempts} />
        )}

        <Footer />

      </div>
    </main >
  );
}