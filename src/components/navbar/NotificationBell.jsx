import { useState, useRef, useEffect } from 'react'
import { useNotifications } from '@/context/NotificationContext'

export default function NotificationBell() {
  const { notifications, unreadCount, markAsRead, markAllAsRead } = useNotifications()
  const [isOpen, setIsOpen] = useState(false)
  const ref = useRef(null)

  useEffect(() => {
    function handleClickOutside(e) {
      if (ref.current && !ref.current.contains(e.target)) setIsOpen(false)
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setIsOpen((v) => !v)}
        aria-label={`Notifications${unreadCount ? `, ${unreadCount} unread` : ''}`}
        className="relative rounded-full p-2 text-orbit-ink-soft hover:bg-orbit-blue-50 hover:text-orbit-blue-700"
      >
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
          <path
            d="M10 2.5c-2.3 0-4.2 1.9-4.2 4.2v2.5c0 .6-.24 1.18-.66 1.6L4 12l.9 1H15l.9-1-1.15-1.2a2.27 2.27 0 01-.65-1.6V6.7c0-2.3-1.9-4.2-4.2-4.2z"
            stroke="currentColor"
            strokeWidth="1.4"
            strokeLinejoin="round"
          />
          <path d="M8.2 15.5a1.8 1.8 0 003.6 0" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
        </svg>
        {unreadCount > 0 && (
          <span className="absolute -top-0.5 -right-0.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-orbit-green-500 px-1 text-[10px] font-bold text-white animate-orbit-pulse-ring">
            {unreadCount > 9 ? '9+' : unreadCount}
          </span>
        )}
      </button>

      {isOpen && (
        <div className="absolute right-0 top-full z-40 mt-2 w-80 rounded-2xl border border-orbit-line bg-white p-2 shadow-[var(--shadow-orbit-raised)] animate-orbit-fade-up">
          <div className="flex items-center justify-between px-2 py-1.5">
            <span className="text-sm font-semibold text-orbit-ink">Notifications</span>
            {unreadCount > 0 && (
              <button
                onClick={() => markAllAsRead()}
                className="text-xs font-medium text-orbit-blue-600 hover:underline"
              >
                Mark all read
              </button>
            )}
          </div>
          <div className="max-h-80 overflow-y-auto">
            {notifications.length === 0 ? (
              <p className="px-2 py-6 text-center text-sm text-orbit-mist">You're all caught up.</p>
            ) : (
              notifications.map((n) => (
                <button
                  key={n.id}
                  onClick={() => markAsRead(n.id)}
                  className={`flex w-full flex-col items-start gap-0.5 rounded-lg px-3 py-2.5 text-left transition-colors hover:bg-orbit-blue-50 ${
                    n.read ? '' : 'bg-orbit-green-50/60'
                  }`}
                >
                  <span className="text-sm font-medium text-orbit-ink">{n.title}</span>
                  <span className="text-xs text-orbit-mist">{n.message}</span>
                </button>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  )
}
