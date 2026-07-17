import logo from '../../assets/logo/ORBIT-BG.jpg'
import { Link } from 'react-router-dom'
import { NAV_LINKS } from '@/constants/navLinks'

export default function Footer() {
  return (
    <footer className="border-t border-orbit-line bg-orbit-ink text-slate-300">
      <div className="container-orbit grid grid-cols-1 gap-10 py-14 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <Link to="/" className="flex items-center gap-2 font-display text-lg font-bold text-white">
            <img
              src={logo}
              alt="Orbit Educations Logo"
              className="h-8 w-8 rounded-full object-cover"
            />
            Orbit Educations
          </Link>
          <p className="mt-3 max-w-xs text-sm leading-relaxed text-slate-400">
            Guiding students from School to Professional milestones with structured courses,
            verified results, and a clear path forward.
          </p>
        </div>

        <div>
          <h3 className="mb-3 text-sm font-semibold text-white">Explore</h3>
          <ul className="space-y-2 text-sm">
            {NAV_LINKS.map((link) => (
              <li key={link.path}>
                <Link to={link.path} className="text-slate-400 hover:text-orbit-green-400">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="mb-3 text-sm font-semibold text-white">Account</h3>
          <ul className="space-y-2 text-sm">
            <li><Link to="/login" className="text-slate-400 hover:text-orbit-green-400">Log in</Link></li>
            <li><Link to="/signup" className="text-slate-400 hover:text-orbit-green-400">Sign up</Link></li>
            <li><Link to="/dashboard" className="text-slate-400 hover:text-orbit-green-400">Student dashboard</Link></li>
          </ul>
        </div>

        <div>
          <h3 className="mb-3 text-sm font-semibold text-white">Head Office</h3>
          <address className="text-sm not-italic leading-relaxed text-slate-400">
            Orbit Educations Campus,<br />
            Rabindra Pally, Durgapur, West Bengal, India<br />
            <a href="tel:+910000000000" className="hover:text-orbit-green-400">+91 00000 00000</a><br />
            <a href="mailto:hello@orbiteducations.in" className="hover:text-orbit-green-400">hello@orbiteducations.in</a>
          </address>
        </div>
      </div>

      <div className="border-t border-white/10 py-5">
        <p className="container-orbit text-center text-xs text-slate-500">
          © {new Date().getFullYear()} Orbit Educations. All rights reserved.
        </p>
      </div>
    </footer>
  )
}
