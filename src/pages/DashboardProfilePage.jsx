// import { useState, useEffect } from 'react'
// import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
// import { dashboardService } from '@/services/dashboardService'
// import Card from '@/components/common/Card'
// import Input from '@/components/common/Input'
// import Button from '@/components/common/Button'
// import ErrorMessage from '@/components/common/ErrorMessage'
// import Spinner from '@/components/common/Spinner'

// const FIELDS = [
//   { name: 'name', label: 'Full name' },
//   { name: 'email', label: 'Email', type: 'email' },
//   { name: 'phone', label: 'Phone', type: 'tel' },
//   { name: 'address', label: 'Address' },
//   { name: 'parentName', label: "Parent's name" },
//   { name: 'parentPhone', label: "Parent's phone", type: 'tel' },
// ]

// export default function DashboardProfilePage() {
//   const queryClient = useQueryClient()
//   const { data: profile, isLoading } = useQuery({
//     queryKey: ['dashboard', 'profile'],
//     queryFn: dashboardService.getProfile,
//   })

//   const [form, setForm] = useState(null)
//   const [savedMessage, setSavedMessage] = useState(false)

//   useEffect(() => {
//     if (profile) setForm(profile)
//   }, [profile])

//   const mutation = useMutation({
//     mutationFn: dashboardService.updateProfile,
//     onSuccess: (updated) => {
//       queryClient.setQueryData(['dashboard', 'profile'], updated)
//       setSavedMessage(true)
//       setTimeout(() => setSavedMessage(false), 2500)
//     },
//   })

//   function handleChange(e) {
//     setForm((f) => ({ ...f, [e.target.name]: e.target.value }))
//   }

//   function handleSubmit(e) {
//     e.preventDefault()
//     mutation.mutate(form)
//   }

//   if (isLoading || !form) {
//     return (
//       <div className="flex min-h-[40vh] items-center justify-center">
//         <Spinner size="lg" />
//       </div>
//     )
//   }

//   return (
//     <Card className="max-w-2xl">
//       <h1 className="font-display text-xl font-bold text-orbit-ink">Your profile</h1>
//       <p className="mt-1 mb-6 text-sm text-orbit-ink-soft">
//         Keep your contact and parent/guardian details current.
//       </p>

//       <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-4 sm:grid-cols-2">
//         {FIELDS.map((field) => (
//           <Input
//             key={field.name}
//             id={`profile-${field.name}`}
//             name={field.name}
//             type={field.type || 'text'}
//             label={field.label}
//             value={form[field.name] || ''}
//             onChange={handleChange}
//             className={field.name === 'address' ? 'sm:col-span-2' : ''}
//           />
//         ))}

//         {mutation.isError && (
//           <ErrorMessage className="sm:col-span-2">Couldn't save your changes. Please try again.</ErrorMessage>
//         )}

//         <div className="flex items-center gap-3 sm:col-span-2">
//           <Button type="submit" isLoading={mutation.isPending}>
//             Save changes
//           </Button>
//           {savedMessage && <span className="text-sm font-medium text-orbit-green-600">Saved</span>}
//         </div>
//       </form>
//     </Card>
//   )
// }


import { useState, useEffect } from 'react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'

import { dashboardService } from '@/services/dashboardService'
import { courseService } from '@/services/courseService'

import Card from '@/components/common/Card'
import Input from '@/components/common/Input'
import Button from '@/components/common/Button'
import ErrorMessage from '@/components/common/ErrorMessage'
import Spinner from '@/components/common/Spinner'


const FIELDS = [
  { name: 'name', label: 'Full name' },
  { name: 'email', label: 'Email', type: 'email' },
  { name: 'phone', label: 'Phone', type: 'tel' },
  { name: 'address', label: 'Address' },
  { name: 'parentName', label: "Parent's name" },
  { name: 'parentPhone', label: "Parent's phone", type: 'tel' },
]


function DetailRow({ label, value }) {
  return (
    <div className="border-b border-orbit-border py-3 last:border-b-0">
      <div className="text-xs font-medium uppercase tracking-wide text-orbit-ink-soft">
        {label}
      </div>

      <div className="mt-1 text-sm font-medium text-orbit-ink">
        {value || 'Not provided'}
      </div>
    </div>
  )
}

function formatDateTime(dateString) {
  if (!dateString) return 'Not provided'

  return dateString
    .replace('T', '/')
    .replace(/\.\d+Z$/, '')
}


export default function DashboardProfilePage() {

  const queryClient = useQueryClient()


  // ==========================================
  // PROFILE DATA
  // ==========================================

  const {
    data: profile,
    isLoading: isLoadingProfile,
  } = useQuery({
    queryKey: ['dashboard', 'profile'],
    queryFn: dashboardService.getProfile,
  })


  // ==========================================
  // COURSE APPLICATION / ENROLLMENT DATA
  // Same source used by Dashboard Overview
  // ==========================================

  const {
    data: applications,
    isLoading: isLoadingApplications,
  } = useQuery({
    queryKey: ['course-applications', 'me'],
    queryFn: courseService.getMyApplications,
  })


  // Get the student's first/current application

  const enrolledApplication = applications?.results?.[0]


  // This is exactly the same value used in Overview

  const enrolledCourse = enrolledApplication?.courseTitle
  // console.log('Enrollment data:', enrolledApplication)


  const [form, setForm] = useState(null)
  const [savedMessage, setSavedMessage] = useState(false)


  // ==========================================
  // SET FORM DATA
  // ==========================================

  useEffect(() => {
    if (profile) {
      setForm(profile)
    }
  }, [profile])


  // ==========================================
  // UPDATE PROFILE
  // ==========================================

  const mutation = useMutation({
    mutationFn: dashboardService.updateProfile,

    onSuccess: (updated) => {

      queryClient.setQueryData(
        ['dashboard', 'profile'],
        updated
      )

      setSavedMessage(true)

      setTimeout(() => {
        setSavedMessage(false)
      }, 2500)
    },
  })


  // ==========================================
  // FORM HANDLERS
  // ==========================================

  function handleChange(e) {
    setForm((f) => ({
      ...f,
      [e.target.name]: e.target.value,
    }))
  }


  function handleSubmit(e) {
    e.preventDefault()
    mutation.mutate(form)
  }


  // ==========================================
  // PRINT
  // ==========================================

  function handlePrint() {
    window.print()
  }


  // ==========================================
  // LOADING
  // ==========================================

  if (isLoadingProfile || !form) {
    return (
      <div className="flex min-h-[40vh] items-center justify-center">
        <Spinner size="lg" />
      </div>
    )
  }


  return (
    <>

      {/* ==================================================
          PROFILE UPDATE SECTION
      ================================================== */}

      <Card className="profile-edit-section max-w-2xl">

        <h1 className="font-display text-xl font-bold text-orbit-ink">
          Your profile
        </h1>

        <p className="mt-1 mb-6 text-sm text-orbit-ink-soft">
          Keep your contact and parent/guardian details current.
        </p>


        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 gap-4 sm:grid-cols-2"
        >

          {FIELDS.map((field) => (

            <Input
              key={field.name}
              id={`profile-${field.name}`}
              name={field.name}
              type={field.type || 'text'}
              label={field.label}
              value={form[field.name] || ''}
              onChange={handleChange}
              className={
                field.name === 'address'
                  ? 'sm:col-span-2'
                  : ''
              }
            />

          ))}


          {mutation.isError && (

            <ErrorMessage className="sm:col-span-2">
              Couldn't save your changes. Please try again.
            </ErrorMessage>

          )}


          <div className="flex items-center gap-3 sm:col-span-2">

            <Button
              type="submit"
              isLoading={mutation.isPending}
            >
              Save changes
            </Button>


            {savedMessage && (

              <span className="text-sm font-medium text-orbit-green-600">
                Saved
              </span>

            )}

          </div>

        </form>

      </Card>



      {/* ==================================================
          STUDENT DETAILS SECTION
      ================================================== */}

      <Card
        id="student-details"
        className="student-details-section mt-8 max-w-4xl"
      >


        {/* ================================================
            HEADER
        ================================================= */}

        <div className="flex flex-col gap-4 border-b border-orbit-border pb-5 sm:flex-row sm:items-center sm:justify-between">

          <div>

            <h2 className="font-display text-2xl font-bold text-orbit-ink">
              Student Details
            </h2>

            <p className="mt-1 text-sm text-orbit-ink-soft">
              Complete student and enrollment information
            </p>

          </div>


          <Button
            type="button"
            onClick={handlePrint}
            className="print-button"
          >
            🖨 Print Details
          </Button>

        </div>



        {/* ================================================
            PERSONAL INFORMATION
        ================================================= */}

        <div className="mt-6">

          <h3 className="mb-3 text-sm font-bold uppercase tracking-wider text-orbit-green-600">
            Personal Information
          </h3>


          <div className="grid grid-cols-1 gap-x-8 sm:grid-cols-2">

            <DetailRow
              label="Full Name"
              value={form.name}
            />


            <DetailRow
              label="Email"
              value={form.email}
            />


            <DetailRow
              label="Phone"
              value={form.phone}
            />


            <DetailRow
              label="Parent / Guardian"
              value={form.parentName}
            />


            <DetailRow
              label="Parent Phone"
              value={form.parentPhone}
            />


            <DetailRow
              label="Student ID"
              value={
                form.uid ||
                form.studentId ||
                form.id
              }
            />


            <div className="sm:col-span-2">

              <DetailRow
                label="Address"
                value={form.address}
              />

            </div>

          </div>

        </div>



        {/* ================================================
            ENROLLED COURSE DETAILS
        ================================================= */}

        <div className="mt-8">

          <h3 className="mb-3 text-sm font-bold uppercase tracking-wider text-orbit-green-600">
            Enrolled Course Details
          </h3>


          <div className="grid grid-cols-1 gap-x-8 sm:grid-cols-2">


            {/* IMPORTANT:
                Uses the same courseTitle as Overview
            */}

            <DetailRow
              label="Enrolled Course"
              value={
                isLoadingApplications
                  ? 'Loading...'
                  : enrolledCourse
              }
            />


            {/* These fields are kept from your previous
                profile structure. They will show if the
                backend provides them. */}

            <DetailRow
              label="Course Category"
              value={
                isLoadingApplications
                ? 'Loading...'
                : enrolledApplication?.courseCategory
              }
            />


            <DetailRow
              label="Course Duration"
              value={
                form.courseDuration ||
                form.course?.duration ||
                'Undefined'
              }
            />


            <DetailRow
              label="Enrollment Status"
              value={
                isLoadingApplications
                  ? 'Loading...'
                  : formatDateTime(enrolledApplication?.created_at)
              }
            />


            <DetailRow
              label="Enrollment Date"
              value={
                isLoadingApplications
                ? 'Loading...'
                : enrolledApplication?.created_at
              }
            />


            <DetailRow
              label="Batch"
              value={form.batch}
            />

          </div>

        </div>



        {/* ================================================
            ACADEMIC INFORMATION
        ================================================= */}

        <div className="mt-8">

          <h3 className="mb-3 text-sm font-bold uppercase tracking-wider text-orbit-green-600">
            Academic Information
          </h3>


          <div className="grid grid-cols-1 gap-x-8 sm:grid-cols-2">


            <DetailRow
              label="Highest Qualification"
              value={
                form.qualification ||
                form.education
              }
            />


            <DetailRow
              label="Institution"
              value={form.institution}
            />


            <DetailRow
              label="Year of Passing"
              value={form.passingYear}
            />

          </div>

        </div>



        {/* ================================================
            COURSE / PAYMENT INFORMATION
        ================================================= */}

        <div className="mt-8">

          <h3 className="mb-3 text-sm font-bold uppercase tracking-wider text-orbit-green-600">
            Course / Payment Information
          </h3>


          <div className="grid grid-cols-1 gap-x-8 sm:grid-cols-2">


            <DetailRow
              label="Course Fee"
              value={
                form.courseFee
                  ? `₹${form.courseFee}`
                  : null
              }
            />


            <DetailRow
              label="Amount Paid"
              value={
                form.amountPaid
                  ? `₹${form.amountPaid}`
                  : null
              }
            />


            <DetailRow
              label="Due Amount"
              value={
                form.dueAmount
                  ? `₹${form.dueAmount}`
                  : null
              }
            />


            <DetailRow
              label="Payment Status"
              value={form.paymentStatus}
            />

          </div>

        </div>



        {/* ================================================
            DECLARATION
        ================================================= */}

        <div className="mt-8 border-t border-orbit-border pt-6">

          <p className="text-xs leading-5 text-orbit-ink-soft">
            This document contains the student information available
            in the ORBIT Education system. Please contact the
            administration if any information is incorrect or needs
            to be updated.
          </p>

        </div>



        {/* ================================================
            PRINT FOOTER
        ================================================= */}

        <div className="print-only mt-10 border-t border-gray-300 pt-4">

          <div className="flex justify-between text-xs text-gray-600">

            <span>
              ORBIT EDUCATIONS
            </span>

            <span>
              Student Profile
            </span>

          </div>

        </div>


      </Card>



      {/* ==================================================
          PRINT STYLES
      ================================================== */}

      <style>{`

        .print-only {
          display: none;
        }


        @media print {

          @page {
            size: A4;
            margin: 15mm;
          }


          body {
            background: white !important;
          }


          /* Hide profile editing form */

          .profile-edit-section {
            display: none !important;
          }


          /* Hide print button */

          .print-button {
            display: none !important;
          }


          /* Student details become full page */

          .student-details-section {
            display: block !important;
            max-width: none !important;
            width: 100% !important;

            margin: 0 !important;
            padding: 0 !important;

            box-shadow: none !important;
            border: none !important;
            border-radius: 0 !important;
          }


          /* Make printed text black */

          .student-details-section * {
            color: #000 !important;
          }


          /* Show print footer */

          .print-only {
            display: block !important;
          }


          /* Avoid awkward page breaks */

          h2,
          h3 {
            break-after: avoid;
          }


          .student-details-section > div {
            break-inside: avoid;
          }

        }

      `}</style>

    </>
  )
}

