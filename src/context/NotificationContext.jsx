import { createContext, useContext, useMemo } from 'react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { notificationService } from '@/services/notificationService'
import { useAuth } from './AuthContext'

const NotificationContext = createContext(null)

const POLL_INTERVAL_MS = 30_000

export function NotificationProvider({ children }) {
  const { isAuthenticated } = useAuth()
  const queryClient = useQueryClient()

  const { data: notifications = [] } = useQuery({
    queryKey: ['notifications'],
    queryFn: notificationService.getNotifications,
    enabled: isAuthenticated,
    refetchInterval: isAuthenticated ? POLL_INTERVAL_MS : false,
  })

  const markAsReadMutation = useMutation({
    mutationFn: notificationService.markAsRead,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['notifications'] }),
  })

  const markAllAsReadMutation = useMutation({
    mutationFn: notificationService.markAllAsRead,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['notifications'] }),
  })

  const value = useMemo(
    () => ({
      notifications,
      unreadCount: notifications.filter((n) => !n.read).length,
      markAsRead: markAsReadMutation.mutate,
      markAllAsRead: markAllAsReadMutation.mutate,
    }),
    [notifications, markAsReadMutation, markAllAsReadMutation]
  )

  return <NotificationContext.Provider value={value}>{children}</NotificationContext.Provider>
}

export function useNotifications() {
  const ctx = useContext(NotificationContext)
  if (!ctx) throw new Error('useNotifications must be used within NotificationProvider')
  return ctx
}
