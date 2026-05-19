"use client";

interface character {
    ID: number;
    Name: string;
    Image: string;
}

interface characterCardProps {
    imageUrl: string,
    name: string,
    character: character,
    winGame: (win: boolean) => void
}

export default function StandCard({ imageUrl, name, character, winGame }: characterCardProps) {
    return (
        <div>
            <p className="text-white">StandCard</p>
        </div>
    );
}