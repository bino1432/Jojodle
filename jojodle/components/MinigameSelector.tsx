import Link from "next/link"
import Image from "next/image"
import ClassicIcon from "@/public/images/icon/Star-Icon.png"
import StandIcon from "@/public/images/icon/Stand-Icon.png"
import QuoteIcon from "@/public/images/icon/Quote-Icon.png"
import PoseIcon from "@/public/images/icon/Pose-Icon.png"

export default function MinigameSelector() {
    return(
        <div>
            <Link href={"/Classic"}>
                <Image src={ClassicIcon} alt="Classic Icon" />
            </Link>
            <Link href={"/Stand"}>
                <Image src={StandIcon} alt="Stand Icon" />
            </Link>
            <Link href={"/Quote"}>
                <Image src={QuoteIcon} alt="Quote Icon" />
            </Link>
            <Link href={"/Pose"}>
                <Image src={PoseIcon} alt="Pose Icon" />
            </Link>
        </div>
    )
}