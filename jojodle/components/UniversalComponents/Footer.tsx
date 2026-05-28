import { Archivo } from "next/font/google";
import StarIcon from "@/public/images/icon/Star-Icon"

const archivoBold = Archivo({
    subsets: ['latin'],
    weight: "700",
},);

export default function Footer(){
    return(
        <footer>
            <div className="bg-[var(--Background)] flex justify-center items-center w-fit min-h-24 p-4 m-auto mb-8 flex-col gap-2 rounded-xl">
                <StarIcon correctPath="/Classic" currentPath="/Classic"/>
                <p className={`${archivoBold.className} text-white text-regular leading-4.5`}>Design by <a href="https://github.com/theguidev" target="_blank" className="text-[var(--Primary)]">@theguidev</a> · Code by <a href="https://github.com/bino1432" target="_blank" className="text-[var(--Primary)]">@bino1432</a></p>
                <p className={`${archivoBold.className} text-white text-regular leading-4.5`}>JoJodle · 2026</p>
            </div>
        </footer>
    )
}