import { useParams, Link } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { courseService } from '@/services/courseService'
import { COURSE_CATEGORIES } from '@/constants/courseCategories'
import Badge from '@/components/common/Badge'
import Card from '@/components/common/Card'
import Button from '@/components/common/Button'
import Spinner from '@/components/common/Spinner'
import ErrorMessage from '@/components/common/ErrorMessage'
import EnrollmentForm from '@/components/forms/EnrollmentForm'

export default function CourseDetailPage() {
  const { id } = useParams()

  const { data: course, isLoading, isError } = useQuery({
    queryKey: ['courses', id],
    queryFn: () => courseService.getCourseById(id),
  })

  if (isLoading) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center">
        <Spinner size="lg" />
      </div>
    )
  }

  if (isError || !course) {
    return (
      <div className="container-orbit py-16">
        <ErrorMessage>This course couldn't be found. It may have been moved or removed.</ErrorMessage>
        <Link to="/courses" className="mt-4 inline-block text-sm font-semibold text-orbit-blue-600">
          ← Back to all courses
        </Link>
      </div>
    )
  }

  const category = COURSE_CATEGORIES.find((c) => c.id === course.category)

  return (
    <section className="container-orbit py-14">
      <Link to="/courses" className="text-sm font-semibold text-orbit-blue-600">
        ← Back to all courses
      </Link>

      <div className="mt-6 grid grid-cols-1 gap-12 lg:grid-cols-5">
        <div className="lg:col-span-3">
          {category && <Badge tone="blue">{category.label}</Badge>}
          <h1 className="mt-3 font-display text-3xl font-bold text-orbit-ink sm:text-4xl">{course.title}</h1>
          <p className="mt-4 text-base leading-relaxed text-orbit-ink-soft">{course.description}</p>

          {course.syllabus && (
            <div className="mt-8">
              <h2 className="font-display text-xl font-semibold text-orbit-ink">What you'll cover</h2>
              <ul className="mt-3 flex flex-col gap-2">
                {course.syllabus.map((item) => (
                  <li key={item} className="flex items-start gap-2 text-sm text-orbit-ink-soft">
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="mt-0.5 shrink-0">
                      <path d="M3.5 8.3l2.7 2.7 6.3-6.3" stroke="var(--color-orbit-green-500)" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        <Card className="h-fit lg:col-span-2">
          <h2 className="font-display text-lg font-semibold text-orbit-ink">Apply to this course</h2>
          <p className="mt-1 mb-5 text-sm text-orbit-ink-soft">
            Submit your details and our admissions team will follow up.
          </p>
          <EnrollmentForm />
        </Card>
      </div>
    </section>
  )
}
