interface tipsProps {
    title: string
}

export default function TipsComponenet ({title}: tipsProps){
    return(
        <div>
            <p>{title}</p>
        </div>
    );
}