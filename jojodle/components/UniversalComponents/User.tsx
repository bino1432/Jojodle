"use client";
import CloseIcon from '@/public/images/icon/Close-Icon';
import { Archivo } from 'next/font/google';
import StarIcon from '@/public/images/icon/Star-Icon';
import StandIcon from '@/public/images/icon/Stand-Icon';
import QuoteIcon from '@/public/images/icon/Quote-Icon';
import PoseIcon from '@/public/images/icon/Pose-Icon';
import EditIcon from '@/public/images/icon/Edit-Icon';
import ImportIcon from '@/public/images/icon/Import-Icon';
import ExportIcon from '@/public/images/icon/Export-Icon';
import Image from 'next/image'

const archivoRegular = Archivo({
    subsets: ['latin'],
    weight: "400",
},);

const archivoBold = Archivo({
    subsets: ['latin'],
    weight: "700",
},);

export default function User() {
    return (
        <div className='flex flex-col gap-4 p-4 bg-[var(--Background)] rounded-lg mt-4 m-auto p-4 g-2 w-fit'>
            <div className='flex justify-between'>
                <h2 className={`${archivoBold.className} text-[var(--White)] text-2xl`}>「Wonder of U」</h2>
                <CloseIcon />
            </div>
            <p className={`${archivoRegular.className} text-[var(--White)] text-xl`}>User options and stats.</p>
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
                            <EditIcon />
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
                        <EditIcon />
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
            <div className='flex gap-2 justify-center'>
                <button className={`${archivoBold.className} group flex items-center justify-center h-9.5 p-2 rounded-sm cursor-pointer bg-[var(--Accent)] hover:bg-[var(--Light)] transition-colors`}>
                    <ImportIcon/>
                    <p className={`${archivoBold.className} text-[var(--White)] text-xl leading-5.5`}>Import Stats</p>
                </button>
                <button className={`${archivoBold.className} group flex items-center justify-center h-9.5 p-2 rounded-sm cursor-pointer bg-[var(--Accent)] hover:bg-[var(--Light)] transition-colors`}>
                    <ExportIcon/>
                    <p className={`${archivoBold.className} text-[var(--White)] text-xl leading-5.5`}>Export Stats</p>
                </button>
                <button className={`${archivoBold.className} flex items-center h-9.5 p-2 rounded-sm cursor-pointer text-[var(--White)] text-xl bg-[var(--Primary)] hover:bg-[var(--Light)] transition-colors`}>Okay, Master!</button>
            </div>
        </div>
    )
}