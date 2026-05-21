import { Archivo } from "next/font/google";
import Image from "next/image";
import starIcon from "@/public/images/icon/Star-Icon.svg"

const archivoBold = Archivo({
    subsets: ['latin'],
    weight: "700",
},);

export default function Footer(){
    return(
        <footer>
            <div className="bg-[var(--Background)] flex justify-center items-center max-w-xs min-h-24 m-auto mb-8 flex-col gap-2 rounded-xl">
                <Image src={starIcon} alt="Star-Icon" className="w-8"></Image>
                <p className={`${archivoBold.className} text-white text-sm`}>Design by <a href="https://github.com/theguidev" target="_blank" className="text-[var(--Primary)]">@theguidev</a> · Code by <a href="https://github.com/bino1432" target="_blank" className="text-[var(--Primary)]">@bino1432</a></p>
                <p className={`${archivoBold.className} text-white text-sm`}>JoJodle · 2026</p>
            </div>
        </footer>
    )
}