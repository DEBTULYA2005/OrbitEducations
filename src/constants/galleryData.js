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
        image: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=800&q=80',
        title: 'Batch of 2022, Advanced Track',
        description:
          'Twenty-two students from our first Advanced-tier cohort went on to UG programs across the state, three on merit scholarships.',
      },
      {
        id: 'alum-2',
        image: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=800&q=80',
        title: 'Reunion, Asansol Center',
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
        image: 'https://images.unsplash.com/photo-1526976668912-1a811878dd37?w=800&q=80',
        title: 'Winter picnic, Durgapur batch',
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
