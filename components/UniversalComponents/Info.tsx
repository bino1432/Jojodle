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

export default function Info({ onClose }: { onClose: () => void }) {
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60" onClick={onClose}>
            <div className="flex flex-col gap-4 p-4 bg-[var(--Background)] rounded-lg w-210 max-h-[90vh] overflow-y-auto" onClick={e => e.stopPropagation()}>
                <div className='flex justify-between'>
                    <h2 className={`${archivoBold.className} text-[var(--White)] text-2xl`}>「Hermit Purple」</h2>
                    <button onClick={onClose} aria-label="Close">
                        <CloseIcon />
                    </button>
                </div>

                <p className={`${archivoRegular.className} text-[var(--White)] text-xl`}>Somewhat useful info on the game.</p>
                <div className='flex flex-col gap-2'>
                    <h3 className={`${archivoBold.className} text-[var(--White)] text-xl`}>Where am I?</h3>
                    <p className={`${archivoRegular.className} text-[var(--White)] text-xl leading-5.5`}><a className='text-[var(--Primary)]' href='/'>JoJodle</a> is a web game inspired by <a className='text-[var(--Primary)]' href='https://loldle.net/'>LoLdle</a> JoJodle focuses on characters from <a className='text-[var(--Primary)]' href='https://loldle.net/'>JoJo's Bizarre Adventure</a>, created by Japanese manga artist (aka the GOAT) <a className='text-[var(--Primary)]' href='https://pt.wikipedia.org/wiki/Hirohiko_Araki'>Hirohiko Araki</a>.</p>
                </div>
                
                <div className='flex flex-col gap-2'>
                    <h3 className={`${archivoBold.className} text-[var(--White)] text-xl`}>Creation and Brainstorming process</h3>
                    <p className={`${archivoRegular.className} text-[var(--White)] text-xl leading-5.5`}><a className='text-[var(--Primary)]' href='/'>JoJodle</a> was created after <a className='text-[var(--Primary)]' href='https://github.com/bino1432/'>bino1432</a>, who handles all the technical development, presented the idea to <a className='text-[var(--Primary)]' href='https://github.com/theguidev/'>theguidev</a>, who oversees design, content and user experience. <a className='text-[var(--Primary)]' href='https://www.youtube.com/watch?v=v8oqbWrP1QY'>Just the two of us</a>, bringing the game to life!</p>
                </div>

                <div className='flex flex-col gap-2'>
                    <h3 className={`${archivoBold.className} text-[var(--White)] text-xl`}>Legal Policies</h3>
                    <p className={`${archivoRegular.className} text-[var(--White)] text-xl leading-5.5`}><a className='text-[var(--Primary)]' href='/'>JoJodle</a> is not owned by, endorsed by, or affiliated with <a className='text-[var(--Primary)]' href='https://pt.wikipedia.org/wiki/Hirohiko_Araki'>Hirohiko Araki</a>, <a className='text-[var(--Primary)]' href='https://pt.wikipedia.org/wiki/Shueisha'>Shueisha</a>, <a className='text-[var(--Primary)]' href='https://jojowiki.com/Lucky_Land_Communications'>Lucky Land Communications</a>, <a className='text-[var(--Primary)]' href='https://en.wikipedia.org/wiki/David_Production'>David Production</a>, or any other entities involved within <a className='text-[var(--Primary)]' href='https://loldle.net/'>JoJo's Bizarre Adventure</a> community. It is primarily a fan-to-fan project.</p>
                    <p className={`${archivoRegular.className} text-[var(--White)] text-xl leading-5.5`}>Most of the game’s content is sourced from the <a className='text-[var(--Primary)]' href='https://jojowiki.com'>JoJo's Bizarre Encyclopedia</a>, which is licensed under the <a className='text-[var(--Primary)]' href='https://creativecommons.org/licenses/by-sa/4.0/deed.en'>Creative Commons Attribution-Share Alike License 4.0 (CC-BY-SA).</a>.</p>
                </div>

                <div className='flex flex-col gap-2'>
                    <h3 className={`${archivoBold.className} text-[var(--White)] text-xl`}>Contact and Feedback</h3>
                    <p className={`${archivoRegular.className} text-[var(--White)] text-xl leading-5.5`}>Got feedback or want to report a bug? Contact us or create an issue on <a className='text-[var(--Primary)]' href='https://github.com/bino1432/Jojodle'>JoJodle's GitHub</a>.</p>
                </div>

                <div className='w-full flex justify-end'>
                    <button onClick={onClose} className={`${archivoBold.className} flex items-center h-9.5 p-2 rounded-sm cursor-pointer text-[var(--White)] text-xl bg-[var(--Primary)] hover:bg-[var(--Light)] transition-colors`}>
                        Okay, Master!
                    </button>
                </div>
            </div>
        </div>
    );
}
