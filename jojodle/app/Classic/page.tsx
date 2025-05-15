import Header from "@/components/Header"
import MinigameSelector from "@/components/MinigameSelector";
import TipsButtons from "@/components/TipsButtons";
import PartClueIcon from "@/public/images/icon/PartClue-Icon.png"

export default function Classicpage() {
  return (
    <main>
      <div>
        <Header />
        <MinigameSelector />
        <div>
          <p>Take a guess at today's Jojo's Bizarre Adventure character!</p>
          <TipsButtons title="Part Clue" guesses={1} image={PartClueIcon}/>
        </div>
      </div>
    </main>
  );
}