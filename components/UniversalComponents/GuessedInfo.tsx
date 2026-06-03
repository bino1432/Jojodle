import { Archivo } from "next/font/google";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { animate, motion, AnimatePresence } from "framer-motion";
import { usePathname, useRouter } from "next/navigation";
import StandIcon from "@/public/images/icon/Stand-Icon";
import QuoteIcon from "@/public/images/icon/Quote-Icon";
import PoseIcon from "@/public/images/icon/Pose-Icon";

const archivoBold = Archivo({
    subsets: ['latin'],
    weight: "700",
},);

const archivoRegular = Archivo({
    subsets: ['latin'],
    weight: "400",
},);

type GuessedInfoProps = {
    name: string;
    image: string;
    tries: number;
    stand?: string;
}

type ModeConfig = {
    label: string;
    path: string;
    Icon: React.ComponentType<{ correctPath: string; currentPath: string; use: string }>;
} | null;

function getNextMode(currentPath: string): ModeConfig {
    if (currentPath.startsWith("/Classic")) {
        return { label: "Stand", path: "/Stand", Icon: StandIcon };
    }
    if (currentPath.startsWith("/Stand")) {
        return { label: "Quote", path: "/Quote", Icon: QuoteIcon };
    }
    if (currentPath.startsWith("/Quote")) {
        return { label: "Pose", path: "/Pose", Icon: PoseIcon };
    }

    return null;
}

function useCountdownToMidnightBRT() {
    const [timeLeft, setTimeLeft] = useState("");

    useEffect(() => {
        const calc = () => {
            const now = new Date();
            const midnight = new Date();
            midnight.setUTCHours(3, 0, 0, 0);
            if (midnight <= now) midnight.setUTCDate(midnight.getUTCDate() + 1);

            const diff = midnight.getTime() - now.getTime();
            const h = Math.floor(diff / 3600000).toString().padStart(2, "0");
            const m = Math.floor((diff % 3600000) / 60000).toString().padStart(2, "0");
            const s = Math.floor((diff % 60000) / 1000).toString().padStart(2, "0");
            setTimeLeft(`${h}:${m}:${s}`);
        };

        calc();
        const id = setInterval(calc, 1000);
        return () => clearInterval(id);
    }, []);

    return timeLeft;
}

export default function GuessedInfo({ name, image, tries, stand }: GuessedInfoProps){
    const divRef = useRef<HTMLDivElement>(null);
    const pathname = usePathname();
    const router = useRouter();
    const nextMode = getNextMode(pathname);
    const timeLeft = useCountdownToMidnightBRT();

    useEffect(() => {
    const element = divRef.current;
    if (!element) return;

    const targetY = element.getBoundingClientRect().top + window.scrollY - window.innerHeight / 2;

    animate(window.scrollY, targetY, {
        duration: 0.8,
        ease: "easeInOut",
        onUpdate: (v) => window.scrollTo(0, v),
        onComplete: () => element.focus(),
    });
    }, []);

    let nameA: string | undefined;
    let imageA: string | undefined;
    let nameB: string | undefined;
    let imageB: string | undefined;
    let isSharedStand = false;

    if (pathname.startsWith("/Stand")) {
        switch (stand?.toLowerCase()) {
            case "the world":
                nameA = "DIO";
                imageA = "/images/icon/character/SC/SC_7.png";
                nameB = "Parallel World Diego";
                imageB = "/images/icon/character/SBR/SBR_15.png";
                isSharedStand = true;
                break;
            case "ratt":
                nameA = "Bug-Eaten";
                imageA = "/images/icon/character/DiU/DiU_27.png";
                nameB = "Not Bug-Eaten";
                imageB = "/images/icon/character/DiU/DiU_28.png";
                isSharedStand = true;
                break;
            case "killer queen":
                nameA = "Yoshikage Kira";
                imageA = "/images/icon/character/JJL/DiU_8.gif";
                nameB = "Yoshikage Kira (JJL)";
                imageB = "/images/icon/character/JJL/JJL_28.png";
                isSharedStand = true;
                break;
            case "wonder of u":
                nameA = "Toru";
                imageA = "/images/icon/character/JJL/JJL_6.png";
                nameB = "Satoru Akefu";
                imageB = "/images/icon/character/JJL/JJL_27.png";
                isSharedStand = true;
                break;
            case "scary monsters":
                nameA = "Dr. Ferdinand";
                imageA = "/images/icon/character/SBR/SBR_11.png";
                nameB = "Diego Brando";
                imageB = "/images/icon/character/SBR/SBR_5.png";
                isSharedStand = true;
                break;
            case "anubis":
                nameA = "Chaka";
                imageA = "/images/icon/character/SC/SC_33.png";
                nameB = "Khan";
                imageB = "/images/icon/character/SC/SC_34.png";
                isSharedStand = true;
                break;
        }
    }

    return(
        <div ref={divRef} tabIndex={0} className="outline-none bg-[var(--Background)] min-w-65 flex justify-center items-center size-fit p-4 m-auto mb-4 flex-col gap-2 rounded-xl">
            <div className=" flex justify-center items-center flex-col gap-2 ">
                <p className={`${archivoBold.className} text-white text-center text-2xl leading-5.5`}>Congratulations!</p>
                <p className={`${archivoRegular.className} text-white text-center text-base leading-4.5`}>You succesfully guessed<br></br>today’s character:</p>
            </div>

            {isSharedStand ? (
                <div className="flex flex-col justify-center items-center gap-2">
                    <div className="bg-[var(--Accent)] flex justify-center items-center gap-2 p-2 rounded-lg">
                        <Image width={80} height={80} className="max-w-20 rounded-lg" src={imageA!} alt="" />
                        <div className="flex flex-col justify-left items-left">
                            <p className={`${archivoBold.className} text-white text-xl leading-5.5`}>{nameA}</p>
                            <p className={`${archivoRegular.className} text-white text-base leading-4.5`}>Number #1</p>
                        </div>
                    </div>
                    <p className={`${archivoRegular.className} text-white text-base leading-4.5`}>
                        or
                    </p>
                    <div className="bg-[var(--Accent)] flex justify-center items-center gap-2 p-2 rounded-lg">
                        <Image width={80} height={80} className="max-w-20 rounded-lg" src={imageB!} alt="" />
                        <div className="flex flex-col justify-left items-left">
                            <p className={`${archivoBold.className} text-white text-xl leading-5.5`}>{nameB}</p>
                            <p className={`${archivoRegular.className} text-white text-base leading-4.5`}>Number #1</p>
                        </div>
                    </div>
                </div>
            ) : (
                <div className="bg-[var(--Accent)] flex justify-center items-center gap-2 p-2 rounded-lg">
                    <Image width={80} height={80} className="max-w-20 rounded-lg" src={image} alt="" />
                    <div className="flex flex-col justify-left items-left">
                        <p className={`${archivoBold.className} text-white text-xl leading-5.5`}>{name}</p>
                        <p className={`${archivoRegular.className} text-white text-base leading-4.5`}>Number #1</p>
                    </div>
                </div>
            )}

            <p className={`${archivoRegular.className} text-white text-base leading-4.5`}>
                in {tries + 1 === 1 ? `${tries + 1} try` : `${tries + 1} tries`}
            </p>

            <div className="flex justify-center items-center flex-col gap-1">
                <p className={`${archivoRegular.className} text-white text-center text-base leading-4.5`}>Time until next<br></br>character drops:</p>
                <p className={`${archivoBold.className} text-white text-center text-2xl leading-5.5`}>
                    <AnimatePresence mode="popLayout">
                        {timeLeft.split("").map((char, i) => (
                            <motion.span
                                key={`${i}-${char}`}
                                initial={{ opacity: 0, y: -8 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: 8 }}
                                transition={{ duration: 0.2 }}
                                className="inline-block"
                            >
                                {char}
                            </motion.span>
                        ))}
                    </AnimatePresence>
                </p>
            </div>

            {nextMode && (
                <div className="flex justify-center items-center flex-col gap-1">
                    <p className={`${archivoRegular.className} text-white text-center text-base leading-4.5`}>Play the next mode:</p>
                    <button
                        onClick={() => router.push(nextMode.path)}
                        className="group bg-[var(--Accent)] flex justify-center w-33 h-12 items-center gap-1 rounded-sm cursor-pointer hover:bg-[var(--Light)] transition-colors"
                    >
                        <nextMode.Icon
                            correctPath={nextMode.path}
                            currentPath={pathname}
                            use="user"
                        />
                        <p className={`${archivoBold.className} text-white text-xl leading-5.5`}>{nextMode.label}</p>
                    </button>
                </div>
            )}
        </div>
    )
}