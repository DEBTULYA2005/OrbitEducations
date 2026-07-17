import { useState } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { NAV_LINKS } from '@/constants/navLinks'
import { useAuth } from '@/context/AuthContext'
import Button from '@/components/common/Button'
import NotificationBell from './NotificationBell'
import logo from '../../assets/logo/ORBIT.png'

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { isAuthenticated, user, logout } = useAuth()
  const navigate = useNavigate()

  async function handleLogout() {
    await logout()
    navigate('/')
  }

  return (
    <header className="sticky top-0 z-30 border-b border-orbit-line bg-white/90 backdrop-blur-md">
      <div className="container-orbit flex h-16 items-center justify-between">
        <Link to="/" className="flex items-center gap-2 font-display text-lg font-bold text-orbit-ink">
          <img
              src={logo}
              alt="Orbit Educations Logo"
              className="h-12 w-12 rounded-full object-cover"
            />
          Orbit Educations
        </Link>

        <nav className="hidden items-center gap-1 lg:flex">
          {NAV_LINKS.map((link) => (
            <NavLink
              key={link.path}
              to={link.path}
              className={({ isActive }) =>
                `rounded-full px-3.5 py-2 text-sm font-medium transition-colors ${
                  isActive
                    ? 'bg-orbit-blue-50 text-orbit-blue-700'
                    : 'text-orbit-ink-soft hover:bg-orbit-blue-50 hover:text-orbit-blue-700'
                }`
              }
            >
              {link.label}
            </NavLink>
          ))}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          {isAuthenticated ? (
            <>
              <NotificationBell />
              <Link to="/dashboard" className="text-sm font-semibold text-orbit-ink-soft hover:text-orbit-blue-700">
                Hi, {user?.name?.split(' ')[0] || 'Student'}
              </Link>
              <Button variant="outline" size="sm" onClick={handleLogout}>
                Log out
              </Button>
            </>
          ) : (
            <>
              <Link to="/login" className="text-sm font-semibold text-orbit-ink-soft hover:text-orbit-blue-700">
                Log in
              </Link>
              <Button size="sm" onClick={() => navigate('/signup')}>
                Get started
              </Button>
            </>
          )}
        </div>

        <button
          className="rounded-lg p-2 text-orbit-ink lg:hidden"
          aria-label="Toggle menu"
          onClick={() => setIsMenuOpen((v) => !v)}
        >
          <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
            {isMenuOpen ? (
              <path d="M5 5L17 17M17 5L5 17" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
            ) : (
              <path d="M3 6h16M3 11h16M3 16h16" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
            )}
          </svg>
        </button>
      </div>

      {isMenuOpen && (
        <div className="border-t border-orbit-line bg-white px-4 pb-4 pt-2 lg:hidden animate-orbit-fade-up">
          <nav className="flex flex-col gap-1">
            {NAV_LINKS.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                onClick={() => setIsMenuOpen(false)}
                className={({ isActive }) =>
                  `rounded-lg px-3 py-2.5 text-sm font-medium ${
                    isActive ? 'bg-orbit-blue-50 text-orbit-blue-700' : 'text-orbit-ink-soft'
                  }`
                }
              >
                {link.label}
              </NavLink>
            ))}
          </nav>
          <div className="mt-3 flex flex-col gap-2 border-t border-orbit-line pt-3">
            {isAuthenticated ? (
              <>
                <Link to="/dashboard" onClick={() => setIsMenuOpen(false)} className="text-sm font-semibold text-orbit-ink-soft">
                  Dashboard
                </Link>
                <Button variant="outline" size="sm" onClick={handleLogout}>
                  Log out
                </Button>
              </>
            ) : (
              <>
                <Link to="/login" onClick={() => setIsMenuOpen(false)} className="text-sm font-semibold text-orbit-ink-soft">
                  Log in
                </Link>
                <Button size="sm" onClick={() => { setIsMenuOpen(false); navigate('/signup') }}>
                  Get started
                </Button>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  )
}
