"use client";
import CloseIcon from '@/public/images/icon/Close-Icon';
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

export default function User() {
    return (
        <div className='flex flex-col gap-4 p-4 bg-[var(--Background)] rounded-lg mt-4 m-auto p-4 g-2 w-210'>
            <div className='flex justify-between'>
                <h2 className={`${archivoBold.className} text-[var(--White)] text-2xl`}>「Wonder of U」</h2>
                <CloseIcon />
            </div>
            <p className={`${archivoRegular.className} text-[var(--White)] text-xl`}>User options and stats.</p>
            <div className='flex flex-col gap-2'>
                <p className={`${archivoBold.className} text-[var(--White)] text-xl leading-5.5`}>Customization</p>
                <p className={`${archivoRegular.className} text-[var(--White)] text-xl leading-5.5`}>Customize your profile with name and picture options.</p>
            </div>
            <div className='flex gap-2 justify-center'>
                <button className={`${archivoBold.className} p-2 rounded-sm cursor-pointer text-[var(--White)] text-xl bg-[var(--Accent)] hover:bg-[var(--Light)]`}>
                    Import Stats
                </button>
                <button className={`${archivoBold.className} p-2 rounded-sm cursor-pointer text-[var(--White)] text-xl bg-[var(--Accent)] hover:bg-[var(--Light)]`}>
                    Export Stats
                </button>
                <button className={`${archivoBold.className} p-2 rounded-sm cursor-pointer text-[var(--White)] text-xl bg-[var(--Primary)] hover:bg-[var(--Light)]`}>Okay, Master!</button>
            </div>
        </div>
    )
}