import { Link } from 'react-router-dom'
import Card from '@/components/common/Card'
import Badge from '@/components/common/Badge'
import { COURSE_CATEGORIES } from '@/constants/courseCategories'

export function CourseCard({ course }) {
  const category = COURSE_CATEGORIES.find((c) => c.id === course.category)

  return (
    <Link to={`/courses/${course.id}`}>
      <Card hoverable className="flex h-full flex-col">
        {category && <Badge tone="blue">{category.label}</Badge>}
        <h3 className="mt-3 font-display text-lg font-semibold text-orbit-ink">{course.title}</h3>
        <p className="mt-2 line-clamp-3 flex-1 text-sm text-orbit-ink-soft">{course.description}</p>
        <span className="mt-4 text-sm font-semibold text-orbit-blue-600">View details →</span>
      </Card>
    </Link>
  )
}

export function CourseCardSkeleton() {
  return (
    <div className="animate-pulse rounded-2xl border border-orbit-line bg-white p-6">
      <div className="h-5 w-20 rounded-full bg-orbit-blue-50" />
      <div className="mt-4 h-5 w-3/4 rounded bg-slate-100" />
      <div className="mt-3 h-4 w-full rounded bg-slate-100" />
      <div className="mt-2 h-4 w-2/3 rounded bg-slate-100" />
    </div>
  )
}
