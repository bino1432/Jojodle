import Header from "@/components/Header";
import MinigameSelector from "@/components/MinigameSelector";
import TipsButtons from "@/components/TipsButtons";
import { Archivo } from "next/font/google";
import PartClueIcon from "@/public/images/icon/PartClue-Icon.png";
import TypeClueIcon from "@/public/images/icon/TypeClue-Icon.png";
import TechniqueClueIcon from "@/public/images/icon/TechniqueClue-Icon.png";

const archivoBold = Archivo({
  subsets: ['latin'],
  weight: "700",
},);

export default function Standpage() {
    return (
        <main>
            <div>
                <Header />
                <MinigameSelector />
                <div className="flex flex-col p-4 bg-[var(--Background)] items-center text-center mt-4 max-w-145 rounded-lg m-auto gap-4">
                    <p className={`${archivoBold.className} text-xl text-white text-balance`}>Take a guess at today's Jojo's Bizarre Adventure Stand user!</p>
                    <p className={`${archivoBold.className} text-2xl text-white`}>「Dirty Deeds Done Dirt Cheap」</p>
                    <div className="flex gap-4">
                        <TipsButtons title="Type Clue" guesses={3} image={TypeClueIcon}/>
                        <TipsButtons title="Part Clue" guesses={5} image={PartClueIcon}/>
                        <TipsButtons title="Technique Clue" guesses={7} image={TechniqueClueIcon}/>
                    </div>
                </div>
            </div>
        </main>
    );
}