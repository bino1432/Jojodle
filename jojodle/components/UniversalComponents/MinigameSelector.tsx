"use client"
import Link from "next/link"
import ClassicIcon from "@/public/images/icon/Star-Icon"
import StandIcon from "@/public/images/icon/Stand-Icon"
import QuoteIcon from "@/public/images/icon/Quote-Icon"
import PoseIcon from "@/public/images/icon/Pose-Icon"
import { usePathname } from "next/navigation"

export default function MinigameSelector() {
    const pathname = usePathname();

    return(
        <div className="flex gap-2 p-8 bg-[var(--Background)] max-w-70 rounded-lg m-auto mt-4">
            <Link href={"/Classic"}>
                <ClassicIcon correctPath="/Classic" currentPath={pathname}/>
            </Link>
            <Link href={"/Stand"}>
                <StandIcon correctPath="/Stand" currentPath={pathname}/>
            </Link>
            <Link href={"/Quote"}>
                <QuoteIcon correctPath="/Quote" currentPath={pathname}/>
            </Link>
            <Link href={"/Pose"}>
                <PoseIcon correctPath="/Pose" currentPath={pathname}/>
            </Link>
        </div>
    )
}