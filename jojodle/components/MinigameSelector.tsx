"use client"
import Link from "next/link"
import Image from "next/image"
import ClassicIcon from "@/public/images/icon/Star-Icon.svg"
import StandIcon from "@/public/images/icon/Stand-Icon.svg"
import QuoteIcon from "@/public/images/icon/Quote-Icon.svg"
import PoseIcon from "@/public/images/icon/Pose-Icon.svg"
import { usePathname } from "next/navigation"

export default function MinigameSelector() {
    const pathname = usePathname();

    return(
        <div className="flex gap-2">
            <Link className="" href={"/Classic"}>
                <Image className={`${pathname === '/Classic' ? 'text-blue-500' : 'text-blue-500' }`} src={ClassicIcon} alt="Classic Icon" />
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