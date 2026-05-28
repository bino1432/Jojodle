"use client";
import CloseIcon from '@/public/images/icon/Close-Icon';
import StandIcon from '@/public/images/icon/Stand-Icon';
import { Archivo } from 'next/font/google';
import Image from 'next/image'

const archivoRegular = Archivo({
    subsets: ['latin'],
    weight: "400",
},);

const archivoBold = Archivo({
    subsets: ['latin'],
    weight: "700",
},);

export default function HelpStand({ onClose }: { onClose: () => void }) {
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60" onClick={onClose}>
            <div className="flex flex-col gap-4 p-4 bg-[var(--Background)] rounded-lg w-210 max-h-[90vh] overflow-y-auto custom-scrollbar"  onClick={e => e.stopPropagation()}>
                <div className='flex justify-between'>
                    <div className='flex flex-row gap-2'>
                        <h2 className={`${archivoBold.className} text-[var(--White)] text-2xl`}>How to Play</h2>
                        <StandIcon correctPath="/Stand" currentPath="/Stand" use="modal"/>
                        <h2 className={`${archivoBold.className} text-[var(--Primary)] text-2xl`}>Stand</h2>
                    </div>
                    <button onClick={onClose} aria-label="Close">
                        <CloseIcon />
                    </button>
                </div>
                <div className='bg-[var(--Accent)] w-fit p-4 rounded-lg'>
                    <h2 className={`${archivoBold.className} text-[var(--White)] text-2xl leading-5.5`}>Guess the character based on the name of their Stand.</h2>
                </div>
                <p className={`${archivoRegular.className} text-[var(--White)] text-xl`}>On this mode, each version of a character is counted together.</p>
                <p className={`${archivoRegular.className} text-[var(--White)] text-xl`}>Each version of a Stand is counted seperately, such as Echoes or Tusk’s ACTs, or King Crimson and Epitaph.</p>
                <p className={`${archivoRegular.className} text-[var(--White)] text-xl`}>For characters that share the same Stand, such as Gappy and Josefumi, both answers are correct.</p>
                <div className='flex flex-col gap-2'>
                    <p className={`${archivoBold.className} text-[var(--White)] text-xl`}>Game Example</p>
                    <div className='flex gap-2'>
                        <p className={`${archivoRegular.className} text-[var(--White)] text-xl`}>Suppose today's</p>
                        <StandIcon correctPath="/Stand" currentPath="/Stand" use="modal"/>
                        <p className={`${archivoRegular.className} text-[var(--White)] text-xl`}><span className='text-[var(--Primary)]'>Stand</span> answer is <span className='text-[var(--Primary)]'>Jotaro Kujo</span>.</p>
                    </div>
                    <p className={`${archivoRegular.className} text-[var(--White)] text-xl`}>This is how the Stand name will appear:</p>
                    <div className='bg-[var(--Accent)] w-fit align-center p-4 rounded-lg'>
                        <h2 className={`${archivoBold.className} text-[var(--White)] text-2xl leading-5.5`}>「Star Platinum」</h2>
                    </div>
                    <p className={`${archivoRegular.className} text-[var(--White)] text-xl`}>Your answer has to be:</p>
                    <div className='flex flex-col justify-center items-center w-74 h-fit bg-[var(--Correct)] gap-2 py-2 rounded-lg'>
                        <Image className='rounded-sm' src={'/images/icon/character/SC/SC_1.png'} alt={'Jotaro Kujo Icon'} width={80} height={80}></Image>
                        <p className={`${archivoBold.className} text-[var(--White)] text-2xl`}>Jotaro Kujo</p>
                    </div>
                </div>
                <div className='flex flex-col gap-2'>
                    <p className={`${archivoBold.className} text-[var(--White)] text-xl`}>Clues</p>
                    <p className={`${archivoRegular.className} text-[var(--White)] text-xl`}>Clues give you some information on the character of the day.</p>
                    <div className='flex gap-2'>
                        <div className='flex flex-col items-center justify-center w-43 h-fit gap-2 bg-[var(--Accent)] py-2 rounded-lg'>
                            <p className={`${archivoBold.className} text-[var(--White)] text-xl leading-5`}>Stand Type Clue</p>
                            <p className={`${archivoRegular.className} text-[var(--White)] text-sm leading-4`}>in 4 guesses</p>
                            <Image src={'/images/icon/TypeClue-Icon.svg'} alt={'Type Clue Icon'} width={41} height={64}></Image>
                        </div>
                        <div className='flex flex-col gap-2 justify-center'>
                            <p className={`${archivoRegular.className} text-[var(--White)] text-xl leading-5`}>Stand Type, as specified in the <a className='text-[var(--Primary)]' href='https://jojowiki.com/Stand_Types'>Wiki</a>.</p>
                            <p className={`${archivoRegular.className} text-[var(--White)] text-xl leading-5`}>Example: <strong>Close-Range, Range Irrelevant, Natural Humanoid</strong>.</p>
                        </div>
                    </div>
                    <div className='flex gap-2'>
                        <div className='flex flex-col items-center justify-center w-43 h-fit gap-2 bg-[var(--Accent)] py-2 rounded-lg'>
                            <p className={`${archivoBold.className} text-[var(--White)] text-xl leading-5`}>Debut Clue</p>
                            <p className={`${archivoRegular.className} text-[var(--White)] text-sm leading-4`}>in 6 guesses</p>
                            <Image src={'/images/icon/PartClue-Icon.svg'} alt={'Part Clue Icon'} width={41} height={64}></Image>
                        </div>
                        <div className='flex flex-col gap-2 justify-center'>
                            <p className={`${archivoRegular.className} text-[var(--White)] text-xl leading-5`}>Part where the first appearance of this character takes place.</p>
                            <p className={`${archivoRegular.className} text-[var(--White)] text-xl leading-5`}>Example: <strong>Stardust Crusaders</strong>.</p>
                        </div>
                    </div>
                    <div className='flex gap-2'>
                        <div className='flex flex-col items-center justify-center w-43 h-fit gap-2 bg-[var(--Accent)] py-2 rounded-lg'>
                            <p className={`${archivoBold.className} text-[var(--White)] text-xl leading-5`}>Technique Clue</p>
                            <p className={`${archivoRegular.className} text-[var(--White)] text-sm leading-4`}>in 8 guesses</p>
                            <Image src={'/images/icon/TechniqueClue-Icon.svg'} alt={'Technique Clue Icon'} width={41} height={64}></Image>
                        </div>
                        <div className='flex flex-col gap-2 justify-center'>
                            <p className={`${archivoRegular.className} text-[var(--White)] text-xl leading-5`}>One of the signature moves performed by the character.</p>
                            <p className={`${archivoRegular.className} text-[var(--White)] text-xl leading-5`}>Example: <strong>Star Finger</strong>.</p>
                        </div>
                    </div>
                    <p className={`${archivoRegular.className} text-[var(--White)] text-xl leading-5`}>For this mode, the clues are revealed on the 4th, 6th and 8th guesses, respectively.</p>
                </div>
                <p className={`${archivoRegular.className} text-[var(--White)] text-xl leading-5`}>If you have any other questions or want to report a bug, please feel free to contact us on the official <a className='text-[var(--Primary)]' href='https://github.com/bino1432/Jojodle'>GitHub</a> page for JoJodle.</p>
                <div className='w-full flex justify-end'>
                    <button onClick={onClose} className={`${archivoBold.className} flex items-center h-9.5 p-2 rounded-sm cursor-pointer text-[var(--White)] text-xl bg-[var(--Primary)] hover:bg-[var(--Light)] transition-colors`}>
                        Okay, Master!
                    </button>
                </div>
            </div>
        </div>
    )
}