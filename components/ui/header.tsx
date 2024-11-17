import Link from 'next/link'
import Logo from './logo'
import MobileMenu from './mobile-menu'
import { usePathname } from 'next/navigation'

export default function Header() {
  const pathname = usePathname()

  return (
    <header className="absolute w-full z-30">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16 md:h-20">

          {/* Site branding */}
          <div className="flex-1 mt-8">
            <Logo />
          </div>

          {/* Desktop navigation */}
          <nav className="hidden md:flex md:grow">

            {/* Desktop menu links */}
            {/* <ul className="flex grow justify-center flex-wrap items-center">
              <li>
                <Link className="font-medium text-sm text-slate-300 hover:text-white mx-4 lg:mx-5 transition duration-150 ease-in-out" href="/about">About</Link>
              </li>
              <li>
                <Link className="font-medium text-sm text-slate-300 hover:text-white mx-4 lg:mx-5 transition duration-150 ease-in-out" href="/integrations">Integrations</Link>
              </li>
              <li>
                <Link className="font-medium text-sm text-slate-300 hover:text-white mx-4 lg:mx-5 transition duration-150 ease-in-out" href="/pricing">Pricing</Link>
              </li>
              <li>
                <Link className="font-medium text-sm text-slate-300 hover:text-white mx-4 lg:mx-5 transition duration-150 ease-in-out" href="/customers">Customers</Link>
              </li>
              <li>
                <Link className="font-medium text-sm text-slate-300 hover:text-white mx-4 lg:mx-5 transition duration-150 ease-in-out" href="/changelog">Changelog</Link>
              </li>
            </ul> */}

          </nav>

          {/* Desktop sign in links */}
           <ul className="flex-1 flex justify-end items-center">
            {pathname === '/' && (
              <li>
                <Link className="btn-sm text-white transition duration-150 ease-in-out w-full group [background:linear-gradient(theme(colors.purple.300),_theme(colors.purple.600))_padding-box,_conic-gradient(theme(colors.purple.300),_theme(colors.purple.500)_25%,_theme(colors.purple.500)_75%,_theme(colors.purple.300)_100%)_border-box] relative before:absolute before:inset-0 before:bg-purple-700/30 before:rounded-full before:pointer-events-none hover:scale-105" href="/quiz">
                  <span className="relative inline-flex items-center">
                    퀴즈 풀기 <span className="tracking-normal text-purple-100 group-hover:translate-x-0.5 transition-transform duration-150 ease-in-out ml-1">→</span>
                  </span>
                </Link>
              </li>
            )}
          </ul> 

          <MobileMenu />

        </div>
      </div>
    </header>
  )
}
