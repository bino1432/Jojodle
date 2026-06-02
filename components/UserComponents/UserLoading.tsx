"use client";
import { Archivo } from 'next/font/google';

const archivoRegular = Archivo({ subsets: ['latin'], weight: "400" });
const archivoBold = Archivo({ subsets: ['latin'], weight: "700" });

interface UserLoadingProps {
    onHasAccount: () => void;
    onNoAccount: () => void;
}

export default function UserLoading({ onHasAccount, onNoAccount }: UserLoadingProps) {
    return (
        <div className='flex flex-col gap-4'>
            <p className={`${archivoBold.className} text-[var(--White)] text-xl leading-5.5`}>Sign Up/Login</p>
            <p className={`${archivoRegular.className} text-[var(--White)] text-xl leading-5.5`}>Do you already have a JoJodle account?</p>

            <div className='flex gap-2 justify-center'>
                <button
                    onClick={onNoAccount}
                    className={`${archivoBold.className} flex items-center h-9.5 p-2 rounded-sm cursor-pointer text-[var(--White)] text-xl bg-[var(--Accent)] hover:bg-[var(--Light)] transition-colors`}>
                    NO! NO! NO!
                </button>
                <button
                    onClick={onHasAccount}
                    className={`${archivoBold.className} flex items-center h-9.5 p-2 rounded-sm cursor-pointer text-[var(--White)] text-xl bg-[var(--Primary)] hover:bg-[var(--Light)] transition-colors`}>
                    YES! YES! YES!
                </button>
            </div>
        </div>
    );
}