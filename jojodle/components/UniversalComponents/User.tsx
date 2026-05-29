"use client";
import { useState } from "react";
import CloseIcon from '@/public/images/icon/Close-Icon';
import { Archivo } from 'next/font/google';
import StarIcon from '@/public/images/icon/Star-Icon';
import StandIcon from '@/public/images/icon/Stand-Icon';
import QuoteIcon from '@/public/images/icon/Quote-Icon';
import PoseIcon from '@/public/images/icon/Pose-Icon';
import EditIcon from '@/public/images/icon/Edit-Icon';
import CheckedIcon from '@/public/images/icon/Checked-Icon';
import UncheckedIcon from '@/public/images/icon/Unchecked-Icon';
import CharacterSelector from "@/components/UniversalComponents/CharacterSelector";
import TitleSelector from "@/components/UniversalComponents/TitleSelector";
import { motion, AnimatePresence } from "framer-motion";
import Image from 'next/image'

const archivoRegular = Archivo({
    subsets: ['latin'],
    weight: "400",
},);

const archivoBold = Archivo({
    subsets: ['latin'],
    weight: "700",
},);


export default function User({ onClose }: { onClose: () => void }) {
    const [showCharacterSelector, setShowCharacterSelector] = useState(false);
    const [showTitleSelector, setShowTitleSelector] = useState(false);
    const [isChecked, setIsChecked] = useState(false);
    
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60" onClick={onClose}>
            <div className="flex flex-col gap-4 p-4 bg-[var(--Background)] rounded-lg w-fit overflow-y-auto" onClick={e => e.stopPropagation()}>
                <div className='flex justify-between'>
                    <h2 className={`${archivoBold.className} text-[var(--White)] text-2xl`}>「Wonder of U」</h2>
                    <button onClick={onClose} aria-label="Close">
                        <CloseIcon />
                    </button>
                </div>

                <p className={`${archivoRegular.className} text-[var(--White)] text-xl`}>User options and stats.</p>
                
                {/*
                <div className='flex flex-col gap-2'>
                    <p className={`${archivoBold.className} text-[var(--White)] text-xl leading-5.5`}>Customization</p>
                    <p className={`${archivoRegular.className} text-[var(--White)] text-xl leading-5.5`}>Customize your profile with name and picture options.</p>
                    <div className='flex gap-2'>
                        <div className='bg-[var(--Accent)] p-1 rounded-lg'>
                            <Image className='rounded-sm' src={'/images/icon/character/SC/SC_1.png'} alt={'Jotaro Kujo Icon'} width={80} height={80}></Image>
                        </div>
                        <div className='flex flex-col gap-1'>
                            <p className={`${archivoBold.className} text-[var(--White)] text-xl leading-5.5`}>Current picture:</p>
                            <div className={`${archivoBold.className} bg-[var(--Accent)] p-1 w-66 rounded-sm text-[var(--White)] text-xl leading-5.5`}>Jotaro Kujo</div>
                            <div className='flex gap-1'>
                                <button onClick={() => setShowCharacterSelector(true)}>
                                    <EditIcon />
                                </button>
                                <CloseIcon dark={true} />
                            </div>
                        </div>
                    </div>
                </div>

                <div className='flex gap-4'>
                    <div className='flex flex-col gap-1'>
                        <p className={`${archivoBold.className} text-[var(--White)] text-xl leading-5.5`}>Current username:</p>
                        <input className={`${archivoBold.className} bg-[var(--Accent)] p-1 w-66 rounded-sm text-[var(--White)] text-xl leading-5.5 outline-none`} placeholder='Jotaro' defaultValue="Jotaro" />
                        <div className='flex gap-1'>
                            <EditIcon />
                        </div>
                    </div>
                    <div className='flex flex-col gap-1'>
                        <p className={`${archivoBold.className} text-[var(--White)] text-xl leading-5.5`}>Current title:</p>
                        <div className={`${archivoBold.className} bg-[var(--Accent)] p-1 w-66 rounded-sm text-[var(--White)] text-xl leading-5.5`}>Kujo</div>
                        <div className='flex gap-1'>
                            <button onClick={() => setShowTitleSelector(true)}>
                                <EditIcon />
                            </button>
                            <CloseIcon dark={true} />
                        </div>
                    </div>
                </div>
                
                <div className='flex flex-col gap-2 justify-center'>
                    <p className={`${archivoBold.className} text-[var(--White)] text-xl leading-5.5`}>Stats</p>
                    <p className={`${archivoRegular.className} text-[var(--White)] text-xl leading-5.5`}>View your game statistics. Select a game mode.</p>
                    
                    <div className='flex gap-2 justify-center'>
                        <button className={`${archivoBold.className} group flex items-center justify-center gap-2 w-33 h-12 rounded-sm bg-[var(--Accent)] hover:bg-[var(--Light)] cursor-pointer transition-colors`}>
                            <StarIcon correctPath="/Classic" currentPath="/Classic" use="user"/>
                            <p className={`${archivoBold.className} text-[var(--White)] text-2xl leading-6.5`}>Classic</p>
                        </button>
                        <button className={`${archivoBold.className} group flex items-center justify-center gap-2 w-33 h-12 rounded-sm bg-[var(--Accent)] hover:bg-[var(--Light)] cursor-pointer transition-colors`}>
                            <StandIcon correctPath="/Classic" currentPath="/Classic" use="user"/>
                            <p className={`${archivoBold.className} text-[var(--White)] text-2xl leading-6.5`}>Stand</p>
                        </button>
                        <button className={`${archivoBold.className} group flex items-center justify-center gap-2 w-33 h-12 rounded-sm bg-[var(--Accent)] hover:bg-[var(--Light)] cursor-pointer transition-colors`}>
                            <QuoteIcon correctPath="/Classic" currentPath="/Classic" use="user"/>
                            <p className={`${archivoBold.className} text-[var(--White)] text-2xl leading-6.5`}>Quote</p>
                        </button>
                        <button className={`${archivoBold.className} group flex items-center justify-center gap-2 w-33 h-12 rounded-sm bg-[var(--Accent)] hover:bg-[var(--Light)] cursor-pointer transition-colors`}>
                            <PoseIcon correctPath="/Classic" currentPath="/Classic" use="user"/>
                            <p className={`${archivoBold.className} text-[var(--White)] text-2xl leading-6.5`}>Pose</p>
                        </button>
                    </div>
                </div>

                <div className='flex gap-2 justify-end'>
                    <button onClick={onClose} className={`${archivoBold.className} flex items-center h-9.5 p-2 rounded-sm cursor-pointer text-[var(--White)] text-xl bg-[var(--Primary)] hover:bg-[var(--Light)] transition-colors`}>
                        Okay, Master!
                    </button>
                </div> */}

                <div className='flex flex-col gap-4'>
                    <p className={`${archivoBold.className} text-[var(--White)] text-xl leading-5.5`}>Sign Up/Login</p>
                    <p className={`${archivoRegular.className} text-[var(--White)] text-xl leading-5.5`}>Do you already have a JoJodle account?</p>

                    <div className='flex gap-2 justify-center'>
                        <button className={`${archivoBold.className} flex items-center h-9.5 p-2 rounded-sm cursor-pointer text-[var(--White)] text-xl bg-[var(--Primary)] hover:bg-[var(--Light)] transition-colors`}>
                            YES! YES! YES!
                        </button>
                        <button className={`${archivoBold.className} flex items-center h-9.5 p-2 rounded-sm cursor-pointer text-[var(--White)] text-xl bg-[var(--Accent)] hover:bg-[var(--Light)] transition-colors`}>
                            NO! NO! NO!
                        </button>
                    </div>
                </div>

                {/* <div className='flex flex-col gap-4'>
                    <p className={`${archivoBold.className} text-[var(--White)] text-xl leading-5.5`}>Sign Up</p>
                    <p className={`${archivoRegular.className} text-[var(--White)] text-xl leading-5.5`}>Create an account to view your stats and change your profile.</p>

                    <div className="flex flex-col gap-2">
                        <div className="flex gap-4">
                            <div className='flex flex-col gap-1'>
                                <p className={`${archivoBold.className} text-[var(--White)] text-xl leading-5.5`}>Username:</p>
                                <input type="text" className={`${archivoBold.className} bg-[var(--Accent)] p-1 w-66 rounded-sm text-[var(--White)] text-xl leading-5.5 outline-none`} placeholder='Username' />
                            </div>
                            <div className='flex flex-col gap-1'>
                                <p className={`${archivoBold.className} text-[var(--White)] text-xl leading-5.5`}>Password:</p>
                                <input type="password" className={`${archivoBold.className} bg-[var(--Accent)] p-1 w-66 rounded-sm text-[var(--White)] text-xl leading-5.5 outline-none`} placeholder='Password' />
                            </div>
                        </div>

                        <div className="flex gap-1 justify-end">
                            <div className='flex flex-col gap-1'>
                                <p className={`${archivoBold.className} text-[var(--White)] text-xl leading-5.5`}>Repeat Password:</p>
                                <input type="password" className={`${archivoBold.className} bg-[var(--Accent)] p-1 w-66 rounded-sm text-[var(--White)] text-xl leading-5.5 outline-none`} placeholder='Repeat Password' />
                            </div>
                        </div>
                    </div>

                    <div className='flex items-center gap-1'>
                        <button
                            id="checkPassword"
                            onClick={() => setIsChecked(prev => !prev)}
                            className={`${archivoBold.className} flex items-center h-9.5 p-2 rounded-sm cursor-pointer`}
                        >
                            <AnimatePresence mode="popLayout" initial={false}>
                                <motion.span
                                    key={isChecked ? "checked" : "unchecked"}
                                    initial={{ opacity: 0, scale: 0.8 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.8 }}
                                    transition={{ duration: 0.15 }}
                                >
                                    {isChecked ? <CheckedIcon /> : <UncheckedIcon />}
                                </motion.span>
                            </AnimatePresence>
                        </button>
                        <p className={`${archivoRegular.className} text-[var(--White)] text-xl leading-5.5`}>
                            I understand that my password <span className={`${archivoBold.className} text-[var(--Primary)]`}>CANNOT</span> be changed.
                        </p>
                    </div>

                    <div className='flex gap-2 justify-center'>
                        <button className={`${archivoBold.className} flex items-center h-9.5 p-2 rounded-sm cursor-pointer text-[var(--White)] text-xl bg-[var(--Primary)] hover:bg-[var(--Light)] transition-colors`}>
                            Create account
                        </button>
                    </div>
                </div> */}

                {/* <div className='flex flex-col gap-4'>
                    <p className={`${archivoBold.className} text-[var(--White)] text-xl leading-5.5`}>Login</p>
                    <p className={`${archivoRegular.className} text-[var(--White)] text-xl leading-5.5`}>Login to view your stats and change your profile.</p>

                    <div className="flex flex-col gap-2">
                        <div className="flex gap-4">
                            <div className='flex flex-col gap-1'>
                                <p className={`${archivoBold.className} text-[var(--White)] text-xl leading-5.5`}>Username:</p>
                                <input type="text" className={`${archivoBold.className} bg-[var(--Accent)] p-1 w-66 rounded-sm text-[var(--White)] text-xl leading-5.5 outline-none`} placeholder='Username' />
                            </div>
                            <div className='flex flex-col gap-1'>
                                <p className={`${archivoBold.className} text-[var(--White)] text-xl leading-5.5`}>Password:</p>
                                <input type="password" className={`${archivoBold.className} bg-[var(--Accent)] p-1 w-66 rounded-sm text-[var(--White)] text-xl leading-5.5 outline-none`} placeholder='Password' />
                            </div>
                        </div>
                    </div>
                    <div className='flex gap-2 justify-center'>
                        <button className={`${archivoBold.className} flex items-center h-9.5 p-2 rounded-sm cursor-pointer text-[var(--White)] text-xl bg-[var(--Primary)] hover:bg-[var(--Light)] transition-colors`}>
                            Create account
                        </button>
                    </div>
                </div> */}
            </div>

            {showCharacterSelector && <CharacterSelector onClose={() => setShowCharacterSelector(false)} />}
            {showTitleSelector && <TitleSelector onClose={() => setShowTitleSelector(false)} />}
        </div>
    )
}