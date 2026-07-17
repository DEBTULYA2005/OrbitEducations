import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { courseService } from '@/services/courseService'
import { useDebounce } from '@/hooks/useDebounce'
import CourseFilter from '@/components/courses/CourseFilter'
import { CourseCard, CourseCardSkeleton } from '@/components/courses/CourseCard'
import ErrorMessage from '@/components/common/ErrorMessage'

export default function CoursesPage() {
  const [category, setCategory] = useState('')
  const [search, setSearch] = useState('')
  const [page, setPage] = useState(1)
  const debouncedSearch = useDebounce(search)

  const { data, isLoading, isError, isPlaceholderData } = useQuery({
    queryKey: ['courses', { category, search: debouncedSearch, page }],
    queryFn: () => courseService.getCourses({ category, search: debouncedSearch, page }),
    placeholderData: (prev) => prev, // keep prior page visible while refetching — no flash of empty state
  })

  const courses = data?.results ?? []
  const hasNextPage = Boolean(data?.next)

  function handleCategoryChange(next) {
    setCategory(next)
    setPage(1)
  }

  function handleSearchChange(next) {
    setSearch(next)
    setPage(1)
  }

  return (
    <section className="container-orbit py-14">
      <header className="mb-8 max-w-2xl">
        <h1 className="font-display text-3xl font-bold text-orbit-ink sm:text-4xl">Courses</h1>
        <p className="mt-3 text-orbit-ink-soft">
          From school foundations to professional certification — find the track that fits where
          you're headed.
        </p>
      </header>

      <CourseFilter
        activeCategory={category}
        onCategoryChange={handleCategoryChange}
        search={search}
        onSearchChange={handleSearchChange}
      />

      {isError && (
        <ErrorMessage className="mb-6">
          Couldn't load courses right now. Please try again in a moment.
        </ErrorMessage>
      )}

      <div className={`grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 ${isPlaceholderData ? 'opacity-60' : ''}`}>
        {isLoading
          ? Array.from({ length: 6 }).map((_, i) => <CourseCardSkeleton key={i} />)
          : courses.map((course) => <CourseCard key={course.id} course={course} />)}
      </div>

      {!isLoading && courses.length === 0 && !isError && (
        <p className="py-16 text-center text-orbit-mist">
          No courses match that search yet. Try a different category or keyword.
        </p>
      )}

      {(page > 1 || hasNextPage) && (
        <div className="mt-10 flex items-center justify-center gap-4">
          <button
            disabled={page === 1}
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            className="rounded-full border border-orbit-line px-4 py-2 text-sm font-semibold text-orbit-ink-soft disabled:opacity-40"
          >
            Previous
          </button>
          <span className="text-sm text-orbit-mist">Page {page}</span>
          <button
            disabled={!hasNextPage}
            onClick={() => setPage((p) => p + 1)}
            className="rounded-full border border-orbit-line px-4 py-2 text-sm font-semibold text-orbit-ink-soft disabled:opacity-40"
          >
            Next
          </button>
        </div>
      )}
    </section>
  )
}
