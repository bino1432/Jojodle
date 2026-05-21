import { Archivo } from "next/font/google";
import Image from "next/image";
import standIcon from "@/public/images/icon/Stand-Icon.svg"
import CharacterImage from "@/public/images/icon/character/VA/VA_3.png"

const archivoBold = Archivo({
    subsets: ['latin'],
    weight: "700",
},);

const archivoRegular = Archivo({
    subsets: ['latin'],
    weight: "400",
},);

export default function YesterdaysCharacer(){
    return(
        <div className="bg-[var(--Background)] flex justify-center items-center size-fit p-4 m-auto mb-4 flex-col gap-2 rounded-xl">
            <div className=" flex justify-center items-center flex-col gap-2 ">
                <p className={`${archivoBold.className} text-white text-center text-2xl leading-5.5`}>Yesterday's character was:</p>
            </div>
            <div className="flex justify-center items-center gap-2 rounded-lg">
                <Image className="max-w-20 rounded-lg" src={CharacterImage} alt="" />
                <div className="flex flex-col justify-left items-left">
                    <p className={`${archivoBold.className} text-white text-xl leading-5.5`}>Leone Abbacchio</p>
                    <p className={`${archivoRegular.className} text-white text-base leading-4.5`}>Number #1</p>
                </div>
            </div>
        </div>
    )
}