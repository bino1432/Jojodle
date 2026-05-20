import { Archivo } from "next/font/google";
import UpArrow from "@/public/images/icon/Arrows/UpArrow.svg";
import DownArrow from "@/public/images/icon/Arrows/DownArrow.svg";
import Image from 'next/image'

const archivoBold = Archivo({
    subsets: ['latin'],
    weight: "700",
},);

const archivoLight = Archivo({
    subsets: ['latin'],
    weight: "300",
},);

export default function ClassicInfoComponent() {
    return (
        <div className="text-[var(--White)] flex flex-col items-center gap-2 my-4 p-[16] bg-[var(--Background)] m-0 max-w-[348] m-auto rounded-lg">
            <h1 className={`${archivoBold.className} text-xl`}>Color Info</h1>
            <div className="flex gap-2 text-center">
                <div className="flex flex-col gap-2">
                    <div className="w-[56] h-[56] bg-[var(--Correct)] rounded-sm"></div>
                    <p className={`${archivoLight.className}`}>Correct</p>
                </div>
                <div className="flex flex-col gap-2">
                    <div className="w-[56] h-[56] bg-[var(--Partial)] rounded-sm"></div>
                    <p className={`${archivoLight.className} leading-4.5`}>Partially<br />Correct</p>
                </div>
                <div className="flex flex-col gap-2">
                    <div className="w-[56] h-[56] bg-[var(--Wrong)] rounded-sm"></div>
                    <p className={`${archivoLight.className}`}>Wrong</p>
                </div>
                <div className="flex flex-col gap-2">
                    <div className="w-[56] h-[56] bg-[var(--Wrong)] rounded-sm flex items-center justify-center">
                        <Image src={DownArrow} alt={"Down Arrow"} />
                    </div>
                    <p className={`${archivoLight.className} leading-4.5`}>Before/<br />Less</p>
                </div>
                <div className="flex flex-col gap-2">
                    <div className="w-[56] h-[56] bg-[var(--Wrong)] rounded-sm flex items-center justify-center">
                        <Image src={UpArrow} alt={"Up Arrow"} />
                    </div>
                    <p className={`${archivoLight.className} leading-4.5`}>After/<br />More</p>
                </div>
            </div>
        </div>
    )
}