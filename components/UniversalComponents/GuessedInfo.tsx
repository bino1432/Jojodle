import { Archivo } from "next/font/google";
import Image from "next/image";
import { useEffect, useRef } from "react";
import { animate } from "framer-motion";
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

export default function GuessedInfo({ name, image, tries }: GuessedInfoProps){
    const divRef = useRef<HTMLDivElement>(null);
    const pathname = usePathname();
    const router = useRouter();
    const nextMode = getNextMode(pathname);

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

    return(
        <div ref={divRef} tabIndex={0} className="outline-none bg-[var(--Background)] min-w-65 flex justify-center items-center size-fit p-4 m-auto mb-4 flex-col gap-2 rounded-xl">
            <div className=" flex justify-center items-center flex-col gap-2 ">
                <p className={`${archivoBold.className} text-white text-center text-2xl leading-5.5`}>Congratulations!</p>
                <p className={`${archivoRegular.className} text-white text-center text-base leading-4.5`}>You succesfully guessed<br></br>today’s character:</p>
            </div>

            <div className="bg-[var(--Accent)] flex justify-center items-center gap-2 p-2 rounded-lg">
                <Image width={80} height={80} className="max-w-20 rounded-lg" src={image} alt="" />
                <div className="flex flex-col justify-left items-left">
                    <p className={`${archivoBold.className} text-white text-xl leading-5.5`}>{name}</p>
                    <p className={`${archivoRegular.className} text-white text-base leading-4.5`}>Number #1</p>
                </div>
            </div>

            <p className={`${archivoRegular.className} text-white text-base leading-4.5`}>
                in {tries + 1 === 1 ? `${tries + 1} try` : `${tries + 1} tries`}
            </p>

            <div className="flex justify-center items-center flex-col gap-1">
                <p className={`${archivoRegular.className} text-white text-center text-base leading-4.5`}>Time until next<br></br>character drops:</p>
                <p className={`${archivoBold.className} text-white text-center text-2xl leading-5.5`}>tempo</p>
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