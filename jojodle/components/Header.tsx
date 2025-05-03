import Image from "next/image";
import updateIcon from "@/public/images/icon/Updates-Icon.png"
import infoIcon from "@/public/images/icon/Info-Icon.png"
import playerIcon from "@/public/images/icon/Player-Icon.png"
import helpIcon from "@/public/images/icon/Help-Icon.png"
import logoImage from "@/public/images/image/Logo-image.png"


export default function Header(){
    return(
        <header className="mt-8">
            <div className="flex justify-center items-center gap-4">
                <a href="#" className="p-4 bg-[var(--Background)] rounded-xl hover:bg-[var(--Accent)]">
                    <Image src={updateIcon} alt="Update-Icon" />
                </a>
                <a href="#" className="p-4 bg-[var(--Background)] rounded-xl hover:bg-[var(--Accent)]">
                    <Image src={infoIcon} alt="Info-Icon"/>
                </a>
                <a href="#" className="p-4 bg-[var(--Background)] rounded-xl hover:bg-[var(--Accent)]">
                    <Image src={logoImage} alt="Logo-Image"/>
                </a>
                <a href="#" className="p-4 bg-[var(--Background)] rounded-xl hover:bg-[var(--Accent)]">
                    <Image src={helpIcon} alt="Help-Icon"/>
                </a>
                <a href="#" className="p-4 bg-[var(--Background)] rounded-xl hover:bg-[var(--Accent)]">
                    <Image src={playerIcon} alt="Player-Icon"/>
                </a>
            </div>
        </header>
    );   
}