import { createContext, useContext, useMemo } from 'react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { authService } from '@/services/authService'
import { setCsrfToken } from '@/services/axiosInstance'
import { useEffect } from 'react'

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

  // Whenever /me/ resolves with a fresh csrfToken, store it for axiosInstance
  // to attach on the next mutating request (POST/PUT/PATCH/DELETE).
  useEffect(() => {
    if (user?.csrfToken) setCsrfToken(user.csrfToken)
  }, [user])

  const loginMutation = useMutation({
    mutationFn: authService.login,
    onSuccess: (data) => {
      if (data?.csrfToken) setCsrfToken(data.csrfToken)
      queryClient.invalidateQueries({ queryKey: ['auth', 'me'] })
    },
  })

  const signupMutation = useMutation({
    mutationFn: authService.signup,
    onSuccess: (data) => {
      if (data?.csrfToken) setCsrfToken(data.csrfToken)
      queryClient.invalidateQueries({ queryKey: ['auth', 'me'] })
    },
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
