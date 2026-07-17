import { createContext, useContext, useMemo } from 'react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { authService } from '@/services/authService'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const queryClient = useQueryClient()

  const {
    data: user,
    isLoading: isLoadingUser,
  } = useQuery({
    queryKey: ['auth', 'me'],
    queryFn: authService.getCurrentUser,
    retry: false,
    // A 401 here just means "logged out" — not an error state to surface.
    throwOnError: false,
  })

  const loginMutation = useMutation({
    mutationFn: authService.login,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['auth', 'me'] }),
  })

  const signupMutation = useMutation({
    mutationFn: authService.signup,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['auth', 'me'] }),
  })

  const logoutMutation = useMutation({
    mutationFn: authService.logout,
    onSuccess: () => {
      queryClient.setQueryData(['auth', 'me'], null)
      queryClient.clear()
    },
  })

  const value = useMemo(
    () => ({
      user: user ?? null,
      isAuthenticated: Boolean(user),
      isLoadingUser,
      login: loginMutation.mutateAsync,
      isLoggingIn: loginMutation.isPending,
      loginError: loginMutation.error,
      signup: signupMutation.mutateAsync,
      isSigningUp: signupMutation.isPending,
      signupError: signupMutation.error,
      logout: logoutMutation.mutateAsync,
    }),
    [user, isLoadingUser, loginMutation, signupMutation, logoutMutation]
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}
