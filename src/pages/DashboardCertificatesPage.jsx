import { useQuery } from '@tanstack/react-query'
import { dashboardService } from '@/services/dashboardService'
import CertificateList from '@/components/dashboard/CertificateList'
import Spinner from '@/components/common/Spinner'
import ErrorMessage from '@/components/common/ErrorMessage'

export default function DashboardCertificatesPage() {
  const { data: certificates, isLoading, isError } = useQuery({
    queryKey: ['dashboard', 'certificates'],
    queryFn: dashboardService.getCertificates,
  })

  return (
    <div>
      <h1 className="font-display text-xl font-bold text-orbit-ink">Certificates</h1>
      <p className="mt-1 mb-6 text-sm text-orbit-ink-soft">Download certificates as you earn them.</p>

      {isLoading && (
        <div className="flex min-h-[30vh] items-center justify-center">
          <Spinner size="lg" />
        </div>
      )}

      {isError && <ErrorMessage>Couldn't load your certificates right now.</ErrorMessage>}

      {certificates && <CertificateList certificates={certificates} />}
    </div>
  )
}
