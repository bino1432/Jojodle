interface Pathname {
    correctPath: string,
    currentPath: string
}

export default function StarICon({ correctPath, currentPath }: Pathname) {
    return (
        <svg
            viewBox="0 0 48 48"
            fill="currentColor"
            xmlns="http://www.w3.org/2000/svg"
            className={`"h-12 w-12 ${correctPath === currentPath ? "text-[var(--Primary)]" : "text-white"}`}>
            <g clipPath="url(#clip0_2064_132)">
                <path d="M26.6114 2.36336C26.1296 1.36347 25.1115 0.727173 23.9935 0.727173C22.8754 0.727173 21.8664 1.36347 21.3756 2.36336L15.5307 14.3893L2.47759 16.3164C1.3868 16.48 0.477808 17.2436 0.14148 18.2889C-0.194848 19.3343 0.0778501 20.4887 0.859585 21.2613L10.3313 30.6331L8.09517 43.8771C7.91338 44.9679 8.36787 46.0769 9.26778 46.7222C10.1677 47.3676 11.3585 47.4494 12.3402 46.9313L24.0026 40.7047L35.665 46.9313C36.6467 47.4494 37.8374 47.3767 38.7373 46.7222C39.6373 46.0678 40.0918 44.9679 39.91 43.8771L37.6647 30.6331L47.1365 21.2613C47.9182 20.4887 48.2 19.3343 47.8546 18.2889C47.5091 17.2436 46.6092 16.48 45.5184 16.3164L32.4562 14.3893L26.6114 2.36336Z" />
            </g>
            <defs>
                <clipPath id="clip0_2064_132">
                    <rect width="48" height="48" fill="white" />
                </clipPath>
            </defs>
        </svg>

    );
}