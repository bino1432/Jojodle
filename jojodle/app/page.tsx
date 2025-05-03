import Header from "@/components/Header";
import MenuButton from "@/components/MenuButton";
import Footer from "@/components/Footer";
import starIcon from "@/public/images/icon/Star-Icon.png"
import standIcon from "@/public/images/icon/Stand-Icon.png"
import quoteIcon from "@/public/images/icon/Quote-Icon.png"
import poseIcon from "@/public/images/icon/Pose-Icon.png"

export default function Home() {
  return (
    <main>
      <Header/>
      <div className="p-4 flex flex-col gap-4">
          <MenuButton page={"Classicpage"} img={starIcon} title={"Classic"} alt={"Classic Icon"}></MenuButton>
          <MenuButton page={"Classicpage"} img={standIcon} title={"Stand"} alt={"Stand Icon"}></MenuButton>
          <MenuButton page={"Classicpage"} img={quoteIcon} title={"Quote"} alt={"Quote Icon"}></MenuButton>
          <MenuButton page={"Classicpage"} img={poseIcon} title={"Pose"} alt={"Pose Icon"}></MenuButton>
      </div>
      <Footer/>
    </main>
  );
}
