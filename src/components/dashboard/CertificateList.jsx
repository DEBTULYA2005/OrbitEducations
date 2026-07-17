import { useState } from 'react'
import { dashboardService } from '@/services/dashboardService'
import Card from '@/components/common/Card'
import Button from '@/components/common/Button'

export default function CertificateList({ certificates }) {
  const [downloadingId, setDownloadingId] = useState(null)

  async function handleDownload(cert) {
    try {
      setDownloadingId(cert.id)
      const blob = await dashboardService.downloadCertificate(cert.id)
      const url = window.URL.createObjectURL(blob)
      const link = document.createElement('a')
      link.href = url
      link.download = `${cert.title}.pdf`
      link.click()
      window.URL.revokeObjectURL(url)
    } finally {
      setDownloadingId(null)
    }
  }

  if (certificates.length === 0) {
    return (
      <Card>
        <p className="text-sm text-orbit-ink-soft">
          No certificates yet — they'll appear here as you complete courses and exams.
        </p>
      </Card>
    )
  }

  return (
    <div className="flex flex-col gap-3">
      {certificates.map((cert) => (
        <Card key={cert.id} className="flex items-center justify-between">
          <div>
            <p className="font-display text-base font-semibold text-orbit-ink">{cert.title}</p>
            <p className="text-sm text-orbit-mist">Issued {cert.issuedDate}</p>
          </div>
          <Button
            variant="outline"
            size="sm"
            isLoading={downloadingId === cert.id}
            onClick={() => handleDownload(cert)}
          >
            Download
          </Button>
        </Card>
      ))}
    </div>
  )
}
