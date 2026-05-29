"use client";

import CloseIcon from '@/public/images/icon/Close-Icon';
import { Archivo } from 'next/font/google';
import UserLoggedIn from "@/components/UserComponents/UserLoggedIn";
import UserLoggedOut from "@/components/UserComponents/UserLoggedOut";
import { useUser } from "@/context/UserContext";

const archivoRegular = Archivo({ subsets: ['latin'], weight: "400" });
const archivoBold = Archivo({ subsets: ['latin'], weight: "700" });

export default function User({ onClose }: { onClose: () => void }) {
    const { user } = useUser();

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60" onClick={onClose}>
            <div  className="flex flex-col gap-4 p-4 bg-[var(--Background)] rounded-lg w-fit overflow-y-auto" onClick={e => e.stopPropagation()} >
                <div className="flex justify-between">
                    <h2 className={`${archivoBold.className} text-[var(--White)] text-2xl`}>
                        「Wonder of U」
                    </h2>
                    <button onClick={onClose} aria-label="Close">
                        <CloseIcon />
                    </button>
                </div>

                <p className={`${archivoRegular.className} text-[var(--White)] text-xl`}>
                    User options and stats.
                </p>

                {user ? (
                    <UserLoggedIn onClose={onClose} />
                ) : (
                    <UserLoggedOut />
                )}
            </div>
        </div>
    );
}