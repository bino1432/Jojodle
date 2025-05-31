import sendIcon from '@/public/images/icon/Send-Icon.svg'
import { Archivo } from 'next/font/google';
import Image from 'next/image'

const archivoBold = Archivo({
  subsets: ['latin'],
  weight: "700",
},);

export default function InputCharacter() {
    return (
        <div className='flex gap-2 p-[8] bg-[var(--Background)] rounded-lg mt-4 m-auto max-w-[464]'>
            <input type="text" placeholder="Type in the character name" className={`${archivoBold.className} rounded-lg bg-[var(--Accent)] max-w-[392] w-full placeholder-[var(--Cloudy)] pl-[8] text-[var(--Cloudy)] outline-none`}/>
            <Image src={sendIcon} alt="Send Icon" className='cursor-pointer'/>
        </div>
    )
}