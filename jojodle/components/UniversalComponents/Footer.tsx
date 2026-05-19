import { Archivo } from "next/font/google";
import Image from "next/image";
import starIcon from "@/public/images/icon/Star-Icon.svg"

const archivoSemibold = Archivo({
    subsets: ['latin'],
    weight: "600",
},);

export default function Footer(){
    return(
        <footer>
            <div className="bg-[var(--Background)] flex justify-center items-center max-w-xs min-h-24 m-auto mb-8 flex-col gap-1 rounded-xl">
                <Image src={starIcon} alt="Star-Icon" className="w-8"></Image>
                <p className={`${archivoSemibold.className} text-white text-sm`}>Design by <a href="https://github.com/theguidev" target="_blank" className="text-[var(--Primary)]">@theguidev</a> · Code by <a href="https://github.com/bino1432" target="_blank" className="text-[var(--Primary)]">@bino1432</a></p>
                <p className={`${archivoSemibold.className} text-white text-sm`}>JoJodle · 2024</p>
            </div>
        </footer>
    )
}