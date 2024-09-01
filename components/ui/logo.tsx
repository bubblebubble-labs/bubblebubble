import Link from 'next/link'
import Image from 'next/image'
import LogoImg from '@/public/images/bubblebubble.png'

export default function Logo() {
  return (
    <Link className="inline-flex" href="/" aria-label="Cruip">
      <Image 
        className="max-w-none animate-float" 
        src={LogoImg} 
        width={100} 
        height={100} 
        priority 
        alt="Stellar" 
      />
    </Link>
  )
}