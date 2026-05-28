interface Pathname {
    correctPath: string,
    currentPath: string
}

export default function ImportIcon() {
    return (
        <svg
        viewBox="0 0 28 28"
        fill="currentColor"
        xmlns="http://www.w3.org/2000/svg"
        className="h-5.5 w-5.5 cursor-pointer text-[var(--Primary)] group-hover:text-[var(--White)] transition-colors">
        <path d="M6.64591 2.75C6.64591 1.2332 7.9305 0 9.5105 0H16.672V5.5C16.672 6.26055 17.312 6.875 18.1042 6.875H23.8334V19.25C23.8334 20.7668 22.5488 22 20.9688 22H9.5105C7.9305 22 6.64591 20.7668 6.64591 19.25V14.4375H14.4385L12.6929 16.1133C12.2721 16.5172 12.2721 17.1703 12.6929 17.5699C13.1136 17.9695 13.7939 17.9738 14.2102 17.5699L17.7909 14.1324C18.2117 13.7285 18.2117 13.0754 17.7909 12.6758L14.2102 9.23828C13.7895 8.83438 13.1091 8.83438 12.6929 9.23828C12.2766 9.64219 12.2721 10.2953 12.6929 10.6949L14.4385 12.3707L6.64591 12.375V2.75ZM6.64591 12.375V14.4375H1.99097C1.39567 14.4375 0.916748 13.9777 0.916748 13.4062C0.916748 12.8348 1.39567 12.375 1.99097 12.375H6.64591ZM23.8334 5.5H18.1042V0L23.8334 5.5Z"/>
        <defs>
        <clipPath id="clip0_6026_658">
        <rect width="22.92" height="22" fill="white" transform="translate(0.915039)"/>
        </clipPath>
        </defs>
        </svg>
    );
}
