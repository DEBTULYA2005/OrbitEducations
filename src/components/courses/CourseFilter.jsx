import { COURSE_CATEGORIES } from '@/constants/courseCategories'
import Input from '@/components/common/Input'

export default function CourseFilter({ activeCategory, onCategoryChange, search, onSearchChange }) {
  return (
    <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex flex-wrap gap-2">
        <button
          onClick={() => onCategoryChange('')}
          className={`rounded-full px-4 py-2 text-sm font-semibold transition-colors ${
            activeCategory === ''
              ? 'bg-orbit-blue-600 text-white'
              : 'border border-orbit-line bg-white text-orbit-ink-soft hover:bg-orbit-blue-50'
          }`}
        >
          All
        </button>
        {COURSE_CATEGORIES.map((c) => (
          <button
            key={c.id}
            onClick={() => onCategoryChange(c.id)}
            className={`rounded-full px-4 py-2 text-sm font-semibold transition-colors ${
              activeCategory === c.id
                ? 'bg-orbit-blue-600 text-white'
                : 'border border-orbit-line bg-white text-orbit-ink-soft hover:bg-orbit-blue-50'
            }`}
          >
            {c.label}
          </button>
        ))}
      </div>

      <Input
        id="course-search"
        placeholder="Search courses..."
        value={search}
        onChange={(e) => onSearchChange(e.target.value)}
        className="sm:w-64"
      />
    </div>
  )
}
