import Header from "@/components/Header"
import MinigameSelector from "@/components/MinigameSelector";
import TipsComponenet from "@/components/TipsComponent";

export default function Classicpage() {
  return (
    <main>
      <div>
        <Header />
        <MinigameSelector />
        <TipsComponenet title="Take a guess Jojo"/>
      </div>
    </main>
  );
}