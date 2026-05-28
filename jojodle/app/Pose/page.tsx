"use client"
import Header from "@/components/UniversalComponents/Header";
import MinigameSelector from "@/components/UniversalComponents/MinigameSelector";
import { Archivo } from "next/font/google";
import PartClueIcon from "@/public/images/icon/PartClue-Icon.svg";
import TechniqueClueIcon from "@/public/images/icon/TechniqueClue-Icon.svg";
import HintButtons from "@/components/UniversalComponents/HintButtons";
import Image from "next/image";
import { useEffect, useState } from "react";
import poseJson from "@/data/json/pose.en.json";
import Footer from "@/components/UniversalComponents/Footer";
import SearchInput from "@/components/UniversalComponents/SearchInput";
import PoseCard from "@/components/PoseComponents/PoseCard";
import { motion } from 'framer-motion';

const archivoBold = Archivo({
    subsets: ['latin'],
    weight: "700",
},);

interface Character {
    ID: number;
    Name: string;
    Image_ID: string;
    Technique: string;
    Part: string;
    Image: string;
}

const buildPoseImageCandidates = (imageId: string) => {
    const tokens = imageId
        .split(",")
        .map((token) => token.trim())
        .filter(Boolean);

    if (tokens.length === 0) {
        return ["/images/poses/POSE_1_1.png"];
    }

    return [`/images/poses/${tokens[0]}`];
};

export default function Classicpage() {

    useEffect(() => {
        const randomCharacter = poseJson[Math.floor(Math.random() * poseJson.length)]
        setCorrectCharacter(randomCharacter);
        console.log(attempts)
    }, []);

    const [correctCharacter, setCorrectCharacter] = useState<Character | null>(null);
    const [poseImageSrc, setPoseImageSrc] = useState<string>("/");

    useEffect(() => {
        if (!correctCharacter) {
            return;
        }

        const [firstCandidate] = buildPoseImageCandidates(correctCharacter.Image_ID);
        setPoseImageSrc(firstCandidate);
    }, [correctCharacter]);

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

    const maxRevealGuesses = 12;
    const revealProgress = Math.min(triedCharacter.length, maxRevealGuesses) / maxRevealGuesses;
    const imageBlur = winGame ? 0 : 20 * (1 - revealProgress);
    const overlayOpacity = winGame ? 0 : 0.2 * (1 - revealProgress);

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
                <Header />
                <MinigameSelector />
                <div className="flex flex-col p-4 bg-[var(--Background)] items-center text-center mt-4 max-w-138 rounded-lg m-auto gap-4">
                    <p className={`${archivoBold.className} text-xl text-white leading-5.5 text-balance`}>Take a guess at today’s JoJo’s Bizarre Adventure pose!</p>
                    <div className="bg-[var(--Accent)] size-fit p-4 rounded-lg overflow-hidden">
                        {correctCharacter ? (
                            <div
                                className="relative select-none overflow-hidden rounded-lg"
                                style={{
                                    width: 420,
                                    maxWidth: '100%',
                                    userSelect: 'none',
                                }}
                                onContextMenu={(event) => event.preventDefault()}
                            >
                                <Image
                                    src={poseImageSrc}
                                    alt={`${correctCharacter.Name} pose`}
                                    width={420}
                                    height={420}
                                    draggable={false}
                                    onDragStart={(e) => e.preventDefault()}
                                    onMouseDown={(e) => e.preventDefault()}
                                    className="block w-full h-auto mx-auto"
                                    style={{
                                        filter: `blur(${imageBlur}px)`,
                                        userSelect: 'none',
                                        touchAction: 'none'
                                    }}
                                />
                                <div
                                    className="absolute inset-0 rounded-lg pointer-events-none"
                                    style={{
                                        backgroundColor: `rgba(185, 139, 167, ${overlayOpacity})`,
                                    }}
                                />
                            </div>
                        ) : (
                            <div className="w-72 h-72 bg-slate-800/20 rounded-lg" />
                        )}
                    </div>
                    <div className
                        ="flex gap-4">
                        {triedCharacter.length !== 0 && correctCharacter ? (<>
                            <HintButtons title="Part Clue" guesses={3} image={PartClueIcon} attempts={attempts} hint={correctCharacter ? correctCharacter.Part : ""} receiveHintAndSide={receiveHintAndSideFromComponent} side={"left"} isRounded={isRight} winGame={winGame} />
                            <HintButtons title="Target Clue" guesses={6} image={TechniqueClueIcon} attempts={attempts} hint={correctCharacter ? correctCharacter.Technique : ""} receiveHintAndSide={receiveHintAndSideFromComponent} side={"right"} isRounded={isLeft} winGame={winGame} />
                        </>) : null
                        }
                    </div>
                    <p className={currentHint == "" ? "hidden" : `${archivoBold.className} text-white p-2 w-90 bg-[var(--Primary)] rounded-lg
                ${side == "left" ? "rounded-tl-none" : "rounded-tr-none"}`} id="fadeIn">{currentHint}</p>
                </div>

                <div>
                    <SearchInput receiveId={receiveCharacterIdFromComponent} characterJson={poseJson} winGame={winGame} />
                </div>

                <div className="mt-4">
                    {triedCharacter.length !== 0 && (
                        <div className="flex flex-col-reverse relative">
                            {triedCharacter.map((id) => {
                                const characterData = poseJson.find(char => char.ID === id);
                                if (!characterData) return null

                                return (
                                    correctCharacter && (
                                        <motion.div
                                            key={characterData.ID}
                                            initial={{ opacity: 0, y: -20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ duration: 0.5, ease: "easeOut" }}
                                        >
                                            <PoseCard
                                                key={characterData.ID}
                                                imageUrl={characterData.Image}
                                                name={characterData.Name}
                                                character={correctCharacter}
                                                winGame={receiveIfWinGame}
                                            />
                                        </motion.div>
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