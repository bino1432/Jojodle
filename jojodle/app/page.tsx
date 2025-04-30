import Header from "@/components/Header";
import MenuButton from "@/components/MenuButton";
import starIcon from "@/public/images/icon/Star-Icon.png"

export default function Home() {
  return (
    <main>
      <Header/>
      <MenuButton img={starIcon} title={"Classic"} alt={"Classic Icon"}></MenuButton>
    </main>
  );
}
