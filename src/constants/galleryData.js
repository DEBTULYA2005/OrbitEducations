// Static for now — structured so this can be swapped for a GET /api/gallery/
// call later without touching the components that consume it.

export const GALLERY_SECTIONS = [
  {
    id: 'alumni',
    label: 'Alumni',
    intro:
      'Former students who carried their Orbit foundations into universities, careers, and beyond.',
    items: [
      {
        id: 'alum-1',
        image: 'https://lh3.googleusercontent.com/gps-cs-s/AHRPTWmX6Q56e9PKpxryO5Y_tEQ0ap-0SvEm-A1gfie_veDMjowyz4-ahf8o410sb4KD6Ezp41zDuTl6Uq1dH-QkVmkEISkof3EKsuWgkuWawYzhZpNGTgwo0caPt6Cuq8GI-rSNNjxlqQ=s680-w680-h510-rw',
        title: 'Batch of 2021, Advanced Track',
        description:
          'Eight students from our first Advanced-tier cohort went on to UG programs across the state, three on merit scholarships.',
      },
      {
        id: 'alum-2',
        image: 'https://lh3.googleusercontent.com/gps-cs-s/AHRPTWn37o6X2BhZF_Uy-g5HI-Mh7D662ZZBemzQ0RXhBibsvZmnJk0sXUiRi71ZxjvCMW8OxjNRSAaHFUnJAhds55CVET58BtEglFkHgfxOJlDTMde9dhv6VqHR5GfnXr5ZAj8n1lg8=s680-w680-h510-rw',
        title: 'Batch of 2024, Advanced Track',
        description:
          'Nine students from our first Advanced-tier cohort went on to UG programs across the state, three on merit scholarships.',
      },
      {
        id: 'alum-3',
        image: 'https://lh3.googleusercontent.com/gps-cs-s/AHRPTWmyW9hLAlNa9tacM_dMTGl67ou6Pw1CgK2UdTnh86XJoB2uHCVrNzJTVrNCmHM7HHfvIfD59HoFxB2TJ_JMPPIbG_InXrd_mWGWy58QPHtV-x_C1YKWkTCN-MNHlV-OcX1Q-W0=s680-w680-h510-rw',
        title: 'Reunion, Durgapur Center',
        description:
          'Alumni returned to mentor current students on exam strategy and share what changed once they left Orbit.',
      },
    ],
  },
  
  {
    id: 'picnics',
    label: 'Picnics',
    intro: 'Annual breaks between exam cycles — where cohorts actually get to know each other.',
    items: [
      {
        id: 'picnic-1',
        image: 'https://lh3.googleusercontent.com/gps-cs-s/AHRPTWl7EFuW9hgai4dLlbqZd95y1g5VBUYZY7zOLysiuXXQizjr5kOVqUN3reBgftfsYPAOr9iQhWNdYbtSUka1-CpacoJnyg0a2nobcvx56Kv-z2CAf69qMEJ7ig3L4dvj9iNMqimU_w=s680-w680-h510-rw',
        title: 'Summer picnic, Mandarmani batch',
        description: 'A day off the syllabus at the riverside grounds, before the certification sprint began.',
      },
      {
        id: 'picnic-2',
        image: 'https://lh3.googleusercontent.com/gps-cs-s/AHRPTWkxzUc6Rut8OGw6-VIXZIXmmIULysmyQvJtK831OBp0ztewGOlKtV2uXbr_RRxKKh6wf4yzWTp769Ij3XBWZSoq-fI5a58LAEPxhd4gbMFFUPpT2Zu3SzkExcsxfoulV4oUAyw=s680-w680-h510-rw',
        title: 'Winter picnic, HuchukDanga Park',
        description: 'A day off the syllabus at the riverside grounds, before the certification sprint began.',
      },
    ],
  },
  {
    id: 'celebrations',
    label: 'Celebrations',
    intro: 'Festivals, result days, and the moments worth marking on the calendar.',
    items: [
      {
        id: 'celeb-1',
        image: 'https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=800&q=80',
        title: 'Result day, School Performance batch',
        description: 'Board exam toppers were felicitated on stage in front of the full center.',
      },
    ],
  },
  {
    id: 'recognitions',
    label: 'Recognitions',
    intro: 'Faculty and center-level recognitions from the wider education community.',
    items: [
      {
        id: 'rec-1',
        image: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=800&q=80',
        title: 'District Excellence in Coaching, 2024',
        description: 'Awarded to our Asansol center faculty for sustained board-result performance.',
      },
    ],
  },
]
