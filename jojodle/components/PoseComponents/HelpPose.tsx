"use client";
import CloseIcon from '@/public/images/icon/Close-Icon';
import PoseIcon from '@/public/images/icon/Pose-Icon';
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

export default function HelpPose() {
    return (
        <div className='flex flex-col gap-4 p-4 bg-[var(--Background)] rounded-lg mt-4 m-auto p-4 g-2 w-210'>
            <div className='flex justify-between'>
                <div className='flex flex-row gap-2'>
                    <h2 className={`${archivoBold.className} text-[var(--White)] text-2xl`}>How to Play</h2>
                    <PoseIcon correctPath="/Classic" currentPath="/Classic" size="small"/>
                    <h2 className={`${archivoBold.className} text-[var(--Primary)] text-2xl`}>Pose</h2>
                </div>
                <CloseIcon />
            </div>
            <div className='bg-[var(--Accent)] w-fit p-4 rounded-lg'>
                <h2 className={`${archivoBold.className} text-[var(--White)] text-2xl leading-5.5`}>Guess from an image that becomes clearer with each guess.</h2>
            </div>
            <p className={`${archivoRegular.className} text-[var(--White)] text-xl`}>On this mode, each version of a character is counted separately. Your answer has to be the version depicted on the image.</p>
            <div className='flex flex-col gap-2'>
                <p className={`${archivoBold.className} text-[var(--White)] text-xl`}>Game Example</p>
                <div className='flex gap-2'>
                    <p className={`${archivoRegular.className} text-[var(--White)] text-xl`}>Suppose today's</p>
                    <PoseIcon correctPath="/Classic" currentPath="/Classic" size="small"/>
                    <p className={`${archivoRegular.className} text-[var(--White)] text-xl`}><span className='text-[var(--Primary)]'>Pose</span> answer is <span className='text-[var(--Primary)]'>Jotaro Kujo</span>.</p>
                </div>
                <p className={`${archivoRegular.className} text-[var(--White)] text-xl`}>This is how the image will appear:</p>
            <div className="bg-[var(--Accent)] size-fit p-4 rounded-lg overflow-hidden">
                <div
                    className="relative select-none overflow-hidden rounded-lg"
                    style={{
                        width: 420,
                        maxWidth: '100%',
                        userSelect: 'none',
                    }}
                    onContextMenu={(event) => event.preventDefault()}
                >
                    <Image
                        src={'/images/poses/POSE_40_5.png'}
                        alt={`Jotaro Kujo pose`}
                        width={420}
                        height={420}
                        draggable={false}
                        onDragStart={(e) => e.preventDefault()}
                        onMouseDown={(e) => e.preventDefault()}
                        className="block w-full h-auto mx-auto"
                        style={{
                            filter: `blur(20px)`,
                            userSelect: 'none',
                            touchAction: 'none'
                        }}
                    />
                </div>
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
                        <p className={`${archivoBold.className} text-[var(--White)] text-xl leading-5`}>Technique Clue</p>
                        <p className={`${archivoRegular.className} text-[var(--White)] text-sm leading-4`}>in 8 guesses</p>
                        <Image src={'/images/icon/TechniqueClue-Icon.svg'} alt={'Technique Clue Icon'} width={41} height={64}></Image>
                    </div>
                    <div className='flex flex-col gap-2 justify-center'>
                        <p className={`${archivoRegular.className} text-[var(--White)] text-xl leading-5`}>One of the signature moves performed by the character.</p>
                        <p className={`${archivoRegular.className} text-[var(--White)] text-xl leading-5`}>Example: <strong>Star Finger</strong>.</p>
                    </div>
                </div>
                <p className={`${archivoRegular.className} text-[var(--White)] text-xl leading-5`}>For this mode, the clues are revealed on the 4th  and 7th guesses, respectively.</p>
            </div>
            <p className={`${archivoRegular.className} text-[var(--White)] text-xl leading-5`}>If you have any other questions or want to report a bug, please feel free to contact us on the official <a className='text-[var(--Primary)]' href='https://github.com/bino1432/Jojodle'>GitHub</a> page for JoJodle.</p>
            <div className='w-full flex justify-end'>
                <button className={`${archivoBold.className} p-2 rounded-sm cursor-pointer text-[var(--White)] text-xl bg-[var(--Primary)] hover:bg-[var(--Light)]`}>Okay, Master!</button>
            </div>
        </div>
    )
}