"use client";
import { useState } from "react";
import { usePathname } from "next/navigation";
import Image from "next/image";
import updateIcon from "@/public/images/icon/Updates-Icon.svg"
import infoIcon from "@/public/images/icon/Info-Icon.svg"
import playerIcon from "@/public/images/icon/Player-Icon.svg"
import helpIcon from "@/public/images/icon/Help-Icon.svg"
import Outralogo from "@/public/images/image/Logo.png"
import Info from "@/components/UniversalComponents/Info";
import Updates from "@/components/UniversalComponents/Updates";
import Help from "@/components/HomeComponents/Help";
import HelpClassic from "@/components/ClassicComponents/HelpClassic";
import HelpStand from "@/components/StandComponents/HelpStand";
import HelpQuote from "@/components/QuoteComponents/HelpQuote";
import HelpPose from "@/components/PoseComponents/HelpPose";
import User from "@/components/UserComponents/User";

const helpModals: Record<string, React.ComponentType<{ onClose: () => void }>> = {
    "/": Help,
    "/Classic": HelpClassic,
    "/Stand": HelpStand,
    "/Quote": HelpQuote,
    "/Pose": HelpPose,
};

export default function Header() {
    const [showInfo, setShowInfo] = useState(false);
    const [showUpdates, setShowUpdates] = useState(false);
    const [showHelp, setShowHelp] = useState(false);
    const [showUser, setShowUser] = useState(false);

    const pathname = usePathname();
    const HelpModal = helpModals[pathname] ?? Help;

    return (
        <header className="mt-8">
            <div className="flex justify-center items-center gap-4">
                <button onClick={() => setShowUpdates(true)} className="cursor-pointer p-4 bg-[var(--Background)] rounded-xl hover:bg-[var(--Accent)] transition-colors">
                    <Image src={updateIcon} alt="Update-Icon" />
                </button>

                <button onClick={() => setShowInfo(true)} className="cursor-pointer p-4 bg-[var(--Background)] rounded-xl hover:bg-[var(--Accent)] transition-colors">
                    <Image src={infoIcon} alt="Info-Icon" />
                </button>

                <a href="/" className="p-4 bg-[var(--Background)] rounded-xl hover:bg-[var(--Accent)] transition-colors">
                    <Image src={Outralogo} alt="Logo-Image" width={189} height={117} />
                </a>

                <button onClick={() => setShowHelp(true)} className="cursor-pointer p-4 bg-[var(--Background)] rounded-xl hover:bg-[var(--Accent)] transition-colors">
                    <Image src={helpIcon} alt="Help-Icon" />
                </button>

                <button onClick={() => setShowUser(true)} className="cursor-pointer p-4 bg-[var(--Background)] rounded-xl hover:bg-[var(--Accent)] transition-colors">
                    <Image src={playerIcon} alt="Player-Icon" />
                </button>
            </div>

            {showInfo && <Info onClose={() => setShowInfo(false)} />}
            {showUpdates && <Updates onClose={() => setShowUpdates(false)} />}
            {showHelp && <HelpModal onClose={() => setShowHelp(false)} />}
            {showUser && <User onClose={() => setShowUser(false)} />}
        </header>
    );
}