"use client";
import CloseIcon from '@/public/images/icon/Close-Icon';
import StarIcon from '@/public/images/icon/Star-Icon';
import UpArrow from "@/public/images/icon/Arrows/UpArrow.svg";
import DownArrow from "@/public/images/icon/Arrows/DownArrow.svg";
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

export default function HelpClassic({ onClose }: { onClose: () => void }) {
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60" onClick={onClose}>
            <div className="flex flex-col gap-4 p-4 bg-[var(--Background)] rounded-lg w-210 max-h-[90vh] overflow-y-auto custom-scrollbar"  onClick={e => e.stopPropagation()}>
                <div className='flex justify-between'>
                    <div className='flex flex-row gap-2'>
                        <h2 className={`${archivoBold.className} text-[var(--White)] text-2xl`}>How to Play</h2>
                        <StarIcon correctPath="/Classic" currentPath="/Classic" use="modal"/>
                        <h2 className={`${archivoBold.className} text-[var(--Primary)] text-2xl`}>Classic</h2>
                    </div>
                    <button onClick={onClose} aria-label="Close">
                        <CloseIcon />
                    </button>
                </div>
                <div className='bg-[var(--Accent)] w-fit p-4 rounded-lg'>
                    <h2 className={`${archivoBold.className} text-[var(--White)] text-2xl leading-5.5`}>Classical character guessing mode, following a hinted system. Choose one of the characters to start, and then its traits will appear, making your guessing process easier.</h2>
                </div>
                <p className={`${archivoRegular.className} text-[var(--White)] text-xl`}>On this mode, each version of a character is counted separately. Jotaro from SC and Jotaro from DiU are not the same answer.</p>
                <div className='flex flex-col gap-2'>
                    <p className={`${archivoBold.className} text-[var(--White)] text-xl`}>Colors</p>
                    <div className="flex items-center gap-2">
                        <div className="w-8 h-8 bg-[var(--Correct)] rounded-sm"></div>
                        <p className={`${archivoRegular.className} text-[var(--White)] text-xl`}>The value is <span className='text-[var(--Correct)]'>Correct</span></p>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="w-8 h-8 bg-[var(--Partial)] rounded-sm"></div>
                        <p className={`${archivoRegular.className} text-[var(--White)] text-xl`}>The value is <span className='text-[var(--Partial)]'>Partially Correct</span></p>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="w-8 h-8 bg-[var(--Wrong)] rounded-sm"></div>
                        <p className={`${archivoRegular.className} text-[var(--White)] text-xl`}>The value is <span className='text-[var(--Wrong)]'>Wrong</span></p>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="w-8 h-8 bg-[var(--Wrong)] rounded-sm flex items-center justify-center">
                            <Image className='w-6 h-6' src={DownArrow} alt={"Down Arrow"} />
                        </div>
                        <p className={`${archivoRegular.className} text-[var(--White)] text-xl`}>The value is <span className='text-[var(--WrongAccent)]'>Before/Less</span></p>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="w-8 h-8 bg-[var(--Wrong)] rounded-sm flex items-center justify-center">
                            <Image className='w-6 h-6' src={UpArrow} alt={"Up Arrow"} />
                        </div>
                        <p className={`${archivoRegular.className} text-[var(--White)] text-xl`}>The value is <span className='text-[var(--WrongAccent)]'>After/More</span></p>
                    </div>
                </div>
                <div className='flex flex-col gap-2'>
                    <p className={`${archivoBold.className} text-[var(--White)] text-xl`}>Traits</p>
                    <div className='flex flex-col align-center gap-2'>
                        <div className='bg-[var(--Accent)] flex align-center p-2 gap-2 w-fit rounded-sm'>
                            <h3 className={`${archivoBold.className} text-[var(--White)] text-xl leading-5.5`}>Gender</h3>
                        </div>
                        <p className={`${archivoRegular.className} text-[var(--White)] leading-4.5 text-xl`}>The character's sex.</p>
                        <div className='flex gap-2'>
                            <p className={`${archivoBold.className} text-[var(--White)] leading-4.5 text-xl`}>Values: </p>
                            <p className={`${archivoRegular.className} text-[var(--White)] leading-4.5 text-xl`}>Male or Female.</p>
                        </div>
                    </div>
                    <div className='flex flex-col align-center gap-2'>
                        <div className='bg-[var(--Accent)] flex align-center p-2 gap-2 w-fit rounded-sm'>
                            <h3 className={`${archivoBold.className} text-[var(--White)] text-xl leading-5.5`}>Height</h3>
                        </div>
                        <p className={`${archivoRegular.className} text-[var(--White)] leading-4.5 text-xl`}>Official or speculated height, in centimeters and feet/inches.</p>
                        <div className='flex gap-2'>
                            <p className={`${archivoBold.className} text-[var(--White)] leading-4.5 text-xl`}>Values: </p>
                            <p className={`${archivoRegular.className} text-[var(--White)] leading-4.5 text-xl`}>Between 1 cm (0 ft 0.3 in) and 262 cm (8 ft 7 in).</p>
                        </div>
                    </div>
                    <div className='flex flex-col align-center gap-2'>
                        <div className='bg-[var(--Accent)] flex align-center p-2 gap-2 w-fit rounded-sm'>
                            <h3 className={`${archivoBold.className} text-[var(--White)] text-xl leading-5.5`}>Age</h3>
                        </div>
                        <p className={`${archivoRegular.className} text-[var(--White)] leading-4.5 text-xl`}>Official or approximate age.</p>
                        <div className='flex gap-2'>
                            <p className={`${archivoBold.className} text-[var(--White)] leading-4.5 text-xl`}>Values: </p>
                            <p className={`${archivoRegular.className} text-[var(--White)] leading-4.5 text-xl`}>Between 0 and 102,000.</p>
                        </div>
                    </div>
                    <div className='flex flex-col align-center gap-2'>
                        <div className='bg-[var(--Accent)] flex align-center p-2 gap-2 w-fit rounded-sm'>
                            <h3 className={`${archivoBold.className} text-[var(--White)] text-xl leading-5.5`}>Nationality</h3>
                        </div>
                        <p className={`${archivoRegular.className} text-[var(--White)] leading-4.5 text-xl`}>Where the character was born/lives in.</p>
                        <div className='flex gap-2'>
                            <p className={`${archivoBold.className} text-[var(--White)] leading-4.5 text-xl`}>Values: </p>
                            <p className={`${archivoRegular.className} text-[var(--White)] leading-4.5 text-xl`}>United Kingdom, Italy, China, USA, Germany, Japan, Egypt...</p>
                        </div>
                    </div>
                    <div className='flex flex-col align-center gap-2'>
                        <div className='bg-[var(--Accent)] flex align-center p-2 gap-2 w-fit rounded-sm'>
                            <h3 className={`${archivoBold.className} text-[var(--White)] text-xl leading-5.5`}>Affiliation</h3>
                        </div>
                        <p className={`${archivoRegular.className} text-[var(--White)] leading-4.5 text-xl`}>Character’s affiliations with groups throughout the series.</p>
                        <div className='flex gap-2'>
                            <p className={`${archivoBold.className} text-[var(--White)] leading-4.5 text-xl`}>Values: </p>
                            <p className={`${archivoRegular.className} text-[var(--White)] leading-4.5 text-xl`}>Joestar Family, Speedwagon Foundation, Pillar Men, Agents of DIO, Passione, Team Bucciarati, Steel Ball Run, Rock Humans, TG University Hospital...</p>
                        </div>
                    </div>
                    <div className='flex flex-col align-center gap-2'>
                        <div className='bg-[var(--Accent)] flex align-center p-2 gap-2 w-fit rounded-sm'>
                            <h3 className={`${archivoBold.className} text-[var(--White)] text-xl leading-5.5`}>Occupation</h3>
                        </div>
                        <p className={`${archivoRegular.className} text-[var(--White)] leading-4.5 text-xl`}>What the character does for a living.</p>
                        <div className='flex gap-2'>
                            <p className={`${archivoBold.className} text-[var(--White)] leading-4.5 text-xl`}>Values: </p>
                            <p className={`${archivoRegular.className} text-[var(--White)] leading-4.5 text-xl`}>Merchant, Soldier, Assassin, Doctor, Student...</p>
                        </div>
                    </div>
                    <div className='flex flex-col align-center gap-2'>
                        <div className='bg-[var(--Accent)] flex align-center p-2 gap-2 w-fit rounded-sm'>
                            <h3 className={`${archivoBold.className} text-[var(--White)] text-xl leading-5.5`}>Stand Type</h3>
                        </div>
                        <p className={`${archivoRegular.className} text-[var(--White)] leading-4.5 text-xl`}>Stand Type, as cataloged in the <a className='text-[var(--Primary)]' href='https://jojowiki.com/Stand_Types'>Wiki</a>.</p>
                        <div className='flex gap-2'>
                            <p className={`${archivoBold.className} text-[var(--White)] leading-4.5 text-xl`}>Values: </p>
                            <p className={`${archivoRegular.className} text-[var(--White)] leading-4.5 text-xl`}>Automatic, Materialized, Foresight, Natural/Humanoid, Shared, Evolved...</p>
                        </div>
                    </div>
                    <div className='flex flex-col align-center gap-2'>
                        <div className='bg-[var(--Accent)] flex align-center p-2 gap-2 w-fit rounded-sm'>
                            <h3 className={`${archivoBold.className} text-[var(--White)] text-xl leading-5.5`}>Debut Part</h3>
                        </div>
                        <p className={`${archivoRegular.className} text-[var(--White)] leading-4.5 text-xl`}>First part the character is depicted.</p>
                        <div className='flex gap-2'>
                            <p className={`${archivoBold.className} text-[var(--White)] leading-4.5 text-xl`}>Values: </p>
                            <p className={`${archivoRegular.className} text-[var(--White)] leading-4.5 text-xl`}>Phantom Blood, Battle Tendency, Stardust Crusaders, Diamond is Unbreakable, Vento Aureo, Stone Ocean, Steel Ball Run, JoJolion, The JOJOLands.</p>
                        </div>
                    </div>
                </div>
                <div className='flex flex-col gap-2'>
                    <p className={`${archivoBold.className} text-[var(--White)] text-xl`}>Game Example</p>
                    <div className='flex gap-2'>
                        <p className={`${archivoRegular.className} text-[var(--White)] text-xl`}>Suppose today's</p>
                        <StarIcon correctPath="/Classic" currentPath="/Classic" use="modal"/>
                        <p className={`${archivoRegular.className} text-[var(--White)] text-xl`}><span className='text-[var(--Primary)]'>Classic</span> answer is <span className='text-[var(--Primary)]'>Jotaro Kujo</span>.</p>
                    </div>
                    <div className='flex gap-2'>
                        <p className={`${archivoRegular.className} text-[var(--White)] text-xl`}>You start with <span className='text-[var(--Primary)]'>DIO</span>. This is what you will see:</p>
                    </div>
                    <div className='flex gap-2'>
                        <div className="w-20 h-20 flex justify-center items-center"><Image className='rounded-md' src={'/images/icon/character/SC/SC_7.png'} alt={'DIO Icon'} width={80} height={80}></Image></div>
                        <div className={`${archivoBold.className} w-20 h-20 bg-[var(--Correct)] rounded-md flex justify-center items-center text-2xl text-center leading-4.5 text-[var(--White)]`}>Male</div>
                        <div className={`${archivoBold.className} w-20 h-20 bg-[var(--Correct)] rounded-md flex justify-center items-center text-xl text-center leading-4.5 text-[var(--White)]`}>195cm (6’5’’)</div>
                        <div className={`${archivoBold.className} w-20 h-20 bg-[var(--Wrong)] rounded-md flex justify-center items-center text-4xl text-center leading-5.5 text-[var(--White)]`}><Image className='absolute' src={'/images/icon/Arrows/DownArrow.svg'} alt={'Down Arrow'} width={41} height={64}></Image><span className="relative z-10">120</span></div>
                        <div className="w-20 h-20 bg-[var(--Wrong)] rounded-md flex justify-center items-center"><Image className='rounded' src={'/images/icon/Countries/UnitedKingdom.svg'} alt={'UK Flag'} width={64} height={48}></Image></div>
                        <div className={`${archivoBold.className} w-20 h-20 bg-[var(--Partial)] rounded-md flex justify-center items-center text-regular text-center leading-3.5 text-[var(--White)]`}>Joestar Family, Brando Family</div>
                        <div className={`${archivoBold.className} w-20 h-20 bg-[var(--Wrong)] rounded-md flex justify-center items-center text-regular text-center leading-4.5 text-[var(--White)]`}>Vampire</div>
                        <div className={`${archivoBold.className} w-20 h-20 bg-[var(--Correct)] rounded-md flex justify-center items-center text-xs text-center leading-2.5 text-[var(--White)]`}>Close-<br></br>Range, Range Irrelevant, Natural Humanoid</div>
                        <div className={`${archivoBold.className} w-20 h-20 bg-[var(--Correct)] rounded-md flex justify-center items-center  text-sm text-center leading-4 text-[var(--White)]`}>Stardust Crusaders</div>
                    </div>
                    <div className='flex gap-2'>
                        <p className={`${archivoRegular.className} text-[var(--White)] text-xl`}>The correct answer was:</p>
                    </div>
                    <div className='flex gap-2'>
                        <div className="w-20 h-20 flex justify-center items-center"><Image className='rounded-md' src={'/images/icon/character/SC/SC_1.png'} alt={'Jotaro Kujo Icon'} width={80} height={80}></Image></div>
                        <div className={`${archivoBold.className} w-20 h-20 bg-[var(--Correct)] rounded-md flex justify-center items-center text-2xl text-center leading-4.5 text-[var(--White)]`}>Male</div>
                        <div className={`${archivoBold.className} w-20 h-20 bg-[var(--Correct)] rounded-md flex justify-center items-center text-xl text-center leading-4.5 text-[var(--White)]`}>195cm (6’5’’)</div>
                        <div className={`${archivoBold.className} w-20 h-20 bg-[var(--Correct)] rounded-md flex justify-center items-center text-5xl text-center leading-6.5 text-[var(--White)]`}>17</div>
                        <div className="w-20 h-20 bg-[var(--Correct)] rounded-md flex justify-center items-center"><Image className='rounded' src={'/images/icon/Countries/Japan.svg'} alt={'Japan Flag'} width={64} height={48}></Image></div>
                        <div className={`${archivoBold.className} w-20 h-20 bg-[var(--Correct)] rounded-md flex justify-center items-center text-regular text-center leading-3.5 text-[var(--White)]`}>Joestar Family, Joestar Group</div>
                        <div className={`${archivoBold.className} w-20 h-20 bg-[var(--Correct)] rounded-md flex justify-center items-center text-regular text-center leading-4.5 text-[var(--White)]`}>Student</div>
                        <div className={`${archivoBold.className} w-20 h-20 bg-[var(--Correct)] rounded-md flex justify-center items-center text-xs text-center leading-2.5 text-[var(--White)]`}>Close-<br></br>Range, Range Irrelevant, Natural Humanoid</div>
                        <div className={`${archivoBold.className} w-20 h-20 bg-[var(--Correct)] rounded-md flex justify-center items-center  text-sm text-center leading-4 text-[var(--White)]`}>Stardust Crusaders</div>
                    </div>
                </div>
                <div className='flex flex-col gap-2'>
                    <p className={`${archivoBold.className} text-[var(--White)] text-xl`}>Clues</p>
                    <p className={`${archivoRegular.className} text-[var(--White)] text-xl`}>Clues give you some information on the character of the day.</p>
                    <div className='flex gap-2'>
                        <div className='flex flex-col items-center justify-center w-43 h-fit gap-2 bg-[var(--Accent)] py-2 rounded-lg'>
                            <p className={`${archivoBold.className} text-[var(--White)] text-xl leading-4.5`}>Debut Clue</p>
                            <p className={`${archivoRegular.className} text-[var(--White)] text-sm leading-4`}>in 4 guesses</p>
                            <Image src={'/images/icon/PartClue-Icon.svg'} alt={'Part Clue Icon'} width={41} height={64}></Image>
                        </div>
                        <div className='flex flex-col gap-2 justify-center'>
                            <p className={`${archivoRegular.className} text-[var(--White)] text-xl leading-4.5`}>Part where the first appearance of this character takes place.</p>
                            <p className={`${archivoRegular.className} text-[var(--White)] text-xl leading-4.5`}>Example: <strong>Stardust Crusaders</strong>.</p>
                        </div>
                    </div>
                    <div className='flex gap-2'>
                        <div className='flex flex-col items-center justify-center w-43 h-fit gap-2 bg-[var(--Accent)] py-2 rounded-lg'>
                            <p className={`${archivoBold.className} text-[var(--White)] text-xl leading-4.5`}>Technique Clue</p>
                            <p className={`${archivoRegular.className} text-[var(--White)] text-sm leading-4`}>in 7 guesses</p>
                            <Image src={'/images/icon/TechniqueClue-Icon.svg'} alt={'Technique Clue Icon'} width={41} height={64}></Image>
                        </div>
                        <div className='flex flex-col gap-2 justify-center'>
                            <p className={`${archivoRegular.className} text-[var(--White)] text-xl leading-4.5`}>One of the signature moves performed by the character.</p>
                            <p className={`${archivoRegular.className} text-[var(--White)] text-xl leading-4.5`}>Example: <strong>Star Finger</strong>.</p>
                        </div>
                    </div>
                    <p className={`${archivoRegular.className} text-[var(--White)] text-xl leading-4.5`}>For this mode, the clues are revealed on the 4th and 7th guesses, respectively.</p>
                </div>
                <p className={`${archivoRegular.className} text-[var(--White)] text-xl leading-4.5`}>If you have any other questions or want to report a bug, please feel free to contact us on the official <a className='text-[var(--Primary)]' href='https://github.com/bino1432/Jojodle'>GitHub</a> page for JoJodle.</p>
                <div className='w-full flex justify-end'>
                    <button onClick={onClose} className={`${archivoBold.className} flex items-center h-9.5 p-2 rounded-sm cursor-pointer text-[var(--White)] text-xl bg-[var(--Primary)] hover:bg-[var(--Light)] transition-colors`}>
                        Okay, Master!
                    </button>
                </div>
            </div>
        </div>
    )
}