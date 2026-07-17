import { lazy, Suspense } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import MainLayout from '@/layouts/MainLayout'
import DashboardLayout from '@/layouts/DashboardLayout'
import ProtectedRoute from './ProtectedRoute'
import Spinner from '@/components/common/Spinner'

const HomePage = lazy(() => import('@/pages/HomePage'))
const GalleryPage = lazy(() => import('@/pages/GalleryPage'))
const AwardsPage = lazy(() => import('@/pages/AwardsPage'))
const CoursesPage = lazy(() => import('@/pages/CoursesPage'))
const CourseDetailPage = lazy(() => import('@/pages/CourseDetailPage'))
const CentersPage = lazy(() => import('@/pages/CentersPage'))
const AboutPage = lazy(() => import('@/pages/AboutPage'))
const ContactPage = lazy(() => import('@/pages/ContactPage'))
const LoginPage = lazy(() => import('@/pages/LoginPage'))
const SignupPage = lazy(() => import('@/pages/SignupPage'))
const DashboardOverviewPage = lazy(() => import('@/pages/DashboardOverviewPage'))
const DashboardProfilePage = lazy(() => import('@/pages/DashboardProfilePage'))
const DashboardSubscriptionPage = lazy(() => import('@/pages/DashboardSubscriptionPage'))
const DashboardCertificatesPage = lazy(() => import('@/pages/DashboardCertificatesPage'))
const NotFoundPage = lazy(() => import('@/pages/NotFoundPage'))

function PageFallback() {
  return (
    <div className="flex min-h-[60vh] items-center justify-center">
      <Spinner size="lg" />
    </div>
  )
}

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Suspense fallback={<PageFallback />}>
        <Routes>
          <Route element={<MainLayout />}>
            <Route path="/" element={<HomePage />} />
            <Route path="/gallery" element={<GalleryPage />} />
            <Route path="/awards" element={<AwardsPage />} />
            <Route path="/courses" element={<CoursesPage />} />
            <Route path="/courses/:id" element={<CourseDetailPage />} />
            <Route path="/centers" element={<CentersPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />
          </Route>

          <Route element={<ProtectedRoute />}>
            <Route element={<DashboardLayout />}>
              <Route path="/dashboard" element={<DashboardOverviewPage />} />
              <Route path="/dashboard/profile" element={<DashboardProfilePage />} />
              <Route path="/dashboard/subscription" element={<DashboardSubscriptionPage />} />
              <Route path="/dashboard/certificates" element={<DashboardCertificatesPage />} />
            </Route>
          </Route>

          <Route element={<MainLayout />}>
            <Route path="*" element={<NotFoundPage />} />
          </Route>
        </Routes>
      </Suspense>
    </BrowserRouter>
  )
}
