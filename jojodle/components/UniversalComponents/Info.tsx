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

export default function Info() {
    return (
        <div className='flex flex-col gap-4 p-4 bg-[var(--Background)] rounded-lg mt-4 m-auto p-4 g-2 w-210'>
            <div className='flex justify-between'>
                <h2 className={`${archivoBold.className} text-[var(--White)] text-2xl`}>「Hermit Purple」</h2>
                <CloseIcon />
            </div>
            <p className={`${archivoRegular.className} text-[var(--White)] text-xl`}>Somewhat useful info on the game.</p>
            <div className='flex flex-col gap-2'>
                <h3 className={`${archivoBold.className} text-[var(--White)] text-xl`}>Where am I?</h3>
                <p className={`${archivoRegular.className} text-[var(--White)] text-xl leading-5.5`}><span className='text-[var(--Primary)]cursor-pointer'>JoJodle</span> is a web game inspired by <span className='text-[var(--Primary)] cursor-pointer'>LoLdle.</span> JoJodle focuses on characters from  <span className='text-[var(--Primary)] cursor-pointer'>JoJo’s Bizarre Adventure</span>, created by Japanese manga artist (aka the GOAT) <span className='text-[var(--Primary)] cursor-pointer'>Hirohiko Araki</span>.</p>
            </div>
            <div className='flex flex-col gap-2'>
                <h3 className={`${archivoBold.className} text-[var(--White)] text-xl`}>Creation and Brainstorming process</h3>
                <p className={`${archivoRegular.className} text-[var(--White)] text-xl leading-5.5`}><span className='text-[var(--Primary)] cursor-pointer'>JoJodle</span> was created after <span className='text-[var(--Primary)] cursor-pointer'>bino1432</span>, who handles all the technical development, presented the idea to <span className='text-[var(--Primary)] cursor-pointer'>theguidev</span>, who oversees design, content and user experience. <span className='text-[var(--Primary)] cursor-pointer'>Just the two of us</span>, bringing the game to life!</p>
            </div>
            <div className='flex flex-col gap-2'>
                <h3 className={`${archivoBold.className} text-[var(--White)] text-xl`}>Legal Policies</h3>
                <p className={`${archivoRegular.className} text-[var(--White)] text-xl leading-5.5`}><span className='text-[var(--Primary)] cursor-pointer'>JoJodle</span> is not owned by, endorsed by, or affiliated with <span className='text-[var(--Primary)] cursor-pointer'>Hirohiko Araki</span>, <span className='text-[var(--Primary)] cursor-pointer'>Shueisha</span>, <span className='text-[var(--Primary)] cursor-pointer'>Lucky Land Communications</span>, <span className='text-[var(--Primary)] cursor-pointer'>David Productions</span>, or any other entities involved within <span className='text-[var(--Primary)] cursor-pointer'>JoJo's Bizarre Adventure</span> community. It is primarily a fan-to-fan project.</p>
                <p className={`${archivoRegular.className} text-[var(--White)] text-xl leading-5.5`}>Most of the game’s content is sourced from the <span className='text-[var(--Primary)] cursor-pointer'>JoJo’s Bizarre Encyclopedia</span>, which is licensed under the <span className='text-[var(--Primary)] cursor-pointer'>Creative Commons Attribution-Share Alike License 4.0 (CC-BY-SA)</span>.</p>
            </div>
            <div className='flex flex-col gap-2'>
                <h3 className={`${archivoBold.className} text-[var(--White)] text-xl`}>Contact and Feedback</h3>
                <p className={`${archivoRegular.className} text-[var(--White)] text-xl leading-5.5`}>Got feedback or want to report a bug? Contact us or create an issue on <span className='text-[var(--Primary)] cursor-pointer'>JoJodle’s GitHub</span>.</p>
            </div>
            <div className='w-full flex justify-end'>
                <button className={`${archivoBold.className} p-2 rounded-sm cursor-pointer text-[var(--White)] text-xl bg-[var(--Primary)] hover:bg-[var(--Light)]`}>Okay, Master!</button>
            </div>
        </div>
    )
}