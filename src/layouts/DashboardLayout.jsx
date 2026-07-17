import { NavLink, Outlet } from 'react-router-dom'
import NotificationBell from '@/components/navbar/NotificationBell'
import { useAuth } from '@/context/AuthContext'

const DASHBOARD_LINKS = [
  { label: 'Overview', path: '/dashboard' },
  { label: 'Profile', path: '/dashboard/profile' },
  { label: 'Subscription', path: '/dashboard/subscription' },
  { label: 'Certificates', path: '/dashboard/certificates' },
]

export default function DashboardLayout() {
  const { user } = useAuth()

  return (
    <div className="flex min-h-screen bg-orbit-base">
      <aside className="hidden w-64 shrink-0 border-r border-orbit-line bg-white p-5 md:block">
        <div className="mb-8 flex items-center gap-2 font-display text-lg font-bold text-orbit-ink">
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-orbit-blue-600 text-sm text-white">
            O
          </span>
          Orbit
        </div>
        <nav className="flex flex-col gap-1">
          {DASHBOARD_LINKS.map((link) => (
            <NavLink
              key={link.path}
              to={link.path}
              end={link.path === '/dashboard'}
              className={({ isActive }) =>
                `rounded-lg px-3.5 py-2.5 text-sm font-medium transition-colors ${
                  isActive
                    ? 'bg-orbit-blue-50 text-orbit-blue-700'
                    : 'text-orbit-ink-soft hover:bg-orbit-blue-50'
                }`
              }
            >
              {link.label}
            </NavLink>
          ))}
        </nav>
      </aside>

      <div className="flex flex-1 flex-col">
        <header className="flex h-16 items-center justify-between border-b border-orbit-line bg-white px-5">
          <span className="font-display text-base font-semibold text-orbit-ink">
            Welcome back{user?.name ? `, ${user.name.split(' ')[0]}` : ''}
          </span>
          <NotificationBell />
        </header>
        <main className="flex-1 p-5 sm:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
