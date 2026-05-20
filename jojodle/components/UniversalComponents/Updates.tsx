"use client";
import CloseIcon from '@/public/images/icon/Close-Icon';
import StarIcon from '@/public/images/icon/Star-Icon';
import StandIcon from '@/public/images/icon/Stand-Icon';
import QuoteIcon from '@/public/images/icon/Quote-Icon';
import PoseIcon from '@/public/images/icon/Pose-Icon';
import { Archivo } from 'next/font/google';
import { usePathname } from "next/navigation"

const archivoRegular = Archivo({
    subsets: ['latin'],
    weight: "400",
},);

const archivoBold = Archivo({
    subsets: ['latin'],
    weight: "700",
},);

export default function Help() {
    const pathname = usePathname();

    return (
        <div className='flex flex-col gap-4 p-4 bg-[var(--Background)] rounded-lg mt-4 m-auto p-4 g-2 w-210'>
            <div className='flex justify-between'>
                <h2 className={`${archivoBold.className} text-[var(--White)] text-2xl`}>「Smooth Operators」</h2>
                <CloseIcon />
            </div>
            <p className={`${archivoRegular.className} text-[var(--White)] text-xl`}>The game’s latest updates.</p>
            <div className='flex flex-col gap-2'>
                <p className={`${archivoBold.className} text-[var(--White)] text-xl leading-5.5`}>May 11, 2026</p>
                <h3 className={`${archivoBold.className} text-[var(--White)] text-2xl`}>JoJodle translation news.</h3>
                <p className={`${archivoRegular.className} text-[var(--White)] text-xl leading-5.5`}>We want to make JoJodle playable in as many languages as possible. By translating JoJodle into another language, you’ll help improve the game’s experience to everyone.</p>
                <p className={`${archivoRegular.className} text-[var(--White)] text-xl leading-5.5`}>If you're interested in joining this project, please fill out our <span className='text-[var(--Primary)] cursor-pointer'>Google Form</span> to apply as a translator.</p>
            </div>
            <div className='flex flex-col gap-2'>
                <p className={`${archivoBold.className} text-[var(--White)] text-xl leading-5.5`}>February 17, 2026</p>
                <h3 className={`${archivoBold.className} text-[var(--White)] text-2xl`}>The JOJOLands update.</h3>
                <div className='flex gap-2'>
                    <StarIcon correctPath="/Classic" currentPath="/Classic" size="small"/>
                    <h3 className={`${archivoBold.className} text-[var(--Primary)] text-2xl`}>Classic</h3>
                </div>
                <p className={`${archivoRegular.className} text-[var(--White)] text-xl leading-5.5`}>Added Acca Howler, Barbara Ann Joestar, Bobby Jean, Charming Man, Dragona Joestar, Jodio Joestar, Latrato, Lulu, Meryl Mei Qi, Paco Laburantes, Rohan Kishibe (TJJL), Usagi Alohaoe and Wild Cat Size.</p>
                <div className='flex gap-2'>
                    <StandIcon correctPath="/Classic" currentPath="/Classic" size="small"/>
                    <h3 className={`${archivoBold.className} text-[var(--Primary)] text-2xl`}>Stand</h3>
                </div>
                <p className={`${archivoRegular.className} text-[var(--White)] text-xl leading-5.5`}>Added Bobby Jean, Charming Man, Dragona Joestar, Jodio Joestar, Lulu, Paco Laburantes, Usagi Alohaoe and Wild Cat Size’s Stands.</p>
                <div className='flex gap-2'>
                    <QuoteIcon correctPath="/Classic" currentPath="/Classic" size="small"/>
                    <h3 className={`${archivoBold.className} text-[var(--Primary)] text-2xl`}>Quote</h3>
                </div>
                <p className={`${archivoRegular.className} text-[var(--White)] text-xl leading-5.5`}>Added Dragona Joestar and Jodio Joestar’s quotes.</p>
                <div className='flex gap-2'>
                    <PoseIcon correctPath="/Classic" currentPath="/Classic" size="small"/>
                    <h3 className={`${archivoBold.className} text-[var(--Primary)] text-2xl`}>Pose</h3>
                </div>
                <p className={`${archivoRegular.className} text-[var(--White)] text-xl leading-5.5`}>Added Barbara-Ann Joestar, Dragona Joestar, Jodio Joestar, Meryl Mei-Qi, Paco Labulantes and Wild Cat Size images.</p>
            </div>
        </div>
    )
}