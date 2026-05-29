"use client";
import CloseIcon from '@/public/images/icon/Close-Icon';
import QuoteIcon from '@/public/images/icon/Quote-Icon';
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

export default function HelpQuote({ onClose }: { onClose: () => void }) {
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60" onClick={onClose}>
            <div className="flex flex-col gap-4 p-4 bg-[var(--Background)] rounded-lg w-210 max-h-[90vh] overflow-y-auto custom-scrollbar"  onClick={e => e.stopPropagation()}>
                <div className='flex justify-between'>
                    <div className='flex flex-row gap-2'>
                        <h2 className={`${archivoBold.className} text-[var(--White)] text-2xl`}>How to Play</h2>
                        <QuoteIcon correctPath="/Quote" currentPath="/Quote" use="modal"/>
                        <h2 className={`${archivoBold.className} text-[var(--Primary)] text-2xl`}>Quote</h2>
                    </div>
                    <button onClick={onClose} aria-label="Close">
                        <CloseIcon />
                    </button>
                </div>

                <div className='bg-[var(--Accent)] w-fit p-4 rounded-lg'>
                    <h2 className={`${archivoBold.className} text-[var(--White)] text-2xl leading-5.5`}>Guess the character based on a famous quote they said.</h2>
                </div>

                <p className={`${archivoRegular.className} text-[var(--White)] text-xl`}>On this mode, each version of a character is counted separately. Your asnwer has to be the version of the part the quote was said.</p>
                
                <div className='flex flex-col gap-2'>
                    <p className={`${archivoBold.className} text-[var(--White)] text-xl`}>Game Example</p>
                    <div className='flex gap-2'>
                        <p className={`${archivoRegular.className} text-[var(--White)] text-xl`}>Suppose today's</p>
                        <QuoteIcon correctPath="/Quote" currentPath="/Quote" use="modal"/>
                        <p className={`${archivoRegular.className} text-[var(--White)] text-xl`}><span className='text-[var(--Primary)]'>Quote</span> answer is <span className='text-[var(--Primary)]'>Jotaro Kujo</span>.</p>
                    </div>
                    <p className={`${archivoRegular.className} text-[var(--White)] text-xl`}>This is how the quote name will appear:</p>
                    <div className='bg-[var(--Accent)] w-fit align-center p-4 rounded-lg'>
                        <h2 className={`${archivoBold.className} text-[var(--White)] text-2xl leading-5.5`}>“I can't beat the crap out of<br></br>you without getting closer.”</h2>
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
                            <p className={`${archivoBold.className} text-[var(--White)] text-xl leading-5`}>Debut</p>
                            <p className={`${archivoRegular.className} text-[var(--White)] text-sm leading-4`}>in 4 guesses</p>
                            <Image src={'/images/icon/PartClue-Icon.svg'} alt={'Debut Clue Icon'} width={41} height={64}></Image>
                        </div>
                        <div className='flex flex-col gap-2 justify-center'>
                            <p className={`${archivoRegular.className} text-[var(--White)] text-xl leading-5`}>In which part the quote was said.</p>
                            <p className={`${archivoRegular.className} text-[var(--White)] text-xl leading-5`}>Example: <strong>Stardust Crusaders</strong>.</p>
                        </div>
                    </div>
                    <div className='flex gap-2'>
                        <div className='flex flex-col items-center justify-center w-43 h-fit gap-2 bg-[var(--Accent)] py-2 rounded-lg'>
                            <p className={`${archivoBold.className} text-[var(--White)] text-xl leading-5`}>Target Clue</p>
                            <p className={`${archivoRegular.className} text-[var(--White)] text-sm leading-4`}>in 7 guesses</p>
                            <Image src={'/images/icon/TargetClue-Icon.svg'} alt={'Target Clue Icon'} width={41} height={64}></Image>
                        </div>
                        <div className='flex flex-col gap-2 justify-center'>
                            <p className={`${archivoRegular.className} text-[var(--White)] text-xl leading-5`}>Who was the quote directed to.</p>
                            <p className={`${archivoRegular.className} text-[var(--White)] text-xl leading-5`}>Example: <strong>DIO</strong>.</p>
                        </div>
                    </div>
                    <p className={`${archivoRegular.className} text-[var(--White)] text-xl leading-5`}>For this mode, the clues are revealed on the 4th  and 7th guesses, respectively.</p>
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