export const SUBSCRIPTION_PLANS = [
  {
    id: 'basic',
    name: 'Basic',
    price: 0,
    tagline: 'Get oriented',
    features: [
      'Access to course library previews',
      'Community announcements',
      'Profile & enrollment tracking',
    ],
  },
  {
    id: 'intermediate',
    name: 'Intermediate',
    price: 500,
    tagline: 'Build momentum',
    featured: true,
    features: [
      'Everything in Basic',
      'Access to practice exams',
      'Chapter-wise worksheets',
    ],
  },
  {
    id: 'advanced',
    name: 'Advanced',
    price: 1000,
    tagline: 'Full trajectory',
    features: [
      'Everything in Intermediate',
      'Full-length mock exams',
      'Priority certificate processing',
    ],
  },
]
