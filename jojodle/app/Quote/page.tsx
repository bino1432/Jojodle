import Header from "@/components/Header";
import MinigameSelector from "@/components/MinigameSelector";
import TipsButtons from "@/components/TipsButtons";
import { Archivo } from "next/font/google";
import PartClueIcon from "@/public/images/icon/PartClue-Icon.png";
import TargetClueIcon from "@/public/images/icon/TargetClue-Icon.png";

const archivoBold = Archivo({
  subsets: ['latin'],
  weight: "700",
},);

export default function Quotepage() {
    return (
        <main>
            <div>
                <Header />
                <MinigameSelector />
                <div className="flex flex-col p-4 bg-[var(--Background)] items-center text-center mt-4 max-w-138 rounded-lg m-auto gap-4">
                    <p className={`${archivoBold.className} text-xl text-white text-balance`}>Take a guess at today's Jojo's Bizarre Adventure character!</p>
                    <p className={`${archivoBold.className} text-2xl text-white text-balance`}>“Can you remember how many loaves of bread you've eaten in your entire life?”</p>
                    <div className="flex gap-4">
                        <TipsButtons title="Part Clue" guesses={3} image={PartClueIcon}/>
                        <TipsButtons title="Target Clue" guesses={6} image={TargetClueIcon}/>
                    </div>
                </div>
            </div>
        </main>
    );
}