import Card from '@/components/common/Card'

const STATS = [
  ['10,000+', 'Students trained'],
  ['2', 'Learning centers'],
  ['92%', 'Certification pass rate'],
  ['11', 'Years running'],
]

const TIMELINE = [
  { year: '2015', label: 'Orbit Educations founded in Asansol with a single School-track batch.' },
  { year: '2018', label: 'Certification and UG/PG tracks introduced; second center opens in Durgapur.' },
  { year: '2021', label: 'First cohort of NPTEL-certified students; Olympiad program launched.' },
  { year: '2024', label: 'Kolkata center opens; Advanced-tier subscription and online worksheets go live.' },
]

const FACULTY = [
  {
    name: 'Mr. Suman Talapatra',
    role: 'Founder & Director',
    bio: 'Sets academic direction across all centers, with two decades in secondary and higher education.',
  },
  {
    name: 'Mr. Samiran',
    role: 'Teacher & Mentor of Commerce',
    bio: 'Leads the Certification and Professional tracks, bridging classroom work with industry requirements.',
  },
  {
    name: 'Mr. Taposh',
    role: 'Teacher & Mentor of Hardware & Networking',
    bio: 'Leads the Certification and Professional tracks, bridging classroom work with industry requirements.',
  },
  {
    name: 'Mr. Rupam Mondal',
    role: 'Associate Teacher of Computer',
    bio: 'Freelancer/part-time teacher, bridging classroom work with industry requirements.',
  },
  {
    name: 'Mr. Debtulya Sarkar',
    role: 'Associate Teacher of computer',
    bio: 'Freelancer/part-time teacher, bridging classroom work with industry requirements.',
  },
]

export default function AboutPage() {
  return (
    <section className="container-orbit py-14">
      <header className="max-w-2xl">
        <h1 className="font-display text-3xl font-bold text-orbit-ink sm:text-4xl">About Orbit Educations</h1>
        <p className="mt-4 text-base leading-relaxed text-orbit-ink-soft">
          We built Orbit around a simple idea: a student's path from school to profession should
          feel like one continuous trajectory, not a series of disconnected leaps. Every track —
          School, UG/PG, Certification, Professional, Specialized — is designed to hand off
          cleanly into the next.
        </p>
      </header>

      <div className="mt-12 grid grid-cols-2 gap-6 border-y border-orbit-line py-8 sm:grid-cols-4">
        {STATS.map(([stat, label]) => (
          <div key={label} className="text-center">
            <div className="font-mono-stat text-3xl font-bold text-orbit-blue-600">{stat}</div>
            <div className="mt-1 text-xs text-orbit-mist">{label}</div>
          </div>
        ))}
      </div>

      <div className="mt-14">
        <h2 className="font-display text-2xl font-bold text-orbit-ink">Our journey</h2>
        <ol className="mt-6 flex flex-col gap-6 border-l-2 border-orbit-blue-100 pl-6">
          {TIMELINE.map((step) => (
            <li key={step.year} className="relative">
              <span className="absolute -left-[31px] top-1 h-3 w-3 rounded-full bg-orbit-green-500" />
              <span className="font-mono-stat text-sm font-semibold text-orbit-blue-600">{step.year}</span>
              <p className="mt-1 text-sm leading-relaxed text-orbit-ink-soft">{step.label}</p>
            </li>
          ))}
        </ol>
      </div>

      <div className="mt-14">
        <h2 className="font-display text-2xl font-bold text-orbit-ink">Leadership & faculty</h2>
        <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2">
          {FACULTY.map((person) => (
            <Card key={person.name}>
              <h3 className="font-display text-lg font-semibold text-orbit-ink">{person.name}</h3>
              <p className="mt-0.5 text-sm font-medium text-orbit-green-600">{person.role}</p>
              <p className="mt-2 text-sm leading-relaxed text-orbit-ink-soft">{person.bio}</p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
