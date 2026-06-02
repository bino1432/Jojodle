import Header from "@/components/UniversalComponents/Header";
import MenuButton from "@/components/HomeComponents/MenuButton";
import Footer from "@/components/UniversalComponents/Footer";

export default function Home() {
  return (
    <main>
      <Header />
      <div className="p-4 flex flex-col gap-4">
        <MenuButton page={"/Classic"} title={"Classic"}></MenuButton>
        <MenuButton page={"/Stand"} title={"Stand"}></MenuButton>
        <MenuButton page={"/Quote"} title={"Quote"}></MenuButton>
        <MenuButton page={"/Pose"} title={"Pose"}></MenuButton>
      </div>
      <Footer />
    </main>
  );
}