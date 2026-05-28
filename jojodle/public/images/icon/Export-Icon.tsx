interface Pathname {
    correctPath: string,
    currentPath: string
}

export default function ExportIcon() {
    return (
        <svg
        viewBox="0 0 28 28"
        fill="currentColor"
        xmlns="http://www.w3.org/2000/svg"
        className="h-5.5 w-5.5 cursor-pointer text-[var(--Primary)] group-hover:text-[var(--White)] transition-colors">
        <path d="M-0.000976562 2.75C-0.000976562 1.2332 1.23223 0 2.74902 0H9.62402V5.5C9.62402 6.26055 10.2385 6.875 10.999 6.875H16.499V12.375H9.28027C8.70879 12.375 8.24902 12.8348 8.24902 13.4062C8.24902 13.9777 8.70879 14.4375 9.28027 14.4375H16.499V19.25C16.499 20.7668 15.2658 22 13.749 22H2.74902C1.23223 22 -0.000976562 20.7668 -0.000976562 19.25V2.75ZM16.499 14.4375V12.375H21.2299L19.5541 10.6992C19.1502 10.2953 19.1502 9.64219 19.5541 9.24258C19.958 8.84297 20.6111 8.83867 21.0107 9.24258L24.4482 12.6801C24.8521 13.084 24.8521 13.7371 24.4482 14.1367L21.0107 17.5742C20.6068 17.9781 19.9537 17.9781 19.5541 17.5742C19.1545 17.1703 19.1502 16.5172 19.5541 16.1176L21.2299 14.4418L16.499 14.4375ZM16.499 5.5H10.999V0L16.499 5.5Z"/>
        <defs>
        <clipPath id="clip0_6026_662">
        <rect width="24.75" height="22" fill="white"/>
        </clipPath>
        <clipPath id="clip1_6026_662">
        <rect width="24.75" height="22" fill="white"/>
        </clipPath>
        </defs>
        </svg>
    );
}