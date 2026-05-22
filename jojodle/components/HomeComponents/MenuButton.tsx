import { Archivo } from "next/font/google";
import Link from "next/link";
import StarIcon from "@/public/images/icon/Star-Icon"
import StandIcon from "@/public/images/icon/Stand-Icon"
import QuoteIcon from "@/public/images/icon/Quote-Icon"
import PoseIcon from "@/public/images/icon/Pose-Icon"

const archivo = Archivo({
  subsets: ['latin'],
  weight: "700",
});

interface MenuButtonProps {
    page: string;
    title: string,
}

export default function MenuButton({ page, title }: MenuButtonProps){
    let icon

    switch (title) {
        case "Classic":
            icon = <StarIcon correctPath="/Home" currentPath="/Home" size="large"/>;
            break;
        case "Stand":
            icon = <StandIcon correctPath="/Home" currentPath="/Home" size="large"/>;
            break;
        case "Quote":
            icon = <QuoteIcon correctPath="/Home" currentPath="/Home" size="large"/>;
            break;
        case "Pose":
            icon = <PoseIcon correctPath="/Home" currentPath="/Home" size="large"/>;
            break;
    }

    return(
        <div className="w-full">
            <Link href={page} className="flex justify-center items-center gap-2 bg-[var(--Background)] w-66 h-24 m-auto rounded-lg hover:bg-[var(--Accent)]">
                {icon}
                <h1 className={`${archivo.className} text-5xl text-white`}>
                    {title}
                </h1>
            </Link>
        </div>
    );
}