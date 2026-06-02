"use client";
import { useState } from "react";
import { Archivo } from 'next/font/google';
import CheckedIcon from '@/public/images/icon/Checked-Icon';
import UncheckedIcon from '@/public/images/icon/Unchecked-Icon';
import { motion, AnimatePresence } from "framer-motion";
import UserLoading from "@/components/UserComponents/UserLoading";
import { createUser, loginUser } from "@/lib/userServices";
import { useUser } from "@/context/UserContext";

const archivoRegular = Archivo({ subsets: ['latin'], weight: "400" });
const archivoBold = Archivo({ subsets: ['latin'], weight: "700" });

type View = "loading" | "login" | "register";

export default function UserLoggedOut() {
    const { setUser } = useUser();
    const [view, setView] = useState<View>("loading");

    const [regUsername, setRegUsername] = useState("");
    const [regPassword, setRegPassword] = useState("");
    const [regRepeatPassword, setRegRepeatPassword] = useState("");
    const [isChecked, setIsChecked] = useState(false);
    const [regError, setRegError] = useState<string | null>(null);
    const [regLoading, setRegLoading] = useState(false);

    const [loginUsername, setLoginUsername] = useState("");
    const [loginPassword, setLoginPassword] = useState("");
    const [loginError, setLoginError] = useState<string | null>(null);
    const [loginLoading, setLoginLoading] = useState(false);

    async function handleRegister() {
        setRegError(null);
        if (!regUsername.trim() || !regPassword.trim()) {
            setRegError("Please fill in all fields.");
            return;
        }
        if (regPassword !== regRepeatPassword) {
            setRegError("Passwords do not match.");
            return;
        }
        if (!isChecked) {
            setRegError("Please acknowledge that your password cannot be changed.");
            return;
        }
        setRegLoading(true);
        const result = await createUser(regUsername.trim(), regPassword);
        setRegLoading(false);
        if (!result.success) {
            setRegError(result.error ?? "Something went wrong.");
            return;
        }
        setUser(result.user!);
    }

    async function handleLogin() {
        setLoginError(null);
        if (!loginUsername.trim() || !loginPassword.trim()) {
            setLoginError("Please fill in all fields.");
            return;
        }
        setLoginLoading(true);
        const result = await loginUser(loginUsername.trim(), loginPassword);
        setLoginLoading(false);
        if (!result.success) {
            setLoginError(result.error ?? "Something went wrong.");
            return;
        }
        setUser(result.user!);
    }


    if (view === "loading") {
        return (
            <UserLoading
                onHasAccount={() => setView("login")}
                onNoAccount={() => setView("register")}
            />
        );
    }

    if (view === "register") {
        return (
            <div className='flex flex-col gap-4'>
                <div className="flex items-center gap-2">
                    <p className={`${archivoBold.className} text-[var(--White)] text-xl leading-5.5`}>Sign Up</p>
                </div>
                <p className={`${archivoRegular.className} text-[var(--White)] text-xl leading-5.5`}>Create an account to view your stats and change your profile.</p>

                <div className="flex flex-col gap-2">
                    <div className="flex gap-4">
                        <div className='flex flex-col gap-1'>
                            <p className={`${archivoBold.className} text-[var(--White)] text-xl leading-5.5`}>Username:</p>
                            <input
                                type="text"
                                value={regUsername}
                                onChange={e => setRegUsername(e.target.value)}
                                className={`${archivoBold.className} bg-[var(--Accent)] p-1 w-66 rounded-sm text-[var(--White)] text-xl leading-5.5 outline-none`}
                                placeholder='Username'
                            />
                        </div>
                        <div className='flex flex-col gap-1'>
                            <p className={`${archivoBold.className} text-[var(--White)] text-xl leading-5.5`}>Password:</p>
                            <input
                                type="password"
                                value={regPassword}
                                onChange={e => setRegPassword(e.target.value)}
                                className={`${archivoBold.className} bg-[var(--Accent)] p-1 w-66 rounded-sm text-[var(--White)] text-xl leading-5.5 outline-none`}
                                placeholder='Password'
                            />
                        </div>
                    </div>

                    <div className="flex gap-1 justify-end">
                        <div className='flex flex-col gap-1'>
                            <p className={`${archivoBold.className} text-[var(--White)] text-xl leading-5.5`}>Repeat Password:</p>
                            <input
                                type="password"
                                value={regRepeatPassword}
                                onChange={e => setRegRepeatPassword(e.target.value)}
                                className={`${archivoBold.className} bg-[var(--Accent)] p-1 w-66 rounded-sm text-[var(--White)] text-xl leading-5.5 outline-none`}
                                placeholder='Repeat Password'
                            />
                        </div>
                    </div>
                </div>

                <div className='flex items-center gap-1'>
                    <button
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

                {regError && (
                    <p className={`${archivoRegular.className} text-[var(--Wrong)] text-xl`}>{regError}</p>
                )}

                <div className='flex gap-2 justify-center'>
                    <button
                        onClick={handleRegister}
                        disabled={regLoading}
                        className={`${archivoBold.className} flex items-center h-9.5 p-2 rounded-sm cursor-pointer text-[var(--White)] text-xl bg-[var(--Primary)] hover:bg-[var(--Light)] transition-colors disabled:opacity-50`}
                    >
                        {regLoading ? "Creating..." : "Create account"}
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className='flex flex-col gap-4'>
            <div className="flex items-center gap-2">
                <p className={`${archivoBold.className} text-[var(--White)] text-xl leading-5.5`}>Login</p>
            </div>
            <p className={`${archivoRegular.className} text-[var(--White)] text-xl leading-5.5`}>Login to view your stats and change your profile.</p>

            <div className="flex flex-col gap-2">
                <div className="flex gap-4">
                    <div className='flex flex-col gap-1'>
                        <p className={`${archivoBold.className} text-[var(--White)] text-xl leading-5.5`}>Username:</p>
                        <input
                            type="text"
                            value={loginUsername}
                            onChange={e => setLoginUsername(e.target.value)}
                            className={`${archivoBold.className} bg-[var(--Accent)] p-1 w-66 rounded-sm text-[var(--White)] text-xl leading-5.5 outline-none`}
                            placeholder='Username'
                        />
                    </div>
                    <div className='flex flex-col gap-1'>
                        <p className={`${archivoBold.className} text-[var(--White)] text-xl leading-5.5`}>Password:</p>
                        <input
                            type="password"
                            value={loginPassword}
                            onChange={e => setLoginPassword(e.target.value)}
                            className={`${archivoBold.className} bg-[var(--Accent)] p-1 w-66 rounded-sm text-[var(--White)] text-xl leading-5.5 outline-none`}
                            placeholder='Password'
                        />
                    </div>
                </div>
            </div>

            {loginError && (
                <p className={`${archivoRegular.className} text-[var(--Wrong)] text-xl`}>{loginError}</p>
            )}

            <div className='flex gap-2 justify-center'>
                <button
                    onClick={handleLogin}
                    disabled={loginLoading}
                    className={`${archivoBold.className} flex items-center h-9.5 p-2 rounded-sm cursor-pointer text-[var(--White)] text-xl bg-[var(--Primary)] hover:bg-[var(--Light)] transition-colors disabled:opacity-50`}
                >
                    {loginLoading ? "Logging in..." : "Login"}
                </button>
            </div>
        </div>
    );
}