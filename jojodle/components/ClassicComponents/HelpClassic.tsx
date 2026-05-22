"use client";
import CloseIcon from '@/public/images/icon/Close-Icon';
import StarIcon from '@/public/images/icon/Star-Icon';
import { Archivo } from 'next/font/google';

const archivoRegular = Archivo({
    subsets: ['latin'],
    weight: "400",
},);

const archivoBold = Archivo({
    subsets: ['latin'],
    weight: "700",
},);

export default function HelpClassic() {
    return (
        <div className='flex flex-col gap-4 p-4 bg-[var(--Background)] rounded-lg mt-4 m-auto p-4 g-2 w-210'>
            <div className='flex justify-between'>
                <div className='flex flex-row gap-2'>
                    <h2 className={`${archivoBold.className} text-[var(--White)] text-2xl`}>How to Play</h2>
                    <StarIcon correctPath="/Classic" currentPath="/Classic" size="small"/>
                    <h2 className={`${archivoBold.className} text-[var(--Primary)] text-2xl`}>Classic</h2>
                </div>
                <CloseIcon />
            </div>
            <p className={`${archivoRegular.className} text-[var(--White)] text-xl`}>How to play the game.</p>
            <div className='flex flex-col gap-2'>
                <p className={`${archivoRegular.className} text-[var(--White)] text-xl leading-5.5`}><span className='text-[var(--Primary)]cursor-pointer'>JoJodle</span> is a web game inspired by <span className='text-[var(--Primary)] cursor-pointer'>LoLdle.</span> where you guess characters from <span className='text-[var(--Primary)] cursor-pointer'>JoJo’s Bizarre Adventure</span>.</p>
                <p className={`${archivoRegular.className} text-[var(--White)] text-xl leading-5.5`}>The game has four unique modes and they update daily. Discover more about each mode on their dedicated pages.</p>
            </div>
            <div className='flex flex-col gap-2'>
                <p className={`${archivoRegular.className} text-[var(--White)] text-xl leading-5.5`}>The method of playing <span className='text-[var(--Primary)] cursor-pointer'>JoJodle</span> changes depending on which mode you are. Some things are true for every mode, such as:</p>
                <ul>
                    <li>Every mode gives you clues, from which you have to guess today’s character.</li>
                    <li>Tips will be available as you guess.</li>
                </ul>
                <p className={`${archivoRegular.className} text-[var(--White)] text-xl leading-5.5`}>More information will be given on the help section of each game mode.</p>
            </div>
            <div className='flex flex-col gap-2'>
                <p className={`${archivoRegular.className} text-[var(--White)] text-xl leading-5.5`}>If you have any other questions or want to report a bug, please feel free to contact us on the official <span className='text-[var(--Primary)] cursor-pointer'>GitHub</span> page for <span className='text-[var(--Primary)] cursor-pointer'>JoJodle</span>. .</p>
            </div>
            <div className='w-full flex justify-end'>
                <button className={`${archivoBold.className} p-2 rounded-sm cursor-pointer text-[var(--White)] text-xl bg-[var(--Primary)] hover:bg-[var(--Light)]`}>Okay, Master!</button>
            </div>
        </div>
    )
}