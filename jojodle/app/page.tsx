import Header from "@/components/Header";
import MenuButton from "@/components/MenuButton";
import Footer from "@/components/Footer";
import starIcon from "@/public/images/icon/Star-Icon.svg"

export default function Home() {
  return (
    <main>
      <Header />
      <div className="p-4 flex flex-col gap-4">
        <MenuButton page={"/Classic"} img={starIcon} title={"Classic"} alt={"Classic Icon"}></MenuButton>
      </div>
      <Footer />
    </main>
  );
}
