"use client";
import CloseIcon from '@/public/images/icon/Close-Icon';
import { Archivo } from 'next/font/google';

const archivoRegular = Archivo({
    subsets: ['latin'],
    weight: "400",
},);

const archivoBold = Archivo({
    subsets: ['latin'],
    weight: "700",
},);

export default function Help({ onClose }: { onClose: () => void }) {
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60" onClick={onClose}>
            <div className="flex flex-col gap-4 p-4 bg-[var(--Background)] rounded-lg w-210 max-h-[90vh] overflow-y-auto"  onClick={e => e.stopPropagation()}>
                <div className='flex justify-between'>
                    <h2 className={`${archivoBold.className} text-[var(--White)] text-2xl`}>「Paisley Park」</h2>
                    <button onClick={onClose} aria-label="Close">
                        <CloseIcon />
                    </button>
                </div>
                <p className={`${archivoRegular.className} text-[var(--White)] text-xl`}>How to play the game.</p>
                <div className='flex flex-col gap-2'>
                    <p className={`${archivoRegular.className} text-[var(--White)] text-xl leading-5.5`}><a className='text-[var(--Primary)]' href='/'>JoJodle</a> is a web game inspired by <a className='text-[var(--Primary)]' href='https://loldle.net/'>LoLdle</a> where you guess characters from <a className='text-[var(--Primary)]' href='https://loldle.net/'>JoJo's Bizarre Adventure</a>.</p>
                    <p className={`${archivoRegular.className} text-[var(--White)] text-xl leading-5.5`}>The game has four unique modes and they update daily. Discover more about each mode on their dedicated pages.</p>
                </div>
                <div className='flex flex-col gap-2'>
                    <p className={`${archivoRegular.className} text-[var(--White)] text-xl leading-5.5`}>The method of playing <a className='text-[var(--Primary)]' href='/'>JoJodle</a> changes depending on which mode you are. Some things are true for every mode, such as:</p>
                    <ul className={`${archivoRegular.className} list-disc text-[var(--White)] text-xl leading-5.5 ml-8`}>
                        <li>Every mode gives you clues, from which you have to guess today’s character.</li>
                        <li>Tips will be available as you guess.</li>
                    </ul>
                    <p className={`${archivoRegular.className} text-[var(--White)] text-xl leading-5.5`}>More information will be given on the help section of each game mode.</p>
                </div>
                <div className='flex flex-col gap-2'>
                    <p className={`${archivoRegular.className} text-[var(--White)] text-xl leading-5.5`}>If you have any other questions or want to report a bug, please feel free to contact us on the official <a className='text-[var(--Primary)]' href='https://github.com/bino1432/Jojodle'>GitHub</a> page for <a className='text-[var(--Primary)]' href='/'>JoJodle</a>. .</p>
                </div>
                <div className='w-full flex justify-end'>
                    <button onClick={onClose} className={`${archivoBold.className} flex items-center h-9.5 p-2 rounded-sm cursor-pointer text-[var(--White)] text-xl bg-[var(--Primary)] hover:bg-[var(--Light)] transition-colors`}>
                        Okay, Master!
                    </button>
                </div>
            </div>
        </div>
    )
}