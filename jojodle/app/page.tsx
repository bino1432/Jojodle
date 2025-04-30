import MenuButton from "@/components/MenuButton";
import starIcon from "@/public/images/icon/Star-Icon.png"

export default function Home() {
  return (
    <MenuButton img={starIcon} title={"Classic"} alt={"Classic Icon"}></MenuButton>
  );
}
