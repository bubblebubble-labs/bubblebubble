import Link from 'next/link'
import Image from 'next/image'
import LogoImg from '@/public/images/bbangyummy-logo.png'

export default function Logo() {
  return (
    <Link className="inline-flex" href="/" aria-label="Cruip">
      <Image 
        className="max-w-none animate-float" 
        src={LogoImg} 
        width={50} 
        height={50} 
        priority 
        alt="Stellar" 
      />
    </Link>
  )
}