import Header from "@/components/Header";
import MenuButton from "@/components/MenuButton";
import Footer from "@/components/Footer";
import starIcon from "@/public/images/icon/Star-Icon.svg"
import standIcon from "@/public/images/icon/Stand-Icon.svg"
import quoteIcon from "@/public/images/icon/Quote-Icon.svg"
import poseIcon from "@/public/images/icon/Pose-Icon.svg"

export default function Home() {
  return (
    <main>
      <Header />
      <div className="p-4 flex flex-col gap-4">
        <MenuButton page={"/Classic"} img={starIcon} title={"Classic"} alt={"Classic Icon"}></MenuButton>
        <MenuButton page={"/Stand"} img={standIcon} title={"Stand"} alt={"Stand Icon"}></MenuButton>
        <MenuButton page={"/Quote"} img={quoteIcon} title={"Quote"} alt={"Quote Icon"}></MenuButton>
        <MenuButton page={"/Pose"} img={poseIcon} title={"Pose"} alt={"Pose Icon"}></MenuButton>
      </div>
      <Footer />
    </main>
  );
}
