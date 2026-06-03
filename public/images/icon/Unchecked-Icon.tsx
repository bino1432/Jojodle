interface Pathname {
    correctPath: string,
    currentPath: string
}

export default function UncheckedIcon() {
    return (
        <svg
        width="28"
        height="28"
        viewBox="0 0 28 28"
        fill="none"
        xmlns="http://www.w3.org/2000/svg">
        <path d="M24 3C24.55 3 25 3.45 25 4V24C25 24.55 24.55 25 24 25H4C3.45 25 3 24.55 3 24V4C3 3.45 3.45 3 4 3H24ZM4 0C1.79375 0 0 1.79375 0 4V24C0 26.2062 1.79375 28 4 28H24C26.2062 28 28 26.2062 28 24V4C28 1.79375 26.2062 0 24 0H4Z" fill="#EC2790"/>
        </svg>
    )
}