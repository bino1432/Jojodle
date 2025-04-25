import Image from "next/image";
import updateIcon from "@/public/images/icon/Updates-Icon.png"
import infoIcon from "@/public/images/icon/Info-Icon.png"
import playerIcon from "@/public/images/icon/Player-Icon.png"
import helpIcon from "@/public/images/icon/Help-Icon.png"
import logoImage from "@/public/images/image/Logo-image.png"


export default function Header(){
    return(
        <header>
            <div>
                <a href="#" className="w-50">
                    <Image src={updateIcon} alt="Update-Icon" />
                </a>
                <a href="#">
                    <Image src={infoIcon} alt="Info-Icon"/>
                </a>
                <a href="#">
                    <Image src={logoImage} alt="Logo-Image"/>
                </a>
                <a href="#">
                    <Image src={helpIcon} alt="Help-Icon"/>
                </a>
                <a href="#">
                    <Image src={playerIcon} alt="Player-Icon"/>
                </a>
            </div>
        </header>
    );   
}